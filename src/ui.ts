
declare var Cropper;
declare var pica;
declare var saveAs;

class ProxyDithertron {
    settings : DithertronSettings;
    lastPixels : PixelsAvailableMessage;

    constructor(worker : Worker) {
        worker.onmessage = (ev) => {
            var data = ev.data;
            if (data != null) {
                //console.log('recv',data);
                if (data.img != null && this.pixelsAvailable != null) {
                    this.pixelsAvailable(data);
                    this.lastPixels = data;
                }
            }
        };
    }
    setSettings(settings) {
        this.settings = settings;
        worker.postMessage({cmd:"setSettings", data:settings});
    }
    setSourceImage(img) {
        worker.postMessage({cmd:"setSourceImage", data:img});
    }
    reset() {
        worker.postMessage({cmd:"reset"});
    }
    pixelsAvailable : (msg:PixelsAvailableMessage) => void;
}

const worker = new Worker("./gen/dithertron.js");
const dithertron = new ProxyDithertron(worker);

var resizeImageData : Uint32Array;

//

interface DithertronSettings {
    id: string;
    name: string;
    width: number;
    height: number;
    conv: string; //new (...args: any[]) => DitheringCanvas;
    pal: number[];

    scaleX?: number; // aspect ratio
    errfn?: string; //(rgb:number,rgb2:number) => number;
    reduce?: number;
    diffuse?: number;
    noise?: number;
    ditherfn?: DitherKernel;
    block?: {w:number, h:number, colors:number};
    toNative?: string;
    exportFormat?: PixelEditorImageFormat;
}

// DITHER SETTINGS
const DITHER_FLOYD = [[1, 0, 7/16], [-1, 1, 3/16], [0, 1, 5/16], [1, 1, 1/16]];
const DITHER_FALSEFLOYD = [[1, 0, 3/8], [0, 1, 3/8], [1, 1, 2/8]];
const DITHER_ATKINSON = [[1, 0, 1/6], [2, 0, 1/6], [-1, 1, 1/6], [0, 1, 1/6], [1, 1, 1/6], [0, 2, 1/6]];
const DITHER_SIERRA2 = [[1, 0, 4/16], [2, 0, 3/16], [-2, 1, 1/16], [-1, 1, 2/16], [0, 1, 3/16], [1, 1, 2/16], [2, 1, 1/16]];
const DITHER_SIERRALITE = [[1, 0, 2/4], [-1, 1, 1/4], [0, 1, 1/4]];
const DITHER_STUCKI =  [[1, 0, 8/42], [2, 0, 4/42], [-2, 1, 2/42], [1, -1, 4/42], [0, 1, 8/42], [1, 1, 4/42], [2, 1, 2/42], [-2, 2, 1/42], [-1, 2, 2/42], [0, 2, 4/42], [1, 2, 2/42], [2, 2, 1/42]];
const DITHER_TWOD = [[1, 0, 0.5], [0, 1, 0.5]];
const DITHER_RIGHT = [[1, 0, 1.0]];
const DITHER_DOWN = [[0, 1, 1.0]];
const DITHER_DOUBLE_DOWN = [[0, 1, 2/4], [0, 2, 1/4], [1, 2, 1/4]];
const DITHER_DIAG = [[1, 1, 1.0]];
const DITHER_VDIAMOND = [[0, 1, 6/16], [-1, 1, 3/16], [1, 1, 3/16], [-2, 2, 1/16], [0, 2, 2/16], [2, 2, 1/16]];

const ALL_DITHER_SETTINGS : DitherSetting[] = [
    {name:"Floyd-Steinberg", kernel:DITHER_FLOYD},
    {name:"False Floyd", kernel:DITHER_FALSEFLOYD},
    {name:"Atkinson", kernel:DITHER_ATKINSON},
    {name:"Sierra 2", kernel:DITHER_SIERRA2},
    {name:"Sierra Lite", kernel:DITHER_SIERRALITE},
    {name:"Stucki", kernel:DITHER_STUCKI},
    {name:"Two-D", kernel:DITHER_TWOD},
    {name:"Right", kernel:DITHER_RIGHT},
    {name:"Down", kernel:DITHER_DOWN},
    {name:"Double Down", kernel:DITHER_DOUBLE_DOWN},
    {name:"Diagonal", kernel:DITHER_DIAG},
    {name:"Diamond", kernel:DITHER_VDIAMOND},
];

