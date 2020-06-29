
function hex(v:number, nd?:number) {
    if (!nd) nd = 2;
    return toradix(v,nd,16);
}
function toradix(v:number, nd:number, radix:number) {
    try {
        var s = v.toString(radix).toUpperCase();
        while (s.length < nd)
        s = "0" + s;
        return s;
    } catch (e) {
        return v+"";
    }
}
  
type PixelEditorImageFormat = {
    w?:number
    h?:number
    count?:number
    bpp?:number
    np?:number
    bpw?:number
    sl?:number
    pofs?:number
    remap?:number[]
    brev?:boolean
    flip?:boolean
    destfmt?:PixelEditorImageFormat
    xform?:string
    skip?:number
    aspect?:number
  };
  function remapBits(x:number, arr:number[]) : number {
    if (!arr) return x;
    var y = 0;
    for (var i=0; i<arr.length; i++) {
      var s = arr[i];
      if (s < 0) {
        s = -s-1;
        y ^= 1 << s;
      }
      if (x & (1 << i)) {
        y ^= 1 << s;
      }
    }
    return y;
}
function convertImagesToWords(images:Uint8Array[], fmt:PixelEditorImageFormat) : number[] {
    if (fmt.destfmt) fmt = fmt.destfmt;
    var width = fmt.w;
    var height = fmt.h;
    var count = fmt.count || 1;
    var bpp = fmt.bpp || 1;
    var nplanes = fmt.np || 1;
    var bitsperword = fmt.bpw || 8;
    var wordsperline = fmt.sl || Math.ceil(fmt.w * bpp / bitsperword);
    var mask = (1 << bpp)-1;
    var pofs = fmt.pofs || wordsperline*height*count;
    var skip = fmt.skip || 0;
    var words;
    if (nplanes > 0 && fmt.sl) // TODO?
        words = new Uint8Array(wordsperline*height*count);
    else if (bitsperword <= 8)
        words = new Uint8Array(wordsperline*height*count*nplanes);
    else
        words = new Uint32Array(wordsperline*height*count*nplanes);
    for (var n=0; n<count; n++) {
        var imgdata = images[n];
        var i = 0;
        for (var y=0; y<height; y++) {
            var yp = fmt.flip ? height-1-y : y;
            var ofs0 = n*wordsperline*height + yp*wordsperline;
            var shift = 0;
            for (var x=0; x<width; x++) {
                var color = imgdata[i++];
                var ofs = remapBits(ofs0, fmt.remap);
                for (var p=0; p<nplanes; p++) {
                    var c = (color >> (p*bpp)) & mask;
                    words[ofs + p*pofs + skip] |= (fmt.brev ? (c << (bitsperword-shift-bpp)) : (c << shift));
                }
                shift += bpp;
                if (shift >= bitsperword) {
                    ofs0 += 1;
                    shift = 0;
                }
            }
        }
    }
    return words;
}
function concatArrays(arrays: Uint8Array[]) : Uint8Array {
    var total = 0;
    arrays.forEach((a) => { total += a.length });
    var dest = new Uint8Array(total);
    total = 0;
    arrays.forEach((a) => { dest.set(a, total); total += a.length });
    return dest;
}
function exportFrameBuffer(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var fmt = settings.exportFormat;
    fmt.w = img.width;
    fmt.h = img.height;
    return new Uint8Array(convertImagesToWords([img.indexed], fmt));
}
function exportApple2HiresToHGR(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    // TODO: handle other dimensions
    var data = new Uint8Array(0x2000);
    var srcofs = 0;
    for (var y=0; y<img.height; y++) {
        var destofs = (y&7)*0x400 + ((y>>3) & 7)*0x80 + (y>>6)*0x28;
        for (var x=0; x<img.width; x+=7) {
            var z = 0;
            var hibit = 0;
            for (var i=0; i<7; i++) {
                var col = img.indexed[srcofs++];
                if (col == 3 || col == 4) hibit |= 0x80;
                if (col >= 3) col -= 2;
                z |= (col << i*2);
            }
            data[destofs++] = (z & 0x7f) | hibit;
            data[destofs++] = ((z >> 7) & 0x7f) | hibit;
        }
    }
    return data;
}
// TODO: support VIC-20
function exportCharMemory(img:PixelsAvailableMessage, w:number, h:number) : Uint8Array {
    var bpp = (w == 4) ? 2 : 1; // C64-multi vs C64-hires & ZX
    var i = 0;
    var cols = img.width / w;
    var rows = img.height / h;
    var char = new Uint8Array(img.width * img.height * bpp / 8);
    for (var y=0; y<img.height; y++) {
        for (var x=0; x<img.width; x++) {
            var charofs = Math.floor(x / w) + Math.floor(y / h) * cols;
            var param = img.params[charofs];
            var ofs = charofs * h + (y & (h-1));
            var shift = (x & (w-1)) * bpp;
            shift = 8 - bpp - shift; // reverse bits
            var palidx = img.indexed[i];
            var idx = 0;
            if (bpp == 1) {
                if (palidx == (param & 0xf))
                    idx = 1;
            } else {
                if (palidx == (param & 0xf))
                    idx = 2; // lower nibble
                else if (palidx == ((param >> 4) & 0xf))
                    idx = 1; // upper nibble
                else if (palidx == ((param >> 8) & 0xf))
                    idx = 3; // color ram
            }
            char[ofs] |= idx << shift;
            i++;
        }
    }
    return char;
}
function exportC64Multi(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var w = settings.block.w;
    var h = settings.block.h;
    var cols = img.width / w;
    var rows = img.height / h;
    var screen = new Uint8Array(cols * rows);
    var color = new Uint8Array(cols * rows);
    for (var i=0; i<screen.length; i++) {
        screen[i] = img.params[i];
        color[i] = img.params[i] >> 8;
    }
    var char = exportCharMemory(img, w, h);
    var xtraword = img.params[img.params.length - 1]; // background, border colors
    var xtra = new Uint8Array(2);
    xtra[0] = xtraword & 0xff;
    xtra[1] = (xtraword << 8) & 0xff;
    return concatArrays([char, screen, color, xtra]);
}
function exportC64Hires(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var w = settings.block.w;
    var h = settings.block.h;
    var cols = img.width / w;
    var rows = img.height / h;
    var screen = new Uint8Array(cols * rows);
    for (var i=0; i<screen.length; i++) {
        var p = img.params[i] & 0xff;
        screen[i] = (p << 4) | (p >> 4);
    }
    var char = exportCharMemory(img, w, h);
    return concatArrays([char, screen]);
}
function exportTMS9918(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var w = settings.block.w;
    var h = settings.block.h;
    var cols = img.width / w;
    var rows = img.height / h;
    var screen = new Uint8Array(cols * rows); // 32 x 24
    for (var i=0; i<screen.length; i++) {
        // x[0..4] y[0..7] -> y[0..2] x[0..4] y[3..7]
        var p = img.params[i] & 0xff;
        var x = i & 31;
        var y = i >> 5;
        var ofs = (y & 7) | (x << 3) | ((y >> 3) << 8);
        screen[ofs] = p; //(p << 4) | (p >> 4);
    }
    var char = exportCharMemory(img, 8, 8);
    return concatArrays([char, screen]);
}
function exportNES(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var i = 0;
    var cols = img.width / 8;
    var rows = img.height / 8;
    var char = new Uint8Array(img.width * img.height * 2 / 8);
    for (var y=0; y<img.height; y++) {
        for (var x=0; x<img.width; x++) {
            var charofs = Math.floor(x / 8) + Math.floor(y / 8) * cols;
            var ofs = charofs * 16 + (y & 7);
            var shift = 7 - (x & 7);
            var idx = img.indexed[i];
            char[ofs] |= (idx & 1) << shift;
            char[ofs+8] |= ((idx>>1) & 1) << shift;
            i++;
        }
    }
    return char;
}
function exportNES5Color(img:PixelsAvailableMessage, settings:DithertronSettings) : Uint8Array {
    var char = exportFrameBuffer(img, settings);
    // TODO: attr block format
    var fmt = {w:settings.block.w, h:settings.block.h, bpp:2};
    var attr = new Uint8Array(convertImagesToWords([img.indexed], fmt));
    return concatArrays([char, attr]);
}

