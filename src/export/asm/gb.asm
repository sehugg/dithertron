
; Game Boy / Game Boy Color tile viewer (shared by both systems), SDAS syntax.
; Data file layout: [tiles: 16 bytes each] and for CGB also
; [BG attributes: 1 byte per tile] [BG palette RAM: 64 bytes]

CGB         = $CGB              ; 1 = Game Boy Color
IMG_COLS    = $IMG_COLS         ; image size in tiles
IMG_ROWS    = $IMG_ROWS
IMG_COL0    = $IMG_COL0         ; first map column/row used on screen
IMG_ROW0    = $IMG_ROW0
TILES       = IMG_COLS*IMG_ROWS

rLCDC       = 0xff40
rLY         = 0xff44
rBGP        = 0xff47
rVBK        = 0xff4f
rBCPS       = 0xff68
rBCPD       = 0xff69

    .area _ROM (ABS)
    .org 0x100
    nop
    jp Start

; cartridge header
    .org 0x104
    .db 0xce,0xed,0x66,0x66,0xcc,0x0d,0x00,0x0b,0x03,0x73,0x00,0x83,0x00,0x0c,0x00,0x0d
    .db 0x00,0x08,0x11,0x1f,0x88,0x89,0x00,0x0e,0xdc,0xcc,0x6e,0xe6,0xdd,0xdd,0xd9,0x99
    .db 0xbb,0xbb,0x67,0x63,0x6e,0x0e,0xec,0xcc,0xdd,0xdc,0x99,0x9f,0xbb,0xb9,0x33,0x3e
    .ds 15                      ; title
    .db CGB*0x80                ; CGB flag (0x80 = works on DMG and CGB)
    .ds 9                       ; licensee, SGB, cart type, sizes, destination, version
    .db (-(CGB*0x80)-25)&0xff   ; header checksum
    .ds 2                       ; global checksum (unchecked)

    .org 0x150
Start:
    di
    ld sp,#0xfffe
vblank:
    ldh a,(rLY)
    cp #144
    jr c,vblank
    xor a
    ldh (rLCDC),a               ; LCD off so VRAM is writable

    ld a,#0b00011011
    ldh (rBGP),a                ; DMG shade order

    ; tile patterns at $8000 (unsigned indices 0..255)
    ld hl,#0x8000
    ld de,#ImageData
    ld bc,#(TILES*16)
copytiles:
    ld a,(de)
    inc de
    ld (hl+),a
    dec bc
    ld a,b
    or c
    jr nz,copytiles

    ; BG map: identity tile indices, one image row per 32-entry map row
    ld hl,#(0x9800+IMG_ROW0*32+IMG_COL0)
    ld c,#0
    ld d,#IMG_ROWS
maprow:
    ld b,#IMG_COLS
mapcol:
    ld a,c
    ld (hl+),a
    inc c
    dec b
    jr nz,mapcol
    ld a,l
    add a,#(32-IMG_COLS)
    ld l,a
    jr nc,mapnc
    inc h
mapnc:
    dec d
    jr nz,maprow

.if CGB
    ; BG attributes (palette number per tile) in VRAM bank 1, same map layout
    ld a,#1
    ldh (rVBK),a
    ld hl,#(0x9800+IMG_ROW0*32+IMG_COL0)
    ld de,#(ImageData+TILES*16)
    ld c,#IMG_ROWS
attrrow:
    ld b,#IMG_COLS
attrcol:
    ld a,(de)
    inc de
    ld (hl+),a
    dec b
    jr nz,attrcol
    ld a,l
    add a,#(32-IMG_COLS)
    ld l,a
    jr nc,attrnc
    inc h
attrnc:
    dec c
    jr nz,attrrow
    xor a
    ldh (rVBK),a

    ; 8 BG palettes x 4 colors x RGB555 (de points at the palette data)
    ld a,#0x80                  ; index 0, auto-increment
    ldh (rBCPS),a
    ld b,#64
palloop:
    ld a,(de)
    inc de
    ldh (rBCPD),a
    dec b
    jr nz,palloop
.endif

    ld a,#0b10010001            ; LCD on, BG on, tiles $8000, map $9800
    ldh (rLCDC),a
forever:
    halt
    nop
    jr forever

ImageData:
    .incbin "$DATAFILE"
