import { doTest } from "../test-utils";

doTest('vic20.multi', 'seurat.jpg', { maxiters: 10, quality: 80, diffuse: 0.5 });
doTest('vic20.hires', 'keyssunset.jpg', { maxiters: 10, quality: 250, diffuse: 0.5 });
