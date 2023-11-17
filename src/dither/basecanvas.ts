import { getChoices, getClosestRGB, getRGBADiff, getRGBAErrorPerceptual } from "../common/color";
import { DitherKernel, DithertronSettings, RGBDistanceFunction } from "../common/types";
import { range } from "../common/util";

const THRESHOLD_MAP_4X4 = [
    0, 8, 2, 10,
    12, 4, 14, 6,
    3, 11, 1, 9,
    15, 7, 13, 5,
];

export class BaseDitheringCanvas {
    sys: DithertronSettings;
    pal: Uint32Array;
    img: Uint32Array;
    ref: Uint32Array;
    alt: Uint32Array;
    err: Float32Array; // (n*3)
    indexed: Uint8Array;
    width: number; // integer
    height: number;
    tmp: Uint8ClampedArray;
    tmp2: Uint32Array;
    changes: number;
    noise: number = 0;
    diffuse: number = 0.8;
    ordered: number = 0.0;
    ditherfn: DitherKernel = [];
    errfn: RGBDistanceFunction = getRGBAErrorPerceptual;
    errorThreshold = 0;
    iterateCount: number = 0;
    params: Uint32Array;

    constructor(img: Uint32Array, width: number, pal: Uint32Array) {
        this.img = img;
        for (var i = 0; i < pal.length; i++)
            pal[i] |= 0xff000000;
        this.pal = new Uint32Array(pal);
        this.width = width;
        this.height = Math.floor(img.length / width);
        this.tmp = new Uint8ClampedArray(4);
        this.tmp2 = new Uint32Array(this.tmp.buffer);
        this.ref = new Uint32Array(img);
        this.alt = new Uint32Array(this.ref);
        this.err = new Float32Array(this.ref.length * 3);
        this.indexed = new Uint8Array(this.ref.length);
        this.changes = 0;
        this.reset();
    }
    reset() {
        this.img = new Uint32Array(this.ref);
        this.alt.set(this.ref);
        this.err.fill(0);
        this.indexed.fill(0);
        this.changes = 0;
    }
    init() {
    }
    update(offset: number) {
        var errofs = offset * 3;
        var rgbref = this.ref[offset];
        // add cumulative error to pixel color, store into a clamped R,G, and B values (0-255) array
        var ko = 1;
        if (this.ordered > 0) {
            let x = (offset % this.width) & 3;
            let y = (offset / this.width) & 3;
            ko = 1 + (THRESHOLD_MAP_4X4[x + y * 4] / 15 - 0.5) * this.ordered;
        }
        this.tmp[0] = (rgbref & 0xff) * ko + this.err[errofs];
        this.tmp[1] = ((rgbref >> 8) & 0xff) * ko + this.err[errofs + 1];
        this.tmp[2] = ((rgbref >> 16) & 0xff) * ko + this.err[errofs + 2];
        // store the error-modified color
        this.alt[offset] = this.tmp2[0];
        // find closest palette color
        var valid = this.getValidColors(offset);
        var palidx = this.getClosest(this.tmp2[0], valid);
        var rgbimg = this.pal[palidx];
        // compute error and distribute to neighbors
        var err = getRGBADiff(rgbref, rgbimg);
        for (var i = 0; i < 3; i++) {
            var k = (this.err[errofs + i] + err[i]) * this.diffuse;
            // TODO: don't wrap off right edge?
            this.ditherfn.forEach((df) => {
                this.err[errofs + i + (df[0] + df[1] * this.width) * 3] += k * df[2];
            });
            this.err[errofs + i] = 0; // reset this pixel's error
        }
        // set new pixel rgb
        const errmag = (Math.abs(err[0]) + Math.abs(err[1]*2) + Math.abs(err[2])) / (256 * 4);
        if (this.indexed[offset] != palidx && errmag >= this.errorThreshold) {
            this.indexed[offset] = palidx;
            this.changes++;
        }
        this.img[offset] = rgbimg;
        //this.img[offset] = this.tmp2[0] | 0xff000000;
    }
    getClosest(rgb: number, inds: number[]) {
        return getClosestRGB(rgb, inds, this.pal, this.errfn);
    }
    iterate() {
        this.changes = 0;
        for (var i = 0; i < this.img.length; i++) {
            this.update(i);
        }
        this.commit();
        this.iterateCount++;
    }
    commit() {
        //
    }
    getValidColors(offset: number): number[] {
        return range(0, this.pal.length);
    }
}

