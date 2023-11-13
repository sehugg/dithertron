import { SYSTEMS, SYSTEM_LOOKUP } from "../settings/systems";
import { DitherSetting, DithertronSettings, PixelsAvailableMessage } from "../common/types";

import * as exportfuncs from "../export/exportfuncs";
import * as fileviewers from "../export/fileviewers";

declare var Cropper;
declare var pica;
declare var saveAs;

var cropper;

var brightSlider = document.getElementById('brightSlider') as HTMLInputElement;
var contrastSlider = document.getElementById('contrastSlider') as HTMLInputElement;
var saturationSlider = document.getElementById('saturationSlider') as HTMLInputElement;
var noiseSlider = document.getElementById('noiseSlider') as HTMLInputElement;
var diffuseSlider = document.getElementById('diffuseSlider') as HTMLInputElement;
var orderedSlider = document.getElementById('orderedSlider') as HTMLInputElement;
var diversitySlider = document.getElementById('diversitySlider') as HTMLInputElement;
var imageUpload = document.getElementById("imageUpload") as HTMLInputElement;
const image = document.getElementById('srcimage') as HTMLImageElement;
const resize = document.getElementById('resizecanvas') as HTMLCanvasElement;
const dest = document.getElementById('destcanvas') as HTMLCanvasElement;
//const cmdline = document.getElementById('cmdline');

class ProxyDithertron {
    settings: DithertronSettings;
    lastPixels: PixelsAvailableMessage;

    constructor(worker: Worker) {
        worker.onmessage = (ev) => {
            var data = ev.data;
            if (data != null) {
                //console.log('recv',data);
                if (data.img != null && this.pixelsAvailable != null) {
                    this.pixelsAvailable(data);
                    this.lastPixels = data;
                }
            }
        };
    }
    setSettings(settings: DithertronSettings) {
        this.settings = settings;
        worker.postMessage({ cmd: "setSettings", data: settings });
    }
    setSourceImage(img: Uint32Array) {
        worker.postMessage({ cmd: "setSourceImage", data: img });
    }
    reset() {
        worker.postMessage({ cmd: "reset" });
    }
    pixelsAvailable: (msg: PixelsAvailableMessage) => void;
}

const worker = new Worker("./gen/worker.js");

export const dithertron = new ProxyDithertron(worker);

var resizeImageData: Uint32Array;
var filenameLoaded: string;
var presetLoaded: string;

// DITHER SETTINGS
const DITHER_FLOYD = [[1, 0, 7 / 16], [-1, 1, 3 / 16], [0, 1, 5 / 16], [1, 1, 1 / 16]];
const DITHER_FALSEFLOYD = [[1, 0, 3 / 8], [0, 1, 3 / 8], [1, 1, 2 / 8]];
const DITHER_ATKINSON = [[1, 0, 1 / 6], [2, 0, 1 / 6], [-1, 1, 1 / 6], [0, 1, 1 / 6], [1, 1, 1 / 6], [0, 2, 1 / 6]];
const DITHER_SIERRA2 = [[1, 0, 4 / 16], [2, 0, 3 / 16], [-2, 1, 1 / 16], [-1, 1, 2 / 16], [0, 1, 3 / 16], [1, 1, 2 / 16], [2, 1, 1 / 16]];
const DITHER_SIERRALITE = [[1, 0, 2 / 4], [-1, 1, 1 / 4], [0, 1, 1 / 4]];
const DITHER_STUCKI = [[1, 0, 8 / 42], [2, 0, 4 / 42], [-2, 1, 2 / 42], [1, -1, 4 / 42], [0, 1, 8 / 42], [1, 1, 4 / 42], [2, 1, 2 / 42], [-2, 2, 1 / 42], [-1, 2, 2 / 42], [0, 2, 4 / 42], [1, 2, 2 / 42], [2, 2, 1 / 42]];
const DITHER_TWOD = [[1, 0, 0.5], [0, 1, 0.5]];
const DITHER_RIGHT = [[1, 0, 1.0]];
const DITHER_DOWN = [[0, 1, 1.0]];
const DITHER_DOUBLE_DOWN = [[0, 1, 2 / 4], [0, 2, 1 / 4], [1, 2, 1 / 4]];
const DITHER_DIAG = [[1, 1, 1.0]];
const DITHER_VDIAMOND = [[0, 1, 6 / 16], [-1, 1, 3 / 16], [1, 1, 3 / 16], [-2, 2, 1 / 16], [0, 2, 2 / 16], [2, 2, 1 / 16]];

