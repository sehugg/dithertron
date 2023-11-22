import { DithertronSettings, PixelEditorImageFormat, PixelsAvailableMessage } from "../common/types";
import { ParamsContent, BlockParamDitherCanvasContent, extractColorsFromParams, extractColorsFromParamContent, extractColorsFromParamsContent, extractColorsFromParam } from "../dither/basecanvas";

import { hex } from "../common/util";

function remapBits(x: number, arr?: number[]): number {
    if (!arr) return x;
    var y = 0;
    for (var i = 0; i < arr.length; i++) {
        var s = arr[i];
        if (s < 0) {
            s = -s - 1;
            y ^= 1 << s;
        }
        if (x & (1 << i)) {
            y ^= 1 << s;
        }
    }
    return y;
}

function convertImagesToWords(images: Uint32Array[], fmt: PixelEditorImageFormat): ArrayLike<number> {
    if (fmt.destfmt) fmt = fmt.destfmt;
    var width = fmt.w;
    var height = fmt.h;
    var count = fmt.count || 1;
    var bpp = fmt.bpp || 1;
    var nplanes = fmt.np || 1;
    var bitsperword = fmt.bpw || 8;
    var wordsperline = fmt.sl || Math.ceil(fmt.w * bpp / bitsperword);
    var mask = (1 << bpp) - 1;
    var pofs = fmt.pofs || wordsperline * height * count;
    var skip = fmt.skip || 0;
    var words;
    if (nplanes > 0 && fmt.sl) // TODO?
        words = new Uint8Array(wordsperline * height * count);
    else if (fmt.yremap)
        words = new Uint8Array(count * ((height >> fmt.yremap[0]) * fmt.yremap[1] + (((1 << fmt.yremap[0]) - 1) * fmt.yremap[2])));
    else if (bitsperword <= 8)
        words = new Uint8Array(wordsperline * height * count * nplanes);
    else
        words = new Uint32Array(wordsperline * height * count * nplanes);
    for (var n = 0; n < count; n++) {
        var imgdata = images[n];
        var i = 0;
        for (var y = 0; y < height; y++) {
            var yp = fmt.flip ? height - 1 - y : y;
            var ofs0 = n * wordsperline * height + yp * wordsperline;
            if (fmt.yremap) { ofs0 = ((y >> fmt.yremap[0]) * fmt.yremap[1]) + ((y & (1 << fmt.yremap[0]) - 1) * fmt.yremap[2]) }
            var shift = 0;
            for (var x = 0; x < width; x++) {
                var color = (imgdata[i++]) & 0xff;
                var ofs = remapBits(ofs0, fmt.remap);
                if (fmt.bitremap) {
                    for (var p = 0; p < (fmt.bpp || 1); p++) {
                        if (color & (1 << p))
                            words[ofs] |= 1 << fmt.bitremap[shift + p];
                    }
                } else {
                    for (var p = 0; p < nplanes; p++) {
                        var c = (color >> (p * bpp)) & mask;
                        words[ofs + p * pofs + skip] |= (fmt.brev ? (c << (bitsperword - shift - bpp)) : (c << shift));
                    }
                }
                shift += bpp;
                if (shift >= bitsperword) {
                    ofs0 += 1;
                    shift = 0;
                }
            }
        }
    }
    return words;
}

function concatArrays(arrays: Uint8Array[]): Uint8Array {
    var total = 0;
    arrays.forEach((a) => { total += a.length });
    var dest = new Uint8Array(total);
    total = 0;
    arrays.forEach((a) => { dest.set(a, total); total += a.length });
    return dest;
}

export function exportFrameBuffer(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    var fmt = settings.exportFormat;
    if (!fmt) throw "No export format";
    fmt.w = img.width;
    fmt.h = img.height;
    return new Uint8Array(convertImagesToWords([img.indexed], fmt));
}

export function exportApple2HiresToHGR(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    // TODO: handle other dimensions
    var data = new Uint8Array(0x2000);
    var srcofs = 0;
    for (var y = 0; y < img.height; y++) {
        var destofs = (y & 7) * 0x400 + ((y >> 3) & 7) * 0x80 + (y >> 6) * 0x28;
        for (var x = 0; x < img.width; x += 7) {
            var z = 0;
            var hibit = 0;
            for (var i = 0; i < 7; i++) {
                var col = (img.indexed[srcofs++]) & 0xff;
                if (col == 3 || col == 4) hibit |= 0x80;
                if (col >= 3) col -= 2;
                z |= (col << i * 2);
            }
            data[destofs++] = (z & 0x7f) | hibit;
            data[destofs++] = ((z >> 7) & 0x7f) | hibit;
        }
    }
    return data;
}

export function bitOverlayUint8Array(
    array: Uint8Array,
    offset: number,
    bitPattern: number,
    bitShift: number,
    bitCount: number,
    littleEndian?: boolean): void {

    // This routine is capable of overlaying bit patterns onto a memory
    // buffer. The routine handles small or large bit patterns (so long as the
    // bit pattern can reasonably fit within the "number" type, including any
    // bit shifting that may be needed).
    //
    // The endianness of the pattern only applies if the pixel may cross the byte
    // boundary, in which case the routine will factor the byte direction when
    // overlaying the bit pattern onto the memory buffer.

    littleEndian = littleEndian === undefined ? true : littleEndian;

    let bitFilter = (1 << bitCount) - 1;
    let pattern = (bitPattern & bitFilter);

    let bitOverlay = pattern << bitShift;
    bitFilter <<= bitShift;

    offset += (littleEndian ? 0 : ((bitCount + bitShift - 1) / 8));
    let direction = littleEndian ? 1 : -1;

    for (let bitsRemaining = bitCount + bitShift; bitsRemaining > 0; bitsRemaining -= 8, offset += direction) {
        let complimentFilter = (~0) ^ bitFilter;

        let complimentByte = complimentFilter & 0xff;
        let overlayByte = bitOverlay & 0xff;

        console.assert(offset < array.length);
        array[offset] = (array[offset] & complimentByte) | overlayByte;

        bitOverlay >>= 8;
        bitFilter >>= 8;
    }
}

