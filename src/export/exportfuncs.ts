import { DithertronSettings, PixelEditorImageFormat, PixelsAvailableMessage } from "../common/types";
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

interface CellExporterMapper {
    prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean };
    xyToBitInfo(x: number, y: number): { offset: number, bitShift: number, bitCount: number, paramOffset: number };
}

interface ColorExporterMapper {
    prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean };
    paramToBitInfo(paramOffset: number): { offset: number, bitShift: number, bitCount: number };
}

interface CellExporter extends CellExporterMapper {
    paramToBitPattern(param: number, paletteIndex: number): number;
}

export function exportCellBuffer(
    img: PixelsAvailableMessage,
    exporter: CellExporter
) : Uint8Array
{
    let setup = exporter.prepare(img.width, img.height);
    setup.littleEndian = setup.littleEndian === undefined ? true : setup.littleEndian;

    let array = new Uint8Array(setup.totalBytes);
    for (let i = 0, y = 0; y < img.height; ++y) {
        for (let x = 0; x < img.width; ++x, ++i) {
            let info = exporter.xyToBitInfo(x, y);
            console.assert(info.paramOffset < img.params.length);    // must be within the bounds of the param array
            let bitPattern = exporter.paramToBitPattern(img.params[info.paramOffset], img.indexed[i]);
            bitOverlayUint8Array(array, info.offset, bitPattern, info.bitShift, info.bitCount, setup.littleEndian);
        }
    }
    return array;
}

function exportIndexedPaletteAndCellBasedImage(
    img: PixelsAvailableMessage,
    mapper: CellExporterMapper,
    globalColors: { paletteIndex: number, bitPattern: number }[],
    colorChoicesBitPattern: number[]): Uint8Array {

    let exporter: CellExporter = {

        prepare: mapper.prepare,
        xyToBitInfo: mapper.xyToBitInfo,
        paramToBitPattern(param: number, paletteIndex: number): number {

            let c1 = param & 0xf;
            let c2 = (param & 0xf0) >> 4;
            let c3 = (param & 0xf00) >> 8;

            // first can the global colors for a match
            for (let i = 0; i < globalColors.length; ++i) {
                if (paletteIndex == globalColors[i].paletteIndex)
                    return globalColors[i].bitPattern;
            }

            // next scan the color choices for a match
            switch (paletteIndex) {
                case c1: {
                    console.assert(colorChoicesBitPattern.length > 0);
                    return colorChoicesBitPattern[0];
                }
                case c2: {
                    console.assert(colorChoicesBitPattern.length > 1);
                    return colorChoicesBitPattern[1];
                }
                case c3: {
                    console.assert(colorChoicesBitPattern.length > 2);
                    return colorChoicesBitPattern[2];
                }
            }
            console.assert(false);  // something went wrong as palette could not be mapped
            return 0;
        }
    };

    return exportCellBuffer(img, exporter);
}

interface ExportCombinedImageAndColorCellBuffer {
    img: PixelsAvailableMessage;
    settings: DithertronSettings;
    cellMapper: CellExporterMapper;
    colorMapper: ColorExporterMapper,
    colorBlockMapper: ColorExporterMapper | undefined,
    globalColors: { paletteIndex: number, bitPattern: number }[];
    cellColors: number[];
    paramToColor(param: number): number;
    paramToColorBlock(param: number): number;
    extra(): Uint8Array | undefined
}

