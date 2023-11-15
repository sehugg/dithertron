import { Dithertron } from "../dither/dithertron";
import { PixelsAvailableMessage } from "../common/types";

//declare function postMessage(msg:any):void;

var worker_dtron = new Dithertron();

onmessage = function (e) {
    if (e && e.data) {
        console.log(e.data.cmd);
        switch (e.data.cmd) {
            case 'restart': return worker_dtron.restart();
            case 'setSettings': return worker_dtron.setSettings(e.data.data);
            case 'setSourceImage': return worker_dtron.setSourceImage(e.data.data);
        }
    }
}

worker_dtron.pixelsAvailable = (msg: PixelsAvailableMessage) => {
    postMessage(msg);
};
