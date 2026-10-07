import t from 'tap';
import { loadDither } from '../test-utils';
import { Dithertron } from '../../src/dither/dithertron';
import * as exportfuncs from '../../src/export/exportfuncs';
import { PixelsAvailableMessage } from '../../src/common/types';
import * as kernels from '../../src/dither/kernels';

async function converge(sysid: string, options: object = {}): Promise<{ dt: Dithertron, last: PixelsAvailableMessage, iters: number }> {
    const dt = await loadDither(sysid, 'parrot.jpg');
    if (Object.keys(options).length) {
        Object.assign(dt.sysparams, options);
        dt.setSettings(dt.sysparams);
    }
    dt.clear();
    let iters = 0;
    while (dt.iterate() && iters < 100) iters++;

    let last: PixelsAvailableMessage | undefined;
    dt.pixelsAvailable = (msg) => { last = msg; };
    dt.iterate();
    return { dt, last: last!, iters };
}

// Redraw one pixel from planar tile data (rows of `planes` bytes, leftmost
// pixel in the high bit), mirroring the tile like the hardware flip flags do.
function tilePixel(out: Uint8Array, planes: number, tile: number, flipX: boolean, flipY: boolean, x: number, y: number): number {
    const px = flipX ? 7 - (x % 8) : x % 8;
    const py = flipY ? 7 - (y % 8) : y % 8;
    let slot = 0;
    for (let plane = 0; plane < planes; plane++)
        slot |= ((out[tile * planes * 8 + py * planes + plane] >> (7 - px)) & 1) << plane;
    return slot;
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
    const canv: any = dt.dithcanv!;
    const block = content.block;
    let outside = 0;
    for (let i = 0; i < canv.indexed.length; i++) {
        const col = Math.floor(i % canv.width / block.w);
        const row = Math.floor(Math.floor(i / canv.width) / block.h);
        const paletteIndex = content.blockParams[row * block.columns + col];
        // working palette is in (palette, slot) order: index = palette * 4 + slot
        if (Math.floor(canv.indexed[i] / content.paletteColors) !== paletteIndex) outside++;
    }
    t.equal(outside, 0, 'all pixels are inside their tile palette');

    // the working palette must match the palette RAM the export will emit
    for (let p = 0; p < palettes.length; p++) {
        for (let c = 0; c < 4; c++) {
            if (last.pal[p * 4 + c] !== canv.basePal[palettes[p][c]]) outside++;
        }
    }
    t.equal(outside, 0, 'working palette matches chosen sub-palettes');

    // native export layout: tile data + tile map + attribute bytes + palette RAM
    const out = exportfuncs.exportGBC(last, sys);
    const cells = (sys.width / block.w) * (sys.height / block.h);
    const tiles = content.tileset.tiles.length;
    t.equal(cells, 360, '160x144 is 20x18 cells');
    t.ok(tiles <= 256, `${tiles} shared tiles fit one tile area`);
    t.equal(out.length, tiles * 16 + cells + cells + 8 * 4 * 2, 'native export size');

    const mapOffset = tiles * 16;
    const attrOffset = mapOffset + cells;
    let badAttr = 0;
    for (let i = 0; i < cells; i++) {
        const attr = out[attrOffset + i];
        const orient = content.tileset.orient[i];
        if ((attr & 7) !== content.blockParams[i] || (attr >> 5) !== orient || (attr & 0x98) !== 0) badAttr++;
        if (out[mapOffset + i] !== content.tileset.assign[i]) badAttr++;
    }
    t.equal(badAttr, 0, 'attributes carry the palette number and flips, the map the tile numbers');

    t.ok(iters < 100, 'converged (did not hit the iteration limit)');
    t.comment(`gb.color.tiles converged in ${iters} iters, ${out.length} exported bytes`);
});

