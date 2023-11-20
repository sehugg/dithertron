// PALETTES

export function RGB(r: number, g: number, b: number) {
    return ((r & 0xff) << 0) | ((g & 0xff) << 8) | ((b & 0xff) << 16);
}

export const MONO_RGB = [
    RGB(0, 0, 0),
    RGB(255, 255, 255)
];

export const CMYK_RGB = [
    RGB(0, 0, 0),
    RGB(255, 128, 64),
    RGB(64, 255, 128),
    RGB(128, 64, 255),
    RGB(255, 255, 255)
];

export const VIC_NTSC_RGB = [
    0x000000,
    0xFFFFFF,
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

// https://www.pepto.de/projects/colorvic/
export const VIC_PAL_RGB = [
    RGB(0x00, 0x00, 0x00),
    RGB(0xff, 0xff, 0xff),
    RGB(0x81, 0x33, 0x38),
    RGB(0x75, 0xce, 0xc8),
    RGB(0x8e, 0x3c, 0x97),
    RGB(0x56, 0xac, 0x4d),
    RGB(0x2e, 0x2c, 0x9b),
    RGB(0xed, 0xf1, 0x71),
    RGB(0x8e, 0x50, 0x29),
    RGB(0x55, 0x38, 0x00),
    RGB(0xc4, 0x6c, 0x71),
    RGB(0x4a, 0x4a, 0x4a),
    RGB(0x7b, 0x7b, 0x7b),
    RGB(0xa9, 0xff, 0x9f),
    RGB(0x70, 0x6d, 0xeb),
    RGB(0xb2, 0xb2, 0xb2)
];

// https://en.wikipedia.org/wiki/List_of_8-bit_computer_hardware_graphics#VIC-20
export const VIC20_PAL_RGB = [
    RGB(0x00,0x00,0x00),
    RGB(0xff,0xff,0xff),
    RGB(0x78,0x29,0x22),
    RGB(0x87,0xd6,0xdd),
    RGB(0xaa,0x5f,0xb6),
    RGB(0x55,0xa0,0x49),
    RGB(0x40,0x31,0x8d),
    RGB(0xbf,0xce,0x72),
    RGB(0xaa,0x74,0x49),
    RGB(0xea,0xb4,0x89),
    RGB(0xb8,0x69,0x62),
    RGB(0xc7,0xff,0xff),
    RGB(0xea,0x9f,0xf6),
    RGB(0x94,0xe0,0x89),
    RGB(0x80,0x71,0xcc),
    RGB(0xff,0xff,0xb2)
];

export const TMS9918_RGB = [
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

export const NES_RGB = [
    0x525252, 0xB40000, 0xA00000, 0xB1003D, 0x740069, 0x00005B, 0x00005F, 0x001840, 0x002F10, 0x084A08, 0x006700, 0x124200, 0x6D2800, 0x000000, 0x000000, 0x000000,
    0xC4D5E7, 0xFF4000, 0xDC0E22, 0xFF476B, 0xD7009F, 0x680AD7, 0x0019BC, 0x0054B1, 0x006A5B, 0x008C03, 0x00AB00, 0x2C8800, 0xA47200, 0x000000, 0x000000, 0x000000,
    0xF8F8F8, 0xFFAB3C, 0xFF7981, 0xFF5BC5, 0xFF48F2, 0xDF49FF, 0x476DFF, 0x00B4F7, 0x00E0FF, 0x00E375, 0x03F42B, 0x78B82E, 0xE5E218, 0x787878, 0x000000, 0x000000,
    0xFFFFFF, 0xFFF2BE, 0xF8B8B8, 0xF8B8D8, 0xFFB6FF, 0xFFC3FF, 0xC7D1FF, 0x9ADAFF, 0x88EDF8, 0x83FFDD, 0xB8F8B8, 0xF5F8AC, 0xFFFFB0, 0xF8D8F8, 0x000000, 0x000000
];

export const AP2HIRES_RGB = [
    RGB(0, 0, 0),
    RGB(255, 68, 253),
    RGB(20, 245, 60),
    RGB(20, 207, 253),
    RGB(255, 106, 60),
    RGB(255, 255, 255)
];

export const AP2LORES_RGB = [
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

export const ASTROCADE_RGB = [0, 2368548, 4737096, 7171437, 9539985, 11974326, 14342874, 16777215, 12255269, 14680137, 16716142, 16725394, 16734903, 16744155, 16753663, 16762879, 11534409, 13959277, 16318866, 16721334, 16730842, 16740095, 16749311, 16758783, 10420330, 12779662, 15138995, 16718039, 16727291, 16736767, 16745983, 16755199, 8847495, 11206827, 13631696, 15994612, 16724735, 16733951, 16743423, 16752639, 6946975, 9306307, 11731175, 14092287, 16461055, 16732415, 16741631, 16751103, 4784304, 7143637, 9568505, 11929087, 14297599, 16731647, 16741119, 16750335, 2425019, 4784352, 7209215, 9570047, 12004095, 14372863, 16741375, 16750847, 191, 2359523, 4718847, 7146495, 9515263, 11949311, 14318079, 16752127, 187, 224, 2294015, 4658431, 7092735, 9461247, 11895551, 14264063, 176, 213, 249, 2367999, 4736511, 7105279, 9539327, 11908095, 159, 195, 3303, 209151, 2577919, 4946431, 7380735, 9749247, 135, 171, 7888, 17140, 681983, 3050495, 5484543, 7853311, 106, 3470, 12723, 22231, 31483, 1548031, 3916799, 6285311, 73, 8557, 17810, 27318, 36570, 373759, 2742271, 5176575, 4389, 13641, 23150, 32402, 41911, 51163, 2026495, 4456447, 9472, 18724, 27976, 37485, 46737, 56246, 1834970, 4194303, 14080, 23296, 32803, 42055, 51564, 60816, 2031541, 4456409, 18176, 27648, 36864, 46116, 55624, 392556, 2752401, 5177269, 21760, 30976, 40192, 49667, 58919, 1572683, 3932016, 6291348, 24320, 33536, 43008, 52224, 716810, 3079982, 5504851, 7864183, 25856, 35328, 44544, 250368, 2619136, 4980503, 7405371, 9764703, 26624, 35840, 45312, 2413824, 4782336, 7143173, 9568041, 11927374, 26112, 35584, 2338560, 4707328, 7141376, 9502464, 11927326, 14286659, 24832, 2393344, 4762112, 7196160, 9564928, 11992832, 14352155, 16711487, 2447360, 4815872, 7250176, 9618688, 12052992, 14417664, 16776990, 16777027, 4803328, 7172096, 9606144, 11974912, 14343424, 16776965, 16777001, 16777038, 6962176, 9330688, 11764992, 14133504, 16502272, 16773655, 16777019, 16777055, 8858112, 11226880, 13660928, 16029440, 16759818, 16769070, 16777043, 16777079, 10426112, 12794624, 15163392, 16745475, 16754727, 16764235, 16773488, 16777108, 11534848, 13969152, 16337664, 16740388, 16749640, 16759148, 16768401, 16777141, 12255232, 14684928, 16725795, 16735047, 16744556, 16753808, 16763317, 16772569];

export const VCS_RGB = [
    0x000000, 0x000000, 0x404040, 0x404040, 0x6c6c6c, 0x6c6c6c, 0x909090, 0x909090, 0xb0b0b0, 0xb0b0b0, 0xc8c8c8, 0xc8c8c8, 0xdcdcdc, 0xdcdcdc, 0xf4f4f4, 0xf4f4f4,
    0x004444, 0x004444, 0x106464, 0x106464, 0x248484, 0x248484, 0x34a0a0, 0x34a0a0, 0x40b8b8, 0x40b8b8, 0x50d0d0, 0x50d0d0, 0x5ce8e8, 0x5ce8e8, 0x68fcfc, 0x68fcfc,
    0x002870, 0x002870, 0x144484, 0x144484, 0x285c98, 0x285c98, 0x3c78ac, 0x3c78ac, 0x4c8cbc, 0x4c8cbc, 0x5ca0cc, 0x5ca0cc, 0x68b4dc, 0x68b4dc, 0x78c8ec, 0x78c8ec,
    0x001884, 0x001884, 0x183498, 0x183498, 0x3050ac, 0x3050ac, 0x4868c0, 0x4868c0, 0x5c80d0, 0x5c80d0, 0x7094e0, 0x7094e0, 0x80a8ec, 0x80a8ec, 0x94bcfc, 0x94bcfc,
    0x000088, 0x000088, 0x20209c, 0x20209c, 0x3c3cb0, 0x3c3cb0, 0x5858c0, 0x5858c0, 0x7070d0, 0x7070d0, 0x8888e0, 0x8888e0, 0xa0a0ec, 0xa0a0ec, 0xb4b4fc, 0xb4b4fc,
    0x5c0078, 0x5c0078, 0x74208c, 0x74208c, 0x883ca0, 0x883ca0, 0x9c58b0, 0x9c58b0, 0xb070c0, 0xb070c0, 0xc084d0, 0xc084d0, 0xd09cdc, 0xd09cdc, 0xe0b0ec, 0xe0b0ec,
    0x780048, 0x780048, 0x902060, 0x902060, 0xa43c78, 0xa43c78, 0xb8588c, 0xb8588c, 0xcc70a0, 0xcc70a0, 0xdc84b4, 0xdc84b4, 0xec9cc4, 0xec9cc4, 0xfcb0d4, 0xfcb0d4,
    0x840014, 0x840014, 0x982030, 0x982030, 0xac3c4c, 0xac3c4c, 0xc05868, 0xc05868, 0xd0707c, 0xd0707c, 0xe08894, 0xe08894, 0xeca0a8, 0xeca0a8, 0xfcb4bc, 0xfcb4bc,
    0x880000, 0x880000, 0x9c201c, 0x9c201c, 0xb04038, 0xb04038, 0xc05c50, 0xc05c50, 0xd07468, 0xd07468, 0xe08c7c, 0xe08c7c, 0xeca490, 0xeca490, 0xfcb8a4, 0xfcb8a4,
    0x7c1800, 0x7c1800, 0x90381c, 0x90381c, 0xa85438, 0xa85438, 0xbc7050, 0xbc7050, 0xcc8868, 0xcc8868, 0xdc9c7c, 0xdc9c7c, 0xecb490, 0xecb490, 0xfcc8a4, 0xfcc8a4,
    0x5c2c00, 0x5c2c00, 0x784c1c, 0x784c1c, 0x906838, 0x906838, 0xac8450, 0xac8450, 0xc09c68, 0xc09c68, 0xd4b47c, 0xd4b47c, 0xe8cc90, 0xe8cc90, 0xfce0a4, 0xfce0a4,
    0x2c3c00, 0x2c3c00, 0x485c1c, 0x485c1c, 0x647c38, 0x647c38, 0x809c50, 0x809c50, 0x94b468, 0x94b468, 0xacd07c, 0xacd07c, 0xc0e490, 0xc0e490, 0xd4fca4, 0xd4fca4,
    0x003c00, 0x003c00, 0x205c20, 0x205c20, 0x407c40, 0x407c40, 0x5c9c5c, 0x5c9c5c, 0x74b474, 0x74b474, 0x8cd08c, 0x8cd08c, 0xa4e4a4, 0xa4e4a4, 0xb8fcb8, 0xb8fcb8,
    0x003814, 0x003814, 0x1c5c34, 0x1c5c34, 0x387c50, 0x387c50, 0x50986c, 0x50986c, 0x68b484, 0x68b484, 0x7ccc9c, 0x7ccc9c, 0x90e4b4, 0x90e4b4, 0xa4fcc8, 0xa4fcc8,
    0x00302c, 0x00302c, 0x1c504c, 0x1c504c, 0x347068, 0x347068, 0x4c8c84, 0x4c8c84, 0x64a89c, 0x64a89c, 0x78c0b4, 0x78c0b4, 0x88d4cc, 0x88d4cc, 0x9cece0, 0x9cece0,
    0x002844, 0x002844, 0x184864, 0x184864, 0x306884, 0x306884, 0x4484a0, 0x4484a0, 0x589cb8, 0x589cb8, 0x6cb4d0, 0x6cb4d0, 0x7ccce8, 0x7ccce8, 0x8ce0fc, 0x8ce0fc
];

export const CGA_RGB = [
    0x000000, 0xAA0000, 0x00AA00, 0xAAAA00, 0x0000AA, 0xAA00AA, 0x0055AA, 0xAAAAAA,
    0x555555, 0xFF5555, 0x55FF55, 0xFFFF55, 0x5555FF, 0xFF55FF, 0x55FFFF, 0xFFFFFF,
];

export const CGA_RGB_1 = [0x000000, 0x00AA00, 0x0000AA, 0x0055AA];
export const CGA_RGB_2 = [0x000000, 0xAAAA00, 0xAA00AA, 0xAAAAAA];
export const CGA_RGB_3 = [0x000000, 0xAAAA00, 0x0000AA, 0xAAAAAA];
export const CGA_RGB_1H = [0x000000, 0x55FF55, 0x5555FF, 0x55FFFF];
export const CGA_RGB_2H = [0x000000, 0xFFFF55, 0xFF55FF, 0xFFFFFF];
export const CGA_RGB_3H = [0x000000, 0xFFFF00, 0x5555FF, 0xFFFFFF];
export const SMS_RGB = generateRGBPalette(2, 2, 2);
export const WILLIAMS_RGB = generateRGBPalette(3, 3, 2);
export const ATARIST_RGB = generateRGBPalette(3, 3, 3);
export const TELETEXT_RGB = generateRGBPalette(1, 1, 1);

export const ZXSPECTRUM_RGB = [ // GRB
    RGB(0x00, 0x00, 0x00),  // 0x00 Black            // dark palette
    RGB(0x01, 0x00, 0xCE),  // 0x01 Blue
    RGB(0xCF, 0x01, 0x00),  // 0x02 Red
    RGB(0xCF, 0x01, 0xCE),  // 0x03 Magenta
    RGB(0x00, 0xCF, 0x15),  // 0x04 Green
    RGB(0x01, 0xCF, 0xCF),  // 0x05 Cyan
    RGB(0xCF, 0xCF, 0x15),  // 0x06 Yellow
    RGB(0xCF, 0xCF, 0xCF),  // 0x07 White

    RGB(0x00, 0x00, 0x00),  // 0x08 "Bright" Black   // bright palette
    RGB(0x02, 0x00, 0xFD),  // 0x09 Bright Blue
    RGB(0xFF, 0x02, 0x01),  // 0x0A Bright Red
    RGB(0xFF, 0x02, 0xFD),  // 0x0B Bright Magenta
    RGB(0x00, 0xFF, 0x1C),  // 0x0C Bright Green
    RGB(0x02, 0xFF, 0xFF),  // 0x0D Bright Cyan
    RGB(0xFF, 0xFF, 0x1D),  // 0x0E Bright Yellow
    RGB(0xFF, 0xFF, 0xFF),  // 0x0F Bright White
];

// see https://forums.atariage.com/topic/278354-gfx-palette-flag/
export const INTELLIVISION_STIC_RGB = [
    RGB(  0,  0,  0),   // Black            // primary color set
    RGB(  0,117,255),   // Blue
    RGB(255, 76, 57),   // Red
    RGB(209,185, 81),   // Tan
    RGB(  9,185,  0),   // Dark Green
    RGB( 48,223, 16),   // Green
    RGB(255,229,  1),   // Yellow
    RGB(255,255,255),   // White
    RGB(140,140,140),   // Gray             // pastel color set
    RGB( 40,229,192),   // Cyan
    RGB(255,160, 46),   // Orange
    RGB(100,103,  0),   // Brown
    RGB(255, 41,255),   // Pink
    RGB(140,143,255),   // Light Blue
    RGB(124,237,  0),   // Yellow Green
    RGB(196, 43,252),   // Purple
];

export const AMSTRAD_CPC_RGB = [
    0x000000, 0x800090, 0xFF0000,
    0x000080, 0x800080, 0xFF0080,
    0x0000FF, 0x8000FF, 0xFF00FF,
    0x008000, 0x808000, 0xFF8000,
    0x008080, 0x808080, 0xFF8080,
    0x0080FF, 0x8080FF, 0xFF80FF,
    0x00FF00, 0x80FF00, 0xFFFF00,
    0x00FF80, 0x80FF80, 0xFFFF80,
    0x00FFFF, 0x80FFFF, 0xFFFFFF,
];

// TODO: should these be reversed?
export const PICO8_RGB = [
    0x000000, //0, 0, 0 black
    0x1D2B53, //29, 43, 83 dark-blue
    0x7E2553, //126, 37, 83 dark-purple
    0x008751, //0, 135, 81 dark-green
    0xAB5236, //171, 82, 54 brown
    0x5F574F, //95, 87, 79 dark-gray
    0xC2C3C7, //194, 195, 199 light-gray
    0xFFF1E8, //255, 241, 232 white
    0xFF004D, //255, 0, 77 red
    0xFFA300, //255, 163, 0 orange
    0xFFEC27, //255, 236, 39 yellow
    0x00E436, //0, 228, 54 green
    0x29ADFF, //41, 173, 255 blue
    0x83769C, //131, 118, 156 indigo
    0xFF77A8, //255, 119, 168 pink
    0xFFCCAA, //255, 204, 170 peach
];

export const TIC80_RGB = [
    0x140C1C,
    0x442434,
    0x30346D,
    0x4E4A4F,
    0x854C30,
    0x346524,
    0xD04648,
    0x757161,
    0x597DCE,
    0xD27D2C,
    0x8595A1,
    0x6DAA2C,
    0xD2AA99,
    0x6DC2CA,
    0xDAD45E,
    0xDEEED6,
];

// TODO: https://geeks-world.github.io/articles/467811/index.html
export const CHANNELF_RGB = [
    // background
    /*
    0xe0e0e0,
    0x101010,
    0x91ffa6,
    0xced0ff,
    */
    // foreground
    0xfcfcfc,
    0xff3153,
    0x02cc5d,
    0x4b3ff3,
];

export const GAMEBOY_GREEN_RGB = [
    0x0f380f,
    0x306230,
    0x0fac8c,
    0x0fccac,
];

export const GAMEBOY_MONO_RGB = [
    0x000000,
    0x555555,
    0xaaaaaa,
    0xffffff,
];

export const RGB_444 = generateRGBPalette(4, 4, 4);
export const GAMEBOY_COLOR_RGB = RGB_444;
export const AMIGA_OCS_COLOR_RGB = RGB_444;
export const IIGS_COLOR_RGB = RGB_444;
export const GAMEGEAR_COLOR_RGB = RGB_444;

export const MC6847_PALETTE0 = [
    RGB(0x30, 0xd2, 0x00),    /* NTSC: RGB( 28, 213,  16), */   // green 
    RGB(0xf5, 0xf5, 0x80),    /* NTSC: RGB(226, 219,  15), */   // yellow
    RGB(0x4c, 0x3a, 0xb4),    /* NTSC: RGB(  3,  32, 255), */   // blue  
    RGB(0x9a, 0x32, 0x36),    /* NTSC: RGB(226,  32,  10), */   // red   
];

export const MC6847_PALETTE1 = [
    RGB(0xd8, 0xd8, 0xd8),    /* NTSC: RGB( 205, 219, 224), */  // buff    
    RGB(0x41, 0xaf, 0x71),    /* NTSC: RGB(  22, 208, 226), */  // cyan    
    RGB(0xd8, 0x6e, 0xf0),    /* NTSC: RGB( 203,  57, 226), */  // magenta 
    RGB(0xd4, 0x7f, 0x00),    /* NTSC: RGB( 204,  45,  16), */  // orange  
];

function generateRGBPalette(rr: number, gg: number, bb: number) {
    var n = 1 << (rr + gg + bb);
    var rs = 255 / ((1 << rr) - 1);
    var gs = 255 / ((1 << gg) - 1);
    var bs = 255 / ((1 << bb) - 1);
    var pal = new Uint32Array(n);
    for (var i = 0; i < n; i++) {
        var r = (i & ((1 << rr) - 1));
        var g = ((i >> rr) & ((1 << gg) - 1));
        var b = ((i >> (rr + gg)) & ((1 << bb) - 1));
        pal[i] = RGB(r * rs, g * gs, b * bs);
    }
    return pal;
}
