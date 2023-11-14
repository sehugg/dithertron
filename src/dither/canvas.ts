import { getChoices, reducePaletteChoices, ColorChoice } from "../common/color";
import { PaletteChoices, PaletteRange  } from "../common/types";
import { BaseDitheringCanvas, BasicParamDitherCanvas, OneColor_Canvas, ParamDitherCanvas, TwoColor_Canvas } from "./basecanvas";
import { MAX_ITERATE_COUNT } from "./dithertron";

export class DitheringCanvas extends BaseDitheringCanvas {
    // just a wrapper for the base class so we can find it
}

export class Teletext_Canvas extends OneColor_Canvas {
    w = 2;
    h = 3;
}
export class VDPMode2_Canvas extends TwoColor_Canvas {
    w = 8;
    h = 1;
}
export class VCSColorPlayfield_Canvas extends TwoColor_Canvas {
    w = 40;
    h = 1;
}
export class ZXSpectrum_Canvas extends TwoColor_Canvas {
    w = 8;
    h = 8;
}
export class Compucolor_Canvas extends TwoColor_Canvas {
    w = 2;
    h = 4;
}

export class Apple2_Canvas extends TwoColor_Canvas {
    w = 7;
    h = 1;
    allColors = [0, 1, 2, 3, 4, 5];
    guessParam(p: number) {
        var offset = p * this.w;
        var colors = this.allColors;
        var histo = new Uint32Array(16);
        for (var i = 0; i < this.w; i++) {
            var c1 = this.indexed[offset + i] | 0;
            histo[c1] += 100;
            var c2 = this.getClosest(this.alt[offset + i] | 0, colors);
            histo[c2] += 1 + this.noise;
        }
        var hibit = histo[3] + histo[4] > histo[1] + histo[2];
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

namespace VICII_Canvas_Details {
    export interface UseBlockInfo {
        w: number;
        h: number;
        xb?: number;
        yb?: number;
    };

    export let prepare = function (defaults: UseBlockInfo, block?: UseBlockInfo): UseBlockInfo {
        if (block === undefined) {
            return prepare(defaults, defaults);
        }
        let result: UseBlockInfo = { ...block };
        result.xb = (block.xb === undefined ? 0 : block.xb);
        result.yb = (block.yb === undefined ? 0 : block.yb);
        return result;
    }
}

export class VICII_Canvas extends ParamDitherCanvas {
    // FLI allows for the color choices of pixel values %01/%10 to change PER row as the
    // screen address where the color information is stored is changeable for each scan line
    // BUT the color ram for the %11 is not an address that can be changed so the
    // color ram applies to the entire 4x8 macro block

    // pixel values (for multi-mode):
    // %00 = background color (global value)
    // %01 = upper nybble of screen block (changeable per row 4x8 block size, 4x1 in FLI)
    // %10 = lower nybble of screen block (changeable only at the 4x8 block size)
    // %11 = lower nybble of color ram

    // pixel values (for hires-mode):
    // %0 = background color choice (stored in screen lower nybble, changeable per 8x8 block, 8x1 in FLI)
    // %1 = color choice (stored in screen upper nybble, changeable per 8x8 block, 8x1 in FLI)
    b: VICII_Canvas_Details.UseBlockInfo;
    colors: number;

    paletteChoices: PaletteChoices = {};
    pixelPaletteChoices: number[];

    // NOTE: cb = "color block"
    //
    // In multi-color mode, the pixel index color choices are either %00 for background,
    // %10 lower nybble screen value, %01 for upper nybble screen value, and %11 for
    // the color block. The color block values are kept as a separate set of parameters
    // at the end of the screen color choice parameters as they are an entirely
    // independent color choice data set which is immovable in memory (unlike screen
    // ram which is address moveable). The block size of the color blocks (4x8) happen to
    // be the same size as the screen color choice block sizes (4x8) in multi-color mode.
    // However, in multi-color FLI mode the screen color choices have per row color
    // choices (4x1) even though the color block sizes remain the same size (4x8).
    //
    // This the reason the color block parameters are split from the screen parameter
    // color choices as they are not always a 1:1 pairing.
    useCb: boolean;
    cb: VICII_Canvas_Details.UseBlockInfo;
    cbOffset: number = 0;   // the offset into the params array for the color block ram

    bitsPerColor: number;
    pixelsPerByte: number;

    fliMode: boolean = false;

    // FLI mode causes a VIC bug to appear coined the "fli bug". The issue is that
    // when $D011 is forced into a "bad line" condition which forces the VIC to
    // refetch color data and the CPU stalls the VIC long enough that exactly 3 character
    // values wide lack proper color block data (they instead use left over color block
    // data from the previous raster line).
    //
    // Whenever the vertical scroll register $D011 lower 3-bits match the current
    // raster line number's lower 3 bits, the VIC is forced to re-fetch color block data.
    // Under normal VIC/CPU conditions this happens every 8 raster lines because the
    // vertical scroll value has 8 possible values and thus the raster line bits match
    // the vertical scroll bits once in every 8 raster lines.
    //
    // Normally the VIC detects this condition while still inside the H-blank thus no
    // problem occurs. However, the FLI logic needs to swap the $D011 register's scroll
    // value every single scan line and re-adjust the screen data memory address, then
    // loop. This forces the VIC to enter a "bad line" state at improper timing than
    // normal conditions and the VIC must re-fetch the color block data. Worse, the
    // CPU timings require the VIC wait a 3-cycle handoff period prior to fetching the
    // color block data. Thus while the VIC is waiting, it still needs to display some
    // color (without having fetched the proper color). During this time the color block
    // internal values are set to 0xff (which has a fixed color of light grey).
    //
    // Thus in FLI mode, one recommended solution is to "blank" out the first three columns
    // with the background color on the left side of the screen. The right side is fine
    // but it too can be blanked to have a most balanced and centered picture display.
    fliBug: boolean = true;
    fliBugCbColor: number = 8; // orange
    fliBugChoiceColor: number = 15; // light grey
    blankLeftScreenFliBugArea: boolean = false;
    blankRightScreenMirrorFliBugArea: boolean = false;
    blankFliBugColumnCount: number = 0;

    // values chosen base on image
    bgColor: number = 0;
    auxColor: number = 0;
    borderColor: number = 0;
    globalValid: number[] = [];

    // state machine for guessing
    lastComputedCb: number = 0;

    // TODO: choose global colors before init?
    init() {
        // adopt the system settings
        this.b = VICII_Canvas_Details.prepare(this.sys.block, this.sys.block);
        this.cb = VICII_Canvas_Details.prepare(this.sys.block, this.sys.cb);

        this.useCb = this.sys.cb === undefined ? false : true;
        this.colors = this.sys.block.colors;

        // assume the background color is choosable (unless overridden)
        this.preparePaletteChoices(this.sys.paletteChoices);

        if (this.sys.fli != undefined) {
            this.fliMode = true;
            this.fliBug = this.sys.fli.bug;
            this.blankLeftScreenFliBugArea = this.sys.fli.blankLeft;
            this.blankRightScreenMirrorFliBugArea = this.sys.fli.blankRight;
            this.blankFliBugColumnCount = this.sys.fli.blankColumns;
        }

        // find global colors
        this.prepareGlobalColorChoices();

        this.bitsPerColor = Math.floor(Math.log2(this.colors));
        this.pixelsPerByte = Math.floor(8 / this.bitsPerColor);

        // offset into the first byte of the color ram (which is after the screen data)
        this.cbOffset = (this.width / this.b.w * this.height / this.b.h);
        this.params = new Uint32Array(this.cbOffset + ((this.width / this.cb.w * this.height / this.cb.h) * (this.useCb ? 1 : 0)) + 1);

        // console.log('blocks',this.b, this.cb, this.useCb, this.bitsPerColor, this.pixelsPerByte);
        // console.log('palette',this.paletteChoices);
        // console.log('colors',this.colors, this.globalValid, this.bgColor, this.auxColor, this.borderColor);
        // console.log('choices',this.pixelPaletteChoices);
        // console.log('picture', this.width, this.height, this.cbOffset, this.params.length);

        // fill params of sub-blocks
        for (var i = 0; i < this.params.length - 1; i++) { // -1 to not factor in the "extra" byte
            this.guessParam(i);
        }
        // +1 extra parameter for global colors
        this.params[this.params.length - 1] = this.bgColor | (this.auxColor << 4) | (this.borderColor << 8);
    }
    preparePixelPaletteChoices(): void {
        let count : number = this.paletteChoices.colorsRange.max - this.paletteChoices.colorsRange.min + 1;
        let ind = new Array<number>(count);
        for(let l = 0, i = this.paletteChoices.colorsRange.min; i < this.paletteChoices.colorsRange.min + count; ++l, ++i) {
            ind[l] = i;
        }
        this.pixelPaletteChoices = ind;
    }
    preparePaletteChoices(options?: PaletteChoices):void {
        console.assert(this.pal.length > 0);
        if (options === undefined) {
            this.paletteChoices.background = false;
            this.paletteChoices.aux = false;
            this.paletteChoices.border = false;
            this.paletteChoices.backgroundRange = { min: 0, max: this.pal.length-1 };
            this.paletteChoices.auxRange = { min: 0, max: this.pal.length-1 };
            this.paletteChoices.borderRange = { min: 0, max: this.pal.length-1 };
            this.paletteChoices.colors = this.colors;
            this.paletteChoices.colorsRange = { min: 0, max: this.pal.length-1 };

            this.preparePixelPaletteChoices();
            return;
        }
        this.paletteChoices.background = options.background === undefined ? false : options.background;
        this.paletteChoices.aux = options.aux === undefined ? false : options.aux;
        this.paletteChoices.border = options.aux === undefined ? false : options.border;

        this.paletteChoices.backgroundRange = options.backgroundRange === undefined ? { min: 0, max: this.pal.length-1 } : options.backgroundRange;
        this.paletteChoices.auxRange = options.auxRange === undefined ? { min: 0, max: this.pal.length-1 } : options.auxRange;
        this.paletteChoices.borderRange = options.borderRange === undefined ? { min: 0, max: this.pal.length-1 } : options.borderRange;
        this.paletteChoices.colorsRange = options.colorsRange === undefined ? { min: 0, max: this.pal.length-1 } : options.colorsRange;

        this.paletteChoices.colors = options.colors === undefined ?
            (this.colors - (this.paletteChoices.background?1:0) - (this.paletteChoices.aux?1:0) - (this.paletteChoices.border?1:0)) :
            options.colors;
        this.paletteChoices.colorsRange = { min: 0, max: this.pal.length-1 };
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
        chosenMax = chosenMax === undefined ? (this.pal.length-1) : chosenMax;

        return {min: chosenMin, max: chosenMax};
    }
    prepareGlobalColorChoices(): void {
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
                case 0: this.bgColor = index; break;
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

        // When in FLI mode, the FLI bug messes with the left side of the screen
        // thus making the color choices limited. This attempts to make the
        // error are less obvious by tweaking the background and border colors.
        if ((this.fliMode) && ((this.fliBug) || (this.blankLeftScreenFliBugArea) || (this.blankRightScreenMirrorFliBugArea)))  {
            if (!this.paletteChoices.background) {
                this.bgColor = this.fliBugChoiceColor;
                this.borderColor = this.fliBugChoiceColor;
            } else {
                this.borderColor = this.bgColor;
            }
        }

        if (this.paletteChoices.background)
            this.globalValid.push(this.bgColor);
        if (this.paletteChoices.aux)
            this.globalValid.push(this.auxColor);
        if (this.paletteChoices.border)
            this.globalValid.push(this.borderColor);
    }
    getValidColors(index: number) {
        let [ncols, col] = this.imageIndexToImageColumnInfo(index);

        let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(index);
        if (blank)
            return [this.bgColor];

        let p = this.imageIndexToParamOffset(index);
        let c1 = this.params[p] & 0xf;
        let c2 = (this.params[p] >> 4) & 0xf;
        let c3 = (this.params[p] >> 8) & 0xf;

        if (performBug) {
            // the choices are terrible in the "bug" fli area
            c1 = c2 = this.fliBugChoiceColor;
            c3 = this.fliBugCbColor;
        }

        let valid: number[] = this.globalValid.slice(0, this.globalValid.length);
        valid.push(c1, c2, c3);
        valid = valid.slice(0, this.globalValid.length + this.paletteChoices.colors);
        return valid;
    }
    guessParam(pUnknown: number) {
        // do not let the caller compute the parameters for anything other that the
        // bitmap area, as the other parameters are for the color block or the extra data
        // as these values are computed as a result of processing the bitmap data
        if (pUnknown >= this.cbOffset)
            return;

        return this.actualGuessParam(pUnknown);
    }
    actualGuessParam(pUnknown: number) {
        console.assert(pUnknown < this.params.length - 1);

        // does color block ram exist (presumption true is that it does/must exist, false to disable)
        const calculateCb = this.useCb && (this.iterateCount < MAX_ITERATE_COUNT / 2);

        let isCalculatingCb = (pUnknown >= this.cbOffset);
        if ((isCalculatingCb) && (!calculateCb))
            return;

        let index = this.paramOrCbParamOffsetToImageIndex(pUnknown);

        let cbp = (isCalculatingCb ? pUnknown : this.imageIndexToCbParamOffset(index));
        let p = (isCalculatingCb ? this.imageIndexToParamOffset(index) : pUnknown);

        if (!isCalculatingCb) {
            // Whenever the color block color changes the surrounding pixels that also
            // could reference that color block should be forced to NOT choose the same
            // color as this color is always available in the color block, and choosing
            // this same color in the color block would be wasted. As param colors are
            // "guessed" in the order of the array, this ensures the color block is
            // always calculated BEFORE the pixel colors
            //
            // Extra logic filters out to only calculate for the first row of any color
            // block area, and only calculate the color block is the current color block
            // is different than the last computed color block.
            if (calculateCb && (this.isImageIndexFirstRowOfColorBlock(index)) && (this.lastComputedCb != cbp)) {
                this.actualGuessParam(cbp);
            }
        } else {
            this.lastComputedCb = cbp;
        }

        let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(index);

        console.assert((isCalculatingCb) || (p == pUnknown));
        console.assert((!isCalculatingCb) || (cbp == pUnknown));

        let useB = isCalculatingCb ? this.cb : this.b;

        // rank all colors within the size of the block (and bordering values)
        let histo = new Uint32Array(16);

        // going to scan a pixel area that is the pixel (sub)block in size
        // +/- pixels bleeding left/right and above/below
        let [xStart, yStart] = this.paramOrCbParamOffsetToXy(p);

        for (let y = yStart - useB.yb; y < yStart + useB.h + useB.yb; y++) {
            for (let x = xStart - useB.xb; x < xStart + useB.w + useB.xb; x++) {
                this.updateHisto(histo, this.pixelPaletteChoices, x, y);
            }
        }

        // never choose the colors that are always valid and available
        // for every pixel (i.e. why waste the screen ram or color block
        // ram on a color that is always available everywhere)
        if (this.paletteChoices.background)
            histo[this.bgColor] = 0;
        if (this.paletteChoices.aux)
            histo[this.auxColor] = 0;
        if (this.paletteChoices.border)
            histo[this.borderColor] = 0;

        let cbColor: number = 0;

        if ((!isCalculatingCb) && (this.useCb)) {
            // filter out the cb chosen color as there's no point in choosing the
            // same color option twice since it's already valid for this pixel
            // block area (just like the background color is valid)
            histo[this.params[cbp] & 0xf] = 0;
            // promote this value to the lower nybble of the 2nd least significant byte
            // as this value is needed later
            cbColor = this.params[cbp] & 0xf;
        }

        // get best choices for sub-block
        let choices = getChoices(histo);
        let ind1 = choices[0] && choices[0].ind;
        let ind2 = choices[1] && choices[1].ind;
        let ind3 = choices[2] && choices[2].ind;
        if (ind1 === undefined)
            ind1 = this.bgColor;
        if (ind2 === undefined)
            ind2 = this.bgColor;
        if (ind3 === undefined)
            ind3 = this.bgColor;

        if (!this.useCb) {
            cbColor = ind3;
        }

        if (leftBlank) {
            // force the chosen colors to all be background in the FLI bug area
            cbColor = ind1 = ind2 = ind3 = this.bgColor;
            if (!this.paletteChoices.background)
                ind1 = ind2 = this.fliBugChoiceColor;
        } else if (rightBlank) {
            cbColor = ind1 = ind2 = ind3 = this.bgColor;
            if (!this.paletteChoices.background)
                ind1 = ind2 = this.fliBugChoiceColor;
        }

        if (isCalculatingCb) {
            if (performBug) {
                ind1 = this.fliBugCbColor;
            }
            this.params[cbp] = cbColor = ind1;
            return cbColor;
        }

        if (performBug) {
            // the choices when in the fli "bug" area are terrible
            // (because the VIC is unable to fetch the real colors
            // during a "bad line" event)
            ind1 = ind2 = this.fliBugChoiceColor;
            cbColor = this.fliBugCbColor;
        }

        // Store the chosen colors in the lower and upper nybble
        // and put the chosen color block nybble into the low nybble of
        // the 2nd least significant byte. Even though this routine does
        // not use this value anywhere, the value is require on the export
        // routine to determine when char data needs to pick the pixel
        // index of %00 (background) %01 %10 (choice 1+2) and %11 meaning
        // use the color block color as a choice. The export routine is
        // unaware of the separated dedicated color block and only looks
        // for the color choices attached with each "normal" pixel param.
        return this.params[p] = (ind1 & 0xf) | ((ind2 << 4) & 0xf0) | ((cbColor << 8) & 0xf00);
    }
    updateHisto(histo: Uint32Array, colors: number[], x: number, y: number) {
        let i = this.xyToImageIndex(x, y);

        // get current color (or reference for 1st time)
        let c1 = ((i === undefined) ? this.pal[this.bgColor] : this.indexed[i]);
        histo[c1] += 100;
        // get error color (TODO: why alt not img like 2-color kernels?)
        let rgbcomp = ((i === undefined) ? this.pal[this.bgColor] : this.alt[i]);
        let c2 = this.getClosest(rgbcomp, colors);
        histo[c2] += 1 + this.noise;
    }
    paramOrCbParamOffsetToImageIndex(pUnknown: number): number {
        let isCalculatingCb = (pUnknown >= this.cbOffset);
        let useB = (isCalculatingCb ? this.cb : this.b);
        let useP = (isCalculatingCb ? (pUnknown - this.cbOffset) : pUnknown);

        var ncols = this.width / useB.w;     // number of pixels in a row
        var col = useP % ncols;                // column for pixel in X direction
        var row = Math.floor(useP / ncols);    // row for pixel in Y direction
        // index is the starting offset representing the image's pixel X/Y
        var index = (col * useB.w) + (row * this.width * useB.h);
        console.assert(index < (this.width * this.height));
        return index;
    }

    isImageIndexInFliBugBlankingArea(index: number): [boolean, boolean, boolean, boolean, number] {
        let [ncols, col] = this.imageIndexToImageColumnInfo(index);

        let bugLogic = (this.fliBug && ((col >= 0) && (col < this.blankFliBugColumnCount))) && (!this.blankLeftScreenFliBugArea);
        let leftBlank = this.blankLeftScreenFliBugArea && ((col >= 0) && (col < this.blankFliBugColumnCount));
        let rightBlank = this.blankLeftScreenFliBugArea && this.blankRightScreenMirrorFliBugArea && ((col >= (ncols - this.blankFliBugColumnCount)) && (col < ncols));
        let blank = leftBlank || rightBlank;

        return [bugLogic, blank, leftBlank, rightBlank, col];
    }
    imageIndexToImageColumnInfo(index: number): [number, number] {
        let ncols = this.width / this.b.w;
        let col = Math.floor(index / this.b.w) % ncols;
        return [ncols, col];
    }

    paramOrCbParamOffsetToXy(pUnknown: number): [number, number] {
        let imageIndex = this.paramOrCbParamOffsetToImageIndex(pUnknown);
        return this.imageIndexToXY(imageIndex);
    }

    imageIndexToXY(index: number): [number, number] {
        return [index % this.width, Math.floor(index / this.width)];
    }
    xyToImageIndex(x: number, y: number): number | undefined {
        if ((x < 0) || (y < 0))
            return undefined;
        if ((x >= this.width) || (y >= this.height))
            return undefined;
        return y * this.width + x;
    }
    imageIndexToParamOffset(index: number): number {
        let [ncols, col] = this.imageIndexToImageColumnInfo(index);
        let row = Math.floor(index / (this.width * this.b.h));
        let p = col + row * ncols;
        console.assert(p < this.cbOffset);
        return p;
    }
    imageIndexToCbParamOffset(index: number): number {
        if (!this.useCb)
            return this.cbOffset;

        var ncols = this.width / this.cb.w;
        var col = Math.floor(index / this.cb.w) % ncols;
        var row = Math.floor(index / (this.width * this.cb.h));
        var cbp = this.cbOffset + col + row * ncols;
        console.assert(cbp >= this.cbOffset);
        console.assert(cbp < this.params.length - 1); // -1 is for the extra byte
        return cbp;
    }
    isImageIndexFirstRowOfColorBlock(index: number): boolean {
        var ncols = this.width / this.b.w;
        var row = Math.floor(index / (this.width * this.b.h));
        return 0 == row % Math.floor(this.cb.h / this.b.h);
    }
}

export class NES_Canvas extends BasicParamDitherCanvas {
    w = 16;
    h = 16;
    allColors = [0, 1, 2, 3, 4];
    init() {
        this.params = new Uint32Array(this.width / this.w * this.height / this.h);
        for (var i = 0; i < this.params.length; i++) {
            this.guessParam(i);
        }
    }
    getValidColors(offset: number) {
        var ncols = this.width / this.w;
        var col = Math.floor(offset / this.w) % ncols;
        var row = Math.floor(offset / (this.width * this.h));
        var i = col + row * ncols;
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
        var offset = col * this.w + row * this.width * this.h;
        var colors = [1, 2, 3, 4];
        // rank all colors
        var histo = new Uint32Array(16);
        var b = 8; // border (TODO: param)
        for (var y = -b; y < this.h + b; y++) {
            var o = offset + y * this.width;
            for (var x = -b; x < this.w + b; x++) {
                // get current color (or reference for 1st time)
                var c1 = this.indexed[o + x] | 0;
                histo[c1] += 100;
                // get error color (TODO: why ref works better?)
                var rgbcomp = this.alt[o + x] | 0;
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

export class HAM6_Canvas extends DitheringCanvas {
    getValidColors(offset: number): number[] {
        let arr = super.getValidColors(offset);
        if (offset == 0) {
            arr = arr.slice(0, 16);
        } else {
            let palindex = 16;
            let prevrgb = this.img[offset - 1];
            for (let chan = 0; chan < 3; chan++) {
                for (let i = 0; i < 16; i++) {
                    let rgb = prevrgb;
                    rgb &= ~(0xff << (chan * 8));
                    rgb |= (i << 4) << (chan * 8);
                    this.pal[palindex++] = rgb;
                }
            }
        }
        return arr;
    }
}