export interface BitInfo {
    offset: number;
    bitShift: number;
    bitCount: number;
    paramOffset: number;
};

export interface PrepareInfo {
    data: Uint8Array;
    littleEndian?: boolean;
};

interface DataMapper {
    data(): Uint8Array;
}

interface CommonMapperBasics {
    prefill(array: Uint8Array): void;
    iterate(array: Uint8Array): void;
    commit(array: Uint8Array): void;
    finalize(iteration: number, cellImage: Uint8Array, colors: Uint8Array, colorBlock: Uint8Array, cellBlock: Uint8Array, extra: Uint8Array): boolean;    
}

interface CommonMapper extends Partial<CommonMapperBasics> {
    prepare(): PrepareInfo;    
}

interface CellExporterMapper_Iterate_Values {
    width: number;                                                                  // the width to use for the image
    height: number;                                                                 // the height to use for the image
    params: Uint32Array;                                                            // the color parameters (aka block parameters) to use for the image
    indexed: Uint32Array;                                                           // the palette indexed image array
    colors: number;                                                                 // how many colors to extract from the color params
    fullPaletteMode: boolean;                                                       // the image directly contains the index of the palette (without a color block translation)
    paletteBitFilter: number;                                                       // the filter to apply to the palette value
    paletteBits: number;                                                            // how many palette bits are needing to be extracted
}

interface CellExporterMapper_Iterate_BitPattern {
    paramToBitPattern(param: number, paletteIndex: number, info: BitInfo): number; // used to convert the block parameter into a value to be encoded at the encoding bit info
}

interface CellExporterMapper_Iterate_XYToBitInfo extends CellExporterMapper_Iterate_BitPattern {
    xyToBitInfo(x: number, y: number): BitInfo;
}

interface CellExporterMapper_Iterate_GlobalColorsBitPattern {
    globalColorsBitPattern: { paletteIndex: number, bitPattern: number }[];                             // used with defaulted paramToBitPattern to map global colors onto a bit pattern
};

interface CellExporterMapper_Iterate_GlobalColorToBitPattern {
    globalColorToBitPattern(param: number, paletteIndex: number, info: BitInfo): number | undefined;    // used with defaulted paramToBitPattern to map global colors onto a bit pattern
};

interface CellExporterMapper_Iterate_GlobalColors extends Partial<CellExporterMapper_Iterate_GlobalColorsBitPattern>, Partial<CellExporterMapper_Iterate_GlobalColorToBitPattern> {
};

interface CellExporterMapper_Iterate_ColorsBitPattern {
    colorsBitPattern: number[];                                                                         // an array equal to the size the number of extracted param colors mapping to each related bit pattern
}

interface CellExporterMapper_Iterate_ColorToBitPattern {
    colorToBitPattern(param: number, paletteIndex: number, info: BitInfo): number | undefined;         // used with defaulted paramToBitPattern to map image colors onto a bit pattern
}

interface CellExporterMapper_Iterate_Colors extends Partial<CellExporterMapper_Iterate_ColorsBitPattern>, Partial<CellExporterMapper_Iterate_ColorToBitPattern> {
};

interface CellExporterMapper_Iterate extends CellExporterMapper_Iterate_Values, CellExporterMapper_Iterate_XYToBitInfo, CellExporterMapper_Iterate_GlobalColors, CellExporterMapper_Iterate_Colors {
}

interface CellExporterMapper extends CommonMapper, Partial<CellExporterMapper_Iterate> {
}

interface ParamExporterMapper_Iterate_Values {
    params: Uint32Array;                                                            // if specified, what params are used in the iteration over the params
}

interface ParamExporterMapper_Iterate_ParamToBitInfo {
    paramToBitPattern(param: number, info: BitInfo): number;                        // if specified, used to convert the block parameter into a value to be encoded at the encoding bit info
}

interface ParamExporterMapper_Iterate_ParamToBitPattern extends ParamExporterMapper_Iterate_ParamToBitInfo {
    paramToBitInfo(paramOffset: number): BitInfo;                                   // if specified, used to map a parameter offset into encoding bit info, and paramToBitPattern must be specified
}

interface ParamExporterMapper_Iterate extends ParamExporterMapper_Iterate_Values, ParamExporterMapper_Iterate_ParamToBitPattern {
}

interface ParamExporterMapper extends CommonMapper, Partial<ParamExporterMapper_Iterate> {
}

