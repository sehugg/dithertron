import t from 'tap';
import { loadDither } from './test-utils';
import { SYSTEMS } from '../src/settings/systems';
import { DithertronSettings } from '../src/common/types';

// Shared table-driven smoke test: dither the same image with every registered
// system and verify structural invariants (dimensions, buffer size, palette
// validity). Split into multiple files so tap can run them in parallel.

export const SMOKE_MAXITERS = 30;
const SMOKE_IMAGE = 'parrot.jpg';

// These systems oscillate between two states and never fully converge with
// default settings (see TODO at src/dither/canvas.ts:287) - don't fail them
// for hitting the iteration cap
const KNOWN_NONCONVERGING = new Set(['zx', 'nes5f']);

// These systems are too slow to run to convergence in a smoke test
// (e.g. snes.8bpp.direct takes ~9s/iteration x up to 100 iterations)
// - run only a few iterations and skip the convergence assertion
const ITERATION_CAP_OVERRIDES: Record<string, number> = {
    'snes.8bpp.direct': 2,
};

function pixelInvariant(sys: DithertronSettings): 'rgb' | 'indexed' {
    // HAM6 canvases write direct RGB values into img, not palette indices
    return sys.conv === 'HAM6_Canvas' ? 'rgb' : 'indexed';
}

export function smokeTestSystem(sys: DithertronSettings): void {
    const sysid = sys.id!;
    t.test(`smoke: ${sysid}`, async t => {
        const dt = await loadDither(sysid, SMOKE_IMAGE);
        let iters = 0;
        dt.clear();
        const cap = ITERATION_CAP_OVERRIDES[sysid] ?? SMOKE_MAXITERS;
        while (dt.iterate() && iters < cap) {
            iters++;
        }
        if (!KNOWN_NONCONVERGING.has(sysid) && cap === SMOKE_MAXITERS) {
            t.ok(iters < SMOKE_MAXITERS, `should converge before ${SMOKE_MAXITERS} iters (took ${iters})`);
        } else {
            t.pass(`iteration cap ${cap} reached (${iters} iters)`);
        }
        const canv = dt.dithcanv!;
        if (canv.img == null) throw new Error('dithcanv.img should not be null');
        t.equal(canv.width, sys.width, 'width matches settings');
        t.equal(canv.height, sys.height, 'height matches settings');
        t.equal(canv.img.length, sys.width! * sys.height!, 'image buffer is w*h');
        // every pixel must be a valid palette index (or valid RGB for HAM6)
        let bad = 0;
        if (pixelInvariant(sys) === 'rgb') {
            for (let i = 0; i < canv.img.length; i++) {
                const u = canv.img[i] >>> 0;
                // high byte must be empty or 0xff alpha (inherited from source image)
                if ((u > 0xffffff) && (u >>> 24) !== 0xff) bad++;
            }
        } else {
            const npal = sys.pal.length;
            const idx = canv.indexed;
            for (let i = 0; i < idx.length; i++) {
                const v = idx[i];
                if (v < 0 || v >= npal) bad++;
            }
        }
        t.equal(bad, 0, 'all pixels are valid palette indices');
        t.comment(`${sysid}: ${iters} iters`);
    });
}

// Split systems into `nchunks` groups by index; returns the group for this file
export function systemChunk(index: number, nchunks: number): DithertronSettings[] {
    return SYSTEMS.filter((sys, i) => sys != null && i % nchunks === index) as DithertronSettings[];
}
