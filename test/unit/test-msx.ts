import { t } from "tap";
import { doTest } from "../test-utils";
import * as kernels from "../../src/dither/kernels";

doTest('msx', 'keyssunset.jpg', { maxiters: 20, quality: 100, diffuse: 0.6, ditherfn: kernels.SIERRALITE });
doTest('msx', 'dhuku.jpg', { maxiters: 20, quality: 130, diffuse: 0.65, ditherfn: kernels.SIERRALITE });
