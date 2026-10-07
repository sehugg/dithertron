// Tile reuse as vector quantization: a limited set of tiles (the codebook)
// is shared between all the cells of an image.
//
// A cell does not hand over its pixels, it hands over what each choice would
// cost: costs[(cell * pixels + i) * slots + s] is the error of showing slot `s`
// at pixel `i` of that cell (after the cell's own palette has been applied).
// That keeps the codebook independent of palettes, color spaces and canvases,
// and makes the tile update exact even when cells use different palettes.

export interface TileCodebookOptions {
    max: number;            // most tiles the codebook may hold
    flipX?: boolean;        // cells may use a tile mirrored left-right
    flipY?: boolean;        // cells may use a tile mirrored top-bottom
    switchRatio?: number;   // keep a cell's tile unless a new one costs less than this fraction of it
    maxPasses?: number;     // assign/update rounds per fit()
}

export const TILE_FLIP_X = 1;
export const TILE_FLIP_Y = 2;

const EPSILON = 1e-6;

export class TileCodebook {
    readonly pixels: number;
    readonly tiles: Uint8Array[] = [];  // slot per tile pixel
    assign = new Uint16Array(0);        // tile index per cell
    orient = new Uint8Array(0);         // TILE_FLIP_* bits per cell
    totalCost = 0;

    private readonly orients: number[] = [0];
    private readonly perms: Uint16Array[] = [];     // cell pixel -> tile pixel, per orientation
    private readonly switchRatio: number;
    private readonly maxPasses: number;