export function exportCombinedImageAndColorCellBuffer(options: ExportCombinedImageAndColorCellBuffer): Uint8Array {
    if (options.settings.block == undefined)
        throw "No block size";

    let isUsingCb = (!(options.settings.cb === undefined)) && (!(options.colorBlockMapper === undefined));

    let cellImage = exportIndexedPaletteAndCellBasedImage(
        options.img,
        options.cellMapper,
        options.globalColors,
        options.cellColors);

    let w = options.settings.block.w;
    let h = options.settings.block.h;
    let cbOffset: number = Math.floor((options.img.width / w) * (options.img.height / h));

    let colorPrepareInfo = options.colorMapper.prepare(options.img.width, options.img.height);
    let colors = new Uint8Array(colorPrepareInfo.totalBytes);
    
    let colorBlockPrepareInfo = (isUsingCb ? options.colorBlockMapper.prepare(options.img.width, options.img.height) : { totalBytes: 0, littleEndian: undefined });
    let colorBlock: Uint8Array | undefined = (isUsingCb ? new Uint8Array(colorBlockPrepareInfo.totalBytes) : undefined);

    let extra = options.extra();
    let paramExtraBytes = options.settings.param == undefined ? 0 : options.settings.param.extra;

    for (let i = 0; i < cbOffset; i++) {
        let p = options.img.params[i];
        let info = options.colorMapper.paramToBitInfo(i);
        let bitPattern = options.paramToColor(p);
        bitOverlayUint8Array(colors, info.offset, bitPattern, info.bitShift, info.bitCount, colorPrepareInfo.littleEndian);
    }

    for (let i = cbOffset; i < cbOffset + (options.img.params.length - cbOffset - paramExtraBytes); i++) {
        // The color block ram is split out from the normal param area
        // to stored extra color block choices shared across
        // multiple pixels. The color block area is an extra shared
        // color ram that is independent of the "screen" color ram.

        let p = options.img.params[i];
        let info = options.colorBlockMapper.paramToBitInfo(i);
        let bitPattern = options.paramToColor(p);
        bitOverlayUint8Array(colorBlock, info.offset, bitPattern, info.bitShift, info.bitCount, colorBlockPrepareInfo.littleEndian);
    }

    let mergeArrays = [cellImage, colors, colorBlock, extra];
    if (colorBlock === undefined)
        mergeArrays.splice(2, 1);
    if (extra === undefined)
        mergeArrays.splice(mergeArrays.length - 1, 1);

    return concatArrays(mergeArrays);
}

function getVicCellMapper(settings: DithertronSettings): CellExporterMapper {

    if (settings.block === undefined)
        throw "Block size not specified";
    if (settings.cell === undefined)
        throw "Cell size not specified";

    let w = settings.block.w;
    let h = settings.block.h;

    let bpp = Math.ceil(Math.log2(settings.block.colors));
    let bitsPerCellWidth = (settings.cell.w * bpp);
    let bitsPerCell = settings.cell.h * bitsPerCellWidth;
    let bytesPerCell = Math.ceil(bitsPerCell / 8);
    let cellBytesPerRow = 0;

    let columns: number = 0;

    let exporter: CellExporterMapper = {

        prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean } {
            columns = (width / w);
            cellBytesPerRow = columns * bytesPerCell;
            return { totalBytes: width * height * bpp / 8 };
        },

        xyToBitInfo(x: number, y: number): { offset: number, bitShift: number, bitCount: number, paramOffset: number } {

            let col = Math.floor(x / w);

            // which cell is being filled
            let cellCol = Math.floor(x / settings.cell.w);
            let cellRow = Math.floor(y / settings.cell.h);

            let paramOffset = (Math.floor(y / h) * columns) + col;

            // where is the start of the cell being filled located in the byte array
            let cellColOffset = bytesPerCell * cellCol;
            let cellRowOffset = cellBytesPerRow * cellRow;

            // which particular byte of the cell is being filled now
            let cellXOffset = Math.floor(((x % settings.cell.w) * bpp) / 8);
            let cellYOffset = Math.floor(((y % settings.cell.h) * bitsPerCellWidth) / 8);

            // how much of a bit offset is required for this particular pixel
            let bitShift = (settings.cell.msbToLsb ? (bitsPerCellWidth - (((x % settings.cell.w) + 1) * bpp)) : (x % settings.cell.w) * bpp);

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

function getVicColorMapper(settings: DithertronSettings): ColorExporterMapper {

    let isUsingFli = !(settings.fli === undefined);

    let w = settings.block.w;
    let h = settings.block.h;

    let bpp = Math.ceil(Math.log2(settings.block.colors));

    let captureWidth: number = 0;

    let cbOffset: number = 0;

    let columns: number = 0;
    let rows: number = 0;

    let colorBytes: number = 0;
    let colorAlignedBytes: number = 0;

    let exporter: ColorExporterMapper = {

        prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean } {
            captureWidth = width;

            columns = Math.floor(width / settings.cell.w);
            rows = Math.floor(height / settings.cell.h);
        
            colorBytes = (columns * rows);
            colorAlignedBytes = (1 << Math.ceil(Math.log2(colorBytes)));

            cbOffset = Math.floor((width / w) * (height / h));

            return { totalBytes: isUsingFli ? (colorAlignedBytes * settings.cell.h) : (columns * rows) };
        },

        paramToBitInfo(paramOffset: number): { offset: number, bitShift: number, bitCount: number } {

            let offset: number = 0;

            // Normally in graphics mode each screen pixel in a 4x8 or 8x8 block chooses from
            // cell colors dedicated for the entire block (stored in "screen" color ram).
            // However, in FLI mode each pixel row gets a new choice of colors since on
            // each scan line special code swaps the "screen" color ram pointer location to
            // a new location in memory thus allowing for independent values per row.
            if (isUsingFli) {
                offset = (Math.floor(paramOffset / columns) & (settings.cell.h - 1)) * colorAlignedBytes + (Math.floor(paramOffset / (bpp * captureWidth)) * columns) + (paramOffset % columns);
            } else {
                offset = paramOffset;
            }

            return {
                offset: offset,
                bitShift: 0,
                bitCount: 8
            };
        }
    };

    return exporter;
}

function getVicColorBlockMapper(settings: DithertronSettings): ColorExporterMapper {

    let isUsingCb = !(settings.cb === undefined);

    let w = settings.block.w;
    let h = settings.block.h;

    let cbw: number = (isUsingCb ? settings.cb.w === undefined ? w : settings.cb.w : w);
    let cbh: number = (isUsingCb ? settings.cb.h === undefined ? h : settings.cb.h : h);

    let cbOffset: number = 0;

    let exporter: ColorExporterMapper = {

        prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean } {

            let cbCols = width / cbw;
            let cbRows = height / cbh;
            cbOffset = Math.floor((width / w) * (height / h));
            return { totalBytes: cbCols * cbRows };
        },

        paramToBitInfo(paramOffset: number): { offset: number, bitShift: number, bitCount: number } {

            console.assert(paramOffset >= cbOffset);

            return {
                offset: paramOffset - cbOffset,
                bitShift: 0,
                bitCount: 8
            };
        }
    };

    return exporter;
}