// PALETTES
function RGBA(r,g,b) {
    return ((r&0xff)<<0) | ((g&0xff)<<8) | ((b&0xff)<<16) | 0xff000000;
}
const VIC_NTSC_RGB = [
    0x000000,
    0xFFFFFF,
    RGBA(163,64,69),
    RGBA(125,235,228),
    RGBA(174,70,186),
    RGBA(94,202,84),
    RGBA(60,57,200),
    RGBA(255,255,111),
    RGBA(174,96,47),
    RGBA(110,73,0),
    RGBA(232,122,128),
    RGBA(92,92,92),
    RGBA(143,143,143),
    RGBA(179,255,167),
    RGBA(129,126,255),
    RGBA(199,199,199)
];
const TMS9918_RGB = [
    RGBA(0,0,0),
    RGBA(0,0,0),
    RGBA(33,200,66),
    RGBA(94,220,120),
    RGBA(84,85,237),
    RGBA(125,118,252),
    RGBA(212,82,77),
    RGBA(66,235,245),
    RGBA(252,85,84),
    RGBA(255,121,120),
    RGBA(212,193,84),
    RGBA(230,206,128),
    RGBA(33,176,59),
    RGBA(201,91,186),
    RGBA(204,204,204),
    RGBA(255,255,255)
];
const NES_RGB = [
    0x525252, 0xB40000, 0xA00000, 0xB1003D, 0x740069, 0x00005B, 0x00005F, 0x001840, 0x002F10, 0x084A08, 0x006700, 0x124200, 0x6D2800, 0x000000, 0x000000, 0x000000,
    0xC4D5E7, 0xFF4000, 0xDC0E22, 0xFF476B, 0xD7009F, 0x680AD7, 0x0019BC, 0x0054B1, 0x006A5B, 0x008C03, 0x00AB00, 0x2C8800, 0xA47200, 0x000000, 0x000000, 0x000000,
    0xF8F8F8, 0xFFAB3C, 0xFF7981, 0xFF5BC5, 0xFF48F2, 0xDF49FF, 0x476DFF, 0x00B4F7, 0x00E0FF, 0x00E375, 0x03F42B, 0x78B82E, 0xE5E218, 0x787878, 0x000000, 0x000000,
    0xFFFFFF, 0xFFF2BE, 0xF8B8B8, 0xF8B8D8, 0xFFB6FF, 0xFFC3FF, 0xC7D1FF, 0x9ADAFF, 0x88EDF8, 0x83FFDD, 0xB8F8B8, 0xF5F8AC, 0xFFFFB0, 0xF8D8F8, 0x000000, 0x000000
];
const AP2HIRES_RGB = [
    RGBA(0, 0, 0),
    RGBA(255, 68, 253),
    RGBA(20, 245, 60),
    RGBA(20, 207, 253),
    RGBA(255, 106, 60),
    RGBA(255, 255, 255)
];
const AP2LORES_RGB = [
    RGBA(0, 0, 0),
    RGBA(227, 30, 96),
    RGBA(96, 78, 189),
    RGBA(255, 68, 253),
    RGBA(0, 163, 96),
    RGBA(156, 156, 156),
    RGBA(20, 207, 253),
    RGBA(208, 195, 255),
    RGBA(96, 114, 3),
    RGBA(255, 106, 60),
    RGBA(156, 156, 156),
    RGBA(255, 160, 208),
    RGBA(20, 245, 60),
    RGBA(208, 221, 141),
    RGBA(114, 255, 208),
    RGBA(255, 255, 255)
];
const CMYK_RGB = [
    RGBA(0, 0, 0),
    RGBA(255, 128, 64),
    RGBA(64, 255, 128),
    RGBA(128, 64, 255),
    RGBA(255, 255, 255)
];    
const ASTROCADE_RGB = [0,2368548,4737096,7171437,9539985,11974326,14342874,16777215,12255269,14680137,16716142,16725394,16734903,16744155,16753663,16762879,11534409,13959277,16318866,16721334,16730842,16740095,16749311,16758783,10420330,12779662,15138995,16718039,16727291,16736767,16745983,16755199,8847495,11206827,13631696,15994612,16724735,16733951,16743423,16752639,6946975,9306307,11731175,14092287,16461055,16732415,16741631,16751103,4784304,7143637,9568505,11929087,14297599,16731647,16741119,16750335,2425019,4784352,7209215,9570047,12004095,14372863,16741375,16750847,191,2359523,4718847,7146495,9515263,11949311,14318079,16752127,187,224,2294015,4658431,7092735,9461247,11895551,14264063,176,213,249,2367999,4736511,7105279,9539327,11908095,159,195,3303,209151,2577919,4946431,7380735,9749247,135,171,7888,17140,681983,3050495,5484543,7853311,106,3470,12723,22231,31483,1548031,3916799,6285311,73,8557,17810,27318,36570,373759,2742271,5176575,4389,13641,23150,32402,41911,51163,2026495,4456447,9472,18724,27976,37485,46737,56246,1834970,4194303,14080,23296,32803,42055,51564,60816,2031541,4456409,18176,27648,36864,46116,55624,392556,2752401,5177269,21760,30976,40192,49667,58919,1572683,3932016,6291348,24320,33536,43008,52224,716810,3079982,5504851,7864183,25856,35328,44544,250368,2619136,4980503,7405371,9764703,26624,35840,45312,2413824,4782336,7143173,9568041,11927374,26112,35584,2338560,4707328,7141376,9502464,11927326,14286659,24832,2393344,4762112,7196160,9564928,11992832,14352155,16711487,2447360,4815872,7250176,9618688,12052992,14417664,16776990,16777027,4803328,7172096,9606144,11974912,14343424,16776965,16777001,16777038,6962176,9330688,11764992,14133504,16502272,16773655,16777019,16777055,8858112,11226880,13660928,16029440,16759818,16769070,16777043,16777079,10426112,12794624,15163392,16745475,16754727,16764235,16773488,16777108,11534848,13969152,16337664,16740388,16749640,16759148,16768401,16777141,12255232,14684928,16725795,16735047,16744556,16753808,16763317,16772569];
const VCS_RGB = [
    0x000000,0x000000, 0x404040,0x404040, 0x6c6c6c,0x6c6c6c, 0x909090,0x909090, 0xb0b0b0,0xb0b0b0, 0xc8c8c8,0xc8c8c8, 0xdcdcdc,0xdcdcdc, 0xf4f4f4,0xf4f4f4,
    0x004444,0x004444, 0x106464,0x106464, 0x248484,0x248484, 0x34a0a0,0x34a0a0, 0x40b8b8,0x40b8b8, 0x50d0d0,0x50d0d0, 0x5ce8e8,0x5ce8e8, 0x68fcfc,0x68fcfc,
    0x002870,0x002870, 0x144484,0x144484, 0x285c98,0x285c98, 0x3c78ac,0x3c78ac, 0x4c8cbc,0x4c8cbc, 0x5ca0cc,0x5ca0cc, 0x68b4dc,0x68b4dc, 0x78c8ec,0x78c8ec,
    0x001884,0x001884, 0x183498,0x183498, 0x3050ac,0x3050ac, 0x4868c0,0x4868c0, 0x5c80d0,0x5c80d0, 0x7094e0,0x7094e0, 0x80a8ec,0x80a8ec, 0x94bcfc,0x94bcfc,
    0x000088,0x000088, 0x20209c,0x20209c, 0x3c3cb0,0x3c3cb0, 0x5858c0,0x5858c0, 0x7070d0,0x7070d0, 0x8888e0,0x8888e0, 0xa0a0ec,0xa0a0ec, 0xb4b4fc,0xb4b4fc,
    0x5c0078,0x5c0078, 0x74208c,0x74208c, 0x883ca0,0x883ca0, 0x9c58b0,0x9c58b0, 0xb070c0,0xb070c0, 0xc084d0,0xc084d0, 0xd09cdc,0xd09cdc, 0xe0b0ec,0xe0b0ec,
    0x780048,0x780048, 0x902060,0x902060, 0xa43c78,0xa43c78, 0xb8588c,0xb8588c, 0xcc70a0,0xcc70a0, 0xdc84b4,0xdc84b4, 0xec9cc4,0xec9cc4, 0xfcb0d4,0xfcb0d4,
    0x840014,0x840014, 0x982030,0x982030, 0xac3c4c,0xac3c4c, 0xc05868,0xc05868, 0xd0707c,0xd0707c, 0xe08894,0xe08894, 0xeca0a8,0xeca0a8, 0xfcb4bc,0xfcb4bc,
    0x880000,0x880000, 0x9c201c,0x9c201c, 0xb04038,0xb04038, 0xc05c50,0xc05c50, 0xd07468,0xd07468, 0xe08c7c,0xe08c7c, 0xeca490,0xeca490, 0xfcb8a4,0xfcb8a4,
    0x7c1800,0x7c1800, 0x90381c,0x90381c, 0xa85438,0xa85438, 0xbc7050,0xbc7050, 0xcc8868,0xcc8868, 0xdc9c7c,0xdc9c7c, 0xecb490,0xecb490, 0xfcc8a4,0xfcc8a4,
    0x5c2c00,0x5c2c00, 0x784c1c,0x784c1c, 0x906838,0x906838, 0xac8450,0xac8450, 0xc09c68,0xc09c68, 0xd4b47c,0xd4b47c, 0xe8cc90,0xe8cc90, 0xfce0a4,0xfce0a4,
    0x2c3c00,0x2c3c00, 0x485c1c,0x485c1c, 0x647c38,0x647c38, 0x809c50,0x809c50, 0x94b468,0x94b468, 0xacd07c,0xacd07c, 0xc0e490,0xc0e490, 0xd4fca4,0xd4fca4,
    0x003c00,0x003c00, 0x205c20,0x205c20, 0x407c40,0x407c40, 0x5c9c5c,0x5c9c5c, 0x74b474,0x74b474, 0x8cd08c,0x8cd08c, 0xa4e4a4,0xa4e4a4, 0xb8fcb8,0xb8fcb8,
    0x003814,0x003814, 0x1c5c34,0x1c5c34, 0x387c50,0x387c50, 0x50986c,0x50986c, 0x68b484,0x68b484, 0x7ccc9c,0x7ccc9c, 0x90e4b4,0x90e4b4, 0xa4fcc8,0xa4fcc8,
    0x00302c,0x00302c, 0x1c504c,0x1c504c, 0x347068,0x347068, 0x4c8c84,0x4c8c84, 0x64a89c,0x64a89c, 0x78c0b4,0x78c0b4, 0x88d4cc,0x88d4cc, 0x9cece0,0x9cece0,
    0x002844,0x002844, 0x184864,0x184864, 0x306884,0x306884, 0x4484a0,0x4484a0, 0x589cb8,0x589cb8, 0x6cb4d0,0x6cb4d0, 0x7ccce8,0x7ccce8, 0x8ce0fc,0x8ce0fc
];
const CGA_RGB = [
    0x000000, 0x0000AA, 0x00AA00, 0x00AAAA, 0xAA0000, 0xAA00AA, 0xAA55AA, 0xAAAAAA,
    0x555555, 0x5555FF, 0x55FF55, 0x55FFFF, 0xFF5555, 0xFF55FF, 0xFFFF55, 0xFFFFFF,
];
const SMS_RGB = generateRGBPalette(2,2,2);
const WILLIAMS_RGB = generateRGBPalette(3,3,2);
const TELETEXT_RGB = generateRGBPalette(1,1,1);
const ZXSPECTRUM_RGB = TELETEXT_RGB;
const AMSTRAD_CPC_RGB = [
    0x000000, 0x000080, 0x0000FF,
    0x800000, 0x800080, 0x8000FF,
    0xFF0000, 0xFF0080, 0xFF00FF,
    0x008000, 0x008080, 0x0080FF,
    0x808000, 0x808080, 0x8080FF,
    0xFF8000, 0xFF8080, 0xFF80FF,
    0x00FF00, 0x00FF80, 0x00FFFF,
    0x80FF00, 0x80FF80, 0x80FFFF,
    0xFFFF00, 0xFFFF80, 0xFFFFFF,
];