// The export must encode exactly what the old (pre sub-palette refactor) logic
// did: palette RAM from the chosen base colors as RGB555, and 2bpp tile data
// holding each pixel's slot within its tile's palette.
t.test('gb.color.tiles export bytes', async t => {
    const { dt, last } = await converge('gb.color.tiles');
    const canv: any = dt.dithcanv!;
    const content: any = last.content;
    const out = exportfuncs.exportGBC(last, dt.sysparams);
    const cells = content.block.columns * content.block.rows;
    const tiles = content.tileset.tiles.length;

    // palette RAM: old logic looked colors up as basePal[palettes[p][c]]
    let badPal = 0;
    const ramOffset = tiles * 16 + cells * 2;
    for (let p = 0; p < 8; p++) {
        for (let c = 0; c < 4; c++) {
            const rgb = canv.basePal[content.palettes[p][c]];
            const rgb555 = ((rgb & 0xff) >> 3) | (((rgb >> 8 & 0xff) >> 3) << 5) | (((rgb >> 16 & 0xff) >> 3) << 10);
            const ofs = ramOffset + (p * 4 + c) * 2;
            if (out[ofs] !== (rgb555 & 0xff) || out[ofs + 1] !== (rgb555 >> 8)) badPal++;
        }
    }
    t.equal(badPal, 0, 'palette RAM matches the chosen base colors');

    // tile data: redraw every pixel through the map and flips, compare with its index
    let badPixel = 0;
    for (let y = 0; y < content.height; y++) {
        for (let x = 0; x < content.width; x++) {
            const cell = Math.floor(y / 8) * content.block.columns + Math.floor(x / 8);
            const attr = out[tiles * 16 + cells + cell];
            const slot = tilePixel(out, 2, out[tiles * 16 + cell], (attr & 0x20) != 0, (attr & 0x40) != 0, x, y);
            if (slot !== (canv.indexed[y * content.width + x] & 3)) badPixel++;
        }
    }
    t.equal(badPixel, 0, 'tile data holds each pixel\'s slot in its palette');

    // the colors those slots resolve to are the pixels shown on screen
    let badShown = 0;
    for (let i = 0; i < canv.img.length; i++) {
        if (canv.img[i] !== last.pal[canv.indexed[i]]) badShown++;
    }
    t.equal(badShown, 0, 'displayed pixels match palette RAM entries');
});

// Regression: with the UI's default error diffusion and noise, tiles used to
// flip between palettes every pass (choosing from the error-diffused image),
// so the picture flashed and never converged.
t.test('gb.color.tiles converges with diffusion', async t => {
    const { dt, iters } = await converge('gb.color.tiles', {
        diffuse: 0.75, noise: 5, ordered: 0, ditherfn: kernels.SIERRALITE, paletteDiversity: 0.95,
    });
    t.ok(iters < 20, 'converged quickly');
    t.equal(dt.dithcanv!.changes, 0, 'no pixels changing at the end');
    t.comment(`gb.color.tiles with diffusion converged in ${iters} iters`);
});

// Game Boy Classic tile export: one global 4-shade palette, 2bpp tile data
// for the distinct tiles, and a tile-index map with a byte per cell.
t.test('gb.tiles export', async t => {
    const { dt, last, iters } = await converge('gb.tiles');
    const settings = dt.sysparams;
    const content: any = last.content;

    const out = exportfuncs.exportGBTiles(last, settings);
    const cells = (settings.width / 8) * (settings.height / 8);
    const tiles = content.tileset.tiles.length;
    t.equal(cells, 360, '160x144 is 20x18 cells');
    t.ok(tiles <= 256, `${tiles} shared tiles fit one tile area`);
    t.equal(out.length, tiles * 16 + cells, 'native export size (tiles + map)');
    t.ok(content.tileset.orient.every((o: number) => o === 0), 'the DMG has no tile flips');

    // tile data uses Game Boy rows: low plane byte then high plane byte
    const canv: any = dt.dithcanv!;
    let badPixel = 0;
    for (let y = 0; y < settings.height; y++) {
        for (let x = 0; x < settings.width; x++) {
            const cell = Math.floor(y / 8) * 20 + Math.floor(x / 8);
            const slot = tilePixel(out, 2, out[tiles * 16 + cell], false, false, x, y);
            if (slot !== canv.indexed[y * settings.width + x]) badPixel++;
        }
    }
    t.equal(badPixel, 0, 'tile data decodes back to the dithered pixels through the map');

    t.comment(`gb.tiles converged in ${iters} iters, ${tiles} tiles, ${out.length} exported bytes`);
});

