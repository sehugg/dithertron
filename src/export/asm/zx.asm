
    org  0x5ccb     ; start of code

Start
    ld	de,0x4000   ; DE = screen
    ld	hl,ImgData  ; HL = image data
    ld 	bc,0x1b00   ; 6144 bytes bitmap, 768 bytes attributes
    ldir            ; copy
Loop
    jp	loop        ; infinite loop

ImgData             ; data file
    incbin "$DATAFILE"

    org 0xff57
    defb 00h        ; end of ROM
