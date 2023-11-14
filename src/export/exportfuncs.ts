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

export function exportCharMemory(img: PixelsAvailableMessage,
    w: number,
    h: number,
    type?: 'zx' | 'fli'): Uint8Array {
    var bpp = (w == 4) ? 2 : 1; // C64-multi vs C64-hires & ZX
    var i = 0;
    var cols = img.width / w;
    var rows = img.height / h;
    var char = new Uint8Array(img.width * img.height * bpp / 8);
    var isvdp = char.length == img.params.length; // VDP mode (8x1 cells)
    if (type == 'fli') isvdp = true;
    console.log('isvdp', isvdp, w, h, bpp, cols, rows);
    for (var y = 0; y < img.height; y++) {
        for (var x = 0; x < img.width; x++) {
            var vdpofs = Math.floor(x / w) + y * cols;
            var charofs = Math.floor(x / w) + Math.floor(y / h) * cols;
            var ofs = charofs * h + (y & (h - 1));
            if (type == 'zx')
                ofs = (vdpofs & 0b1100000011111) | ((vdpofs & 0b11100000) << 3) | ((vdpofs & 0b11100000000) >> 3);
            var shift = (x & (w - 1)) * bpp;
            shift = 8 - bpp - shift; // reverse bits
            var palidx = img.indexed[i];
            var idx = 0; // for bit pattern % 0 or %00
            var param = isvdp ? img.params[vdpofs] : img.params[charofs];
            if (bpp == 1) {
                if (palidx == (param & 0xf))
                    idx = 1; // for bit pattern %1
            } else {
                if (palidx == (param & 0xf)) // lower nibble
                    idx = 2; // for bit pattern %10
                else if (palidx == ((param >> 4) & 0xf)) // upper nibble
                    idx = 1; // for bit pattern %01
                else if (palidx == ((param >> 8) & 0xf)) // color block nibble
                    idx = 3; // for bit pattern %11
            }

            char[ofs] |= idx << shift;
            i++;
        }
    }
    return char;
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

interface CellExporter {
    prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean };
    xyToBitInfo(x: number, y: number, paletteIndex: number): { offset: number, bitShift: number, bitCount: number, bitPattern: number };
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
            let info = exporter.xyToBitInfo(x, y, img.indexed[i]);
            bitOverlayUint8Array(array, info.offset, info.bitPattern, info.bitShift, info.bitCount, setup.littleEndian);
        }
    }
    return array;
}

function exportIndexedPaletteAndCellBasedImage(
    img: PixelsAvailableMessage,
    settings: DithertronSettings,
    globalColors: { paletteIndex: number, bitPattern: number }[],
    colorChoicesBitPattern: number[]): Uint8Array {

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

    let exporter: CellExporter = {

        prepare(width: number, height: number): { totalBytes: number, littleEndian?: boolean } {
            columns = (width / w);
            cellBytesPerRow = columns * bytesPerCell;
            //console.log('prepare', bpp, bitsPerCellWidth, bitsPerCell, bytesPerCell, columns, cellBytesPerRow, img.width * img.height * bpp / 8);
            return { totalBytes: img.width * img.height * bpp / 8 };
        },

        xyToBitInfo(x: number, y: number, paletteIndex: number): { offset: number, bitShift: number, bitCount: number, bitPattern: number } {

            let col = Math.floor(x / w);

            // which cell is being filled
            let cellCol = Math.floor(x / settings.cell.w);
            let cellRow = Math.floor(y / settings.cell.h);

            let paramOffset = (Math.floor(y / h) * columns) + col;
            console.assert(paramOffset < img.params.length - 1);    // must be within the bounds of the param array
            let param = img.params[paramOffset];

            // where is the start of the cell being filled located in the byte array
            let cellColOffset = bytesPerCell * cellCol;
            let cellRowOffset = cellBytesPerRow * cellRow;

            // which particular byte of the cell is being filled now
            let cellXOffset = Math.floor(((x % settings.cell.w) * bpp) / 8);
            let cellYOffset = Math.floor(((y % settings.cell.h) * bitsPerCellWidth) / 8);

            // how much of a bit offset is required for this particular pixel
            let bitShift = (settings.cell.msbToLsb ? (bitsPerCellWidth - (((x % settings.cell.w) + 1) * bpp)) : (x % settings.cell.w) * bpp);

            let result = {
                offset: cellRowOffset + cellColOffset + cellYOffset + cellXOffset,
                bitShift: bitShift,
                bitCount: bpp,
                bitPattern: 0
            };

            let c1 = param & 0xf;
            let c2 = (param & 0xf0) >> 4;
            let c3 = (param & 0xf00) >> 8;

            // first can the global colors for a match
            for (let i = 0; i < globalColors.length; ++i) {
                if (paletteIndex == globalColors[i].paletteIndex) {
                    result.bitPattern = globalColors[i].bitPattern;
                    return result;
                }
            }

            // next scan the color choices for a match
            switch (paletteIndex) {
                case c1: {
                    console.assert(colorChoicesBitPattern.length > 0);
                    result.bitPattern = colorChoicesBitPattern[0];
                    break;
                }
                case c2: {
                    console.assert(colorChoicesBitPattern.length > 1);
                    result.bitPattern = colorChoicesBitPattern[1];
                    break;
                }
                case c3: {
                    console.assert(colorChoicesBitPattern.length > 2);
                    result.bitPattern = colorChoicesBitPattern[2];
                    break;
                }
            }

            return result;
        }
    };

    return exportCellBuffer(img, exporter);
}

