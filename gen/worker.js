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

  // src/settings/palettes.ts
  function RGB(r, g, b) {
    return (r & 255) << 0 | (g & 255) << 8 | (b & 255) << 16;
  }
  var MONO_RGB = [
    RGB(0, 0, 0),
    RGB(255, 255, 255)
  ];
  var CMYK_RGB = [
    RGB(0, 0, 0),
    RGB(255, 128, 64),
    RGB(64, 255, 128),
    RGB(128, 64, 255),
    RGB(255, 255, 255)
  ];
  var VIC_NTSC_RGB = [
    0,
    16777215,
    RGB(163, 64, 69),
    RGB(125, 235, 228),
    RGB(174, 70, 186),
    RGB(94, 202, 84),
    RGB(60, 57, 200),
    RGB(255, 255, 111),
    RGB(174, 96, 47),
    RGB(110, 73, 0),
    RGB(232, 122, 128),
    RGB(92, 92, 92),
    RGB(143, 143, 143),
    RGB(179, 255, 167),
    RGB(129, 126, 255),
    RGB(199, 199, 199)
  ];
  var VIC_PAL_RGB = [
    RGB(0, 0, 0),
    RGB(255, 255, 255),
    RGB(129, 51, 56),
    RGB(117, 206, 200),
    RGB(142, 60, 151),
    RGB(86, 172, 77),
    RGB(46, 44, 155),
    RGB(237, 241, 113),
    RGB(142, 80, 41),
    RGB(85, 56, 0),
    RGB(196, 108, 113),
    RGB(74, 74, 74),
    RGB(123, 123, 123),
    RGB(169, 255, 159),
    RGB(112, 109, 235),
    RGB(178, 178, 178)
  ];
  var VIC20_PAL_RGB = [
    RGB(0, 0, 0),
    RGB(255, 255, 255),
    RGB(120, 41, 34),
    RGB(135, 214, 221),
    RGB(170, 95, 182),
    RGB(85, 160, 73),
    RGB(64, 49, 141),
    RGB(191, 206, 114),
    RGB(170, 116, 73),
    RGB(234, 180, 137),
    RGB(184, 105, 98),
    RGB(199, 255, 255),
    RGB(234, 159, 246),
    RGB(148, 224, 137),
    RGB(128, 113, 204),
    RGB(255, 255, 178)
  ];
  var TMS9918_RGB = [
    RGB(0, 0, 0),
    RGB(0, 0, 0),
    RGB(33, 200, 66),
    RGB(94, 220, 120),
    RGB(84, 85, 237),
    RGB(125, 118, 252),
    RGB(212, 82, 77),
    RGB(66, 235, 245),
    RGB(252, 85, 84),
    RGB(255, 121, 120),
    RGB(212, 193, 84),
    RGB(230, 206, 128),
    RGB(33, 176, 59),
    RGB(201, 91, 186),
    RGB(204, 204, 204),
    RGB(255, 255, 255)
  ];
  var NES_RGB = [
    5395026,
    11796480,
    10485760,
    11599933,
    7602281,
    91,
    95,
    6208,
    12048,
    543240,
    26368,
    1196544,
    7153664,
    0,
    0,
    0,
    12899815,
    16728064,
    14421538,
    16729963,
    14090399,
    6818519,
    6588,
    21681,
    27227,
    35843,
    43776,
    2918400,
    10777088,
    0,
    0,
    0,
    16316664,
    16755516,
    16742785,
    16735173,
    16730354,
    14633471,
    4681215,
    46327,
    57599,
    58229,
    259115,
    7911470,
    15065624,
    7895160,
    0,
    0,
    16777215,
    16773822,
    16300216,
    16300248,
    16758527,
    16761855,
    13095423,
    10148607,
    8973816,
    8650717,
    12122296,
    16119980,
    16777136,
    16308472,
    0,
    0
  ];
  var AP2HIRES_RGB = [
    RGB(0, 0, 0),
    RGB(255, 68, 253),
    RGB(20, 245, 60),
    RGB(20, 207, 253),
    RGB(255, 106, 60),
    RGB(255, 255, 255)
  ];
  var AP2LORES_RGB = [
    RGB(0, 0, 0),
    RGB(227, 30, 96),
    RGB(96, 78, 189),
    RGB(255, 68, 253),
    RGB(0, 163, 96),
    RGB(156, 156, 156),
    RGB(20, 207, 253),
    RGB(208, 195, 255),
    RGB(96, 114, 3),
    RGB(255, 106, 60),
    RGB(156, 156, 156),
    RGB(255, 160, 208),
    RGB(20, 245, 60),
    RGB(208, 221, 141),
    RGB(114, 255, 208),
    RGB(255, 255, 255)
  ];
  var ASTROCADE_RGB = [0, 2368548, 4737096, 7171437, 9539985, 11974326, 14342874, 16777215, 12255269, 14680137, 16716142, 16725394, 16734903, 16744155, 16753663, 16762879, 11534409, 13959277, 16318866, 16721334, 16730842, 16740095, 16749311, 16758783, 10420330, 12779662, 15138995, 16718039, 16727291, 16736767, 16745983, 16755199, 8847495, 11206827, 13631696, 15994612, 16724735, 16733951, 16743423, 16752639, 6946975, 9306307, 11731175, 14092287, 16461055, 16732415, 16741631, 16751103, 4784304, 7143637, 9568505, 11929087, 14297599, 16731647, 16741119, 16750335, 2425019, 4784352, 7209215, 9570047, 12004095, 14372863, 16741375, 16750847, 191, 2359523, 4718847, 7146495, 9515263, 11949311, 14318079, 16752127, 187, 224, 2294015, 4658431, 7092735, 9461247, 11895551, 14264063, 176, 213, 249, 2367999, 4736511, 7105279, 9539327, 11908095, 159, 195, 3303, 209151, 2577919, 4946431, 7380735, 9749247, 135, 171, 7888, 17140, 681983, 3050495, 5484543, 7853311, 106, 3470, 12723, 22231, 31483, 1548031, 3916799, 6285311, 73, 8557, 17810, 27318, 36570, 373759, 2742271, 5176575, 4389, 13641, 23150, 32402, 41911, 51163, 2026495, 4456447, 9472, 18724, 27976, 37485, 46737, 56246, 1834970, 4194303, 14080, 23296, 32803, 42055, 51564, 60816, 2031541, 4456409, 18176, 27648, 36864, 46116, 55624, 392556, 2752401, 5177269, 21760, 30976, 40192, 49667, 58919, 1572683, 3932016, 6291348, 24320, 33536, 43008, 52224, 716810, 3079982, 5504851, 7864183, 25856, 35328, 44544, 250368, 2619136, 4980503, 7405371, 9764703, 26624, 35840, 45312, 2413824, 4782336, 7143173, 9568041, 11927374, 26112, 35584, 2338560, 4707328, 7141376, 9502464, 11927326, 14286659, 24832, 2393344, 4762112, 7196160, 9564928, 11992832, 14352155, 16711487, 2447360, 4815872, 7250176, 9618688, 12052992, 14417664, 16776990, 16777027, 4803328, 7172096, 9606144, 11974912, 14343424, 16776965, 16777001, 16777038, 6962176, 9330688, 11764992, 14133504, 16502272, 16773655, 16777019, 16777055, 8858112, 11226880, 13660928, 16029440, 16759818, 16769070, 16777043, 16777079, 10426112, 12794624, 15163392, 16745475, 16754727, 16764235, 16773488, 16777108, 11534848, 13969152, 16337664, 16740388, 16749640, 16759148, 16768401, 16777141, 12255232, 14684928, 16725795, 16735047, 16744556, 16753808, 16763317, 16772569];
  var VCS_RGB = [
    0,
    0,
    4210752,
    4210752,
    7105644,
    7105644,
    9474192,
    9474192,
    11579568,
    11579568,
    13158600,
    13158600,
    14474460,
    14474460,
    16053492,
    16053492,
    17476,
    17476,
    1074276,
    1074276,
    2393220,
    2393220,
    3448992,
    3448992,
    4241592,
    4241592,
    5296336,
    5296336,
    6088936,
    6088936,
    6880508,
    6880508,
    10352,
    10352,
    1328260,
    1328260,
    2645144,
    2645144,
    3963052,
    3963052,
    5016764,
    5016764,
    6070476,
    6070476,
    6862044,
    6862044,
    7915756,
    7915756,
    6276,
    6276,
    1586328,
    1586328,
    3166380,
    3166380,
    4745408,
    4745408,
    6062288,
    6062288,
    7378144,
    7378144,
    8431852,
    8431852,
    9747708,
    9747708,
    136,
    136,
    2105500,
    2105500,
    3947696,
    3947696,
    5789888,
    5789888,
    7368912,
    7368912,
    8947936,
    8947936,
    10526956,
    10526956,
    11842812,
    11842812,
    6029432,
    6029432,
    7610508,
    7610508,
    8928416,
    8928416,
    10246320,
    10246320,
    11563200,
    11563200,
    12616912,
    12616912,
    13671644,
    13671644,
    14725356,
    14725356,
    7864392,
    7864392,
    9445472,
    9445472,
    10763384,
    10763384,
    12081292,
    12081292,
    13398176,
    13398176,
    14451892,
    14451892,
    15506628,
    15506628,
    16560340,
    16560340,
    8650772,
    8650772,
    9969712,
    9969712,
    11287628,
    11287628,
    12605544,
    12605544,
    13660284,
    13660284,
    14715028,
    14715028,
    15507624,
    15507624,
    16561340,
    16561340,
    8912896,
    8912896,
    10231836,
    10231836,
    11550776,
    11550776,
    12606544,
    12606544,
    13661288,
    13661288,
    14716028,
    14716028,
    15508624,
    15508624,
    16562340,
    16562340,
    8132608,
    8132608,
    9451548,
    9451548,
    11031608,
    11031608,
    12349520,
    12349520,
    13404264,
    13404264,
    14457980,
    14457980,
    15512720,
    15512720,
    16566436,
    16566436,
    6040576,
    6040576,
    7883804,
    7883804,
    9463864,
    9463864,
    11306064,
    11306064,
    12622952,
    12622952,
    13939836,
    13939836,
    15256720,
    15256720,
    16572580,
    16572580,
    2898944,
    2898944,
    4742172,
    4742172,
    6585400,
    6585400,
    8428624,
    8428624,
    9745512,
    9745512,
    11325564,
    11325564,
    12641424,
    12641424,
    13958308,
    13958308,
    15360,
    15360,
    2120736,
    2120736,
    4226112,
    4226112,
    6069340,
    6069340,
    7648372,
    7648372,
    9228428,
    9228428,
    10806436,
    10806436,
    12123320,
    12123320,
    14356,
    14356,
    1858612,
    1858612,
    3701840,
    3701840,
    5281900,
    5281900,
    6861956,
    6861956,
    8178844,
    8178844,
    9495732,
    9495732,
    10812616,
    10812616,
    12332,
    12332,
    1855564,
    1855564,
    3436648,
    3436648,
    5016708,
    5016708,
    6596764,
    6596764,
    7913652,
    7913652,
    8967372,
    8967372,
    10284256,
    10284256,
    10308,
    10308,
    1591396,
    1591396,
    3172484,
    3172484,
    4490400,
    4490400,
    5807288,
    5807288,
    7124176,
    7124176,
    8178920,
    8178920,
    9232636,
    9232636
  ];
  var CGA_RGB = [
    0,
    11141120,
    43520,
    11184640,
    170,
    11141290,
    21930,
    11184810,
    5592405,
    16733525,
    5635925,
    16777045,
    5592575,
    16733695,
    5636095,
    16777215
  ];
  var CGA_RGB_1 = [0, 43520, 170, 21930];
  var CGA_RGB_2 = [0, 11184640, 11141290, 11184810];
  var CGA_RGB_3 = [0, 11184640, 170, 11184810];
  var CGA_RGB_1H = [0, 5635925, 5592575, 5636095];
  var CGA_RGB_2H = [0, 16777045, 16733695, 16777215];
  var CGA_RGB_3H = [0, 16776960, 5592575, 16777215];
  var SMS_RGB = generateRGBPalette(2, 2, 2);
  var WILLIAMS_RGB = generateRGBPalette(3, 3, 2);
  var ATARIST_RGB = generateRGBPalette(3, 3, 3);
  var TELETEXT_RGB = generateRGBPalette(1, 1, 1);
  var ZXSPECTRUM_RGB = [
    // GRB
    RGB(0, 0, 0),
    // 0x00 Black            // dark palette
    RGB(1, 0, 206),
    // 0x01 Blue
    RGB(207, 1, 0),
    // 0x02 Red
    RGB(207, 1, 206),
    // 0x03 Magenta
    RGB(0, 207, 21),
    // 0x04 Green
    RGB(1, 207, 207),
    // 0x05 Cyan
    RGB(207, 207, 21),
    // 0x06 Yellow
    RGB(207, 207, 207),
    // 0x07 White
    RGB(0, 0, 0),
    // 0x08 "Bright" Black   // bright palette
    RGB(2, 0, 253),
    // 0x09 Bright Blue
    RGB(255, 2, 1),
    // 0x0A Bright Red
    RGB(255, 2, 253),
    // 0x0B Bright Magenta
    RGB(0, 255, 28),
    // 0x0C Bright Green
    RGB(2, 255, 255),
    // 0x0D Bright Cyan
    RGB(255, 255, 29),
    // 0x0E Bright Yellow
    RGB(255, 255, 255)
    // 0x0F Bright White
  ];
  var AMSTRAD_CPC_RGB = [
    0,
    8388752,
    16711680,
    128,
    8388736,
    16711808,
    255,
    8388863,
    16711935,
    32768,
    8421376,
    16744448,
    32896,
    8421504,
    16744576,
    33023,
    8421631,
    16744703,
    65280,
    8453888,
    16776960,
    65408,
    8454016,
    16777088,
    65535,
    8454143,
    16777215
  ];
  var PICO8_RGB = [
    0,
    //0, 0, 0 black
    1911635,
    //29, 43, 83 dark-blue
    8267091,
    //126, 37, 83 dark-purple
    34641,
    //0, 135, 81 dark-green
    11227702,
    //171, 82, 54 brown
    6248271,
    //95, 87, 79 dark-gray
    12764103,
    //194, 195, 199 light-gray
    16773608,
    //255, 241, 232 white
    16711757,
    //255, 0, 77 red
    16753408,
    //255, 163, 0 orange
    16772135,
    //255, 236, 39 yellow
    58422,
    //0, 228, 54 green
    2731519,
    //41, 173, 255 blue
    8615580,
    //131, 118, 156 indigo
    16742312,
    //255, 119, 168 pink
    16764074
    //255, 204, 170 peach
  ];
  var TIC80_RGB = [
    1313820,
    4465716,
    3159149,
    5130831,
    8735792,
    3433764,
    13649480,
    7696737,
    5864910,
    13794604,
    8754593,
    7186988,
    13806233,
    7193290,
    14341214,
    14610134
  ];
  var CHANNELF_RGB = [
    // background
    /*
    0xe0e0e0,
    0x101010,
    0x91ffa6,
    0xced0ff,
    */
    // foreground
    16579836,
    16724307,
    183389,
    4931571
  ];
  var GAMEBOY_GREEN_RGB = [
    997391,
    3170864,
    1027212,
    1035436
  ];
  var RGB_444 = generateRGBPalette(4, 4, 4);
  var AMIGA_OCS_COLOR_RGB = RGB_444;
  var IIGS_COLOR_RGB = RGB_444;
  var GAMEGEAR_COLOR_RGB = RGB_444;
  var MC6847_PALETTE0 = [
    RGB(48, 210, 0),
    /* NTSC: RGB( 28, 213,  16), */
    // green 
    RGB(245, 245, 128),
    /* NTSC: RGB(226, 219,  15), */
    // yellow
    RGB(76, 58, 180),
    /* NTSC: RGB(  3,  32, 255), */
    // blue  
    RGB(154, 50, 54)
    /* NTSC: RGB(226,  32,  10), */
    // red   
  ];
  var MC6847_PALETTE1 = [
    RGB(216, 216, 216),
    /* NTSC: RGB( 205, 219, 224), */
    // buff    
    RGB(65, 175, 113),
    /* NTSC: RGB(  22, 208, 226), */
    // cyan    
    RGB(216, 110, 240),
    /* NTSC: RGB( 203,  57, 226), */
    // magenta 
    RGB(212, 127, 0)
    /* NTSC: RGB( 204,  45,  16), */
    // orange  
  ];
  function generateRGBPalette(rr, gg, bb) {
    var n = 1 << rr + gg + bb;
    var rs = 255 / ((1 << rr) - 1);
    var gs = 255 / ((1 << gg) - 1);
    var bs = 255 / ((1 << bb) - 1);
    var pal = new Uint32Array(n);
    for (var i = 0; i < n; i++) {
      var r = i & (1 << rr) - 1;
      var g = i >> rr & (1 << gg) - 1;
      var b = i >> rr + gg & (1 << bb) - 1;
      pal[i] = RGB(r * rs, g * gs, b * bs);
    }
    return pal;
  }

  // src/settings/systems.ts
  var SYSTEMS = [
    {
      id: "c64.multi",
      name: "C-64 Multi",
      width: 160,
      height: 200,
      scaleX: 0.936 * 2,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 4, h: 8, colors: 4, xb: 1, yb: 2 },
      cell: { w: 4, h: 8, msbToLsb: true },
      paletteChoices: { background: true },
      cb: { w: 4, h: 8, xb: 1, yb: 2 },
      param: { extra: 1 },
      toNative: "exportC64Multi"
    },
    {
      id: "c64.multi.fli",
      name: "C-64 Multi FLI (w/o bug)",
      width: 160,
      height: 200,
      scaleX: 0.936 * 2,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 4, h: 1, colors: 4, xb: 1 },
      paletteChoices: { background: true },
      cell: { w: 4, h: 8, msbToLsb: true },
      cb: { w: 4, h: 8, xb: 1, yb: 2 },
      param: { extra: 1 },
      fli: { bug: false, blankLeft: false, blankRight: false, blankColumns: 3 },
      toNative: "exportC64Multi"
    },
    {
      id: "c64.multi.fli.bug",
      name: "C-64 Multi FLI (with bug)",
      width: 160,
      height: 200,
      scaleX: 0.936 * 2,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 4, h: 1, colors: 4, xb: 1 },
      cell: { w: 4, h: 8, msbToLsb: true },
      paletteChoices: { background: true },
      cb: { w: 4, h: 8, xb: 1, yb: 2 },
      param: { extra: 1 },
      fli: { bug: true, blankLeft: false, blankRight: false, blankColumns: 3 },
      toNative: "exportC64Multi"
    },
    {
      id: "c64.multi.fli.blank.left",
      name: "C-64 Multi FLI (Left blank)",
      width: 160,
      height: 200,
      scaleX: 0.936 * 2,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 4, h: 1, colors: 4, xb: 1 },
      cell: { w: 4, h: 8, msbToLsb: true },
      paletteChoices: { background: true },
      cb: { w: 4, h: 8, xb: 1, yb: 2 },
      param: { extra: 1 },
      fli: { bug: false, blankLeft: true, blankRight: false, blankColumns: 3 },
      toNative: "exportC64Multi"
    },
    {
      id: "c64.multi.fli.blank",
      name: "C-64 Multi FLI (L/R blank)",
      width: 160,
      height: 200,
      scaleX: 0.936 * 2,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 4, h: 1, colors: 4, xb: 1 },
      cell: { w: 4, h: 8, msbToLsb: true },
      paletteChoices: { background: true },
      cb: { w: 4, h: 8, xb: 1, yb: 2 },
      param: { extra: 1 },
      fli: { bug: false, blankLeft: true, blankRight: true, blankColumns: 3 },
      toNative: "exportC64Multi"
    },
    {
      id: "c64.hires",
      name: "C-64 Hires",
      width: 320,
      height: 200,
      scaleX: 0.936,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      param: { extra: 1 },
      toNative: "exportC64Hires"
    },
    {
      id: "c64.hires.fli",
      name: "C-64 Hires FLI (w/o bug)",
      width: 320,
      height: 200,
      scaleX: 0.936,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 8, h: 1, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      param: { extra: 1 },
      fli: { bug: false, blankLeft: false, blankRight: false, blankColumns: 3 },
      toNative: "exportC64Hires"
    },
    {
      id: "c64.hires.fli.bug",
      name: "C-64 Hires FLI (with bug)",
      width: 320,
      height: 200,
      scaleX: 0.936,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 8, h: 1, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      param: { extra: 1 },
      fli: { bug: true, blankLeft: false, blankRight: false, blankColumns: 3 },
      toNative: "exportC64Hires"
    },
    {
      id: "c64.hires.fli.blank",
      name: "C-64 Hires FLI (L/R blank)",
      width: 320,
      height: 200,
      scaleX: 0.936,
      conv: "VICII_Canvas",
      pal: VIC_PAL_RGB,
      block: { w: 8, h: 1, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      param: { extra: 1 },
      fli: { bug: false, blankLeft: true, blankRight: true, blankColumns: 3 },
      toNative: "exportC64Hires"
    },
    {
      id: "nes",
      name: "NES (4 color, 240 tiles)",
      width: 160,
      height: 96,
      scaleX: 8 / 7,
      conv: "DitheringCanvas",
      pal: NES_RGB,
      reduce: 4,
      toNative: "exportNES"
    },
    {
      id: "msx",
      name: "MSX/Coleco (TMS9918A)",
      width: 256,
      height: 192,
      conv: "VDPMode2_Canvas",
      pal: TMS9918_RGB,
      block: { w: 8, h: 1, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      toNative: "exportTMS9918"
    },
    {
      id: "apple2.hires",
      name: "Apple ][ (Hires)",
      width: 140,
      height: 192,
      scaleX: 2,
      conv: "Apple2_Canvas",
      pal: AP2HIRES_RGB,
      block: { w: 7, h: 1, colors: 4 },
      toNative: "exportApple2HiresToHGR"
    },
    {
      id: "atari8.d",
      name: "Atari ANTIC (Mode D)",
      width: 160,
      height: 96,
      scaleX: 0.8571,
      conv: "DitheringCanvas",
      pal: VCS_RGB,
      reduce: 4,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 2, brev: true }
    },
    {
      id: "atari8.f.10",
      name: "Atari ANTIC (Mode F/10)",
      width: 80,
      height: 192,
      scaleX: 0.8571 * 4,
      conv: "DitheringCanvas",
      pal: VCS_RGB,
      reduce: 9,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 4, brev: true }
    },
    {
      id: "vcs",
      name: "Atari VCS",
      width: 40,
      height: 192,
      scaleX: 6,
      conv: "DitheringCanvas",
      pal: VCS_RGB,
      reduce: 2,
      toNative: "exportVCSPlayfield"
    },
    {
      id: "vcs.color",
      name: "Atari VCS (Color)",
      width: 40,
      height: 192,
      scaleX: 6,
      conv: "VCSColorPlayfield_Canvas",
      pal: VCS_RGB,
      toNative: "exportVCSPlayfield"
    },
    {
      id: "astrocade",
      name: "Bally Astrocade",
      width: 160,
      height: 98,
      scaleX: 1,
      conv: "DitheringCanvas",
      pal: ASTROCADE_RGB,
      reduce: 4,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 2, brev: true }
    },
    {
      id: "zx",
      name: "ZX Spectrum",
      width: 256,
      height: 192,
      conv: "ZXSpectrum_Canvas",
      pal: ZXSPECTRUM_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      toNative: "exportZXSpectrum"
    },
    {
      id: "zx.dark",
      name: "ZX Spectrum (dark only)",
      width: 256,
      height: 192,
      conv: "ZXSpectrum_Canvas",
      pal: ZXSPECTRUM_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: { colorsRange: { min: 0, max: 7 } },
      toNative: "exportZXSpectrum"
    },
    {
      id: "zx.bright",
      name: "ZX Spectrum (bright only)",
      width: 256,
      height: 192,
      conv: "ZXSpectrum_Canvas",
      pal: ZXSPECTRUM_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: { colorsRange: { min: 8, max: 15 } },
      toNative: "exportZXSpectrum"
    },
    {
      id: "zx.dark.bright",
      name: "ZX Spectrum (dark made bright only)",
      width: 256,
      height: 192,
      conv: "ZXSpectrum_Canvas",
      pal: ZXSPECTRUM_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: { aux: true, colorsRange: { min: 0, max: 7 } },
      // aux is used to signal the special mode
      toNative: "exportZXSpectrum"
    },
    {
      id: "zx.bright.dark",
      name: "ZX Spectrum (bright made dark only)",
      width: 256,
      height: 192,
      conv: "ZXSpectrum_Canvas",
      pal: ZXSPECTRUM_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: { aux: true, colorsRange: { min: 8, max: 15 } },
      // aux is used to signal the special mode
      toNative: "exportZXSpectrum"
    },
    {
      id: "cpc.mode0",
      name: "Amstrad CPC (mode 0)",
      width: 160,
      height: 200,
      scaleX: 2,
      conv: "DitheringCanvas",
      pal: AMSTRAD_CPC_RGB,
      reduce: 16,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 4, yremap: [3, 80, 2048], bitremap: [7, 3, 5, 1, 6, 2, 4, 0] }
    },
    {
      id: "cpc.mode1",
      name: "Amstrad CPC (mode 1)",
      width: 320,
      height: 200,
      scaleX: 1,
      conv: "DitheringCanvas",
      pal: AMSTRAD_CPC_RGB,
      reduce: 4,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 2, yremap: [3, 80, 2048], bitremap: [7, 3, 6, 2, 5, 1, 4, 0] }
    },
    // null == separator, systems with runnable source code are above
    null,
    {
      id: "vic20.hires",
      name: "VIC-20 Hires",
      width: 160,
      height: 160,
      scaleX: 1.5,
      conv: "VICII_Canvas",
      pal: VIC20_PAL_RGB,
      block: { w: 8, h: 8, colors: 2 },
      // can choose the background, or one foreground color
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        background: true,
        // pixels can choose the background color
        backgroundRange: { min: 0, max: 7 },
        // (but with a reduced color palette)
        colorsRange: { min: 0, max: 7 }
        // pixels can only choose from a reduced color palette
      },
      toNative: "exportVicHires"
    },
    {
      id: "vic20.multi",
      name: "VIC-20 Multi",
      width: 80,
      height: 160,
      scaleX: 3,
      conv: "VICII_Canvas",
      pal: VIC20_PAL_RGB,
      block: { w: 4, h: 8, colors: 4 },
      // can choose background, aux, border and one foreground color
      cell: { w: 4, h: 8, msbToLsb: true },
      paletteChoices: {
        background: true,
        // pixels can choose the background color
        backgroundRange: { min: 0, max: 15 },
        aux: true,
        // pixels can choose the aux color
        auxRange: { min: 0, max: 15 },
        border: true,
        // pixels can choose the border color
        borderRange: { min: 0, max: 7 },
        // (but with a reduced palette)
        colorsRange: { min: 0, max: 7 }
        // a reduced palette applies to the pixel colors
      },
      toNative: "exportVicMulti"
    },
    {
      id: "nes4f",
      name: "NES (4 color, full screen)",
      width: 256,
      height: 240,
      scaleX: 8 / 7,
      conv: "DitheringCanvas",
      pal: NES_RGB,
      reduce: 4,
      toNative: "exportNES"
    },
    {
      id: "nes5f",
      name: "NES (5 color, full screen)",
      width: 256,
      height: 240,
      scaleX: 8 / 7,
      conv: "NES_Canvas",
      pal: NES_RGB,
      reduce: 5,
      toNative: "exportNES"
    },
    {
      id: "atari7800.160a",
      name: "Atari 7800 (160A)",
      width: 160,
      height: 240,
      scaleX: 2,
      conv: "DitheringCanvas",
      pal: VCS_RGB,
      reduce: 4
    },
    {
      id: "atari7800.160b",
      name: "Atari 7800 (160B)",
      width: 160,
      height: 240,
      scaleX: 2,
      conv: "DitheringCanvas",
      pal: VCS_RGB,
      reduce: 12
    },
    {
      id: "sms",
      name: "Sega Master System",
      width: 176,
      // only 488 unique tiles max, otherwise 256x240
      height: 144,
      scaleX: 8 / 7,
      conv: "DitheringCanvas",
      pal: SMS_RGB,
      reduce: 16
    },
    {
      id: "sms-gg",
      name: "Sega GameGear",
      width: 160,
      height: 144,
      scaleX: 1.2,
      conv: "DitheringCanvas",
      pal: GAMEGEAR_COLOR_RGB,
      reduce: 16
    },
    {
      id: "bbcmicro.mode2",
      name: "BBC Micro (mode 2)",
      width: 160,
      height: 256,
      scaleX: 2,
      conv: "DitheringCanvas",
      pal: TELETEXT_RGB
    },
    {
      id: "apple2.lores",
      name: "Apple ][ (Lores)",
      width: 40,
      height: 48,
      scaleX: 1.5,
      conv: "DitheringCanvas",
      pal: AP2LORES_RGB,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 4 }
    },
    {
      id: "apple2.dblhires",
      name: "Apple ][ (Double-Hires)",
      width: 140,
      height: 192,
      scaleX: 2,
      conv: "DitheringCanvas",
      pal: AP2LORES_RGB
    },
    {
      id: "appleiigs.320.16",
      name: "Apple IIGS (16 colors)",
      width: 320,
      height: 200,
      conv: "DitheringCanvas",
      pal: IIGS_COLOR_RGB,
      reduce: 16
    },
    {
      id: "channelf",
      name: "Fairchild Channel F",
      width: 102,
      height: 58,
      conv: "DitheringCanvas",
      pal: CHANNELF_RGB,
      reduce: 4
      // TODO: https://geeks-world.github.io/articles/467811/index.html
    },
    {
      id: "mac",
      name: "Mac 128K",
      width: 512,
      height: 342,
      conv: "DitheringCanvas",
      pal: MONO_RGB
    },
    {
      id: "x86.cga.04h.1",
      name: "PC CGA (Mode 04h, palette 1)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB_1,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 2 }
    },
    {
      id: "x86.cga.04h.1B",
      name: "PC CGA (Mode 04h, bright 1)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB_1H,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 2 }
    },
    {
      id: "x86.cga.04h.2",
      name: "PC CGA (Mode 04h, palette 2)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB_2,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 2 }
    },
    {
      id: "x86.cga.04h.2B",
      name: "PC CGA (Mode 04h, bright 2)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB_2H,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 2 }
    },
    {
      id: "x86.cga.05h",
      name: "PC CGA (Mode 05h)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB_3,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 2 }
    },
    {
      id: "x86.cga.05h.B",
      name: "PC CGA (Mode 05h, bright)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB_3H,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 2 }
    },
    {
      id: "x86.ega.0dh",
      name: "PC EGA (Mode 0Dh)",
      width: 320,
      height: 200,
      scaleX: 200 / 320 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 4 }
    },
    {
      id: "x86.ega.10h",
      name: "PC EGA (Mode 10h)",
      width: 640,
      height: 350,
      scaleX: 350 / 640 * 1.37,
      conv: "DitheringCanvas",
      pal: CGA_RGB,
      toNative: "exportFrameBuffer",
      exportFormat: { bpp: 1, np: 4 }
    },
    {
      id: "williams",
      name: "Williams Arcade",
      width: 304,
      height: 256,
      conv: "DitheringCanvas",
      pal: WILLIAMS_RGB,
      reduce: 16
    },
    {
      id: "pico8",
      name: "PICO-8",
      width: 128,
      height: 128,
      conv: "DitheringCanvas",
      pal: PICO8_RGB
    },
    {
      id: "tic80",
      name: "TIC-80",
      width: 240,
      height: 136,
      conv: "DitheringCanvas",
      pal: TIC80_RGB
    },
    {
      id: "gb",
      name: "Game Boy Classic",
      width: 160,
      height: 144,
      scaleX: 10 / 9,
      conv: "DitheringCanvas",
      pal: GAMEBOY_GREEN_RGB
    },
    /*
    {
        id:'gbc',
        name:'Game Boy Color',
        width:160,
        height:144,
        aspect:1,
        conv:'DitheringCanvas',
        pal:GAMEBOY_COLOR_RGB,
        reduce:32,
    },
    */
    {
      id: "amiga.lores",
      name: "Amiga (Lores)",
      width: 320,
      height: 256,
      conv: "DitheringCanvas",
      pal: AMIGA_OCS_COLOR_RGB,
      reduce: 32
      //toNative:'exportFrameBuffer',
      //exportFormat:{bpp:1,brev:true,np:5},
    },
    {
      id: "amiga.lores.ham6",
      name: "Amiga (Lores, HAM6)",
      width: 320,
      height: 256,
      conv: "HAM6_Canvas",
      pal: AMIGA_OCS_COLOR_RGB,
      reduce: 16,
      extraColors: 48
      //toNative:'exportFrameBuffer',
      //exportFormat:{bpp:1,brev:true,np:6},
    },
    {
      id: "cx16.lores",
      name: "Commander X16 (Lores)",
      width: 320,
      height: 240,
      scaleX: 1,
      conv: "DitheringCanvas",
      pal: AMIGA_OCS_COLOR_RGB,
      reduce: 256
    },
    {
      id: "cx16.hires",
      name: "Commander X16 (Hires, cropped)",
      width: 640,
      height: 400,
      scaleX: 1,
      conv: "DitheringCanvas",
      pal: AMIGA_OCS_COLOR_RGB,
      reduce: 16
    },
    {
      id: "compucolor",
      name: "Compucolor",
      width: 160,
      height: 192,
      scaleX: 1.6,
      conv: "Compucolor_Canvas",
      pal: ZXSPECTRUM_RGB,
      block: { w: 2, h: 4, colors: 2 }
    },
    // https://www.bighole.nl//pub/mirror/homepage.ntlworld.com/kryten_droid/teletext/spec/teletext_spec_1974.htm
    {
      id: "teletext",
      name: "Teletext",
      width: 40 * 2,
      height: 24 * 3,
      scaleX: 4 / 3,
      conv: "Teletext_Canvas",
      pal: TELETEXT_RGB,
      block: { w: 2, h: 3, colors: 2 }
    },
    {
      id: "atarist",
      name: "Atari ST",
      width: 320,
      height: 200,
      scaleX: 1,
      conv: "DitheringCanvas",
      pal: ATARIST_RGB,
      reduce: 16
    },
    {
      id: "MC6847.CG2.palette0",
      name: "MC6847 (CG2, palette 0)",
      width: 128,
      height: 64,
      scaleX: 1 / 1.3,
      conv: "DitheringCanvas",
      pal: MC6847_PALETTE0,
      reduce: 4,
      toNative: "exportMC6847"
    },
    {
      id: "MC6847.CG2.palette1",
      name: "MC6847 (CG2, palette 1)",
      width: 128,
      height: 64,
      scaleX: 1 / 1.3,
      conv: "DitheringCanvas",
      pal: MC6847_PALETTE1,
      reduce: 4,
      toNative: "exportMC6847"
    },
    {
      id: "MC6847.CG3.palette0",
      name: "MC6847 (CG3, palette 0)",
      width: 128,
      height: 96,
      scaleX: 1 / 1.3 * 96 / 64,
      conv: "DitheringCanvas",
      pal: MC6847_PALETTE0,
      reduce: 4,
      toNative: "exportMC6847"
    },
    {
      id: "MC6847.CG3.palette1",
      name: "MC6847 (CG3, palette 1)",
      width: 128,
      height: 96,
      scaleX: 1 / 1.3 * 96 / 64,
      conv: "DitheringCanvas",
      pal: MC6847_PALETTE1,
      reduce: 4,
      toNative: "exportMC6847"
    },
    {
      id: "MC6847.CG6.palette0",
      name: "MC6847 (CG6, palette 0)",
      width: 128,
      height: 192,
      scaleX: 1 / 1.3 * 192 / 64,
      conv: "DitheringCanvas",
      pal: MC6847_PALETTE0,
      reduce: 4,
      toNative: "exportMC6847"
    },
    {
      id: "MC6847.CG6.palette1",
      name: "MC6847 (CG6, palette 1)",
      width: 128,
      height: 192,
      scaleX: 1 / 1.3 * 192 / 64,
      conv: "DitheringCanvas",
      pal: MC6847_PALETTE1,
      reduce: 4,
      toNative: "exportMC6847"
    },
    {
      id: "vcs.48",
      name: "Atari VCS (48x48 bitmap)",
      width: 48,
      height: 48,
      conv: "DitheringCanvas",
      pal: VCS_RGB,
      reduce: 2
    },
    {
      id: "pce.256x240",
      name: "PC Engine (256x240)",
      width: 256,
      height: 240,
      scaleX: 5 / 4,
      conv: "DitheringCanvas",
      pal: ATARIST_RGB,
      reduce: 16
    }
  ];
  var SYSTEM_LOOKUP = {};
  SYSTEMS.forEach((sys) => {
    if (sys)
      SYSTEM_LOOKUP[sys.id || sys.name] = sys;
  });

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
      this.errorThreshold = 0;
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
      const errmag = (Math.abs(err[0]) + Math.abs(err[1] * 2) + Math.abs(err[2])) / (256 * 4);
      if (this.indexed[offset] != palidx && errmag >= this.errorThreshold) {
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
  var TEMPERATURE_START_ITERATIONS = 10;
  var TEMPERATURE_STEP = 0.01;
  var Dithertron = class {
    constructor() {
      this.sysparams = SYSTEMS[0];
      this.dithcanv = null;
      this.sourceImageData = null;
      this.pixelsAvailable = null;
    }
    setSettings(sys) {
      this.sysparams = Object.assign({}, sys);
    }
    setSourceImage(imageData) {
      this.sourceImageData = imageData;
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
      if (this.dithcanv.iterateCount >= TEMPERATURE_START_ITERATIONS) {
        this.dithcanv.errorThreshold += TEMPERATURE_STEP;
      }
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
    clear() {
      this.dithcanv = null;
    }
    restart() {
      this.clear();
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
        case "restart":
          return worker_dtron.restart();
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
