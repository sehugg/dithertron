import { getChoices, reducePaletteChoices, ColorChoice } from "../common/color";
import { PaletteChoices, PaletteRange  } from "../common/types";
import {
    BaseDitheringCanvas,
    BasicParamDitherCanvas,
    OneColor_Canvas,
    TwoColor_Canvas,
    CommonBlockParamDitherCanvas,
    AddToHistogramFromCurrentColorAtHandler,
    ScoredColorChoice,
} from "./basecanvas";
import { MAX_ITERATE_COUNT } from "./dithertron";
import { range } from "../common/util";

export class DitheringCanvas extends BaseDitheringCanvas {
    // just a wrapper for the base class so we can find it
}

export class Teletext_Canvas extends OneColor_Canvas {
    w = 2;
    h = 3;
}
export class VCSColorPlayfield_Canvas extends TwoColor_Canvas {
    w = 40;
    h = 1;
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

export class VICII_Canvas extends CommonBlockParamDitherCanvas {

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

    override init(): void {
        super.prepare();

        if (this.fliMode) {
            this.fliBug = this.sys.fli.bug;
            this.blankLeftScreenFliBugArea = this.sys.fli.blankLeft;
            this.blankRightScreenMirrorFliBugArea = this.sys.fli.blankRight;
            this.blankFliBugColumnCount = this.sys.fli.blankColumns;
            if (!this.paletteChoices.background) {
                this.borderColor = this.fliBugChoiceColor;
            }
        }
    }

    override getValidColors(imageIndex: number): number[] {
        let offset = this.imageIndexToBlockOffset(imageIndex);
        let cbOffset = this.imageIndexToCbOffset(imageIndex);

        let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(imageIndex);
        if (blank) {
            if (!this.paletteChoices.background)
                return [this.fliBugChoiceColor];
            return [this.backgroundColor];
        }

        let extracted = this.extractColorsFromBlockParams(offset, this.paramInfo.cb ? 2 : 3);
        if (this.paramInfo.cb) {
            extracted.push(...this.extractColorsFromCbParams(cbOffset, 1));
        }

        if (performBug) {
            // the choices are terrible in the "bug" fli area
            extracted[0] = extracted[1] = this.fliBugChoiceColor;
            extracted[2] = this.fliBugCbColor;
        }

        let valid: number[] = this.globalValid.slice(0, this.globalValid.length);
        valid.push(...extracted);
        valid = valid.slice(0, this.globalValid.length + this.paletteChoices.colors);
        return valid;
    }
    override guessBlockParam(offset: number): void {

        let imageIndex = this.blockOffsetToImageIndex(offset);

        let cbOffset = this.imageIndexToCbOffset(imageIndex);

        let [performBug, blank, leftBlank, rightBlank, bugColumn] = this.isImageIndexInFliBugBlankingArea(imageIndex);

        // never choose the colors that are always valid and available
        // for every pixel (i.e. why waste the screen ram or color block
        // ram on a color that is always available everywhere)

        let cbColor: number = 0;
        let pixelChoiceColors = this.pixelPaletteChoices;

        if (this.paramInfo.cb) {
            // filter out the cb chosen color as there's no point in choosing the
            // same color option twice since it's already valid for this pixel
            // block area (just like the background color is valid)
            let cbExtracted = this.extractColorsFromCbParams(cbOffset, 1);
            pixelChoiceColors = this.spliceColor(cbExtracted[0], this.pixelPaletteChoices);
        }

        // reset histogram values
        this.histogram.fill(0);
        this.scores.fill(0);

        // rank all colors within the size of the block (and bordering values)
        if (!this.firstCommit)
            this.addToBlockHistogramFromCurrentColor(offset, this.histogram, pixelChoiceColors);
        let scored = this.addToBlockHistogramFrom(offset, this.histogram, this.scores, pixelChoiceColors, this.firstCommit ? this.ref : this.alt);

        if (this.paramInfo.cb) {
            // filter out the cb chosen color as there's no point in choosing the
            // same color option twice since it's already valid for this pixel
            // block area (just like the background color is valid)
            let cbExtracted = this.extractColorsFromCbParams(cbOffset, 1);

            this.histogram[cbExtracted[0]] = 0;
            // promote this value to the lower nybble of the 2nd least significant byte
            // as this value is needed later
            cbColor = cbExtracted[0];
        }

        // get best choices for sub-block
        let choices = this.getScoredChoicesByCount(scored);
        let ind1 = choices[0] && choices[0].ind;
        let ind2 = choices[1] && choices[1].ind;
        let ind3 = choices[2] && choices[2].ind;
        if (ind1 === undefined)
            ind1 = this.backgroundColor;
        if (ind2 === undefined)
            ind2 = this.backgroundColor;
        if (ind3 === undefined)
            ind3 = this.backgroundColor;

        if (!this.paramInfo.cb) {
            cbColor = ind3;
        }

        if (leftBlank) {
            // force the chosen colors to all be background in the FLI bug area
            cbColor = ind1 = ind2 = ind3 = this.backgroundColor;
            if (!this.paletteChoices.background)
                ind1 = ind2 = this.fliBugChoiceColor;
        } else if (rightBlank) {
            cbColor = ind1 = ind2 = ind3 = this.backgroundColor;
            if (!this.paletteChoices.background)
                ind1 = ind2 = this.fliBugChoiceColor;
        }

        if (performBug) {
            // the choices when in the fli "bug" area are terrible
            // (because the VIC is unable to fetch the real colors
            // during a "bad line" event)
            ind1 = ind2 = this.fliBugChoiceColor;
            cbColor = this.fliBugCbColor;
        }

        let subsetChoices = [ ind1, ind2 ];
        subsetChoices = subsetChoices.splice(0, this.paletteChoices.colors);

        let sorted = [ ...subsetChoices.sort((a, b) => a - b), cbColor ];

        // Store the chosen colors in the lower and upper nybble
        // and put the chosen color block nybble into the low nybble of
        // the 2nd least significant byte. Even though this routine does
        // not use this value anywhere, the value is require on the export
        // routine to determine when char data needs to pick the pixel
        // index of %00 (background) %01 %10 (choice 1+2) and %11 meaning
        // use the color block color as a choice. The export routine is
        // unaware of the separated dedicated color block and only looks
        // for the color choices attached with each "normal" pixel param.

        this.updateBlockColorParam(offset, sorted);
    }