    constructor(readonly w: number, readonly h: number, readonly slots: number, readonly opts: TileCodebookOptions) {
        this.pixels = w * h;
        this.switchRatio = opts.switchRatio ?? 0.97;
        this.maxPasses = opts.maxPasses ?? 8;
        if (opts.flipX) this.orients.push(TILE_FLIP_X);
        if (opts.flipY) this.orients.push(TILE_FLIP_Y);
        if (opts.flipX && opts.flipY) this.orients.push(TILE_FLIP_X | TILE_FLIP_Y);
        for (let o = 0; o < 4; o++) {
            const perm = new Uint16Array(this.pixels);
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const tx = (o & TILE_FLIP_X) ? w - 1 - x : x;
                    const ty = (o & TILE_FLIP_Y) ? h - 1 - y : y;
                    perm[y * w + x] = ty * w + tx;
                }
            }
            this.perms.push(perm);
        }
    }

    // Forget all tiles (e.g. when the cell costs have changed meaning).
    reset(): void {
        this.tiles.length = 0;
        this.assign = new Uint16Array(0);
        this.orient = new Uint8Array(0);
        this.totalCost = 0;
    }

    // Fit the codebook to `count` cells. Tiles and assignments from an earlier
    // call are the starting point when the cell count is unchanged, so
    // repeated calls refine rather than reshuffle. Returns the total cost.
    fit(costs: Float32Array, count: number): number {
        const P = this.pixels, S = this.slots;
        if (costs.length < count * P * S)
            throw new Error('cell cost table too small');

        const warm = this.tiles.length > 0 && this.assign.length === count;
        if (!warm) {
            this.assign = new Uint16Array(count);
            this.orient = new Uint8Array(count);
            this.seed(costs, count);
        }

        let previous = Infinity;
        for (let pass = 0; pass < this.maxPasses; pass++) {
            const changed = this.assignCells(costs, count, warm || pass > 0);
            this.updateTiles(costs, count);
            if (this.tiles.length < this.opts.max)
                this.addWorstCellTile(costs, count);
            if (!changed && this.totalCost >= previous - EPSILON)
                break;
            previous = this.totalCost;
        }
        this.totalCost = this.measure(costs, count);
        return this.totalCost;
    }

    // The slot shown at (x, y) of `cell`, after any flip.
    slotAt(cell: number, x: number, y: number): number {
        return this.tiles[this.assign[cell]][this.perms[this.orient[cell]][y * this.w + x]];
    }

    // Cost of showing `tile` (at `orient`) in `cell`, giving up once it exceeds `limit`.
    cellCost(costs: Float32Array, cell: number, tile: Uint8Array, orient: number, limit = Infinity): number {
        const P = this.pixels, S = this.slots;
        const perm = this.perms[orient];
        let base = cell * P * S;
        let sum = 0;
        for (let i = 0; i < P; i++) {
            sum += costs[base + tile[perm[i]]];
            if (sum >= limit)
                return sum;
            base += S;
        }
        return sum;
    }

    private idealTile(costs: Float32Array, cell: number): { tile: Uint8Array, cost: number } {
        const P = this.pixels, S = this.slots;
        const tile = new Uint8Array(P);
        let total = 0;
        for (let i = 0; i < P; i++) {
            const base = (cell * P + i) * S;
            let best = 0;
            for (let s = 1; s < S; s++) {
                if (costs[base + s] < costs[base + best]) best = s;
            }
            tile[i] = best;
            total += costs[base + best];
        }
        return { tile, cost: total };
    }

    // cheapest way to show any existing tile in `cell`
    private bestFor(costs: Float32Array, cell: number, limit = Infinity): { tile: number, orient: number, cost: number } {
        let best = { tile: 0, orient: 0, cost: limit };
        for (let t = 0; t < this.tiles.length; t++) {
            for (const o of this.orients) {
                const c = this.cellCost(costs, cell, this.tiles[t], o, best.cost);
                if (c < best.cost) best = { tile: t, orient: o, cost: c };
            }
        }
        return best;
    }

    // Farthest-point seeding: repeatedly add the ideal tile of the cell the
    // codebook currently serves worst, until the budget is spent or nothing
    // is left to gain. Exact duplicates and mirrored copies gain nothing, so
    // they are folded for free.
    private seed(costs: Float32Array, count: number): void {
        const ideals: { tile: Uint8Array, cost: number }[] = [];
        const minCost = new Float64Array(count).fill(Infinity);
        for (let c = 0; c < count; c++)
            ideals.push(this.idealTile(costs, c));

        while (this.tiles.length < this.opts.max) {
            let pick = -1, gain = EPSILON;
            for (let c = 0; c < count; c++) {
                const g = minCost[c] - ideals[c].cost;
                if (g > gain) { gain = g; pick = c; }
            }
            if (pick < 0)
                break;
            const tile = ideals[pick].tile;
            this.tiles.push(tile);
            for (let c = 0; c < count; c++) {
                for (const o of this.orients) {
                    const cost = this.cellCost(costs, c, tile, o, minCost[c]);
                    if (cost < minCost[c]) minCost[c] = cost;
                }
            }
        }
        if (this.tiles.length === 0)
            this.tiles.push(new Uint8Array(this.pixels));
    }

    private assignCells(costs: Float32Array, count: number, sticky: boolean): boolean {
        let changed = false;
        for (let c = 0; c < count; c++) {
            const best = this.bestFor(costs, c);
            if (sticky) {
                // hysteresis: near-ties would otherwise flip back and forth every pass
                const t = this.assign[c];
                if (t < this.tiles.length) {
                    const current = this.cellCost(costs, c, this.tiles[t], this.orient[c]);
                    if (best.cost > current * this.switchRatio)
                        continue;
                }
            }
            if (this.assign[c] !== best.tile || this.orient[c] !== best.orient)
                changed = true;
            this.assign[c] = best.tile;
            this.orient[c] = best.orient;
        }
        return changed;
    }

    // every tile pixel takes the slot that is cheapest summed over the cells using it
    private updateTiles(costs: Float32Array, count: number): void {
        const P = this.pixels, S = this.slots;
        const sums = this.tiles.map(() => new Float64Array(P * S));
        const used = new Uint32Array(this.tiles.length);
        for (let c = 0; c < count; c++) {
            const t = this.assign[c];
            const perm = this.perms[this.orient[c]];
            const sum = sums[t];
            used[t]++;
            for (let i = 0; i < P; i++) {
                const base = (c * P + i) * S;
                const dest = perm[i] * S;
                for (let s = 0; s < S; s++)
                    sum[dest + s] += costs[base + s];
            }
        }

        // drop unused tiles, renumbering the assignments
        const remap = new Int32Array(this.tiles.length).fill(-1);
        const kept: Uint8Array[] = [];
        for (let t = 0; t < this.tiles.length; t++) {
            if (used[t] === 0)
                continue;
            const tile = this.tiles[t];
            const sum = sums[t];
            for (let i = 0; i < P; i++) {
                let best = 0;
                for (let s = 1; s < S; s++) {
                    if (sum[i * S + s] < sum[i * S + best]) best = s;
                }
                tile[i] = best;
            }
            remap[t] = kept.length;
            kept.push(tile);
        }
        this.tiles.length = 0;
        this.tiles.push(...kept);
        for (let c = 0; c < count; c++)
            this.assign[c] = remap[this.assign[c]];
    }

    // spend a spare tile on the cell that is served worst (after dropping empties)
    private addWorstCellTile(costs: Float32Array, count: number): void {
        let pick = -1, gain = EPSILON, pickTile: Uint8Array | undefined;
        for (let c = 0; c < count; c++) {
            const current = this.cellCost(costs, c, this.tiles[this.assign[c]], this.orient[c]);
            if (current <= gain)
                continue;
            const ideal = this.idealTile(costs, c);
            if (current - ideal.cost > gain) {
                gain = current - ideal.cost;
                pick = c;
                pickTile = ideal.tile;
            }
        }
        if (pick < 0 || !pickTile)
            return;
        this.tiles.push(pickTile);
        this.assign[pick] = this.tiles.length - 1;
        this.orient[pick] = 0;
    }

    private measure(costs: Float32Array, count: number): number {
        let total = 0;
        for (let c = 0; c < count; c++)
            total += this.cellCost(costs, c, this.tiles[this.assign[c]], this.orient[c]);
        return total;
    }
}