function getDefaultedCellExporterMapper(
    values: CellExporterMapper_Iterate_Values,
    mapper?: CellExporterMapper): CellExporterMapper | undefined {

    let fullPaletteMode = mapper.fullPaletteMode === undefined ? values.fullPaletteMode : mapper.fullPaletteMode;

    if (mapper === undefined)
        return undefined;

    if (mapper.prepare === undefined)
        throw 'The "prepare" method is required.';

    let setup: PrepareInfo;

    let prepare = () => {
        setup = mapper.prepare();
        setup.littleEndian = setup.littleEndian === undefined ? true : setup.littleEndian;
        return setup;
    };

    let paramToBitPattern = (mapper.paramToBitPattern !== undefined ? mapper.paramToBitPattern : (param: number, paletteIndex: number, info: BitInfo) => {

        if (fullPaletteMode)
            return paletteIndex;

        let colors = extractColorsFromParam(
            param,
            mapper.colors === undefined ? values.colors : mapper.colors,
            mapper.paletteBitFilter === undefined ? values.paletteBitFilter : mapper.paletteBitFilter,
            mapper.paletteBits === undefined ? values.paletteBits : mapper.paletteBits);

        // first can the global colors for a match
        if (mapper.globalColorsBitPattern !== undefined) {
            for (let i = 0; i < mapper.globalColorsBitPattern.length; ++i) {
                if (paletteIndex == mapper.globalColorsBitPattern[i].paletteIndex)
                    return mapper.globalColorsBitPattern[i].bitPattern;
            }
        }

        if (mapper.globalColorToBitPattern !== undefined) {
            let pattern = mapper.globalColorToBitPattern(param, paletteIndex, info);
            if (pattern !== undefined)
                return pattern;
        }

        if (mapper.colorToBitPattern !== undefined) {
            let pattern = mapper.colorToBitPattern(param, paletteIndex, info);
            if (pattern !== undefined)
                return pattern;
        }

        // next scan the color choices for a match
        for (let i = 0; (i < colors.length) && (i < mapper.colorsBitPattern.length) ; ++i) {
            if (paletteIndex != colors[i])
                continue;
            return mapper.colorsBitPattern[i];
        }

        console.log('global nor param color does not contain color from image', values, mapper, param, paletteIndex, info);
        console.assert(false);  // something went wrong as palette could not be mapped
        return 0;
    });

    let iterate = (mapper.iterate !== undefined ? mapper.iterate : (array: Uint8Array) => {

        let params = mapper.params === undefined ? values.params : mapper.params;
        let indexed = mapper.indexed === undefined ? values.indexed : mapper.indexed;

        if (mapper.xyToBitInfo === undefined)
            return;

        if ((indexed === undefined) || ((params === undefined) && (!fullPaletteMode)))
            throw 'Both "params" and "indexed" must be defined.';

        for (let i = 0, y = 0; y < (mapper.height === undefined? values.height : mapper.height); ++y) {
            for (let x = 0; x < (mapper.width === undefined ? values.width : mapper.width); ++x, ++i) {
                let info = mapper.xyToBitInfo(x, y);
                console.assert((params === undefined) || (info.paramOffset < params.length));    // must be within the bounds of the param array
                let bitPattern = paramToBitPattern(params === undefined ? 0 : (params[info.paramOffset]), indexed[i], info);
                bitOverlayUint8Array(array, info.offset, bitPattern, info.bitShift, info.bitCount, setup.littleEndian);
            }
        }

    });

    let defaultedMapper: CellExporterMapper = {

        prepare: prepare,
        prefill: mapper.prefill,
        iterate: iterate,
        commit: mapper.commit,
        finalize: mapper.finalize,

        xyToBitInfo: mapper.xyToBitInfo,
        paramToBitPattern: paramToBitPattern,

        globalColorsBitPattern: mapper.globalColorsBitPattern === undefined ? [] : mapper.globalColorsBitPattern,
        globalColorToBitPattern: mapper.globalColorToBitPattern,
        colorsBitPattern: mapper.colorsBitPattern,
        colorToBitPattern: mapper.colorToBitPattern
    };

    return defaultedMapper;
}

function getDefaultedCellExporterMapperOrFromDataMapper(
    values: CellExporterMapper_Iterate_Values,
    mapper?: CellExporterMapper | DataMapper): CellExporterMapper | undefined {

    if ("prepare" in mapper) {
        return getDefaultedCellExporterMapper(values, mapper);
    }

    if ("data" in mapper) {

        let defaultedMapper: CellExporterMapper = {
            prepare(): PrepareInfo {
                return { data: mapper.data() };
            },
        }
        return defaultedMapper;
    }

    throw 'Either "prepare" or "data" on a "CellExporterMapper" or "DataMapper" must be defined.';
}

function getDefaultedParamMapper(
    isUsing: boolean,
    values: ParamExporterMapper_Iterate_Values,
    mapper?: ParamExporterMapper): ParamExporterMapper | undefined {

    if ((mapper === undefined) || (!isUsing))
        return undefined;

    let setup: PrepareInfo;

    if (mapper.prepare === undefined)
        throw 'The "prepare" method is required.';

    let prepare = () => {
        setup = mapper.prepare();
        setup.littleEndian = setup.littleEndian === undefined ? true : setup.littleEndian;
        return setup;
    };

    let iterate = () => {
        let params = (mapper.params === undefined ? values.params : mapper.params);

        if ((mapper.paramToBitInfo === undefined) && (mapper.paramToBitPattern === undefined))
            return;

        if ((mapper.paramToBitInfo === undefined) || (mapper.paramToBitPattern === undefined) || (params === undefined))
            throw 'All of "paramToBitInfo" and "paramToBitPattern" and "params" must be defined.';

        for (let i = 0; i < params.length; i++) {
            // The color block ram is split out from the normal param area
            // to stored extra color block choices shared across
            // multiple pixels. The color block area is an extra shared
            // color ram that is independent of the "screen" color ram.

            let p = params[i];
            let info = mapper.paramToBitInfo(i);
            let bitPattern = mapper.paramToBitPattern(p, info);
            bitOverlayUint8Array(setup.data, info.offset, bitPattern, info.bitShift, info.bitCount, setup.littleEndian);
        }
    }
    
    let defaultedMapper: ParamExporterMapper = {

        prepare: prepare,
        prefill: mapper.prefill,
        iterate: iterate,
        commit: mapper.commit,
        finalize: mapper.finalize,

        params: mapper.params === undefined ? values.params : mapper.params,
        paramToBitInfo: mapper.paramToBitInfo,
        paramToBitPattern: mapper.paramToBitPattern
    };

    return defaultedMapper;
}

function getDefaultedParamMapperOrFromDataMapper(
    isUsing: boolean,
    values: ParamExporterMapper_Iterate_Values,
    mapper?: ParamExporterMapper | DataMapper): ParamExporterMapper | undefined {

    if ((!isUsing) || (mapper === undefined))
        return undefined;

    if ("prepare" in mapper) {
        return getDefaultedParamMapper(isUsing, values, mapper);
    }

    if ("data" in mapper) {
        let defaultedMapper: ParamExporterMapper = {
            prepare(): PrepareInfo {
                return { data: mapper.data() };
            }
        }

        return defaultedMapper;
    }

    throw 'Either "prepare" or "data" on a "ParamExporterMapper" or "DataMapper" must be defined.';
}


interface ExportCombinedImageAndColorCellBuffer {
    message: PixelsAvailableMessage;
    content: BlockParamDitherCanvasContent;
    cellMapper?: CellExporterMapper | DataMapper;                       // if specified, use to map out the image pattern onto a buffer
    colorParamMapper?: ParamExporterMapper | DataMapper,                // if specified, used to map the colors (block params) onto a buffer
    colorBlockParamMapper?: ParamExporterMapper | DataMapper,           // if specified, used to map the color block params onto a  buffer
    cellParamMapper?: ParamExporterMapper | DataMapper,                 // if specified, used to map the cell params onto a buffer
    extraParamMapper?: ParamExporterMapper | DataMapper,                // if specified, used to map the extra params onto a buffer
    reorderArrays?(arrays: Uint8Array[]): Uint8Array[];
}

