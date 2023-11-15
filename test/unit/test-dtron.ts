
import t from 'tap';

import fs from 'fs';
import jpeg from 'jpeg-js';
import pica from 'pica';

import { Dithertron } from '../../src/dither/dithertron';
import { SYSTEM_LOOKUP } from '../../src/settings/systems';
import { DithertronSettings } from '../../src/common/types';
import * as kernels from "../../src/dither/kernels";

const MAX_ITERS = 50;

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
  t.ok(sys != null);
  dt.setSettings(sys);
  const imagedata = await fetchImageData('./images/' + imagename, sys);
  dt.setSourceImage(imagedata);
  t.ok(dt.timer == null, "timer should not be started");
  return dt;
}

async function startDither(sysid: string, imgfilename: string) {
  const dt = await loadDither(sysid, imgfilename);
  const testid = sysid + '-' + imgfilename.split('.')[0];
  return await doDither(dt, testid);
}

async function doDither(dt: Dithertron, testid: string) {
  let iters = 0;
  dt.clear();
  while (dt.iterate() && iters < MAX_ITERS) {
    iters++;
  }
  t.ok(dt.dithcanv != null);
  t.ok(dt.dithcanv?.img != null);
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
  t.ok(dt.timer == null, "timer should not be started");
  return { dt, testid, iters };
}

t.test("Can dither c64.multi", async t => {
  var dt = await loadDither('c64.multi', 'seurat.jpg');
  t.test("No diffusion", async t => {
    // no diffusion
    var { iters } = await doDither(dt, 'c64.multi-1');
    t.ok(iters < 10, "less than 10 iterations");
    t.end();
  });
  t.test("With some diffusion", async t => {
    // with diffusion
    dt.sysparams.diffuse = 0.25;
    dt.sysparams.ditherfn = kernels.SIERRALITE;
    var { iters } = await doDither(dt, 'c64.multi-2');
    t.ok(iters < 25, "less than 25 iterations");
    t.end();
  });
});