function convertToSystemPalette(pal : Uint32Array, syspal : number[]) {
    return pal.map((rgba) => syspal.indexOf(rgba & 0xffffff));
}

//

function getFilenamePrefix() {
    var fn = filenameLoaded || "image";
    try { fn = fn.split('.').shift(); } catch (e) { } // remove extension
    return fn + "-" + dithertron.settings.id;
}

function getNativeFormatData() {
    var img = dithertron.lastPixels;
    var fn = window[dithertron.settings.toNative];
    return img && fn && fn(img, dithertron.settings);
}
function downloadNativeFormat() {
    var data = getNativeFormatData();
    if (data != null) {
        var blob = new Blob([data], {type: "application/octet-stream"});
        saveAs(blob, getFilenamePrefix() + ".bin");
    }
}
function downloadImageFormat() {
    dest.toBlob((blob) => {
        saveAs(blob, getFilenamePrefix() + ".png");
    }, "image/png");
}
function addHiddenField(form, name, val) {
    $('<input type="hidden"/>').attr('name', name).val(val).appendTo(form);
}
function byteArrayToString(data : number[] | Uint8Array) : string {
  var str = "";
  if (data != null) {
    var charLUT = new Array();
    for (var i = 0; i < 256; ++i)
      charLUT[i] = String.fromCharCode(i);
    var len = data.length;
    for (var i = 0; i < len; i++)
      str += charLUT[data[i]];
  }
  return str;
}
function stringToByteArray(s:string) : Uint8Array {
    var a = new Uint8Array(s.length);
    for (var i=0; i<s.length; i++)
        a[i] = s.charCodeAt(i);
    return a;
}
function getCodeConvertFunction() : () => string {
    var convertFuncName = 'getFileViewerCode_' + dithertron.settings.id.replace(/[^a-z0-9]/, '_');
    var convertFunc = window[convertFuncName];
    return convertFunc;
}
async function gotoIDE(e) {
    if (confirm("Open image in 8bitworkshop?")) {
        //e.target.disabled = true;
        var platform_id = dithertron.settings.id.split('.')[0];
        var form = $(document.forms['ideForm'] as HTMLFormElement);
        form.empty();
        addHiddenField(form, "platform", platform_id);
        // TODO
        var codeFilename = "viewer-" + getFilenamePrefix() + ".asm";
        var dataFilename = getFilenamePrefix() + ".bin";
        addHiddenField(form, "file0_name", codeFilename);
        var code = getCodeConvertFunction()();
        code = code.replace("$DATAFILE", getFilenamePrefix() + ".bin");
        addHiddenField(form, "file0_data", code);
        addHiddenField(form, "file0_type", "utf8");
        addHiddenField(form, "file1_name", dataFilename);
        addHiddenField(form, "file1_data", btoa(byteArrayToString(getNativeFormatData())));
        addHiddenField(form, "file1_type", "binary");
        form.submit();
    }
}

