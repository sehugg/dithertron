import { t } from "tap";
import { doTest } from "../test-utils";

doTest('c64.multi', 'seurat.jpg', { maxiters: 10, quality: 120 });
doTest('c64.multi', 'seurat.jpg', { maxiters: 30, quality: 75, diffuse: 0.5 });
doTest('c64.multi.fli', 'seurat.jpg', { maxiters: 10, quality: 120 });
doTest('c64.multi.fli', 'seurat.jpg', { maxiters: 50, quality: 75, diffuse: 0.5 });

doTest('c64.hires', 'keyssunset.jpg', { maxiters: 50, quality: 100, diffuse: 0.5 });
doTest('c64.hires.fli', 'keyssunset.jpg', { maxiters: 50, quality: 75, diffuse: 0.5 });
