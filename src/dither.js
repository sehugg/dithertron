function rnd(n) { return Math.floor(Math.random()*n); }
function sqr(x) { return x*x; }

var DITHER_FLOYD = [[1, 0, 7/16], [-1, 1, 3/16], [0, 1, 5/16], [1, 1, 1/16]];
var DITHER_FALSEFLOYD = [[1, 0, 3/8], [0, 1, 3/8], [1, 1, 2/8]];
var DITHER_ATKINSON = [[1, 0, 1/6], [2, 0, 1/6], [-1, 1, 1/6], [0, 1, 1/6], [1, 1, 1/6], [0, 2, 1/6]];
var DITHER_SIERRA2 = [[1, 0, 4/16], [2, 0, 3/16], [-2, 1, 1/16], [-1, 1, 2/16], [0, 1, 3/16], [1, 1, 2/16], [2, 1, 1/16]];
var DITHER_SIERRALITE = [[1, 0, 2/4], [-1, 1, 1/4], [0, 1, 1/4]];
var DITHER_STUCKI =  [[1, 0, 8/42], [2, 0, 4/42], [-2, 1, 2/42], [1, -1, 4/42], [0, 1, 8/42], [1, 1, 4/42], [2, 1, 2/42], [-2, 2, 1/42], [-1, 2, 2/42], [0, 2, 4/42], [1, 2, 2/42], [2, 2, 1/42]];
var DITHER_TWOD = [[1, 0, 0.5], [0, 1, 0.5]];
var DITHER_RIGHT = [[1, 0, 1.0]];
var DITHER_DOWN = [[0, 1, 1.0]];
var DITHER_DOUBLE_DOWN = [[0, 1, 2/4], [0, 2, 1/4], [1, 2, 1/4]];
var DITHER_DIAG = [[1, 1, 1.0]];
var DITHER_VDIAMOND = [[0, 1, 6/16], [-1, 1, 3/16], [1, 1, 3/16], [-2, 2, 1/16], [0, 2, 2/16], [2, 2, 1/16]];

const ALL_DITHER_SETTINGS = [
    {name:"Floyd-Steinberg", kernel:DITHER_FLOYD},
    {name:"False Floyd", kernel:DITHER_FALSEFLOYD},
    {name:"Atkinson", kernel:DITHER_ATKINSON},
    {name:"Sierra 2", kernel:DITHER_SIERRA2},
    {name:"Sierra Lite", kernel:DITHER_SIERRALITE},
    {name:"Stucki", kernel:DITHER_STUCKI},
    {name:"Diamond", kernel:DITHER_VDIAMOND},
    {name:"Two-D", kernel:DITHER_TWOD},
    {name:"Right", kernel:DITHER_RIGHT},
    {name:"Down", kernel:DITHER_DOWN},
    {name:"Double Down", kernel:DITHER_DOUBLE_DOWN},
    {name:"Diagonal", kernel:DITHER_DIAG},
];

class DitheringCanvas {
    pal; // Uint32Array
    img; // Uint32Array
    ref; // Uint32Array
    alt; // Uint32Array
    err; // Uint16Array (n*3)
    indexed; // Uint8Array
    width; // integer
    tmp;
    tmp2;
    totalerror;
    besterror;
    changes;
    ghisto;
    noise = 20;
    diffuse = 0.8;
    ditherfn = DITHER_FLOYD;
    iterateCount = 0;

