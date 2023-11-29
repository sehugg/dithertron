import { doTest } from "../test-utils";

doTest('zx', 'parrot.jpg', { maxiters: 10, quality: 225, diffuse: 0 });
doTest('zx', 'parrot.jpg', { maxiters: 10, quality: 150, diffuse: 0.5 });
