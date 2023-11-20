import { DithertronSettings, PixelEditorImageFormat, PixelsAvailableMessage } from "../common/types";
import { ParamsContent, BlockParamDitherCanvasContent, extractColorsFromParams, extractColorsFromParamContent, extractColorsFromParamsContent } from "../dither/basecanvas";

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

function convertImagesToWords(images: Uint8Array[], fmt: PixelEditorImageFormat): ArrayLike<number> {
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
                var color = imgdata[i++];
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
                var col = img.indexed[srcofs++];
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

interface CellExporterMapper {
    prepare(): { totalBytes: number, littleEndian?: boolean };
    prefill?(array: Uint8Array): void;
    xyToBitInfo(x: number, y: number): BitInfo;
    commit?(array: Uint8Array): void;
}

interface ParamExporterMapper {
    prepare(): { totalBytes: number, littleEndian?: boolean };
    prefill?(array: Uint8Array): void;
    paramToBitInfo?(paramOffset: number): BitInfo;
    commit?(array: Uint8Array): void;
    finalize?(iteration: number, cellImage: Uint8Array, colors: Uint8Array, colorBlock: Uint8Array, cellBlock: Uint8Array, extra: Uint8Array): boolean;
}

interface CellExporter extends CellExporterMapper {
    paramToBitPattern(param: number, paletteIndex: number, info: BitInfo): number;
}

export function exportCellBuffer(
    message: PixelsAvailableMessage,
    content: BlockParamDitherCanvasContent,
    exporter: CellExporter
) : Uint8Array
{
    let setup = exporter.prepare();
    setup.littleEndian = setup.littleEndian === undefined ? true : setup.littleEndian;

    let array = new Uint8Array(setup.totalBytes);
    if (exporter.prefill !== undefined)
        exporter.prefill(array);

    for (let i = 0, y = 0; y < content.height; ++y) {
        for (let x = 0; x < content.width; ++x, ++i) {
            let info = exporter.xyToBitInfo(x, y);
            console.assert(info.paramOffset < content.blockParams.length);    // must be within the bounds of the param array
            let bitPattern = exporter.paramToBitPattern(content.blockParams[info.paramOffset], message.indexed[i], info);
            bitOverlayUint8Array(array, info.offset, bitPattern, info.bitShift, info.bitCount, setup.littleEndian);
        }
    }

    if (exporter.commit !== undefined)
        exporter.commit(array);
    return array;
}

function exportIndexedPaletteAndCellBasedImage(
    message: PixelsAvailableMessage,
    content: BlockParamDitherCanvasContent,
    mapper: CellExporterMapper | CellExporter,
    globalColors: { paletteIndex: number, bitPattern: number }[],
    colorChoicesBitPattern: number[]): Uint8Array {

    let exporter: CellExporter = {

        prepare: mapper.prepare,
        prefill: mapper.prefill,
        xyToBitInfo: mapper.xyToBitInfo,
        commit: mapper.commit,
        paramToBitPattern: ("paramToBitPattern" in mapper ? mapper.paramToBitPattern : (param: number, paletteIndex: number, info: BitInfo) => {

            let colors = extractColorsFromParamContent(param, content.block.colors, content);

            // first can the global colors for a match
            for (let i = 0; i < globalColors.length; ++i) {
                if (paletteIndex == globalColors[i].paletteIndex)
                    return globalColors[i].bitPattern;
            }

            // next scan the color choices for a match
            for (let i = 0; (i < colors.length) && (i < colorChoicesBitPattern.length) ; ++i) {
                if (paletteIndex != colors[i])
                    continue;
                return colorChoicesBitPattern[i];
            }

            console.log('global nor param color does not contain color from image', param, paletteIndex, colors, globalColors, info);
            console.assert(false);  // something went wrong as palette could not be mapped
            return 0;
        })
    };

    return exportCellBuffer(message, content, exporter);
}

interface ExportCombinedImageAndColorCellBuffer {
    message: PixelsAvailableMessage;
    content: BlockParamDitherCanvasContent;
    cellMapper: CellExporterMapper | CellExporter;
    colorParamMapper?: ParamExporterMapper,
    colorBlockParamMapper?: ParamExporterMapper,
    cellParamMapper?: ParamExporterMapper,
    extraParamMapper?: ParamExporterMapper,
    globalColors: { paletteIndex: number, bitPattern: number }[];
    cellColorsBitPattern: number[];
    paramToColor?(param: number, paramOffset?: number): number;         // if specified, colorParamMapper.paramToBitInfo must be specified
    paramToColorBlock?(param: number, paramOffset?: number): number;    // if specified, colorBlockParamMapper.paramToBitInfo must be specified
    paramToCell?(param: number, paramOffset?: number): number;          // if specified, cellParamMapper.paramToBitInfo must be specified
    paramToExtra?(param: number, paramOffset?: number): number;         // if specified, extraParamMapper.paramToBitInfo must be specified
    extra?(): Uint8Array;
    reorderArrays?(arrays: Uint8Array[]): Uint8Array[];
}

export function exportCombinedImageAndColorCellBuffer(options: ExportCombinedImageAndColorCellBuffer): Uint8Array {
    let isUsingColors = (options.colorParamMapper !== undefined);;
    let isUsingCb = (options.content.paramInfo.cb) && (options.colorBlockParamMapper !== undefined);
    let isUsingCell = (options.content.paramInfo.cell) && (options.cellParamMapper !== undefined);
    let isUsingExtra = (options.content.paramInfo.extra > 0) && (options.extraParamMapper !== undefined);

    let cellImage = exportIndexedPaletteAndCellBasedImage(
        options.message,
        options.content,
        options.cellMapper,
        options.globalColors,
        options.cellColorsBitPattern);

    let w = options.content.block.w;
    let h = options.content.block.h;

    let colorPrepareInfo = (isUsingColors ? options.colorParamMapper.prepare() : { totalBytes: 0, littleEndian: undefined });
    let colors = (isUsingColors ? new Uint8Array(colorPrepareInfo.totalBytes) : undefined);

    let colorBlockPrepareInfo = (isUsingCb ? options.colorBlockParamMapper.prepare() : { totalBytes: 0, littleEndian: undefined });
    let colorBlock: Uint8Array | undefined = (isUsingCb ? new Uint8Array(colorBlockPrepareInfo.totalBytes) : undefined);

    let cellPrepareInfo = (isUsingCell ? options.cellParamMapper.prepare() : { totalBytes: 0, littleEndian: undefined });
    let cellBlock: Uint8Array | undefined = (isUsingCell ? new Uint8Array(cellPrepareInfo.totalBytes) : undefined);

    let extraPrepareInfo = (isUsingExtra ? options.extraParamMapper.prepare() : { totalBytes: 0, littleEndian: undefined });
    let extraBlock: Uint8Array | undefined = (isUsingExtra ? new Uint8Array(extraPrepareInfo.totalBytes) : undefined);

    if (isUsingColors) {
        if (options.colorParamMapper.prefill !== undefined)
            options.colorParamMapper.prefill(colors);
    }

    if (isUsingCb) {
        if (options.colorBlockParamMapper.prefill !== undefined)
            options.colorBlockParamMapper.prefill(colorBlock);
    }
    
    if (isUsingCell) {
        if (options.cellParamMapper.prefill !== undefined)
            options.cellParamMapper.prefill(cellBlock);
    }
    
    if (isUsingExtra) {
        if (options.extraParamMapper.prefill !== undefined)
            options.extraParamMapper.prefill(extraBlock);
    }
    
    let extra = (isUsingExtra ? extraBlock : (options.extra === undefined ? undefined : options.extra()));

    if ((isUsingColors) && (options.paramToColor !== undefined)) {
        for (let i = 0; i < options.content.blockParams.length; i++) {
            let p = options.content.blockParams[i];
            let info = options.colorParamMapper.paramToBitInfo(i);
            let bitPattern = options.paramToColor(p, i);
            bitOverlayUint8Array(colors, info.offset, bitPattern, info.bitShift, info.bitCount, colorPrepareInfo.littleEndian);
        }
    }

    if ((isUsingCb) && (options.paramToColorBlock !== undefined)) {
        for (let i = 0; i < options.content.cbParams.length; i++) {
            // The color block ram is split out from the normal param area
            // to stored extra color block choices shared across
            // multiple pixels. The color block area is an extra shared
            // color ram that is independent of the "screen" color ram.

            let p = options.content.cbParams[i];
            let info = options.colorBlockParamMapper.paramToBitInfo(i);
            let bitPattern = options.paramToColorBlock(p, i);
            bitOverlayUint8Array(colorBlock, info.offset, bitPattern, info.bitShift, info.bitCount, colorBlockPrepareInfo.littleEndian);
        }
    }

    if ((isUsingCell) && (options.paramToCell !== undefined)) {
        for (let i = 0; i < options.content.cellParams.length; i++) {
            let p = options.content.cellParams[i];
            let info = options.cellParamMapper.paramToBitInfo(i);
            let bitPattern = options.paramToCell(p, i);
            bitOverlayUint8Array(cellBlock, info.offset, bitPattern, info.bitShift, info.bitCount, colorBlockPrepareInfo.littleEndian);
        }
    }

    if ((isUsingExtra) && (options.paramToExtra !== undefined)) {
        for (let i = 0; i < options.content.extraParams.length; i++) {
            let p = options.content.extraParams[i];
            let info = options.extraParamMapper.paramToBitInfo(i);
            let bitPattern = options.paramToExtra(p, i);
            bitOverlayUint8Array(extraBlock, info.offset, bitPattern, info.bitShift, info.bitCount, colorBlockPrepareInfo.littleEndian);
        }
    }

    if (isUsingColors) {
        if (options.colorParamMapper.commit !== undefined)
            options.colorParamMapper.commit(colors);
    }

    if (isUsingCb) {
        if (options.colorBlockParamMapper.commit !== undefined)
            options.colorBlockParamMapper.commit(colorBlock);
    }

    if (isUsingCell) {
        if (options.cellParamMapper.commit !== undefined)
            options.cellParamMapper.commit(cellBlock);
    }

    if (isUsingExtra) {
        if (options.extraParamMapper.commit !== undefined)
            options.extraParamMapper.commit(extraBlock);
    }

    let continueFinalize = true;
    for (let i = 0; continueFinalize; ++i) {

        continueFinalize = false;

        if (isUsingColors) {
            if (options.colorParamMapper.finalize !== undefined)
                continueFinalize = options.colorParamMapper.finalize(i, cellImage, colors, colorBlock, cellBlock, extraBlock) || continueFinalize;
        }

        if (isUsingCb) {
            if (options.colorBlockParamMapper.finalize !== undefined)
                continueFinalize = options.colorBlockParamMapper.finalize(i, cellImage, colors, colorBlock, cellBlock, extraBlock) || continueFinalize;
        }

        if (isUsingCell) {
            if (options.cellParamMapper.finalize !== undefined)
                continueFinalize = options.cellParamMapper.finalize(i, cellImage, colors, colorBlock, cellBlock, extraBlock) || continueFinalize;
        }

        if (isUsingExtra) {
            if (options.extraParamMapper.finalize !== undefined)
                continueFinalize = options.extraParamMapper.finalize(i, cellImage, colors, colorBlock, cellBlock, extraBlock) || continueFinalize;
        }
    }

    let mergeArrays = [cellImage, colors, colorBlock, cellBlock, extra];
    // make sure the array was in use
    mergeArrays = mergeArrays.filter((x) => x !== undefined);
    if (options.reorderArrays !== undefined) {
        mergeArrays = options.reorderArrays(mergeArrays);
    }

    return concatArrays(mergeArrays);
}

function getVicCellMapper(content: BlockParamDitherCanvasContent): CellExporterMapper {

    let bpp = content.bitsPerColor;
    let bitsPerCellWidth = (content.cell.w * bpp);
    let bitsPerCell = content.cell.h * bitsPerCellWidth;
    let bytesPerCell = Math.ceil(bitsPerCell / 8);
    let cellBytesPerRow = 0;

    let exporter: CellExporterMapper = {

        prepare(): { totalBytes: number, littleEndian?: boolean } {
            //columns = (width / w);
            cellBytesPerRow = content.block.columns * bytesPerCell;
            return { totalBytes: content.width * content.height * bpp / 8 };
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

function getVicColorMapper(content: BlockParamDitherCanvasContent): ParamExporterMapper {

    let isUsingFli = content.fliMode;

    let bpp = content.bitsPerColor;

    let colorAlignedBytes: number = 0;

    let exporter: ParamExporterMapper = {

        prepare(): { totalBytes: number, littleEndian?: boolean } {

            let colorBytes = (content.cell.columns * content.cell.rows);
            colorAlignedBytes = (1 << Math.ceil(Math.log2(colorBytes)));

            return { totalBytes: isUsingFli ? (colorAlignedBytes * content.cell.h) : (content.cell.columns * content.cell.rows) };
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

function getVicColorBlockMapper(content: BlockParamDitherCanvasContent): ParamExporterMapper {

    let exporter: ParamExporterMapper = {
        prepare(): { totalBytes: number, littleEndian?: boolean } {
            return { totalBytes: content.cb.columns * content.cb.rows };
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

    // background for bit pattern %00
    // lower nybble for bit pattern %10
    // upper nybble for bit pattern %01
    // color block nybble for bit pattern %11
    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(content),
        colorParamMapper: getVicColorMapper(content),
        colorBlockParamMapper: getVicColorBlockMapper(content),
        globalColors: [{ paletteIndex: content.backgroundColor & 0xf, bitPattern: 0x00 }],
        cellColorsBitPattern: [ 0x02, 0x01, 0x03 ],
        paramToColor(param: number): number {
            let colors = extractColorsFromParamContent(param, 2, content);
            return colors[0] | colors[1] << 4;
        },
        paramToColorBlock(param: number): number {
            let colors = extractColorsFromParamContent(param, 1, content);
            return colors[0];
        },
        extra(): Uint8Array {
            let array = new Uint8Array(2);
            array[0] = (content.backgroundColor & 0x0f) | ((content.auxColor & 0x0f) << 4);
            array[1] = (content.borderColor & 0x0f);
            return array;
        }
    });
}

export function exportC64Hires(message: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let content: BlockParamDitherCanvasContent = message.content;

    // lower nybble for bit pattern %0
    // upper nybble for bit pattern %1

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(content),
        colorParamMapper: getVicColorMapper(content),
        globalColors: [],
        cellColorsBitPattern: [ 0x01, 0x00 ],
        paramToColor(param: number): number {
            let colors = extractColorsFromParamContent(param, 2, content);
            return (colors[0] << 4) | (colors[1]);
        },
        extra(): Uint8Array {
            let array = new Uint8Array(2);
            array[0] = (content.backgroundColor & 0x0f) | ((content.auxColor & 0x0f) << 4);
            array[1] = (content.borderColor & 0x0f);
            return array;
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
    //
    // Each possible one-bit value corresponds to a specific selectable color:
    // %0 = screen color
    // %1 = character/cell color

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(content),
        colorParamMapper: getVicColorMapper(content),
        globalColors: [{ paletteIndex: content.backgroundColor, bitPattern: 0x00 }],
        cellColorsBitPattern: [ 0x01 ],
        paramToColor(param: number): number {
            let colors = extractColorsFromParamContent(param, 1, content);
            return colors[0];
        },
        extra(): Uint8Array {
            let array = new Uint8Array(3);
            array[0] = content.backgroundColor;
            array[1] = content.borderColor;
            array[2] = content.auxColor;
            return array;
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

    // Each possible two-bit value corresponds to a specific selectable color:
    // %00 = screen color
    // %01 = border color
    // %10 = character/cell color
    // %11 = auxiliary color

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: getVicCellMapper(content),
        colorParamMapper: getVicColorMapper(content),
        globalColors: [
            { paletteIndex: content.backgroundColor, bitPattern: 0x00 },
            { paletteIndex: content.borderColor, bitPattern: 0x01 },
            { paletteIndex: content.auxColor, bitPattern: 0x03 }
        ],
        cellColorsBitPattern: [ 0x02 ],
        paramToColor(param: number): number {
            let colors = extractColorsFromParamContent(param, 1, content);
            return colors[0];
        },
        extra(): Uint8Array {
            let array = new Uint8Array(3);
            array[0] = content.backgroundColor;
            array[1] = content.borderColor;
            array[2] = content.auxColor;
            return array;
        }
    });
}

function getZxCellMapper(content: BlockParamDitherCanvasContent): CellExporterMapper {

    let bpp = content.bitsPerColor;
    let bitsPerCellWidth = (content.cell.w * bpp);

    let exporter: CellExporterMapper = {
        prepare(): { totalBytes: number, littleEndian?: boolean } {
            return { totalBytes: content.width * content.height * content.bitsPerColor / 8 };
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
        cellMapper: getZxCellMapper(content),
        colorParamMapper: getVicColorMapper(content),
        globalColors: [],
        cellColorsBitPattern: [ 0x00, 0x01 ],
        paramToColor(param: number): number {
            let colors = extractColorsFromParamContent(param, 2, content);
            return ((colors[0] & 0x07) << 3) | (colors[1] & 0x7) | (((colors[0] & 0x08) >> 3) << 6);
        },
        extra(): undefined { return undefined; }
    });
}

function getSticColorMapper(content: BlockParamDitherCanvasContent): ParamExporterMapper {

    let exporter: ParamExporterMapper = {

        prepare(): { totalBytes: number, littleEndian?: boolean } {
            let columns = 20;
            let rows = 12;

            // the color ram maps to the BACKTAB, the CP1600 is a 16 bit CPU and the
            // byte order is stored in little endian when serialized as binary
            return { totalBytes: (columns * rows) * 2, littleEndian: true };
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
        cellMapper: getVicCellMapper(content),
        colorParamMapper: getSticColorMapper(content),
        globalColors: [],
        cellColorsBitPattern: [ 0x00, 0x01 ],
        paramToColor(param: number, paramOffset: number): number {

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
            let gramCard = (paramOffset & 0b111111);

            let result = c1 | ((c2 & 0b11) << 9) | (((c2 & 0b100) >> 2) << 13) | (((c2 & 0b1000) >> 3) << 12) | (gramCard << 3) << (gram << 11);
            //console.log('BACKTAB', hex(result), result, c1, c2, gram, gramCard);
            return result;
        }
    });
}

function getSticCellMapper(content: BlockParamDitherCanvasContent): ParamExporterMapper {

    const bytesPerImage = 8;

    let exporter: ParamExporterMapper = {

        prepare(): { totalBytes: number, littleEndian?: boolean } {
            let columns = 8;
            let rows = 8;

            // the color ram maps to the BACKTAB, the CP1600 is a 16 bit CPU and the
            // byte order is stored in little endian when serialized as binary
            return { totalBytes: (columns * rows) * bytesPerImage, littleEndian: true };
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

    let cellMapper = {
        ...getVicCellMapper(content),
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
    };

    return exportCombinedImageAndColorCellBuffer({
        message: message,
        content: content,
        cellMapper: cellMapper,
        colorParamMapper: getSticColorMapper(content),
        globalColors: [],
        cellColorsBitPattern: cellColorsBitPattern,
        cellParamMapper: (content.paramInfo.cell ? getSticCellMapper(content) : undefined),
        paramToColor(param: number, paramOffset: number): number {

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
            let cellInfo = (content.paramInfo.cell ? extractColorsFromParams(paramOffset, content.cellParams, 2, 0xff, 8) : [gramMode ? 1 : 0, gramMode ? (paramOffset & 0b111111) : 0]);
            let usingGram = (cellInfo[0] != 0);
            console.assert((!usingExtendedColor) || ((usingExtendedColor) && (usingGram)));

            let gramOrRom = usingGram ? 0b1 : 0b0;
            let gramOrRomCard = usingGram ? (cellInfo[1] & 0b111111) : (paramOffset & 0b11111111);

            let result = (c1 & 0b111) | (((c1 & 0b1000) >> 3) << 12) | ((advance & 0b1) << 13) | (gramOrRomCard << 3) << (gramOrRom << 11);
            //console.log('BACKTAB', hex(result), result, c1, advance, gramOrRom, gramOrRomCard, usingExtendedColor, cellInfo);
            return result;
        },
        extra(): Uint8Array {
            let result = new Uint8Array(content.paramInfo.extra);
            for (let i = 0; i < content.paramInfo.extra; ++i) {
                result[i] = extractColorsFromParamsContent(i, content.extraParams, 1, content)[0];
            }
            return result;
        }
    });
}
function getTMS9918ColorMapper(content: BlockParamDitherCanvasContent): ParamExporterMapper {

    let exporter: ParamExporterMapper = {

        prepare(): { totalBytes: number, littleEndian?: boolean } {
            return { totalBytes: content.block.size };
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
        cellMapper: getVicCellMapper(content),
        colorParamMapper: getTMS9918ColorMapper(content),
        globalColors: [],
        cellColorsBitPattern: [ 0x00, 0x01 ],
        paramToColor(param: number, paramOffset: number): number {
            let colors = extractColorsFromParamContent(param, 2, content);

            // a special transparency pixel color exists "0x00" which is defined
            // as black in the palette, thus choose to remap the transparent
            // pixel color choice as TMS9918's black "0x01".
            colors[0] = (colors[0] == 0x00) ? 0x01 : colors[0];
            colors[1] = (colors[1] == 0x00) ? 0x01 : colors[1];

            return colors[0] | (colors[1] << 4);
        }
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
            var idx = img.indexed[i];
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