// Game Gear: two shared 16-color palettes, 4bpp SMS tiles, 16-bit name table
// entries (palette select in bit 11) and 12-bit CRAM.
t.test('sms-gg.tiles export', async t => {
    const { dt, last, iters } = await converge('sms-gg.tiles', {
        diffuse: 0.75, noise: 5, ordered: 0, ditherfn: kernels.SIERRALITE, paletteDiversity: 0.95,
    });
    const canv: any = dt.dithcanv!;
    const content: any = last.content;
    const cells = content.block.columns * content.block.rows;
    const tiles = content.tileset.tiles.length;

    t.equal(cells, 360, '160x144 is 20x18 cells');
    t.ok(tiles <= 448, `${tiles} shared tiles fit the VDP`);
    t.ok(iters < 20, 'converged quickly with diffusion');
    t.equal(canv.changes, 0, 'no pixels changing at the end');
    t.equal(content.palettesCount, 2, 'two palettes');
    t.equal(content.paletteColors, 16, 'sixteen colors per palette');

    const out = exportfuncs.exportGameGearTiles(last, dt.sysparams);
    t.equal(out.length, tiles * 32 + cells * 2 + 2 * 16 * 2, 'native export size');

    // tile data: four plane bytes per row, leftmost pixel in the high bit, redrawn
    // through the name table (tile index, flips in bits 9-10, palette in bit 11)
    let badPixel = 0;
    let badShown = 0;
    for (let y = 0; y < content.height; y++) {
        for (let x = 0; x < content.width; x++) {
            const cell = Math.floor(y / 8) * content.block.columns + Math.floor(x / 8);
            const entry = out[tiles * 32 + cell * 2] | (out[tiles * 32 + cell * 2 + 1] << 8);
            const slot = tilePixel(out, 4, entry & 0x1ff, (entry & 0x200) != 0, (entry & 0x400) != 0, x, y);
            const index = canv.indexed[y * content.width + x];
            if (slot !== (index & 15)) badPixel++;
            if (((entry >> 11) & 1) !== (index >> 4)) badShown++;
        }
    }
    t.equal(badPixel, 0, 'tile data holds each pixel\'s slot in its palette');
    t.equal(badShown, 0, 'name table has the pixel\'s palette select');

    // CRAM is 12-bit BGR little-endian and matches the working palette
    let badCram = 0;
    const cram = tiles * 32 + cells * 2;
    for (let i = 0; i < 32; i++) {
        const rgb = last.pal[i];
        const want = ((rgb & 0xff) >> 4) | (((rgb >> 8 & 0xff) >> 4) << 4) | (((rgb >> 16 & 0xff) >> 4) << 8);
        if (out[cram + i * 2] !== (want & 0xff) || out[cram + i * 2 + 1] !== (want >> 8)) badCram++;
    }
    t.equal(badCram, 0, 'CRAM matches the working palette as 12-bit colors');

    t.comment(`sms-gg.tiles converged in ${iters} iters`);
});