export function exportCombinedImageAndColorCellBuffer(options: ExportCombinedImageAndColorCellBuffer): Uint8Array {

    let cellMapper = getDefaultedCellExporterMapperOrFromDataMapper(
        {
            width: options.content.width,
            height: options.content.height,
            params: options.content.blockParams,
            indexed: options.message.indexed,
            colors: options.content.block.colors,
            fullPaletteMode: options.content.fullPaletteMode,
            paletteBitFilter: options.content.paletteBitFilter,
            paletteBits: options.content.paletteBits
        },
        options.cellMapper);
    let colorParamMapper = getDefaultedParamMapperOrFromDataMapper(options.colorParamMapper !== undefined, { params: options.content.blockParams }, options.colorParamMapper);
    let colorBlockParamMapper = getDefaultedParamMapperOrFromDataMapper(options.content.paramInfo.cb, { params: options.content.cbParams }, options.colorBlockParamMapper);
    let cellParamMapper = getDefaultedParamMapperOrFromDataMapper(options.content.paramInfo.cell, { params: options.content.cellParams }, options.cellParamMapper);
    let extraParamMapper = getDefaultedParamMapperOrFromDataMapper(options.content.paramInfo.extra > 0, { params: options.content.extraParams }, options.extraParamMapper);

    let allMappers: (CommonMapper | undefined)[] = [cellMapper, colorParamMapper, colorBlockParamMapper, cellParamMapper, extraParamMapper];
    let allMappersFiltered = allMappers.filter((x) => x !== undefined);

    let setup: PrepareInfo[] = [];
    let data: Uint8Array[] = [];

    // prepare the mappers
    for (let i = 0; i < allMappers.length; ++i) {
        if (allMappers[i] === undefined) {
            data.push(undefined);
            continue;
        }

        let info = allMappers[i].prepare();
        setup.push(info);
        data.push(info.data);
    }

    // prefill the mappers
    for (let i = 0; i < allMappersFiltered.length; ++i) {
        if (allMappersFiltered[i].prefill === undefined)
            continue;

        allMappersFiltered[i].prefill(setup[i].data);
    }

    // iterator the mappers
    for (let i = 0; i < allMappersFiltered.length; ++i) {
        if (allMappersFiltered[i].iterate === undefined)
            continue;

        allMappersFiltered[i].iterate(setup[i].data);
    }

    // commit the mappers
    for (let i = 0; i < allMappersFiltered.length; ++i) {
        if (allMappersFiltered[i].commit === undefined)
            continue;

        allMappersFiltered[i].commit(setup[i].data);
    }

    // finalize the mappers
    let continueFinalize = true;
    for (let i = 0; continueFinalize; ++i) {

        continueFinalize = false;

        for (let i = 0; i < allMappersFiltered.length; ++i) {
            if (allMappersFiltered[i].finalize === undefined)
                continue;

            continueFinalize = allMappersFiltered[i].finalize(i, data[0], data[1], data[2], data[3], data[4]) || continueFinalize;
        }
    }

    // make sure the array was in use
    let mergeArrays = data.filter((x) => x !== undefined);
    if (options.reorderArrays !== undefined) {
        mergeArrays = options.reorderArrays(mergeArrays);
    }

    return concatArrays(mergeArrays);
}

function getVicCellMapper(
    content: BlockParamDitherCanvasContent,
    mapper?: CellExporterMapper | Partial<CellExporterMapper_Iterate>): CellExporterMapper {

    let bpp = content.bitsPerColor;
    let bitsPerCellWidth = (content.cell.w * bpp);
    let bitsPerCell = content.cell.h * bitsPerCellWidth;
    let bytesPerCell = Math.ceil(bitsPerCell / 8);
    let cellBytesPerRow = 0;

    let exporter: CellExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            cellBytesPerRow = content.block.columns * bytesPerCell;
            return { data: new Uint8Array(content.width * content.height * bpp / 8) };
        },

        xyToBitInfo(x: number, y: number): BitInfo {

            let col = Math.floor(x / content.block.w);

            // which cell is being filled
            let cellCol = Math.floor(x / content.cell.w);
            let cellRow = Math.floor(y / content.cell.h);

            let paramOffset = (Math.floor(y / content.block.h) * content.block.columns) + col;

            // where is the start of the cell being filled located in the byte array
            let cellColOffset = bytesPerCell * cellCol;
            let cellRowOffset = cellBytesPerRow * cellRow;

            // which particular byte of the cell is being filled now
            let cellXOffset = Math.floor(((x % content.cell.w) * bpp) / 8);
            let cellYOffset = Math.floor(((y % content.cell.h) * bitsPerCellWidth) / 8);

            // how much of a bit offset is required for this particular pixel
            let bitShift = (content.cell.msbToLsb ? (bitsPerCellWidth - (((x % content.cell.w) + 1) * bpp)) : (x % content.cell.w) * bpp);

            return {
                offset: cellRowOffset + cellColOffset + cellYOffset + cellXOffset,
                bitShift: bitShift,
                bitCount: bpp,
                paramOffset: paramOffset
            };
        }
    };

    return exporter;
}