export function exportC64Multi(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let extraWord = img.params[img.params.length - 1]; // background, border colors

    // background for bit pattern %00
    // lower nybble for bit pattern %10
    // upper nybble for bit pattern %01
    // color block nybble for bit pattern %11
    return exportCombinedImageAndColorCellBuffer({
        img: img,
        settings: settings,
        cellMapper: getVicCellMapper(settings),
        colorMapper: getVicColorMapper(settings),
        colorBlockMapper: getVicColorBlockMapper(settings),
        globalColors: [{ paletteIndex: extraWord & 0xf, bitPattern: 0x00 }],
        cellColors: [ 0x02, 0x01, 0x03 ],
        paramToColor(param: number): number { return param & 0xff; },
        paramToColorBlock(param: number): number { return param & 0x0f; },
        extra(): Uint8Array {
            let array = new Uint8Array(2);
            array[0] = extraWord & 0xff;          // background color (and high nybble aux, which is N/A)
            array[1] = (extraWord >> 8) & 0xff;   // border color
            return array;
        }
    });
}

export function exportC64Hires(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let extraWord = img.params[img.params.length - 1]; // background, border colors

    // lower nybble for bit pattern %0
    // upper nybble for bit pattern %1

    return exportCombinedImageAndColorCellBuffer({
        img: img,
        settings: settings,
        cellMapper: getVicCellMapper(settings),
        colorMapper: getVicColorMapper(settings),
        colorBlockMapper: undefined,
        globalColors: [],
        cellColors: [ 0x01, 0x00 ],
        paramToColor(param: number): number { return ((param & 0x0f) << 4) | ((param & 0xf0) >> 4); },
        paramToColorBlock(param: number): number { return 0; },
        extra(): Uint8Array {
            let array = new Uint8Array(2);
            array[0] = extraWord & 0xff;          // background color (and high nybble aux, which is N/A)
            array[1] = (extraWord >> 8) & 0xff;   // border color
            return array;
        }
    });
}

export function exportVicHires(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let extraWord = img.params[img.params.length - 1]; // background, border colors

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

    let backgroundColor = extraWord & 0x0f;
    let borderColor = (extraWord >> 8) & 0x0f;
    let auxColor = (extraWord >> 4) & 0x0f;

    return exportCombinedImageAndColorCellBuffer({
        img: img,
        settings: settings,
        cellMapper: getVicCellMapper(settings),
        colorMapper: getVicColorMapper(settings),
        colorBlockMapper: undefined,
        globalColors: [{ paletteIndex: backgroundColor, bitPattern: 0x00 }],
        cellColors: [ 0x01 ],
        paramToColor(param: number): number { return param & 0x0f; },
        paramToColorBlock(param: number): number { return 0; },
        extra(): Uint8Array {
            let array = new Uint8Array(3);
            array[0] = backgroundColor; // background color
            array[1] = borderColor;     // border color
            array[2] = auxColor;        // aux color
            return array;
        }
    });
}

