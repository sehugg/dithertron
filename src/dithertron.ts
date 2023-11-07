
const emglobal : any = this['window'] || (this as any)['global'] || this;
const ENVIRONMENT_IS_WEB = typeof window === 'object';
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';

function sqr(x:number) { return x*x; }
function range(start:number,end:number) : number[] {
    var arr = [];
    for (var i=start; i<end; i++) { arr.push(i); }
    return arr;
}

interface DithertronSettings {
    id: string;
    name: string;
    width: number;
    height: number;
    conv: string; //new (...args: any[]) => DitheringCanvas;
    pal: number[] | Uint32Array;

    scaleX?: number; // aspect ratio for screen pixels
    errfn?: string; //(rgb:number,rgb2:number) => number;
    reduce?: number;
    extraColors?: number;
    diffuse?: number;
    ordered?: number;
    noise?: number;
    paletteDiversity?: number;
    ditherfn?: DitherKernel;
    block?: {w:number, h:number, colors:number, cbw?:number, cbh?:number};
    toNative?: string;
    exportFormat?: PixelEditorImageFormat;
}

interface PixelsAvailableMessage {
    img : Uint32Array;
    width : number;
    height : number;
    pal : Uint32Array;
    indexed : Uint8Array;
    params : Uint32Array;
    final : boolean;
}

type DitherKernel = number[][];
interface DitherSetting {
    name: string;
    kernel: DitherKernel;
}
type RGBDistanceFunction = (a:number,b:number) => number;

const THRESHOLD_MAP_4X4 = [
    0,8,2,10,
    12,4,14,6,
    3,11,1,9,
    15,7,13,5,
];

class DitheringCanvas {
    pal:Uint32Array;
    img:Uint32Array;
    ref:Uint32Array;
    alt:Uint32Array;
    err:Float32Array; // (n*3)
    indexed:Uint8Array;
    width:number; // integer
    height:number;
    tmp:Uint8ClampedArray;
    tmp2:Uint32Array;
    changes : number;
    noise : number = 0;
    diffuse : number = 0.8;
    ordered : number = 0.0;
    ditherfn : DitherKernel = [];
    errfn : RGBDistanceFunction = getRGBAErrorPerceptual;
    iterateCount : number = 0;

    constructor(img:Uint32Array, width:number, pal:Uint32Array) {
        this.img = img;
        for (var i=0; i<pal.length; i++)
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
        var errofs = offset*3;
        var rgbref = this.ref[offset];
        // add cumulative error to pixel color, store into a clamped R,G, and B values (0-255) array
        var ko = 1;
        if (this.ordered > 0) {
            let x = (offset % this.width) & 3;
            let y = (offset / this.width) & 3;
            ko = 1 + (THRESHOLD_MAP_4X4[x + y*4] / 15 - 0.5) * this.ordered;
        }
        this.tmp[0] = (rgbref & 0xff) * ko + this.err[errofs];
        this.tmp[1] = ((rgbref>>8) & 0xff) * ko + this.err[errofs+1];
        this.tmp[2] = ((rgbref>>16) & 0xff) * ko + this.err[errofs+2];
        // store the error-modified color
        this.alt[offset] = this.tmp2[0];
        // find closest palette color
        var valid = this.getValidColors(offset);
        var palidx = this.getClosest(this.tmp2[0], valid);
        var rgbimg = this.pal[palidx];
        // compute error and distribute to neighbors
        var err = getRGBADiff(rgbref, rgbimg);
        for (var i=0; i<3; i++) {
            var k = (this.err[errofs+i] + err[i]) * this.diffuse;
            // TODO: don't wrap off right edge?
            this.ditherfn.forEach((df) => {
                this.err[errofs + i + (df[0] + df[1]*this.width)*3] += k * df[2];
            });
            this.err[errofs+i] = 0; // reset this pixel's error
        }
        // set new pixel rgb
        if (this.indexed[offset] != palidx) {
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
        for (var i=0; i<this.img.length; i++) {
            this.update(i);
        }
        this.commit();
        this.iterateCount++;
    }
    commit() {
        //
    }
    getValidColors(offset:number) : number[] {
        return range(0, this.pal.length);
    }
}

abstract class ParamDitherCanvas extends DitheringCanvas {
    params : Uint32Array = new Uint32Array(0);
    abstract w : number;
    abstract h : number;

