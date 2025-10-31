"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/common/util.ts
  function sqr(x) {
    return x * x;
  }
  function range(start, end) {
    let result = new Array(end - start);
    for (let i = start; i < end; i++) {
      result[i - start] = i;
    }
    return result;
  }
  function runtime_assert(condition, message) {
    if (condition)
      return;
    if (message == void 0)
      console.assert(condition);
    else
      console.assert(condition, message);
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
  var INTELLIVISION_STIC_RGB = [
    RGB(0, 0, 0),
    // Black            // primary color set
    RGB(0, 117, 255),
    // Blue
    RGB(255, 76, 57),
    // Red
    RGB(209, 185, 81),
    // Tan
    RGB(9, 185, 0),
    // Dark Green
    RGB(48, 223, 16),
    // Green
    RGB(255, 229, 1),
    // Yellow
    RGB(255, 255, 255),
    // White
    RGB(140, 140, 140),
    // Gray             // pastel color set
    RGB(40, 229, 192),
    // Cyan
    RGB(255, 160, 46),
    // Orange
    RGB(100, 103, 0),
    // Brown
    RGB(255, 41, 255),
    // Pink
    RGB(140, 143, 255),
    // Light Blue
    RGB(124, 237, 0),
    // Yellow Green
    RGB(196, 43, 252)
    // Purple
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
  var SNES_B5G5R5_RGB = generateSNESB5G5R5();
  var SNES_BBPGGGPRRRP = generateSNESDirectColor();
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
  function generateSNESB5G5R5() {
    let result = new Uint32Array(1 << 5 + 5 + 5);
    let i = 0;
    for (let r = 0; r < 1 << 5; ++r) {
      for (let g = 0; g < 1 << 5; ++g) {
        for (let b = 0; b < 1 << 5; ++b, ++i) {
          let color = r << 3 | g << 3 + 8 | b << 3 + 16;
          color |= (r & 28) >> 2 | (g & 28) >> 2 << 8 | (b & 28) >> 2 << 16;
          result[i] = color;
        }
      }
    }
    return result;
  }
  function generateSNESDirectColor() {
    let result = new Uint32Array(1 << 4 + 4 + 3);
    let i = 0;
    for (let r = 0; r < 1 << 4; ++r) {
      for (let g = 0; g < 1 << 4; ++g) {
        for (let b = 0; b < 1 << 3; ++b, ++i) {
          let color = r << 4 | g << 4 + 8 | b << 5 + 16;
          result[i] = color;
        }
      }
    }
    return result;
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
      conv: "Msx_Canvas",
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
      paletteChoices: { colorsRange: { min: 0, max: 7 } },
      // aux is used to signal the special mode
      customize: { flipPalette: true },
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
      paletteChoices: { colorsRange: { min: 8, max: 15 } },
      // aux is used to signal the special mode
      customize: { flipPalette: true },
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
      id: "nes.1bpp",
      name: "NES (1bpp) (8x8) (32x32) Planar",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 2, msbToLsb: false },
      // bit plane colors are stored LSB to MSB
      cell: { w: 8, h: 8, msbToLsb: true },
      // cell pixels are stored MSB to LSB
      paletteChoices: {
        backgroundRange: { min: 0, max: 1 },
        auxRange: { min: 0, max: 1 },
        borderRange: { min: 0, max: 1 },
        colorsRange: { min: 0, max: 1 }
      },
      reduce: 2,
      customize: { outputTileset: false, outputPalette: true },
      toNative: "exportSNES"
    },
    {
      id: "nes.2bpp",
      name: "NES (2bpp) (8x8) (32x32) Planar",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 4, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 3 },
        auxRange: { min: 0, max: 3 },
        borderRange: { min: 0, max: 3 },
        colorsRange: { min: 0, max: 3 }
      },
      reduce: 4,
      customize: { outputTileset: false, outputPalette: true },
      toNative: "exportSNES"
    },
    {
      id: "snes.2bpp",
      name: "SNES (+Gameboy/GBC) (2bpp) (8x8) (32x32) Planar",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 4, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 3 },
        auxRange: { min: 0, max: 3 },
        borderRange: { min: 0, max: 3 },
        colorsRange: { min: 0, max: 3 }
      },
      customize: { outputTileset: false, outputPalette: false, planeToMemory: "interleaved" },
      reduce: 4,
      toNative: "exportSNES"
    },
    {
      id: "snes.3bpp",
      name: "SNES (3bpp) (8x8) (32x32) Planar",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 8, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 7 },
        auxRange: { min: 0, max: 7 },
        borderRange: { min: 0, max: 7 },
        colorsRange: { min: 0, max: 7 }
      },
      reduce: 8,
      customize: { planeToMemory: "interleaved" },
      toNative: "exportSNES"
    },
    {
      id: "snes.4bpp",
      name: "SNES (4bpp) (8x8) (32x32) Planar",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 16, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 15 },
        auxRange: { min: 0, max: 15 },
        borderRange: { min: 0, max: 15 },
        colorsRange: { min: 0, max: 15 }
      },
      customize: { planeToMemory: "interleaved" },
      reduce: 16,
      toNative: "exportSNES"
    },
    {
      id: "snes.8bpp",
      name: "SNES (8bpp) (8x8) (32x32) Planar",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 256, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 255 },
        auxRange: { min: 0, max: 255 },
        borderRange: { min: 0, max: 255 },
        colorsRange: { min: 0, max: 255 }
      },
      customize: { planeToMemory: "interleaved" },
      reduce: 256,
      toNative: "exportSNES"
    },
    {
      id: "snes.mode7",
      name: "SNES (Mode 7) (8bpp) (8x8) (32x32)",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 256, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 255 },
        auxRange: { min: 0, max: 255 },
        borderRange: { min: 0, max: 255 },
        colorsRange: { min: 0, max: 255 }
      },
      customize: { bitsInPlane: 8, planes: 1 },
      reduce: 256,
      toNative: "exportSNES"
    },
    {
      id: "neo.geopocket",
      name: "NEO Geo Pocket Color (2pp) (8x8) (32x32)",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 256, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 255 },
        auxRange: { min: 0, max: 255 },
        borderRange: { min: 0, max: 255 },
        colorsRange: { min: 0, max: 255 }
      },
      customize: { outputTileset: false, outputPalette: false, bitsInPlane: 2, planes: 1, planeLittleEndian: false },
      reduce: 256,
      toNative: "exportSNES"
    },
    {
      id: "virtualboy",
      name: "Virtual Boy (2pp) (8x8) (32x32)",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 4, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 3 },
        auxRange: { min: 0, max: 3 },
        borderRange: { min: 0, max: 3 },
        colorsRange: { min: 0, max: 3 }
      },
      customize: { outputTileset: false, outputPalette: false, bitsInPlane: 2, planes: 1, planeLittleEndian: true },
      reduce: 4,
      toNative: "exportSNES"
    },
    {
      id: "gg.4pp",
      name: "Game Gear (+Sega Master Systems/Wonder Color) (4bpp) (8x8) (32x32) Linear",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 16, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 15 },
        auxRange: { min: 0, max: 15 },
        borderRange: { min: 0, max: 15 },
        colorsRange: { min: 0, max: 15 }
      },
      customize: { outputTileset: false, outputPalette: false, planeToMemory: "linear" },
      reduce: 16,
      toNative: "exportSNES"
    },
    {
      id: "genesis",
      name: "Genesis/x68k (4pp) (8x8) (32x32)",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas",
      pal: SNES_B5G5R5_RGB,
      block: { w: 8, h: 8, colors: 16, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 15 },
        auxRange: { min: 0, max: 15 },
        borderRange: { min: 0, max: 15 },
        colorsRange: { min: 0, max: 15 }
      },
      customize: { outputTileset: false, outputPalette: false, bitsInPlane: 4, planes: 1, planeLittleEndian: true },
      reduce: 16,
      toNative: "exportSNES"
    },
    {
      id: "snes.8bpp.direct",
      name: "SNES (8bpp) (8x8) (32x32) Direct Color",
      width: 32 * 8,
      height: 32 * 8,
      scaleX: 1,
      conv: "SNES_Canvas_Direct",
      pal: SNES_BBPGGGPRRRP,
      block: { w: 8, h: 8, colors: 2048, msbToLsb: false },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: {
        backgroundRange: { min: 0, max: 2047 },
        auxRange: { min: 0, max: 2047 },
        borderRange: { min: 0, max: 2047 },
        colorsRange: { min: 0, max: 2047 }
      },
      customize: { outputTileset: true, outputPalette: false, transformColor: "bbgggrrr", planes: 8 },
      toNative: "exportSNES"
    },
    {
      id: "stic",
      name: "Intellivision STIC (GRAM/GROM) (FGBG)",
      width: 8 * 8,
      // actual is 20x12 but the gram only allows for 64 gram cards
      height: 8 * 8,
      conv: "Stic_Fgbg_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      paletteChoices: { backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 7 } },
      toNative: "exportSticFgbg"
    },
    {
      id: "stic.stack.grom",
      name: "Intellivision STIC (GROM only) (Color Stack Mode)",
      width: 20 * 8,
      height: 12 * 8,
      conv: "Stic_ColorStack_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      cb: { w: 8, h: 8, xb: 0, yb: 0 },
      // important to leave xb/yb as 0 (so no color bleeding happens in scoring of stack colors)
      param: { extra: 4 },
      paletteChoices: { colors: 1, backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 7 } },
      toNative: "exportSticColorStack"
    },
    {
      id: "stic.stack.gram",
      name: "Intellivision STIC (GRAM only) (Color Stack Mode)",
      width: 8 * 8,
      // actual is 20x12 but the gram only allows for 64 gram cards
      height: 8 * 8,
      conv: "Stic_ColorStack_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      cb: { w: 8, h: 8 },
      param: { extra: 4 },
      paletteChoices: { colors: 1, backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 15 } },
      toNative: "exportSticColorStack"
    },
    {
      id: "stic.stack.gromram",
      name: "Intellivision STIC (GROM+GRAM) (Color Stack Mode)",
      width: 20 * 8,
      height: 12 * 8,
      conv: "Stic_ColorStack_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true, xb: 0, yb: 0 },
      // important that xb/yb are 0 (so no color bleeding happens in scoring)
      cb: { w: 8, h: 8 },
      // the cell params will carry the array of which cells will use the gram (instead of the grom)
      param: { cell: true, extra: 4 },
      paletteChoices: { colors: 1, backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 7 } },
      toNative: "exportSticColorStack"
    },
    {
      id: "stic.stack.grom.single",
      name: "Intellivision STIC (GROM only) (Single BG Color Stack)",
      width: 20 * 8,
      height: 12 * 8,
      conv: "Stic_ColorStack_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      cb: { w: 8, h: 8, xb: 0, yb: 0 },
      // important to leave xb/yb as 0 (so no color bleeding happens in scoring of stack colors)
      param: { extra: 4 },
      paletteChoices: { colors: 1, backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 7 } },
      customize: { singleColor: true },
      toNative: "exportSticColorStack"
    },
    {
      id: "stic.stack.gram.single",
      name: "Intellivision STIC (GRAM only) (Single BG Color Stack)",
      width: 8 * 8,
      // actual is 20x12 but the gram only allows for 64 gram cards
      height: 8 * 8,
      conv: "Stic_ColorStack_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true },
      cb: { w: 8, h: 8 },
      param: { extra: 4 },
      paletteChoices: { colors: 1, backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 15 } },
      customize: { singleColor: true },
      toNative: "exportSticColorStack"
    },
    {
      id: "stic.stack.gromram.single",
      name: "Intellivision STIC (GROM+GRAM) (Single BG Color Stack)",
      width: 20 * 8,
      height: 12 * 8,
      conv: "Stic_ColorStack_Canvas",
      pal: INTELLIVISION_STIC_RGB,
      block: { w: 8, h: 8, colors: 2 },
      cell: { w: 8, h: 8, msbToLsb: true, xb: 0, yb: 0 },
      // important that xb/yb are 0 (so no color bleeding happens in scoring)
      cb: { w: 8, h: 8 },
      // the cell params will carry the array of which cells will use the gram (instead of the grom)
      param: { cell: true, extra: 4 },
      paletteChoices: { colors: 1, backgroundRange: { min: 0, max: 15 }, colorsRange: { min: 0, max: 7 } },
      customize: { singleColor: true },
      toNative: "exportSticColorStack"
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
    },
    {
      id: "phememo-d30.landscape",
      name: "Phomemo D30 (landscape)",
      width: 288,
      height: 88,
      conv: "DitheringCanvas",
      pal: MONO_RGB
    },
    {
      id: "phememo-d30.portrait",
      name: "Phomemo D30 (portrait)",
      width: 88,
      height: 288,
      conv: "DitheringCanvas",
      pal: MONO_RGB
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
    Msx_Canvas: () => Msx_Canvas,
    NES_Canvas: () => NES_Canvas,
    SNES_Canvas: () => SNES_Canvas,
    SNES_Canvas_Direct: () => SNES_Canvas_Direct,
    Stic_ColorStack_Canvas: () => Stic_ColorStack_Canvas,
    Stic_Fgbg_Canvas: () => Stic_Fgbg_Canvas,
    Teletext_Canvas: () => Teletext_Canvas,
    VCSColorPlayfield_Canvas: () => VCSColorPlayfield_Canvas,
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
      this.indexed = new Uint32Array(this.ref.length);
      this.changes = 0;
      this.reset();
    }
    content() {
      return { params: this.params };
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
      if (this.indexed[offset] != palidx) {
        let shouldChange = errmag >= this.errorThreshold;
        if (!shouldChange) {
          let existingValue = this.indexed[offset];
          shouldChange = valid.find((x) => existingValue === x) === void 0;
        }
        if (shouldChange) {
          this.indexed[offset] = palidx;
          this.changes++;
        }
      }
      this.img[offset] = rgbimg;
    }
    getClosest(rgb, inds) {
      return getClosestRGB(rgb, inds, this.pal, this.errfn);
    }
    iterate() {
      this.changes = 0;
      this.commit();
      for (var i = 0; i < this.img.length; i++) {
        this.update(i);
      }
      this.iterateCount++;
    }
    commit() {
    }
    getValidColors(imageIndex) {
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
    content() {
      return {
        params: this.params
      };
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
    getValidColors(imageIndex) {
      var col = Math.floor(imageIndex / this.w) % this.ncols;
      var row = Math.floor(imageIndex / (this.width * this.h));
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
    getValidColors(imageIndex) {
      return [this.bgColor, super.getValidColors(imageIndex)[0]];
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
  var BlockParamDitherCanvas = class extends BaseDitheringCanvas {
    constructor() {
      super(...arguments);
      this.blockParams = new Uint32Array(0);
      this.cbParams = new Uint32Array(0);
      this.cellParams = new Uint32Array(0);
      this.extraParams = new Uint32Array(0);
      this.fliMode = false;
      this.fullPaletteMode = false;
      this.paletteBits = Math.ceil(Math.log2(this.pal.length));
      this.paletteBitFilter = (1 << this.paletteBits) - 1;
      // values chosen base on image
      this.backgroundColor = 0;
      this.auxColor = 0;
      this.borderColor = 0;
    }
    content() {
      return {
        width: this.width,
        height: this.height,
        block: this.block,
        cb: this.cb,
        cell: this.cell,
        fullPaletteMode: this.fullPaletteMode,
        fliMode: this.fliMode,
        paramInfo: this.paramInfo,
        bitsPerColor: this.bitsPerColor,
        pixelsPerByte: this.pixelsPerByte,
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
        auxColor: this.auxColor,
        paletteChoices: this.paletteChoices,
        paletteBits: this.paletteBits,
        paletteBitFilter: this.paletteBitFilter,
        blockParams: this.blockParams,
        cbParams: this.cbParams,
        cellParams: this.cellParams,
        extraParams: this.extraParams
      };
    }
    // functions that are designed to be overridden
    init() {
      super.init();
    }
    commit() {
      super.commit();
    }
    getValidColors(imageIndex) {
      return super.getValidColors(imageIndex);
    }
  };
  function extractColorsFromParam(param, totalToExtract, paletteBitFilter, paletteBits) {
    if (0 == totalToExtract)
      return [];
    let value = param;
    let result = [];
    while (totalToExtract > 0) {
      result.push(value & paletteBitFilter);
      value >>= paletteBits;
      --totalToExtract;
    }
    return result;
  }
  function extractColorsFromParams(offset, params, totalToExtract, paletteBitFilter, paletteBits) {
    if (0 == totalToExtract)
      return [];
    runtime_assert(offset < params.length);
    return extractColorsFromParam(params[offset], totalToExtract, paletteBitFilter, paletteBits);
  }
  var CommonBlockParamDitherCanvas = class extends BlockParamDitherCanvas {
    constructor() {
      super(...arguments);
      // colors legal for block colors (excluding any selectable background, border, aux colors)
      this.globalValid = [];
      // an array of selectable global colors
      this.foundColorsByUsage = [];
      // which colors best represent the entire image
      this.foundColorsByColorIntensity = [];
      // which colors are most compatible ranked by intensity
      this.histogramScoreCurrent = 100;
      this.histogram = new Uint32Array(this.pal.length);
      // temporary scratch histogram buffer
      this.scores = new Uint32Array(this.pal.length);
      // temporary scratch scores buffer
      this.firstCommit = false;
    }
    init() {
      this.prepare();
    }
    prepare() {
      super.init();
      this.prepareDefaults();
      this.prepareGlobalColorChoices();
      this.allocateParams();
      let bestPrefill = () => {
        if (this.pixelPaletteChoices.length > 0)
          return this.pixelPaletteChoices[0];
        if (this.allColors.length > 0)
          return this.allColors[0];
        return this.backgroundColor;
      };
      this.indexed.fill(bestPrefill());
    }
    prepareDefaults() {
      this.block = {
        w: this.sys.block === void 0 ? this.sys.cell === void 0 ? this.sys.cb.w : this.sys.cell.w : this.sys.block.w,
        h: this.sys.block === void 0 ? this.sys.cell === void 0 ? this.sys.cb.h : this.sys.cell.h : this.sys.block.h,
        colors: this.sys.block === void 0 ? 2 : this.sys.block.colors,
        xb: this.sys.block === void 0 ? this.sys.cb === void 0 ? 0 : this.sys.cb.xb === void 0 ? 0 : this.sys.cb.xb : this.sys.block.xb === void 0 ? 0 : this.sys.block.xb,
        yb: this.sys.block === void 0 ? this.sys.cb === void 0 ? 0 : this.sys.cb.yb === void 0 ? 0 : this.sys.cb.yb : this.sys.block.yb === void 0 ? 0 : this.sys.block.yb,
        columns: 0,
        rows: 0,
        size: 0,
        msbToLsb: this.sys.block === void 0 ? true : this.sys.block.msbToLsb === void 0 ? true : this.sys.block.msbToLsb
      };
      this.block.columns = Math.ceil(this.width / this.block.w);
      this.block.rows = Math.ceil(this.height / this.block.h);
      this.block.size = this.block.columns * this.block.rows;
      this.cb = {
        w: this.sys.cb === void 0 ? this.block.w : this.sys.cb.w,
        h: this.sys.cb === void 0 ? this.block.h : this.sys.cb.h,
        xb: this.sys.cb === void 0 ? this.block.xb : this.sys.cb.xb === void 0 ? this.block.xb : this.sys.cb.xb,
        yb: this.sys.cb === void 0 ? this.block.yb : this.sys.cb.yb === void 0 ? this.block.yb : this.sys.cb.yb,
        columns: 0,
        rows: 0,
        size: 0,
        msbToLsb: this.sys.cb === void 0 ? true : this.sys.cb.msbToLsb === void 0 ? true : this.sys.cb.msbToLsb
      };
      this.cb.columns = Math.ceil(this.width / this.cb.w);
      this.cb.rows = Math.ceil(this.height / this.cb.h);
      this.cb.size = this.cb.columns * this.cb.rows;
      this.cell = {
        w: this.sys.cell === void 0 ? this.cb.w : this.sys.cell.w,
        h: this.sys.cell === void 0 ? this.cb.h : this.sys.cell.h,
        xb: this.sys.cell === void 0 ? this.block.xb : this.sys.cell.xb === void 0 ? this.block.xb : this.sys.cell.xb,
        yb: this.sys.cell === void 0 ? this.block.yb : this.sys.cell.yb === void 0 ? this.block.yb : this.sys.cell.yb,
        columns: 0,
        rows: 0,
        size: 0,
        msbToLsb: this.sys.cell === void 0 ? true : this.sys.cell.msbToLsb
      };
      this.cell.columns = Math.ceil(this.width / this.cell.w);
      this.cell.rows = Math.ceil(this.height / this.cell.h);
      this.cell.size = this.cell.rows * this.cell.columns;
      this.fliMode = this.sys.fli !== void 0;
      this.paramInfo = {
        block: this.sys.param === void 0 ? this.sys.block !== void 0 : this.sys.param.block === void 0 ? this.sys.block !== void 0 : this.sys.param.block,
        cb: this.sys.param === void 0 ? this.sys.cb !== void 0 : this.sys.param.cb === void 0 ? this.sys.cb !== void 0 : this.sys.param.cb,
        cell: this.sys.param === void 0 ? false : this.sys.param.cell === void 0 ? false : this.sys.param.cell,
        extra: this.sys.param === void 0 ? 0 : this.sys.param.extra
      };
      this.bitsPerColor = Math.ceil(Math.log2(this.block.colors));
      this.pixelsPerByte = Math.floor(8 / this.bitsPerColor);
      runtime_assert(this.paletteBits > 0);
      this.preparePaletteChoices(this.sys.paletteChoices);
      this.fullPaletteMode = this.paletteChoices.colors >= this.pal.length;
      this.firstCommit = this.paletteChoices.prefillReference;
    }
    spliceColor(color, colors) {
      let found = colors.findIndex((x) => x == color);
      if (found < 0)
        return colors;
      return [...colors.slice(0, found), ...colors.slice(found + 1)];
    }
    preparePixelPaletteChoices() {
      let count = this.paletteChoices.colorsRange.max - this.paletteChoices.colorsRange.min + 1;
      this.pixelPaletteChoices = range(this.paletteChoices.colorsRange.min, this.paletteChoices.colorsRange.max + 1);
      this.allColors = range(0, this.pal.length);
      this.backgroundColors = range(this.paletteChoices.backgroundRange.min, this.paletteChoices.backgroundRange.max + 1);
      this.auxColors = range(this.paletteChoices.auxRange.min, this.paletteChoices.auxRange.max + 1);
      this.borderColors = range(this.paletteChoices.borderRange.min, this.paletteChoices.borderRange.max + 1);
      this.blockColors = range(this.paletteChoices.colorsRange.min, this.paletteChoices.colorsRange.max + 1);
    }
    preparePaletteChoices(options) {
      runtime_assert(this.pal.length > 0);
      if (options === void 0) {
        this.paletteChoices = {
          prefillReference: false,
          background: false,
          aux: false,
          border: false,
          backgroundRange: { min: 0, max: this.pal.length - 1 },
          auxRange: { min: 0, max: this.pal.length - 1 },
          borderRange: { min: 0, max: this.pal.length - 1 },
          colors: this.block.colors,
          colorsRange: { min: 0, max: this.pal.length - 1 }
        };
        this.preparePixelPaletteChoices();
        return;
      }
      this.paletteChoices = {
        prefillReference: options.prefillReference === void 0 ? false : options.prefillReference,
        background: options.background === void 0 ? false : options.background,
        aux: options.aux === void 0 ? false : options.aux,
        border: options.aux === void 0 ? false : options.border,
        backgroundRange: options.backgroundRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.backgroundRange,
        auxRange: options.auxRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.auxRange,
        borderRange: options.borderRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.borderRange,
        colors: this.block.colors,
        colorsRange: options.colorsRange === void 0 ? { min: 0, max: this.pal.length - 1 } : options.colorsRange
      };
      this.paletteChoices.colors = options.colors === void 0 ? this.block.colors - (this.paletteChoices.background ? 1 : 0) - (this.paletteChoices.aux ? 1 : 0) - (this.paletteChoices.border ? 1 : 0) : options.colors;
      this.preparePixelPaletteChoices();
      runtime_assert(this.pal.length > this.paletteChoices.backgroundRange.max - this.paletteChoices.backgroundRange.min);
      runtime_assert(this.pal.length > this.paletteChoices.auxRange.max - this.paletteChoices.auxRange.min);
      runtime_assert(this.pal.length > this.paletteChoices.borderRange.max - this.paletteChoices.borderRange.min);
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
      this.foundColorsByUsage = histoRankedChoices.slice(0, histoRankedChoices.length);
      this.foundColorsByColorIntensity = choices.slice(0, choices.length);
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
            this.backgroundColor = index;
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
          runtime_assert(found >= 0);
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
            runtime_assert(priority >= 0);
            topNChoices.push({ priority, choice: topChoice });
            choices.splice(priority, 1);
          }
          topNChoices.sort((a, b) => a.priority - b.priority);
          choices = topNChoices.map((x) => x.choice).concat(choices);
          firstNonSelectableColorFound = true;
        }
        findBestChoice(option.selectable ? histoRankedChoices : choices, option.selectable ? choices : histoRankedChoices, option);
      }
      if (this.paletteChoices.background)
        this.globalValid.push(this.backgroundColor);
      if (this.paletteChoices.aux)
        this.globalValid.push(this.auxColor);
      if (this.paletteChoices.border)
        this.globalValid.push(this.borderColor);
      if (this.paletteChoices.background)
        this.pixelPaletteChoices = this.spliceColor(this.backgroundColor, this.pixelPaletteChoices);
      if (this.paletteChoices.aux)
        this.pixelPaletteChoices = this.spliceColor(this.auxColor, this.pixelPaletteChoices);
      if (this.paletteChoices.border)
        this.pixelPaletteChoices = this.spliceColor(this.borderColor, this.pixelPaletteChoices);
    }
    allocateParams() {
      this.blockParams = new Uint32Array(this.paramInfo.block ? this.block.size : 0);
      this.cbParams = new Uint32Array(this.paramInfo.cb ? this.cb.size : 0);
      this.cellParams = new Uint32Array(this.paramInfo.cell ? this.cell.size : 0);
      this.extraParams = new Uint32Array(this.paramInfo.extra);
      this.params = this.blockParams;
    }
    imageIndexToInfo(index, info) {
      let column = Math.floor(index / info.w) % info.columns;
      let row = Math.floor(index / (this.width * info.h));
      return { column, row };
    }
    imageIndexToBlockInfo(index) {
      return this.imageIndexToInfo(index, this.block);
    }
    imageIndexToCbInfo(index) {
      return this.imageIndexToInfo(index, this.cb);
    }
    imageIndexToCellInfo(index) {
      return this.imageIndexToInfo(index, this.cell);
    }
    imageIndexToOffset(index, info) {
      let { column, row } = this.imageIndexToInfo(index, info);
      let offset = row * info.columns + column;
      return offset;
    }
    imageIndexToBlockOffset(index) {
      return this.imageIndexToOffset(index, this.block);
    }
    imageIndexToCbOffset(index) {
      return this.imageIndexToOffset(index, this.cb);
    }
    imageIndexToCellOffset(index) {
      return this.imageIndexToOffset(index, this.cell);
    }
    imageIndexToXY(index) {
      return { x: index % this.width, y: Math.floor(index / this.width) };
    }
    xyToImageIndex(x, y) {
      if (x < 0 || y < 0)
        return void 0;
      if (x >= this.width || y >= this.height)
        return void 0;
      return y * this.width + x;
    }
    offsetToInfo(offset, info) {
      let column = offset % info.columns;
      let row = Math.floor(offset / info.columns);
      return { column, row };
    }
    offsetToBlockInfo(offset) {
      return this.offsetToInfo(offset, this.block);
    }
    offsetToCbInfo(offset) {
      return this.offsetToInfo(offset, this.cb);
    }
    offsetToCellInfo(offset) {
      return this.offsetToInfo(offset, this.cell);
    }
    offsetToImageIndex(offset, info) {
      let { column, row } = this.offsetToInfo(offset, info);
      let index = row * this.width * info.h + column * info.w;
      return index;
    }
    blockOffsetToImageIndex(offset) {
      return this.offsetToImageIndex(offset, this.block);
    }
    cbOffsetToImageIndex(offset) {
      return this.offsetToImageIndex(offset, this.cb);
    }
    cellOffsetToImageIndex(offset) {
      return this.offsetToImageIndex(offset, this.cell);
    }
    currentColorAtXY(x, y, orColor) {
      let imageIndex = this.xyToImageIndex(x, y);
      return imageIndex === void 0 ? orColor : this.indexed[imageIndex];
    }
    addToHistogramFromCurrentColor(color, histogram) {
      runtime_assert(color < histogram.length);
      histogram[color] += this.histogramScoreCurrent;
    }
    addToHistogramAtXYFromCurrentColor(x, y, color, histogram) {
      if (color === void 0)
        return;
      this.addToHistogramFromCurrentColor(color, histogram);
    }
    addToHistogramAtOffsetFromCurrentColor(offset, info, histogram, colors, orColor, fnAddToHistogram) {
      let imageIndex = this.offsetToImageIndex(offset, info);
      let start = this.imageIndexToXY(imageIndex);
      for (let y = start.y - info.yb; y < start.y + info.h + info.yb; ++y) {
        for (let x = start.x - info.xb; x < start.x + info.w + info.xb; ++x) {
          let color = this.currentColorAtXY(x, y, orColor);
          if (colors !== void 0) {
            if (colors.find((x2) => x2 == color) === void 0)
              continue;
          }
          if (fnAddToHistogram === void 0)
            this.addToHistogramAtXYFromCurrentColor(x, y, color, histogram);
          else
            fnAddToHistogram(x, y, color, histogram);
        }
      }
    }
    addToBlockHistogramFromCurrentColor(offset, histogram, colors, orColor, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFromCurrentColor(offset, this.block, histogram, colors, orColor, fnAddToHistogram);
    }
    addToCbHistogramFromCurrentColor(offset, histogram, colors, orColor, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFromCurrentColor(offset, this.cb, histogram, colors, orColor, fnAddToHistogram);
    }
    addToCellHistogramFromCurrentColor(offset, histogram, colors, orColor, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFromCurrentColor(offset, this.cell, histogram, colors, orColor, fnAddToHistogram);
    }
    scoreColorAtXYFrom(x, y, scores, colors, from) {
      let imageIndex = this.xyToImageIndex(x, y);
      if (imageIndex === void 0)
        return void 0;
      let rgb = from[imageIndex];
      let colorToPalIndex = (i) => {
        return colors === void 0 ? i : colors[i];
      };
      let closestColor = NaN;
      let closestScore = NaN;
      for (let i = 0; i < (colors === void 0 ? scores.length : colors.length); ++i) {
        let rgbPalette = this.pal[colorToPalIndex(i)];
        let score = this.errfn(rgb, rgbPalette);
        runtime_assert(colorToPalIndex(i) < scores.length);
        scores[colorToPalIndex(i)] += score;
        if (score < closestScore || Number.isNaN(closestScore)) {
          closestScore = score;
          closestColor = colorToPalIndex(i);
        }
      }
      return Number.isNaN(closestColor) ? void 0 : { closestColor, closestScore };
    }
    scoreColorAtXYFromAlt(x, y, scores, colors) {
      return this.scoreColorAtXYFrom(x, y, scores, colors, this.alt);
    }
    scoreColorAtXYFromRef(x, y, scores, colors) {
      return this.scoreColorAtXYFrom(x, y, scores, colors, this.ref);
    }
    mergeHistogram(dest, source1, source2, colors) {
      runtime_assert(source1.length == source2.length);
      runtime_assert(dest.length == source1.length);
      if (colors === void 0) {
        for (let i = 0; i < dest.length; ++i) {
          dest[i] = source1[i] + source2[i];
        }
        return;
      }
      for (let i = 0; i < colors.length; ++i) {
        dest[colors[i]] = source1[colors[i]] + source2[colors[i]];
      }
    }
    addToHistogramFromClosest(closest, histogram) {
      histogram[closest.closestColor] += 1 + this.noise;
    }
    addToHistogramFromClosestAtXY(x, y, closest, histogram) {
      if (closest === void 0)
        return;
      return this.addToHistogramFromClosest(closest, histogram);
    }
    addToHistogramAtOffsetFrom(offset, info, histogram, scores, colors, from, fnAddToHistogram) {
      let total = 0;
      let imageIndex = this.offsetToImageIndex(offset, info);
      let start = this.imageIndexToXY(imageIndex);
      for (let y = start.y - info.yb; y < start.y + info.h + info.yb; ++y) {
        for (let x = start.x - info.xb; x < start.x + info.w + info.xb; ++x) {
          let closest = this.scoreColorAtXYFrom(x, y, scores, colors, from);
          if (fnAddToHistogram === void 0)
            this.addToHistogramFromClosestAtXY(x, y, closest, histogram);
          else
            fnAddToHistogram(x, y, closest, histogram);
        }
      }
      let scored = colors === void 0 ? range(0, scores.length).map((x) => {
        return { ind: x, score: scores[x], count: histogram[x] };
      }) : colors.map((x) => {
        return { ind: x, score: scores[x], count: histogram[x] };
      });
      return scored;
    }
    addToBlockHistogramFrom(offset, histogram, scores, colors, from, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.block, histogram, scores, colors, from, fnAddToHistogram);
    }
    addToCbHistogramFrom(offset, histogram, scores, colors, from, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.cb, histogram, scores, colors, from, fnAddToHistogram);
    }
    addToCellHistogramFrom(offset, histogram, scores, colors, from, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.cell, histogram, scores, colors, from, fnAddToHistogram);
    }
    addToBlockHistogramFromAlt(offset, histogram, scores, colors, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.block, histogram, scores, colors, this.alt, fnAddToHistogram);
    }
    addToCbHistogramFromAlt(offset, histogram, scores, colors, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.cb, histogram, scores, colors, this.alt, fnAddToHistogram);
    }
    addToCellHistogramFromAlt(offset, histogram, scores, colors, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.cell, histogram, scores, colors, this.alt, fnAddToHistogram);
    }
    addToBlockHistogramFromRef(offset, histogram, scores, colors, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.block, histogram, scores, colors, this.ref, fnAddToHistogram);
    }
    addToCbHistogramFromRef(offset, histogram, scores, colors, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.cb, histogram, scores, colors, this.ref, fnAddToHistogram);
    }
    addToCellHistogramFromRef(offset, histogram, scores, colors, fnAddToHistogram) {
      return this.addToHistogramAtOffsetFrom(offset, this.cell, histogram, scores, colors, this.ref, fnAddToHistogram);
    }
    getScoredChoicesByCount(scored) {
      let result = scored.filter((x) => x.count > 0);
      result.sort((a, b) => b.count - a.count);
      return result;
    }
    getScoredChoicesByScore(scored) {
      let result = scored.filter((x) => x.count > 0);
      result.sort((a, b) => a.score - b.score);
      return result;
    }
    updateColorParam(offset, params, colorChoices, overrideFilter, overrideBits) {
      runtime_assert(offset < params.length);
      if (colorChoices.length < 1) {
        params[offset] = 0;
        return;
      }
      let value = 0;
      for (let i = colorChoices.length - 1; i >= 0; --i) {
        value <<= overrideBits === void 0 ? this.paletteBits : overrideBits;
        value |= colorChoices[i] & (overrideFilter === void 0 ? this.paletteBitFilter : overrideFilter);
      }
      params[offset] = value;
    }
    updateBlockColorParam(offset, colorChoices, overrideFilter, overrideBits) {
      this.updateColorParam(offset, this.blockParams, colorChoices, overrideFilter, overrideBits);
    }
    updateCbColorParam(offset, colorChoices, overrideFilter, overrideBits) {
      this.updateColorParam(offset, this.cbParams, colorChoices, overrideFilter, overrideBits);
    }
    updateCellColorParam(offset, colorChoices, overrideFilter, overrideBits) {
      this.updateColorParam(offset, this.cellParams, colorChoices, overrideFilter, overrideBits);
    }
    extractColorsFromParams(offset, params, totalToExtract, overrideFilter, overrideBits) {
      return extractColorsFromParams(offset, params, totalToExtract, overrideFilter === void 0 ? this.paletteBitFilter : overrideFilter, overrideBits === void 0 ? this.paletteBits : overrideBits);
    }
    extractColorsFromBlockParams(offset, totalToExtract, overrideFilter, overrideBits) {
      return extractColorsFromParams(offset, this.blockParams, totalToExtract, overrideFilter === void 0 ? this.paletteBitFilter : overrideFilter, overrideBits === void 0 ? this.paletteBits : overrideBits);
    }
    extractColorsFromCbParams(offset, totalToExtract, overrideFilter, overrideBits) {
      return extractColorsFromParams(offset, this.cbParams, totalToExtract, overrideFilter === void 0 ? this.paletteBitFilter : overrideFilter, overrideBits === void 0 ? this.paletteBits : overrideBits);
    }
    extractColorsFromCellParams(offset, totalToExtract, overrideFilter, overrideBits) {
      return extractColorsFromParams(offset, this.cellParams, totalToExtract, overrideFilter === void 0 ? this.paletteBitFilter : overrideFilter, overrideBits === void 0 ? this.paletteBits : overrideBits);
    }
    commit() {
      this.guessExtraParams();
      this.guessCellParams();
      this.guessCbParams();
      this.guessBlockParams();
      this.firstCommit = false;
    }
    getValidColors(imageIndex) {
      let offset = this.imageIndexToBlockOffset(imageIndex);
      if (this.fullPaletteMode)
        return this.pixelPaletteChoices;
      let extracted = this.extractColorsFromBlockParams(offset, this.paletteChoices.colors);
      if (this.globalValid.length == 0 && extracted.length <= this.paletteChoices.colors)
        return extracted;
      let valid = this.globalValid.slice(0, this.globalValid.length);
      valid.push(...extracted);
      valid = valid.slice(0, this.globalValid.length + this.paletteChoices.colors);
      return valid;
    }
    guessBlockParams() {
      for (let i = 0; i < this.blockParams.length; ++i) {
        this.guessBlockParam(i);
      }
    }
    guessCbParams() {
      for (let i = 0; i < this.cbParams.length; ++i) {
        this.guessCbParam(i);
      }
    }
    guessCellParams() {
      for (let i = 0; i < this.cellParams.length; ++i) {
        this.guessCellParam(i);
      }
    }
    guessExtraParams() {
      for (let i = 0; i < this.extraParams.length; ++i) {
        this.guessExtraParam(i);
      }
    }
    guessBlockParam(offset) {
      if (this.fullPaletteMode)
        return;
      this.histogram.fill(0);
      this.scores.fill(0);
      if (!this.firstCommit)
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram, this.pixelPaletteChoices);
      let scored = this.addToBlockHistogramFrom(offset, this.histogram, this.scores, this.pixelPaletteChoices, this.firstCommit ? this.ref : this.alt);
      let choices = this.getScoredChoicesByCount(scored);
      let colors = choices.map((x) => {
        return x.ind;
      }).slice(0, this.block.colors - this.globalValid.length);
      while (colors.length < this.block.colors - this.globalValid.length) {
        colors.push(this.pixelPaletteChoices[0] || this.backgroundColor);
      }
      colors = colors.sort((a, b) => a - b);
      this.updateBlockColorParam(offset, colors);
    }
    guessCbParam(offset) {
    }
    guessCellParam(offset) {
    }
    guessExtraParam(offset) {
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
  var VICII_Canvas = class extends CommonBlockParamDitherCanvas {
    constructor() {
      super(...arguments);
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
    }
    init() {
      super.prepare();
      if (this.fliMode) {
        this.fliBug = this.sys.fli.bug;
        this.blankLeftScreenFliBugArea = this.sys.fli.blankLeft;
        this.blankRightScreenMirrorFliBugArea = this.sys.fli.blankRight;
        this.blankFliBugColumnCount = this.sys.fli.blankColumns;
        if (!this.paletteChoices.background) {
          this.borderColor = this.fliBugChoiceColor;
        }
      }
    }
    getValidColors(imageIndex) {
      let offset = this.imageIndexToBlockOffset(imageIndex);
      let cbOffset = this.imageIndexToCbOffset(imageIndex);
      let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(imageIndex);
      if (blank) {
        if (!this.paletteChoices.background)
          return [this.fliBugChoiceColor];
        return [this.backgroundColor];
      }
      let extracted = this.extractColorsFromBlockParams(offset, this.paramInfo.cb ? 2 : 3);
      if (this.paramInfo.cb) {
        extracted.push(...this.extractColorsFromCbParams(cbOffset, 1));
      }
      if (performBug) {
        extracted[0] = extracted[1] = this.fliBugChoiceColor;
        extracted[2] = this.fliBugCbColor;
      }
      let valid = this.globalValid.slice(0, this.globalValid.length);
      valid.push(...extracted);
      valid = valid.slice(0, this.globalValid.length + this.paletteChoices.colors);
      return valid;
    }
    guessBlockParam(offset) {
      let imageIndex = this.blockOffsetToImageIndex(offset);
      let cbOffset = this.imageIndexToCbOffset(imageIndex);
      let [performBug, blank, leftBlank, rightBlank, bugColumn] = this.isImageIndexInFliBugBlankingArea(imageIndex);
      let cbColor = 0;
      let pixelChoiceColors = this.pixelPaletteChoices;
      if (this.paramInfo.cb) {
        let cbExtracted = this.extractColorsFromCbParams(cbOffset, 1);
        pixelChoiceColors = this.spliceColor(cbExtracted[0], this.pixelPaletteChoices);
      }
      this.histogram.fill(0);
      this.scores.fill(0);
      if (!this.firstCommit)
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram, pixelChoiceColors);
      let scored = this.addToBlockHistogramFrom(offset, this.histogram, this.scores, pixelChoiceColors, this.firstCommit ? this.ref : this.alt);
      if (this.paramInfo.cb) {
        let cbExtracted = this.extractColorsFromCbParams(cbOffset, 1);
        this.histogram[cbExtracted[0]] = 0;
        cbColor = cbExtracted[0];
      }
      let choices = this.getScoredChoicesByCount(scored);
      let ind1 = choices[0] && choices[0].ind;
      let ind2 = choices[1] && choices[1].ind;
      let ind3 = choices[2] && choices[2].ind;
      if (ind1 === void 0)
        ind1 = this.backgroundColor;
      if (ind2 === void 0)
        ind2 = this.backgroundColor;
      if (ind3 === void 0)
        ind3 = this.backgroundColor;
      if (!this.paramInfo.cb) {
        cbColor = ind3;
      }
      if (leftBlank) {
        cbColor = ind1 = ind2 = ind3 = this.backgroundColor;
        if (!this.paletteChoices.background)
          ind1 = ind2 = this.fliBugChoiceColor;
      } else if (rightBlank) {
        cbColor = ind1 = ind2 = ind3 = this.backgroundColor;
        if (!this.paletteChoices.background)
          ind1 = ind2 = this.fliBugChoiceColor;
      }
      if (performBug) {
        ind1 = ind2 = this.fliBugChoiceColor;
        cbColor = this.fliBugCbColor;
      }
      let subsetChoices = [ind1, ind2];
      subsetChoices = subsetChoices.splice(0, this.paletteChoices.colors);
      let sorted = [...subsetChoices.sort((a, b) => a - b), cbColor];
      this.updateBlockColorParam(offset, sorted);
    }
    guessCbParam(offset) {
      if (!this.paramInfo.cb || this.iterateCount > MAX_ITERATE_COUNT / 2)
        return;
      let imageIndex = this.cbOffsetToImageIndex(offset);
      let [performBug, blank, leftBlank, rightBlank, bugCol] = this.isImageIndexInFliBugBlankingArea(imageIndex);
      this.histogram.fill(0);
      this.scores.fill(0);
      if (!this.firstCommit)
        this.addToCbHistogramFromCurrentColor(offset, this.histogram, this.pixelPaletteChoices);
      let scored = this.addToCbHistogramFrom(offset, this.histogram, this.scores, this.pixelPaletteChoices, this.firstCommit ? this.ref : this.alt);
      let choices = this.getScoredChoicesByCount(scored);
      let cbColor = choices[0] && choices[0].ind;
      if (leftBlank) {
        cbColor = this.backgroundColor;
        if (!this.paletteChoices.background)
          cbColor = this.fliBugCbColor;
      } else if (rightBlank) {
        cbColor = this.backgroundColor;
        if (!this.paletteChoices.background)
          cbColor = this.fliBugCbColor;
      }
      if (performBug) {
        if (!this.paletteChoices.background)
          cbColor = this.fliBugChoiceColor;
      }
      this.updateCbColorParam(offset, [cbColor]);
    }
    isImageIndexInFliBugBlankingArea(index) {
      let { column } = this.imageIndexToBlockInfo(index);
      let bugLogic = this.fliBug && (column >= 0 && column < this.blankFliBugColumnCount) && !this.blankLeftScreenFliBugArea;
      let leftBlank = this.blankLeftScreenFliBugArea && (column >= 0 && column < this.blankFliBugColumnCount);
      let rightBlank = this.blankLeftScreenFliBugArea && this.blankRightScreenMirrorFliBugArea && (column >= this.block.columns - this.blankFliBugColumnCount && column < this.block.columns);
      let blank = leftBlank || rightBlank;
      return [bugLogic, blank, leftBlank, rightBlank, column];
    }
  };
  var ZXSpectrum_Canvas = class extends CommonBlockParamDitherCanvas {
    constructor() {
      super(...arguments);
      this.histogram = new Uint32Array(this.pal.length);
      // temporary scratch histogram buffer
      this.scores = new Uint32Array(this.pal.length);
    }
    // temporary scratch scores buffer
    init() {
      super.prepare();
      this.darkColors = range(0, Math.floor(this.pal.length / 2));
      this.brightColors = range(Math.floor(this.pal.length / 2), this.pal.length);
      this.paletteRange = this.paletteChoices.colorsRange;
      this.flipPalette = this.sys.customize === void 0 ? false : this.sys.customize.flipPalette;
    }
    guessBlockParam(offset) {
      let calculateHistogramForCell = (colors, min, max) => {
        let addToCurrent = (x, y, color, histogram) => {
          if (color === void 0)
            return;
          if (color < min || color > max)
            this.addToHistogramFromCurrentColor(color ^ 8, histogram);
          else
            this.addToHistogramFromCurrentColor(color, histogram);
        };
        this.histogram.fill(0);
        this.scores.fill(0);
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram, this.allColors, void 0, addToCurrent);
        let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, colors);
        let choices = this.getScoredChoicesByCount(scored);
        return choices;
      };
      let choices1 = calculateHistogramForCell(this.darkColors, this.darkColors[0], this.darkColors[this.darkColors.length - 1]).slice(0, 2);
      let choices2 = calculateHistogramForCell(this.brightColors, this.brightColors[0], this.brightColors[this.brightColors.length - 1]).slice(0, 2);
      if (choices1.length < 2)
        choices1.push(choices1[0]);
      if (choices2.length < 2)
        choices2.push(choices2[0]);
      runtime_assert(choices1.length >= 2);
      runtime_assert(choices2.length >= 2);
      let score1 = 0;
      let score2 = 0;
      choices1.forEach((x) => {
        score1 += x.score;
      });
      choices2.forEach((x) => {
        score2 += x.score;
      });
      let result = score2 < score1 ? choices2 : choices1;
      if (result[0].ind < this.paletteRange.min || result[0].ind > this.paletteRange.max) {
        result = score2 < score1 ? choices1 : choices2;
      }
      runtime_assert(result[0].ind >= this.paletteRange.min);
      runtime_assert(result[0].ind <= this.paletteRange.max);
      runtime_assert(result[1].ind >= this.paletteRange.min);
      runtime_assert(result[1].ind <= this.paletteRange.max);
      if (this.flipPalette) {
        result[0].ind = result[0].ind ^ 8;
        result[1].ind = result[1].ind ^ 8;
      }
      let sorted = [result[0].ind, result[1].ind].sort((a, b) => a - b);
      this.updateBlockColorParam(offset, sorted);
    }
  };
  var Stic_Fgbg_Canvas = class extends CommonBlockParamDitherCanvas {
    init() {
      super.init();
    }
    guessBlockParam(offset) {
      this.histogram.fill(0);
      this.scores.fill(0);
      this.addToBlockHistogramFromCurrentColor(offset, this.histogram, this.backgroundColors);
      let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, this.backgroundColors);
      let choices = this.getScoredChoicesByCount(scored);
      let foregroundChoice;
      for (let i = 0; i < choices.length; ++i) {
        if (choices[i].ind < this.pixelPaletteChoices[0] || choices[i].ind > this.pixelPaletteChoices[this.pixelPaletteChoices.length - 1])
          continue;
        foregroundChoice = choices[i];
        choices.splice(i, 1);
        break;
      }
      foregroundChoice = foregroundChoice === void 0 ? { count: 0, ind: this.pixelPaletteChoices[0], score: 0 } : foregroundChoice;
      let colors = choices.map((x) => {
        return x.ind;
      });
      this.updateBlockColorParam(offset, [foregroundChoice.ind, ...colors]);
    }
  };
  var Stic_ColorStack_Canvas = class extends CommonBlockParamDitherCanvas {
    constructor() {
      super(...arguments);
      this.colorStack = [0, 0, 0, 0];
      this.indirection = [];
    }
    init() {
      super.init();
      this.singleColorMode = this.sys.customize === void 0 ? false : this.sys.customize.singleColor;
      this.makeIndirectionCombinations([]);
      this.chooseColorStack();
      this.indirection = [];
    }
    makeIndirectionCombinations(current) {
      if (current.length == this.colorStack.length) {
        this.indirection.push(current);
        return;
      }
      for (let i = 0; i < this.colorStack.length; ++i) {
        let found = current.find((x) => x == i);
        if (found !== void 0)
          continue;
        this.makeIndirectionCombinations([...current, i]);
      }
    }
    chooseColorStack() {
      let chooseColors = (useColors) => {
        let useColorStack = [...this.colorStack];
        this.histogram.fill(0);
        this.scores.fill(0);
        let lastScored;
        for (let offset = 0; offset < this.cb.size; ++offset) {
          lastScored = this.addToCbHistogramFromRef(offset, this.histogram, this.scores, useColors);
        }
        let choices = this.getScoredChoicesByCount(lastScored).slice(0, useColorStack.length);
        if (this.singleColorMode) {
          choices = choices.splice(0, 1);
        }
        runtime_assert(choices.length > 0);
        let startLength = choices.length;
        for (let i = 0; choices.length < useColorStack.length; ++i) {
          choices.push(choices[i % startLength]);
        }
        runtime_assert(choices.length == useColorStack.length);
        useColorStack = choices.map((x) => {
          return x.ind;
        });
        let lowestCombination = NaN;
        if (!this.singleColorMode) {
          let gridScore = [];
          for (let offset = 0; offset < this.cb.size; ++offset) {
            this.histogram.fill(0);
            this.scores.fill(0);
            this.histogram.fill(0);
            this.scores.fill(0);
            let ranking = this.addToCbHistogramFromRef(offset, this.histogram, this.scores, useColorStack);
            let rankedChoices = this.getScoredChoicesByCount(ranking);
            runtime_assert(rankedChoices.length <= useColorStack.length);
            let scoredColors = [];
            for (let n = 0; n < useColorStack.length; ++n) {
              let foundRank = useColorStack.length;
              for (let rank = 0; rank < rankedChoices.length; ++rank) {
                if (rankedChoices[rank].ind != useColorStack[n])
                  continue;
                foundRank = rank;
                break;
              }
              scoredColors.push(foundRank);
            }
            gridScore.push(scoredColors);
          }
          let lowestRank = NaN;
          for (let i = 0; i < this.indirection.length; ++i) {
            let combination = this.indirection[i];
            let combinationRank = 0;
            let pos = 0;
            for (let offset = 0; offset < this.cb.size; ++offset) {
              let indexCurrent = combination[pos % useColorStack.length];
              let indexNext = combination[(pos + 1) % useColorStack.length];
              let rankCurrent = gridScore[offset][indexCurrent];
              let rankNext = gridScore[offset][indexNext];
              let useRank = rankCurrent;
              if (rankNext < rankCurrent) {
                useRank = rankNext;
                ++pos;
              }
              combinationRank += useRank;
            }
            if (combinationRank < lowestRank || Number.isNaN(lowestRank)) {
              lowestCombination = i;
              lowestRank = combinationRank;
            }
          }
        } else {
          lowestCombination = 0;
        }
        runtime_assert(!Number.isNaN(lowestCombination));
        let replacementColorStack = [];
        for (let i = 0; i < this.indirection[lowestCombination].length; ++i) {
          replacementColorStack.push(useColorStack[this.indirection[lowestCombination][i]]);
        }
        return replacementColorStack;
      };
      let fullColorStack = chooseColors(this.backgroundColors);
      let fullScore = this.fillCb(fullColorStack);
      let fullCbParams = new Uint32Array(this.cbParams);
      let hasRestrictedPalette = this.paletteChoices.colorsRange.max < this.paletteChoices.backgroundRange.max && !this.singleColorMode;
      let pastelColorStack = hasRestrictedPalette ? chooseColors(range(this.paletteChoices.colorsRange.max + 1, this.paletteChoices.backgroundRange.max + 1)) : fullColorStack;
      let pastelScore = hasRestrictedPalette ? this.fillCb(pastelColorStack) : fullScore;
      this.colorStack = pastelColorStack;
      let pastelWins = Math.ceil(Math.log2(pastelScore)) <= Math.ceil(Math.log2(fullScore));
      if (!pastelWins) {
        this.cbParams = fullCbParams;
        this.colorStack = fullColorStack;
      }
      for (let i = 0; i < this.colorStack.length; ++i) {
        this.updateColorParam(i, this.extraParams, [this.colorStack[i]]);
      }
    }
    fillCb(useColors) {
      let colorStackScore = 0;
      this.colorStack.forEach((x, i) => {
        this.extraParams[i] = x;
      });
      if (!this.singleColorMode) {
        let pos = 0;
        for (let offset = 0; offset < this.cb.size; ++offset) {
          let currentColor = useColors[pos % useColors.length];
          let nextColor = useColors[(pos + 1) % useColors.length];
          let colors = this.singleColorMode ? [currentColor] : [currentColor, nextColor];
          this.histogram.fill(0);
          this.scores.fill(0);
          let scored = this.addToCbHistogramFromRef(offset, this.histogram, this.scores, colors);
          let choices = this.getScoredChoicesByCount(scored);
          runtime_assert(choices.length > 0);
          let advance = choices[0].ind == nextColor ? 1 : 0;
          colorStackScore += choices[0].score;
          this.updateCbColorParam(offset, [choices[0].ind, advance]);
          if (advance)
            ++pos;
        }
      } else {
        for (let offset = 0; offset < this.cb.size; ++offset) {
          let currentColor = useColors[0];
          this.updateCbColorParam(offset, [currentColor, 0]);
        }
      }
      return colorStackScore;
    }
    guessCellParams() {
      if (!this.paramInfo.cell)
        return;
      let scoring = [];
      for (let offset = 0; offset < this.cellParams.length; ++offset) {
        let restrictColors = [...this.backgroundColors];
        let cbColor = this.extractColorsFromCbParams(offset, 1)[0];
        let foundCbColorIndex = restrictColors.findIndex((x) => x == cbColor);
        if (foundCbColorIndex >= 0) {
          restrictColors.splice(foundCbColorIndex, 1);
        }
        this.histogram.fill(0);
        this.scores.fill(0);
        this.addToCellHistogramFromCurrentColor(offset, this.histogram, restrictColors);
        let scored = this.addToCellHistogramFromAlt(offset, this.histogram, this.scores, restrictColors);
        let choices = this.getScoredChoicesByCount(scored);
        runtime_assert(choices.length > 0);
        if (choices[0].ind < this.paletteChoices.colorsRange.min || choices[0].ind > this.paletteChoices.colorsRange.max) {
          scoring.push({ offset, score: choices[0].score });
        } else {
          scoring.push({ offset, score: NaN });
        }
      }
      let filtered = scoring.filter((x) => !Number.isNaN(x.score));
      let sorted = filtered.sort((a, b) => a.score - b.score);
      sorted = sorted.slice(0, 64);
      this.cellParams.fill(0);
      sorted.forEach((x, index) => {
        this.updateCellColorParam(x.offset, [1, index], 255, 8);
      });
    }
    guessBlockParam(offset) {
      let allowFullRange = false;
      if (this.paramInfo.cell) {
        allowFullRange = this.extractColorsFromCellParams(offset, 1, 255, 8)[0] != 0;
      }
      let restrictColors = allowFullRange ? [...this.backgroundColors] : [...this.pixelPaletteChoices];
      let cbColor = this.extractColorsFromCbParams(offset, 1)[0];
      let foundCbColorIndex = restrictColors.findIndex((x) => x == cbColor);
      if (foundCbColorIndex >= 0) {
        restrictColors.splice(foundCbColorIndex, 1);
      }
      this.histogram.fill(0);
      this.scores.fill(0);
      this.addToBlockHistogramFromCurrentColor(offset, this.histogram, restrictColors);
      let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, restrictColors);
      let choices = this.getScoredChoicesByCount(scored);
      let colors = choices.map((x) => {
        return x.ind;
      }).slice(0, this.paletteChoices.colors);
      this.updateBlockColorParam(offset, colors);
    }
    getValidColors(imageIndex) {
      let offset = this.imageIndexToBlockOffset(imageIndex);
      let extracted = this.extractColorsFromBlockParams(offset, this.paletteChoices.colors);
      let cbColor = this.extractColorsFromCbParams(offset, 1)[0];
      let valid = [cbColor, ...extracted];
      return valid;
    }
  };
  var Msx_Canvas = class extends CommonBlockParamDitherCanvas {
  };
  var SNES_Canvas = class extends CommonBlockParamDitherCanvas {
  };
  var SNES_Canvas_Direct = class extends CommonBlockParamDitherCanvas {
    constructor() {
      super(...arguments);
      this.pppFilteredPalettes = [];
    }
    init() {
      super.init();
      this.Bbpgggprrrp_to_Pal_Lut = new Uint32Array(this.pal.length);
      for (let i = 0; i < this.pal.length; ++i) {
        let info = this.RgbToInfo(this.pal[i]);
        this.Bbpgggprrrp_to_Pal_Lut[info.bbpgggprrrp] = i;
      }
      for (let ppp = 0; ppp < 1 << 3; ++ppp) {
        let filteredByPpp = this.pixelPaletteChoices.filter((x) => {
          let info = this.colorToInfo(x);
          return info.ppp == ppp && !(info.bbpgggprrrp == 0);
        });
        this.pppFilteredPalettes.push(filteredByPpp);
      }
    }
    RgbToInfo(rgb) {
      let bbpgggprrrp = (rgb & 240) >> 4 | (rgb >> 8 & 240) >> 4 << 4 | (rgb >> 16 & 224) >> 5 << 8;
      let bbgggrrr = (rgb & 224) >> 5 | (rgb >> 8 & 224) >> 5 << 3 | (rgb >> 16 & 192) >> 6 << 6;
      let ppp = (rgb & 16) >> 4 | (rgb >> 8 & 16) >> 4 << 1 | (rgb >> 16 & 32) >> 5 << 2;
      let r = rgb & 240;
      let g = rgb >> 8 & 240;
      let b = rgb >> 16 & 224;
      return { bbpgggprrrp, bbgggrrr, ppp, r, g, b };
    }
    BbgggrrrToBbpgggprrrp(bbgggrrr, ppp) {
      let bbpgggprrrp = (bbgggrrr & 7) << 1 | (bbgggrrr & 56) >> 3 << 4 | (bbgggrrr & 192) >> 6 << 9;
      bbpgggprrrp |= ppp & 1 | (ppp & 2) >> 1 << 4 | (ppp & 4) >> 2 << 8;
      return bbpgggprrrp;
    }
    BbpgggprrrpToInfo(bbpgggprrrp) {
      let rgb = (bbpgggprrrp & 15) << 0 + 4 | (bbpgggprrrp & 240) >> 4 << 8 + 4 | (bbpgggprrrp & 1792) >> 8 << 16 + 5;
      let bbgggrrr = (bbpgggprrrp & 14) >> 1 | (bbpgggprrrp & 224) >> 5 << 3 | (bbpgggprrrp & 1536) >> 9 << 6;
      let ppp = bbpgggprrrp & 1 | (bbpgggprrrp & 16) >> 4 << 1 | (bbpgggprrrp & 256) >> 8 << 2;
      let r = rgb & 240;
      let g = rgb >> 8 & 240;
      let b = rgb >> 16 & 224;
      return { rgb, bbgggrrr, ppp, r, g, b };
    }
    BbpgggprrrpToColor(bbpgggprrrp) {
      return this.Bbpgggprrrp_to_Pal_Lut[bbpgggprrrp];
    }
    colorToInfo(color) {
      return this.RgbToInfo(this.pal[color]);
    }
    substituteColorForColorWithPpp(currentColor, ppp) {
      let info = this.colorToInfo(currentColor);
      return this.BbpgggprrrpToColor(this.BbgggrrrToBbpgggprrrp(info.bbgggrrr, ppp));
    }
    getValidColors(imageIndex) {
      let offset = this.imageIndexToBlockOffset(imageIndex);
      let ppp = this.extractColorsFromBlockParams(offset, 1, 3, 2)[0];
      let valid = this.pppFilteredPalettes[ppp];
      return valid;
    }
    guessBlockParam(offset) {
      this.histogram.fill(0);
      this.scores.fill(0);
      this.addToBlockHistogramFromCurrentColor(offset, this.histogram);
      let scored = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores);
      let ranked = this.getScoredChoicesByCount(scored);
      let lowestPpp = NaN;
      let lowestPppScore = NaN;
      for (let ppp = 0; ppp < 1 << 3; ++ppp) {
        let restrictedColors = ranked.map((x) => {
          return this.substituteColorForColorWithPpp(x.ind, ppp);
        });
        restrictedColors = Array.from(new Set(restrictedColors));
        this.histogram.fill(0);
        this.scores.fill(0);
        this.addToBlockHistogramFromCurrentColor(offset, this.histogram, restrictedColors);
        let scored2 = this.addToBlockHistogramFromAlt(offset, this.histogram, this.scores, restrictedColors);
        let pppRanked = this.getScoredChoicesByCount(scored2);
        let totalPppScore = 0;
        pppRanked.forEach((x) => {
          totalPppScore += x.score;
        });
        if (totalPppScore < lowestPppScore || Number.isNaN(lowestPppScore)) {
          lowestPppScore = totalPppScore;
          lowestPpp = ppp;
        }
      }
      runtime_assert(!Number.isNaN(lowestPpp));
      this.updateBlockColorParam(offset, [lowestPpp], 3, 2);
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
          content: this.dithcanv.content(),
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
