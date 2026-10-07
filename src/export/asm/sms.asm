
; Master System / Game Gear tile viewer (shared by both systems).
; Data file layout: [tiles: 32 bytes each, shared between cells]
; [name table: 2 bytes per cell: tile, flips, palette] [CRAM]

IMG_COLS    = $IMG_COLS       ; image size in tiles
IMG_ROWS    = $IMG_ROWS
IMG_COL0    = $IMG_COL0       ; first map column/row used on screen
IMG_ROW0    = $IMG_ROW0
CRAM_BYTES  = $CRAM_BYTES     ; 32 (SMS, 1 byte/color) or 64 (GG, 2 bytes/color)
TILE_BYTES  = $TILE_BYTES     ; size of the tile data

VDPDATA     = 0x0be
VDPCTRL     = 0x0bf
NAMETABLE   = 0x3800
SPRITETABLE = 0x3f00
BLANKTILE   = 0x1ff            ; unused tile (VRAM is cleared) for the margins

    .area _ROM (ABS)
    .org 0x0000
    di
    im 1
    ld sp,#0x0dff0
    jp Start

    .org 0x66
    retn                        ; NMI (Game Gear start button)

Start:
    ld hl,#VdpRegs
    ld b,#(VdpRegsEnd-VdpRegs)
    ld c,#VDPCTRL
    otir                        ; set up VDP registers, display still off

    ; clear all 16K of VRAM
    ld de,#0x4000
    call SetAddr
    ld bc,#0x4000
ClearLoop:
    xor a
    out (VDPDATA),a
    dec bc
    ld a,b
    or c
    jr nz,ClearLoop

    ; hide all sprites
    ld de,#(0x4000+SPRITETABLE)
    call SetAddr
    ld a,#0x0d0
    out (VDPDATA),a

    ; fill name table with the blank tile
    ld de,#(0x4000+NAMETABLE)
    call SetAddr
    ld bc,#(32*28)
FillLoop:
    ld a,#(BLANKTILE & 0x0ff)
    out (VDPDATA),a
    ld a,#(BLANKTILE >> 8)
    out (VDPDATA),a
    dec bc
    ld a,b
    or c
    jr nz,FillLoop

    ; tile patterns at VRAM $0000
    ld hl,#ImageData
    ld de,#0x4000
    call SetAddr
    ld bc,#TILE_BYTES
    call CopyVram

    ; name table: one row of the image at a time (32 entries per map row)
    ld de,#(0x4000+NAMETABLE+IMG_ROW0*64+IMG_COL0*2)
    ld b,#IMG_ROWS
RowLoop:
    push bc
    push de
    call SetAddr
    ld bc,#(IMG_COLS*2)
    call CopyVram
    pop de
    push hl
    ld hl,#64
    add hl,de
    ex de,hl
    pop hl
    pop bc
    djnz RowLoop

    ; palette (HL now points at the CRAM data)
    ld de,#0x0c000
    call SetAddr
    ld bc,#CRAM_BYTES
    call CopyVram

    ; display on
    ld a,#0x0c0
    out (VDPCTRL),a
    ld a,#0x81
    out (VDPCTRL),a
Forever:
    jr Forever

; DE = VDP address with command bits
SetAddr:
    ld a,e
    out (VDPCTRL),a
    ld a,d
    out (VDPCTRL),a
    ret

; copy BC bytes from (HL) to the VDP
CopyVram:
    ld a,(hl)
    out (VDPDATA),a
    inc hl
    dec bc
    ld a,b
    or c
    jr nz,CopyVram
    ret

VdpRegs:
    .db 0x04,0x80                  ; mode 4
    .db 0x80,0x81                  ; display off for now
    .db 0x0ff,0x82                 ; name table at $3800
    .db 0x0ff,0x85                 ; sprite table at $3f00
    .db 0x0ff,0x86                 ; sprite tiles at $2000
    .db 0x00,0x87                  ; backdrop = palette entry 0
    .db 0x00,0x88                  ; scroll X
    .db 0x00,0x89                  ; scroll Y
    .db 0x0ff,0x8a                 ; no line interrupts
VdpRegsEnd:

ImageData:
    .incbin "$DATAFILE"

; ROM header (data must end below $7ff0; 32KB ROM)
    .org 0x7ff0
    .ascii "TMR SEGA"
    .dw 0,0                      ; checksum (unchecked by emulators)
    .db 0,0,0                    ; product code, version
    .db $REGION                  ; region (high nibble) and ROM size (low nibble)
