var Mi=Object.create;var wt=Object.defineProperty,Pi=Object.defineProperties,Si=Object.getOwnPropertyDescriptor,Ri=Object.getOwnPropertyDescriptors,Di=Object.getOwnPropertyNames,Fr=Object.getOwnPropertySymbols,Ti=Object.getPrototypeOf,Lr=Object.prototype.hasOwnProperty,ki=Object.prototype.propertyIsEnumerable;var Or=(e,r,n)=>r in e?wt(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,Te=(e,r)=>{for(var n in r||(r={}))Lr.call(r,n)&&Or(e,n,r[n]);if(Fr)for(var n of Fr(r))ki.call(r,n)&&Or(e,n,r[n]);return e},ke=(e,r)=>Pi(e,Ri(r));var ct=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(r,n)=>(typeof require!="undefined"?require:r)[n]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var Qt=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),Ur=(e,r)=>{for(var n in r)wt(e,n,{get:r[n],enumerable:!0})},Fi=(e,r,n,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let u of Di(r))!Lr.call(e,u)&&u!==n&&wt(e,u,{get:()=>r[u],enumerable:!(o=Si(r,u))||o.enumerable});return e};var $t=(e,r,n)=>(n=e!=null?Mi(Ti(e)):{},Fi(r||!e||!e.__esModule?wt(n,"default",{value:e,enumerable:!0}):n,e));var Ra=Qt((ar,ir)=>{(function(e,r){typeof ar=="object"&&typeof ir!="undefined"?ir.exports=r():typeof define=="function"&&define.amd?define(r):(e=typeof globalThis!="undefined"?globalThis:e||self,e.Cropper=r())})(ar,function(){"use strict";function e(s,t){var i=Object.keys(s);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(s);t&&(a=a.filter(function(x){return Object.getOwnPropertyDescriptor(s,x).enumerable})),i.push.apply(i,a)}return i}function r(s){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?e(Object(i),!0).forEach(function(a){m(s,a,i[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(i)):e(Object(i)).forEach(function(a){Object.defineProperty(s,a,Object.getOwnPropertyDescriptor(i,a))})}return s}function n(s){"@babel/helpers - typeof";return n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(s)}function o(s,t){if(!(s instanceof t))throw new TypeError("Cannot call a class as a function")}function u(s,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(s,P(a.key),a)}}function b(s,t,i){return t&&u(s.prototype,t),i&&u(s,i),Object.defineProperty(s,"prototype",{writable:!1}),s}function m(s,t,i){return t=P(t),t in s?Object.defineProperty(s,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):s[t]=i,s}function p(s){return l(s)||f(s)||h(s)||c()}function l(s){if(Array.isArray(s))return v(s)}function f(s){if(typeof Symbol!="undefined"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function h(s,t){if(s){if(typeof s=="string")return v(s,t);var i=Object.prototype.toString.call(s).slice(8,-1);if(i==="Object"&&s.constructor&&(i=s.constructor.name),i==="Map"||i==="Set")return Array.from(s);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return v(s,t)}}function v(s,t){(t==null||t>s.length)&&(t=s.length);for(var i=0,a=new Array(t);i<t;i++)a[i]=s[i];return a}function c(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function g(s,t){if(typeof s!="object"||s===null)return s;var i=s[Symbol.toPrimitive];if(i!==void 0){var a=i.call(s,t||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(s)}function P(s){var t=g(s,"string");return typeof t=="symbol"?t:String(t)}var w=typeof window!="undefined"&&typeof window.document!="undefined",C=w?window:{},S=w&&C.document.documentElement?"ontouchstart"in C.document.documentElement:!1,D=w?"PointerEvent"in C:!1,M="cropper",L="all",Q="crop",Y="move",X="zoom",W="e",N="w",V="s",j="n",z="ne",K="nw",q="se",oe="sw",te="".concat(M,"-crop"),I="".concat(M,"-disabled"),R="".concat(M,"-hidden"),T="".concat(M,"-hide"),G="".concat(M,"-invisible"),F="".concat(M,"-modal"),ee="".concat(M,"-move"),Z="".concat(M,"Action"),J="".concat(M,"Preview"),se="crop",de="move",ze="none",Se="crop",ot="cropend",Dt="cropmove",Tt="cropstart",ur="dblclick",Va=S?"touchstart":"mousedown",Wa=S?"touchmove":"mousemove",Ya=S?"touchend touchcancel":"mouseup",dr=D?"pointerdown":Va,fr=D?"pointermove":Wa,pr=D?"pointerup pointercancel":Ya,mr="ready",gr="resize",br="wheel",kt="zoom",Ar="image/jpeg",ja=/^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,qa=/^data:/,Za=/^data:image\/jpeg;base64,/,Ka=/^img|canvas$/i,xr=200,vr=100,Cr={viewMode:0,dragMode:se,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:xr,minContainerHeight:vr,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},Ja='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',ei=Number.isNaN||C.isNaN;function re(s){return typeof s=="number"&&!ei(s)}var wr=function(t){return t>0&&t<1/0};function Ft(s){return typeof s=="undefined"}function Ve(s){return n(s)==="object"&&s!==null}var ti=Object.prototype.hasOwnProperty;function Je(s){if(!Ve(s))return!1;try{var t=s.constructor,i=t.prototype;return t&&i&&ti.call(i,"isPrototypeOf")}catch(a){return!1}}function xe(s){return typeof s=="function"}var ri=Array.prototype.slice;function Ir(s){return Array.from?Array.from(s):ri.call(s)}function fe(s,t){return s&&xe(t)&&(Array.isArray(s)||re(s.length)?Ir(s).forEach(function(i,a){t.call(s,i,a,s)}):Ve(s)&&Object.keys(s).forEach(function(i){t.call(s,s[i],i,s)})),s}var he=Object.assign||function(t){for(var i=arguments.length,a=new Array(i>1?i-1:0),x=1;x<i;x++)a[x-1]=arguments[x];return Ve(t)&&a.length>0&&a.forEach(function(d){Ve(d)&&Object.keys(d).forEach(function(A){t[A]=d[A]})}),t},ai=/\.\d*(?:0|9){12}\d*$/;function et(s){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return ai.test(s)?Math.round(s*t)/t:s}var ii=/^width|height|left|top|marginLeft|marginTop$/;function Ne(s,t){var i=s.style;fe(t,function(a,x){ii.test(x)&&re(a)&&(a="".concat(a,"px")),i[x]=a})}function ni(s,t){return s.classList?s.classList.contains(t):s.className.indexOf(t)>-1}function be(s,t){if(t){if(re(s.length)){fe(s,function(a){be(a,t)});return}if(s.classList){s.classList.add(t);return}var i=s.className.trim();i?i.indexOf(t)<0&&(s.className="".concat(i," ").concat(t)):s.className=t}}function Re(s,t){if(t){if(re(s.length)){fe(s,function(i){Re(i,t)});return}if(s.classList){s.classList.remove(t);return}s.className.indexOf(t)>=0&&(s.className=s.className.replace(t,""))}}function tt(s,t,i){if(t){if(re(s.length)){fe(s,function(a){tt(a,t,i)});return}i?be(s,t):Re(s,t)}}var oi=/([a-z\d])([A-Z])/g;function Ot(s){return s.replace(oi,"$1-$2").toLowerCase()}function Lt(s,t){return Ve(s[t])?s[t]:s.dataset?s.dataset[t]:s.getAttribute("data-".concat(Ot(t)))}function st(s,t,i){Ve(i)?s[t]=i:s.dataset?s.dataset[t]=i:s.setAttribute("data-".concat(Ot(t)),i)}function si(s,t){if(Ve(s[t]))try{delete s[t]}catch(i){s[t]=void 0}else if(s.dataset)try{delete s.dataset[t]}catch(i){s.dataset[t]=void 0}else s.removeAttribute("data-".concat(Ot(t)))}var yr=/\s\s*/,Br=function(){var s=!1;if(w){var t=!1,i=function(){},a=Object.defineProperty({},"once",{get:function(){return s=!0,t},set:function(d){t=d}});C.addEventListener("test",i,a),C.removeEventListener("test",i,a)}return s}();function _e(s,t,i){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},x=i;t.trim().split(yr).forEach(function(d){if(!Br){var A=s.listeners;A&&A[d]&&A[d][i]&&(x=A[d][i],delete A[d][i],Object.keys(A[d]).length===0&&delete A[d],Object.keys(A).length===0&&delete s.listeners)}s.removeEventListener(d,x,a)})}function Ie(s,t,i){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},x=i;t.trim().split(yr).forEach(function(d){if(a.once&&!Br){var A=s.listeners,B=A===void 0?{}:A;x=function(){delete B[d][i],s.removeEventListener(d,x,a);for(var k=arguments.length,E=new Array(k),_=0;_<k;_++)E[_]=arguments[_];i.apply(s,E)},B[d]||(B[d]={}),B[d][i]&&s.removeEventListener(d,B[d][i],a),B[d][i]=x,s.listeners=B}s.addEventListener(d,x,a)})}function rt(s,t,i){var a;return xe(Event)&&xe(CustomEvent)?a=new CustomEvent(t,{detail:i,bubbles:!0,cancelable:!0}):(a=document.createEvent("CustomEvent"),a.initCustomEvent(t,!0,!0,i)),s.dispatchEvent(a)}function Er(s){var t=s.getBoundingClientRect();return{left:t.left+(window.pageXOffset-document.documentElement.clientLeft),top:t.top+(window.pageYOffset-document.documentElement.clientTop)}}var Ut=C.location,li=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i;function _r(s){var t=s.match(li);return t!==null&&(t[1]!==Ut.protocol||t[2]!==Ut.hostname||t[3]!==Ut.port)}function Mr(s){var t="timestamp=".concat(new Date().getTime());return s+(s.indexOf("?")===-1?"?":"&")+t}function lt(s){var t=s.rotate,i=s.scaleX,a=s.scaleY,x=s.translateX,d=s.translateY,A=[];re(x)&&x!==0&&A.push("translateX(".concat(x,"px)")),re(d)&&d!==0&&A.push("translateY(".concat(d,"px)")),re(t)&&t!==0&&A.push("rotate(".concat(t,"deg)")),re(i)&&i!==1&&A.push("scaleX(".concat(i,")")),re(a)&&a!==1&&A.push("scaleY(".concat(a,")"));var B=A.length?A.join(" "):"none";return{WebkitTransform:B,msTransform:B,transform:B}}function ci(s){var t=r({},s),i=0;return fe(s,function(a,x){delete t[x],fe(t,function(d){var A=Math.abs(a.startX-d.startX),B=Math.abs(a.startY-d.startY),U=Math.abs(a.endX-d.endX),k=Math.abs(a.endY-d.endY),E=Math.sqrt(A*A+B*B),_=Math.sqrt(U*U+k*k),O=(_-E)/E;Math.abs(O)>Math.abs(i)&&(i=O)})}),i}function vt(s,t){var i=s.pageX,a=s.pageY,x={endX:i,endY:a};return t?x:r({startX:i,startY:a},x)}function hi(s){var t=0,i=0,a=0;return fe(s,function(x){var d=x.startX,A=x.startY;t+=d,i+=A,a+=1}),t/=a,i/=a,{pageX:t,pageY:i}}function Ge(s){var t=s.aspectRatio,i=s.height,a=s.width,x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"contain",d=wr(a),A=wr(i);if(d&&A){var B=i*t;x==="contain"&&B>a||x==="cover"&&B<a?i=a/t:a=i*t}else d?i=a/t:A&&(a=i*t);return{width:a,height:i}}function ui(s){var t=s.width,i=s.height,a=s.degree;if(a=Math.abs(a)%180,a===90)return{width:i,height:t};var x=a%90*Math.PI/180,d=Math.sin(x),A=Math.cos(x),B=t*A+i*d,U=t*d+i*A;return a>90?{width:U,height:B}:{width:B,height:U}}function di(s,t,i,a){var x=t.aspectRatio,d=t.naturalWidth,A=t.naturalHeight,B=t.rotate,U=B===void 0?0:B,k=t.scaleX,E=k===void 0?1:k,_=t.scaleY,O=_===void 0?1:_,ie=i.aspectRatio,ae=i.naturalWidth,ue=i.naturalHeight,le=a.fillColor,me=le===void 0?"transparent":le,Ae=a.imageSmoothingEnabled,pe=Ae===void 0?!0:Ae,Le=a.imageSmoothingQuality,we=Le===void 0?"low":Le,H=a.maxWidth,ce=H===void 0?1/0:H,ge=a.maxHeight,ye=ge===void 0?1/0:ge,Ue=a.minWidth,We=Ue===void 0?0:Ue,Ye=a.minHeight,Qe=Ye===void 0?0:Ye,De=document.createElement("canvas"),ve=De.getContext("2d"),je=Ge({aspectRatio:ie,width:ce,height:ye}),Ct=Ge({aspectRatio:ie,width:We,height:Qe},"cover"),Nt=Math.min(je.width,Math.max(Ct.width,ae)),Gt=Math.min(je.height,Math.max(Ct.height,ue)),Rr=Ge({aspectRatio:x,width:ce,height:ye}),Dr=Ge({aspectRatio:x,width:We,height:Qe},"cover"),Tr=Math.min(Rr.width,Math.max(Dr.width,d)),kr=Math.min(Rr.height,Math.max(Dr.height,A)),Ei=[-Tr/2,-kr/2,Tr,kr];return De.width=et(Nt),De.height=et(Gt),ve.fillStyle=me,ve.fillRect(0,0,Nt,Gt),ve.save(),ve.translate(Nt/2,Gt/2),ve.rotate(U*Math.PI/180),ve.scale(E,O),ve.imageSmoothingEnabled=pe,ve.imageSmoothingQuality=we,ve.drawImage.apply(ve,[s].concat(p(Ei.map(function(_i){return Math.floor(et(_i))})))),ve.restore(),De}var Pr=String.fromCharCode;function fi(s,t,i){var a="";i+=t;for(var x=t;x<i;x+=1)a+=Pr(s.getUint8(x));return a}var pi=/^data:.*,/;function mi(s){var t=s.replace(pi,""),i=atob(t),a=new ArrayBuffer(i.length),x=new Uint8Array(a);return fe(x,function(d,A){x[A]=i.charCodeAt(A)}),a}function gi(s,t){for(var i=[],a=8192,x=new Uint8Array(s);x.length>0;)i.push(Pr.apply(null,Ir(x.subarray(0,a)))),x=x.subarray(a);return"data:".concat(t,";base64,").concat(btoa(i.join("")))}function bi(s){var t=new DataView(s),i;try{var a,x,d;if(t.getUint8(0)===255&&t.getUint8(1)===216)for(var A=t.byteLength,B=2;B+1<A;){if(t.getUint8(B)===255&&t.getUint8(B+1)===225){x=B;break}B+=1}if(x){var U=x+4,k=x+10;if(fi(t,U,4)==="Exif"){var E=t.getUint16(k);if(a=E===18761,(a||E===19789)&&t.getUint16(k+2,a)===42){var _=t.getUint32(k+4,a);_>=8&&(d=k+_)}}}if(d){var O=t.getUint16(d,a),ie,ae;for(ae=0;ae<O;ae+=1)if(ie=d+ae*12+2,t.getUint16(ie,a)===274){ie+=8,i=t.getUint16(ie,a),t.setUint16(ie,1,a);break}}}catch(ue){i=1}return i}function Ai(s){var t=0,i=1,a=1;switch(s){case 2:i=-1;break;case 3:t=-180;break;case 4:a=-1;break;case 5:t=90,a=-1;break;case 6:t=90;break;case 7:t=90,i=-1;break;case 8:t=-90;break}return{rotate:t,scaleX:i,scaleY:a}}var xi={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var t=this.element,i=this.options,a=this.container,x=this.cropper,d=Number(i.minContainerWidth),A=Number(i.minContainerHeight);be(x,R),Re(t,R);var B={width:Math.max(a.offsetWidth,d>=0?d:xr),height:Math.max(a.offsetHeight,A>=0?A:vr)};this.containerData=B,Ne(x,{width:B.width,height:B.height}),be(t,R),Re(x,R)},initCanvas:function(){var t=this.containerData,i=this.imageData,a=this.options.viewMode,x=Math.abs(i.rotate)%180===90,d=x?i.naturalHeight:i.naturalWidth,A=x?i.naturalWidth:i.naturalHeight,B=d/A,U=t.width,k=t.height;t.height*B>t.width?a===3?U=t.height*B:k=t.width/B:a===3?k=t.width/B:U=t.height*B;var E={aspectRatio:B,naturalWidth:d,naturalHeight:A,width:U,height:k};this.canvasData=E,this.limited=a===1||a===2,this.limitCanvas(!0,!0),E.width=Math.min(Math.max(E.width,E.minWidth),E.maxWidth),E.height=Math.min(Math.max(E.height,E.minHeight),E.maxHeight),E.left=(t.width-E.width)/2,E.top=(t.height-E.height)/2,E.oldLeft=E.left,E.oldTop=E.top,this.initialCanvasData=he({},E)},limitCanvas:function(t,i){var a=this.options,x=this.containerData,d=this.canvasData,A=this.cropBoxData,B=a.viewMode,U=d.aspectRatio,k=this.cropped&&A;if(t){var E=Number(a.minCanvasWidth)||0,_=Number(a.minCanvasHeight)||0;B>1?(E=Math.max(E,x.width),_=Math.max(_,x.height),B===3&&(_*U>E?E=_*U:_=E/U)):B>0&&(E?E=Math.max(E,k?A.width:0):_?_=Math.max(_,k?A.height:0):k&&(E=A.width,_=A.height,_*U>E?E=_*U:_=E/U));var O=Ge({aspectRatio:U,width:E,height:_});E=O.width,_=O.height,d.minWidth=E,d.minHeight=_,d.maxWidth=1/0,d.maxHeight=1/0}if(i)if(B>(k?0:1)){var ie=x.width-d.width,ae=x.height-d.height;d.minLeft=Math.min(0,ie),d.minTop=Math.min(0,ae),d.maxLeft=Math.max(0,ie),d.maxTop=Math.max(0,ae),k&&this.limited&&(d.minLeft=Math.min(A.left,A.left+(A.width-d.width)),d.minTop=Math.min(A.top,A.top+(A.height-d.height)),d.maxLeft=A.left,d.maxTop=A.top,B===2&&(d.width>=x.width&&(d.minLeft=Math.min(0,ie),d.maxLeft=Math.max(0,ie)),d.height>=x.height&&(d.minTop=Math.min(0,ae),d.maxTop=Math.max(0,ae))))}else d.minLeft=-d.width,d.minTop=-d.height,d.maxLeft=x.width,d.maxTop=x.height},renderCanvas:function(t,i){var a=this.canvasData,x=this.imageData;if(i){var d=ui({width:x.naturalWidth*Math.abs(x.scaleX||1),height:x.naturalHeight*Math.abs(x.scaleY||1),degree:x.rotate||0}),A=d.width,B=d.height,U=a.width*(A/a.naturalWidth),k=a.height*(B/a.naturalHeight);a.left-=(U-a.width)/2,a.top-=(k-a.height)/2,a.width=U,a.height=k,a.aspectRatio=A/B,a.naturalWidth=A,a.naturalHeight=B,this.limitCanvas(!0,!1)}(a.width>a.maxWidth||a.width<a.minWidth)&&(a.left=a.oldLeft),(a.height>a.maxHeight||a.height<a.minHeight)&&(a.top=a.oldTop),a.width=Math.min(Math.max(a.width,a.minWidth),a.maxWidth),a.height=Math.min(Math.max(a.height,a.minHeight),a.maxHeight),this.limitCanvas(!1,!0),a.left=Math.min(Math.max(a.left,a.minLeft),a.maxLeft),a.top=Math.min(Math.max(a.top,a.minTop),a.maxTop),a.oldLeft=a.left,a.oldTop=a.top,Ne(this.canvas,he({width:a.width,height:a.height},lt({translateX:a.left,translateY:a.top}))),this.renderImage(t),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(t){var i=this.canvasData,a=this.imageData,x=a.naturalWidth*(i.width/i.naturalWidth),d=a.naturalHeight*(i.height/i.naturalHeight);he(a,{width:x,height:d,left:(i.width-x)/2,top:(i.height-d)/2}),Ne(this.image,he({width:a.width,height:a.height},lt(he({translateX:a.left,translateY:a.top},a)))),t&&this.output()},initCropBox:function(){var t=this.options,i=this.canvasData,a=t.aspectRatio||t.initialAspectRatio,x=Number(t.autoCropArea)||.8,d={width:i.width,height:i.height};a&&(i.height*a>i.width?d.height=d.width/a:d.width=d.height*a),this.cropBoxData=d,this.limitCropBox(!0,!0),d.width=Math.min(Math.max(d.width,d.minWidth),d.maxWidth),d.height=Math.min(Math.max(d.height,d.minHeight),d.maxHeight),d.width=Math.max(d.minWidth,d.width*x),d.height=Math.max(d.minHeight,d.height*x),d.left=i.left+(i.width-d.width)/2,d.top=i.top+(i.height-d.height)/2,d.oldLeft=d.left,d.oldTop=d.top,this.initialCropBoxData=he({},d)},limitCropBox:function(t,i){var a=this.options,x=this.containerData,d=this.canvasData,A=this.cropBoxData,B=this.limited,U=a.aspectRatio;if(t){var k=Number(a.minCropBoxWidth)||0,E=Number(a.minCropBoxHeight)||0,_=B?Math.min(x.width,d.width,d.width+d.left,x.width-d.left):x.width,O=B?Math.min(x.height,d.height,d.height+d.top,x.height-d.top):x.height;k=Math.min(k,x.width),E=Math.min(E,x.height),U&&(k&&E?E*U>k?E=k/U:k=E*U:k?E=k/U:E&&(k=E*U),O*U>_?O=_/U:_=O*U),A.minWidth=Math.min(k,_),A.minHeight=Math.min(E,O),A.maxWidth=_,A.maxHeight=O}i&&(B?(A.minLeft=Math.max(0,d.left),A.minTop=Math.max(0,d.top),A.maxLeft=Math.min(x.width,d.left+d.width)-A.width,A.maxTop=Math.min(x.height,d.top+d.height)-A.height):(A.minLeft=0,A.minTop=0,A.maxLeft=x.width-A.width,A.maxTop=x.height-A.height))},renderCropBox:function(){var t=this.options,i=this.containerData,a=this.cropBoxData;(a.width>a.maxWidth||a.width<a.minWidth)&&(a.left=a.oldLeft),(a.height>a.maxHeight||a.height<a.minHeight)&&(a.top=a.oldTop),a.width=Math.min(Math.max(a.width,a.minWidth),a.maxWidth),a.height=Math.min(Math.max(a.height,a.minHeight),a.maxHeight),this.limitCropBox(!1,!0),a.left=Math.min(Math.max(a.left,a.minLeft),a.maxLeft),a.top=Math.min(Math.max(a.top,a.minTop),a.maxTop),a.oldLeft=a.left,a.oldTop=a.top,t.movable&&t.cropBoxMovable&&st(this.face,Z,a.width>=i.width&&a.height>=i.height?Y:L),Ne(this.cropBox,he({width:a.width,height:a.height},lt({translateX:a.left,translateY:a.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),rt(this.element,Se,this.getData())}},vi={initPreview:function(){var t=this.element,i=this.crossOrigin,a=this.options.preview,x=i?this.crossOriginUrl:this.url,d=t.alt||"The image to preview",A=document.createElement("img");if(i&&(A.crossOrigin=i),A.src=x,A.alt=d,this.viewBox.appendChild(A),this.viewBoxImage=A,!!a){var B=a;typeof a=="string"?B=t.ownerDocument.querySelectorAll(a):a.querySelector&&(B=[a]),this.previews=B,fe(B,function(U){var k=document.createElement("img");st(U,J,{width:U.offsetWidth,height:U.offsetHeight,html:U.innerHTML}),i&&(k.crossOrigin=i),k.src=x,k.alt=d,k.style.cssText='display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',U.innerHTML="",U.appendChild(k)})}},resetPreview:function(){fe(this.previews,function(t){var i=Lt(t,J);Ne(t,{width:i.width,height:i.height}),t.innerHTML=i.html,si(t,J)})},preview:function(){var t=this.imageData,i=this.canvasData,a=this.cropBoxData,x=a.width,d=a.height,A=t.width,B=t.height,U=a.left-i.left-t.left,k=a.top-i.top-t.top;!this.cropped||this.disabled||(Ne(this.viewBoxImage,he({width:A,height:B},lt(he({translateX:-U,translateY:-k},t)))),fe(this.previews,function(E){var _=Lt(E,J),O=_.width,ie=_.height,ae=O,ue=ie,le=1;x&&(le=O/x,ue=d*le),d&&ue>ie&&(le=ie/d,ae=x*le,ue=ie),Ne(E,{width:ae,height:ue}),Ne(E.getElementsByTagName("img")[0],he({width:A*le,height:B*le},lt(he({translateX:-U*le,translateY:-k*le},t))))}))}},Ci={bind:function(){var t=this.element,i=this.options,a=this.cropper;xe(i.cropstart)&&Ie(t,Tt,i.cropstart),xe(i.cropmove)&&Ie(t,Dt,i.cropmove),xe(i.cropend)&&Ie(t,ot,i.cropend),xe(i.crop)&&Ie(t,Se,i.crop),xe(i.zoom)&&Ie(t,kt,i.zoom),Ie(a,dr,this.onCropStart=this.cropStart.bind(this)),i.zoomable&&i.zoomOnWheel&&Ie(a,br,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),i.toggleDragModeOnDblclick&&Ie(a,ur,this.onDblclick=this.dblclick.bind(this)),Ie(t.ownerDocument,fr,this.onCropMove=this.cropMove.bind(this)),Ie(t.ownerDocument,pr,this.onCropEnd=this.cropEnd.bind(this)),i.responsive&&Ie(window,gr,this.onResize=this.resize.bind(this))},unbind:function(){var t=this.element,i=this.options,a=this.cropper;xe(i.cropstart)&&_e(t,Tt,i.cropstart),xe(i.cropmove)&&_e(t,Dt,i.cropmove),xe(i.cropend)&&_e(t,ot,i.cropend),xe(i.crop)&&_e(t,Se,i.crop),xe(i.zoom)&&_e(t,kt,i.zoom),_e(a,dr,this.onCropStart),i.zoomable&&i.zoomOnWheel&&_e(a,br,this.onWheel,{passive:!1,capture:!0}),i.toggleDragModeOnDblclick&&_e(a,ur,this.onDblclick),_e(t.ownerDocument,fr,this.onCropMove),_e(t.ownerDocument,pr,this.onCropEnd),i.responsive&&_e(window,gr,this.onResize)}},wi={resize:function(){if(!this.disabled){var t=this.options,i=this.container,a=this.containerData,x=i.offsetWidth/a.width,d=i.offsetHeight/a.height,A=Math.abs(x-1)>Math.abs(d-1)?x:d;if(A!==1){var B,U;t.restore&&(B=this.getCanvasData(),U=this.getCropBoxData()),this.render(),t.restore&&(this.setCanvasData(fe(B,function(k,E){B[E]=k*A})),this.setCropBoxData(fe(U,function(k,E){U[E]=k*A})))}}},dblclick:function(){this.disabled||this.options.dragMode===ze||this.setDragMode(ni(this.dragBox,te)?de:se)},wheel:function(t){var i=this,a=Number(this.options.wheelZoomRatio)||.1,x=1;this.disabled||(t.preventDefault(),!this.wheeling&&(this.wheeling=!0,setTimeout(function(){i.wheeling=!1},50),t.deltaY?x=t.deltaY>0?1:-1:t.wheelDelta?x=-t.wheelDelta/120:t.detail&&(x=t.detail>0?1:-1),this.zoom(-x*a,t)))},cropStart:function(t){var i=t.buttons,a=t.button;if(!(this.disabled||(t.type==="mousedown"||t.type==="pointerdown"&&t.pointerType==="mouse")&&(re(i)&&i!==1||re(a)&&a!==0||t.ctrlKey))){var x=this.options,d=this.pointers,A;t.changedTouches?fe(t.changedTouches,function(B){d[B.identifier]=vt(B)}):d[t.pointerId||0]=vt(t),Object.keys(d).length>1&&x.zoomable&&x.zoomOnTouch?A=X:A=Lt(t.target,Z),ja.test(A)&&rt(this.element,Tt,{originalEvent:t,action:A})!==!1&&(t.preventDefault(),this.action=A,this.cropping=!1,A===Q&&(this.cropping=!0,be(this.dragBox,F)))}},cropMove:function(t){var i=this.action;if(!(this.disabled||!i)){var a=this.pointers;t.preventDefault(),rt(this.element,Dt,{originalEvent:t,action:i})!==!1&&(t.changedTouches?fe(t.changedTouches,function(x){he(a[x.identifier]||{},vt(x,!0))}):he(a[t.pointerId||0]||{},vt(t,!0)),this.change(t))}},cropEnd:function(t){if(!this.disabled){var i=this.action,a=this.pointers;t.changedTouches?fe(t.changedTouches,function(x){delete a[x.identifier]}):delete a[t.pointerId||0],i&&(t.preventDefault(),Object.keys(a).length||(this.action=""),this.cropping&&(this.cropping=!1,tt(this.dragBox,F,this.cropped&&this.options.modal)),rt(this.element,ot,{originalEvent:t,action:i}))}}},Ii={change:function(t){var i=this.options,a=this.canvasData,x=this.containerData,d=this.cropBoxData,A=this.pointers,B=this.action,U=i.aspectRatio,k=d.left,E=d.top,_=d.width,O=d.height,ie=k+_,ae=E+O,ue=0,le=0,me=x.width,Ae=x.height,pe=!0,Le;!U&&t.shiftKey&&(U=_&&O?_/O:1),this.limited&&(ue=d.minLeft,le=d.minTop,me=ue+Math.min(x.width,a.width,a.left+a.width),Ae=le+Math.min(x.height,a.height,a.top+a.height));var we=A[Object.keys(A)[0]],H={x:we.endX-we.startX,y:we.endY-we.startY},ce=function(ye){switch(ye){case W:ie+H.x>me&&(H.x=me-ie);break;case N:k+H.x<ue&&(H.x=ue-k);break;case j:E+H.y<le&&(H.y=le-E);break;case V:ae+H.y>Ae&&(H.y=Ae-ae);break}};switch(B){case L:k+=H.x,E+=H.y;break;case W:if(H.x>=0&&(ie>=me||U&&(E<=le||ae>=Ae))){pe=!1;break}ce(W),_+=H.x,_<0&&(B=N,_=-_,k-=_),U&&(O=_/U,E+=(d.height-O)/2);break;case j:if(H.y<=0&&(E<=le||U&&(k<=ue||ie>=me))){pe=!1;break}ce(j),O-=H.y,E+=H.y,O<0&&(B=V,O=-O,E-=O),U&&(_=O*U,k+=(d.width-_)/2);break;case N:if(H.x<=0&&(k<=ue||U&&(E<=le||ae>=Ae))){pe=!1;break}ce(N),_-=H.x,k+=H.x,_<0&&(B=W,_=-_,k-=_),U&&(O=_/U,E+=(d.height-O)/2);break;case V:if(H.y>=0&&(ae>=Ae||U&&(k<=ue||ie>=me))){pe=!1;break}ce(V),O+=H.y,O<0&&(B=j,O=-O,E-=O),U&&(_=O*U,k+=(d.width-_)/2);break;case z:if(U){if(H.y<=0&&(E<=le||ie>=me)){pe=!1;break}ce(j),O-=H.y,E+=H.y,_=O*U}else ce(j),ce(W),H.x>=0?ie<me?_+=H.x:H.y<=0&&E<=le&&(pe=!1):_+=H.x,H.y<=0?E>le&&(O-=H.y,E+=H.y):(O-=H.y,E+=H.y);_<0&&O<0?(B=oe,O=-O,_=-_,E-=O,k-=_):_<0?(B=K,_=-_,k-=_):O<0&&(B=q,O=-O,E-=O);break;case K:if(U){if(H.y<=0&&(E<=le||k<=ue)){pe=!1;break}ce(j),O-=H.y,E+=H.y,_=O*U,k+=d.width-_}else ce(j),ce(N),H.x<=0?k>ue?(_-=H.x,k+=H.x):H.y<=0&&E<=le&&(pe=!1):(_-=H.x,k+=H.x),H.y<=0?E>le&&(O-=H.y,E+=H.y):(O-=H.y,E+=H.y);_<0&&O<0?(B=q,O=-O,_=-_,E-=O,k-=_):_<0?(B=z,_=-_,k-=_):O<0&&(B=oe,O=-O,E-=O);break;case oe:if(U){if(H.x<=0&&(k<=ue||ae>=Ae)){pe=!1;break}ce(N),_-=H.x,k+=H.x,O=_/U}else ce(V),ce(N),H.x<=0?k>ue?(_-=H.x,k+=H.x):H.y>=0&&ae>=Ae&&(pe=!1):(_-=H.x,k+=H.x),H.y>=0?ae<Ae&&(O+=H.y):O+=H.y;_<0&&O<0?(B=z,O=-O,_=-_,E-=O,k-=_):_<0?(B=q,_=-_,k-=_):O<0&&(B=K,O=-O,E-=O);break;case q:if(U){if(H.x>=0&&(ie>=me||ae>=Ae)){pe=!1;break}ce(W),_+=H.x,O=_/U}else ce(V),ce(W),H.x>=0?ie<me?_+=H.x:H.y>=0&&ae>=Ae&&(pe=!1):_+=H.x,H.y>=0?ae<Ae&&(O+=H.y):O+=H.y;_<0&&O<0?(B=K,O=-O,_=-_,E-=O,k-=_):_<0?(B=oe,_=-_,k-=_):O<0&&(B=z,O=-O,E-=O);break;case Y:this.move(H.x,H.y),pe=!1;break;case X:this.zoom(ci(A),t),pe=!1;break;case Q:if(!H.x||!H.y){pe=!1;break}Le=Er(this.cropper),k=we.startX-Le.left,E=we.startY-Le.top,_=d.minWidth,O=d.minHeight,H.x>0?B=H.y>0?q:z:H.x<0&&(k-=_,B=H.y>0?oe:K),H.y<0&&(E-=O),this.cropped||(Re(this.cropBox,R),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0));break}pe&&(d.width=_,d.height=O,d.left=k,d.top=E,this.action=B,this.renderCropBox()),fe(A,function(ge){ge.startX=ge.endX,ge.startY=ge.endY})}},yi={crop:function(){return this.ready&&!this.cropped&&!this.disabled&&(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&be(this.dragBox,F),Re(this.cropBox,R),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=he({},this.initialImageData),this.canvasData=he({},this.initialCanvasData),this.cropBoxData=he({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(he(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),Re(this.dragBox,F),be(this.cropBox,R)),this},replace:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return!this.disabled&&t&&(this.isImg&&(this.element.src=t),i?(this.url=t,this.image.src=t,this.ready&&(this.viewBoxImage.src=t,fe(this.previews,function(a){a.getElementsByTagName("img")[0].src=t}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(t))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,Re(this.cropper,I)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,be(this.cropper,I)),this},destroy:function(){var t=this.element;return t[M]?(t[M]=void 0,this.isImg&&this.replaced&&(t.src=this.originalUrl),this.uncreate(),this):this},move:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t,a=this.canvasData,x=a.left,d=a.top;return this.moveTo(Ft(t)?t:x+Number(t),Ft(i)?i:d+Number(i))},moveTo:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t,a=this.canvasData,x=!1;return t=Number(t),i=Number(i),this.ready&&!this.disabled&&this.options.movable&&(re(t)&&(a.left=t,x=!0),re(i)&&(a.top=i,x=!0),x&&this.renderCanvas(!0)),this},zoom:function(t,i){var a=this.canvasData;return t=Number(t),t<0?t=1/(1-t):t=1+t,this.zoomTo(a.width*t/a.naturalWidth,null,i)},zoomTo:function(t,i,a){var x=this.options,d=this.canvasData,A=d.width,B=d.height,U=d.naturalWidth,k=d.naturalHeight;if(t=Number(t),t>=0&&this.ready&&!this.disabled&&x.zoomable){var E=U*t,_=k*t;if(rt(this.element,kt,{ratio:t,oldRatio:A/U,originalEvent:a})===!1)return this;if(a){var O=this.pointers,ie=Er(this.cropper),ae=O&&Object.keys(O).length?hi(O):{pageX:a.pageX,pageY:a.pageY};d.left-=(E-A)*((ae.pageX-ie.left-d.left)/A),d.top-=(_-B)*((ae.pageY-ie.top-d.top)/B)}else Je(i)&&re(i.x)&&re(i.y)?(d.left-=(E-A)*((i.x-d.left)/A),d.top-=(_-B)*((i.y-d.top)/B)):(d.left-=(E-A)/2,d.top-=(_-B)/2);d.width=E,d.height=_,this.renderCanvas(!0)}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t))},rotateTo:function(t){return t=Number(t),re(t)&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=t%360,this.renderCanvas(!0,!0)),this},scaleX:function(t){var i=this.imageData.scaleY;return this.scale(t,re(i)?i:1)},scaleY:function(t){var i=this.imageData.scaleX;return this.scale(re(i)?i:1,t)},scale:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t,a=this.imageData,x=!1;return t=Number(t),i=Number(i),this.ready&&!this.disabled&&this.options.scalable&&(re(t)&&(a.scaleX=t,x=!0),re(i)&&(a.scaleY=i,x=!0),x&&this.renderCanvas(!0,!0)),this},getData:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,i=this.options,a=this.imageData,x=this.canvasData,d=this.cropBoxData,A;if(this.ready&&this.cropped){A={x:d.left-x.left,y:d.top-x.top,width:d.width,height:d.height};var B=a.width/a.naturalWidth;if(fe(A,function(E,_){A[_]=E/B}),t){var U=Math.round(A.y+A.height),k=Math.round(A.x+A.width);A.x=Math.round(A.x),A.y=Math.round(A.y),A.width=k-A.x,A.height=U-A.y}}else A={x:0,y:0,width:0,height:0};return i.rotatable&&(A.rotate=a.rotate||0),i.scalable&&(A.scaleX=a.scaleX||1,A.scaleY=a.scaleY||1),A},setData:function(t){var i=this.options,a=this.imageData,x=this.canvasData,d={};if(this.ready&&!this.disabled&&Je(t)){var A=!1;i.rotatable&&re(t.rotate)&&t.rotate!==a.rotate&&(a.rotate=t.rotate,A=!0),i.scalable&&(re(t.scaleX)&&t.scaleX!==a.scaleX&&(a.scaleX=t.scaleX,A=!0),re(t.scaleY)&&t.scaleY!==a.scaleY&&(a.scaleY=t.scaleY,A=!0)),A&&this.renderCanvas(!0,!0);var B=a.width/a.naturalWidth;re(t.x)&&(d.left=t.x*B+x.left),re(t.y)&&(d.top=t.y*B+x.top),re(t.width)&&(d.width=t.width*B),re(t.height)&&(d.height=t.height*B),this.setCropBoxData(d)}return this},getContainerData:function(){return this.ready?he({},this.containerData):{}},getImageData:function(){return this.sized?he({},this.imageData):{}},getCanvasData:function(){var t=this.canvasData,i={};return this.ready&&fe(["left","top","width","height","naturalWidth","naturalHeight"],function(a){i[a]=t[a]}),i},setCanvasData:function(t){var i=this.canvasData,a=i.aspectRatio;return this.ready&&!this.disabled&&Je(t)&&(re(t.left)&&(i.left=t.left),re(t.top)&&(i.top=t.top),re(t.width)?(i.width=t.width,i.height=t.width/a):re(t.height)&&(i.height=t.height,i.width=t.height*a),this.renderCanvas(!0)),this},getCropBoxData:function(){var t=this.cropBoxData,i;return this.ready&&this.cropped&&(i={left:t.left,top:t.top,width:t.width,height:t.height}),i||{}},setCropBoxData:function(t){var i=this.cropBoxData,a=this.options.aspectRatio,x,d;return this.ready&&this.cropped&&!this.disabled&&Je(t)&&(re(t.left)&&(i.left=t.left),re(t.top)&&(i.top=t.top),re(t.width)&&t.width!==i.width&&(x=!0,i.width=t.width),re(t.height)&&t.height!==i.height&&(d=!0,i.height=t.height),a&&(x?i.height=i.width/a:d&&(i.width=i.height*a)),this.renderCropBox()),this},getCroppedCanvas:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var i=this.canvasData,a=di(this.image,this.imageData,i,t);if(!this.cropped)return a;var x=this.getData(t.rounded),d=x.x,A=x.y,B=x.width,U=x.height,k=a.width/Math.floor(i.naturalWidth);k!==1&&(d*=k,A*=k,B*=k,U*=k);var E=B/U,_=Ge({aspectRatio:E,width:t.maxWidth||1/0,height:t.maxHeight||1/0}),O=Ge({aspectRatio:E,width:t.minWidth||0,height:t.minHeight||0},"cover"),ie=Ge({aspectRatio:E,width:t.width||(k!==1?a.width:B),height:t.height||(k!==1?a.height:U)}),ae=ie.width,ue=ie.height;ae=Math.min(_.width,Math.max(O.width,ae)),ue=Math.min(_.height,Math.max(O.height,ue));var le=document.createElement("canvas"),me=le.getContext("2d");le.width=et(ae),le.height=et(ue),me.fillStyle=t.fillColor||"transparent",me.fillRect(0,0,ae,ue);var Ae=t.imageSmoothingEnabled,pe=Ae===void 0?!0:Ae,Le=t.imageSmoothingQuality;me.imageSmoothingEnabled=pe,Le&&(me.imageSmoothingQuality=Le);var we=a.width,H=a.height,ce=d,ge=A,ye,Ue,We,Ye,Qe,De;ce<=-B||ce>we?(ce=0,ye=0,We=0,Qe=0):ce<=0?(We=-ce,ce=0,ye=Math.min(we,B+ce),Qe=ye):ce<=we&&(We=0,ye=Math.min(B,we-ce),Qe=ye),ye<=0||ge<=-U||ge>H?(ge=0,Ue=0,Ye=0,De=0):ge<=0?(Ye=-ge,ge=0,Ue=Math.min(H,U+ge),De=Ue):ge<=H&&(Ye=0,Ue=Math.min(U,H-ge),De=Ue);var ve=[ce,ge,ye,Ue];if(Qe>0&&De>0){var je=ae/B;ve.push(We*je,Ye*je,Qe*je,De*je)}return me.drawImage.apply(me,[a].concat(p(ve.map(function(Ct){return Math.floor(et(Ct))})))),le},setAspectRatio:function(t){var i=this.options;return!this.disabled&&!Ft(t)&&(i.aspectRatio=Math.max(0,t)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(t){var i=this.options,a=this.dragBox,x=this.face;if(this.ready&&!this.disabled){var d=t===se,A=i.movable&&t===de;t=d||A?t:ze,i.dragMode=t,st(a,Z,t),tt(a,te,d),tt(a,ee,A),i.cropBoxMovable||(st(x,Z,t),tt(x,te,d),tt(x,ee,A))}return this}},Bi=C.Cropper,Sr=function(){function s(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(o(this,s),!t||!Ka.test(t.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,this.options=he({},Cr,Je(i)&&i),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return b(s,[{key:"init",value:function(){var i=this.element,a=i.tagName.toLowerCase(),x;if(!i[M]){if(i[M]=this,a==="img"){if(this.isImg=!0,x=i.getAttribute("src")||"",this.originalUrl=x,!x)return;x=i.src}else a==="canvas"&&window.HTMLCanvasElement&&(x=i.toDataURL());this.load(x)}}},{key:"load",value:function(i){var a=this;if(i){this.url=i,this.imageData={};var x=this.element,d=this.options;if(!d.rotatable&&!d.scalable&&(d.checkOrientation=!1),!d.checkOrientation||!window.ArrayBuffer){this.clone();return}if(qa.test(i)){Za.test(i)?this.read(mi(i)):this.clone();return}var A=new XMLHttpRequest,B=this.clone.bind(this);this.reloading=!0,this.xhr=A,A.onabort=B,A.onerror=B,A.ontimeout=B,A.onprogress=function(){A.getResponseHeader("content-type")!==Ar&&A.abort()},A.onload=function(){a.read(A.response)},A.onloadend=function(){a.reloading=!1,a.xhr=null},d.checkCrossOrigin&&_r(i)&&x.crossOrigin&&(i=Mr(i)),A.open("GET",i,!0),A.responseType="arraybuffer",A.withCredentials=x.crossOrigin==="use-credentials",A.send()}}},{key:"read",value:function(i){var a=this.options,x=this.imageData,d=bi(i),A=0,B=1,U=1;if(d>1){this.url=gi(i,Ar);var k=Ai(d);A=k.rotate,B=k.scaleX,U=k.scaleY}a.rotatable&&(x.rotate=A),a.scalable&&(x.scaleX=B,x.scaleY=U),this.clone()}},{key:"clone",value:function(){var i=this.element,a=this.url,x=i.crossOrigin,d=a;this.options.checkCrossOrigin&&_r(a)&&(x||(x="anonymous"),d=Mr(a)),this.crossOrigin=x,this.crossOriginUrl=d;var A=document.createElement("img");x&&(A.crossOrigin=x),A.src=d||a,A.alt=i.alt||"The image to crop",this.image=A,A.onload=this.start.bind(this),A.onerror=this.stop.bind(this),be(A,T),i.parentNode.insertBefore(A,i.nextSibling)}},{key:"start",value:function(){var i=this,a=this.image;a.onload=null,a.onerror=null,this.sizing=!0;var x=C.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(C.navigator.userAgent),d=function(k,E){he(i.imageData,{naturalWidth:k,naturalHeight:E,aspectRatio:k/E}),i.initialImageData=he({},i.imageData),i.sizing=!1,i.sized=!0,i.build()};if(a.naturalWidth&&!x){d(a.naturalWidth,a.naturalHeight);return}var A=document.createElement("img"),B=document.body||document.documentElement;this.sizingImage=A,A.onload=function(){d(A.width,A.height),x||B.removeChild(A)},A.src=a.src,x||(A.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",B.appendChild(A))}},{key:"stop",value:function(){var i=this.image;i.onload=null,i.onerror=null,i.parentNode.removeChild(i),this.image=null}},{key:"build",value:function(){if(!(!this.sized||this.ready)){var i=this.element,a=this.options,x=this.image,d=i.parentNode,A=document.createElement("div");A.innerHTML=Ja;var B=A.querySelector(".".concat(M,"-container")),U=B.querySelector(".".concat(M,"-canvas")),k=B.querySelector(".".concat(M,"-drag-box")),E=B.querySelector(".".concat(M,"-crop-box")),_=E.querySelector(".".concat(M,"-face"));this.container=d,this.cropper=B,this.canvas=U,this.dragBox=k,this.cropBox=E,this.viewBox=B.querySelector(".".concat(M,"-view-box")),this.face=_,U.appendChild(x),be(i,R),d.insertBefore(B,i.nextSibling),Re(x,T),this.initPreview(),this.bind(),a.initialAspectRatio=Math.max(0,a.initialAspectRatio)||NaN,a.aspectRatio=Math.max(0,a.aspectRatio)||NaN,a.viewMode=Math.max(0,Math.min(3,Math.round(a.viewMode)))||0,be(E,R),a.guides||be(E.getElementsByClassName("".concat(M,"-dashed")),R),a.center||be(E.getElementsByClassName("".concat(M,"-center")),R),a.background&&be(B,"".concat(M,"-bg")),a.highlight||be(_,G),a.cropBoxMovable&&(be(_,ee),st(_,Z,L)),a.cropBoxResizable||(be(E.getElementsByClassName("".concat(M,"-line")),R),be(E.getElementsByClassName("".concat(M,"-point")),R)),this.render(),this.ready=!0,this.setDragMode(a.dragMode),a.autoCrop&&this.crop(),this.setData(a.data),xe(a.ready)&&Ie(i,mr,a.ready,{once:!0}),rt(i,mr)}}},{key:"unbuild",value:function(){if(this.ready){this.ready=!1,this.unbind(),this.resetPreview();var i=this.cropper.parentNode;i&&i.removeChild(this.cropper),Re(this.element,R)}}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=Bi,s}},{key:"setDefaults",value:function(i){he(Cr,Je(i)&&i)}}]),s}();return he(Sr.prototype,xi,vi,Ci,wi,Ii,yi),Sr})});var Ta=Qt((Da,nr)=>{(function(e){if(typeof Da=="object"&&typeof nr!="undefined")nr.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r;typeof window!="undefined"?r=window:typeof global!="undefined"?r=global:typeof self!="undefined"?r=self:r=this,r.pica=e()}})(function(){var e,r,n;return function(){function o(u,b,m){function p(h,v){if(!b[h]){if(!u[h]){var c=typeof ct=="function"&&ct;if(!v&&c)return c(h,!0);if(l)return l(h,!0);var g=new Error("Cannot find module '"+h+"'");throw g.code="MODULE_NOT_FOUND",g}var P=b[h]={exports:{}};u[h][0].call(P.exports,function(w){var C=u[h][1][w];return p(C||w)},P,P.exports,o,u,b,m)}return b[h].exports}for(var l=typeof ct=="function"&&ct,f=0;f<m.length;f++)p(m[f]);return p}return o}()({1:[function(o,u,b){"use strict";var m=o("multimath"),p=o("./mm_unsharp_mask"),l=o("./mm_resize");function f(h){var v=h||[],c={js:v.indexOf("js")>=0,wasm:v.indexOf("wasm")>=0};m.call(this,c),this.features={js:c.js,wasm:c.wasm&&this.has_wasm()},this.use(p),this.use(l)}f.prototype=Object.create(m.prototype),f.prototype.constructor=f,f.prototype.resizeAndUnsharp=function(v,c){var g=this.resize(v,c);return v.unsharpAmount&&this.unsharp_mask(g,v.toWidth,v.toHeight,v.unsharpAmount,v.unsharpRadius,v.unsharpThreshold),g},u.exports=f},{"./mm_resize":4,"./mm_unsharp_mask":9,multimath:19}],2:[function(o,u,b){"use strict";function m(c){return c<0?0:c>255?255:c}function p(c){return c>=0?c:0}function l(c,g,P,w,C,S){var D,M,L,Q,Y,X,W,N,V,j,z,K=0,q=0;for(V=0;V<w;V++){for(Y=0,j=0;j<C;j++){for(X=S[Y++],W=S[Y++],N=K+X*4|0,D=M=L=Q=0;W>0;W--)z=S[Y++],Q=Q+z*c[N+3]|0,L=L+z*c[N+2]|0,M=M+z*c[N+1]|0,D=D+z*c[N]|0,N=N+4|0;g[q+3]=p(Q>>7),g[q+2]=p(L>>7),g[q+1]=p(M>>7),g[q]=p(D>>7),q=q+w*4|0}q=(V+1)*4|0,K=(V+1)*P*4|0}}function f(c,g,P,w,C,S){var D,M,L,Q,Y,X,W,N,V,j,z,K=0,q=0;for(V=0;V<w;V++){for(Y=0,j=0;j<C;j++){for(X=S[Y++],W=S[Y++],N=K+X*4|0,D=M=L=Q=0;W>0;W--)z=S[Y++],Q=Q+z*c[N+3]|0,L=L+z*c[N+2]|0,M=M+z*c[N+1]|0,D=D+z*c[N]|0,N=N+4|0;D>>=7,M>>=7,L>>=7,Q>>=7,g[q+3]=m(Q+8192>>14),g[q+2]=m(L+8192>>14),g[q+1]=m(M+8192>>14),g[q]=m(D+8192>>14),q=q+w*4|0}q=(V+1)*4|0,K=(V+1)*P*4|0}}function h(c,g,P,w,C,S){var D,M,L,Q,Y,X,W,N,V,j,z,K,q=0,oe=0;for(j=0;j<w;j++){for(X=0,z=0;z<C;z++){for(W=S[X++],N=S[X++],V=q+W*4|0,D=M=L=Q=0;N>0;N--)K=S[X++],Y=c[V+3],Q=Q+K*Y|0,L=L+K*c[V+2]*Y|0,M=M+K*c[V+1]*Y|0,D=D+K*c[V]*Y|0,V=V+4|0;L=L/255|0,M=M/255|0,D=D/255|0,g[oe+3]=p(Q>>7),g[oe+2]=p(L>>7),g[oe+1]=p(M>>7),g[oe]=p(D>>7),oe=oe+w*4|0}oe=(j+1)*4|0,q=(j+1)*P*4|0}}function v(c,g,P,w,C,S){var D,M,L,Q,Y,X,W,N,V,j,z,K=0,q=0;for(V=0;V<w;V++){for(Y=0,j=0;j<C;j++){for(X=S[Y++],W=S[Y++],N=K+X*4|0,D=M=L=Q=0;W>0;W--)z=S[Y++],Q=Q+z*c[N+3]|0,L=L+z*c[N+2]|0,M=M+z*c[N+1]|0,D=D+z*c[N]|0,N=N+4|0;D>>=7,M>>=7,L>>=7,Q>>=7,Q=m(Q+8192>>14),Q>0&&(D=D*255/Q|0,M=M*255/Q|0,L=L*255/Q|0),g[q+3]=Q,g[q+2]=m(L+8192>>14),g[q+1]=m(M+8192>>14),g[q]=m(D+8192>>14),q=q+w*4|0}q=(V+1)*4|0,K=(V+1)*P*4|0}}u.exports={convolveHor:l,convolveVert:f,convolveHorWithPre:h,convolveVertWithPre:v}},{}],3:[function(o,u,b){"use strict";u.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL"},{}],4:[function(o,u,b){"use strict";u.exports={name:"resize",fn:o("./resize"),wasm_fn:o("./resize_wasm"),wasm_src:o("./convolve_wasm_base64")}},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(o,u,b){"use strict";var m=o("./resize_filter_gen"),p=o("./convolve"),l=p.convolveHor,f=p.convolveVert,h=p.convolveHorWithPre,v=p.convolveVertWithPre;function c(P,w,C){for(var S=3,D=w*C*4|0;S<D;){if(P[S]!==255)return!0;S=S+4|0}return!1}function g(P,w,C){for(var S=3,D=w*C*4|0;S<D;)P[S]=255,S=S+4|0}u.exports=function(w){var C=w.src,S=w.width,D=w.height,M=w.toWidth,L=w.toHeight,Q=w.scaleX||w.toWidth/w.width,Y=w.scaleY||w.toHeight/w.height,X=w.offsetX||0,W=w.offsetY||0,N=w.dest||new Uint8Array(M*L*4),V=typeof w.filter=="undefined"?"mks2013":w.filter,j=m(V,S,M,Q,X),z=m(V,D,L,Y,W),K=new Uint16Array(M*D*4);return c(C,S,D)?(h(C,K,S,D,M,j),v(K,N,D,M,L,z)):(l(C,K,S,D,M,j),f(K,N,D,M,L,z),g(N,M,L)),N}},{"./convolve":2,"./resize_filter_gen":6}],6:[function(o,u,b){"use strict";var m=o("./resize_filter_info"),p=14;function l(f){return Math.round(f*((1<<p)-1))}u.exports=function(h,v,c,g,P){var w=m.filter[h].fn,C=1/g,S=Math.min(1,g),D=m.filter[h].win/S,M,L,Q,Y,X,W,N,V,j,z,K,q,oe,te,I,R,T,G=Math.floor((D+1)*2),F=new Int16Array((G+2)*c),ee=0,Z=!F.subarray||!F.set;for(M=0;M<c;M++){for(L=(M+.5)*C+P,Q=Math.max(0,Math.floor(L-D)),Y=Math.min(v-1,Math.ceil(L+D)),X=Y-Q+1,W=new Float32Array(X),N=new Int16Array(X),V=0,j=Q,z=0;j<=Y;j++,z++)K=w((j+.5-L)*S),V+=K,W[z]=K;for(q=0,z=0;z<W.length;z++)oe=W[z]/V,q+=oe,N[z]=l(oe);for(N[c>>1]+=l(1-q),te=0;te<N.length&&N[te]===0;)te++;if(te<N.length){for(I=N.length-1;I>0&&N[I]===0;)I--;if(R=Q+te,T=I-te+1,F[ee++]=R,F[ee++]=T,!Z)F.set(N.subarray(te,I+1),ee),ee+=T;else for(z=te;z<=I;z++)F[ee++]=N[z]}else F[ee++]=0,F[ee++]=0}return F}},{"./resize_filter_info":7}],7:[function(o,u,b){"use strict";var m={box:{win:.5,fn:function(l){return l<0&&(l=-l),l<.5?1:0}},hamming:{win:1,fn:function(l){if(l<0&&(l=-l),l>=1)return 0;if(l<11920929e-14)return 1;var f=l*Math.PI;return Math.sin(f)/f*(.54+.46*Math.cos(f/1))}},lanczos2:{win:2,fn:function(l){if(l<0&&(l=-l),l>=2)return 0;if(l<11920929e-14)return 1;var f=l*Math.PI;return Math.sin(f)/f*Math.sin(f/2)/(f/2)}},lanczos3:{win:3,fn:function(l){if(l<0&&(l=-l),l>=3)return 0;if(l<11920929e-14)return 1;var f=l*Math.PI;return Math.sin(f)/f*Math.sin(f/3)/(f/3)}},mks2013:{win:2.5,fn:function(l){return l<0&&(l=-l),l>=2.5?0:l>=1.5?-.125*(l-2.5)*(l-2.5):l>=.5?.25*(4*l*l-11*l+7):1.0625-1.75*l*l}}};u.exports={filter:m,f2q:{box:0,hamming:1,lanczos2:2,lanczos3:3},q2f:["box","hamming","lanczos2","lanczos3"]}},{}],8:[function(o,u,b){"use strict";var m=o("./resize_filter_gen");function p(c,g,P){for(var w=3,C=g*P*4|0;w<C;){if(c[w]!==255)return!0;w=w+4|0}return!1}function l(c,g,P){for(var w=3,C=g*P*4|0;w<C;)c[w]=255,w=w+4|0}function f(c){return new Uint8Array(c.buffer,0,c.byteLength)}var h=!0;try{h=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1}catch(c){}function v(c,g,P){if(h){g.set(f(c),P);return}for(var w=P,C=0;C<c.length;C++){var S=c[C];g[w++]=S&255,g[w++]=S>>8&255}}u.exports=function(g){var P=g.src,w=g.width,C=g.height,S=g.toWidth,D=g.toHeight,M=g.scaleX||g.toWidth/g.width,L=g.scaleY||g.toHeight/g.height,Q=g.offsetX||0,Y=g.offsetY||0,X=g.dest||new Uint8Array(S*D*4),W=typeof g.filter=="undefined"?"mks2013":g.filter,N=m(W,w,S,M,Q),V=m(W,C,D,L,Y),j=0,z=Math.max(P.byteLength,X.byteLength),K=this.__align(j+z),q=C*S*4*2,oe=this.__align(K+q),te=this.__align(oe+N.byteLength),I=te+V.byteLength,R=this.__instance("resize",I),T=new Uint8Array(this.__memory.buffer),G=new Uint32Array(this.__memory.buffer),F=new Uint32Array(P.buffer);G.set(F),v(N,T,oe),v(V,T,te);var ee=R.exports.convolveHV||R.exports._convolveHV;p(P,w,C)?ee(oe,te,K,w,C,S,D,1):(ee(oe,te,K,w,C,S,D,0),l(X,S,D));var Z=new Uint32Array(X.buffer);return Z.set(new Uint32Array(this.__memory.buffer,0,D*S)),X}},{"./resize_filter_gen":6}],9:[function(o,u,b){"use strict";u.exports={name:"unsharp_mask",fn:o("./unsharp_mask"),wasm_fn:o("./unsharp_mask_wasm"),wasm_src:o("./unsharp_mask_wasm_base64")}},{"./unsharp_mask":10,"./unsharp_mask_wasm":11,"./unsharp_mask_wasm_base64":12}],10:[function(o,u,b){"use strict";var m=o("glur/mono16");function p(l,f,h){for(var v=f*h,c=new Uint16Array(v),g,P,w,C,S=0;S<v;S++)g=l[4*S],P=l[4*S+1],w=l[4*S+2],C=g>=P&&g>=w?g:P>=w&&P>=g?P:w,c[S]=C<<8;return c}u.exports=function(f,h,v,c,g,P){var w,C,S,D,M;if(!(c===0||g<.5)){g>2&&(g=2);var L=p(f,h,v),Q=new Uint16Array(L);m(Q,h,v,g);for(var Y=c/100*4096+.5|0,X=P<<8,W=h*v,N=0;N<W;N++)w=L[N],D=w-Q[N],Math.abs(D)>=X&&(C=w+(Y*D+2048>>12),C=C>65280?65280:C,C=C<0?0:C,w=w!==0?w:1,S=(C<<12)/w|0,M=N*4,f[M]=f[M]*S+2048>>12,f[M+1]=f[M+1]*S+2048>>12,f[M+2]=f[M+2]*S+2048>>12)}}},{"glur/mono16":18}],11:[function(o,u,b){"use strict";u.exports=function(p,l,f,h,v,c){if(!(h===0||v<.5)){v>2&&(v=2);var g=l*f,P=g*4,w=g*2,C=g*2,S=Math.max(l,f)*4,D=8*4,M=0,L=P,Q=L+w,Y=Q+C,X=Y+C,W=X+S,N=this.__instance("unsharp_mask",P+w+C*2+S+D,{exp:Math.exp}),V=new Uint32Array(p.buffer),j=new Uint32Array(this.__memory.buffer);j.set(V);var z=N.exports.hsv_v16||N.exports._hsv_v16;z(M,L,l,f),z=N.exports.blurMono16||N.exports._blurMono16,z(L,Q,Y,X,W,l,f,v),z=N.exports.unsharp||N.exports._unsharp,z(M,M,L,Q,l,f,h,c),V.set(new Uint32Array(this.__memory.buffer,0,g))}}},{}],12:[function(o,u,b){"use strict";u.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"},{}],13:[function(o,u,b){"use strict";var m=100;function p(l,f){this.create=l,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=f||2e3}p.prototype.acquire=function(){var l=this,f;return this.available.length!==0?f=this.available.pop():(f=this.create(),f.id=this.lastId++,f.release=function(){return l.release(f)}),this.acquired[f.id]=f,f},p.prototype.release=function(l){var f=this;delete this.acquired[l.id],l.lastUsed=Date.now(),this.available.push(l),this.timeoutId===0&&(this.timeoutId=setTimeout(function(){return f.gc()},m))},p.prototype.gc=function(){var l=this,f=Date.now();this.available=this.available.filter(function(h){return f-h.lastUsed>l.idle?(h.destroy(),!1):!0}),this.available.length!==0?this.timeoutId=setTimeout(function(){return l.gc()},m):this.timeoutId=0},u.exports=p},{}],14:[function(o,u,b){"use strict";var m=2;u.exports=function(l,f,h,v,c,g){var P=h/l,w=v/f,C=(2*g+m+1)/c;if(C>.5)return[[h,v]];var S=Math.ceil(Math.log(Math.min(P,w))/Math.log(C));if(S<=1)return[[h,v]];for(var D=[],M=0;M<S;M++){var L=Math.round(Math.pow(Math.pow(l,S-M-1)*Math.pow(h,M+1),1/S)),Q=Math.round(Math.pow(Math.pow(f,S-M-1)*Math.pow(v,M+1),1/S));D.push([L,Q])}return D}},{}],15:[function(o,u,b){"use strict";var m=1e-5;function p(f){var h=Math.round(f);return Math.abs(f-h)<m?h:Math.floor(f)}function l(f){var h=Math.round(f);return Math.abs(f-h)<m?h:Math.ceil(f)}u.exports=function(h){var v=h.toWidth/h.width,c=h.toHeight/h.height,g=p(h.srcTileSize*v)-2*h.destTileBorder,P=p(h.srcTileSize*c)-2*h.destTileBorder;if(g<1||P<1)throw new Error("Internal error in pica: target tile width/height is too small.");var w,C,S,D,M,L,Q=[],Y;for(D=0;D<h.toHeight;D+=P)for(S=0;S<h.toWidth;S+=g)w=S-h.destTileBorder,w<0&&(w=0),M=S+g+h.destTileBorder-w,w+M>=h.toWidth&&(M=h.toWidth-w),C=D-h.destTileBorder,C<0&&(C=0),L=D+P+h.destTileBorder-C,C+L>=h.toHeight&&(L=h.toHeight-C),Y={toX:w,toY:C,toWidth:M,toHeight:L,toInnerX:S,toInnerY:D,toInnerWidth:g,toInnerHeight:P,offsetX:w/v-p(w/v),offsetY:C/c-p(C/c),scaleX:v,scaleY:c,x:p(w/v),y:p(C/c),width:l(M/v),height:l(L/c)},Q.push(Y);return Q}},{}],16:[function(o,u,b){"use strict";function m(p){return Object.prototype.toString.call(p)}u.exports.isCanvas=function(l){var f=m(l);return f==="[object HTMLCanvasElement]"||f==="[object OffscreenCanvas]"||f==="[object Canvas]"},u.exports.isImage=function(l){return m(l)==="[object HTMLImageElement]"},u.exports.isImageBitmap=function(l){return m(l)==="[object ImageBitmap]"},u.exports.limiter=function(l){var f=0,h=[];function v(){f<l&&h.length&&(f++,h.shift()())}return function(g){return new Promise(function(P,w){h.push(function(){g().then(function(C){P(C),f--,v()},function(C){w(C),f--,v()})}),v()})}},u.exports.cib_quality_name=function(l){switch(l){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"},u.exports.cib_support=function(l){return Promise.resolve().then(function(){if(typeof createImageBitmap=="undefined")return!1;var f=l(100,100);return createImageBitmap(f,0,0,100,100,{resizeWidth:10,resizeHeight:10,resizeQuality:"high"}).then(function(h){var v=h.width===10;return h.close(),f=null,v})}).catch(function(){return!1})},u.exports.worker_offscreen_canvas_support=function(){return new Promise(function(l,f){if(typeof OffscreenCanvas=="undefined"){l(!1);return}function h(g){if(typeof createImageBitmap=="undefined"){g.postMessage(!1);return}Promise.resolve().then(function(){var P=new OffscreenCanvas(10,10),w=P.getContext("2d");return w.rect(0,0,1,1),createImageBitmap(P,0,0,1,1)}).then(function(){return g.postMessage(!0)},function(){return g.postMessage(!1)})}var v=btoa("(".concat(h.toString(),")(self);")),c=new Worker("data:text/javascript;base64,".concat(v));c.onmessage=function(g){return l(g.data)},c.onerror=f}).then(function(l){return l},function(){return!1})},u.exports.can_use_canvas=function(l){var f=!1;try{var h=l(2,1),v=h.getContext("2d"),c=v.createImageData(2,1);c.data[0]=12,c.data[1]=23,c.data[2]=34,c.data[3]=255,c.data[4]=45,c.data[5]=56,c.data[6]=67,c.data[7]=255,v.putImageData(c,0,0),c=null,c=v.getImageData(0,0,2,1),c.data[0]===12&&c.data[1]===23&&c.data[2]===34&&c.data[3]===255&&c.data[4]===45&&c.data[5]===56&&c.data[6]===67&&c.data[7]===255&&(f=!0)}catch(g){}return f},u.exports.cib_can_use_region=function(){return new Promise(function(l){if(typeof Image=="undefined"||typeof createImageBitmap=="undefined"){l(!1);return}var f=new Image;f.src="data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z",f.onload=function(){createImageBitmap(f,0,0,f.width,f.height).then(function(h){h.width===f.width&&h.height===f.height?l(!0):l(!1)},function(){return l(!1)})},f.onerror=function(){return l(!1)}})}},{}],17:[function(o,u,b){"use strict";u.exports=function(){var m=o("./mathlib"),p;onmessage=function(f){var h=f.data.opts,v=!1;if(!h.src&&h.srcBitmap){var c=new OffscreenCanvas(h.width,h.height),g=c.getContext("2d");g.drawImage(h.srcBitmap,0,0),h.src=g.getImageData(0,0,h.width,h.height).data,c.width=c.height=0,c=null,h.srcBitmap.close(),h.srcBitmap=null}p||(p=new m(f.data.features));var P=p.resizeAndUnsharp(h);if(v){var w=new ImageData(new Uint8ClampedArray(P),h.toWidth,h.toHeight),C=new OffscreenCanvas(h.toWidth,h.toHeight),S=C.getContext("2d");S.putImageData(w,0,0),createImageBitmap(C).then(function(D){postMessage({bitmap:D},[D])})}else postMessage({data:P},[P.buffer])}}},{"./mathlib":1}],18:[function(o,u,b){var m,p,l,f,h,v,c,g;function P(S){S<.5&&(S=.5);var D=Math.exp(.726*.726)/S,M=Math.exp(-D),L=Math.exp(-2*D),Q=(1-M)*(1-M)/(1+2*D*M-L);return m=Q,p=Q*(D-1)*M,l=Q*(D+1)*M,f=-Q*L,h=2*M,v=-L,c=(m+p)/(1-h-v),g=(l+f)/(1-h-v),new Float32Array([m,p,l,f,h,v,c,g])}function w(S,D,M,L,Q,Y){var X,W,N,V,j,z,K,q,oe,te,I,R,T,G;for(oe=0;oe<Y;oe++){for(z=oe*Q,K=oe,q=0,X=S[z],j=X*L[6],V=j,I=L[0],R=L[1],T=L[4],G=L[5],te=0;te<Q;te++)W=S[z],N=W*I+X*R+V*T+j*G,j=V,V=N,X=W,M[q]=V,q++,z++;for(z--,q--,K+=Y*(Q-1),X=S[z],j=X*L[7],V=j,W=X,I=L[2],R=L[3],te=Q-1;te>=0;te--)N=W*I+X*R+V*T+j*G,j=V,V=N,X=W,W=S[z],D[K]=M[q]+V,z--,q--,K-=Y}}function C(S,D,M,L){if(L){var Q=new Uint16Array(S.length),Y=new Float32Array(Math.max(D,M)),X=P(L);w(S,Q,Y,X,D,M,L),w(Q,S,Y,X,M,D,L)}}u.exports=C},{}],19:[function(o,u,b){"use strict";var m=o("object-assign"),p=o("./lib/base64decode"),l=o("./lib/wa_detect"),f={js:!0,wasm:!0};function h(v){if(!(this instanceof h))return new h(v);var c=m({},f,v||{});if(this.options=c,this.__cache={},this.__init_promise=null,this.__modules=c.modules||{},this.__memory=null,this.__wasm={},this.__isLE=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1,!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}h.prototype.has_wasm=l,h.prototype.use=function(v){return this.__modules[v.name]=v,this.options.wasm&&this.has_wasm()&&v.wasm_fn?this[v.name]=v.wasm_fn:this[v.name]=v.fn,this},h.prototype.init=function(){if(this.__init_promise)return this.__init_promise;if(!this.options.js&&this.options.wasm&&!this.has_wasm())return Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`));var v=this;return this.__init_promise=Promise.all(Object.keys(v.__modules).map(function(c){var g=v.__modules[c];return!v.options.wasm||!v.has_wasm()||!g.wasm_fn||v.__wasm[c]?null:WebAssembly.compile(v.__base64decode(g.wasm_src)).then(function(P){v.__wasm[c]=P})})).then(function(){return v}),this.__init_promise},h.prototype.__base64decode=p,h.prototype.__reallocate=function(c){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(c/(64*1024))}),this.__memory;var g=this.__memory.buffer.byteLength;return g<c&&this.__memory.grow(Math.ceil((c-g)/(64*1024))),this.__memory},h.prototype.__instance=function(c,g,P){if(g&&this.__reallocate(g),!this.__wasm[c]){var w=this.__modules[c];this.__wasm[c]=new WebAssembly.Module(this.__base64decode(w.wasm_src))}if(!this.__cache[c]){var C={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[c]=new WebAssembly.Instance(this.__wasm[c],{env:m(C,P||{})})}return this.__cache[c]},h.prototype.__align=function(c,g){g=g||8;var P=c%g;return c+(P?g-P:0)},u.exports=h},{"./lib/base64decode":20,"./lib/wa_detect":21,"object-assign":22}],20:[function(o,u,b){"use strict";var m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";u.exports=function(l){for(var f=l.replace(/[\r\n=]/g,""),h=f.length,v=new Uint8Array(h*3>>2),c=0,g=0,P=0;P<h;P++)P%4===0&&P&&(v[g++]=c>>16&255,v[g++]=c>>8&255,v[g++]=c&255),c=c<<6|m.indexOf(f.charAt(P));var w=h%4*6;return w===0?(v[g++]=c>>16&255,v[g++]=c>>8&255,v[g++]=c&255):w===18?(v[g++]=c>>10&255,v[g++]=c>>2&255):w===12&&(v[g++]=c>>4&255),v}},{}],21:[function(o,u,b){"use strict";var m;u.exports=function(){if(typeof m!="undefined"||(m=!1,typeof WebAssembly=="undefined"))return m;try{var l=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),f=new WebAssembly.Module(l),h=new WebAssembly.Instance(f,{});return h.exports.test(4)!==0&&(m=!0),m}catch(v){}return m}},{}],22:[function(o,u,b){"use strict";var m=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;function f(v){if(v==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(v)}function h(){try{if(!Object.assign)return!1;var v=new String("abc");if(v[5]="de",Object.getOwnPropertyNames(v)[0]==="5")return!1;for(var c={},g=0;g<10;g++)c["_"+String.fromCharCode(g)]=g;var P=Object.getOwnPropertyNames(c).map(function(C){return c[C]});if(P.join("")!=="0123456789")return!1;var w={};return"abcdefghijklmnopqrst".split("").forEach(function(C){w[C]=C}),Object.keys(Object.assign({},w)).join("")==="abcdefghijklmnopqrst"}catch(C){return!1}}u.exports=h()?Object.assign:function(v,c){for(var g,P=f(v),w,C=1;C<arguments.length;C++){g=Object(arguments[C]);for(var S in g)p.call(g,S)&&(P[S]=g[S]);if(m){w=m(g);for(var D=0;D<w.length;D++)l.call(g,w[D])&&(P[w[D]]=g[w[D]])}}return P}},{}],23:[function(o,u,b){var m=arguments[3],p=arguments[4],l=arguments[5],f=JSON.stringify;u.exports=function(h,v){for(var c,g=Object.keys(l),P=0,w=g.length;P<w;P++){var C=g[P],S=l[C].exports;if(S===h||S&&S.default===h){c=C;break}}if(!c){c=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var D={},P=0,w=g.length;P<w;P++){var C=g[P];D[C]=C}p[c]=["function(require,module,exports){"+h+"(self); }",D]}var M=Math.floor(Math.pow(16,8)*Math.random()).toString(16),L={};L[c]=c,p[M]=["function(require,module,exports){var f = require("+f(c)+");(f.default ? f.default : f)(self);}",L];var Q={};Y(M);function Y(z){Q[z]=!0;for(var K in p[z][1]){var q=p[z][1][K];Q[q]||Y(q)}}var X="("+m+")({"+Object.keys(Q).map(function(z){return f(z)+":["+p[z][0]+","+f(p[z][1])+"]"}).join(",")+"},{},["+f(M)+"])",W=window.URL||window.webkitURL||window.mozURL||window.msURL,N=new Blob([X],{type:"text/javascript"});if(v&&v.bare)return N;var V=W.createObjectURL(N),j=new Worker(V);return j.objectURL=V,j}},{}],"/index.js":[function(o,u,b){"use strict";function m(I,R){return v(I)||h(I,R)||l(I,R)||p()}function p(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function l(I,R){if(I){if(typeof I=="string")return f(I,R);var T=Object.prototype.toString.call(I).slice(8,-1);if(T==="Object"&&I.constructor&&(T=I.constructor.name),T==="Map"||T==="Set")return Array.from(I);if(T==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(T))return f(I,R)}}function f(I,R){(R==null||R>I.length)&&(R=I.length);for(var T=0,G=new Array(R);T<R;T++)G[T]=I[T];return G}function h(I,R){var T=I==null?null:typeof Symbol!="undefined"&&I[Symbol.iterator]||I["@@iterator"];if(T!=null){var G=[],F=!0,ee=!1,Z,J;try{for(T=T.call(I);!(F=(Z=T.next()).done)&&(G.push(Z.value),!(R&&G.length===R));F=!0);}catch(se){ee=!0,J=se}finally{try{!F&&T.return!=null&&T.return()}finally{if(ee)throw J}}return G}}function v(I){if(Array.isArray(I))return I}var c=o("object-assign"),g=o("webworkify"),P=o("./lib/mathlib"),w=o("./lib/pool"),C=o("./lib/utils"),S=o("./lib/worker"),D=o("./lib/stepper"),M=o("./lib/tiler"),L=o("./lib/mm_resize/resize_filter_info"),Q={},Y=!1;try{typeof navigator!="undefined"&&navigator.userAgent&&(Y=navigator.userAgent.indexOf("Safari")>=0)}catch(I){}var X=1;typeof navigator!="undefined"&&(X=Math.min(navigator.hardwareConcurrency||1,4));var W={tile:1024,concurrency:X,features:["js","wasm","ww"],idle:2e3,createCanvas:function(R,T){var G=document.createElement("canvas");return G.width=R,G.height=T,G}},N={filter:"mks2013",unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},V=!1,j=!1,z=!1,K=!1,q=!1;function oe(){return{value:g(S),destroy:function(){if(this.value.terminate(),typeof window!="undefined"){var R=window.URL||window.webkitURL||window.mozURL||window.msURL;R&&R.revokeObjectURL&&this.value.objectURL&&R.revokeObjectURL(this.value.objectURL)}}}}function te(I){if(!(this instanceof te))return new te(I);this.options=c({},W,I||{});var R="lk_".concat(this.options.concurrency);this.__limit=Q[R]||C.limiter(this.options.concurrency),Q[R]||(Q[R]=this.__limit),this.features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.__requested_features=[],this.__mathlib=null}te.prototype.init=function(){var I=this;if(this.__initPromise)return this.__initPromise;if(typeof ImageData!="undefined"&&typeof Uint8ClampedArray!="undefined")try{new ImageData(new Uint8ClampedArray(400),10,10),V=!0}catch(se){}typeof ImageBitmap!="undefined"&&(ImageBitmap.prototype&&ImageBitmap.prototype.close?j=!0:this.debug("ImageBitmap does not support .close(), disabled"));var R=this.options.features.slice();if(R.indexOf("all")>=0&&(R=["cib","wasm","js","ww"]),this.__requested_features=R,this.__mathlib=new P(R),R.indexOf("ww")>=0&&typeof window!="undefined"&&"Worker"in window)try{var T=o("webworkify")(function(){});T.terminate(),this.features.ww=!0;var G="wp_".concat(JSON.stringify(this.options));Q[G]?this.__workersPool=Q[G]:(this.__workersPool=new w(oe,this.options.idle),Q[G]=this.__workersPool)}catch(se){}var F=this.__mathlib.init().then(function(se){c(I.features,se.features)}),ee;j?ee=C.cib_support(this.options.createCanvas).then(function(se){if(I.features.cib&&R.indexOf("cib")<0){I.debug("createImageBitmap() resize supported, but disabled by config");return}R.indexOf("cib")>=0&&(I.features.cib=se)}):ee=Promise.resolve(!1),z=C.can_use_canvas(this.options.createCanvas);var Z;j&&V&&R.indexOf("ww")!==-1?Z=C.worker_offscreen_canvas_support():Z=Promise.resolve(!1),Z=Z.then(function(se){K=se});var J=C.cib_can_use_region().then(function(se){q=se});return this.__initPromise=Promise.all([F,ee,Z,J]).then(function(){return I}),this.__initPromise},te.prototype.__invokeResize=function(I,R){var T=this;return R.__mathCache=R.__mathCache||{},Promise.resolve().then(function(){return T.features.ww?new Promise(function(G,F){var ee=T.__workersPool.acquire();R.cancelToken&&R.cancelToken.catch(function(J){return F(J)}),ee.value.onmessage=function(J){ee.release(),J.data.err?F(J.data.err):G(J.data)};var Z=[];I.src&&Z.push(I.src.buffer),I.srcBitmap&&Z.push(I.srcBitmap),ee.value.postMessage({opts:I,features:T.__requested_features,preload:{wasm_nodule:T.__mathlib.__}},Z)}):{data:T.__mathlib.resizeAndUnsharp(I,R.__mathCache)}})},te.prototype.__extractTileData=function(I,R,T,G,F){if(this.features.ww&&K&&(C.isCanvas(R)||q))return this.debug("Create tile for OffscreenCanvas"),createImageBitmap(G.srcImageBitmap||R,I.x,I.y,I.width,I.height).then(function(J){return F.srcBitmap=J,F});if(C.isCanvas(R))return G.srcCtx||(G.srcCtx=R.getContext("2d")),this.debug("Get tile pixel data"),F.src=G.srcCtx.getImageData(I.x,I.y,I.width,I.height).data,F;this.debug("Draw tile imageBitmap/image to temporary canvas");var ee=this.options.createCanvas(I.width,I.height),Z=ee.getContext("2d");return Z.globalCompositeOperation="copy",Z.drawImage(G.srcImageBitmap||R,I.x,I.y,I.width,I.height,0,0,I.width,I.height),this.debug("Get tile pixel data"),F.src=Z.getImageData(0,0,I.width,I.height).data,ee.width=ee.height=0,F},te.prototype.__landTileData=function(I,R,T){var G;if(this.debug("Convert raw rgba tile result to ImageData"),R.bitmap)return T.toCtx.drawImage(R.bitmap,I.toX,I.toY),null;if(V)G=new ImageData(new Uint8ClampedArray(R.data),I.toWidth,I.toHeight);else if(G=T.toCtx.createImageData(I.toWidth,I.toHeight),G.data.set)G.data.set(R.data);else for(var F=G.data.length-1;F>=0;F--)G.data[F]=R.data[F];return this.debug("Draw tile"),Y?T.toCtx.putImageData(G,I.toX,I.toY,I.toInnerX-I.toX,I.toInnerY-I.toY,I.toInnerWidth+1e-5,I.toInnerHeight+1e-5):T.toCtx.putImageData(G,I.toX,I.toY,I.toInnerX-I.toX,I.toInnerY-I.toY,I.toInnerWidth,I.toInnerHeight),null},te.prototype.__tileAndResize=function(I,R,T){var G=this,F={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null},ee=function(J){return G.__limit(function(){if(T.canceled)return T.cancelToken;var se={width:J.width,height:J.height,toWidth:J.toWidth,toHeight:J.toHeight,scaleX:J.scaleX,scaleY:J.scaleY,offsetX:J.offsetX,offsetY:J.offsetY,filter:T.filter,unsharpAmount:T.unsharpAmount,unsharpRadius:T.unsharpRadius,unsharpThreshold:T.unsharpThreshold};return G.debug("Invoke resize math"),Promise.resolve(se).then(function(de){return G.__extractTileData(J,I,T,F,de)}).then(function(de){return G.debug("Invoke resize math"),G.__invokeResize(de,T)}).then(function(de){return T.canceled?T.cancelToken:(F.srcImageData=null,G.__landTileData(J,de,F))})})};return Promise.resolve().then(function(){if(F.toCtx=R.getContext("2d"),C.isCanvas(I))return null;if(C.isImageBitmap(I))return F.srcImageBitmap=I,F.isImageBitmapReused=!0,null;if(C.isImage(I))return j?(G.debug("Decode image via createImageBitmap"),createImageBitmap(I).then(function(Z){F.srcImageBitmap=Z}).catch(function(Z){return null})):null;throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap')}).then(function(){if(T.canceled)return T.cancelToken;G.debug("Calculate tiles");var Z=M({width:T.width,height:T.height,srcTileSize:G.options.tile,toWidth:T.toWidth,toHeight:T.toHeight,destTileBorder:T.__destTileBorder}),J=Z.map(function(de){return ee(de)});function se(de){de.srcImageBitmap&&(de.isImageBitmapReused||de.srcImageBitmap.close(),de.srcImageBitmap=null)}return G.debug("Process tiles"),Promise.all(J).then(function(){return G.debug("Finished!"),se(F),R},function(de){throw se(F),de})})},te.prototype.__processStages=function(I,R,T,G){var F=this;if(G.canceled)return G.cancelToken;var ee=I.shift(),Z=m(ee,2),J=Z[0],se=Z[1],de=I.length===0,ze;de||L.q2f.indexOf(G.filter)<0?ze=G.filter:G.filter==="box"?ze="box":ze="hamming",G=c({},G,{toWidth:J,toHeight:se,filter:ze});var Se;return de||(Se=this.options.createCanvas(J,se)),this.__tileAndResize(R,de?T:Se,G).then(function(){return de?T:(G.width=J,G.height=se,F.__processStages(I,Se,T,G))}).then(function(ot){return Se&&(Se.width=Se.height=0),ot})},te.prototype.__resizeViaCreateImageBitmap=function(I,R,T){var G=this,F=R.getContext("2d");return this.debug("Resize via createImageBitmap()"),createImageBitmap(I,{resizeWidth:T.toWidth,resizeHeight:T.toHeight,resizeQuality:C.cib_quality_name(L.f2q[T.filter])}).then(function(ee){if(T.canceled)return T.cancelToken;if(!T.unsharpAmount)return F.drawImage(ee,0,0),ee.close(),F=null,G.debug("Finished!"),R;G.debug("Unsharp result");var Z=G.options.createCanvas(T.toWidth,T.toHeight),J=Z.getContext("2d");J.drawImage(ee,0,0),ee.close();var se=J.getImageData(0,0,T.toWidth,T.toHeight);return G.__mathlib.unsharp_mask(se.data,T.toWidth,T.toHeight,T.unsharpAmount,T.unsharpRadius,T.unsharpThreshold),F.putImageData(se,0,0),Z.width=Z.height=0,se=J=Z=F=null,G.debug("Finished!"),R})},te.prototype.resize=function(I,R,T){var G=this;this.debug("Start resize...");var F=c({},N);if(isNaN(T)?T&&(F=c(F,T)):F=c(F,{quality:T}),F.toWidth=R.width,F.toHeight=R.height,F.width=I.naturalWidth||I.width,F.height=I.naturalHeight||I.height,Object.prototype.hasOwnProperty.call(F,"quality")){if(F.quality<0||F.quality>3)throw new Error("Pica: .quality should be [0..3], got ".concat(F.quality));F.filter=L.q2f[F.quality]}if(R.width===0||R.height===0)return Promise.reject(new Error("Invalid output size: ".concat(R.width,"x").concat(R.height)));F.unsharpRadius>2&&(F.unsharpRadius=2),F.canceled=!1,F.cancelToken&&(F.cancelToken=F.cancelToken.then(function(Z){throw F.canceled=!0,Z},function(Z){throw F.canceled=!0,Z}));var ee=3;return F.__destTileBorder=Math.ceil(Math.max(ee,2.5*F.unsharpRadius|0)),this.init().then(function(){if(F.canceled)return F.cancelToken;if(G.features.cib){if(L.q2f.indexOf(F.filter)>=0)return G.__resizeViaCreateImageBitmap(I,R,F);G.debug("cib is enabled, but not supports provided filter, fallback to manual math")}if(!z){var Z=new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");throw Z.code="ERR_GET_IMAGE_DATA",Z}var J=D(F.width,F.height,F.toWidth,F.toHeight,G.options.tile,F.__destTileBorder);return G.__processStages(J,I,R,F)})},te.prototype.resizeBuffer=function(I){var R=this,T=c({},N,I);if(Object.prototype.hasOwnProperty.call(T,"quality")){if(T.quality<0||T.quality>3)throw new Error("Pica: .quality should be [0..3], got ".concat(T.quality));T.filter=L.q2f[T.quality]}return this.init().then(function(){return R.__mathlib.resizeAndUnsharp(T)})},te.prototype.toBlob=function(I,R,T){return R=R||"image/png",new Promise(function(G){if(I.toBlob){I.toBlob(function(se){return G(se)},R,T);return}if(I.convertToBlob){G(I.convertToBlob({type:R,quality:T}));return}for(var F=atob(I.toDataURL(R,T).split(",")[1]),ee=F.length,Z=new Uint8Array(ee),J=0;J<ee;J++)Z[J]=F.charCodeAt(J);G(new Blob([Z],{type:R}))})},te.prototype.debug=function(){},u.exports=te},{"./lib/mathlib":1,"./lib/mm_resize/resize_filter_info":7,"./lib/pool":13,"./lib/stepper":14,"./lib/tiler":15,"./lib/utils":16,"./lib/worker":17,"object-assign":22,webworkify:23}]},{},[])("/index.js")})});var ka=Qt((or,sr)=>{(function(e,r){typeof define=="function"&&define.amd?define([],r):typeof or!="undefined"?r():(r(),e.FileSaver={})})(or,function(){"use strict";function e(p,l){return typeof l=="undefined"?l={autoBom:!1}:typeof l!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),l={autoBom:!l}),l.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(p.type)?new Blob(["\uFEFF",p],{type:p.type}):p}function r(p,l,f){var h=new XMLHttpRequest;h.open("GET",p),h.responseType="blob",h.onload=function(){m(h.response,l,f)},h.onerror=function(){console.error("could not download file")},h.send()}function n(p){var l=new XMLHttpRequest;l.open("HEAD",p,!1);try{l.send()}catch(f){}return 200<=l.status&&299>=l.status}function o(p){try{p.dispatchEvent(new MouseEvent("click"))}catch(f){var l=document.createEvent("MouseEvents");l.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),p.dispatchEvent(l)}}var u=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:void 0,b=u.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),m=u.saveAs||(typeof window!="object"||window!==u?function(){}:"download"in HTMLAnchorElement.prototype&&!b?function(p,l,f){var h=u.URL||u.webkitURL,v=document.createElement("a");l=l||p.name||"download",v.download=l,v.rel="noopener",typeof p=="string"?(v.href=p,v.origin===location.origin?o(v):n(v.href)?r(p,l,f):o(v,v.target="_blank")):(v.href=h.createObjectURL(p),setTimeout(function(){h.revokeObjectURL(v.href)},4e4),setTimeout(function(){o(v)},0))}:"msSaveOrOpenBlob"in navigator?function(p,l,f){if(l=l||p.name||"download",typeof p!="string")navigator.msSaveOrOpenBlob(e(p,f),l);else if(n(p))r(p,l,f);else{var h=document.createElement("a");h.href=p,h.target="_blank",setTimeout(function(){o(h)})}}:function(p,l,f,h){if(h=h||open("","_blank"),h&&(h.document.title=h.document.body.innerText="downloading..."),typeof p=="string")return r(p,l,f);var v=p.type==="application/octet-stream",c=/constructor/i.test(u.HTMLElement)||u.safari,g=/CriOS\/[\d]+/.test(navigator.userAgent);if((g||v&&c||b)&&typeof FileReader!="undefined"){var P=new FileReader;P.onloadend=function(){var S=P.result;S=g?S:S.replace(/^data:[^;]*;/,"data:attachment/file;"),h?h.location.href=S:location=S,h=null},P.readAsDataURL(p)}else{var w=u.URL||u.webkitURL,C=w.createObjectURL(p);h?h.location=C:location.href=C,h=null,setTimeout(function(){w.revokeObjectURL(C)},4e4)}});u.saveAs=m.saveAs=m,typeof sr!="undefined"&&(sr.exports=m)})});function y(e,r,n){return(e&255)<<0|(r&255)<<8|(n&255)<<16}var It=[y(0,0,0),y(255,255,255)],vo=[y(0,0,0),y(255,128,64),y(64,255,128),y(128,64,255),y(255,255,255)],Co=[0,16777215,y(163,64,69),y(125,235,228),y(174,70,186),y(94,202,84),y(60,57,200),y(255,255,111),y(174,96,47),y(110,73,0),y(232,122,128),y(92,92,92),y(143,143,143),y(179,255,167),y(129,126,255),y(199,199,199)],Fe=[y(0,0,0),y(255,255,255),y(129,51,56),y(117,206,200),y(142,60,151),y(86,172,77),y(46,44,155),y(237,241,113),y(142,80,41),y(85,56,0),y(196,108,113),y(74,74,74),y(123,123,123),y(169,255,159),y(112,109,235),y(178,178,178)],Ht=[y(0,0,0),y(255,255,255),y(120,41,34),y(135,214,221),y(170,95,182),y(85,160,73),y(64,49,141),y(191,206,114),y(170,116,73),y(234,180,137),y(184,105,98),y(199,255,255),y(234,159,246),y(148,224,137),y(128,113,204),y(255,255,178)],Nr=[y(0,0,0),y(0,0,0),y(33,200,66),y(94,220,120),y(84,85,237),y(125,118,252),y(212,82,77),y(66,235,245),y(252,85,84),y(255,121,120),y(212,193,84),y(230,206,128),y(33,176,59),y(201,91,186),y(204,204,204),y(255,255,255)],yt=[5395026,11796480,10485760,11599933,7602281,91,95,6208,12048,543240,26368,1196544,7153664,0,0,0,12899815,16728064,14421538,16729963,14090399,6818519,6588,21681,27227,35843,43776,2918400,10777088,0,0,0,16316664,16755516,16742785,16735173,16730354,14633471,4681215,46327,57599,58229,259115,7911470,15065624,7895160,0,0,16777215,16773822,16300216,16300248,16758527,16761855,13095423,10148607,8973816,8650717,12122296,16119980,16777136,16308472,0,0],Gr=[y(0,0,0),y(255,68,253),y(20,245,60),y(20,207,253),y(255,106,60),y(255,255,255)],Xt=[y(0,0,0),y(227,30,96),y(96,78,189),y(255,68,253),y(0,163,96),y(156,156,156),y(20,207,253),y(208,195,255),y(96,114,3),y(255,106,60),y(156,156,156),y(255,160,208),y(20,245,60),y(208,221,141),y(114,255,208),y(255,255,255)],Qr=[0,2368548,4737096,7171437,9539985,11974326,14342874,16777215,12255269,14680137,16716142,16725394,16734903,16744155,16753663,16762879,11534409,13959277,16318866,16721334,16730842,16740095,16749311,16758783,10420330,12779662,15138995,16718039,16727291,16736767,16745983,16755199,8847495,11206827,13631696,15994612,16724735,16733951,16743423,16752639,6946975,9306307,11731175,14092287,16461055,16732415,16741631,16751103,4784304,7143637,9568505,11929087,14297599,16731647,16741119,16750335,2425019,4784352,7209215,9570047,12004095,14372863,16741375,16750847,191,2359523,4718847,7146495,9515263,11949311,14318079,16752127,187,224,2294015,4658431,7092735,9461247,11895551,14264063,176,213,249,2367999,4736511,7105279,9539327,11908095,159,195,3303,209151,2577919,4946431,7380735,9749247,135,171,7888,17140,681983,3050495,5484543,7853311,106,3470,12723,22231,31483,1548031,3916799,6285311,73,8557,17810,27318,36570,373759,2742271,5176575,4389,13641,23150,32402,41911,51163,2026495,4456447,9472,18724,27976,37485,46737,56246,1834970,4194303,14080,23296,32803,42055,51564,60816,2031541,4456409,18176,27648,36864,46116,55624,392556,2752401,5177269,21760,30976,40192,49667,58919,1572683,3932016,6291348,24320,33536,43008,52224,716810,3079982,5504851,7864183,25856,35328,44544,250368,2619136,4980503,7405371,9764703,26624,35840,45312,2413824,4782336,7143173,9568041,11927374,26112,35584,2338560,4707328,7141376,9502464,11927326,14286659,24832,2393344,4762112,7196160,9564928,11992832,14352155,16711487,2447360,4815872,7250176,9618688,12052992,14417664,16776990,16777027,4803328,7172096,9606144,11974912,14343424,16776965,16777001,16777038,6962176,9330688,11764992,14133504,16502272,16773655,16777019,16777055,8858112,11226880,13660928,16029440,16759818,16769070,16777043,16777079,10426112,12794624,15163392,16745475,16754727,16764235,16773488,16777108,11534848,13969152,16337664,16740388,16749640,16759148,16768401,16777141,12255232,14684928,16725795,16735047,16744556,16753808,16763317,16772569],$e=[0,0,4210752,4210752,7105644,7105644,9474192,9474192,11579568,11579568,13158600,13158600,14474460,14474460,16053492,16053492,17476,17476,1074276,1074276,2393220,2393220,3448992,3448992,4241592,4241592,5296336,5296336,6088936,6088936,6880508,6880508,10352,10352,1328260,1328260,2645144,2645144,3963052,3963052,5016764,5016764,6070476,6070476,6862044,6862044,7915756,7915756,6276,6276,1586328,1586328,3166380,3166380,4745408,4745408,6062288,6062288,7378144,7378144,8431852,8431852,9747708,9747708,136,136,2105500,2105500,3947696,3947696,5789888,5789888,7368912,7368912,8947936,8947936,10526956,10526956,11842812,11842812,6029432,6029432,7610508,7610508,8928416,8928416,10246320,10246320,11563200,11563200,12616912,12616912,13671644,13671644,14725356,14725356,7864392,7864392,9445472,9445472,10763384,10763384,12081292,12081292,13398176,13398176,14451892,14451892,15506628,15506628,16560340,16560340,8650772,8650772,9969712,9969712,11287628,11287628,12605544,12605544,13660284,13660284,14715028,14715028,15507624,15507624,16561340,16561340,8912896,8912896,10231836,10231836,11550776,11550776,12606544,12606544,13661288,13661288,14716028,14716028,15508624,15508624,16562340,16562340,8132608,8132608,9451548,9451548,11031608,11031608,12349520,12349520,13404264,13404264,14457980,14457980,15512720,15512720,16566436,16566436,6040576,6040576,7883804,7883804,9463864,9463864,11306064,11306064,12622952,12622952,13939836,13939836,15256720,15256720,16572580,16572580,2898944,2898944,4742172,4742172,6585400,6585400,8428624,8428624,9745512,9745512,11325564,11325564,12641424,12641424,13958308,13958308,15360,15360,2120736,2120736,4226112,4226112,6069340,6069340,7648372,7648372,9228428,9228428,10806436,10806436,12123320,12123320,14356,14356,1858612,1858612,3701840,3701840,5281900,5281900,6861956,6861956,8178844,8178844,9495732,9495732,10812616,10812616,12332,12332,1855564,1855564,3436648,3436648,5016708,5016708,6596764,6596764,7913652,7913652,8967372,8967372,10284256,10284256,10308,10308,1591396,1591396,3172484,3172484,4490400,4490400,5807288,5807288,7124176,7124176,8178920,8178920,9232636,9232636],zt=[0,11141120,43520,11184640,170,11141290,21930,11184810,5592405,16733525,5635925,16777045,5592575,16733695,5636095,16777215],$r=[0,43520,170,21930],Hr=[0,11184640,11141290,11184810],Xr=[0,11184640,170,11184810],zr=[0,5635925,5592575,5636095],Vr=[0,16777045,16733695,16777215],Wr=[0,16776960,5592575,16777215],Yr=ut(2,2,2),jr=ut(3,3,2),Vt=ut(3,3,3),Wt=ut(1,1,1),qe=[y(0,0,0),y(1,0,206),y(207,1,0),y(207,1,206),y(0,207,21),y(1,207,207),y(207,207,21),y(207,207,207),y(0,0,0),y(2,0,253),y(255,2,1),y(255,2,253),y(0,255,28),y(2,255,255),y(255,255,29),y(255,255,255)],He=[y(0,0,0),y(0,117,255),y(255,76,57),y(209,185,81),y(9,185,0),y(48,223,16),y(255,229,1),y(255,255,255),y(140,140,140),y(40,229,192),y(255,160,46),y(100,103,0),y(255,41,255),y(140,143,255),y(124,237,0),y(196,43,252)],Yt=[0,8388752,16711680,128,8388736,16711808,255,8388863,16711935,32768,8421376,16744448,32896,8421504,16744576,33023,8421631,16744703,65280,8453888,16776960,65408,8454016,16777088,65535,8454143,16777215],qr=[0,1911635,8267091,34641,11227702,6248271,12764103,16773608,16711757,16753408,16772135,58422,2731519,8615580,16742312,16764074],Zr=[1313820,4465716,3159149,5130831,8735792,3433764,13649480,7696737,5864910,13794604,8754593,7186988,13806233,7193290,14341214,14610134],Kr=[16579836,16724307,183389,4931571],Jr=[997391,3170864,1027212,1035436];var jt=ut(4,4,4);var ht=jt,ea=jt,ta=jt,Be=Oi(),ra=Li(),Bt=[y(48,210,0),y(245,245,128),y(76,58,180),y(154,50,54)],Et=[y(216,216,216),y(65,175,113),y(216,110,240),y(212,127,0)];function ut(e,r,n){for(var o=1<<e+r+n,u=255/((1<<e)-1),b=255/((1<<r)-1),m=255/((1<<n)-1),p=new Uint32Array(o),l=0;l<o;l++){var f=l&(1<<e)-1,h=l>>e&(1<<r)-1,v=l>>e+r&(1<<n)-1;p[l]=y(f*u,h*b,v*m)}return p}function Oi(){let e=new Uint32Array(32768),r=0;for(let n=0;n<32;++n)for(let o=0;o<32;++o)for(let u=0;u<32;++u,++r){let b=n<<3|o<<11|u<<19;b|=(n&28)>>2|(o&28)>>2<<8|(u&28)>>2<<16,e[r]=b}return e}function Li(){let e=new Uint32Array(2048),r=0;for(let n=0;n<16;++n)for(let o=0;o<16;++o)for(let u=0;u<8;++u,++r){let b=n<<4|o<<12|u<<21;e[r]=b}return e}var dt=[{id:"c64.multi",name:"C-64 Multi",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:8,colors:4,xb:1,yb:2},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},toNative:"exportC64Multi"},{id:"c64.multi.fli",name:"C-64 Multi FLI (w/o bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cell:{w:4,h:8,msbToLsb:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.bug",name:"C-64 Multi FLI (with bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank.left",name:"C-64 Multi FLI (Left blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank",name:"C-64 Multi FLI (L/R blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Fe,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.hires",name:"C-64 Hires",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},toNative:"exportC64Hires"},{id:"c64.hires.fli",name:"C-64 Hires FLI (w/o bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.bug",name:"C-64 Hires FLI (with bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.blank",name:"C-64 Hires FLI (L/R blank)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Fe,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Hires"},{id:"nes",name:"NES (4 color, 240 tiles)",width:160,height:96,scaleX:8/7,conv:"DitheringCanvas",pal:yt,reduce:4,toNative:"exportNES"},{id:"msx",name:"MSX/Coleco (TMS9918A)",width:256,height:192,conv:"Msx_Canvas",pal:Nr,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportTMS9918"},{id:"apple2.hires",name:"Apple ][ (Hires)",width:140,height:192,scaleX:2,conv:"Apple2_Canvas",pal:Gr,block:{w:7,h:1,colors:4},toNative:"exportApple2HiresToHGR"},{id:"atari8.d",name:"Atari ANTIC (Mode D)",width:160,height:96,scaleX:.8571,conv:"DitheringCanvas",pal:$e,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"atari8.f.10",name:"Atari ANTIC (Mode F/10)",width:80,height:192,scaleX:.8571*4,conv:"DitheringCanvas",pal:$e,reduce:9,toNative:"exportFrameBuffer",exportFormat:{bpp:4,brev:!0}},{id:"vcs",name:"Atari VCS",width:40,height:192,scaleX:6,conv:"DitheringCanvas",pal:$e,reduce:2,toNative:"exportVCSPlayfield"},{id:"vcs.color",name:"Atari VCS (Color)",width:40,height:192,scaleX:6,conv:"VCSColorPlayfield_Canvas",pal:$e,toNative:"exportVCSPlayfield"},{id:"astrocade",name:"Bally Astrocade",width:160,height:98,scaleX:1,conv:"DitheringCanvas",pal:Qr,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"zx",name:"ZX Spectrum",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:qe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportZXSpectrum"},{id:"zx.dark",name:"ZX Spectrum (dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:qe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},toNative:"exportZXSpectrum"},{id:"zx.bright",name:"ZX Spectrum (bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:qe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},toNative:"exportZXSpectrum"},{id:"zx.dark.bright",name:"ZX Spectrum (dark made bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:qe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},customize:{flipPalette:!0},toNative:"exportZXSpectrum"},{id:"zx.bright.dark",name:"ZX Spectrum (bright made dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:qe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},customize:{flipPalette:!0},toNative:"exportZXSpectrum"},{id:"cpc.mode0",name:"Amstrad CPC (mode 0)",width:160,height:200,scaleX:2,conv:"DitheringCanvas",pal:Yt,reduce:16,toNative:"exportFrameBuffer",exportFormat:{bpp:4,yremap:[3,80,2048],bitremap:[7,3,5,1,6,2,4,0]}},{id:"cpc.mode1",name:"Amstrad CPC (mode 1)",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Yt,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,yremap:[3,80,2048],bitremap:[7,3,6,2,5,1,4,0]}},null,{id:"vic20.hires",name:"VIC-20 Hires",width:160,height:160,scaleX:1.5,conv:"VICII_Canvas",pal:Ht,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicHires"},{id:"vic20.multi",name:"VIC-20 Multi",width:80,height:160,scaleX:3,conv:"VICII_Canvas",pal:Ht,block:{w:4,h:8,colors:4},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:15},aux:!0,auxRange:{min:0,max:15},border:!0,borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicMulti"},{id:"nes.1bpp",name:"NES (1bpp) (8x8) (32x32) Planar",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:2,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:1},auxRange:{min:0,max:1},borderRange:{min:0,max:1},colorsRange:{min:0,max:1}},reduce:2,customize:{outputTileset:!1,outputPalette:!0},toNative:"exportSNES"},{id:"nes.2bpp",name:"NES (2bpp) (8x8) (32x32) Planar",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},reduce:4,customize:{outputTileset:!1,outputPalette:!0},toNative:"exportSNES"},{id:"snes.2bpp",name:"SNES (+Gameboy/GBC) (2bpp) (8x8) (32x32) Planar",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},customize:{outputTileset:!1,outputPalette:!1,planeToMemory:"interleaved"},reduce:4,toNative:"exportSNES"},{id:"snes.3bpp",name:"SNES (3bpp) (8x8) (32x32) Planar",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:8,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:7},auxRange:{min:0,max:7},borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},reduce:8,customize:{planeToMemory:"interleaved"},toNative:"exportSNES"},{id:"snes.4bpp",name:"SNES (4bpp) (8x8) (32x32) Planar",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{planeToMemory:"interleaved"},reduce:16,toNative:"exportSNES"},{id:"snes.8bpp",name:"SNES (8bpp) (8x8) (32x32) Planar",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{planeToMemory:"interleaved"},reduce:256,toNative:"exportSNES"},{id:"snes.mode7",name:"SNES (Mode 7) (8bpp) (8x8) (32x32)",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{bitsInPlane:8,planes:1},reduce:256,toNative:"exportSNES"},{id:"neo.geopocket",name:"NEO Geo Pocket Color (2pp) (8x8) (32x32)",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:2,planes:1,planeLittleEndian:!1},reduce:256,toNative:"exportSNES"},{id:"virtualboy",name:"Virtual Boy (2pp) (8x8) (32x32)",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:2,planes:1,planeLittleEndian:!0},reduce:4,toNative:"exportSNES"},{id:"gg.4pp",name:"Game Gear (+Sega Master Systems/Wonder Color) (4bpp) (8x8) (32x32) Linear",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{outputTileset:!1,outputPalette:!1,planeToMemory:"linear"},reduce:16,toNative:"exportSNES"},{id:"genesis",name:"Genesis/x68k (4pp) (8x8) (32x32)",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas",pal:Be,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:4,planes:1,planeLittleEndian:!0},reduce:16,toNative:"exportSNES"},{id:"snes.8bpp.direct",name:"SNES (8bpp) (8x8) (32x32) Direct Color",width:32*8,height:32*8,scaleX:1,conv:"SNES_Canvas_Direct",pal:ra,block:{w:8,h:8,colors:2048,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:2047},auxRange:{min:0,max:2047},borderRange:{min:0,max:2047},colorsRange:{min:0,max:2047}},customize:{outputTileset:!0,outputPalette:!1,transformColor:"bbgggrrr",planes:8},toNative:"exportSNES"},{id:"stic",name:"Intellivision STIC (GRAM/GROM) (FGBG)",width:8*8,height:8*8,conv:"Stic_Fgbg_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticFgbg"},{id:"stic.stack.grom",name:"Intellivision STIC (GROM only) (Color Stack Mode)",width:20*8,height:12*8,conv:"Stic_ColorStack_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8,xb:0,yb:0},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticColorStack"},{id:"stic.stack.gram",name:"Intellivision STIC (GRAM only) (Color Stack Mode)",width:8*8,height:8*8,conv:"Stic_ColorStack_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:15}},toNative:"exportSticColorStack"},{id:"stic.stack.gromram",name:"Intellivision STIC (GROM+GRAM) (Color Stack Mode)",width:20*8,height:12*8,conv:"Stic_ColorStack_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0,xb:0,yb:0},cb:{w:8,h:8},param:{cell:!0,extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticColorStack"},{id:"stic.stack.grom.single",name:"Intellivision STIC (GROM only) (Single BG Color Stack)",width:20*8,height:12*8,conv:"Stic_ColorStack_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8,xb:0,yb:0},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"stic.stack.gram.single",name:"Intellivision STIC (GRAM only) (Single BG Color Stack)",width:8*8,height:8*8,conv:"Stic_ColorStack_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"stic.stack.gromram.single",name:"Intellivision STIC (GROM+GRAM) (Single BG Color Stack)",width:20*8,height:12*8,conv:"Stic_ColorStack_Canvas",pal:He,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0,xb:0,yb:0},cb:{w:8,h:8},param:{cell:!0,extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"nes4f",name:"NES (4 color, full screen)",width:256,height:240,scaleX:8/7,conv:"DitheringCanvas",pal:yt,reduce:4,toNative:"exportNES"},{id:"nes5f",name:"NES (5 color, full screen)",width:256,height:240,scaleX:8/7,conv:"NES_Canvas",pal:yt,reduce:5,toNative:"exportNES"},{id:"atari7800.160a",name:"Atari 7800 (160A)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:$e,reduce:4},{id:"atari7800.160b",name:"Atari 7800 (160B)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:$e,reduce:12},{id:"sms",name:"Sega Master System",width:176,height:144,scaleX:8/7,conv:"DitheringCanvas",pal:Yr,reduce:16},{id:"sms-gg",name:"Sega GameGear",width:160,height:144,scaleX:1.2,conv:"DitheringCanvas",pal:ta,reduce:16},{id:"bbcmicro.mode2",name:"BBC Micro (mode 2)",width:160,height:256,scaleX:2,conv:"DitheringCanvas",pal:Wt},{id:"apple2.lores",name:"Apple ][ (Lores)",width:40,height:48,scaleX:1.5,conv:"DitheringCanvas",pal:Xt,toNative:"exportFrameBuffer",exportFormat:{bpp:4}},{id:"apple2.dblhires",name:"Apple ][ (Double-Hires)",width:140,height:192,scaleX:2,conv:"DitheringCanvas",pal:Xt},{id:"appleiigs.320.16",name:"Apple IIGS (16 colors)",width:320,height:200,conv:"DitheringCanvas",pal:ea,reduce:16},{id:"channelf",name:"Fairchild Channel F",width:102,height:58,conv:"DitheringCanvas",pal:Kr,reduce:4},{id:"mac",name:"Mac 128K",width:512,height:342,conv:"DitheringCanvas",pal:It},{id:"x86.cga.04h.1",name:"PC CGA (Mode 04h, palette 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:$r,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.1B",name:"PC CGA (Mode 04h, bright 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:zr,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2",name:"PC CGA (Mode 04h, palette 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Hr,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2B",name:"PC CGA (Mode 04h, bright 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Vr,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h",name:"PC CGA (Mode 05h)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Xr,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h.B",name:"PC CGA (Mode 05h, bright)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Wr,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.ega.0dh",name:"PC EGA (Mode 0Dh)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:zt,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"x86.ega.10h",name:"PC EGA (Mode 10h)",width:640,height:350,scaleX:350/640*1.37,conv:"DitheringCanvas",pal:zt,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"williams",name:"Williams Arcade",width:304,height:256,conv:"DitheringCanvas",pal:jr,reduce:16},{id:"pico8",name:"PICO-8",width:128,height:128,conv:"DitheringCanvas",pal:qr},{id:"tic80",name:"TIC-80",width:240,height:136,conv:"DitheringCanvas",pal:Zr},{id:"gb",name:"Game Boy Classic",width:160,height:144,scaleX:10/9,conv:"DitheringCanvas",pal:Jr},{id:"amiga.lores",name:"Amiga (Lores)",width:320,height:256,conv:"DitheringCanvas",pal:ht,reduce:32},{id:"amiga.lores.ham6",name:"Amiga (Lores, HAM6)",width:320,height:256,conv:"HAM6_Canvas",pal:ht,reduce:16,extraColors:48},{id:"cx16.lores",name:"Commander X16 (Lores)",width:320,height:240,scaleX:1,conv:"DitheringCanvas",pal:ht,reduce:256},{id:"cx16.hires",name:"Commander X16 (Hires, cropped)",width:640,height:400,scaleX:1,conv:"DitheringCanvas",pal:ht,reduce:16},{id:"compucolor",name:"Compucolor",width:160,height:192,scaleX:1.6,conv:"Compucolor_Canvas",pal:qe,block:{w:2,h:4,colors:2}},{id:"teletext",name:"Teletext",width:40*2,height:24*3,scaleX:4/3,conv:"Teletext_Canvas",pal:Wt,block:{w:2,h:3,colors:2}},{id:"atarist",name:"Atari ST",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Vt,reduce:16},{id:"MC6847.CG2.palette0",name:"MC6847 (CG2, palette 0)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:Bt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG2.palette1",name:"MC6847 (CG2, palette 1)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:Et,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette0",name:"MC6847 (CG3, palette 0)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:Bt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette1",name:"MC6847 (CG3, palette 1)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:Et,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette0",name:"MC6847 (CG6, palette 0)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:Bt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette1",name:"MC6847 (CG6, palette 1)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:Et,reduce:4,toNative:"exportMC6847"},{id:"vcs.48",name:"Atari VCS (48x48 bitmap)",width:48,height:48,conv:"DitheringCanvas",pal:$e,reduce:2},{id:"pce.256x240",name:"PC Engine (256x240)",width:256,height:240,scaleX:5/4,conv:"DitheringCanvas",pal:Vt,reduce:16},{id:"phememo-d30.landscape",name:"Phomemo D30 (landscape)",width:288,height:88,conv:"DitheringCanvas",pal:It},{id:"phememo-d30.portrait",name:"Phomemo D30 (portrait)",width:88,height:288,conv:"DitheringCanvas",pal:It}],_t={};dt.forEach(e=>{e&&(_t[e.id||e.name]=e)});var Jt={};Ur(Jt,{bitOverlayUint8Array:()=>it,exportApple2HiresToHGR:()=>$i,exportC64Hires:()=>Yi,exportC64Multi:()=>Wi,exportCombinedImageAndColorCellBuffer:()=>Oe,exportFrameBuffer:()=>na,exportMC6847:()=>pn,exportNES:()=>un,exportNES5Color:()=>dn,exportSNES:()=>hn,exportSticColorStack:()=>tn,exportSticFgbg:()=>Ji,exportTMS9918:()=>an,exportVCSPlayfield:()=>fn,exportVicHires:()=>ji,exportVicMulti:()=>qi,exportZXSpectrum:()=>Ki,getSnesBitplanCellMapper:()=>sa,getSnesTilemapMapper:()=>la});function Ce(e,r){return r||(r=2),Ni(e,r,16)}function Ni(e,r,n){try{for(var o=e.toString(n).toUpperCase();o.length<r;)o="0"+o;return o}catch(u){return e+""}}function Me(e,r){e||(r==null?console.assert(e):console.assert(e,r))}function at(e,r){return e.map(n=>r.indexOf(n&16777215))}function ft(e,r,n,o){if(r==0)return[];let u=e,b=[];for(;r>0;)b.push(u&n),u>>=o,--r;return b}function Pe(e,r,n){return ft(e,r,n.paletteBitFilter,n.paletteBits)}function Mt(e,r,n,o,u){return n==0?[]:(Me(e<r.length),ft(r[e],n,o,u))}function qt(e,r,n,o){return Mt(e,r,n,o.paletteBitFilter,o.paletteBits)}function Qi(e,r){if(!r)return e;for(var n=0,o=0;o<r.length;o++){var u=r[o];u<0&&(u=-u-1,n^=1<<u),e&1<<o&&(n^=1<<u)}return n}function aa(e,r){r.destfmt&&(r=r.destfmt);var n=r.w,o=r.h,u=r.count||1,b=r.bpp||1,m=r.np||1,p=r.bpw||8,l=r.sl||Math.ceil(r.w*b/p),f=(1<<b)-1,h=r.pofs||l*o*u,v=r.skip||0,c;m>0&&r.sl?c=new Uint8Array(l*o*u):r.yremap?c=new Uint8Array(u*((o>>r.yremap[0])*r.yremap[1]+((1<<r.yremap[0])-1)*r.yremap[2])):p<=8?c=new Uint8Array(l*o*u*m):c=new Uint32Array(l*o*u*m);for(var g=0;g<u;g++)for(var P=e[g],w=0,C=0;C<o;C++){var S=r.flip?o-1-C:C,D=g*l*o+S*l;r.yremap&&(D=(C>>r.yremap[0])*r.yremap[1]+(C&(1<<r.yremap[0])-1)*r.yremap[2]);for(var M=0,L=0;L<n;L++){var Q=P[w++]&255,Y=Qi(D,r.remap);if(r.bitremap)for(var X=0;X<(r.bpp||1);X++)Q&1<<X&&(c[Y]|=1<<r.bitremap[M+X]);else for(var X=0;X<m;X++){var W=Q>>X*b&f;c[Y+X*h+v]|=r.brev?W<<p-M-b:W<<M}M+=b,M>=p&&(D+=1,M=0)}}return c}function ia(e){var r=0;e.forEach(o=>{r+=o.length});var n=new Uint8Array(r);return r=0,e.forEach(o=>{n.set(o,r),r+=o.length}),n}function na(e,r){var n=r.exportFormat;if(!n)throw"No export format";return n.w=e.width,n.h=e.height,new Uint8Array(aa([e.indexed],n))}function $i(e,r){for(var n=new Uint8Array(8192),o=0,u=0;u<e.height;u++)for(var b=(u&7)*1024+(u>>3&7)*128+(u>>6)*40,m=0;m<e.width;m+=7){for(var p=0,l=0,f=0;f<7;f++){var h=e.indexed[o++]&255;(h==3||h==4)&&(l|=128),h>=3&&(h-=2),p|=h<<f*2}n[b++]=p&127|l,n[b++]=p>>7&127|l}return n}function it(e,r,n,o,u,b){b=b===void 0?!0:b;let m=(1<<u)-1,l=(n&m)<<o;m<<=o,r+=b?0:(u+o-1)/8;let f=b?1:-1;for(let h=u+o;h>0;h-=8,r+=f){let c=(-1^m)&255,g=l&255;Me(r<e.length),e[r]=e[r]&c|g,l>>=8,m>>=8}}function Hi(e,r){let n=r.fullPaletteMode===void 0?e.fullPaletteMode:r.fullPaletteMode;if(r===void 0)return;if(r.prepare===void 0)throw'The "prepare" method is required.';let o,u=()=>(o=r.prepare(),o.littleEndian=o.littleEndian===void 0?!0:o.littleEndian,o),b=r.paramToBitPattern!==void 0?r.paramToBitPattern:(l,f,h)=>{if(n)return f;let v=ft(l,r.colors===void 0?e.colors:r.colors,r.paletteBitFilter===void 0?e.paletteBitFilter:r.paletteBitFilter,r.paletteBits===void 0?e.paletteBits:r.paletteBits);if(r.globalColorsBitPattern!==void 0){for(let c=0;c<r.globalColorsBitPattern.length;++c)if(f==r.globalColorsBitPattern[c].paletteIndex)return r.globalColorsBitPattern[c].bitPattern}if(r.globalColorToBitPattern!==void 0){let c=r.globalColorToBitPattern(l,f,h);if(c!==void 0)return c}if(r.colorToBitPattern!==void 0){let c=r.colorToBitPattern(l,f,h);if(c!==void 0)return c}for(let c=0;c<v.length&&c<r.colorsBitPattern.length;++c)if(f==v[c])return r.colorsBitPattern[c];return console.log("global nor param color does not contain color from image",e,r,l,f,h),Me(!1),0},m=r.iterate!==void 0?r.iterate:l=>{let f=r.params===void 0?e.params:r.params,h=r.indexed===void 0?e.indexed:r.indexed;if(r.xyToBitInfo!==void 0){if(h===void 0||f===void 0&&!n)throw'Both "params" and "indexed" must be defined.';for(let v=0,c=0;c<(r.height===void 0?e.height:r.height);++c)for(let g=0;g<(r.width===void 0?e.width:r.width);++g,++v){let P=r.xyToBitInfo(g,c);Me(f===void 0||P.paramOffset<f.length);let w=b(f===void 0?0:f[P.paramOffset],h[v],P);it(l,P.offset,w,P.bitShift,P.bitCount,o.littleEndian)}}};return{prepare:u,prefill:r.prefill,iterate:r.iterate===void 0?m:r.iterate,commit:r.commit,finalize:r.finalize,xyToBitInfo:r.xyToBitInfo,paramToBitPattern:b,globalColorsBitPattern:r.globalColorsBitPattern===void 0?[]:r.globalColorsBitPattern,globalColorToBitPattern:r.globalColorToBitPattern,colorsBitPattern:r.colorsBitPattern,colorToBitPattern:r.colorToBitPattern}}function Xi(e,r){if("prepare"in r)return Hi(e,r);if("data"in r)return{prepare(){return{data:r.data()}}};throw'Either "prepare" or "data" on a "CellExporterMapper" or "DataMapper" must be defined.'}function zi(e,r,n){if(n===void 0||!e)return;let o;if(n.prepare===void 0)throw'The "prepare" method is required.';let u=()=>(o=n.prepare(),o.littleEndian=o.littleEndian===void 0?!0:o.littleEndian,o),b=()=>{let p=n.params===void 0?r.params:n.params;if(!(n.paramToBitInfo===void 0&&n.paramToBitPattern===void 0)){if(n.paramToBitInfo===void 0||n.paramToBitPattern===void 0||p===void 0)throw'All of "paramToBitInfo" and "paramToBitPattern" and "params" must be defined.';for(let l=0;l<p.length;l++){let f=p[l],h=n.paramToBitInfo(l),v=n.paramToBitPattern(f,h);it(o.data,h.offset,v,h.bitShift,h.bitCount,o.littleEndian)}}};return{prepare:u,prefill:n.prefill,iterate:n.iterate===void 0?b:n.iterate,commit:n.commit,finalize:n.finalize,params:n.params===void 0?r.params:n.params,paramToBitInfo:n.paramToBitInfo,paramToBitPattern:n.paramToBitPattern}}function Pt(e,r,n){if(!(!e||n===void 0)){if("prepare"in n)return zi(e,r,n);if("data"in n)return{prepare(){return{data:n.data()}}};throw'Either "prepare" or "data" on a "ParamExporterMapper" or "DataMapper" must be defined.'}}function Oe(e){let r=Xi({width:e.content.width,height:e.content.height,params:e.content.blockParams,indexed:e.message.indexed,colors:e.content.block.colors,fullPaletteMode:e.content.fullPaletteMode,paletteBitFilter:e.content.paletteBitFilter,paletteBits:e.content.paletteBits},e.cellMapper),n=Pt(e.colorParamMapper!==void 0,{params:e.content.blockParams},e.colorParamMapper),o=Pt(e.content.paramInfo.cb,{params:e.content.cbParams},e.colorBlockParamMapper),u=Pt(e.content.paramInfo.cell,{params:e.content.cellParams},e.cellParamMapper),b=Pt(e.content.paramInfo.extra>0,{params:e.content.extraParams},e.extraParamMapper),m=[r,n,o,u,b],p=m.filter(c=>c!==void 0),l=[],f=[];for(let c=0;c<m.length;++c){if(m[c]===void 0){f.push(void 0);continue}let g=m[c].prepare();l.push(g),f.push(g.data)}for(let c=0;c<p.length;++c)p[c].prefill!==void 0&&p[c].prefill(l[c].data);for(let c=0;c<p.length;++c)p[c].iterate!==void 0&&p[c].iterate(l[c].data);for(let c=0;c<p.length;++c)p[c].commit!==void 0&&p[c].commit(l[c].data);let h=!0;for(let c=0;h;++c){h=!1;for(let g=0;g<p.length;++g)p[g].finalize!==void 0&&(h=p[g].finalize(g,f[0],f[1],f[2],f[3],f[4])||h)}let v=f.filter(c=>c!==void 0);return e.reorderArrays!==void 0&&(v=e.reorderArrays(v)),ia(v)}function Ze(e,r){let n=e.bitsPerColor,o=e.cell.w*n,u=e.cell.h*o,b=Math.ceil(u/8),m=0;return ke(Te({},r),{prepare(){return m=e.block.columns*b,{data:new Uint8Array(e.width*e.height*n/8)}},xyToBitInfo(l,f){let h=Math.floor(l/e.block.w),v=Math.floor(l/e.cell.w),c=Math.floor(f/e.cell.h),g=Math.floor(f/e.block.h)*e.block.columns+h,P=b*v,w=m*c,C=Math.floor(l%e.cell.w*n/8),S=Math.floor(f%e.cell.h*o/8),D=e.cell.msbToLsb?o-(l%e.cell.w+1)*n:l%e.cell.w*n;return{offset:w+P+S+C,bitShift:D,bitCount:n,paramOffset:g}}})}function pt(e,r){let n=e.fliMode,o=e.bitsPerColor,u=0;return ke(Te({},r),{prepare(){let m=e.cell.columns*e.cell.rows;return u=1<<Math.ceil(Math.log2(m)),{data:new Uint8Array(n?u*e.cell.h:e.cell.columns*e.cell.rows)}},paramToBitInfo(m){let p=0;return n?p=(Math.floor(m/e.cell.columns)&e.cell.h-1)*u+Math.floor(m/(o*e.width))*e.cell.columns+m%e.cell.columns:p=m,{offset:p,bitShift:0,bitCount:8,paramOffset:m}}})}function Vi(e,r){return ke(Te({},r),{prepare(){return{data:new Uint8Array(e.cb.columns*e.cb.rows)}},paramToBitInfo(o){return{offset:o,bitShift:0,bitCount:8,paramOffset:o}}})}function Wi(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Ze(n,{globalColorsBitPattern:[{paletteIndex:n.backgroundColor&15,bitPattern:0}],colorsBitPattern:[2,1,3]}),colorParamMapper:pt(n,{paramToBitPattern(o,u){let b=Pe(o,2,n);return b[0]|b[1]<<4}}),colorBlockParamMapper:Vi(n,{paramToBitPattern(o,u){return Pe(o,1,n)[0]}}),extraParamMapper:{data(){let o=new Uint8Array(2);return o[0]=n.backgroundColor&15|(n.auxColor&15)<<4,o[1]=n.borderColor&15,o}}})}function Yi(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Ze(n,{colorsBitPattern:[1,0]}),colorParamMapper:pt(n,{paramToBitPattern(o,u){let b=Pe(o,2,n);return b[0]<<4|b[1]}}),extraParamMapper:{data(){let o=new Uint8Array(2);return o[0]=n.backgroundColor&15|(n.auxColor&15)<<4,o[1]=n.borderColor&15,o}}})}function ji(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Ze(n,{globalColorsBitPattern:[{paletteIndex:n.backgroundColor,bitPattern:0}],colorsBitPattern:[1]}),colorParamMapper:pt(n,{paramToBitPattern(o,u){return Pe(o,1,n)[0]}}),extraParamMapper:{data(){let o=new Uint8Array(3);return o[0]=n.backgroundColor,o[1]=n.borderColor,o[2]=n.auxColor,o}}})}function qi(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Ze(n,{globalColorsBitPattern:[{paletteIndex:n.backgroundColor,bitPattern:0},{paletteIndex:n.borderColor,bitPattern:1},{paletteIndex:n.auxColor,bitPattern:3}],colorsBitPattern:[2]}),colorParamMapper:pt(n,{paramToBitPattern(o,u){return Pe(o,1,n)[0]}}),extraParamMapper:{data(){let o=new Uint8Array(3);return o[0]=n.backgroundColor,o[1]=n.borderColor,o[2]=n.auxColor,o}}})}function Zi(e,r){let n=e.bitsPerColor,o=e.cell.w*n;return ke(Te({},r),{prepare(){return{data:new Uint8Array(e.width*e.height*e.bitsPerColor/8)}},xyToBitInfo(b,m){let p=Math.floor(b/e.block.w),l=Math.floor(m/e.block.h)*e.block.columns+p,f=Math.floor(b/e.block.w),h=(m&192)>>6<<11|(m&7)>>0<<8|(m&56)>>3<<5|(f&31)>>0<<0,v=e.cell.msbToLsb?o-(b%e.cell.w+1)*n:b%e.cell.w*n;return{offset:h,bitShift:v,bitCount:n,paramOffset:l}}})}function Ki(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Zi(n,{colorsBitPattern:[0,1]}),colorParamMapper:pt(n,{paramToBitPattern(o,u){let b=Pe(o,2,n);return(b[0]&7)<<3|b[1]&7|(b[0]&8)>>3<<6}})})}function oa(e,r){return ke(Te({},r),{prepare(){let o=20,u=12;return{data:new Uint8Array(o*u*2),littleEndian:!0}},prefill(o){let u=7,b=0,m=0,p=0,l=u|(b&3)<<9|(b&4)>>2<<13|(b&8)>>3<<12|m<<3<<(p<<11),f=l&255,h=(l&65280)>>8;for(let g=0;g<o.length;++g)g%2==0?o[g]=f:o[g]=h;let v=9*20*2,c=[45,65,68,69,0,66,89,0,36,73,84,72,69,82,84,83,79,78];for(let g=0;g<c.length;++g){let P=u|(b&3)<<9|(b&4)>>2<<13|(b&8)>>3<<12|c[g]<<3<<(p<<11),w=P&255,C=(P&65280)>>8;o[v+g*2]=w,o[v+g*2+1]=C}},paramToBitInfo(o){let u=Math.floor(o/Math.floor(e.width/e.block.w)),b=o%Math.floor(e.width/e.block.w);return{offset:(u*20+b)*2,bitShift:0,bitCount:16,paramOffset:o}}})}function Ji(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Ze(n,{colorsBitPattern:[0,1]}),colorParamMapper:oa(n,{paramToBitPattern(o,u){let b=Pe(o,2,n),m=b[0],p=b[1],l=1,f=u.paramOffset&63;return m|(p&3)<<9|(p&4)>>2<<13|(p&8)>>3<<12|f<<3<<(l<<11)}})})}function en(e,r){return ke(Te({},r),{prepare(){let u=8,b=8;return{data:new Uint8Array(u*b*8),littleEndian:!0}},finalize(u,b,m,p,l,f){for(let h=0;h<e.cellParams.length;++h){let v=Mt(h,e.cellParams,2,255,8);if(v[0]==0)continue;let c=v[1]*8,g=h%e.cell.columns,w=Math.floor(h/e.cell.columns)*e.cell.columns*8+g*8;for(let C=0;C<8;++C)l[c+C]=b[w+C]}return!1}})}function tn(e,r){let n=e.content,o=[0,1],u=Ze(n,{paramToBitPattern(b,m,p){let l=Pe(b,n.paletteChoices.colors,n);for(let h=0;h<n.paletteChoices.colors;++h)if(l[h]==m)return o[1+h];let f=qt(p.paramOffset,n.cbParams,1,n)[0];return f==m?o[0]:(console.log("cb nor param color does not contain color from image",b,m,l,p,f),Me(!1),0)}});return Oe({message:e,content:n,cellMapper:u,colorParamMapper:oa(n,{paramToBitPattern(b,m){let p=Pe(b,2,n),l=p[0],f=p[1],h=n.block.size=8*8*8,v=(l&8)!=0,c=n.paramInfo.cell?Mt(m.paramOffset,n.cellParams,2,255,8):[h?1:0,h?m.paramOffset&63:0],g=c[0]!=0;Me(!v||v&&g);let P=g?1:0,w=g?c[1]&63:m.paramOffset&255;return l&7|(l&8)>>3<<12|(f&1)<<13|w<<3<<(P<<11)}}),cellParamMapper:n.paramInfo.cell?en(n):void 0,extraParamMapper:{data(){let b=new Uint8Array(n.paramInfo.extra);for(let m=0;m<n.paramInfo.extra;++m)b[m]=qt(m,n.extraParams,1,n)[0];return b}}})}function rn(e,r){return ke(Te({},r),{prepare(){return{data:new Uint8Array(e.block.size)}},paramToBitInfo(o){let u=o&31,b=o>>5;return{offset:b&7|u<<3|b>>3<<8,bitShift:0,bitCount:8,paramOffset:o}}})}function an(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:Ze(n,{colorsBitPattern:[0,1]}),colorParamMapper:rn(n,{paramToBitPattern(o,u){let b=Pe(o,2,n);return b[0]=b[0]==0?1:b[0],b[1]=b[1]==0?1:b[1],b[0]|b[1]<<4}})})}function nn(e,r,n,o,u,b,m){let p=u*m.block.w,l=Math.floor(p*m.block.h*e+p*o)/8,f=m.cell.msbToLsb?(m.block.w-(n+1))*u:n*u,h=Math.floor(f/8);return h=b?h:Math.floor(p/8)-h-1,f=f%8,Me((l+h)*8<r*p*m.block.h),{offset:l+h,bitShift:f,bitCount:u}}function on(e,r,n,o,u,b,m){let p=u*m.block.w,l=(o&1)!=0,f=Math.floor(((p*m.block.h*(e>>1)<<1)+p*o*(l?1:0))/8),h=m.cell.msbToLsb?(m.block.w-(n+1))*u:n*u,v=Math.floor(h/8);return v=b?v:Math.floor(p/8)-v-1,h=h%8,Me((f+v)*8<r*p*m.block.h),{offset:f+v,bitShift:h,bitCount:u}}function sn(e,r,n,o,u,b,m){let p=u*m.block.w,l=Math.floor(p*r*o+p*e)/8,f=m.cell.msbToLsb?(m.block.w-(n+1))*u:n*u,h=Math.floor(f/8);return h=b?h:Math.floor(p/8)-h-1,f=f%8,Me((l+h)*8<r*p*m.block.h),{offset:l+h,bitShift:f,bitCount:u}}var Zt={Default:nn,interleaved:on,linear:sn},Kt={Default:ln,bbgggrrr:cn};function ln(e,r){return e}function cn(e,r){let n=r[e],o=n&255,u=n>>8&255;return(n>>16&255&192)>>6<<6|(u&224)>>5<<3|(o&224)>>5<<0}function sa(e,r,n,o){let u=e.indexed,b=0,m=0,p=0,l=0,f=32,h=32;return ke(Te({},o),{prepare(){return b=n.customize===void 0?Math.ceil(Math.log2(r.block.colors)):"planes"in n.customize?n.customize.planes:Math.ceil(Math.log2(r.block.colors)),m=r.block.w*r.block.h,p=r.block.columns*r.block.rows,l=n.customize===void 0?1:"bitsInPlane"in n.customize?n.customize.bitsInPlane:1,{data:new Uint8Array(Math.floor(b*l*m*p/8))}},iterate(c){let g=Math.floor(r.block.columns/f),P=Math.floor(r.block.rows/h),w=Math.floor(b*l*m*f*h/8),C=Math.floor(b*l*m/8),S=C*f,D=n.customize===void 0?Zt.Default:"planeToMemory"in n.customize?Zt[n.customize.planeToMemory]:Zt.Default,M=n.customize===void 0?Kt.Default:"transformColor"in n.customize?Kt[n.customize.transformColor]:Kt.Default,L=(1<<l)-1,Q=n.customize===void 0?!0:"planeLittleEndian"in n.customize?n.customize.littleEndian:!0,Y=r.block.msbToLsb?(X,W)=>{let N=(b-(X+1))*l,V=W&L<<N;return{extractedBits:V>>N,filteredColor:W^V}}:(X,W)=>{let N=X*l,V=W&L<<N;return{extractedBits:V,filteredColor:W^V}};for(let X=0;X<u.length;++X){let W=Math.floor(X/r.block.w)%r.block.columns,N=Math.floor(X/(r.width*r.block.h)),V=Math.floor(W/f),K=(Math.floor(N/h)*g+V)*w,q=W%f,oe=N%h,te=M(u[X],n.pal),I=X%r.block.w,R=Math.floor(X/r.width)%r.block.h,T=S*oe+C*q;for(let G=0;G<b;++G){let{extractedBits:F,filteredColor:ee}=Y(G,te),Z=D(G,b,I,R,l,Q,r);te=ee;let J=K+T+Z.offset;it(c,J,F,Z.bitShift,Z.bitCount,Q)}}}})}function la(e,r,n,o){let u=0,b=32,m=32,p=n.customize===void 0?!0:"outputTileset"in n.customize?n.customize.littleEndian:!0,l=n.customize===void 0?!0:"outputPalette"in n.customize?n.customize.littleEndian:!0;return!p&&!l?void 0:ke(Te({},o),{prepare(){return u=r.block.columns*r.block.rows,{data:new Uint8Array(2*u*(p?1:0)+(l?r.block.colors:0))}},iterate(h){let v=n.customize===void 0?!1:"tilesetLittleEndian"in n.customize?n.customize.littleEndian:!1;if(p){let c=Math.floor(r.block.columns/b),g=Math.floor(r.block.rows/m),P=Math.floor(b*m*2);for(let w=0;w<r.block.rows;++w)for(let C=0;C<r.block.columns;++C){let S=Math.floor(C/b),L=(Math.floor(w/m)*c+S)*P,Q=C%b,Y=w%m,X=(Y*r.block.columns+Q)*2,W=L+X,N=ft(r.blockParams[w*C+C],1,3,2),V=0,j=0,z=N[0]&7,K=Y*b+Q&1023,q=V<<15|j<<14|z<<10|K;it(h,W,q,0,16,v)}}if(l){let c=p?0:Math.floor(2*u/8);for(let g=0;g<r.block.colors;++g){let P=e.pal[g],w=P&255,C=P>>8&255,S=P>>16&255,D=w>>3&31|(C>>3&31)<<5|(S>>3&31)<<10;it(h,c+g*2,D,0,16,v)}}}})}function hn(e,r){let n=e.content;return Oe({message:e,content:n,cellMapper:sa(e,n,r,{}),colorParamMapper:la(e,n,r,{})})}function un(e,r){for(var n=0,o=e.width/8,u=e.height/8,b=new Uint8Array(e.width*e.height*2/8),m=0;m<e.height;m++)for(var p=0;p<e.width;p++){var l=Math.floor(p/8)+Math.floor(m/8)*o,f=l*16+(m&7),h=7-(p&7),v=e.indexed[n]&255;b[f]|=(v&1)<<h,b[f+8]|=(v>>1&1)<<h,n++}return b}function dn(e,r){if(!r.block)throw"No block size";var n=na(e,r),o={w:r.block.w,h:r.block.h,bpp:2},u=new Uint8Array(aa([e.indexed],o));return ia([n,u])}function fn(e,r){var n=new Uint8Array(6*e.height);let o=[3,2,1,0,-1,-1,-1,-1,4,5,6,7,8,9,10,11,19,18,17,16,15,14,13,12,23,22,21,20,-1,-1,-1,-1,24,25,26,27,28,29,30,31,39,38,37,36,35,34,33,32];for(var u=0;u<e.height;u++)for(var b=0;b<48;b++){var m=o[b];if(m>=0&&(m+=u*e.width,e.indexed[m])){var p=(b>>3)*e.height+e.height-u-1;n[p]|=128>>(b&7)}}return n}function pn(e,r){var n=new Uint8Array(e.width*e.height/4);let o=0,u=0;for(var b=0;b<e.height;b++)for(var m=0;m<e.width;m+=4,u+=4)n[o++]=((e.indexed[u+0]&3)<<6)+((e.indexed[u+1]&3)<<4)+((e.indexed[u+2]&3)<<2)+((e.indexed[u+3]&3)<<0);return console.log(n),n}var rr={};Ur(rr,{getFileViewerCode_apple2_hires:()=>_n,getFileViewerCode_astrocade:()=>Rn,getFileViewerCode_atari8_d:()=>Aa,getFileViewerCode_atari8_f_10:()=>Dn,getFileViewerCode_c64_fli:()=>Xe,getFileViewerCode_c64_hires:()=>En,getFileViewerCode_c64_hires_fli:()=>Nn,getFileViewerCode_c64_hires_fli_blank:()=>Qn,getFileViewerCode_c64_hires_fli_bug:()=>Gn,getFileViewerCode_c64_multi:()=>Bn,getFileViewerCode_c64_multi_fli:()=>$n,getFileViewerCode_c64_multi_fli_blank:()=>Xn,getFileViewerCode_c64_multi_fli_blank_left:()=>zn,getFileViewerCode_c64_multi_fli_bug:()=>Hn,getFileViewerCode_cpc:()=>tr,getFileViewerCode_cpc_mode0:()=>Ln,getFileViewerCode_cpc_mode1:()=>Un,getFileViewerCode_msx:()=>Pn,getFileViewerCode_nes:()=>Mn,getFileViewerCode_vcs:()=>Sn,getFileViewerCode_zx:()=>mt,getFileViewerCode_zx_bright:()=>kn,getFileViewerCode_zx_bright_dark:()=>On,getFileViewerCode_zx_dark:()=>Tn,getFileViewerCode_zx_dark_bright:()=>Fn});var er=`
    processor 6502
    include "basicheader.dasm"

Src equ $02
Dest equ $04

; This code is extremely similar between multi-color
; graphics mode and hires graphics mode. Setting
; to 1 enables the multi-color graphics code, otherwise
; set to 0 for hires graphics mode.
UseMultiColorGraphics equ $USE_MULTI_MODE

Start:
    lda #$3B   ; 25 rows, on, bitmap
    sta $d011  ; VIC control #1
#if UseMultiColorGraphics
    lda #$18   ; 40 column, multicolor
#else
    lda #$08   ; 40 column, two-color hires
#endif
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

#if UseMultiColorGraphics
; copy color RAM
    lda #<ColorData
    sta Src
    lda #>ColorData
    sta Src+1
    lda #$d8
    sta Dest+1
    ldx #4
    jsr CopyMem
#endif

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
#if UseMultiColorGraphics
ColorData equ ScreenData+1000
XtraData equ ColorData+1000
#else
XtraData equ ScreenData+1000
#endif

    incbin "$DATAFILE"
`;var ca=`
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
`;var ha=`
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
`;var ua=`
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
`;var da=`
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
`;var fa=`
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
`;var pa=`
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
`;var ma=`
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
`;var ga=`
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
`;var ba=`
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
LastRasterLine equ 201
FinalRowPatch equ 0
#else
TweakD018 equ 1
TweakD011 equ 1
LastRasterLine equ 199
FinalRowPatch equ 1
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
    
    ;
    ; Two IRQs are used to create a stable raster
    ; line start point free from issues caused by
    ; interrupts, inconsistent mid-instruction
    ; triggers, or other concerns.
    ;
    ; The first IRQ's job is to setup the second IRQ.
    ; While the first IRQ is triggers based on a
    ; raster line it's timing is not said to be as
    ; accurate because the CPU might be processing
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
    cpx #LastRasterLine    ; last rasterline?
Ntsc4:
    bne L0      ; branches to L0-1 on NTSC for 2 extra cycles per rasterline

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

#if FinalRowPatch
    lda LookupD011+LastRasterLine
    and #$07
    ora #$70
    sta LookupD011+LastRasterLine
#endif

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

    ; Even though these IRQ values overwrite screen
    ; color choice area of the picture data, this
    ; does not affect the picture in any way
    ; because the color choices end at 1000 bytes,
    ; not 1024 bytes leaving the extra few bytes
    ; unused by the VIC chip, which is fortunately
    ; exactly where IRQ vectors need to be installed.
    ;
    ; However, care must be taken that if a new
    ; picture is loaded into this memory area then the
    ; IRQ table needs to be re-initialized to these
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
    sta $d016   ; %00011000 ; no horizontal scroll, 40 columns, multi-mode on or off, defaulted high bits
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
`;function Bn(){var e=er;return e=e.replace("$USE_MULTI_MODE","1"),e}function En(){var e=er;return e=e.replace("$USE_MULTI_MODE","0"),e}function _n(){return ca}function Mn(){var e=ha,r=at(ne.lastPixels.pal,ne.settings.pal);return e=e.replace("hex 1f;screen color","hex "+Ce(r[0])),e=e.replace("hex 01112100;background 0","hex "+Ce(r[1])+Ce(r[2])+Ce(r[3])+Ce(0)),e}function Pn(){return ua}function Sn(){var e=da,r=at(ne.lastPixels.pal,ne.settings.pal);return e=e.replace("#$F6","#$"+Ce(r[0])),e=e.replace("#$F7","#$"+Ce(r[1])),e}function Rn(){var e=fa,r=at(ne.lastPixels.pal,ne.settings.pal);return e=e.replace("$b0","$"+Ce(r[0])),e=e.replace("$b1","$"+Ce(r[1])),e=e.replace("$b2","$"+Ce(r[2])),e=e.replace("$b3","$"+Ce(r[3])),e}function Aa(){for(var e=pa,r=at(ne.lastPixels.pal,ne.settings.pal),n=0;n<r.length;n++)e=e.replace("$00;PF"+n,"$"+Ce(r[n]));return e}function Dn(){let e=Aa();return e=e.replace(".byte $4d",".byte $4f"),e=e.replace(".byte $0d",".byte $0f"),e=e.replace("#$00;PRIOR","#$80"),e=e.replace("COLOR0+4","PCOLR0+0"),e=e.replace("COLOR0+0","PCOLR0+1"),e=e.replace("COLOR0+1","PCOLR0+2"),e=e.replace("COLOR0+2","PCOLR0+3"),e=e.replace(";GPIOMODE equ 1","GPIOMODE equ 1"),e}function mt(){var e=ma;return e}function Tn(){return mt()}function kn(){return mt()}function Fn(){return mt()}function On(){return mt()}function tr(e){var r=ga,n=at(ne.lastPixels.pal,ne.settings.pal);r=r.replace("$MODE",e+"");for(var o=0;o<16;o++)r=r.replace("$c"+o,"$"+Ce(n[o]||0));return r}function Ln(e){return tr(0)}function Un(e){return tr(1)}function Xe(){var e=ba;return e}function Nn(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","0"),e}function Gn(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","0"),e}function Qn(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","0"),e}function $n(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","1"),e}function Hn(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","1"),e}function Xn(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","1"),e}function zn(){let e=Xe();return e=e.replace("$USE_MULTI_MODE","1"),e}var xa=[[1,0,.4375],[-1,1,.1875],[0,1,.3125],[1,1,.0625]],va=[[1,0,3/8],[0,1,3/8],[1,1,2/8]],Ca=[[1,0,1/6],[2,0,1/6],[-1,1,1/6],[0,1,1/6],[1,1,1/6],[0,2,1/6]],wa=[[1,0,4/16],[2,0,3/16],[-2,1,1/16],[-1,1,2/16],[0,1,3/16],[1,1,2/16],[2,1,1/16]],Ia=[[1,0,2/4],[-1,1,1/4],[0,1,1/4]],ya=[[1,0,8/42],[2,0,4/42],[-2,1,2/42],[1,-1,4/42],[0,1,8/42],[1,1,4/42],[2,1,2/42],[-2,2,1/42],[-1,2,2/42],[0,2,4/42],[1,2,2/42],[2,2,1/42]],Ba=[[1,0,.5],[0,1,.5]],Ea=[[1,0,1]],_a=[[0,1,1]],Ma=[[0,1,2/4],[0,2,1/4],[1,2,1/4]],Pa=[[1,1,1]],Sa=[[0,1,6/16],[-1,1,3/16],[1,1,3/16],[-2,2,1/16],[0,2,2/16],[2,2,1/16]];var Ua=$t(Ra()),Na=$t(Ta()),cr=$t(ka());var Fa=["benbenn.jpg","cezanne2.jpg","colorroses.jpg","colorswirls.jpg","coolcar.jpg","darkbrewery.jpg","dhuku.jpg","greentruck.jpg","frida.jpg","homer.jpg","keyssunset.jpg","lobsterpot.jpg","myersflat.jpg","myrtle.jpg","parrot.jpg","redrose.jpg","robert_s_duncanson.jpg","seurat.jpg","vangogh.jpg"];var Ee,Wn=document.getElementById("brightSlider"),Yn=document.getElementById("contrastSlider"),jn=document.getElementById("saturationSlider"),qn=document.getElementById("noiseSlider"),Zn=document.getElementById("diffuseSlider"),Kn=document.getElementById("orderedSlider"),Jn=document.getElementById("diversitySlider"),eo=document.getElementById("imageUpload"),Ga=document.getElementById("srcimage"),xt=document.getElementById("resizecanvas"),bt=document.getElementById("destcanvas"),lr=class{constructor(){this.newWorker()}newWorker(){this.worker&&(this.worker.onmessage=()=>{}),this.worker=new Worker("./gen/worker.js"),this.worker.onmessage=r=>{var n=r.data;n!=null&&n.img!=null&&this.pixelsAvailable!=null&&(this.pixelsAvailable(n),this.lastPixels=n)}}setSettings(r){this.settings=r,this.worker.postMessage({cmd:"setSettings",data:r})}setSourceImage(r){this.worker.postMessage({cmd:"setSourceImage",data:r})}restart(){this.worker.postMessage({cmd:"restart"})}},ne=new lr,gt,St,Qa=[{name:"Floyd-Steinberg",kernel:xa},{name:"False Floyd",kernel:va},{name:"Atkinson",kernel:Ca},{name:"Sierra 2",kernel:wa},{name:"Sierra Lite",kernel:Ia},{name:"Stucki",kernel:ya},{name:"Two-D",kernel:Ba},{name:"Right",kernel:Ea},{name:"Down",kernel:_a},{name:"Double Down",kernel:Ma},{name:"Diagonal",kernel:Pa},{name:"Diamond",kernel:Sa}],to=[{id:"perceptual",name:"Perceptual"},{id:"hue",name:"Hue-Based"},{id:"dist",name:"Distance"},{id:"max",name:"Maximum"}],Oa=!1;function hr(e){if(Oa)return;Oa=!0;let r=(e==null?void 0:e.message)||String(e);console.error("Canvas access error:",e),(r.includes("fingerprint")||r.includes("canvas")||r.includes("getImageData"))&&alert(`\u26A0\uFE0F Canvas Access Blocked

Dithertron cannot access canvas image data. This is usually caused by browser fingerprinting protection.

To fix this:
\u2022 Firefox: Disable 'Enhanced Tracking Protection' for this site (shield icon in address bar)
\u2022 Brave: Disable 'Block fingerprinting' in Shields settings
\u2022 Other browsers: Check privacy/security settings

Technical details: `+r)}function ro(){try{let e=document.createElement("canvas");e.width=e.height=1;let r=e.getContext("2d");return r.fillStyle="rgb(255, 0, 0)",r.fillRect(0,0,1,1),r.getImageData(0,0,1,1),!0}catch(e){return hr(e),!1}}function ao(e){try{return new Uint32Array(e.getContext("2d").getImageData(0,0,e.width,e.height).data.buffer)}catch(r){throw hr(r),r}}function io(e,r){var n=e.getContext("2d"),o=n.createImageData(e.width,e.height),u=new Uint32Array(o.data.buffer);u.length==r.length?(u.set(r),n.putImageData(o,0,0)):console.log("drawRGBA(): array length mismatch")}function no(e,r,n,o,u){r*=1,n*=1;for(var b=new Uint8ClampedArray(e.buffer),m=0;m<b.length;m+=4){var p=b[m],l=b[m+1],f=b[m+2];if(o!=1){var h=.2989*p+.587*l+.114*f;p=h*(1-o)+p*o,l=h*(1-o)+l*o,f=h*(1-o)+f*o}b[m]=Math.pow(p*r,u)+n,b[m+1]=Math.pow(l*r,u)+n,b[m+2]=Math.pow(f*r,u)+n}}function nt(){var e=ao(xt);let r=(parseFloat(Yn.value)-50)/100+1,n=(parseFloat(Wn.value)-r*50)*(128/50),o=(parseFloat(jn.value)-50)/50+1;no(e,r,n,o,1),ne.setSourceImage(e),Ke()}function Ke(){var e=$("#diffuseTypeSelect")[0].selectedOptions[0];e&&(ne.settings.ditherfn=Qa[parseInt(e.value)].kernel);var e=$("#errorFuncSelect")[0].selectedOptions[0];e&&(ne.settings.errfn=e.value),ne.settings.diffuse=parseFloat(Zn.value)/100,ne.settings.ordered=parseFloat(Kn.value)/100,ne.settings.noise=parseFloat(qn.value),ne.settings.paletteDiversity=parseFloat(Jn.value)/200+.75,ne.setSettings(ne.settings),ne.restart()}function oo(){let e=Ee==null?void 0:Ee.getCroppedCanvas();!(e!=null&&e.width)||!(e!=null&&e.height)||(0,Na.default)().resize(e,xt,{}).then(()=>{nt()}).catch(r=>{hr(r)})}function $a(e){var r=e.width+" x "+e.height;return e.reduce?r+=", "+e.reduce+" out of "+e.pal.length+" colors":e.pal&&(r+=", "+e.pal.length+" colors"),e.block&&(r+=", ",r+=e.block.colors+" colors per ",r+=e.block.w+"x"+e.block.h+" block"),r}function so(e){$("#targetFormatInfo").text($a(e))}function lo(e){var r=$("#paletteSwatches");r.empty(),e&&e.length<64&&e.forEach((n,o)=>{var u="rgb("+(n&255)+","+(n>>8&255)+","+(n>>16&255)+")",b=$('<span style="width:2em">&nbsp;</span>').css("background-color",u);r.append(b)})}function co(e){let r=ne.settings;return(e==null?void 0:e.naturalWidth)==r.width&&(e==null?void 0:e.naturalHeight)==r.height}function ho(){console.log("Width and height exact match!"),Ee.clear(),Ee.disable(),xt.getContext("2d").drawImage(Ga,0,0),nt()}function Rt(e){Ee&&Ee.destroy();let r=ne.settings,n=r.width*(r.scaleX||1)/r.height||4/3;Ee=new Ua.default(Ga,{viewMode:1,autoCropArea:1,initialAspectRatio:n,crop(o){co(Ee.getImageData())?ho():oo()}}),Ee.replace(e),za()}function La(e){var r=e.conv!="DitheringCanvas";ne.newWorker(),ne.setSettings(e),ne.restart(),so(e),xt.width=bt.width=e.width,xt.height=bt.height=e.height;let n=e.scaleX||1;bt.style.aspectRatio=(e.width*n/e.height).toString(),$("#noiseSection").css("display",r?"flex":"none"),$("#diversitySection").css("display",e.reduce?"flex":"none"),$("#downloadNativeBtn").css("display",e.toNative?"inline":"none"),$("#gotoIDE").css("display",Xa()?"inline":"none"),Ee&&Rt(Ee.url),za(),bo(e)}function At(){var e=gt||"image";try{e=e.split(".").shift()||"image"}catch(r){}return e+"-"+ne.settings.id}function Ha(){var e=ne.lastPixels;let r=ne.settings.toNative;if(!r)return null;var n=Jt[r];return e&&n&&n(e,ne.settings)}function uo(){var e=Ha();if(e!=null){var r=new Blob([e],{type:"application/octet-stream"});(0,cr.saveAs)(r,At()+".bin")}}function fo(){bt.toBlob(e=>{(0,cr.saveAs)(e,At()+".png")},"image/png")}function po(e){var r="";if(e!=null){for(var n=new Array,o=0;o<256;++o)n[o]=String.fromCharCode(o);for(var u=e.length,o=0;o<u;o++)r+=n[e[o]]}return r}function Xa(){var e="getFileViewerCode_"+ne.settings.id.replace(/[^a-z0-9]/g,"_"),r=rr[e];return r}async function mo(){function e(m,p,l){$('<input type="hidden"/>').attr("name",p).val(l).appendTo(m)}if(confirm("Open code sample with image in 8bitworkshop?")){var r=ne.settings.id.split(".")[0],n=$(document.forms.ideForm);n.empty(),r=="atari8"&&(r="atari8-800"),r=="cpc"&&(r="cpc.6128"),e(n,"platform",r);var o="viewer-"+At()+".asm",u=At()+".bin";e(n,"file0_name",o);var b=Xa()();b=b.replace("$DATAFILE",At()+".bin"),e(n,"file0_data",b),e(n,"file0_type","utf8"),e(n,"file1_name",u),e(n,"file1_data",btoa(po(Ha()))),e(n,"file1_type","binary"),n.submit()}}function za(){let e={sys:ne.settings.id,image:St};window.location.hash="#"+$.param(e)}function go(e){e.startsWith("?")&&(e=e.substr(1));var r=e.split("&");if(!r||r.length==0)return{};for(var n={},o=0;o<r.length;++o){var u=r[o].split("=",2);u.length==1?n[u[0]]="":n[u[0]]=decodeURIComponent(u[1].replace(/\+/g," "))}return n}function bo(e){let r=$("#targetFormatSelect");r.empty();let[n,o]=e.name.split(" ("),u=new Set,b=null;dt.forEach(m=>{if(m==null)r.append($("<option disabled></option>"));else{let[p,l]=m.name.split(" ("),f=$("<option />").text(m.name).val(m.id);if(p==n)b||(b=$("<optgroup />").attr("label",n),r.append(b)),b.append(f);else if(!u.has(p)){let h=$("<option />").text(p).val(m.id);r.append(h)}u.add(p)}}),r.val(e.id)}function Ao(){if(window.addEventListener("load",function(){ro(),document.querySelector('input[type="file"]').addEventListener("change",function(u){var b=u.target,m=b.files&&b.files[0];if(m){gt=m.name,St="";var p=URL.createObjectURL(m);Rt(p)}}),Fa.forEach(u=>{$('<a class="dropdown-item" href="#"></a>').text(u).appendTo("#examplesMenu")}),$("#examplesMenu").click(u=>{var b=$(u.target).text();gt=St=b,Rt("images/"+b),eo.value=""}),Qa.forEach((u,b)=>{var m=$("<option />").text(u.name).val(b);$("#diffuseTypeSelect").append(m)}),to.forEach((u,b)=>{var m=$("<option />").text(u.name).val(u.id);$("#errorFuncSelect").append(m)}),ne.pixelsAvailable=u=>{io(bt,u.img),lo(u.pal)};let r=go(window.location.hash.substring(1)),n=r.sys||dt[0].id,o=_t[n];La(o),gt=St=r.image||"seurat.jpg",Rt("images/"+gt),$("#diffuseSlider").on("change",Ke),$("#orderedSlider").on("change",Ke),$("#noiseSlider").on("change",Ke),$("#diversitySlider").on("change",nt),$("#brightSlider").on("change",nt),$("#contrastSlider").on("change",nt),$("#saturationSlider").on("change",nt),$("#resetButton").on("click",Ke),$("#diffuseTypeSelect").on("change",Ke),$("#targetFormatSelect").change(u=>{var b=u.target.selectedOptions[0];b&&La(_t[b.value])}),$("#errorFuncSelect").on("change",Ke),$("#downloadImageBtn").click(fo),$("#downloadNativeBtn").click(uo),$("#gotoIDE").click(mo)}),window.location.search=="?printmeta"){let r=function(){var n="";dt.forEach(o=>{o&&(n+="* "+o.name+" - "+$a(o)+`
`)}),console.log(n)};var e=r;r()}}Ao();export{ne as dithertron,Ao as startUI};
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
