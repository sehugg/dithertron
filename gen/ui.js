var jr=Object.create;var Bt=Object.defineProperty;var Wr=Object.getOwnPropertyDescriptor;var zr=Object.getOwnPropertyNames;var Yr=Object.getPrototypeOf,Vr=Object.prototype.hasOwnProperty;var et=(r=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(r,{get:(n,x)=>(typeof require!="undefined"?require:n)[x]}):r)(function(r){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var Dt=(r,n)=>()=>(n||r((n={exports:{}}).exports,n),n.exports),va=(r,n)=>{for(var x in n)Bt(r,x,{get:n[x],enumerable:!0})},qr=(r,n,x,d)=>{if(n&&typeof n=="object"||typeof n=="function")for(let p of zr(n))!Vr.call(r,p)&&p!==x&&Bt(r,p,{get:()=>n[p],enumerable:!(d=Wr(n,p))||d.enumerable});return r};var Mt=(r,n,x)=>(x=r!=null?jr(Yr(r)):{},qr(n||!r||!r.__esModule?Bt(x,"default",{value:r,enumerable:!0}):x,r));var Ka=Dt(($t,Ut)=>{(function(r,n){typeof $t=="object"&&typeof Ut!="undefined"?Ut.exports=n():typeof define=="function"&&define.amd?define(n):(r=typeof globalThis!="undefined"?globalThis:r||self,r.Cropper=n())})($t,function(){"use strict";function r(i,e){var a=Object.keys(i);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(i);e&&(t=t.filter(function(h){return Object.getOwnPropertyDescriptor(i,h).enumerable})),a.push.apply(a,t)}return a}function n(i){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?r(Object(a),!0).forEach(function(t){v(i,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach(function(t){Object.defineProperty(i,t,Object.getOwnPropertyDescriptor(a,t))})}return i}function x(i){"@babel/helpers - typeof";return x=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(i)}function d(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function p(i,e){for(var a=0;a<e.length;a++){var t=e[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(i,Q(t.key),t)}}function D(i,e,a){return e&&p(i.prototype,e),a&&p(i,a),Object.defineProperty(i,"prototype",{writable:!1}),i}function v(i,e,a){return e=Q(e),e in i?Object.defineProperty(i,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[e]=a,i}function A(i){return s(i)||u(i)||c(i)||f()}function s(i){if(Array.isArray(i))return m(i)}function u(i){if(typeof Symbol!="undefined"&&i[Symbol.iterator]!=null||i["@@iterator"]!=null)return Array.from(i)}function c(i,e){if(i){if(typeof i=="string")return m(i,e);var a=Object.prototype.toString.call(i).slice(8,-1);if(a==="Object"&&i.constructor&&(a=i.constructor.name),a==="Map"||a==="Set")return Array.from(i);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return m(i,e)}}function m(i,e){(e==null||e>i.length)&&(e=i.length);for(var a=0,t=new Array(e);a<e;a++)t[a]=i[a];return t}function f(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function g(i,e){if(typeof i!="object"||i===null)return i;var a=i[Symbol.toPrimitive];if(a!==void 0){var t=a.call(i,e||"default");if(typeof t!="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(i)}function Q(i){var e=g(i,"string");return typeof e=="symbol"?e:String(e)}var I=typeof window!="undefined"&&typeof window.document!="undefined",w=I?window:{},b=I&&w.document.documentElement?"ontouchstart"in w.document.documentElement:!1,R=I?"PointerEvent"in w:!1,y="cropper",L="all",U="crop",z="move",W="zoom",V="e",H="w",j="s",Y="n",X="ne",J="nw",q="se",oe="sw",te="".concat(y,"-crop"),C="".concat(y,"-disabled"),S="".concat(y,"-hidden"),T="".concat(y,"-hide"),G="".concat(y,"-invisible"),P="".concat(y,"-modal"),ee="".concat(y,"-move"),K="".concat(y,"Action"),Z="".concat(y,"Preview"),se="crop",de="move",Ne="none",_e="crop",Ke="cropend",vt="cropmove",xt="cropstart",Yt="dblclick",lr=b?"touchstart":"mousedown",hr=b?"touchmove":"mousemove",fr=b?"touchend touchcancel":"mouseup",Vt=R?"pointerdown":lr,qt=R?"pointermove":hr,Kt=R?"pointerup pointercancel":fr,Zt="ready",Jt="resize",ea="wheel",bt="zoom",ta="image/jpeg",dr=/^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,ur=/^data:/,pr=/^data:image\/jpeg;base64,/,Ar=/^img|canvas$/i,aa=200,ra=100,ia={viewMode:0,dragMode:se,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:aa,minContainerHeight:ra,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},gr='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',mr=Number.isNaN||w.isNaN;function ae(i){return typeof i=="number"&&!mr(i)}var na=function(e){return e>0&&e<1/0};function wt(i){return typeof i=="undefined"}function Ge(i){return x(i)==="object"&&i!==null}var vr=Object.prototype.hasOwnProperty;function We(i){if(!Ge(i))return!1;try{var e=i.constructor,a=e.prototype;return e&&a&&vr.call(a,"isPrototypeOf")}catch(t){return!1}}function xe(i){return typeof i=="function"}var xr=Array.prototype.slice;function oa(i){return Array.from?Array.from(i):xr.call(i)}function ue(i,e){return i&&xe(e)&&(Array.isArray(i)||ae(i.length)?oa(i).forEach(function(a,t){e.call(i,a,t,i)}):Ge(i)&&Object.keys(i).forEach(function(a){e.call(i,i[a],a,i)})),i}var he=Object.assign||function(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),h=1;h<a;h++)t[h-1]=arguments[h];return Ge(e)&&t.length>0&&t.forEach(function(o){Ge(o)&&Object.keys(o).forEach(function(l){e[l]=o[l]})}),e},br=/\.\d*(?:0|9){12}\d*$/;function ze(i){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return br.test(i)?Math.round(i*e)/e:i}var wr=/^width|height|left|top|marginLeft|marginTop$/;function Se(i,e){var a=i.style;ue(e,function(t,h){wr.test(h)&&ae(t)&&(t="".concat(t,"px")),a[h]=t})}function Cr(i,e){return i.classList?i.classList.contains(e):i.className.indexOf(e)>-1}function me(i,e){if(e){if(ae(i.length)){ue(i,function(t){me(t,e)});return}if(i.classList){i.classList.add(e);return}var a=i.className.trim();a?a.indexOf(e)<0&&(i.className="".concat(a," ").concat(e)):i.className=e}}function Be(i,e){if(e){if(ae(i.length)){ue(i,function(a){Be(a,e)});return}if(i.classList){i.classList.remove(e);return}i.className.indexOf(e)>=0&&(i.className=i.className.replace(e,""))}}function Ye(i,e,a){if(e){if(ae(i.length)){ue(i,function(t){Ye(t,e,a)});return}a?me(i,e):Be(i,e)}}var Ir=/([a-z\d])([A-Z])/g;function Ct(i){return i.replace(Ir,"$1-$2").toLowerCase()}function It(i,e){return Ge(i[e])?i[e]:i.dataset?i.dataset[e]:i.getAttribute("data-".concat(Ct(e)))}function Ze(i,e,a){Ge(a)?i[e]=a:i.dataset?i.dataset[e]=a:i.setAttribute("data-".concat(Ct(e)),a)}function Er(i,e){if(Ge(i[e]))try{delete i[e]}catch(a){i[e]=void 0}else if(i.dataset)try{delete i.dataset[e]}catch(a){i.dataset[e]=void 0}else i.removeAttribute("data-".concat(Ct(e)))}var sa=/\s\s*/,ca=function(){var i=!1;if(I){var e=!1,a=function(){},t=Object.defineProperty({},"once",{get:function(){return i=!0,e},set:function(o){e=o}});w.addEventListener("test",a,t),w.removeEventListener("test",a,t)}return i}();function ye(i,e,a){var t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},h=a;e.trim().split(sa).forEach(function(o){if(!ca){var l=i.listeners;l&&l[o]&&l[o][a]&&(h=l[o][a],delete l[o][a],Object.keys(l[o]).length===0&&delete l[o],Object.keys(l).length===0&&delete i.listeners)}i.removeEventListener(o,h,t)})}function Ie(i,e,a){var t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},h=a;e.trim().split(sa).forEach(function(o){if(t.once&&!ca){var l=i.listeners,E=l===void 0?{}:l;h=function(){delete E[o][a],i.removeEventListener(o,h,t);for(var F=arguments.length,_=new Array(F),B=0;B<F;B++)_[B]=arguments[B];a.apply(i,_)},E[o]||(E[o]={}),E[o][a]&&i.removeEventListener(o,E[o][a],t),E[o][a]=h,i.listeners=E}i.addEventListener(o,h,t)})}function Ve(i,e,a){var t;return xe(Event)&&xe(CustomEvent)?t=new CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0}):(t=document.createEvent("CustomEvent"),t.initCustomEvent(e,!0,!0,a)),i.dispatchEvent(t)}function la(i){var e=i.getBoundingClientRect();return{left:e.left+(window.pageXOffset-document.documentElement.clientLeft),top:e.top+(window.pageYOffset-document.documentElement.clientTop)}}var Et=w.location,yr=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i;function ha(i){var e=i.match(yr);return e!==null&&(e[1]!==Et.protocol||e[2]!==Et.hostname||e[3]!==Et.port)}function fa(i){var e="timestamp=".concat(new Date().getTime());return i+(i.indexOf("?")===-1?"?":"&")+e}function Je(i){var e=i.rotate,a=i.scaleX,t=i.scaleY,h=i.translateX,o=i.translateY,l=[];ae(h)&&h!==0&&l.push("translateX(".concat(h,"px)")),ae(o)&&o!==0&&l.push("translateY(".concat(o,"px)")),ae(e)&&e!==0&&l.push("rotate(".concat(e,"deg)")),ae(a)&&a!==1&&l.push("scaleX(".concat(a,")")),ae(t)&&t!==1&&l.push("scaleY(".concat(t,")"));var E=l.length?l.join(" "):"none";return{WebkitTransform:E,msTransform:E,transform:E}}function _r(i){var e=n({},i),a=0;return ue(i,function(t,h){delete e[h],ue(e,function(o){var l=Math.abs(t.startX-o.startX),E=Math.abs(t.startY-o.startY),k=Math.abs(t.endX-o.endX),F=Math.abs(t.endY-o.endY),_=Math.sqrt(l*l+E*E),B=Math.sqrt(k*k+F*F),O=(B-_)/_;Math.abs(O)>Math.abs(a)&&(a=O)})}),a}function ct(i,e){var a=i.pageX,t=i.pageY,h={endX:a,endY:t};return e?h:n({startX:a,startY:t},h)}function Br(i){var e=0,a=0,t=0;return ue(i,function(h){var o=h.startX,l=h.startY;e+=o,a+=l,t+=1}),e/=t,a/=t,{pageX:e,pageY:a}}function Te(i){var e=i.aspectRatio,a=i.height,t=i.width,h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"contain",o=na(t),l=na(a);if(o&&l){var E=a*e;h==="contain"&&E>t||h==="cover"&&E<t?a=t/e:t=a*e}else o?a=t/e:l&&(t=a*e);return{width:t,height:a}}function Dr(i){var e=i.width,a=i.height,t=i.degree;if(t=Math.abs(t)%180,t===90)return{width:a,height:e};var h=t%90*Math.PI/180,o=Math.sin(h),l=Math.cos(h),E=e*l+a*o,k=e*o+a*l;return t>90?{width:k,height:E}:{width:E,height:k}}function Mr(i,e,a,t){var h=e.aspectRatio,o=e.naturalWidth,l=e.naturalHeight,E=e.rotate,k=E===void 0?0:E,F=e.scaleX,_=F===void 0?1:F,B=e.scaleY,O=B===void 0?1:B,ie=a.aspectRatio,re=a.naturalWidth,fe=a.naturalHeight,ce=t.fillColor,Ae=ce===void 0?"transparent":ce,ve=t.imageSmoothingEnabled,pe=ve===void 0?!0:ve,Re=t.imageSmoothingQuality,Ce=Re===void 0?"low":Re,N=t.maxWidth,le=N===void 0?1/0:N,ge=t.maxHeight,Ee=ge===void 0?1/0:ge,Fe=t.minWidth,$e=Fe===void 0?0:Fe,Ue=t.minHeight,Qe=Ue===void 0?0:Ue,De=document.createElement("canvas"),be=De.getContext("2d"),He=Te({aspectRatio:ie,width:le,height:Ee}),lt=Te({aspectRatio:ie,width:$e,height:Qe},"cover"),yt=Math.min(He.width,Math.max(lt.width,re)),_t=Math.min(He.height,Math.max(lt.height,fe)),pa=Te({aspectRatio:h,width:le,height:Ee}),Aa=Te({aspectRatio:h,width:$e,height:Qe},"cover"),ga=Math.min(pa.width,Math.max(Aa.width,o)),ma=Math.min(pa.height,Math.max(Aa.height,l)),Hr=[-ga/2,-ma/2,ga,ma];return De.width=ze(yt),De.height=ze(_t),be.fillStyle=Ae,be.fillRect(0,0,yt,_t),be.save(),be.translate(yt/2,_t/2),be.rotate(k*Math.PI/180),be.scale(_,O),be.imageSmoothingEnabled=pe,be.imageSmoothingQuality=Ce,be.drawImage.apply(be,[i].concat(A(Hr.map(function(Xr){return Math.floor(ze(Xr))})))),be.restore(),De}var da=String.fromCharCode;function Rr(i,e,a){var t="";a+=e;for(var h=e;h<a;h+=1)t+=da(i.getUint8(h));return t}var Fr=/^data:.*,/;function Sr(i){var e=i.replace(Fr,""),a=atob(e),t=new ArrayBuffer(a.length),h=new Uint8Array(t);return ue(h,function(o,l){h[l]=a.charCodeAt(l)}),t}function Tr(i,e){for(var a=[],t=8192,h=new Uint8Array(i);h.length>0;)a.push(da.apply(null,oa(h.subarray(0,t)))),h=h.subarray(t);return"data:".concat(e,";base64,").concat(btoa(a.join("")))}function Qr(i){var e=new DataView(i),a;try{var t,h,o;if(e.getUint8(0)===255&&e.getUint8(1)===216)for(var l=e.byteLength,E=2;E+1<l;){if(e.getUint8(E)===255&&e.getUint8(E+1)===225){h=E;break}E+=1}if(h){var k=h+4,F=h+10;if(Rr(e,k,4)==="Exif"){var _=e.getUint16(F);if(t=_===18761,(t||_===19789)&&e.getUint16(F+2,t)===42){var B=e.getUint32(F+4,t);B>=8&&(o=F+B)}}}if(o){var O=e.getUint16(o,t),ie,re;for(re=0;re<O;re+=1)if(ie=o+re*12+2,e.getUint16(ie,t)===274){ie+=8,a=e.getUint16(ie,t),e.setUint16(ie,1,t);break}}}catch(fe){a=1}return a}function Or(i){var e=0,a=1,t=1;switch(i){case 2:a=-1;break;case 3:e=-180;break;case 4:t=-1;break;case 5:e=90,t=-1;break;case 6:e=90;break;case 7:e=90,a=-1;break;case 8:e=-90;break}return{rotate:e,scaleX:a,scaleY:t}}var Pr={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var e=this.element,a=this.options,t=this.container,h=this.cropper,o=Number(a.minContainerWidth),l=Number(a.minContainerHeight);me(h,S),Be(e,S);var E={width:Math.max(t.offsetWidth,o>=0?o:aa),height:Math.max(t.offsetHeight,l>=0?l:ra)};this.containerData=E,Se(h,{width:E.width,height:E.height}),me(e,S),Be(h,S)},initCanvas:function(){var e=this.containerData,a=this.imageData,t=this.options.viewMode,h=Math.abs(a.rotate)%180===90,o=h?a.naturalHeight:a.naturalWidth,l=h?a.naturalWidth:a.naturalHeight,E=o/l,k=e.width,F=e.height;e.height*E>e.width?t===3?k=e.height*E:F=e.width/E:t===3?F=e.width/E:k=e.height*E;var _={aspectRatio:E,naturalWidth:o,naturalHeight:l,width:k,height:F};this.canvasData=_,this.limited=t===1||t===2,this.limitCanvas(!0,!0),_.width=Math.min(Math.max(_.width,_.minWidth),_.maxWidth),_.height=Math.min(Math.max(_.height,_.minHeight),_.maxHeight),_.left=(e.width-_.width)/2,_.top=(e.height-_.height)/2,_.oldLeft=_.left,_.oldTop=_.top,this.initialCanvasData=he({},_)},limitCanvas:function(e,a){var t=this.options,h=this.containerData,o=this.canvasData,l=this.cropBoxData,E=t.viewMode,k=o.aspectRatio,F=this.cropped&&l;if(e){var _=Number(t.minCanvasWidth)||0,B=Number(t.minCanvasHeight)||0;E>1?(_=Math.max(_,h.width),B=Math.max(B,h.height),E===3&&(B*k>_?_=B*k:B=_/k)):E>0&&(_?_=Math.max(_,F?l.width:0):B?B=Math.max(B,F?l.height:0):F&&(_=l.width,B=l.height,B*k>_?_=B*k:B=_/k));var O=Te({aspectRatio:k,width:_,height:B});_=O.width,B=O.height,o.minWidth=_,o.minHeight=B,o.maxWidth=1/0,o.maxHeight=1/0}if(a)if(E>(F?0:1)){var ie=h.width-o.width,re=h.height-o.height;o.minLeft=Math.min(0,ie),o.minTop=Math.min(0,re),o.maxLeft=Math.max(0,ie),o.maxTop=Math.max(0,re),F&&this.limited&&(o.minLeft=Math.min(l.left,l.left+(l.width-o.width)),o.minTop=Math.min(l.top,l.top+(l.height-o.height)),o.maxLeft=l.left,o.maxTop=l.top,E===2&&(o.width>=h.width&&(o.minLeft=Math.min(0,ie),o.maxLeft=Math.max(0,ie)),o.height>=h.height&&(o.minTop=Math.min(0,re),o.maxTop=Math.max(0,re))))}else o.minLeft=-o.width,o.minTop=-o.height,o.maxLeft=h.width,o.maxTop=h.height},renderCanvas:function(e,a){var t=this.canvasData,h=this.imageData;if(a){var o=Dr({width:h.naturalWidth*Math.abs(h.scaleX||1),height:h.naturalHeight*Math.abs(h.scaleY||1),degree:h.rotate||0}),l=o.width,E=o.height,k=t.width*(l/t.naturalWidth),F=t.height*(E/t.naturalHeight);t.left-=(k-t.width)/2,t.top-=(F-t.height)/2,t.width=k,t.height=F,t.aspectRatio=l/E,t.naturalWidth=l,t.naturalHeight=E,this.limitCanvas(!0,!1)}(t.width>t.maxWidth||t.width<t.minWidth)&&(t.left=t.oldLeft),(t.height>t.maxHeight||t.height<t.minHeight)&&(t.top=t.oldTop),t.width=Math.min(Math.max(t.width,t.minWidth),t.maxWidth),t.height=Math.min(Math.max(t.height,t.minHeight),t.maxHeight),this.limitCanvas(!1,!0),t.left=Math.min(Math.max(t.left,t.minLeft),t.maxLeft),t.top=Math.min(Math.max(t.top,t.minTop),t.maxTop),t.oldLeft=t.left,t.oldTop=t.top,Se(this.canvas,he({width:t.width,height:t.height},Je({translateX:t.left,translateY:t.top}))),this.renderImage(e),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(e){var a=this.canvasData,t=this.imageData,h=t.naturalWidth*(a.width/a.naturalWidth),o=t.naturalHeight*(a.height/a.naturalHeight);he(t,{width:h,height:o,left:(a.width-h)/2,top:(a.height-o)/2}),Se(this.image,he({width:t.width,height:t.height},Je(he({translateX:t.left,translateY:t.top},t)))),e&&this.output()},initCropBox:function(){var e=this.options,a=this.canvasData,t=e.aspectRatio||e.initialAspectRatio,h=Number(e.autoCropArea)||.8,o={width:a.width,height:a.height};t&&(a.height*t>a.width?o.height=o.width/t:o.width=o.height*t),this.cropBoxData=o,this.limitCropBox(!0,!0),o.width=Math.min(Math.max(o.width,o.minWidth),o.maxWidth),o.height=Math.min(Math.max(o.height,o.minHeight),o.maxHeight),o.width=Math.max(o.minWidth,o.width*h),o.height=Math.max(o.minHeight,o.height*h),o.left=a.left+(a.width-o.width)/2,o.top=a.top+(a.height-o.height)/2,o.oldLeft=o.left,o.oldTop=o.top,this.initialCropBoxData=he({},o)},limitCropBox:function(e,a){var t=this.options,h=this.containerData,o=this.canvasData,l=this.cropBoxData,E=this.limited,k=t.aspectRatio;if(e){var F=Number(t.minCropBoxWidth)||0,_=Number(t.minCropBoxHeight)||0,B=E?Math.min(h.width,o.width,o.width+o.left,h.width-o.left):h.width,O=E?Math.min(h.height,o.height,o.height+o.top,h.height-o.top):h.height;F=Math.min(F,h.width),_=Math.min(_,h.height),k&&(F&&_?_*k>F?_=F/k:F=_*k:F?_=F/k:_&&(F=_*k),O*k>B?O=B/k:B=O*k),l.minWidth=Math.min(F,B),l.minHeight=Math.min(_,O),l.maxWidth=B,l.maxHeight=O}a&&(E?(l.minLeft=Math.max(0,o.left),l.minTop=Math.max(0,o.top),l.maxLeft=Math.min(h.width,o.left+o.width)-l.width,l.maxTop=Math.min(h.height,o.top+o.height)-l.height):(l.minLeft=0,l.minTop=0,l.maxLeft=h.width-l.width,l.maxTop=h.height-l.height))},renderCropBox:function(){var e=this.options,a=this.containerData,t=this.cropBoxData;(t.width>t.maxWidth||t.width<t.minWidth)&&(t.left=t.oldLeft),(t.height>t.maxHeight||t.height<t.minHeight)&&(t.top=t.oldTop),t.width=Math.min(Math.max(t.width,t.minWidth),t.maxWidth),t.height=Math.min(Math.max(t.height,t.minHeight),t.maxHeight),this.limitCropBox(!1,!0),t.left=Math.min(Math.max(t.left,t.minLeft),t.maxLeft),t.top=Math.min(Math.max(t.top,t.minTop),t.maxTop),t.oldLeft=t.left,t.oldTop=t.top,e.movable&&e.cropBoxMovable&&Ze(this.face,K,t.width>=a.width&&t.height>=a.height?z:L),Se(this.cropBox,he({width:t.width,height:t.height},Je({translateX:t.left,translateY:t.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),Ve(this.element,_e,this.getData())}},kr={initPreview:function(){var e=this.element,a=this.crossOrigin,t=this.options.preview,h=a?this.crossOriginUrl:this.url,o=e.alt||"The image to preview",l=document.createElement("img");if(a&&(l.crossOrigin=a),l.src=h,l.alt=o,this.viewBox.appendChild(l),this.viewBoxImage=l,!!t){var E=t;typeof t=="string"?E=e.ownerDocument.querySelectorAll(t):t.querySelector&&(E=[t]),this.previews=E,ue(E,function(k){var F=document.createElement("img");Ze(k,Z,{width:k.offsetWidth,height:k.offsetHeight,html:k.innerHTML}),a&&(F.crossOrigin=a),F.src=h,F.alt=o,F.style.cssText='display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',k.innerHTML="",k.appendChild(F)})}},resetPreview:function(){ue(this.previews,function(e){var a=It(e,Z);Se(e,{width:a.width,height:a.height}),e.innerHTML=a.html,Er(e,Z)})},preview:function(){var e=this.imageData,a=this.canvasData,t=this.cropBoxData,h=t.width,o=t.height,l=e.width,E=e.height,k=t.left-a.left-e.left,F=t.top-a.top-e.top;!this.cropped||this.disabled||(Se(this.viewBoxImage,he({width:l,height:E},Je(he({translateX:-k,translateY:-F},e)))),ue(this.previews,function(_){var B=It(_,Z),O=B.width,ie=B.height,re=O,fe=ie,ce=1;h&&(ce=O/h,fe=o*ce),o&&fe>ie&&(ce=ie/o,re=h*ce,fe=ie),Se(_,{width:re,height:fe}),Se(_.getElementsByTagName("img")[0],he({width:l*ce,height:E*ce},Je(he({translateX:-k*ce,translateY:-F*ce},e))))}))}},Lr={bind:function(){var e=this.element,a=this.options,t=this.cropper;xe(a.cropstart)&&Ie(e,xt,a.cropstart),xe(a.cropmove)&&Ie(e,vt,a.cropmove),xe(a.cropend)&&Ie(e,Ke,a.cropend),xe(a.crop)&&Ie(e,_e,a.crop),xe(a.zoom)&&Ie(e,bt,a.zoom),Ie(t,Vt,this.onCropStart=this.cropStart.bind(this)),a.zoomable&&a.zoomOnWheel&&Ie(t,ea,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),a.toggleDragModeOnDblclick&&Ie(t,Yt,this.onDblclick=this.dblclick.bind(this)),Ie(e.ownerDocument,qt,this.onCropMove=this.cropMove.bind(this)),Ie(e.ownerDocument,Kt,this.onCropEnd=this.cropEnd.bind(this)),a.responsive&&Ie(window,Jt,this.onResize=this.resize.bind(this))},unbind:function(){var e=this.element,a=this.options,t=this.cropper;xe(a.cropstart)&&ye(e,xt,a.cropstart),xe(a.cropmove)&&ye(e,vt,a.cropmove),xe(a.cropend)&&ye(e,Ke,a.cropend),xe(a.crop)&&ye(e,_e,a.crop),xe(a.zoom)&&ye(e,bt,a.zoom),ye(t,Vt,this.onCropStart),a.zoomable&&a.zoomOnWheel&&ye(t,ea,this.onWheel,{passive:!1,capture:!0}),a.toggleDragModeOnDblclick&&ye(t,Yt,this.onDblclick),ye(e.ownerDocument,qt,this.onCropMove),ye(e.ownerDocument,Kt,this.onCropEnd),a.responsive&&ye(window,Jt,this.onResize)}},Nr={resize:function(){if(!this.disabled){var e=this.options,a=this.container,t=this.containerData,h=a.offsetWidth/t.width,o=a.offsetHeight/t.height,l=Math.abs(h-1)>Math.abs(o-1)?h:o;if(l!==1){var E,k;e.restore&&(E=this.getCanvasData(),k=this.getCropBoxData()),this.render(),e.restore&&(this.setCanvasData(ue(E,function(F,_){E[_]=F*l})),this.setCropBoxData(ue(k,function(F,_){k[_]=F*l})))}}},dblclick:function(){this.disabled||this.options.dragMode===Ne||this.setDragMode(Cr(this.dragBox,te)?de:se)},wheel:function(e){var a=this,t=Number(this.options.wheelZoomRatio)||.1,h=1;this.disabled||(e.preventDefault(),!this.wheeling&&(this.wheeling=!0,setTimeout(function(){a.wheeling=!1},50),e.deltaY?h=e.deltaY>0?1:-1:e.wheelDelta?h=-e.wheelDelta/120:e.detail&&(h=e.detail>0?1:-1),this.zoom(-h*t,e)))},cropStart:function(e){var a=e.buttons,t=e.button;if(!(this.disabled||(e.type==="mousedown"||e.type==="pointerdown"&&e.pointerType==="mouse")&&(ae(a)&&a!==1||ae(t)&&t!==0||e.ctrlKey))){var h=this.options,o=this.pointers,l;e.changedTouches?ue(e.changedTouches,function(E){o[E.identifier]=ct(E)}):o[e.pointerId||0]=ct(e),Object.keys(o).length>1&&h.zoomable&&h.zoomOnTouch?l=W:l=It(e.target,K),dr.test(l)&&Ve(this.element,xt,{originalEvent:e,action:l})!==!1&&(e.preventDefault(),this.action=l,this.cropping=!1,l===U&&(this.cropping=!0,me(this.dragBox,P)))}},cropMove:function(e){var a=this.action;if(!(this.disabled||!a)){var t=this.pointers;e.preventDefault(),Ve(this.element,vt,{originalEvent:e,action:a})!==!1&&(e.changedTouches?ue(e.changedTouches,function(h){he(t[h.identifier]||{},ct(h,!0))}):he(t[e.pointerId||0]||{},ct(e,!0)),this.change(e))}},cropEnd:function(e){if(!this.disabled){var a=this.action,t=this.pointers;e.changedTouches?ue(e.changedTouches,function(h){delete t[h.identifier]}):delete t[e.pointerId||0],a&&(e.preventDefault(),Object.keys(t).length||(this.action=""),this.cropping&&(this.cropping=!1,Ye(this.dragBox,P,this.cropped&&this.options.modal)),Ve(this.element,Ke,{originalEvent:e,action:a}))}}},Gr={change:function(e){var a=this.options,t=this.canvasData,h=this.containerData,o=this.cropBoxData,l=this.pointers,E=this.action,k=a.aspectRatio,F=o.left,_=o.top,B=o.width,O=o.height,ie=F+B,re=_+O,fe=0,ce=0,Ae=h.width,ve=h.height,pe=!0,Re;!k&&e.shiftKey&&(k=B&&O?B/O:1),this.limited&&(fe=o.minLeft,ce=o.minTop,Ae=fe+Math.min(h.width,t.width,t.left+t.width),ve=ce+Math.min(h.height,t.height,t.top+t.height));var Ce=l[Object.keys(l)[0]],N={x:Ce.endX-Ce.startX,y:Ce.endY-Ce.startY},le=function(Ee){switch(Ee){case V:ie+N.x>Ae&&(N.x=Ae-ie);break;case H:F+N.x<fe&&(N.x=fe-F);break;case Y:_+N.y<ce&&(N.y=ce-_);break;case j:re+N.y>ve&&(N.y=ve-re);break}};switch(E){case L:F+=N.x,_+=N.y;break;case V:if(N.x>=0&&(ie>=Ae||k&&(_<=ce||re>=ve))){pe=!1;break}le(V),B+=N.x,B<0&&(E=H,B=-B,F-=B),k&&(O=B/k,_+=(o.height-O)/2);break;case Y:if(N.y<=0&&(_<=ce||k&&(F<=fe||ie>=Ae))){pe=!1;break}le(Y),O-=N.y,_+=N.y,O<0&&(E=j,O=-O,_-=O),k&&(B=O*k,F+=(o.width-B)/2);break;case H:if(N.x<=0&&(F<=fe||k&&(_<=ce||re>=ve))){pe=!1;break}le(H),B-=N.x,F+=N.x,B<0&&(E=V,B=-B,F-=B),k&&(O=B/k,_+=(o.height-O)/2);break;case j:if(N.y>=0&&(re>=ve||k&&(F<=fe||ie>=Ae))){pe=!1;break}le(j),O+=N.y,O<0&&(E=Y,O=-O,_-=O),k&&(B=O*k,F+=(o.width-B)/2);break;case X:if(k){if(N.y<=0&&(_<=ce||ie>=Ae)){pe=!1;break}le(Y),O-=N.y,_+=N.y,B=O*k}else le(Y),le(V),N.x>=0?ie<Ae?B+=N.x:N.y<=0&&_<=ce&&(pe=!1):B+=N.x,N.y<=0?_>ce&&(O-=N.y,_+=N.y):(O-=N.y,_+=N.y);B<0&&O<0?(E=oe,O=-O,B=-B,_-=O,F-=B):B<0?(E=J,B=-B,F-=B):O<0&&(E=q,O=-O,_-=O);break;case J:if(k){if(N.y<=0&&(_<=ce||F<=fe)){pe=!1;break}le(Y),O-=N.y,_+=N.y,B=O*k,F+=o.width-B}else le(Y),le(H),N.x<=0?F>fe?(B-=N.x,F+=N.x):N.y<=0&&_<=ce&&(pe=!1):(B-=N.x,F+=N.x),N.y<=0?_>ce&&(O-=N.y,_+=N.y):(O-=N.y,_+=N.y);B<0&&O<0?(E=q,O=-O,B=-B,_-=O,F-=B):B<0?(E=X,B=-B,F-=B):O<0&&(E=oe,O=-O,_-=O);break;case oe:if(k){if(N.x<=0&&(F<=fe||re>=ve)){pe=!1;break}le(H),B-=N.x,F+=N.x,O=B/k}else le(j),le(H),N.x<=0?F>fe?(B-=N.x,F+=N.x):N.y>=0&&re>=ve&&(pe=!1):(B-=N.x,F+=N.x),N.y>=0?re<ve&&(O+=N.y):O+=N.y;B<0&&O<0?(E=X,O=-O,B=-B,_-=O,F-=B):B<0?(E=q,B=-B,F-=B):O<0&&(E=J,O=-O,_-=O);break;case q:if(k){if(N.x>=0&&(ie>=Ae||re>=ve)){pe=!1;break}le(V),B+=N.x,O=B/k}else le(j),le(V),N.x>=0?ie<Ae?B+=N.x:N.y>=0&&re>=ve&&(pe=!1):B+=N.x,N.y>=0?re<ve&&(O+=N.y):O+=N.y;B<0&&O<0?(E=J,O=-O,B=-B,_-=O,F-=B):B<0?(E=oe,B=-B,F-=B):O<0&&(E=X,O=-O,_-=O);break;case z:this.move(N.x,N.y),pe=!1;break;case W:this.zoom(_r(l),e),pe=!1;break;case U:if(!N.x||!N.y){pe=!1;break}Re=la(this.cropper),F=Ce.startX-Re.left,_=Ce.startY-Re.top,B=o.minWidth,O=o.minHeight,N.x>0?E=N.y>0?q:X:N.x<0&&(F-=B,E=N.y>0?oe:J),N.y<0&&(_-=O),this.cropped||(Be(this.cropBox,S),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0));break}pe&&(o.width=B,o.height=O,o.left=F,o.top=_,this.action=E,this.renderCropBox()),ue(l,function(ge){ge.startX=ge.endX,ge.startY=ge.endY})}},$r={crop:function(){return this.ready&&!this.cropped&&!this.disabled&&(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&me(this.dragBox,P),Be(this.cropBox,S),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=he({},this.initialImageData),this.canvasData=he({},this.initialCanvasData),this.cropBoxData=he({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(he(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),Be(this.dragBox,P),me(this.cropBox,S)),this},replace:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return!this.disabled&&e&&(this.isImg&&(this.element.src=e),a?(this.url=e,this.image.src=e,this.ready&&(this.viewBoxImage.src=e,ue(this.previews,function(t){t.getElementsByTagName("img")[0].src=e}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(e))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,Be(this.cropper,C)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,me(this.cropper,C)),this},destroy:function(){var e=this.element;return e[y]?(e[y]=void 0,this.isImg&&this.replaced&&(e.src=this.originalUrl),this.uncreate(),this):this},move:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,t=this.canvasData,h=t.left,o=t.top;return this.moveTo(wt(e)?e:h+Number(e),wt(a)?a:o+Number(a))},moveTo:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,t=this.canvasData,h=!1;return e=Number(e),a=Number(a),this.ready&&!this.disabled&&this.options.movable&&(ae(e)&&(t.left=e,h=!0),ae(a)&&(t.top=a,h=!0),h&&this.renderCanvas(!0)),this},zoom:function(e,a){var t=this.canvasData;return e=Number(e),e<0?e=1/(1-e):e=1+e,this.zoomTo(t.width*e/t.naturalWidth,null,a)},zoomTo:function(e,a,t){var h=this.options,o=this.canvasData,l=o.width,E=o.height,k=o.naturalWidth,F=o.naturalHeight;if(e=Number(e),e>=0&&this.ready&&!this.disabled&&h.zoomable){var _=k*e,B=F*e;if(Ve(this.element,bt,{ratio:e,oldRatio:l/k,originalEvent:t})===!1)return this;if(t){var O=this.pointers,ie=la(this.cropper),re=O&&Object.keys(O).length?Br(O):{pageX:t.pageX,pageY:t.pageY};o.left-=(_-l)*((re.pageX-ie.left-o.left)/l),o.top-=(B-E)*((re.pageY-ie.top-o.top)/E)}else We(a)&&ae(a.x)&&ae(a.y)?(o.left-=(_-l)*((a.x-o.left)/l),o.top-=(B-E)*((a.y-o.top)/E)):(o.left-=(_-l)/2,o.top-=(B-E)/2);o.width=_,o.height=B,this.renderCanvas(!0)}return this},rotate:function(e){return this.rotateTo((this.imageData.rotate||0)+Number(e))},rotateTo:function(e){return e=Number(e),ae(e)&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=e%360,this.renderCanvas(!0,!0)),this},scaleX:function(e){var a=this.imageData.scaleY;return this.scale(e,ae(a)?a:1)},scaleY:function(e){var a=this.imageData.scaleX;return this.scale(ae(a)?a:1,e)},scale:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,t=this.imageData,h=!1;return e=Number(e),a=Number(a),this.ready&&!this.disabled&&this.options.scalable&&(ae(e)&&(t.scaleX=e,h=!0),ae(a)&&(t.scaleY=a,h=!0),h&&this.renderCanvas(!0,!0)),this},getData:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,a=this.options,t=this.imageData,h=this.canvasData,o=this.cropBoxData,l;if(this.ready&&this.cropped){l={x:o.left-h.left,y:o.top-h.top,width:o.width,height:o.height};var E=t.width/t.naturalWidth;if(ue(l,function(_,B){l[B]=_/E}),e){var k=Math.round(l.y+l.height),F=Math.round(l.x+l.width);l.x=Math.round(l.x),l.y=Math.round(l.y),l.width=F-l.x,l.height=k-l.y}}else l={x:0,y:0,width:0,height:0};return a.rotatable&&(l.rotate=t.rotate||0),a.scalable&&(l.scaleX=t.scaleX||1,l.scaleY=t.scaleY||1),l},setData:function(e){var a=this.options,t=this.imageData,h=this.canvasData,o={};if(this.ready&&!this.disabled&&We(e)){var l=!1;a.rotatable&&ae(e.rotate)&&e.rotate!==t.rotate&&(t.rotate=e.rotate,l=!0),a.scalable&&(ae(e.scaleX)&&e.scaleX!==t.scaleX&&(t.scaleX=e.scaleX,l=!0),ae(e.scaleY)&&e.scaleY!==t.scaleY&&(t.scaleY=e.scaleY,l=!0)),l&&this.renderCanvas(!0,!0);var E=t.width/t.naturalWidth;ae(e.x)&&(o.left=e.x*E+h.left),ae(e.y)&&(o.top=e.y*E+h.top),ae(e.width)&&(o.width=e.width*E),ae(e.height)&&(o.height=e.height*E),this.setCropBoxData(o)}return this},getContainerData:function(){return this.ready?he({},this.containerData):{}},getImageData:function(){return this.sized?he({},this.imageData):{}},getCanvasData:function(){var e=this.canvasData,a={};return this.ready&&ue(["left","top","width","height","naturalWidth","naturalHeight"],function(t){a[t]=e[t]}),a},setCanvasData:function(e){var a=this.canvasData,t=a.aspectRatio;return this.ready&&!this.disabled&&We(e)&&(ae(e.left)&&(a.left=e.left),ae(e.top)&&(a.top=e.top),ae(e.width)?(a.width=e.width,a.height=e.width/t):ae(e.height)&&(a.height=e.height,a.width=e.height*t),this.renderCanvas(!0)),this},getCropBoxData:function(){var e=this.cropBoxData,a;return this.ready&&this.cropped&&(a={left:e.left,top:e.top,width:e.width,height:e.height}),a||{}},setCropBoxData:function(e){var a=this.cropBoxData,t=this.options.aspectRatio,h,o;return this.ready&&this.cropped&&!this.disabled&&We(e)&&(ae(e.left)&&(a.left=e.left),ae(e.top)&&(a.top=e.top),ae(e.width)&&e.width!==a.width&&(h=!0,a.width=e.width),ae(e.height)&&e.height!==a.height&&(o=!0,a.height=e.height),t&&(h?a.height=a.width/t:o&&(a.width=a.height*t)),this.renderCropBox()),this},getCroppedCanvas:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var a=this.canvasData,t=Mr(this.image,this.imageData,a,e);if(!this.cropped)return t;var h=this.getData(e.rounded),o=h.x,l=h.y,E=h.width,k=h.height,F=t.width/Math.floor(a.naturalWidth);F!==1&&(o*=F,l*=F,E*=F,k*=F);var _=E/k,B=Te({aspectRatio:_,width:e.maxWidth||1/0,height:e.maxHeight||1/0}),O=Te({aspectRatio:_,width:e.minWidth||0,height:e.minHeight||0},"cover"),ie=Te({aspectRatio:_,width:e.width||(F!==1?t.width:E),height:e.height||(F!==1?t.height:k)}),re=ie.width,fe=ie.height;re=Math.min(B.width,Math.max(O.width,re)),fe=Math.min(B.height,Math.max(O.height,fe));var ce=document.createElement("canvas"),Ae=ce.getContext("2d");ce.width=ze(re),ce.height=ze(fe),Ae.fillStyle=e.fillColor||"transparent",Ae.fillRect(0,0,re,fe);var ve=e.imageSmoothingEnabled,pe=ve===void 0?!0:ve,Re=e.imageSmoothingQuality;Ae.imageSmoothingEnabled=pe,Re&&(Ae.imageSmoothingQuality=Re);var Ce=t.width,N=t.height,le=o,ge=l,Ee,Fe,$e,Ue,Qe,De;le<=-E||le>Ce?(le=0,Ee=0,$e=0,Qe=0):le<=0?($e=-le,le=0,Ee=Math.min(Ce,E+le),Qe=Ee):le<=Ce&&($e=0,Ee=Math.min(E,Ce-le),Qe=Ee),Ee<=0||ge<=-k||ge>N?(ge=0,Fe=0,Ue=0,De=0):ge<=0?(Ue=-ge,ge=0,Fe=Math.min(N,k+ge),De=Fe):ge<=N&&(Ue=0,Fe=Math.min(k,N-ge),De=Fe);var be=[le,ge,Ee,Fe];if(Qe>0&&De>0){var He=re/E;be.push($e*He,Ue*He,Qe*He,De*He)}return Ae.drawImage.apply(Ae,[t].concat(A(be.map(function(lt){return Math.floor(ze(lt))})))),ce},setAspectRatio:function(e){var a=this.options;return!this.disabled&&!wt(e)&&(a.aspectRatio=Math.max(0,e)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(e){var a=this.options,t=this.dragBox,h=this.face;if(this.ready&&!this.disabled){var o=e===se,l=a.movable&&e===de;e=o||l?e:Ne,a.dragMode=e,Ze(t,K,e),Ye(t,te,o),Ye(t,ee,l),a.cropBoxMovable||(Ze(h,K,e),Ye(h,te,o),Ye(h,ee,l))}return this}},Ur=w.Cropper,ua=function(){function i(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(d(this,i),!e||!Ar.test(e.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=e,this.options=he({},ia,We(a)&&a),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return D(i,[{key:"init",value:function(){var a=this.element,t=a.tagName.toLowerCase(),h;if(!a[y]){if(a[y]=this,t==="img"){if(this.isImg=!0,h=a.getAttribute("src")||"",this.originalUrl=h,!h)return;h=a.src}else t==="canvas"&&window.HTMLCanvasElement&&(h=a.toDataURL());this.load(h)}}},{key:"load",value:function(a){var t=this;if(a){this.url=a,this.imageData={};var h=this.element,o=this.options;if(!o.rotatable&&!o.scalable&&(o.checkOrientation=!1),!o.checkOrientation||!window.ArrayBuffer){this.clone();return}if(ur.test(a)){pr.test(a)?this.read(Sr(a)):this.clone();return}var l=new XMLHttpRequest,E=this.clone.bind(this);this.reloading=!0,this.xhr=l,l.onabort=E,l.onerror=E,l.ontimeout=E,l.onprogress=function(){l.getResponseHeader("content-type")!==ta&&l.abort()},l.onload=function(){t.read(l.response)},l.onloadend=function(){t.reloading=!1,t.xhr=null},o.checkCrossOrigin&&ha(a)&&h.crossOrigin&&(a=fa(a)),l.open("GET",a,!0),l.responseType="arraybuffer",l.withCredentials=h.crossOrigin==="use-credentials",l.send()}}},{key:"read",value:function(a){var t=this.options,h=this.imageData,o=Qr(a),l=0,E=1,k=1;if(o>1){this.url=Tr(a,ta);var F=Or(o);l=F.rotate,E=F.scaleX,k=F.scaleY}t.rotatable&&(h.rotate=l),t.scalable&&(h.scaleX=E,h.scaleY=k),this.clone()}},{key:"clone",value:function(){var a=this.element,t=this.url,h=a.crossOrigin,o=t;this.options.checkCrossOrigin&&ha(t)&&(h||(h="anonymous"),o=fa(t)),this.crossOrigin=h,this.crossOriginUrl=o;var l=document.createElement("img");h&&(l.crossOrigin=h),l.src=o||t,l.alt=a.alt||"The image to crop",this.image=l,l.onload=this.start.bind(this),l.onerror=this.stop.bind(this),me(l,T),a.parentNode.insertBefore(l,a.nextSibling)}},{key:"start",value:function(){var a=this,t=this.image;t.onload=null,t.onerror=null,this.sizing=!0;var h=w.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(w.navigator.userAgent),o=function(F,_){he(a.imageData,{naturalWidth:F,naturalHeight:_,aspectRatio:F/_}),a.initialImageData=he({},a.imageData),a.sizing=!1,a.sized=!0,a.build()};if(t.naturalWidth&&!h){o(t.naturalWidth,t.naturalHeight);return}var l=document.createElement("img"),E=document.body||document.documentElement;this.sizingImage=l,l.onload=function(){o(l.width,l.height),h||E.removeChild(l)},l.src=t.src,h||(l.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",E.appendChild(l))}},{key:"stop",value:function(){var a=this.image;a.onload=null,a.onerror=null,a.parentNode.removeChild(a),this.image=null}},{key:"build",value:function(){if(!(!this.sized||this.ready)){var a=this.element,t=this.options,h=this.image,o=a.parentNode,l=document.createElement("div");l.innerHTML=gr;var E=l.querySelector(".".concat(y,"-container")),k=E.querySelector(".".concat(y,"-canvas")),F=E.querySelector(".".concat(y,"-drag-box")),_=E.querySelector(".".concat(y,"-crop-box")),B=_.querySelector(".".concat(y,"-face"));this.container=o,this.cropper=E,this.canvas=k,this.dragBox=F,this.cropBox=_,this.viewBox=E.querySelector(".".concat(y,"-view-box")),this.face=B,k.appendChild(h),me(a,S),o.insertBefore(E,a.nextSibling),Be(h,T),this.initPreview(),this.bind(),t.initialAspectRatio=Math.max(0,t.initialAspectRatio)||NaN,t.aspectRatio=Math.max(0,t.aspectRatio)||NaN,t.viewMode=Math.max(0,Math.min(3,Math.round(t.viewMode)))||0,me(_,S),t.guides||me(_.getElementsByClassName("".concat(y,"-dashed")),S),t.center||me(_.getElementsByClassName("".concat(y,"-center")),S),t.background&&me(E,"".concat(y,"-bg")),t.highlight||me(B,G),t.cropBoxMovable&&(me(B,ee),Ze(B,K,L)),t.cropBoxResizable||(me(_.getElementsByClassName("".concat(y,"-line")),S),me(_.getElementsByClassName("".concat(y,"-point")),S)),this.render(),this.ready=!0,this.setDragMode(t.dragMode),t.autoCrop&&this.crop(),this.setData(t.data),xe(t.ready)&&Ie(a,Zt,t.ready,{once:!0}),Ve(a,Zt)}}},{key:"unbuild",value:function(){if(this.ready){this.ready=!1,this.unbind(),this.resetPreview();var a=this.cropper.parentNode;a&&a.removeChild(this.cropper),Be(this.element,S)}}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=Ur,i}},{key:"setDefaults",value:function(a){he(ia,We(a)&&a)}}]),i}();return he(ua.prototype,Pr,kr,Lr,Nr,Gr,$r),ua})});var Ja=Dt((Za,Ht)=>{(function(r){if(typeof Za=="object"&&typeof Ht!="undefined")Ht.exports=r();else if(typeof define=="function"&&define.amd)define([],r);else{var n;typeof window!="undefined"?n=window:typeof global!="undefined"?n=global:typeof self!="undefined"?n=self:n=this,n.pica=r()}})(function(){var r,n,x;return function(){function d(p,D,v){function A(c,m){if(!D[c]){if(!p[c]){var f=typeof et=="function"&&et;if(!m&&f)return f(c,!0);if(s)return s(c,!0);var g=new Error("Cannot find module '"+c+"'");throw g.code="MODULE_NOT_FOUND",g}var Q=D[c]={exports:{}};p[c][0].call(Q.exports,function(I){var w=p[c][1][I];return A(w||I)},Q,Q.exports,d,p,D,v)}return D[c].exports}for(var s=typeof et=="function"&&et,u=0;u<v.length;u++)A(v[u]);return A}return d}()({1:[function(d,p,D){"use strict";var v=d("multimath"),A=d("./mm_unsharp_mask"),s=d("./mm_resize");function u(c){var m=c||[],f={js:m.indexOf("js")>=0,wasm:m.indexOf("wasm")>=0};v.call(this,f),this.features={js:f.js,wasm:f.wasm&&this.has_wasm()},this.use(A),this.use(s)}u.prototype=Object.create(v.prototype),u.prototype.constructor=u,u.prototype.resizeAndUnsharp=function(m,f){var g=this.resize(m,f);return m.unsharpAmount&&this.unsharp_mask(g,m.toWidth,m.toHeight,m.unsharpAmount,m.unsharpRadius,m.unsharpThreshold),g},p.exports=u},{"./mm_resize":4,"./mm_unsharp_mask":9,multimath:19}],2:[function(d,p,D){"use strict";function v(f){return f<0?0:f>255?255:f}function A(f){return f>=0?f:0}function s(f,g,Q,I,w,b){var R,y,L,U,z,W,V,H,j,Y,X,J=0,q=0;for(j=0;j<I;j++){for(z=0,Y=0;Y<w;Y++){for(W=b[z++],V=b[z++],H=J+W*4|0,R=y=L=U=0;V>0;V--)X=b[z++],U=U+X*f[H+3]|0,L=L+X*f[H+2]|0,y=y+X*f[H+1]|0,R=R+X*f[H]|0,H=H+4|0;g[q+3]=A(U>>7),g[q+2]=A(L>>7),g[q+1]=A(y>>7),g[q]=A(R>>7),q=q+I*4|0}q=(j+1)*4|0,J=(j+1)*Q*4|0}}function u(f,g,Q,I,w,b){var R,y,L,U,z,W,V,H,j,Y,X,J=0,q=0;for(j=0;j<I;j++){for(z=0,Y=0;Y<w;Y++){for(W=b[z++],V=b[z++],H=J+W*4|0,R=y=L=U=0;V>0;V--)X=b[z++],U=U+X*f[H+3]|0,L=L+X*f[H+2]|0,y=y+X*f[H+1]|0,R=R+X*f[H]|0,H=H+4|0;R>>=7,y>>=7,L>>=7,U>>=7,g[q+3]=v(U+8192>>14),g[q+2]=v(L+8192>>14),g[q+1]=v(y+8192>>14),g[q]=v(R+8192>>14),q=q+I*4|0}q=(j+1)*4|0,J=(j+1)*Q*4|0}}function c(f,g,Q,I,w,b){var R,y,L,U,z,W,V,H,j,Y,X,J,q=0,oe=0;for(Y=0;Y<I;Y++){for(W=0,X=0;X<w;X++){for(V=b[W++],H=b[W++],j=q+V*4|0,R=y=L=U=0;H>0;H--)J=b[W++],z=f[j+3],U=U+J*z|0,L=L+J*f[j+2]*z|0,y=y+J*f[j+1]*z|0,R=R+J*f[j]*z|0,j=j+4|0;L=L/255|0,y=y/255|0,R=R/255|0,g[oe+3]=A(U>>7),g[oe+2]=A(L>>7),g[oe+1]=A(y>>7),g[oe]=A(R>>7),oe=oe+I*4|0}oe=(Y+1)*4|0,q=(Y+1)*Q*4|0}}function m(f,g,Q,I,w,b){var R,y,L,U,z,W,V,H,j,Y,X,J=0,q=0;for(j=0;j<I;j++){for(z=0,Y=0;Y<w;Y++){for(W=b[z++],V=b[z++],H=J+W*4|0,R=y=L=U=0;V>0;V--)X=b[z++],U=U+X*f[H+3]|0,L=L+X*f[H+2]|0,y=y+X*f[H+1]|0,R=R+X*f[H]|0,H=H+4|0;R>>=7,y>>=7,L>>=7,U>>=7,U=v(U+8192>>14),U>0&&(R=R*255/U|0,y=y*255/U|0,L=L*255/U|0),g[q+3]=U,g[q+2]=v(L+8192>>14),g[q+1]=v(y+8192>>14),g[q]=v(R+8192>>14),q=q+I*4|0}q=(j+1)*4|0,J=(j+1)*Q*4|0}}p.exports={convolveHor:s,convolveVert:u,convolveHorWithPre:c,convolveVertWithPre:m}},{}],3:[function(d,p,D){"use strict";p.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL"},{}],4:[function(d,p,D){"use strict";p.exports={name:"resize",fn:d("./resize"),wasm_fn:d("./resize_wasm"),wasm_src:d("./convolve_wasm_base64")}},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(d,p,D){"use strict";var v=d("./resize_filter_gen"),A=d("./convolve"),s=A.convolveHor,u=A.convolveVert,c=A.convolveHorWithPre,m=A.convolveVertWithPre;function f(Q,I,w){for(var b=3,R=I*w*4|0;b<R;){if(Q[b]!==255)return!0;b=b+4|0}return!1}function g(Q,I,w){for(var b=3,R=I*w*4|0;b<R;)Q[b]=255,b=b+4|0}p.exports=function(I){var w=I.src,b=I.width,R=I.height,y=I.toWidth,L=I.toHeight,U=I.scaleX||I.toWidth/I.width,z=I.scaleY||I.toHeight/I.height,W=I.offsetX||0,V=I.offsetY||0,H=I.dest||new Uint8Array(y*L*4),j=typeof I.filter=="undefined"?"mks2013":I.filter,Y=v(j,b,y,U,W),X=v(j,R,L,z,V),J=new Uint16Array(y*R*4);return f(w,b,R)?(c(w,J,b,R,y,Y),m(J,H,R,y,L,X)):(s(w,J,b,R,y,Y),u(J,H,R,y,L,X),g(H,y,L)),H}},{"./convolve":2,"./resize_filter_gen":6}],6:[function(d,p,D){"use strict";var v=d("./resize_filter_info"),A=14;function s(u){return Math.round(u*((1<<A)-1))}p.exports=function(c,m,f,g,Q){var I=v.filter[c].fn,w=1/g,b=Math.min(1,g),R=v.filter[c].win/b,y,L,U,z,W,V,H,j,Y,X,J,q,oe,te,C,S,T,G=Math.floor((R+1)*2),P=new Int16Array((G+2)*f),ee=0,K=!P.subarray||!P.set;for(y=0;y<f;y++){for(L=(y+.5)*w+Q,U=Math.max(0,Math.floor(L-R)),z=Math.min(m-1,Math.ceil(L+R)),W=z-U+1,V=new Float32Array(W),H=new Int16Array(W),j=0,Y=U,X=0;Y<=z;Y++,X++)J=I((Y+.5-L)*b),j+=J,V[X]=J;for(q=0,X=0;X<V.length;X++)oe=V[X]/j,q+=oe,H[X]=s(oe);for(H[f>>1]+=s(1-q),te=0;te<H.length&&H[te]===0;)te++;if(te<H.length){for(C=H.length-1;C>0&&H[C]===0;)C--;if(S=U+te,T=C-te+1,P[ee++]=S,P[ee++]=T,!K)P.set(H.subarray(te,C+1),ee),ee+=T;else for(X=te;X<=C;X++)P[ee++]=H[X]}else P[ee++]=0,P[ee++]=0}return P}},{"./resize_filter_info":7}],7:[function(d,p,D){"use strict";var v={box:{win:.5,fn:function(s){return s<0&&(s=-s),s<.5?1:0}},hamming:{win:1,fn:function(s){if(s<0&&(s=-s),s>=1)return 0;if(s<11920929e-14)return 1;var u=s*Math.PI;return Math.sin(u)/u*(.54+.46*Math.cos(u/1))}},lanczos2:{win:2,fn:function(s){if(s<0&&(s=-s),s>=2)return 0;if(s<11920929e-14)return 1;var u=s*Math.PI;return Math.sin(u)/u*Math.sin(u/2)/(u/2)}},lanczos3:{win:3,fn:function(s){if(s<0&&(s=-s),s>=3)return 0;if(s<11920929e-14)return 1;var u=s*Math.PI;return Math.sin(u)/u*Math.sin(u/3)/(u/3)}},mks2013:{win:2.5,fn:function(s){return s<0&&(s=-s),s>=2.5?0:s>=1.5?-.125*(s-2.5)*(s-2.5):s>=.5?.25*(4*s*s-11*s+7):1.0625-1.75*s*s}}};p.exports={filter:v,f2q:{box:0,hamming:1,lanczos2:2,lanczos3:3},q2f:["box","hamming","lanczos2","lanczos3"]}},{}],8:[function(d,p,D){"use strict";var v=d("./resize_filter_gen");function A(f,g,Q){for(var I=3,w=g*Q*4|0;I<w;){if(f[I]!==255)return!0;I=I+4|0}return!1}function s(f,g,Q){for(var I=3,w=g*Q*4|0;I<w;)f[I]=255,I=I+4|0}function u(f){return new Uint8Array(f.buffer,0,f.byteLength)}var c=!0;try{c=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1}catch(f){}function m(f,g,Q){if(c){g.set(u(f),Q);return}for(var I=Q,w=0;w<f.length;w++){var b=f[w];g[I++]=b&255,g[I++]=b>>8&255}}p.exports=function(g){var Q=g.src,I=g.width,w=g.height,b=g.toWidth,R=g.toHeight,y=g.scaleX||g.toWidth/g.width,L=g.scaleY||g.toHeight/g.height,U=g.offsetX||0,z=g.offsetY||0,W=g.dest||new Uint8Array(b*R*4),V=typeof g.filter=="undefined"?"mks2013":g.filter,H=v(V,I,b,y,U),j=v(V,w,R,L,z),Y=0,X=Math.max(Q.byteLength,W.byteLength),J=this.__align(Y+X),q=w*b*4*2,oe=this.__align(J+q),te=this.__align(oe+H.byteLength),C=te+j.byteLength,S=this.__instance("resize",C),T=new Uint8Array(this.__memory.buffer),G=new Uint32Array(this.__memory.buffer),P=new Uint32Array(Q.buffer);G.set(P),m(H,T,oe),m(j,T,te);var ee=S.exports.convolveHV||S.exports._convolveHV;A(Q,I,w)?ee(oe,te,J,I,w,b,R,1):(ee(oe,te,J,I,w,b,R,0),s(W,b,R));var K=new Uint32Array(W.buffer);return K.set(new Uint32Array(this.__memory.buffer,0,R*b)),W}},{"./resize_filter_gen":6}],9:[function(d,p,D){"use strict";p.exports={name:"unsharp_mask",fn:d("./unsharp_mask"),wasm_fn:d("./unsharp_mask_wasm"),wasm_src:d("./unsharp_mask_wasm_base64")}},{"./unsharp_mask":10,"./unsharp_mask_wasm":11,"./unsharp_mask_wasm_base64":12}],10:[function(d,p,D){"use strict";var v=d("glur/mono16");function A(s,u,c){for(var m=u*c,f=new Uint16Array(m),g,Q,I,w,b=0;b<m;b++)g=s[4*b],Q=s[4*b+1],I=s[4*b+2],w=g>=Q&&g>=I?g:Q>=I&&Q>=g?Q:I,f[b]=w<<8;return f}p.exports=function(u,c,m,f,g,Q){var I,w,b,R,y;if(!(f===0||g<.5)){g>2&&(g=2);var L=A(u,c,m),U=new Uint16Array(L);v(U,c,m,g);for(var z=f/100*4096+.5|0,W=Q<<8,V=c*m,H=0;H<V;H++)I=L[H],R=I-U[H],Math.abs(R)>=W&&(w=I+(z*R+2048>>12),w=w>65280?65280:w,w=w<0?0:w,I=I!==0?I:1,b=(w<<12)/I|0,y=H*4,u[y]=u[y]*b+2048>>12,u[y+1]=u[y+1]*b+2048>>12,u[y+2]=u[y+2]*b+2048>>12)}}},{"glur/mono16":18}],11:[function(d,p,D){"use strict";p.exports=function(A,s,u,c,m,f){if(!(c===0||m<.5)){m>2&&(m=2);var g=s*u,Q=g*4,I=g*2,w=g*2,b=Math.max(s,u)*4,R=8*4,y=0,L=Q,U=L+I,z=U+w,W=z+w,V=W+b,H=this.__instance("unsharp_mask",Q+I+w*2+b+R,{exp:Math.exp}),j=new Uint32Array(A.buffer),Y=new Uint32Array(this.__memory.buffer);Y.set(j);var X=H.exports.hsv_v16||H.exports._hsv_v16;X(y,L,s,u),X=H.exports.blurMono16||H.exports._blurMono16,X(L,U,z,W,V,s,u,m),X=H.exports.unsharp||H.exports._unsharp,X(y,y,L,U,s,u,c,f),j.set(new Uint32Array(this.__memory.buffer,0,g))}}},{}],12:[function(d,p,D){"use strict";p.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"},{}],13:[function(d,p,D){"use strict";var v=100;function A(s,u){this.create=s,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=u||2e3}A.prototype.acquire=function(){var s=this,u;return this.available.length!==0?u=this.available.pop():(u=this.create(),u.id=this.lastId++,u.release=function(){return s.release(u)}),this.acquired[u.id]=u,u},A.prototype.release=function(s){var u=this;delete this.acquired[s.id],s.lastUsed=Date.now(),this.available.push(s),this.timeoutId===0&&(this.timeoutId=setTimeout(function(){return u.gc()},v))},A.prototype.gc=function(){var s=this,u=Date.now();this.available=this.available.filter(function(c){return u-c.lastUsed>s.idle?(c.destroy(),!1):!0}),this.available.length!==0?this.timeoutId=setTimeout(function(){return s.gc()},v):this.timeoutId=0},p.exports=A},{}],14:[function(d,p,D){"use strict";var v=2;p.exports=function(s,u,c,m,f,g){var Q=c/s,I=m/u,w=(2*g+v+1)/f;if(w>.5)return[[c,m]];var b=Math.ceil(Math.log(Math.min(Q,I))/Math.log(w));if(b<=1)return[[c,m]];for(var R=[],y=0;y<b;y++){var L=Math.round(Math.pow(Math.pow(s,b-y-1)*Math.pow(c,y+1),1/b)),U=Math.round(Math.pow(Math.pow(u,b-y-1)*Math.pow(m,y+1),1/b));R.push([L,U])}return R}},{}],15:[function(d,p,D){"use strict";var v=1e-5;function A(u){var c=Math.round(u);return Math.abs(u-c)<v?c:Math.floor(u)}function s(u){var c=Math.round(u);return Math.abs(u-c)<v?c:Math.ceil(u)}p.exports=function(c){var m=c.toWidth/c.width,f=c.toHeight/c.height,g=A(c.srcTileSize*m)-2*c.destTileBorder,Q=A(c.srcTileSize*f)-2*c.destTileBorder;if(g<1||Q<1)throw new Error("Internal error in pica: target tile width/height is too small.");var I,w,b,R,y,L,U=[],z;for(R=0;R<c.toHeight;R+=Q)for(b=0;b<c.toWidth;b+=g)I=b-c.destTileBorder,I<0&&(I=0),y=b+g+c.destTileBorder-I,I+y>=c.toWidth&&(y=c.toWidth-I),w=R-c.destTileBorder,w<0&&(w=0),L=R+Q+c.destTileBorder-w,w+L>=c.toHeight&&(L=c.toHeight-w),z={toX:I,toY:w,toWidth:y,toHeight:L,toInnerX:b,toInnerY:R,toInnerWidth:g,toInnerHeight:Q,offsetX:I/m-A(I/m),offsetY:w/f-A(w/f),scaleX:m,scaleY:f,x:A(I/m),y:A(w/f),width:s(y/m),height:s(L/f)},U.push(z);return U}},{}],16:[function(d,p,D){"use strict";function v(A){return Object.prototype.toString.call(A)}p.exports.isCanvas=function(s){var u=v(s);return u==="[object HTMLCanvasElement]"||u==="[object OffscreenCanvas]"||u==="[object Canvas]"},p.exports.isImage=function(s){return v(s)==="[object HTMLImageElement]"},p.exports.isImageBitmap=function(s){return v(s)==="[object ImageBitmap]"},p.exports.limiter=function(s){var u=0,c=[];function m(){u<s&&c.length&&(u++,c.shift()())}return function(g){return new Promise(function(Q,I){c.push(function(){g().then(function(w){Q(w),u--,m()},function(w){I(w),u--,m()})}),m()})}},p.exports.cib_quality_name=function(s){switch(s){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"},p.exports.cib_support=function(s){return Promise.resolve().then(function(){if(typeof createImageBitmap=="undefined")return!1;var u=s(100,100);return createImageBitmap(u,0,0,100,100,{resizeWidth:10,resizeHeight:10,resizeQuality:"high"}).then(function(c){var m=c.width===10;return c.close(),u=null,m})}).catch(function(){return!1})},p.exports.worker_offscreen_canvas_support=function(){return new Promise(function(s,u){if(typeof OffscreenCanvas=="undefined"){s(!1);return}function c(g){if(typeof createImageBitmap=="undefined"){g.postMessage(!1);return}Promise.resolve().then(function(){var Q=new OffscreenCanvas(10,10),I=Q.getContext("2d");return I.rect(0,0,1,1),createImageBitmap(Q,0,0,1,1)}).then(function(){return g.postMessage(!0)},function(){return g.postMessage(!1)})}var m=btoa("(".concat(c.toString(),")(self);")),f=new Worker("data:text/javascript;base64,".concat(m));f.onmessage=function(g){return s(g.data)},f.onerror=u}).then(function(s){return s},function(){return!1})},p.exports.can_use_canvas=function(s){var u=!1;try{var c=s(2,1),m=c.getContext("2d"),f=m.createImageData(2,1);f.data[0]=12,f.data[1]=23,f.data[2]=34,f.data[3]=255,f.data[4]=45,f.data[5]=56,f.data[6]=67,f.data[7]=255,m.putImageData(f,0,0),f=null,f=m.getImageData(0,0,2,1),f.data[0]===12&&f.data[1]===23&&f.data[2]===34&&f.data[3]===255&&f.data[4]===45&&f.data[5]===56&&f.data[6]===67&&f.data[7]===255&&(u=!0)}catch(g){}return u},p.exports.cib_can_use_region=function(){return new Promise(function(s){if(typeof Image=="undefined"||typeof createImageBitmap=="undefined"){s(!1);return}var u=new Image;u.src="data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z",u.onload=function(){createImageBitmap(u,0,0,u.width,u.height).then(function(c){c.width===u.width&&c.height===u.height?s(!0):s(!1)},function(){return s(!1)})},u.onerror=function(){return s(!1)}})}},{}],17:[function(d,p,D){"use strict";p.exports=function(){var v=d("./mathlib"),A;onmessage=function(u){var c=u.data.opts,m=!1;if(!c.src&&c.srcBitmap){var f=new OffscreenCanvas(c.width,c.height),g=f.getContext("2d");g.drawImage(c.srcBitmap,0,0),c.src=g.getImageData(0,0,c.width,c.height).data,f.width=f.height=0,f=null,c.srcBitmap.close(),c.srcBitmap=null}A||(A=new v(u.data.features));var Q=A.resizeAndUnsharp(c);if(m){var I=new ImageData(new Uint8ClampedArray(Q),c.toWidth,c.toHeight),w=new OffscreenCanvas(c.toWidth,c.toHeight),b=w.getContext("2d");b.putImageData(I,0,0),createImageBitmap(w).then(function(R){postMessage({bitmap:R},[R])})}else postMessage({data:Q},[Q.buffer])}}},{"./mathlib":1}],18:[function(d,p,D){var v,A,s,u,c,m,f,g;function Q(b){b<.5&&(b=.5);var R=Math.exp(.726*.726)/b,y=Math.exp(-R),L=Math.exp(-2*R),U=(1-y)*(1-y)/(1+2*R*y-L);return v=U,A=U*(R-1)*y,s=U*(R+1)*y,u=-U*L,c=2*y,m=-L,f=(v+A)/(1-c-m),g=(s+u)/(1-c-m),new Float32Array([v,A,s,u,c,m,f,g])}function I(b,R,y,L,U,z){var W,V,H,j,Y,X,J,q,oe,te,C,S,T,G;for(oe=0;oe<z;oe++){for(X=oe*U,J=oe,q=0,W=b[X],Y=W*L[6],j=Y,C=L[0],S=L[1],T=L[4],G=L[5],te=0;te<U;te++)V=b[X],H=V*C+W*S+j*T+Y*G,Y=j,j=H,W=V,y[q]=j,q++,X++;for(X--,q--,J+=z*(U-1),W=b[X],Y=W*L[7],j=Y,V=W,C=L[2],S=L[3],te=U-1;te>=0;te--)H=V*C+W*S+j*T+Y*G,Y=j,j=H,W=V,V=b[X],R[J]=y[q]+j,X--,q--,J-=z}}function w(b,R,y,L){if(L){var U=new Uint16Array(b.length),z=new Float32Array(Math.max(R,y)),W=Q(L);I(b,U,z,W,R,y,L),I(U,b,z,W,y,R,L)}}p.exports=w},{}],19:[function(d,p,D){"use strict";var v=d("object-assign"),A=d("./lib/base64decode"),s=d("./lib/wa_detect"),u={js:!0,wasm:!0};function c(m){if(!(this instanceof c))return new c(m);var f=v({},u,m||{});if(this.options=f,this.__cache={},this.__init_promise=null,this.__modules=f.modules||{},this.__memory=null,this.__wasm={},this.__isLE=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1,!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}c.prototype.has_wasm=s,c.prototype.use=function(m){return this.__modules[m.name]=m,this.options.wasm&&this.has_wasm()&&m.wasm_fn?this[m.name]=m.wasm_fn:this[m.name]=m.fn,this},c.prototype.init=function(){if(this.__init_promise)return this.__init_promise;if(!this.options.js&&this.options.wasm&&!this.has_wasm())return Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`));var m=this;return this.__init_promise=Promise.all(Object.keys(m.__modules).map(function(f){var g=m.__modules[f];return!m.options.wasm||!m.has_wasm()||!g.wasm_fn||m.__wasm[f]?null:WebAssembly.compile(m.__base64decode(g.wasm_src)).then(function(Q){m.__wasm[f]=Q})})).then(function(){return m}),this.__init_promise},c.prototype.__base64decode=A,c.prototype.__reallocate=function(f){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(f/(64*1024))}),this.__memory;var g=this.__memory.buffer.byteLength;return g<f&&this.__memory.grow(Math.ceil((f-g)/(64*1024))),this.__memory},c.prototype.__instance=function(f,g,Q){if(g&&this.__reallocate(g),!this.__wasm[f]){var I=this.__modules[f];this.__wasm[f]=new WebAssembly.Module(this.__base64decode(I.wasm_src))}if(!this.__cache[f]){var w={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[f]=new WebAssembly.Instance(this.__wasm[f],{env:v(w,Q||{})})}return this.__cache[f]},c.prototype.__align=function(f,g){g=g||8;var Q=f%g;return f+(Q?g-Q:0)},p.exports=c},{"./lib/base64decode":20,"./lib/wa_detect":21,"object-assign":22}],20:[function(d,p,D){"use strict";var v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";p.exports=function(s){for(var u=s.replace(/[\r\n=]/g,""),c=u.length,m=new Uint8Array(c*3>>2),f=0,g=0,Q=0;Q<c;Q++)Q%4===0&&Q&&(m[g++]=f>>16&255,m[g++]=f>>8&255,m[g++]=f&255),f=f<<6|v.indexOf(u.charAt(Q));var I=c%4*6;return I===0?(m[g++]=f>>16&255,m[g++]=f>>8&255,m[g++]=f&255):I===18?(m[g++]=f>>10&255,m[g++]=f>>2&255):I===12&&(m[g++]=f>>4&255),m}},{}],21:[function(d,p,D){"use strict";var v;p.exports=function(){if(typeof v!="undefined"||(v=!1,typeof WebAssembly=="undefined"))return v;try{var s=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),u=new WebAssembly.Module(s),c=new WebAssembly.Instance(u,{});return c.exports.test(4)!==0&&(v=!0),v}catch(m){}return v}},{}],22:[function(d,p,D){"use strict";var v=Object.getOwnPropertySymbols,A=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;function u(m){if(m==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(m)}function c(){try{if(!Object.assign)return!1;var m=new String("abc");if(m[5]="de",Object.getOwnPropertyNames(m)[0]==="5")return!1;for(var f={},g=0;g<10;g++)f["_"+String.fromCharCode(g)]=g;var Q=Object.getOwnPropertyNames(f).map(function(w){return f[w]});if(Q.join("")!=="0123456789")return!1;var I={};return"abcdefghijklmnopqrst".split("").forEach(function(w){I[w]=w}),Object.keys(Object.assign({},I)).join("")==="abcdefghijklmnopqrst"}catch(w){return!1}}p.exports=c()?Object.assign:function(m,f){for(var g,Q=u(m),I,w=1;w<arguments.length;w++){g=Object(arguments[w]);for(var b in g)A.call(g,b)&&(Q[b]=g[b]);if(v){I=v(g);for(var R=0;R<I.length;R++)s.call(g,I[R])&&(Q[I[R]]=g[I[R]])}}return Q}},{}],23:[function(d,p,D){var v=arguments[3],A=arguments[4],s=arguments[5],u=JSON.stringify;p.exports=function(c,m){for(var f,g=Object.keys(s),Q=0,I=g.length;Q<I;Q++){var w=g[Q],b=s[w].exports;if(b===c||b&&b.default===c){f=w;break}}if(!f){f=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var R={},Q=0,I=g.length;Q<I;Q++){var w=g[Q];R[w]=w}A[f]=["function(require,module,exports){"+c+"(self); }",R]}var y=Math.floor(Math.pow(16,8)*Math.random()).toString(16),L={};L[f]=f,A[y]=["function(require,module,exports){var f = require("+u(f)+");(f.default ? f.default : f)(self);}",L];var U={};z(y);function z(X){U[X]=!0;for(var J in A[X][1]){var q=A[X][1][J];U[q]||z(q)}}var W="("+v+")({"+Object.keys(U).map(function(X){return u(X)+":["+A[X][0]+","+u(A[X][1])+"]"}).join(",")+"},{},["+u(y)+"])",V=window.URL||window.webkitURL||window.mozURL||window.msURL,H=new Blob([W],{type:"text/javascript"});if(m&&m.bare)return H;var j=V.createObjectURL(H),Y=new Worker(j);return Y.objectURL=j,Y}},{}],"/index.js":[function(d,p,D){"use strict";function v(C,S){return m(C)||c(C,S)||s(C,S)||A()}function A(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function s(C,S){if(C){if(typeof C=="string")return u(C,S);var T=Object.prototype.toString.call(C).slice(8,-1);if(T==="Object"&&C.constructor&&(T=C.constructor.name),T==="Map"||T==="Set")return Array.from(C);if(T==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(T))return u(C,S)}}function u(C,S){(S==null||S>C.length)&&(S=C.length);for(var T=0,G=new Array(S);T<S;T++)G[T]=C[T];return G}function c(C,S){var T=C==null?null:typeof Symbol!="undefined"&&C[Symbol.iterator]||C["@@iterator"];if(T!=null){var G=[],P=!0,ee=!1,K,Z;try{for(T=T.call(C);!(P=(K=T.next()).done)&&(G.push(K.value),!(S&&G.length===S));P=!0);}catch(se){ee=!0,Z=se}finally{try{!P&&T.return!=null&&T.return()}finally{if(ee)throw Z}}return G}}function m(C){if(Array.isArray(C))return C}var f=d("object-assign"),g=d("webworkify"),Q=d("./lib/mathlib"),I=d("./lib/pool"),w=d("./lib/utils"),b=d("./lib/worker"),R=d("./lib/stepper"),y=d("./lib/tiler"),L=d("./lib/mm_resize/resize_filter_info"),U={},z=!1;try{typeof navigator!="undefined"&&navigator.userAgent&&(z=navigator.userAgent.indexOf("Safari")>=0)}catch(C){}var W=1;typeof navigator!="undefined"&&(W=Math.min(navigator.hardwareConcurrency||1,4));var V={tile:1024,concurrency:W,features:["js","wasm","ww"],idle:2e3,createCanvas:function(S,T){var G=document.createElement("canvas");return G.width=S,G.height=T,G}},H={filter:"mks2013",unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},j=!1,Y=!1,X=!1,J=!1,q=!1;function oe(){return{value:g(b),destroy:function(){if(this.value.terminate(),typeof window!="undefined"){var S=window.URL||window.webkitURL||window.mozURL||window.msURL;S&&S.revokeObjectURL&&this.value.objectURL&&S.revokeObjectURL(this.value.objectURL)}}}}function te(C){if(!(this instanceof te))return new te(C);this.options=f({},V,C||{});var S="lk_".concat(this.options.concurrency);this.__limit=U[S]||w.limiter(this.options.concurrency),U[S]||(U[S]=this.__limit),this.features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.__requested_features=[],this.__mathlib=null}te.prototype.init=function(){var C=this;if(this.__initPromise)return this.__initPromise;if(typeof ImageData!="undefined"&&typeof Uint8ClampedArray!="undefined")try{new ImageData(new Uint8ClampedArray(400),10,10),j=!0}catch(se){}typeof ImageBitmap!="undefined"&&(ImageBitmap.prototype&&ImageBitmap.prototype.close?Y=!0:this.debug("ImageBitmap does not support .close(), disabled"));var S=this.options.features.slice();if(S.indexOf("all")>=0&&(S=["cib","wasm","js","ww"]),this.__requested_features=S,this.__mathlib=new Q(S),S.indexOf("ww")>=0&&typeof window!="undefined"&&"Worker"in window)try{var T=d("webworkify")(function(){});T.terminate(),this.features.ww=!0;var G="wp_".concat(JSON.stringify(this.options));U[G]?this.__workersPool=U[G]:(this.__workersPool=new I(oe,this.options.idle),U[G]=this.__workersPool)}catch(se){}var P=this.__mathlib.init().then(function(se){f(C.features,se.features)}),ee;Y?ee=w.cib_support(this.options.createCanvas).then(function(se){if(C.features.cib&&S.indexOf("cib")<0){C.debug("createImageBitmap() resize supported, but disabled by config");return}S.indexOf("cib")>=0&&(C.features.cib=se)}):ee=Promise.resolve(!1),X=w.can_use_canvas(this.options.createCanvas);var K;Y&&j&&S.indexOf("ww")!==-1?K=w.worker_offscreen_canvas_support():K=Promise.resolve(!1),K=K.then(function(se){J=se});var Z=w.cib_can_use_region().then(function(se){q=se});return this.__initPromise=Promise.all([P,ee,K,Z]).then(function(){return C}),this.__initPromise},te.prototype.__invokeResize=function(C,S){var T=this;return S.__mathCache=S.__mathCache||{},Promise.resolve().then(function(){return T.features.ww?new Promise(function(G,P){var ee=T.__workersPool.acquire();S.cancelToken&&S.cancelToken.catch(function(Z){return P(Z)}),ee.value.onmessage=function(Z){ee.release(),Z.data.err?P(Z.data.err):G(Z.data)};var K=[];C.src&&K.push(C.src.buffer),C.srcBitmap&&K.push(C.srcBitmap),ee.value.postMessage({opts:C,features:T.__requested_features,preload:{wasm_nodule:T.__mathlib.__}},K)}):{data:T.__mathlib.resizeAndUnsharp(C,S.__mathCache)}})},te.prototype.__extractTileData=function(C,S,T,G,P){if(this.features.ww&&J&&(w.isCanvas(S)||q))return this.debug("Create tile for OffscreenCanvas"),createImageBitmap(G.srcImageBitmap||S,C.x,C.y,C.width,C.height).then(function(Z){return P.srcBitmap=Z,P});if(w.isCanvas(S))return G.srcCtx||(G.srcCtx=S.getContext("2d")),this.debug("Get tile pixel data"),P.src=G.srcCtx.getImageData(C.x,C.y,C.width,C.height).data,P;this.debug("Draw tile imageBitmap/image to temporary canvas");var ee=this.options.createCanvas(C.width,C.height),K=ee.getContext("2d");return K.globalCompositeOperation="copy",K.drawImage(G.srcImageBitmap||S,C.x,C.y,C.width,C.height,0,0,C.width,C.height),this.debug("Get tile pixel data"),P.src=K.getImageData(0,0,C.width,C.height).data,ee.width=ee.height=0,P},te.prototype.__landTileData=function(C,S,T){var G;if(this.debug("Convert raw rgba tile result to ImageData"),S.bitmap)return T.toCtx.drawImage(S.bitmap,C.toX,C.toY),null;if(j)G=new ImageData(new Uint8ClampedArray(S.data),C.toWidth,C.toHeight);else if(G=T.toCtx.createImageData(C.toWidth,C.toHeight),G.data.set)G.data.set(S.data);else for(var P=G.data.length-1;P>=0;P--)G.data[P]=S.data[P];return this.debug("Draw tile"),z?T.toCtx.putImageData(G,C.toX,C.toY,C.toInnerX-C.toX,C.toInnerY-C.toY,C.toInnerWidth+1e-5,C.toInnerHeight+1e-5):T.toCtx.putImageData(G,C.toX,C.toY,C.toInnerX-C.toX,C.toInnerY-C.toY,C.toInnerWidth,C.toInnerHeight),null},te.prototype.__tileAndResize=function(C,S,T){var G=this,P={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null},ee=function(Z){return G.__limit(function(){if(T.canceled)return T.cancelToken;var se={width:Z.width,height:Z.height,toWidth:Z.toWidth,toHeight:Z.toHeight,scaleX:Z.scaleX,scaleY:Z.scaleY,offsetX:Z.offsetX,offsetY:Z.offsetY,filter:T.filter,unsharpAmount:T.unsharpAmount,unsharpRadius:T.unsharpRadius,unsharpThreshold:T.unsharpThreshold};return G.debug("Invoke resize math"),Promise.resolve(se).then(function(de){return G.__extractTileData(Z,C,T,P,de)}).then(function(de){return G.debug("Invoke resize math"),G.__invokeResize(de,T)}).then(function(de){return T.canceled?T.cancelToken:(P.srcImageData=null,G.__landTileData(Z,de,P))})})};return Promise.resolve().then(function(){if(P.toCtx=S.getContext("2d"),w.isCanvas(C))return null;if(w.isImageBitmap(C))return P.srcImageBitmap=C,P.isImageBitmapReused=!0,null;if(w.isImage(C))return Y?(G.debug("Decode image via createImageBitmap"),createImageBitmap(C).then(function(K){P.srcImageBitmap=K}).catch(function(K){return null})):null;throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap')}).then(function(){if(T.canceled)return T.cancelToken;G.debug("Calculate tiles");var K=y({width:T.width,height:T.height,srcTileSize:G.options.tile,toWidth:T.toWidth,toHeight:T.toHeight,destTileBorder:T.__destTileBorder}),Z=K.map(function(de){return ee(de)});function se(de){de.srcImageBitmap&&(de.isImageBitmapReused||de.srcImageBitmap.close(),de.srcImageBitmap=null)}return G.debug("Process tiles"),Promise.all(Z).then(function(){return G.debug("Finished!"),se(P),S},function(de){throw se(P),de})})},te.prototype.__processStages=function(C,S,T,G){var P=this;if(G.canceled)return G.cancelToken;var ee=C.shift(),K=v(ee,2),Z=K[0],se=K[1],de=C.length===0,Ne;de||L.q2f.indexOf(G.filter)<0?Ne=G.filter:G.filter==="box"?Ne="box":Ne="hamming",G=f({},G,{toWidth:Z,toHeight:se,filter:Ne});var _e;return de||(_e=this.options.createCanvas(Z,se)),this.__tileAndResize(S,de?T:_e,G).then(function(){return de?T:(G.width=Z,G.height=se,P.__processStages(C,_e,T,G))}).then(function(Ke){return _e&&(_e.width=_e.height=0),Ke})},te.prototype.__resizeViaCreateImageBitmap=function(C,S,T){var G=this,P=S.getContext("2d");return this.debug("Resize via createImageBitmap()"),createImageBitmap(C,{resizeWidth:T.toWidth,resizeHeight:T.toHeight,resizeQuality:w.cib_quality_name(L.f2q[T.filter])}).then(function(ee){if(T.canceled)return T.cancelToken;if(!T.unsharpAmount)return P.drawImage(ee,0,0),ee.close(),P=null,G.debug("Finished!"),S;G.debug("Unsharp result");var K=G.options.createCanvas(T.toWidth,T.toHeight),Z=K.getContext("2d");Z.drawImage(ee,0,0),ee.close();var se=Z.getImageData(0,0,T.toWidth,T.toHeight);return G.__mathlib.unsharp_mask(se.data,T.toWidth,T.toHeight,T.unsharpAmount,T.unsharpRadius,T.unsharpThreshold),P.putImageData(se,0,0),K.width=K.height=0,se=Z=K=P=null,G.debug("Finished!"),S})},te.prototype.resize=function(C,S,T){var G=this;this.debug("Start resize...");var P=f({},H);if(isNaN(T)?T&&(P=f(P,T)):P=f(P,{quality:T}),P.toWidth=S.width,P.toHeight=S.height,P.width=C.naturalWidth||C.width,P.height=C.naturalHeight||C.height,Object.prototype.hasOwnProperty.call(P,"quality")){if(P.quality<0||P.quality>3)throw new Error("Pica: .quality should be [0..3], got ".concat(P.quality));P.filter=L.q2f[P.quality]}if(S.width===0||S.height===0)return Promise.reject(new Error("Invalid output size: ".concat(S.width,"x").concat(S.height)));P.unsharpRadius>2&&(P.unsharpRadius=2),P.canceled=!1,P.cancelToken&&(P.cancelToken=P.cancelToken.then(function(K){throw P.canceled=!0,K},function(K){throw P.canceled=!0,K}));var ee=3;return P.__destTileBorder=Math.ceil(Math.max(ee,2.5*P.unsharpRadius|0)),this.init().then(function(){if(P.canceled)return P.cancelToken;if(G.features.cib){if(L.q2f.indexOf(P.filter)>=0)return G.__resizeViaCreateImageBitmap(C,S,P);G.debug("cib is enabled, but not supports provided filter, fallback to manual math")}if(!X){var K=new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");throw K.code="ERR_GET_IMAGE_DATA",K}var Z=R(P.width,P.height,P.toWidth,P.toHeight,G.options.tile,P.__destTileBorder);return G.__processStages(Z,C,S,P)})},te.prototype.resizeBuffer=function(C){var S=this,T=f({},H,C);if(Object.prototype.hasOwnProperty.call(T,"quality")){if(T.quality<0||T.quality>3)throw new Error("Pica: .quality should be [0..3], got ".concat(T.quality));T.filter=L.q2f[T.quality]}return this.init().then(function(){return S.__mathlib.resizeAndUnsharp(T)})},te.prototype.toBlob=function(C,S,T){return S=S||"image/png",new Promise(function(G){if(C.toBlob){C.toBlob(function(se){return G(se)},S,T);return}if(C.convertToBlob){G(C.convertToBlob({type:S,quality:T}));return}for(var P=atob(C.toDataURL(S,T).split(",")[1]),ee=P.length,K=new Uint8Array(ee),Z=0;Z<ee;Z++)K[Z]=P.charCodeAt(Z);G(new Blob([K],{type:S}))})},te.prototype.debug=function(){},p.exports=te},{"./lib/mathlib":1,"./lib/mm_resize/resize_filter_info":7,"./lib/pool":13,"./lib/stepper":14,"./lib/tiler":15,"./lib/utils":16,"./lib/worker":17,"object-assign":22,webworkify:23}]},{},[])("/index.js")})});var er=Dt((Xt,jt)=>{(function(r,n){typeof define=="function"&&define.amd?define([],n):typeof Xt!="undefined"?n():(n(),r.FileSaver={})})(Xt,function(){"use strict";function r(A,s){return typeof s=="undefined"?s={autoBom:!1}:typeof s!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),s={autoBom:!s}),s.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(A.type)?new Blob(["\uFEFF",A],{type:A.type}):A}function n(A,s,u){var c=new XMLHttpRequest;c.open("GET",A),c.responseType="blob",c.onload=function(){v(c.response,s,u)},c.onerror=function(){console.error("could not download file")},c.send()}function x(A){var s=new XMLHttpRequest;s.open("HEAD",A,!1);try{s.send()}catch(u){}return 200<=s.status&&299>=s.status}function d(A){try{A.dispatchEvent(new MouseEvent("click"))}catch(u){var s=document.createEvent("MouseEvents");s.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),A.dispatchEvent(s)}}var p=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:void 0,D=p.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),v=p.saveAs||(typeof window!="object"||window!==p?function(){}:"download"in HTMLAnchorElement.prototype&&!D?function(A,s,u){var c=p.URL||p.webkitURL,m=document.createElement("a");s=s||A.name||"download",m.download=s,m.rel="noopener",typeof A=="string"?(m.href=A,m.origin===location.origin?d(m):x(m.href)?n(A,s,u):d(m,m.target="_blank")):(m.href=c.createObjectURL(A),setTimeout(function(){c.revokeObjectURL(m.href)},4e4),setTimeout(function(){d(m)},0))}:"msSaveOrOpenBlob"in navigator?function(A,s,u){if(s=s||A.name||"download",typeof A!="string")navigator.msSaveOrOpenBlob(r(A,u),s);else if(x(A))n(A,s,u);else{var c=document.createElement("a");c.href=A,c.target="_blank",setTimeout(function(){d(c)})}}:function(A,s,u,c){if(c=c||open("","_blank"),c&&(c.document.title=c.document.body.innerText="downloading..."),typeof A=="string")return n(A,s,u);var m=A.type==="application/octet-stream",f=/constructor/i.test(p.HTMLElement)||p.safari,g=/CriOS\/[\d]+/.test(navigator.userAgent);if((g||m&&f||D)&&typeof FileReader!="undefined"){var Q=new FileReader;Q.onloadend=function(){var b=Q.result;b=g?b:b.replace(/^data:[^;]*;/,"data:attachment/file;"),c?c.location.href=b:location=b,c=null},Q.readAsDataURL(A)}else{var I=p.URL||p.webkitURL,w=I.createObjectURL(A);c?c.location=w:location.href=w,c=null,setTimeout(function(){I.revokeObjectURL(w)},4e4)}});p.saveAs=v.saveAs=v,typeof jt!="undefined"&&(jt.exports=v)})});function M(r,n,x){return(r&255)<<0|(n&255)<<8|(x&255)<<16}var xa=[M(0,0,0),M(255,255,255)],In=[M(0,0,0),M(255,128,64),M(64,255,128),M(128,64,255),M(255,255,255)],En=[0,16777215,M(163,64,69),M(125,235,228),M(174,70,186),M(94,202,84),M(60,57,200),M(255,255,111),M(174,96,47),M(110,73,0),M(232,122,128),M(92,92,92),M(143,143,143),M(179,255,167),M(129,126,255),M(199,199,199)],Me=[M(0,0,0),M(255,255,255),M(129,51,56),M(117,206,200),M(142,60,151),M(86,172,77),M(46,44,155),M(237,241,113),M(142,80,41),M(85,56,0),M(196,108,113),M(74,74,74),M(123,123,123),M(169,255,159),M(112,109,235),M(178,178,178)],Rt=[M(0,0,0),M(255,255,255),M(120,41,34),M(135,214,221),M(170,95,182),M(85,160,73),M(64,49,141),M(191,206,114),M(170,116,73),M(234,180,137),M(184,105,98),M(199,255,255),M(234,159,246),M(148,224,137),M(128,113,204),M(255,255,178)],ba=[M(0,0,0),M(0,0,0),M(33,200,66),M(94,220,120),M(84,85,237),M(125,118,252),M(212,82,77),M(66,235,245),M(252,85,84),M(255,121,120),M(212,193,84),M(230,206,128),M(33,176,59),M(201,91,186),M(204,204,204),M(255,255,255)],ht=[5395026,11796480,10485760,11599933,7602281,91,95,6208,12048,543240,26368,1196544,7153664,0,0,0,12899815,16728064,14421538,16729963,14090399,6818519,6588,21681,27227,35843,43776,2918400,10777088,0,0,0,16316664,16755516,16742785,16735173,16730354,14633471,4681215,46327,57599,58229,259115,7911470,15065624,7895160,0,0,16777215,16773822,16300216,16300248,16758527,16761855,13095423,10148607,8973816,8650717,12122296,16119980,16777136,16308472,0,0],wa=[M(0,0,0),M(255,68,253),M(20,245,60),M(20,207,253),M(255,106,60),M(255,255,255)],Ft=[M(0,0,0),M(227,30,96),M(96,78,189),M(255,68,253),M(0,163,96),M(156,156,156),M(20,207,253),M(208,195,255),M(96,114,3),M(255,106,60),M(156,156,156),M(255,160,208),M(20,245,60),M(208,221,141),M(114,255,208),M(255,255,255)],Ca=[0,2368548,4737096,7171437,9539985,11974326,14342874,16777215,12255269,14680137,16716142,16725394,16734903,16744155,16753663,16762879,11534409,13959277,16318866,16721334,16730842,16740095,16749311,16758783,10420330,12779662,15138995,16718039,16727291,16736767,16745983,16755199,8847495,11206827,13631696,15994612,16724735,16733951,16743423,16752639,6946975,9306307,11731175,14092287,16461055,16732415,16741631,16751103,4784304,7143637,9568505,11929087,14297599,16731647,16741119,16750335,2425019,4784352,7209215,9570047,12004095,14372863,16741375,16750847,191,2359523,4718847,7146495,9515263,11949311,14318079,16752127,187,224,2294015,4658431,7092735,9461247,11895551,14264063,176,213,249,2367999,4736511,7105279,9539327,11908095,159,195,3303,209151,2577919,4946431,7380735,9749247,135,171,7888,17140,681983,3050495,5484543,7853311,106,3470,12723,22231,31483,1548031,3916799,6285311,73,8557,17810,27318,36570,373759,2742271,5176575,4389,13641,23150,32402,41911,51163,2026495,4456447,9472,18724,27976,37485,46737,56246,1834970,4194303,14080,23296,32803,42055,51564,60816,2031541,4456409,18176,27648,36864,46116,55624,392556,2752401,5177269,21760,30976,40192,49667,58919,1572683,3932016,6291348,24320,33536,43008,52224,716810,3079982,5504851,7864183,25856,35328,44544,250368,2619136,4980503,7405371,9764703,26624,35840,45312,2413824,4782336,7143173,9568041,11927374,26112,35584,2338560,4707328,7141376,9502464,11927326,14286659,24832,2393344,4762112,7196160,9564928,11992832,14352155,16711487,2447360,4815872,7250176,9618688,12052992,14417664,16776990,16777027,4803328,7172096,9606144,11974912,14343424,16776965,16777001,16777038,6962176,9330688,11764992,14133504,16502272,16773655,16777019,16777055,8858112,11226880,13660928,16029440,16759818,16769070,16777043,16777079,10426112,12794624,15163392,16745475,16754727,16764235,16773488,16777108,11534848,13969152,16337664,16740388,16749640,16759148,16768401,16777141,12255232,14684928,16725795,16735047,16744556,16753808,16763317,16772569],Oe=[0,0,4210752,4210752,7105644,7105644,9474192,9474192,11579568,11579568,13158600,13158600,14474460,14474460,16053492,16053492,17476,17476,1074276,1074276,2393220,2393220,3448992,3448992,4241592,4241592,5296336,5296336,6088936,6088936,6880508,6880508,10352,10352,1328260,1328260,2645144,2645144,3963052,3963052,5016764,5016764,6070476,6070476,6862044,6862044,7915756,7915756,6276,6276,1586328,1586328,3166380,3166380,4745408,4745408,6062288,6062288,7378144,7378144,8431852,8431852,9747708,9747708,136,136,2105500,2105500,3947696,3947696,5789888,5789888,7368912,7368912,8947936,8947936,10526956,10526956,11842812,11842812,6029432,6029432,7610508,7610508,8928416,8928416,10246320,10246320,11563200,11563200,12616912,12616912,13671644,13671644,14725356,14725356,7864392,7864392,9445472,9445472,10763384,10763384,12081292,12081292,13398176,13398176,14451892,14451892,15506628,15506628,16560340,16560340,8650772,8650772,9969712,9969712,11287628,11287628,12605544,12605544,13660284,13660284,14715028,14715028,15507624,15507624,16561340,16561340,8912896,8912896,10231836,10231836,11550776,11550776,12606544,12606544,13661288,13661288,14716028,14716028,15508624,15508624,16562340,16562340,8132608,8132608,9451548,9451548,11031608,11031608,12349520,12349520,13404264,13404264,14457980,14457980,15512720,15512720,16566436,16566436,6040576,6040576,7883804,7883804,9463864,9463864,11306064,11306064,12622952,12622952,13939836,13939836,15256720,15256720,16572580,16572580,2898944,2898944,4742172,4742172,6585400,6585400,8428624,8428624,9745512,9745512,11325564,11325564,12641424,12641424,13958308,13958308,15360,15360,2120736,2120736,4226112,4226112,6069340,6069340,7648372,7648372,9228428,9228428,10806436,10806436,12123320,12123320,14356,14356,1858612,1858612,3701840,3701840,5281900,5281900,6861956,6861956,8178844,8178844,9495732,9495732,10812616,10812616,12332,12332,1855564,1855564,3436648,3436648,5016708,5016708,6596764,6596764,7913652,7913652,8967372,8967372,10284256,10284256,10308,10308,1591396,1591396,3172484,3172484,4490400,4490400,5807288,5807288,7124176,7124176,8178920,8178920,9232636,9232636],St=[0,11141120,43520,11184640,170,11141290,21930,11184810,5592405,16733525,5635925,16777045,5592575,16733695,5636095,16777215],Ia=[0,43520,170,21930],Ea=[0,11184640,11141290,11184810],ya=[0,11184640,170,11184810],_a=[0,5635925,5592575,5636095],Ba=[0,16777045,16733695,16777215],Da=[0,16776960,5592575,16777215],Ma=at(2,2,2),Ra=at(3,3,2),Tt=at(3,3,3),Qt=at(1,1,1),Ot=[M(0,0,0),M(0,0,255),M(255,0,0),M(255,0,255),M(0,255,0),M(0,255,255),M(255,255,0),M(255,255,255)],Pt=[0,8388752,16711680,128,8388736,16711808,255,8388863,16711935,32768,8421376,16744448,32896,8421504,16744576,33023,8421631,16744703,65280,8453888,16776960,65408,8454016,16777088,65535,8454143,16777215],Fa=[0,1911635,8267091,34641,11227702,6248271,12764103,16773608,16711757,16753408,16772135,58422,2731519,8615580,16742312,16764074],Sa=[1313820,4465716,3159149,5130831,8735792,3433764,13649480,7696737,5864910,13794604,8754593,7186988,13806233,7193290,14341214,14610134],Ta=[16579836,16724307,183389,4931571],Qa=[997391,3170864,1027212,1035436];var kt=at(4,4,4);var tt=kt,Oa=kt,Pa=kt,ft=[M(48,210,0),M(245,245,128),M(76,58,180),M(154,50,54)],dt=[M(216,216,216),M(65,175,113),M(216,110,240),M(212,127,0)];function at(r,n,x){for(var d=1<<r+n+x,p=255/((1<<r)-1),D=255/((1<<n)-1),v=255/((1<<x)-1),A=new Uint32Array(d),s=0;s<d;s++){var u=s&(1<<r)-1,c=s>>r&(1<<n)-1,m=s>>r+n&(1<<x)-1;A[s]=M(u*p,c*D,m*v)}return A}var rt=[{id:"c64.multi",name:"C-64 Multi",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Me,block:{w:4,h:8,colors:4,xb:1,yb:2},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},toNative:"exportC64Multi"},{id:"c64.multi.fli",name:"C-64 Multi FLI (w/o bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Me,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.bug",name:"C-64 Multi FLI (with bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Me,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank.left",name:"C-64 Multi FLI (Left blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Me,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},fli:{bug:!1,blankLeft:!0,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank",name:"C-64 Multi FLI (L/R blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Me,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.hires",name:"C-64 Hires",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Me,block:{w:8,h:8,colors:2},toNative:"exportC64Hires"},{id:"c64.hires.fli",name:"C-64 Hires FLI (w/o bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Me,block:{w:8,h:1,colors:2},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64HiresFLI"},{id:"c64.hires.fli.bug",name:"C-64 Hires FLI (with bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Me,block:{w:8,h:1,colors:2},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64HiresFLI"},{id:"c64.hires.fli.blank",name:"C-64 Hires FLI (L/R blank)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Me,block:{w:8,h:1,colors:2},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64HiresFLI"},{id:"nes",name:"NES (4 color, 240 tiles)",width:160,height:96,scaleX:8/7,conv:"DitheringCanvas",pal:ht,reduce:4,toNative:"exportNES"},{id:"msx",name:"MSX/Coleco (TMS9918A)",width:256,height:192,conv:"VDPMode2_Canvas",pal:ba,block:{w:8,h:1,colors:2},toNative:"exportTMS9918"},{id:"apple2.hires",name:"Apple ][ (Hires)",width:140,height:192,scaleX:2,conv:"Apple2_Canvas",pal:wa,block:{w:7,h:1,colors:4},toNative:"exportApple2HiresToHGR"},{id:"atari8.d",name:"Atari ANTIC (Mode D)",width:160,height:96,scaleX:.8571,conv:"DitheringCanvas",pal:Oe,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"atari8.f.10",name:"Atari ANTIC (Mode F/10)",width:80,height:192,scaleX:.8571*4,conv:"DitheringCanvas",pal:Oe,reduce:9,toNative:"exportFrameBuffer",exportFormat:{bpp:4,brev:!0}},{id:"vcs",name:"Atari VCS",width:40,height:192,scaleX:6,conv:"DitheringCanvas",pal:Oe,reduce:2,toNative:"exportVCSPlayfield"},{id:"vcs.color",name:"Atari VCS (Color)",width:40,height:192,scaleX:6,conv:"VCSColorPlayfield_Canvas",pal:Oe,toNative:"exportVCSPlayfield"},{id:"astrocade",name:"Bally Astrocade",width:160,height:98,scaleX:1,conv:"DitheringCanvas",pal:Ca,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"zx",name:"ZX Spectrum",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:Ot,block:{w:8,h:8,colors:2},toNative:"exportZXSpectrum"},{id:"cpc.mode0",name:"Amstrad CPC (mode 0)",width:160,height:200,scaleX:2,conv:"DitheringCanvas",pal:Pt,reduce:16,toNative:"exportFrameBuffer",exportFormat:{bpp:4,yremap:[3,80,2048],bitremap:[7,3,5,1,6,2,4,0]}},{id:"cpc.mode1",name:"Amstrad CPC (mode 1)",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Pt,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,yremap:[3,80,2048],bitremap:[7,3,6,2,5,1,4,0]}},null,{id:"vic20.hires",name:"VIC-20 Hires",width:160,height:160,scaleX:1.5,conv:"VICII_Canvas",pal:Rt,block:{w:8,h:8,colors:2},paletteChoices:{background:!0,backgroundRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicHires"},{id:"vic20.multi",name:"VIC-20 Multi",width:80,height:160,scaleX:3,conv:"VICII_Canvas",pal:Rt,block:{w:4,h:8,colors:4},paletteChoices:{background:!0,backgroundRange:{min:0,max:15},aux:!0,auxRange:{min:0,max:15},border:!0,borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicMulti"},{id:"nes4f",name:"NES (4 color, full screen)",width:256,height:240,scaleX:8/7,conv:"DitheringCanvas",pal:ht,reduce:4,toNative:"exportNES"},{id:"nes5f",name:"NES (5 color, full screen)",width:256,height:240,scaleX:8/7,conv:"NES_Canvas",pal:ht,reduce:5,toNative:"exportNES"},{id:"atari7800.160a",name:"Atari 7800 (160A)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:Oe,reduce:4},{id:"atari7800.160b",name:"Atari 7800 (160B)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:Oe,reduce:12},{id:"sms",name:"Sega Master System",width:176,height:144,scaleX:8/7,conv:"DitheringCanvas",pal:Ma,reduce:16},{id:"sms-gg",name:"Sega GameGear",width:160,height:144,scaleX:1.2,conv:"DitheringCanvas",pal:Pa,reduce:16},{id:"bbcmicro.mode2",name:"BBC Micro (mode 2)",width:160,height:256,scaleX:2,conv:"DitheringCanvas",pal:Qt},{id:"apple2.lores",name:"Apple ][ (Lores)",width:40,height:48,scaleX:1.5,conv:"DitheringCanvas",pal:Ft,toNative:"exportFrameBuffer",exportFormat:{bpp:4}},{id:"apple2.dblhires",name:"Apple ][ (Double-Hires)",width:140,height:192,scaleX:2,conv:"DitheringCanvas",pal:Ft},{id:"appleiigs.320.16",name:"Apple IIGS (16 colors)",width:320,height:200,conv:"DitheringCanvas",pal:Oa,reduce:16},{id:"channelf",name:"Fairchild Channel F",width:102,height:58,conv:"DitheringCanvas",pal:Ta,reduce:4},{id:"mac",name:"Mac 128K",width:512,height:342,conv:"DitheringCanvas",pal:xa},{id:"x86.cga.04h.1",name:"PC CGA (Mode 04h, palette 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ia,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.1B",name:"PC CGA (Mode 04h, bright 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:_a,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2",name:"PC CGA (Mode 04h, palette 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ea,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2B",name:"PC CGA (Mode 04h, bright 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Ba,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h",name:"PC CGA (Mode 05h)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:ya,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h.B",name:"PC CGA (Mode 05h, bright)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Da,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.ega.0dh",name:"PC EGA (Mode 0Dh)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:St,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"x86.ega.10h",name:"PC EGA (Mode 10h)",width:640,height:350,scaleX:350/640*1.37,conv:"DitheringCanvas",pal:St,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"williams",name:"Williams Arcade",width:304,height:256,conv:"DitheringCanvas",pal:Ra,reduce:16},{id:"pico8",name:"PICO-8",width:128,height:128,conv:"DitheringCanvas",pal:Fa},{id:"tic80",name:"TIC-80",width:240,height:136,conv:"DitheringCanvas",pal:Sa},{id:"gb",name:"Game Boy Classic",width:160,height:144,scaleX:10/9,conv:"DitheringCanvas",pal:Qa},{id:"amiga.lores",name:"Amiga (Lores)",width:320,height:256,conv:"DitheringCanvas",pal:tt,reduce:32},{id:"amiga.lores.ham6",name:"Amiga (Lores, HAM6)",width:320,height:256,conv:"HAM6_Canvas",pal:tt,reduce:16,extraColors:48},{id:"cx16.lores",name:"Commander X16 (Lores)",width:320,height:240,scaleX:1,conv:"DitheringCanvas",pal:tt,reduce:256},{id:"cx16.hires",name:"Commander X16 (Hires, cropped)",width:640,height:400,scaleX:1,conv:"DitheringCanvas",pal:tt,reduce:16},{id:"compucolor",name:"Compucolor",width:160,height:192,scaleX:1.6,conv:"Compucolor_Canvas",pal:Ot,block:{w:2,h:4,colors:2}},{id:"teletext",name:"Teletext",width:40*2,height:24*3,scaleX:4/3,conv:"Teletext_Canvas",pal:Qt,block:{w:2,h:3,colors:2}},{id:"atarist",name:"Atari ST",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Tt,reduce:16},{id:"MC6847.CG2.palette0",name:"MC6847 (CG2, palette 0)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:ft,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG2.palette1",name:"MC6847 (CG2, palette 1)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:dt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette0",name:"MC6847 (CG3, palette 0)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:ft,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette1",name:"MC6847 (CG3, palette 1)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:dt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette0",name:"MC6847 (CG6, palette 0)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:ft,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette1",name:"MC6847 (CG6, palette 1)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:dt,reduce:4,toNative:"exportMC6847"},{id:"vcs.48",name:"Atari VCS (48x48 bitmap)",width:48,height:48,conv:"DitheringCanvas",pal:Oe,reduce:2},{id:"pce.256x240",name:"PC Engine (256x240)",width:256,height:240,scaleX:5/4,conv:"DitheringCanvas",pal:Tt,reduce:16}],ut={};rt.forEach(r=>{r&&(ut[r.id||r.name]=r)});var Lt={};va(Lt,{exportApple2HiresToHGR:()=>Jr,exportC64Hires:()=>ti,exportC64HiresFLI:()=>ai,exportC64Multi:()=>ei,exportCharMemory:()=>ke,exportFrameBuffer:()=>La,exportMC6847:()=>hi,exportNES:()=>si,exportNES5Color:()=>ci,exportTMS9918:()=>oi,exportVCSPlayfield:()=>li,exportVicHires:()=>ri,exportVicMulti:()=>ii,exportZXSpectrum:()=>ni});function Zr(r,n){if(!n)return r;for(var x=0,d=0;d<n.length;d++){var p=n[d];p<0&&(p=-p-1,x^=1<<p),r&1<<d&&(x^=1<<p)}return x}function ka(r,n){n.destfmt&&(n=n.destfmt);var x=n.w,d=n.h,p=n.count||1,D=n.bpp||1,v=n.np||1,A=n.bpw||8,s=n.sl||Math.ceil(n.w*D/A),u=(1<<D)-1,c=n.pofs||s*d*p,m=n.skip||0,f;v>0&&n.sl?f=new Uint8Array(s*d*p):n.yremap?f=new Uint8Array(p*((d>>n.yremap[0])*n.yremap[1]+((1<<n.yremap[0])-1)*n.yremap[2])):A<=8?f=new Uint8Array(s*d*p*v):f=new Uint32Array(s*d*p*v);for(var g=0;g<p;g++)for(var Q=r[g],I=0,w=0;w<d;w++){var b=n.flip?d-1-w:w,R=g*s*d+b*s;n.yremap&&(R=(w>>n.yremap[0])*n.yremap[1]+(w&(1<<n.yremap[0])-1)*n.yremap[2]);for(var y=0,L=0;L<x;L++){var U=Q[I++],z=Zr(R,n.remap);if(n.bitremap)for(var W=0;W<(n.bpp||1);W++)U&1<<W&&(f[z]|=1<<n.bitremap[y+W]);else for(var W=0;W<v;W++){var V=U>>W*D&u;f[z+W*c+m]|=n.brev?V<<A-y-D:V<<y}y+=D,y>=A&&(R+=1,y=0)}}return f}function Pe(r){var n=0;r.forEach(d=>{n+=d.length});var x=new Uint8Array(n);return n=0,r.forEach(d=>{x.set(d,n),n+=d.length}),x}function La(r,n){var x=n.exportFormat;if(!x)throw"No export format";return x.w=r.width,x.h=r.height,new Uint8Array(ka([r.indexed],x))}function Jr(r,n){for(var x=new Uint8Array(8192),d=0,p=0;p<r.height;p++)for(var D=(p&7)*1024+(p>>3&7)*128+(p>>6)*40,v=0;v<r.width;v+=7){for(var A=0,s=0,u=0;u<7;u++){var c=r.indexed[d++];(c==3||c==4)&&(s|=128),c>=3&&(c-=2),A|=c<<u*2}x[D++]=A&127|s,x[D++]=A>>7&127|s}return x}function ke(r,n,x,d,p){var D=n==4?2:1,v=0,A=r.width/n,s=r.height/x,u=new Uint8Array(r.width*r.height*D/8),c=u.length==r.params.length;d=="fli"&&(c=!0),console.log("isvdp",c,n,x,D,A,s);for(var m=0;m<r.height;m++)for(var f=0;f<r.width;f++){var g=Math.floor(f/n)+m*A,Q=Math.floor(f/n)+Math.floor(m/x)*A,I=Q*x+(m&x-1);d=="zx"&&(I=g&6175|(g&224)<<3|(g&1792)>>3);var w=(f&n-1)*D;w=8-D-w;var b=r.indexed[v],R=0,y=c?r.params[g]:r.params[Q];D==1?b==(y&15)&&(R=1):b==(y&15)?R=2:b==(y>>4&15)?R=1:b==(y>>8&15)&&(R=3),p!=null&&p===b&&(R=0),u[I]|=R<<w,v++}return u}function ei(r,n){if(!n.block)throw"No block size";let x=n.block.w,d=n.block.h,p=r.width/x,D=r.height/d,v=n.fli!==void 0,A=r.width/x*r.height/d,s=n.cb.w===void 0?x:n.cb.w,u=n.cb.h===void 0?d:n.cb.h,c=r.width/s,m=r.height/u,f=new Uint8Array(v?8192:p*D),g=new Uint8Array(c*m);if(v)for(let b=0;b<A;b++){let R=r.params[b],y=(Math.floor(b/40)&7)*1024+Math.floor(b/320)*40+b%40;f[y]=R&255}else for(let b=0;b<f.length;b++)f[b]=r.params[b]&255;for(let b=0;b<g.length;b++)g[b]=r.params[b+A]&15;let Q=ke(r,x,u,v?"fli":void 0,r.params[r.params.length-1]&15),I=r.params[r.params.length-1],w=new Uint8Array(2);return w[0]=I&255,w[1]=I>>8&255,Pe([Q,f,g,w])}function ti(r,n){if(!n.block)throw"No block size";let x=n.block.w,d=n.block.h,p=r.width/x,D=r.height/d,v=new Uint8Array(p*D);for(let c=0;c<v.length;c++){let m=r.params[c];v[c]=(m&15)<<4|(m&240)>>4}let A=ke(r,x,d),s=new Uint8Array(2),u=r.params[r.params.length-1];return s[0]=u&255,s[1]=u>>8&255,Pe([A,v,s])}function ai(r,n){let x=new Uint8Array(8192);for(var d=0;d<r.params.length;d++){let A=r.params[d],s=(Math.floor(d/40)&7)*1024+Math.floor(d/320)*40+d%40;x[s]=(A&15)<<4|(A&240)>>4}let p=new Uint8Array(2),D=r.params[r.params.length-1];p[0]=D&255,p[1]=D>>8&255;let v=ke(r,8,8,"fli");return Pe([v,x,p])}function ri(r,n){if(!n.block)throw"No block size";let x=n.block.w,d=n.block.h,p=r.width/x,D=r.height/d,v=new Uint8Array(p*D);for(let c=0;c<v.length;c++){let m=r.params[c];v[c]=(m&15)<<4|(m&240)>>4}let A=ke(r,x,d),s=new Uint8Array(2),u=r.params[r.params.length-1];return s[0]=u&255,s[1]=u>>8&255,Pe([A,v,s])}function ii(r,n){if(!n.block)throw"No block size";let x=n.block.w,d=n.block.h,p=r.width/x,D=r.height/d,v=new Uint8Array(p*D);for(let c=0;c<v.length;c++)v[c]=r.params[c]&255;let A=ke(r,x,d),s=r.params[r.params.length-1],u=new Uint8Array(3);return u[0]=s&15,u[1]=s>>8&15,u[2]=s>>4&15,Pe([A,v,u])}function ni(r,n){for(var x=new Uint8Array(r.params.length),d=0;d<x.length;d++){var p=r.params[d]&65535;x[d]=p&7|p>>5&56|64}var D=ke(r,8,8,"zx");return Pe([D,x])}function oi(r,n){if(!n.block)throw"No block size";for(var x=n.block.w,d=n.block.h,p=r.width/x,D=r.height/d,v=new Uint8Array(p*D),A=0;A<v.length;A++){var s=r.params[A]&65535,u=A&31,c=A>>5,m=c&7|u<<3|c>>3<<8;v[m]=s<<4|s>>8}var f=ke(r,8,8);return Pe([f,v])}function si(r,n){for(var x=0,d=r.width/8,p=r.height/8,D=new Uint8Array(r.width*r.height*2/8),v=0;v<r.height;v++)for(var A=0;A<r.width;A++){var s=Math.floor(A/8)+Math.floor(v/8)*d,u=s*16+(v&7),c=7-(A&7),m=r.indexed[x];D[u]|=(m&1)<<c,D[u+8]|=(m>>1&1)<<c,x++}return D}function ci(r,n){if(!n.block)throw"No block size";var x=La(r,n),d={w:n.block.w,h:n.block.h,bpp:2},p=new Uint8Array(ka([r.indexed],d));return Pe([x,p])}function li(r,n){var x=new Uint8Array(6*r.height);let d=[3,2,1,0,-1,-1,-1,-1,4,5,6,7,8,9,10,11,19,18,17,16,15,14,13,12,23,22,21,20,-1,-1,-1,-1,24,25,26,27,28,29,30,31,39,38,37,36,35,34,33,32];for(var p=0;p<r.height;p++)for(var D=0;D<48;D++){var v=d[D];if(v>=0&&(v+=p*r.width,r.indexed[v])){var A=(D>>3)*r.height+r.height-p-1;x[A]|=128>>(D&7)}}return x}function hi(r,n){var x=new Uint8Array(r.width*r.height/4);let d=0,p=0;for(var D=0;D<r.height;D++)for(var v=0;v<r.width;v+=4,p+=4)x[d++]=((r.indexed[p+0]&3)<<6)+((r.indexed[p+1]&3)<<4)+((r.indexed[p+2]&3)<<2)+((r.indexed[p+3]&3)<<0);return console.log(x),x}var Gt={};va(Gt,{getFileViewerCode_apple2_hires:()=>Ii,getFileViewerCode_astrocade:()=>Bi,getFileViewerCode_atari8_d:()=>qa,getFileViewerCode_atari8_f_10:()=>Di,getFileViewerCode_c64_fli:()=>Le,getFileViewerCode_c64_hires:()=>Ci,getFileViewerCode_c64_hires_fli:()=>Si,getFileViewerCode_c64_hires_fli_blank:()=>Qi,getFileViewerCode_c64_hires_fli_bug:()=>Ti,getFileViewerCode_c64_multi:()=>Va,getFileViewerCode_c64_multi_fli:()=>Oi,getFileViewerCode_c64_multi_fli_blank:()=>ki,getFileViewerCode_c64_multi_fli_blank_left:()=>Li,getFileViewerCode_c64_multi_fli_bug:()=>Pi,getFileViewerCode_cpc:()=>Nt,getFileViewerCode_cpc_mode0:()=>Ri,getFileViewerCode_cpc_mode1:()=>Fi,getFileViewerCode_msx:()=>yi,getFileViewerCode_nes:()=>Ei,getFileViewerCode_vcs:()=>_i,getFileViewerCode_zx:()=>Mi});var Na=`
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
`;var Ga=`
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
`;var $a=`
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
`;var Ua=`
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
`;var Ha=`
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
`;var Xa=`
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
`;var ja=`
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
`;var Wa=`
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
`;var za=`
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
`;var Ya=`
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
`;function we(r,n){return n||(n=2),wi(r,n,16)}function wi(r,n,x){try{for(var d=r.toString(x).toUpperCase();d.length<n;)d="0"+d;return d}catch(p){return r+""}}function qe(r,n){return r.map(x=>n.indexOf(x&16777215))}function Va(){return Na}function Ci(){var r=Va();return r=r.replace("lda #$18","lda #$08").replace("multicolor","single"),r}function Ii(){return Ga}function Ei(){var r=$a,n=qe(ne.lastPixels.pal,ne.settings.pal);return r=r.replace("hex 1f;screen color","hex "+we(n[0])),r=r.replace("hex 01112100;background 0","hex "+we(n[1])+we(n[2])+we(n[3])+we(0)),r}function yi(){return Ua}function _i(){var r=Ha,n=qe(ne.lastPixels.pal,ne.settings.pal);return r=r.replace("#$F6","#$"+we(n[0])),r=r.replace("#$F7","#$"+we(n[1])),r}function Bi(){var r=Xa,n=qe(ne.lastPixels.pal,ne.settings.pal);return r=r.replace("$b0","$"+we(n[0])),r=r.replace("$b1","$"+we(n[1])),r=r.replace("$b2","$"+we(n[2])),r=r.replace("$b3","$"+we(n[3])),r}function qa(){for(var r=ja,n=qe(ne.lastPixels.pal,ne.settings.pal),x=0;x<n.length;x++)r=r.replace("$00;PF"+x,"$"+we(n[x]));return r}function Di(){let r=qa();return r=r.replace(".byte $4d",".byte $4f"),r=r.replace(".byte $0d",".byte $0f"),r=r.replace("#$00;PRIOR","#$80"),r=r.replace("COLOR0+4","PCOLR0+0"),r=r.replace("COLOR0+0","PCOLR0+1"),r=r.replace("COLOR0+1","PCOLR0+2"),r=r.replace("COLOR0+2","PCOLR0+3"),r=r.replace(";GPIOMODE equ 1","GPIOMODE equ 1"),r}function Mi(){var r=Wa;return r}function Nt(r){var n=za,x=qe(ne.lastPixels.pal,ne.settings.pal);n=n.replace("$MODE",r+"");for(var d=0;d<16;d++)n=n.replace("$c"+d,"$"+we(x[d]||0));return n}function Ri(r){return Nt(0)}function Fi(r){return Nt(1)}function Le(){var r=Ya;return r}function Si(){let r=Le();return r=r.replace("$USE_MULTI_MODE","0"),r}function Ti(){let r=Le();return r=r.replace("$USE_MULTI_MODE","0"),r}function Qi(){let r=Le();return r=r.replace("$USE_MULTI_MODE","0"),r}function Oi(){let r=Le();return r=r.replace("$USE_MULTI_MODE","1"),r}function Pi(){let r=Le();return r=r.replace("$USE_MULTI_MODE","1"),r}function ki(){let r=Le();return r=r.replace("$USE_MULTI_MODE","1"),r}function Li(){let r=Le();return r=r.replace("$USE_MULTI_MODE","1"),r}var ar=Mt(Ka()),rr=Mt(Ja()),zt=Mt(er()),je,Ni=document.getElementById("brightSlider"),Gi=document.getElementById("contrastSlider"),$i=document.getElementById("saturationSlider"),Ui=document.getElementById("noiseSlider"),Hi=document.getElementById("diffuseSlider"),Xi=document.getElementById("orderedSlider"),ji=document.getElementById("diversitySlider"),Wi=document.getElementById("imageUpload"),zi=document.getElementById("srcimage"),mt=document.getElementById("resizecanvas"),ot=document.getElementById("destcanvas"),Wt=class{constructor(n){n.onmessage=x=>{var d=x.data;d!=null&&d.img!=null&&this.pixelsAvailable!=null&&(this.pixelsAvailable(d),this.lastPixels=d)}}setSettings(n){this.settings=n,pt.postMessage({cmd:"setSettings",data:n})}setSourceImage(n){pt.postMessage({cmd:"setSourceImage",data:n})}reset(){pt.postMessage({cmd:"reset"})}},pt=new Worker("./gen/worker.js"),ne=new Wt(pt);var it,At,Yi=[[1,0,7/16],[-1,1,3/16],[0,1,5/16],[1,1,1/16]],Vi=[[1,0,3/8],[0,1,3/8],[1,1,2/8]],qi=[[1,0,1/6],[2,0,1/6],[-1,1,1/6],[0,1,1/6],[1,1,1/6],[0,2,1/6]],Ki=[[1,0,4/16],[2,0,3/16],[-2,1,1/16],[-1,1,2/16],[0,1,3/16],[1,1,2/16],[2,1,1/16]],Zi=[[1,0,2/4],[-1,1,1/4],[0,1,1/4]],Ji=[[1,0,8/42],[2,0,4/42],[-2,1,2/42],[1,-1,4/42],[0,1,8/42],[1,1,4/42],[2,1,2/42],[-2,2,1/42],[-1,2,2/42],[0,2,4/42],[1,2,2/42],[2,2,1/42]],en=[[1,0,.5],[0,1,.5]],tn=[[1,0,1]],an=[[0,1,1]],rn=[[0,1,2/4],[0,2,1/4],[1,2,1/4]],nn=[[1,1,1]],on=[[0,1,6/16],[-1,1,3/16],[1,1,3/16],[-2,2,1/16],[0,2,2/16],[2,2,1/16]],ir=[{name:"Floyd-Steinberg",kernel:Yi},{name:"False Floyd",kernel:Vi},{name:"Atkinson",kernel:qi},{name:"Sierra 2",kernel:Ki},{name:"Sierra Lite",kernel:Zi},{name:"Stucki",kernel:Ji},{name:"Two-D",kernel:en},{name:"Right",kernel:tn},{name:"Down",kernel:an},{name:"Double Down",kernel:rn},{name:"Diagonal",kernel:nn},{name:"Diamond",kernel:on}],sn=[{id:"perceptual",name:"Perceptual"},{id:"hue",name:"Hue-Based"},{id:"dist",name:"Distance"},{id:"max",name:"Maximum"}];function cn(r){return new Uint32Array(r.getContext("2d").getImageData(0,0,r.width,r.height).data.buffer)}function ln(r,n){var x=r.getContext("2d"),d=x.createImageData(r.width,r.height),p=new Uint32Array(d.data.buffer);p.length==n.length?(p.set(n),x.putImageData(d,0,0)):console.log("drawRGBA(): array length mismatch")}function hn(r,n,x,d,p){n*=1,x*=1;for(var D=new Uint8ClampedArray(r.buffer),v=0;v<D.length;v+=4){var A=D[v],s=D[v+1],u=D[v+2];if(d!=1){var c=.2989*A+.587*s+.114*u;A=c*(1-d)+A*d,s=c*(1-d)+s*d,u=c*(1-d)+u*d}D[v]=Math.pow(A*n,p)+x,D[v+1]=Math.pow(s*n,p)+x,D[v+2]=Math.pow(u*n,p)+x}}function nt(){var r=cn(mt);let n=(parseFloat(Gi.value)-50)/100+1,x=(parseFloat(Ni.value)-n*50)*(128/50),d=(parseFloat($i.value)-50)/50+1;hn(r,n,x,d,1),ne.setSourceImage(r),Xe()}function Xe(){var r=$("#diffuseTypeSelect")[0].selectedOptions[0];r&&(ne.settings.ditherfn=ir[parseInt(r.value)].kernel);var r=$("#errorFuncSelect")[0].selectedOptions[0];r&&(ne.settings.errfn=r.value),ne.settings.diffuse=parseFloat(Hi.value)/100,ne.settings.ordered=parseFloat(Xi.value)/100,ne.settings.noise=parseFloat(Ui.value),ne.settings.paletteDiversity=parseFloat(ji.value)/200+.75,ne.setSettings(ne.settings),ne.reset()}function fn(){let r=je.getCroppedCanvas();r.width==0||r.height==0||(0,rr.default)().resize(r,mt,{}).then(()=>{nt()})}function nr(r){var n=r.width+" x "+r.height;return r.reduce?n+=", "+r.reduce+" out of "+r.pal.length+" colors":r.pal&&(n+=", "+r.pal.length+" colors"),r.block&&(n+=", ",n+=r.block.colors+" colors per ",n+=r.block.w+"x"+r.block.h+" block"),n}function dn(r){$("#targetFormatInfo").text(nr(r))}function un(r){var n=$("#paletteSwatches");n.empty(),r&&r.length<64&&r.forEach((x,d)=>{var p="rgb("+(x&255)+","+(x>>8&255)+","+(x>>16&255)+")",D=$('<span style="width:2em">&nbsp;</span>').css("background-color",p);n.append(D)})}function gt(r){je&&je.destroy();let n=ne.settings.width*(ne.settings.scaleX||1)/ne.settings.height||4/3;je=new ar.default(zi,{viewMode:1,initialAspectRatio:n,crop(x){fn()}}),je.replace(r),cr()}function tr(r){var n=r.conv!="DitheringCanvas";ne.setSettings(r),dn(r),mt.width=ot.width=r.width,mt.height=ot.height=r.height;let x=r.scaleX||1;ot.style.aspectRatio=(r.width*x/r.height).toString(),$("#noiseSection").css("display",n?"flex":"none"),$("#diversitySection").css("display",r.reduce?"flex":"none"),$("#downloadNativeBtn").css("display",r.toNative?"inline":"none"),$("#gotoIDE").css("display",sr()?"inline":"none"),je&&gt(je.url),cr(),bn(r)}function st(){var r=it||"image";try{r=r.split(".").shift()||"image"}catch(n){}return r+"-"+ne.settings.id}function or(){var r=ne.lastPixels;let n=ne.settings.toNative;if(!n)return null;var x=Lt[n];return r&&x&&x(r,ne.settings)}function pn(){var r=or();if(r!=null){var n=new Blob([r],{type:"application/octet-stream"});(0,zt.saveAs)(n,st()+".bin")}}function An(){ot.toBlob(r=>{(0,zt.saveAs)(r,st()+".png")},"image/png")}function gn(r){var n="";if(r!=null){for(var x=new Array,d=0;d<256;++d)x[d]=String.fromCharCode(d);for(var p=r.length,d=0;d<p;d++)n+=x[r[d]]}return n}function sr(){var r="getFileViewerCode_"+ne.settings.id.replace(/[^a-z0-9]/g,"_"),n=Gt[r];return n}async function mn(){function r(v,A,s){$('<input type="hidden"/>').attr("name",A).val(s).appendTo(v)}if(confirm("Open code sample with image in 8bitworkshop?")){var n=ne.settings.id.split(".")[0],x=$(document.forms.ideForm);x.empty(),n=="atari8"&&(n="atari8-800"),n=="cpc"&&(n="cpc.6128"),r(x,"platform",n);var d="viewer-"+st()+".asm",p=st()+".bin";r(x,"file0_name",d);var D=sr()();D=D.replace("$DATAFILE",st()+".bin"),r(x,"file0_data",D),r(x,"file0_type","utf8"),r(x,"file1_name",p),r(x,"file1_data",btoa(gn(or()))),r(x,"file1_type","binary"),x.submit()}}function cr(){let r={sys:ne.settings.id,image:At};window.location.hash="#"+$.param(r)}function vn(r){r.startsWith("?")&&(r=r.substr(1));var n=r.split("&");if(!n||n.length==0)return{};for(var x={},d=0;d<n.length;++d){var p=n[d].split("=",2);p.length==1?x[p[0]]="":x[p[0]]=decodeURIComponent(p[1].replace(/\+/g," "))}return x}var xn=["benbenn.jpg","cezanne2.jpg","colorroses.jpg","colorswirls.jpg","coolcar.jpg","darkbrewery.jpg","dhuku.jpg","greentruck.jpg","frida.jpg","homer.jpg","keyssunset.jpg","lobsterpot.jpg","myersflat.jpg","myrtle.jpg","parrot.jpg","redrose.jpg","robert_s_duncanson.jpg","seurat.jpg","vangogh.jpg"];function bn(r){let n=$("#targetFormatSelect");n.empty();let[x,d]=r.name.split(" ("),p=new Set,D=null;rt.forEach(v=>{if(v==null)n.append($("<option disabled></option>"));else{let[A,s]=v.name.split(" ("),u=$("<option />").text(v.name).val(v.id);if(A==x)D||(D=$("<optgroup />").attr("label",x),n.append(D)),D.append(u);else if(!p.has(A)){let c=$("<option />").text(A).val(v.id);n.append(c)}p.add(A)}}),n.val(r.id)}function wn(){if(window.addEventListener("load",function(){document.querySelector('input[type="file"]').addEventListener("change",function(p){var D=p.target,v=D.files&&D.files[0];if(v){it=v.name,At="";var A=URL.createObjectURL(v);gt(A)}}),xn.forEach(p=>{$('<a class="dropdown-item" href="#"></a>').text(p).appendTo("#examplesMenu")}),$("#examplesMenu").click(p=>{var D=$(p.target).text();it=At=D,gt("images/"+D),Wi.value=""}),ir.forEach((p,D)=>{var v=$("<option />").text(p.name).val(D);$("#diffuseTypeSelect").append(v)}),sn.forEach((p,D)=>{var v=$("<option />").text(p.name).val(p.id);$("#errorFuncSelect").append(v)}),ne.pixelsAvailable=p=>{ln(ot,p.img),un(p.pal)};let n=vn(window.location.hash.substring(1)),x=n.sys||rt[0].id,d=ut[x];tr(d),it=At=n.image||"seurat.jpg",gt("images/"+it),$("#diffuseSlider").on("change",Xe),$("#orderedSlider").on("change",Xe),$("#noiseSlider").on("change",Xe),$("#diversitySlider").on("change",nt),$("#brightSlider").on("change",nt),$("#contrastSlider").on("change",nt),$("#saturationSlider").on("change",nt),$("#resetButton").on("click",Xe),$("#diffuseTypeSelect").on("change",Xe),$("#targetFormatSelect").change(p=>{var D=p.target.selectedOptions[0];D&&tr(ut[D.value])}),$("#errorFuncSelect").on("change",Xe),$("#downloadImageBtn").click(An),$("#downloadNativeBtn").click(pn),$("#gotoIDE").click(mn)}),window.location.search=="?printmeta"){let n=function(){var x="";rt.forEach(d=>{d&&(x+="* "+d.name+" - "+nr(d)+`
`)}),console.log(x)};var r=n;n()}}wn();export{ne as dithertron,wn as startUI};
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
