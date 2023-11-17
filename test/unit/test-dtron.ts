
import t from 'tap';

import fs from 'fs';
import jpeg from 'jpeg-js';
import pica from 'pica';

import { Dithertron } from '../../src/dither/dithertron';
import { SYSTEM_LOOKUP } from '../../src/settings/systems';
import { DithertronSettings } from '../../src/common/types';
import * as kernels from "../../src/dither/kernels";
import { getRGBAErrorPerceptual } from '../../src/common/color';
import { Test } from 'tap/dist/commonjs/main';

const THUMB_WIDTH = 20;
const THUMB_HEIGHT = 12;

async function getThumbnail(dt: Dithertron, useRef: boolean) {
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

async function fetchImageData(url: string, system: DithertronSettings): Promise<Uint32Array> {
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

async function loadDither(sysid: string, imagename: string) {
  const dt = new Dithertron();
  const sys = SYSTEM_LOOKUP[sysid];
  if (!sys) throw new Error("System not found: " + sysid);
  dt.setSettings(sys);
  const imagedata = await fetchImageData('./images/' + imagename, sys);
  dt.setSourceImage(imagedata);
  if (dt.timer) throw new Error("timer should not be started");
  return dt;
}

async function doDither(dt: Dithertron, testid: string, maxiters: number) {
  let iters = 0;
  dt.clear();
  while (dt.iterate() && iters < maxiters) {
    iters++;
  }
  t.ok(iters < maxiters, "should not reach maxiters");
  if (dt.dithcanv == null) throw new Error("dithcanv should not be null");
  if (dt.dithcanv.img == null) throw new Error("dithcanv.img should not be null");
  console.log(dt.sysparams?.id, iters, "iterations");
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

async function compareWithRef(t: Test, dt: Dithertron, maxbelow: number, avgbelow: number) {
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
  console.log("maxerror", maxerror, "avgerror", avgerror);
  t.ok(maxerror <= maxbelow);
  t.ok(avgerror <= avgbelow);
  return { maxerror, avgerror };
}

interface TestOptions extends Partial<DithertronSettings> {
  maxiters?: number;
  quality?: number;
}

function doTest(sysid: string, imagename: string, options: TestOptions) {
  t.test("Can dither " + sysid + " " + imagename, async t => {
    const maxiters = options.maxiters || 50;
    const maxbelow = (options.quality * 1) || 100;
    const avgbelow = (options.quality * 0.5) || 50;
    var dt = await loadDither(sysid, imagename);
    Object.assign(dt.sysparams, options);
    await doDither(dt, dt.sysparams.id + '-1', maxiters);
    await compareWithRef(t, dt, maxbelow, avgbelow);
  });
}

doTest('c64.multi', 'seurat.jpg', { maxiters: 10, quality: 120 });
doTest('c64.multi', 'seurat.jpg', { maxiters: 30, quality: 75, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
doTest('c64.multi.fli', 'seurat.jpg', { maxiters: 10, quality: 120 });
doTest('c64.multi.fli', 'seurat.jpg', { maxiters: 50, quality: 75, diffuse: 0.5, ditherfn: kernels.SIERRALITE });

t.test("Can restart dithertron", async t => {
  var dt = await loadDither('c64.hires', 'seurat.jpg');
  await doDither(dt, dt.sysparams.id + '-1', 10);
  await compareWithRef(t, dt, 150, 50);
  dt.sysparams.diffuse = 0.5;
  dt.sysparams.ditherfn = kernels.SIERRALITE;
  await doDither(dt, dt.sysparams.id + '-2', 25);
  await compareWithRef(t, dt, 100, 40);
  t.end();
});
