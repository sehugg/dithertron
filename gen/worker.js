"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/common/util.ts
  function sqr(x) {
    return x * x;
  }
  function range(start, end) {
    var arr = [];
    for (var i = start; i < end; i++) {
      arr.push(i);
    }
    return arr;
  }

  // src/common/color.ts
  var Centroid = class {
    constructor() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.n = 0;
    }
    add(rgb) {
      this.r += rgb >> 0 & 255;
      this.g += rgb >> 8 & 255;
      this.b += rgb >> 16 & 255;
      this.n++;
    }
    getAvgRGB(k) {
      var r = Math.max(0, Math.min(255, this.r * k / this.n));
      var g = Math.max(0, Math.min(255, this.g * k / this.n));
      var b = Math.max(0, Math.min(255, this.b * k / this.n));
      return r << 0 | g << 8 | b << 16;
    }
  };
  function reducePaletteChoices(imageData, colors, count, diversity, distfn) {
    var histo = new Int32Array(colors.length);
    var err = new Int32Array(4);
    var tmp = new Uint8ClampedArray(4);
    var tmp2 = new Uint32Array(tmp.buffer);
    var bias = diversity * 0.5 + 0.5;
    let decay = diversity * 0.25 + 0.65;
    var centroids = [];
    var inds = [];
    for (let i = 0; i < count; i++) {
      inds.push(Math.floor(i * (colors.length - 1) / count));
      centroids.push(new Centroid());
    }
    for (let iter = 0; iter < 10; iter++) {
      for (let i = iter; i < imageData.length; i += (i & 15) + 1) {
        let rgbref = imageData[i];
        err[0] += rgbref & 255;
        err[1] += rgbref >> 8 & 255;
        err[2] += rgbref >> 16 & 255;
        tmp[0] = err[0];
        tmp[1] = err[1];
        tmp[2] = err[2];
        let ind1 = getClosestRGB(tmp2[0], inds, colors, distfn);
        let alt = colors[ind1];
        centroids[inds.indexOf(ind1)].add(tmp2[0]);
        let score = distfn(tmp2[0], alt);
        histo[ind1] += Math.max(0, 256 - score);
        err[0] -= alt & 255;
        err[1] -= alt >> 8 & 255;
        err[2] -= alt >> 16 & 255;
        err[0] *= decay;
        err[1] *= decay;
        err[2] *= decay;
      }
      var allinds = range(0, colors.length);
      var nchanged = 0;
      for (let i = 0; i < count; i++) {
        let cent = centroids[i];
        let current = colors[inds[i]];
        let ind2 = getClosestRGB(cent.getAvgRGB(bias), allinds, colors, distfn);
        let better = colors[ind2];
        if (better != current) {
          inds[i] = ind2;
          nchanged++;
        }
        for (let j = 0; j < colors.length; j++) {
          if (colors[j] == better) {
            allinds[j] = -1;
          }
        }
      }
      if (nchanged == 0)
        break;
    }
    var result = inds.map((ind) => {
      return { ind, count: histo[ind] };
    });
    result.sort((a, b) => intensity(colors[a.ind]) - intensity(colors[b.ind]));
    return result;
  }
  function reducePalette(imageData, colors, count, diversity, distfn) {
    if (colors.length == count)
      return new Uint32Array(colors);
    var choices = reducePaletteChoices(imageData, colors, count, diversity, distfn);
    console.log("reducePalette", colors.length, "to", choices.length);
    return new Uint32Array(choices.map((x) => colors[x.ind]));
  }
  function getRGBADiff(rgbref, rgbimg) {
    var err = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
      var d = (rgbref & 255) - (rgbimg & 255);
      err[i] = d;
      rgbref >>= 8;
      rgbimg >>= 8;
    }
    return err;
  }
  function getRGBAErrorAbsolute(rgbref, rgbimg) {
    var mag = 0;
    for (var i = 0; i < 3; i++) {
      var d = (rgbref & 255) - (rgbimg & 255);
      mag += sqr(d);
      rgbref >>= 8;
      rgbimg >>= 8;
    }
    return Math.sqrt(mag);
  }
  function getRGBAErrorHue(rgbref, rgbimg) {
    var r1 = rgbref >> 0 & 255;
    var g1 = rgbref >> 8 & 255;
    var b1 = rgbref >> 16 & 255;
    var r2 = rgbimg >> 0 & 255;
    var g2 = rgbimg >> 8 & 255;
    var b2 = rgbimg >> 16 & 255;
    var b = 256;
    var avg1 = (r1 + g1 + b1) / 3 + b;
    var avg2 = (r2 + g2 + b2) / 3 + b;
    r1 /= avg1;
    g1 /= avg1;
    b1 /= avg1;
    r2 /= avg2;
    g2 /= avg2;
    b2 /= avg2;
    var mag2 = Math.sqrt(sqr(r1 - r2) + sqr(g1 - g2) + sqr(b1 - b2)) * 256;
    return mag2;
  }
  function getRGBAErrorPerceptual(rgbref, rgbimg) {
    var r1 = rgbref >> 0 & 255;
    var g1 = rgbref >> 8 & 255;
    var b1 = rgbref >> 16 & 255;
    var r2 = rgbimg >> 0 & 255;
    var g2 = rgbimg >> 8 & 255;
    var b2 = rgbimg >> 16 & 255;
    var rmean = (r1 + r2) / 2;
    var r = r1 - r2;
    var g = g1 - g2;
    var b = b1 - b2;
    return Math.sqrt((512 + rmean) * r * r / 256 + 4 * g * g + (767 - rmean) * b * b / 256);
  }
  function getRGBAErrorMax(rgbref, rgbimg) {
    var r1 = rgbref >> 0 & 255;
    var g1 = rgbref >> 8 & 255;
    var b1 = rgbref >> 16 & 255;
    var r2 = rgbimg >> 0 & 255;
    var g2 = rgbimg >> 8 & 255;
    var b2 = rgbimg >> 16 & 255;
    return Math.max(Math.abs(r1 - r2), Math.abs(g1 - g2), Math.abs(b1 - b2));
  }
  function intensity(rgb) {
    return getRGBAErrorPerceptual(0, rgb);
  }
  var ERROR_FUNCTIONS = {
    "perceptual": getRGBAErrorPerceptual,
    "hue": getRGBAErrorHue,
    "dist": getRGBAErrorAbsolute,
    "max": getRGBAErrorMax
  };
  function getClosestRGB(rgb, inds, pal, distfn) {
    var best = 9999999;
    var bestidx = -1;
    for (var i = 0; i < inds.length; i++) {
      let ind = inds[i];
      if (ind >= 0) {
        var col = pal[inds[i]];
        var score = distfn(rgb, col);
        if (score < best) {
          best = score;
          bestidx = inds[i];
        }
      }
    }
    return bestidx;
  }
  function getChoices(histo) {
    var choices = [];
    for (var i = 0; i < histo.length; i++) {
      if (histo[i] > 0) {
        choices.push({ count: histo[i], ind: i });
      }
    }
    choices.sort((a, b) => b.count - a.count);
    return choices;
  }

  // src/dither/canvas.ts
  var canvas_exports = {};
  __export(canvas_exports, {
    Apple2_Canvas: () => Apple2_Canvas,
    Compucolor_Canvas: () => Compucolor_Canvas,
    DitheringCanvas: () => DitheringCanvas,
    HAM6_Canvas: () => HAM6_Canvas,
    NES_Canvas: () => NES_Canvas,
    Teletext_Canvas: () => Teletext_Canvas,
    VCSColorPlayfield_Canvas: () => VCSColorPlayfield_Canvas,
    VDPMode2_Canvas: () => VDPMode2_Canvas,
    VICII_Canvas: () => VICII_Canvas,
    ZXSpectrum_Canvas: () => ZXSpectrum_Canvas
  });

  // src/dither/basecanvas.ts
  var THRESHOLD_MAP_4X4 = [
    0,
    8,
    2,
    10,
    12,
    4,
    14,
    6,
    3,
    11,
    1,
    9,
    15,
    7,
    13,
    5
  ];
  var BaseDitheringCanvas = class {
    constructor(img, width, pal) {
      this.noise = 0;
      this.diffuse = 0.8;
      this.ordered = 0;
      this.ditherfn = [];
      this.errfn = getRGBAErrorPerceptual;
      this.iterateCount = 0;
      this.img = img;
      for (var i = 0; i < pal.length; i++)
        pal[i] |= 4278190080;
      this.pal = new Uint32Array(pal);
      this.width = width;
      this.height = Math.floor(img.length / width);
      this.tmp = new Uint8ClampedArray(4);
      this.tmp2 = new Uint32Array(this.tmp.buffer);
      this.ref = new Uint32Array(img);
      this.alt = new Uint32Array(this.ref);
      this.err = new Float32Array(this.ref.length * 3);
      this.indexed = new Uint8Array(this.ref.length);
      this.changes = 0;
      this.reset();
    }
    reset() {
      this.img = new Uint32Array(this.ref);
      this.alt.set(this.ref);
      this.err.fill(0);
      this.indexed.fill(0);
      this.changes = 0;
    }
    init() {
    }
    update(offset) {
      var errofs = offset * 3;
      var rgbref = this.ref[offset];
      var ko = 1;
      if (this.ordered > 0) {
        let x = offset % this.width & 3;
        let y = offset / this.width & 3;
        ko = 1 + (THRESHOLD_MAP_4X4[x + y * 4] / 15 - 0.5) * this.ordered;
      }
      this.tmp[0] = (rgbref & 255) * ko + this.err[errofs];
      this.tmp[1] = (rgbref >> 8 & 255) * ko + this.err[errofs + 1];
      this.tmp[2] = (rgbref >> 16 & 255) * ko + this.err[errofs + 2];
      this.alt[offset] = this.tmp2[0];
      var valid = this.getValidColors(offset);
      var palidx = this.getClosest(this.tmp2[0], valid);
      var rgbimg = this.pal[palidx];
      var err = getRGBADiff(rgbref, rgbimg);
      for (var i = 0; i < 3; i++) {
        var k = (this.err[errofs + i] + err[i]) * this.diffuse;
        this.ditherfn.forEach((df) => {
          this.err[errofs + i + (df[0] + df[1] * this.width) * 3] += k * df[2];
        });
        this.err[errofs + i] = 0;
      }
      if (this.indexed[offset] != palidx) {
        this.indexed[offset] = palidx;
        this.changes++;
      }
      this.img[offset] = rgbimg;
    }
    getClosest(rgb, inds) {
      return getClosestRGB(rgb, inds, this.pal, this.errfn);
    }
    iterate() {
      this.changes = 0;
      for (var i = 0; i < this.img.length; i++) {
        this.update(i);
      }
      this.commit();
      this.iterateCount++;
    }
    commit() {
    }
    getValidColors(offset) {
      return range(0, this.pal.length);
    }
  };
  var ParamDitherCanvas = class extends BaseDitheringCanvas {
    constructor() {
      super(...arguments);
      this.params = new Uint32Array(0);
    }
    commit() {
      for (var i = 0; i < this.params.length; i++) {
        this.guessParam(i);
      }
    }
  };
  var BasicParamDitherCanvas = class extends ParamDitherCanvas {
    init() {
      this.params = new Uint32Array(this.width * this.height / this.w);
      for (var i = 0; i < this.params.length; i++) {
        this.guessParam(i);
      }
    }
  };
  var TwoColor_Canvas = class extends BasicParamDitherCanvas {
    constructor() {
      super(...arguments);
      this.ncols = 0;
      this.nrows = 0;
      this.border = 0;
      this.allColors = null;
    }
    init() {
      if (!this.allColors)
        this.allColors = range(0, this.pal.length);
      this.indexed.fill(this.allColors[0]);
      this.ncols = this.width / this.w;
      this.nrows = this.height / this.h;
      this.params = new Uint32Array(this.ncols * this.nrows);
      for (var i = 0; i < this.params.length; i++) {
        this.guessParam(i);
      }
    }
    getValidColors(offset) {
      var col = Math.floor(offset / this.w) % this.ncols;
      var row = Math.floor(offset / (this.width * this.h));
      var i = col + row * this.ncols;
      var c1 = this.params[i] & 255;
      var c2 = this.params[i] >> 8 & 255;
      return [c1, c2];
    }
    guessParam(p) {
      var col = p % this.ncols;
      var row = Math.floor(p / this.ncols);
      var offset = col * this.w + row * (this.width * this.h);
      var colors = this.allColors;
      var histo = new Uint32Array(256);
      var b = this.border;
      for (var y = -b; y < this.h + b; y++) {
        var o = offset + y * this.width;
        for (var x = -b; x < this.w + b; x++) {
          var c1 = this.indexed[o + x] | 0;
          histo[c1] += 100;
          var c2 = this.getClosest(this.alt[o + x] | 0, colors);
          histo[c2] += 1 + this.noise;
        }
      }
      var choices = getChoices(histo);
      this.updateParams(p, choices);
    }
    updateParams(p, choices) {
      var ind1 = choices[0].ind;
      var ind2 = choices[1] ? choices[1].ind : ind1;
      if (ind1 > ind2) {
        var tmp = ind1;
        ind1 = ind2;
        ind2 = tmp;
      }
      this.params[p] = ind1 + (ind2 << 8);
    }
  };
  var OneColor_Canvas = class extends TwoColor_Canvas {
    constructor() {
      super(...arguments);
      this.bgColor = 0;
    }
    init() {
      this.bgColor = 0;
      super.init();
    }
    getValidColors(offset) {
      return [this.bgColor, super.getValidColors(offset)[0]];
    }
    updateParams(p, choices) {
      for (let c of choices) {
        if (c.ind != this.bgColor) {
          this.params[p] = c.ind;
          break;
        }
      }
    }
  };

  // src/dither/canvas.ts
  var DitheringCanvas = class extends BaseDitheringCanvas {
    // just a wrapper for the base class so we can find it
  };
  var Teletext_Canvas = class extends OneColor_Canvas {
    constructor() {
      super(...arguments);
      this.w = 2;
      this.h = 3;
    }
  };
  var VDPMode2_Canvas = class extends TwoColor_Canvas {
    constructor() {
      super(...arguments);
      this.w = 8;
      this.h = 1;
    }
  };
  var VCSColorPlayfield_Canvas = class extends TwoColor_Canvas {
    constructor() {
      super(...arguments);
      this.w = 40;
      this.h = 1;
    }
  };
  var Compucolor_Canvas = class extends TwoColor_Canvas {
    constructor() {
      super(...arguments);
      this.w = 2;
      this.h = 4;
    }
  };
  var Apple2_Canvas = class extends TwoColor_Canvas {
    constructor() {
      super(...arguments);
      this.w = 7;
      this.h = 1;
      this.allColors = [0, 1, 2, 3, 4, 5];
    }
    guessParam(p) {
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
    getValidColors(offset) {
      var i = Math.floor(offset / this.w);
      var hibit = (this.params[i] & 1) != 0;
      if (hibit)
        return [0, 3, 4, 5];
      else
        return [0, 1, 2, 5];
    }
  };
  var VICII_Canvas_Details;
  ((VICII_Canvas_Details2) => {
    ;
    VICII_Canvas_Details2.prepare = function(defaults, block) {
      if (block === void 0) {
        return (0, VICII_Canvas_Details2.prepare)(defaults, defaults);
      }
      let result = __spreadValues({}, block);
      result.xb = block.xb === void 0 ? 0 : block.xb;
      result.yb = block.yb === void 0 ? 0 : block.yb;
      return result;
    };
  })(VICII_Canvas_Details || (VICII_Canvas_Details = {}));
  var VICII_Canvas = class extends ParamDitherCanvas {
    constructor() {
      super(...arguments);
      this.paletteChoices = {};
      this.cbOffset = 0;
      // the offset into the params array for the color block ram
      this.extra = 0;
      this.fliMode = false;
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
      this.fliBug = true;
      this.fliBugCbColor = 8;
      // orange
      this.fliBugChoiceColor = 15;
      // light grey
      this.blankLeftScreenFliBugArea = false;
      this.blankRightScreenMirrorFliBugArea = false;
      this.blankFliBugColumnCount = 0;
      // values chosen base on image
      this.bgColor = 0;
      this.auxColor = 0;
      this.borderColor = 0;
      this.globalValid = [];
      // state machine for guessing
      this.lastComputedCb = 0;
    }
    // TODO: choose global colors before init?
    init() {
      this.b = VICII_Canvas_Details.prepare(this.sys.block, this.sys.block);
      this.cb = VICII_Canvas_Details.prepare(this.sys.block, this.sys.cb);
      this.useCb = this.sys.cb === void 0 ? false : true;
      this.colors = this.sys.block.colors;
      this.extra = this.sys.param === void 0 ? 0 : this.sys.param.extra;
      this.preparePaletteChoices(this.sys.paletteChoices);
      if (this.sys.fli != void 0) {
        this.fliMode = true;
        this.fliBug = this.sys.fli.bug;
        this.blankLeftScreenFliBugArea = this.sys.fli.blankLeft;
        this.blankRightScreenMirrorFliBugArea = this.sys.fli.blankRight;
        this.blankFliBugColumnCount = this.sys.fli.blankColumns;
      }
      this.prepareGlobalColorChoices();
      this.bitsPerColor = Math.ceil(Math.log2(this.colors));
      this.pixelsPerByte = Math.floor(8 / this.bitsPerColor);
      this.cbOffset = this.width / this.b.w * this.height / this.b.h;
      this.params = new Uint32Array(this.cbOffset + this.width / this.cb.w * this.height / this.cb.h * (this.useCb ? 1 : 0) + this.extra);
      for (var i = 0; i < this.params.length - this.extra; i++) {
        this.guessParam(i);
      }
      if (this.extra > 0)
        this.params[this.params.length - this.extra] = this.bgColor | this.auxColor << 4 | this.borderColor << 8;
    }
    preparePixelPaletteChoices() {
      let count = this.paletteChoices.colorsRange.max - this.paletteChoices.colorsRange.min + 1;
      let ind = new Array(count);
      for (let l = 0, i = this.paletteChoices.colorsRange.min; i < this.paletteChoices.colorsRange.min + count; ++l, ++i) {
        ind[l] = i;
      }
      this.pixelPaletteChoices = ind;
    }
    preparePaletteChoices(options) {
      console.assert(this.pal.length > 0);
      if (options === void 0) {
        this.paletteChoices.background = false;
        this.paletteChoices.aux = false;
        this.paletteChoices.border = false;
        this.paletteChoices.backgroundRange = { min: 0, max: this.pal.length - 1 };
        this.paletteChoices.auxRange = { min: 0, max: this.pal.length - 1 };
        this.paletteChoices.borderRange = { min: 0, max: this.pal.length - 1 };
        this.paletteChoices.colors = this.colors;
        this.paletteChoices.colorsRange = { min: 0, max: this.pal.length - 1 };
        this.preparePixelPaletteChoices();
        return;
      }
      this.paletteChoices.background = options.background === void 0 ? false : options.background;
      this.paletteChoices.aux = options.aux === void 0 ? false : options.aux;
      this.paletteChoices.border = options.aux === void 0 ? false : options.border;
      this.paletteChoices.backgroundRange = options.backgroundRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.backgroundRange;
      this.paletteChoices.auxRange = options.auxRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.auxRange;
      this.paletteChoices.borderRange = options.borderRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.borderRange;
      this.paletteChoices.colorsRange = options.colorsRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.colorsRange;
      this.paletteChoices.colors = options.colors === void 0 ? this.colors - (this.paletteChoices.background ? 1 : 0) - (this.paletteChoices.aux ? 1 : 0) - (this.paletteChoices.border ? 1 : 0) : options.colors;
      this.paletteChoices.colorsRange = { min: 0, max: this.pal.length - 1 };
      this.preparePixelPaletteChoices();
      console.assert(this.pal.length > this.paletteChoices.backgroundRange.max - this.paletteChoices.backgroundRange.min);
      console.assert(this.pal.length > this.paletteChoices.auxRange.max - this.paletteChoices.auxRange.min);
      console.assert(this.pal.length > this.paletteChoices.borderRange.max - this.paletteChoices.borderRange.min);
    }
    chooseMin(available, range2, current) {
      if (!available)
        return current;
      if (current === void 0)
        return range2.min;
      return Math.min(current, range2.min);
    }
    chooseMax(available, range2, current) {
      if (!available)
        return current;
      if (current === void 0)
        return range2.max;
      return Math.max(current, range2.max);
    }
    prepareMinMax(background, aux, border) {
      let chosenMin = this.chooseMin(background, this.paletteChoices.backgroundRange);
      chosenMin = this.chooseMin(aux, this.paletteChoices.auxRange, chosenMin);
      chosenMin = this.chooseMin(border, this.paletteChoices.borderRange, chosenMin);
      chosenMin = chosenMin === void 0 ? 0 : chosenMin;
      let chosenMax = this.chooseMax(background, this.paletteChoices.backgroundRange);
      chosenMax = this.chooseMax(aux, this.paletteChoices.auxRange, chosenMax);
      chosenMax = this.chooseMax(border, this.paletteChoices.borderRange, chosenMax);
      chosenMax = chosenMax === void 0 ? this.pal.length - 1 : chosenMax;
      return { min: chosenMin, max: chosenMax };
    }
    prepareGlobalColorChoices() {
      let range2 = this.prepareMinMax(true, true, true);
      let palSubset = this.pal.slice(range2.min, range2.max + 1);
      let choices = reducePaletteChoices(
        this.ref,
        palSubset,
        palSubset.length,
        // rank the entire palette subset (because restricted palettes may have to fallback)
        1,
        this.errfn
      );
      let histoRankedChoices = choices.slice(0, choices.length);
      histoRankedChoices.sort((a, b) => b.count - a.count);
      let ranges = [
        { id: 0, selectable: this.paletteChoices.background, range: this.paletteChoices.backgroundRange },
        { id: 1, selectable: this.paletteChoices.aux, range: this.paletteChoices.auxRange },
        { id: 2, selectable: this.paletteChoices.border, range: this.paletteChoices.borderRange }
      ];
      ranges.sort((a, b) => a.selectable == b.selectable ? a.range.max - a.range.min == b.range.max - b.range.min ? a.id - b.id : a.range.max - a.range.min - (b.range.max - b.range.min) : a.selectable ? -1 : 1);
      let assignId = (choice, option) => {
        let index = choice.ind + range2.min;
        if (index < option.range.min || index > option.range.max)
          return false;
        switch (option.id) {
          case 0:
            this.bgColor = index;
            break;
          case 1:
            this.auxColor = index;
            break;
          case 2:
            this.borderColor = index;
            break;
        }
        return true;
      };
      let findBestChoice = (searchList, altList, option) => {
        for (let c = 0; c < searchList.length; ++c) {
          let choice = searchList[c];
          if (!assignId(choice, option))
            continue;
          let found = altList.findIndex((x) => x.ind == choice.ind);
          console.assert(found >= 0);
          altList.splice(found, 1);
          searchList.splice(c, 1);
          break;
        }
      };
      let firstNonSelectableColorFound = false;
      for (let i = 0; i < ranges.length; ++i) {
        let option = ranges[i];
        if (!option.selectable && !firstNonSelectableColorFound) {
          let topNChoices = [];
          for (let c = 0; c < ranges.length - i; ++c) {
            if (c >= histoRankedChoices.length)
              continue;
            let topChoice = histoRankedChoices[c];
            let priority = choices.findIndex((x) => x.ind == topChoice.ind);
            console.assert(priority >= 0);
            topNChoices.push({ priority, choice: topChoice });
            choices.splice(priority, 1);
          }
          topNChoices.sort((a, b) => a.priority - b.priority);
          choices = topNChoices.map((x) => x.choice).concat(choices);
          firstNonSelectableColorFound = true;
        }
        findBestChoice(option.selectable ? histoRankedChoices : choices, option.selectable ? choices : histoRankedChoices, option);
      }
      if (this.fliMode && (this.fliBug || this.blankLeftScreenFliBugArea || this.blankRightScreenMirrorFliBugArea)) {
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
    getValidColors(index) {
      let [ncols, col] = this.imageIndexToImageColumnInfo(index);
      let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(index);
      if (blank)
        return [this.bgColor];
      let p = this.imageIndexToParamOffset(index);
      let c1 = this.params[p] & 15;
      let c2 = this.params[p] >> 4 & 15;
      let c3 = this.params[p] >> 8 & 15;
      if (performBug) {
        c1 = c2 = this.fliBugChoiceColor;
        c3 = this.fliBugCbColor;
      }
      let valid = this.globalValid.slice(0, this.globalValid.length);
      valid.push(c1, c2, c3);
      valid = valid.slice(0, this.globalValid.length + this.paletteChoices.colors);
      return valid;
    }
    guessParam(pUnknown) {
      if (pUnknown >= this.cbOffset)
        return;
      return this.actualGuessParam(pUnknown);
    }
    actualGuessParam(pUnknown) {
      console.assert(pUnknown < this.params.length - this.extra);
      const calculateCb = this.useCb && this.iterateCount < MAX_ITERATE_COUNT / 2;
      let isCalculatingCb = pUnknown >= this.cbOffset;
      if (isCalculatingCb && !calculateCb)
        return;
      let index = this.paramOrCbParamOffsetToImageIndex(pUnknown);
      let cbp = isCalculatingCb ? pUnknown : this.imageIndexToCbParamOffset(index);
      let p = isCalculatingCb ? this.imageIndexToParamOffset(index) : pUnknown;
      if (!isCalculatingCb) {
        if (calculateCb && this.isImageIndexFirstRowOfColorBlock(index) && this.lastComputedCb != cbp) {
          this.actualGuessParam(cbp);
        }
      } else {
        this.lastComputedCb = cbp;
      }
      let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(index);
      console.assert(isCalculatingCb || p == pUnknown);
      console.assert(!isCalculatingCb || cbp == pUnknown);
      let useB = isCalculatingCb ? this.cb : this.b;
      let histo = new Uint32Array(16);
      let [xStart, yStart] = this.paramOrCbParamOffsetToXy(p);
      for (let y = yStart - useB.yb; y < yStart + useB.h + useB.yb; y++) {
        for (let x = xStart - useB.xb; x < xStart + useB.w + useB.xb; x++) {
          this.updateHisto(histo, this.pixelPaletteChoices, x, y);
        }
      }
      if (this.paletteChoices.background)
        histo[this.bgColor] = 0;
      if (this.paletteChoices.aux)
        histo[this.auxColor] = 0;
      if (this.paletteChoices.border)
        histo[this.borderColor] = 0;
      let cbColor = 0;
      if (!isCalculatingCb && this.useCb) {
        histo[this.params[cbp] & 15] = 0;
        cbColor = this.params[cbp] & 15;
      }
      let choices = getChoices(histo);
      let ind1 = choices[0] && choices[0].ind;
      let ind2 = choices[1] && choices[1].ind;
      let ind3 = choices[2] && choices[2].ind;
      if (ind1 === void 0)
        ind1 = this.bgColor;
      if (ind2 === void 0)
        ind2 = this.bgColor;
      if (ind3 === void 0)
        ind3 = this.bgColor;
      if (!this.useCb) {
        cbColor = ind3;
      }
      if (leftBlank) {
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
        ind1 = ind2 = this.fliBugChoiceColor;
        cbColor = this.fliBugCbColor;
      }
      return this.params[p] = ind1 & 15 | ind2 << 4 & 240 | cbColor << 8 & 3840;
    }
    updateHisto(histo, colors, x, y) {
      let i = this.xyToImageIndex(x, y);
      let c1 = i === void 0 ? this.pal[this.bgColor] : this.indexed[i];
      histo[c1] += 100;
      let rgbcomp = i === void 0 ? this.pal[this.bgColor] : this.alt[i];
      let c2 = this.getClosest(rgbcomp, colors);
      histo[c2] += 1 + this.noise;
    }
    paramOrCbParamOffsetToImageIndex(pUnknown) {
      let isCalculatingCb = pUnknown >= this.cbOffset;
      let useB = isCalculatingCb ? this.cb : this.b;
      let useP = isCalculatingCb ? pUnknown - this.cbOffset : pUnknown;
      var ncols = this.width / useB.w;
      var col = useP % ncols;
      var row = Math.floor(useP / ncols);
      var index = col * useB.w + row * this.width * useB.h;
      console.assert(index < this.width * this.height);
      return index;
    }
    isImageIndexInFliBugBlankingArea(index) {
      let [ncols, col] = this.imageIndexToImageColumnInfo(index);
      let bugLogic = this.fliBug && (col >= 0 && col < this.blankFliBugColumnCount) && !this.blankLeftScreenFliBugArea;
      let leftBlank = this.blankLeftScreenFliBugArea && (col >= 0 && col < this.blankFliBugColumnCount);
      let rightBlank = this.blankLeftScreenFliBugArea && this.blankRightScreenMirrorFliBugArea && (col >= ncols - this.blankFliBugColumnCount && col < ncols);
      let blank = leftBlank || rightBlank;
      return [bugLogic, blank, leftBlank, rightBlank, col];
    }
    imageIndexToImageColumnInfo(index) {
      let ncols = this.width / this.b.w;
      let col = Math.floor(index / this.b.w) % ncols;
      return [ncols, col];
    }
    paramOrCbParamOffsetToXy(pUnknown) {
      let imageIndex = this.paramOrCbParamOffsetToImageIndex(pUnknown);
      return this.imageIndexToXY(imageIndex);
    }
    imageIndexToXY(index) {
      return [index % this.width, Math.floor(index / this.width)];
    }
    xyToImageIndex(x, y) {
      if (x < 0 || y < 0)
        return void 0;
      if (x >= this.width || y >= this.height)
        return void 0;
      return y * this.width + x;
    }
    imageIndexToParamOffset(index) {
      let [ncols, col] = this.imageIndexToImageColumnInfo(index);
      let row = Math.floor(index / (this.width * this.b.h));
      let p = col + row * ncols;
      console.assert(p < this.cbOffset);
      return p;
    }
    imageIndexToCbParamOffset(index) {
      if (!this.useCb)
        return this.cbOffset;
      var ncols = this.width / this.cb.w;
      var col = Math.floor(index / this.cb.w) % ncols;
      var row = Math.floor(index / (this.width * this.cb.h));
      var cbp = this.cbOffset + col + row * ncols;
      console.assert(cbp >= this.cbOffset);
      console.assert(cbp < this.params.length - this.extra);
      return cbp;
    }
    isImageIndexFirstRowOfColorBlock(index) {
      var ncols = this.width / this.b.w;
      var row = Math.floor(index / (this.width * this.b.h));
      return 0 == row % Math.floor(this.cb.h / this.b.h);
    }
  };
  var ZXSpectrum_Canvas = class extends TwoColor_Canvas {
    init() {
      this.darkColors = range(0, Math.floor(this.pal.length / 2));
      this.brightColors = range(Math.floor(this.pal.length / 2), this.pal.length);
      this.w = this.sys.block.w;
      this.h = this.sys.block.h;
      this.paletteRange = { min: 0, max: this.pal.length };
      this.paletteRange = this.sys.paletteChoices === void 0 ? this.paletteRange : this.sys.paletteChoices.colorsRange === void 0 ? this.paletteRange : this.sys.paletteChoices.colorsRange;
      this.aux = this.sys.paletteChoices === void 0 ? false : this.sys.paletteChoices.aux === void 0 ? false : this.sys.paletteChoices.aux;
      this.xb = this.sys.cb === void 0 ? this.border : this.sys.cb.xb;
      this.yb = this.sys.cb === void 0 ? this.border : this.sys.cb.yb;
      this.xb = this.xb === void 0 ? this.border : this.xb;
      this.yb = this.yb === void 0 ? this.border : this.yb;
      this.darkPalette = this.pal.slice(0, Math.floor(this.pal.length / 2));
      this.brightPalette = this.pal.slice(Math.floor(this.pal.length / 2), this.pal.length);
      super.init();
    }
    guessParam(p) {
      let col = p % this.ncols;
      let row = Math.floor(p / this.ncols);
      let offset = col * this.w + row * (this.width * this.h);
      let calculateHistoForCell = (colors, min, max) => {
        let histo = new Uint32Array(Math.floor(this.pal.length));
        for (let y = -this.yb; y < this.h + this.yb; y++) {
          let o = offset + y * this.width;
          for (let x = -this.xb; x < this.w + this.xb; x++) {
            let c1 = this.indexed[o + x] | 0;
            if (c1 < min || c1 > max)
              histo[c1 ^ 8] += 100;
            else
              histo[c1] += 100;
            let c2 = this.getClosest(this.alt[o + x] | 0, colors);
            histo[c2] += 1 + this.noise;
          }
        }
        let choices = getChoices(histo);
        return choices;
      };
      let scoreChoices = (choices, palette) => {
        let overallScore = 0;
        for (let y = -this.yb; y < this.h + this.yb; y++) {
          let o = offset + y * this.width;
          for (let x = -this.xb; x < this.w + this.xb; x++) {
            let smallest = NaN;
            for (let c = 0; c < choices.length; ++c) {
              let score = this.errfn(this.ref[o + x], palette[choices[c].ind]);
              if (score < smallest || Number.isNaN(smallest))
                smallest = score;
            }
            overallScore += smallest;
          }
        }
        return overallScore;
      };
      let choices1 = calculateHistoForCell(this.darkColors, this.darkColors[0], this.darkColors[this.darkColors.length - 1]).slice(0, 2);
      let choices2 = calculateHistoForCell(this.brightColors, this.brightColors[0], this.brightColors[this.brightColors.length - 1]).slice(0, 2);
      if (choices1.length < 2)
        choices1.push(choices1[0]);
      if (choices2.length < 2)
        choices2.push(choices2[0]);
      console.assert(choices1.length >= 2);
      console.assert(choices2.length >= 2);
      let score1 = scoreChoices(choices1, this.pal);
      let score2 = scoreChoices(choices2, this.pal);
      let result = score2 < score1 ? choices2 : choices1;
      if (result[0].ind < this.paletteRange.min || result[0].ind > this.paletteRange.max) {
        result = score2 < score1 ? choices1 : choices2;
      }
      console.assert(result[0].ind >= this.paletteRange.min);
      console.assert(result[0].ind <= this.paletteRange.max);
      console.assert(result[1].ind >= this.paletteRange.min);
      console.assert(result[1].ind <= this.paletteRange.max);
      if (this.aux) {
        result[0].ind = result[0].ind ^ 8;
        result[1].ind = result[1].ind ^ 8;
      }
      this.updateParams(p, result);
    }
  };
  var NES_Canvas = class extends BasicParamDitherCanvas {
    constructor() {
      super(...arguments);
      this.w = 16;
      this.h = 16;
      this.allColors = [0, 1, 2, 3, 4];
    }
    init() {
      this.params = new Uint32Array(this.width / this.w * this.height / this.h);
      for (var i = 0; i < this.params.length; i++) {
        this.guessParam(i);
      }
    }
    getValidColors(offset) {
      var ncols = this.width / this.w;
      var col = Math.floor(offset / this.w) % ncols;
      var row = Math.floor(offset / (this.width * this.h));
      var i = col + row * ncols;
      var c1 = this.params[i];
      switch (c1 & 3) {
        case 0:
          return [0, 2, 3, 4];
        case 1:
          return [0, 1, 3, 4];
        case 2:
          return [0, 1, 2, 4];
        case 3:
          return [0, 1, 2, 3];
      }
      throw new Error("invalid param " + c1);
    }
    guessParam(p) {
      var ncols = this.width / this.w;
      var col = p % ncols;
      var row = Math.floor(p / ncols);
      var offset = col * this.w + row * this.width * this.h;
      var colors = [1, 2, 3, 4];
      var histo = new Uint32Array(16);
      var b = 8;
      for (var y = -b; y < this.h + b; y++) {
        var o = offset + y * this.width;
        for (var x = -b; x < this.w + b; x++) {
          var c1 = this.indexed[o + x] | 0;
          histo[c1] += 100;
          var rgbcomp = this.alt[o + x] | 0;
          var c2 = this.getClosest(rgbcomp, colors);
          histo[c2] += 1 + this.noise;
        }
      }
      var choices = getChoices(histo);
      choices.forEach((ch) => {
        if (ch.ind >= 1 && ch.ind <= 4)
          this.params[p] = ch.ind - 1;
      });
    }
  };
  var HAM6_Canvas = class extends DitheringCanvas {
    getValidColors(offset) {
      let arr = super.getValidColors(offset);
      if (offset == 0) {
        arr = arr.slice(0, 16);
      } else {
        let palindex = 16;
        let prevrgb = this.img[offset - 1];
        for (let chan = 0; chan < 3; chan++) {
          for (let i = 0; i < 16; i++) {
            let rgb = prevrgb;
            rgb &= ~(255 << chan * 8);
            rgb |= i << 4 << chan * 8;
            this.pal[palindex++] = rgb;
          }
        }
      }
      return arr;
    }
  };

  // src/dither/dithertron.ts
  var MAX_ITERATE_COUNT = 100;
  var Dithertron = class {
    constructor() {
      this.sysparams = null;
      this.dithcanv = null;
      this.sourceImageData = null;
      this.pixelsAvailable = null;
    }
    setSettings(sys) {
      this.sysparams = sys;
      this.reset();
    }
    setSourceImage(imageData) {
      this.sourceImageData = imageData;
      this.reset();
    }
    iterate() {
      if (this.dithcanv == null) {
        var sys = this.sysparams;
        if (!sys)
          throw new Error("no sysparams");
        if (!this.sourceImageData)
          throw new Error("no sourceImageData");
        var pal = new Uint32Array(sys.pal);
        var errfn = ERROR_FUNCTIONS[sys.errfn || "perceptual"] || getRGBAErrorPerceptual;
        if (sys.reduce) {
          pal = reducePalette(
            this.sourceImageData,
            pal,
            sys.reduce,
            sys.paletteDiversity || 0,
            errfn
          );
        }
        if (sys.extraColors) {
          let pal2 = new Uint32Array(pal.length + sys.extraColors);
          pal2.set(pal);
          pal = pal2;
        }
        var convFunction = canvas_exports[sys.conv];
        if (!convFunction)
          throw new Error("no convFunction for " + sys.conv);
        this.dithcanv = new convFunction(this.sourceImageData, sys.width, pal);
        if (!this.dithcanv)
          throw new Error("no convFunction() for " + sys.conv);
        this.dithcanv.sys = sys;
        this.dithcanv.errfn = errfn;
        this.dithcanv.noise = sys.noise ? 1 << sys.noise : 0;
        this.dithcanv.diffuse = (sys.diffuse || 0) + 0;
        this.dithcanv.ordered = (sys.ordered || 0) + 0;
        this.dithcanv.ditherfn = sys.ditherfn || [];
        this.dithcanv.init();
      }
      this.dithcanv.iterate();
      this.dithcanv.noise >>= 1;
      var final = this.dithcanv.changes == 0 || this.dithcanv.iterateCount > MAX_ITERATE_COUNT;
      if (this.pixelsAvailable != null) {
        this.pixelsAvailable({
          img: this.dithcanv.img,
          width: this.dithcanv.width,
          height: this.dithcanv.height,
          pal: this.dithcanv.pal,
          indexed: this.dithcanv.indexed,
          params: this.dithcanv.params,
          final
        });
      }
      return !final;
    }
    iterateIfNeeded() {
      var _a;
      if (this.iterate()) {
      } else {
        this.stop();
        console.log("stop", (_a = this.dithcanv) == null ? void 0 : _a.iterateCount);
      }
    }
    reset() {
      this.dithcanv = null;
      this.start();
    }
    stop() {
      clearTimeout(this.timer);
      this.timer = void 0;
    }
    start() {
      if (this.sysparams == null)
        return;
      if (this.sourceImageData == null)
        return;
      if (this.timer == null) {
        const msec = 50;
        var fn = () => {
          this.timer = setTimeout(fn, msec);
          this.iterateIfNeeded();
        };
        this.timer = setTimeout(fn, msec);
      }
    }
  };

  // src/worker/worker.ts
  var worker_dtron = new Dithertron();
  onmessage = function(e) {
    if (e && e.data) {
      console.log(e.data.cmd);
      switch (e.data.cmd) {
        case "reset":
          return worker_dtron.reset();
        case "setSettings":
          return worker_dtron.setSettings(e.data.data);
        case "setSourceImage":
          return worker_dtron.setSourceImage(e.data.data);
      }
    }
  };
  worker_dtron.pixelsAvailable = (msg) => {
    postMessage(msg);
  };
})();
//# sourceMappingURL=worker.js.map
