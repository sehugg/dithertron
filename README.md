Dithertron
==========

[Try it online!](https://8bitworkshop.com/dithertron/)

This interactive web-based tool converts full-color images to full-screen 8-bit retro formats,
performing cropping, resizing, palette selection, and dithering.

Some formats (e.g. C64 multicolor, TMS9918A, ZX Spectrum, NES 5-color)
split the screen into smaller sub-blocks that each can only display 2 to 4 colors of a larger palette.
Neighboring sub-blocks may affect each other when dithering is enabled,
so Dithertron chooses good colors for each sub-block and iterates until they stabilize.

For modes with constrained palette choices (e.g. C64 Hires, ZX Spectrum, MSX/Coleco)
it might help to reduce the Dither parameter, otherwise the dither errors will accumulate
and create blocky splotches.


How To Use
----------

1. Upload an image, or select an example image from the pulldown.

2. Choose a target format.

3. Play with the sliders until you're happy with the result.

4. Download the final image (PNG), download a binary file, or open an image viewer code sample in 8bitworkshop.


Graphics Formats
----------------

These formats will export a sample 8bitworkshop project that displays the image:

* C-64 Multi - 160 x 200, 16 colors, 4 colors per 4x8 block
* C-64 Hires - 320 x 200, 16 colors, 2 colors per 8x8 block
* NES (4 color, 240 tiles) - 160 x 96, 4 out of 64 colors
* TMS9918A (Mode 2) - 256 x 192, 16 colors, 2 colors per 8x1 block
* Apple ][ Hires - 140 x 192, 6 colors, 4 colors per 7x1 block
* Atari ANTIC D - 160 x 96, 4 out of 256 colors
* Atari VCS - 40 x 192, 2 out of 256 colors
* Bally Astrocade - 160 x 98, 4 out of 256 colors
* ZX Spectrum - 256 x 192, 8 colors, 2 colors per 8x8 block
* Amstrad CPC (mode 0) - 160 x 200, 16 out of 27 colors
* Amstrad CPC (mode 1) - 320 x 200, 4 out of 27 colors

Other formats:

* NES (4 color, full screen) - 256 x 240, 4 out of 64 colors
* NES (5 color, full screen) - 256 x 240, 5 out of 64 colors
* Atari 7800 (160A) - 160 x 240, 4 out of 256 colors
* Atari 7800 (160B) - 160 x 240, 12 out of 256 colors
* Sega Master System - 176 x 144, 16 out of 64 colors
* BBC Micro (mode 2) - 160 x 256, 8 colors
* Apple ][ Double-Hires - 140 x 192, 16 colors
* Apple ][ Lores - 40 x 48, 16 colors
* Fairchild Channel F - 102 x 58, 4 out of 4 colors
* Mac 128K - 512 x 342, monochrome
* PC CGA Modes - 320 x 200, 4 colors
* PC EGA Mode 0Dh - 320 x 200, 16 out of 16 colors
* PC EGA Mode 10h - 640 x 350, 16 out of 16 colors
* Williams Arcade - 304 x 256, 16 out of 256 colors
* PICO-8 - 128 x 128, 16 colors
* TIC-80 - 240 x 136, 16 colors
* Game Boy Classic - 160 x 144, 4 colors
* Commander X16 - 320 x 240, 256 colors out of 4096
* Commander X16 - 640 x 400 (cropped to fit in VRAM), 16 colors out of 4096
* Amiga Lores - 320 x 256, 32 colors out of 4096
* Amiga Lores HAM6 - 320 x 256, 4096 colors via HAM


Development
-----

Install modules:
~~~~
npm i
~~~~
Build:
~~~~
npm run build
~~~~
Watch:
~~~~
make watch
~~~~

Then open `http://localhost:8189` in browser.


TODO
----

* Palette editing
* Search for optimal crop window
* Check pixel-exact source images
* Interlaced modes (VCS color)
* Refresh retains mode settings
* Custom width and height (crop rect for non-full-screen)
* Faster closest color lookup

## License

Copyright © 2016-2023 [Steven Hugg](https://github.com/sehugg).

This project is [GPL-3.0](https://github.com/sehugg/8bitworkshop/blob/master/LICENSE) licensed.

Dependencies retain their original licenses.

All exported code is licensed under
[CC0](https://creativecommons.org/publicdomain/zero/1.0/).


SAMPLE IMAGES
-------------

https://www.pexels.com/photo/dreamy-black-woman-in-bright-headscarf-near-rough-wall-4615699/
https://www.pexels.com/photo/creative-graffiti-wall-with-portrait-of-frida-kahlo-6424244/
