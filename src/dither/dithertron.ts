
import { ERROR_FUNCTIONS, getRGBAErrorPerceptual, reducePalette } from '../common/color';
import { DithertronSettings, PixelsAvailableMessage } from '../common/types';
import { SYSTEMS } from '../settings/systems';
import * as canvas from './canvas';

/*
const emglobal : any = this['window'] || (this as any)['global'] || this;
const ENVIRONMENT_IS_WEB = typeof window === 'object';
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
*/

//

export const MAX_ITERATE_COUNT = 100;

export interface DithertronInterface {
    iterate(): void;
}

export class Dithertron implements DithertronInterface {
    sysparams: DithertronSettings = SYSTEMS[0];
    dithcanv: canvas.DitheringCanvas | null = null;
    sourceImageData: Uint32Array | null = null;
    pixelsAvailable: ((msg: PixelsAvailableMessage) => void) | null = null;
    timer: any;

    setSettings(sys: DithertronSettings) {
        this.sysparams = Object.assign({}, sys); // clone settings
        this.restart();
    }
    setSourceImage(imageData: Uint32Array) {
        this.sourceImageData = imageData;
        this.restart();
    }
    iterate(): boolean {
        if (this.dithcanv == null) {
            var sys = this.sysparams;
            if (!sys) throw new Error("no sysparams");
            if (!this.sourceImageData) throw new Error("no sourceImageData");
            var pal = new Uint32Array(sys.pal);
            var errfn = (ERROR_FUNCTIONS as any)[sys.errfn || 'perceptual'] || getRGBAErrorPerceptual;
            if (sys.reduce) {
                pal = reducePalette(this.sourceImageData, pal,
                    sys.reduce, sys.paletteDiversity || 0, errfn);
            }
            if (sys.extraColors) {
                let pal2 = new Uint32Array(pal.length + sys.extraColors);
                pal2.set(pal);
                pal = pal2;
            }
            var convFunction = canvas[sys.conv];
            if (!convFunction) throw new Error("no convFunction for " + sys.conv);
            this.dithcanv = new convFunction(this.sourceImageData, sys.width, pal);
            if (!this.dithcanv) throw new Error("no convFunction() for " + sys.conv);
            this.dithcanv.sys = sys;
            this.dithcanv.errfn = errfn;
            this.dithcanv.noise = sys.noise ? (1 << sys.noise) : 0;
            this.dithcanv.diffuse = (sys.diffuse || 0) + 0;
            this.dithcanv.ordered = (sys.ordered || 0) + 0;
            this.dithcanv.ditherfn = sys.ditherfn || [];
            this.dithcanv.init();
        }
        this.dithcanv.iterate();
        this.dithcanv.noise >>= 1; // divide by 2
        var final = this.dithcanv.changes == 0 || this.dithcanv.iterateCount > MAX_ITERATE_COUNT;
        if (this.pixelsAvailable != null) {
            this.pixelsAvailable({
                img: this.dithcanv.img,
                width: this.dithcanv.width,
                height: this.dithcanv.height,
                pal: this.dithcanv.pal,
                indexed: this.dithcanv.indexed,
                params: this.dithcanv.params,
                final: final,
            });
        }
        return !final;
    }
    iterateIfNeeded() {
        if (this.iterate()) {
            //console.log(this.dithcanv.noise, this.dithcanv.changes, this.dithcanv.iterateCount);
        } else {
            this.stop();
            console.log('stop', this.dithcanv?.iterateCount);
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
        this.timer = undefined;
    }
    start() {
        if (this.sysparams == null) return;
        if (this.sourceImageData == null) return;
        if (this.timer == null) {
            const msec = 50;
            var fn = () => {
                this.timer = setTimeout(fn, msec);
                this.iterateIfNeeded();
            }
            this.timer = setTimeout(fn, msec);
        }
    }
}

