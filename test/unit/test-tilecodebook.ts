import t from 'tap';
import { TileCodebook, TILE_FLIP_X, TILE_FLIP_Y } from '../../src/dither/tilecodebook';

const W = 4, H = 4, P = W * H, S = 4;

// cost table where each cell wants exactly the given slots (0 for the wanted slot, 10 otherwise)
function costsFor(cells: number[][]): Float32Array {
    const costs = new Float32Array(cells.length * P * S);
    cells.forEach((want, c) => {
        for (let i = 0; i < P; i++)
            for (let s = 0; s < S; s++)
                costs[(c * P + i) * S + s] = (s === want[i]) ? 0 : 10;
    });
    return costs;
}

const solid = (s: number) => new Array(P).fill(s);
const ramp = () => Array.from({ length: P }, (_, i) => i % S);
// distinct under all four orientations (unlike ramp, which is symmetric top to bottom)
const corners = () => Array.from({ length: P }, (_, i) => {
    const x = i % W, y = Math.floor(i / W);
    return (x === 0 && y === 0) ? 1 : (x === W - 1 && y === 0) ? 2 : (x === 0 && y === H - 1) ? 3 : 0;
});
const hflip = (cell: number[]) => cell.map((_, i) => cell[(i & ~(W - 1)) + (W - 1 - (i % W))]);
const vflip = (cell: number[]) => cell.map((_, i) => cell[(H - 1 - Math.floor(i / W)) * W + (i % W)]);

t.test('identical cells share one tile', t => {
    const cb = new TileCodebook(W, H, S, { max: 8 });
    const cost = cb.fit(costsFor([ramp(), ramp(), ramp(), ramp()]), 4);
    t.equal(cb.tiles.length, 1);
    t.equal(cost, 0);
    t.same(Array.from(cb.assign), [0, 0, 0, 0]);
    t.same(Array.from(cb.tiles[0]), ramp());
    t.end();
});

t.test('distinct cells keep distinct tiles when the budget allows', t => {
    const cb = new TileCodebook(W, H, S, { max: 8 });
    const cost = cb.fit(costsFor([solid(0), solid(1), solid(2), ramp()]), 4);
    t.equal(cb.tiles.length, 4);
    t.equal(cost, 0);
    t.equal(new Set(cb.assign).size, 4);
    t.end();
});

t.test('budget is respected and the closest tiles are merged', t => {
    // two near-identical groups: one budgeted tile per group is the best answer
    const a = solid(0), a2 = solid(0); a2[0] = 1;
    const b = solid(2), b2 = solid(2); b2[5] = 3;
    const cb = new TileCodebook(W, H, S, { max: 2 });
    cb.fit(costsFor([a, a2, a, b, b2, b]), 6);
    t.equal(cb.tiles.length, 2);
    t.equal(cb.assign[0], cb.assign[1]);
    t.equal(cb.assign[3], cb.assign[4]);
    t.not(cb.assign[0], cb.assign[3]);
    t.equal(cb.totalCost, 20);  // each variant cell misses one pixel
    t.end();
});

t.test('more tiles never cost more', t => {
    const cells: number[][] = [];
    let seed = 1;
    const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    for (let c = 0; c < 40; c++)
        cells.push(Array.from({ length: P }, () => Math.floor(rnd() * S)));
    const costs = costsFor(cells);
    let last = Infinity;
    for (const max of [2, 4, 8, 16, 40]) {
        const cb = new TileCodebook(W, H, S, { max });
        const cost = cb.fit(costs, cells.length);
        t.ok(cb.tiles.length <= max, `max ${max}`);
        t.ok(cost <= last + 1e-6, `cost with ${max} tiles (${cost}) <= ${last}`);
        last = cost;
    }
    t.equal(last, 0);   // a tile per cell is exact
    t.end();
});

t.test('flips fold mirrored cells onto one tile', t => {
    const base = corners();
    const cells = [base, hflip(base), vflip(base), hflip(vflip(base))];

    const none = new TileCodebook(W, H, S, { max: 8 });
    none.fit(costsFor(cells), 4);
    t.equal(none.tiles.length, 4, 'no flips: one tile per cell');

    const hv = new TileCodebook(W, H, S, { max: 8, flipX: true, flipY: true });
    const cost = hv.fit(costsFor(cells), 4);
    t.equal(hv.tiles.length, 1, 'flips: one shared tile');
    t.equal(cost, 0);
    t.equal(new Set(Array.from(hv.orient)).size, 4, 'each cell uses its own orientation');
    t.end();
});

t.test('flipX only does not use vertical flips', t => {
    const base = corners();
    const cb = new TileCodebook(W, H, S, { max: 8, flipX: true });
    cb.fit(costsFor([base, hflip(base), vflip(base)]), 3);
    for (const o of cb.orient)
        t.equal(o & TILE_FLIP_Y, 0);
    t.equal(cb.tiles.length, 2);
    t.ok(cb.orient.some(o => o === TILE_FLIP_X));
    t.end();
});

t.test('shared tile satisfies cells with different palettes', t => {
    // cell 0 and cell 1 see the same pattern but cell 1's palette makes slots 0 and 1 swap meaning
    const cell0 = new Float32Array(P * S), cell1 = new Float32Array(P * S);
    for (let i = 0; i < P; i++) {
        const want = i % 2;
        for (let s = 0; s < S; s++) {
            cell0[i * S + s] = s === want ? 0 : 10;
            cell1[i * S + s] = s === (1 - want) ? 0 : 10;   // inverted palette
        }
    }
    const costs = new Float32Array(2 * P * S);
    costs.set(cell0, 0);
    costs.set(cell1, P * S);
    const cb = new TileCodebook(W, H, S, { max: 1 });
    const cost = cb.fit(costs, 2);
    t.equal(cb.tiles.length, 1);
    t.equal(cost, 160, 'every pixel is right for exactly one of the two cells');
    t.end();
});

t.test('warm start keeps assignments stable', t => {
    const cells = [solid(0), solid(1), solid(0), solid(1), ramp()];
    const costs = costsFor(cells);
    const cb = new TileCodebook(W, H, S, { max: 3 });
    cb.fit(costs, cells.length);
    const first = Array.from(cb.assign);
    const cost = cb.totalCost;
    cb.fit(costs, cells.length);
    t.same(Array.from(cb.assign), first);
    t.equal(cb.totalCost, cost);
    t.end();
});