    override guessCbParam(offset: number): void {

        // does color block ram exist (presumption true is that it does/must exist, false to disable)
        if ((!this.paramInfo.cb) || (this.iterateCount > MAX_ITERATE_COUNT / 2))
            return;

        let imageIndex = this.cbOffsetToImageIndex(offset);

        let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(imageIndex);

        // reset histogram values
        this.histogram.fill(0);
        this.scores.fill(0);

        // rank all colors within the size of the block (and bordering values)
        if (!this.firstCommit)
            this.addToCbHistogramFromCurrentColor(offset, this.histogram, this.pixelPaletteChoices);
        let scored = this.addToCbHistogramFrom(offset, this.histogram, this.scores, this.pixelPaletteChoices, this.firstCommit ? this.ref : this.alt);

        // get best choices for sub-block
        let choices = this.getScoredChoicesByCount(scored);
        let cbColor = choices[0] && choices[0].ind;

        if (leftBlank) {
            // force the chosen colors to all be background in the FLI bug area
            cbColor = this.backgroundColor;
            if (!this.paletteChoices.background)
                cbColor = this.fliBugCbColor;
        } else if (rightBlank) {
            cbColor = this.backgroundColor;
            if (!this.paletteChoices.background)
                cbColor = this.fliBugCbColor;
        }

        if (performBug) {
            if (!this.paletteChoices.background)
                cbColor = this.fliBugChoiceColor;
        }

        this.updateCbColorParam(offset, [cbColor]);
    }