function generateRGBPalette(rr,gg,bb) {
    var n = 1<<(rr+gg+bb);
    var rs = 255 / ((1<<rr)-1);
    var gs = 255 / ((1<<gg)-1);
    var bs = 255 / ((1<<bb)-1);
    var pal = [];
    for (var i=0; i<n; i++) {
        var r = (i & ((1<<rr)-1));
        var g = ((i>>rr) & ((1<<gg)-1));
        var b = ((i>>(rr+gg)) & ((1<<bb)-1));
        pal[i] = RGBA(r*rs, g*gs, b*bs);
    }
    return pal;
}

//

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

//

function getFilenamePrefix() {
    // TODO: use filename as prefix
    return dithertron.settings.id;
}
function downloadNativeFormat() {
    var img = dithertron.lastPixels;
    var fn = window[dithertron.settings.toNative];
    if (img && fn) {
        var data = fn(img, dithertron.settings);
        var blob = new Blob([data], {type: "application/octet-stream"});
        saveAs(blob, getFilenamePrefix() + ".bin");
    }
}
function downloadImageFormat() {
    dest.toBlob((blob) => {
        saveAs(blob, getFilenamePrefix() + ".png");
    }, "image/png");
}

//

const SYSTEMS : DithertronSettings[] = [
    {
        id:'c64.multi',
        name:'C-64 Multi',
        width:160,
        height:200,
        scaleX:0.936*2,
        conv:'VICII_Multi_Canvas',
        pal:VIC_NTSC_RGB,
        block:{w:4,h:8,colors:4},
        toNative:'exportC64',
    },
    {
        id:'c64.hires',
        name:'C-64 Hires',
        width:320,
        height:200,
        scaleX:0.936,
        conv:'ZXSpectrum_Canvas',
        pal:VIC_NTSC_RGB,
        block:{w:8,h:8,colors:2},
        toNative:'exportC64',
    },
    {
        id:'vic20.multi',
        name:'VIC-20 Multi',
        width:80,
        height:160,
        scaleX:3.0,
        conv:'VIC20_Multi_Canvas',
        pal:VIC_NTSC_RGB,
        block:{w:4,h:8,colors:4},
    },
    {
        id:'nes',
        name:'NES (4 color)',
        width:256,
        height:240,
        scaleX:8/7,
        conv:'DitheringCanvas',
        pal:NES_RGB,
        reduce:4,
        toNative:'exportFrameBuffer',
        exportFormat:{w:16,h:16,bpp:1,brev:true,np:2,pofs:8,remap:[5,0,1,2,4,6,7,8,9,10,11,12]},
    },
    {
        id:'nes.5color',
        name:'NES (5 color)',
        width:256,
        height:240,
        scaleX:8/7,
        conv:'NES_Canvas',
        pal:NES_RGB,
        reduce:5, // background + 4 colors
        block:{w:16,h:16,colors:4},
    },
    {
        id:'vdp',
        name:'TMS9918A (Mode 2)',
        width:256,
        height:192,
        conv:'VDPMode2_Canvas',
        pal:TMS9918_RGB,
        block:{w:8,h:1,colors:2},
        toNative:'exportWithAttributes',
        exportFormat:{w:256,h:192,bpp:1,brev:true,remap:[3,4,5,6,7,0,1,2,8,9,10,11,12]},
    },
    {
        id:'zx',
        name:'ZX Spectrum',
        width:256,
        height:192,
        conv:'ZXSpectrum_Canvas',
        pal:ZXSPECTRUM_RGB,
        block:{w:8,h:8,colors:2},
    },
    {
        id:'bbcmicro.mode2',
        name:'BBC Micro (mode 2)',
        width:160,
        height:256,
        scaleX:2,
        conv:'DitheringCanvas',
        pal:TELETEXT_RGB,
    },
    {
        id:'cpc.mode0',
        name:'Amstrad CPC (mode 0)',
        width:160,
        height:200,
        scaleX:2,
        conv:'DitheringCanvas',
        pal:AMSTRAD_CPC_RGB,
        reduce:16,
    },
    {
        id:'apple2.dblhires',
        name:'Apple ][ Double-Hires',
        width:140,
        height:192,
        scaleX:2,
        conv:'DitheringCanvas',
        pal:AP2LORES_RGB,
    },
    {
        id:'apple2.hires',
        name:'Apple ][ Hires',
        width:140,
        height:192,
        scaleX:2,
        conv:'Apple2_Canvas',
        pal:AP2HIRES_RGB,
        block:{w:7,h:1,colors:4},
        toNative:'exportApple2HiresToHGR',
    },
    {
        id:'apple2.lores',
        name:'Apple ][ Lores',
        width:40,
        height:48,
        scaleX:1.5,
        conv:'DitheringCanvas',
        pal:AP2LORES_RGB,
        toNative:'exportFrameBuffer',
        exportFormat:{bpp:4},
    },
    {
        id:'astrocade',
        name:'Bally Astrocade',
        width:160,
        height:102,
        scaleX:1,
        conv:'DitheringCanvas',
        pal:ASTROCADE_RGB,
        reduce:4,
        toNative:'exportFrameBuffer',
        exportFormat:{bpp:2,brev:true},
    },
    {
        id:'vcs',
        name:'Atari VCS',
        width:40,
        height:192,
        scaleX:6,
        conv:'DitheringCanvas',
        pal:VCS_RGB,
        reduce:2,
    },
    {
        id:'atari8.e',
        name:'Atari Mode E',
        width:160,
        height:192,
        scaleX:0.8571*2,
        conv:'DitheringCanvas',
        pal:VCS_RGB,
        reduce:4,
    },
    {
        id:'atari8.f',
        name:'Atari Mode F',
        width:80,
        height:192,
        scaleX:0.8571*4,
        conv:'DitheringCanvas',
        pal:VCS_RGB,
        reduce:16,
    },
    {
        id:'atari7800.160a',
        name:'Atari 7800 (160A)',
        width:160,
        height:240,
        scaleX:2,
        conv:'DitheringCanvas',
        pal:VCS_RGB,
        reduce:4,
    },
    {
        id:'atari7800.160b',
        name:'Atari 7800 (160B)',
        width:160,
        height:240,
        scaleX:2,
        conv:'DitheringCanvas',
        pal:VCS_RGB,
        reduce:12,
    },
    {
        id:'sms',
        name:'Sega Master System',
        width:176, // only 488 unique tiles max, otherwise 256x240
        height:144,
        scaleX:8/7,
        conv:'DitheringCanvas',
        pal:SMS_RGB,
        reduce:16,
    },
    {
        id:'ega.09h',
        name:'EGA Mode 0Dh',
        width:320,
        height:200,
        scaleX:200/320*1.2,
        conv:'DitheringCanvas',
        pal:CGA_RGB,
        reduce:16,
        toNative:'exportFrameBuffer',
        exportFormat:{bpp:1,np:4},
   },
    {
        id:'williams',
        name:'Williams Arcade',
        width:304,
        height:256,
        conv:'DitheringCanvas',
        pal:WILLIAMS_RGB,
        reduce:16,
    },
];
var SYSTEM_LOOKUP = {};
SYSTEMS.forEach((sys) => SYSTEM_LOOKUP[sys.id||sys.name] = sys);

