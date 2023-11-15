var Kr=Object.create;var Rt=Object.defineProperty;var Jr=Object.getOwnPropertyDescriptor;var ei=Object.getOwnPropertyNames;var ti=Object.getPrototypeOf,ai=Object.prototype.hasOwnProperty;var tt=(t=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(t,{get:(i,x)=>(typeof require!="undefined"?require:i)[x]}):t)(function(t){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var St=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports),wa=(t,i)=>{for(var x in i)Rt(t,x,{get:i[x],enumerable:!0})},ri=(t,i,x,l)=>{if(i&&typeof i=="object"||typeof i=="function")for(let f of ei(i))!ai.call(t,f)&&f!==x&&Rt(t,f,{get:()=>i[f],enumerable:!(l=Jr(i,f))||l.enumerable});return t};var Tt=(t,i,x)=>(x=t!=null?Kr(ti(t)):{},ri(i||!t||!t.__esModule?Rt(x,"default",{value:t,enumerable:!0}):x,t));var ar=St((Xt,Wt)=>{(function(t,i){typeof Xt=="object"&&typeof Wt!="undefined"?Wt.exports=i():typeof define=="function"&&define.amd?define(i):(t=typeof globalThis!="undefined"?globalThis:t||self,t.Cropper=i())})(Xt,function(){"use strict";function t(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter(function(d){return Object.getOwnPropertyDescriptor(n,d).enumerable})),r.push.apply(r,a)}return r}function i(n){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?t(Object(r),!0).forEach(function(a){g(n,a,r[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach(function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(r,a))})}return n}function x(n){"@babel/helpers - typeof";return x=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(n)}function l(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function f(n,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(n,T(a.key),a)}}function E(n,e,r){return e&&f(n.prototype,e),r&&f(n,r),Object.defineProperty(n,"prototype",{writable:!1}),n}function g(n,e,r){return e=T(e),e in n?Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[e]=r,n}function p(n){return s(n)||A(n)||c(n)||h()}function s(n){if(Array.isArray(n))return v(n)}function A(n){if(typeof Symbol!="undefined"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function c(n,e){if(n){if(typeof n=="string")return v(n,e);var r=Object.prototype.toString.call(n).slice(8,-1);if(r==="Object"&&n.constructor&&(r=n.constructor.name),r==="Map"||r==="Set")return Array.from(n);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(n,e)}}function v(n,e){(e==null||e>n.length)&&(e=n.length);for(var r=0,a=new Array(e);r<e;r++)a[r]=n[r];return a}function h(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function m(n,e){if(typeof n!="object"||n===null)return n;var r=n[Symbol.toPrimitive];if(r!==void 0){var a=r.call(n,e||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function T(n){var e=m(n,"string");return typeof e=="symbol"?e:String(e)}var b=typeof window!="undefined"&&typeof window.document!="undefined",C=b?window:{},M=b&&C.document.documentElement?"ontouchstart"in C.document.documentElement:!1,P=b?"PointerEvent"in C:!1,B="cropper",L="all",U="crop",V="move",j="zoom",Y="e",H="w",W="s",z="n",X="ne",J="nw",q="se",oe="sw",te="".concat(B,"-crop"),w="".concat(B,"-disabled"),R="".concat(B,"-hidden"),S="".concat(B,"-hide"),G="".concat(B,"-invisible"),O="".concat(B,"-modal"),ee="".concat(B,"-move"),Z="".concat(B,"Action"),K="".concat(B,"Preview"),se="crop",ue="move",Le="none",Be="crop",Ke="cropend",Ct="cropmove",It="cropstart",Zt="dblclick",mr=M?"touchstart":"mousedown",gr=M?"touchmove":"mousemove",xr=M?"touchend touchcancel":"mouseup",Kt=P?"pointerdown":mr,Jt=P?"pointermove":gr,ea=P?"pointerup pointercancel":xr,ta="ready",aa="resize",ra="wheel",Et="zoom",ia="image/jpeg",vr=/^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,br=/^data:/,wr=/^data:image\/jpeg;base64,/,Cr=/^img|canvas$/i,na=200,oa=100,sa={viewMode:0,dragMode:se,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:na,minContainerHeight:oa,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},Ir='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',Er=Number.isNaN||C.isNaN;function ae(n){return typeof n=="number"&&!Er(n)}var la=function(e){return e>0&&e<1/0};function yt(n){return typeof n=="undefined"}function Ne(n){return x(n)==="object"&&n!==null}var yr=Object.prototype.hasOwnProperty;function je(n){if(!Ne(n))return!1;try{var e=n.constructor,r=e.prototype;return e&&r&&yr.call(r,"isPrototypeOf")}catch(a){return!1}}function ve(n){return typeof n=="function"}var _r=Array.prototype.slice;function ca(n){return Array.from?Array.from(n):_r.call(n)}function de(n,e){return n&&ve(e)&&(Array.isArray(n)||ae(n.length)?ca(n).forEach(function(r,a){e.call(n,r,a,n)}):Ne(n)&&Object.keys(n).forEach(function(r){e.call(n,n[r],r,n)})),n}var he=Object.assign||function(e){for(var r=arguments.length,a=new Array(r>1?r-1:0),d=1;d<r;d++)a[d-1]=arguments[d];return Ne(e)&&a.length>0&&a.forEach(function(o){Ne(o)&&Object.keys(o).forEach(function(u){e[u]=o[u]})}),e},Br=/\.\d*(?:0|9){12}\d*$/;function Ve(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return Br.test(n)?Math.round(n*e)/e:n}var Dr=/^width|height|left|top|marginLeft|marginTop$/;function Te(n,e){var r=n.style;de(e,function(a,d){Dr.test(d)&&ae(a)&&(a="".concat(a,"px")),r[d]=a})}function Mr(n,e){return n.classList?n.classList.contains(e):n.className.indexOf(e)>-1}function ge(n,e){if(e){if(ae(n.length)){de(n,function(a){ge(a,e)});return}if(n.classList){n.classList.add(e);return}var r=n.className.trim();r?r.indexOf(e)<0&&(n.className="".concat(r," ").concat(e)):n.className=e}}function De(n,e){if(e){if(ae(n.length)){de(n,function(r){De(r,e)});return}if(n.classList){n.classList.remove(e);return}n.className.indexOf(e)>=0&&(n.className=n.className.replace(e,""))}}function ze(n,e,r){if(e){if(ae(n.length)){de(n,function(a){ze(a,e,r)});return}r?ge(n,e):De(n,e)}}var Fr=/([a-z\d])([A-Z])/g;function _t(n){return n.replace(Fr,"$1-$2").toLowerCase()}function Bt(n,e){return Ne(n[e])?n[e]:n.dataset?n.dataset[e]:n.getAttribute("data-".concat(_t(e)))}function Je(n,e,r){Ne(r)?n[e]=r:n.dataset?n.dataset[e]=r:n.setAttribute("data-".concat(_t(e)),r)}function Rr(n,e){if(Ne(n[e]))try{delete n[e]}catch(r){n[e]=void 0}else if(n.dataset)try{delete n.dataset[e]}catch(r){n.dataset[e]=void 0}else n.removeAttribute("data-".concat(_t(e)))}var ha=/\s\s*/,fa=function(){var n=!1;if(b){var e=!1,r=function(){},a=Object.defineProperty({},"once",{get:function(){return n=!0,e},set:function(o){e=o}});C.addEventListener("test",r,a),C.removeEventListener("test",r,a)}return n}();function _e(n,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=r;e.trim().split(ha).forEach(function(o){if(!fa){var u=n.listeners;u&&u[o]&&u[o][r]&&(d=u[o][r],delete u[o][r],Object.keys(u[o]).length===0&&delete u[o],Object.keys(u).length===0&&delete n.listeners)}n.removeEventListener(o,d,a)})}function Ie(n,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=r;e.trim().split(ha).forEach(function(o){if(a.once&&!fa){var u=n.listeners,I=u===void 0?{}:u;d=function(){delete I[o][r],n.removeEventListener(o,d,a);for(var F=arguments.length,y=new Array(F),_=0;_<F;_++)y[_]=arguments[_];r.apply(n,y)},I[o]||(I[o]={}),I[o][r]&&n.removeEventListener(o,I[o][r],a),I[o][r]=d,n.listeners=I}n.addEventListener(o,d,a)})}function Ye(n,e,r){var a;return ve(Event)&&ve(CustomEvent)?a=new CustomEvent(e,{detail:r,bubbles:!0,cancelable:!0}):(a=document.createEvent("CustomEvent"),a.initCustomEvent(e,!0,!0,r)),n.dispatchEvent(a)}function ua(n){var e=n.getBoundingClientRect();return{left:e.left+(window.pageXOffset-document.documentElement.clientLeft),top:e.top+(window.pageYOffset-document.documentElement.clientTop)}}var Dt=C.location,Sr=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i;function da(n){var e=n.match(Sr);return e!==null&&(e[1]!==Dt.protocol||e[2]!==Dt.hostname||e[3]!==Dt.port)}function pa(n){var e="timestamp=".concat(new Date().getTime());return n+(n.indexOf("?")===-1?"?":"&")+e}function et(n){var e=n.rotate,r=n.scaleX,a=n.scaleY,d=n.translateX,o=n.translateY,u=[];ae(d)&&d!==0&&u.push("translateX(".concat(d,"px)")),ae(o)&&o!==0&&u.push("translateY(".concat(o,"px)")),ae(e)&&e!==0&&u.push("rotate(".concat(e,"deg)")),ae(r)&&r!==1&&u.push("scaleX(".concat(r,")")),ae(a)&&a!==1&&u.push("scaleY(".concat(a,")"));var I=u.length?u.join(" "):"none";return{WebkitTransform:I,msTransform:I,transform:I}}function Tr(n){var e=i({},n),r=0;return de(n,function(a,d){delete e[d],de(e,function(o){var u=Math.abs(a.startX-o.startX),I=Math.abs(a.startY-o.startY),Q=Math.abs(a.endX-o.endX),F=Math.abs(a.endY-o.endY),y=Math.sqrt(u*u+I*I),_=Math.sqrt(Q*Q+F*F),k=(_-y)/y;Math.abs(k)>Math.abs(r)&&(r=k)})}),r}function ut(n,e){var r=n.pageX,a=n.pageY,d={endX:r,endY:a};return e?d:i({startX:r,startY:a},d)}function Pr(n){var e=0,r=0,a=0;return de(n,function(d){var o=d.startX,u=d.startY;e+=o,r+=u,a+=1}),e/=a,r/=a,{pageX:e,pageY:r}}function Pe(n){var e=n.aspectRatio,r=n.height,a=n.width,d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"contain",o=la(a),u=la(r);if(o&&u){var I=r*e;d==="contain"&&I>a||d==="cover"&&I<a?r=a/e:a=r*e}else o?r=a/e:u&&(a=r*e);return{width:a,height:r}}function kr(n){var e=n.width,r=n.height,a=n.degree;if(a=Math.abs(a)%180,a===90)return{width:r,height:e};var d=a%90*Math.PI/180,o=Math.sin(d),u=Math.cos(d),I=e*u+r*o,Q=e*o+r*u;return a>90?{width:Q,height:I}:{width:I,height:Q}}function Or(n,e,r,a){var d=e.aspectRatio,o=e.naturalWidth,u=e.naturalHeight,I=e.rotate,Q=I===void 0?0:I,F=e.scaleX,y=F===void 0?1:F,_=e.scaleY,k=_===void 0?1:_,ie=r.aspectRatio,re=r.naturalWidth,fe=r.naturalHeight,le=a.fillColor,Ae=le===void 0?"transparent":le,xe=a.imageSmoothingEnabled,pe=xe===void 0?!0:xe,Re=a.imageSmoothingQuality,Ce=Re===void 0?"low":Re,N=a.maxWidth,ce=N===void 0?1/0:N,me=a.maxHeight,Ee=me===void 0?1/0:me,Se=a.minWidth,Ge=Se===void 0?0:Se,$e=a.minHeight,ke=$e===void 0?0:$e,Me=document.createElement("canvas"),be=Me.getContext("2d"),Ue=Pe({aspectRatio:ie,width:ce,height:Ee}),dt=Pe({aspectRatio:ie,width:Ge,height:ke},"cover"),Mt=Math.min(Ue.width,Math.max(dt.width,re)),Ft=Math.min(Ue.height,Math.max(dt.height,fe)),ga=Pe({aspectRatio:d,width:ce,height:Ee}),xa=Pe({aspectRatio:d,width:Ge,height:ke},"cover"),va=Math.min(ga.width,Math.max(xa.width,o)),ba=Math.min(ga.height,Math.max(xa.height,u)),qr=[-va/2,-ba/2,va,ba];return Me.width=Ve(Mt),Me.height=Ve(Ft),be.fillStyle=Ae,be.fillRect(0,0,Mt,Ft),be.save(),be.translate(Mt/2,Ft/2),be.rotate(Q*Math.PI/180),be.scale(y,k),be.imageSmoothingEnabled=pe,be.imageSmoothingQuality=Ce,be.drawImage.apply(be,[n].concat(p(qr.map(function(Zr){return Math.floor(Ve(Zr))})))),be.restore(),Me}var Aa=String.fromCharCode;function Qr(n,e,r){var a="";r+=e;for(var d=e;d<r;d+=1)a+=Aa(n.getUint8(d));return a}var Lr=/^data:.*,/;function Nr(n){var e=n.replace(Lr,""),r=atob(e),a=new ArrayBuffer(r.length),d=new Uint8Array(a);return de(d,function(o,u){d[u]=r.charCodeAt(u)}),a}function Gr(n,e){for(var r=[],a=8192,d=new Uint8Array(n);d.length>0;)r.push(Aa.apply(null,ca(d.subarray(0,a)))),d=d.subarray(a);return"data:".concat(e,";base64,").concat(btoa(r.join("")))}function $r(n){var e=new DataView(n),r;try{var a,d,o;if(e.getUint8(0)===255&&e.getUint8(1)===216)for(var u=e.byteLength,I=2;I+1<u;){if(e.getUint8(I)===255&&e.getUint8(I+1)===225){d=I;break}I+=1}if(d){var Q=d+4,F=d+10;if(Qr(e,Q,4)==="Exif"){var y=e.getUint16(F);if(a=y===18761,(a||y===19789)&&e.getUint16(F+2,a)===42){var _=e.getUint32(F+4,a);_>=8&&(o=F+_)}}}if(o){var k=e.getUint16(o,a),ie,re;for(re=0;re<k;re+=1)if(ie=o+re*12+2,e.getUint16(ie,a)===274){ie+=8,r=e.getUint16(ie,a),e.setUint16(ie,1,a);break}}}catch(fe){r=1}return r}function Ur(n){var e=0,r=1,a=1;switch(n){case 2:r=-1;break;case 3:e=-180;break;case 4:a=-1;break;case 5:e=90,a=-1;break;case 6:e=90;break;case 7:e=90,r=-1;break;case 8:e=-90;break}return{rotate:e,scaleX:r,scaleY:a}}var Hr={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var e=this.element,r=this.options,a=this.container,d=this.cropper,o=Number(r.minContainerWidth),u=Number(r.minContainerHeight);ge(d,R),De(e,R);var I={width:Math.max(a.offsetWidth,o>=0?o:na),height:Math.max(a.offsetHeight,u>=0?u:oa)};this.containerData=I,Te(d,{width:I.width,height:I.height}),ge(e,R),De(d,R)},initCanvas:function(){var e=this.containerData,r=this.imageData,a=this.options.viewMode,d=Math.abs(r.rotate)%180===90,o=d?r.naturalHeight:r.naturalWidth,u=d?r.naturalWidth:r.naturalHeight,I=o/u,Q=e.width,F=e.height;e.height*I>e.width?a===3?Q=e.height*I:F=e.width/I:a===3?F=e.width/I:Q=e.height*I;var y={aspectRatio:I,naturalWidth:o,naturalHeight:u,width:Q,height:F};this.canvasData=y,this.limited=a===1||a===2,this.limitCanvas(!0,!0),y.width=Math.min(Math.max(y.width,y.minWidth),y.maxWidth),y.height=Math.min(Math.max(y.height,y.minHeight),y.maxHeight),y.left=(e.width-y.width)/2,y.top=(e.height-y.height)/2,y.oldLeft=y.left,y.oldTop=y.top,this.initialCanvasData=he({},y)},limitCanvas:function(e,r){var a=this.options,d=this.containerData,o=this.canvasData,u=this.cropBoxData,I=a.viewMode,Q=o.aspectRatio,F=this.cropped&&u;if(e){var y=Number(a.minCanvasWidth)||0,_=Number(a.minCanvasHeight)||0;I>1?(y=Math.max(y,d.width),_=Math.max(_,d.height),I===3&&(_*Q>y?y=_*Q:_=y/Q)):I>0&&(y?y=Math.max(y,F?u.width:0):_?_=Math.max(_,F?u.height:0):F&&(y=u.width,_=u.height,_*Q>y?y=_*Q:_=y/Q));var k=Pe({aspectRatio:Q,width:y,height:_});y=k.width,_=k.height,o.minWidth=y,o.minHeight=_,o.maxWidth=1/0,o.maxHeight=1/0}if(r)if(I>(F?0:1)){var ie=d.width-o.width,re=d.height-o.height;o.minLeft=Math.min(0,ie),o.minTop=Math.min(0,re),o.maxLeft=Math.max(0,ie),o.maxTop=Math.max(0,re),F&&this.limited&&(o.minLeft=Math.min(u.left,u.left+(u.width-o.width)),o.minTop=Math.min(u.top,u.top+(u.height-o.height)),o.maxLeft=u.left,o.maxTop=u.top,I===2&&(o.width>=d.width&&(o.minLeft=Math.min(0,ie),o.maxLeft=Math.max(0,ie)),o.height>=d.height&&(o.minTop=Math.min(0,re),o.maxTop=Math.max(0,re))))}else o.minLeft=-o.width,o.minTop=-o.height,o.maxLeft=d.width,o.maxTop=d.height},renderCanvas:function(e,r){var a=this.canvasData,d=this.imageData;if(r){var o=kr({width:d.naturalWidth*Math.abs(d.scaleX||1),height:d.naturalHeight*Math.abs(d.scaleY||1),degree:d.rotate||0}),u=o.width,I=o.height,Q=a.width*(u/a.naturalWidth),F=a.height*(I/a.naturalHeight);a.left-=(Q-a.width)/2,a.top-=(F-a.height)/2,a.width=Q,a.height=F,a.aspectRatio=u/I,a.naturalWidth=u,a.naturalHeight=I,this.limitCanvas(!0,!1)}(a.width>a.maxWidth||a.width<a.minWidth)&&(a.left=a.oldLeft),(a.height>a.maxHeight||a.height<a.minHeight)&&(a.top=a.oldTop),a.width=Math.min(Math.max(a.width,a.minWidth),a.maxWidth),a.height=Math.min(Math.max(a.height,a.minHeight),a.maxHeight),this.limitCanvas(!1,!0),a.left=Math.min(Math.max(a.left,a.minLeft),a.maxLeft),a.top=Math.min(Math.max(a.top,a.minTop),a.maxTop),a.oldLeft=a.left,a.oldTop=a.top,Te(this.canvas,he({width:a.width,height:a.height},et({translateX:a.left,translateY:a.top}))),this.renderImage(e),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(e){var r=this.canvasData,a=this.imageData,d=a.naturalWidth*(r.width/r.naturalWidth),o=a.naturalHeight*(r.height/r.naturalHeight);he(a,{width:d,height:o,left:(r.width-d)/2,top:(r.height-o)/2}),Te(this.image,he({width:a.width,height:a.height},et(he({translateX:a.left,translateY:a.top},a)))),e&&this.output()},initCropBox:function(){var e=this.options,r=this.canvasData,a=e.aspectRatio||e.initialAspectRatio,d=Number(e.autoCropArea)||.8,o={width:r.width,height:r.height};a&&(r.height*a>r.width?o.height=o.width/a:o.width=o.height*a),this.cropBoxData=o,this.limitCropBox(!0,!0),o.width=Math.min(Math.max(o.width,o.minWidth),o.maxWidth),o.height=Math.min(Math.max(o.height,o.minHeight),o.maxHeight),o.width=Math.max(o.minWidth,o.width*d),o.height=Math.max(o.minHeight,o.height*d),o.left=r.left+(r.width-o.width)/2,o.top=r.top+(r.height-o.height)/2,o.oldLeft=o.left,o.oldTop=o.top,this.initialCropBoxData=he({},o)},limitCropBox:function(e,r){var a=this.options,d=this.containerData,o=this.canvasData,u=this.cropBoxData,I=this.limited,Q=a.aspectRatio;if(e){var F=Number(a.minCropBoxWidth)||0,y=Number(a.minCropBoxHeight)||0,_=I?Math.min(d.width,o.width,o.width+o.left,d.width-o.left):d.width,k=I?Math.min(d.height,o.height,o.height+o.top,d.height-o.top):d.height;F=Math.min(F,d.width),y=Math.min(y,d.height),Q&&(F&&y?y*Q>F?y=F/Q:F=y*Q:F?y=F/Q:y&&(F=y*Q),k*Q>_?k=_/Q:_=k*Q),u.minWidth=Math.min(F,_),u.minHeight=Math.min(y,k),u.maxWidth=_,u.maxHeight=k}r&&(I?(u.minLeft=Math.max(0,o.left),u.minTop=Math.max(0,o.top),u.maxLeft=Math.min(d.width,o.left+o.width)-u.width,u.maxTop=Math.min(d.height,o.top+o.height)-u.height):(u.minLeft=0,u.minTop=0,u.maxLeft=d.width-u.width,u.maxTop=d.height-u.height))},renderCropBox:function(){var e=this.options,r=this.containerData,a=this.cropBoxData;(a.width>a.maxWidth||a.width<a.minWidth)&&(a.left=a.oldLeft),(a.height>a.maxHeight||a.height<a.minHeight)&&(a.top=a.oldTop),a.width=Math.min(Math.max(a.width,a.minWidth),a.maxWidth),a.height=Math.min(Math.max(a.height,a.minHeight),a.maxHeight),this.limitCropBox(!1,!0),a.left=Math.min(Math.max(a.left,a.minLeft),a.maxLeft),a.top=Math.min(Math.max(a.top,a.minTop),a.maxTop),a.oldLeft=a.left,a.oldTop=a.top,e.movable&&e.cropBoxMovable&&Je(this.face,Z,a.width>=r.width&&a.height>=r.height?V:L),Te(this.cropBox,he({width:a.width,height:a.height},et({translateX:a.left,translateY:a.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),Ye(this.element,Be,this.getData())}},Xr={initPreview:function(){var e=this.element,r=this.crossOrigin,a=this.options.preview,d=r?this.crossOriginUrl:this.url,o=e.alt||"The image to preview",u=document.createElement("img");if(r&&(u.crossOrigin=r),u.src=d,u.alt=o,this.viewBox.appendChild(u),this.viewBoxImage=u,!!a){var I=a;typeof a=="string"?I=e.ownerDocument.querySelectorAll(a):a.querySelector&&(I=[a]),this.previews=I,de(I,function(Q){var F=document.createElement("img");Je(Q,K,{width:Q.offsetWidth,height:Q.offsetHeight,html:Q.innerHTML}),r&&(F.crossOrigin=r),F.src=d,F.alt=o,F.style.cssText='display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',Q.innerHTML="",Q.appendChild(F)})}},resetPreview:function(){de(this.previews,function(e){var r=Bt(e,K);Te(e,{width:r.width,height:r.height}),e.innerHTML=r.html,Rr(e,K)})},preview:function(){var e=this.imageData,r=this.canvasData,a=this.cropBoxData,d=a.width,o=a.height,u=e.width,I=e.height,Q=a.left-r.left-e.left,F=a.top-r.top-e.top;!this.cropped||this.disabled||(Te(this.viewBoxImage,he({width:u,height:I},et(he({translateX:-Q,translateY:-F},e)))),de(this.previews,function(y){var _=Bt(y,K),k=_.width,ie=_.height,re=k,fe=ie,le=1;d&&(le=k/d,fe=o*le),o&&fe>ie&&(le=ie/o,re=d*le,fe=ie),Te(y,{width:re,height:fe}),Te(y.getElementsByTagName("img")[0],he({width:u*le,height:I*le},et(he({translateX:-Q*le,translateY:-F*le},e))))}))}},Wr={bind:function(){var e=this.element,r=this.options,a=this.cropper;ve(r.cropstart)&&Ie(e,It,r.cropstart),ve(r.cropmove)&&Ie(e,Ct,r.cropmove),ve(r.cropend)&&Ie(e,Ke,r.cropend),ve(r.crop)&&Ie(e,Be,r.crop),ve(r.zoom)&&Ie(e,Et,r.zoom),Ie(a,Kt,this.onCropStart=this.cropStart.bind(this)),r.zoomable&&r.zoomOnWheel&&Ie(a,ra,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),r.toggleDragModeOnDblclick&&Ie(a,Zt,this.onDblclick=this.dblclick.bind(this)),Ie(e.ownerDocument,Jt,this.onCropMove=this.cropMove.bind(this)),Ie(e.ownerDocument,ea,this.onCropEnd=this.cropEnd.bind(this)),r.responsive&&Ie(window,aa,this.onResize=this.resize.bind(this))},unbind:function(){var e=this.element,r=this.options,a=this.cropper;ve(r.cropstart)&&_e(e,It,r.cropstart),ve(r.cropmove)&&_e(e,Ct,r.cropmove),ve(r.cropend)&&_e(e,Ke,r.cropend),ve(r.crop)&&_e(e,Be,r.crop),ve(r.zoom)&&_e(e,Et,r.zoom),_e(a,Kt,this.onCropStart),r.zoomable&&r.zoomOnWheel&&_e(a,ra,this.onWheel,{passive:!1,capture:!0}),r.toggleDragModeOnDblclick&&_e(a,Zt,this.onDblclick),_e(e.ownerDocument,Jt,this.onCropMove),_e(e.ownerDocument,ea,this.onCropEnd),r.responsive&&_e(window,aa,this.onResize)}},jr={resize:function(){if(!this.disabled){var e=this.options,r=this.container,a=this.containerData,d=r.offsetWidth/a.width,o=r.offsetHeight/a.height,u=Math.abs(d-1)>Math.abs(o-1)?d:o;if(u!==1){var I,Q;e.restore&&(I=this.getCanvasData(),Q=this.getCropBoxData()),this.render(),e.restore&&(this.setCanvasData(de(I,function(F,y){I[y]=F*u})),this.setCropBoxData(de(Q,function(F,y){Q[y]=F*u})))}}},dblclick:function(){this.disabled||this.options.dragMode===Le||this.setDragMode(Mr(this.dragBox,te)?ue:se)},wheel:function(e){var r=this,a=Number(this.options.wheelZoomRatio)||.1,d=1;this.disabled||(e.preventDefault(),!this.wheeling&&(this.wheeling=!0,setTimeout(function(){r.wheeling=!1},50),e.deltaY?d=e.deltaY>0?1:-1:e.wheelDelta?d=-e.wheelDelta/120:e.detail&&(d=e.detail>0?1:-1),this.zoom(-d*a,e)))},cropStart:function(e){var r=e.buttons,a=e.button;if(!(this.disabled||(e.type==="mousedown"||e.type==="pointerdown"&&e.pointerType==="mouse")&&(ae(r)&&r!==1||ae(a)&&a!==0||e.ctrlKey))){var d=this.options,o=this.pointers,u;e.changedTouches?de(e.changedTouches,function(I){o[I.identifier]=ut(I)}):o[e.pointerId||0]=ut(e),Object.keys(o).length>1&&d.zoomable&&d.zoomOnTouch?u=j:u=Bt(e.target,Z),vr.test(u)&&Ye(this.element,It,{originalEvent:e,action:u})!==!1&&(e.preventDefault(),this.action=u,this.cropping=!1,u===U&&(this.cropping=!0,ge(this.dragBox,O)))}},cropMove:function(e){var r=this.action;if(!(this.disabled||!r)){var a=this.pointers;e.preventDefault(),Ye(this.element,Ct,{originalEvent:e,action:r})!==!1&&(e.changedTouches?de(e.changedTouches,function(d){he(a[d.identifier]||{},ut(d,!0))}):he(a[e.pointerId||0]||{},ut(e,!0)),this.change(e))}},cropEnd:function(e){if(!this.disabled){var r=this.action,a=this.pointers;e.changedTouches?de(e.changedTouches,function(d){delete a[d.identifier]}):delete a[e.pointerId||0],r&&(e.preventDefault(),Object.keys(a).length||(this.action=""),this.cropping&&(this.cropping=!1,ze(this.dragBox,O,this.cropped&&this.options.modal)),Ye(this.element,Ke,{originalEvent:e,action:r}))}}},Vr={change:function(e){var r=this.options,a=this.canvasData,d=this.containerData,o=this.cropBoxData,u=this.pointers,I=this.action,Q=r.aspectRatio,F=o.left,y=o.top,_=o.width,k=o.height,ie=F+_,re=y+k,fe=0,le=0,Ae=d.width,xe=d.height,pe=!0,Re;!Q&&e.shiftKey&&(Q=_&&k?_/k:1),this.limited&&(fe=o.minLeft,le=o.minTop,Ae=fe+Math.min(d.width,a.width,a.left+a.width),xe=le+Math.min(d.height,a.height,a.top+a.height));var Ce=u[Object.keys(u)[0]],N={x:Ce.endX-Ce.startX,y:Ce.endY-Ce.startY},ce=function(Ee){switch(Ee){case Y:ie+N.x>Ae&&(N.x=Ae-ie);break;case H:F+N.x<fe&&(N.x=fe-F);break;case z:y+N.y<le&&(N.y=le-y);break;case W:re+N.y>xe&&(N.y=xe-re);break}};switch(I){case L:F+=N.x,y+=N.y;break;case Y:if(N.x>=0&&(ie>=Ae||Q&&(y<=le||re>=xe))){pe=!1;break}ce(Y),_+=N.x,_<0&&(I=H,_=-_,F-=_),Q&&(k=_/Q,y+=(o.height-k)/2);break;case z:if(N.y<=0&&(y<=le||Q&&(F<=fe||ie>=Ae))){pe=!1;break}ce(z),k-=N.y,y+=N.y,k<0&&(I=W,k=-k,y-=k),Q&&(_=k*Q,F+=(o.width-_)/2);break;case H:if(N.x<=0&&(F<=fe||Q&&(y<=le||re>=xe))){pe=!1;break}ce(H),_-=N.x,F+=N.x,_<0&&(I=Y,_=-_,F-=_),Q&&(k=_/Q,y+=(o.height-k)/2);break;case W:if(N.y>=0&&(re>=xe||Q&&(F<=fe||ie>=Ae))){pe=!1;break}ce(W),k+=N.y,k<0&&(I=z,k=-k,y-=k),Q&&(_=k*Q,F+=(o.width-_)/2);break;case X:if(Q){if(N.y<=0&&(y<=le||ie>=Ae)){pe=!1;break}ce(z),k-=N.y,y+=N.y,_=k*Q}else ce(z),ce(Y),N.x>=0?ie<Ae?_+=N.x:N.y<=0&&y<=le&&(pe=!1):_+=N.x,N.y<=0?y>le&&(k-=N.y,y+=N.y):(k-=N.y,y+=N.y);_<0&&k<0?(I=oe,k=-k,_=-_,y-=k,F-=_):_<0?(I=J,_=-_,F-=_):k<0&&(I=q,k=-k,y-=k);break;case J:if(Q){if(N.y<=0&&(y<=le||F<=fe)){pe=!1;break}ce(z),k-=N.y,y+=N.y,_=k*Q,F+=o.width-_}else ce(z),ce(H),N.x<=0?F>fe?(_-=N.x,F+=N.x):N.y<=0&&y<=le&&(pe=!1):(_-=N.x,F+=N.x),N.y<=0?y>le&&(k-=N.y,y+=N.y):(k-=N.y,y+=N.y);_<0&&k<0?(I=q,k=-k,_=-_,y-=k,F-=_):_<0?(I=X,_=-_,F-=_):k<0&&(I=oe,k=-k,y-=k);break;case oe:if(Q){if(N.x<=0&&(F<=fe||re>=xe)){pe=!1;break}ce(H),_-=N.x,F+=N.x,k=_/Q}else ce(W),ce(H),N.x<=0?F>fe?(_-=N.x,F+=N.x):N.y>=0&&re>=xe&&(pe=!1):(_-=N.x,F+=N.x),N.y>=0?re<xe&&(k+=N.y):k+=N.y;_<0&&k<0?(I=X,k=-k,_=-_,y-=k,F-=_):_<0?(I=q,_=-_,F-=_):k<0&&(I=J,k=-k,y-=k);break;case q:if(Q){if(N.x>=0&&(ie>=Ae||re>=xe)){pe=!1;break}ce(Y),_+=N.x,k=_/Q}else ce(W),ce(Y),N.x>=0?ie<Ae?_+=N.x:N.y>=0&&re>=xe&&(pe=!1):_+=N.x,N.y>=0?re<xe&&(k+=N.y):k+=N.y;_<0&&k<0?(I=J,k=-k,_=-_,y-=k,F-=_):_<0?(I=oe,_=-_,F-=_):k<0&&(I=X,k=-k,y-=k);break;case V:this.move(N.x,N.y),pe=!1;break;case j:this.zoom(Tr(u),e),pe=!1;break;case U:if(!N.x||!N.y){pe=!1;break}Re=ua(this.cropper),F=Ce.startX-Re.left,y=Ce.startY-Re.top,_=o.minWidth,k=o.minHeight,N.x>0?I=N.y>0?q:X:N.x<0&&(F-=_,I=N.y>0?oe:J),N.y<0&&(y-=k),this.cropped||(De(this.cropBox,R),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0));break}pe&&(o.width=_,o.height=k,o.left=F,o.top=y,this.action=I,this.renderCropBox()),de(u,function(me){me.startX=me.endX,me.startY=me.endY})}},zr={crop:function(){return this.ready&&!this.cropped&&!this.disabled&&(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&ge(this.dragBox,O),De(this.cropBox,R),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=he({},this.initialImageData),this.canvasData=he({},this.initialCanvasData),this.cropBoxData=he({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(he(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),De(this.dragBox,O),ge(this.cropBox,R)),this},replace:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return!this.disabled&&e&&(this.isImg&&(this.element.src=e),r?(this.url=e,this.image.src=e,this.ready&&(this.viewBoxImage.src=e,de(this.previews,function(a){a.getElementsByTagName("img")[0].src=e}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(e))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,De(this.cropper,w)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,ge(this.cropper,w)),this},destroy:function(){var e=this.element;return e[B]?(e[B]=void 0,this.isImg&&this.replaced&&(e.src=this.originalUrl),this.uncreate(),this):this},move:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,a=this.canvasData,d=a.left,o=a.top;return this.moveTo(yt(e)?e:d+Number(e),yt(r)?r:o+Number(r))},moveTo:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,a=this.canvasData,d=!1;return e=Number(e),r=Number(r),this.ready&&!this.disabled&&this.options.movable&&(ae(e)&&(a.left=e,d=!0),ae(r)&&(a.top=r,d=!0),d&&this.renderCanvas(!0)),this},zoom:function(e,r){var a=this.canvasData;return e=Number(e),e<0?e=1/(1-e):e=1+e,this.zoomTo(a.width*e/a.naturalWidth,null,r)},zoomTo:function(e,r,a){var d=this.options,o=this.canvasData,u=o.width,I=o.height,Q=o.naturalWidth,F=o.naturalHeight;if(e=Number(e),e>=0&&this.ready&&!this.disabled&&d.zoomable){var y=Q*e,_=F*e;if(Ye(this.element,Et,{ratio:e,oldRatio:u/Q,originalEvent:a})===!1)return this;if(a){var k=this.pointers,ie=ua(this.cropper),re=k&&Object.keys(k).length?Pr(k):{pageX:a.pageX,pageY:a.pageY};o.left-=(y-u)*((re.pageX-ie.left-o.left)/u),o.top-=(_-I)*((re.pageY-ie.top-o.top)/I)}else je(r)&&ae(r.x)&&ae(r.y)?(o.left-=(y-u)*((r.x-o.left)/u),o.top-=(_-I)*((r.y-o.top)/I)):(o.left-=(y-u)/2,o.top-=(_-I)/2);o.width=y,o.height=_,this.renderCanvas(!0)}return this},rotate:function(e){return this.rotateTo((this.imageData.rotate||0)+Number(e))},rotateTo:function(e){return e=Number(e),ae(e)&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=e%360,this.renderCanvas(!0,!0)),this},scaleX:function(e){var r=this.imageData.scaleY;return this.scale(e,ae(r)?r:1)},scaleY:function(e){var r=this.imageData.scaleX;return this.scale(ae(r)?r:1,e)},scale:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,a=this.imageData,d=!1;return e=Number(e),r=Number(r),this.ready&&!this.disabled&&this.options.scalable&&(ae(e)&&(a.scaleX=e,d=!0),ae(r)&&(a.scaleY=r,d=!0),d&&this.renderCanvas(!0,!0)),this},getData:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,r=this.options,a=this.imageData,d=this.canvasData,o=this.cropBoxData,u;if(this.ready&&this.cropped){u={x:o.left-d.left,y:o.top-d.top,width:o.width,height:o.height};var I=a.width/a.naturalWidth;if(de(u,function(y,_){u[_]=y/I}),e){var Q=Math.round(u.y+u.height),F=Math.round(u.x+u.width);u.x=Math.round(u.x),u.y=Math.round(u.y),u.width=F-u.x,u.height=Q-u.y}}else u={x:0,y:0,width:0,height:0};return r.rotatable&&(u.rotate=a.rotate||0),r.scalable&&(u.scaleX=a.scaleX||1,u.scaleY=a.scaleY||1),u},setData:function(e){var r=this.options,a=this.imageData,d=this.canvasData,o={};if(this.ready&&!this.disabled&&je(e)){var u=!1;r.rotatable&&ae(e.rotate)&&e.rotate!==a.rotate&&(a.rotate=e.rotate,u=!0),r.scalable&&(ae(e.scaleX)&&e.scaleX!==a.scaleX&&(a.scaleX=e.scaleX,u=!0),ae(e.scaleY)&&e.scaleY!==a.scaleY&&(a.scaleY=e.scaleY,u=!0)),u&&this.renderCanvas(!0,!0);var I=a.width/a.naturalWidth;ae(e.x)&&(o.left=e.x*I+d.left),ae(e.y)&&(o.top=e.y*I+d.top),ae(e.width)&&(o.width=e.width*I),ae(e.height)&&(o.height=e.height*I),this.setCropBoxData(o)}return this},getContainerData:function(){return this.ready?he({},this.containerData):{}},getImageData:function(){return this.sized?he({},this.imageData):{}},getCanvasData:function(){var e=this.canvasData,r={};return this.ready&&de(["left","top","width","height","naturalWidth","naturalHeight"],function(a){r[a]=e[a]}),r},setCanvasData:function(e){var r=this.canvasData,a=r.aspectRatio;return this.ready&&!this.disabled&&je(e)&&(ae(e.left)&&(r.left=e.left),ae(e.top)&&(r.top=e.top),ae(e.width)?(r.width=e.width,r.height=e.width/a):ae(e.height)&&(r.height=e.height,r.width=e.height*a),this.renderCanvas(!0)),this},getCropBoxData:function(){var e=this.cropBoxData,r;return this.ready&&this.cropped&&(r={left:e.left,top:e.top,width:e.width,height:e.height}),r||{}},setCropBoxData:function(e){var r=this.cropBoxData,a=this.options.aspectRatio,d,o;return this.ready&&this.cropped&&!this.disabled&&je(e)&&(ae(e.left)&&(r.left=e.left),ae(e.top)&&(r.top=e.top),ae(e.width)&&e.width!==r.width&&(d=!0,r.width=e.width),ae(e.height)&&e.height!==r.height&&(o=!0,r.height=e.height),a&&(d?r.height=r.width/a:o&&(r.width=r.height*a)),this.renderCropBox()),this},getCroppedCanvas:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var r=this.canvasData,a=Or(this.image,this.imageData,r,e);if(!this.cropped)return a;var d=this.getData(e.rounded),o=d.x,u=d.y,I=d.width,Q=d.height,F=a.width/Math.floor(r.naturalWidth);F!==1&&(o*=F,u*=F,I*=F,Q*=F);var y=I/Q,_=Pe({aspectRatio:y,width:e.maxWidth||1/0,height:e.maxHeight||1/0}),k=Pe({aspectRatio:y,width:e.minWidth||0,height:e.minHeight||0},"cover"),ie=Pe({aspectRatio:y,width:e.width||(F!==1?a.width:I),height:e.height||(F!==1?a.height:Q)}),re=ie.width,fe=ie.height;re=Math.min(_.width,Math.max(k.width,re)),fe=Math.min(_.height,Math.max(k.height,fe));var le=document.createElement("canvas"),Ae=le.getContext("2d");le.width=Ve(re),le.height=Ve(fe),Ae.fillStyle=e.fillColor||"transparent",Ae.fillRect(0,0,re,fe);var xe=e.imageSmoothingEnabled,pe=xe===void 0?!0:xe,Re=e.imageSmoothingQuality;Ae.imageSmoothingEnabled=pe,Re&&(Ae.imageSmoothingQuality=Re);var Ce=a.width,N=a.height,ce=o,me=u,Ee,Se,Ge,$e,ke,Me;ce<=-I||ce>Ce?(ce=0,Ee=0,Ge=0,ke=0):ce<=0?(Ge=-ce,ce=0,Ee=Math.min(Ce,I+ce),ke=Ee):ce<=Ce&&(Ge=0,Ee=Math.min(I,Ce-ce),ke=Ee),Ee<=0||me<=-Q||me>N?(me=0,Se=0,$e=0,Me=0):me<=0?($e=-me,me=0,Se=Math.min(N,Q+me),Me=Se):me<=N&&($e=0,Se=Math.min(Q,N-me),Me=Se);var be=[ce,me,Ee,Se];if(ke>0&&Me>0){var Ue=re/I;be.push(Ge*Ue,$e*Ue,ke*Ue,Me*Ue)}return Ae.drawImage.apply(Ae,[a].concat(p(be.map(function(dt){return Math.floor(Ve(dt))})))),le},setAspectRatio:function(e){var r=this.options;return!this.disabled&&!yt(e)&&(r.aspectRatio=Math.max(0,e)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(e){var r=this.options,a=this.dragBox,d=this.face;if(this.ready&&!this.disabled){var o=e===se,u=r.movable&&e===ue;e=o||u?e:Le,r.dragMode=e,Je(a,Z,e),ze(a,te,o),ze(a,ee,u),r.cropBoxMovable||(Je(d,Z,e),ze(d,te,o),ze(d,ee,u))}return this}},Yr=C.Cropper,ma=function(){function n(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(l(this,n),!e||!Cr.test(e.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=e,this.options=he({},sa,je(r)&&r),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return E(n,[{key:"init",value:function(){var r=this.element,a=r.tagName.toLowerCase(),d;if(!r[B]){if(r[B]=this,a==="img"){if(this.isImg=!0,d=r.getAttribute("src")||"",this.originalUrl=d,!d)return;d=r.src}else a==="canvas"&&window.HTMLCanvasElement&&(d=r.toDataURL());this.load(d)}}},{key:"load",value:function(r){var a=this;if(r){this.url=r,this.imageData={};var d=this.element,o=this.options;if(!o.rotatable&&!o.scalable&&(o.checkOrientation=!1),!o.checkOrientation||!window.ArrayBuffer){this.clone();return}if(br.test(r)){wr.test(r)?this.read(Nr(r)):this.clone();return}var u=new XMLHttpRequest,I=this.clone.bind(this);this.reloading=!0,this.xhr=u,u.onabort=I,u.onerror=I,u.ontimeout=I,u.onprogress=function(){u.getResponseHeader("content-type")!==ia&&u.abort()},u.onload=function(){a.read(u.response)},u.onloadend=function(){a.reloading=!1,a.xhr=null},o.checkCrossOrigin&&da(r)&&d.crossOrigin&&(r=pa(r)),u.open("GET",r,!0),u.responseType="arraybuffer",u.withCredentials=d.crossOrigin==="use-credentials",u.send()}}},{key:"read",value:function(r){var a=this.options,d=this.imageData,o=$r(r),u=0,I=1,Q=1;if(o>1){this.url=Gr(r,ia);var F=Ur(o);u=F.rotate,I=F.scaleX,Q=F.scaleY}a.rotatable&&(d.rotate=u),a.scalable&&(d.scaleX=I,d.scaleY=Q),this.clone()}},{key:"clone",value:function(){var r=this.element,a=this.url,d=r.crossOrigin,o=a;this.options.checkCrossOrigin&&da(a)&&(d||(d="anonymous"),o=pa(a)),this.crossOrigin=d,this.crossOriginUrl=o;var u=document.createElement("img");d&&(u.crossOrigin=d),u.src=o||a,u.alt=r.alt||"The image to crop",this.image=u,u.onload=this.start.bind(this),u.onerror=this.stop.bind(this),ge(u,S),r.parentNode.insertBefore(u,r.nextSibling)}},{key:"start",value:function(){var r=this,a=this.image;a.onload=null,a.onerror=null,this.sizing=!0;var d=C.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(C.navigator.userAgent),o=function(F,y){he(r.imageData,{naturalWidth:F,naturalHeight:y,aspectRatio:F/y}),r.initialImageData=he({},r.imageData),r.sizing=!1,r.sized=!0,r.build()};if(a.naturalWidth&&!d){o(a.naturalWidth,a.naturalHeight);return}var u=document.createElement("img"),I=document.body||document.documentElement;this.sizingImage=u,u.onload=function(){o(u.width,u.height),d||I.removeChild(u)},u.src=a.src,d||(u.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",I.appendChild(u))}},{key:"stop",value:function(){var r=this.image;r.onload=null,r.onerror=null,r.parentNode.removeChild(r),this.image=null}},{key:"build",value:function(){if(!(!this.sized||this.ready)){var r=this.element,a=this.options,d=this.image,o=r.parentNode,u=document.createElement("div");u.innerHTML=Ir;var I=u.querySelector(".".concat(B,"-container")),Q=I.querySelector(".".concat(B,"-canvas")),F=I.querySelector(".".concat(B,"-drag-box")),y=I.querySelector(".".concat(B,"-crop-box")),_=y.querySelector(".".concat(B,"-face"));this.container=o,this.cropper=I,this.canvas=Q,this.dragBox=F,this.cropBox=y,this.viewBox=I.querySelector(".".concat(B,"-view-box")),this.face=_,Q.appendChild(d),ge(r,R),o.insertBefore(I,r.nextSibling),De(d,S),this.initPreview(),this.bind(),a.initialAspectRatio=Math.max(0,a.initialAspectRatio)||NaN,a.aspectRatio=Math.max(0,a.aspectRatio)||NaN,a.viewMode=Math.max(0,Math.min(3,Math.round(a.viewMode)))||0,ge(y,R),a.guides||ge(y.getElementsByClassName("".concat(B,"-dashed")),R),a.center||ge(y.getElementsByClassName("".concat(B,"-center")),R),a.background&&ge(I,"".concat(B,"-bg")),a.highlight||ge(_,G),a.cropBoxMovable&&(ge(_,ee),Je(_,Z,L)),a.cropBoxResizable||(ge(y.getElementsByClassName("".concat(B,"-line")),R),ge(y.getElementsByClassName("".concat(B,"-point")),R)),this.render(),this.ready=!0,this.setDragMode(a.dragMode),a.autoCrop&&this.crop(),this.setData(a.data),ve(a.ready)&&Ie(r,ta,a.ready,{once:!0}),Ye(r,ta)}}},{key:"unbuild",value:function(){if(this.ready){this.ready=!1,this.unbind(),this.resetPreview();var r=this.cropper.parentNode;r&&r.removeChild(this.cropper),De(this.element,R)}}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=Yr,n}},{key:"setDefaults",value:function(r){he(sa,je(r)&&r)}}]),n}();return he(ma.prototype,Hr,Xr,Wr,jr,Vr,zr),ma})});var ir=St((rr,jt)=>{(function(t){if(typeof rr=="object"&&typeof jt!="undefined")jt.exports=t();else if(typeof define=="function"&&define.amd)define([],t);else{var i;typeof window!="undefined"?i=window:typeof global!="undefined"?i=global:typeof self!="undefined"?i=self:i=this,i.pica=t()}})(function(){var t,i,x;return function(){function l(f,E,g){function p(c,v){if(!E[c]){if(!f[c]){var h=typeof tt=="function"&&tt;if(!v&&h)return h(c,!0);if(s)return s(c,!0);var m=new Error("Cannot find module '"+c+"'");throw m.code="MODULE_NOT_FOUND",m}var T=E[c]={exports:{}};f[c][0].call(T.exports,function(b){var C=f[c][1][b];return p(C||b)},T,T.exports,l,f,E,g)}return E[c].exports}for(var s=typeof tt=="function"&&tt,A=0;A<g.length;A++)p(g[A]);return p}return l}()({1:[function(l,f,E){"use strict";var g=l("multimath"),p=l("./mm_unsharp_mask"),s=l("./mm_resize");function A(c){var v=c||[],h={js:v.indexOf("js")>=0,wasm:v.indexOf("wasm")>=0};g.call(this,h),this.features={js:h.js,wasm:h.wasm&&this.has_wasm()},this.use(p),this.use(s)}A.prototype=Object.create(g.prototype),A.prototype.constructor=A,A.prototype.resizeAndUnsharp=function(v,h){var m=this.resize(v,h);return v.unsharpAmount&&this.unsharp_mask(m,v.toWidth,v.toHeight,v.unsharpAmount,v.unsharpRadius,v.unsharpThreshold),m},f.exports=A},{"./mm_resize":4,"./mm_unsharp_mask":9,multimath:19}],2:[function(l,f,E){"use strict";function g(h){return h<0?0:h>255?255:h}function p(h){return h>=0?h:0}function s(h,m,T,b,C,M){var P,B,L,U,V,j,Y,H,W,z,X,J=0,q=0;for(W=0;W<b;W++){for(V=0,z=0;z<C;z++){for(j=M[V++],Y=M[V++],H=J+j*4|0,P=B=L=U=0;Y>0;Y--)X=M[V++],U=U+X*h[H+3]|0,L=L+X*h[H+2]|0,B=B+X*h[H+1]|0,P=P+X*h[H]|0,H=H+4|0;m[q+3]=p(U>>7),m[q+2]=p(L>>7),m[q+1]=p(B>>7),m[q]=p(P>>7),q=q+b*4|0}q=(W+1)*4|0,J=(W+1)*T*4|0}}function A(h,m,T,b,C,M){var P,B,L,U,V,j,Y,H,W,z,X,J=0,q=0;for(W=0;W<b;W++){for(V=0,z=0;z<C;z++){for(j=M[V++],Y=M[V++],H=J+j*4|0,P=B=L=U=0;Y>0;Y--)X=M[V++],U=U+X*h[H+3]|0,L=L+X*h[H+2]|0,B=B+X*h[H+1]|0,P=P+X*h[H]|0,H=H+4|0;P>>=7,B>>=7,L>>=7,U>>=7,m[q+3]=g(U+8192>>14),m[q+2]=g(L+8192>>14),m[q+1]=g(B+8192>>14),m[q]=g(P+8192>>14),q=q+b*4|0}q=(W+1)*4|0,J=(W+1)*T*4|0}}function c(h,m,T,b,C,M){var P,B,L,U,V,j,Y,H,W,z,X,J,q=0,oe=0;for(z=0;z<b;z++){for(j=0,X=0;X<C;X++){for(Y=M[j++],H=M[j++],W=q+Y*4|0,P=B=L=U=0;H>0;H--)J=M[j++],V=h[W+3],U=U+J*V|0,L=L+J*h[W+2]*V|0,B=B+J*h[W+1]*V|0,P=P+J*h[W]*V|0,W=W+4|0;L=L/255|0,B=B/255|0,P=P/255|0,m[oe+3]=p(U>>7),m[oe+2]=p(L>>7),m[oe+1]=p(B>>7),m[oe]=p(P>>7),oe=oe+b*4|0}oe=(z+1)*4|0,q=(z+1)*T*4|0}}function v(h,m,T,b,C,M){var P,B,L,U,V,j,Y,H,W,z,X,J=0,q=0;for(W=0;W<b;W++){for(V=0,z=0;z<C;z++){for(j=M[V++],Y=M[V++],H=J+j*4|0,P=B=L=U=0;Y>0;Y--)X=M[V++],U=U+X*h[H+3]|0,L=L+X*h[H+2]|0,B=B+X*h[H+1]|0,P=P+X*h[H]|0,H=H+4|0;P>>=7,B>>=7,L>>=7,U>>=7,U=g(U+8192>>14),U>0&&(P=P*255/U|0,B=B*255/U|0,L=L*255/U|0),m[q+3]=U,m[q+2]=g(L+8192>>14),m[q+1]=g(B+8192>>14),m[q]=g(P+8192>>14),q=q+b*4|0}q=(W+1)*4|0,J=(W+1)*T*4|0}}f.exports={convolveHor:s,convolveVert:A,convolveHorWithPre:c,convolveVertWithPre:v}},{}],3:[function(l,f,E){"use strict";f.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL"},{}],4:[function(l,f,E){"use strict";f.exports={name:"resize",fn:l("./resize"),wasm_fn:l("./resize_wasm"),wasm_src:l("./convolve_wasm_base64")}},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(l,f,E){"use strict";var g=l("./resize_filter_gen"),p=l("./convolve"),s=p.convolveHor,A=p.convolveVert,c=p.convolveHorWithPre,v=p.convolveVertWithPre;function h(T,b,C){for(var M=3,P=b*C*4|0;M<P;){if(T[M]!==255)return!0;M=M+4|0}return!1}function m(T,b,C){for(var M=3,P=b*C*4|0;M<P;)T[M]=255,M=M+4|0}f.exports=function(b){var C=b.src,M=b.width,P=b.height,B=b.toWidth,L=b.toHeight,U=b.scaleX||b.toWidth/b.width,V=b.scaleY||b.toHeight/b.height,j=b.offsetX||0,Y=b.offsetY||0,H=b.dest||new Uint8Array(B*L*4),W=typeof b.filter=="undefined"?"mks2013":b.filter,z=g(W,M,B,U,j),X=g(W,P,L,V,Y),J=new Uint16Array(B*P*4);return h(C,M,P)?(c(C,J,M,P,B,z),v(J,H,P,B,L,X)):(s(C,J,M,P,B,z),A(J,H,P,B,L,X),m(H,B,L)),H}},{"./convolve":2,"./resize_filter_gen":6}],6:[function(l,f,E){"use strict";var g=l("./resize_filter_info"),p=14;function s(A){return Math.round(A*((1<<p)-1))}f.exports=function(c,v,h,m,T){var b=g.filter[c].fn,C=1/m,M=Math.min(1,m),P=g.filter[c].win/M,B,L,U,V,j,Y,H,W,z,X,J,q,oe,te,w,R,S,G=Math.floor((P+1)*2),O=new Int16Array((G+2)*h),ee=0,Z=!O.subarray||!O.set;for(B=0;B<h;B++){for(L=(B+.5)*C+T,U=Math.max(0,Math.floor(L-P)),V=Math.min(v-1,Math.ceil(L+P)),j=V-U+1,Y=new Float32Array(j),H=new Int16Array(j),W=0,z=U,X=0;z<=V;z++,X++)J=b((z+.5-L)*M),W+=J,Y[X]=J;for(q=0,X=0;X<Y.length;X++)oe=Y[X]/W,q+=oe,H[X]=s(oe);for(H[h>>1]+=s(1-q),te=0;te<H.length&&H[te]===0;)te++;if(te<H.length){for(w=H.length-1;w>0&&H[w]===0;)w--;if(R=U+te,S=w-te+1,O[ee++]=R,O[ee++]=S,!Z)O.set(H.subarray(te,w+1),ee),ee+=S;else for(X=te;X<=w;X++)O[ee++]=H[X]}else O[ee++]=0,O[ee++]=0}return O}},{"./resize_filter_info":7}],7:[function(l,f,E){"use strict";var g={box:{win:.5,fn:function(s){return s<0&&(s=-s),s<.5?1:0}},hamming:{win:1,fn:function(s){if(s<0&&(s=-s),s>=1)return 0;if(s<11920929e-14)return 1;var A=s*Math.PI;return Math.sin(A)/A*(.54+.46*Math.cos(A/1))}},lanczos2:{win:2,fn:function(s){if(s<0&&(s=-s),s>=2)return 0;if(s<11920929e-14)return 1;var A=s*Math.PI;return Math.sin(A)/A*Math.sin(A/2)/(A/2)}},lanczos3:{win:3,fn:function(s){if(s<0&&(s=-s),s>=3)return 0;if(s<11920929e-14)return 1;var A=s*Math.PI;return Math.sin(A)/A*Math.sin(A/3)/(A/3)}},mks2013:{win:2.5,fn:function(s){return s<0&&(s=-s),s>=2.5?0:s>=1.5?-.125*(s-2.5)*(s-2.5):s>=.5?.25*(4*s*s-11*s+7):1.0625-1.75*s*s}}};f.exports={filter:g,f2q:{box:0,hamming:1,lanczos2:2,lanczos3:3},q2f:["box","hamming","lanczos2","lanczos3"]}},{}],8:[function(l,f,E){"use strict";var g=l("./resize_filter_gen");function p(h,m,T){for(var b=3,C=m*T*4|0;b<C;){if(h[b]!==255)return!0;b=b+4|0}return!1}function s(h,m,T){for(var b=3,C=m*T*4|0;b<C;)h[b]=255,b=b+4|0}function A(h){return new Uint8Array(h.buffer,0,h.byteLength)}var c=!0;try{c=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1}catch(h){}function v(h,m,T){if(c){m.set(A(h),T);return}for(var b=T,C=0;C<h.length;C++){var M=h[C];m[b++]=M&255,m[b++]=M>>8&255}}f.exports=function(m){var T=m.src,b=m.width,C=m.height,M=m.toWidth,P=m.toHeight,B=m.scaleX||m.toWidth/m.width,L=m.scaleY||m.toHeight/m.height,U=m.offsetX||0,V=m.offsetY||0,j=m.dest||new Uint8Array(M*P*4),Y=typeof m.filter=="undefined"?"mks2013":m.filter,H=g(Y,b,M,B,U),W=g(Y,C,P,L,V),z=0,X=Math.max(T.byteLength,j.byteLength),J=this.__align(z+X),q=C*M*4*2,oe=this.__align(J+q),te=this.__align(oe+H.byteLength),w=te+W.byteLength,R=this.__instance("resize",w),S=new Uint8Array(this.__memory.buffer),G=new Uint32Array(this.__memory.buffer),O=new Uint32Array(T.buffer);G.set(O),v(H,S,oe),v(W,S,te);var ee=R.exports.convolveHV||R.exports._convolveHV;p(T,b,C)?ee(oe,te,J,b,C,M,P,1):(ee(oe,te,J,b,C,M,P,0),s(j,M,P));var Z=new Uint32Array(j.buffer);return Z.set(new Uint32Array(this.__memory.buffer,0,P*M)),j}},{"./resize_filter_gen":6}],9:[function(l,f,E){"use strict";f.exports={name:"unsharp_mask",fn:l("./unsharp_mask"),wasm_fn:l("./unsharp_mask_wasm"),wasm_src:l("./unsharp_mask_wasm_base64")}},{"./unsharp_mask":10,"./unsharp_mask_wasm":11,"./unsharp_mask_wasm_base64":12}],10:[function(l,f,E){"use strict";var g=l("glur/mono16");function p(s,A,c){for(var v=A*c,h=new Uint16Array(v),m,T,b,C,M=0;M<v;M++)m=s[4*M],T=s[4*M+1],b=s[4*M+2],C=m>=T&&m>=b?m:T>=b&&T>=m?T:b,h[M]=C<<8;return h}f.exports=function(A,c,v,h,m,T){var b,C,M,P,B;if(!(h===0||m<.5)){m>2&&(m=2);var L=p(A,c,v),U=new Uint16Array(L);g(U,c,v,m);for(var V=h/100*4096+.5|0,j=T<<8,Y=c*v,H=0;H<Y;H++)b=L[H],P=b-U[H],Math.abs(P)>=j&&(C=b+(V*P+2048>>12),C=C>65280?65280:C,C=C<0?0:C,b=b!==0?b:1,M=(C<<12)/b|0,B=H*4,A[B]=A[B]*M+2048>>12,A[B+1]=A[B+1]*M+2048>>12,A[B+2]=A[B+2]*M+2048>>12)}}},{"glur/mono16":18}],11:[function(l,f,E){"use strict";f.exports=function(p,s,A,c,v,h){if(!(c===0||v<.5)){v>2&&(v=2);var m=s*A,T=m*4,b=m*2,C=m*2,M=Math.max(s,A)*4,P=8*4,B=0,L=T,U=L+b,V=U+C,j=V+C,Y=j+M,H=this.__instance("unsharp_mask",T+b+C*2+M+P,{exp:Math.exp}),W=new Uint32Array(p.buffer),z=new Uint32Array(this.__memory.buffer);z.set(W);var X=H.exports.hsv_v16||H.exports._hsv_v16;X(B,L,s,A),X=H.exports.blurMono16||H.exports._blurMono16,X(L,U,V,j,Y,s,A,v),X=H.exports.unsharp||H.exports._unsharp,X(B,B,L,U,s,A,c,h),W.set(new Uint32Array(this.__memory.buffer,0,m))}}},{}],12:[function(l,f,E){"use strict";f.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"},{}],13:[function(l,f,E){"use strict";var g=100;function p(s,A){this.create=s,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=A||2e3}p.prototype.acquire=function(){var s=this,A;return this.available.length!==0?A=this.available.pop():(A=this.create(),A.id=this.lastId++,A.release=function(){return s.release(A)}),this.acquired[A.id]=A,A},p.prototype.release=function(s){var A=this;delete this.acquired[s.id],s.lastUsed=Date.now(),this.available.push(s),this.timeoutId===0&&(this.timeoutId=setTimeout(function(){return A.gc()},g))},p.prototype.gc=function(){var s=this,A=Date.now();this.available=this.available.filter(function(c){return A-c.lastUsed>s.idle?(c.destroy(),!1):!0}),this.available.length!==0?this.timeoutId=setTimeout(function(){return s.gc()},g):this.timeoutId=0},f.exports=p},{}],14:[function(l,f,E){"use strict";var g=2;f.exports=function(s,A,c,v,h,m){var T=c/s,b=v/A,C=(2*m+g+1)/h;if(C>.5)return[[c,v]];var M=Math.ceil(Math.log(Math.min(T,b))/Math.log(C));if(M<=1)return[[c,v]];for(var P=[],B=0;B<M;B++){var L=Math.round(Math.pow(Math.pow(s,M-B-1)*Math.pow(c,B+1),1/M)),U=Math.round(Math.pow(Math.pow(A,M-B-1)*Math.pow(v,B+1),1/M));P.push([L,U])}return P}},{}],15:[function(l,f,E){"use strict";var g=1e-5;function p(A){var c=Math.round(A);return Math.abs(A-c)<g?c:Math.floor(A)}function s(A){var c=Math.round(A);return Math.abs(A-c)<g?c:Math.ceil(A)}f.exports=function(c){var v=c.toWidth/c.width,h=c.toHeight/c.height,m=p(c.srcTileSize*v)-2*c.destTileBorder,T=p(c.srcTileSize*h)-2*c.destTileBorder;if(m<1||T<1)throw new Error("Internal error in pica: target tile width/height is too small.");var b,C,M,P,B,L,U=[],V;for(P=0;P<c.toHeight;P+=T)for(M=0;M<c.toWidth;M+=m)b=M-c.destTileBorder,b<0&&(b=0),B=M+m+c.destTileBorder-b,b+B>=c.toWidth&&(B=c.toWidth-b),C=P-c.destTileBorder,C<0&&(C=0),L=P+T+c.destTileBorder-C,C+L>=c.toHeight&&(L=c.toHeight-C),V={toX:b,toY:C,toWidth:B,toHeight:L,toInnerX:M,toInnerY:P,toInnerWidth:m,toInnerHeight:T,offsetX:b/v-p(b/v),offsetY:C/h-p(C/h),scaleX:v,scaleY:h,x:p(b/v),y:p(C/h),width:s(B/v),height:s(L/h)},U.push(V);return U}},{}],16:[function(l,f,E){"use strict";function g(p){return Object.prototype.toString.call(p)}f.exports.isCanvas=function(s){var A=g(s);return A==="[object HTMLCanvasElement]"||A==="[object OffscreenCanvas]"||A==="[object Canvas]"},f.exports.isImage=function(s){return g(s)==="[object HTMLImageElement]"},f.exports.isImageBitmap=function(s){return g(s)==="[object ImageBitmap]"},f.exports.limiter=function(s){var A=0,c=[];function v(){A<s&&c.length&&(A++,c.shift()())}return function(m){return new Promise(function(T,b){c.push(function(){m().then(function(C){T(C),A--,v()},function(C){b(C),A--,v()})}),v()})}},f.exports.cib_quality_name=function(s){switch(s){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"},f.exports.cib_support=function(s){return Promise.resolve().then(function(){if(typeof createImageBitmap=="undefined")return!1;var A=s(100,100);return createImageBitmap(A,0,0,100,100,{resizeWidth:10,resizeHeight:10,resizeQuality:"high"}).then(function(c){var v=c.width===10;return c.close(),A=null,v})}).catch(function(){return!1})},f.exports.worker_offscreen_canvas_support=function(){return new Promise(function(s,A){if(typeof OffscreenCanvas=="undefined"){s(!1);return}function c(m){if(typeof createImageBitmap=="undefined"){m.postMessage(!1);return}Promise.resolve().then(function(){var T=new OffscreenCanvas(10,10),b=T.getContext("2d");return b.rect(0,0,1,1),createImageBitmap(T,0,0,1,1)}).then(function(){return m.postMessage(!0)},function(){return m.postMessage(!1)})}var v=btoa("(".concat(c.toString(),")(self);")),h=new Worker("data:text/javascript;base64,".concat(v));h.onmessage=function(m){return s(m.data)},h.onerror=A}).then(function(s){return s},function(){return!1})},f.exports.can_use_canvas=function(s){var A=!1;try{var c=s(2,1),v=c.getContext("2d"),h=v.createImageData(2,1);h.data[0]=12,h.data[1]=23,h.data[2]=34,h.data[3]=255,h.data[4]=45,h.data[5]=56,h.data[6]=67,h.data[7]=255,v.putImageData(h,0,0),h=null,h=v.getImageData(0,0,2,1),h.data[0]===12&&h.data[1]===23&&h.data[2]===34&&h.data[3]===255&&h.data[4]===45&&h.data[5]===56&&h.data[6]===67&&h.data[7]===255&&(A=!0)}catch(m){}return A},f.exports.cib_can_use_region=function(){return new Promise(function(s){if(typeof Image=="undefined"||typeof createImageBitmap=="undefined"){s(!1);return}var A=new Image;A.src="data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z",A.onload=function(){createImageBitmap(A,0,0,A.width,A.height).then(function(c){c.width===A.width&&c.height===A.height?s(!0):s(!1)},function(){return s(!1)})},A.onerror=function(){return s(!1)}})}},{}],17:[function(l,f,E){"use strict";f.exports=function(){var g=l("./mathlib"),p;onmessage=function(A){var c=A.data.opts,v=!1;if(!c.src&&c.srcBitmap){var h=new OffscreenCanvas(c.width,c.height),m=h.getContext("2d");m.drawImage(c.srcBitmap,0,0),c.src=m.getImageData(0,0,c.width,c.height).data,h.width=h.height=0,h=null,c.srcBitmap.close(),c.srcBitmap=null}p||(p=new g(A.data.features));var T=p.resizeAndUnsharp(c);if(v){var b=new ImageData(new Uint8ClampedArray(T),c.toWidth,c.toHeight),C=new OffscreenCanvas(c.toWidth,c.toHeight),M=C.getContext("2d");M.putImageData(b,0,0),createImageBitmap(C).then(function(P){postMessage({bitmap:P},[P])})}else postMessage({data:T},[T.buffer])}}},{"./mathlib":1}],18:[function(l,f,E){var g,p,s,A,c,v,h,m;function T(M){M<.5&&(M=.5);var P=Math.exp(.726*.726)/M,B=Math.exp(-P),L=Math.exp(-2*P),U=(1-B)*(1-B)/(1+2*P*B-L);return g=U,p=U*(P-1)*B,s=U*(P+1)*B,A=-U*L,c=2*B,v=-L,h=(g+p)/(1-c-v),m=(s+A)/(1-c-v),new Float32Array([g,p,s,A,c,v,h,m])}function b(M,P,B,L,U,V){var j,Y,H,W,z,X,J,q,oe,te,w,R,S,G;for(oe=0;oe<V;oe++){for(X=oe*U,J=oe,q=0,j=M[X],z=j*L[6],W=z,w=L[0],R=L[1],S=L[4],G=L[5],te=0;te<U;te++)Y=M[X],H=Y*w+j*R+W*S+z*G,z=W,W=H,j=Y,B[q]=W,q++,X++;for(X--,q--,J+=V*(U-1),j=M[X],z=j*L[7],W=z,Y=j,w=L[2],R=L[3],te=U-1;te>=0;te--)H=Y*w+j*R+W*S+z*G,z=W,W=H,j=Y,Y=M[X],P[J]=B[q]+W,X--,q--,J-=V}}function C(M,P,B,L){if(L){var U=new Uint16Array(M.length),V=new Float32Array(Math.max(P,B)),j=T(L);b(M,U,V,j,P,B,L),b(U,M,V,j,B,P,L)}}f.exports=C},{}],19:[function(l,f,E){"use strict";var g=l("object-assign"),p=l("./lib/base64decode"),s=l("./lib/wa_detect"),A={js:!0,wasm:!0};function c(v){if(!(this instanceof c))return new c(v);var h=g({},A,v||{});if(this.options=h,this.__cache={},this.__init_promise=null,this.__modules=h.modules||{},this.__memory=null,this.__wasm={},this.__isLE=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1,!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}c.prototype.has_wasm=s,c.prototype.use=function(v){return this.__modules[v.name]=v,this.options.wasm&&this.has_wasm()&&v.wasm_fn?this[v.name]=v.wasm_fn:this[v.name]=v.fn,this},c.prototype.init=function(){if(this.__init_promise)return this.__init_promise;if(!this.options.js&&this.options.wasm&&!this.has_wasm())return Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`));var v=this;return this.__init_promise=Promise.all(Object.keys(v.__modules).map(function(h){var m=v.__modules[h];return!v.options.wasm||!v.has_wasm()||!m.wasm_fn||v.__wasm[h]?null:WebAssembly.compile(v.__base64decode(m.wasm_src)).then(function(T){v.__wasm[h]=T})})).then(function(){return v}),this.__init_promise},c.prototype.__base64decode=p,c.prototype.__reallocate=function(h){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(h/(64*1024))}),this.__memory;var m=this.__memory.buffer.byteLength;return m<h&&this.__memory.grow(Math.ceil((h-m)/(64*1024))),this.__memory},c.prototype.__instance=function(h,m,T){if(m&&this.__reallocate(m),!this.__wasm[h]){var b=this.__modules[h];this.__wasm[h]=new WebAssembly.Module(this.__base64decode(b.wasm_src))}if(!this.__cache[h]){var C={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[h]=new WebAssembly.Instance(this.__wasm[h],{env:g(C,T||{})})}return this.__cache[h]},c.prototype.__align=function(h,m){m=m||8;var T=h%m;return h+(T?m-T:0)},f.exports=c},{"./lib/base64decode":20,"./lib/wa_detect":21,"object-assign":22}],20:[function(l,f,E){"use strict";var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";f.exports=function(s){for(var A=s.replace(/[\r\n=]/g,""),c=A.length,v=new Uint8Array(c*3>>2),h=0,m=0,T=0;T<c;T++)T%4===0&&T&&(v[m++]=h>>16&255,v[m++]=h>>8&255,v[m++]=h&255),h=h<<6|g.indexOf(A.charAt(T));var b=c%4*6;return b===0?(v[m++]=h>>16&255,v[m++]=h>>8&255,v[m++]=h&255):b===18?(v[m++]=h>>10&255,v[m++]=h>>2&255):b===12&&(v[m++]=h>>4&255),v}},{}],21:[function(l,f,E){"use strict";var g;f.exports=function(){if(typeof g!="undefined"||(g=!1,typeof WebAssembly=="undefined"))return g;try{var s=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),A=new WebAssembly.Module(s),c=new WebAssembly.Instance(A,{});return c.exports.test(4)!==0&&(g=!0),g}catch(v){}return g}},{}],22:[function(l,f,E){"use strict";var g=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;function A(v){if(v==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(v)}function c(){try{if(!Object.assign)return!1;var v=new String("abc");if(v[5]="de",Object.getOwnPropertyNames(v)[0]==="5")return!1;for(var h={},m=0;m<10;m++)h["_"+String.fromCharCode(m)]=m;var T=Object.getOwnPropertyNames(h).map(function(C){return h[C]});if(T.join("")!=="0123456789")return!1;var b={};return"abcdefghijklmnopqrst".split("").forEach(function(C){b[C]=C}),Object.keys(Object.assign({},b)).join("")==="abcdefghijklmnopqrst"}catch(C){return!1}}f.exports=c()?Object.assign:function(v,h){for(var m,T=A(v),b,C=1;C<arguments.length;C++){m=Object(arguments[C]);for(var M in m)p.call(m,M)&&(T[M]=m[M]);if(g){b=g(m);for(var P=0;P<b.length;P++)s.call(m,b[P])&&(T[b[P]]=m[b[P]])}}return T}},{}],23:[function(l,f,E){var g=arguments[3],p=arguments[4],s=arguments[5],A=JSON.stringify;f.exports=function(c,v){for(var h,m=Object.keys(s),T=0,b=m.length;T<b;T++){var C=m[T],M=s[C].exports;if(M===c||M&&M.default===c){h=C;break}}if(!h){h=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var P={},T=0,b=m.length;T<b;T++){var C=m[T];P[C]=C}p[h]=["function(require,module,exports){"+c+"(self); }",P]}var B=Math.floor(Math.pow(16,8)*Math.random()).toString(16),L={};L[h]=h,p[B]=["function(require,module,exports){var f = require("+A(h)+");(f.default ? f.default : f)(self);}",L];var U={};V(B);function V(X){U[X]=!0;for(var J in p[X][1]){var q=p[X][1][J];U[q]||V(q)}}var j="("+g+")({"+Object.keys(U).map(function(X){return A(X)+":["+p[X][0]+","+A(p[X][1])+"]"}).join(",")+"},{},["+A(B)+"])",Y=window.URL||window.webkitURL||window.mozURL||window.msURL,H=new Blob([j],{type:"text/javascript"});if(v&&v.bare)return H;var W=Y.createObjectURL(H),z=new Worker(W);return z.objectURL=W,z}},{}],"/index.js":[function(l,f,E){"use strict";function g(w,R){return v(w)||c(w,R)||s(w,R)||p()}function p(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function s(w,R){if(w){if(typeof w=="string")return A(w,R);var S=Object.prototype.toString.call(w).slice(8,-1);if(S==="Object"&&w.constructor&&(S=w.constructor.name),S==="Map"||S==="Set")return Array.from(w);if(S==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S))return A(w,R)}}function A(w,R){(R==null||R>w.length)&&(R=w.length);for(var S=0,G=new Array(R);S<R;S++)G[S]=w[S];return G}function c(w,R){var S=w==null?null:typeof Symbol!="undefined"&&w[Symbol.iterator]||w["@@iterator"];if(S!=null){var G=[],O=!0,ee=!1,Z,K;try{for(S=S.call(w);!(O=(Z=S.next()).done)&&(G.push(Z.value),!(R&&G.length===R));O=!0);}catch(se){ee=!0,K=se}finally{try{!O&&S.return!=null&&S.return()}finally{if(ee)throw K}}return G}}function v(w){if(Array.isArray(w))return w}var h=l("object-assign"),m=l("webworkify"),T=l("./lib/mathlib"),b=l("./lib/pool"),C=l("./lib/utils"),M=l("./lib/worker"),P=l("./lib/stepper"),B=l("./lib/tiler"),L=l("./lib/mm_resize/resize_filter_info"),U={},V=!1;try{typeof navigator!="undefined"&&navigator.userAgent&&(V=navigator.userAgent.indexOf("Safari")>=0)}catch(w){}var j=1;typeof navigator!="undefined"&&(j=Math.min(navigator.hardwareConcurrency||1,4));var Y={tile:1024,concurrency:j,features:["js","wasm","ww"],idle:2e3,createCanvas:function(R,S){var G=document.createElement("canvas");return G.width=R,G.height=S,G}},H={filter:"mks2013",unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},W=!1,z=!1,X=!1,J=!1,q=!1;function oe(){return{value:m(M),destroy:function(){if(this.value.terminate(),typeof window!="undefined"){var R=window.URL||window.webkitURL||window.mozURL||window.msURL;R&&R.revokeObjectURL&&this.value.objectURL&&R.revokeObjectURL(this.value.objectURL)}}}}function te(w){if(!(this instanceof te))return new te(w);this.options=h({},Y,w||{});var R="lk_".concat(this.options.concurrency);this.__limit=U[R]||C.limiter(this.options.concurrency),U[R]||(U[R]=this.__limit),this.features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.__requested_features=[],this.__mathlib=null}te.prototype.init=function(){var w=this;if(this.__initPromise)return this.__initPromise;if(typeof ImageData!="undefined"&&typeof Uint8ClampedArray!="undefined")try{new ImageData(new Uint8ClampedArray(400),10,10),W=!0}catch(se){}typeof ImageBitmap!="undefined"&&(ImageBitmap.prototype&&ImageBitmap.prototype.close?z=!0:this.debug("ImageBitmap does not support .close(), disabled"));var R=this.options.features.slice();if(R.indexOf("all")>=0&&(R=["cib","wasm","js","ww"]),this.__requested_features=R,this.__mathlib=new T(R),R.indexOf("ww")>=0&&typeof window!="undefined"&&"Worker"in window)try{var S=l("webworkify")(function(){});S.terminate(),this.features.ww=!0;var G="wp_".concat(JSON.stringify(this.options));U[G]?this.__workersPool=U[G]:(this.__workersPool=new b(oe,this.options.idle),U[G]=this.__workersPool)}catch(se){}var O=this.__mathlib.init().then(function(se){h(w.features,se.features)}),ee;z?ee=C.cib_support(this.options.createCanvas).then(function(se){if(w.features.cib&&R.indexOf("cib")<0){w.debug("createImageBitmap() resize supported, but disabled by config");return}R.indexOf("cib")>=0&&(w.features.cib=se)}):ee=Promise.resolve(!1),X=C.can_use_canvas(this.options.createCanvas);var Z;z&&W&&R.indexOf("ww")!==-1?Z=C.worker_offscreen_canvas_support():Z=Promise.resolve(!1),Z=Z.then(function(se){J=se});var K=C.cib_can_use_region().then(function(se){q=se});return this.__initPromise=Promise.all([O,ee,Z,K]).then(function(){return w}),this.__initPromise},te.prototype.__invokeResize=function(w,R){var S=this;return R.__mathCache=R.__mathCache||{},Promise.resolve().then(function(){return S.features.ww?new Promise(function(G,O){var ee=S.__workersPool.acquire();R.cancelToken&&R.cancelToken.catch(function(K){return O(K)}),ee.value.onmessage=function(K){ee.release(),K.data.err?O(K.data.err):G(K.data)};var Z=[];w.src&&Z.push(w.src.buffer),w.srcBitmap&&Z.push(w.srcBitmap),ee.value.postMessage({opts:w,features:S.__requested_features,preload:{wasm_nodule:S.__mathlib.__}},Z)}):{data:S.__mathlib.resizeAndUnsharp(w,R.__mathCache)}})},te.prototype.__extractTileData=function(w,R,S,G,O){if(this.features.ww&&J&&(C.isCanvas(R)||q))return this.debug("Create tile for OffscreenCanvas"),createImageBitmap(G.srcImageBitmap||R,w.x,w.y,w.width,w.height).then(function(K){return O.srcBitmap=K,O});if(C.isCanvas(R))return G.srcCtx||(G.srcCtx=R.getContext("2d")),this.debug("Get tile pixel data"),O.src=G.srcCtx.getImageData(w.x,w.y,w.width,w.height).data,O;this.debug("Draw tile imageBitmap/image to temporary canvas");var ee=this.options.createCanvas(w.width,w.height),Z=ee.getContext("2d");return Z.globalCompositeOperation="copy",Z.drawImage(G.srcImageBitmap||R,w.x,w.y,w.width,w.height,0,0,w.width,w.height),this.debug("Get tile pixel data"),O.src=Z.getImageData(0,0,w.width,w.height).data,ee.width=ee.height=0,O},te.prototype.__landTileData=function(w,R,S){var G;if(this.debug("Convert raw rgba tile result to ImageData"),R.bitmap)return S.toCtx.drawImage(R.bitmap,w.toX,w.toY),null;if(W)G=new ImageData(new Uint8ClampedArray(R.data),w.toWidth,w.toHeight);else if(G=S.toCtx.createImageData(w.toWidth,w.toHeight),G.data.set)G.data.set(R.data);else for(var O=G.data.length-1;O>=0;O--)G.data[O]=R.data[O];return this.debug("Draw tile"),V?S.toCtx.putImageData(G,w.toX,w.toY,w.toInnerX-w.toX,w.toInnerY-w.toY,w.toInnerWidth+1e-5,w.toInnerHeight+1e-5):S.toCtx.putImageData(G,w.toX,w.toY,w.toInnerX-w.toX,w.toInnerY-w.toY,w.toInnerWidth,w.toInnerHeight),null},te.prototype.__tileAndResize=function(w,R,S){var G=this,O={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null},ee=function(K){return G.__limit(function(){if(S.canceled)return S.cancelToken;var se={width:K.width,height:K.height,toWidth:K.toWidth,toHeight:K.toHeight,scaleX:K.scaleX,scaleY:K.scaleY,offsetX:K.offsetX,offsetY:K.offsetY,filter:S.filter,unsharpAmount:S.unsharpAmount,unsharpRadius:S.unsharpRadius,unsharpThreshold:S.unsharpThreshold};return G.debug("Invoke resize math"),Promise.resolve(se).then(function(ue){return G.__extractTileData(K,w,S,O,ue)}).then(function(ue){return G.debug("Invoke resize math"),G.__invokeResize(ue,S)}).then(function(ue){return S.canceled?S.cancelToken:(O.srcImageData=null,G.__landTileData(K,ue,O))})})};return Promise.resolve().then(function(){if(O.toCtx=R.getContext("2d"),C.isCanvas(w))return null;if(C.isImageBitmap(w))return O.srcImageBitmap=w,O.isImageBitmapReused=!0,null;if(C.isImage(w))return z?(G.debug("Decode image via createImageBitmap"),createImageBitmap(w).then(function(Z){O.srcImageBitmap=Z}).catch(function(Z){return null})):null;throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap')}).then(function(){if(S.canceled)return S.cancelToken;G.debug("Calculate tiles");var Z=B({width:S.width,height:S.height,srcTileSize:G.options.tile,toWidth:S.toWidth,toHeight:S.toHeight,destTileBorder:S.__destTileBorder}),K=Z.map(function(ue){return ee(ue)});function se(ue){ue.srcImageBitmap&&(ue.isImageBitmapReused||ue.srcImageBitmap.close(),ue.srcImageBitmap=null)}return G.debug("Process tiles"),Promise.all(K).then(function(){return G.debug("Finished!"),se(O),R},function(ue){throw se(O),ue})})},te.prototype.__processStages=function(w,R,S,G){var O=this;if(G.canceled)return G.cancelToken;var ee=w.shift(),Z=g(ee,2),K=Z[0],se=Z[1],ue=w.length===0,Le;ue||L.q2f.indexOf(G.filter)<0?Le=G.filter:G.filter==="box"?Le="box":Le="hamming",G=h({},G,{toWidth:K,toHeight:se,filter:Le});var Be;return ue||(Be=this.options.createCanvas(K,se)),this.__tileAndResize(R,ue?S:Be,G).then(function(){return ue?S:(G.width=K,G.height=se,O.__processStages(w,Be,S,G))}).then(function(Ke){return Be&&(Be.width=Be.height=0),Ke})},te.prototype.__resizeViaCreateImageBitmap=function(w,R,S){var G=this,O=R.getContext("2d");return this.debug("Resize via createImageBitmap()"),createImageBitmap(w,{resizeWidth:S.toWidth,resizeHeight:S.toHeight,resizeQuality:C.cib_quality_name(L.f2q[S.filter])}).then(function(ee){if(S.canceled)return S.cancelToken;if(!S.unsharpAmount)return O.drawImage(ee,0,0),ee.close(),O=null,G.debug("Finished!"),R;G.debug("Unsharp result");var Z=G.options.createCanvas(S.toWidth,S.toHeight),K=Z.getContext("2d");K.drawImage(ee,0,0),ee.close();var se=K.getImageData(0,0,S.toWidth,S.toHeight);return G.__mathlib.unsharp_mask(se.data,S.toWidth,S.toHeight,S.unsharpAmount,S.unsharpRadius,S.unsharpThreshold),O.putImageData(se,0,0),Z.width=Z.height=0,se=K=Z=O=null,G.debug("Finished!"),R})},te.prototype.resize=function(w,R,S){var G=this;this.debug("Start resize...");var O=h({},H);if(isNaN(S)?S&&(O=h(O,S)):O=h(O,{quality:S}),O.toWidth=R.width,O.toHeight=R.height,O.width=w.naturalWidth||w.width,O.height=w.naturalHeight||w.height,Object.prototype.hasOwnProperty.call(O,"quality")){if(O.quality<0||O.quality>3)throw new Error("Pica: .quality should be [0..3], got ".concat(O.quality));O.filter=L.q2f[O.quality]}if(R.width===0||R.height===0)return Promise.reject(new Error("Invalid output size: ".concat(R.width,"x").concat(R.height)));O.unsharpRadius>2&&(O.unsharpRadius=2),O.canceled=!1,O.cancelToken&&(O.cancelToken=O.cancelToken.then(function(Z){throw O.canceled=!0,Z},function(Z){throw O.canceled=!0,Z}));var ee=3;return O.__destTileBorder=Math.ceil(Math.max(ee,2.5*O.unsharpRadius|0)),this.init().then(function(){if(O.canceled)return O.cancelToken;if(G.features.cib){if(L.q2f.indexOf(O.filter)>=0)return G.__resizeViaCreateImageBitmap(w,R,O);G.debug("cib is enabled, but not supports provided filter, fallback to manual math")}if(!X){var Z=new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");throw Z.code="ERR_GET_IMAGE_DATA",Z}var K=P(O.width,O.height,O.toWidth,O.toHeight,G.options.tile,O.__destTileBorder);return G.__processStages(K,w,R,O)})},te.prototype.resizeBuffer=function(w){var R=this,S=h({},H,w);if(Object.prototype.hasOwnProperty.call(S,"quality")){if(S.quality<0||S.quality>3)throw new Error("Pica: .quality should be [0..3], got ".concat(S.quality));S.filter=L.q2f[S.quality]}return this.init().then(function(){return R.__mathlib.resizeAndUnsharp(S)})},te.prototype.toBlob=function(w,R,S){return R=R||"image/png",new Promise(function(G){if(w.toBlob){w.toBlob(function(se){return G(se)},R,S);return}if(w.convertToBlob){G(w.convertToBlob({type:R,quality:S}));return}for(var O=atob(w.toDataURL(R,S).split(",")[1]),ee=O.length,Z=new Uint8Array(ee),K=0;K<ee;K++)Z[K]=O.charCodeAt(K);G(new Blob([Z],{type:R}))})},te.prototype.debug=function(){},f.exports=te},{"./lib/mathlib":1,"./lib/mm_resize/resize_filter_info":7,"./lib/pool":13,"./lib/stepper":14,"./lib/tiler":15,"./lib/utils":16,"./lib/worker":17,"object-assign":22,webworkify:23}]},{},[])("/index.js")})});var nr=St((Vt,zt)=>{(function(t,i){typeof define=="function"&&define.amd?define([],i):typeof Vt!="undefined"?i():(i(),t.FileSaver={})})(Vt,function(){"use strict";function t(p,s){return typeof s=="undefined"?s={autoBom:!1}:typeof s!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),s={autoBom:!s}),s.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(p.type)?new Blob(["\uFEFF",p],{type:p.type}):p}function i(p,s,A){var c=new XMLHttpRequest;c.open("GET",p),c.responseType="blob",c.onload=function(){g(c.response,s,A)},c.onerror=function(){console.error("could not download file")},c.send()}function x(p){var s=new XMLHttpRequest;s.open("HEAD",p,!1);try{s.send()}catch(A){}return 200<=s.status&&299>=s.status}function l(p){try{p.dispatchEvent(new MouseEvent("click"))}catch(A){var s=document.createEvent("MouseEvents");s.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),p.dispatchEvent(s)}}var f=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:void 0,E=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||(typeof window!="object"||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!E?function(p,s,A){var c=f.URL||f.webkitURL,v=document.createElement("a");s=s||p.name||"download",v.download=s,v.rel="noopener",typeof p=="string"?(v.href=p,v.origin===location.origin?l(v):x(v.href)?i(p,s,A):l(v,v.target="_blank")):(v.href=c.createObjectURL(p),setTimeout(function(){c.revokeObjectURL(v.href)},4e4),setTimeout(function(){l(v)},0))}:"msSaveOrOpenBlob"in navigator?function(p,s,A){if(s=s||p.name||"download",typeof p!="string")navigator.msSaveOrOpenBlob(t(p,A),s);else if(x(p))i(p,s,A);else{var c=document.createElement("a");c.href=p,c.target="_blank",setTimeout(function(){l(c)})}}:function(p,s,A,c){if(c=c||open("","_blank"),c&&(c.document.title=c.document.body.innerText="downloading..."),typeof p=="string")return i(p,s,A);var v=p.type==="application/octet-stream",h=/constructor/i.test(f.HTMLElement)||f.safari,m=/CriOS\/[\d]+/.test(navigator.userAgent);if((m||v&&h||E)&&typeof FileReader!="undefined"){var T=new FileReader;T.onloadend=function(){var M=T.result;M=m?M:M.replace(/^data:[^;]*;/,"data:attachment/file;"),c?c.location.href=M:location=M,c=null},T.readAsDataURL(p)}else{var b=f.URL||f.webkitURL,C=b.createObjectURL(p);c?c.location=C:location.href=C,c=null,setTimeout(function(){b.revokeObjectURL(C)},4e4)}});f.saveAs=g.saveAs=g,typeof zt!="undefined"&&(zt.exports=g)})});function D(t,i,x){return(t&255)<<0|(i&255)<<8|(x&255)<<16}var Ca=[D(0,0,0),D(255,255,255)],On=[D(0,0,0),D(255,128,64),D(64,255,128),D(128,64,255),D(255,255,255)],Qn=[0,16777215,D(163,64,69),D(125,235,228),D(174,70,186),D(94,202,84),D(60,57,200),D(255,255,111),D(174,96,47),D(110,73,0),D(232,122,128),D(92,92,92),D(143,143,143),D(179,255,167),D(129,126,255),D(199,199,199)],Fe=[D(0,0,0),D(255,255,255),D(129,51,56),D(117,206,200),D(142,60,151),D(86,172,77),D(46,44,155),D(237,241,113),D(142,80,41),D(85,56,0),D(196,108,113),D(74,74,74),D(123,123,123),D(169,255,159),D(112,109,235),D(178,178,178)],Pt=[D(0,0,0),D(255,255,255),D(120,41,34),D(135,214,221),D(170,95,182),D(85,160,73),D(64,49,141),D(191,206,114),D(170,116,73),D(234,180,137),D(184,105,98),D(199,255,255),D(234,159,246),D(148,224,137),D(128,113,204),D(255,255,178)],Ia=[D(0,0,0),D(0,0,0),D(33,200,66),D(94,220,120),D(84,85,237),D(125,118,252),D(212,82,77),D(66,235,245),D(252,85,84),D(255,121,120),D(212,193,84),D(230,206,128),D(33,176,59),D(201,91,186),D(204,204,204),D(255,255,255)],pt=[5395026,11796480,10485760,11599933,7602281,91,95,6208,12048,543240,26368,1196544,7153664,0,0,0,12899815,16728064,14421538,16729963,14090399,6818519,6588,21681,27227,35843,43776,2918400,10777088,0,0,0,16316664,16755516,16742785,16735173,16730354,14633471,4681215,46327,57599,58229,259115,7911470,15065624,7895160,0,0,16777215,16773822,16300216,16300248,16758527,16761855,13095423,10148607,8973816,8650717,12122296,16119980,16777136,16308472,0,0],Ea=[D(0,0,0),D(255,68,253),D(20,245,60),D(20,207,253),D(255,106,60),D(255,255,255)],kt=[D(0,0,0),D(227,30,96),D(96,78,189),D(255,68,253),D(0,163,96),D(156,156,156),D(20,207,253),D(208,195,255),D(96,114,3),D(255,106,60),D(156,156,156),D(255,160,208),D(20,245,60),D(208,221,141),D(114,255,208),D(255,255,255)],ya=[0,2368548,4737096,7171437,9539985,11974326,14342874,16777215,12255269,14680137,16716142,16725394,16734903,16744155,16753663,16762879,11534409,13959277,16318866,16721334,16730842,16740095,16749311,16758783,10420330,12779662,15138995,16718039,16727291,16736767,16745983,16755199,8847495,11206827,13631696,15994612,16724735,16733951,16743423,16752639,6946975,9306307,11731175,14092287,16461055,16732415,16741631,16751103,4784304,7143637,9568505,11929087,14297599,16731647,16741119,16750335,2425019,4784352,7209215,9570047,12004095,14372863,16741375,16750847,191,2359523,4718847,7146495,9515263,11949311,14318079,16752127,187,224,2294015,4658431,7092735,9461247,11895551,14264063,176,213,249,2367999,4736511,7105279,9539327,11908095,159,195,3303,209151,2577919,4946431,7380735,9749247,135,171,7888,17140,681983,3050495,5484543,7853311,106,3470,12723,22231,31483,1548031,3916799,6285311,73,8557,17810,27318,36570,373759,2742271,5176575,4389,13641,23150,32402,41911,51163,2026495,4456447,9472,18724,27976,37485,46737,56246,1834970,4194303,14080,23296,32803,42055,51564,60816,2031541,4456409,18176,27648,36864,46116,55624,392556,2752401,5177269,21760,30976,40192,49667,58919,1572683,3932016,6291348,24320,33536,43008,52224,716810,3079982,5504851,7864183,25856,35328,44544,250368,2619136,4980503,7405371,9764703,26624,35840,45312,2413824,4782336,7143173,9568041,11927374,26112,35584,2338560,4707328,7141376,9502464,11927326,14286659,24832,2393344,4762112,7196160,9564928,11992832,14352155,16711487,2447360,4815872,7250176,9618688,12052992,14417664,16776990,16777027,4803328,7172096,9606144,11974912,14343424,16776965,16777001,16777038,6962176,9330688,11764992,14133504,16502272,16773655,16777019,16777055,8858112,11226880,13660928,16029440,16759818,16769070,16777043,16777079,10426112,12794624,15163392,16745475,16754727,16764235,16773488,16777108,11534848,13969152,16337664,16740388,16749640,16759148,16768401,16777141,12255232,14684928,16725795,16735047,16744556,16753808,16763317,16772569],Oe=[0,0,4210752,4210752,7105644,7105644,9474192,9474192,11579568,11579568,13158600,13158600,14474460,14474460,16053492,16053492,17476,17476,1074276,1074276,2393220,2393220,3448992,3448992,4241592,4241592,5296336,5296336,6088936,6088936,6880508,6880508,10352,10352,1328260,1328260,2645144,2645144,3963052,3963052,5016764,5016764,6070476,6070476,6862044,6862044,7915756,7915756,6276,6276,1586328,1586328,3166380,3166380,4745408,4745408,6062288,6062288,7378144,7378144,8431852,8431852,9747708,9747708,136,136,2105500,2105500,3947696,3947696,5789888,5789888,7368912,7368912,8947936,8947936,10526956,10526956,11842812,11842812,6029432,6029432,7610508,7610508,8928416,8928416,10246320,10246320,11563200,11563200,12616912,12616912,13671644,13671644,14725356,14725356,7864392,7864392,9445472,9445472,10763384,10763384,12081292,12081292,13398176,13398176,14451892,14451892,15506628,15506628,16560340,16560340,8650772,8650772,9969712,9969712,11287628,11287628,12605544,12605544,13660284,13660284,14715028,14715028,15507624,15507624,16561340,16561340,8912896,8912896,10231836,10231836,11550776,11550776,12606544,12606544,13661288,13661288,14716028,14716028,15508624,15508624,16562340,16562340,8132608,8132608,9451548,9451548,11031608,11031608,12349520,12349520,13404264,13404264,14457980,14457980,15512720,15512720,16566436,16566436,6040576,6040576,7883804,7883804,9463864,9463864,11306064,11306064,12622952,12622952,13939836,13939836,15256720,15256720,16572580,16572580,2898944,2898944,4742172,4742172,6585400,6585400,8428624,8428624,9745512,9745512,11325564,11325564,12641424,12641424,13958308,13958308,15360,15360,2120736,2120736,4226112,4226112,6069340,6069340,7648372,7648372,9228428,9228428,10806436,10806436,12123320,12123320,14356,14356,1858612,1858612,3701840,3701840,5281900,5281900,6861956,6861956,8178844,8178844,9495732,9495732,10812616,10812616,12332,12332,1855564,1855564,3436648,3436648,5016708,5016708,6596764,6596764,7913652,7913652,8967372,8967372,10284256,10284256,10308,10308,1591396,1591396,3172484,3172484,4490400,4490400,5807288,5807288,7124176,7124176,8178920,8178920,9232636,9232636],Ot=[0,11141120,43520,11184640,170,11141290,21930,11184810,5592405,16733525,5635925,16777045,5592575,16733695,5636095,16777215],_a=[0,43520,170,21930],Ba=[0,11184640,11141290,11184810],Da=[0,11184640,170,11184810],Ma=[0,5635925,5592575,5636095],Fa=[0,16777045,16733695,16777215],Ra=[0,16776960,5592575,16777215],Sa=rt(2,2,2),Ta=rt(3,3,2),Qt=rt(3,3,3),Lt=rt(1,1,1),He=[D(0,0,0),D(1,0,206),D(207,1,0),D(207,1,206),D(0,207,21),D(1,207,207),D(207,207,21),D(207,207,207),D(0,0,0),D(2,0,253),D(255,2,1),D(255,2,253),D(0,255,28),D(2,255,255),D(255,255,29),D(255,255,255)],Nt=[0,8388752,16711680,128,8388736,16711808,255,8388863,16711935,32768,8421376,16744448,32896,8421504,16744576,33023,8421631,16744703,65280,8453888,16776960,65408,8454016,16777088,65535,8454143,16777215],Pa=[0,1911635,8267091,34641,11227702,6248271,12764103,16773608,16711757,16753408,16772135,58422,2731519,8615580,16742312,16764074],ka=[1313820,4465716,3159149,5130831,8735792,3433764,13649480,7696737,5864910,13794604,8754593,7186988,13806233,7193290,14341214,14610134],Oa=[16579836,16724307,183389,4931571],Qa=[997391,3170864,1027212,1035436];var Gt=rt(4,4,4);var at=Gt,La=Gt,Na=Gt,At=[D(48,210,0),D(245,245,128),D(76,58,180),D(154,50,54)],mt=[D(216,216,216),D(65,175,113),D(216,110,240),D(212,127,0)];function rt(t,i,x){for(var l=1<<t+i+x,f=255/((1<<t)-1),E=255/((1<<i)-1),g=255/((1<<x)-1),p=new Uint32Array(l),s=0;s<l;s++){var A=s&(1<<t)-1,c=s>>t&(1<<i)-1,v=s>>t+i&(1<<x)-1;p[s]=D(A*f,c*E,v*g)}return p}var it=[{id:"c64.multi",name:"C-64 Multi",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:8,colors:4,xb:1,yb:2},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},toNative:"exportC64Multi"},{id:"c64.multi.fli",name:"C-64 Multi FLI (w/o bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cell:{w:4,h:8,msbToLsb:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.bug",name:"C-64 Multi FLI (with bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank.left",name:"C-64 Multi FLI (Left blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank",name:"C-64 Multi FLI (L/R blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.hires",name:"C-64 Hires",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},toNative:"exportC64Hires"},{id:"c64.hires.fli",name:"C-64 Hires FLI (w/o bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.bug",name:"C-64 Hires FLI (with bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.blank",name:"C-64 Hires FLI (L/R blank)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Hires"},{id:"nes",name:"NES (4 color, 240 tiles)",width:160,height:96,scaleX:8/7,conv:"DitheringCanvas",pal:pt,reduce:4,toNative:"exportNES"},{id:"msx",name:"MSX/Coleco (TMS9918A)",width:256,height:192,conv:"VDPMode2_Canvas",pal:Ia,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportTMS9918"},{id:"apple2.hires",name:"Apple ][ (Hires)",width:140,height:192,scaleX:2,conv:"Apple2_Canvas",pal:Ea,block:{w:7,h:1,colors:4},toNative:"exportApple2HiresToHGR"},{id:"atari8.d",name:"Atari ANTIC (Mode D)",width:160,height:96,scaleX:.8571,conv:"DitheringCanvas",pal:Oe,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"atari8.f.10",name:"Atari ANTIC (Mode F/10)",width:80,height:192,scaleX:.8571*4,conv:"DitheringCanvas",pal:Oe,reduce:9,toNative:"exportFrameBuffer",exportFormat:{bpp:4,brev:!0}},{id:"vcs",name:"Atari VCS",width:40,height:192,scaleX:6,conv:"DitheringCanvas",pal:Oe,reduce:2,toNative:"exportVCSPlayfield"},{id:"vcs.color",name:"Atari VCS (Color)",width:40,height:192,scaleX:6,conv:"VCSColorPlayfield_Canvas",pal:Oe,toNative:"exportVCSPlayfield"},{id:"astrocade",name:"Bally Astrocade",width:160,height:98,scaleX:1,conv:"DitheringCanvas",pal:ya,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"zx",name:"ZX Spectrum",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportZXSpectrum"},{id:"zx.dark",name:"ZX Spectrum (dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},toNative:"exportZXSpectrum"},{id:"zx.bright",name:"ZX Spectrum (bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},toNative:"exportZXSpectrum"},{id:"zx.dark.bright",name:"ZX Spectrum (dark made bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{aux:!0,colorsRange:{min:0,max:7}},toNative:"exportZXSpectrum"},{id:"zx.bright.dark",name:"ZX Spectrum (bright made dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{aux:!0,colorsRange:{min:8,max:15}},toNative:"exportZXSpectrum"},{id:"cpc.mode0",name:"Amstrad CPC (mode 0)",width:160,height:200,scaleX:2,conv:"DitheringCanvas",pal:Nt,reduce:16,toNative:"exportFrameBuffer",exportFormat:{bpp:4,yremap:[3,80,2048],bitremap:[7,3,5,1,6,2,4,0]}},{id:"cpc.mode1",name:"Amstrad CPC (mode 1)",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Nt,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,yremap:[3,80,2048],bitremap:[7,3,6,2,5,1,4,0]}},null,{id:"vic20.hires",name:"VIC-20 Hires",width:160,height:160,scaleX:1.5,conv:"VICII_Canvas",pal:Pt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicHires"},{id:"vic20.multi",name:"VIC-20 Multi",width:80,height:160,scaleX:3,conv:"VICII_Canvas",pal:Pt,block:{w:4,h:8,colors:4},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:15},aux:!0,auxRange:{min:0,max:15},border:!0,borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicMulti"},{id:"nes4f",name:"NES (4 color, full screen)",width:256,height:240,scaleX:8/7,conv:"DitheringCanvas",pal:pt,reduce:4,toNative:"exportNES"},{id:"nes5f",name:"NES (5 color, full screen)",width:256,height:240,scaleX:8/7,conv:"NES_Canvas",pal:pt,reduce:5,toNative:"exportNES"},{id:"atari7800.160a",name:"Atari 7800 (160A)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:Oe,reduce:4},{id:"atari7800.160b",name:"Atari 7800 (160B)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:Oe,reduce:12},{id:"sms",name:"Sega Master System",width:176,height:144,scaleX:8/7,conv:"DitheringCanvas",pal:Sa,reduce:16},{id:"sms-gg",name:"Sega GameGear",width:160,height:144,scaleX:1.2,conv:"DitheringCanvas",pal:Na,reduce:16},{id:"bbcmicro.mode2",name:"BBC Micro (mode 2)",width:160,height:256,scaleX:2,conv:"DitheringCanvas",pal:Lt},{id:"apple2.lores",name:"Apple ][ (Lores)",width:40,height:48,scaleX:1.5,conv:"DitheringCanvas",pal:kt,toNative:"exportFrameBuffer",exportFormat:{bpp:4}},{id:"apple2.dblhires",name:"Apple ][ (Double-Hires)",width:140,height:192,scaleX:2,conv:"DitheringCanvas",pal:kt},{id:"appleiigs.320.16",name:"Apple IIGS (16 colors)",width:320,height:200,conv:"DitheringCanvas",pal:La,reduce:16},{id:"channelf",name:"Fairchild Channel F",width:102,height:58,conv:"DitheringCanvas",pal:Oa,reduce:4},{id:"mac",name:"Mac 128K",width:512,height:342,conv:"DitheringCanvas",pal:Ca},{id:"x86.cga.04h.1",name:"PC CGA (Mode 04h, palette 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:_a,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.1B",name:"PC CGA (Mode 04h, bright 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ma,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2",name:"PC CGA (Mode 04h, palette 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ba,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2B",name:"PC CGA (Mode 04h, bright 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Fa,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h",name:"PC CGA (Mode 05h)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Da,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h.B",name:"PC CGA (Mode 05h, bright)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ra,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.ega.0dh",name:"PC EGA (Mode 0Dh)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ot,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"x86.ega.10h",name:"PC EGA (Mode 10h)",width:640,height:350,scaleX:350/640*1.37,conv:"DitheringCanvas",pal:Ot,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"williams",name:"Williams Arcade",width:304,height:256,conv:"DitheringCanvas",pal:Ta,reduce:16},{id:"pico8",name:"PICO-8",width:128,height:128,conv:"DitheringCanvas",pal:Pa},{id:"tic80",name:"TIC-80",width:240,height:136,conv:"DitheringCanvas",pal:ka},{id:"gb",name:"Game Boy Classic",width:160,height:144,scaleX:10/9,conv:"DitheringCanvas",pal:Qa},{id:"amiga.lores",name:"Amiga (Lores)",width:320,height:256,conv:"DitheringCanvas",pal:at,reduce:32},{id:"amiga.lores.ham6",name:"Amiga (Lores, HAM6)",width:320,height:256,conv:"HAM6_Canvas",pal:at,reduce:16,extraColors:48},{id:"cx16.lores",name:"Commander X16 (Lores)",width:320,height:240,scaleX:1,conv:"DitheringCanvas",pal:at,reduce:256},{id:"cx16.hires",name:"Commander X16 (Hires, cropped)",width:640,height:400,scaleX:1,conv:"DitheringCanvas",pal:at,reduce:16},{id:"compucolor",name:"Compucolor",width:160,height:192,scaleX:1.6,conv:"Compucolor_Canvas",pal:He,block:{w:2,h:4,colors:2}},{id:"teletext",name:"Teletext",width:40*2,height:24*3,scaleX:4/3,conv:"Teletext_Canvas",pal:Lt,block:{w:2,h:3,colors:2}},{id:"atarist",name:"Atari ST",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Qt,reduce:16},{id:"MC6847.CG2.palette0",name:"MC6847 (CG2, palette 0)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:At,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG2.palette1",name:"MC6847 (CG2, palette 1)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:mt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette0",name:"MC6847 (CG3, palette 0)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:At,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette1",name:"MC6847 (CG3, palette 1)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:mt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette0",name:"MC6847 (CG6, palette 0)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:At,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette1",name:"MC6847 (CG6, palette 1)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:mt,reduce:4,toNative:"exportMC6847"},{id:"vcs.48",name:"Atari VCS (48x48 bitmap)",width:48,height:48,conv:"DitheringCanvas",pal:Oe,reduce:2},{id:"pce.256x240",name:"PC Engine (256x240)",width:256,height:240,scaleX:5/4,conv:"DitheringCanvas",pal:Qt,reduce:16}],gt={};it.forEach(t=>{t&&(gt[t.id||t.name]=t)});var $t={};wa($t,{bitOverlayUint8Array:()=>xt,exportApple2HiresToHGR:()=>oi,exportC64Hires:()=>hi,exportC64Multi:()=>ci,exportCellBuffer:()=>Ha,exportCombinedImageAndColorCellBuffer:()=>Xe,exportFrameBuffer:()=>Ua,exportMC6847:()=>bi,exportNES:()=>gi,exportNES5Color:()=>xi,exportTMS9918:()=>mi,exportVCSPlayfield:()=>vi,exportVicHires:()=>fi,exportVicMulti:()=>ui,exportZXSpectrum:()=>pi});function ni(t,i){if(!i)return t;for(var x=0,l=0;l<i.length;l++){var f=i[l];f<0&&(f=-f-1,x^=1<<f),t&1<<l&&(x^=1<<f)}return x}function Ga(t,i){i.destfmt&&(i=i.destfmt);var x=i.w,l=i.h,f=i.count||1,E=i.bpp||1,g=i.np||1,p=i.bpw||8,s=i.sl||Math.ceil(i.w*E/p),A=(1<<E)-1,c=i.pofs||s*l*f,v=i.skip||0,h;g>0&&i.sl?h=new Uint8Array(s*l*f):i.yremap?h=new Uint8Array(f*((l>>i.yremap[0])*i.yremap[1]+((1<<i.yremap[0])-1)*i.yremap[2])):p<=8?h=new Uint8Array(s*l*f*g):h=new Uint32Array(s*l*f*g);for(var m=0;m<f;m++)for(var T=t[m],b=0,C=0;C<l;C++){var M=i.flip?l-1-C:C,P=m*s*l+M*s;i.yremap&&(P=(C>>i.yremap[0])*i.yremap[1]+(C&(1<<i.yremap[0])-1)*i.yremap[2]);for(var B=0,L=0;L<x;L++){var U=T[b++],V=ni(P,i.remap);if(i.bitremap)for(var j=0;j<(i.bpp||1);j++)U&1<<j&&(h[V]|=1<<i.bitremap[B+j]);else for(var j=0;j<g;j++){var Y=U>>j*E&A;h[V+j*c+v]|=i.brev?Y<<p-B-E:Y<<B}B+=E,B>=p&&(P+=1,B=0)}}return h}function $a(t){var i=0;t.forEach(l=>{i+=l.length});var x=new Uint8Array(i);return i=0,t.forEach(l=>{x.set(l,i),i+=l.length}),x}function Ua(t,i){var x=i.exportFormat;if(!x)throw"No export format";return x.w=t.width,x.h=t.height,new Uint8Array(Ga([t.indexed],x))}function oi(t,i){for(var x=new Uint8Array(8192),l=0,f=0;f<t.height;f++)for(var E=(f&7)*1024+(f>>3&7)*128+(f>>6)*40,g=0;g<t.width;g+=7){for(var p=0,s=0,A=0;A<7;A++){var c=t.indexed[l++];(c==3||c==4)&&(s|=128),c>=3&&(c-=2),p|=c<<A*2}x[E++]=p&127|s,x[E++]=p>>7&127|s}return x}function xt(t,i,x,l,f,E){E=E===void 0?!0:E;let g=(1<<f)-1,s=(x&g)<<l;g<<=l,i+=E?0:(f+l-1)/8;let A=E?1:-1;for(let c=f+l;c>0;c-=8,i+=A){let h=(-1^g)&255,m=s&255;console.assert(i<t.length),t[i]=t[i]&h|m,s>>=8,g>>=8}}function Ha(t,i){let x=i.prepare(t.width,t.height);x.littleEndian=x.littleEndian===void 0?!0:x.littleEndian;let l=new Uint8Array(x.totalBytes);for(let f=0,E=0;E<t.height;++E)for(let g=0;g<t.width;++g,++f){let p=i.xyToBitInfo(g,E);console.assert(p.paramOffset<t.params.length);let s=i.paramToBitPattern(t.params[p.paramOffset],t.indexed[f]);xt(l,p.offset,s,p.bitShift,p.bitCount,x.littleEndian)}return l}function si(t,i,x,l){let f={prepare:i.prepare,xyToBitInfo:i.xyToBitInfo,paramToBitPattern(E,g){let p=E&15,s=(E&240)>>4,A=(E&3840)>>8;for(let c=0;c<x.length;++c)if(g==x[c].paletteIndex)return x[c].bitPattern;switch(g){case p:return console.assert(l.length>0),l[0];case s:return console.assert(l.length>1),l[1];case A:return console.assert(l.length>2),l[2]}return console.assert(!1),0}};return Ha(t,f)}function Xe(t){if(t.settings.block==null)throw"No block size";let i=t.settings.cb!==void 0&&t.colorBlockMapper!==void 0,x=si(t.img,t.cellMapper,t.globalColors,t.cellColors),l=t.settings.block.w,f=t.settings.block.h,E=Math.floor(t.img.width/l*(t.img.height/f)),g=t.colorMapper.prepare(t.img.width,t.img.height),p=new Uint8Array(g.totalBytes),s=i?t.colorBlockMapper.prepare(t.img.width,t.img.height):{totalBytes:0,littleEndian:void 0},A=i?new Uint8Array(s.totalBytes):void 0,c=t.extra(),v=t.settings.param==null?0:t.settings.param.extra;for(let m=0;m<E;m++){let T=t.img.params[m],b=t.colorMapper.paramToBitInfo(m),C=t.paramToColor(T);xt(p,b.offset,C,b.bitShift,b.bitCount,g.littleEndian)}for(let m=E;m<E+(t.img.params.length-E-v);m++){let T=t.img.params[m],b=t.colorBlockMapper.paramToBitInfo(m),C=t.paramToColor(T);xt(A,b.offset,C,b.bitShift,b.bitCount,s.littleEndian)}let h=[x,p,A,c];return A===void 0&&h.splice(2,1),c===void 0&&h.splice(h.length-1,1),$a(h)}function nt(t){if(t.block===void 0)throw"Block size not specified";if(t.cell===void 0)throw"Cell size not specified";let i=t.block.w,x=t.block.h,l=Math.ceil(Math.log2(t.block.colors)),f=t.cell.w*l,E=t.cell.h*f,g=Math.ceil(E/8),p=0,s=0;return{prepare(c,v){return s=c/i,p=s*g,{totalBytes:c*v*l/8}},xyToBitInfo(c,v){let h=Math.floor(c/i),m=Math.floor(c/t.cell.w),T=Math.floor(v/t.cell.h),b=Math.floor(v/x)*s+h,C=g*m,M=p*T,P=Math.floor(c%t.cell.w*l/8),B=Math.floor(v%t.cell.h*f/8),L=t.cell.msbToLsb?f-(c%t.cell.w+1)*l:c%t.cell.w*l;return{offset:M+C+B+P,bitShift:L,bitCount:l,paramOffset:b}}}}function ot(t){let i=t.fli!==void 0,x=t.block.w,l=t.block.h,f=Math.ceil(Math.log2(t.block.colors)),E=0,g=0,p=0,s=0,A=0,c=0;return{prepare(h,m){return E=h,p=Math.floor(h/t.cell.w),s=Math.floor(m/t.cell.h),A=p*s,c=1<<Math.ceil(Math.log2(A)),g=Math.floor(h/x*(m/l)),{totalBytes:i?c*t.cell.h:p*s}},paramToBitInfo(h){let m=0;return i?m=(Math.floor(h/p)&t.cell.h-1)*c+Math.floor(h/(f*E))*p+h%p:m=h,{offset:m,bitShift:0,bitCount:8}}}}function li(t){let i=t.cb!==void 0,x=t.block.w,l=t.block.h,f=i?t.cb.w===void 0?x:t.cb.w:x,E=i?t.cb.h===void 0?l:t.cb.h:l,g=0;return{prepare(s,A){let c=s/f,v=A/E;return g=Math.floor(s/x*(A/l)),{totalBytes:c*v}},paramToBitInfo(s){return console.assert(s>=g),{offset:s-g,bitShift:0,bitCount:8}}}}function ci(t,i){let x=t.params[t.params.length-1];return Xe({img:t,settings:i,cellMapper:nt(i),colorMapper:ot(i),colorBlockMapper:li(i),globalColors:[{paletteIndex:x&15,bitPattern:0}],cellColors:[2,1,3],paramToColor(l){return l&255},paramToColorBlock(l){return l&15},extra(){let l=new Uint8Array(2);return l[0]=x&255,l[1]=x>>8&255,l}})}function hi(t,i){let x=t.params[t.params.length-1];return Xe({img:t,settings:i,cellMapper:nt(i),colorMapper:ot(i),colorBlockMapper:void 0,globalColors:[],cellColors:[1,0],paramToColor(l){return(l&15)<<4|(l&240)>>4},paramToColorBlock(l){return 0},extra(){let l=new Uint8Array(2);return l[0]=x&255,l[1]=x>>8&255,l}})}function fi(t,i){let x=t.params[t.params.length-1],l=x&15,f=x>>8&15,E=x>>4&15;return Xe({img:t,settings:i,cellMapper:nt(i),colorMapper:ot(i),colorBlockMapper:void 0,globalColors:[{paletteIndex:l,bitPattern:0}],cellColors:[1],paramToColor(g){return g&15},paramToColorBlock(g){return 0},extra(){let g=new Uint8Array(3);return g[0]=l,g[1]=f,g[2]=E,g}})}function ui(t,i){let x=t.params[t.params.length-1],l=x&15,f=x>>8&15,E=x>>4&15;return Xe({img:t,settings:i,cellMapper:nt(i),colorMapper:ot(i),colorBlockMapper:void 0,globalColors:[{paletteIndex:l,bitPattern:0},{paletteIndex:f,bitPattern:1},{paletteIndex:E,bitPattern:3}],cellColors:[2],paramToColor(g){return g&15},paramToColorBlock(g){return 0},extra(){let g=new Uint8Array(3);return g[0]=l,g[1]=f,g[2]=E,g}})}function di(t){if(t.block===void 0)throw"Block size not specified";if(t.cell===void 0)throw"Cell size not specified";let i=t.block.w,x=t.block.h,l=Math.ceil(Math.log2(t.block.colors)),f=t.cell.w*l,E=0;return{prepare(p,s){return E=p/i,{totalBytes:p*s*l/8}},xyToBitInfo(p,s){let A=Math.floor(p/i),c=Math.floor(s/x)*E+A,v=Math.floor(p/t.block.w),h=(s&192)>>6<<11|(s&7)>>0<<8|(s&56)>>3<<5|(v&31)>>0<<0,m=t.cell.msbToLsb?f-(p%t.cell.w+1)*l:p%t.cell.w*l;return{offset:h,bitShift:m,bitCount:l,paramOffset:c}}}}function pi(t,i){return Xe({img:t,settings:i,cellMapper:di(i),colorMapper:ot(i),colorBlockMapper:void 0,globalColors:[],cellColors:[0,NaN,1],paramToColor(x){return(x&7)<<3|(x&1792)>>8|(x&8)>>3<<6},paramToColorBlock(x){return 0},extra(){}})}function Ai(t){let i=t.fli!==void 0,x=t.block.w,l=t.block.h;return{prepare(E,g){let p=E/x,s=g/l;return{totalBytes:p*s}},paramToBitInfo(E){let g=E&31,p=E>>5;return{offset:p&7|g<<3|p>>3<<8,bitShift:0,bitCount:8}}}}function mi(t,i){return Xe({img:t,settings:i,cellMapper:nt(i),colorMapper:Ai(i),colorBlockMapper:void 0,globalColors:[],cellColors:[0,NaN,1],paramToColor(x){let l=x&15,f=(x&3840)>>8;return l=l==0?1:l,f=f==0?1:f,l|f<<4},paramToColorBlock(x){return 0},extra(){}})}function gi(t,i){for(var x=0,l=t.width/8,f=t.height/8,E=new Uint8Array(t.width*t.height*2/8),g=0;g<t.height;g++)for(var p=0;p<t.width;p++){var s=Math.floor(p/8)+Math.floor(g/8)*l,A=s*16+(g&7),c=7-(p&7),v=t.indexed[x];E[A]|=(v&1)<<c,E[A+8]|=(v>>1&1)<<c,x++}return E}function xi(t,i){if(!i.block)throw"No block size";var x=Ua(t,i),l={w:i.block.w,h:i.block.h,bpp:2},f=new Uint8Array(Ga([t.indexed],l));return $a([x,f])}function vi(t,i){var x=new Uint8Array(6*t.height);let l=[3,2,1,0,-1,-1,-1,-1,4,5,6,7,8,9,10,11,19,18,17,16,15,14,13,12,23,22,21,20,-1,-1,-1,-1,24,25,26,27,28,29,30,31,39,38,37,36,35,34,33,32];for(var f=0;f<t.height;f++)for(var E=0;E<48;E++){var g=l[E];if(g>=0&&(g+=f*t.width,t.indexed[g])){var p=(E>>3)*t.height+t.height-f-1;x[p]|=128>>(E&7)}}return x}function bi(t,i){var x=new Uint8Array(t.width*t.height/4);let l=0,f=0;for(var E=0;E<t.height;E++)for(var g=0;g<t.width;g+=4,f+=4)x[l++]=((t.indexed[f+0]&3)<<6)+((t.indexed[f+1]&3)<<4)+((t.indexed[f+2]&3)<<2)+((t.indexed[f+3]&3)<<0);return console.log(x),x}var Ht={};wa(Ht,{getFileViewerCode_apple2_hires:()=>Ti,getFileViewerCode_astrocade:()=>Qi,getFileViewerCode_atari8_d:()=>tr,getFileViewerCode_atari8_f_10:()=>Li,getFileViewerCode_c64_fli:()=>Qe,getFileViewerCode_c64_hires:()=>Si,getFileViewerCode_c64_hires_fli:()=>Wi,getFileViewerCode_c64_hires_fli_blank:()=>Vi,getFileViewerCode_c64_hires_fli_bug:()=>ji,getFileViewerCode_c64_multi:()=>er,getFileViewerCode_c64_multi_fli:()=>zi,getFileViewerCode_c64_multi_fli_blank:()=>qi,getFileViewerCode_c64_multi_fli_blank_left:()=>Zi,getFileViewerCode_c64_multi_fli_bug:()=>Yi,getFileViewerCode_cpc:()=>Ut,getFileViewerCode_cpc_mode0:()=>Hi,getFileViewerCode_cpc_mode1:()=>Xi,getFileViewerCode_msx:()=>ki,getFileViewerCode_nes:()=>Pi,getFileViewerCode_vcs:()=>Oi,getFileViewerCode_zx:()=>st,getFileViewerCode_zx_bright:()=>Gi,getFileViewerCode_zx_bright_dark:()=>Ui,getFileViewerCode_zx_dark:()=>Ni,getFileViewerCode_zx_dark_bright:()=>$i});var Xa=`
    processor 6502
    include "basicheader.dasm"

Src equ $02
Dest equ $04

Start:
    lda #$3B   ; 25 rows, on, bitmap
    sta $d011  ; VIC control #1
    lda #$18   ; 40 column, multicolor
    sta $d016  ; VIC control #2
    lda #$02
    sta $dd00  ; set VIC bank ($4000-$7FFF)
    lda #$80
    sta $d018  ; set VIC screen to $6000
    lda XtraData+1
    sta $d020  ; border
    lda XtraData+0
    sta $d021  ; background
    lda #0
    sta Dest
; copy char memory
    lda #<CharData
    sta Src
    lda #>CharData
    sta Src+1
    lda #$40
    sta Dest+1
    ldx #$20
    jsr CopyMem
; copy screen memory
    lda #<ScreenData
    sta Src
    lda #>ScreenData
    sta Src+1
    lda #$60
    sta Dest+1
    ldx #$04
    jsr CopyMem
; copy color RAM
    lda #<ColorData
    sta Src
    lda #>ColorData
    sta Src+1
    lda #$d8
    sta Dest+1
    ldx #4
    jsr CopyMem
; infinite loop
    jmp .

; copy data from Src to Dest
; X = number of bytes * 256
CopyMem
    ldy #0
.Loop
    lda (Src),y
    sta (Dest),y
    iny
    bne .Loop
    inc Src+1
    inc Dest+1
    dex
    bne .Loop
    rts

; bitmap data
CharData equ .
ScreenData equ CharData+8000
ColorData equ ScreenData+1000
XtraData equ ColorData+1000
    incbin "$DATAFILE"
`;var Wa=`
    processor 6502
    seg Code
    org $803	; start of program
Start:
    sta $c050	; set graphics
    sta $c052	; no mixed mode
    sta $c057	; set hires
    jmp Start	; infinite loop

    org $2000	; start of hires page 1
    incbin "$DATAFILE"
`;var ja=`
    include "nesdefs.dasm"

;;;;; VARIABLES

    seg.u ZEROPAGE
    org $0

;;;;; NES CARTRIDGE HEADER

    NES_HEADER 0,2,1,0 ; mapper 0, 2 PRGs, 1 CHR, horiz. mirror

;;;;; START OF CODE
Start:
; wait for PPU warmup; clear CPU RAM
; byte $02
    NES_INIT	; set up stack pointer, turn off PPU
    jsr WaitSync	; wait for VSYNC
    jsr ClearRAM	; clear RAM
    jsr WaitSync	; wait for VSYNC (and PPU warmup)
; set palette and nametable VRAM
    jsr SetPalette	; set palette colors
    jsr FillVRAM	; print message in name table
; reset PPU address and scroll registers
    lda #0
    sta PPU_ADDR
    sta PPU_ADDR	; PPU addr = $0000
    sta PPU_SCROLL
    sta PPU_SCROLL  ; PPU scroll = $0000
; activate PPU graphics
    lda #MASK_BG
    sta PPU_MASK 	; enable rendering
    lda #CTRL_NMI
    sta PPU_CTRL	; enable NMI
.endless
    jmp .endless	; endless loop

; set palette colors
SetPalette: subroutine
; set PPU address to palette start
    PPU_SETADDR $3f00
    ldy #0
.loop:
    lda Palette,y	; lookup byte in ROM
    sta PPU_DATA	; store byte to PPU data
    iny		; Y = Y + 1
    cpy #4		; is Y equal to max colors?
    bne .loop	; not yet, loop
    rts		; return to caller

; fill video RAM with "Hello World" msg
FillVRAM: subroutine
; set PPU address to name table A
    PPU_SETADDR $2106  ; row 8, col 6
    ldy #12		; # of rows
    lda #1		; first tile index
.nextrow
    ldx #20		; # of columns
.loop:
    sta PPU_DATA	; store+advance PPU
    clc
    adc #1
    dex
    bne .loop
    pha
    lda #$00	; blank
    REPEAT 12	; 32 - 20 = 12 cols/row
    sta PPU_DATA	; store+advance PPU
    REPEND
    pla
    dey
    bne .nextrow
.end
    rts		; return to caller

;;;;; COMMON SUBROUTINES

    include "nesppu.dasm"

;;;;; INTERRUPT HANDLERS

NMIHandler:
    rti		; return from interrupt

;;;;; CONSTANT DATA

Palette:
    hex 1f;screen color
    hex 01112100;background 0

;;;;; CPU VECTORS

    NES_VECTORS

;;;;; TILE SETS

    org $10000
    ds 16	; blanks
    incbin "$DATAFILE"
`;var Va=`
    ORG     04000H

; MSX cartridge header @ 0x4000 - 0x400f
    dw 0x4241
    dw Start
    dw Start
    dw 0,0,0,0,0

CHMOD   EQU   05fh
WRTVRM  EQU   04dh
LDIRVM  EQU   05ch

PATTERN equ 0h
NAME    equ 1800h
COLOR   equ 2000h

Start:
Data:
    ld a,2
    call CHMOD  ; screen mode 2
    ld bc,1800h
    ld hl,ImageData
    ld de,PATTERN
    call LDIRVM ; copy pattern table
    ld bc,1800h
    ld hl,ImageData+1800h
    ld de,COLOR
    call LDIRVM ; copy color table
Infinite:
    jmp Infinite ; loop forever

ImageData:
    incbin "$DATAFILE"
`;var za=`
    processor 6502
    include "vcs.h"
    include "macro.h"
    include "xmacro.h"

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    seg.u Variables
    org $80

    seg Code
    org $f000

Start
    CLEAN_START

NextFrame
    VERTICAL_SYNC

    TIMER_SETUP 37
; Set playfield foreground and background
    lda #$F6
    sta COLUBK
    lda #$F7
    sta COLUPF
    TIMER_WAIT

    ldy #192
ScanLoop
; WSYNC and store playfield registers
    sta WSYNC
    lda PFBitmap0,y
    sta PF0		; store first playfield byte
    lda PFBitmap1,y
    sta PF1		; store 2nd byte
    lda PFBitmap2,y
    sta PF2		; store 3rd byte
; Here's the asymmetric part -- by this time the TIA clock
; is far enough that we can rewrite the same PF registers
; and display new data on the right side of the screen
    nop
    nop
    nop		; pause to let playfield finish drawing
    lda PFBitmap3,y
    sta PF0		; store 4th byte
    lda PFBitmap4,y
    sta PF1		; store 5th byte
    lda PFBitmap5,y
    sta PF2		; store 6th byte
    dey 
    bne ScanLoop	; repeat until all scanlines drawn
; Reset playfield
    SLEEP 14	; give time to finish drawing scanline
    lda #0
    sta PF0
    sta PF1
    sta PF2		; clear playfield

    TIMER_SETUP 28
    TIMER_WAIT
    jmp NextFrame

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; BITMAP DATA

PFBitmap0 equ .+192*0
PFBitmap1 equ .+192*1
PFBitmap2 equ .+192*2
PFBitmap3 equ .+192*3
PFBitmap4 equ .+192*4
PFBitmap5 equ .+192*5
    incbin "$DATAFILE"

; Epilogue
    org $fffc
    .word Start
    .word Start
`;var Ya=`
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
`;var qa=`
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
`;var Za=`
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
`;var Ka=`
    org  0x4000     ; start of code
Start:
    ld  a,$MODE		; graphics mode
    call 0xbc0e		; SCR_SET_MODE
; set border color
    ld  hl,PalData
    ld  b,(hl)
    ld  c,b
    call 0xbc38		; SCR_SET_BORDER
    ld  b,0x10		; loop counter
; read palette from memory
    ld  hl,PalData+15
Loop1:
    push hl
    push bc
    ld  a,b
    dec a
    and a,0x0f
    ld  b,(hl)
    ld  c,b
    call 0xbc32		; SCR_SET_INK
    pop bc
    pop hl
    dec hl
    djnz Loop1
; set image bytes
    ld	de,0xc000   ; DE = screen
    ld	hl,ImgData  ; HL = image data
    ld 	bc,0x4000   ; BC = # of bytes   
    ldir            ; copy
Loop:
    jp	loop        ; infinite loop
PalData:
    db $c0,$c1,$c2,$c3,$c4,$c5,$c6,$c7
    db $c8,$c9,$c10,$c11,$c12,$c13,$c14,$c15
ImgData:            ; data file
    incbin "$DATAFILE"
`;var Ja=`
    processor 6502
    include "basicheader.dasm"
    
; credit to https://codebase64.org/doku.php?id=base:fli_displayer

; The chips emulator has a VIC graphics timing bug which
; differs from other emulators (such as VICE). Setting
; this value to 1 allows the emulator bug to be worked
; around while 0 allows other systems to work.
Use8BitWorkshopEmulator equ 1

; Use the repeat command to generate the lookup
; tables instead of using a code generator by
; specifying 0. Using 1 will include table generation
; code.
UseInitTables equ 0

; This code is extremely similar between multi-color
; graphics mode and hires graphics mode. Setting
; to 1 enables the multi-color graphics code, otherwise
; set to 0 for hires graphics mode.
UseMultiColorGraphics equ $USE_MULTI_MODE

#if Use8BitWorkshopEmulator
TweakD018 equ -1
TweakD011 equ 7
#else
TweakD018 equ 1
TweakD011 equ 1
#endif

Irq0AtRaster equ $2d

    ; temporary CopyMem storage variables in
    ; zero page

Src equ $02
Dest equ $04

Sys2062:
    jmp Start   ; entry point from basic

    ;-------------------------------------------------
    ; Start of code that must be within the
    ; same page boundary $nn00 -> $nnFF
    ; otherwise some instructions may become
    ; cycle inaccurate.
    
    .align $100
    .align $1
    
    ;
    ; Two IRQs are used to create a stable raster
    ; line start point free from issues caused by
    ; interrupts, inconsistent mid-instruction
    ; triggers, or other concerns.
    ;
    ; The first IRQ's job is to setup the second IRQ.
    ; While the first IRQ is triggers based on a
    ; raster line it's timing is not said to be as
    ; accurate becuase the CPU might be processing
    ; any possible cycle timed 1-7 clock cycle
    ; instructions, whereas the second IRQ is
    ; triggered only during a 2 clock cycle "nop"
    ; instruction ensuring the second IRQ is accurate
    ; within 0 or 1 clock cycle count.
    ; 
    ; The second IRQ further has logic to detect this
    ; 0 or 1 clock cycle count offset and correct the
    ; timing so the entry point into the raster
    ; routine is 100% accurate creating an accurate
    ; and stable raster-timed loop.
    ;
    
Irq0:
    pha
    lda $d019
    sta $d019
    inc $d012
    lda #<Irq1
    sta $fffe   ; set up 2nd IRQ to get a stable IRQ
    cli

    ;
    ; These "nop"s are not an accident, or in need
    ; of optimization. They allow the 2nd IRQ
    ; to be triggered with an off-by 0 or 1 clock
    ; cycle delay resulting in an "almost" stable IRQ.
    ;

    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
        
    ; The "rti" of the first Irq0 is not needed as
    ; these "nop" instructions never fall-through.
    ; The stack is re-arranged so that the second Irq1
    ; (which triggers while the first Irq0 is being
    ; serviced) returns to the interrupt point where
    ; the first trigger IRQ happened bypassing the
    ; need for a "rti" from the first Irq0 entirely.

Irq1:
Ntsc1:
    ; PAL raster at 9 or 10/46
    lda #$ea    ; modified to NOP NOP on NTSC
    lda #$80
    sta $d018   ; setup first color RAM address early
    lda #$38
    sta $d011   ; setup first DMA access early
    pla
    pla
    pla
    lda $d019
    sta $d019
    lda #Irq0AtRaster
    sta $d012
    lda #<Irq0
    sta $fffe   ; switch IRQ back to first stabilizer IRQ
    lda $d012   ; PAL raster at 55 or 56/46
    cmp $d012   ; stabilize last jittering cycle
    beq Delay   ; PAL raster at 0 or 1/47; if equal, 2 cycles delay. else 3 cycles delay

Delay:
    stx SaveX+1 ; PAL raster stable at 3/47 (no more fluctuations)
    ldx #$0d

Wait:
    dex
    bne Wait

Ntsc2:
    ; PAL raster at 10/48
    lda #$ea    ; modified to NOP NOP on NTSC
Ntsc3:
    lda #$ea    ; modified to NOP NOP on NTSC

    ;
    ; Following here is the main FLI loop which forces
    ; the VIC-II to read new color data each
    ; rasterline. The loop is exactly 23 clock cycles
    ; long so together with 40 cycles of color DMA this
    ; will result in the 63 clock cycles which is exactly
    ; the length of a PAL C64 rasterline.
    ;

    nop
    nop
L0:
    ; PAL raster at 61/48, 61/49, 61/50, ...
    lda LookupD018+TweakD018,x
    sta $d018   ; set new color RAM address
    lda LookupD011+TweakD011,x
    sta $d011   ; force new color DMA
    inx         ; FLI bug $D800 color = 8 (orange)
    cpx #199    ; last rasterline?
Ntsc4:
    bne L0      ; branches to l0-1 on NTSC for 2 extra cycles per rasterline

    ; lda $d016
    ; eor #$01    ; IFLI: 1 hires pixel shift every 2nd frame
    ; sta $d016
    ; lda $dd00
    ; eor #$02    ; IFLI: flip between banks $4000 and $C000 every frame
    ; sta $dd00

SaveX:
    ldx #$00
    pla
Nmi:
    rti

    ;
    ; End of code that must be within the
    ; same page boundary $nn00 -> $nnFF
    ; otherwise some instructions may become
    ; cycle inaccurate.
    ;-------------------------------------------------

Start:
    sei

    jsr CopyData
    jsr InitGfx
    jsr InitTables
    jsr NtscFix
    
    ; Patch the table as the last line needs to
    ; perform the "open borders" trick. This trick
    ; involves an undocumented "feature" where multi
    ; color mode graphics is enabled with extended
    ; background mode. While documented as not a
    ; legal combination, this combination causes the
    ; borders to be open to writing during the
    ; raster scroll process (otherwise some of the
    ; rows would be shifted an "off"). This patching
    ; needs to be done within the timing of the final
    ; scan line otherwise the normal background is
    ; disturbed and the drawing is not correct. The
    ; screen needs to be turned off to ensure the
    ; background is painted during the final scene.
    ; Unfortunately the final row is cut-off
    ; for a 319 instead of 320 pixel count height.
    ; A fix is welcomed for this issue.

    lda LookupD011+199
    and #$07
    ora #$70
    sta LookupD011+199

    ; The VIC chip doesn't care if ram or rom is
    ; selected (with an exception), but the IRQs
    ; cannot be overridden later unless ram is loaded.
    ; Thus the kernal routines are not available while
    ; the picture is being displayed, and if the
    ; kernal rom is to be used, the IRQs must first be
    ; uninstalled prior to accessing the kernal
    ; functions and rom restored.
    
    lda #$35    ; %x01: RAM visible at $A000-$BFFF and $E000-$FFFF.
                ; %1xx: I/O area visible at $D000-$DFFF. (Except for the value %100, see above.)
    sta $01     ; disable ROMs %xxxxx101 (rest are default values)
    lda #$7f
    sta $dc0d   ; no CIA #1 timer IRQs
    lda $dc0d   ; clear CIA #1 timer IRQ flags

    lda #$2b
    sta $d011   ; %00101011 - neutral scroll, 25 rows, screen off, bitmap mode, raster IRQ high bit zero
    lda #Irq0AtRaster
    sta $d012   ; interrupt at raster line 45

    ; Even though these IRQ values overrite screen
    ; color choice area of the picture data, this
    ; does not affect the picture in any way
    ; because the color choices end at 1000 bytes,
    ; not 1024 bytes leaving the extra few bytes
    ; unused by the VIC chip, which is fortunately
    ; exactly where IRQ vectors need to be installed.
    ;
    ; However, care must be taken that if a new
    ; picture is loaded into this memory area then the
    ; IRQ table needs to be re-initialzed to these
    ; default values and interrupts (including NMIs)
    ; must be disabled during the picture copying
    ; process. NMIs cannot technically be disabled,
    ; but a trick can be used where a NMI can be
    ; intentionally triggered without acknowledgement
    ; thus preventing a second NMI from happening.
    
    lda #<Nmi
    sta $fffa
    lda #>Nmi
    sta $fffb   ; dummy NMI to avoid crashing due to RESTORE
    lda #<Irq0
    sta $fffe
    lda #>Irq0
    sta $ffff   ; Irq0 is the default interrupt handler
    lda #$01
    sta $d01a   ; enable raster IRQs (no other IRQs)

                ; dec op reads the value, writes the value back
                ; "as is" unmodified, then writes the value back
                ; modified guaranteeing bit 0 is cleared
    dec $d019   ; clear raster IRQ flag (so it can trigger)
    cli
    jmp *       ; that's it, no more action needed
    
CopyData:

    ; The VIC always reads the bitmap and screen color
    ; choices from RAM regardless if the ram or roms
    ; are active (with the exception of %xxxxx0xx and
    ; the exception to the exception being %xxxxx000).
    ; The color block data always is read from
    ; I/O $d800 area.
    
                ; %x00: RAM visible in all three areas.
                ; %x00: RAM visible in all three areas.
    lda #$30    ; %00110000
    sta $01     ; enable HIMEM RAM
    
    ; copy char memory
    lda #<CharData
    sta Src
    lda #>CharData
    sta Src+1
    lda #0
    sta Dest
    lda #$c0
    sta Dest+1
    ldx #$20
    jsr CopyMem
    
    ; copy screen memory
    lda #<ScreenData
    sta Src
    lda #>ScreenData
    sta Src+1
    lda #0
    sta Dest
    lda #$e0
    sta Dest+1
    ldx #$20
    jsr CopyMem
    
    lda #$07   ; %x11: BASIC ROM visible at $A000-$BFFF; KERNAL ROM visible at $E000-$FFFF.
               ; %1xx: I/O area visible at $D000-$DFFF.
    sta $01    ; enable ROM and $D000 I/O
    
#if UseMultiColorGraphics
    ; copy color block RAM to the VIC's color block area
    lda #<ColorData
    sta Src
    lda #>ColorData
    sta Src+1
    lda #$d8
    sta Dest+1
    ldx #4
    jsr CopyMem
#endif
    rts

InitGfx:
    lda #$00
    sta $d015   ; disable sprites

    lda XtraData+1
    sta $d020   ; border
    lda XtraData+0
    sta $d021   ; background

#if UseMultiColorGraphics
    lda #$D8    ; multi-color mode on
#else
    lda #$C8    ; multi-color mode off
#endif
    sta $d016   ; %00011000 ; no horizontal scroll, 40 columns, multimode on or off, defaulted high bits
    lda #$80
    sta $d018   ; %10000000 ; bitmap data %0xx, 0: +$0000-$1FFF, 0-8191; screen color choices +$2000-$23FF, 8192-9215.
    lda #$00
    sta $dd00   ; %00, 0: Bank #3, $C000-$FFFF, 49152-65535.
    rts

    ; The InitTables routine can be removed if your
    ; assembler supports a .repeat-style macro.
    ; The code is only included as an example of how
    ; to initialize the tables in the event your
    ; assembler does not have a suitable substitute.

InitTables:
#if UseInitTables
    ldx #$00
L2:
    txa
    asl
    asl
    asl
    asl
    and #$70    ; color RAMs at $E000
    ora #$80    ; bitmap data at $C000
    sta LookupD018,x ; calculate $D018 table
    txa
    and #$07
    ora #$38    ; bitmap
    sta LookupD011,x ; calculate $D011 table
    inx
    bne L2
#endif
    rts
        
NtscFix:
    bit $d011
    bmi *-3
    bit $d011   ; wait for rasterline 256
    bpl *-3
    lda #$00
Test:
    cmp $d012
    bcs Nt
    lda $d012   ; get rasterline low byte
Nt:
    bit $d011
    bmi Test
    cmp #$20    ; PAL: $37, NTSC: $05 or $06
    bcs Pal

    ; 
    ; This code self-patches to support NTSC mode
    ; which means this code must be copied to RAM
    ; if the code is originally located in ROM.
    ; If this code must run from ROM then the code
    ; needs to be duplicated with a PAL and an
    ; NTSC version where the test routine installs
    ; one or the other versions for usage.
    ;

    ; 
    ; The value "#$ea" as a literal is the op
    ; code for "nop", so when the instruction
    ; "lda #$ea" is patched, it becomes the values
    ; "$ea $ea" (i.e. "nop" and "nop").
    ;
    ; In such a patch, the clock cycle count
    ; changes from a 2-clock cycle "lda" immediate
    ; mode instruction into a 4-clock cycle timed
    ; instructions
    ;

    lda #$ea
    sta Ntsc1
    sta Ntsc2
    sta Ntsc3
    dec Ntsc4+1
Pal:
    rts

; copy data from Src to Dest
; X = number of bytes * 256 bytes at a time
CopyMem:
    ldy #0
.Loop:
    lda (Src),y
    sta (Dest),y
    iny
    bne .Loop
    inc Src+1
    inc Dest+1
    dex
    bne .Loop
    rts

    .align $100

; lookup table for $d011
LookupD011:
#if UseInitTables
    .ds 256
#else
    .repeat 256/8
    .byte $38,$39,$3a,$3b,$3c,$3d,$3e,$3f
    .repend
#endif
    
; lookup table for $d018
LookupD018:
#if UseInitTables
    .ds 256
#else
    .repeat 256/8
    .byte $80,$90,$a0,$b0,$c0,$d0,$e0,$f0
    .repend
#endif

    .align $100
CharData equ .
ScreenData equ CharData+8000
#if UseMultiColorGraphics
ColorData equ ScreenData+$2000
XtraData equ ColorData+1000
#else
XtraData equ ScreenData+$2000
#endif

    ; link a demo picture
    incbin "$DATAFILE"
`;function we(t,i){return i||(i=2),Ri(t,i,16)}function Ri(t,i,x){try{for(var l=t.toString(x).toUpperCase();l.length<i;)l="0"+l;return l}catch(f){return t+""}}function qe(t,i){return t.map(x=>i.indexOf(x&16777215))}function er(){return Xa}function Si(){var t=er();return t=t.replace("lda #$18","lda #$08").replace("multicolor","single"),t}function Ti(){return Wa}function Pi(){var t=ja,i=qe(ne.lastPixels.pal,ne.settings.pal);return t=t.replace("hex 1f;screen color","hex "+we(i[0])),t=t.replace("hex 01112100;background 0","hex "+we(i[1])+we(i[2])+we(i[3])+we(0)),t}function ki(){return Va}function Oi(){var t=za,i=qe(ne.lastPixels.pal,ne.settings.pal);return t=t.replace("#$F6","#$"+we(i[0])),t=t.replace("#$F7","#$"+we(i[1])),t}function Qi(){var t=Ya,i=qe(ne.lastPixels.pal,ne.settings.pal);return t=t.replace("$b0","$"+we(i[0])),t=t.replace("$b1","$"+we(i[1])),t=t.replace("$b2","$"+we(i[2])),t=t.replace("$b3","$"+we(i[3])),t}function tr(){for(var t=qa,i=qe(ne.lastPixels.pal,ne.settings.pal),x=0;x<i.length;x++)t=t.replace("$00;PF"+x,"$"+we(i[x]));return t}function Li(){let t=tr();return t=t.replace(".byte $4d",".byte $4f"),t=t.replace(".byte $0d",".byte $0f"),t=t.replace("#$00;PRIOR","#$80"),t=t.replace("COLOR0+4","PCOLR0+0"),t=t.replace("COLOR0+0","PCOLR0+1"),t=t.replace("COLOR0+1","PCOLR0+2"),t=t.replace("COLOR0+2","PCOLR0+3"),t=t.replace(";GPIOMODE equ 1","GPIOMODE equ 1"),t}function st(){var t=Za;return t}function Ni(){return st()}function Gi(){return st()}function $i(){return st()}function Ui(){return st()}function Ut(t){var i=Ka,x=qe(ne.lastPixels.pal,ne.settings.pal);i=i.replace("$MODE",t+"");for(var l=0;l<16;l++)i=i.replace("$c"+l,"$"+we(x[l]||0));return i}function Hi(t){return Ut(0)}function Xi(t){return Ut(1)}function Qe(){var t=Ja;return t}function Wi(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","0"),t}function ji(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","0"),t}function Vi(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","0"),t}function zi(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","1"),t}function Yi(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","1"),t}function qi(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","1"),t}function Zi(){let t=Qe();return t=t.replace("$USE_MULTI_MODE","1"),t}var lr=Tt(ar()),cr=Tt(ir()),qt=Tt(nr());var or=["benbenn.jpg","cezanne2.jpg","colorroses.jpg","colorswirls.jpg","coolcar.jpg","darkbrewery.jpg","dhuku.jpg","greentruck.jpg","frida.jpg","homer.jpg","keyssunset.jpg","lobsterpot.jpg","myersflat.jpg","myrtle.jpg","parrot.jpg","redrose.jpg","robert_s_duncanson.jpg","seurat.jpg","vangogh.jpg"];var ye,Ki=document.getElementById("brightSlider"),Ji=document.getElementById("contrastSlider"),en=document.getElementById("saturationSlider"),tn=document.getElementById("noiseSlider"),an=document.getElementById("diffuseSlider"),rn=document.getElementById("orderedSlider"),nn=document.getElementById("diversitySlider"),on=document.getElementById("imageUpload"),hr=document.getElementById("srcimage"),ft=document.getElementById("resizecanvas"),ct=document.getElementById("destcanvas"),Yt=class{constructor(i){i.onmessage=x=>{var l=x.data;l!=null&&l.img!=null&&this.pixelsAvailable!=null&&(this.pixelsAvailable(l),this.lastPixels=l)}}setSettings(i){this.settings=i,vt.postMessage({cmd:"setSettings",data:i})}setSourceImage(i){vt.postMessage({cmd:"setSourceImage",data:i})}reset(){vt.postMessage({cmd:"reset"})}},vt=new Worker("./gen/worker.js"),ne=new Yt(vt),lt,bt,sn=[[1,0,7/16],[-1,1,3/16],[0,1,5/16],[1,1,1/16]],ln=[[1,0,3/8],[0,1,3/8],[1,1,2/8]],cn=[[1,0,1/6],[2,0,1/6],[-1,1,1/6],[0,1,1/6],[1,1,1/6],[0,2,1/6]],hn=[[1,0,4/16],[2,0,3/16],[-2,1,1/16],[-1,1,2/16],[0,1,3/16],[1,1,2/16],[2,1,1/16]],fn=[[1,0,2/4],[-1,1,1/4],[0,1,1/4]],un=[[1,0,8/42],[2,0,4/42],[-2,1,2/42],[1,-1,4/42],[0,1,8/42],[1,1,4/42],[2,1,2/42],[-2,2,1/42],[-1,2,2/42],[0,2,4/42],[1,2,2/42],[2,2,1/42]],dn=[[1,0,.5],[0,1,.5]],pn=[[1,0,1]],An=[[0,1,1]],mn=[[0,1,2/4],[0,2,1/4],[1,2,1/4]],gn=[[1,1,1]],xn=[[0,1,6/16],[-1,1,3/16],[1,1,3/16],[-2,2,1/16],[0,2,2/16],[2,2,1/16]],fr=[{name:"Floyd-Steinberg",kernel:sn},{name:"False Floyd",kernel:ln},{name:"Atkinson",kernel:cn},{name:"Sierra 2",kernel:hn},{name:"Sierra Lite",kernel:fn},{name:"Stucki",kernel:un},{name:"Two-D",kernel:dn},{name:"Right",kernel:pn},{name:"Down",kernel:An},{name:"Double Down",kernel:mn},{name:"Diagonal",kernel:gn},{name:"Diamond",kernel:xn}],vn=[{id:"perceptual",name:"Perceptual"},{id:"hue",name:"Hue-Based"},{id:"dist",name:"Distance"},{id:"max",name:"Maximum"}];function bn(t){return new Uint32Array(t.getContext("2d").getImageData(0,0,t.width,t.height).data.buffer)}function wn(t,i){var x=t.getContext("2d"),l=x.createImageData(t.width,t.height),f=new Uint32Array(l.data.buffer);f.length==i.length?(f.set(i),x.putImageData(l,0,0)):console.log("drawRGBA(): array length mismatch")}function Cn(t,i,x,l,f){i*=1,x*=1;for(var E=new Uint8ClampedArray(t.buffer),g=0;g<E.length;g+=4){var p=E[g],s=E[g+1],A=E[g+2];if(l!=1){var c=.2989*p+.587*s+.114*A;p=c*(1-l)+p*l,s=c*(1-l)+s*l,A=c*(1-l)+A*l}E[g]=Math.pow(p*i,f)+x,E[g+1]=Math.pow(s*i,f)+x,E[g+2]=Math.pow(A*i,f)+x}}function Ze(){var t=bn(ft);let i=(parseFloat(Ji.value)-50)/100+1,x=(parseFloat(Ki.value)-i*50)*(128/50),l=(parseFloat(en.value)-50)/50+1;Cn(t,i,x,l,1),ne.setSourceImage(t),We()}function We(){var t=$("#diffuseTypeSelect")[0].selectedOptions[0];t&&(ne.settings.ditherfn=fr[parseInt(t.value)].kernel);var t=$("#errorFuncSelect")[0].selectedOptions[0];t&&(ne.settings.errfn=t.value),ne.settings.diffuse=parseFloat(an.value)/100,ne.settings.ordered=parseFloat(rn.value)/100,ne.settings.noise=parseFloat(tn.value),ne.settings.paletteDiversity=parseFloat(nn.value)/200+.75,ne.setSettings(ne.settings),ne.reset()}function In(){let t=ye==null?void 0:ye.getCroppedCanvas();!(t!=null&&t.width)||!(t!=null&&t.height)||(0,cr.default)().resize(t,ft,{}).then(()=>{Ze()})}function ur(t){var i=t.width+" x "+t.height;return t.reduce?i+=", "+t.reduce+" out of "+t.pal.length+" colors":t.pal&&(i+=", "+t.pal.length+" colors"),t.block&&(i+=", ",i+=t.block.colors+" colors per ",i+=t.block.w+"x"+t.block.h+" block"),i}function En(t){$("#targetFormatInfo").text(ur(t))}function yn(t){var i=$("#paletteSwatches");i.empty(),t&&t.length<64&&t.forEach((x,l)=>{var f="rgb("+(x&255)+","+(x>>8&255)+","+(x>>16&255)+")",E=$('<span style="width:2em">&nbsp;</span>').css("background-color",f);i.append(E)})}function _n(t){let i=ne.settings;return(t==null?void 0:t.naturalWidth)==i.width&&(t==null?void 0:t.naturalHeight)==i.height}function Bn(){console.log("Width and height exact match!"),ye.clear(),ye.disable(),ft.getContext("2d").drawImage(hr,0,0),Ze()}function wt(t){ye&&ye.destroy();let i=ne.settings,x=i.width*(i.scaleX||1)/i.height||4/3;ye=new lr.default(hr,{viewMode:1,autoCropArea:1,initialAspectRatio:x,crop(l){_n(ye.getImageData())?Bn():In()}}),ye.replace(t),Ar()}function sr(t){var i=t.conv!="DitheringCanvas";ne.setSettings(t),En(t),ft.width=ct.width=t.width,ft.height=ct.height=t.height;let x=t.scaleX||1;ct.style.aspectRatio=(t.width*x/t.height).toString(),$("#noiseSection").css("display",i?"flex":"none"),$("#diversitySection").css("display",t.reduce?"flex":"none"),$("#downloadNativeBtn").css("display",t.toNative?"inline":"none"),$("#gotoIDE").css("display",pr()?"inline":"none"),ye&&wt(ye.url),Ar(),Tn(t)}function ht(){var t=lt||"image";try{t=t.split(".").shift()||"image"}catch(i){}return t+"-"+ne.settings.id}function dr(){var t=ne.lastPixels;let i=ne.settings.toNative;if(!i)return null;var x=$t[i];return t&&x&&x(t,ne.settings)}function Dn(){var t=dr();if(t!=null){var i=new Blob([t],{type:"application/octet-stream"});(0,qt.saveAs)(i,ht()+".bin")}}function Mn(){ct.toBlob(t=>{(0,qt.saveAs)(t,ht()+".png")},"image/png")}function Fn(t){var i="";if(t!=null){for(var x=new Array,l=0;l<256;++l)x[l]=String.fromCharCode(l);for(var f=t.length,l=0;l<f;l++)i+=x[t[l]]}return i}function pr(){var t="getFileViewerCode_"+ne.settings.id.replace(/[^a-z0-9]/g,"_"),i=Ht[t];return i}async function Rn(){function t(g,p,s){$('<input type="hidden"/>').attr("name",p).val(s).appendTo(g)}if(confirm("Open code sample with image in 8bitworkshop?")){var i=ne.settings.id.split(".")[0],x=$(document.forms.ideForm);x.empty(),i=="atari8"&&(i="atari8-800"),i=="cpc"&&(i="cpc.6128"),t(x,"platform",i);var l="viewer-"+ht()+".asm",f=ht()+".bin";t(x,"file0_name",l);var E=pr()();E=E.replace("$DATAFILE",ht()+".bin"),t(x,"file0_data",E),t(x,"file0_type","utf8"),t(x,"file1_name",f),t(x,"file1_data",btoa(Fn(dr()))),t(x,"file1_type","binary"),x.submit()}}function Ar(){let t={sys:ne.settings.id,image:bt};window.location.hash="#"+$.param(t)}function Sn(t){t.startsWith("?")&&(t=t.substr(1));var i=t.split("&");if(!i||i.length==0)return{};for(var x={},l=0;l<i.length;++l){var f=i[l].split("=",2);f.length==1?x[f[0]]="":x[f[0]]=decodeURIComponent(f[1].replace(/\+/g," "))}return x}function Tn(t){let i=$("#targetFormatSelect");i.empty();let[x,l]=t.name.split(" ("),f=new Set,E=null;it.forEach(g=>{if(g==null)i.append($("<option disabled></option>"));else{let[p,s]=g.name.split(" ("),A=$("<option />").text(g.name).val(g.id);if(p==x)E||(E=$("<optgroup />").attr("label",x),i.append(E)),E.append(A);else if(!f.has(p)){let c=$("<option />").text(p).val(g.id);i.append(c)}f.add(p)}}),i.val(t.id)}function Pn(){if(window.addEventListener("load",function(){document.querySelector('input[type="file"]').addEventListener("change",function(f){var E=f.target,g=E.files&&E.files[0];if(g){lt=g.name,bt="";var p=URL.createObjectURL(g);wt(p)}}),or.forEach(f=>{$('<a class="dropdown-item" href="#"></a>').text(f).appendTo("#examplesMenu")}),$("#examplesMenu").click(f=>{var E=$(f.target).text();lt=bt=E,wt("images/"+E),on.value=""}),fr.forEach((f,E)=>{var g=$("<option />").text(f.name).val(E);$("#diffuseTypeSelect").append(g)}),vn.forEach((f,E)=>{var g=$("<option />").text(f.name).val(f.id);$("#errorFuncSelect").append(g)}),ne.pixelsAvailable=f=>{wn(ct,f.img),yn(f.pal)};let i=Sn(window.location.hash.substring(1)),x=i.sys||it[0].id,l=gt[x];sr(l),lt=bt=i.image||"seurat.jpg",wt("images/"+lt),$("#diffuseSlider").on("change",We),$("#orderedSlider").on("change",We),$("#noiseSlider").on("change",We),$("#diversitySlider").on("change",Ze),$("#brightSlider").on("change",Ze),$("#contrastSlider").on("change",Ze),$("#saturationSlider").on("change",Ze),$("#resetButton").on("click",We),$("#diffuseTypeSelect").on("change",We),$("#targetFormatSelect").change(f=>{var E=f.target.selectedOptions[0];E&&sr(gt[E.value])}),$("#errorFuncSelect").on("change",We),$("#downloadImageBtn").click(Mn),$("#downloadNativeBtn").click(Dn),$("#gotoIDE").click(Rn)}),window.location.search=="?printmeta"){let i=function(){var x="";it.forEach(l=>{l&&(x+="* "+l.name+" - "+ur(l)+`
`)}),console.log(x)};var t=i;i()}}Pn();export{ne as dithertron,Pn as startUI};
/*! Bundled license information:

cropperjs/dist/cropper.js:
  (*!
   * Cropper.js v1.6.1
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2023-09-17T03:44:19.860Z
   *)

pica/dist/pica.js:
  (*!
  
  pica
  https://github.com/nodeca/pica
  
  *)
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=ui.js.map
