
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
        background?: boolean,   // true=background color is available; false=not available (default=false)
        w: number,
        h: number,
        colors: number,         // how many colors are available to choose per pixel
        xb?: number,            // how much color bleeds from the surrounding x/y direction (default=0)
        yb?: number
    };
    cb?: {                      // color block (for mods with separated color blocks outside of the pixel color choice)
        w: number,
        h: number,
        xb?: number,            // how much color bleeds from the surrounding x/y direction (default=0)
        yb?: number        
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