    isImageIndexInFliBugBlankingArea(index: number): [boolean, boolean, boolean, boolean, number] {
        let { column } = this.imageIndexToBlockInfo(index);

        let bugLogic = (this.fliBug && ((column >= 0) && (column < this.blankFliBugColumnCount))) && (!this.blankLeftScreenFliBugArea);
        let leftBlank = this.blankLeftScreenFliBugArea && ((column >= 0) && (column < this.blankFliBugColumnCount));
        let rightBlank = this.blankLeftScreenFliBugArea && this.blankRightScreenMirrorFliBugArea && ((column >= (this.block.columns - this.blankFliBugColumnCount)) && (column < this.block.columns));
        let blank = leftBlank || rightBlank;

        return [bugLogic, blank, leftBlank, rightBlank, column];
    }

}

export class ZXSpectrum_Canvas extends CommonBlockParamDitherCanvas {
    darkColors: number[];
    brightColors: number[];
    flipPalette: boolean;

    paletteRange: PaletteRange;

    histogram = new Uint32Array(this.pal.length);   // temporary scratch histogram buffer
    scores = new Uint32Array(this.pal.length);      // temporary scratch scores buffer

    override init(): void {
        super.prepare();

        this.darkColors = range(0, Math.floor(this.pal.length / 2));
        this.brightColors = range(Math.floor(this.pal.length / 2), this.pal.length);

        this.paletteRange = this.paletteChoices.colorsRange;
        this.flipPalette = (this.sys.customize === undefined ? false : this.sys.customize.flipPalette);
    }

    override guessBlockParam(offset: number): void {
    
        let calculateHistogramForCell = (colors: number[], min: number, max: number) => {

            let addToCurrent: AddToHistogramFromCurrentColorAtHandler = (x: number, y: number, color: number | undefined, histogram: Uint32Array) => {
                if (color === undefined)
                    return;

                // because the result becomes "pulled" towards the
                // reference image, the scoring needs to take into
                // account that the palette may have chosen the
                // other dark/bright versions instead so if the
                // palette then flips choices, the "pull" will
                // not happen properly if the previous color chosen
                // previously is not present on the new palette
                if ((color < min) || (color > max))
                    this.addToHistogramFromCurrentColor(color ^ 0b1000, histogram);
                else
                    this.addToHistogramFromCurrentColor(color, histogram);

            };

            // reset histogram values
            this.histogram.fill(0);
            this.scores.fill(0);

            // rank all colors within the size of the block (and bordering values)
            this.addToBlockHistogramFromCurrentColor(offset, this.histogram, this.allColors, undefined, addToCurrent);
            let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, colors);

            let choices = this.getScoredChoicesByCount(scored);
            return choices;
        };

        // The Zx spectrum requires that the colors chosen be either both from the
        // bright spectrum of the palette or both from the dark spectrum of the palette.
        // This choice of bright or not bright is applied to the entire cell and mixing
        // a bright or non-bright color for a cell is not possible.
        //
        // As such, the routine picks the best two colors from the dark palette and
        // picks the best two colors from the bright palette. Then the dark palette
        // is scored against the bright palette. If the bright palette better
        // represents the color (by having the "closest" rgb score), then the bright
        // color is chosen otherwise the dark color is chosen by default.

        // pick the top two colors from bright and dark mode
        let choices1 = calculateHistogramForCell(this.darkColors, this.darkColors[0], this.darkColors[this.darkColors.length - 1]).slice(0, 2);
        let choices2 = calculateHistogramForCell(this.brightColors, this.brightColors[0], this.brightColors[this.brightColors.length - 1]).slice(0, 2);

        if (choices1.length < 2)
            choices1.push(choices1[0]);
        if (choices2.length < 2)
            choices2.push(choices2[0]);

        console.assert(choices1.length >= 2);
        console.assert(choices2.length >= 2);

        let score1 = 0;
        let score2 = 0;

        choices1.forEach((x) => { score1 += x.score; });
        choices2.forEach((x) => { score2 += x.score; });

        let result = score2 < score1 ? choices2 : choices1;

