import { support } from "jquery";
import { getChoices, getClosestRGB, getRGBADiff, getRGBAErrorPerceptual, reducePaletteChoices, ColorChoice } from "../common/color";
import {
    DitherKernel,
    DithertronSettings,
    RGBDistanceFunction,
    PaletteChoices,
    PaletteRange,
    BlockBasics,
    BlockColors,
    BlockSizing,
    BlockBitOrder,
    BlockColorBleed,
    Param
} from "../common/types";
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
    indexed: Uint32Array;
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
    content(): any { return { params: this.params }; };

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
        this.indexed = new Uint32Array(this.ref.length);
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
    init() : void {
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
        if (this.indexed[offset] != palidx) {
            let shouldChange = (errmag >= this.errorThreshold);
            if (!shouldChange) {
                let existingValue = this.indexed[offset];
                // double check the old value is still legal since changing the value is not desired
                shouldChange = (valid.find((x) => existingValue === x) === undefined);
            }
            if (shouldChange) {
                this.indexed[offset] = palidx;
                this.changes++;
            }
        }
        this.img[offset] = rgbimg;
        //this.img[offset] = this.tmp2[0] | 0xff000000;
    }
    getClosest(rgb: number, inds: number[]) {
        return getClosestRGB(rgb, inds, this.pal, this.errfn);
    }
    iterate() {
        this.changes = 0;
        // WARNING: commit must be called prior to update otherwise the
        // update can happen without the image reflecting the new color
        // choices. Not only is the image seen potentially out of sync for
        // the user, but this can also cause some cell bitmap patterns to
        // fail on some pixels as these pixel chose a color that is not
        // present in the color params.
        this.commit();
        for (var i = 0; i < this.img.length; i++) {
            this.update(i);
        }
        this.iterateCount++;
    }
    commit() {
        //
    }
    getValidColors(imageIndex: number): number[] {
        return range(0, this.pal.length);
    }
}

export interface ParamsContent {
    params: Uint32Array;
};

export abstract class ParamDitherCanvas extends BaseDitheringCanvas {
    params: Uint32Array = new Uint32Array(0);

    abstract guessParam(paramIndex: number): void;

    abstract init(): void;

    override commit(): void {
        for (var i = 0; i < this.params.length; i++) {
            this.guessParam(i);
        }
    }

    override content() : ParamsContent {
        return {
            params: this.params
        };
    }
}

export abstract class BasicParamDitherCanvas extends ParamDitherCanvas {
    abstract w: number;
    abstract h: number;

