import t from 'tap';
import { loadDither } from '../test-utils';
import { Dithertron } from '../../src/dither/dithertron';
import * as exportfuncs from '../../src/export/exportfuncs';
import { PixelsAvailableMessage } from '../../src/common/types';

async function converge(sysid: string): Promise<{ dt: Dithertron, last: PixelsAvailableMessage, iters: number }> {
    const dt = await loadDither(sysid, 'parrot.jpg');
    dt.clear();
    let iters = 0;
    while (dt.iterate() && iters < 100) iters++;

    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    return { dt, last: last!, iters };
}

// Game Boy Color tile-attribute invariants: the ditherer must confine every
// tile to one of the eight 4-color BG palettes, and the native export must
// emit the matching tilemap attribute bytes and palette RAM.
t.test('gb.color.tiles tile attributes', async t => {
    const { dt, last, iters } = await converge('gb.color.tiles');
    const sys = dt.sysparams;

    const content: any = last.content;
    const palettes: number[][] = content.palettes;

    t.equal(palettes.length, 8, 'eight BG palettes');
    for (const palette of palettes) {
        t.equal(palette.length, 4, 'four colors per palette');
    }

    // every pixel must belong to the palette its tile selected
    const canv = dt.dithcanv!;
    const block = content.block;
    let outside = 0;
    for (let i = 0; i < canv.indexed.length; i++) {
        const col = Math.floor(i % canv.width / block.w);
        const row = Math.floor(Math.floor(i / canv.width) / block.h);
        const paletteIndex = content.blockParams[row * block.columns + col];
        const selected = palettes[paletteIndex] ?? [];
        if (!selected.includes(canv.indexed[i])) outside++;
    }
    t.equal(outside, 0, 'all pixels are inside their tile palette');

    // native export layout: tile data + attribute bytes + palette RAM
    const out = exportfuncs.exportGBC(last, sys);
    const tiles = (sys.width / block.w) * (sys.height / block.h);
    t.equal(tiles, 256, '128x128 is exactly 256 tiles');
    t.equal(out.length, tiles * 16 + tiles + 8 * 4 * 2, 'native export size');

    const attrOffset = tiles * 16;
    let badAttr = 0;
    for (let i = 0; i < tiles; i++) {
        const attr = out[attrOffset + i];
        if (attr > 7) badAttr++;
    }
    t.equal(badAttr, 0, 'all tilemap attribute palette numbers are in range');

    t.comment(`gb.color.tiles converged in ${iters} iters, ${out.length} exported bytes`);
});

// Game Boy Classic tile export: one global 4-shade palette, 2bpp tile data,
// and an identity tile-index map that fits in a single byte per cell.
t.test('gb.tiles export', async t => {
    const { dt, last, iters } = await converge('gb.tiles');
    const settings = dt.sysparams;

    const out = exportfuncs.exportGBTiles(last, settings);
    const tiles = (settings.width / 8) * (settings.height / 8);
    t.equal(tiles, 256, '128x128 is exactly 256 tiles');
    t.equal(out.length, tiles * 16 + tiles, 'native export size (tiles + map)');

    // BG map is the identity 0..255
    let badMap = 0;
    for (let i = 0; i < tiles; i++) {
        if (out[tiles * 16 + i] !== i) badMap++;
    }
    t.equal(badMap, 0, 'BG map tile indices are the identity mapping');

    t.comment(`gb.tiles converged in ${iters} iters, ${out.length} exported bytes`);
});
