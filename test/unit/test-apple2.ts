import { t } from "tap";
import { doTest } from "../test-utils";
import * as kernels from "../../src/dither/kernels";

doTest('apple2.hires', 'myersflat.jpg', { maxiters: 10, quality: 100, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
doTest('apple2.lores', 'myersflat.jpg', { maxiters: 5, quality: 100, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
doTest('apple2.dblhires', 'myersflat.jpg', { maxiters: 5, quality: 60, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