export abstract class ParamDitherCanvas extends BaseDitheringCanvas {
    params: Uint32Array = new Uint32Array(0);

    abstract guessParam(paramIndex: number): void;

    abstract init();

    commit() {
        for (var i = 0; i < this.params.length; i++) {
            this.guessParam(i);
        }
    }
}

export abstract class BasicParamDitherCanvas extends ParamDitherCanvas {
    abstract w: number;
    abstract h: number;

    init() {
        this.params = new Uint32Array(this.width * this.height / this.w);
        for (var i = 0; i < this.params.length; i++) {
            this.guessParam(i);
        }
    }
}

// TODO: both colors affected by bright bit
export abstract class TwoColor_Canvas extends BasicParamDitherCanvas {
    ncols: number = 0;
    nrows: number = 0;
    border: number = 0;
    allColors: number[] | null = null;

    init() {
        if (!this.allColors) this.allColors = range(0, this.pal.length);
        this.indexed.fill(this.allColors[0]);
        this.ncols = this.width / this.w;
        this.nrows = this.height / this.h;
        this.params = new Uint32Array(this.ncols * this.nrows);
        for (var i = 0; i < this.params.length; i++) {
            this.guessParam(i);
        }
    }
    getValidColors(offset: number) {
        var col = Math.floor(offset / this.w) % this.ncols;
        var row = Math.floor(offset / (this.width * this.h));
        var i = col + row * this.ncols;
        var c1 = this.params[i] & 0xff;
        var c2 = (this.params[i] >> 8) & 0xff;
        return [c1, c2];
    }
    guessParam(p: number) {
        var col = p % this.ncols;
        var row = Math.floor(p / this.ncols);
        var offset = col * this.w + row * (this.width * this.h);
        var colors = this.allColors!;
        var histo = new Uint32Array(256);
        // pixel overlap in 8x8 window
        var b = this.border; // border
        for (var y = -b; y < this.h + b; y++) {
            var o = offset + y * this.width;
            for (var x = -b; x < this.w + b; x++) {
                var c1 = this.indexed[o + x] | 0;
                histo[c1] += 100;
                var c2 = this.getClosest(this.alt[o + x] | 0, colors);
                histo[c2] += 1 + this.noise;
            }
        }
        var choices = getChoices(histo);
        this.updateParams(p, choices);
    }
    updateParams(p: number, choices: { ind: number }[]) {
        var ind1 = choices[0].ind;
        var ind2 = choices[1] ? choices[1].ind : ind1;
        if (ind1 > ind2) {
            var tmp = ind1;
            ind1 = ind2;
            ind2 = tmp;
        }
        this.params[p] = ind1 + (ind2 << 8);
    }
}

export abstract class OneColor_Canvas extends TwoColor_Canvas {
    bgColor: number = 0;

    init() {
        /*
        var choices = reducePaletteChoices(this.ref, this.pal, 2, 1, this.errfn);
        this.bgColor = choices[choices.length-1].ind;
        this.allColors = [1,2,3,4,5,6,7].filter(x => x != this.bgColor);
        console.log(this.bgColor, this.allColors);
        */
        this.bgColor = 0;
        super.init();
    }
    getValidColors(offset: number) {
        return [this.bgColor, super.getValidColors(offset)[0]];
    }
    updateParams(p: number, choices: { ind: number }[]) {
        for (let c of choices) {
            if (c.ind != this.bgColor) {
                this.params[p] = c.ind;
                break;
            }
        }
    }
}