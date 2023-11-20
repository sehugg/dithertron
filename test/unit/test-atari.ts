import { t } from "tap";
import { doTest } from "../test-utils";

doTest('atari8.d', 'cezanne2.jpg', { maxiters: 5, quality: 140, diffuse: 0.5 });
doTest('atari8.f.10', 'cezanne2.jpg', { maxiters: 5, quality: 60, diffuse: 0.5 });
