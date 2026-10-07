
    include "nesdefs.dasm"

; NES full-screen tile viewer (nes.tiles, nes.tiles.attr).
; Data file layout: [CHR: 256 tiles x 16 bytes] [name table: 32x30]
; [attribute table: 64] [palette: PAL_BYTES]
; The file is placed in PRG ROM to copy the name/attribute tables and
; palette to the PPU, and again in CHR ROM for the tile patterns.

PAL_BYTES = $PAL_BYTES     ; 4 (one palette) or 16 (four palettes)
NAMETABLE_OFS = 256*16
PALETTE_OFS = NAMETABLE_OFS + 1024

;;;;; VARIABLES

    seg.u ZEROPAGE
    org $0

;;;;; NES CARTRIDGE HEADER

    NES_HEADER 0,2,1,0 ; mapper 0, 2 PRGs, 1 CHR, horiz. mirror

;;;;; START OF CODE
Start:
    NES_INIT	; set up stack pointer, turn off PPU
    jsr WaitSync	; wait for VSYNC
    jsr ClearRAM	; clear RAM
    jsr WaitSync	; wait for VSYNC (and PPU warmup)
    jsr SetPalette
    jsr FillVRAM
; reset PPU address and scroll registers
    lda #0
    sta PPU_ADDR
    sta PPU_ADDR	; PPU addr = $0000
    sta PPU_SCROLL
    sta PPU_SCROLL  ; PPU scroll = $0000
; activate PPU graphics
    lda #MASK_BG | %00000010 ; show BG in leftmost 8 pixels
    sta PPU_MASK 	; enable rendering
    lda #CTRL_NMI
    sta PPU_CTRL	; enable NMI
.endless
    jmp .endless	; endless loop

; copy palette to $3f00
SetPalette: subroutine
    PPU_SETADDR $3f00
    ldx #0
.loop:
    lda ImageData+PALETTE_OFS,x
    sta PPU_DATA
    inx
    cpx #PAL_BYTES
    bne .loop
    rts

; copy name table + attribute table (4 pages) to $2000
    MAC COPYPAGE
    ldx #0
.loop:
    lda ImageData+NAMETABLE_OFS+{1}*256,x
    sta PPU_DATA
    inx
    bne .loop
    ENDM

FillVRAM: subroutine
    PPU_SETADDR $2000
    COPYPAGE 0
    COPYPAGE 1
    COPYPAGE 2
    COPYPAGE 3
    rts

;;;;; COMMON SUBROUTINES

    include "nesppu.dasm"

;;;;; INTERRUPT HANDLERS

NMIHandler:
    rti		; return from interrupt

;;;;; CONSTANT DATA

ImageData:
    incbin "$DATAFILE"

;;;;; CPU VECTORS

    NES_VECTORS

;;;;; TILE SETS

    org $10000
    incbin "$DATAFILE"
    ds $12000-.	; pad CHR ROM to 8KB
