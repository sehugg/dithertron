import { RGBDistanceFunction } from "./types";
import { range, sqr } from "./util";

export interface ColorChoice {
    ind: number;
    count: number;
}

export class Centroid {
    r: number = 0;
    g: number = 0;
    b: number = 0;
    n: number = 0;
    add(rgb: number) {
        this.r += (rgb >> 0) & 0xff;
        this.g += (rgb >> 8) & 0xff;
        this.b += (rgb >> 16) & 0xff;
        this.n++;
    }
    getAvgRGB(k: number) {
        var r = Math.max(0, Math.min(255, this.r * k / this.n));
        var g = Math.max(0, Math.min(255, this.g * k / this.n));
        var b = Math.max(0, Math.min(255, this.b * k / this.n));
        return (r << 0) | (g << 8) | (b << 16);
    }
}

export function reducePaletteChoices(
    imageData: Uint32Array, 
    colors: Uint32Array, 
    count: number, 
    diversity: number,
    distfn: RGBDistanceFunction) : ColorChoice[] 
{
    var histo = new Int32Array(colors.length);
    var err = new Int32Array(4);
    var tmp = new Uint8ClampedArray(4);
    var tmp2 = new Uint32Array(tmp.buffer);
    var bias = diversity*0.5 + 0.5;
    let decay = diversity*0.25 + 0.65;
    // choose initial centroids from palette
    var centroids : Centroid[] = [];
    var inds : number[] = [];
    for (let i=0; i<count; i++) {
        inds.push(Math.floor(i * (colors.length-1) / count));
        centroids.push(new Centroid());
    }
    // iterate over the frame a max. number of items
    for (let iter=0; iter<10; iter++) {
        // iterate over pixels, skipping some for performance
        for (let i=iter; i<imageData.length; i+=(i&15)+1) {
            let rgbref = imageData[i];
            err[0] += rgbref & 0xff;
            err[1] += (rgbref >> 8) & 0xff;
            err[2] += (rgbref >> 16) & 0xff;
            tmp[0] = err[0];
            tmp[1] = err[1];
            tmp[2] = err[2];
            let ind1 = getClosestRGB(tmp2[0], inds, colors, distfn);
            let alt = colors[ind1];
            centroids[inds.indexOf(ind1)].add(tmp2[0]);
            let score = distfn(tmp2[0], alt);
            histo[ind1] += Math.max(0, 256 - score);
            err[0] -= (alt & 0xff);
            err[1] -= ((alt >> 8) & 0xff);
            err[2] -= ((alt >> 16) & 0xff);
            err[0] *= decay;
            err[1] *= decay;
            err[2] *= decay;
        }
        // move colors if the new one is better
        var allinds = range(0, colors.length);
        var nchanged = 0;
        for (let i=0; i<count; i++) {
            // find closest palette color to centroid mean
            let cent = centroids[i];
            let current = colors[inds[i]];
            let ind2 = getClosestRGB(cent.getAvgRGB(bias), allinds, colors, distfn);
            let better = colors[ind2];
            // if it's different, update the color
            if (better != current) {
                inds[i] = ind2;
                nchanged++;
                //console.log(iter, i, inds[i], ind2, score);
            }
            // don't use this color again
            for (let j=0; j<colors.length; j++) {
                if (colors[j] == better) { allinds[j] = -1; }
            }
        }
        if (nchanged == 0) break;
    }
    // sort resulting colors by intensity
    var result = inds.map((ind) => { return {ind, count:histo[ind]} });
    result.sort((a,b) => intensity(colors[a.ind]) - intensity(colors[b.ind]));
    return result;
}

export function reducePalette(
    imageData: Uint32Array,
    colors: Uint32Array,
    count: number,
    diversity: number,
    distfn : RGBDistanceFunction) : Uint32Array 
{
    if (colors.length == count) return new Uint32Array(colors);
    var choices = reducePaletteChoices(imageData, colors, count, diversity, distfn);
    console.log('reducePalette', colors.length, 'to', choices.length);
    return new Uint32Array(choices.map((x) => colors[x.ind]));
}

//

export function getRGBADiff(rgbref: number, rgbimg: number) {
    var err = [0,0,0];
    for (var i=0; i<3; i++) {
        var d = (rgbref & 0xff) - (rgbimg & 0xff);
        err[i] = d;
        rgbref >>= 8;
        rgbimg >>= 8;
    }
    return err;
}

export function getRGBAErrorAbsolute(rgbref: number, rgbimg: number) {
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
export function getRGBAErrorHue(rgbref: number, rgbimg: number) {
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
    var mag2 = Math.sqrt(sqr(r1-r2) + sqr(g1-g2) + sqr(b1-b2))*256;
    return mag2;
}

export function getRGBAErrorPerceptual(rgbref: number, rgbimg: number) {
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

export function getRGBAErrorMax(rgbref: number, rgbimg: number) {
    var r1 = ((rgbref>>0) & 0xff);
    var g1 = ((rgbref>>8) & 0xff);
    var b1 = ((rgbref>>16) & 0xff);
    var r2 = ((rgbimg>>0) & 0xff);
    var g2 = ((rgbimg>>8) & 0xff);
    var b2 = ((rgbimg>>16) & 0xff);
    return Math.max(Math.abs(r1-r2), Math.abs(g1-g2), Math.abs(b1-b2));
}

export function intensity(rgb: number) {
    return getRGBAErrorPerceptual(0, rgb);
}

export const ERROR_FUNCTIONS = {
    'perceptual': getRGBAErrorPerceptual,
    'hue': getRGBAErrorHue,
    'dist': getRGBAErrorAbsolute,
    'max': getRGBAErrorMax,
}

export function getRGBAErrorArr(a: number, b: number) {
    var err = [0,0,0];
    for (var i=0; i<3; i++) {
        err[i] = ((a & 0xff) - (b & 0xff));
        a >>= 8;
        b >>= 8;
    }
    return err;
}

export function getClosestRGB(rgb:number, inds:number[], pal:Uint32Array, distfn:RGBDistanceFunction) {
    var best = 9999999;
    var bestidx = -1;
    for (var i=0; i<inds.length; i++) {
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

export function scoreRGBDistances(rgb:number, inds:number[], pal:Uint32Array, distfn:RGBDistanceFunction) {
    let scores = [];
    for (let i=0; i<inds.length; i++) {
        var col = pal[inds[i]];
        var score = distfn(rgb, col);
        scores[i] = {i, ind:inds[i], rgb, col, score};
    }
    return scores;
}

//

export function getHistogram(inds: number[]) {
    var histo = new Uint32Array(256);
    inds.forEach((x) => histo[x]++);
    return getChoices(histo);
}

export function getChoices(histo: Uint32Array) {
    var choices : {count:number,ind:number}[] = [];
    for (var i=0; i<histo.length; i++) {
        if (histo[i] > 0) {
            choices.push({count:histo[i], ind:i});
        }
    }
    choices.sort((a,b) => b.count - a.count);
    return choices;
}

export function rgb2tuple(arr: number[]) {
    return arr.map((x) => [(x>>0) & 0xff, (x>>8) & 0xff, (x>>16) & 0xff]);
}

export function convertToSystemPalette(pal: Uint32Array, syspal: Uint32Array | number[]) {
    return pal.map((rgba) => syspal.indexOf(rgba & 0xffffff));
}