    constructor(img, width, pal) {
        for (var i=0; i<pal.length; i++)
            pal[i] |= 0xff000000;
        this.pal = new Uint32Array(pal);
        this.width = width;
        this.height = Math.floor(img.length / width);
        this.tmp = new Uint8ClampedArray(4);
        this.tmp2 = new Uint32Array(this.tmp.buffer);
        this.ref = new Uint32Array(img);
        this.reset();
    }
    reset() {
        this.indexed = new Uint8Array(this.ref.length);
        this.ghisto = new Uint32Array(this.pal.length);
        this.img = new Uint32Array(this.ref);
        this.alt = new Uint32Array(this.ref);
        this.err = new Int16Array(this.ref.length * 3);
        this.totalerror = 0;
        this.besterror = 999999999;
        this.changes = 0;
    }
    init() {
    }
    update(offset) {
        var errofs = offset*3;
        var rgbref = this.ref[offset];
        // add cumulative error to pixel, clamp @ 0-255
        this.tmp[0] = (rgbref & 0xff) + this.err[errofs];
        this.tmp[1] = ((rgbref>>8) & 0xff) + this.err[errofs+1];
        this.tmp[2] = ((rgbref>>16) & 0xff) + this.err[errofs+2];
        // store the error-modified color
        this.alt[offset] = this.tmp2[0];
        // find closest palette color
        var palidx = this.getClosest(this.tmp2[0], this.getValidColors(offset));
        var rgbimg = this.pal[palidx];
        // compute error and distribute to neighbors
        var err = getRGBADiff(rgbref, rgbimg);
        for (var i=0; i<3; i++) {
            var k = (this.err[errofs+i] + err[i]) * this.diffuse;
            // TODO: don't wrap off right edge?
            this.ditherfn.forEach((df) => {
                this.err[errofs + i + (df[0] + df[1]*this.width)*3] += k * df[2];
            });
            this.err[errofs+i] = 0; // reset this pixel's error
        }
        // set new pixel rgb
        if (this.indexed[offset] != palidx) {
            this.indexed[offset] = palidx;
            this.changes++;
        }
        this.img[offset] = rgbimg;
        //this.img[offset] = this.tmp2[0] | 0xff000000;
        // return error mag
        // TODO: perceptual error?
        var cumerr = Math.sqrt(sqr(err[0]) + sqr(err[1]) + sqr(err[2]));
        this.totalerror += cumerr;
        return cumerr;
    }
    getValidColors(offset) {
        return this.allColors;
    }
    getClosest(rgb, inds) {
        var best = 9999999;
        var bestidx = -1;
        for (var i=0; i<inds.length; i++) {
            var col = this.pal[inds[i]];
            var score = getRGBAErrorMag(rgb, col);
            if (score < best) {
                best = score;
                bestidx = inds[i];
            }
        }
        return bestidx;
    }
    addHisto(histo, rgb, inds) {
        var choices = [];
        for (var i=0; i<inds.length; i++) {
            var score = getRGBAErrorMag(rgb, this.pal[inds[i]]);
            histo[inds[i]] -= score;
        }
        return choices;
    }
    iterate() {
        this.totalerror = 0;
        this.changes = 0;
        for (var i=0; i<this.img.length; i++) {
            this.update(i);
        }
        this.commit();
        this.iterateCount++;
        //console.log(this.totalerror);
    }
    commit() {
        //
    }
    getValidColors(offset) {
        return Array.from(this.pal.keys());
    }
}
class ParamDitherCanvas extends DitheringCanvas {
    init() {
        this.params = new Uint32Array(this.width*this.height/this.w);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
    commit() {
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
}
class VDPMode2_Canvas extends ParamDitherCanvas {
    w=8;
    h=1;
    allColors = [0,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    guessParam(p) {
        var offset = p * this.w;
        var colors = this.allColors;
        var histo = new Uint32Array(16);
        for (var i=0; i<this.w; i++) {
            var ind1 = this.indexed[offset+i]|0;
            histo[ind1] += 100;
            var ind2 = this.getClosest(this.alt[offset+i]|0, colors.filter((c) => c != ind1));
            histo[ind2] += 1 + this.noise;
        }
        var choices = getChoices(histo);
        var ind1 = choices[0].ind;
        var ind2 = choices[1] && choices[1].ind;
        if (ind1 > ind2) {
            var tmp = ind1;
            ind1 = ind2;
            ind2 = tmp;
        }
        this.params[p] = ind1 + (ind2 << 8);
        //if (offset < 100) console.log(p, choices);
    }
    getValidColors(offset) {
        var i = Math.floor(offset / this.w);
        var mask = this.pal.length - 1;
        var c1 = this.params[i] & mask;
        var c2 = (this.params[i]>>8) & mask;
        return [c1, c2];
    }
}
class VCS_Canvas extends VDPMode2_Canvas {
    w=40;
    allColors = Array.from(new Array(128).keys());
}
class Apple2_Canvas extends VDPMode2_Canvas {
    w=7;
    allColors = [0,1,2,3,4,5];
    guessParam(p) {
        var offset = p * this.w;
        var colors = this.allColors;
        var histo = new Uint32Array(16);
        for (var i=0; i<this.w; i++) {
            var ind1 = this.indexed[offset+i]|0;
            histo[ind1] += 100;
            var ind2 = this.getClosest(this.alt[offset+i]|0, colors.filter((c) => c != ind1));
            histo[ind2] += 1 + this.noise;
        }
        var hibit = histo[3]+histo[4] > histo[1]+histo[2];
        this.params[p] = hibit;
    }
    getValidColors(offset) {
        var i = Math.floor(offset / this.w);
        var c1 = this.params[i];
        if (c1 & 1)
            return [0, 1, 2, 5];
        else
            return [0, 3, 4, 5];
    }
}
class ZXSpectrum_Canvas extends ParamDitherCanvas {
    w=8;
    h=8;
    allColors = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15];
    init() {
        this.ncols = this.width / this.w;
        this.nrows = this.height / this.h;
        this.params = new Uint8Array(this.ncols * this.nrows);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
    getValidColors(offset) {
        var col = Math.floor(offset / this.w) % this.ncols;
        var row = Math.floor(offset / (this.width * this.h));
        var i = col + row*this.ncols;
        var c1 = this.params[i] & 0xf;
        var c2 = (this.params[i]>>4) & 0xf;
        return [c1, c2];
    }
    guessParam(p) {
        var col = p % this.ncols;
        var row = Math.floor(p / this.ncols);
        var offset = col*this.w + row*(this.width*this.h);
        var colors = this.allColors;
        var histo = new Uint32Array(16);
        // pixel overlap in 8x8 window
        var b = 2; // border
        for (var y=-b; y<this.h+b; y++) {
            var o = offset + y*this.width;
            for (var x=-b; x<this.w+b; x++) {
                var ind1 = this.indexed[o+x]|0;
                histo[ind1] += 100;
                var ind2 = this.getClosest(this.alt[o]|0, colors.filter((c) => c != ind1));
                histo[ind2] += 1 + this.noise;
            }
        }
        var choices = getChoices(histo);
        var ind1 = choices[0].ind;
        var ind2 = choices[1].ind;
        if (ind1 > ind2) {
            var tmp = ind1;
            ind1 = ind2;
            ind2 = tmp;
        }
        this.params[p] = ind1 + (ind2 << 4);
    }
}
class VICII_Multi_Canvas extends ParamDitherCanvas {
    w=4;
    h=8;
    allColors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    init() {
        this.bgcolor = 0;
        this.ghisto.fill(0);
        this.params = new Uint16Array(this.width/this.w * this.height/this.h);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
            this.bgcolor = getChoices(this.ghisto)[0].ind;
        }
    }
    getValidColors(offset) {
        var ncols = this.width / this.w;
        var col = Math.floor(offset / this.w) % ncols;
        var row = Math.floor(offset / (this.width*this.h));
        var i = col + row*ncols;
        var c1 = this.params[i] & 0xf;
        var c2 = (this.params[i] >> 4) & 0xf;
        var c3 = (this.params[i] >> 8) & 0xf;
        return [this.bgcolor, c1, c2, c3];
    }
    guessParam(p) {
        var ncols = this.width / this.w;
        var col = p % ncols;
        var row = Math.floor(p / ncols);
        var offset = col*this.w + row*this.width*this.h;
        var colors = this.allColors.filter((ind) => ind != this.bgcolor);
        // rank all colors
        var histo = new Uint32Array(16);
        var w = this.w;
        var h = this.h;
        var b = 2; // border
        for (var y=-b; y<h+b; y++) {
            var o = offset + y*this.width;
            for (var x=-b; x<w+b; x++) {
                // get current color (or reference for 1st time)
                var ind1 = this.indexed[o+x]|0;
                if (ind1 != this.bgcolor)
                    histo[ind1] += 100;
                // get error color (TODO: why alt not img like 2-color kernels?)
                var rgbcomp = this.alt[o+x]|0;
                var ind2 = this.getClosest(rgbcomp, colors);
                histo[ind2] += 1 + this.noise;
            }
        }
        var choices = getChoices(histo);
        var ind1 = choices[0].ind;
        var ind2 = choices[1] && choices[1].ind;
        var ind3 = choices[2] && choices[2].ind;
        this.ghisto[ind1]++;
        /*
        ind1 = 3;
        ind2 = 4;
        ind3 = 7;
        */
        this.params[p] = ind1 + (ind2<<4) + (ind3<<8);
    }
}
class NES_Canvas extends ParamDitherCanvas {
    w=16;
    h=16;
    allColors = [0,1,2,3,4];
    init() {
        this.params = new Uint16Array(this.width/this.w * this.height/this.h);
        for (var i=0; i<this.params.length; i++) {
            this.guessParam(i);
        }
    }
    getValidColors(offset) {
        var ncols = this.width / this.w;
        var col = Math.floor(offset / this.w) % ncols;
        var row = Math.floor(offset / (this.width*this.h));
        var i = col + row*ncols;
        var c1 = this.params[i] & 0x3;
        // param specified which color to leave out
        switch (c1) {
            case 0: return [0, 2, 3, 4];
            case 1: return [0, 1, 3, 4];
            case 2: return [0, 1, 2, 4];
            case 3: return [0, 1, 2, 3];
            default: throw "error";
        }
    }
    guessParam(p) {
        var ncols = this.width / this.w;
        var col = p % ncols;
        var row = Math.floor(p / ncols);
        var offset = col*this.w + row*this.width*this.h;
        var colors = [1, 2, 3, 4];
        // rank all colors
        var histo = new Uint32Array(16);
        var b = 8; // border (TODO: param)
        for (var y=-b; y<this.h+b; y++) {
            var o = offset + y*this.width;
            for (var x=-b; x<this.w+b; x++) {
                // get current color (or reference for 1st time)
                var ind1 = this.indexed[o+x] | 0;
                histo[ind1] += 100;
                // get error color (TODO: why ref works better?)
                var rgbcomp = this.alt[o+x] | 0;
                var ind2 = this.getClosest(rgbcomp, colors);
                histo[ind2] += 1 + this.noise;
            }
        }
        var choices = getChoices(histo);
        // leave out this color, least frequent
        this.params[p] = choices[choices.length-1].ind - 1;
    }
}
//
function getRGBADiff(rgbref, rgbimg) {
    var err = [0,0,0];
    for (var i=0; i<3; i++) {
        var d = (rgbref & 0xff) - (rgbimg & 0xff);
        err[i] = d;
        rgbref >>= 8;
        rgbimg >>= 8;
    }
    return err;
}
var getRGBAErrorMag = getRGBAErrorPerceptual;
function getRGBAErrorAbsolute(rgbref, rgbimg) {
    var mag = 0;
    for (var i=0; i<3; i++) {
        var d = (rgbref & 0xff) - (rgbimg & 0xff);
        mag += sqr(d);
        rgbref >>= 8;
        rgbimg >>= 8;
    }
    return Math.sqrt(mag);
}
// TODO???
function getRGBAErrorHue(rgbref, rgbimg) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    var b = 256;
    var avg1 = (r1+g1+b1)/3 + b;
    var avg2 = (r2+g2+b2)/3 + b;
    r1 /= avg1;
    g1 /= avg1;
    b1 /= avg1;
    r2 /= avg2;
    g2 /= avg2;
    b2 /= avg2;
    //var mag2 = Math.sqrt(sqr(r1-r2)*9 + sqr(g1-g2)*25 + sqr(b1-b2)*4);
    //var mag2 = Math.sqrt(sqr(r1-r2)*3 + sqr(g1-g2)*5 + sqr(b1-b2)*3);
    var mag2 = Math.sqrt(sqr(r1-r2) + sqr(g1-g2) + sqr(b1-b2));
    return mag2;
}
function getRGBAErrorPerceptual(rgbref, rgbimg) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    var rmean = (r1 + r2) / 2;
    var r = r1 - r2;
    var g = g1 - g2;
    var b = b1 - b2;
    return Math.sqrt((((512+rmean)*r*r)/256) + 4*g*g + (((767-rmean)*b*b)/256));
}
function getRGBAErrorMax(rgbref, rgbimg) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    return Math.max(Math.abs(r1-r2), Math.abs(g1-g2), Math.abs(b1-b2));
}
function getRGBAErrorArr(a,b) {
    var err = [0,0,0];
    for (var i=0; i<3; i++) {
        err[i] = ((a & 0xff) - (b & 0xff));
        a >>= 8;
        b >>= 8;
    }
    return err;
}
// byte order reversed in this app
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
const ZXSPECTRUM_RGB = [
    0x000000,
    0x0000cc,
    0xcc0000,
    0xcc00cc,
    0x00cc00,
    0x00cccc,
    0xcccc00,
    0xcccccc,
    0x000000,
    0x0000ff,
    0xff0000,
    0xff00ff,
    0x00ff00,
    0x00ffff,
    0xffff00,
    0xffffff,
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
const SMS_RGB = generateRGBPalette(2,2,2);
const WILLIAMS_RGB = generateRGBPalette(3,3,2);

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

const SYSTEMS = [
    {
        id:'c64.multi',
        name:'C64 Multi',
        width:160,
        height:200,
        scaleX:0.936*2,
        conv:VICII_Multi_Canvas,
        pal:VIC_NTSC_RGB,
        errfn:getRGBAErrorPerceptual,
    },
    {
        id:'c64.hires',
        name:'C64 Hires',
        width:320,
        height:200,
        scaleX:0.936,
        conv:ZXSpectrum_Canvas,
        pal:VIC_NTSC_RGB,
        errfn:getRGBAErrorHue,
    },
    {
        id:'vdp',
        name:'TMS9918A Mode 2',
        width:256,
        height:192,
        conv:VDPMode2_Canvas,
        pal:TMS9918_RGB,
        errfn:getRGBAErrorHue,
    },
    {
        id:'zx',
        name:'ZX Spectrum',
        width:256,
        height:192,
        conv:ZXSpectrum_Canvas,
        pal:ZXSPECTRUM_RGB,
        errfn:getRGBAErrorHue,
    },
    {
        id:'apple2.dblhires',
        name:'Apple ][ Double-Hires',
        width:140,
        height:192,
        scaleX:2,
        conv:DitheringCanvas,
        pal:AP2LORES_RGB,
        errfn:getRGBAErrorPerceptual,
    },
    {
        id:'apple2.hires',
        name:'Apple ][ Hires',
        width:140,
        height:192,
        scaleX:2,
        conv:Apple2_Canvas,
        pal:AP2HIRES_RGB,
        errfn:getRGBAErrorHue,
    },
    {
        id:'apple2.lores',
        name:'Apple ][ Lores',
        width:40,
        height:48,
        scaleX:1.5,
        conv:DitheringCanvas,
        pal:AP2LORES_RGB,
        errfn:getRGBAErrorHue,
    },
    {
        id:'nes',
        name:'NES',
        width:256,
        height:240,
        scaleX:8/7,
        conv:DitheringCanvas,
        pal:NES_RGB,
        reduce:4,
        errfn:getRGBAErrorHue,
    },
    {
        id:'nes.5color',
        name:'NES (5 color)',
        width:256,
        height:240,
        scaleX:8/7,
        conv:NES_Canvas,
        pal:NES_RGB,
        reduce:5, // background + 4 colors
        errfn:getRGBAErrorHue,
    },
    {
        id:'astrocade',
        name:'Bally Astrocade',
        width:160,
        height:102,
        scaleX:1,
        conv:DitheringCanvas,
        pal:ASTROCADE_RGB,
        reduce:4,
        errfn:getRGBAErrorHue,
    },
    {
        id:'vcs',
        name:'Atari VCS (Mono)',
        width:40,
        height:192,
        scaleX:6,
        conv:DitheringCanvas,
        pal:VCS_RGB,
        reduce:2,
        errfn:getRGBAErrorHue,
    },
    {
        id:'vcs.color',
        name:'Atari VCS (Color)',
        width:40,
        height:192,
        scaleX:6,
        conv:VCS_Canvas,
        pal:VCS_RGB,
        reduce:16,
        errfn:getRGBAErrorHue,
    },
    {
        id:'atari8.e',
        name:'Atari Mode E',
        width:160,
        height:192,
        scaleX:1.5,
        conv:DitheringCanvas,
        pal:VCS_RGB,
        reduce:4,
        errfn:getRGBAErrorHue,
    },
    {
        id:'atari8.f',
        name:'Atari Mode F',
        width:80,
        height:192,
        scaleX:3,
        conv:DitheringCanvas,
        pal:VCS_RGB,
        reduce:16,
        errfn:getRGBAErrorHue,
    },
    {
        id:'sms',
        name:'Sega Master System',
        width:176, // only 488 unique tiles max, otherwise 256x240
        height:144,
        scaleX:8/7,
        conv:DitheringCanvas,
        pal:SMS_RGB,
        reduce:16,
        errfn:getRGBAErrorPerceptual,
    },
    {
        id:'williams',
        name:'Williams Arcade Game',
        width:304,
        height:256,
        conv:DitheringCanvas,
        pal:WILLIAMS_RGB,
        reduce:16,
        errfn:getRGBAErrorPerceptual,
    },
];
var SYSTEM_LOOKUP = {};
SYSTEMS.forEach((sys) => SYSTEM_LOOKUP[sys.id||sys.name] = sys);

function getHistogram(inds) {
    var histo = new Uint8Array(256);
    inds.forEach((x) => histo[x]++);
    return getChoices(histo);
}
function getChoices(histo) {
    var choices = [];
    for (var i=0; i<histo.length; i++) {
        if (histo[i]) choices.push({count:histo[i], ind:i});
    }
    choices.sort((a,b) => b.count - a.count);
    return choices;
}
function rgb2tuple(arr) {
    return arr.map((x) => [(x>>0) & 0xff, (x>>8) & 0xff, (x>>16) & 0xff]);
}
function drawRGBA(dest, arr) {
    var ctx = dest.getContext('2d');
    var imageData = ctx.createImageData(dest.width, dest.height);
    var datau32 = new Uint32Array(imageData.data.buffer);
    datau32.set(arr);
    ctx.putImageData(imageData, 0, 0);
}
function getCanvasImageData(canvas) {
    return new Uint32Array(canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.buffer);
}
//
function convertImage() {
    dithcanv = null;
    pica().resize(cropper.getCroppedCanvas(), resize, {
        /*
        unsharpAmount: 50,
        unsharpRadius: 0.5,
        unsharpThreshold: 2
        */
    }).then(() => {
        dithcanv = null;
        resizeImageData = getCanvasImageData(resize);
        iterateImage();
    });
}

//

var sysparams;
var resizeImageData;
var dithcanv = null;
var ditherFunction = DITHER_FLOYD;

function showSystemInfo() {
    var sys = sysparams;
    var s = sys.width + " x " + sys.height;
    if (sys.reduce) s += ", " + sys.reduce + " out of " + sys.pal.length + " colors";
    else if (sys.pal) s += ", " + sys.pal.length + " colors";
    if (dithcanv && dithcanv.w && dithcanv.h) {
        s += ", ";
        s += dithcanv.getValidColors(0).length + " colors per ";
        s += dithcanv.w + "x" + dithcanv.h + " block";
    }
    $("#targetFormatInfo").text(s);
}
function updatePaletteSwatches() {
    var swat = $("#paletteSwatches");
    swat.empty();
    if (dithcanv != null && dithcanv.pal.length < 64) {
        dithcanv.pal.forEach((col,index) => {
            var rgb = "rgb(" + (col&0xff) + "," + ((col>>8)&0xff) + "," + ((col>>16)&0xff) + ")";
            var sq = $('<span style="width:2em">&nbsp;</span>').css("background-color",rgb);
            swat.append(sq);
        });
    }
}
function iterateImage() {
    if (dithcanv == null) {
        var quantopts = {
            palette:rgb2tuple(sysparams.pal),
            colors:sysparams.reduce || sysparams.pal.length,
            reIndex:true,
            minHueCols:256,
        };
        const quant = new RgbQuant(quantopts);
        var pal = sysparams.pal;
        if (sysparams.reduce) {
            quant.sample(resize);
            quant.palette(false, true);
            pal = quant.idxi32; // TODO: reverse?
        }
        dithcanv = new sysparams.conv(resizeImageData, dest.width, pal);
        dithcanv.noise = 1 << document.getElementById('noiseSlider').value;
        dithcanv.diffuse = document.getElementById('diffuseSlider').value / 100;
        dithcanv.ditherfn = ditherFunction;
        dithcanv.init();
        showSystemInfo();
    }
    dithcanv.iterate();
    //console.log(dithcanv.changes, dithcanv.totalerror, dithcanv.bgcolor);
    drawRGBA(dest, dithcanv.img);
    updatePaletteSwatches();
}
function resetImage() {
    dithcanv = null;
    iterateImage();
}
const image = document.getElementById('srcimage');
const resize = document.getElementById('resizecanvas');
const dest = document.getElementById('destcanvas');
const cmdline = document.getElementById('cmdline');
// https://github.com/fengyuanchen/cropperjs/blob/master/README.md
const cropper = new Cropper(image, {
    viewMode:1,
    initialAspectRatio: 4/3,
    crop(event) {
        convertImage();
    },
});
function loadSourceImage(url) {
    cropper.clear();
    cropper.replace(url);
}
//
function setTargetSystem(sys) {
    dithcanv = null;
    sysparams = sys;
    showSystemInfo();
    resize.width = dest.width = sys.width;
    resize.height = dest.height = sys.height;
    dest.style = 'transform: scaleX('+sys.scaleX+'); width:'+(90/sys.scaleX)+'%';
    //dest.style = 'width:80%;height:'+(80/(sys.scaleX||1))+'%';
    getRGBAErrorMag = sys.errfn || getRGBAErrorPerceptual;
    var showNoise = sys.conv != DitheringCanvas;
    $("#noiseSection").css('display',showNoise?'block':'none');
    cropper.replace(cropper.url);
}
function setDitherSettings(dset) {
    ditherFunction = dset.kernel;
    resetImage();
}
//
//
// TODO: need worker, or stop it piling up events
function timerUpdate() {
    setTimeout(timerUpdate, 200);
    if (resizeImageData == null) return; // not resized yet
    if (dithcanv == null || (dithcanv.changes > 0 && dithcanv.iterateCount < 25)) {
        iterateImage();
        dithcanv.noise >>= 1; // divide by 2
    }
}
//
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var url = URL.createObjectURL(this.files[0]);
            loadSourceImage(url);
        }
    });
});
