import { DithertronSettings, PixelEditorImageFormat, PixelsAvailableMessage } from "../common/types";

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

// TODO: support VIC-20
export function exportCharMemory(img: PixelsAvailableMessage,
    w: number,
    h: number,
    type?: 'zx' | 'fli',
    bgColor?: number): Uint8Array {
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

            // Force override that the color choice MUST be the background color
            // if the palette index matches the background color even if one of
            // the other colors might happen to be set to the background color too.
            // This is requires as the FLI bug on C64s will choose the last color
            // block color as 0xff (grey) even if another color is specified but
            // will correctly choose the screen color if the pixel index is 0.
            // But the right block color might be set to the background color too
            // which would cause a match to the color block color/screen colors
            // instead of the background color as required for the FLI bug.
            if ((bgColor != undefined) && (bgColor === palidx))
                idx = 0;

            char[ofs] |= idx << shift;
            i++;
        }
    }
    return char;
}

export function exportC64Multi(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    if (!settings.block) throw "No block size";
    let w = settings.block.w;
    let h = settings.block.h;
    let cols = img.width / w;
    let rows = img.height / h;

    let isUsingFli = !(settings.fli === undefined);
    let cbOffset: number = (img.width / w * img.height / h);
    let cbw: number = settings.cb.w === undefined ? w : settings.cb.w;
    let cbh: number = settings.cb.h === undefined ? h : settings.cb.h;

    let cbcols = img.width / cbw;
    let cbrows = img.height / cbh;

    let screen = new Uint8Array(isUsingFli ? 0x2000 : (cols * rows));
    let color = new Uint8Array(cbcols * cbrows);

    // Normally in multi-color mode each screen pixel in a 4x8 block choses from two
    // color options from screen ram which stores color palette choice one is the
    // lower screen nybble and color choice two in the upper screen nybble. However,
    // in FLI mode each pixel row gets a new choice of colors since on each scan line
    // special code swaps the screen color ram pointer location to a new location in
    // memory thus allowing for indepentent values per row.
    if (isUsingFli) {
        for (let i = 0; i < cbOffset; i++) {
            let p = img.params[i];
            let scrnofs = (Math.floor(i / 40) & 7) * 0x400 + Math.floor(i / 320) * 40 + (i % 40);
            //if (i < 500) console.log(scrnofs, i, hex(i), (Math.floor(i/40)&7), ((Math.floor(i/40)&7)*0x400), (Math.floor(i/320)), (i % 40), (Math.floor(i/320)*40 + (i % 40)));
            screen[scrnofs] = (p & 0xff);
        }
    } else {
        for (let i = 0; i < screen.length; i++) {
            screen[i] = (img.params[i] & 0xff);
        }
    }

    for (let i = 0; i < color.length; i++) {
        // The FLI version separates out the color block ram from the
        // normal param area whereas the non-FLI version stores the
        // color block in the 2nd most least significant byte's lower
        // of each chosen color. In both cases, the color block area
        // is exactly the same size since they represent the pixel index
        // value choice of %11 and the color block ram is not relocatable
        // on the C64 (unlike the screen ram color choices).
        color[i] = (img.params[i + cbOffset] & 0xf);
    }
    let char = exportCharMemory(img, w, cbh, isUsingFli ? 'fli' : undefined, (img.params[img.params.length - 1] & 0xf));
    let xtraword = img.params[img.params.length - 1]; // background, border colors
    let xtra = new Uint8Array(2);
    xtra[0] = xtraword & 0xff;          // background color
    xtra[1] = (xtraword >> 8) & 0xff;   // border color
    return concatArrays([char, screen, color, xtra]);
}

export function exportC64Hires(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    if (!settings.block) throw "No block size";
    let w = settings.block.w;
    let h = settings.block.h;
    let cols = img.width / w;
    let rows = img.height / h;
    let screen = new Uint8Array(cols * rows);
    for (let i = 0; i < screen.length; i++) {
        let p = img.params[i];
        screen[i] = ((p & 0x0f) << 4) | ((p & 0xf0) >> 4);
    }
    let char = exportCharMemory(img, w, h);
    let xtra = new Uint8Array(2);
    let xtraword = img.params[img.params.length - 1]; // background, border colors
    xtra[0] = xtraword & 0xff;          // background color
    xtra[1] = (xtraword >> 8) & 0xff;   // border color
    return concatArrays([char, screen, xtra]);
}

export function exportC64HiresFLI(img: PixelsAvailableMessage, settings: DithertronSettings): Uint8Array {
    let screen = new Uint8Array(0x2000);
    for (var i = 0; i < img.params.length; i++) {
        let p = img.params[i];
        let scrnofs = (Math.floor(i / 40) & 7) * 0x400 + Math.floor(i / 320) * 40 + (i % 40);
        screen[scrnofs] = ((p & 0x0f) << 4) | ((p & 0xf0) >> 4);
    }
    let xtra = new Uint8Array(2);
    let xtraword = img.params[img.params.length - 1]; // background, border colors
    xtra[0] = xtraword & 0xff;          // background color
    xtra[1] = (xtraword >> 8) & 0xff;   // border color
    let char = exportCharMemory(img, 8, 8, 'fli');
    return concatArrays([char, screen, xtra]);
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