const ERROR_FUNCS = [
    {id:'hue', name:"Hue-Based"},
    {id:'perceptual', name:"Perceptual"},
    {id:'dist', name:"Distance"},
    {id:'max', name:"Maximum"},
];

//

function getCanvasImageData(canvas) {
    return new Uint32Array(canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.buffer);
}
function drawRGBA(dest, arr) {
    var ctx = dest.getContext('2d');
    var imageData = ctx.createImageData(dest.width, dest.height);
    var datau32 = new Uint32Array(imageData.data.buffer);
    if (datau32.length == arr.length) {
        datau32.set(arr);
        ctx.putImageData(imageData, 0, 0);
    } else {
        console.log("drawRGBA(): array length mismatch");
        // TODO: source array is too long when switching
    }
}
function applyBrightness(imageData:Uint32Array, bright:number, bias:number, sat:number) {
    bright *= 1;
    bias *= 1;
    var u8arr = new Uint8ClampedArray(imageData.buffer);
    for (var i=0; i<u8arr.length; i+=4) {
        var r = u8arr[i];
        var g = u8arr[i+1];
        var b = u8arr[i+2];
        if (sat != 1.0) {
            var gray = 0.2989*r + 0.5870*g + 0.1140*b; //weights from CCIR 601 spec
            r = gray * (1-sat) + r * sat;
            g = gray * (1-sat) + g * sat;
            b = gray * (1-sat) + b * sat;
        }
        u8arr[i] = r * bright + bias;
        u8arr[i+1] = g * bright + bias;
        u8arr[i+2] = b * bright + bias;
    }
}

