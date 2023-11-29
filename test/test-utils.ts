
import t from 'tap';

import fs from 'fs';
import jpeg from 'jpeg-js';
import pica from 'pica';

import { Dithertron } from '../src/dither/dithertron';
import { SYSTEM_LOOKUP } from '../src/settings/systems';
import { DithertronSettings } from '../src/common/types';
import { getRGBAErrorPerceptual } from '../src/common/color';
import { Test } from 'tap/dist/commonjs/main';
import * as kernels from "../src/dither/kernels";

const THUMB_WIDTH = 20;
const THUMB_HEIGHT = 12;

export async function getThumbnail(dt: Dithertron, useRef: boolean) {
  const picaInstance = new pica();
  const img = useRef ? dt.sourceImageData : dt.dithcanv?.img;
  const src = new Uint8Array(img.buffer);
  const resizedImageData = await picaInstance.resizeBuffer({
    src,
    width: dt.dithcanv?.width,
    height: dt.dithcanv?.height,
    toWidth: THUMB_WIDTH,
    toHeight: THUMB_HEIGHT
  });
  return new Uint32Array(resizedImageData.buffer);
}

export async function fetchImageData(url: string, system: DithertronSettings): Promise<Uint32Array> {
  // fetch image via Node
  const jpegData = fs.readFileSync(url);
  const jpegImageData = jpeg.decode(jpegData, {});
  const width = jpegImageData.width;
  const height = jpegImageData.height;
  const picaInstance = new pica();
  const resizedImageData = await picaInstance.resizeBuffer({
    src: jpegImageData.data,
    width,
    height,
    toWidth: system.width,
    toHeight: system.height
  });
  return new Uint32Array(resizedImageData.buffer);
}

export async function loadDither(sysid: string, imagename: string) {
  const dt = new Dithertron();
  const sys = SYSTEM_LOOKUP[sysid];
  if (!sys) throw new Error("System not found: " + sysid);
  dt.setSettings(sys);
  const imagedata = await fetchImageData('./images/' + imagename, sys);
  dt.setSourceImage(imagedata);
  if (dt.timer) throw new Error("timer should not be started");
  return dt;
}

export async function doDither(dt: Dithertron, testid: string, maxiters: number) {
  let iters = 0;
  dt.clear();
  while (dt.iterate() && iters < maxiters) {
    iters++;
  }
  t.ok(iters < maxiters, "should not reach " + maxiters + " iters");
  if (dt.dithcanv == null) throw new Error("dithcanv should not be null");
  if (dt.dithcanv.img == null) throw new Error("dithcanv.img should not be null");
  // save image to file
  if (dt.dithcanv?.img != null) {
    const jpegImageData = jpeg.encode({
      data: Buffer.from(dt.dithcanv?.img.buffer),
      width: dt.dithcanv.width,
      height: dt.dithcanv.height
    }, 50);
    try {
      fs.mkdirSync('./tests_output');
    } catch (err) { }
    fs.writeFileSync('./tests_output/' + testid + '.jpg', jpegImageData.data);
  }
  if (dt.timer) throw new Error("timer should not be started");
  return { dt, testid, iters };
}

export async function compareWithRef(t: Test, dt: Dithertron, maxbelow: number, avgbelow: number) {
  const ref = await getThumbnail(dt, true);
  const dithered = await getThumbnail(dt, false);
  let maxerror = 0;
  let avgerror = 0;
  for (let i = 0; i < ref.length; i++) {
    let distance = getRGBAErrorPerceptual(ref[i], dithered[i]);
    maxerror = Math.max(maxerror, distance);
    avgerror += distance;
  }
  avgerror /= ref.length;
  //t.comment("maxerror", maxerror, "avgerror", avgerror);
  t.ok(maxerror <= maxbelow, "maxerror should be below " + maxbelow + ", was " + maxerror);
  t.ok(avgerror <= avgbelow, "avgerror should be below " + avgbelow + ", was " + avgerror);
  return { maxerror, avgerror };
}

export interface TestOptions extends Partial<DithertronSettings> {
  maxiters?: number;
  quality?: number;
}

export function doTest(sysid: string, imagename: string, options: TestOptions) {
  t.test("Dither " + sysid + " " + imagename, async t => {
    const maxiters = options.maxiters || 50;
    const maxbelow = (options.quality * 1) || 100;
    const avgbelow = (options.quality * 0.5) || 50;
    var dt = await loadDither(sysid, imagename);
    if (options.paletteDiversity == null) { options.paletteDiversity = 1.2; }
    if (!options.ditherfn) { options.ditherfn = kernels.SIERRALITE; }
    Object.assign(dt.sysparams, options);
    let result1 = await doDither(dt, dt.sysparams.id + '-1', maxiters);
    let result2 = await compareWithRef(t, dt, maxbelow, avgbelow);
    t.comment(sysid, "iters", result1.iters, "avgerror", result2.avgerror, "maxerror", result2.maxerror);
  });
}
