import t from 'tap';
import { loadDither } from '../test-utils';
import { Dithertron } from '../../src/dither/dithertron';
import * as exportfuncs from '../../src/export/exportfuncs';
import { PixelsAvailableMessage } from '../../src/common/types';
import * as kernels from '../../src/dither/kernels';

async function converge(sysid: string): Promise<{ dt: Dithertron, last: PixelsAvailableMessage, iters: number }> {
    const dt = await loadDither(sysid, 'parrot.jpg');
    Object.assign(dt.sysparams, {
        diffuse: 0.75, noise: 5, ordered: 0, ditherfn: kernels.SIERRALITE, paletteDiversity: 0.95,
    });
    dt.setSettings(dt.sysparams);
    dt.clear();
    let iters = 0;
    while (dt.iterate() && iters < 100) iters++;
    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    return { dt, last: last!, iters };
}

// read the 0x0RGB color register i as an 8-bit-per-channel RGBA value
function colorRegister(out: Uint8Array, i: number): number {
    const word = (out[i * 2] << 8) | out[i * 2 + 1];
    return (((word >> 8) & 15) * 17) | ((((word >> 4) & 15) * 17) << 8) | (((word & 15) * 17) << 16);
}

function planeBits(out: Uint8Array, colors: number, planes: number, width: number, height: number, x: number, y: number): number {
    const rowBytes = width / 8;
    let v = 0;
    for (let p = 0; p < planes; p++)
        v |= ((out[colors * 2 + p * rowBytes * height + y * rowBytes + (x >> 3)] >> (7 - (x & 7))) & 1) << p;
    return v;
}

t.test('amiga.lores export', async t => {
    const { dt, last, iters } = await converge('amiga.lores');
    const canv: any = dt.dithcanv!;
    const out = exportfuncs.exportAmiga(last, dt.sysparams);

    t.ok(iters < 20, 'converged quickly with diffusion');
    t.equal(out.length, 64 + 5 * 40 * 256, '32 color registers and five 320x256 bitplanes');

    let badPixel = 0;
    for (let y = 0; y < last.height; y++)
        for (let x = 0; x < last.width; x++) {
            const v = planeBits(out, 32, 5, last.width, last.height, x, y);
            if (v !== canv.indexed[y * last.width + x]) badPixel++;
            if ((colorRegister(out, v) & 0xffffff) !== (last.img[y * last.width + x] & 0xffffff)) badPixel++;
        }
    t.equal(badPixel, 0, 'bitplanes hold each pixel\'s color number and the registers reproduce the image');
});

t.test('amiga.lores.ham6 export', async t => {
    const { dt, last, iters } = await converge('amiga.lores.ham6');
    const canv: any = dt.dithcanv!;
    const out = exportfuncs.exportAmigaHAM6(last, dt.sysparams);
    const { width, height } = last;

    t.ok(iters < 30, 'converged with diffusion');
    t.equal(out.length, 32 + 6 * 40 * 256, '16 color registers and six 320x256 bitplanes');

    // decode the way the hardware does: hold the previous pixel and replace one
    // channel, restarting from color register 0 on every scanline
    let bad = 0;
    let modified = 0;
    for (let y = 0; y < height; y++) {
        let held = colorRegister(out, 0);
        for (let x = 0; x < width; x++) {
            const v = planeBits(out, 16, 6, width, height, x, y);
            const ctrl = v >> 4;
            const data = v & 15;
            if (ctrl === 0) held = colorRegister(out, data);
            else {
                modified++;
                const shift = ctrl === 2 ? 0 : ctrl === 3 ? 8 : 16; // 1 = blue, 2 = red, 3 = green
                held = (held & ~(0xff << shift)) | ((data * 17) << shift);
            }
            if ((held & 0xffffff) !== (last.img[y * width + x] & 0xffffff)) bad++;
        }
    }
    t.equal(bad, 0, 'hardware HAM decoding reproduces the displayed image');
    t.ok(modified > width * height / 10, 'uses hold-and-modify pixels');
    t.comment(`ham6 converged in ${iters} iters, ${modified} modify pixels, ${canv.changes} changing`);
});
