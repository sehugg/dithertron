
declare var Cropper;
declare var pica;
declare var saveAs;

class ProxyDithertron {
    settings : DithertronSettings;
    lastPixels : PixelsAvailableMessage;

    constructor(worker : Worker) {
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
    setSettings(settings) {
        this.settings = settings;
        worker.postMessage({cmd:"setSettings", data:settings});
    }
    setSourceImage(img) {
        worker.postMessage({cmd:"setSourceImage", data:img});
    }
    reset() {
        worker.postMessage({cmd:"reset"});
    }
    pixelsAvailable : (msg:PixelsAvailableMessage) => void;
}

const worker = new Worker("./gen/dithertron.js");
const dithertron = new ProxyDithertron(worker);

var resizeImageData : Uint32Array;
var filenameLoaded : string;

// DITHER SETTINGS
const DITHER_FLOYD = [[1, 0, 7/16], [-1, 1, 3/16], [0, 1, 5/16], [1, 1, 1/16]];
const DITHER_FALSEFLOYD = [[1, 0, 3/8], [0, 1, 3/8], [1, 1, 2/8]];
const DITHER_ATKINSON = [[1, 0, 1/6], [2, 0, 1/6], [-1, 1, 1/6], [0, 1, 1/6], [1, 1, 1/6], [0, 2, 1/6]];
const DITHER_SIERRA2 = [[1, 0, 4/16], [2, 0, 3/16], [-2, 1, 1/16], [-1, 1, 2/16], [0, 1, 3/16], [1, 1, 2/16], [2, 1, 1/16]];
const DITHER_SIERRALITE = [[1, 0, 2/4], [-1, 1, 1/4], [0, 1, 1/4]];
const DITHER_STUCKI =  [[1, 0, 8/42], [2, 0, 4/42], [-2, 1, 2/42], [1, -1, 4/42], [0, 1, 8/42], [1, 1, 4/42], [2, 1, 2/42], [-2, 2, 1/42], [-1, 2, 2/42], [0, 2, 4/42], [1, 2, 2/42], [2, 2, 1/42]];
const DITHER_TWOD = [[1, 0, 0.5], [0, 1, 0.5]];
const DITHER_RIGHT = [[1, 0, 1.0]];
const DITHER_DOWN = [[0, 1, 1.0]];
const DITHER_DOUBLE_DOWN = [[0, 1, 2/4], [0, 2, 1/4], [1, 2, 1/4]];
const DITHER_DIAG = [[1, 1, 1.0]];
const DITHER_VDIAMOND = [[0, 1, 6/16], [-1, 1, 3/16], [1, 1, 3/16], [-2, 2, 1/16], [0, 2, 2/16], [2, 2, 1/16]];

const ALL_DITHER_SETTINGS : DitherSetting[] = [
    {name:"Floyd-Steinberg", kernel:DITHER_FLOYD},
    {name:"False Floyd", kernel:DITHER_FALSEFLOYD},
    {name:"Atkinson", kernel:DITHER_ATKINSON},
    {name:"Sierra 2", kernel:DITHER_SIERRA2},
    {name:"Sierra Lite", kernel:DITHER_SIERRALITE},
    {name:"Stucki", kernel:DITHER_STUCKI},
    {name:"Two-D", kernel:DITHER_TWOD},
    {name:"Right", kernel:DITHER_RIGHT},
    {name:"Down", kernel:DITHER_DOWN},
    {name:"Double Down", kernel:DITHER_DOUBLE_DOWN},
    {name:"Diagonal", kernel:DITHER_DIAG},
    {name:"Diamond", kernel:DITHER_VDIAMOND},
];

const ERROR_FUNCS = [
    {id:'hue', name:"Hue-Based"},
    {id:'perceptual', name:"Perceptual"},
    {id:'dist', name:"Distance"},
    {id:'max', name:"Maximum"},
];

//

function getCanvasImageData(canvas) {
    return new Uint32Array(canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.buffer);
}
function drawRGBA(dest, arr) {
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
function applyBrightness(imageData:Uint32Array, bright:number, bias:number, sat:number) {
    bright *= 1;
    bias *= 1;
    var u8arr = new Uint8ClampedArray(imageData.buffer);
    for (var i=0; i<u8arr.length; i+=4) {
        var r = u8arr[i];
        var g = u8arr[i+1];
        var b = u8arr[i+2];
        if (sat != 1.0) {
            var gray = 0.2989*r + 0.5870*g + 0.1140*b; //weights from CCIR 601 spec
            r = gray * (1-sat) + r * sat;
            g = gray * (1-sat) + g * sat;
            b = gray * (1-sat) + b * sat;
        }
        u8arr[i] = r * bright + bias;
        u8arr[i+1] = g * bright + bias;
        u8arr[i+2] = b * bright + bias;
    }
}

function reprocessImage() {
    var resizeImageData = getCanvasImageData(resize);
    let bright = (parseFloat(contrastSlider.value) - 50) / 100 + 1.0; // middle = 1.0, range = 0.5-1.5
    let bias = (parseFloat(brightSlider.value) - bright * 50) * (128 / 50);
    let sat = (parseFloat(saturationSlider.value) - 50) / 50 + 1.0; // middle = 1.0, range = 0-2
    applyBrightness(resizeImageData, bright, bias, sat);
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
    dithertron.settings.noise = parseFloat(noiseSlider.value);
    dithertron.setSettings(dithertron.settings);
    dithertron.reset();
}

function convertImage() {
    pica().resize(cropper.getCroppedCanvas(), resize, {
        /*
        unsharpAmount: 50,
        unsharpRadius: 0.5,
        unsharpThreshold: 2
        */
    }).then(() => {
        reprocessImage();
    });
}

function getSystemInfo(sys : DithertronSettings) {
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

function showSystemInfo(sys : DithertronSettings) {
    $("#targetFormatInfo").text(getSystemInfo(sys));
}

function updatePaletteSwatches(pal:Uint32Array) {
    var swat = $("#paletteSwatches");
    swat.empty();
    if (pal && pal.length < 64) {
        pal.forEach((col,index) => {
            var rgb = "rgb(" + (col&0xff) + "," + ((col>>8)&0xff) + "," + ((col>>16)&0xff) + ")";
            var sq = $('<span style="width:2em">&nbsp;</span>').css("background-color",rgb);
            swat.append(sq);
        });
    }
}

var brightSlider = document.getElementById('brightSlider') as HTMLInputElement;
var contrastSlider = document.getElementById('contrastSlider') as HTMLInputElement;
var saturationSlider = document.getElementById('saturationSlider') as HTMLInputElement;
var noiseSlider = document.getElementById('noiseSlider') as HTMLInputElement;
var diffuseSlider = document.getElementById('diffuseSlider') as HTMLInputElement;
var imageUpload = document.getElementById("imageUpload") as HTMLInputElement;
const image = document.getElementById('srcimage') as HTMLImageElement;
const resize = document.getElementById('resizecanvas') as HTMLCanvasElement;
const dest = document.getElementById('destcanvas') as HTMLCanvasElement;
//const cmdline = document.getElementById('cmdline');

// https://github.com/fengyuanchen/cropperjs/blob/master/README.md
const cropper = new Cropper(image, {
    viewMode:1,
    initialAspectRatio: 4/3,
    crop(event) {
        convertImage();
    },
});
function loadSourceImage(url) {
    cropper.replace(url);
}
//
function setTargetSystem(sys : DithertronSettings) {
    var showNoise = sys.conv != 'DitheringCanvas';
    dithertron.setSettings(sys);
    showSystemInfo(sys);
    resize.width = dest.width = sys.width;
    resize.height = dest.height = sys.height;
    dest.style.transform = 'scaleX('+(sys.scaleX||1)+')';
    var widthPct = 90 / (sys.scaleX || 1);
    if (widthPct < 100) {
        dest.style.width = (90/(sys.scaleX||1))+'%';
    } else {
        dest.style.width = '100%';
    }
    $("#noiseSection").css('display',showNoise?'flex':'none');
    $("#downloadNativeBtn").css('display',sys.toNative?'inline':'none');
    $("#gotoIDE").css('display',getCodeConvertFunction()?'inline':'none');
    cropper.replace(cropper.url);
}

var EXAMPLE_IMAGES = [
    'benbenn.jpg',
    'cezanne2.jpg',
    'coolcar.jpg',
    'darkbrewery.jpg',
    'greentruck.jpg',
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

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        var file = this.files && this.files[0];
        if (file) {
            filenameLoaded = file.name;
            var url = URL.createObjectURL(file);
            loadSourceImage(url);
        }
    });

    EXAMPLE_IMAGES.forEach((filename) => {
        $('<a class="dropdown-item" href="#"></a>').text(filename).appendTo("#examplesMenu");
    });
    $("#examplesMenu").click((e) => {
        var filename = $(e.target).text();
        filenameLoaded = filename;
        loadSourceImage("images/" + filename);
        imageUpload.value = "";
    });

    SYSTEMS.forEach(sys => {
        var opt = sys ? $("<option />").text(sys.name).val(sys.id) : $("<option disabled></option>");
        $("#targetFormatSelect").append(opt);
    });
    ALL_DITHER_SETTINGS.forEach((dset,index) => {
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

    setTargetSystem(SYSTEM_LOOKUP['c64.multi']);
    filenameLoaded = "seurat.jpg";
    loadSourceImage("images/" + filenameLoaded);

    $("#diffuseSlider").on('change', resetImage);
    $("#noiseSlider").on('change', resetImage);
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

// print diags (TODO)
if (window.location.search == '?printmeta') {
    function printSystems() {
        var s = "";
        SYSTEMS.forEach((sys) => {
            if (sys) s += "* " + sys.name + " - " +getSystemInfo(sys) + "\n";
        });
        console.log(s);
    }
    printSystems();
}