    abstract guessParam(paramIndex: number) : void;

    init() {
        this.params = new Uint32Array(this.width*this.height/this.w);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
    commit() {
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
}

// TODO: both colors affected by bright bit
abstract class TwoColor_Canvas extends ParamDitherCanvas {
    ncols : number = 0;
    nrows : number = 0;
    border : number = 0;
    allColors : number[] | null = null;

    init() {
        if (!this.allColors) this.allColors = range(0, this.pal.length);
        this.indexed.fill(this.allColors[0]);
        this.ncols = this.width / this.w;
        this.nrows = this.height / this.h;
        this.params = new Uint32Array(this.ncols * this.nrows);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
    getValidColors(offset: number) {
        var col = Math.floor(offset / this.w) % this.ncols;
        var row = Math.floor(offset / (this.width * this.h));
        var i = col + row*this.ncols;
        var c1 = this.params[i] & 0xff;
        var c2 = (this.params[i] >> 8) & 0xff;
        return [c1, c2];
    }
    guessParam(p: number) {
        var col = p % this.ncols;
        var row = Math.floor(p / this.ncols);
        var offset = col*this.w + row*(this.width*this.h);
        var colors = this.allColors!;
        var histo = new Uint32Array(256);
        // pixel overlap in 8x8 window
        var b = this.border; // border
        for (var y=-b; y<this.h+b; y++) {
            var o = offset + y*this.width;
            for (var x=-b; x<this.w+b; x++) {
                var c1 = this.indexed[o+x]|0;
                histo[c1] += 100;
                var c2 = this.getClosest(this.alt[o+x]|0, colors);
                histo[c2] += 1 + this.noise;
            }
        }
        var choices = getChoices(histo);
        this.updateParams(p, choices);
    }
    updateParams(p: number, choices: {ind:number}[]) {
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
abstract class OneColor_Canvas extends TwoColor_Canvas {
    bgcolor : number = 0;

    init() {
        /*
        var choices = reducePaletteChoices(this.ref, this.pal, 2, 1, this.errfn);
        this.bgcolor = choices[choices.length-1].ind;
        this.allColors = [1,2,3,4,5,6,7].filter(x => x != this.bgcolor);
        console.log(this.bgcolor, this.allColors);
        */
        this.bgcolor = 0;
        super.init();
    }
    getValidColors(offset: number) {
        return [this.bgcolor, super.getValidColors(offset)[0]];
    }
    updateParams(p: number, choices: {ind:number}[]) {
        for (let c of choices) {
            if (c.ind != this.bgcolor) {
                this.params[p] = c.ind;
                break;
            }
        }
    }
}
class Teletext_Canvas extends OneColor_Canvas {
    w=2;
    h=3;
}
class VDPMode2_Canvas extends TwoColor_Canvas {
    w=8;
    h=1;
}
class C64HiresFLI_Canvas extends TwoColor_Canvas {
    w=8;
    h=1;
}
class VCSColorPlayfield_Canvas extends TwoColor_Canvas {
    w=40;
    h=1;
}
class ZXSpectrum_Canvas extends TwoColor_Canvas {
    w=8;
    h=8;
}
class Compucolor_Canvas extends TwoColor_Canvas {
    w=2;
    h=4;
}
class Apple2_Canvas extends TwoColor_Canvas {
    w=7;
    h=1;
    allColors = [0,1,2,3,4,5];
    guessParam(p: number) {
        var offset = p * this.w;
        var colors = this.allColors;
        var histo = new Uint32Array(16);
        for (var i=0; i<this.w; i++) {
            var c1 = this.indexed[offset+i]|0;
            histo[c1] += 100;
            var c2 = this.getClosest(this.alt[offset+i]|0, colors);
            histo[c2] += 1 + this.noise;
        }
        var hibit = histo[3]+histo[4] > histo[1]+histo[2];
        this.params[p] = hibit ? 1 : 0;
    }
    getValidColors(offset: number) {
        var i = Math.floor(offset / this.w);
        var hibit = (this.params[i] & 1) != 0;
        // hi bit set? (covers 2 bytes actually)
        if (hibit)
            return [0, 3, 4, 5];
        else
            return [0, 1, 2, 5];
    }
}
class VICII_Multi_Canvas extends ParamDitherCanvas {
    w=4;
    h=8;
    allColors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    bgcolor : number = 0;
    auxcolor : number = 0;
    bordercolor : number = 0;
    // TODO: choose global colors before init?
    init() {
        // find global colors
        var choices = reducePaletteChoices(this.ref, this.pal, 3, 1, this.errfn);
        this.bgcolor = choices[0] && choices[0].ind;
        this.auxcolor = choices[1] && choices[1].ind;
        this.bordercolor = choices[2] && choices[2].ind;
        // fill params of subblocks
        this.params = new Uint32Array(this.width/this.w * this.height/this.h + 1);
        for (var i=0; i<this.params.length-1; i++) {
            this.guessParam(i);
        }
        // +1 extra parameter for global colors
        this.params[this.params.length - 1] = this.bgcolor | (this.auxcolor << 4) | (this.bordercolor << 8);
    }
    getValidColors(offset: number) {
        var ncols = this.width / this.w;
        var col = Math.floor(offset / this.w) % ncols;
        var row = Math.floor(offset / (this.width*this.h));
        var i = col + row*ncols;
        var c1 = this.params[i] & 0xf;
        var c2 = (this.params[i] >> 4) & 0xf;
        var c3 = (this.params[i] >> 8) & 0xf;
        return [this.bgcolor, c1, c2, c3];
    }
    guessParam(p: number) {
        if (p == this.params.length - 1) return; // don't mess with last param
        var ncols = this.width / this.w;
        var col = p % ncols;
        var row = Math.floor(p / ncols);
        var offset = col*this.w + row*this.width*this.h;
        // rank all colors
        var histo = new Uint32Array(16);
        var w = this.w;
        var h = this.h;
        var b = 2; // border
        for (var y=-b; y<h+b; y++) {
            var o = offset + y*this.width;
            for (var x=-b; x<w+b; x++) {
                this.updateHisto(histo, this.allColors, o+x);
            }
        }
        // don't worry about global colors
        histo[this.bgcolor] = 0;
        // get best choices for subblock
        var choices = getChoices(histo);
        var ind1 = choices[0] && choices[0].ind;
        var ind2 = choices[1] && choices[1].ind;
        var ind3 = choices[2] && choices[2].ind;
        return this.params[p] = ind1 + (ind2<<4) + (ind3<<8);
    }
    updateHisto(histo: Uint32Array, colors: number[], i: number) {
        // get current color (or reference for 1st time)
        var c1 = this.indexed[i]|0;
        histo[c1] += 100;
        // get error color (TODO: why alt not img like 2-color kernels?)
        var rgbcomp = this.alt[i]|0;
        var c2 = this.getClosest(rgbcomp, colors);
        histo[c2] += 1 + this.noise;
    }
}

class VICII_Multi_CanvasFLI extends ParamDitherCanvas {
    // FLI allows for the color choices of pixel values %01/%10 to change PER row as the
    // screen address where the color information is stored is changable for each scan line
    // BUT the color ram for the %11 is not an address that can be changed so the
    // color ram applies to the entire 4x8 macro block

    // pixel values:
    // %00 = background color (global value)
    // %01 = upper nybble of screen block (changable per row 4x1 block size)
    // %10 = lower nybble of screen block (changable only at the 4x8 block size)
    // %11 = lower nybble of color ram

    w=4;
    h=1;
    // NOTE: cb = "color block"
    cbw=4;
    cbh=8;
    cbOffset: number = 0    // the offset into the params array for the color block ram
    allColors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    bgcolor : number = 0;
    auxcolor : number = 0;
    bordercolor : number = 0;

    logged : number = 0;

    // TODO: choose global colors before init?
    init() {
        // find global colors
        var choices = reducePaletteChoices(this.ref, this.pal, 3, 1, this.errfn);
        this.bgcolor = choices[0] && choices[0].ind;
        this.auxcolor = choices[1] && choices[1].ind;
        this.bordercolor = choices[2] && choices[2].ind;
        // fill params of subblocks
        this.params = new Uint32Array((this.width/this.w * this.height/this.h) + (this.width/this.cbw * this.height/this.cbh) + 1);
        // offset into the first byte of the color ram
        this.cbOffset = (this.width/this.w * this.height/this.h);
        for (var i=0; i<this.params.length-1; i++) { // -1 to not factor in the "extra" byte
            this.guessParam(i);
        }
        // +1 extra parameter for global colors
        this.params[this.params.length - 1] = this.bgcolor | (this.auxcolor << 4) | (this.bordercolor << 8);
    }
    getValidColors(index: number) {
        var p = this.imageIndexToParamOffset(index);
        var c1 = this.params[p] & 0xf;
        var c2 = (this.params[p] >> 4) & 0xf;
        var c3 = (this.params[p] >> 8) & 0xf;
        var valid = [this.bgcolor, c1, c2, c3];
        return valid;
    }
    guessParam(pUnknown: number) {
        if (pUnknown == this.params.length - 1) return; // don't mess with last param

        // freeze color block ram after a certain # of iterations
        const useCbRam = this.iterateCount < MAX_ITERATE_COUNT/2;

        var isCalculatingCb = (pUnknown >= this.cbOffset);
        if ((isCalculatingCb) && (!useCbRam))
            return;

        var index = this.paramOrCbParamOffsetToImageIndex(pUnknown);

        var cbp = (isCalculatingCb ? pUnknown : this.imageIndexToCbParamOffset(index));
        var p = (isCalculatingCb ? this.imageIndexToParamOffset(index) : pUnknown);

        console.assert( (isCalculatingCb) || (p == pUnknown) );
        console.assert( (!isCalculatingCb) || (cbp == pUnknown) );

        var useWidth = this.w;
        var useHeight = this.h;
        if (isCalculatingCb) {
            useWidth = this.cbw;
            useHeight = this.cbh;
        }

        // rank all colors within the size of the block (and bordering values)
        var histo = new Uint32Array(16);
        // going to scan a pixel area that is the pixel (sub)block in size
        // +/- pixels sampled above/below
        var w = useWidth;
        var h = useHeight;
        var xb = 2; // search the border colors (2 pixels on each side)
        var yb = 0; // search the border colors (none for the y axis)
        for (var y=-yb; y<h+yb; y++) {
            var o = index + y*this.width;  // adjust the image pixel offset accordingly
            for (var x=-xb; x<w+xb; x++) {
                this.updateHisto(histo, this.allColors, o+x);
            }
        }

        // never choose the background color since it's always an available
        // valid color for every pixel (i.e. why waste the screen ram or
        // color block ram on a color that is always available everywhere)
        histo[this.bgcolor] = 0;

        let cbColor : number = 0;

        if ((!isCalculatingCb) && (useCbRam)) {
            // filter out the cb chosen color as there's no point in choosing the
            // same color option twice since it's already valid for this pixel
            // block area (just like the background color is valid)
            histo[this.params[cbp] & 0xf] = 0;
            // promote this value to the lower nybble of the 2nd least significant byte
            // as this value is needed later
            cbColor = this.params[cbp] & 0xf
        }

        // get best choices for sub-block
        var choices = getChoices(histo);
        var ind1 = choices[0] && choices[0].ind;
        var ind2 = choices[1] && choices[1].ind;
        var ind3 = choices[2] && choices[2].ind;
        if (ind1 === undefined)
            ind1 = this.bgcolor;
        if (ind2 === undefined)
            ind2 = this.bgcolor;
        if (ind3 === undefined)
            ind3 = this.bgcolor;

        if (!useCbRam) {
            cbColor = ind3;
        }

        if (isCalculatingCb) {
            this.params[cbp] = ind1;

            // after choosing a new cbp value the affected param colors
            // must be recalculated since they must now exclude the chosen
            // cb color (i.e. why waste param colors on a color that is
            // already available for all pixels in the color block)
            // (i think we're going to re-run guessParam() in future iterations)
            /*
            for (var y = 0; y < this.cbh; ++y) {
                var o = (p - (p%this.w)) + (y * Math.floor(this.width / this.w));
                for (var x = 0; x < this.cbw; ++x) {
                    console.assert(o+x < this.cbOffset);
                    this.guessParam(o+x);
                }
            }
            */
            return cbColor;
        }

        // Store the chosen colors in the lower and upper nybble
        // and put the chosen color block nybble into the low nybble of
        // the 2nd least significant byte. Even though this routine does
        // not use this value anywhere, the value is require on the export
        // routine to determine when char data needs to pick the pixel
        // index of %00 (background) %01 %10 (choice 1+2) and %11 meaning
        // use the color block color as a choice. The export routine is
        // unaware of the separated dedicated color block and only looks
        // for the choice within the normal params area.
        return this.params[p] = (ind1 & 0xf) | ((ind2 << 4) & 0xf0) | ((cbColor << 8) & 0xf00);
    }
    updateHisto(histo: Uint32Array, colors: number[], i: number) {
        // get current color (or reference for 1st time)
        var c1 = (i >= 0 && i < this.indexed.length ? this.indexed[i] : this.pal[this.bgcolor]);
        histo[c1] += 100;
        // get error color (TODO: why alt not img like 2-color kernels?)
        var rgbcomp = (i >= 0 && i < this.indexed.length ? this.alt[i] : this.pal[this.bgcolor]);
        var c2 = this.getClosest(rgbcomp, colors);
        histo[c2] += 1 + this.noise;
    }
    paramOrCbParamOffsetToImageIndex(pUnknown: number): number {
        var isCalculatingCb = (pUnknown >= this.cbOffset);
        var useWidth = this.w;
        var useHeight = this.h;
        var useP = pUnknown;

        if (isCalculatingCb) {
            useWidth = this.cbw;
            useHeight = this.cbh;
            useP = (pUnknown - this.cbOffset);
        }

        var ncols = this.width / useWidth;     // number of pixels in a row
        var col = useP % ncols;                // column for pixel in X direction
        var row = Math.floor(useP / ncols);    // row for pixel in Y direction
        // index is the starting offset representing the image's pixel X/Y
        var index = (col*useWidth) + (row*this.width*useHeight);
        console.assert(index < (this.width * this.height));
        return index;
    }

    imageIndexToParamOffset(index: number): number {
        var ncols = this.width / this.w;
        var col = Math.floor(index / this.w) % ncols;
        var row = Math.floor(index / (this.width * this.h));
        var p = col + row * ncols;
        console.assert(p < this.cbOffset);        
        return p;
    }
    imageIndexToCbParamOffset(index: number): number {
        var ncols = this.width / this.cbw;
        var col = Math.floor(index / this.cbw) % ncols;
        var row = Math.floor(index / (this.width * this.cbh));
        var cbp = this.cbOffset + col + row * ncols;
        console.assert(cbp >= this.cbOffset);
        console.assert(cbp < this.params.length - 1); // -1 is for the extra byte
        return cbp;
    }
}

// TODO: bordercolor and charcolor only first 8 colors
class VIC20_Multi_Canvas extends VICII_Multi_Canvas {
    getValidColors(offset: number) {
        var ncols = this.width / this.w;
        var col = Math.floor(offset / this.w) % ncols;
        var row = Math.floor(offset / (this.width*this.h));
        var i = col + row*ncols;
        var c1 = this.params[i] & 0xf;
        return [this.bgcolor, this.auxcolor, this.bordercolor, c1];
    }
    // TODO
    getLocalColors() {
        return this.allColors.filter((ind) => ind != this.bgcolor && ind != this.auxcolor && ind != this.bordercolor);
    }
}

class NES_Canvas extends ParamDitherCanvas {
    w=16;
    h=16;
    allColors = [0,1,2,3,4];
    init() {
        this.params = new Uint32Array(this.width/this.w * this.height/this.h);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
    getValidColors(offset: number) {
        var ncols = this.width / this.w;
        var col = Math.floor(offset / this.w) % ncols;
        var row = Math.floor(offset / (this.width*this.h));
        var i = col + row*ncols;
        var c1 = this.params[i];
        // param specified which color to leave out
        switch (c1 & 3) {
            case 0: return [0, 2, 3, 4];
            case 1: return [0, 1, 3, 4];
            case 2: return [0, 1, 2, 4];
            case 3: return [0, 1, 2, 3];
        }
        throw new Error("invalid param " + c1);
    }
    guessParam(p: number) {
        var ncols = this.width / this.w;
        var col = p % ncols;
        var row = Math.floor(p / ncols);
        var offset = col*this.w + row*this.width*this.h;
        var colors = [1, 2, 3, 4];
        // rank all colors
        var histo = new Uint32Array(16);
        var b = 8; // border (TODO: param)
        for (var y=-b; y<this.h+b; y++) {
            var o = offset + y*this.width;
            for (var x=-b; x<this.w+b; x++) {
                // get current color (or reference for 1st time)
                var c1 = this.indexed[o+x] | 0;
                histo[c1] += 100;
                // get error color (TODO: why ref works better?)
                var rgbcomp = this.alt[o+x] | 0;
                var c2 = this.getClosest(rgbcomp, colors);
                histo[c2] += 1 + this.noise;
            }
        }
        var choices = getChoices(histo);
        // leave out last color, least frequent
        choices.forEach((ch) => {
            if (ch.ind >= 1 && ch.ind <= 4) this.params[p] = ch.ind - 1;
        });
    }
}

class HAM6_Canvas extends DitheringCanvas {
    getValidColors(offset:number) : number[] {
        let arr = super.getValidColors(offset);
        if (offset == 0) {
            arr = arr.slice(0, 16);
        } else {
            let palindex = 16;
            let prevrgb = this.img[offset-1];
            for (let chan=0; chan<3; chan++) {
                for (let i=0; i<16; i++) {
                    let rgb = prevrgb;
                    rgb &= ~(0xff << (chan*8));
                    rgb |= (i << 4) << (chan*8);
                    this.pal[palindex++] = rgb;
                }
            }
        }
        return arr;
    }
}

//
function getRGBADiff(rgbref: number, rgbimg: number) {
    var err = [0,0,0];
    for (var i=0; i<3; i++) {
        var d = (rgbref & 0xff) - (rgbimg & 0xff);
        err[i] = d;
        rgbref >>= 8;
        rgbimg >>= 8;
    }
    return err;
}
function getRGBAErrorAbsolute(rgbref: number, rgbimg: number) {
    var mag = 0;
    for (var i=0; i<3; i++) {
        var d = (rgbref & 0xff) - (rgbimg & 0xff);
        mag += sqr(d);
        rgbref >>= 8;
        rgbimg >>= 8;
    }
    return Math.sqrt(mag);
}
// TODO???
function getRGBAErrorHue(rgbref: number, rgbimg: number) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    var b = 256;
    var avg1 = (r1+g1+b1)/3 + b;
    var avg2 = (r2+g2+b2)/3 + b;
    r1 /= avg1;
    g1 /= avg1;
    b1 /= avg1;
    r2 /= avg2;
    g2 /= avg2;
    b2 /= avg2;
    //var mag2 = Math.sqrt(sqr(r1-r2)*9 + sqr(g1-g2)*25 + sqr(b1-b2)*4);
    //var mag2 = Math.sqrt(sqr(r1-r2)*3 + sqr(g1-g2)*5 + sqr(b1-b2)*3);
    var mag2 = Math.sqrt(sqr(r1-r2) + sqr(g1-g2) + sqr(b1-b2))*256;
    return mag2;
}
function getRGBAErrorPerceptual(rgbref: number, rgbimg: number) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    var rmean = (r1 + r2) / 2;
    var r = r1 - r2;
    var g = g1 - g2;
    var b = b1 - b2;
    return Math.sqrt((((512+rmean)*r*r)/256) + 4*g*g + (((767-rmean)*b*b)/256));
}
function getRGBAErrorMax(rgbref: number, rgbimg: number) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    return Math.max(Math.abs(r1-r2), Math.abs(g1-g2), Math.abs(b1-b2));
}
function intensity(rgb: number) {
    return getRGBAErrorPerceptual(0, rgb);
}
const ERROR_FUNCTIONS = {
    'perceptual': getRGBAErrorPerceptual,
    'hue': getRGBAErrorHue,
    'dist': getRGBAErrorAbsolute,
    'max': getRGBAErrorMax,
}

function getRGBAErrorArr(a: number, b: number) {
    var err = [0,0,0];
    for (var i=0; i<3; i++) {
        err[i] = ((a & 0xff) - (b & 0xff));
        a >>= 8;
        b >>= 8;
    }
    return err;
}
function getClosestRGB(rgb:number, inds:number[], pal:Uint32Array, distfn:RGBDistanceFunction) {
    var best = 9999999;
    var bestidx = -1;
    for (var i=0; i<inds.length; i++) {
        let ind = inds[i];
        if (ind >= 0) {
            var col = pal[inds[i]];
            var score = distfn(rgb, col);
            if (score < best) {
                best = score;
                bestidx = inds[i];
            }
        }
    }
    return bestidx;
}
function scoreRGBDistances(rgb:number, inds:number[], pal:Uint32Array, distfn:RGBDistanceFunction) {
    let scores = [];
    for (let i=0; i<inds.length; i++) {
        var col = pal[inds[i]];
        var score = distfn(rgb, col);
        scores[i] = {i, ind:inds[i], rgb, col, score};
    }
    return scores;
}

//

function getHistogram(inds: number[]) {
    var histo = new Uint32Array(256);
    inds.forEach((x) => histo[x]++);
    return getChoices(histo);
}
function getChoices(histo: Uint32Array) {
    var choices : {count:number,ind:number}[] = [];
    for (var i=0; i<histo.length; i++) {
        if (histo[i] > 0) {
            choices.push({count:histo[i], ind:i});
        }
    }
    choices.sort((a,b) => b.count - a.count);
    return choices;
}
function rgb2tuple(arr: number[]) {
    return arr.map((x) => [(x>>0) & 0xff, (x>>8) & 0xff, (x>>16) & 0xff]);
}

//

interface ColorChoice {
    ind: number;
    count: number;
}

class Centroid {
    r: number = 0;
    g: number = 0;
    b: number = 0;
    n: number = 0;
    add(rgb: number) {
        this.r += (rgb >> 0) & 0xff;
        this.g += (rgb >> 8) & 0xff;
        this.b += (rgb >> 16) & 0xff;
        this.n++;
    }
    getAvgRGB(k: number) {
        var r = Math.max(0, Math.min(255, this.r * k / this.n));
        var g = Math.max(0, Math.min(255, this.g * k / this.n));
        var b = Math.max(0, Math.min(255, this.b * k / this.n));
        return (r << 0) | (g << 8) | (b << 16);
    }
}

function reducePaletteChoices(imageData: Uint32Array, 
    colors: Uint32Array, 
    count: number, 
    diversity: number,
    distfn: RGBDistanceFunction) : ColorChoice[] 
{
    var histo = new Int32Array(colors.length);
    var err = new Int32Array(4);
    var tmp = new Uint8ClampedArray(4);
    var tmp2 = new Uint32Array(tmp.buffer);
    var bias = diversity*0.5 + 0.5;
    let decay = diversity*0.25 + 0.65;
    // choose initial centroids from palette
    var centroids : Centroid[] = [];
    var inds : number[] = [];
    for (let i=0; i<count; i++) {
        inds.push(Math.floor(i * (colors.length-1) / count));
        centroids.push(new Centroid());
    }
    // iterate over the frame a max. number of items
    for (let iter=0; iter<10; iter++) {
        // iterate over pixels, skipping some for performance
        for (let i=iter; i<imageData.length; i+=(i&15)+1) {
            let rgbref = imageData[i];
            err[0] += rgbref & 0xff;
            err[1] += (rgbref >> 8) & 0xff;
            err[2] += (rgbref >> 16) & 0xff;
            tmp[0] = err[0];
            tmp[1] = err[1];
            tmp[2] = err[2];
            let ind1 = getClosestRGB(tmp2[0], inds, colors, distfn);
            let alt = colors[ind1];
            centroids[inds.indexOf(ind1)].add(tmp2[0]);
            let score = distfn(tmp2[0], alt);
            histo[ind1] += Math.max(0, 256 - score);
            err[0] -= (alt & 0xff);
            err[1] -= ((alt >> 8) & 0xff);
            err[2] -= ((alt >> 16) & 0xff);
            err[0] *= decay;
            err[1] *= decay;
            err[2] *= decay;
        }
        // move colors if the new one is better
        var allinds = range(0, colors.length);
        var nchanged = 0;
        for (let i=0; i<count; i++) {
            // find closest palette color to centroid mean
            let cent = centroids[i];
            let current = colors[inds[i]];
            let ind2 = getClosestRGB(cent.getAvgRGB(bias), allinds, colors, distfn);
            let better = colors[ind2];
            // if it's different, update the color
            if (better != current) {
                inds[i] = ind2;
                nchanged++;
                //console.log(iter, i, inds[i], ind2, score);
            }
            // don't use this color again
            for (let j=0; j<colors.length; j++) {
                if (colors[j] == better) { allinds[j] = -1; }
            }
        }
        if (nchanged == 0) break;
    }
    // sort resulting colors by intensity
    var result = inds.map((ind) => { return {ind, count:histo[ind]} });
    result.sort((a,b) => intensity(colors[a.ind]) - intensity(colors[b.ind]));
    return result;
}

function reducePalette(imageData: Uint32Array,
    colors: Uint32Array,
    count: number,
    diversity: number,
    distfn : RGBDistanceFunction) : Uint32Array 
{
    if (colors.length == count) return new Uint32Array(colors);
    var choices = reducePaletteChoices(imageData, colors, count, diversity, distfn);
    console.log('reducePalette', colors.length, 'to', choices.length);
    return new Uint32Array(choices.map((x) => colors[x.ind]));
}

//

const MAX_ITERATE_COUNT = 100;

interface DithertronInterface {
    iterate() : void;
}

class Dithertron {
    sysparams : DithertronSettings | null = null;
    dithcanv : DitheringCanvas | null = null;
    sourceImageData : Uint32Array | null = null;
    pixelsAvailable : ((msg:PixelsAvailableMessage) => void) | null = null;
    timer : any;

    setSettings(sys : DithertronSettings) {
        this.sysparams = sys;
        this.reset();
    }
    setSourceImage(imageData : Uint32Array) {
        this.sourceImageData = imageData;
        this.reset();
    }
    iterate() : boolean {
        if (this.dithcanv == null) {
            var sys = this.sysparams;
            if (!sys) throw new Error("no sysparams");
            if (!this.sourceImageData) throw new Error("no sourceImageData");
            var pal = new Uint32Array(sys.pal);
            var errfn = (ERROR_FUNCTIONS as any)[sys.errfn || 'perceptual'] || getRGBAErrorPerceptual;
            if (sys.reduce) {
                pal = reducePalette(this.sourceImageData, pal, 
                    sys.reduce, sys.paletteDiversity || 0, errfn);
            }
            if (sys.extraColors) {
                let pal2 = new Uint32Array(pal.length + sys.extraColors);
                pal2.set(pal);
                pal = pal2;
            }
            var convFunction = emglobal[sys.conv];
            if (!convFunction) throw new Error("no convFunction for " + sys.conv);
            this.dithcanv = new convFunction(this.sourceImageData, sys.width, pal);
            if (!this.dithcanv) throw new Error("no convFunction() for " + sys.conv);
            this.dithcanv.errfn = errfn;
            this.dithcanv.noise = sys.noise ? (1 << sys.noise) : 0;
            this.dithcanv.diffuse = (sys.diffuse || 0) + 0;
            this.dithcanv.ordered = (sys.ordered || 0) + 0;
            this.dithcanv.ditherfn = sys.ditherfn || [];
            this.dithcanv.init();
        }
        this.dithcanv.iterate();
        this.dithcanv.noise >>= 1; // divide by 2
        var final = this.dithcanv.changes == 0 || this.dithcanv.iterateCount > MAX_ITERATE_COUNT;
        if (this.pixelsAvailable != null) {
            this.pixelsAvailable({
                img:    this.dithcanv.img,
                width:  this.dithcanv.width,
                height: this.dithcanv.height,
                pal:    this.dithcanv.pal,
                indexed:this.dithcanv.indexed,
                params: (this.dithcanv as ParamDitherCanvas).params,
                final:  final,
            });
        }
        return !final;
    }
    iterateIfNeeded() {
        if (this.iterate()) {
            //console.log(this.dithcanv.noise, this.dithcanv.changes, this.dithcanv.iterateCount);
        } else {
            this.stop();
            console.log('stop', this.dithcanv?.iterateCount);
        }
    }
    reset() {
        this.dithcanv = null;
        this.start();
    }
    stop() {
        clearTimeout(this.timer);
        this.timer = undefined;
    }
    start() {
        if (this.sysparams == null) return;
        if (this.sourceImageData == null) return;
        if (this.timer == null) {
            const msec = 50;
            var fn = () => {
                this.timer = setTimeout(fn, msec);
                this.iterateIfNeeded();
            }
            this.timer = setTimeout(fn, msec);
        }
    }
}

declare function importScripts(path:string):void;
declare function postMessage(msg:any):void;

var worker_dtron = new Dithertron();

onmessage = function(e) {
    if (e && e.data) {
        console.log(e.data.cmd);
        switch (e.data.cmd) {
            case 'reset': return worker_dtron.reset();
            case 'setSettings': return worker_dtron.setSettings(e.data.data);
            case 'setSourceImage': return worker_dtron.setSourceImage(e.data.data);
        }
    }
}

worker_dtron.pixelsAvailable = (msg:PixelsAvailableMessage) => {
    postMessage(msg);
};
