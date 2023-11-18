import { t } from "tap";
import { loadDither, doDither, compareWithRef, doTest } from "../test-utils";
import * as kernels from "../../src/dither/kernels";

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
