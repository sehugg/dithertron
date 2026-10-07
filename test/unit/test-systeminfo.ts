import t from 'tap';
import { SYSTEMS } from '../../src/settings/systems';
import { getSystemInfo } from '../../src/settings/systeminfo';

const info = (id: string) => getSystemInfo(SYSTEMS.find((s) => s?.id === id)!);

t.test('plain systems keep their color summary', async t => {
    t.equal(info('nes'), '160 x 96, 4 out of 64 colors');
    t.match(info('c64.multi'), /colors per block/);
});

t.test('tile systems describe palettes and tiles', async t => {
    t.equal(info('nes.tiles'), '256 x 240, 4 out of 64 colors, 4 colors per block, 240 shared tiles for 960 cells');
    t.equal(info('nes.tiles.attr'), '256 x 240, 4 palettes of 4 colors per 16x16, shared backdrop, from 64 colors, 240 shared tiles for 960 cells');
    t.equal(info('gb.color.tiles.unique'), '128 x 128, 8 palettes of 4 colors, from 32768 colors, 256 unique tiles');
    t.match(info('sms.tiles.1pal'), /1 palette of 16 colors/);
});

t.test('every system has an info line', async t => {
    for (const s of SYSTEMS) {
        if (s) t.ok(!/undefined|NaN/.test(getSystemInfo(s)), `${s.id}: ${getSystemInfo(s)}`);
    }
});