function getVicColorMapper(
    content: BlockParamDitherCanvasContent,
    mapper: ParamExporterMapper | Partial<ParamExporterMapper_Iterate>): ParamExporterMapper {

    let isUsingFli = content.fliMode;

    let bpp = content.bitsPerColor;

    let colorAlignedBytes: number = 0;

    let exporter: ParamExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {

            let colorBytes = (content.cell.columns * content.cell.rows);
            colorAlignedBytes = (1 << Math.ceil(Math.log2(colorBytes)));

            return { data: new Uint8Array(isUsingFli ? (colorAlignedBytes * content.cell.h) : (content.cell.columns * content.cell.rows)) };
        },

        paramToBitInfo(paramOffset: number): BitInfo {

            let offset: number = 0;

            // Normally in graphics mode each screen pixel in a 4x8 or 8x8 block chooses from
            // cell colors dedicated for the entire block (stored in "screen" color ram).
            // However, in FLI mode each pixel row gets a new choice of colors since on
            // each scan line special code swaps the "screen" color ram pointer location to
            // a new location in memory thus allowing for independent values per row.
            if (isUsingFli) {
                offset = (Math.floor(paramOffset / content.cell.columns) & (content.cell.h - 1)) * colorAlignedBytes + (Math.floor(paramOffset / (bpp * content.width)) * content.cell.columns) + (paramOffset % content.cell.columns);
            } else {
                offset = paramOffset;
            }

            return {
                offset: offset,
                bitShift: 0,
                bitCount: 8,
                paramOffset: paramOffset
            };
        }
    };

    return exporter;
}

function getVicColorBlockMapper(
    content: BlockParamDitherCanvasContent,
    mapper: ParamExporterMapper | Partial<ParamExporterMapper_Iterate>): ParamExporterMapper {

    let exporter: ParamExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            return { data: new Uint8Array(content.cb.columns * content.cb.rows) };
        },
        paramToBitInfo(paramOffset: number): BitInfo {
            return {
                offset: paramOffset,
                bitShift: 0,
                bitCount: 8,
                paramOffset: paramOffset
            };
        }
    };

    return exporter;
}

export function exportC64Multi(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(
            content,
            {
                // background for bit pattern %00
                // lower nybble for bit pattern %10
                // upper nybble for bit pattern %01
                // color block nybble for bit pattern %11
                globalColorsBitPattern: [{ paletteIndex: content.backgroundColor & 0xf, bitPattern: 0x00 }],
                colorsBitPattern: [ 0x02, 0x01, 0x03 ]
            }
        ),
        colorParamMapper: getVicColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 2, content);
                    return colors[0] | colors[1] << 4;
                }
            }
        ),
        colorBlockParamMapper: getVicColorBlockMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 1, content);
                    return colors[0];
                }
            }
        ),
        extraParamMapper: {
            data(): Uint8Array {
                let array = new Uint8Array(2);
                array[0] = (content.backgroundColor & 0x0f) | ((content.auxColor & 0x0f) << 4);
                array[1] = (content.borderColor & 0x0f);
                return array;
            }
        }
    });
}

export function exportC64Hires(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(
            content,
            {
                // lower nybble for bit pattern %0
                // upper nybble for bit pattern %1
                colorsBitPattern: [ 0x01, 0x00 ]
            }
        ),
        colorParamMapper: getVicColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 2, content);
                    return (colors[0] << 4) | (colors[1]);
                }
            }
        ),
        extraParamMapper: {
            data(): Uint8Array {
                let array = new Uint8Array(2);
                array[0] = (content.backgroundColor & 0x0f) | ((content.auxColor & 0x0f) << 4);
                array[1] = (content.borderColor & 0x0f);
                return array;
            }
        }
    });
}

export function exportVicHires(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    // From wiki entry that best describes:
    // The VIC-20 lacks any true graphic mode, but a 22×11 text mode with 200 definable characters of
    // 8×16 bits each arranged as a matrix of 20×10 characters is usually used instead,
    // giving a 3:2(NTSC)/5:3(PAL) pixel aspect ratio, 160×160 pixels, 8-color "high-res mode" or
    // a 3:1(NTSC)/10:3(PAL) pixel aspect ratio, 80×160 pixels, 10-color "multicolor mode".
    //
    // In the 8-color high-res mode, every 8×8 pixels can have the background color (shared for the
    // entire screen) or a free foreground color, both selectable among the first eight colors of the
    // palette.

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(
            content,
            {
                // Each possible one-bit value corresponds to a specific selectable color:
                // %0 = screen color
                // %1 = character/cell color
                globalColorsBitPattern: [{ paletteIndex: content.backgroundColor, bitPattern: 0x00 }],
                colorsBitPattern: [ 0x01 ]
            }
        ),
        colorParamMapper: getVicColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 1, content);
                    return colors[0];
                }
            }
        ),
        extraParamMapper: {
            data(): Uint8Array {
                let array = new Uint8Array(3);
                array[0] = content.backgroundColor;
                array[1] = content.borderColor;
                array[2] = content.auxColor;
                return array;
            }
        }
    });
}

export function exportVicMulti(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    // In the 10-color multicolor mode, a single pixel of every 4×8 block (a character cell)
    // may have any of four colors: the background color, the auxiliary color (both shared for the
    // entire screen and selectable among the entire palette), the same color as the overscan border
    // (also a shared color) or a free foreground color, both selectable among the first eight colors
    // of the palette.

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(
            content,
            {
                // Each possible two-bit value corresponds to a specific selectable color:
                // %00 = screen color
                // %01 = border color
                // %10 = character/cell color
                // %11 = auxiliary color
                globalColorsBitPattern: [
                    { paletteIndex: content.backgroundColor, bitPattern: 0x00 },
                    { paletteIndex: content.borderColor, bitPattern: 0x01 },
                    { paletteIndex: content.auxColor, bitPattern: 0x03 }
                ],
                colorsBitPattern: [ 0x02 ]
            }
        ),
        colorParamMapper: getVicColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 1, content);
                    return colors[0];
                }
            }
        ),
        extraParamMapper: {
            data(): Uint8Array {
                let array = new Uint8Array(3);
                array[0] = content.backgroundColor;
                array[1] = content.borderColor;
                array[2] = content.auxColor;
                return array;
            }
        }
    });
}