// Master System: same tiles and name table as the Game Gear, 6-bit CRAM.
t.test('sms.tiles export', async t => {
    const { dt, last, iters } = await converge('sms.tiles', {
        diffuse: 0.75, noise: 5, ordered: 0, ditherfn: kernels.SIERRALITE, paletteDiversity: 0.95,
    });
    const canv: any = dt.dithcanv!;
    const content: any = last.content;
    const columns = content.block.columns;
    const cells = columns * content.block.rows;
    const tiles = content.tileset.tiles.length;

    t.equal(cells, 768, '256x192 is 32x24 cells');
    t.ok(tiles <= 448, `${tiles} shared tiles fit the VDP`);
    t.ok(content.tileset.orient.some((o: number) => o !== 0), 'some blocks use flipped tiles');
    t.ok(iters < 20, 'converged quickly with diffusion');
    t.equal(canv.changes, 0, 'no pixels changing at the end');

    const out = exportfuncs.exportMasterSystemTiles(last, dt.sysparams);
    t.equal(out.length, tiles * 32 + cells * 2 + 32, 'native export size (CRAM is one byte per entry)');

    let badPixel = 0;
    let badMap = 0;
    for (let y = 0; y < content.height; y++) {
        for (let x = 0; x < content.width; x++) {
            const cell = Math.floor(y / 8) * columns + Math.floor(x / 8);
            const entry = out[tiles * 32 + cell * 2] | (out[tiles * 32 + cell * 2 + 1] << 8);
            const slot = tilePixel(out, 4, entry & 0x1ff, (entry & 0x200) != 0, (entry & 0x400) != 0, x, y);
            const index = canv.indexed[y * content.width + x];
            if (slot !== (index & 15)) badPixel++;
            if (((entry >> 11) & 1) !== (index >> 4)) badMap++;
        }
    }
    t.equal(badPixel, 0, 'tile data holds each pixel\'s slot in its palette');
    t.equal(badMap, 0, 'name table has the pixel\'s palette select');

    let badCram = 0;
    const cram = tiles * 32 + cells * 2;
    for (let i = 0; i < 32; i++) {
        const rgb = last.pal[i];
        const want = ((rgb & 0xff) >> 6) | (((rgb >> 8 & 0xff) >> 6) << 2) | (((rgb >> 16 & 0xff) >> 6) << 4);
        if (out[cram + i] !== want) badCram++;
    }
    t.equal(badCram, 0, 'CRAM matches the working palette as 00BBGGRR bytes');
    t.comment(`sms.tiles converged in ${iters} iters`);
});

// Neo Geo Pocket Color: sixteen shared 4-color palettes, 2bpp tiles stored as
// 16-bit little-endian rows, 16-bit tilemap entries (palette in bits 9-12) and
// 12-bit palette RAM.
t.test('neo.geopocket export', async t => {
    const { dt, last, iters } = await converge('neo.geopocket', {
        diffuse: 0.75, noise: 5, ordered: 0, ditherfn: kernels.SIERRALITE, paletteDiversity: 0.95,
    });
    const canv: any = dt.dithcanv!;
    const content: any = last.content;
    const columns = content.block.columns;
    const tiles = columns * content.block.rows;

    t.equal(tiles, 380, '160x152 is 20x19 tiles');
    t.ok(tiles <= 512, 'fits in tile RAM');
    t.ok(iters < 20, 'converged quickly with diffusion');
    t.equal(canv.changes, 0, 'no pixels changing at the end');
    t.equal(content.palettesCount, 16, 'sixteen palettes');
    t.equal(content.paletteColors, 4, 'four colors per palette');

    const out = exportfuncs.exportNeoGeoPocketTiles(last, dt.sysparams);
    t.equal(out.length, tiles * 16 + tiles * 2 + 16 * 4 * 2, 'native export size');

    let badPixel = 0;
    let badMap = 0;
    for (let y = 0; y < content.height; y++) {
        for (let x = 0; x < content.width; x++) {
            const tile = Math.floor(y / 8) * columns + Math.floor(x / 8);
            const word = out[tile * 16 + (y % 8) * 2] | (out[tile * 16 + (y % 8) * 2 + 1] << 8);
            const slot = (word >> ((7 - (x % 8)) * 2)) & 3;
            const index = canv.indexed[y * content.width + x];
            if (slot !== (index & 3)) badPixel++;

            const entry = out[tiles * 16 + tile * 2] | (out[tiles * 16 + tile * 2 + 1] << 8);
            if ((entry & 0x1ff) !== tile || ((entry >> 9) & 0xf) !== (index >> 2)) badMap++;
        }
    }
    t.equal(badPixel, 0, 'tile rows are 16-bit words with the leftmost pixel in the top bits');
    t.equal(badMap, 0, 'tilemap has identity tile index and the pixel\'s palette in bits 9-12');

    let badCram = 0;
    const cram = tiles * 16 + tiles * 2;
    for (let i = 0; i < 64; i++) {
        const rgb = last.pal[i];
        const want = ((rgb & 0xff) >> 4) | (((rgb >> 8 & 0xff) >> 4) << 4) | (((rgb >> 16 & 0xff) >> 4) << 8);
        if (out[cram + i * 2] !== (want & 0xff) || out[cram + i * 2 + 1] !== (want >> 8)) badCram++;
    }
    t.equal(badCram, 0, 'palette RAM matches the working palette as 12-bit colors');

    t.comment(`neo.geopocket converged in ${iters} iters`);
});