interface ExportVic {
    img: PixelsAvailableMessage;
    settings: DithertronSettings;
    globalColors: { paletteIndex: number, bitPattern: number }[];
    cellColors: number[];
    paramToScreen(param: number): number;
    paramToColorBlock(param: number): number;
    extraArray(): Uint8Array | undefined;
}

export function exportVic(options: ExportVic): Uint8Array {
    if (options.settings.block == undefined)
        throw "No block size";

    let isUsingFli = !(options.settings.fli === undefined);
    let isUsingCb = !(options.settings.cb === undefined);

    let cellImage = exportIndexedPaletteAndCellBasedImage(options.img, options.settings, options.globalColors, options.cellColors);

    let w = options.settings.block.w;
    let h = options.settings.block.h;
    let columns = Math.floor(options.img.width / options.settings.cell.w);
    let rows = Math.floor(options.img.height / options.settings.cell.h);
    let bpp = Math.ceil(Math.log2(options.settings.block.colors));

    let cbOffset: number = Math.floor((options.img.width / w) * (options.img.height / h));
    let cbw: number = (isUsingCb ? options.settings.cb.w === undefined ? w : options.settings.cb.w : w);
    let cbh: number = (isUsingCb ? options.settings.cb.h === undefined ? h : options.settings.cb.h : h);

    let cbCols = options.img.width / cbw;
    let cbRows = options.img.height / cbh;

    let screenBytes = (columns * rows);
    let screenAlignedBytes = (1 << Math.ceil(Math.log2(screenBytes)));

    let screen = new Uint8Array(isUsingFli ? (screenAlignedBytes * options.settings.cell.h) : (columns * rows));
    let color: Uint8Array | undefined = (isUsingCb ? new Uint8Array(cbCols * cbRows) : undefined);

    // Normally in hires mode each screen pixel in a 4x8 or 8x8 block chooses from
    // cell colors dedicated for the entire block (stored in "screen" color ram).
    // However, in FLI mode each pixel row gets a new choice of colors since on
    // each scan line special code swaps the screen color ram pointer location to
    // a new location in memory thus allowing for independent values per row.
    if (isUsingFli) {
        for (let i = 0; i < cbOffset; i++) {
            let p = options.img.params[i];
            let screenOffset = (Math.floor(i / columns) & (options.settings.cell.h - 1)) * screenAlignedBytes + (Math.floor(i / (bpp * options.img.width)) * columns) + (i % columns);
            //if (i < 500) console.log(screenOffset, columns, (options.settings.cell.h - 1), screenAlignedBytes, w, options.img.width, i, hex(i), (Math.floor(i/40)&7), ((Math.floor(i/40)&7)*0x400), (Math.floor(i/320)), (i % 40), (Math.floor(i/320)*40 + (i % 40)));
            screen[screenOffset] = options.paramToScreen(p);
        }
    } else {
        for (let i = 0; i < screen.length; i++) {
            screen[i] = options.paramToScreen(options.img.params[i]);
        }
    }

    for (let i = 0; i < (isUsingCb ? color.length : 0); i++) {
        // The color block ram is split out from the normal param area
        // to stored extra color block choices shared across
        // multiple pixels. The color block area is an extra shared
        // color ram that is independent of the "screen" color ram.
        color[i] = options.paramToColorBlock(options.img.params[i + cbOffset]);
    }

    let extra = options.extraArray();

    let mergeArrays = [cellImage, screen, color, extra];
    if (color === undefined)
        mergeArrays.splice(2, 1);
    if (extra === undefined)
        mergeArrays.splice(mergeArrays.length - 1, 1);

    return concatArrays(mergeArrays);
}