function getZxCellMapper(
    content: BlockParamDitherCanvasContent,
    mapper?: CellExporterMapper | Partial<CellExporterMapper_Iterate>): CellExporterMapper {

    let bpp = content.bitsPerColor;
    let bitsPerCellWidth = (content.cell.w * bpp);

    let exporter: CellExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            return { data: new Uint8Array(content.width * content.height * content.bitsPerColor / 8) };
        },

        xyToBitInfo(x: number, y: number): BitInfo {

            let column = Math.floor(x / content.block.w);
            let paramOffset = (Math.floor(y / content.block.h) * content.block.columns) + column;

            let xInBytes = Math.floor(x / content.block.w);

            // see http://www.breakintoprogram.co.uk/hardware/computers/zx-spectrum/screen-memory-layout
            //
            // To calculate the screen address of a byte, you encode the address as follows:
            //              HIGH              |              LOW
            // -------------------------------+-------------------------------
            //  15| 14| 13| 12| 11| 10| 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 
            // ---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---
            //  x | x | x | Y7| Y6| Y2| Y1| Y0| Y5| Y4| Y3| X4| X3| X2| X1| X0
            //
            // Where:
            //
            // The base address of screen memory (0x4000) is provided by setting bits 15 to 13 to 010.
            // Y0 to Y7 is the Y coordinate (in pixels)
            // X0 to X4 is the X coordinate (in bytes)
            //
            // The 0x4000 address (x values) are set to 0 since this is an array offset not a memory offset.

            let strangeOffset = (((y & 0b11000000) >> 6) << 11) |
                                (((y & 0b00000111) >> 0) << 8) |
                                (((y & 0b00111000) >> 3) << 5) |
                                (((xInBytes & 0b00011111) >> 0) << 0);

            let bitShift = (content.cell.msbToLsb ? (bitsPerCellWidth - (((x % content.cell.w) + 1) * bpp)) : (x % content.cell.w) * bpp);

            return {
                offset: strangeOffset,
                bitShift: bitShift,
                bitCount: bpp,
                paramOffset: paramOffset
            };
        }
    };

    return exporter;
}

export function exportZXSpectrum(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    
    let content: BlockParamDitherCanvasContent = message.content;

    // from http://www.breakintoprogram.co.uk/hardware/computers/zx-spectrum/screen-memory-layout
    //
    // %0 = paper
    // %1 = ink
    // intensity = high bit of either paper or ink (since both palette choices MUST share the same intensity)

    // Each attribute cell is as follows:
    //  7 | 6 | 5 | 4 | 3 | 2 | 1 | 0
    // ---+---+---+---+---+---+---+---
    //  F | B | P2| P1| P0| I2| I1| I0
    //
    // Where:
    // F sets the attribute FLASH mode
    // B sets the attribute BRIGHTNESS mode
    // P2 to P0 is the PAPER color (index 0-7)
    // I2 to I0 is the INK color (index 0-7)

    // The B bit is taken from the either chosen palette color since both are chosen as
    // dark (thus will have a B of "0") or both will be chosen bright (thus will have
    // a B of "1"). Since the B is taken from the high-bit of the 0x00 -> 0x0F palette
    // where indexes 0x08 -> 0x0F are "bright", the B bit will always be set correctly.

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getZxCellMapper(
            content,
            {
                colorsBitPattern: [ 0x00, 0x01 ]
            }
        ),
        colorParamMapper: getVicColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 2, content);
                    return ((colors[0] & 0x07) << 3) | (colors[1] & 0x7) | (((colors[0] & 0x08) >> 3) << 6);
                }
            }
        )
    });
}

function getSticColorMapper(
    content: BlockParamDitherCanvasContent,
    mapper: ParamExporterMapper | Partial<ParamExporterMapper_Iterate>): ParamExporterMapper {

    let exporter: ParamExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            let columns = 20;
            let rows = 12;

            // the color ram maps to the BACKTAB, the CP1600 is a 16 bit CPU and the
            // byte order is stored in little endian when serialized as binary
            return { data: new Uint8Array((columns * rows) * 2), littleEndian: true };
        },
        prefill(array: Uint8Array): void {
            let c1 = 7;         // white on black
            let c2 = 0;
            let gromCard = 0;   // use a blank space
            let grom = 0;       // use the rom character (not the ram)
            let result = c1 | ((c2 & 0b11) << 9) | (((c2 & 0b100) >> 2) << 13) | (((c2 & 0b1000) >> 3) << 12) | (gromCard << 3) << (grom << 11);

            let lowByte = result & 0xff;
            let highByte = (result & 0xff00) >> 8;

            for (let i = 0; i < array.length; ++i) {
                if (i % 2 == 0) {
                    array[i] = lowByte;
                } else {
                    array[i] = highByte;
                }
            }

            // insert the stamp into the BACKTAB
            let offset = (9 * 20) * 2;  // 0-7th row is gram bitmap, 8th row left blank, 9th row
            const stamp: number[] = [0x2D, 0x41, 0x44, 0x45, 0x00, 0x42, 0x59, 0x00, 0x24, 0x49, 0x54, 0x48, 0x45, 0x52, 0x54, 0x53, 0x4F, 0x4e];
            for (let x = 0; x < stamp.length; ++x) {
                let result = c1 | ((c2 & 0b11) << 9) | (((c2 & 0b100) >> 2) << 13) | (((c2 & 0b1000) >> 3) << 12) | (stamp[x] << 3) << (grom << 11);

                let lowByte = result & 0xff;
                let highByte = (result & 0xff00) >> 8;
                array[offset + (x *2)] = lowByte;
                array[offset + (x *2) + 1] = highByte;
            }
        },
        paramToBitInfo(paramOffset: number): BitInfo {

            // picture is arranged 8x8 grid for gram, or 20x12 grid for grom of 8x8 pixels despite
            // but layout is always 20 x 12

            // figure out the param's y
            let y = Math.floor(paramOffset / Math.floor(content.width / content.block.w));

            // figure out the param's x
            let x = paramOffset % Math.floor(content.width / content.block.w);

            // recalculate a new offset
            let offset = (y * 20) + x;

            return {
                offset: offset * 2, // the values are 16 bits
                bitShift: 0,
                bitCount: 16,
                paramOffset: paramOffset
            };
        }
    };

    return exporter;
}

