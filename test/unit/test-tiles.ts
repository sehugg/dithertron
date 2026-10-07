import t, { Test } from 'tap';
import { loadDither } from '../test-utils';
import { Dithertron } from '../../src/dither/dithertron';
import * as exportfuncs from '../../src/export/exportfuncs';
import { PixelsAvailableMessage } from '../../src/common/types';

// Ordered dithering repeats the same patterns, so tiles can be shared; error
// diffusion makes nearly every tile unique.
const ORDERED = { diffuse: 0, ordered: 0.5, ditherfn: [] };

async function converge(sysid: string, options: object = {}): Promise<{ dt: Dithertron, iters: number }> {
    const dt = await loadDither(sysid, 'parrot.jpg');
    Object.assign(dt.sysparams, ORDERED, options);
    dt.setSettings(dt.sysparams);
    dt.clear();
    let iters = 0;
    while (dt.iterate() && iters < 100) iters++;
    return { dt, iters };
}

// every block must show exactly the pixels of the tile it was assigned, so the
// image really fits in the tile budget
function checkTiles(t: Test, dt: Dithertron, max: number) {
    const canv: any = dt.dithcanv!;
    const cb = canv.tileCodebook;
    t.ok(cb, 'has a tile codebook');
    t.ok(cb.tiles.length <= max, `${cb.tiles.length} tiles fit in ${max}`);
    const { w, h, columns, rows } = canv.block;
    const unique = new Set<string>();
    let wrong = 0;
    for (let c = 0; c < columns * rows; c++) {
        const slots: number[] = canv.tileSlotColors(c);
        const shown: number[] = [];
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const color = canv.indexed[((Math.floor(c / columns) * h + y) * canv.width) + (c % columns) * w + x];
                const slot = slots.indexOf(color);
                if (slot !== cb.slotAt(c, x, y)) wrong++;
                shown.push(color);
            }
        }
        unique.add(shown.join(','));
    }
    t.equal(wrong, 0, 'every pixel matches its tile');
    t.ok(unique.size <= max * 4, 'distinct block bitmaps stay near the tile budget');
}

t.test('nes.tiles fits a full screen into 240 tiles', async t => {
    const { dt, iters } = await converge('nes.tiles');
    t.ok(iters < 100, `converged (${iters} iterations)`);
    t.equal(dt.dithcanv!.width, 256);
    t.equal(dt.dithcanv!.height, 240);
    checkTiles(t, dt, 240);
    t.equal((dt.dithcanv as any).tileCodebook.tiles.length, 240, 'a photo uses the whole budget');
});

t.test('ordered dither shares tiles without a budget', async t => {
    const { dt } = await converge('nes.tiles', { tiles: { max: 960 } });
    const used = (dt.dithcanv as any).tileCodebook.tiles.length;
    t.ok(used < 800, `${used} tiles for 960 blocks`);
});

t.test('the image is untouched until the dither settles', async t => {
    const dt = await loadDither('nes.tiles', 'parrot.jpg');
    Object.assign(dt.sysparams, ORDERED);
    dt.setSettings(dt.sysparams);
    dt.clear();
    dt.iterate();
    t.notOk((dt.dithcanv as any).tileCodebook, 'no tiles after the first pass');
    while (dt.iterate());
    t.ok((dt.dithcanv as any).tileCodebook, 'tiles chosen once settled');
});

t.test('a smaller tile budget is honored', async t => {
    const { dt } = await converge('nes.tiles', { tiles: { max: 32 } });
    checkTiles(t, dt, 32);
});

t.test('flips shrink the error for the same budget', async t => {
    const plain = await converge('nes.tiles', { tiles: { max: 64 } });
    const flipped = await converge('nes.tiles', { tiles: { max: 64, flipX: true, flipY: true } });
    const a = (plain.dt.dithcanv as any).tileCodebook.totalCost;
    const b = (flipped.dt.dithcanv as any).tileCodebook.totalCost;
    t.ok(b < a, `flips cost ${b} < ${a}`);
});

// the exported CHR + name table must redraw exactly the dithered image
t.test('nes.tiles export round-trips through CHR and name table', async t => {
    const { dt } = await converge('nes.tiles');
    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    const out = exportfuncs.exportNESTiles(last!, dt.sysparams);

    const CHR = 256 * 16, NAME = 32 * 30, ATTR = 64;
    t.equal(out.length, CHR + NAME + ATTR + 4, 'CHR + name table + attributes + palette');

    let wrong = 0;
    for (let y = 0; y < 240; y++) {
        for (let x = 0; x < 256; x++) {
            const tile = out[CHR + (y >> 3) * 32 + (x >> 3)];
            const bit = 7 - (x & 7);
            const lo = (out[tile * 16 + (y & 7)] >> bit) & 1;
            const hi = (out[tile * 16 + 8 + (y & 7)] >> bit) & 1;
            if ((hi << 1 | lo) !== last!.indexed[y * 256 + x]) wrong++;
        }
    }
    t.equal(wrong, 0, 'every pixel redraws from its tile');

    const tiles = (dt.dithcanv as any).tileCodebook.tiles.length;
    t.ok(out.slice(tiles * 16, CHR).every((b) => b === 0), 'unused CHR tiles are blank');
    t.ok(out.slice(CHR, CHR + NAME).every((n) => n < tiles), 'name table only names real tiles');
    t.ok(out.slice(CHR + NAME, CHR + NAME + ATTR).every((b) => b === 0), 'attributes select palette 0');
    const palette = Array.from(out.slice(CHR + NAME + ATTR));
    t.ok(palette.every((c) => c < 64), `palette bytes are NES colors (${palette})`);
    t.equal(new Set(palette).size, 4, 'four distinct colors');
});