        if ((result[0].ind < this.paletteRange.min) || (result[0].ind > this.paletteRange.max)) {
            // cannot choose what was chosen (because of palette restrictions) so swap to the
            // other palette (even if it isn't the best representation of the color)
            result = score2 < score1 ? choices1 : choices2;
        }

        console.assert(result[0].ind >= this.paletteRange.min);
        console.assert(result[0].ind <= this.paletteRange.max);
        console.assert(result[1].ind >= this.paletteRange.min);
        console.assert(result[1].ind <= this.paletteRange.max);

        if (this.flipPalette) {
            result[0].ind = (result[0].ind ^ 0b1000);
            result[1].ind = (result[1].ind ^ 0b1000);
        }

        let sorted = [result[0].ind, result[1].ind].sort((a, b) => a - b);
        this.updateBlockColorParam(offset, sorted);
    }
}

export class Stic_Fgbg_Canvas extends CommonBlockParamDitherCanvas {

    override init(): void {
        super.init();
    }

    override guessBlockParam(offset: number): void {
        // reset histogram values
        this.histogram.fill(0);
        this.scores.fill(0);

        // rank all colors within the size of the block (and bordering values)
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram, this.backgroundColors);
        let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, this.backgroundColors);

        let choices = this.getScoredChoicesByCount(scored);

        let foregroundChoice: ScoredColorChoice | undefined;
        for (let i = 0; i < choices.length; ++i) {
            // filter out illegal options
            if ((choices[i].ind < this.pixelPaletteChoices[0]) || (choices[i].ind > this.pixelPaletteChoices[this.pixelPaletteChoices.length-1]))
                continue;
            foregroundChoice = choices[i];
            choices.splice(i, 1);   // do not let this option get chosen again
            break;
        }

        // have to choose something, even if it's bad...
        foregroundChoice = (foregroundChoice === undefined ? { count: 0, ind: this.pixelPaletteChoices[0], score: 0 } : foregroundChoice);

        let colors = choices.map((x) => { return x.ind; } );
        this.updateBlockColorParam(offset, [ foregroundChoice.ind, ...colors ]);
    }

}

export class Stic_ColorStack_Canvas extends CommonBlockParamDitherCanvas {

    colorStack: number[] = [0, 0, 0, 0];

    indirection: number[][] = [];

    singleColorMode: boolean;

    override init(): void {
        super.init();

        this.singleColorMode = (this.sys.customize === undefined ? false : this.sys.customize.singleColor);

        this.makeIndirectionCombinations([]);
        this.chooseColorStack();

        // no longer need a redirection table
        this.indirection = [];
    }

    makeIndirectionCombinations(current: number[]) {
        if (current.length == this.colorStack.length) {
            this.indirection.push(current)
            return;
        }

        for (let i = 0; i < this.colorStack.length; ++i) {
            let found = current.find((x) => x == i);
            if (found !== undefined)
                continue;

            // new legal combination
            this.makeIndirectionCombinations([...current, i]);
        }
    }

