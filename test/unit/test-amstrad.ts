import { doTest } from "../test-utils";

doTest('cpc.mode0', 'seurat.jpg', { maxiters: 10, quality: 70, diffuse: 0.5 });
doTest('cpc.mode0', 'redrose.jpg', { maxiters: 10, quality: 85, diffuse: 0.5 });
