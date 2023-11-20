import { t } from "tap";
import { doTest } from "../test-utils";

doTest('msx', 'keyssunset.jpg', { maxiters: 20, quality: 100, diffuse: 0.5 });
doTest('msx', 'dhuku.jpg', { maxiters: 20, quality: 130, diffuse: 0.5 });