const ALL_DITHER_SETTINGS: DitherSetting[] = [
    { name: "Floyd-Steinberg", kernel: DITHER_FLOYD },
    { name: "False Floyd", kernel: DITHER_FALSEFLOYD },
    { name: "Atkinson", kernel: DITHER_ATKINSON },
    { name: "Sierra 2", kernel: DITHER_SIERRA2 },
    { name: "Sierra Lite", kernel: DITHER_SIERRALITE },
    { name: "Stucki", kernel: DITHER_STUCKI },
    { name: "Two-D", kernel: DITHER_TWOD },
    { name: "Right", kernel: DITHER_RIGHT },
    { name: "Down", kernel: DITHER_DOWN },
    { name: "Double Down", kernel: DITHER_DOUBLE_DOWN },
    { name: "Diagonal", kernel: DITHER_DIAG },
    { name: "Diamond", kernel: DITHER_VDIAMOND },
];

const ERROR_FUNCS = [
    { id: 'perceptual', name: "Perceptual" },
    { id: 'hue', name: "Hue-Based" },
    { id: 'dist', name: "Distance" },
    { id: 'max', name: "Maximum" },
];

//

function getCanvasImageData(canvas: HTMLCanvasElement) {
    return new Uint32Array(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.buffer);
}
function drawRGBA(dest: HTMLCanvasElement, arr: Uint32Array) {
    var ctx = dest.getContext('2d');
    var imageData = ctx.createImageData(dest.width, dest.height);
    var datau32 = new Uint32Array(imageData.data.buffer);
    if (datau32.length == arr.length) {
        datau32.set(arr);
        ctx.putImageData(imageData, 0, 0);
    } else {
        console.log("drawRGBA(): array length mismatch");
        // TODO: source array is too long when switching
    }
}
function applyBrightness(imageData: Uint32Array, bright: number, bias: number, sat: number, gamma: number) {
    bright *= 1;
    bias *= 1;
    var u8arr = new Uint8ClampedArray(imageData.buffer);
    for (var i = 0; i < u8arr.length; i += 4) {
        var r = u8arr[i];
        var g = u8arr[i + 1];
        var b = u8arr[i + 2];
        if (sat != 1.0) {
            var gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; //weights from CCIR 601 spec
            r = gray * (1 - sat) + r * sat;
            g = gray * (1 - sat) + g * sat;
            b = gray * (1 - sat) + b * sat;
        }
        u8arr[i] = Math.pow(r * bright, gamma) + bias;
        u8arr[i + 1] = Math.pow(g * bright, gamma) + bias;
        u8arr[i + 2] = Math.pow(b * bright, gamma) + bias;
    }
}

function reprocessImage() {
    var resizeImageData = getCanvasImageData(resize);
    let bright = (parseFloat(contrastSlider.value) - 50) / 100 + 1.0; // middle = 1.0, range = 0.5-1.5
    let bias = (parseFloat(brightSlider.value) - bright * 50) * (128 / 50);
    let sat = (parseFloat(saturationSlider.value) - 50) / 50 + 1.0; // middle = 1.0, range = 0-2
    let gamma = 1;
    applyBrightness(resizeImageData, bright, bias, sat, gamma);
    dithertron.setSourceImage(resizeImageData);
    resetImage();
}

function resetImage() {
    var opt = ($("#diffuseTypeSelect")[0] as HTMLSelectElement).selectedOptions[0];
    // TODO: what if settings not yet set?
    if (opt) {
        dithertron.settings.ditherfn = ALL_DITHER_SETTINGS[parseInt(opt.value)].kernel;
    }
    var opt = ($("#errorFuncSelect")[0] as HTMLSelectElement).selectedOptions[0];
    if (opt) {
        dithertron.settings.errfn = opt.value;
    }
    dithertron.settings.diffuse = parseFloat(diffuseSlider.value) / 100;
    dithertron.settings.ordered = parseFloat(orderedSlider.value) / 100;
    dithertron.settings.noise = parseFloat(noiseSlider.value);
    dithertron.settings.paletteDiversity = parseFloat(diversitySlider.value) / 200 + 0.75;
    dithertron.setSettings(dithertron.settings);
    dithertron.reset();
}

function convertImage() {
    let cropCanvas = cropper.getCroppedCanvas();
    // avoid "Failed to execute 'createImageBitmap' on 'Window': The crop rect height is 0."
    if (cropCanvas.width == 0 || cropCanvas.height == 0) return;
    pica().resize(cropCanvas, resize, {
        /*
        unsharpAmount: 50,
        unsharpRadius: 0.5,
        unsharpThreshold: 2
        */
    }).then(() => {
        reprocessImage();
    });
}

function getSystemInfo(sys: DithertronSettings) {
    var s = sys.width + " x " + sys.height;
    if (sys.reduce) s += ", " + sys.reduce + " out of " + sys.pal.length + " colors";
    else if (sys.pal) s += ", " + sys.pal.length + " colors";
    if (sys.block) {
        s += ", ";
        s += sys.block.colors + " colors per ";
        s += sys.block.w + "x" + sys.block.h + " block";
    }
    return s;
}

