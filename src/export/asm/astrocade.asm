
    INCLUDE "hvglib.h"      ; Include HVGLIB library
    ORG     FIRSTC          ; Initialize at beginning of cartridge ROM area
    DB      $55             ; ... with the code for a normal menued cartridge
    DW      MENUST          ; Initialize menu
    DW      PrgName         ; ... with string at PrgName
    DW      PrgStart        ; ... such that selecting the program enters PrgStart
PrgName:    DB      "BITMAP VIEWER" ; String
    DB      0               ; ... which must be followed by 0
PrgStart:   DI                      ; Disable interrupts
    SYSTEM  INTPC           ; Begin interpreter mode
    DO      SETOUT          ; Set output ports
    DB      98*2            ; ... with VBLANK line set to line 98
    DB      160/4           ; ... with color boundary
    DB      00001000b       ; ... with screen interrupts reenabled 
    DO      COLSET          ; Set color palettes
    DW      Palettes        ; ... with the values at Palettes
    DO      MOVE            ; Move memory
    DW      NORMEM          ; ... destination start of screen
    DW      40*98           ; ... number of bytes
    DW      BitmapData      ; ... source in ROM
    EXIT                    ; Exit interpreter mode
Loop:
    JP      Loop            ; Play infinite loop
Palettes:
    DB      $b3,$b2,$b1,$b0 ; Left color palette (11b, 10b, 01b, 00b)
    DB      $c3,$c2,$c1,$c0 ; Right color palette (11b, 10b, 01b, 00b)
BitmapData:
    incbin "$DATAFILE"
