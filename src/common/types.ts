
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
    background?: boolean,           // true=background color is available to select; false=not available (default=false)
    aux?: boolean,                  // true=auxiliary color is available to select; false=not available (default=false)
    border?: boolean,               // true=border (overscan) color is available to select; false=not available (default=false)
    colors?: number,                // how many individual per pixel color choices are available (default=block.colors - background?1:0 - aux?1:0 -border?1:0)
    backgroundRange?: PaletteRange, // what part of the palette is available for the background (default=entire range)
    auxRange?: PaletteRange,        // what part of the palette is available for the aux (default=entire range)
    borderRange?: PaletteRange,     // what part of the palette is available for the border (default=entire range)
    colorsRange?: PaletteRange      // what part of the palette is available for individual colors (default=entire range)
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
    block?: {
        w: number,
        h: number,
        colors: number,         // how many colors are available to choose per pixel (regardless of the palette size)
        xb?: number,            // how much color bleeds from the surrounding x/y direction (default=0)
        yb?: number
    };
    cell?: {                    // for displays that are character cell based
        w: number,              // how many pixels wide is each character's cell (for completeness)
        h: number,              // how many pixels tall is each character's cell (which can differ from the block, e.g. fli)
        msbToLsb: boolean       // set to true if the image is ordered most significant bit to least significant bit
    };
    paletteChoices?: PaletteChoices;
    cb?: {                      // color block (for mods with separated color blocks outside of the pixel color choice)
        w: number,
        h: number,
        xb?: number,            // how much color bleeds from the surrounding x/y direction (default=0)
        yb?: number        
    };
    param?: {
        extra: number           // how many extra param bytes are required for this system
    }
    fli?: {
        bug: boolean,
        blankLeft: boolean,
        blankRight: boolean,
        blankColumns: number
    };
    toNative?: string;
    exportFormat?: PixelEditorImageFormat;
}

export interface PixelsAvailableMessage {
    img : Uint32Array;
    width : number;
    height : number;
    pal : Uint32Array;
    indexed : Uint8Array;
    params : Uint32Array;
    final : boolean;
}

export type DitherKernel = number[][];

export interface DitherSetting {
    name: string;
    kernel: DitherKernel;
}

export type RGBDistanceFunction = (a:number,b:number) => number;