function showSystemInfo(sys: DithertronSettings) {
    $("#targetFormatInfo").text(getSystemInfo(sys));
}

function updatePaletteSwatches(pal: Uint32Array) {
    var swat = $("#paletteSwatches");
    swat.empty();
    if (pal && pal.length < 64) {
        pal.forEach((col, index) => {
            var rgb = "rgb(" + (col & 0xff) + "," + ((col >> 8) & 0xff) + "," + ((col >> 16) & 0xff) + ")";
            var sq = $('<span style="width:2em">&nbsp;</span>').css("background-color", rgb);
            swat.append(sq);
        });
    }
}

function loadSourceImage(url: string) {
    // https://github.com/fengyuanchen/cropperjs/blob/master/README.md
    if (cropper) cropper.destroy();
    let aspect = (dithertron.settings.width * (dithertron.settings.scaleX || 1) / dithertron.settings.height) || (4 / 3);
    cropper = new Cropper(image, {
        viewMode: 1,
        initialAspectRatio: aspect,
        crop(event) {
            convertImage();
        },
    });
    cropper.replace(url);
    updateURL();
}

function setTargetSystem(sys: DithertronSettings) {
    var showNoise = sys.conv != 'DitheringCanvas';
    dithertron.setSettings(sys);
    showSystemInfo(sys);
    resize.width = dest.width = sys.width;
    resize.height = dest.height = sys.height;
    let pixelAspect = sys.scaleX || 1;
    (dest.style as any).aspectRatio = (sys.width * pixelAspect / sys.height).toString();
    $("#noiseSection").css('display', showNoise ? 'flex' : 'none');
    $("#diversitySection").css('display', sys.reduce ? 'flex' : 'none');
    $("#downloadNativeBtn").css('display', sys.toNative ? 'inline' : 'none');
    $("#gotoIDE").css('display', getCodeConvertFunction() ? 'inline' : 'none');
    if (cropper) {
        loadSourceImage(cropper.url);
    }
    updateURL();
}

function getFilenamePrefix() {
    var fn = filenameLoaded || "image";
    try { fn = fn.split('.').shift() || "image"; } catch (e) { } // remove extension
    return fn + "-" + dithertron.settings.id;
}

function getNativeFormatData() {
    var img = dithertron.lastPixels;
    let funcname = dithertron.settings.toNative;
    if (!funcname) return null;
    var fn = exportfuncs[funcname];
    return img && fn && fn(img, dithertron.settings);
}

function downloadNativeFormat() {
    var data = getNativeFormatData();
    if (data != null) {
        var blob = new Blob([data], { type: "application/octet-stream" });
        saveAs(blob, getFilenamePrefix() + ".bin");
    }
}
function downloadImageFormat() {
    dest.toBlob((blob) => {
        saveAs(blob, getFilenamePrefix() + ".png");
    }, "image/png");
}
function byteArrayToString(data: number[] | Uint8Array): string {
    var str = "";
    if (data != null) {
        var charLUT = new Array();
        for (var i = 0; i < 256; ++i)
            charLUT[i] = String.fromCharCode(i);
        var len = data.length;
        for (var i = 0; i < len; i++)
            str += charLUT[data[i]];
    }
    return str;
}
function getCodeConvertFunction(): () => string {
    var convertFuncName = 'getFileViewerCode_' + dithertron.settings.id.replace(/[^a-z0-9]/g, '_');
    var convertFunc = fileviewers[convertFuncName];
    return convertFunc;
}

async function gotoIDE() {
    function addHiddenField(form: any, name: any, val: any) {
        $('<input type="hidden"/>').attr('name', name).val(val).appendTo(form);
    }
    if (confirm("Open code sample with image in 8bitworkshop?")) {
        //e.target.disabled = true;
        var platform_id = dithertron.settings.id.split('.')[0];
        var form = $((document.forms as any)['ideForm'] as HTMLFormElement);
        form.empty();
        if (platform_id == 'atari8') platform_id = 'atari8-800'; // TODO
        if (platform_id == 'cpc') platform_id = 'cpc.6128'; // TODO
        addHiddenField(form, "platform", platform_id);
        // TODO
        var codeFilename = "viewer-" + getFilenamePrefix() + ".asm";
        var dataFilename = getFilenamePrefix() + ".bin";
        addHiddenField(form, "file0_name", codeFilename);
        var code = getCodeConvertFunction()();
        code = code.replace("$DATAFILE", getFilenamePrefix() + ".bin");
        addHiddenField(form, "file0_data", code);
        addHiddenField(form, "file0_type", "utf8");
        addHiddenField(form, "file1_name", dataFilename);
        addHiddenField(form, "file1_data", btoa(byteArrayToString(getNativeFormatData())));
        addHiddenField(form, "file1_type", "binary");
        form.submit();
    }
}