export function exportVicMulti(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let extraWord = img.params[img.params.length - 1]; // background, border colors

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

    let backgroundColor = extraWord & 0x0f;
    let borderColor = (extraWord >> 8) & 0x0f;
    let auxColor = (extraWord >> 4) & 0x0f;

    return exportCombinedImageAndColorCellBuffer({
        img: img,
        settings: settings,
        cellMapper: getVicCellMapper(settings),
        colorMapper: getVicColorMapper(settings),
        colorBlockMapper: undefined,
        globalColors: [
            { paletteIndex: backgroundColor, bitPattern: 0x00 },
            { paletteIndex: borderColor, bitPattern: 0x01 },
            { paletteIndex: auxColor, bitPattern: 0x03 }
        ],
        cellColors: [ 0x02 ],
        paramToColor(param: number): number { return param & 0x0f; },
        paramToColorBlock(param: number): number { return 0; },
        extra(): Uint8Array {
            let array = new Uint8Array(3);
            array[0] = backgroundColor; // background color
            array[1] = borderColor;     // border color
            array[2] = auxColor;        // aux color
            return array;
        }
    });
}

function getZxCellMapper(settings: DithertronSettings): CellExporterMapper {

    if (settings.block === undefined)
        throw "Block size not specified";
    if (settings.cell === undefined)
        throw "Cell size not specified";

    let w = settings.block.w;
    let h = settings.block.h;

    let bpp = Math.ceil(Math.log2(settings.block.colors));
    let bitsPerCellWidth = (settings.cell.w * bpp);

    let columns: number = 0;

    let exporter: CellExporterMapper = {
        prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean } {
            columns = (width / w);
            return { totalBytes: width * height * bpp / 8 };
        },

        xyToBitInfo(x: number, y: number): { offset: number, bitShift: number, bitCount: number, paramOffset: number } {

            let column = Math.floor(x / w);
            let paramOffset = (Math.floor(y / h) * columns) + column;

            let xInBytes = Math.floor(x / settings.block.w);

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

            let bitShift = (settings.cell.msbToLsb ? (bitsPerCellWidth - (((x % settings.cell.w) + 1) * bpp)) : (x % settings.cell.w) * bpp);

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

export function exportZXSpectrum(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

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
        img: img,
        settings: settings,
        cellMapper: getZxCellMapper(settings),
        colorMapper: getVicColorMapper(settings),
        colorBlockMapper: undefined,
        globalColors: [],
        cellColors: [ 0x00, NaN, 0x01 ],
        paramToColor(param: number): number { return ((param & 0x07) << 3) | ((param & 0x700) >> 8) | (((param & 0x08) >> 3) << 6); },
        paramToColorBlock(param: number): number { return 0; },
        extra(): undefined { return undefined; }
    });
}


function getTMS9918ColorMapper(settings: DithertronSettings): ColorExporterMapper {

    let isUsingFli = !(settings.fli === undefined);

    let w = settings.block.w;
    let h = settings.block.h;

    let exporter: ColorExporterMapper = {

        prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean } {
            let columns = width / w;
            let rows = height / h;

            return { totalBytes: columns * rows };
        },

        paramToBitInfo(paramOffset: number): { offset: number, bitShift: number, bitCount: number } {
            let x = paramOffset & 31;
            let y = paramOffset >> 5;

            return {
                offset: (y & 7) | (x << 3) | ((y >> 3) << 8),
                bitShift: 0,
                bitCount: 8
            };
        }
    };

    return exporter;
}

export function exportTMS9918(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    return exportCombinedImageAndColorCellBuffer({
        img: img,
        settings: settings,
        cellMapper: getVicCellMapper(settings),
        colorMapper: getTMS9918ColorMapper(settings),
        colorBlockMapper: undefined,
        globalColors: [],
        cellColors: [ 0x00, NaN, 0x01 ],
        paramToColor(param: number): number {
            let c1 = (param & 0x0f);
            let c2 = ((param & 0xf00) >> 8);

            // a special transparency pixel color exists "0x00" which is defined
            // as black in the palette, thus choose to remap the transparent
            // pixel color choice as TMS9918's black "0x01".
            c1 = c1 == 0x00 ? 0x01 : c1;
            c2 = c2 == 0x00 ? 0x01 : c2;
            return c1 | (c2 << 4);
        },
        paramToColorBlock(param: number): number { return 0; },
        extra(): undefined { return undefined; }
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