function reprocessImage() {
    var resizeImageData = getCanvasImageData(resize);
    let bright = (parseFloat(contrastSlider.value) - 50) / 100 + 1.0; // middle = 1.0, range = 0.5-1.5
    let bias = (parseFloat(brightSlider.value) - bright * 50) * (128 / 50);
    let sat = (parseFloat(saturationSlider.value) - 50) / 50 + 1.0; // middle = 1.0, range = 0-2
    applyBrightness(resizeImageData, bright, bias, sat);
    dithertron.setSourceImage(resizeImageData);
    resetImage();
}

function resetImage() {
    var opt = ($("#diffuseTypeSelect")[0] as HTMLSelectElement).selectedOptions[0];
    // TODO: what if settings not yet set?
    if (opt) {
        dithertron.settings.ditherfn = ALL_DITHER_SETTINGS[parseInt(opt.value)].kernel;
    }
    var opt = ($("#errorFuncSelect")[0] as HTMLSelectElement).selectedOptions[0];
    if (opt) {
        dithertron.settings.errfn = opt.value;
    }
    dithertron.settings.diffuse = parseFloat(diffuseSlider.value) / 100;
    dithertron.settings.noise = parseFloat(noiseSlider.value);
    dithertron.setSettings(dithertron.settings);
    dithertron.reset();
}

