
    org  0x4000     ; start of code
Start:
    ld  a,$MODE		; graphics mode
    call 0xbc0e		; SCR_SET_MODE
; set border color
    ld  hl,PalData
    ld  b,(hl)
    ld  c,b
    call 0xbc38		; SCR_SET_BORDER
    ld  b,0x10		; loop counter
; read palette from memory
    ld  hl,PalData+15
Loop1:
    push hl
    push bc
    ld  a,b
    dec a
    and a,0x0f
    ld  b,(hl)
    ld  c,b
    call 0xbc32		; SCR_SET_INK
    pop bc
    pop hl
    dec hl
    djnz Loop1
; set image bytes
    ld	de,0xc000   ; DE = screen
    ld	hl,ImgData  ; HL = image data
    ld 	bc,0x4000   ; BC = # of bytes   
    ldir            ; copy
Loop:
    jp	loop        ; infinite loop
PalData:
    db $c0,$c1,$c2,$c3,$c4,$c5,$c6,$c7
    db $c8,$c9,$c10,$c11,$c12,$c13,$c14,$c15
ImgData:            ; data file
    incbin "$DATAFILE"