function getFileViewerCode_c64_multi() : string {
    var code = `
    processor 6502
    include "basicheader.dasm"

Src equ $02
Dest equ $04

Start:
    lda #$38   ; 25 rows, on, bitmap
    sta $d011  ; VIC control #1
    lda #$18   ; 40 column, multicolor
    sta $d016  ; VIC control #2
    lda #$02
    sta $dd00  ; set VIC bank ($4000-$7FFF)
    lda #$80
    sta $d018  ; set VIC screen to $6000
    lda XtraData+0
    sta $d020  ; border
    sta $d021  ; background
    lda #0
    sta Dest
; copy char memory
    lda #<CharData
    sta Src
    lda #>CharData
    sta Src+1
    lda #$40
    sta Dest+1
    ldx #$20
    jsr CopyMem
; copy screen memory
    lda #<ScreenData
    sta Src
    lda #>ScreenData
    sta Src+1
    lda #$60
    sta Dest+1
    ldx #$04
    jsr CopyMem
; copy color RAM
    lda #<ColorData
    sta Src
    lda #>ColorData
    sta Src+1
    lda #$d8
    sta Dest+1
    ldx #4
    jsr CopyMem
; infinite loop
    jmp .

; copy data from Src to Dest
; X = number of bytes * 256
CopyMem
    ldy #0
.Loop
    lda (Src),y
    sta (Dest),y
    iny
    bne .Loop
    inc Src+1
    inc Dest+1
    dex
    bne .Loop
    rts

; bitmap data
CharData equ .
ScreenData equ CharData+8000
ColorData equ ScreenData+1000
XtraData equ ColorData+1000
	incbin "$DATAFILE"
`;
    return code;
}

function getFileViewerCode_c64_hires() : string {
    var code = getFileViewerCode_c64_multi();
    code = code.replace('lda #$18','lda #$08').replace('multicolor','single');
    return code;
}