    chooseColorStack(): void {

        let chooseColors = (useColors: number[]) => {

            let useColorStack = [ ...this.colorStack ];

            this.histogram.fill(0);
            this.scores.fill(0);

            let lastScored: ScoredColorChoice[];
            for (let offset = 0; offset < this.cb.size; ++offset) {
                lastScored = this.addToCbHistogramFromRef(offset, this.histogram, this.scores, useColors);
            }
            
            // choose the top N colors for use in the color stack
            let choices = this.getScoredChoicesByCount(lastScored).slice(0, useColorStack.length);

            if (this.singleColorMode) {
                // choose the top color
                choices = choices.splice(0, 1);
            }

            // must have chosen at least one color
            console.assert(choices.length > 0);

            // fill the color stack with rotating choices if too few colors were chosen
            let startLength = choices.length;
            for (let i = 0; choices.length < useColorStack.length; ++i) {
                choices.push(choices[i % startLength]);
            }

            // must now have exactly "colorStack" choices in length
            console.assert(choices.length == useColorStack.length);

            // figure out which pattern is most likely to be useful, create the "default" color stack
            useColorStack = choices.map((x) => { return x.ind; });

            let lowestCombination: number = NaN;

            if (!this.singleColorMode) {

                let gridScore: number[][] = [];

                // score each color's value in being used at every block
                for (let offset = 0; offset < this.cb.size; ++offset) {
                    this.histogram.fill(0);
                    this.scores.fill(0);

                    this.histogram.fill(0);
                    this.scores.fill(0);
                    let ranking = this.addToCbHistogramFromRef(offset, this.histogram, this.scores, useColorStack);

                    let rankedChoices = this.getScoredChoicesByCount(ranking);
                    console.assert(rankedChoices.length <= useColorStack.length);

                    let scoredColors: number[] = [];
                    for (let n = 0; n < useColorStack.length; ++n) {
                        let foundRank = useColorStack.length;
                        for (let rank = 0; rank < rankedChoices.length; ++rank) {
                            // find the rank of the choice by skipping over the rank that doesn't match the color
                            if (rankedChoices[rank].ind != useColorStack[n])
                                continue;
                            foundRank = rank;
                            break;
                        }
                        scoredColors.push(foundRank);
                    }
                    gridScore.push(scoredColors);
                }

                let lowestRank: number = NaN;
                for (let i = 0; i < this.indirection.length; ++i) {

                    // test this combination to see if it's a good choice
                    let combination = this.indirection[i];

                    let combinationRank = 0;
                    let pos = 0;

                    for (let offset = 0; offset < this.cb.size; ++offset) {
                        let indexCurrent = combination[pos % useColorStack.length];
                        let indexNext = combination[(pos + 1) % useColorStack.length];

                        let rankCurrent = gridScore[offset][indexCurrent];
                        let rankNext = gridScore[offset][indexNext];

                        let useRank = rankCurrent;
                        if (rankNext < rankCurrent) {
                            // will want to advance color stack in this condition
                            useRank = rankNext;
                            ++pos;
                        }
                        combinationRank += useRank;
                    }

                    if ((combinationRank < lowestRank) || (Number.isNaN(lowestRank))) {
                        lowestCombination = i;
                        lowestRank = combinationRank;
                    }
                }
            } else {
                // all combinations are exactly the same since they all reference one color
                lowestCombination = 0;
            }

            console.assert(!Number.isNaN(lowestCombination));

            // have found the best possible combination, make a new color stack
            let replacementColorStack: number[] = [];
            for (let i = 0; i < this.indirection[lowestCombination].length; ++i) {
                // re-arrange the current color stack based on the best combination
                replacementColorStack.push(useColorStack[this.indirection[lowestCombination][i]]);
            }

            return replacementColorStack;
        }

        // attempt to fill and score the color choices for the full range
        let fullColorStack = chooseColors(this.backgroundColors);
        let fullScore = this.fillCb(fullColorStack);
        let fullCbParams = new Uint32Array(this.cbParams);

        // only do the pastel comparisons if the foreground colors are restricted due to GROM being used instead of GRAM
        // and not in single color mode since the best color is chosen regardless of the palette magnitude difference
        let hasRestrictedPalette = ((this.paletteChoices.colorsRange.max < this.paletteChoices.backgroundRange.max) && (!this.singleColorMode));

        let pastelColorStack = (hasRestrictedPalette ? chooseColors(range(this.paletteChoices.colorsRange.max + 1, this.paletteChoices.backgroundRange.max + 1)) : fullColorStack);
        let pastelScore = (hasRestrictedPalette ? this.fillCb(pastelColorStack) : fullScore);

        // assume pastel will win
        this.colorStack = pastelColorStack;

        // If the pastel score is within the same magnitude of the full score (or even better) then choose the pastel colors.
        // Generally using the pastel colors is favored because the BACKTAB cannot use the pastel colors in the foreground
        // color, thus as long as the pastel colors aren't unusually bad as a choice for the color block choices then
        // select those colors because otherwise they are not usable at all.
        let pastelWins = (Math.ceil(Math.log2(pastelScore)) <= Math.ceil(Math.log2(fullScore)));

        if (!pastelWins) {
            // sorry pastel colors, you are a terrible choice, put back the full color range
            this.cbParams = fullCbParams;
            this.colorStack = fullColorStack;
        }

        // fill the extra params
        for (let i = 0; i < this.colorStack.length; ++i) {
            this.updateColorParam(i, this.extraParams, [ this.colorStack[i] ]);
        }
    }

