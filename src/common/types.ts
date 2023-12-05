
export type PixelEditorImageFormat = {
    w?: number
    h?: number
    count?: number
    bpp?: number
    np?: number
    bpw?: number
    sl?: number
    pofs?: number
    remap?: number[]
    brev?: boolean
    flip?: boolean
    destfmt?: PixelEditorImageFormat
    skip?: number
    yremap?: [number,number,number]
    bitremap?: number[]
};

export interface PaletteRange {
    min: number;
    max: number;
};

export interface PaletteChoices {
    prefillReference: boolean,      // set to true to cause the image to be pre-filled from the reference image the first scan (instead of dither image)
    background: boolean,            // true=background color is available to select; false=not available (default=false)
    aux: boolean,                   // true=auxiliary color is available to select; false=not available (default=false)
    border: boolean,                // true=border (overscan) color is available to select; false=not available (default=false)
    colors: number,                 // how many individual per pixel color choices are available (default=block.colors - background?1:0 - aux?1:0 -border?1:0)
    backgroundRange: PaletteRange,  // what part of the palette is available for the background (default=entire range)
    auxRange: PaletteRange,         // what part of the palette is available for the aux (default=entire range)
    borderRange: PaletteRange,      // what part of the palette is available for the border (default=entire range)
    colorsRange: PaletteRange       // what part of the palette is available for individual colors (default=entire range)
};

export interface BlockBasics {
    w: number,
    h: number
};

export interface BlockColors {
    colors: number                  // how many colors are available to choose per pixel (regardless of the palette size)
};

export interface BlockColorBleed {
    xb: number,                     // how much color bleeds from the surrounding x/y direction (default=0)
    yb: number
};

export interface BlockBitOrder {
    msbToLsb: boolean               // set to true if the image is ordered most significant bit to least significant bit (default is true)
};

export interface BlockSizing {
    columns: number,
    rows: number,
    size: number                    // total params entries required for this block area
};

export interface Param {
    block: boolean,                 // does block need params (default to true if 'block' property is present)
    cb: boolean,                    // does cb (color block) need params (default to true if 'cb' property is present)
    cell: boolean,                  // does cell need params (default to false)
    extra: number                   // how many extra param bytes are needed
};

export interface Fli {
    bug: boolean,
    blankLeft: boolean,
    blankRight: boolean,
    blankColumns: number
};

export interface DithertronSettings {
    id: string;
    name: string;
    width: number;
    height: number;
    conv: string; //new (...args: any[]) => DitheringCanvas;
    pal: number[] | Uint32Array;

    scaleX?: number; // aspect ratio for screen pixels
    errfn?: string; //(rgb:number,rgb2:number) => number;
    reduce?: number;
    extraColors?: number;
    diffuse?: number;
    ordered?: number;
    noise?: number;
    paletteDiversity?: number;
    ditherfn?: DitherKernel;
    block?: BlockBasics & BlockColors & Partial<BlockColorBleed> & Partial<BlockBitOrder>;
    cell?: BlockBasics & BlockBitOrder & Partial<BlockColorBleed> & Partial<BlockBitOrder>;
    paletteChoices?: Partial<PaletteChoices>;
    cb?: BlockBasics & Partial<BlockColorBleed> & Partial<BlockBitOrder>;
    param?: Partial<Param>;
    fli?: Fli;
    customize?: any;
    toNative?: string;
    exportFormat?: PixelEditorImageFormat;
}

export interface PixelsAvailableMessage {
    img : Uint32Array;
    width : number;
    height : number;
    pal : Uint32Array;
    indexed : Uint32Array;
    content: any;
    final : boolean;
}

export type DitherKernel = number[][];

export interface DitherSetting {
    name: string;
    kernel: DitherKernel;
}

export type RGBDistanceFunction = (a:number,b:number) => number;

