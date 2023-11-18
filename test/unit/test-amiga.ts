import { t } from "tap";
import { doTest } from "../test-utils";

// TODO? doTest('amiga.lores', 'colorswirls.jpg', { maxiters: 5, quality: 100, diffuse: 0.5 });
doTest('amiga.lores.ham6', 'colorswirls.jpg', { maxiters: 5, quality: 75, diffuse: 0.5 });