    fillCb(useColors: number[]): number {

        // reset the scoring
        let colorStackScore = 0;

        // copy the chosen color stack into the extra params
        this.colorStack.forEach((x, i) => { this.extraParams[i] = x; });
        
        if (!this.singleColorMode) {
            let pos = 0;
            for (let offset = 0; offset < this.cb.size; ++offset) {
                let currentColor = useColors[pos % useColors.length];
                let nextColor = useColors[(pos + 1) % useColors.length];

                // can only choose the current color, or the next color in the color stack
                let colors = (this.singleColorMode ? [ currentColor ] : [ currentColor, nextColor ]);

                // reset the scratch histogram
                this.histogram.fill(0);
                this.scores.fill(0);
                let scored = this.addToCbHistogramFromRef(offset, this.histogram, this.scores, colors);

                let choices = this.getScoredChoicesByCount(scored);
                console.assert(choices.length > 0);

                let advance: number = choices[0].ind == nextColor ? 1 : 0;
                colorStackScore += choices[0].score;

                // store the chosen color cb color (and the boolean if the advancement had to happen to use this color)
                this.updateCbColorParam(offset, [choices[0].ind, advance]);

                if (advance)
                    ++pos;
            }
        } else {
            // only ever choose 1 color and never advance
            for (let offset = 0; offset < this.cb.size; ++offset) {
                let currentColor = useColors[0];
                // store the chosen color cb color (and the boolean if the advancement had to happen to use this color)
                this.updateCbColorParam(offset, [currentColor, 0]);
            }
        }

        return colorStackScore;
    }

    override guessCellParams(): void {

        if (!this.paramInfo.cell)
            return;

        let scoring: { offset: number, score: number } [] = [];

        // strategically choose which cells can most benefit from the usage of pastel colors
        for (let offset = 0; offset < this.cellParams.length; ++offset) {

            let restrictColors = [ ...this.backgroundColors ];

            // the first color is the color stack color
            let cbColor = this.extractColorsFromCbParams(offset, 1)[0];
    
            let foundCbColorIndex = restrictColors.findIndex((x) => x == cbColor);
            if (foundCbColorIndex >= 0) {
                // this color is always available via the color block thus do not let it be wasted on a foreground color
                restrictColors.splice(foundCbColorIndex, 1);
            }

            // reset histogram values
            this.histogram.fill(0);
            this.scores.fill(0);

            // rank all colors within the size of the block
            this.addToCellHistogramFromCurrentColor(offset, this.histogram, restrictColors);
            let scored = this.addToCellHistogramFromAlt(offset, this.histogram, this.scores, restrictColors);

            let choices = this.getScoredChoicesByCount(scored);
            console.assert(choices.length > 0);

            if ((choices[0].ind < this.paletteChoices.colorsRange.min) || (choices[0].ind > this.paletteChoices.colorsRange.max)) {
                // this block would make use of a pastel color
                scoring.push( { offset: offset, score: choices[0].score } );
            } else {
                scoring.push( { offset: offset, score: NaN } );
            }
        }

        let filtered = scoring.filter((x) => !Number.isNaN(x.score));
        let sorted = filtered.sort((a, b) => a.score - b.score);

        // only have so many gram slots available, so pick not only those that would
        // use the pastel color but those which are best represented by the pastel color
        sorted = sorted.slice(0, 64);

        // reset all the cell params to 0
        this.cellParams.fill(0);

        // a 1 indicates the this cell param is allowed to use the full range
        sorted.forEach((x, index) => { this.updateCellColorParam(x.offset, [1, index], 0xff, 8); });
    }

