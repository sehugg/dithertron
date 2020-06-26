Dithertron
==========

This online tool converts full-color images to 8-bit retro formats,
performing cropping, downsampling, and dithering.

For some formats (e.g. C64 multicolor) it also searches for good palette colors for individual subblocks.

How To Use
----------

1. Upload an image, or select an example image from the pulldown.

2. Choose a target format.

3. Play with the sliders until you're happy with the result.

4. Download the final image (PNG) or a binary file that can be loaded into the target machine.


Graphics Formats Supported
--------------------------

* C-64 Multi - 160 x 200, 16 colors, 4 colors per 4x8 block
* C-64 Hires - 320 x 200, 16 colors, 2 colors per 8x8 block
* VIC-20 Multi - 80 x 160, 16 colors, 4 colors per 4x8 block
* NES (4 color) - 256 x 240, 4 out of 64 colors
* NES (5 color) - 256 x 240, 5 out of 64 colors, 4 colors per 16x16 block
* TMS9918A (Mode 2) - 256 x 192, 16 colors, 2 colors per 8x1 block
* ZX Spectrum - 256 x 192, 8 colors, 2 colors per 8x8 block
* BBC Micro (mode 2) - 160 x 256, 8 colors
* Amstrad CPC (mode 0) - 160 x 200, 16 out of 27 colors
* Apple ][ Double-Hires - 140 x 192, 16 colors
* Apple ][ Hires - 140 x 192, 6 colors, 4 colors per 7x1 block
* Apple ][ Lores - 40 x 48, 16 colors
* Bally Astrocade - 160 x 102, 4 out of 256 colors
* Atari VCS (Mono) - 40 x 192, 2 out of 256 colors
* Atari VCS (Color) - 40 x 192, 16 out of 256 colors
* Atari Mode E - 160 x 192, 4 out of 256 colors
* Atari Mode F - 80 x 192, 16 out of 256 colors
* Atari 7800 (160A) - 160 x 240, 4 out of 256 colors
* Atari 7800 (160B) - 160 x 240, 12 out of 256 colors
* Sega Master System - 176 x 144, 16 out of 64 colors
* EGA Mode 0Dh - 320 x 200, 16 out of 16 colors
* Williams Arcade - 304 x 256, 16 out of 256 colors


Development
-----

Install modules:
~~~~
npm i
~~~~
Build:
~~~~
./node_modules/.bin/tsc
~~~~

Then open `index.html` in browser.

TODO
----

* Allow download of data files for target system
* Import into 8bitworkshop
* Palette editing
* Search for optimal crop window
* Check pixel-exact source images
* Interlaced modes (VCS color)
* Refresh retains mode settings
* Set width and height
* Faster closest color lookup
