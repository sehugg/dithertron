
// file imports for esbuild

// @ts-ignore
import asm_c64_multi from "./asm/c64_multi.asm";
// @ts-ignore
import asm_apple2_hires from "./asm/apple2_hires.asm";
// @ts-ignore
import asm_nes from "./asm/nes.asm";
// @ts-ignore
import asm_msx from "./asm/msx.asm";
// @ts-ignore
import asm_vcs from "./asm/vcs.asm";
// @ts-ignore
import asm_astrocade from "./asm/astrocade.asm";
// @ts-ignore
import asm_atari8_d from "./asm/atari8_d.asm";
// @ts-ignore
import asm_zx from "./asm/zx.asm";
// @ts-ignore
import asm_cpc from "./asm/cpc.asm";
// @ts-ignore
import asm_c64_fli from "./asm/c64_fli.asm";

import { dithertron } from "../ui/ui";
import { hex } from "../common/util";
import { convertToSystemPalette } from "../common/color";

///

export function getFileViewerCode_c64_multi(): string {
    return asm_c64_multi;
}

export function getFileViewerCode_c64_hires(): string {
    var code = getFileViewerCode_c64_multi();
    code = code.replace('lda #$18', 'lda #$08').replace('multicolor', 'single');
    return code;
}

export function getFileViewerCode_apple2_hires(): string {
    return asm_apple2_hires;
}

export function getFileViewerCode_nes(): string {
    var code = asm_nes;
    var palinds = convertToSystemPalette(dithertron.lastPixels.pal, dithertron.settings.pal);
    code = code.replace('hex 1f;screen color', 'hex ' + hex(palinds[0]));
    code = code.replace('hex 01112100;background 0', 'hex ' + hex(palinds[1]) + hex(palinds[2]) + hex(palinds[3]) + hex(0));
    return code;
}

export function getFileViewerCode_msx(): string {
    return asm_msx;
}

export function getFileViewerCode_vcs(): string {
    var code = asm_vcs;
    var palinds = convertToSystemPalette(dithertron.lastPixels.pal, dithertron.settings.pal);
    code = code.replace('#$F6', '#$' + hex(palinds[0]));
    code = code.replace('#$F7', '#$' + hex(palinds[1]));
    return code;
}

export function getFileViewerCode_astrocade(): string {
    var code = asm_astrocade;
    var palinds = convertToSystemPalette(dithertron.lastPixels.pal, dithertron.settings.pal);
    code = code.replace('$b0', '$' + hex(palinds[0]));
    code = code.replace('$b1', '$' + hex(palinds[1]));
    code = code.replace('$b2', '$' + hex(palinds[2]));
    code = code.replace('$b3', '$' + hex(palinds[3]));
    return code;
}

export function getFileViewerCode_atari8_d() {
    var code = asm_atari8_d;
    var palinds = convertToSystemPalette(dithertron.lastPixels.pal, dithertron.settings.pal);
    for (var i = 0; i < palinds.length; i++)
        code = code.replace('$00;PF' + i, '$' + hex(palinds[i]));
    return code;
}

export function getFileViewerCode_atari8_f_10() {
    let code = getFileViewerCode_atari8_d();
    code = code.replace('.byte $4d', '.byte $4f');
    code = code.replace('.byte $0d', '.byte $0f');
    code = code.replace('#$00;PRIOR', '#$80');
    code = code.replace('COLOR0+4', 'PCOLR0+0');
    code = code.replace('COLOR0+0', 'PCOLR0+1');
    code = code.replace('COLOR0+1', 'PCOLR0+2');
    code = code.replace('COLOR0+2', 'PCOLR0+3');
    code = code.replace(';GPIOMODE equ 1', 'GPIOMODE equ 1');
    return code;
}

export function getFileViewerCode_zx() {
    var code = asm_zx;
    return code;
}

export function getFileViewerCode_zx_dark() {
    return getFileViewerCode_zx(); 
}

export function getFileViewerCode_zx_bright() {
    return getFileViewerCode_zx(); 
}

export function getFileViewerCode_zx_dark_bright() {
    return getFileViewerCode_zx(); 
}

export function getFileViewerCode_zx_bright_dark() {
    return getFileViewerCode_zx(); 
}



// https://www.cpcwiki.eu/index.php/BIOS_Screen_Functions
// http://www.cpcmania.com/Docs/Programming/Painting_pixels_introduction_to_video_memory.htm
// https://www.cpcwiki.eu/index.php/CPC_Palette
export function getFileViewerCode_cpc(mode: number) {
    var code = asm_cpc;
    var palinds = convertToSystemPalette(dithertron.lastPixels.pal, dithertron.settings.pal);
    code = code.replace('$MODE', mode + "");
    for (var i = 0; i < 16; i++)
        code = code.replace('$c' + i, '$' + hex(palinds[i] || 0));
    return code;
}

export function getFileViewerCode_cpc_mode0(mode: number) {
    return getFileViewerCode_cpc(0);
}

export function getFileViewerCode_cpc_mode1(mode: number) {
    return getFileViewerCode_cpc(1);
}

export function getFileViewerCode_c64_fli(): string {
    var code = asm_c64_fli;
    return code;
}


export function getFileViewerCode_c64_hires_fli(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "0");
    return code;
}

export function getFileViewerCode_c64_hires_fli_bug(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "0");
    return code;
}

export function getFileViewerCode_c64_hires_fli_blank(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "0");
    return code;
}

export function getFileViewerCode_c64_multi_fli(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "1");
    return code;
}

export function getFileViewerCode_c64_multi_fli_bug(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "1");
    return code;
}

export function getFileViewerCode_c64_multi_fli_blank(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "1");
    return code;
}

export function getFileViewerCode_c64_multi_fli_blank_left(): string {
    let code = getFileViewerCode_c64_fli();
    code = code.replace("$USE_MULTI_MODE", "1");
    return code;
}