    override guessBlockParam(offset: number): void {

        let allowFullRange = false;
        if (this.paramInfo.cell) {
            // if the cell indicates it is allowed to use the full color range, then let it
            allowFullRange = (this.extractColorsFromCellParams(offset, 1, 0xff, 8)[0] != 0);
        }

        let restrictColors = allowFullRange ? [ ...this.backgroundColors ] : [ ...this.pixelPaletteChoices ];

        // the first color is the color stack color
        let cbColor = this.extractColorsFromCbParams(offset, 1)[0];

        let foundCbColorIndex = restrictColors.findIndex((x) => x == cbColor);
        if (foundCbColorIndex >= 0) {
            // this color is always available via the color block thus do not let it be wasted on a foreground color
            restrictColors.splice(foundCbColorIndex, 1);
        }

        // reset histogram values
        this.histogram.fill(0);
        this.scores.fill(0);

        // rank all colors within the size of the block (and bordering values)
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram, restrictColors);
        let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, restrictColors);

        let choices = this.getScoredChoicesByCount(scored);

        let colors = (choices.map((x) => { return x.ind; } )).slice(0, this.paletteChoices.colors);
        this.updateBlockColorParam(offset, colors);
    }

    override getValidColors(imageIndex: number): number[] {
        let offset = this.imageIndexToBlockOffset(imageIndex);

        let extracted = this.extractColorsFromBlockParams(offset, this.paletteChoices.colors);
        let cbColor = this.extractColorsFromCbParams(offset, 1)[0];

        let valid: number[] = [ cbColor, ...extracted ];
        return valid;
    }
}

export class Msx_Canvas extends CommonBlockParamDitherCanvas {
}

export class SNES_Canvas extends CommonBlockParamDitherCanvas {
}

export class SNES_Canvas_Direct extends CommonBlockParamDitherCanvas {

    Bbpgggprrrp_to_Pal_Lut: Uint32Array;

    pppFilteredPalettes: number[][] = [];

    override init(): void {
        super.init();

        this.Bbpgggprrrp_to_Pal_Lut = new Uint32Array(this.pal.length);
        
        for (let i = 0; i < this.pal.length; ++i) {
            let info = this.RgbToInfo(this.pal[i]);
            this.Bbpgggprrrp_to_Pal_Lut[info.bbpgggprrrp] = i;
        }

        for (let ppp = 0; ppp < (1 << 3); ++ppp) {
            let filteredByPpp = this.pixelPaletteChoices.filter((x) => { let info = this.colorToInfo(x); return (info.ppp == ppp) && (!(info.bbpgggprrrp == 0)); } );
            this.pppFilteredPalettes.push(filteredByPpp);
        }
    }

    RgbToInfo(rgb: number): { bbpgggprrrp: number, bbgggrrr :number, ppp: number, r: number, g: number, b: number } {
        let bbpgggprrrp = ((rgb & 0b11110000) >> 4) | ((((rgb >> 8) & 0b11110000) >> 4) << 4) | ((((rgb >> 16) & 0b11100000) >> 5) << 8);
        let bbgggrrr = ((rgb & 0b11100000) >> 5) | ((((rgb >> 8) & 0b11100000) >> 5) << 3) | ((((rgb >> 16) & 0b11000000) >> 6) << 6);
        let ppp = ((rgb & 0b00010000) >> 4) | ((((rgb >> 8) & 0b00010000) >> 4) << 1) | ((((rgb >> 16) & 0b00100000) >> 5) << 2);
        let r = (rgb & 0b11110000);
        let g = ((rgb >> 8) & 0b11110000);
        let b = ((rgb >> 16) & 0b11100000);

        return { bbpgggprrrp, bbgggrrr, ppp, r, g, b };
    }

