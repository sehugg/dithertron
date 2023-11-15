import { SYSTEMS, SYSTEM_LOOKUP } from "../settings/systems";
import { DitherSetting, DithertronSettings, PixelsAvailableMessage } from "../common/types";

import * as exportfuncs from "../export/exportfuncs";
import * as fileviewers from "../export/fileviewers";
import * as kernels from "../dither/kernels";

import Cropper from 'cropperjs';
import pica from 'pica';
import { saveAs } from 'file-saver';
import { EXAMPLE_IMAGES } from "./sampleimages";

var cropper : Cropper;

var brightSlider = document.getElementById('brightSlider') as HTMLInputElement;
var contrastSlider = document.getElementById('contrastSlider') as HTMLInputElement;
var saturationSlider = document.getElementById('saturationSlider') as HTMLInputElement;
var noiseSlider = document.getElementById('noiseSlider') as HTMLInputElement;
var diffuseSlider = document.getElementById('diffuseSlider') as HTMLInputElement;
var orderedSlider = document.getElementById('orderedSlider') as HTMLInputElement;
var diversitySlider = document.getElementById('diversitySlider') as HTMLInputElement;
var imageUpload = document.getElementById("imageUpload") as HTMLInputElement;
const sourceImage = document.getElementById('srcimage') as HTMLImageElement;
const resizeCanvas = document.getElementById('resizecanvas') as HTMLCanvasElement;
const destCanvas = document.getElementById('destcanvas') as HTMLCanvasElement;
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
    restart() {
        worker.postMessage({ cmd: "restart" });
    }
    pixelsAvailable: (msg: PixelsAvailableMessage) => void;
}

const worker = new Worker("./gen/worker.js");

export const dithertron = new ProxyDithertron(worker);

var filenameLoaded: string;
var presetLoaded: string;

const ALL_DITHER_SETTINGS: DitherSetting[] = [
    { name: "Floyd-Steinberg", kernel: kernels.FLOYD },
    { name: "False Floyd", kernel: kernels.FALSEFLOYD },
    { name: "Atkinson", kernel: kernels.ATKINSON },
    { name: "Sierra 2", kernel: kernels.SIERRA2 },
    { name: "Sierra Lite", kernel: kernels.SIERRALITE },
    { name: "Stucki", kernel: kernels.STUCKI },
    { name: "Two-D", kernel: kernels.TWOD },
    { name: "Right", kernel: kernels.RIGHT },
    { name: "Down", kernel: kernels.DOWN },
    { name: "Double Down", kernel: kernels.DOUBLE_DOWN },
    { name: "Diagonal", kernel: kernels.DIAG },
    { name: "Diamond", kernel: kernels.VDIAMOND },
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
    var resizeImageData = getCanvasImageData(resizeCanvas);
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
    dithertron.restart();
}

function convertImage() {
    let cropCanvas = cropper?.getCroppedCanvas();
    // avoid "Failed to execute 'createImageBitmap' on 'Window': The crop rect height is 0."
    if (!cropCanvas?.width || !cropCanvas?.height) return;
    pica().resize(cropCanvas, resizeCanvas, {
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

function isExactMatch(imageData: Cropper.ImageData) {
    const settings = dithertron.settings;
    return imageData?.naturalWidth == settings.width
        && imageData?.naturalHeight == settings.height;
}

function processImageDirectly() {
    console.log("Width and height exact match!");
    cropper.clear();
    cropper.disable();
    // copy the image to resizeCanvas
    const ctx = resizeCanvas.getContext('2d');
    ctx.drawImage(sourceImage, 0, 0);
    reprocessImage();
}

function loadSourceImage(url: string) {
    // https://github.com/fengyuanchen/cropperjs/blob/master/README.md
    if (cropper) cropper.destroy();
    const settings = dithertron.settings;
    let aspect = (settings.width * (settings.scaleX || 1) / settings.height) || (4 / 3);
    cropper = new Cropper(sourceImage, {
        viewMode: 1,
        autoCropArea: 1.0,
        initialAspectRatio: aspect,
        crop(event) {
            if (isExactMatch(cropper.getImageData())) {
                processImageDirectly();
            } else {
                convertImage();
            }
        },
    });
    cropper.replace(url);
    updateURL();
}

function setTargetSystem(sys: DithertronSettings) {
    var showNoise = sys.conv != 'DitheringCanvas';
    dithertron.setSettings(sys);
    showSystemInfo(sys);
    resizeCanvas.width = destCanvas.width = sys.width;
    resizeCanvas.height = destCanvas.height = sys.height;
    let pixelAspect = sys.scaleX || 1;
    (destCanvas.style as any).aspectRatio = (sys.width * pixelAspect / sys.height).toString();
    $("#noiseSection").css('display', showNoise ? 'flex' : 'none');
    $("#diversitySection").css('display', sys.reduce ? 'flex' : 'none');
    $("#downloadNativeBtn").css('display', sys.toNative ? 'inline' : 'none');
    $("#gotoIDE").css('display', getCodeConvertFunction() ? 'inline' : 'none');
    if (cropper) {
        loadSourceImage((cropper as any).url); // TODO?
    }
    updateURL();
    repopulateSystemSelector(sys);
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
    destCanvas.toBlob((blob) => {
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

function repopulateSystemSelector(currentSystem: DithertronSettings) {
    const sel = $("#targetFormatSelect");
    sel.empty();
    let [currentParentName, currentSubtypeName] = currentSystem.name.split(' (');
    let allParents = new Set<String>();
    let optgroup = null;
    SYSTEMS.forEach(sys => {
        if (sys == null) {
            sel.append($("<option disabled></option>"));
        } else {
            // does it have a subtype?
            let [parentName, subtypeName] = sys.name.split(' (');
            let opt = $("<option />").text(sys.name).val(sys.id);
            if (parentName == currentParentName) {
                if (!optgroup) {
                    optgroup = $("<optgroup />").attr("label", currentParentName);
                    sel.append(optgroup);
                }
                optgroup.append(opt);
            } else if (!allParents.has(parentName)) {
                let opt = $("<option />").text(parentName).val(sys.id);
                sel.append(opt);
            }
            allParents.add(parentName);
        }
    });
    sel.val(currentSystem.id);
}

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
            drawRGBA(destCanvas, msg.img);
            updatePaletteSwatches(msg.pal);
            /*
            if (msg.final) {
                dest.toBlob((blob) => {
                    $("#pngBytes").text(blob.size+"");
                }, 'image/png');
            }
            */
        }

        const qs = decodeQueryString(window.location.hash.substring(1));
        const currentSystemId = qs['sys'] || SYSTEMS[0].id;
        const currentSystem = SYSTEM_LOOKUP[currentSystemId];
        setTargetSystem(currentSystem);

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
