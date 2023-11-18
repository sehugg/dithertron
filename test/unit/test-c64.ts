import { t } from "tap";
import { doTest } from "../test-utils";
import * as kernels from "../../src/dither/kernels";

doTest('c64.multi', 'seurat.jpg', { maxiters: 10, quality: 120 });
doTest('c64.multi', 'seurat.jpg', { maxiters: 30, quality: 75, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
doTest('c64.multi.fli', 'seurat.jpg', { maxiters: 10, quality: 120 });
doTest('c64.multi.fli', 'seurat.jpg', { maxiters: 50, quality: 75, diffuse: 0.5, ditherfn: kernels.SIERRALITE });

doTest('c64.hires', 'keyssunset.jpg', { maxiters: 50, quality: 100, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
doTest('c64.hires.fli', 'keyssunset.jpg', { maxiters: 50, quality: 75, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