    BbgggrrrToBbpgggprrrp(bbgggrrr: number, ppp: number): number {

        let bbpgggprrrp = ((bbgggrrr & 0b00000111) << 1) | (((bbgggrrr & 0b00111000) >> 3) << 4) | (((bbgggrrr & 0b11000000) >> 6) << 9);
        bbpgggprrrp |= (ppp & 0b001) | (((ppp & 0b010) >> 1) << 4) | (((ppp & 0b100) >> 2) << 8);
        return bbpgggprrrp;
    }

    BbpgggprrrpToInfo(bbpgggprrrp: number): { rgb: number, bbgggrrr :number, ppp: number, r: number, g: number, b: number } {
        let rgb = ((bbpgggprrrp & 0b00000001111) << (0 + 4)) | (((bbpgggprrrp & 0b00011110000) >> 4) << (8 + 4)) | (((bbpgggprrrp & 0b11100000000) >> 8) << (16 + 5));
        let bbgggrrr = ((bbpgggprrrp & 0b00000001110) >> 1) | (((bbpgggprrrp & 0b00011100000) >> 5) << 3) | (((bbpgggprrrp & 0b11000000000) >> 9) << 6);
        let ppp = (bbpgggprrrp & 0b00000000001) | (((bbpgggprrrp & 0b00000010000) >> 4) << 1) | (((bbpgggprrrp & 0b00100000000) >> 8) << 2);

        let r = (rgb & 0b11110000);
        let g = ((rgb >> 8) & 0b11110000);
        let b = ((rgb >> 16) & 0b11100000);

        return { rgb, bbgggrrr, ppp, r, g, b };
    }

    BbpgggprrrpToColor(bbpgggprrrp: number): number {
        return this.Bbpgggprrrp_to_Pal_Lut[bbpgggprrrp];
    }

    colorToInfo(color: number): { bbpgggprrrp: number, bbgggrrr :number, ppp: number } {
        return this.RgbToInfo(this.pal[color]);
    }

    substituteColorForColorWithPpp(currentColor: number, ppp: number): number {
        let info = this.colorToInfo(currentColor);
        return this.BbpgggprrrpToColor(this.BbgggrrrToBbpgggprrrp(info.bbgggrrr, ppp));
    }

    override getValidColors(imageIndex: number): number[] {

        let offset = this.imageIndexToBlockOffset(imageIndex);

        let ppp = this.extractColorsFromBlockParams(offset, 1, 0x3, 2)[0];

        // return palette filter to legal values with the same ppp
        let valid = this.pppFilteredPalettes[ppp];
        return valid;
    }

    override guessBlockParam(offset: number): void {

        // reset histogram values
        this.histogram.fill(0);
        this.scores.fill(0);

        // rank all colors regardless of which ppp value they might have selected
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram);
        let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores);

        let ranked = this.getScoredChoicesByCount(scored);

        let lowestPpp = NaN;
        let lowestPppScore = NaN;
        for (let ppp = 0; ppp < (1 << 3); ++ppp) {

            // construct a restricted palette color table based on the ppp (which may contain duplicate values)
            let restrictedColors: number[] = ranked.map((x) => { return this.substituteColorForColorWithPpp(x.ind, ppp); });

            // remove these duplicate values
            restrictedColors = Array.from(new Set(restrictedColors));

            this.histogram.fill(0);
            this.scores.fill(0);
    
            this.addToBlockHistogramFromCurrentColor(offset, this.histogram, restrictedColors);
            let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, restrictedColors);

            let pppRanked = this.getScoredChoicesByCount(scored);

            let totalPppScore = 0;
            pppRanked.forEach((x) => { totalPppScore += x.score });

            if ((totalPppScore < lowestPppScore) || (Number.isNaN(lowestPppScore))) {
                lowestPppScore = totalPppScore;
                lowestPpp = ppp;
            }
        }

        // found the ppp value to use for this particular cell
        console.assert(!Number.isNaN(lowestPpp));

        // store the ppp value into the block color (since the this.indexed will hold the actual color)
        this.updateBlockColorParam(offset, [ lowestPpp ], 0x3, 2);
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