    override init(): void {
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
    override getValidColors(imageIndex: number) {
        var col = Math.floor(imageIndex / this.w) % this.ncols;
        var row = Math.floor(imageIndex / (this.width * this.h));
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
    override getValidColors(imageIndex: number) {
        return [this.bgColor, super.getValidColors(imageIndex)[0]];
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

export interface BlockParamDitherCanvasContent {
    width: number;
    height: number;

    block: BlockBasics & BlockColors & BlockSizing & BlockBitOrder;
    cb: BlockBasics & BlockSizing & BlockBitOrder;
    cell: BlockBasics & BlockSizing & BlockBitOrder;

    fliMode: boolean;
    fullPaletteMode: boolean;

    paramInfo: Required<Param>;
    
    bitsPerColor: number;
    pixelsPerByte: number;

    // values chosen base on image
    backgroundColor: number;
    auxColor: number;
    borderColor: number;
 
    paletteChoices: PaletteChoices;
    paletteBits: number;
    paletteBitFilter: number;

    blockParams: Uint32Array;
    cbParams: Uint32Array;
    cellParams: Uint32Array;
    extraParams: Uint32Array;
}

export type AddToHistogramFromCurrentColorAtHandler = (x: number, y: number, color: number | undefined, histogram: Uint32Array) => void;
export type AddToHistogramFromClosestAtHandler = (x: number, y: number, closest: ClosestScore | undefined, histogram: Uint32Array) => void;

export abstract class BlockParamDitherCanvas extends BaseDitheringCanvas {
    blockParams: Uint32Array = new Uint32Array(0);
    cbParams: Uint32Array = new Uint32Array(0);
    cellParams: Uint32Array = new Uint32Array(0);
    extraParams: Uint32Array = new Uint32Array(0);

    block: BlockBasics & BlockColors & BlockSizing & BlockColorBleed & BlockBitOrder;
    cb: BlockBasics & BlockSizing & BlockColorBleed & BlockBitOrder;
    cell: BlockBasics & BlockSizing  & BlockColorBleed & BlockBitOrder;

    fliMode: boolean = false;
    fullPaletteMode: boolean = false;

    paramInfo: Required<Param>;
    
    bitsPerColor: number;
    pixelsPerByte: number;

    paletteChoices: PaletteChoices;
    paletteBits = Math.ceil(Math.log2(this.pal.length));
    paletteBitFilter = ((1 << this.paletteBits) - 1);

    // values chosen base on image
    backgroundColor: number = 0;
    auxColor: number = 0;
    borderColor: number = 0;

    content(): BlockParamDitherCanvasContent {
        return {
            width: this.width,
            height: this.height,

            block: this.block,
            cb: this.cb,
            cell: this.cell,

            fullPaletteMode: this.fullPaletteMode,

            fliMode: this.fliMode,
            paramInfo: this.paramInfo,

            bitsPerColor: this.bitsPerColor,
            pixelsPerByte: this.pixelsPerByte,

            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            auxColor: this.auxColor,
            
            paletteChoices: this.paletteChoices,
            paletteBits: this.paletteBits,
            paletteBitFilter: this.paletteBitFilter,

            blockParams: this.blockParams,
            cbParams: this.cbParams,
            cellParams: this.cellParams,
            extraParams: this.extraParams,
        }
    }

    // functions that are designed to be overridden
    override init(): void {
        super.init();        
    }
    abstract prepare(): void;

    abstract prepareDefaults(): void;
    abstract prepareGlobalColorChoices(): void;
    abstract allocateParams(): void;

    abstract currentColorAtXY(x: number, y: number, orColor?: number): number;
    abstract addToHistogramAtXYFromCurrentColor(x: number, y: number, color: number | undefined, histogram: Uint32Array);
    abstract addToHistogramFromClosestAtXY(x: number, y: number, closest: ClosestScore | undefined, histogram: Uint32Array, scores: Uint32Array): void;

    override commit(): void {
        super.commit();
    }

    override getValidColors(imageIndex: number): number[] {
        return super.getValidColors(imageIndex);
    }

    abstract guessBlockParams(): void;
    abstract guessCbParams(): void;
    abstract guessCellParams(): void;
    abstract guessExtraParams(): void;

    abstract guessBlockParam(offset: number): void;
    abstract guessCbParam(offset: number): void;
    abstract guessCellParam(offset: number): void;
    abstract guessExtraParam(offset: number): void;
};

export interface ScoredColorChoice extends ColorChoice {
    score: number
};

export interface BlockInfo extends BlockBasics, BlockSizing {
};

export interface ExtendedBlockInfo extends BlockBasics, BlockSizing, Required<BlockColorBleed> {
};

export interface ClosestScore {
    closestColor: number,
    closestScore: number
};

export function extractColorsFromParam(param: number, totalToExtract: number, paletteBitFilter: number, paletteBits: number): number[] {
    if (0 == totalToExtract)
        return [];

    let value = param;

    let result: number[] = [];
    while (totalToExtract > 0) {
        result.push(value & paletteBitFilter);
        value >>= paletteBits;
        --totalToExtract;
    }
    return result;
}

export function extractColorsFromParamContent(param: number, totalToExtract: number, content: { paletteBitFilter: number, paletteBits: number}): number[] {
    return extractColorsFromParam(param, totalToExtract, content.paletteBitFilter, content.paletteBits);
}

export function extractColorsFromParams(offset: number, params: Uint32Array, totalToExtract: number, paletteBitFilter: number, paletteBits: number): number[] {
    if (0 == totalToExtract)
        return [];
    console.assert(offset < params.length);
    return extractColorsFromParam(params[offset], totalToExtract, paletteBitFilter, paletteBits);
}

export function extractColorsFromParamsContent(offset: number, params: Uint32Array, totalToExtract: number, content: { paletteBitFilter: number, paletteBits: number}): number[] {
    return extractColorsFromParams(offset, params, totalToExtract, content.paletteBitFilter, content.paletteBits);
}

export abstract class CommonBlockParamDitherCanvas extends BlockParamDitherCanvas {

    paletteChoices: Required<PaletteChoices>;
    pixelPaletteChoices: number[];

    // legal color indices for various ranges
    allColors: number[];            // colors for the entire palette range
    backgroundColors: number[];     // colors legal for the background color
    auxColors: number[];            // colors legal for the aux color
    borderColors: number[];         // colors legal for the border color
    blockColors: number[];          // colors legal for block colors (excluding any selectable background, border, aux colors)

    globalValid: number[] = [];     // an array of selectable global colors

    foundColorsByUsage: ColorChoice[] = [];             // which colors best represent the entire image
    foundColorsByColorIntensity: ColorChoice[] = [];    // which colors are most compatible ranked by intensity

    histogramScoreCurrent: number = 100;

    histogram = new Uint32Array(this.pal.length);   // temporary scratch histogram buffer
    scores = new Uint32Array(this.pal.length);      // temporary scratch scores buffer

    firstCommit = false;

    override init() : void {
        this.prepare();
    }
    override prepare() : void {
        super.init();
        this.prepareDefaults();
        this.prepareGlobalColorChoices();
        this.allocateParams();

        let bestPrefill = () => {
            if (this.pixelPaletteChoices.length > 0)
                return this.pixelPaletteChoices[0];
            if (this.allColors.length > 0)
                return this.allColors[0];
            return this.backgroundColor;
        };

        this.indexed.fill(bestPrefill());
    }
    override prepareDefaults(): void {
        this.block = {
            w: (this.sys.block === undefined ?
                    (this.sys.cell === undefined ? this.sys.cb.w : this.sys.cell.w) :
                    this.sys.block.w),
            h: (this.sys.block === undefined ?
                    (this.sys.cell === undefined ? this.sys.cb.h : this.sys.cell.h) :
                    this.sys.block.h),
            colors: (this.sys.block === undefined ? 2 : this.sys.block.colors ),
            xb: (this.sys.block === undefined ?
                    (this.sys.cb === undefined ? 0 :
                        (this.sys.cb.xb === undefined ? 0 : this.sys.cb.xb)) :
                    (this.sys.block.xb === undefined ? 0 : this.sys.block.xb)),
            yb: (this.sys.block === undefined ?
                    (this.sys.cb === undefined ? 0 :
                        (this.sys.cb.yb === undefined ? 0 : this.sys.cb.yb)) :
                    (this.sys.block.yb === undefined ? 0 : this.sys.block.yb)),
            columns: 0,
            rows: 0,
            size: 0,
            msbToLsb: (this.sys.block === undefined ? true : (this.sys.block.msbToLsb === undefined ? true : this.sys.block.msbToLsb))
        };
        this.block.columns = Math.ceil(this.width / this.block.w);
        this.block.rows = Math.ceil(this.height / this.block.h);
        this.block.size = this.block.columns * this.block.rows;

        this.cb = {
            w: (this.sys.cb === undefined ? this.block.w : this.sys.cb.w),
            h: (this.sys.cb === undefined ? this.block.h : this.sys.cb.h),
            xb: (this.sys.cb === undefined ?
                    this.block.xb :
                    (this.sys.cb.xb === undefined ? this.block.xb : this.sys.cb.xb)),
            yb: (this.sys.cb === undefined ?
                    this.block.yb :
                    (this.sys.cb.yb === undefined ? this.block.yb : this.sys.cb.yb)),
            columns: 0,
            rows: 0,
            size: 0,
            msbToLsb: (this.sys.cb === undefined ? true : (this.sys.cb.msbToLsb === undefined ? true : this.sys.cb.msbToLsb))
        };
        this.cb.columns = Math.ceil(this.width / this.cb.w);
        this.cb.rows = Math.ceil(this.height / this.cb.h);
        this.cb.size = this.cb.columns * this.cb.rows;

        this.cell = {
            w: (this.sys.cell === undefined ? this.cb.w : this.sys.cell.w),
            h: (this.sys.cell === undefined ? this.cb.h : this.sys.cell.h),
            xb: (this.sys.cell === undefined ?
                    this.block.xb :
                    (this.sys.cell.xb === undefined ? this.block.xb : this.sys.cell.xb)),
            yb: (this.sys.cell === undefined ?
                    this.block.yb :
                    (this.sys.cell.yb === undefined ? this.block.yb : this.sys.cell.yb)),
            columns: 0,
            rows: 0,
            size: 0,
            msbToLsb: (this.sys.cell === undefined ? true : this.sys.cell.msbToLsb)
        };
        this.cell.columns = Math.ceil(this.width / this.cell.w);
        this.cell.rows = Math.ceil(this.height / this.cell.h);
        this.cell.size = this.cell.rows * this.cell.columns;

        this.fliMode = (this.sys.fli !== undefined);
        this.paramInfo = {
            block: (this.sys.param === undefined ? (this.sys.block !== undefined) : (this.sys.param.block === undefined ? this.sys.block !== undefined : this.sys.param.block)),
            cb: (this.sys.param === undefined ? (this.sys.cb !== undefined) : (this.sys.param.cb === undefined ? this.sys.cb !== undefined : this.sys.param.cb)),
            cell: (this.sys.param === undefined ? false : (this.sys.param.cell === undefined ? false : this.sys.param.cell)),
            extra: (this.sys.param === undefined ? 0 : this.sys.param.extra)
        };

        this.bitsPerColor = Math.ceil(Math.log2(this.block.colors));
        this.pixelsPerByte = Math.floor(8 / this.bitsPerColor);

        console.assert(this.paletteBits > 0);

        this.preparePaletteChoices(this.sys.paletteChoices);

        // if the number of chosen colors is greater than the palette size there's no need to store color choices
        this.fullPaletteMode = (this.paletteChoices.colors >= this.pal.length);
        this.firstCommit = this.paletteChoices.prefillReference;
    }
    spliceColor(color: number, colors: number[]): number[] {
        let found = colors.findIndex((x) => x == color);
        if (found < 0)
            return colors;
        return [... colors.slice(0, found), ... colors.slice(found+1) ];
    }
    preparePixelPaletteChoices(): void {
        let count : number = this.paletteChoices.colorsRange.max - this.paletteChoices.colorsRange.min + 1;
        this.pixelPaletteChoices = range(this.paletteChoices.colorsRange.min, this.paletteChoices.colorsRange.max + 1);

        this.allColors = range(0, this.pal.length);
        this.backgroundColors = range(this.paletteChoices.backgroundRange.min, this.paletteChoices.backgroundRange.max+1);
        this.auxColors = range(this.paletteChoices.auxRange.min, this.paletteChoices.auxRange.max+1);
        this.borderColors = range(this.paletteChoices.borderRange.min, this.paletteChoices.borderRange.max+1);
        this.blockColors = range(this.paletteChoices.colorsRange.min, this.paletteChoices.colorsRange.max+1);
    }
    preparePaletteChoices(options?: Partial<PaletteChoices>):void {
        console.assert(this.pal.length > 0);
        if (options === undefined) {
            this.paletteChoices = {
                prefillReference: false,
                background: false,
                aux: false,
                border:  false,
                backgroundRange: { min: 0, max: this.pal.length - 1 },
                auxRange: { min: 0, max: this.pal.length - 1 },
                borderRange: { min: 0, max: this.pal.length - 1 },
                colors: this.block.colors,
                colorsRange: { min: 0, max: this.pal.length - 1 }
            };
            this.preparePixelPaletteChoices();
            return;
        }
        this.paletteChoices = {
            prefillReference: options.prefillReference === undefined ? false : options.prefillReference,
            background: options.background === undefined ? false : options.background,
            aux: options.aux === undefined ? false : options.aux,
            border:  options.aux === undefined ? false : options.border,
            backgroundRange: options.backgroundRange === undefined ? { min: 0, max: this.pal.length - 1 } : options.backgroundRange,
            auxRange: options.auxRange === undefined ? { min: 0, max: this.pal.length - 1 } : options.auxRange,
            borderRange: options.borderRange === undefined ? { min: 0, max: this.pal.length - 1 } : options.borderRange,
            colors: this.block.colors,
            colorsRange: options.colorsRange === undefined ? { min: 0, max: this.pal.length - 1 } : options.colorsRange
        };

        this.paletteChoices.colors = options.colors === undefined ?
            (this.block.colors - (this.paletteChoices.background ? 1 : 0) - (this.paletteChoices.aux ? 1 : 0) - (this.paletteChoices.border ? 1 : 0)) :
            options.colors;
        this.preparePixelPaletteChoices();

        // some basic sanity checks
        console.assert(this.pal.length > this.paletteChoices.backgroundRange.max - this.paletteChoices.backgroundRange.min);
        console.assert(this.pal.length > this.paletteChoices.auxRange.max - this.paletteChoices.auxRange.min);
        console.assert(this.pal.length > this.paletteChoices.borderRange.max - this.paletteChoices.borderRange.min);
    }
    chooseMin(available: boolean, range: PaletteRange, current?: number): number {
        if (!available)
            return current;
        if (current === undefined)
            return range.min;
        return Math.min(current, range.min);
    }
    chooseMax(available: boolean, range: PaletteRange, current?: number): number {
        if (!available)
            return current;
        if (current === undefined)
            return range.max;
        return Math.max(current, range.max);
    }
    prepareMinMax(background: boolean, aux: boolean, border: boolean): PaletteRange {
        let chosenMin: number | undefined = this.chooseMin(background, this.paletteChoices.backgroundRange);
        chosenMin = this.chooseMin(aux, this.paletteChoices.auxRange, chosenMin);
        chosenMin = this.chooseMin(border, this.paletteChoices.borderRange, chosenMin);
        //chosenMin = this.chooseMin(true, this.paletteChoices.colorsRange, chosenMin); // do not include pixel choices in this range
        chosenMin = chosenMin === undefined ? 0 : chosenMin;

        let chosenMax: number | undefined = this.chooseMax(background, this.paletteChoices.backgroundRange);
        chosenMax = this.chooseMax(aux, this.paletteChoices.auxRange, chosenMax);
        chosenMax = this.chooseMax(border, this.paletteChoices.borderRange, chosenMax);
        //chosenMax = this.chooseMax(true, this.paletteChoices.colorsRange, chosenMax); // do not include pixel choices in this range
        chosenMax = chosenMax === undefined ? (this.pal.length - 1) : chosenMax;

        return {min: chosenMin, max: chosenMax};
    }
    override prepareGlobalColorChoices(): void {
        let range = this.prepareMinMax(true, true, true);
        let palSubset = this.pal.slice(range.min, range.max + 1);

        // by default the choices result is ranked by color intensity
        let choices = reducePaletteChoices(
            this.ref,
            palSubset,
            palSubset.length,  // rank the entire palette subset (because restricted palettes may have to fallback)
            1,
            this.errfn);

        // Need a ranking based on color usage, because if the color
        // is selectable by a pixel then the most prominent selectable
        // color should be chosen (to not waste a color for intensity
        // reasons when a color is most useful as a pixel color choice);
        // but if the color is not selectable by the color then fallback
        // to color intensity (based on which top N colors are the
        // most likely to be compatible with the picture);
        let histoRankedChoices = choices.slice(0, choices.length);
        histoRankedChoices.sort((a,b) => b.count - a.count);

        this.foundColorsByUsage = histoRankedChoices.slice(0, histoRankedChoices.length);
        this.foundColorsByColorIntensity = choices.slice(0, choices.length);

        // these are the possible choices for colors
        let ranges: { id: number, selectable: boolean, range: PaletteRange }[] = [
            { id: 0, selectable: this.paletteChoices.background, range: this.paletteChoices.backgroundRange },
            { id: 1, selectable: this.paletteChoices.aux, range: this.paletteChoices.auxRange },
            { id: 2, selectable: this.paletteChoices.border, range: this.paletteChoices.borderRange }
        ];

        // sort by the follow criteria:
        // 1. colors that can be selected by pixels have priority over those that do not
        // 2. colors that have the most restricted palettes
        // 3. by id (if all other choices are equal)
        ranges.sort((a,b) =>
            (a.selectable == b.selectable) ? 
                (((a.range.max - a.range.min) == (b.range.max - b.range.min)) ?
                    a.id - b.id :
                    (a.range.max - a.range.min) - (b.range.max - b.range.min)) :
                (a.selectable ? -1 : 1));

        let assignId = (choice: ColorChoice, option: { id: number, selectable: boolean, range: PaletteRange }) => {
            let index = choice.ind + range.min; // palette might be a subset

            // do not select the choice if the palette range restrictions do not allow it
            if ((index < option.range.min) || (index > option.range.max))
                return false;

            switch (option.id) {
                case 0: this.backgroundColor = index; break;
                case 1: this.auxColor = index; break;
                case 2: this.borderColor = index; break;
            }
            return true;
        };

        let findBestChoice = (searchList: ColorChoice[], altList: ColorChoice[], option: { id: number, selectable: boolean, range: PaletteRange }) => {
            // based on the priority of the ranges, pick/assign a choice color to each
            // option in the range, starting with the most important first (as
            // defined by the sort order)
            for (let c = 0; c < searchList.length; ++c) {
                let choice = searchList[c];

                // attempt to assign the choice to the color option
                if (!assignId(choice, option))
                    continue;   // if didn't get used, try next color

                // find this color choice in the alternative array (so it can be removed)
                let found = altList.findIndex((x) => x.ind == choice.ind);

                // remove the entry from the alternatively ranked list
                console.assert(found >= 0);
                altList.splice(found, 1);

                // prevent this choice from being used again
                searchList.splice(c, 1);
                break;
            }
        };

        let firstNonSelectableColorFound = false;

        // try to match a color choice with the options available
        for (let i = 0; i < ranges.length; ++i) {
            let option = ranges[i];

            if ((!option.selectable) && (!firstNonSelectableColorFound)) {
                // found all the required colors that can be chosen by a
                // pixel so now re-rank the remaining color choices, putting
                // the top N "compatible" based on picture histo usage at the
                // top of the array, but sorted by intensity
                // (where N is the number of remaining "other" colors to choose);
                let topNChoices : { priority: number, choice: ColorChoice }[] = []
                for (let c = 0; c < ranges.length - i; ++c) {
                    if (c >= histoRankedChoices.length)
                        continue; // make sure the colors are not exhausted

                    // this color is high priority to pick
                    let topChoice = histoRankedChoices[c];
                    let priority = choices.findIndex((x) => x.ind == topChoice.ind);
                    console.assert(priority >= 0);
                    topNChoices.push({priority, choice: topChoice});
                    // removing the choice from the list is okay because it's going to be
                    // re-inserted at the top of the new choices list
                    choices.splice(priority, 1);
                }

                // sort the top choices by intensity
                topNChoices.sort((a,b) => a.priority - b.priority);

                // put the top N at the front of the choices list
                choices = (topNChoices.map((x) => x.choice)).concat(choices);
                firstNonSelectableColorFound = true;
            }

            findBestChoice((option.selectable ? histoRankedChoices : choices), (option.selectable ? choices : histoRankedChoices), option);
            // console.log("findBestChoice", i, option, histoRankedChoices, choices);
        }

        if (this.paletteChoices.background)
            this.globalValid.push(this.backgroundColor);
        if (this.paletteChoices.aux)
            this.globalValid.push(this.auxColor);
        if (this.paletteChoices.border)
            this.globalValid.push(this.borderColor);

        if (this.paletteChoices.background)
            this.pixelPaletteChoices = this.spliceColor(this.backgroundColor, this.pixelPaletteChoices);
        if (this.paletteChoices.aux)
            this.pixelPaletteChoices = this.spliceColor(this.auxColor, this.pixelPaletteChoices);
        if (this.paletteChoices.border)
            this.pixelPaletteChoices = this.spliceColor(this.borderColor, this.pixelPaletteChoices);
    }
    override allocateParams(): void {
        this.blockParams = new Uint32Array(this.paramInfo.block ? this.block.size : 0);
        this.cbParams = new Uint32Array(this.paramInfo.cb ? this.cb.size : 0);
        this.cellParams = new Uint32Array(this.paramInfo.cell ? this.cell.size : 0);
        this.extraParams = new  Uint32Array(this.paramInfo.extra);

        // make the default params refer to the block params
        this.params = this.blockParams;
    }

    imageIndexToInfo(index: number, info: BlockInfo): { column: number, row: number } {
        let column = Math.floor(index / info.w) % info.columns;
        let row = Math.floor(index / (this.width * info.h));
        return { column, row };
    }
    imageIndexToBlockInfo(index: number): { column: number, row: number } {
        return this.imageIndexToInfo(index, this.block);
    }
    imageIndexToCbInfo(index: number): { column: number, row: number } {
        return this.imageIndexToInfo(index, this.cb);
    }
    imageIndexToCellInfo(index: number): { column: number, row: number } {
        return this.imageIndexToInfo(index, this.cell);
    }
    imageIndexToOffset(index: number, info: BlockInfo): number {
        let { column, row } = this.imageIndexToInfo(index, info);
        let offset = row * info.columns + column;
        return offset;
    }

    imageIndexToBlockOffset(index: number): number {
        return this.imageIndexToOffset(index, this.block);
    }
    imageIndexToCbOffset(index: number): number {
        return this.imageIndexToOffset(index, this.cb);
    }
    imageIndexToCellOffset(index: number): number {
        return this.imageIndexToOffset(index, this.cell);
    }

    imageIndexToXY(index: number): { x: number, y: number} {
        return { x: index % this.width, y: Math.floor(index / this.width) };
    }
    xyToImageIndex(x: number, y: number): number | undefined {
        if ((x < 0) || (y < 0))
            return undefined;
        if ((x >= this.width) || (y >= this.height))
            return undefined;
        return y * this.width + x;
    }

    offsetToInfo(offset: number, info: BlockInfo): { column: number, row: number } {
        let column = offset % info.columns;
        let row = Math.floor(offset / info.columns);
        return { column, row };
    }
    offsetToBlockInfo(offset: number): { column: number, row: number } {
        return this.offsetToInfo(offset, this.block);
    }
    offsetToCbInfo(offset: number): { column: number, row: number } {
        return this.offsetToInfo(offset, this.cb);
    }
    offsetToCellInfo(offset: number): { column: number, row: number } {
        return this.offsetToInfo(offset, this.cell);
    }

    offsetToImageIndex(offset: number, info: BlockInfo): number {
        let { column, row } = this.offsetToInfo(offset, info);
        let index = (row * this.width * info.h) + (column * info.w);
        return index;
    }
    blockOffsetToImageIndex(offset: number): number {
        return this.offsetToImageIndex(offset, this.block);
    }
    cbOffsetToImageIndex(offset: number): number {
        return this.offsetToImageIndex(offset, this.cb);
    }
    cellOffsetToImageIndex(offset: number): number {
        return this.offsetToImageIndex(offset, this.cell);
    }

    override currentColorAtXY(x: number, y: number, orColor?: number): number | undefined {
        let imageIndex = this.xyToImageIndex(x, y);
        return (imageIndex === undefined ? orColor : this.indexed[imageIndex]);
    }

    addToHistogramFromCurrentColor(color: number, histogram: Uint32Array) : void {
        console.assert(color < histogram.length);
        histogram[color] += this.histogramScoreCurrent;
    }

    override addToHistogramAtXYFromCurrentColor(x: number, y: number, color: number | undefined, histogram: Uint32Array): void {
        if (color === undefined)
            return;
        this.addToHistogramFromCurrentColor(color, histogram);
    }

    addToHistogramAtOffsetFromCurrentColor(offset: number, info: ExtendedBlockInfo, histogram: Uint32Array, colors?: number[], orColor?: number, fnAddToHistogram?: AddToHistogramFromCurrentColorAtHandler): void {
        let imageIndex = this.offsetToImageIndex(offset, info);
        let start = this.imageIndexToXY(imageIndex);

        for (let y = start.y - info.yb; y < start.y + info.h + info.yb; ++y) {
            for (let x = start.x - info.xb; x < start.x + info.w + info.xb; ++x) {
                let color = this.currentColorAtXY(x, y, orColor);
                if (colors !== undefined) {
                    if (colors.find((x) => x == color) === undefined)
                        continue;
                }

                if (fnAddToHistogram === undefined)
                    this.addToHistogramAtXYFromCurrentColor(x, y, color, histogram);
                else
                    fnAddToHistogram(x, y, color, histogram);
            }
        }
    }
    addToBlockHistogramFromCurrentColor(offset: number, histogram: Uint32Array, colors?: number[], orColor?: number, fnAddToHistogram?: AddToHistogramFromCurrentColorAtHandler): void {
        return this.addToHistogramAtOffsetFromCurrentColor(offset, this.block, histogram, colors, orColor, fnAddToHistogram);
    }
    addToCbHistogramFromCurrentColor(offset: number, histogram: Uint32Array, colors?: number[], orColor?: number, fnAddToHistogram?: AddToHistogramFromCurrentColorAtHandler): void {
        return this.addToHistogramAtOffsetFromCurrentColor(offset, this.cb, histogram, colors, orColor, fnAddToHistogram);
    }
    addToCellHistogramFromCurrentColor(offset: number, histogram: Uint32Array, colors?: number[], orColor?: number, fnAddToHistogram?: AddToHistogramFromCurrentColorAtHandler): void {
        return this.addToHistogramAtOffsetFromCurrentColor(offset, this.cell, histogram, colors, orColor, fnAddToHistogram);
    }

    scoreColorAtXYFrom(x: number, y: number, scores: Uint32Array, colors: number[] | undefined, from: Uint32Array): ClosestScore | undefined {
        let imageIndex = this.xyToImageIndex(x, y);

        if (imageIndex === undefined)
            return undefined;

        let rgb = from[imageIndex];

        let colorToPalIndex = (i: number) => {
            return colors === undefined ? i : colors[i];
        };

        let closestColor = NaN;
        let closestScore = NaN;
        for (let i = 0; i < (colors === undefined ? scores.length : colors.length); ++i) {
            let rgbPalette = this.pal[colorToPalIndex(i)];
            let score = this.errfn(rgb, rgbPalette);
            console.assert(colorToPalIndex(i) < scores.length);
            scores[colorToPalIndex(i)] += score;
            if ((score < closestScore) || (Number.isNaN(closestScore))) {
                closestScore = score;
                closestColor = colorToPalIndex(i);
            }
        }

        return (Number.isNaN(closestColor) ? undefined : { closestColor: closestColor, closestScore: closestScore });
    }
    scoreColorAtXYFromAlt(x: number, y: number, scores: Uint32Array, colors?: number[]): ClosestScore | undefined {
        return this.scoreColorAtXYFrom(x, y, scores, colors, this.alt);
    }
    scoreColorAtXYFromRef(x: number, y: number, scores: Uint32Array, colors?: number[]): ClosestScore | undefined {
        return this.scoreColorAtXYFrom(x, y, scores, colors, this.ref);
    }

    mergeHistogram(dest: Uint32Array, source1: Uint32Array, source2: Uint32Array, colors?: number[]): void {
        console.assert(source1.length == source2.length);
        console.assert(dest.length == source1.length);

        if (colors === undefined) {
            for (let i = 0; i < dest.length; ++i) {
                dest[i] = source1[i] + source2[i];
            }
            return;
        }

        for (let i = 0; i < colors.length; ++i) {
            dest[colors[i]] = source1[colors[i]] + source2[colors[i]];
        }
    }

    addToHistogramFromClosest(closest: ClosestScore, histogram: Uint32Array): void {
        histogram[closest.closestColor] += 1 + this.noise;
    }

    override addToHistogramFromClosestAtXY(x: number, y: number, closest: ClosestScore | undefined, histogram: Uint32Array): void {
        if (closest === undefined)
            return;
        return this.addToHistogramFromClosest(closest, histogram);
    }

    addToHistogramAtOffsetFrom(
        offset: number,
        info: ExtendedBlockInfo,
        histogram: Uint32Array,
        scores: Uint32Array,
        colors: number[] | undefined,
        from: Uint32Array,
        fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {

        let total = 0;

        let imageIndex = this.offsetToImageIndex(offset, info);
        let start = this.imageIndexToXY(imageIndex);

        for (let y = start.y - info.yb; y < start.y + info.h + info.yb; ++y) {
            for (let x = start.x - info.xb; x < start.x + info.w + info.xb; ++x) {
                let closest = this.scoreColorAtXYFrom(x, y, scores, colors, from);
                if (fnAddToHistogram === undefined)
                    this.addToHistogramFromClosestAtXY(x, y, closest, histogram);
                else
                    fnAddToHistogram(x, y, closest, histogram);
            }
        }

        let scored = (colors === undefined ? (range(0, scores.length).map((x) => { return { ind: x, score: scores[x], count: histogram[x] }; })) : (colors.map((x) => { return { ind: x, score: scores[x], count: histogram[x] }; })));
        return scored;
    }

    addToBlockHistogramFrom(offset: number, histogram: Uint32Array, scores: Uint32Array, colors: number[] | undefined, from: Uint32Array, fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.block, histogram, scores, colors, from, fnAddToHistogram);
    }
    addToCbHistogramFrom(offset: number, histogram: Uint32Array, scores: Uint32Array, colors: number[] | undefined, from: Uint32Array, fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.cb, histogram, scores, colors, from, fnAddToHistogram);
    }
    addToCellHistogramFrom(offset: number, histogram: Uint32Array, scores: Uint32Array, colors: number[] | undefined, from: Uint32Array, fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.cell, histogram, scores, colors, from, fnAddToHistogram);
    }

    addToBlockHistogramFromAlt(offset: number, histogram: Uint32Array, scores: Uint32Array, colors?: number[], fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.block, histogram, scores, colors, this.alt, fnAddToHistogram);
    }
    addToCbHistogramFromAlt(offset: number, histogram: Uint32Array, scores: Uint32Array, colors?: number[], fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.cb, histogram, scores, colors, this.alt, fnAddToHistogram);
    }
    addToCellHistogramFromAlt(offset: number, histogram: Uint32Array, scores: Uint32Array, colors?: number[], fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.cell, histogram, scores, colors, this.alt, fnAddToHistogram);
    }

    addToBlockHistogramFromRef(offset: number, histogram: Uint32Array, scores: Uint32Array, colors?: number[], fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset,  this.block, histogram, scores, colors,this.ref, fnAddToHistogram);
    }
    addToCbHistogramFromRef(offset: number, histogram: Uint32Array, scores: Uint32Array, colors?: number[], fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.cb, histogram, scores, colors, this.ref, fnAddToHistogram);
    }
    addToCellHistogramFromRef(offset: number, histogram: Uint32Array, scores: Uint32Array, colors?: number[], fnAddToHistogram?: AddToHistogramFromClosestAtHandler) : ScoredColorChoice[] {
        return this.addToHistogramAtOffsetFrom(offset, this.cell, histogram, scores, colors, this.ref, fnAddToHistogram);
    }

    getScoredChoicesByCount(scored: ScoredColorChoice[]): ScoredColorChoice[] {
        let result = scored.filter((x) => x.count > 0);
        result.sort((a, b) => b.count - a.count);
        return result;
    }
    getScoredChoicesByScore(scored: ScoredColorChoice[]): ScoredColorChoice[] {
        let result = scored.filter((x) => x.count > 0);
        result.sort((a, b) => a.score - b.score);
        return result;
    }

    updateColorParam(offset: number, params: Uint32Array, colorChoices: number[], overrideFilter?: number, overrideBits?: number): void {
        console.assert(offset < params.length);

        if (colorChoices.length < 1) {
            params[offset] = 0;
            return;
        }

        let value = 0;
        for (let i = colorChoices.length - 1; i >= 0; --i) {
            value <<= (overrideBits === undefined ? this.paletteBits : overrideBits);
            value |= colorChoices[i] & (overrideFilter === undefined ? this.paletteBitFilter : overrideFilter);
        }
        params[offset] = value;
    }
    updateBlockColorParam(offset: number, colorChoices: number[], overrideFilter?: number, overrideBits?: number): void {
        this.updateColorParam(offset, this.blockParams, colorChoices, overrideFilter, overrideBits);
    }
    updateCbColorParam(offset: number, colorChoices: number[], overrideFilter?: number, overrideBits?: number): void {
        this.updateColorParam(offset, this.cbParams, colorChoices, overrideFilter, overrideBits);
    }
    updateCellColorParam(offset: number, colorChoices: number[], overrideFilter?: number, overrideBits?: number): void {
        this.updateColorParam(offset, this.cellParams, colorChoices, overrideFilter, overrideBits);
    }

    extractColorsFromParams(offset: number, params: Uint32Array, totalToExtract: number, overrideFilter?: number, overrideBits?: number): number[] {
        return extractColorsFromParams(offset, params, totalToExtract, overrideFilter === undefined ? this.paletteBitFilter : overrideFilter, overrideBits === undefined ? this.paletteBits : overrideBits);
    }
    extractColorsFromBlockParams(offset: number, totalToExtract: number, overrideFilter?: number, overrideBits?: number): number[] {
        return extractColorsFromParams(offset, this.blockParams, totalToExtract, overrideFilter === undefined ? this.paletteBitFilter : overrideFilter, overrideBits === undefined ? this.paletteBits : overrideBits);
    }
    extractColorsFromCbParams(offset: number, totalToExtract: number, overrideFilter?: number, overrideBits?: number): number[] {
        return extractColorsFromParams(offset, this.cbParams, totalToExtract, overrideFilter === undefined ? this.paletteBitFilter : overrideFilter, overrideBits === undefined ? this.paletteBits : overrideBits);
    }
    extractColorsFromCellParams(offset: number, totalToExtract: number, overrideFilter?: number, overrideBits?: number): number[] {
        return extractColorsFromParams(offset, this.cellParams, totalToExtract, overrideFilter === undefined ? this.paletteBitFilter : overrideFilter, overrideBits === undefined ? this.paletteBits : overrideBits);
    }

    override commit(): void {
        // default is to reverse order of the guessing as some grander choices
        // may affect subsequent fine-grain choices
        this.guessExtraParams();
        this.guessCellParams();
        this.guessCbParams();
        this.guessBlockParams();
        this.firstCommit = false;
    }

    override getValidColors(imageIndex: number): number[] {
        let offset = this.imageIndexToBlockOffset(imageIndex);

        if (this.fullPaletteMode)
            return this.pixelPaletteChoices;

        let extracted = this.extractColorsFromBlockParams(offset, this.paletteChoices.colors);
        if ((this.globalValid.length == 0) && (extracted.length <= this.paletteChoices.colors))
            return extracted;

        let valid: number[] = this.globalValid.slice(0, this.globalValid.length);
        valid.push(...extracted);
        valid = valid.slice(0, this.globalValid.length + this.paletteChoices.colors);
        return valid;
    }

    override guessBlockParams(): void {
        for (let i = 0; i < this.blockParams.length; ++i) {
            this.guessBlockParam(i);
        }
    }
    override guessCbParams(): void {
        for (let i = 0; i < this.cbParams.length; ++i) {
            this.guessCbParam(i);
        }
    }
    override guessCellParams(): void {
        for (let i = 0; i < this.cellParams.length; ++i) {
            this.guessCellParam(i);
        }
    }
    override guessExtraParams(): void {
        for (let i = 0; i < this.extraParams.length; ++i) {
            this.guessExtraParam(i);
        }
    }

    override guessBlockParam(offset: number): void {

        // nothing to store if the pixel can store the direct palette value
        if (this.fullPaletteMode)
            return;

        // reset histogram values
        this.histogram.fill(0);
        this.scores.fill(0);

        // rank all colors within the size of the block (and bordering values)
        if (!this.firstCommit)
            this.addToBlockHistogramFromCurrentColor(offset, this.histogram, this.pixelPaletteChoices);
        let scored = this.addToBlockHistogramFrom(offset, this.histogram, this.scores, this.pixelPaletteChoices, this.firstCommit ? this.ref : this.alt);

        // never choose the colors that are always valid and available
        // for every pixel (i.e. why waste the screen ram or color block
        // ram on a color that is always available everywhere)

        // get best choices for sub-block
        let choices = this.getScoredChoicesByCount(scored);

        let colors = (choices.map((x) => { return x.ind; } )).slice(0, (this.block.colors - this.globalValid.length));

        while (colors.length < (this.block.colors - this.globalValid.length)) {
            colors.push( this.pixelPaletteChoices[0] || this.backgroundColor );
        }

        colors = colors.sort((a, b) => a - b);
        this.updateBlockColorParam(offset, colors);
    }
    override guessCbParam(offset: number): void {
    }
    override guessCellParam(offset: number): void {
    }
    override guessExtraParam(offset: number): void {
    }
}