function updateURL() {
    let qs = {
        sys: dithertron.settings.id,
        image: presetLoaded,
    };
    window.location.hash = '#' + $.param(qs);
}

function decodeQueryString(qs: string) {
    if (qs.startsWith('?')) qs = qs.substr(1);
    var a = qs.split('&');
    if (!a || a.length == 0)
        return {};
    var b: { [name: string]: string } = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

const EXAMPLE_IMAGES = [
    'benbenn.jpg',
    'cezanne2.jpg',
    'colorroses.jpg',
    'colorswirls.jpg',
    'coolcar.jpg',
    'darkbrewery.jpg',
    'dhuku.jpg',
    'greentruck.jpg',
    'frida.jpg',
    'homer.jpg',
    'keyssunset.jpg',
    'lobsterpot.jpg',
    'myersflat.jpg',
    'myrtle.jpg',
    'parrot.jpg',
    'redrose.jpg',
    'robert_s_duncanson.jpg',
    'seurat.jpg',
    'vangogh.jpg',
];

export function startUI() {

    window.addEventListener('load', function () {
        document.querySelector('input[type="file"]').addEventListener('change', function (event) {
            var inputElement = event.target as HTMLInputElement;
            var file = inputElement.files && inputElement.files[0];
            if (file) {
                filenameLoaded = file.name;
                presetLoaded = "";
                var url = URL.createObjectURL(file);
                loadSourceImage(url);
            }
        });

        EXAMPLE_IMAGES.forEach((filename) => {
            $('<a class="dropdown-item" href="#"></a>').text(filename).appendTo("#examplesMenu");
        });
        $("#examplesMenu").click((e) => {
            var filename = $(e.target).text();
            filenameLoaded = presetLoaded = filename;
            loadSourceImage("images/" + filename);
            imageUpload.value = "";
        });

        SYSTEMS.forEach(sys => {
            var opt = sys ? $("<option />").text(sys.name).val(sys.id) : $("<option disabled></option>");
            $("#targetFormatSelect").append(opt);
        });
        ALL_DITHER_SETTINGS.forEach((dset, index) => {
            var opt = $("<option />").text(dset.name).val(index);
            $("#diffuseTypeSelect").append(opt);
        });
        ERROR_FUNCS.forEach((dset, index) => {
            var opt = $("<option />").text(dset.name).val(dset.id);
            $("#errorFuncSelect").append(opt);
        });

        dithertron.pixelsAvailable = (msg) => {
            // TODO: resize canvas?
            drawRGBA(dest, msg.img);
            updatePaletteSwatches(msg.pal);
            /*
            if (msg.final) {
                dest.toBlob((blob) => {
                    $("#pngBytes").text(blob.size+"");
                }, 'image/png');
            }
            */
        }

        var qs = decodeQueryString(window.location.hash.substring(1));
        var sys = qs['sys'] || 'c64.multi';
        $('#targetFormatSelect').val(sys);
        setTargetSystem(SYSTEM_LOOKUP[sys]);
        filenameLoaded = presetLoaded = qs['image'] || "seurat.jpg";
        loadSourceImage("images/" + filenameLoaded);

        $("#diffuseSlider").on('change', resetImage);
        $("#orderedSlider").on('change', resetImage);
        $("#noiseSlider").on('change', resetImage);
        $("#diversitySlider").on('change', reprocessImage);
        $("#brightSlider").on('change', reprocessImage);
        $("#contrastSlider").on('change', reprocessImage);
        $("#saturationSlider").on('change', reprocessImage);
        $("#resetButton").on('click', resetImage);
        $("#diffuseTypeSelect").on('change', resetImage);
        $("#targetFormatSelect").change((e) => {
            var opt = (e.target as HTMLSelectElement).selectedOptions[0];
            if (opt) {
                setTargetSystem(SYSTEM_LOOKUP[opt.value]);
            }
        });
        $("#errorFuncSelect").on('change', resetImage);
        $("#downloadImageBtn").click(downloadImageFormat);
        $("#downloadNativeBtn").click(downloadNativeFormat);
        $("#gotoIDE").click(gotoIDE);
    });

    // print diags (TODO: generate markdown table)
    if (window.location.search == '?printmeta') {
        function printSystems() {
            var s = "";
            SYSTEMS.forEach((sys) => {
                if (sys) s += "* " + sys.name + " - " + getSystemInfo(sys) + "\n";
            });
            console.log(s);
        }
        printSystems();
    }

}

startUI();