function getFileViewerCode_apple2_hires() : string {
    var code = `
    processor 6502
    seg Code
    org $803	; start of program
Start:
    sta $c050	; set graphics
    sta $c052	; no mixed mode
    sta $c057	; set hires
    jmp Start	; infinite loop

    org $2000	; start of hires page 1
    incbin "$DATAFILE"
`;
    return code;
}

function getFileViewerCode_nes() : string {
    var code = `

	include "nesdefs.dasm"

;;;;; VARIABLES

	seg.u ZEROPAGE
	org $0

;;;;; NES CARTRIDGE HEADER

	NES_HEADER 0,2,1,0 ; mapper 0, 2 PRGs, 1 CHR, horiz. mirror

;;;;; START OF CODE
Start:
; wait for PPU warmup; clear CPU RAM
; byte $02
	NES_INIT	; set up stack pointer, turn off PPU
    jsr WaitSync	; wait for VSYNC
    jsr ClearRAM	; clear RAM
    jsr WaitSync	; wait for VSYNC (and PPU warmup)
; set palette and nametable VRAM
	jsr SetPalette	; set palette colors
    jsr FillVRAM	; print message in name table
; reset PPU address and scroll registers
    lda #0
    sta PPU_ADDR
    sta PPU_ADDR	; PPU addr = $0000
    sta PPU_SCROLL
    sta PPU_SCROLL  ; PPU scroll = $0000
; activate PPU graphics
    lda #MASK_BG
    sta PPU_MASK 	; enable rendering
    lda #CTRL_NMI
    sta PPU_CTRL	; enable NMI
.endless
	jmp .endless	; endless loop

; set palette colors
SetPalette: subroutine
; set PPU address to palette start
	PPU_SETADDR $3f00
    ldy #0
.loop:
	lda Palette,y	; lookup byte in ROM
	sta PPU_DATA	; store byte to PPU data
    iny		; Y = Y + 1
    cpy #4		; is Y equal to max colors?
	bne .loop	; not yet, loop
    rts		; return to caller

; fill video RAM with "Hello World" msg
FillVRAM: subroutine
; set PPU address to name table A
	PPU_SETADDR $2000
    ldy #12		; # of rows
    lda #1		; first tile index
.nextrow
    ldx #20		; # of columns
.loop:
	sta PPU_DATA	; store+advance PPU
    clc
    adc #1
    dex
    bne .loop
    pha
    lda #$00	; blank
    REPEAT 12	; 32 - 20 = 12 cols/row
	sta PPU_DATA	; store+advance PPU
    REPEND
    pla
    dey
    bne .nextrow
.end
    rts		; return to caller

;;;;; COMMON SUBROUTINES

	include "nesppu.dasm"

;;;;; INTERRUPT HANDLERS

NMIHandler:
	rti		; return from interrupt

;;;;; CONSTANT DATA

Palette:
	hex 1f;screen color
    hex 01112100;background 0

;;;;; CPU VECTORS

	NES_VECTORS

;;;;; TILE SETS

	org $10000
    ds 16	; blanks
    incbin "$DATAFILE"
`;
    var palinds = convertToSystemPalette(dithertron.lastPixels.pal, dithertron.settings.pal);
    code = code.replace('hex 1f;screen color', 'hex '+hex(palinds[0]));
    code = code.replace('hex 01112100;background 0', 'hex '+hex(palinds[1])+hex(palinds[2])+hex(palinds[3])+hex(0));
    return code;
}

function getFileViewerCode_msx() : string {
    var code = `
    ORG     04000H
; MSX cartridge header @ 0x4000 - 0x400f
    dw 0x4241
    dw Start
    dw Start
    dw 0,0,0,0,0

CHMOD   EQU   05fh
WRTVRM  EQU   04dh
LDIRVM  EQU   05ch

PATTERN equ 0h
NAME    equ 1800h
COLOR   equ 2000h

Start:
Data:
    ld a,2
    call CHMOD  ; screen mode 2
    ld bc,1800h
    ld hl,ImageData
    ld de,PATTERN
    call LDIRVM ; copy pattern table
    ld bc,1800h
    ld hl,ImageData+1800h
    ld de,COLOR
    call LDIRVM ; copy color table
Infinite:
    jmp Infinite ; loop forever

ImageData:
    incbin "$DATAFILE"
`;
    return code;
}
