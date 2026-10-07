import { DithertronSettings } from "../common/types";

// One line describing a system's output: size, colors, and tile limits.
export function getSystemInfo(sys: DithertronSettings): string {
    const parts = [sys.width + " x " + sys.height];
    const sub = sys.subPalettes;
    if (sub) {
        // each block (or area of blocks) picks one of several small palettes
        let s = sub.count + (sub.count === 1 ? " palette" : " palettes") + " of " + (sub.colors ?? sys.block?.colors) + " colors";
        if (sub.area) s += " per " + sub.area.w + "x" + sub.area.h;
        if (sub.sharedFirstColor) s += ", shared backdrop";
        parts.push(s);
        parts.push("from " + sys.pal.length + " colors");
    } else {
        if (sys.reduce) parts.push(sys.reduce + " out of " + sys.pal.length + " colors");
        else if (sys.pal) parts.push(sys.pal.length + " colors");
        if (sys.block) parts.push(sys.block.colors + " colors per block");
    }
    const tileSize = sys.cell ?? sys.block;
    if (tileSize && (sys.tiles || sub)) {
        const cells = Math.ceil(sys.width / tileSize.w) * Math.ceil(sys.height / tileSize.h);
        if (sys.tiles && sys.tiles.max < cells)
            parts.push(sys.tiles.max + " shared tiles for " + cells + " cells");
        else
            parts.push(cells + " unique tiles");
    }
    return parts.join(", ");
}