t.test('nes.tiles export refuses flipped tiles', async t => {
    const { dt } = await converge('nes.tiles', { tiles: { max: 64, flipX: true, flipY: true } });
    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    t.throws(() => exportfuncs.exportNESTiles(last!, dt.sysparams), /flipped/);
});

// four BG palettes chosen per 16x16 area through the attribute table
t.test('nes.tiles.attr picks one palette per 16x16 area and exports the attribute table', async t => {
    const { dt, iters } = await converge('nes.tiles.attr');
    t.ok(iters < 100, `converged (${iters} iterations)`);
    checkTiles(t, dt, 240);

    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    const out = exportfuncs.exportNESTiles(last!, dt.sysparams);
    const CHR = 256 * 16, NAME = 32 * 30, ATTR = 64;
    t.equal(out.length, CHR + NAME + ATTR + 16, 'CHR + name table + attributes + four palettes');

    const palette = Array.from(out.slice(CHR + NAME + ATTR));
    t.ok(palette.every((c, i) => i % 4 === 0 ? c === palette[0] : true), 'slot 0 is the shared backdrop');
    t.ok(palette.every((c) => c >= 0 && c < 64), 'palette bytes are NES colors');
    t.ok(new Set(palette).size > 8, `${new Set(palette).size} distinct colors across the palettes`);
    for (let p = 0; p < 4; p++)
        t.equal(new Set(palette.slice(p * 4, p * 4 + 4)).size, 4, `palette ${p} has four different colors`);
    const areas = new Array(4).fill(0);
    for (let b = 0; b < 64; b++) for (let k = 0; k < 4; k++) areas[(out[CHR + NAME + b] >> (k * 2)) & 3]++;
    t.ok(areas.every((n) => n > 0), `every palette is used (${areas.join('/')} areas)`);

    const NES = dt.sysparams.pal as number[];
    let wrong = 0;
    for (let y = 0; y < 240; y++) {
        for (let x = 0; x < 256; x++) {
            const tile = out[CHR + (y >> 3) * 32 + (x >> 3)];
            const bit = 7 - (x & 7);
            const lo = (out[tile * 16 + (y & 7)] >> bit) & 1;
            const hi = (out[tile * 16 + 8 + (y & 7)] >> bit) & 1;
            const attr = out[CHR + NAME + (y >> 5) * 8 + (x >> 5)];
            const p = (attr >> ((((y >> 4) & 1) * 2 + ((x >> 4) & 1)) * 2)) & 3;
            const rgb = NES[palette[p * 4 + (hi << 1 | lo)]];
            if (rgb !== (last!.img[y * 256 + x] & 0xffffff)) wrong++;
        }
    }
    t.equal(wrong, 0, 'every pixel redraws from tile, attribute and palette');
});

// single-palette presets for users who do not want a per-tile palette choice
const ONE_PALETTE: [string, number, string][] = [
    ['gb.color.tiles.1pal', 256, 'exportGBC'],
    ['sms.tiles.1pal', 448, 'exportMasterSystemTiles'],
    ['sms-gg.tiles.1pal', 448, 'exportGameGearTiles'],
    ['genesis.tiles.1pal', Infinity, 'exportGenesisTiles'],
];
for (const [id, max, exporter] of ONE_PALETTE) {
    t.test(`${id} uses a single palette`, async t => {
        const { dt, iters } = await converge(id);
        t.ok(iters < 100, `converged (${iters} iterations)`);
        const canv: any = dt.dithcanv!;
        t.equal(canv.palettesCount, 1, 'one palette');
        if (max !== Infinity)
            checkTiles(t, dt, max);
        let last: PixelsAvailableMessage | undefined;
        dt.pixelsAvailable = (msg) => { last = msg; };
        dt.iterate();
        t.ok(last!.indexed.every((i) => i < canv.paletteColors), 'pixels only use the palette');
        t.ok((exportfuncs as any)[exporter](last!, dt.sysparams).length > 0, 'exports');
    });
}

// flipped tiles must export on systems with hardware flips (the flags go in the attributes)
t.test('gb.color.tiles exports flipped tiles', async t => {
    const { dt } = await converge('gb.color.tiles', { tiles: { max: 24, flipX: true, flipY: true } });
    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    const orient: Uint8Array = (dt.dithcanv as any).tileCodebook.orient;
    t.ok(orient.some((o) => o !== 0), 'some blocks use a flipped tile');
    const out = exportfuncs.exportGBC(last!, dt.sysparams);
    const blocks = orient.length;
    const tiles = (dt.dithcanv as any).tileCodebook.tiles.length;
    const attrs = out.slice(tiles * 16 + blocks, tiles * 16 + 2 * blocks);
    t.same(Array.from(attrs, (a) => (a >> 5) & 3), Array.from(orient), 'attributes carry the flip bits');
});