function convertImage() {
    pica().resize(cropper.getCroppedCanvas(), resize, {
        /*
        unsharpAmount: 50,
        unsharpRadius: 0.5,
        unsharpThreshold: 2
        */
    }).then(() => {
        reprocessImage();
    });
}

function getSystemInfo(sys : DithertronSettings) {
    var s = sys.width + " x " + sys.height;
    if (sys.reduce) s += ", " + sys.reduce + " out of " + sys.pal.length + " colors";
    else if (sys.pal) s += ", " + sys.pal.length + " colors";
    if (sys.block) {
        s += ", ";
        s += sys.block.colors + " colors per ";
        s += sys.block.w + "x" + sys.block.h + " block";
    }
    return s;
}

function showSystemInfo(sys : DithertronSettings) {
    $("#targetFormatInfo").text(getSystemInfo(sys));
}

function updatePaletteSwatches(pal:Uint32Array) {
    var swat = $("#paletteSwatches");
    swat.empty();
    if (pal && pal.length < 64) {
        pal.forEach((col,index) => {
            var rgb = "rgb(" + (col&0xff) + "," + ((col>>8)&0xff) + "," + ((col>>16)&0xff) + ")";
            var sq = $('<span style="width:2em">&nbsp;</span>').css("background-color",rgb);
            swat.append(sq);
        });
    }
}

