
type PixelEditorImageFormat = {
    w?:number
    h?:number
    count?:number
    bpp?:number
    np?:number
    bpw?:number
    sl?:number
    pofs?:number
    remap?:number[]
    brev?:boolean
    flip?:boolean
    destfmt?:PixelEditorImageFormat
    xform?:string
    skip?:number
    aspect?:number
  };
  function remapBits(x:number, arr:number[]) : number {
    if (!arr) return x;
    var y = 0;
    for (var i=0; i<arr.length; i++) {
      var s = arr[i];
      if (s < 0) {
        s = -s-1;
        y ^= 1 << s;
      }
      if (x & (1 << i)) {
        y ^= 1 << s;
      }
    }
    return y;
}
function convertImagesToWords(images:Uint8Array[], fmt:PixelEditorImageFormat) : number[] {
    if (fmt.destfmt) fmt = fmt.destfmt;
    var width = fmt.w;
    var height = fmt.h;
    var count = fmt.count || 1;
    var bpp = fmt.bpp || 1;
    var nplanes = fmt.np || 1;
    var bitsperword = fmt.bpw || 8;
    var wordsperline = fmt.sl || Math.ceil(fmt.w * bpp / bitsperword);
    var mask = (1 << bpp)-1;
    var pofs = fmt.pofs || wordsperline*height*count;
    var skip = fmt.skip || 0;
    var words;
    if (nplanes > 0 && fmt.sl) // TODO?
        words = new Uint8Array(wordsperline*height*count);
    else if (bitsperword <= 8)
        words = new Uint8Array(wordsperline*height*count*nplanes);
    else
        words = new Uint32Array(wordsperline*height*count*nplanes);
    for (var n=0; n<count; n++) {
        var imgdata = images[n];
        var i = 0;
        for (var y=0; y<height; y++) {
            var yp = fmt.flip ? height-1-y : y;
            var ofs0 = n*wordsperline*height + yp*wordsperline;
            var shift = 0;
            for (var x=0; x<width; x++) {
                var color = imgdata[i++];
                var ofs = remapBits(ofs0, fmt.remap);
                for (var p=0; p<nplanes; p++) {
                    var c = (color >> (p*bpp)) & mask;
                    words[ofs + p*pofs + skip] |= (fmt.brev ? (c << (bitsperword-shift-bpp)) : (c << shift));
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
function concatArrays(arrays: Uint8Array[]) : Uint8Array {
    var total = 0;
    arrays.forEach((a) => { total += a.length });
    var dest = new Uint8Array(total);
    total = 0;
    arrays.forEach((a) => { dest.set(a, total); total += a.length });
    return dest;
}
function exportFrameBuffer(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var fmt = settings.exportFormat;
    fmt.w = img.width;
    fmt.h = img.height;
    return new Uint8Array(convertImagesToWords([img.indexed], fmt));
}
function exportApple2HiresToHGR(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    // TODO: handle other dimensions
    var data = new Uint8Array(0x2000);
    var srcofs = 0;
    for (var y=0; y<img.height; y++) {
        var destofs = (y&7)*0x400 + ((y>>3) & 7)*0x80 + (y>>6)*0x28;
        for (var x=0; x<img.width; x+=7) {
            var z = 0;
            var hibit = 0;
            for (var i=0; i<7; i++) {
                var col = img.indexed[srcofs++];
                if (col >= 3) {
                    hibit = 0x80;
                    col -= 2;
                }
                z |= (col << i*2);
            }
            data[destofs++] = (z & 0x7f) | hibit;
            data[destofs++] = ((z >> 7) & 0x7f) | hibit;
        }
    }
    return data;
}
// TODO: support VIC-20
function exportCharMemory(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var w = settings.block.w;
    var h = settings.block.h;
    var bpp = (w == 4) ? 2 : 1; // C64-multi vs C64-hires & ZX
    var i = 0;
    var cols = img.width / w;
    var rows = img.height / h;
    var char = new Uint8Array(settings.width * settings.height * bpp / 8);
    for (var y=0; y<img.height; y++) {
        for (var x=0; x<img.width; x++) {
            var ofs = (Math.floor(x / w) * h + Math.floor(y / h) * h * cols) + (y & (h-1));
            var shift = (x & (w-1)) * bpp;
            char[ofs] |= img.indexed[i] << shift;
            i++;
        }
    }
    return char;
}
function exportC64(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var w = settings.block.w;
    var h = settings.block.h;
    var cols = img.width / w;
    var rows = img.height / h;
    var screen = new Uint8Array(cols * rows);
    var color = new Uint8Array(cols * rows);
    for (var i=0; i<img.params.length; i++) {
        screen[i] = img.params[i];
        color[i] = img.params[i] >> 8;
    }
    var char = exportCharMemory(img, settings);
    var xtraword = img.params[img.params.length-1]; // background, border colors
    var xtra = new Uint8Array(2);
    xtra[0] = xtraword;
    xtra[1] = xtraword << 8;
    return concatArrays([char, screen, color, xtra]);
}
function exportWithAttributes(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var char = exportFrameBuffer(img, settings);
    var attr = new Uint8Array(img.params);
    return concatArrays([char, attr]);
}
function exportNES5Color(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var char = exportFrameBuffer(img, settings);
    // TODO: attr block format
    var fmt = {w:settings.block.w, h:settings.block.h, bpp:2};
    var attr = new Uint8Array(convertImagesToWords([img.indexed], fmt));
    return concatArrays([char, attr]);
}
