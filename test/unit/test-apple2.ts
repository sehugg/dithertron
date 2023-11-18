import { t } from "tap";
import { doTest } from "../test-utils";

doTest('apple2.hires', 'myersflat.jpg', { maxiters: 10, quality: 100, diffuse: 0.5 });
doTest('apple2.lores', 'myersflat.jpg', { maxiters: 5, quality: 100, diffuse: 0.5 });
doTest('apple2.dblhires', 'myersflat.jpg', { maxiters: 5, quality: 60, diffuse: 0.5 });