var brightSlider = document.getElementById('brightSlider') as HTMLInputElement;
var contrastSlider = document.getElementById('contrastSlider') as HTMLInputElement;
var saturationSlider = document.getElementById('saturationSlider') as HTMLInputElement;
var noiseSlider = document.getElementById('noiseSlider') as HTMLInputElement;
var diffuseSlider = document.getElementById('diffuseSlider') as HTMLInputElement;
const image = document.getElementById('srcimage') as HTMLImageElement;
const resize = document.getElementById('resizecanvas') as HTMLCanvasElement;
const dest = document.getElementById('destcanvas') as HTMLCanvasElement;
//const cmdline = document.getElementById('cmdline');

// https://github.com/fengyuanchen/cropperjs/blob/master/README.md
const cropper = new Cropper(image, {
    viewMode:1,
    initialAspectRatio: 4/3,
    crop(event) {
        convertImage();
    },
});
function loadSourceImage(url) {
    //cropper.clear();
    cropper.replace(url);
}
//
function setTargetSystem(sys : DithertronSettings) {
    var showNoise = sys.conv != 'DitheringCanvas';
    dithertron.setSettings(sys);
    showSystemInfo(sys);
    resize.width = dest.width = sys.width;
    resize.height = dest.height = sys.height;
    dest.style.transform = 'scaleX('+(sys.scaleX||1)+')';
    dest.style.width = (90/(sys.scaleX||1))+'%';
    //dest.style = 'width:80%;height:'+(80/(sys.scaleX||1))+'%';
    $("#noiseSection").css('display',showNoise?'flex':'none');
    $("#downloadNativeBtn").css('display',sys.toNative?'inline':'none');
    cropper.replace(cropper.url);
}

