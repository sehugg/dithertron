import { t } from "tap";
import { doTest } from "../test-utils";
import * as kernels from "../../src/dither/kernels";

doTest('atari8.d', 'cezanne2.jpg', { maxiters: 5, quality: 140, paletteDiversity: 1.0, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
doTest('atari8.f.10', 'cezanne2.jpg', { maxiters: 5, quality: 60, paletteDiversity: 1.0, diffuse: 0.5, ditherfn: kernels.SIERRALITE });
