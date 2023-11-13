
    processor 6502    
    include "atari.inc"

;GPIOMODE equ 1
    org     $a000           ;Start of left cartridge area
Start:
 ifconst GPIOMODE
    lda     #$80
    sta     GPRIOR
; set GTIA mode colors
    lda     #$00;PF4
    sta     COLOR0 + 0
    lda     #$00;PF5
    sta     COLOR0 + 1
    lda     #$00;PF6
    sta     COLOR0 + 2
    lda     #$00;PF7
    sta     COLOR0 + 3
    lda     #$00;PF8
    sta     COLOR0 + 4
 endif
; set non-GTIA mode colors
    lda     #$00;PF0
    sta     COLOR0+4
    lda     #$00;PF1
    sta     COLOR0+0
    lda     #$00;PF2
    sta     COLOR0+1
    lda     #$00;PF3
    sta     COLOR0+2
; set display list
    lda     #<dlist            ;Set Display list pointer
    sta     SDLSTL
    lda     #>dlist
    sta     SDLSTH
; enable DMI
    lda     #$22            ;Enable DMA
    sta     SDMCTL
; infinite loop
wait
    nop
    jmp     wait

;Graphics data
    align $100   ; ANTIC can only count to $FFF
ImgData1:
ImgData2 equ ImgData1+40*96
    incbin "$DATAFILE"

;Display list data
dlist
    .byte $70,$70,$70
    .byte $4d,#<ImgData1,#>ImgData1
    REPEAT 95
    .byte $0d
    REPEND
    ifconst GPIOMODE
    .byte $4f,#<ImgData2,#>ImgData2
    REPEAT 95
    .byte $0f
    REPEND
    endif
    .byte $41,$00,$10
dlistend equ .

;Cartridge footer
    org     CARTCS
    .word 	Start	; cold start address
    .byte	$00	; 0 == cart exists
    .byte	$04	; boot cartridge
    .word	Start	; start