export function exportC64Multi(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let extraWord = img.params[img.params.length - 1]; // background, border colors

    // background for bit pattern %00
    // lower nybble for bit pattern %10
    // upper nybble for bit pattern %01
    // color block nybble for bit pattern %11
    return exportVic({
        img: img,
        settings: settings,
        globalColors: [{ paletteIndex: extraWord & 0xf, bitPattern: 0x00 }],
        cellColors: [ 0x02, 0x01, 0x03 ],
        paramToScreen(param: number): number { return param & 0xff; },
        paramToColorBlock(param: number): number { return param & 0x0f; },
        extraArray(): Uint8Array | undefined {
            let extra = new Uint8Array(2);
            extra[0] = extraWord & 0xff;          // background color (and high nybble aux, which is N/A)
            extra[1] = (extraWord >> 8) & 0xff;   // border color
            return extra;
        }
    });
}

export function exportC64Hires(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {

    let extraWord = img.params[img.params.length - 1]; // background, border colors

    // lower nybble for bit pattern %0
    // upper nybble for bit pattern %1

    return exportVic({
        img: img,
        settings: settings,
        globalColors: [],
        cellColors: [ 0x01, 0x00 ],
        paramToScreen(param: number): number { return ((param & 0x0f) << 4) | ((param & 0xf0) >> 4); },
        paramToColorBlock(param: number): number { return 0; },
        extraArray(): Uint8Array | undefined {
            let extra = new Uint8Array(2);
            extra[0] = extraWord & 0xff;          // background color (and high nybble aux, which is N/A)
            extra[1] = (extraWord >> 8) & 0xff;   // border color
            return extra;
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

    return exportVic({
        img: img,
        settings: settings,
        globalColors: [{ paletteIndex: backgroundColor, bitPattern: 0x00 }],
        cellColors: [ 0x01 ],
        paramToScreen(param: number): number { return param & 0x0f; },
        paramToColorBlock(param: number): number { return 0; },
        extraArray(): Uint8Array | undefined {
            let extra = new Uint8Array(3);
            extra[0] = backgroundColor; // background color
            extra[1] = borderColor;     // border color
            extra[2] = auxColor;        // aux color
            return extra;
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

    return exportVic({
        img: img,
        settings: settings,
        globalColors: [
            { paletteIndex: backgroundColor, bitPattern: 0x00 },
            { paletteIndex: borderColor, bitPattern: 0x01 },
            { paletteIndex: auxColor, bitPattern: 0x03 }
        ],
        cellColors: [ 0x02 ],
        paramToScreen(param: number): number { return param & 0x0f; },
        paramToColorBlock(param: number): number { return 0; },
        extraArray(): Uint8Array | undefined {
            let extra = new Uint8Array(3);
            extra[0] = backgroundColor; // background color
            extra[1] = borderColor;     // border color
            extra[2] = auxColor;        // aux color
            return extra;
        }
    });
}

export function exportZXSpectrum(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    var screen = new Uint8Array(img.params.length);
    for (var i = 0; i < screen.length; i++) {
        var p = img.params[i] & 0xffff;
        screen[i] = (p & 0x7) | ((p >> 5) & 0x38) | 0x40; // 3 bits each, bright
    }
    var char = exportCharMemory(img, 8, 8, 'zx');
    return concatArrays([char, screen,]);
}

export function exportTMS9918(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    if (!settings.block) throw "No block size";
    var w = settings.block.w;
    var h = settings.block.h;
    var cols = img.width / w;
    var rows = img.height / h;
    var screen = new Uint8Array(cols * rows); // 32 x 192
    for (var i = 0; i < screen.length; i++) {
        // x[0..4] y[0..7] -> y[0..2] x[0..4] y[3..7]
        var p = img.params[i] & 0xffff;
        var x = i & 31;
        var y = i >> 5;
        var ofs = (y & 7) | (x << 3) | ((y >> 3) << 8);
        screen[ofs] = (p << 4) | (p >> 8);
    }
    //console.log(img.params, screen);
    var char = exportCharMemory(img, 8, 8);
    return concatArrays([char, screen]);
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

