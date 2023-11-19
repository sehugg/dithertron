import { t } from "tap";
import { doTest } from "../test-utils";

doTest('amiga.lores', 'colorswirls.jpg', { maxiters: 5, quality: 70, diffuse: 0.5 });
doTest('amiga.lores.ham6', 'colorswirls.jpg', { maxiters: 5, quality: 40, diffuse: 0.5 });
