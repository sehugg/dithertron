# Dithertron

[![Dithertron CI](https://github.com/8bitworkshop/dithertron/actions/workflows/node.js.yml/badge.svg)](https://github.com/8bitworkshop/dithertron/actions/workflows/node.js.yml)
[![Try it online](https://img.shields.io/badge/try%20it-online-blue)](https://8bitworkshop.com/dithertron/)

Dithertron is an interactive, browser-based tool that converts full-color images into
full-screen 8-bit retro graphics formats. It performs cropping, resizing, palette
reduction, and dithering entirely in your browser.

**Try it online:** <https://8bitworkshop.com/dithertron/>

**Latest dev version:** <https://8bitworkshop.github.io/dithertron>

## How To Use

1. **Load an image** — use the *Examples* dropdown, click *Open…*, or drag/drop or
   paste an image anywhere on the page.
2. **Crop** the image with the handles on the left. The crop box is locked to the
   target aspect ratio.
3. **Choose a target format** from the *Convert to* dropdown.
4. **Tune the sliders** until you're happy with the result.
5. **Export** — download a PNG, download the native binary, or open a viewer code
   sample directly in [8bitworkshop](https://8bitworkshop.com).

Some formats (e.g. C64 multicolor, TMS9918A, ZX Spectrum, NES 5-color) split the screen
into small sub-blocks that can each display only 2–4 colors from a larger palette.
Neighboring sub-blocks affect each other when dithering is enabled, so Dithertron picks
good colors for every block and iterates until they stabilize — a simulated-annealing
approach with decreasing noise over time.

## Controls

| Control | Description |
|---------|-------------|
| **Bright** | Brightness. 50 is neutral. |
| **Contrast** | Contrast. 50 is neutral. |
| **Color** | Saturation. 50 is neutral, 0 is grayscale, 100 is doubled. Next to it is the **color error** function used when matching a pixel to a palette entry: Perceptual, Hue-Based, Distance, or Maximum. |
| **Diversity** | How eagerly block palettes pick new colors vs. reusing existing ones (reduced-palette modes only). Default 60. |
| **Diffusion** | How much error is diffused to neighboring pixels and the diffusion kernel. Default 75. |
| **Ordered** | Amount of ordered (Bayer) dithering blended in. Default 0. |
| **Noise** | Amount of annealing noise applied while choosing block colors (block-based modes only). Default 5. |

The reduced color palette is shown as swatches beneath the output canvas.

For modes with constrained palette choices (e.g. C64 Hires, ZX Spectrum, MSX/Coleco)
it usually helps to reduce the **Diffusion** parameter, otherwise dithering errors
accumulate and create blocky splotches.

## Exporting

* **PNG** — the dithered preview at its native resolution.
* **BIN** — the packed native binary for the selected format (only shown for
  formats that have a native exporter). Filenames are `<image>-<system>.bin`.
* **Open in 8bitworkshop** — assembles a viewer project around the exported binary
  and opens it in 8bitworkshop (only shown for formats with a code viewer).

## Development

Clone the main branch:

```sh
git clone -b master --single-branch https://github.com/8bitworkshop/dithertron.git
cd dithertron
```

Install dependencies and build:

```sh
npm install
make setup          # copies front-end deps into lib/ and fonts/ (use "make setupwin" on Windows)
npm run build       # builds gen/worker.js and gen/ui.js with esbuild
```

Start a development server with auto-rebuild:

```sh
make watch
```

Then open <http://localhost:8189>.

### Build scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build both worker and UI bundles |
| `npm run esbuild-worker` | Build just the web-worker bundle |
| `npm run esbuild-ui` | Build just the UI bundle |
| `npm run tsbuild` | Type-check/compile TypeScript into `./gen` |
| `npm run clean` | Remove the generated `./gen` directory |
| `make distro` | Assemble a deployable copy in `./tmp/dist` |

### Testing

```sh
npm run test        # unit tests + browser tests
npm run test-unit   # tap-based unit tests
npm run test-web    # Nightwatch headless browser tests
```

## TODO

* Palette editing
* Search for optimal crop window
* Check pixel-exact source images
* Interlaced modes (VCS color)
* Refresh retains mode settings
* Custom width and height (crop rect for non-full-screen)
* Faster closest color lookup

## License

Copyright © 2016-2026 [Steven Hugg](https://github.com/8bitworkshop).

This project is [GPL-3.0](https://github.com/8bitworkshop/8bitworkshop/blob/master/LICENSE) licensed.

Dependencies retain their original licenses.

All exported code is licensed under
[CC0](https://creativecommons.org/publicdomain/zero/1.0/).

## Graphics Formats

Formats in the first two groups can be exported natively (**Download native**); the
first group can also generate a runnable [8bitworkshop](https://8bitworkshop.com)
viewer project via the **Open in 8bitworkshop** button. The last group can only be
previewed and/or downloaded as an image.

### With 8bitworkshop code samples

* C-64 Multi - 160 x 200, 16 colors, 4 colors per 4x8 block
* C-64 Multi FLI (w/o bug) - 160 x 200, 16 colors, 4 colors per 4x1 block
* C-64 Multi FLI (with bug) - 160 x 200, 16 colors, 4 colors per 4x1 block
* C-64 Multi FLI (Left blank) - 160 x 200, 16 colors, 4 colors per 4x1 block
* C-64 Multi FLI (L/R blank) - 160 x 200, 16 colors, 4 colors per 4x1 block
* C-64 Hires - 320 x 200, 16 colors, 2 colors per 8x8 block
* C-64 Hires FLI (w/o bug) - 320 x 200, 16 colors, 2 colors per 8x1 block
* C-64 Hires FLI (with bug) - 320 x 200, 16 colors, 2 colors per 8x1 block
* C-64 Hires FLI (L/R blank) - 320 x 200, 16 colors, 2 colors per 8x1 block
* NES (4 color, 240 tiles) - 160 x 96, 4 out of 64 colors
* MSX/Coleco (TMS9918A) - 256 x 192, 16 colors, 2 colors per 8x1 block
* Apple ][ (Hires) - 140 x 192, 6 colors, 4 colors per 7x1 block
* Atari ANTIC (Mode D) - 160 x 96, 4 out of 256 colors
* Atari ANTIC (Mode E) - 160 x 192, 4 out of 256 colors
* Atari ANTIC (Mode F/10) - 80 x 192, 9 out of 256 colors
* Atari VCS - 40 x 192, 2 out of 256 colors
* Bally Astrocade - 160 x 98, 4 out of 256 colors
* ZX Spectrum - 256 x 192, 16 colors, 2 colors per 8x8 block
* ZX Spectrum (dark only) - 256 x 192, 16 colors, 2 colors per 8x8 block
* ZX Spectrum (bright only) - 256 x 192, 16 colors, 2 colors per 8x8 block
* ZX Spectrum (dark made bright only) - 256 x 192, 16 colors, 2 colors per 8x8 block
* ZX Spectrum (bright made dark only) - 256 x 192, 16 colors, 2 colors per 8x8 block
* Amstrad CPC (mode 0) - 160 x 200, 16 out of 27 colors
* Amstrad CPC (mode 1) - 320 x 200, 4 out of 27 colors
* NES (full screen, 4 colors, shared tiles) - 256 x 240, 4 out of 64 colors, 240 unique tiles
* NES (full screen, 13 colors, shared tiles) - 256 x 240, 13 out of 64 colors, 4 BG palettes per 16x16 area (attribute table)
* Game Boy Color (Tile Palettes) - 128 x 128, 4 colors per 8x8 tile, 8 shared BG palettes (tile attributes)
* Game Boy Classic (Tiles) - 128 x 128, 4 colors, 256 unique tiles
* Sega Master System (Tile Palettes) - 176 x 144, 16 colors per 8x8 tile, 2 shared BG palettes (name table + CRAM)
* Sega Game Gear (Tile Palettes) - 128 x 128, 16 colors per 8x8 tile, 2 shared BG palettes (name table + CRAM)

### Other native export formats

* Atari VCS (Color) - 40 x 192, 256 colors
* VIC-20 Hires - 160 x 160, 16 colors, 2 colors per 8x8 block
* VIC-20 Multi - 80 x 160, 16 colors, 4 colors per 4x8 block
* NES (1bpp tiles) - 256 x 256, 2 out of 32768 colors, 2 colors per 8x8 block
* NES (2bpp tiles) - 256 x 256, 4 out of 32768 colors, 4 colors per 8x8 block
* SNES (2bpp) - 256 x 256, 4 out of 32768 colors, 4 colors per 8x8 block
* SNES (3bpp) - 256 x 256, 8 out of 32768 colors, 8 colors per 8x8 block
* SNES (4bpp) - 256 x 256, 16 out of 32768 colors, 16 colors per 8x8 block
* SNES (8bpp) - 256 x 256, 256 out of 32768 colors, 256 colors per 8x8 block
* SNES (Mode 7) - 256 x 256, 256 out of 32768 colors, 256 colors per 8x8 block
* Neo Geo Pocket Color - 160 x 152, 64 out of 4096 colors, 4 colors per 8x8 block, 16 shared palettes
* Virtual Boy - 256 x 256, 4 out of 32768 colors, 4 colors per 8x8 block
* Sega Game Gear (4bpp linear) - 256 x 256, 16 out of 4096 colors, 16 colors per 8x8 block
* Genesis (4bpp) - 256 x 256, 16 out of 512 colors, 16 colors per 8x8 block
* Genesis (Tile Palettes) - 320 x 224, 64 out of 512 colors, 16 colors per 8x8 tile, 4 shared palettes with a shared backdrop color
* SNES (Direct Color) - 256 x 256, 2048 colors, 2048 colors per 8x8 block
* Intellivision (FGBG) - 64 x 64, 16 colors, 2 colors per 8x8 block
* Intellivision (Color Stack, GROM) - 160 x 96, 16 colors, 2 colors per 8x8 block
* Intellivision (Color Stack, GRAM) - 64 x 64, 16 colors, 2 colors per 8x8 block
* Intellivision (Color Stack, GROM+GRAM) - 160 x 96, 16 colors, 2 colors per 8x8 block
* Intellivision (Single BG, GROM) - 160 x 96, 16 colors, 2 colors per 8x8 block
* Intellivision (Single BG, GRAM) - 64 x 64, 16 colors, 2 colors per 8x8 block
* Intellivision (Single BG, GROM+GRAM) - 160 x 96, 16 colors, 2 colors per 8x8 block
* NES (4 color, full screen) - 256 x 240, 4 out of 64 colors
* NES (5 color, full screen) - 256 x 240, 5 out of 64 colors
* Amiga (Lores) - 320 x 256, 32 out of 4096 colors
* Amiga (Lores, HAM6) - 320 x 256, 16 out of 4096 colors
* Apple ][ (Lores) - 40 x 48, 16 colors
* PC CGA (Mode 04h, palette 1) - 320 x 200, 4 colors
* PC CGA (Mode 04h, bright 1) - 320 x 200, 4 colors
* PC CGA (Mode 04h, palette 2) - 320 x 200, 4 colors
* PC CGA (Mode 04h, bright 2) - 320 x 200, 4 colors
* PC CGA (Mode 05h) - 320 x 200, 4 colors
* PC CGA (Mode 05h, bright) - 320 x 200, 4 colors
* PC EGA (Mode 0Dh) - 320 x 200, 16 colors
* PC EGA (Mode 10h) - 640 x 350, 16 colors
* Bally MCR-II - 256 x 240, 64 out of 4096 colors, 4 colors per 16x16 block
* MC6847 (CG2, palette 0) - 128 x 64, 4 out of 4 colors
* MC6847 (CG2, palette 1) - 128 x 64, 4 out of 4 colors
* MC6847 (CG3, palette 0) - 128 x 96, 4 out of 4 colors
* MC6847 (CG3, palette 1) - 128 x 96, 4 out of 4 colors
* MC6847 (CG6, palette 0) - 128 x 192, 4 out of 4 colors
* MC6847 (CG6, palette 1) - 128 x 192, 4 out of 4 colors

### Preview only

* Atari 7800 (160A) - 160 x 240, 4 out of 256 colors
* Atari 7800 (160B) - 160 x 240, 12 out of 256 colors
* Sega Master System - 176 x 144, 16 out of 64 colors
* Sega Game Gear (full screen) - 160 x 144, 16 out of 4096 colors
* BBC Micro (mode 2) - 160 x 256, 8 colors
* Apple ][ (Double-Hires) - 140 x 192, 16 colors
* Apple IIGS (16 colors) - 320 x 200, 16 out of 4096 colors
* Fairchild Channel F - 102 x 58, 4 out of 4 colors
* Mac 128K - 512 x 342, 2 colors
* Williams Arcade - 304 x 256, 16 out of 256 colors
* PICO-8 - 128 x 128, 16 colors
* TIC-80 - 240 x 136, 16 colors
* Game Boy Classic (full screen) - 160 x 144, 4 colors
* Game Boy Color (full screen) - 160 x 144, 32 out of 32768 colors
* Commander X16 (Lores) - 320 x 240, 256 out of 4096 colors
* Commander X16 (Hires, cropped) - 640 x 400, 16 out of 4096 colors
* Compucolor - 160 x 192, 16 colors, 2 colors per 2x4 block
* Teletext - 80 x 72, 8 colors, 2 colors per 2x3 block
* Atari ST - 320 x 200, 16 out of 512 colors
* Atari VCS (48x48 bitmap) - 48 x 48, 2 out of 256 colors
* PC Engine (256x240) - 256 x 240, 16 out of 512 colors
* Phomemo D30 (landscape) - 288 x 88, 2 colors
* Phomemo D30 (portrait) - 88 x 288, 2 colors

The list above is generated from `src/settings/systems.ts`. Open the app with
`?printmeta` in the query string to print an up-to-date version to the console.