var EXAMPLE_IMAGES = [
    'benbenn.jpg',
    'cezanne2.jpg',
    'coolcar.jpg',
    'darkbrewery.jpg',
    'greentruck.jpg',
    'homer.jpg',
    'keyssunset.jpg',
    'lobsterpot.jpg',
    'myersflat.jpg',
    'myrtle.jpg',
    'parrot.jpg',
    'redrose.jpg',
    'robert_s_duncanson.jpg',
    'seurat.jpg',
    'vangogh.jpg',
];

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var url = URL.createObjectURL(this.files[0]);
            loadSourceImage(url);
        }
    });

    EXAMPLE_IMAGES.forEach((filename) => {
        $('<a class="dropdown-item" href="#"></a>').text(filename).appendTo("#examplesMenu");
    });
    $("#examplesMenu").click((e) => {
        var filename = $(e.target).text();
        loadSourceImage("images/" + filename);
    });

    SYSTEMS.forEach(sys => {
        var opt = $("<option />").text(sys.name).val(sys.id);
        $("#targetFormatSelect").append(opt);
    });
    ALL_DITHER_SETTINGS.forEach((dset,index) => {
        var opt = $("<option />").text(dset.name).val(index);
        $("#diffuseTypeSelect").append(opt);
    });
    ERROR_FUNCS.forEach((dset, index) => {
        var opt = $("<option />").text(dset.name).val(dset.id);
        $("#errorFuncSelect").append(opt);
    });

    dithertron.pixelsAvailable = (msg) => {
        // TODO: resize canvas?
        drawRGBA(dest, msg.img);
        updatePaletteSwatches(msg.pal);
        /*
        if (msg.final) {
            dest.toBlob((blob) => {
                $("#pngBytes").text(blob.size+"");
            }, 'image/png');
        }
        */
    }

    setTargetSystem(SYSTEM_LOOKUP['c64.multi']);

    $("#diffuseSlider").on('change', resetImage);
    $("#noiseSlider").on('change', resetImage);
    $("#brightSlider").on('change', reprocessImage);
    $("#contrastSlider").on('change', reprocessImage);
    $("#saturationSlider").on('change', reprocessImage);
    $("#resetButton").on('click', resetImage);
    $("#diffuseTypeSelect").on('change', resetImage);
    $("#targetFormatSelect").change((e) => {
        var opt = (e.target as HTMLSelectElement).selectedOptions[0];
        if (opt) {
            setTargetSystem(SYSTEM_LOOKUP[opt.value]);
        }
    });
    $("#errorFuncSelect").on('change', resetImage);
    $("#downloadImageBtn").click(downloadImageFormat);
    $("#downloadNativeBtn").click(downloadNativeFormat);
});

/*
function printSystems() {
    var s = "";
    SYSTEMS.forEach((sys) => {
        s += "* " + sys.name + " - " +getSystemInfo(sys) + "\n";
    });
    console.log(s);
}
printSystems();
*/