// Genesis: four shared 16-color palette lines whose slot 0 is the shared
// backdrop color, 4bpp linear tiles, big-endian 16-bit tilemap entries (palette
// in bits 13-14) and big-endian 9-bit CRAM (0000BBB0GGG0RRR0).
t.test('genesis.tiles export', async t => {
    const { dt, last, iters } = await converge('genesis.tiles', {
        diffuse: 0.75, noise: 5, ordered: 0, ditherfn: kernels.SIERRALITE, paletteDiversity: 0.95,
    });
    const canv: any = dt.dithcanv!;
    const content: any = last.content;
    const columns = content.block.columns;
    const tiles = columns * content.block.rows;

    t.equal(tiles, 1120, '320x224 is 40x28 tiles');
    t.ok(iters < 20, 'converged quickly with diffusion');
    t.equal(canv.changes, 0, 'no pixels changing at the end');
    t.equal(content.palettesCount, 4, 'four palette lines');
    t.equal(content.paletteColors, 16, 'sixteen colors per line');

    // slot 0 is the same color in every line
    for (let p = 1; p < 4; p++)
        t.equal(last.pal[p * 16], last.pal[0], `line ${p} slot 0 is the shared backdrop`);

    // every color has only 3 bits per channel (8 levels, each recoverable from the top 3 bits)
    const levels = new Set<number>();
    for (let i = 0; i < 64; i++) {
        const rgb = last.pal[i];
        for (const v of [rgb & 0xff, (rgb >> 8) & 0xff, (rgb >> 16) & 0xff])
            levels.add(v);
    }
    t.ok(levels.size <= 8, 'working palette only has 9-bit colors');
    t.equal(new Set(Array.from(levels).map(v => v >> 5)).size, levels.size, 'each level has its own 3-bit value');

    const out = exportfuncs.exportGenesisTiles(last, dt.sysparams);
    t.equal(out.length, tiles * 32 + tiles * 2 + 4 * 16 * 2, 'native export size');

    let badPixel = 0;
    let badMap = 0;
    for (let y = 0; y < content.height; y++) {
        for (let x = 0; x < content.width; x++) {
            const tile = Math.floor(y / 8) * columns + Math.floor(x / 8);
            const byte = out[tile * 32 + (y % 8) * 4 + ((x % 8) >> 1)];
            const nibble = (x & 1) ? (byte & 15) : (byte >> 4);
            const index = canv.indexed[y * content.width + x];
            if (nibble !== (index & 15)) badPixel++;

            const entry = (out[tiles * 32 + tile * 2] << 8) | out[tiles * 32 + tile * 2 + 1];
            if ((entry & 0x7ff) !== tile || ((entry >> 13) & 3) !== (index >> 4)) badMap++;
        }
    }
    t.equal(badPixel, 0, 'tile data is linear 4bpp, leftmost pixel in the high nibble');
    t.equal(badMap, 0, 'tilemap is big-endian with the pixel\'s palette line in bits 13-14');

    let badCram = 0;
    const cram = tiles * 32 + tiles * 2;
    for (let i = 0; i < 64; i++) {
        const rgb = last.pal[i];
        const want = (((rgb & 0xff) >> 5) << 1) | ((((rgb >> 8) & 0xff) >> 5) << 5) | ((((rgb >> 16) & 0xff) >> 5) << 9);
        if ((out[cram + i * 2] << 8 | out[cram + i * 2 + 1]) !== want) badCram++;
    }
    t.equal(badCram, 0, 'CRAM matches the working palette as big-endian 9-bit colors');

    t.comment(`genesis.tiles converged in ${iters} iters`);
});