export function exportSticFgbg(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(
            content,
            {
                colorsBitPattern: [ 0x00, 0x01 ]
            }
        ),
        colorParamMapper: getSticColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {

                    //
                    // 15 | 14 | 13 | 12 | 11 | 10 | 09 | 08 | 07 | 06 | 05 | 04 | 03 | 02 | 01 | 00
                    // ---+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----
                    //  x |  x | B2 | B3 | GR | B1 | B0 | G5 | G4 | G3 | G2 | G1 | G0 | F2 | F1 | F0
                    //
                    // x = unused
                    // B = Background
                    // F = Foreground
                    // G = Graphic Card
                    // GR = 1 for GRAM, 0 for GROM (GRAM 0...63 GROM 0...255)
                    //

                    let colors = extractColorsFromParamContent(param, 2, content);

                    let c1 = colors[0];    // foreground color (3-bit)
                    let c2 = colors[1];    // background color (4-bit)

                    let gram = 0b1;
                    let gramCard = (info.paramOffset & 0b111111);

                    let result = c1 | ((c2 & 0b11) << 9) | (((c2 & 0b100) >> 2) << 13) | (((c2 & 0b1000) >> 3) << 12) | (gramCard << 3) << (gram << 11);
                    //console.log('BACKTAB', hex(result), result, c1, c2, gram, gramCard);
                    return result;
                }
            }
        ),
    });
}

function getSticCellMapper(
    content: BlockParamDitherCanvasContent,
    mapper?: ParamExporterMapper | Partial<ParamExporterMapper_Iterate>): ParamExporterMapper {

    const bytesPerImage = 8;

    let exporter: ParamExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            let columns = 8;
            let rows = 8;

            // the color ram maps to the BACKTAB, the CP1600 is a 16 bit CPU and the
            // byte order is stored in little endian when serialized as binary
            return { data: new Uint8Array((columns * rows) * bytesPerImage), littleEndian: true };
        },
        finalize(iteration, cellImage, colors, colorBlock, cellBlock, extra): boolean {

            for (let cellParamOffset = 0; cellParamOffset < content.cellParams.length; ++cellParamOffset) {
                let extracted = extractColorsFromParams(cellParamOffset, content.cellParams, 2, 0xff, 8);
                // extracted[0] == 1 when using the gram, extracted[1] is the gram block being used
                if (extracted[0] == 0)
                    continue;

                // the destination is an 8x8 grid of 8 bytes each, starting where the cell param indicates
                let dest = (extracted[1] * bytesPerImage);

                // the source is a 20x12 rom grid of 8 bytes each
                // translate the cell param offset into the source position
                let column = (cellParamOffset % content.cell.columns);
                let row = Math.floor(cellParamOffset / content.cell.columns);

                let source = (row * content.cell.columns * bytesPerImage) + (column * 8);

                for (let i = 0; i < bytesPerImage; ++i) {
                    // copy the 8 bytes from grom to gram
                    cellBlock[dest + i] = cellImage[source + i];
                }
            }
            return false;
        },
    };

    return exporter;
}

export function exportSticColorStack(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    let cellColorsBitPattern = [ 0x00, 0x01 ];

    let cellMapper = getVicCellMapper(
        content, 
        {
            paramToBitPattern(param: number, paletteIndex: number, info: BitInfo): number {

                let colors = extractColorsFromParamContent(param, content.paletteChoices.colors, content);

                for (let i = 0; i < content.paletteChoices.colors; ++i) {
                    if (colors[i] == paletteIndex)
                        return cellColorsBitPattern[1 + i];
                }

                let cbColor = extractColorsFromParamsContent(info.paramOffset, content.cbParams, 1, content)[0];
                if (cbColor == paletteIndex)
                    return cellColorsBitPattern[0];

                console.log('cb nor param color does not contain color from image', param, paletteIndex, colors, info, cbColor);
                console.assert(false);  // something went wrong as palette could not be mapped
                return 0;
            }
        }
    );

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: cellMapper,
        colorParamMapper: getSticColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {

                    //
                    // GRAM CARD:
                    //
                    // 15 | 14 | 13 | 12 | 11 | 10 | 09 | 08 | 07 | 06 | 05 | 04 | 03 | 02 | 01 | 00
                    // ---+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----
                    //  x |  x | AC | F3 |  1 |  x |  x | G5 | G4 | G3 | G2 | G1 | G0 | F2 | F1 | F0
                    //
                    // x = unused
                    // AC = Advance color stack
                    // F = Foreground (0-7)
                    // G = Graphic Card (0-63)
                    //
                    //
                    // GROM CARD:
                    //
                    // 15 | 14 | 13 | 12 | 11 | 10 | 09 | 08 | 07 | 06 | 05 | 04 | 03 | 02 | 01 | 00
                    // ---+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----
                    //  x |  x | AC |  0 |  0 | G7 | G6 | G5 | G4 | G3 | G2 | G1 | G0 | F2 | F1 | F0
                    //
                    // x = unused
                    // AC = Advance color stack
                    // F = Foreground (0-15)
                    // G = Graphic Card (0-255)
                    //
        
                    let colors = extractColorsFromParamContent(param, 2, content);
        
                    let c1 = colors[0];         // foreground color (3-bit)
                    let advance = colors[1];    // should the color stack be advanced
        
                    let gramMode = content.block.size = (8*8*8);    // this size must mean it's in gram only mode
        
                    let usingExtendedColor = ((c1 & 0b1000) != 0);
                    let cellInfo = (content.paramInfo.cell ? extractColorsFromParams(info.paramOffset, content.cellParams, 2, 0xff, 8) : [gramMode ? 1 : 0, gramMode ? (info.paramOffset & 0b111111) : 0]);
                    let usingGram = (cellInfo[0] != 0);
                    console.assert((!usingExtendedColor) || ((usingExtendedColor) && (usingGram)));
        
                    let gramOrRom = usingGram ? 0b1 : 0b0;
                    let gramOrRomCard = usingGram ? (cellInfo[1] & 0b111111) : (info.paramOffset & 0b11111111);
        
                    let result = (c1 & 0b111) | (((c1 & 0b1000) >> 3) << 12) | ((advance & 0b1) << 13) | (gramOrRomCard << 3) << (gramOrRom << 11);
                    //console.log('BACKTAB', hex(result), result, c1, advance, gramOrRom, gramOrRomCard, usingExtendedColor, cellInfo);
                    return result;
                }
            }
        ),
        cellParamMapper: (content.paramInfo.cell ? getSticCellMapper(content) : undefined),
        extraParamMapper: {
            data(): Uint8Array {
                let result = new Uint8Array(content.paramInfo.extra);
                for (let i = 0; i < content.paramInfo.extra; ++i) {
                    result[i] = extractColorsFromParamsContent(i, content.extraParams, 1, content)[0];
                }
                return result;
            }
        }
    });
}

function getTMS9918ColorMapper(
    content: BlockParamDitherCanvasContent,
    mapper?: ParamExporterMapper | Partial<ParamExporterMapper_Iterate>): ParamExporterMapper {

    let exporter: ParamExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            return { data: new Uint8Array(content.block.size) };
        },
        paramToBitInfo(paramOffset: number): BitInfo {
            let x = paramOffset & 31;
            let y = paramOffset >> 5;

            let offset = (y & 7) | (x << 3) | ((y >> 3) << 8);

            return {
                offset: offset,
                bitShift: 0,
                bitCount: 8,
                paramOffset: paramOffset
            };
        }
    };

    return exporter;
}

export function exportTMS9918(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(
            content,
            {
                colorsBitPattern: [ 0x00, 0x01 ]
            }
        ),
        colorParamMapper: getTMS9918ColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 2, content);
        
                    // a special transparency pixel color exists "0x00" which is defined
                    // as black in the palette, thus choose to remap the transparent
                    // pixel color choice as TMS9918's black "0x01".
                    colors[0] = (colors[0] == 0x00) ? 0x01 : colors[0];
                    colors[1] = (colors[1] == 0x00) ? 0x01 : colors[1];
        
                    return colors[0] | (colors[1] << 4);
                }
            }
        ),
    });
}

export function getSnesDirectColorCellMapper(
    content: BlockParamDitherCanvasContent,
    mapper?: CellExporterMapper | Partial<CellExporterMapper_Iterate>): CellExporterMapper {

    let exporter: CellExporterMapper = {
        prepare(): PrepareInfo {
            return { data: new Uint8Array() };
        },
        commit(array: Uint8Array): void {
        }
    };

    return exporter;
}

export function getSnesDirectColorBlockMapper(
    content: BlockParamDitherCanvasContent,
    mapper?: ParamExporterMapper | Partial<ParamExporterMapper_Iterate>): ParamExporterMapper {

    let exporter: ParamExporterMapper = {
        ...mapper,

        prepare(): PrepareInfo {
            return { data: new Uint8Array() };
        },
        commit(array: Uint8Array): void {
        }
    };

    return exporter;
}

export function exportSNESDirectColor(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    let content: BlockParamDitherCanvasContent = message.content;

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getSnesDirectColorCellMapper(
            content,
            {
                colorsBitPattern: [ 0x00, 0x01 ]
            }
        ),
        colorParamMapper: getTMS9918ColorMapper(
            content,
            {
                paramToBitPattern(param: number, info: BitInfo): number {
                    let colors = extractColorsFromParamContent(param, 2, content);

                    // a special transparency pixel color exists "0x00" which is defined
                    // as black in the palette, thus choose to remap the transparent
                    // pixel color choice as TMS9918's black "0x01".
                    colors[0] = (colors[0] == 0x00) ? 0x01 : colors[0];
                    colors[1] = (colors[1] == 0x00) ? 0x01 : colors[1];
        
                    return colors[0] | (colors[1] << 4);
                }
            }
        )
    });
}


export function exportNES(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    var i = 0;
    var cols = img.width / 8;
    var rows = img.height / 8;
    var char = new Uint8Array(img.width * img.height * 2 / 8);
    for (var y = 0; y < img.height; y++) {
        for (var x = 0; x < img.width; x++) {
            var charofs = Math.floor(x / 8) + Math.floor(y / 8) * cols;
            var ofs = charofs * 16 + (y & 7);
            var shift = 7 - (x & 7);
            var idx = (img.indexed[i]) & 0xff;
            char[ofs] |= (idx & 1) << shift;
            char[ofs + 8] |= ((idx >> 1) & 1) << shift;
            i++;
        }
    }
    return char;
}

export function exportNES5Color(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    if (!settings.block) throw "No block size";
    var char = exportFrameBuffer(img, settings);
    // TODO: attr block format
    var fmt = { w: settings.block.w, h: settings.block.h, bpp: 2 };
    var attr = new Uint8Array(convertImagesToWords([img.indexed], fmt));
    return concatArrays([char, attr]);
}

export function exportVCSPlayfield(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    // must be == 40 pixels wide
    var char = new Uint8Array(6 * img.height);
    const pfmap = [
        3, 2, 1, 0, -1, -1, -1, -1,
        4, 5, 6, 7, 8, 9, 10, 11,
        19, 18, 17, 16, 15, 14, 13, 12,
        23, 22, 21, 20, -1, -1, -1, -1,
        24, 25, 26, 27, 28, 29, 30, 31,
        39, 38, 37, 36, 35, 34, 33, 32,
    ];
    for (var y = 0; y < img.height; y++) {
        for (var x = 0; x < 48; x++) {
            var srcofs = pfmap[x];
            if (srcofs >= 0) {
                srcofs += y * img.width;
                if (img.indexed[srcofs]) {
                    var destofs = (x >> 3) * img.height + img.height - y - 1;
                    char[destofs] |= 128 >> (x & 7);
                }
            }
        }
    }
    return char;
}

export function exportMC6847(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    var char = new Uint8Array(img.width * img.height / 4);
    let dptr = 0;
    let sptr = 0;
    for (var y = 0; y < img.height; y++) {
        for (var x = 0; x < img.width; x += 4, sptr += 4) {
            char[dptr++] = ((img.indexed[sptr + 0] & 0b11) << 6) +
                ((img.indexed[sptr + 1] & 0b11) << 4) +
                ((img.indexed[sptr + 2] & 0b11) << 2) +
                ((img.indexed[sptr + 3] & 0b11) << 0);
        }
    }
    console.log(char);
    return char;
}

