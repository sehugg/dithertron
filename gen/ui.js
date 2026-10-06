var Qn=Object.create;var _r=Object.defineProperty,Ln=Object.defineProperties,On=Object.getOwnPropertyDescriptor,Gn=Object.getOwnPropertyDescriptors,Un=Object.getOwnPropertyNames,Ja=Object.getOwnPropertySymbols,Nn=Object.getPrototypeOf,ti=Object.prototype.hasOwnProperty,Hn=Object.prototype.propertyIsEnumerable;var ei=(e,t,r)=>t in e?_r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ge=(e,t)=>{for(var r in t||(t={}))ti.call(t,r)&&ei(e,r,t[r]);if(Ja)for(var r of Ja(t))Hn.call(t,r)&&ei(e,r,t[r]);return e},be=(e,t)=>Ln(e,Gn(t));var Kt=(e=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(e,{get:(t,r)=>(typeof require!="undefined"?require:t)[r]}):e)(function(e){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var fa=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ri=(e,t)=>{for(var r in t)_r(e,r,{get:t[r],enumerable:!0})},$n=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Un(t))!ti.call(e,s)&&s!==r&&_r(e,s,{get:()=>t[s],enumerable:!(i=On(t,s))||i.enumerable});return e};var da=(e,t,r)=>(r=e!=null?Qn(Nn(e)):{},$n(t||!e||!e.__esModule?_r(r,"default",{value:e,enumerable:!0}):r,e));var Ki=fa((Fa,Qa)=>{(function(e,t){typeof Fa=="object"&&typeof Qa!="undefined"?Qa.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis!="undefined"?globalThis:e||self,e.Cropper=t())})(Fa,(function(){"use strict";function e(l,a){(a==null||a>l.length)&&(a=l.length);for(var o=0,n=Array(a);o<a;o++)n[o]=l[o];return n}function t(l){if(Array.isArray(l))return e(l)}function r(l,a){if(!(l instanceof a))throw new TypeError("Cannot call a class as a function")}function i(l,a){for(var o=0;o<a.length;o++){var n=a[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(l,v(n.key),n)}}function s(l,a,o){return a&&i(l.prototype,a),o&&i(l,o),Object.defineProperty(l,"prototype",{writable:!1}),l}function c(l,a,o){return(a=v(a))in l?Object.defineProperty(l,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):l[a]=o,l}function u(l){if(typeof Symbol!="undefined"&&l[Symbol.iterator]!=null||l["@@iterator"]!=null)return Array.from(l)}function f(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function d(l,a){var o=Object.keys(l);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(l);a&&(n=n.filter(function(A){return Object.getOwnPropertyDescriptor(l,A).enumerable})),o.push.apply(o,n)}return o}function g(l){for(var a=1;a<arguments.length;a++){var o=arguments[a]!=null?arguments[a]:{};a%2?d(Object(o),!0).forEach(function(n){c(l,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(o)):d(Object(o)).forEach(function(n){Object.defineProperty(l,n,Object.getOwnPropertyDescriptor(o,n))})}return l}function b(l){return t(l)||u(l)||P(l)||f()}function M(l,a){if(typeof l!="object"||!l)return l;var o=l[Symbol.toPrimitive];if(o!==void 0){var n=o.call(l,a||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(l)}function v(l){var a=M(l,"string");return typeof a=="symbol"?a:a+""}function E(l){"@babel/helpers - typeof";return E=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},E(l)}function P(l,a){if(l){if(typeof l=="string")return e(l,a);var o={}.toString.call(l).slice(8,-1);return o==="Object"&&l.constructor&&(o=l.constructor.name),o==="Map"||o==="Set"?Array.from(l):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(l,a):void 0}}var Q=typeof window!="undefined"&&typeof window.document!="undefined",F=Q?window:{},H=Q&&F.document.documentElement?"ontouchstart"in F.document.documentElement:!1,G=Q?"PointerEvent"in F:!1,U="cropper",J="all",re="crop",O="move",X="zoom",W="e",Y="w",q="s",Z="n",ae="ne",se="nw",me="se",Be="sw",ke="".concat(U,"-crop"),Ye="".concat(U,"-disabled"),le="".concat(U,"-hidden"),st="".concat(U,"-hide"),Ve="".concat(U,"-invisible"),ze="".concat(U,"-modal"),Ae="".concat(U,"-move"),De="".concat(U,"Action"),je="".concat(U,"Preview"),Qt="crop",or="move",sr="none",Lt="crop",Ot="cropend",Gt="cropmove",Ut="cropstart",lr="dblclick",jr=H?"touchstart":"mousedown",qr=H?"touchmove":"mousemove",Kr=H?"touchend touchcancel":"mouseup",Fe=G?"pointerdown":jr,cr=G?"pointermove":qr,Nt=G?"pointerup pointercancel":Kr,lt="ready",yt="resize",Et="wheel",ct="zoom",Ht="image/jpeg",hr=/^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,ur=/^data:/,fr=/^data:image\/jpeg;base64,/,ht=/\s+/,dr=/^(img|canvas)$/i,$t=200,Xt=100,Wt={viewMode:0,dragMode:Qt,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:$t,minContainerHeight:Xt,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},mr='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',pr=Number.isNaN||F.isNaN,Bt=Number.isFinite||F.isFinite;function V(l){return typeof l=="number"&&!pr(l)}var Ar=function(a){return a>0&&a<1/0};function Yt(l){return typeof l=="undefined"}function Se(l){return E(l)==="object"&&l!==null}var gr=Object.prototype.hasOwnProperty;function qe(l){if(!Se(l))return!1;try{var a=l.constructor,o=a.prototype;return a&&o&&gr.call(o,"isPrototypeOf")}catch(n){return!1}}function ie(l){return typeof l=="function"}var Zr=Array.prototype.slice;function br(l){return Array.from?Array.from(l):Zr.call(l)}function ce(l,a){return l&&ie(a)&&(Array.isArray(l)||V(l.length)?br(l).forEach(function(o,n){a.call(l,o,n,l)}):Se(l)&&Object.keys(l).forEach(function(o){a.call(l,l[o],o,l)})),l}var ne=Object.assign||function(a){for(var o=arguments.length,n=new Array(o>1?o-1:0),A=1;A<o;A++)n[A-1]=arguments[A];return Se(a)&&n.length>0&&n.forEach(function(p){Se(p)&&Object.keys(p).forEach(function(x){a[x]=p[x]})}),a},Jr=/\.\d*(?:0|9){12}\d*$/;function Ke(l){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return Jr.test(l)?Math.round(l*a)/a:l}var ea=/^width|height|left|top|marginLeft|marginTop$/;function Le(l,a){var o=l.style;ce(a,function(n,A){ea.test(A)&&V(n)&&(n="".concat(n,"px")),o[A]=n})}function ta(l,a){return l.classList?l.classList.contains(a):l.className.split(ht).indexOf(a)>-1}function fe(l,a){if(a){if(V(l.length)){ce(l,function(n){fe(n,a)});return}if(l.classList){l.classList.add(a);return}var o=l.className.trim();o?o.indexOf(a)<0&&(l.className="".concat(o," ").concat(a)):l.className=a}}function Re(l,a){if(a){if(V(l.length)){ce(l,function(o){Re(o,a)});return}if(l.classList){l.classList.remove(a);return}l.className.indexOf(a)>=0&&(l.className=l.className.split(ht).filter(function(o){return o&&o!==a}).join(" "))}}function Ze(l,a,o){if(a){if(V(l.length)){ce(l,function(n){Ze(n,a,o)});return}o?fe(l,a):Re(l,a)}}var ra=/([a-z\d])([A-Z])/g;function _t(l){return typeof l=="string"?l.replace(ra,"$1-$2").toLowerCase():""}function Vt(l,a){return Se(l[a])?l[a]:l.dataset?l.dataset[a]:l.getAttribute("data-".concat(_t(a)))}function ut(l,a,o){Se(o)?l[a]=o:l.dataset?l.dataset[a]=o:l.setAttribute("data-".concat(_t(a)),o)}function aa(l,a){if(Se(l[a]))try{delete l[a]}catch(o){l[a]=void 0}else if(l.dataset)try{delete l.dataset[a]}catch(o){l.dataset[a]=void 0}else l.removeAttribute("data-".concat(_t(a)))}var xr=(function(){var l=!1;if(Q){var a=!1,o=function(){},n=Object.defineProperty({},"once",{get:function(){return l=!0,a},set:function(p){a=p}});F.addEventListener("test",o,n),F.removeEventListener("test",o,n)}return l})();function _e(l,a,o){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};if(!(!l||!a||!ie(l.removeEventListener))){var A=o;a.trim().split(ht).forEach(function(p){if(!xr){var x=l.__cropperListeners__||{};x[p]&&x[p][o]&&(A=x[p][o],delete x[p][o],Object.keys(x[p]).length===0&&delete x[p],Object.keys(x).length===0&&delete l.__cropperListeners__)}l.removeEventListener(p,A,n)})}}function ve(l,a,o){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};if(!(!l||!a||!ie(l.addEventListener)||!ie(o))){var A=o;a.trim().split(ht).forEach(function(p){if(n.once&&!xr){var x=l.__cropperListeners__||{};A=function(){x[p]&&x[p][o]&&delete x[p][o],l.removeEventListener(p,A,n);for(var k=arguments.length,S=new Array(k),_=0;_<k;_++)S[_]=arguments[_];o.apply(l,S)},x[p]||(x[p]={}),x[p][o]&&l.removeEventListener(p,x[p][o],n),x[p][o]=A,l.__cropperListeners__=x}l.addEventListener(p,A,n)})}}function Je(l,a,o){if(!l||!a||!ie(l.dispatchEvent))return!1;var n;if(ie(Event)&&ie(CustomEvent))n=new CustomEvent(a,{detail:o,bubbles:!0,cancelable:!0});else if(Se(document)&&ie(document.createEvent))n=document.createEvent("CustomEvent"),n.initCustomEvent(a,!0,!0,o);else return!1;return l.dispatchEvent(n)}function Cr(l){if(!l||!ie(l.getBoundingClientRect))return{left:0,top:0};var a=l.getBoundingClientRect(),o=document||{},n=o.documentElement,A=n===void 0?{}:n,p=F.pageXOffset||0,x=F.pageYOffset||0;return{left:a.left+(p-(A.clientLeft||0)),top:a.top+(x-(A.clientTop||0))}}var zt=F.location,ia=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i;function vr(l){var a=l.match(ia);return a!==null&&(a[1]!==zt.protocol||a[2]!==zt.hostname||a[3]!==zt.port)}function Ir(l){var a=l.indexOf("#"),o=a>=0?l.slice(a):"",n=a>=0?l.slice(0,a):l,A="timestamp=".concat(new Date().getTime());return"".concat(n).concat(n.indexOf("?")===-1?"?":"&").concat(A).concat(o)}function ft(l){var a=l.rotate,o=l.scaleX,n=l.scaleY,A=l.translateX,p=l.translateY,x=[];V(A)&&A!==0&&x.push("translateX(".concat(A,"px)")),V(p)&&p!==0&&x.push("translateY(".concat(p,"px)")),V(a)&&a!==0&&x.push("rotate(".concat(a,"deg)")),V(o)&&o!==1&&x.push("scaleX(".concat(o,")")),V(n)&&n!==1&&x.push("scaleY(".concat(n,")"));var B=x.length?x.join(" "):"none";return{WebkitTransform:B,msTransform:B,transform:B}}function na(l){var a=g({},l),o=0;return ce(l,function(n,A){delete a[A],ce(a,function(p){var x=Math.abs(n.startX-p.startX),B=Math.abs(n.startY-p.startY),k=Math.abs(n.endX-p.endX),S=Math.abs(n.endY-p.endY),_=Math.sqrt(x*x+B*B),R=Math.sqrt(k*k+S*S);if(!(!Bt(_)||!Bt(R)||_===0||R===_)){var L=(R-_)/_;Bt(L)&&Math.abs(L)>Math.abs(o)&&(o=L)}})}),o}function Mt(l,a){var o=l.pageX,n=l.pageY,A={endX:o,endY:n};return a?A:g({startX:o,startY:n},A)}function wr(l){var a=0,o=0,n=0;return ce(l,function(A){var p=A.startX,x=A.startY;a+=p,o+=x,n+=1}),a/=n,o/=n,{pageX:a,pageY:o}}function Ie(l){var a=l.aspectRatio,o=l.height,n=l.width,A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"contain",p=Ar(n),x=Ar(o);if(p&&x){var B=o*a;A==="contain"&&B>n||A==="cover"&&B<n?o=n/a:n=o*a}else p?o=n/a:x&&(n=o*a);return{width:n,height:o}}function yr(l){var a=l.width,o=l.height,n=l.degree;if(n=Math.abs(n)%180,n===90)return{width:o,height:a};var A=n%90*Math.PI/180,p=Math.sin(A),x=Math.cos(A),B=a*x+o*p,k=a*p+o*x;return n>90?{width:k,height:B}:{width:B,height:k}}function et(l,a,o,n){var A=a.aspectRatio,p=a.naturalWidth,x=a.naturalHeight,B=a.rotate,k=B===void 0?0:B,S=a.scaleX,_=S===void 0?1:S,R=a.scaleY,L=R===void 0?1:R,K=o.aspectRatio,z=o.naturalWidth,oe=o.naturalHeight,ee=n.fillColor,he=ee===void 0?"transparent":ee,ue=n.imageSmoothingEnabled,de=ue===void 0?!0:ue,Ne=n.imageSmoothingQuality,Me=Ne===void 0?"low":Ne,N=n.maxWidth,te=N===void 0?1/0:N,pe=n.maxHeight,Pe=pe===void 0?1/0:pe,He=n.minWidth,dt=He===void 0?0:He,mt=n.minHeight,tt=mt===void 0?0:mt,Oe=document.createElement("canvas"),we=Oe.getContext("2d"),pt=Ie({aspectRatio:K,width:te,height:Pe}),Br=Ie({aspectRatio:K,width:dt,height:tt},"cover"),ha=Math.min(pt.width,Math.max(Br.width,z)),ua=Math.min(pt.height,Math.max(Br.height,oe)),ja=Ie({aspectRatio:A,width:te,height:Pe}),qa=Ie({aspectRatio:A,width:dt,height:tt},"cover"),Ka=Math.min(ja.width,Math.max(qa.width,p)),Za=Math.min(ja.height,Math.max(qa.height,x)),kn=[-Ka/2,-Za/2,Ka,Za];return Oe.width=Ke(ha),Oe.height=Ke(ua),we.fillStyle=he,we.fillRect(0,0,ha,ua),we.save(),we.translate(ha/2,ua/2),we.rotate(k*Math.PI/180),we.scale(_,L),we.imageSmoothingEnabled=de,we.imageSmoothingQuality=Me,we.drawImage.apply(we,[l].concat(b(kn.map(function(Fn){return Math.floor(Ke(Fn))})))),we.restore(),Oe}var Er=String.fromCharCode;function Dt(l,a,o){var n="";o+=a;for(var A=a;A<o;A+=1)n+=Er(l.getUint8(A));return n}var jt=/^data:.*,/;function oa(l){var a=l.replace(jt,""),o=atob(a),n=new ArrayBuffer(o.length),A=new Uint8Array(n);return ce(A,function(p,x){A[x]=o.charCodeAt(x)}),n}function sa(l,a){for(var o=[],n=8192,A=new Uint8Array(l);A.length>0;)o.push(Er.apply(null,br(A.subarray(0,n)))),A=A.subarray(n);return"data:".concat(a,";base64,").concat(btoa(o.join("")))}function qt(l){var a=new DataView(l),o;try{var n,A,p;if(a.getUint8(0)===255&&a.getUint8(1)===216)for(var x=a.byteLength,B=2;B+1<x;){if(a.getUint8(B)===255&&a.getUint8(B+1)===225){A=B;break}B+=1}if(A){var k=A+4,S=A+10;if(Dt(a,k,4)==="Exif"){var _=a.getUint16(S);if(n=_===18761,(n||_===19789)&&a.getUint16(S+2,n)===42){var R=a.getUint32(S+4,n);R>=8&&(p=S+R)}}}if(p){var L=a.getUint16(p,n),K,z;for(z=0;z<L;z+=1)if(K=p+z*12+2,a.getUint16(K,n)===274){K+=8,o=a.getUint16(K,n),a.setUint16(K,1,n);break}}}catch(oe){o=1}return o}function la(l){var a=0,o=1,n=1;switch(l){case 2:o=-1;break;case 3:a=-180;break;case 4:n=-1;break;case 5:a=90,n=-1;break;case 6:a=90;break;case 7:a=90,o=-1;break;case 8:a=-90;break}return{rotate:a,scaleX:o,scaleY:n}}var ca={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var a=this.element,o=this.options,n=this.container,A=this.cropper,p=Number(o.minContainerWidth),x=Number(o.minContainerHeight);fe(A,le),Re(a,le);var B={width:Math.max(n.offsetWidth,p>=0?p:$t),height:Math.max(n.offsetHeight,x>=0?x:Xt)};this.containerData=B,Le(A,{width:B.width,height:B.height}),fe(a,le),Re(A,le)},initCanvas:function(){var a=this.containerData,o=this.imageData,n=this.options.viewMode,A=Math.abs(o.rotate)%180===90,p=A?o.naturalHeight:o.naturalWidth,x=A?o.naturalWidth:o.naturalHeight,B=p/x,k=a.width,S=a.height;a.height*B>a.width?n===3?k=a.height*B:S=a.width/B:n===3?S=a.width/B:k=a.height*B;var _={aspectRatio:B,naturalWidth:p,naturalHeight:x,width:k,height:S};this.canvasData=_,this.limited=n===1||n===2,this.limitCanvas(!0,!0),_.width=Math.min(Math.max(_.width,_.minWidth),_.maxWidth),_.height=Math.min(Math.max(_.height,_.minHeight),_.maxHeight),_.left=(a.width-_.width)/2,_.top=(a.height-_.height)/2,_.oldLeft=_.left,_.oldTop=_.top,this.initialCanvasData=ne({},_)},limitCanvas:function(a,o){var n=this.options,A=this.containerData,p=this.canvasData,x=this.cropBoxData,B=n.viewMode,k=p.aspectRatio,S=this.cropped&&x;if(a){var _=Number(n.minCanvasWidth)||0,R=Number(n.minCanvasHeight)||0;B>1?(_=Math.max(_,A.width),R=Math.max(R,A.height),B===3&&(R*k>_?_=R*k:R=_/k)):B>0&&(_?_=Math.max(_,S?x.width:0):R?R=Math.max(R,S?x.height:0):S&&(_=x.width,R=x.height,R*k>_?_=R*k:R=_/k));var L=Ie({aspectRatio:k,width:_,height:R});_=L.width,R=L.height,p.minWidth=_,p.minHeight=R,p.maxWidth=1/0,p.maxHeight=1/0}if(o)if(B>(S?0:1)){var K=A.width-p.width,z=A.height-p.height;p.minLeft=Math.min(0,K),p.minTop=Math.min(0,z),p.maxLeft=Math.max(0,K),p.maxTop=Math.max(0,z),S&&this.limited&&(p.minLeft=Math.min(x.left,x.left+(x.width-p.width)),p.minTop=Math.min(x.top,x.top+(x.height-p.height)),p.maxLeft=x.left,p.maxTop=x.top,B===2&&(p.width>=A.width&&(p.minLeft=Math.min(0,K),p.maxLeft=Math.max(0,K)),p.height>=A.height&&(p.minTop=Math.min(0,z),p.maxTop=Math.max(0,z))))}else p.minLeft=-p.width,p.minTop=-p.height,p.maxLeft=A.width,p.maxTop=A.height},renderCanvas:function(a,o){var n=this.canvasData,A=this.imageData;if(o){var p=yr({width:A.naturalWidth*Math.abs(A.scaleX||1),height:A.naturalHeight*Math.abs(A.scaleY||1),degree:A.rotate||0}),x=p.width,B=p.height,k=n.width*(x/n.naturalWidth),S=n.height*(B/n.naturalHeight);n.left-=(k-n.width)/2,n.top-=(S-n.height)/2,n.width=k,n.height=S,n.aspectRatio=x/B,n.naturalWidth=x,n.naturalHeight=B,this.limitCanvas(!0,!1)}(n.width>n.maxWidth||n.width<n.minWidth)&&(n.left=n.oldLeft),(n.height>n.maxHeight||n.height<n.minHeight)&&(n.top=n.oldTop),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),this.limitCanvas(!1,!0),n.left=Math.min(Math.max(n.left,n.minLeft),n.maxLeft),n.top=Math.min(Math.max(n.top,n.minTop),n.maxTop),n.oldLeft=n.left,n.oldTop=n.top,Le(this.canvas,ne({width:n.width,height:n.height},ft({translateX:n.left,translateY:n.top}))),this.renderImage(a),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(a){var o=this.canvasData,n=this.imageData,A=n.naturalWidth*(o.width/o.naturalWidth),p=n.naturalHeight*(o.height/o.naturalHeight);ne(n,{width:A,height:p,left:(o.width-A)/2,top:(o.height-p)/2}),Le(this.image,ne({width:n.width,height:n.height},ft(ne({translateX:n.left,translateY:n.top},n)))),a&&this.output()},initCropBox:function(){var a=this.options,o=this.canvasData,n=a.aspectRatio||a.initialAspectRatio,A=Number(a.autoCropArea)||.8,p={width:o.width,height:o.height};n&&(o.height*n>o.width?p.height=p.width/n:p.width=p.height*n),this.cropBoxData=p,this.limitCropBox(!0,!0),p.width=Math.min(Math.max(p.width,p.minWidth),p.maxWidth),p.height=Math.min(Math.max(p.height,p.minHeight),p.maxHeight),p.width=Math.max(p.minWidth,p.width*A),p.height=Math.max(p.minHeight,p.height*A),p.left=o.left+(o.width-p.width)/2,p.top=o.top+(o.height-p.height)/2,p.oldLeft=p.left,p.oldTop=p.top,this.initialCropBoxData=ne({},p)},limitCropBox:function(a,o){var n=this.options,A=this.containerData,p=this.canvasData,x=this.cropBoxData,B=this.limited,k=n.aspectRatio;if(a){var S=Number(n.minCropBoxWidth)||0,_=Number(n.minCropBoxHeight)||0,R=B?Math.min(A.width,p.width,p.width+p.left,A.width-p.left):A.width,L=B?Math.min(A.height,p.height,p.height+p.top,A.height-p.top):A.height;S=Math.min(S,A.width),_=Math.min(_,A.height),k&&(S&&_?_*k>S?_=S/k:S=_*k:S?_=S/k:_&&(S=_*k),L*k>R?L=R/k:R=L*k),x.minWidth=Math.min(S,R),x.minHeight=Math.min(_,L),x.maxWidth=R,x.maxHeight=L}o&&(B?(x.minLeft=Math.max(0,p.left),x.minTop=Math.max(0,p.top),x.maxLeft=Math.min(A.width,p.left+p.width)-x.width,x.maxTop=Math.min(A.height,p.top+p.height)-x.height):(x.minLeft=0,x.minTop=0,x.maxLeft=A.width-x.width,x.maxTop=A.height-x.height))},renderCropBox:function(){var a=this.options,o=this.containerData,n=this.cropBoxData;(n.width>n.maxWidth||n.width<n.minWidth)&&(n.left=n.oldLeft),(n.height>n.maxHeight||n.height<n.minHeight)&&(n.top=n.oldTop),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),this.limitCropBox(!1,!0),n.left=Math.min(Math.max(n.left,n.minLeft),n.maxLeft),n.top=Math.min(Math.max(n.top,n.minTop),n.maxTop),n.oldLeft=n.left,n.oldTop=n.top,a.movable&&a.cropBoxMovable&&ut(this.face,De,n.width>=o.width&&n.height>=o.height?O:J),Le(this.cropBox,ne({width:n.width,height:n.height},ft({translateX:n.left,translateY:n.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),Je(this.element,Lt,this.getData())}},h={initPreview:function(){var a=this.element,o=this.crossOrigin,n=this.options.preview,A=o?this.crossOriginUrl:this.url,p=a.alt||"The image to preview",x=document.createElement("img");if(o&&(x.crossOrigin=o),x.src=A,x.alt=p,this.viewBox.appendChild(x),this.viewBoxImage=x,!!n){var B=n;typeof n=="string"?B=a.ownerDocument.querySelectorAll(n):n.querySelector&&(B=[n]),this.previews=B,ce(B,function(k){var S=document.createElement("img");ut(k,je,{width:k.offsetWidth,height:k.offsetHeight,html:k.innerHTML}),o&&(S.crossOrigin=o),S.src=A,S.alt=p,S.style.cssText="display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;",k.innerHTML="",k.appendChild(S)})}},resetPreview:function(){ce(this.previews,function(a){var o=Vt(a,je);Le(a,{width:o.width,height:o.height}),a.innerHTML=o.html,aa(a,je)})},preview:function(){var a=this.imageData,o=this.canvasData,n=this.cropBoxData,A=n.width,p=n.height,x=a.width,B=a.height,k=n.left-o.left-a.left,S=n.top-o.top-a.top;!this.cropped||this.disabled||(Le(this.viewBoxImage,ne({width:x,height:B},ft(ne({translateX:-k,translateY:-S},a)))),ce(this.previews,function(_){var R=Vt(_,je),L=R.width,K=R.height,z=L,oe=K,ee=1;A&&(ee=L/A,oe=p*ee),p&&oe>K&&(ee=K/p,z=A*ee,oe=K),Le(_,{width:z,height:oe}),Le(_.getElementsByTagName("img")[0],ne({width:x*ee,height:B*ee},ft(ne({translateX:-k*ee,translateY:-S*ee},a))))}))}},C={bind:function(){var a=this.element,o=this.options,n=this.cropper;ie(o.cropstart)&&ve(a,Ut,o.cropstart),ie(o.cropmove)&&ve(a,Gt,o.cropmove),ie(o.cropend)&&ve(a,Ot,o.cropend),ie(o.crop)&&ve(a,Lt,o.crop),ie(o.zoom)&&ve(a,ct,o.zoom),ve(n,Fe,this.onCropStart=this.cropStart.bind(this)),o.zoomable&&o.zoomOnWheel&&ve(n,Et,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),o.toggleDragModeOnDblclick&&ve(n,lr,this.onDblclick=this.dblclick.bind(this)),ve(a.ownerDocument,cr,this.onCropMove=this.cropMove.bind(this)),ve(a.ownerDocument,Nt,this.onCropEnd=this.cropEnd.bind(this)),o.responsive&&ve(window,yt,this.onResize=this.resize.bind(this))},unbind:function(){var a=this.element,o=this.options,n=this.cropper;ie(o.cropstart)&&_e(a,Ut,o.cropstart),ie(o.cropmove)&&_e(a,Gt,o.cropmove),ie(o.cropend)&&_e(a,Ot,o.cropend),ie(o.crop)&&_e(a,Lt,o.crop),ie(o.zoom)&&_e(a,ct,o.zoom),_e(n,Fe,this.onCropStart),o.zoomable&&o.zoomOnWheel&&_e(n,Et,this.onWheel,{passive:!1,capture:!0}),o.toggleDragModeOnDblclick&&_e(n,lr,this.onDblclick),_e(a.ownerDocument,cr,this.onCropMove),_e(a.ownerDocument,Nt,this.onCropEnd),o.responsive&&_e(window,yt,this.onResize)}},m={resize:function(){if(!this.disabled){var a=this.options,o=this.container,n=this.containerData,A=o.offsetWidth/n.width,p=o.offsetHeight/n.height,x=Math.abs(A-1)>Math.abs(p-1)?A:p;if(x!==1){var B,k;a.restore&&(B=this.getCanvasData(),k=this.getCropBoxData()),this.render(),a.restore&&(this.setCanvasData(ce(B,function(S,_){B[_]=S*x})),this.setCropBoxData(ce(k,function(S,_){k[_]=S*x})))}}},dblclick:function(){this.disabled||this.options.dragMode===sr||this.setDragMode(ta(this.dragBox,ke)?or:Qt)},wheel:function(a){var o=this,n=Number(this.options.wheelZoomRatio)||.1,A=1;this.disabled||(a.preventDefault(),!this.wheeling&&(this.wheeling=!0,setTimeout(function(){o.wheeling=!1},50),a.deltaY?A=a.deltaY>0?1:-1:a.wheelDelta?A=-a.wheelDelta/120:a.detail&&(A=a.detail>0?1:-1),this.zoom(-A*n,a)))},cropStart:function(a){var o=a.buttons,n=a.button;if(!(this.disabled||(a.type==="mousedown"||a.type==="pointerdown"&&a.pointerType==="mouse")&&(V(o)&&o!==1||V(n)&&n!==0||a.ctrlKey))){var A=this.options,p=this.pointers,x;a.changedTouches?ce(a.changedTouches,function(B){p[B.identifier]=Mt(B)}):p[a.pointerId||0]=Mt(a),Object.keys(p).length>1&&A.zoomable&&A.zoomOnTouch?x=X:x=Vt(a.target,De),hr.test(x)&&Je(this.element,Ut,{originalEvent:a,action:x})!==!1&&(a.preventDefault(),this.action=x,this.cropping=!1,x===re&&(this.cropping=!0,fe(this.dragBox,ze)))}},cropMove:function(a){var o=this.action;if(!(this.disabled||!o)){var n=this.pointers;a.preventDefault(),Je(this.element,Gt,{originalEvent:a,action:o})!==!1&&(a.changedTouches?ce(a.changedTouches,function(A){ne(n[A.identifier]||{},Mt(A,!0))}):ne(n[a.pointerId||0]||{},Mt(a,!0)),this.change(a))}},cropEnd:function(a){if(!this.disabled){var o=this.action,n=this.pointers;a.changedTouches?ce(a.changedTouches,function(A){delete n[A.identifier]}):delete n[a.pointerId||0],o&&(a.preventDefault(),Object.keys(n).length||(this.action=""),this.cropping&&(this.cropping=!1,Ze(this.dragBox,ze,this.cropped&&this.options.modal)),Je(this.element,Ot,{originalEvent:a,action:o}))}}},w={change:function(a){var o=this.options,n=this.canvasData,A=this.containerData,p=this.cropBoxData,x=this.pointers,B=this.action,k=o.aspectRatio,S=p.left,_=p.top,R=p.width,L=p.height,K=S+R,z=_+L,oe=0,ee=0,he=A.width,ue=A.height,de=!0,Ne;!k&&a.shiftKey&&(k=R&&L?R/L:1),this.limited&&(oe=p.minLeft,ee=p.minTop,he=oe+Math.min(A.width,n.width,n.left+n.width),ue=ee+Math.min(A.height,n.height,n.top+n.height));var Me=x[Object.keys(x)[0]],N={x:Me.endX-Me.startX,y:Me.endY-Me.startY},te=function(Pe){switch(Pe){case W:K+N.x>he&&(N.x=he-K);break;case Y:S+N.x<oe&&(N.x=oe-S);break;case Z:_+N.y<ee&&(N.y=ee-_);break;case q:z+N.y>ue&&(N.y=ue-z);break}};switch(B){case J:S+=N.x,_+=N.y;break;case W:if(N.x>=0&&(K>=he||k&&(_<=ee||z>=ue))){de=!1;break}te(W),R+=N.x,R<0&&(B=Y,R=-R,S-=R),k&&(L=R/k,_+=(p.height-L)/2);break;case Z:if(N.y<=0&&(_<=ee||k&&(S<=oe||K>=he))){de=!1;break}te(Z),L-=N.y,_+=N.y,L<0&&(B=q,L=-L,_-=L),k&&(R=L*k,S+=(p.width-R)/2);break;case Y:if(N.x<=0&&(S<=oe||k&&(_<=ee||z>=ue))){de=!1;break}te(Y),R-=N.x,S+=N.x,R<0&&(B=W,R=-R,S-=R),k&&(L=R/k,_+=(p.height-L)/2);break;case q:if(N.y>=0&&(z>=ue||k&&(S<=oe||K>=he))){de=!1;break}te(q),L+=N.y,L<0&&(B=Z,L=-L,_-=L),k&&(R=L*k,S+=(p.width-R)/2);break;case ae:if(k){if(N.y<=0&&(_<=ee||K>=he)){de=!1;break}te(Z),L-=N.y,_+=N.y,R=L*k}else te(Z),te(W),N.x>=0?K<he?R+=N.x:N.y<=0&&_<=ee&&(de=!1):R+=N.x,N.y<=0?_>ee&&(L-=N.y,_+=N.y):(L-=N.y,_+=N.y);R<0&&L<0?(B=Be,L=-L,R=-R,_-=L,S-=R):R<0?(B=se,R=-R,S-=R):L<0&&(B=me,L=-L,_-=L);break;case se:if(k){if(N.y<=0&&(_<=ee||S<=oe)){de=!1;break}te(Z),L-=N.y,_+=N.y,R=L*k,S+=p.width-R}else te(Z),te(Y),N.x<=0?S>oe?(R-=N.x,S+=N.x):N.y<=0&&_<=ee&&(de=!1):(R-=N.x,S+=N.x),N.y<=0?_>ee&&(L-=N.y,_+=N.y):(L-=N.y,_+=N.y);R<0&&L<0?(B=me,L=-L,R=-R,_-=L,S-=R):R<0?(B=ae,R=-R,S-=R):L<0&&(B=Be,L=-L,_-=L);break;case Be:if(k){if(N.x<=0&&(S<=oe||z>=ue)){de=!1;break}te(Y),R-=N.x,S+=N.x,L=R/k}else te(q),te(Y),N.x<=0?S>oe?(R-=N.x,S+=N.x):N.y>=0&&z>=ue&&(de=!1):(R-=N.x,S+=N.x),N.y>=0?z<ue&&(L+=N.y):L+=N.y;R<0&&L<0?(B=ae,L=-L,R=-R,_-=L,S-=R):R<0?(B=me,R=-R,S-=R):L<0&&(B=se,L=-L,_-=L);break;case me:if(k){if(N.x>=0&&(K>=he||z>=ue)){de=!1;break}te(W),R+=N.x,L=R/k}else te(q),te(W),N.x>=0?K<he?R+=N.x:N.y>=0&&z>=ue&&(de=!1):R+=N.x,N.y>=0?z<ue&&(L+=N.y):L+=N.y;R<0&&L<0?(B=se,L=-L,R=-R,_-=L,S-=R):R<0?(B=Be,R=-R,S-=R):L<0&&(B=ae,L=-L,_-=L);break;case O:this.move(N.x,N.y),de=!1;break;case X:this.zoom(na(x),a),de=!1;break;case re:if(!N.x||!N.y){de=!1;break}Ne=Cr(this.cropper),S=Me.startX-Ne.left,_=Me.startY-Ne.top,R=p.minWidth,L=p.minHeight,N.x>0?B=N.y>0?me:ae:N.x<0&&(S-=R,B=N.y>0?Be:se),N.y<0&&(_-=L),this.cropped||(Re(this.cropBox,le),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0));break}de&&(p.width=R,p.height=L,p.left=S,p.top=_,this.action=B,this.renderCropBox()),ce(x,function(pe){pe.startX=pe.endX,pe.startY=pe.endY})}},y={crop:function(){return this.ready&&!this.cropped&&!this.disabled&&(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&fe(this.dragBox,ze),Re(this.cropBox,le),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=ne({},this.initialImageData),this.canvasData=ne({},this.initialCanvasData),this.cropBoxData=ne({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(ne(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),Re(this.dragBox,ze),fe(this.cropBox,le)),this},replace:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return!this.disabled&&a&&(this.isImg&&(this.element.src=a),o?(this.url=a,this.image.src=a,this.ready&&(this.viewBoxImage.src=a,ce(this.previews,function(n){n.getElementsByTagName("img")[0].src=a}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(a))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,Re(this.cropper,Ye)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,fe(this.cropper,Ye)),this},destroy:function(){var a=this.element;return a[U]?(a[U]=void 0,this.isImg&&this.replaced&&(a.src=this.originalUrl),this.uncreate(),this):this},move:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a,n=this.canvasData,A=n.left,p=n.top;return this.moveTo(Yt(a)?a:A+Number(a),Yt(o)?o:p+Number(o))},moveTo:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a,n=this.canvasData,A=!1;return a=Number(a),o=Number(o),this.ready&&!this.disabled&&this.options.movable&&(V(a)&&(n.left=a,A=!0),V(o)&&(n.top=o,A=!0),A&&this.renderCanvas(!0)),this},zoom:function(a,o){var n=this.canvasData;return a=Number(a),a<0?a=1/(1-a):a=1+a,this.zoomTo(n.width*a/n.naturalWidth,null,o)},zoomTo:function(a,o,n){var A=this.options,p=this.canvasData,x=p.width,B=p.height,k=p.naturalWidth,S=p.naturalHeight;if(a=Number(a),a>=0&&this.ready&&!this.disabled&&A.zoomable){var _=k*a,R=S*a;if(Je(this.element,ct,{ratio:a,oldRatio:x/k,originalEvent:n})===!1)return this;if(n){var L=this.pointers,K=Cr(this.cropper),z=L&&Object.keys(L).length?wr(L):{pageX:n.pageX,pageY:n.pageY};p.left-=(_-x)*((z.pageX-K.left-p.left)/x),p.top-=(R-B)*((z.pageY-K.top-p.top)/B)}else qe(o)&&V(o.x)&&V(o.y)?(p.left-=(_-x)*((o.x-p.left)/x),p.top-=(R-B)*((o.y-p.top)/B)):(p.left-=(_-x)/2,p.top-=(R-B)/2);p.width=_,p.height=R,this.renderCanvas(!0)}return this},rotate:function(a){return this.rotateTo((this.imageData.rotate||0)+Number(a))},rotateTo:function(a){return a=Number(a),V(a)&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=a%360,this.renderCanvas(!0,!0)),this},scaleX:function(a){var o=this.imageData.scaleY;return this.scale(a,V(o)?o:1)},scaleY:function(a){var o=this.imageData.scaleX;return this.scale(V(o)?o:1,a)},scale:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a,n=this.imageData,A=!1;return a=Number(a),o=Number(o),this.ready&&!this.disabled&&this.options.scalable&&(V(a)&&(n.scaleX=a,A=!0),V(o)&&(n.scaleY=o,A=!0),A&&this.renderCanvas(!0,!0)),this},getData:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,o=this.options,n=this.imageData,A=this.canvasData,p=this.cropBoxData,x;if(this.ready&&this.cropped){x={x:p.left-A.left,y:p.top-A.top,width:p.width,height:p.height};var B=n.width/n.naturalWidth;if(ce(x,function(_,R){x[R]=_/B}),a){var k=Math.round(x.y+x.height),S=Math.round(x.x+x.width);x.x=Math.round(x.x),x.y=Math.round(x.y),x.width=S-x.x,x.height=k-x.y}}else x={x:0,y:0,width:0,height:0};return o.rotatable&&(x.rotate=n.rotate||0),o.scalable&&(x.scaleX=n.scaleX||1,x.scaleY=n.scaleY||1),x},setData:function(a){var o=this.options,n=this.imageData,A=this.canvasData,p={};if(this.ready&&!this.disabled&&qe(a)){var x=!1;o.rotatable&&V(a.rotate)&&a.rotate!==n.rotate&&(n.rotate=a.rotate,x=!0),o.scalable&&(V(a.scaleX)&&a.scaleX!==n.scaleX&&(n.scaleX=a.scaleX,x=!0),V(a.scaleY)&&a.scaleY!==n.scaleY&&(n.scaleY=a.scaleY,x=!0)),x&&this.renderCanvas(!0,!0);var B=n.width/n.naturalWidth;V(a.x)&&(p.left=a.x*B+A.left),V(a.y)&&(p.top=a.y*B+A.top),V(a.width)&&(p.width=a.width*B),V(a.height)&&(p.height=a.height*B),this.setCropBoxData(p)}return this},getContainerData:function(){return this.ready?ne({},this.containerData):{}},getImageData:function(){return this.sized?ne({},this.imageData):{}},getCanvasData:function(){var a=this.canvasData,o={};return this.ready&&ce(["left","top","width","height","naturalWidth","naturalHeight"],function(n){o[n]=a[n]}),o},setCanvasData:function(a){var o=this.canvasData,n=o.aspectRatio;return this.ready&&!this.disabled&&qe(a)&&(V(a.left)&&(o.left=a.left),V(a.top)&&(o.top=a.top),V(a.width)?(o.width=a.width,o.height=a.width/n):V(a.height)&&(o.height=a.height,o.width=a.height*n),this.renderCanvas(!0)),this},getCropBoxData:function(){var a=this.cropBoxData,o;return this.ready&&this.cropped&&(o={left:a.left,top:a.top,width:a.width,height:a.height}),o||{}},setCropBoxData:function(a){var o=this.cropBoxData,n=this.options.aspectRatio,A,p;return this.ready&&this.cropped&&!this.disabled&&qe(a)&&(V(a.left)&&(o.left=a.left),V(a.top)&&(o.top=a.top),V(a.width)&&a.width!==o.width&&(A=!0,o.width=a.width),V(a.height)&&a.height!==o.height&&(p=!0,o.height=a.height),n&&(A?o.height=o.width/n:p&&(o.width=o.height*n)),this.renderCropBox()),this},getCroppedCanvas:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var o=this.canvasData,n=et(this.image,this.imageData,o,a);if(!this.cropped)return n;var A=this.getData(a.rounded),p=A.x,x=A.y,B=A.width,k=A.height,S=n.width/Math.floor(o.naturalWidth);S!==1&&(p*=S,x*=S,B*=S,k*=S);var _=B/k,R=Ie({aspectRatio:_,width:a.maxWidth||1/0,height:a.maxHeight||1/0}),L=Ie({aspectRatio:_,width:a.minWidth||0,height:a.minHeight||0},"cover"),K=Ie({aspectRatio:_,width:a.width||(S!==1?n.width:B),height:a.height||(S!==1?n.height:k)}),z=K.width,oe=K.height;z=Math.min(R.width,Math.max(L.width,z)),oe=Math.min(R.height,Math.max(L.height,oe));var ee=document.createElement("canvas"),he=ee.getContext("2d");ee.width=Ke(z),ee.height=Ke(oe),he.fillStyle=a.fillColor||"transparent",he.fillRect(0,0,z,oe);var ue=a.imageSmoothingEnabled,de=ue===void 0?!0:ue,Ne=a.imageSmoothingQuality;he.imageSmoothingEnabled=de,Ne&&(he.imageSmoothingQuality=Ne);var Me=n.width,N=n.height,te=p,pe=x,Pe,He,dt,mt,tt,Oe;te<=-B||te>Me?(te=0,Pe=0,dt=0,tt=0):te<=0?(dt=-te,te=0,Pe=Math.min(Me,B+te),tt=Pe):te<=Me&&(dt=0,Pe=Math.min(B,Me-te),tt=Pe),Pe<=0||pe<=-k||pe>N?(pe=0,He=0,mt=0,Oe=0):pe<=0?(mt=-pe,pe=0,He=Math.min(N,k+pe),Oe=He):pe<=N&&(mt=0,He=Math.min(k,N-pe),Oe=He);var we=[te,pe,Pe,He];if(tt>0&&Oe>0){var pt=z/B;we.push(dt*pt,mt*pt,tt*pt,Oe*pt)}return he.drawImage.apply(he,[n].concat(b(we.map(function(Br){return Math.floor(Ke(Br))})))),ee},setAspectRatio:function(a){var o=this.options;return!this.disabled&&!Yt(a)&&(o.aspectRatio=Math.max(0,a)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(a){var o=this.options,n=this.dragBox,A=this.face;if(this.ready&&!this.disabled){var p=a===Qt,x=o.movable&&a===or;a=p||x?a:sr,o.dragMode=a,ut(n,De,a),Ze(n,ke,p),Ze(n,Ae,x),o.cropBoxMovable||(ut(A,De,a),Ze(A,ke,p),Ze(A,Ae,x))}return this}},I=F.Cropper,T=(function(){function l(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(r(this,l),!a||!dr.test(a.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=a,this.options=ne({},Wt,qe(o)&&o),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return s(l,[{key:"init",value:function(){var o=this.element,n=o.tagName.toLowerCase(),A;if(!o[U]){if(o[U]=this,n==="img"){if(this.isImg=!0,A=o.getAttribute("src")||"",this.originalUrl=A,!A)return;A=o.src}else n==="canvas"&&window.HTMLCanvasElement&&(A=o.toDataURL());this.load(A)}}},{key:"load",value:function(o){var n=this;if(o){this.url=o,this.imageData={};var A=this.element,p=this.options;if(!p.rotatable&&!p.scalable&&(p.checkOrientation=!1),!p.checkOrientation||!window.ArrayBuffer){this.clone();return}if(ur.test(o)){fr.test(o)?this.read(oa(o)):this.clone();return}var x=new XMLHttpRequest,B=this.clone.bind(this);this.reloading=!0,this.xhr=x,x.onabort=B,x.onerror=B,x.ontimeout=B,x.onprogress=function(){x.getResponseHeader("content-type")!==Ht&&x.abort()},x.onload=function(){n.read(x.response)},x.onloadend=function(){n.reloading=!1,n.xhr=null},p.checkCrossOrigin&&vr(o)&&A.crossOrigin&&(o=Ir(o)),x.open("GET",o,!0),x.responseType="arraybuffer",x.withCredentials=A.crossOrigin==="use-credentials",x.send()}}},{key:"read",value:function(o){var n=this.options,A=this.imageData,p=qt(o),x=0,B=1,k=1;if(p>1){this.url=sa(o,Ht);var S=la(p);x=S.rotate,B=S.scaleX,k=S.scaleY}n.rotatable&&(A.rotate=x),n.scalable&&(A.scaleX=B,A.scaleY=k),this.clone()}},{key:"clone",value:function(){var o=this.element,n=this.url,A=o.crossOrigin,p=n;this.options.checkCrossOrigin&&vr(n)&&(A||(A="anonymous"),p=Ir(n)),this.crossOrigin=A,this.crossOriginUrl=p;var x=document.createElement("img");A&&(x.crossOrigin=A),x.src=p||n,x.alt=o.alt||"The image to crop",this.image=x,x.onload=this.start.bind(this),x.onerror=this.stop.bind(this),fe(x,st),o.parentNode.insertBefore(x,o.nextSibling)}},{key:"start",value:function(){var o=this,n=this.image;n.onload=null,n.onerror=null,this.sizing=!0;var A=F.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(F.navigator.userAgent),p=function(S,_){ne(o.imageData,{naturalWidth:S,naturalHeight:_,aspectRatio:S/_}),o.initialImageData=ne({},o.imageData),o.sizing=!1,o.sized=!0,o.build()};if(n.naturalWidth&&!A){p(n.naturalWidth,n.naturalHeight);return}var x=document.createElement("img"),B=document.body||document.documentElement;this.sizingImage=x,x.onload=function(){p(x.width,x.height),A||B.removeChild(x)},x.src=n.src,A||(x.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",B.appendChild(x))}},{key:"stop",value:function(){var o=this.image;o.onload=null,o.onerror=null,o.parentNode.removeChild(o),this.image=null}},{key:"build",value:function(){if(!(!this.sized||this.ready)){var o=this.element,n=this.options,A=this.image,p=o.parentNode,x=document.createElement("div");x.innerHTML=mr;var B=x.querySelector(".".concat(U,"-container")),k=B.querySelector(".".concat(U,"-canvas")),S=B.querySelector(".".concat(U,"-drag-box")),_=B.querySelector(".".concat(U,"-crop-box")),R=_.querySelector(".".concat(U,"-face"));this.container=p,this.cropper=B,this.canvas=k,this.dragBox=S,this.cropBox=_,this.viewBox=B.querySelector(".".concat(U,"-view-box")),this.face=R,k.appendChild(A),fe(o,le),p.insertBefore(B,o.nextSibling),Re(A,st),this.initPreview(),this.bind(),n.initialAspectRatio=Math.max(0,n.initialAspectRatio)||NaN,n.aspectRatio=Math.max(0,n.aspectRatio)||NaN,n.viewMode=Math.max(0,Math.min(3,Math.round(n.viewMode)))||0,fe(_,le),n.guides||fe(_.getElementsByClassName("".concat(U,"-dashed")),le),n.center||fe(_.getElementsByClassName("".concat(U,"-center")),le),n.background&&fe(B,"".concat(U,"-bg")),n.highlight||fe(R,Ve),n.cropBoxMovable&&(fe(R,Ae),ut(R,De,J)),n.cropBoxResizable||(fe(_.getElementsByClassName("".concat(U,"-line")),le),fe(_.getElementsByClassName("".concat(U,"-point")),le)),this.render(),this.ready=!0,this.setDragMode(n.dragMode),n.autoCrop&&this.crop(),this.setData(n.data),ie(n.ready)&&ve(o,lt,n.ready,{once:!0}),Je(o,lt)}}},{key:"unbuild",value:function(){if(this.ready){this.ready=!1,this.unbind(),this.resetPreview();var o=this.cropper.parentNode;o&&o.removeChild(this.cropper),Re(this.element,le)}}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=I,l}},{key:"setDefaults",value:function(o){ne(Wt,qe(o)&&o)}}])})();return ne(T.prototype,ca,h,C,m,w,y),T}))});var bn=fa((Ua,Na)=>{(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof Ua!="undefined"?t():(t(),e.FileSaver={})})(Ua,function(){"use strict";function e(f,d){return typeof d=="undefined"?d={autoBom:!1}:typeof d!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),d={autoBom:!d}),d.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(f.type)?new Blob(["\uFEFF",f],{type:f.type}):f}function t(f,d,g){var b=new XMLHttpRequest;b.open("GET",f),b.responseType="blob",b.onload=function(){u(b.response,d,g)},b.onerror=function(){console.error("could not download file")},b.send()}function r(f){var d=new XMLHttpRequest;d.open("HEAD",f,!1);try{d.send()}catch(g){}return 200<=d.status&&299>=d.status}function i(f){try{f.dispatchEvent(new MouseEvent("click"))}catch(g){var d=document.createEvent("MouseEvents");d.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),f.dispatchEvent(d)}}var s=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:void 0,c=s.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=s.saveAs||(typeof window!="object"||window!==s?function(){}:"download"in HTMLAnchorElement.prototype&&!c?function(f,d,g){var b=s.URL||s.webkitURL,M=document.createElement("a");d=d||f.name||"download",M.download=d,M.rel="noopener",typeof f=="string"?(M.href=f,M.origin===location.origin?i(M):r(M.href)?t(f,d,g):i(M,M.target="_blank")):(M.href=b.createObjectURL(f),setTimeout(function(){b.revokeObjectURL(M.href)},4e4),setTimeout(function(){i(M)},0))}:"msSaveOrOpenBlob"in navigator?function(f,d,g){if(d=d||f.name||"download",typeof f!="string")navigator.msSaveOrOpenBlob(e(f,g),d);else if(r(f))t(f,d,g);else{var b=document.createElement("a");b.href=f,b.target="_blank",setTimeout(function(){i(b)})}}:function(f,d,g,b){if(b=b||open("","_blank"),b&&(b.document.title=b.document.body.innerText="downloading..."),typeof f=="string")return t(f,d,g);var M=f.type==="application/octet-stream",v=/constructor/i.test(s.HTMLElement)||s.safari,E=/CriOS\/[\d]+/.test(navigator.userAgent);if((E||M&&v||c)&&typeof FileReader!="undefined"){var P=new FileReader;P.onloadend=function(){var H=P.result;H=E?H:H.replace(/^data:[^;]*;/,"data:attachment/file;"),b?b.location.href=H:location=H,b=null},P.readAsDataURL(f)}else{var Q=s.URL||s.webkitURL,F=Q.createObjectURL(f);b?b.location=F:location.href=F,b=null,setTimeout(function(){Q.revokeObjectURL(F)},4e4)}});s.saveAs=u.saveAs=u,typeof Na!="undefined"&&(Na.exports=u)})});var Cn=fa((xn,Ha)=>{(function(e){if(typeof xn=="object"&&typeof Ha!="undefined")Ha.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var t;typeof window!="undefined"?t=window:typeof global!="undefined"?t=global:typeof self!="undefined"?t=self:t=this,t.localforage=e()}})(function(){var e,t,r;return(function i(s,c,u){function f(b,M){if(!c[b]){if(!s[b]){var v=typeof Kt=="function"&&Kt;if(!M&&v)return v(b,!0);if(d)return d(b,!0);var E=new Error("Cannot find module '"+b+"'");throw E.code="MODULE_NOT_FOUND",E}var P=c[b]={exports:{}};s[b][0].call(P.exports,function(Q){var F=s[b][1][Q];return f(F||Q)},P,P.exports,i,s,c,u)}return c[b].exports}for(var d=typeof Kt=="function"&&Kt,g=0;g<u.length;g++)f(u[g]);return f})({1:[function(i,s,c){(function(u){"use strict";var f=u.MutationObserver||u.WebKitMutationObserver,d;if(f){var g=0,b=new f(Q),M=u.document.createTextNode("");b.observe(M,{characterData:!0}),d=function(){M.data=g=++g%2}}else if(!u.setImmediate&&typeof u.MessageChannel!="undefined"){var v=new u.MessageChannel;v.port1.onmessage=Q,d=function(){v.port2.postMessage(0)}}else"document"in u&&"onreadystatechange"in u.document.createElement("script")?d=function(){var H=u.document.createElement("script");H.onreadystatechange=function(){Q(),H.onreadystatechange=null,H.parentNode.removeChild(H),H=null},u.document.documentElement.appendChild(H)}:d=function(){setTimeout(Q,0)};var E,P=[];function Q(){E=!0;for(var H,G,U=P.length;U;){for(G=P,P=[],H=-1;++H<U;)G[H]();U=P.length}E=!1}s.exports=F;function F(H){P.push(H)===1&&!E&&d()}}).call(this,typeof global!="undefined"?global:typeof self!="undefined"?self:typeof window!="undefined"?window:{})},{}],2:[function(i,s,c){"use strict";var u=i(1);function f(){}var d={},g=["REJECTED"],b=["FULFILLED"],M=["PENDING"];s.exports=v;function v(O){if(typeof O!="function")throw new TypeError("resolver must be a function");this.state=M,this.queue=[],this.outcome=void 0,O!==f&&F(this,O)}v.prototype.catch=function(O){return this.then(null,O)},v.prototype.then=function(O,X){if(typeof O!="function"&&this.state===b||typeof X!="function"&&this.state===g)return this;var W=new this.constructor(f);if(this.state!==M){var Y=this.state===b?O:X;P(W,Y,this.outcome)}else this.queue.push(new E(W,O,X));return W};function E(O,X,W){this.promise=O,typeof X=="function"&&(this.onFulfilled=X,this.callFulfilled=this.otherCallFulfilled),typeof W=="function"&&(this.onRejected=W,this.callRejected=this.otherCallRejected)}E.prototype.callFulfilled=function(O){d.resolve(this.promise,O)},E.prototype.otherCallFulfilled=function(O){P(this.promise,this.onFulfilled,O)},E.prototype.callRejected=function(O){d.reject(this.promise,O)},E.prototype.otherCallRejected=function(O){P(this.promise,this.onRejected,O)};function P(O,X,W){u(function(){var Y;try{Y=X(W)}catch(q){return d.reject(O,q)}Y===O?d.reject(O,new TypeError("Cannot resolve promise with itself")):d.resolve(O,Y)})}d.resolve=function(O,X){var W=H(Q,X);if(W.status==="error")return d.reject(O,W.value);var Y=W.value;if(Y)F(O,Y);else{O.state=b,O.outcome=X;for(var q=-1,Z=O.queue.length;++q<Z;)O.queue[q].callFulfilled(X)}return O},d.reject=function(O,X){O.state=g,O.outcome=X;for(var W=-1,Y=O.queue.length;++W<Y;)O.queue[W].callRejected(X);return O};function Q(O){var X=O&&O.then;if(O&&(typeof O=="object"||typeof O=="function")&&typeof X=="function")return function(){X.apply(O,arguments)}}function F(O,X){var W=!1;function Y(se){W||(W=!0,d.reject(O,se))}function q(se){W||(W=!0,d.resolve(O,se))}function Z(){X(q,Y)}var ae=H(Z);ae.status==="error"&&Y(ae.value)}function H(O,X){var W={};try{W.value=O(X),W.status="success"}catch(Y){W.status="error",W.value=Y}return W}v.resolve=G;function G(O){return O instanceof this?O:d.resolve(new this(f),O)}v.reject=U;function U(O){var X=new this(f);return d.reject(X,O)}v.all=J;function J(O){var X=this;if(Object.prototype.toString.call(O)!=="[object Array]")return this.reject(new TypeError("must be an array"));var W=O.length,Y=!1;if(!W)return this.resolve([]);for(var q=new Array(W),Z=0,ae=-1,se=new this(f);++ae<W;)me(O[ae],ae);return se;function me(Be,ke){X.resolve(Be).then(Ye,function(le){Y||(Y=!0,d.reject(se,le))});function Ye(le){q[ke]=le,++Z===W&&!Y&&(Y=!0,d.resolve(se,q))}}}v.race=re;function re(O){var X=this;if(Object.prototype.toString.call(O)!=="[object Array]")return this.reject(new TypeError("must be an array"));var W=O.length,Y=!1;if(!W)return this.resolve([]);for(var q=-1,Z=new this(f);++q<W;)ae(O[q]);return Z;function ae(se){X.resolve(se).then(function(me){Y||(Y=!0,d.resolve(Z,me))},function(me){Y||(Y=!0,d.reject(Z,me))})}}},{1:1}],3:[function(i,s,c){(function(u){"use strict";typeof u.Promise!="function"&&(u.Promise=i(2))}).call(this,typeof global!="undefined"?global:typeof self!="undefined"?self:typeof window!="undefined"?window:{})},{2:2}],4:[function(i,s,c){"use strict";var u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(h){return typeof h}:function(h){return h&&typeof Symbol=="function"&&h.constructor===Symbol&&h!==Symbol.prototype?"symbol":typeof h};function f(h,C){if(!(h instanceof C))throw new TypeError("Cannot call a class as a function")}function d(){try{if(typeof indexedDB!="undefined")return indexedDB;if(typeof webkitIndexedDB!="undefined")return webkitIndexedDB;if(typeof mozIndexedDB!="undefined")return mozIndexedDB;if(typeof OIndexedDB!="undefined")return OIndexedDB;if(typeof msIndexedDB!="undefined")return msIndexedDB}catch(h){return}}var g=d();function b(){try{if(!g||!g.open)return!1;var h=typeof openDatabase!="undefined"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),C=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!h||C)&&typeof indexedDB!="undefined"&&typeof IDBKeyRange!="undefined"}catch(m){return!1}}function M(h,C){h=h||[],C=C||{};try{return new Blob(h,C)}catch(I){if(I.name!=="TypeError")throw I;for(var m=typeof BlobBuilder!="undefined"?BlobBuilder:typeof MSBlobBuilder!="undefined"?MSBlobBuilder:typeof MozBlobBuilder!="undefined"?MozBlobBuilder:WebKitBlobBuilder,w=new m,y=0;y<h.length;y+=1)w.append(h[y]);return w.getBlob(C.type)}}typeof Promise=="undefined"&&i(3);var v=Promise;function E(h,C){C&&h.then(function(m){C(null,m)},function(m){C(m)})}function P(h,C,m){typeof C=="function"&&h.then(C),typeof m=="function"&&h.catch(m)}function Q(h){return typeof h!="string"&&(console.warn(h+" used as a key, but it is not a string."),h=String(h)),h}function F(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var H="local-forage-detect-blob-support",G=void 0,U={},J=Object.prototype.toString,re="readonly",O="readwrite";function X(h){for(var C=h.length,m=new ArrayBuffer(C),w=new Uint8Array(m),y=0;y<C;y++)w[y]=h.charCodeAt(y);return m}function W(h){return new v(function(C){var m=h.transaction(H,O),w=M([""]);m.objectStore(H).put(w,"key"),m.onabort=function(y){y.preventDefault(),y.stopPropagation(),C(!1)},m.oncomplete=function(){var y=navigator.userAgent.match(/Chrome\/(\d+)/),I=navigator.userAgent.match(/Edge\//);C(I||!y||parseInt(y[1],10)>=43)}}).catch(function(){return!1})}function Y(h){return typeof G=="boolean"?v.resolve(G):W(h).then(function(C){return G=C,G})}function q(h){var C=U[h.name],m={};m.promise=new v(function(w,y){m.resolve=w,m.reject=y}),C.deferredOperations.push(m),C.dbReady?C.dbReady=C.dbReady.then(function(){return m.promise}):C.dbReady=m.promise}function Z(h){var C=U[h.name],m=C.deferredOperations.pop();if(m)return m.resolve(),m.promise}function ae(h,C){var m=U[h.name],w=m.deferredOperations.pop();if(w)return w.reject(C),w.promise}function se(h,C){return new v(function(m,w){if(U[h.name]=U[h.name]||De(),h.db)if(C)q(h),h.db.close();else return m(h.db);var y=[h.name];C&&y.push(h.version);var I=g.open.apply(g,y);C&&(I.onupgradeneeded=function(T){var l=I.result;try{l.createObjectStore(h.storeName),T.oldVersion<=1&&l.createObjectStore(H)}catch(a){if(a.name==="ConstraintError")console.warn('The database "'+h.name+'" has been upgraded from version '+T.oldVersion+" to version "+T.newVersion+', but the storage "'+h.storeName+'" already exists.');else throw a}}),I.onerror=function(T){T.preventDefault(),w(I.error)},I.onsuccess=function(){m(I.result),Z(h)}})}function me(h){return se(h,!1)}function Be(h){return se(h,!0)}function ke(h,C){if(!h.db)return!0;var m=!h.db.objectStoreNames.contains(h.storeName),w=h.version<h.db.version,y=h.version>h.db.version;if(w&&(h.version!==C&&console.warn('The database "'+h.name+`" can't be downgraded from version `+h.db.version+" to version "+h.version+"."),h.version=h.db.version),y||m){if(m){var I=h.db.version+1;I>h.version&&(h.version=I)}return!0}return!1}function Ye(h){return new v(function(C,m){var w=new FileReader;w.onerror=m,w.onloadend=function(y){var I=btoa(y.target.result||"");C({__local_forage_encoded_blob:!0,data:I,type:h.type})},w.readAsBinaryString(h)})}function le(h){var C=X(atob(h.data));return M([C],{type:h.type})}function st(h){return h&&h.__local_forage_encoded_blob}function Ve(h){var C=this,m=C._initReady().then(function(){var w=U[C._dbInfo.name];if(w&&w.dbReady)return w.dbReady});return P(m,h,h),m}function ze(h){q(h);for(var C=U[h.name],m=C.forages,w=0;w<m.length;w++){var y=m[w];y._dbInfo.db&&(y._dbInfo.db.close(),y._dbInfo.db=null)}return h.db=null,me(h).then(function(I){return h.db=I,ke(h)?Be(h):I}).then(function(I){h.db=C.db=I;for(var T=0;T<m.length;T++)m[T]._dbInfo.db=I}).catch(function(I){throw ae(h,I),I})}function Ae(h,C,m,w){w===void 0&&(w=1);try{var y=h.db.transaction(h.storeName,C);m(null,y)}catch(I){if(w>0&&(!h.db||I.name==="InvalidStateError"||I.name==="NotFoundError"))return v.resolve().then(function(){if(!h.db||I.name==="NotFoundError"&&!h.db.objectStoreNames.contains(h.storeName)&&h.version<=h.db.version)return h.db&&(h.version=h.db.version+1),Be(h)}).then(function(){return ze(h).then(function(){Ae(h,C,m,w-1)})}).catch(m);m(I)}}function De(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function je(h){var C=this,m={db:null};if(h)for(var w in h)m[w]=h[w];var y=U[m.name];y||(y=De(),U[m.name]=y),y.forages.push(C),C._initReady||(C._initReady=C.ready,C.ready=Ve);var I=[];function T(){return v.resolve()}for(var l=0;l<y.forages.length;l++){var a=y.forages[l];a!==C&&I.push(a._initReady().catch(T))}var o=y.forages.slice(0);return v.all(I).then(function(){return m.db=y.db,me(m)}).then(function(n){return m.db=n,ke(m,C._defaultConfig.version)?Be(m):n}).then(function(n){m.db=y.db=n,C._dbInfo=m;for(var A=0;A<o.length;A++){var p=o[A];p!==C&&(p._dbInfo.db=m.db,p._dbInfo.version=m.version)}})}function Qt(h,C){var m=this;h=Q(h);var w=new v(function(y,I){m.ready().then(function(){Ae(m._dbInfo,re,function(T,l){if(T)return I(T);try{var a=l.objectStore(m._dbInfo.storeName),o=a.get(h);o.onsuccess=function(){var n=o.result;n===void 0&&(n=null),st(n)&&(n=le(n)),y(n)},o.onerror=function(){I(o.error)}}catch(n){I(n)}})}).catch(I)});return E(w,C),w}function or(h,C){var m=this,w=new v(function(y,I){m.ready().then(function(){Ae(m._dbInfo,re,function(T,l){if(T)return I(T);try{var a=l.objectStore(m._dbInfo.storeName),o=a.openCursor(),n=1;o.onsuccess=function(){var A=o.result;if(A){var p=A.value;st(p)&&(p=le(p));var x=h(p,A.key,n++);x!==void 0?y(x):A.continue()}else y()},o.onerror=function(){I(o.error)}}catch(A){I(A)}})}).catch(I)});return E(w,C),w}function sr(h,C,m){var w=this;h=Q(h);var y=new v(function(I,T){var l;w.ready().then(function(){return l=w._dbInfo,J.call(C)==="[object Blob]"?Y(l.db).then(function(a){return a?C:Ye(C)}):C}).then(function(a){Ae(w._dbInfo,O,function(o,n){if(o)return T(o);try{var A=n.objectStore(w._dbInfo.storeName);a===null&&(a=void 0);var p=A.put(a,h);n.oncomplete=function(){a===void 0&&(a=null),I(a)},n.onabort=n.onerror=function(){var x=p.error?p.error:p.transaction.error;T(x)}}catch(x){T(x)}})}).catch(T)});return E(y,m),y}function Lt(h,C){var m=this;h=Q(h);var w=new v(function(y,I){m.ready().then(function(){Ae(m._dbInfo,O,function(T,l){if(T)return I(T);try{var a=l.objectStore(m._dbInfo.storeName),o=a.delete(h);l.oncomplete=function(){y()},l.onerror=function(){I(o.error)},l.onabort=function(){var n=o.error?o.error:o.transaction.error;I(n)}}catch(n){I(n)}})}).catch(I)});return E(w,C),w}function Ot(h){var C=this,m=new v(function(w,y){C.ready().then(function(){Ae(C._dbInfo,O,function(I,T){if(I)return y(I);try{var l=T.objectStore(C._dbInfo.storeName),a=l.clear();T.oncomplete=function(){w()},T.onabort=T.onerror=function(){var o=a.error?a.error:a.transaction.error;y(o)}}catch(o){y(o)}})}).catch(y)});return E(m,h),m}function Gt(h){var C=this,m=new v(function(w,y){C.ready().then(function(){Ae(C._dbInfo,re,function(I,T){if(I)return y(I);try{var l=T.objectStore(C._dbInfo.storeName),a=l.count();a.onsuccess=function(){w(a.result)},a.onerror=function(){y(a.error)}}catch(o){y(o)}})}).catch(y)});return E(m,h),m}function Ut(h,C){var m=this,w=new v(function(y,I){if(h<0){y(null);return}m.ready().then(function(){Ae(m._dbInfo,re,function(T,l){if(T)return I(T);try{var a=l.objectStore(m._dbInfo.storeName),o=!1,n=a.openKeyCursor();n.onsuccess=function(){var A=n.result;if(!A){y(null);return}h===0||o?y(A.key):(o=!0,A.advance(h))},n.onerror=function(){I(n.error)}}catch(A){I(A)}})}).catch(I)});return E(w,C),w}function lr(h){var C=this,m=new v(function(w,y){C.ready().then(function(){Ae(C._dbInfo,re,function(I,T){if(I)return y(I);try{var l=T.objectStore(C._dbInfo.storeName),a=l.openKeyCursor(),o=[];a.onsuccess=function(){var n=a.result;if(!n){w(o);return}o.push(n.key),n.continue()},a.onerror=function(){y(a.error)}}catch(n){y(n)}})}).catch(y)});return E(m,h),m}function jr(h,C){C=F.apply(this,arguments);var m=this.config();h=typeof h!="function"&&h||{},h.name||(h.name=h.name||m.name,h.storeName=h.storeName||m.storeName);var w=this,y;if(!h.name)y=v.reject("Invalid arguments");else{var I=h.name===m.name&&w._dbInfo.db,T=I?v.resolve(w._dbInfo.db):me(h).then(function(l){var a=U[h.name],o=a.forages;a.db=l;for(var n=0;n<o.length;n++)o[n]._dbInfo.db=l;return l});h.storeName?y=T.then(function(l){if(l.objectStoreNames.contains(h.storeName)){var a=l.version+1;q(h);var o=U[h.name],n=o.forages;l.close();for(var A=0;A<n.length;A++){var p=n[A];p._dbInfo.db=null,p._dbInfo.version=a}var x=new v(function(B,k){var S=g.open(h.name,a);S.onerror=function(_){var R=S.result;R.close(),k(_)},S.onupgradeneeded=function(){var _=S.result;_.deleteObjectStore(h.storeName)},S.onsuccess=function(){var _=S.result;_.close(),B(_)}});return x.then(function(B){o.db=B;for(var k=0;k<n.length;k++){var S=n[k];S._dbInfo.db=B,Z(S._dbInfo)}}).catch(function(B){throw(ae(h,B)||v.resolve()).catch(function(){}),B})}}):y=T.then(function(l){q(h);var a=U[h.name],o=a.forages;l.close();for(var n=0;n<o.length;n++){var A=o[n];A._dbInfo.db=null}var p=new v(function(x,B){var k=g.deleteDatabase(h.name);k.onerror=k.onblocked=function(S){var _=k.result;_&&_.close(),B(S)},k.onsuccess=function(){var S=k.result;S&&S.close(),x(S)}});return p.then(function(x){a.db=x;for(var B=0;B<o.length;B++){var k=o[B];Z(k._dbInfo)}}).catch(function(x){throw(ae(h,x)||v.resolve()).catch(function(){}),x})})}return E(y,C),y}var qr={_driver:"asyncStorage",_initStorage:je,_support:b(),iterate:or,getItem:Qt,setItem:sr,removeItem:Lt,clear:Ot,length:Gt,key:Ut,keys:lr,dropInstance:jr};function Kr(){return typeof openDatabase=="function"}var Fe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",cr="~~local_forage_type~",Nt=/^~~local_forage_type~([^~]+)~/,lt="__lfsc__:",yt=lt.length,Et="arbf",ct="blob",Ht="si08",hr="ui08",ur="uic8",fr="si16",ht="si32",dr="ur16",$t="ui32",Xt="fl32",Wt="fl64",mr=yt+Et.length,pr=Object.prototype.toString;function Bt(h){var C=h.length*.75,m=h.length,w,y=0,I,T,l,a;h[h.length-1]==="="&&(C--,h[h.length-2]==="="&&C--);var o=new ArrayBuffer(C),n=new Uint8Array(o);for(w=0;w<m;w+=4)I=Fe.indexOf(h[w]),T=Fe.indexOf(h[w+1]),l=Fe.indexOf(h[w+2]),a=Fe.indexOf(h[w+3]),n[y++]=I<<2|T>>4,n[y++]=(T&15)<<4|l>>2,n[y++]=(l&3)<<6|a&63;return o}function V(h){var C=new Uint8Array(h),m="",w;for(w=0;w<C.length;w+=3)m+=Fe[C[w]>>2],m+=Fe[(C[w]&3)<<4|C[w+1]>>4],m+=Fe[(C[w+1]&15)<<2|C[w+2]>>6],m+=Fe[C[w+2]&63];return C.length%3===2?m=m.substring(0,m.length-1)+"=":C.length%3===1&&(m=m.substring(0,m.length-2)+"=="),m}function Ar(h,C){var m="";if(h&&(m=pr.call(h)),h&&(m==="[object ArrayBuffer]"||h.buffer&&pr.call(h.buffer)==="[object ArrayBuffer]")){var w,y=lt;h instanceof ArrayBuffer?(w=h,y+=Et):(w=h.buffer,m==="[object Int8Array]"?y+=Ht:m==="[object Uint8Array]"?y+=hr:m==="[object Uint8ClampedArray]"?y+=ur:m==="[object Int16Array]"?y+=fr:m==="[object Uint16Array]"?y+=dr:m==="[object Int32Array]"?y+=ht:m==="[object Uint32Array]"?y+=$t:m==="[object Float32Array]"?y+=Xt:m==="[object Float64Array]"?y+=Wt:C(new Error("Failed to get type for BinaryArray"))),C(y+V(w))}else if(m==="[object Blob]"){var I=new FileReader;I.onload=function(){var T=cr+h.type+"~"+V(this.result);C(lt+ct+T)},I.readAsArrayBuffer(h)}else try{C(JSON.stringify(h))}catch(T){console.error("Couldn't convert value into a JSON string: ",h),C(null,T)}}function Yt(h){if(h.substring(0,yt)!==lt)return JSON.parse(h);var C=h.substring(mr),m=h.substring(yt,mr),w;if(m===ct&&Nt.test(C)){var y=C.match(Nt);w=y[1],C=C.substring(y[0].length)}var I=Bt(C);switch(m){case Et:return I;case ct:return M([I],{type:w});case Ht:return new Int8Array(I);case hr:return new Uint8Array(I);case ur:return new Uint8ClampedArray(I);case fr:return new Int16Array(I);case dr:return new Uint16Array(I);case ht:return new Int32Array(I);case $t:return new Uint32Array(I);case Xt:return new Float32Array(I);case Wt:return new Float64Array(I);default:throw new Error("Unkown type: "+m)}}var Se={serialize:Ar,deserialize:Yt,stringToBuffer:Bt,bufferToString:V};function gr(h,C,m,w){h.executeSql("CREATE TABLE IF NOT EXISTS "+C.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],m,w)}function qe(h){var C=this,m={db:null};if(h)for(var w in h)m[w]=typeof h[w]!="string"?h[w].toString():h[w];var y=new v(function(I,T){try{m.db=openDatabase(m.name,String(m.version),m.description,m.size)}catch(l){return T(l)}m.db.transaction(function(l){gr(l,m,function(){C._dbInfo=m,I()},function(a,o){T(o)})},T)});return m.serializer=Se,y}function ie(h,C,m,w,y,I){h.executeSql(m,w,y,function(T,l){l.code===l.SYNTAX_ERR?T.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[C.storeName],function(a,o){o.rows.length?I(a,l):gr(a,C,function(){a.executeSql(m,w,y,I)},I)},I):I(T,l)},I)}function Zr(h,C){var m=this;h=Q(h);var w=new v(function(y,I){m.ready().then(function(){var T=m._dbInfo;T.db.transaction(function(l){ie(l,T,"SELECT * FROM "+T.storeName+" WHERE key = ? LIMIT 1",[h],function(a,o){var n=o.rows.length?o.rows.item(0).value:null;n&&(n=T.serializer.deserialize(n)),y(n)},function(a,o){I(o)})})}).catch(I)});return E(w,C),w}function br(h,C){var m=this,w=new v(function(y,I){m.ready().then(function(){var T=m._dbInfo;T.db.transaction(function(l){ie(l,T,"SELECT * FROM "+T.storeName,[],function(a,o){for(var n=o.rows,A=n.length,p=0;p<A;p++){var x=n.item(p),B=x.value;if(B&&(B=T.serializer.deserialize(B)),B=h(B,x.key,p+1),B!==void 0){y(B);return}}y()},function(a,o){I(o)})})}).catch(I)});return E(w,C),w}function ce(h,C,m,w){var y=this;h=Q(h);var I=new v(function(T,l){y.ready().then(function(){C===void 0&&(C=null);var a=C,o=y._dbInfo;o.serializer.serialize(C,function(n,A){A?l(A):o.db.transaction(function(p){ie(p,o,"INSERT OR REPLACE INTO "+o.storeName+" (key, value) VALUES (?, ?)",[h,n],function(){T(a)},function(x,B){l(B)})},function(p){if(p.code===p.QUOTA_ERR){if(w>0){T(ce.apply(y,[h,a,m,w-1]));return}l(p)}})})}).catch(l)});return E(I,m),I}function ne(h,C,m){return ce.apply(this,[h,C,m,1])}function Jr(h,C){var m=this;h=Q(h);var w=new v(function(y,I){m.ready().then(function(){var T=m._dbInfo;T.db.transaction(function(l){ie(l,T,"DELETE FROM "+T.storeName+" WHERE key = ?",[h],function(){y()},function(a,o){I(o)})})}).catch(I)});return E(w,C),w}function Ke(h){var C=this,m=new v(function(w,y){C.ready().then(function(){var I=C._dbInfo;I.db.transaction(function(T){ie(T,I,"DELETE FROM "+I.storeName,[],function(){w()},function(l,a){y(a)})})}).catch(y)});return E(m,h),m}function ea(h){var C=this,m=new v(function(w,y){C.ready().then(function(){var I=C._dbInfo;I.db.transaction(function(T){ie(T,I,"SELECT COUNT(key) as c FROM "+I.storeName,[],function(l,a){var o=a.rows.item(0).c;w(o)},function(l,a){y(a)})})}).catch(y)});return E(m,h),m}function Le(h,C){var m=this,w=new v(function(y,I){m.ready().then(function(){var T=m._dbInfo;T.db.transaction(function(l){ie(l,T,"SELECT key FROM "+T.storeName+" WHERE id = ? LIMIT 1",[h+1],function(a,o){var n=o.rows.length?o.rows.item(0).key:null;y(n)},function(a,o){I(o)})})}).catch(I)});return E(w,C),w}function ta(h){var C=this,m=new v(function(w,y){C.ready().then(function(){var I=C._dbInfo;I.db.transaction(function(T){ie(T,I,"SELECT key FROM "+I.storeName,[],function(l,a){for(var o=[],n=0;n<a.rows.length;n++)o.push(a.rows.item(n).key);w(o)},function(l,a){y(a)})})}).catch(y)});return E(m,h),m}function fe(h){return new v(function(C,m){h.transaction(function(w){w.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(y,I){for(var T=[],l=0;l<I.rows.length;l++)T.push(I.rows.item(l).name);C({db:h,storeNames:T})},function(y,I){m(I)})},function(w){m(w)})})}function Re(h,C){C=F.apply(this,arguments);var m=this.config();h=typeof h!="function"&&h||{},h.name||(h.name=h.name||m.name,h.storeName=h.storeName||m.storeName);var w=this,y;return h.name?y=new v(function(I){var T;h.name===m.name?T=w._dbInfo.db:T=openDatabase(h.name,"","",0),h.storeName?I({db:T,storeNames:[h.storeName]}):I(fe(T))}).then(function(I){return new v(function(T,l){I.db.transaction(function(a){function o(x){return new v(function(B,k){a.executeSql("DROP TABLE IF EXISTS "+x,[],function(){B()},function(S,_){k(_)})})}for(var n=[],A=0,p=I.storeNames.length;A<p;A++)n.push(o(I.storeNames[A]));v.all(n).then(function(){T()}).catch(function(x){l(x)})},function(a){l(a)})})}):y=v.reject("Invalid arguments"),E(y,C),y}var Ze={_driver:"webSQLStorage",_initStorage:qe,_support:Kr(),iterate:br,getItem:Zr,setItem:ne,removeItem:Jr,clear:Ke,length:ea,key:Le,keys:ta,dropInstance:Re};function ra(){try{return typeof localStorage!="undefined"&&"setItem"in localStorage&&!!localStorage.setItem}catch(h){return!1}}function _t(h,C){var m=h.name+"/";return h.storeName!==C.storeName&&(m+=h.storeName+"/"),m}function Vt(){var h="_localforage_support_test";try{return localStorage.setItem(h,!0),localStorage.removeItem(h),!1}catch(C){return!0}}function ut(){return!Vt()||localStorage.length>0}function aa(h){var C=this,m={};if(h)for(var w in h)m[w]=h[w];return m.keyPrefix=_t(h,C._defaultConfig),ut()?(C._dbInfo=m,m.serializer=Se,v.resolve()):v.reject()}function xr(h){var C=this,m=C.ready().then(function(){for(var w=C._dbInfo.keyPrefix,y=localStorage.length-1;y>=0;y--){var I=localStorage.key(y);I.indexOf(w)===0&&localStorage.removeItem(I)}});return E(m,h),m}function _e(h,C){var m=this;h=Q(h);var w=m.ready().then(function(){var y=m._dbInfo,I=localStorage.getItem(y.keyPrefix+h);return I&&(I=y.serializer.deserialize(I)),I});return E(w,C),w}function ve(h,C){var m=this,w=m.ready().then(function(){for(var y=m._dbInfo,I=y.keyPrefix,T=I.length,l=localStorage.length,a=1,o=0;o<l;o++){var n=localStorage.key(o);if(n.indexOf(I)===0){var A=localStorage.getItem(n);if(A&&(A=y.serializer.deserialize(A)),A=h(A,n.substring(T),a++),A!==void 0)return A}}});return E(w,C),w}function Je(h,C){var m=this,w=m.ready().then(function(){var y=m._dbInfo,I;try{I=localStorage.key(h)}catch(T){I=null}return I&&(I=I.substring(y.keyPrefix.length)),I});return E(w,C),w}function Cr(h){var C=this,m=C.ready().then(function(){for(var w=C._dbInfo,y=localStorage.length,I=[],T=0;T<y;T++){var l=localStorage.key(T);l.indexOf(w.keyPrefix)===0&&I.push(l.substring(w.keyPrefix.length))}return I});return E(m,h),m}function zt(h){var C=this,m=C.keys().then(function(w){return w.length});return E(m,h),m}function ia(h,C){var m=this;h=Q(h);var w=m.ready().then(function(){var y=m._dbInfo;localStorage.removeItem(y.keyPrefix+h)});return E(w,C),w}function vr(h,C,m){var w=this;h=Q(h);var y=w.ready().then(function(){C===void 0&&(C=null);var I=C;return new v(function(T,l){var a=w._dbInfo;a.serializer.serialize(C,function(o,n){if(n)l(n);else try{localStorage.setItem(a.keyPrefix+h,o),T(I)}catch(A){(A.name==="QuotaExceededError"||A.name==="NS_ERROR_DOM_QUOTA_REACHED")&&l(A),l(A)}})})});return E(y,m),y}function Ir(h,C){if(C=F.apply(this,arguments),h=typeof h!="function"&&h||{},!h.name){var m=this.config();h.name=h.name||m.name,h.storeName=h.storeName||m.storeName}var w=this,y;return h.name?y=new v(function(I){h.storeName?I(_t(h,w._defaultConfig)):I(h.name+"/")}).then(function(I){for(var T=localStorage.length-1;T>=0;T--){var l=localStorage.key(T);l.indexOf(I)===0&&localStorage.removeItem(l)}}):y=v.reject("Invalid arguments"),E(y,C),y}var ft={_driver:"localStorageWrapper",_initStorage:aa,_support:ra(),iterate:ve,getItem:_e,setItem:vr,removeItem:ia,clear:xr,length:zt,key:Je,keys:Cr,dropInstance:Ir},na=function(C,m){return C===m||typeof C=="number"&&typeof m=="number"&&isNaN(C)&&isNaN(m)},Mt=function(C,m){for(var w=C.length,y=0;y<w;){if(na(C[y],m))return!0;y++}return!1},wr=Array.isArray||function(h){return Object.prototype.toString.call(h)==="[object Array]"},Ie={},yr={},et={INDEXEDDB:qr,WEBSQL:Ze,LOCALSTORAGE:ft},Er=[et.INDEXEDDB._driver,et.WEBSQL._driver,et.LOCALSTORAGE._driver],Dt=["dropInstance"],jt=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(Dt),oa={description:"",driver:Er.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function sa(h,C){h[C]=function(){var m=arguments;return h.ready().then(function(){return h[C].apply(h,m)})}}function qt(){for(var h=1;h<arguments.length;h++){var C=arguments[h];if(C)for(var m in C)C.hasOwnProperty(m)&&(wr(C[m])?arguments[0][m]=C[m].slice():arguments[0][m]=C[m])}return arguments[0]}var la=(function(){function h(C){f(this,h);for(var m in et)if(et.hasOwnProperty(m)){var w=et[m],y=w._driver;this[m]=y,Ie[y]||this.defineDriver(w)}this._defaultConfig=qt({},oa),this._config=qt({},this._defaultConfig,C),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return h.prototype.config=function(m){if((typeof m=="undefined"?"undefined":u(m))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var w in m){if(w==="storeName"&&(m[w]=m[w].replace(/\W/g,"_")),w==="version"&&typeof m[w]!="number")return new Error("Database version must be a number.");this._config[w]=m[w]}return"driver"in m&&m.driver?this.setDriver(this._config.driver):!0}else return typeof m=="string"?this._config[m]:this._config},h.prototype.defineDriver=function(m,w,y){var I=new v(function(T,l){try{var a=m._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!m._driver){l(o);return}for(var n=jt.concat("_initStorage"),A=0,p=n.length;A<p;A++){var x=n[A],B=!Mt(Dt,x);if((B||m[x])&&typeof m[x]!="function"){l(o);return}}var k=function(){for(var R=function(ee){return function(){var he=new Error("Method "+ee+" is not implemented by the current driver"),ue=v.reject(he);return E(ue,arguments[arguments.length-1]),ue}},L=0,K=Dt.length;L<K;L++){var z=Dt[L];m[z]||(m[z]=R(z))}};k();var S=function(R){Ie[a]&&console.info("Redefining LocalForage driver: "+a),Ie[a]=m,yr[a]=R,T()};"_support"in m?m._support&&typeof m._support=="function"?m._support().then(S,l):S(!!m._support):S(!0)}catch(_){l(_)}});return P(I,w,y),I},h.prototype.driver=function(){return this._driver||null},h.prototype.getDriver=function(m,w,y){var I=Ie[m]?v.resolve(Ie[m]):v.reject(new Error("Driver not found."));return P(I,w,y),I},h.prototype.getSerializer=function(m){var w=v.resolve(Se);return P(w,m),w},h.prototype.ready=function(m){var w=this,y=w._driverSet.then(function(){return w._ready===null&&(w._ready=w._initDriver()),w._ready});return P(y,m,m),y},h.prototype.setDriver=function(m,w,y){var I=this;wr(m)||(m=[m]);var T=this._getSupportedDrivers(m);function l(){I._config.driver=I.driver()}function a(A){return I._extend(A),l(),I._ready=I._initStorage(I._config),I._ready}function o(A){return function(){var p=0;function x(){for(;p<A.length;){var B=A[p];return p++,I._dbInfo=null,I._ready=null,I.getDriver(B).then(a).catch(x)}l();var k=new Error("No available storage method found.");return I._driverSet=v.reject(k),I._driverSet}return x()}}var n=this._driverSet!==null?this._driverSet.catch(function(){return v.resolve()}):v.resolve();return this._driverSet=n.then(function(){var A=T[0];return I._dbInfo=null,I._ready=null,I.getDriver(A).then(function(p){I._driver=p._driver,l(),I._wrapLibraryMethodsWithReady(),I._initDriver=o(T)})}).catch(function(){l();var A=new Error("No available storage method found.");return I._driverSet=v.reject(A),I._driverSet}),P(this._driverSet,w,y),this._driverSet},h.prototype.supports=function(m){return!!yr[m]},h.prototype._extend=function(m){qt(this,m)},h.prototype._getSupportedDrivers=function(m){for(var w=[],y=0,I=m.length;y<I;y++){var T=m[y];this.supports(T)&&w.push(T)}return w},h.prototype._wrapLibraryMethodsWithReady=function(){for(var m=0,w=jt.length;m<w;m++)sa(this,jt[m])},h.prototype.createInstance=function(m){return new h(m)},h})(),ca=new la;s.exports=ca},{3:3}]},{},[4])(4)})});function D(e,t,r){return(e&255)<<0|(t&255)<<8|(r&255)<<16}var Mr=[D(0,0,0),D(255,255,255)],kl=[D(0,0,0),D(255,128,64),D(64,255,128),D(128,64,255),D(255,255,255)],Fl=[0,16777215,D(163,64,69),D(125,235,228),D(174,70,186),D(94,202,84),D(60,57,200),D(255,255,111),D(174,96,47),D(110,73,0),D(232,122,128),D(92,92,92),D(143,143,143),D(179,255,167),D(129,126,255),D(199,199,199)],Ge=[D(0,0,0),D(255,255,255),D(129,51,56),D(117,206,200),D(142,60,151),D(86,172,77),D(46,44,155),D(237,241,113),D(142,80,41),D(85,56,0),D(196,108,113),D(74,74,74),D(123,123,123),D(169,255,159),D(112,109,235),D(178,178,178)],ma=[D(0,0,0),D(255,255,255),D(120,41,34),D(135,214,221),D(170,95,182),D(85,160,73),D(64,49,141),D(191,206,114),D(170,116,73),D(234,180,137),D(184,105,98),D(199,255,255),D(234,159,246),D(148,224,137),D(128,113,204),D(255,255,178)],ai=[D(0,0,0),D(0,0,0),D(33,200,66),D(94,220,120),D(84,85,237),D(125,118,252),D(212,82,77),D(66,235,245),D(252,85,84),D(255,121,120),D(212,193,84),D(230,206,128),D(33,176,59),D(201,91,186),D(204,204,204),D(255,255,255)],Dr=[5395026,11796480,10485760,11599933,7602281,91,95,6208,12048,543240,26368,1196544,7153664,0,0,0,12899815,16728064,14421538,16729963,14090399,6818519,6588,21681,27227,35843,43776,2918400,10777088,0,0,0,16316664,16755516,16742785,16735173,16730354,14633471,4681215,46327,57599,58229,259115,7911470,15065624,7895160,0,0,16777215,16773822,16300216,16300248,16758527,16761855,13095423,10148607,8973816,8650717,12122296,16119980,16777136,16308472,0,0],ii=[D(0,0,0),D(255,68,253),D(20,245,60),D(20,207,253),D(255,106,60),D(255,255,255)],pa=[D(0,0,0),D(227,30,96),D(96,78,189),D(255,68,253),D(0,163,96),D(156,156,156),D(20,207,253),D(208,195,255),D(96,114,3),D(255,106,60),D(156,156,156),D(255,160,208),D(20,245,60),D(208,221,141),D(114,255,208),D(255,255,255)],ni=[0,2368548,4737096,7171437,9539985,11974326,14342874,16777215,12255269,14680137,16716142,16725394,16734903,16744155,16753663,16762879,11534409,13959277,16318866,16721334,16730842,16740095,16749311,16758783,10420330,12779662,15138995,16718039,16727291,16736767,16745983,16755199,8847495,11206827,13631696,15994612,16724735,16733951,16743423,16752639,6946975,9306307,11731175,14092287,16461055,16732415,16741631,16751103,4784304,7143637,9568505,11929087,14297599,16731647,16741119,16750335,2425019,4784352,7209215,9570047,12004095,14372863,16741375,16750847,191,2359523,4718847,7146495,9515263,11949311,14318079,16752127,187,224,2294015,4658431,7092735,9461247,11895551,14264063,176,213,249,2367999,4736511,7105279,9539327,11908095,159,195,3303,209151,2577919,4946431,7380735,9749247,135,171,7888,17140,681983,3050495,5484543,7853311,106,3470,12723,22231,31483,1548031,3916799,6285311,73,8557,17810,27318,36570,373759,2742271,5176575,4389,13641,23150,32402,41911,51163,2026495,4456447,9472,18724,27976,37485,46737,56246,1834970,4194303,14080,23296,32803,42055,51564,60816,2031541,4456409,18176,27648,36864,46116,55624,392556,2752401,5177269,21760,30976,40192,49667,58919,1572683,3932016,6291348,24320,33536,43008,52224,716810,3079982,5504851,7864183,25856,35328,44544,250368,2619136,4980503,7405371,9764703,26624,35840,45312,2413824,4782336,7143173,9568041,11927374,26112,35584,2338560,4707328,7141376,9502464,11927326,14286659,24832,2393344,4762112,7196160,9564928,11992832,14352155,16711487,2447360,4815872,7250176,9618688,12052992,14417664,16776990,16777027,4803328,7172096,9606144,11974912,14343424,16776965,16777001,16777038,6962176,9330688,11764992,14133504,16502272,16773655,16777019,16777055,8858112,11226880,13660928,16029440,16759818,16769070,16777043,16777079,10426112,12794624,15163392,16745475,16754727,16764235,16773488,16777108,11534848,13969152,16337664,16740388,16749640,16759148,16768401,16777141,12255232,14684928,16725795,16735047,16744556,16753808,16763317,16772569],$e=[0,0,4210752,4210752,7105644,7105644,9474192,9474192,11579568,11579568,13158600,13158600,14474460,14474460,16053492,16053492,17476,17476,1074276,1074276,2393220,2393220,3448992,3448992,4241592,4241592,5296336,5296336,6088936,6088936,6880508,6880508,10352,10352,1328260,1328260,2645144,2645144,3963052,3963052,5016764,5016764,6070476,6070476,6862044,6862044,7915756,7915756,6276,6276,1586328,1586328,3166380,3166380,4745408,4745408,6062288,6062288,7378144,7378144,8431852,8431852,9747708,9747708,136,136,2105500,2105500,3947696,3947696,5789888,5789888,7368912,7368912,8947936,8947936,10526956,10526956,11842812,11842812,6029432,6029432,7610508,7610508,8928416,8928416,10246320,10246320,11563200,11563200,12616912,12616912,13671644,13671644,14725356,14725356,7864392,7864392,9445472,9445472,10763384,10763384,12081292,12081292,13398176,13398176,14451892,14451892,15506628,15506628,16560340,16560340,8650772,8650772,9969712,9969712,11287628,11287628,12605544,12605544,13660284,13660284,14715028,14715028,15507624,15507624,16561340,16561340,8912896,8912896,10231836,10231836,11550776,11550776,12606544,12606544,13661288,13661288,14716028,14716028,15508624,15508624,16562340,16562340,8132608,8132608,9451548,9451548,11031608,11031608,12349520,12349520,13404264,13404264,14457980,14457980,15512720,15512720,16566436,16566436,6040576,6040576,7883804,7883804,9463864,9463864,11306064,11306064,12622952,12622952,13939836,13939836,15256720,15256720,16572580,16572580,2898944,2898944,4742172,4742172,6585400,6585400,8428624,8428624,9745512,9745512,11325564,11325564,12641424,12641424,13958308,13958308,15360,15360,2120736,2120736,4226112,4226112,6069340,6069340,7648372,7648372,9228428,9228428,10806436,10806436,12123320,12123320,14356,14356,1858612,1858612,3701840,3701840,5281900,5281900,6861956,6861956,8178844,8178844,9495732,9495732,10812616,10812616,12332,12332,1855564,1855564,3436648,3436648,5016708,5016708,6596764,6596764,7913652,7913652,8967372,8967372,10284256,10284256,10308,10308,1591396,1591396,3172484,3172484,4490400,4490400,5807288,5807288,7124176,7124176,8178920,8178920,9232636,9232636],Aa=[0,11141120,43520,11184640,170,11141290,21930,11184810,5592405,16733525,5635925,16777045,5592575,16733695,5636095,16777215],oi=[0,43520,170,21930],si=[0,11184640,11141290,11184810],li=[0,11184640,170,11184810],ci=[0,5635925,5592575,5636095],hi=[0,16777045,16733695,16777215],ui=[0,16776960,5592575,16777215],ga=at(2,2,2),fi=at(3,3,2),di=at(4,4,4),ba=at(3,3,3),xa=at(1,1,1),At=[D(0,0,0),D(1,0,206),D(207,1,0),D(207,1,206),D(0,207,21),D(1,207,207),D(207,207,21),D(207,207,207),D(0,0,0),D(2,0,253),D(255,2,1),D(255,2,253),D(0,255,28),D(2,255,255),D(255,255,29),D(255,255,255)],rt=[D(0,0,0),D(0,117,255),D(255,76,57),D(209,185,81),D(9,185,0),D(48,223,16),D(255,229,1),D(255,255,255),D(140,140,140),D(40,229,192),D(255,160,46),D(100,103,0),D(255,41,255),D(140,143,255),D(124,237,0),D(196,43,252)],Ca=[0,8388752,16711680,128,8388736,16711808,255,8388863,16711935,32768,8421376,16744448,32896,8421504,16744576,33023,8421631,16744703,65280,8453888,16776960,65408,8454016,16777088,65535,8454143,16777215],mi=[0,1911635,8267091,34641,11227702,6248271,12764103,16773608,16711757,16753408,16772135,58422,2731519,8615580,16742312,16764074],pi=[1313820,4465716,3159149,5130831,8735792,3433764,13649480,7696737,5864910,13794604,8754593,7186988,13806233,7193290,14341214,14610134],Ai=[16579836,16724307,183389,4931571],va=[997391,3170864,1027212,1035436];var Xn=at(3,3,3),Sr=at(4,4,4),Wn=at(5,5,5),Ia=Wn,Zt=Sr,gi=Sr,Rr=Sr,bi=Sr,wa=Xn,Xe=Yn(),xi=Vn(),Pr=[D(48,210,0),D(245,245,128),D(76,58,180),D(154,50,54)],Tr=[D(216,216,216),D(65,175,113),D(216,110,240),D(212,127,0)];function at(e,t,r){for(var i=1<<e+t+r,s=255/((1<<e)-1),c=255/((1<<t)-1),u=255/((1<<r)-1),f=new Uint32Array(i),d=0;d<i;d++){var g=d&(1<<e)-1,b=d>>e&(1<<t)-1,M=d>>e+t&(1<<r)-1;f[d]=D(g*s,b*c,M*u)}return f}function Yn(){let e=new Uint32Array(32768),t=0;for(let r=0;r<32;++r)for(let i=0;i<32;++i)for(let s=0;s<32;++s,++t){let c=r<<3|i<<11|s<<19;c|=(r&28)>>2|(i&28)>>2<<8|(s&28)>>2<<16,e[t]=c}return e}function Vn(){let e=new Uint32Array(2048),t=0;for(let r=0;r<16;++r)for(let i=0;i<16;++i)for(let s=0;s<8;++s,++t){let c=r<<4|i<<12|s<<21;e[t]=c}return e}var Jt=[{id:"c64.multi",name:"C-64 Multi",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Ge,block:{w:4,h:8,colors:4,xb:1,yb:2},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},toNative:"exportC64Multi"},{id:"c64.multi.fli",name:"C-64 Multi FLI (w/o bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Ge,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cell:{w:4,h:8,msbToLsb:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.bug",name:"C-64 Multi FLI (with bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Ge,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank.left",name:"C-64 Multi FLI (Left blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Ge,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank",name:"C-64 Multi FLI (L/R blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Ge,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.hires",name:"C-64 Hires",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Ge,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},toNative:"exportC64Hires"},{id:"c64.hires.fli",name:"C-64 Hires FLI (w/o bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Ge,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.bug",name:"C-64 Hires FLI (with bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Ge,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.blank",name:"C-64 Hires FLI (L/R blank)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Ge,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Hires"},{id:"nes",name:"NES (4 color, 240 tiles)",width:160,height:96,scaleX:8/7,conv:"DitheringCanvas",pal:Dr,reduce:4,toNative:"exportNES"},{id:"msx",name:"MSX/Coleco (TMS9918A)",width:256,height:192,conv:"Msx_Canvas",pal:ai,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportTMS9918"},{id:"apple2.hires",name:"Apple ][ (Hires)",width:140,height:192,scaleX:2,conv:"Apple2_Canvas",pal:ii,block:{w:7,h:1,colors:4},toNative:"exportApple2HiresToHGR"},{id:"atari8.d",name:"Atari ANTIC (Mode D)",width:160,height:96,scaleX:.8571,conv:"DitheringCanvas",pal:$e,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"atari8.e",name:"Atari ANTIC (Mode E)",width:160,height:192,scaleX:.8571*2,conv:"DitheringCanvas",pal:$e,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"atari8.f.10",name:"Atari ANTIC (Mode F/10)",width:80,height:192,scaleX:.8571*4,conv:"DitheringCanvas",pal:$e,reduce:9,toNative:"exportFrameBuffer",exportFormat:{bpp:4,brev:!0}},{id:"vcs",name:"Atari VCS",width:40,height:192,scaleX:6,conv:"DitheringCanvas",pal:$e,reduce:2,toNative:"exportVCSPlayfield"},{id:"vcs.color",name:"Atari VCS (Color)",width:40,height:192,scaleX:6,conv:"VCSColorPlayfield_Canvas",pal:$e,toNative:"exportVCSPlayfield"},{id:"astrocade",name:"Bally Astrocade",width:160,height:98,scaleX:1,conv:"DitheringCanvas",pal:ni,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"zx",name:"ZX Spectrum",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:At,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportZXSpectrum"},{id:"zx.dark",name:"ZX Spectrum (dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:At,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},toNative:"exportZXSpectrum"},{id:"zx.bright",name:"ZX Spectrum (bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:At,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},toNative:"exportZXSpectrum"},{id:"zx.dark.bright",name:"ZX Spectrum (dark made bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:At,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},customize:{flipPalette:!0},toNative:"exportZXSpectrum"},{id:"zx.bright.dark",name:"ZX Spectrum (bright made dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:At,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},customize:{flipPalette:!0},toNative:"exportZXSpectrum"},{id:"cpc.mode0",name:"Amstrad CPC (mode 0)",width:160,height:200,scaleX:2,conv:"DitheringCanvas",pal:Ca,reduce:16,toNative:"exportFrameBuffer",exportFormat:{bpp:4,yremap:[3,80,2048],bitremap:[7,3,5,1,6,2,4,0]}},{id:"cpc.mode1",name:"Amstrad CPC (mode 1)",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:Ca,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,yremap:[3,80,2048],bitremap:[7,3,6,2,5,1,4,0]}},{id:"vic20.hires",name:"VIC-20 Hires",width:160,height:160,scaleX:1.5,conv:"VICII_Canvas",pal:ma,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicHires"},{id:"vic20.multi",name:"VIC-20 Multi",width:80,height:160,scaleX:3,conv:"VICII_Canvas",pal:ma,block:{w:4,h:8,colors:4},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:15},aux:!0,auxRange:{min:0,max:15},border:!0,borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicMulti"},{id:"nes.1bpp",name:"NES (1bpp tiles)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:2,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:1},auxRange:{min:0,max:1},borderRange:{min:0,max:1},colorsRange:{min:0,max:1}},reduce:2,customize:{outputTileset:!1,outputPalette:!0},toNative:"exportSNES"},{id:"nes.2bpp",name:"NES (2bpp tiles)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},reduce:4,customize:{outputTileset:!1,outputPalette:!0},toNative:"exportSNES"},{id:"snes.2bpp",name:"SNES (2bpp)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},customize:{outputTileset:!1,outputPalette:!1,planeToMemory:"interleaved"},reduce:4,toNative:"exportSNES"},{id:"snes.3bpp",name:"SNES (3bpp)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:8,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:7},auxRange:{min:0,max:7},borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},reduce:8,customize:{planeToMemory:"interleaved"},toNative:"exportSNES"},{id:"snes.4bpp",name:"SNES (4bpp)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{planeToMemory:"interleaved"},reduce:16,toNative:"exportSNES"},{id:"snes.8bpp",name:"SNES (8bpp)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{planeToMemory:"interleaved"},reduce:256,toNative:"exportSNES"},{id:"snes.mode7",name:"SNES (Mode 7)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{bitsInPlane:8,planes:1},reduce:256,toNative:"exportSNES"},{id:"neo.geopocket",name:"Neo Geo Pocket Color",width:160,height:152,scaleX:1,conv:"SubPalette_Canvas",pal:bi,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},subPalettes:{count:16,colors:4},paletteChoices:{colorsRange:{min:0,max:63}},reduce:64,customize:{subPalettePaletteFormat:"rgb444"},toNative:"exportNeoGeoPocketTiles"},{id:"virtualboy",name:"Virtual Boy",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Xe,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:2,planes:1,planeLittleEndian:!0},reduce:4,toNative:"exportSNES"},{id:"gg.4pp",name:"Sega Game Gear (4bpp linear)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Rr,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{outputTileset:!1,outputPalette:!1,planeToMemory:"linear"},reduce:16,toNative:"exportSNES"},{id:"genesis",name:"Genesis (4bpp)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:wa,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:4,planes:1,planeLittleEndian:!0},reduce:16,toNative:"exportSNES"},{id:"genesis.tiles",name:"Genesis (Tile Palettes)",width:320,height:224,scaleX:1,conv:"SubPalette_Canvas",pal:wa,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},subPalettes:{count:4,colors:16,sharedFirstColor:!0},paletteChoices:{colorsRange:{min:0,max:63}},reduce:64,customize:{subPalettePaletteFormat:"genesis"},toNative:"exportGenesisTiles"},{id:"snes.8bpp.direct",name:"SNES (Direct Color)",width:256,height:256,scaleX:1,conv:"SNES_Canvas_Direct",pal:xi,block:{w:8,h:8,colors:2048,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:2047},auxRange:{min:0,max:2047},borderRange:{min:0,max:2047},colorsRange:{min:0,max:2047}},customize:{outputTileset:!0,outputPalette:!1,transformColor:"bbgggrrr",planes:8},toNative:"exportSNES"},{id:"stic",name:"Intellivision (FGBG)",width:64,height:64,conv:"Stic_Fgbg_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticFgbg"},{id:"stic.stack.grom",name:"Intellivision (Color Stack, GROM)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8,xb:0,yb:0},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticColorStack"},{id:"stic.stack.gram",name:"Intellivision (Color Stack, GRAM)",width:64,height:64,conv:"Stic_ColorStack_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:15}},toNative:"exportSticColorStack"},{id:"stic.stack.gromram",name:"Intellivision (Color Stack, GROM+GRAM)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0,xb:0,yb:0},cb:{w:8,h:8},param:{cell:!0,extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticColorStack"},{id:"stic.stack.grom.single",name:"Intellivision (Single BG, GROM)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8,xb:0,yb:0},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"stic.stack.gram.single",name:"Intellivision (Single BG, GRAM)",width:64,height:64,conv:"Stic_ColorStack_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"stic.stack.gromram.single",name:"Intellivision (Single BG, GROM+GRAM)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:rt,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0,xb:0,yb:0},cb:{w:8,h:8},param:{cell:!0,extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"nes4f",caveat:"960 unique tiles; a plain NES holds 256 background tiles, so this needs CHR bank switching or a mapper like MMC5",name:"NES (4 color, full screen)",width:256,height:240,scaleX:8/7,conv:"DitheringCanvas",pal:Dr,reduce:4,toNative:"exportNES"},{id:"nes5f",caveat:"960 unique tiles (needs CHR bank switching or MMC5), and the export omits the attribute table that carries the 5th color",name:"NES (5 color, full screen)",width:256,height:240,scaleX:8/7,conv:"NES_Canvas",pal:Dr,reduce:5,toNative:"exportNES"},{id:"sms-gg.tiles",name:"Sega Game Gear (Tile Palettes)",width:128,height:128,scaleX:1.2,conv:"SubPalette_Canvas",pal:Rr,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},subPalettes:{count:2,colors:16},paletteChoices:{colorsRange:{min:0,max:31}},reduce:32,customize:{subPalettePaletteFormat:"rgb444"},toNative:"exportGameGearTiles"},{id:"sms.tiles",name:"Sega Master System (Tile Palettes)",width:176,height:144,scaleX:8/7,conv:"SubPalette_Canvas",pal:ga,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},subPalettes:{count:2,colors:16},paletteChoices:{colorsRange:{min:0,max:31}},reduce:32,customize:{subPalettePaletteFormat:"rgb222"},toNative:"exportMasterSystemTiles"},{id:"apple2.lores",name:"Apple ][ (Lores)",width:40,height:48,scaleX:1.5,conv:"DitheringCanvas",pal:pa,toNative:"exportFrameBuffer",exportFormat:{bpp:4}},{id:"x86.cga.04h.1",name:"PC CGA (Mode 04h, palette 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:oi,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.1B",name:"PC CGA (Mode 04h, bright 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:ci,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2",name:"PC CGA (Mode 04h, palette 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:si,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2B",name:"PC CGA (Mode 04h, bright 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:hi,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h",name:"PC CGA (Mode 05h)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:li,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h.B",name:"PC CGA (Mode 05h, bright)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:ui,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.ega.0dh",name:"PC EGA (Mode 0Dh)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Aa,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"x86.ega.10h",name:"PC EGA (Mode 10h)",width:640,height:350,scaleX:350/640*1.37,conv:"DitheringCanvas",pal:Aa,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"mcr2",name:"Bally MCR-II",width:256,height:240,scaleX:1,conv:"SNES_Canvas",pal:di,block:{w:16,h:16,colors:4},cell:{w:16,h:16,msbToLsb:!0},reduce:64,toNative:"exportSNES"},{id:"gb.tiles",name:"Game Boy Classic (Tiles)",width:128,height:128,scaleX:1,conv:"SNES_Canvas",pal:va,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},reduce:4,toNative:"exportGBTiles"},{id:"gb.color.tiles",name:"Game Boy Color (Tile Palettes)",width:128,height:128,scaleX:1,conv:"GBC_Canvas",pal:Ia,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:31}},reduce:32,toNative:"exportGBC"},{id:"MC6847.CG2.palette0",name:"MC6847 (CG2, palette 0)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:Pr,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG2.palette1",name:"MC6847 (CG2, palette 1)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:Tr,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette0",name:"MC6847 (CG3, palette 0)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:Pr,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette1",name:"MC6847 (CG3, palette 1)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:Tr,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette0",name:"MC6847 (CG6, palette 0)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:Pr,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette1",name:"MC6847 (CG6, palette 1)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:Tr,reduce:4,toNative:"exportMC6847"},{id:"amiga.lores",name:"Amiga (Lores)",width:320,height:256,conv:"DitheringCanvas",pal:Zt,reduce:32,toNative:"exportAmiga"},{id:"amiga.lores.ham6",name:"Amiga (Lores, HAM6)",width:320,height:256,conv:"HAM6_Canvas",pal:Zt,reduce:16,extraColors:48,toNative:"exportAmigaHAM6"},null,{id:"atari7800.160a",name:"Atari 7800 (160A)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:$e,reduce:4},{id:"atari7800.160b",name:"Atari 7800 (160B)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:$e,reduce:12},{id:"sms",name:"Sega Master System",width:176,height:144,scaleX:8/7,conv:"DitheringCanvas",pal:ga,reduce:16},{id:"sms-gg",name:"Sega Game Gear (full screen)",width:160,height:144,scaleX:1.2,conv:"DitheringCanvas",pal:Rr,reduce:16},{id:"bbcmicro.mode2",name:"BBC Micro (mode 2)",width:160,height:256,scaleX:2,conv:"DitheringCanvas",pal:xa},{id:"apple2.dblhires",name:"Apple ][ (Double-Hires)",width:140,height:192,scaleX:2,conv:"DitheringCanvas",pal:pa},{id:"appleiigs.320.16",name:"Apple IIGS (16 colors)",width:320,height:200,conv:"DitheringCanvas",pal:gi,reduce:16},{id:"channelf",name:"Fairchild Channel F",width:102,height:58,conv:"DitheringCanvas",pal:Ai,reduce:4},{id:"mac",name:"Mac 128K",width:512,height:342,conv:"DitheringCanvas",pal:Mr},{id:"williams",name:"Williams Arcade",width:304,height:256,conv:"DitheringCanvas",pal:fi,reduce:16},{id:"pico8",name:"PICO-8",width:128,height:128,conv:"DitheringCanvas",pal:mi},{id:"tic80",name:"TIC-80",width:240,height:136,conv:"DitheringCanvas",pal:pi},{id:"gb",name:"Game Boy Classic (full screen)",width:160,height:144,scaleX:10/9,conv:"DitheringCanvas",pal:va},{id:"gb.color",caveat:"32 colors on screen, but each tile may use only one of the eight 4-color palettes. Use the Tile Palettes variant",name:"Game Boy Color (full screen)",width:160,height:144,scaleX:10/9,conv:"DitheringCanvas",pal:Ia,reduce:32},{id:"cx16.lores",name:"Commander X16 (Lores)",width:320,height:240,scaleX:1,conv:"DitheringCanvas",pal:Zt,reduce:256},{id:"cx16.hires",name:"Commander X16 (Hires)",width:640,height:480,scaleX:1,conv:"DitheringCanvas",pal:Zt,reduce:16},{id:"compucolor",name:"Compucolor",width:160,height:192,scaleX:1.6,conv:"Compucolor_Canvas",pal:At,block:{w:2,h:4,colors:2}},{id:"teletext",name:"Teletext",width:80,height:72,scaleX:4/3,conv:"Teletext_Canvas",pal:xa,block:{w:2,h:3,colors:2}},{id:"atarist",name:"Atari ST",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:ba,reduce:16},{id:"vcs.48",name:"Atari VCS (48x48 bitmap)",width:48,height:48,conv:"DitheringCanvas",pal:$e,reduce:2},{id:"pce.256x240",name:"PC Engine (256x240)",width:256,height:240,scaleX:5/4,conv:"DitheringCanvas",pal:ba,reduce:16},{id:"phememo-d30.landscape",name:"Phomemo D30 (landscape)",width:288,height:88,conv:"DitheringCanvas",pal:Mr},{id:"phememo-d30.portrait",name:"Phomemo D30 (portrait)",width:88,height:288,conv:"DitheringCanvas",pal:Mr}],kr={};Jt.forEach(e=>{e&&(kr[e.id||e.name]=e)});var Ma={};ri(Ma,{bitOverlayUint8Array:()=>Rt,exportAmiga:()=>Bo,exportAmigaHAM6:()=>_o,exportApple2HiresToHGR:()=>Zn,exportC64Hires:()=>io,exportC64Multi:()=>ao,exportCombinedImageAndColorCellBuffer:()=>Ue,exportFrameBuffer:()=>vi,exportGBC:()=>Io,exportGBTiles:()=>vo,exportGameGearTiles:()=>Mi,exportGenesisTiles:()=>Eo,exportMC6847:()=>Ro,exportMasterSystemTiles:()=>wo,exportNES:()=>Mo,exportNES5Color:()=>Do,exportNeoGeoPocketTiles:()=>yo,exportSNES:()=>Co,exportSticColorStack:()=>uo,exportSticFgbg:()=>co,exportTMS9918:()=>mo,exportVCSPlayfield:()=>So,exportVicHires:()=>no,exportVicMulti:()=>oo,exportZXSpectrum:()=>lo,getSnesBitplanCellMapper:()=>wi,getSnesTilemapMapper:()=>yi});function xe(e,t){return t||(t=2),jn(e,t,16)}function jn(e,t,r){try{for(var i=e.toString(r).toUpperCase();i.length<t;)i="0"+i;return i}catch(s){return e+""}}function ye(e,t){e||(t==null?console.assert(e):console.assert(e,t))}function gt(e,t){return e.map(r=>t.indexOf(r&16777215))}function St(e,t,r,i){if(t==0)return[];let s=e,c=[];for(;t>0;)c.push(s&r),s>>=i,--t;return c}function Qe(e,t,r){return St(e,t,r.paletteBitFilter,r.paletteBits)}function Fr(e,t,r,i,s){return r==0?[]:(ye(e<t.length),St(t[e],r,i,s))}function ya(e,t,r,i){return Fr(e,t,r,i.paletteBitFilter,i.paletteBits)}function Kn(e,t){if(!t)return e;for(var r=0,i=0;i<t.length;i++){var s=t[i];s<0&&(s=-s-1,r^=1<<s),e&1<<i&&(r^=1<<s)}return r}function Ci(e,t){t.destfmt&&(t=t.destfmt);var r=t.w,i=t.h,s=t.count||1,c=t.bpp||1,u=t.np||1,f=t.bpw||8,d=t.sl||Math.ceil(t.w*c/f),g=(1<<c)-1,b=t.pofs||d*i*s,M=t.skip||0,v;u>0&&t.sl?v=new Uint8Array(d*i*s):t.yremap?v=new Uint8Array(s*((i>>t.yremap[0])*t.yremap[1]+((1<<t.yremap[0])-1)*t.yremap[2])):f<=8?v=new Uint8Array(d*i*s*u):v=new Uint32Array(d*i*s*u);for(var E=0;E<s;E++)for(var P=e[E],Q=0,F=0;F<i;F++){var H=t.flip?i-1-F:F,G=E*d*i+H*d;t.yremap&&(G=(F>>t.yremap[0])*t.yremap[1]+(F&(1<<t.yremap[0])-1)*t.yremap[2]);for(var U=0,J=0;J<r;J++){var re=P[Q++]&255,O=Kn(G,t.remap);if(t.bitremap)for(var X=0;X<(t.bpp||1);X++)re&1<<X&&(v[O]|=1<<t.bitremap[U+X]);else for(var X=0;X<u;X++){var W=re>>X*c&g;v[O+X*b+M]|=t.brev?W<<f-U-c:W<<U}U+=c,U>=f&&(G+=1,U=0)}}return v}function bt(e){var t=0;e.forEach(i=>{t+=i.length});var r=new Uint8Array(t);return t=0,e.forEach(i=>{r.set(i,t),t+=i.length}),r}function vi(e,t){var r=t.exportFormat;if(!r)throw"No export format";return r.w=e.width,r.h=e.height,new Uint8Array(Ci([e.indexed],r))}function Zn(e,t){for(var r=new Uint8Array(8192),i=0,s=0;s<e.height;s++)for(var c=(s&7)*1024+(s>>3&7)*128+(s>>6)*40,u=0;u<e.width;u+=7){for(var f=0,d=0,g=0;g<7;g++){var b=e.indexed[i++]&255;(b==3||b==4)&&(d|=128),b>=3&&(b-=2),f|=b<<g*2}r[c++]=f&127|d,r[c++]=f>>7&127|d}return r}function Rt(e,t,r,i,s,c){c=c===void 0?!0:c;let u=(1<<s)-1,d=(r&u)<<i;u<<=i,t+=c?0:(s+i-1)/8;let g=c?1:-1;for(let b=s+i;b>0;b-=8,t+=g){let v=(-1^u)&255,E=d&255;ye(t<e.length),e[t]=e[t]&v|E,d>>=8,u>>=8}}function Jn(e,t){if(t===void 0)return;let r=t.fullPaletteMode===void 0?e.fullPaletteMode:t.fullPaletteMode;if(t.prepare===void 0)throw'The "prepare" method is required.';let i,s=()=>(i=t.prepare(),i.littleEndian=i.littleEndian===void 0?!0:i.littleEndian,i),c=t.paramToBitPattern!==void 0?t.paramToBitPattern:(d,g,b)=>{if(r)return g;let M=St(d,t.colors===void 0?e.colors:t.colors,t.paletteBitFilter===void 0?e.paletteBitFilter:t.paletteBitFilter,t.paletteBits===void 0?e.paletteBits:t.paletteBits);if(t.globalColorsBitPattern!==void 0){for(let v=0;v<t.globalColorsBitPattern.length;++v)if(g==t.globalColorsBitPattern[v].paletteIndex)return t.globalColorsBitPattern[v].bitPattern}if(t.globalColorToBitPattern!==void 0){let v=t.globalColorToBitPattern(d,g,b);if(v!==void 0)return v}if(t.colorToBitPattern!==void 0){let v=t.colorToBitPattern(d,g,b);if(v!==void 0)return v}for(let v=0;v<M.length&&v<t.colorsBitPattern.length;++v)if(g==M[v])return t.colorsBitPattern[v];return console.log("global nor param color does not contain color from image",e,t,d,g,b),ye(!1),0},u=t.iterate!==void 0?t.iterate:d=>{let g=t.params===void 0?e.params:t.params,b=t.indexed===void 0?e.indexed:t.indexed;if(t.xyToBitInfo!==void 0){if(b===void 0||g===void 0&&!r)throw'Both "params" and "indexed" must be defined.';for(let M=0,v=0;v<(t.height===void 0?e.height:t.height);++v)for(let E=0;E<(t.width===void 0?e.width:t.width);++E,++M){let P=t.xyToBitInfo(E,v);ye(g===void 0||P.paramOffset<g.length);let Q=c(g===void 0?0:g[P.paramOffset],b[M],P);Rt(d,P.offset,Q,P.bitShift,P.bitCount,i.littleEndian)}}};return{prepare:s,prefill:t.prefill,iterate:t.iterate===void 0?u:t.iterate,commit:t.commit,finalize:t.finalize,xyToBitInfo:t.xyToBitInfo,paramToBitPattern:c,globalColorsBitPattern:t.globalColorsBitPattern===void 0?[]:t.globalColorsBitPattern,globalColorToBitPattern:t.globalColorToBitPattern,colorsBitPattern:t.colorsBitPattern,colorToBitPattern:t.colorToBitPattern}}function eo(e,t){if(t!==void 0){if("prepare"in t)return Jn(e,t);if("data"in t)return{prepare(){return{data:t.data()}}};throw'Either "prepare" or "data" on a "CellExporterMapper" or "DataMapper" must be defined.'}}function to(e,t,r){if(r===void 0||!e)return;let i;if(r.prepare===void 0)throw'The "prepare" method is required.';let s=()=>(i=r.prepare(),i.littleEndian=i.littleEndian===void 0?!0:i.littleEndian,i),c=()=>{let f=r.params===void 0?t.params:r.params;if(!(r.paramToBitInfo===void 0&&r.paramToBitPattern===void 0)){if(r.paramToBitInfo===void 0||r.paramToBitPattern===void 0||f===void 0)throw'All of "paramToBitInfo" and "paramToBitPattern" and "params" must be defined.';for(let d=0;d<f.length;d++){let g=f[d],b=r.paramToBitInfo(d),M=r.paramToBitPattern(g,b);Rt(i.data,b.offset,M,b.bitShift,b.bitCount,i.littleEndian)}}};return{prepare:s,prefill:r.prefill,iterate:r.iterate===void 0?c:r.iterate,commit:r.commit,finalize:r.finalize,params:r.params===void 0?t.params:r.params,paramToBitInfo:r.paramToBitInfo,paramToBitPattern:r.paramToBitPattern}}function Qr(e,t,r){if(!(!e||r===void 0)){if("prepare"in r)return to(e,t,r);if("data"in r)return{prepare(){return{data:r.data()}}};throw'Either "prepare" or "data" on a "ParamExporterMapper" or "DataMapper" must be defined.'}}function Ue(e){let t=eo({width:e.content.width,height:e.content.height,params:e.content.blockParams,indexed:e.message.indexed,colors:e.content.block.colors,fullPaletteMode:e.content.fullPaletteMode,paletteBitFilter:e.content.paletteBitFilter,paletteBits:e.content.paletteBits},e.cellMapper),r=Qr(e.colorParamMapper!==void 0,{params:e.content.blockParams},e.colorParamMapper),i=Qr(e.content.paramInfo.cb,{params:e.content.cbParams},e.colorBlockParamMapper),s=Qr(e.content.paramInfo.cell,{params:e.content.cellParams},e.cellParamMapper),c=Qr(e.content.paramInfo.extra>0,{params:e.content.extraParams},e.extraParamMapper),u=[t,r,i,s,c],f=u.filter(v=>v!==void 0),d=[],g=[];for(let v=0;v<u.length;++v){let E=u[v];if(E===void 0){g.push(void 0);continue}let P=E.prepare();d.push(P),g.push(P.data)}for(let v=0;v<f.length;++v){let E=f[v];E.prefill!==void 0&&E.prefill(d[v].data)}for(let v=0;v<f.length;++v){let E=f[v];E.iterate!==void 0&&E.iterate(d[v].data)}for(let v=0;v<f.length;++v){let E=f[v];E.commit!==void 0&&E.commit(d[v].data)}let b=!0;for(let v=0;b;++v){b=!1;for(let E=0;E<f.length;++E){let P=f[E];P.finalize!==void 0&&(b=P.finalize(E,g[0],g[1],g[2],g[3],g[4])||b)}}let M=g.filter(v=>v!==void 0);return e.reorderArrays!==void 0&&(M=e.reorderArrays(M)),bt(M)}function xt(e,t){let r=e.bitsPerColor,i=e.cell.w*r,s=e.cell.h*i,c=Math.ceil(s/8),u=0;return be(ge({},t),{prepare(){return u=e.block.columns*c,{data:new Uint8Array(e.width*e.height*r/8)}},xyToBitInfo(d,g){let b=Math.floor(d/e.block.w),M=Math.floor(d/e.cell.w),v=Math.floor(g/e.cell.h),E=Math.floor(g/e.block.h)*e.block.columns+b,P=c*M,Q=u*v,F=Math.floor(d%e.cell.w*r/8),H=Math.floor(g%e.cell.h*i/8),G=e.cell.msbToLsb?i-(d%e.cell.w+1)*r:d%e.cell.w*r;return{offset:Q+P+H+F,bitShift:G,bitCount:r,paramOffset:E}}})}function er(e,t){let r=e.fliMode,i=e.bitsPerColor,s=0;return be(ge({},t),{prepare(){let u=e.cell.columns*e.cell.rows;return s=1<<Math.ceil(Math.log2(u)),{data:new Uint8Array(r?s*e.cell.h:e.cell.columns*e.cell.rows)}},paramToBitInfo(u){let f=0;return r?f=(Math.floor(u/e.cell.columns)&e.cell.h-1)*s+Math.floor(u/(i*e.width))*e.cell.columns+u%e.cell.columns:f=u,{offset:f,bitShift:0,bitCount:8,paramOffset:u}}})}function ro(e,t){return be(ge({},t),{prepare(){return{data:new Uint8Array(e.cb.columns*e.cb.rows)}},paramToBitInfo(i){return{offset:i,bitShift:0,bitCount:8,paramOffset:i}}})}function ao(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:xt(r,{globalColorsBitPattern:[{paletteIndex:r.backgroundColor&15,bitPattern:0}],colorsBitPattern:[2,1,3]}),colorParamMapper:er(r,{paramToBitPattern(i,s){let c=Qe(i,2,r);return c[0]|c[1]<<4}}),colorBlockParamMapper:ro(r,{paramToBitPattern(i,s){return Qe(i,1,r)[0]}}),extraParamMapper:{data(){let i=new Uint8Array(2);return i[0]=r.backgroundColor&15|(r.auxColor&15)<<4,i[1]=r.borderColor&15,i}}})}function io(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:xt(r,{colorsBitPattern:[1,0]}),colorParamMapper:er(r,{paramToBitPattern(i,s){let c=Qe(i,2,r);return c[0]<<4|c[1]}}),extraParamMapper:{data(){let i=new Uint8Array(2);return i[0]=r.backgroundColor&15|(r.auxColor&15)<<4,i[1]=r.borderColor&15,i}}})}function no(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:xt(r,{globalColorsBitPattern:[{paletteIndex:r.backgroundColor,bitPattern:0}],colorsBitPattern:[1]}),colorParamMapper:er(r,{paramToBitPattern(i,s){return Qe(i,1,r)[0]}}),extraParamMapper:{data(){let i=new Uint8Array(3);return i[0]=r.backgroundColor,i[1]=r.borderColor,i[2]=r.auxColor,i}}})}function oo(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:xt(r,{globalColorsBitPattern:[{paletteIndex:r.backgroundColor,bitPattern:0},{paletteIndex:r.borderColor,bitPattern:1},{paletteIndex:r.auxColor,bitPattern:3}],colorsBitPattern:[2]}),colorParamMapper:er(r,{paramToBitPattern(i,s){return Qe(i,1,r)[0]}}),extraParamMapper:{data(){let i=new Uint8Array(3);return i[0]=r.backgroundColor,i[1]=r.borderColor,i[2]=r.auxColor,i}}})}function so(e,t){let r=e.bitsPerColor,i=e.cell.w*r;return be(ge({},t),{prepare(){return{data:new Uint8Array(e.width*e.height*e.bitsPerColor/8)}},xyToBitInfo(c,u){let f=Math.floor(c/e.block.w),d=Math.floor(u/e.block.h)*e.block.columns+f,g=Math.floor(c/e.block.w),b=(u&192)>>6<<11|(u&7)>>0<<8|(u&56)>>3<<5|(g&31)>>0<<0,M=e.cell.msbToLsb?i-(c%e.cell.w+1)*r:c%e.cell.w*r;return{offset:b,bitShift:M,bitCount:r,paramOffset:d}}})}function lo(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:so(r,{colorsBitPattern:[0,1]}),colorParamMapper:er(r,{paramToBitPattern(i,s){let c=Qe(i,2,r);return(c[0]&7)<<3|c[1]&7|(c[0]&8)>>3<<6}})})}function Ii(e,t){return be(ge({},t),{prepare(){let i=20,s=12;return{data:new Uint8Array(i*s*2),littleEndian:!0}},prefill(i){let s=7,c=0,u=0,f=0,d=s|(c&3)<<9|(c&4)>>2<<13|(c&8)>>3<<12|u<<3<<(f<<11),g=d&255,b=(d&65280)>>8;for(let E=0;E<i.length;++E)E%2==0?i[E]=g:i[E]=b;let M=360,v=[45,65,68,69,0,66,89,0,36,73,84,72,69,82,84,83,79,78];for(let E=0;E<v.length;++E){let P=s|(c&3)<<9|(c&4)>>2<<13|(c&8)>>3<<12|v[E]<<3<<(f<<11),Q=P&255,F=(P&65280)>>8;i[M+E*2]=Q,i[M+E*2+1]=F}},paramToBitInfo(i){let s=Math.floor(i/Math.floor(e.width/e.block.w)),c=i%Math.floor(e.width/e.block.w);return{offset:(s*20+c)*2,bitShift:0,bitCount:16,paramOffset:i}}})}function co(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:xt(r,{colorsBitPattern:[0,1]}),colorParamMapper:Ii(r,{paramToBitPattern(i,s){let c=Qe(i,2,r),u=c[0],f=c[1],d=1,g=s.paramOffset&63;return u|(f&3)<<9|(f&4)>>2<<13|(f&8)>>3<<12|g<<3<<(d<<11)}})})}function ho(e,t){return be(ge({},t),{prepare(){let s=8,c=8;return{data:new Uint8Array(s*c*8),littleEndian:!0}},finalize(s,c,u,f,d,g){for(let b=0;b<e.cellParams.length;++b){let M=Fr(b,e.cellParams,2,255,8);if(M[0]==0)continue;let v=M[1]*8,E=b%e.cell.columns,Q=Math.floor(b/e.cell.columns)*e.cell.columns*8+E*8;for(let F=0;F<8;++F)d[v+F]=c[Q+F]}return!1}})}function uo(e,t){let r=e.content,i=[0,1],s=xt(r,{paramToBitPattern(c,u,f){let d=Qe(c,r.paletteChoices.colors,r);for(let b=0;b<r.paletteChoices.colors;++b)if(d[b]==u)return i[1+b];let g=ya(f.paramOffset,r.cbParams,1,r)[0];return g==u?i[0]:(console.log("cb nor param color does not contain color from image",c,u,d,f,g),ye(!1),0)}});return Ue({message:e,content:r,cellMapper:s,colorParamMapper:Ii(r,{paramToBitPattern(c,u){let f=Qe(c,2,r),d=f[0],g=f[1],b=r.block.size=512,M=(d&8)!=0,v=r.paramInfo.cell?Fr(u.paramOffset,r.cellParams,2,255,8):[b?1:0,b?u.paramOffset&63:0],E=v[0]!=0;ye(!M||M&&E);let P=E?1:0,Q=E?v[1]&63:u.paramOffset&255;return d&7|(d&8)>>3<<12|(g&1)<<13|Q<<3<<(P<<11)}}),cellParamMapper:r.paramInfo.cell?ho(r):void 0,extraParamMapper:{data(){let c=new Uint8Array(r.paramInfo.extra);for(let u=0;u<r.paramInfo.extra;++u)c[u]=ya(u,r.extraParams,1,r)[0];return c}}})}function fo(e,t){return be(ge({},t),{prepare(){return{data:new Uint8Array(e.block.size)}},paramToBitInfo(i){let s=i&31,c=i>>5;return{offset:c&7|s<<3|c>>3<<8,bitShift:0,bitCount:8,paramOffset:i}}})}function mo(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:xt(r,{colorsBitPattern:[0,1]}),colorParamMapper:fo(r,{paramToBitPattern(i,s){let c=Qe(i,2,r);return c[0]=c[0]==0?1:c[0],c[1]=c[1]==0?1:c[1],c[0]|c[1]<<4}})})}function po(e,t,r,i,s,c,u){let f=s*u.block.w,d=Math.floor(f*u.block.h*e+f*i)/8,g=u.cell.msbToLsb?(u.block.w-(r+1))*s:r*s,b=Math.floor(g/8);return b=c?b:Math.floor(f/8)-b-1,g=g%8,ye((d+b)*8<t*f*u.block.h),{offset:d+b,bitShift:g,bitCount:s}}function Ao(e,t,r,i,s,c,u){let f=s*u.block.w,d=(i&1)!=0,g=Math.floor(((f*u.block.h*(e>>1)<<1)+f*i*(d?1:0))/8),b=u.cell.msbToLsb?(u.block.w-(r+1))*s:r*s,M=Math.floor(b/8);return M=c?M:Math.floor(f/8)-M-1,b=b%8,ye((g+M)*8<t*f*u.block.h),{offset:g+M,bitShift:b,bitCount:s}}function go(e,t,r,i,s,c,u){let f=s*u.block.w,d=Math.floor(f*t*i+f*e)/8,g=u.cell.msbToLsb?(u.block.w-(r+1))*s:r*s,b=Math.floor(g/8);return b=c?b:Math.floor(f/8)-b-1,g=g%8,ye((d+b)*8<t*f*u.block.h),{offset:d+b,bitShift:g,bitCount:s}}var Ea={Default:po,interleaved:Ao,linear:go},Ba={Default:bo,bbgggrrr:xo};function bo(e,t){return e}function xo(e,t){let r=t[e],i=r&255,s=r>>8&255;return(r>>16&255&192)>>6<<6|(s&224)>>5<<3|(i&224)>>5<<0}function wi(e,t,r,i){let s=e.indexed,c=0,u=0,f=0,d=0,g=32,b=32;return be(ge({},i),{prepare(){return c=r.customize===void 0?Math.ceil(Math.log2(t.block.colors)):"planes"in r.customize?r.customize.planes:Math.ceil(Math.log2(t.block.colors)),u=t.block.w*t.block.h,f=t.block.columns*t.block.rows,d=r.customize===void 0?1:"bitsInPlane"in r.customize?r.customize.bitsInPlane:1,{data:new Uint8Array(Math.floor(c*d*u*f/8))}},iterate(v){let E=Math.floor(t.block.columns/g),P=Math.floor(t.block.rows/b),Q=Math.floor(c*d*u*g*b/8),F=Math.floor(c*d*u/8),H=F*g,G=r.customize===void 0?Ea.Default:"planeToMemory"in r.customize?Ea[r.customize.planeToMemory]:Ea.Default,U=r.customize===void 0?Ba.Default:"transformColor"in r.customize?Ba[r.customize.transformColor]:Ba.Default,J=(1<<d)-1,re=r.customize===void 0?!0:"planeLittleEndian"in r.customize?r.customize.littleEndian:!0,O=t.block.msbToLsb?(X,W)=>{let Y=(c-(X+1))*d,q=W&J<<Y;return{extractedBits:q>>Y,filteredColor:W^q}}:(X,W)=>{let Y=X*d,q=W&J<<Y;return{extractedBits:q,filteredColor:W^q}};for(let X=0;X<s.length;++X){let W=Math.floor(X/t.block.w)%t.block.columns,Y=Math.floor(X/(t.width*t.block.h)),q=Math.floor(W/g),se=(Math.floor(Y/b)*E+q)*Q,me=W%g,Be=Y%b,ke=U(s[X],r.pal),Ye=X%t.block.w,le=Math.floor(X/t.width)%t.block.h,st=H*Be+F*me;for(let Ve=0;Ve<c;++Ve){let{extractedBits:ze,filteredColor:Ae}=O(Ve,ke),De=G(Ve,c,Ye,le,d,re,t);ke=Ae;let je=se+st+De.offset;Rt(v,je,ze,De.bitShift,De.bitCount,re)}}}})}function yi(e,t,r,i){let s=0,c=32,u=32,f=r.customize===void 0?!0:"outputTileset"in r.customize?r.customize.littleEndian:!0,d=r.customize===void 0?!0:"outputPalette"in r.customize?r.customize.littleEndian:!0;return!f&&!d?void 0:be(ge({},i),{prepare(){return s=t.block.columns*t.block.rows,{data:new Uint8Array(2*s*(f?1:0)+(d?t.block.colors:0))}},iterate(b){let M=r.customize===void 0?!1:"tilesetLittleEndian"in r.customize?r.customize.littleEndian:!1;if(f){let v=Math.floor(t.block.columns/c),E=Math.floor(t.block.rows/u),P=Math.floor(c*u*2);for(let Q=0;Q<t.block.rows;++Q)for(let F=0;F<t.block.columns;++F){let H=Math.floor(F/c),J=(Math.floor(Q/u)*v+H)*P,re=F%c,O=Q%u,X=(O*t.block.columns+re)*2,W=J+X,Y=St(t.blockParams[Q*F+F],1,3,2),q=0,Z=0,ae=Y[0]&7,se=O*c+re&1023,me=q<<15|Z<<14|ae<<10|se;Rt(b,W,me,0,16,M)}}if(d){let v=f?0:Math.floor(2*s/8);for(let E=0;E<t.block.colors;++E){let P=e.pal[E],Q=P&255,F=P>>8&255,H=P>>16&255,G=Q>>3&31|(F>>3&31)<<5|(H>>3&31)<<10;Rt(b,v+E*2,G,0,16,M)}}}})}function Co(e,t){let r=e.content;return Ue({message:e,content:r,cellMapper:wi(e,r,t,{}),colorParamMapper:yi(e,r,t,{})})}function Ei(e,t,r){let i=t.block.columns,s=i*t.block.rows,c=t.block.h*r,u=new Uint8Array(s*c);for(let f=0;f<t.height;++f)for(let d=0;d<t.width;++d){let g=Math.floor(d/t.block.w),M=Math.floor(f/t.block.h)*i+g,v=d%t.block.w,E=f%t.block.h,P=M*c+E*r,Q=t.cell.msbToLsb?t.block.w-v-1:v,F=e.indexed[f*t.width+d];for(let H=0;H<r;++H)u[P+H]|=(F>>H&1)<<Q}return u}function Bi(e,t){return Ei(e,t,2)}function vo(e,t){let r=e.content,s=r.block.columns*r.block.rows,c=Bi(e,r),u=new Uint8Array(s);for(let f=0;f<s;++f)u[f]=f&255;return bt([c,u])}function _i(e){var c,u,f;let t=e.block.columns*e.block.rows,r=(c=e.paletteIndexBits)!=null?c:Math.max(1,Math.ceil(Math.log2(e.palettesCount||1))),i=(u=e.paletteIndexFilter)!=null?u:(1<<r)-1,s=new Uint8Array(t);for(let d=0;d<t;++d){let g=(f=St(e.blockParams[d],1,i,r)[0])!=null?f:0;s[d]=g&255}return s}function Lr(e,t,r){var d,g,b,M,v;let i=(d=t.palettesCount)!=null?d:0,s=(g=t.paletteColors)!=null?g:0,c=(M=(b=r.customize)==null?void 0:b.subPalettePaletteFormat)!=null?M:"rgb555",u=c==="rgb222"?1:2,f=new Uint8Array(i*s*u);for(let E=0;E<i;++E)for(let P=0;P<s;++P){let Q=(v=e.pal[E*s+P])!=null?v:0,F=Q&255,H=Q>>8&255,G=Q>>16&255,U;c==="rgb444"?U=F>>4&15|(H>>4&15)<<4|(G>>4&15)<<8:c==="rgb222"?U=F>>6&3|(H>>6&3)<<2|(G>>6&3)<<4:c==="genesis"?U=(F>>5&7)<<1|(H>>5&7)<<5|(G>>5&7)<<9:U=F>>3&31|(H>>3&31)<<5|(G>>3&31)<<10;let J=(E*s+P)*u,re=c==="genesis";f[J+(re?u-1:0)]=U&255,u>1&&(f[J+(re?0:1)]=U>>8&255)}return f}function Io(e,t){let r=e.content;return bt([Bi(e,r),_i(r),Lr(e,r,t)])}function _a(e,t,r=!1){let i=e.block.columns*e.block.rows,s=_i(e),c=new Uint8Array(i*2);for(let u=0;u<i;++u){let f=u|s[u]<<t;c[u*2+(r?1:0)]=f&255,c[u*2+(r?0:1)]=f>>8&255}return c}function Mi(e,t){let r=e.content;return ye(r.block.columns*r.block.rows<=512),bt([Ei(e,r,4),_a(r,11),Lr(e,r,t)])}var wo=Mi;function yo(e,t){let r=e.content,i=r.block.columns,s=i*r.block.rows;ye(s<=512);let c=new Uint8Array(s*16);for(let u=0;u<r.height;++u)for(let f=0;f<r.width;++f){let d=Math.floor(u/r.block.h)*i+Math.floor(f/r.block.w),g=f%r.block.w,b=d*16+u%r.block.h*2,M=(e.indexed[u*r.width+f]&3)<<(r.block.w-1-g)*2;c[b]|=M&255,c[b+1]|=M>>8&255}return bt([c,_a(r,9),Lr(e,r,t)])}function Eo(e,t){let r=e.content,i=r.block.columns,s=i*r.block.rows;ye(s<=2048);let c=new Uint8Array(s*32);for(let u=0;u<r.height;++u)for(let f=0;f<r.width;++f){let d=Math.floor(u/r.block.h)*i+Math.floor(f/r.block.w),g=f%r.block.w,b=d*32+u%r.block.h*4+(g>>1),M=e.indexed[u*r.width+f]&15;c[b]|=g&1?M:M<<4}return bt([c,_a(r,13,!0),Lr(e,r,t)])}function Di(e,t,r,i){var u;let s=e.width/8,c=new Uint8Array(t*2+r*s*e.height);for(let f=0;f<t;++f){let d=(u=e.pal[f])!=null?u:0,g=(d&255)>>4<<8|(d>>8&255)>>4<<4|(d>>16&255)>>4;c[f*2]=g>>8,c[f*2+1]=g&255}for(let f=0;f<e.height;++f)for(let d=0;d<e.width;++d){let g=i(e.indexed[f*e.width+d]);for(let b=0;b<r;++b){let M=t*2+b*s*e.height+f*s+(d>>3);c[M]|=(g>>b&1)<<7-(d&7)}}return c}function Bo(e,t){return Di(e,32,5,r=>r)}function _o(e,t){let r=[0,2,3,1];return Di(e,16,6,i=>r[i>>4]<<4|i&15)}function Mo(e,t){for(var r=0,i=e.width/8,s=e.height/8,c=new Uint8Array(e.width*e.height*2/8),u=0;u<e.height;u++)for(var f=0;f<e.width;f++){var d=Math.floor(f/8)+Math.floor(u/8)*i,g=d*16+(u&7),b=7-(f&7),M=e.indexed[r]&255;c[g]|=(M&1)<<b,c[g+8]|=(M>>1&1)<<b,r++}return c}function Do(e,t){if(!t.block)throw"No block size";var r=vi(e,t),i={w:t.block.w,h:t.block.h,bpp:2},s=new Uint8Array(Ci([e.indexed],i));return bt([r,s])}function So(e,t){var r=new Uint8Array(6*e.height);let i=[3,2,1,0,-1,-1,-1,-1,4,5,6,7,8,9,10,11,19,18,17,16,15,14,13,12,23,22,21,20,-1,-1,-1,-1,24,25,26,27,28,29,30,31,39,38,37,36,35,34,33,32];for(var s=0;s<e.height;s++)for(var c=0;c<48;c++){var u=i[c];if(u>=0&&(u+=s*e.width,e.indexed[u])){var f=(c>>3)*e.height+e.height-s-1;r[f]|=128>>(c&7)}}return r}function Ro(e,t){var r=new Uint8Array(e.width*e.height/4);let i=0,s=0;for(var c=0;c<e.height;c++)for(var u=0;u<e.width;u+=4,s+=4)r[i++]=((e.indexed[s+0]&3)<<6)+((e.indexed[s+1]&3)<<4)+((e.indexed[s+2]&3)<<2)+((e.indexed[s+3]&3)<<0);return console.log(r),r}var ka={};ri(ka,{getFileViewerCode_apple2_hires:()=>Yo,getFileViewerCode_astrocade:()=>qo,getFileViewerCode_atari8_d:()=>Oi,getFileViewerCode_atari8_e:()=>Ko,getFileViewerCode_atari8_f_10:()=>Zo,getFileViewerCode_c64_fli:()=>it,getFileViewerCode_c64_hires:()=>Wo,getFileViewerCode_c64_hires_fli:()=>ns,getFileViewerCode_c64_hires_fli_blank:()=>ss,getFileViewerCode_c64_hires_fli_bug:()=>os,getFileViewerCode_c64_multi:()=>Xo,getFileViewerCode_c64_multi_fli:()=>ls,getFileViewerCode_c64_multi_fli_blank:()=>hs,getFileViewerCode_c64_multi_fli_blank_left:()=>us,getFileViewerCode_c64_multi_fli_bug:()=>cs,getFileViewerCode_cpc:()=>Ta,getFileViewerCode_cpc_mode0:()=>as,getFileViewerCode_cpc_mode1:()=>is,getFileViewerCode_gb_color_tiles:()=>ps,getFileViewerCode_gb_tiles:()=>ms,getFileViewerCode_msx:()=>zo,getFileViewerCode_nes:()=>Vo,getFileViewerCode_sms_gg_tiles:()=>ds,getFileViewerCode_sms_tiles:()=>fs,getFileViewerCode_vcs:()=>jo,getFileViewerCode_zx:()=>tr,getFileViewerCode_zx_bright:()=>es,getFileViewerCode_zx_bright_dark:()=>rs,getFileViewerCode_zx_dark:()=>Jo,getFileViewerCode_zx_dark_bright:()=>ts});var Da=`
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
`;var Si=`
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
`;var Ri=`
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
`;var Pi=`
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
`;var Ti=`
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
`;var ki=`
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
`;var Sa=`
    processor 6502    
    include "atari.inc"

ANTICMODE equ $d
DUALBUFFER equ 0
GPIOMODE equ 0

    org     $a000           ;Start of left cartridge area
Start:
 if GPIOMODE
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
    .byte (ANTICMODE | $40),#<ImgData1,#>ImgData1
    REPEAT 95
    .byte ANTICMODE
    REPEND
    if DUALBUFFER
    .byte (ANTICMODE | $40),#<ImgData2,#>ImgData2
    REPEAT 95
    .byte ANTICMODE
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
`;var Fi=`
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
`;var Qi=`
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
`;var Li=`
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
`;var Ra=`
; Master System / Game Gear tile viewer (shared by both systems).
; Data file layout: [tiles: 32 bytes each] [name table: 2 bytes each] [CRAM]

IMG_COLS    = $IMG_COLS       ; image size in tiles
IMG_ROWS    = $IMG_ROWS
IMG_COL0    = $IMG_COL0       ; first map column/row used on screen
IMG_ROW0    = $IMG_ROW0
CRAM_BYTES  = $CRAM_BYTES     ; 32 (SMS, 1 byte/color) or 64 (GG, 2 bytes/color)
TILES       = IMG_COLS*IMG_ROWS

VDPDATA     = 0x0be
VDPCTRL     = 0x0bf
NAMETABLE   = 0x3800
SPRITETABLE = 0x3f00
BLANKTILE   = 0x1ff            ; unused tile (VRAM is cleared) for the margins

    .area _ROM (ABS)
    .org 0x0000
    di
    im 1
    ld sp,#0x0dff0
    jp Start

    .org 0x66
    retn                        ; NMI (Game Gear start button)

Start:
    ld hl,#VdpRegs
    ld b,#(VdpRegsEnd-VdpRegs)
    ld c,#VDPCTRL
    otir                        ; set up VDP registers, display still off

    ; clear all 16K of VRAM
    ld de,#0x4000
    call SetAddr
    ld bc,#0x4000
ClearLoop:
    xor a
    out (VDPDATA),a
    dec bc
    ld a,b
    or c
    jr nz,ClearLoop

    ; hide all sprites
    ld de,#(0x4000+SPRITETABLE)
    call SetAddr
    ld a,#0x0d0
    out (VDPDATA),a

    ; fill name table with the blank tile
    ld de,#(0x4000+NAMETABLE)
    call SetAddr
    ld bc,#(32*28)
FillLoop:
    ld a,#(BLANKTILE & 0x0ff)
    out (VDPDATA),a
    ld a,#(BLANKTILE >> 8)
    out (VDPDATA),a
    dec bc
    ld a,b
    or c
    jr nz,FillLoop

    ; tile patterns at VRAM $0000
    ld hl,#ImageData
    ld de,#0x4000
    call SetAddr
    ld bc,#(TILES*32)
    call CopyVram

    ; name table: one row of the image at a time (32 entries per map row)
    ld de,#(0x4000+NAMETABLE+IMG_ROW0*64+IMG_COL0*2)
    ld b,#IMG_ROWS
RowLoop:
    push bc
    push de
    call SetAddr
    ld bc,#(IMG_COLS*2)
    call CopyVram
    pop de
    push hl
    ld hl,#64
    add hl,de
    ex de,hl
    pop hl
    pop bc
    djnz RowLoop

    ; palette (HL now points at the CRAM data)
    ld de,#0x0c000
    call SetAddr
    ld bc,#CRAM_BYTES
    call CopyVram

    ; display on
    ld a,#0x0c0
    out (VDPCTRL),a
    ld a,#0x81
    out (VDPCTRL),a
Forever:
    jr Forever

; DE = VDP address with command bits
SetAddr:
    ld a,e
    out (VDPCTRL),a
    ld a,d
    out (VDPCTRL),a
    ret

; copy BC bytes from (HL) to the VDP
CopyVram:
    ld a,(hl)
    out (VDPDATA),a
    inc hl
    dec bc
    ld a,b
    or c
    jr nz,CopyVram
    ret

VdpRegs:
    .db 0x04,0x80                  ; mode 4
    .db 0x80,0x81                  ; display off for now
    .db 0x0ff,0x82                 ; name table at $3800
    .db 0x0ff,0x85                 ; sprite table at $3f00
    .db 0x0ff,0x86                 ; sprite tiles at $2000
    .db 0x00,0x87                  ; backdrop = palette entry 0
    .db 0x00,0x88                  ; scroll X
    .db 0x00,0x89                  ; scroll Y
    .db 0x0ff,0x8a                 ; no line interrupts
VdpRegsEnd:

ImageData:
    .incbin "$DATAFILE"

; ROM header (data must end below $7ff0; 32KB ROM)
    .org 0x7ff0
    .ascii "TMR SEGA"
    .dw 0,0                      ; checksum (unchecked by emulators)
    .db 0,0,0                    ; product code, version
    .db $REGION                  ; region (high nibble) and ROM size (low nibble)
`;var Pa=`
; Game Boy / Game Boy Color tile viewer (shared by both systems), SDAS syntax.
; Data file layout: [tiles: 16 bytes each] and for CGB also
; [BG attributes: 1 byte per tile] [BG palette RAM: 64 bytes]

CGB         = $CGB              ; 1 = Game Boy Color
IMG_COLS    = $IMG_COLS         ; image size in tiles
IMG_ROWS    = $IMG_ROWS
IMG_COL0    = $IMG_COL0         ; first map column/row used on screen
IMG_ROW0    = $IMG_ROW0
TILES       = IMG_COLS*IMG_ROWS

rLCDC       = 0xff40
rLY         = 0xff44
rBGP        = 0xff47
rVBK        = 0xff4f
rBCPS       = 0xff68
rBCPD       = 0xff69

    .area _ROM (ABS)
    .org 0x100
    nop
    jp Start

; cartridge header
    .org 0x104
    .db 0xce,0xed,0x66,0x66,0xcc,0x0d,0x00,0x0b,0x03,0x73,0x00,0x83,0x00,0x0c,0x00,0x0d
    .db 0x00,0x08,0x11,0x1f,0x88,0x89,0x00,0x0e,0xdc,0xcc,0x6e,0xe6,0xdd,0xdd,0xd9,0x99
    .db 0xbb,0xbb,0x67,0x63,0x6e,0x0e,0xec,0xcc,0xdd,0xdc,0x99,0x9f,0xbb,0xb9,0x33,0x3e
    .ds 15                      ; title
    .db CGB*0x80                ; CGB flag (0x80 = works on DMG and CGB)
    .ds 9                       ; licensee, SGB, cart type, sizes, destination, version
    .db (-(CGB*0x80)-25)&0xff   ; header checksum
    .ds 2                       ; global checksum (unchecked)

    .org 0x150
Start:
    di
    ld sp,#0xfffe
vblank:
    ldh a,(rLY)
    cp #144
    jr c,vblank
    xor a
    ldh (rLCDC),a               ; LCD off so VRAM is writable

    ld a,#0b00011011
    ldh (rBGP),a                ; DMG shade order

    ; tile patterns at $8000 (unsigned indices 0..255)
    ld hl,#0x8000
    ld de,#ImageData
    ld bc,#(TILES*16)
copytiles:
    ld a,(de)
    inc de
    ld (hl+),a
    dec bc
    ld a,b
    or c
    jr nz,copytiles

    ; BG map: identity tile indices, one image row per 32-entry map row
    ld hl,#(0x9800+IMG_ROW0*32+IMG_COL0)
    ld c,#0
    ld d,#IMG_ROWS
maprow:
    ld b,#IMG_COLS
mapcol:
    ld a,c
    ld (hl+),a
    inc c
    dec b
    jr nz,mapcol
    ld a,l
    add a,#(32-IMG_COLS)
    ld l,a
    jr nc,mapnc
    inc h
mapnc:
    dec d
    jr nz,maprow

.if CGB
    ; BG attributes (palette number per tile) in VRAM bank 1, same map layout
    ld a,#1
    ldh (rVBK),a
    ld hl,#(0x9800+IMG_ROW0*32+IMG_COL0)
    ld de,#(ImageData+TILES*16)
    ld c,#IMG_ROWS
attrrow:
    ld b,#IMG_COLS
attrcol:
    ld a,(de)
    inc de
    ld (hl+),a
    dec b
    jr nz,attrcol
    ld a,l
    add a,#(32-IMG_COLS)
    ld l,a
    jr nc,attrnc
    inc h
attrnc:
    dec c
    jr nz,attrrow
    xor a
    ldh (rVBK),a

    ; 8 BG palettes x 4 colors x RGB555 (de points at the palette data)
    ld a,#0x80                  ; index 0, auto-increment
    ldh (rBCPS),a
    ld b,#64
palloop:
    ld a,(de)
    inc de
    ldh (rBCPD),a
    dec b
    jr nz,palloop
.endif

    ld a,#0b10010001            ; LCD on, BG on, tiles $8000, map $9800
    ldh (rLCDC),a
forever:
    halt
    nop
    jr forever

ImageData:
    .incbin "$DATAFILE"
`;function Xo(){var e=Da;return e=e.replace("$USE_MULTI_MODE","1"),e}function Wo(){var e=Da;return e=e.replace("$USE_MULTI_MODE","0"),e}function Yo(){return Si}function Vo(){var e=Ri,t=gt(j.lastPixels.pal,j.settings.pal);return e=e.replace("hex 1f;screen color","hex "+xe(t[0])),e=e.replace("hex 01112100;background 0","hex "+xe(t[1])+xe(t[2])+xe(t[3])+xe(0)),e}function zo(){return Pi}function jo(){var e=Ti,t=gt(j.lastPixels.pal,j.settings.pal);return e=e.replace("#$F6","#$"+xe(t[0])),e=e.replace("#$F7","#$"+xe(t[1])),e}function qo(){var e=ki,t=gt(j.lastPixels.pal,j.settings.pal);return e=e.replace("$b0","$"+xe(t[0])),e=e.replace("$b1","$"+xe(t[1])),e=e.replace("$b2","$"+xe(t[2])),e=e.replace("$b3","$"+xe(t[3])),e}function Oi(){for(var e=Sa,t=gt(j.lastPixels.pal,j.settings.pal),r=0;r<t.length;r++)e=e.replace("$00;PF"+r,"$"+xe(t[r]));return e}function Ko(){for(var e=Sa,t=gt(j.lastPixels.pal,j.settings.pal),r=0;r<t.length;r++)e=e.replace("$00;PF"+r,"$"+xe(t[r]));return e=e.replace("ANTICMODE equ $d","ANTICMODE equ $e"),e=e.replace("DUALBUFFER equ 0","DUALBUFFER equ 1"),e}function Zo(){let e=Oi();return e=e.replace(".byte $4d",".byte $4f"),e=e.replace(".byte $0d",".byte $0f"),e=e.replace("#$00;PRIOR","#$80"),e=e.replace("COLOR0+4","PCOLR0+0"),e=e.replace("COLOR0+0","PCOLR0+1"),e=e.replace("COLOR0+1","PCOLR0+2"),e=e.replace("COLOR0+2","PCOLR0+3"),e=e.replace("ANTICMODE equ $d","ANTICMODE equ $f"),e=e.replace("DUALBUFFER equ 0","DUALBUFFER equ 1"),e=e.replace("GPIOMODE equ 0","GPIOMODE equ 1"),e}function tr(){var e=Fi;return e}function Jo(){return tr()}function es(){return tr()}function ts(){return tr()}function rs(){return tr()}function Ta(e){var t=Qi,r=gt(j.lastPixels.pal,j.settings.pal);t=t.replace("$MODE",e+"");for(var i=0;i<16;i++)t=t.replace("$c"+i,"$"+xe(r[i]||0));return t}function as(e){return Ta(0)}function is(e){return Ta(1)}function it(){var e=Li;return e}function ns(){let e=it();return e=e.replace("$USE_MULTI_MODE","0"),e}function os(){let e=it();return e=e.replace("$USE_MULTI_MODE","0"),e}function ss(){let e=it();return e=e.replace("$USE_MULTI_MODE","0"),e}function ls(){let e=it();return e=e.replace("$USE_MULTI_MODE","1"),e}function cs(){let e=it();return e=e.replace("$USE_MULTI_MODE","1"),e}function hs(){let e=it();return e=e.replace("$USE_MULTI_MODE","1"),e}function us(){let e=it();return e=e.replace("$USE_MULTI_MODE","1"),e}function Or(e,t){for(let r in t)e=e.split("$"+r).join(String(t[r]));return e}function Gr(e,t,r,i){let s=j.settings.width>>3,c=j.settings.height>>3;return{IMG_COLS:s,IMG_ROWS:c,IMG_COL0:r+(e-s>>1),IMG_ROW0:i+(t-c>>1)}}function fs(){return Or(Ra,be(ge({},Gr(32,24,0,0)),{CRAM_BYTES:32,REGION:"0x4c"}))}function ds(){return Or(Ra,be(ge({},Gr(20,18,6,3)),{CRAM_BYTES:64,REGION:"0x6c"}))}function ms(){return Or(Pa,be(ge({},Gr(20,18,0,0)),{CGB:0}))}function ps(){return Or(Pa,be(ge({},Gr(20,18,0,0)),{CGB:1}))}var Gi=[[1,0,.4375],[-1,1,.1875],[0,1,.3125],[1,1,.0625]],Ui=[[1,0,3/8],[0,1,3/8],[1,1,2/8]],Ni=[[1,0,1/6],[2,0,1/6],[-1,1,1/6],[0,1,1/6],[1,1,1/6],[0,2,1/6]],Hi=[[1,0,4/16],[2,0,3/16],[-2,1,1/16],[-1,1,2/16],[0,1,3/16],[1,1,2/16],[2,1,1/16]],$i=[[1,0,2/4],[-1,1,1/4],[0,1,1/4]],Xi=[[1,0,8/42],[2,0,4/42],[-2,1,2/42],[1,-1,4/42],[0,1,8/42],[1,1,4/42],[2,1,2/42],[-2,2,1/42],[-1,2,2/42],[0,2,4/42],[1,2,2/42],[2,2,1/42]],Wi=[[1,0,.5],[0,1,.5]],Yi=[[1,0,1]],Vi=[[0,1,1]],zi=[[0,1,2/4],[0,2,1/4],[1,2,1/4]],ji=[[1,1,1]],qi=[[0,1,6/16],[-1,1,3/16],[1,1,3/16],[-2,2,1/16],[0,2,2/16],[2,2,1/16]];var En=da(Ki());var gs="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function Zi(e){let t=e.replace(/[\r\n=]/g,""),r=t.length,i=new Uint8Array(r*3>>2),s=0,c=0;for(let f=0;f<r;f++)f%4===0&&f&&(i[c++]=s>>16&255,i[c++]=s>>8&255,i[c++]=s&255),s=s<<6|gs.indexOf(t.charAt(f));let u=r%4*6;return u===0?(i[c++]=s>>16&255,i[c++]=s>>8&255,i[c++]=s&255):u===18?(i[c++]=s>>10&255,i[c++]=s>>2&255):u===12&&(i[c++]=s>>4&255),i}var Ct;function bs(){if(typeof Ct!="undefined"||(Ct=!1,typeof WebAssembly=="undefined"))return Ct;try{let e=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),t=new WebAssembly.Module(e);return new WebAssembly.Instance(t,{}).exports.test(4)!==0&&(Ct=!0),Ct}catch(e){}return Ct}var xs={js:!0,wasm:!0},Cs=class{constructor(e){let t=Object.assign({},xs,e||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1,!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}has_wasm(){return bs()}use(e){return this.__modules[e.name]=e,this.options.wasm&&this.has_wasm()&&e.wasm_fn?this[e.name]=e.wasm_fn:this[e.name]=e.fn,this}init(){return this.__init_promise?this.__init_promise:!this.options.js&&this.options.wasm&&!this.has_wasm()?Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`)):(this.__init_promise=Promise.all(Object.keys(this.__modules).map(e=>{let t=this.__modules[e];return!this.options.wasm||!this.has_wasm()||!t.wasm_fn||this.__wasm[e]?null:WebAssembly.compile(Zi(t.wasm_src)).then(r=>{this.__wasm[e]=r})})).then(()=>this),this.__init_promise)}__reallocate(e){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(e/65536)}),this.__memory;let t=this.__memory.buffer.byteLength;return t<e&&this.__memory.grow(Math.ceil((e-t)/65536)),this.__memory}__instance(e,t,r){if(t&&this.__reallocate(t),!this.__wasm[e]){let i=this.__modules[e];this.__wasm[e]=new WebAssembly.Module(Zi(i.wasm_src))}if(!this.__cache[e]){let i={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[e]=new WebAssembly.Instance(this.__wasm[e],{env:Object.assign(i,r||{})})}return this.__cache[e]}__align(e,t){t=t||8;let r=e%t;return e+(r?t-r:0)}};function vs(e){e<.5&&(e=.5);let t=Math.exp(.527076)/e,r=Math.exp(-t),i=Math.exp(-2*t),s=(1-r)*(1-r)/(1+2*t*r-i),c=s,u=s*(t-1)*r,f=s*(t+1)*r,d=-s*i,g=2*r,b=-i,M=(c+u)/(1-g-b),v=(f+d)/(1-g-b);return new Float32Array([c,u,f,d,g,b,M,v])}function Ji(e,t,r,i,s,c){let u,f,d,g,b,M,v,E,P,Q,F,H,G,U;for(P=0;P<c;P++){for(M=P*s,v=P,E=0,u=e[M],b=u*i[6],g=b,F=i[0],H=i[1],G=i[4],U=i[5],Q=0;Q<s;Q++)f=e[M],d=f*F+u*H+g*G+b*U,b=g,g=d,u=f,r[E]=g,E++,M++;for(M--,E--,v+=c*(s-1),u=e[M],b=u*i[7],g=b,f=u,F=i[2],H=i[3],Q=s-1;Q>=0;Q--)d=f*F+u*H+g*G+b*U,b=g,g=d,u=f,f=e[M],t[v]=r[E]+g,M--,E--,v-=c}}function Is(e,t,r,i){if(!i)return;let s=new Uint16Array(e.length),c=new Float32Array(Math.max(t,r)),u=vs(i);Ji(e,s,c,u,t,r,i),Ji(s,e,c,u,r,t,i)}function ws(e,t,r){let i=t*r,s=new Uint16Array(i),c,u,f,d;for(let g=0;g<i;g++)c=e[4*g],u=e[4*g+1],f=e[4*g+2],d=c>=u&&c>=f?c:u>=f&&u>=c?u:f,s[g]=d<<8;return s}function ys(e,t,r,i,s,c){let u,f,d,g,b;if(i===0||s<.5)return;s>2&&(s=2);let M=ws(e,t,r),v=new Uint16Array(M);Is(v,t,r,s);let E=i/100*4096+.5|0,P=c<<8,Q=t*r;for(let F=0;F<Q;F++)u=M[F],g=u-v[F],Math.abs(g)>=P&&(f=u+(E*g+2048>>12),f=f>65280?65280:f,f=f<0?0:f,u=u!==0?u:1,d=(f<<12)/u|0,b=F*4,e[b]=e[b]*d+2048>>12,e[b+1]=e[b+1]*d+2048>>12,e[b+2]=e[b+2]*d+2048>>12)}function Es(e,t,r,i,s,c){if(i===0||s<.5)return;s>2&&(s=2);let u=t*r,f=u*4,d=u*2,g=u*2,b=Math.max(t,r)*4,M=32,v=0,E=f,P=E+d,Q=P+g,F=Q+g,H=F+b,G=this.__instance("unsharp_mask",f+d+g*2+b+M,{exp:Math.exp}),U=new Uint32Array(e.buffer);new Uint32Array(this.__memory.buffer).set(U);let J=G.exports.hsv_v16||G.exports._hsv_v16;if(!J)throw new Error("WASM hsv_v16 function is not available");if(J(v,E,t,r),J=G.exports.blurMono16||G.exports._blurMono16,!J)throw new Error("WASM blurMono16 function is not available");if(J(E,P,Q,F,H,t,r,s),J=G.exports.unsharp||G.exports._unsharp,!J)throw new Error("WASM unsharp function is not available");J(v,v,E,P,t,r,i,c),U.set(new Uint32Array(this.__memory.buffer,0,u))}var Bs={name:"unsharp_mask",fn:ys,wasm_fn:Es,wasm_src:"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"},en={filter:{box:{win:.5,fn(e){return e<0&&(e=-e),e<.5?1:0}},hamming:{win:1,fn(e){if(e<0&&(e=-e),e>=1)return 0;if(e<11920929e-14)return 1;let t=e*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(e){if(e<0&&(e=-e),e>=2)return 0;if(e<11920929e-14)return 1;let t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(e){if(e<0&&(e=-e),e>=3)return 0;if(e<11920929e-14)return 1;let t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn(e){return e<0&&(e=-e),e>=2.5?0:e>=1.5?-.125*(e-2.5)*(e-2.5):e>=.5?.25*(4*e*e-11*e+7):1.0625-1.75*e*e}}}};function tn(e){return Math.round(e*16383)}function Nr(e,t,r,i,s){let c=en.filter[e].fn,u=1/i,f=Math.min(1,i),d=en.filter[e].win/f,g,b,M,v,E,P,Q,F,H,G,U,J,re,O,X,W,Y,q=Math.floor((d+1)*2),Z=new Int16Array((q+2)*r),ae=0,se=!Z.subarray||!Z.set;for(g=0;g<r;g++){for(b=(g+.5)*u+s,M=Math.max(0,Math.floor(b-d)),v=Math.min(t-1,Math.ceil(b+d)),E=v-M+1,P=new Float32Array(E),Q=new Int16Array(E),F=0,H=M,G=0;H<=v;H++,G++)U=c((H+.5-b)*f),F+=U,P[G]=U;for(J=0,G=0;G<P.length;G++)re=P[G]/F,J+=re,Q[G]=tn(re);for(Q[r>>1]+=tn(1-J),O=0;O<Q.length&&Q[O]===0;)O++;if(O<Q.length){for(X=Q.length-1;X>0&&Q[X]===0;)X--;if(W=M+O,Y=X-O+1,Z[ae++]=W,Z[ae++]=Y,!se)Z.set(Q.subarray(O,X+1),ae),ae+=Y;else for(G=O;G<=X;G++)Z[ae++]=Q[G]}else Z[ae++]=0,Z[ae++]=0}return Z}function nt(e){return e<0?0:e>255?255:e}function ot(e){return e>=0?e:0}function _s(e,t,r,i,s,c){let u,f,d,g,b,M,v,E,P,Q,F,H=0,G=0;for(P=0;P<i;P++){for(b=0,Q=0;Q<s;Q++){for(M=c[b++],v=c[b++],E=H+M*4|0,u=f=d=g=0;v>0;v--)F=c[b++],g=g+F*e[E+3]|0,d=d+F*e[E+2]|0,f=f+F*e[E+1]|0,u=u+F*e[E]|0,E=E+4|0;t[G+3]=ot(g>>7),t[G+2]=ot(d>>7),t[G+1]=ot(f>>7),t[G]=ot(u>>7),G=G+i*4|0}G=(P+1)*4|0,H=(P+1)*r*4|0}}function Ms(e,t,r,i,s,c){let u,f,d,g,b,M,v,E,P,Q,F,H=0,G=0;for(P=0;P<i;P++){for(b=0,Q=0;Q<s;Q++){for(M=c[b++],v=c[b++],E=H+M*4|0,u=f=d=g=0;v>0;v--)F=c[b++],g=g+F*e[E+3]|0,d=d+F*e[E+2]|0,f=f+F*e[E+1]|0,u=u+F*e[E]|0,E=E+4|0;u>>=7,f>>=7,d>>=7,g>>=7,t[G+3]=nt(g+8192>>14),t[G+2]=nt(d+8192>>14),t[G+1]=nt(f+8192>>14),t[G]=nt(u+8192>>14),G=G+i*4|0}G=(P+1)*4|0,H=(P+1)*r*4|0}}function Ds(e,t,r,i,s,c){let u,f,d,g,b,M,v,E,P,Q,F,H,G=0,U=0;for(Q=0;Q<i;Q++){for(M=0,F=0;F<s;F++){for(v=c[M++],E=c[M++],P=G+v*4|0,u=f=d=g=0;E>0;E--)H=c[M++],b=e[P+3],g=g+H*b|0,d=d+H*e[P+2]*b|0,f=f+H*e[P+1]*b|0,u=u+H*e[P]*b|0,P=P+4|0;d=d/255|0,f=f/255|0,u=u/255|0,t[U+3]=ot(g>>7),t[U+2]=ot(d>>7),t[U+1]=ot(f>>7),t[U]=ot(u>>7),U=U+i*4|0}U=(Q+1)*4|0,G=(Q+1)*r*4|0}}function Ss(e,t,r,i,s,c){let u,f,d,g,b,M,v,E,P,Q,F,H=0,G=0;for(P=0;P<i;P++){for(b=0,Q=0;Q<s;Q++){for(M=c[b++],v=c[b++],E=H+M*4|0,u=f=d=g=0;v>0;v--)F=c[b++],g=g+F*e[E+3]|0,d=d+F*e[E+2]|0,f=f+F*e[E+1]|0,u=u+F*e[E]|0,E=E+4|0;u>>=7,f>>=7,d>>=7,g>>=7,g=nt(g+8192>>14),g>0&&(u=u*255/g|0,f=f*255/g|0,d=d*255/g|0),t[G+3]=g,t[G+2]=nt(d+8192>>14),t[G+1]=nt(f+8192>>14),t[G]=nt(u+8192>>14),G=G+i*4|0}G=(P+1)*4|0,H=(P+1)*r*4|0}}function Rs(e,t,r){let i=3,s=t*r*4|0;for(;i<s;){if(e[i]!==255)return!0;i=i+4|0}return!1}function Ps(e,t,r){let i=3,s=t*r*4|0;for(;i<s;)e[i]=255,i=i+4|0}function Ts(e){let t=e.src,r=e.width,i=e.height,s=e.toWidth,c=e.toHeight,u=e.scaleX||e.toWidth/e.width,f=e.scaleY||e.toHeight/e.height,d=e.offsetX||0,g=e.offsetY||0,b=e.dest||new Uint8Array(s*c*4),M=typeof e.filter=="undefined"?"mks2013":e.filter,v=Nr(M,r,s,u,d),E=Nr(M,i,c,f,g),P=new Uint16Array(s*i*4);return Rs(t,r,i)?(Ds(t,P,r,i,s,v),Ss(P,b,i,s,c,E)):(_s(t,P,r,i,s,v),Ms(P,b,i,s,c,E),Ps(b,s,c)),b}function ks(e,t,r){let i=3,s=t*r*4|0;for(;i<s;){if(e[i]!==255)return!0;i=i+4|0}return!1}function Fs(e,t,r){let i=3,s=t*r*4|0;for(;i<s;)e[i]=255,i=i+4|0}function Qs(e){return new Uint8Array(e.buffer,0,e.byteLength)}var mn=!0;try{mn=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1}catch(e){}function rn(e,t,r){if(mn){t.set(Qs(e),r);return}for(let i=r,s=0;s<e.length;s++){let c=e[s];t[i++]=c&255,t[i++]=c>>8&255}}function Ls(e){let t=e.src,r=e.width,i=e.height,s=e.toWidth,c=e.toHeight,u=e.scaleX||e.toWidth/e.width,f=e.scaleY||e.toHeight/e.height,d=e.offsetX||0,g=e.offsetY||0,b=e.dest||new Uint8Array(s*c*4),M=typeof e.filter=="undefined"?"mks2013":e.filter,v=Nr(M,r,s,u,d),E=Nr(M,i,c,f,g),P=0,Q=Math.max(t.byteLength,b.byteLength),F=this.__align(P+Q),H=i*s*4*2,G=this.__align(F+H),U=this.__align(G+v.byteLength),J=U+E.byteLength,re=this.__instance("resize",J),O=new Uint8Array(this.__memory.buffer),X=new Uint32Array(this.__memory.buffer),W=new Uint32Array(t.buffer);X.set(W),rn(v,O,G),rn(E,O,U);let Y=re.exports.convolveHV||re.exports._convolveHV;if(!Y)throw new Error("WASM resize function is not available");return ks(t,r,i)?Y(G,U,F,r,i,s,c,1):(Y(G,U,F,r,i,s,c,0),Fs(b,s,c)),new Uint32Array(b.buffer).set(new Uint32Array(this.__memory.buffer,0,c*s)),b}var Os={name:"resize",fn:Ts,wasm_fn:Ls,wasm_src:"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"},Gs=class extends Cs{constructor(e){let t=e||[],r={js:t.indexOf("js")>=0,wasm:t.indexOf("wasm")>=0};super(r),this.features={js:r.js,wasm:r.wasm&&this.has_wasm()},this.use(Bs),this.use(Os)}resizeAndUnsharp(e){let t=this.resize(e);return e.unsharpAmount&&this.unsharp_mask(t,e.toWidth,e.toHeight,e.unsharpAmount,e.unsharpRadius,e.unsharpThreshold),t}};function ar(e){"@babel/helpers - typeof";return ar=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ar(e)}function Us(e,t){if(ar(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,t||"default");if(ar(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ns(e){var t=Us(e,"string");return ar(t)=="symbol"?t:t+""}function Ce(e,t,r){return(t=Ns(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function an(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,i)}return r}function Hr(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?an(Object(r),!0).forEach(function(i){Ce(e,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):an(Object(r)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(r,i))})}return e}var nn=100,Hs=class{constructor(e,t){Ce(this,"create",void 0),Ce(this,"available",void 0),Ce(this,"acquired",void 0),Ce(this,"lastId",void 0),Ce(this,"timeoutId",void 0),Ce(this,"idle",void 0),this.create=e,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=t||2e3}acquire(){let e;return this.available.length!==0?e=this.available.pop():e=Hr(Hr({},this.create()),{},{id:this.lastId++,lastUsed:0}),this.acquired[e.id]=e,{value:e.value,release:()=>this.release(e)}}release(e){delete this.acquired[e.id],e.lastUsed=Date.now(),this.available.push(e),this.timeoutId===0&&(this.timeoutId=setTimeout(()=>this.gc(),nn))}gc(){let e=Date.now();this.available=this.available.filter(t=>e-t.lastUsed>this.idle?(t.destroy(),!1):!0),this.available.length!==0?this.timeoutId=setTimeout(()=>this.gc(),nn):this.timeoutId=0}};function Oa(e){var t,r;return(t=e==null||(r=e.constructor)===null||r===void 0?void 0:r.name)!==null&&t!==void 0?t:""}function on(e){let t=Oa(e);return t==="HTMLCanvasElement"||t==="OffscreenCanvas"||t==="Canvas"||t==="CanvasElement"}function Ur(e){return Oa(e)==="HTMLImageElement"}function sn(e){return Oa(e)==="ImageBitmap"}function $s(e){let t=0,r=[];function i(){if(t<e&&r.length){var s;t++,(s=r.shift())===null||s===void 0||s()}}return function(c){return new Promise((u,f)=>{r.push(()=>{c().then(d=>{u(d),t--,i()},d=>{f(d),t--,i()})}),i()})}}function Xs(e){switch(e){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"}var Ga=["box","hamming","lanczos2","lanczos3"];function ln(e){return Ga[e]}function cn(e){return Ga.indexOf(e)>=0}function Ws(e){let t=Ga.indexOf(e);return t>=0?t:void 0}function Ys(e,t,r,i,s){let c=r/e,u=i/t,f=9/s;if(f>.5)return[[r,i]];let d=Math.ceil(Math.log(Math.min(c,u))/Math.log(f));if(d<=1)return[[r,i]];let g=[];for(let b=0;b<d;b++){let M=Math.round(Math.pow(Math.pow(e,d-b-1)*Math.pow(r,b+1),1/d)),v=Math.round(Math.pow(Math.pow(t,d-b-1)*Math.pow(i,b+1),1/d));g.push([M,v])}return g}var pn=1e-5;function Pt(e){let t=Math.round(e);return Math.abs(e-t)<pn?t:Math.floor(e)}function hn(e){let t=Math.round(e);return Math.abs(e-t)<pn?t:Math.ceil(e)}function Vs(e){let t=e.toWidth/e.width,r=e.toHeight/e.height,i=Pt(e.srcTileSize*t)-2*e.destTileBorder,s=Pt(e.srcTileSize*r)-2*e.destTileBorder;if(i<1||s<1)throw new Error("Internal error in pica: target tile width/height is too small.");let c,u,f,d,g,b,M=[],v;for(d=0;d<e.toHeight;d+=s)for(f=0;f<e.toWidth;f+=i)c=f-e.destTileBorder,c<0&&(c=0),g=f+i+e.destTileBorder-c,c+g>=e.toWidth&&(g=e.toWidth-c),u=d-e.destTileBorder,u<0&&(u=0),b=d+s+e.destTileBorder-u,u+b>=e.toHeight&&(b=e.toHeight-u),v={toX:c,toY:u,toWidth:g,toHeight:b,toInnerX:f,toInnerY:d,toInnerWidth:i,toInnerHeight:s,offsetX:c/t-Pt(c/t),offsetY:u/r-Pt(u/r),scaleX:t,scaleY:r,x:Pt(c/t),y:Pt(u/r),width:hn(g/t),height:hn(b/r)},M.push(v);return M}var La="/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==",Ee={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},un=!1,Tt=null,kt={willReadFrequently:!0};function $r(){if(typeof document=="undefined"||!document.createElement)return!1;try{let e=document.createElement("canvas");e.width=2,e.height=1;let t=e.getContext("2d",kt),r=t.createImageData(2,1);return r.data[0]=12,r.data[1]=23,r.data[2]=34,r.data[3]=255,r.data[4]=45,r.data[5]=56,r.data[6]=67,r.data[7]=255,t.putImageData(r,0,0),r=t.getImageData(0,0,2,1),r.data[0]===12&&r.data[1]===23&&r.data[2]===34&&r.data[3]===255&&r.data[4]===45&&r.data[5]===56&&r.data[6]===67&&r.data[7]===255}catch(e){return!1}}function Xr(){if(typeof OffscreenCanvas=="undefined")return!1;try{let e=new OffscreenCanvas(2,1).getContext("2d",kt),t=e.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,e.putImageData(t,0,0),t=e.getImageData(0,0,2,1),t.data[0]===12&&t.data[1]===23&&t.data[2]===34&&t.data[3]===255&&t.data[4]===45&&t.data[5]===56&&t.data[6]===67&&t.data[7]===255}catch(e){return!1}}function Wr(){return typeof createImageBitmap!="undefined"}function zs(){return typeof Worker!="undefined"&&typeof URL!="undefined"&&!!URL.createObjectURL}function js(){try{return!!(typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.indexOf("Safari")>=0&&navigator.userAgent.indexOf("Chrome")<0)}catch(e){return!1}}function qs(){return Promise.resolve().then(()=>{if(Xr()&&Wr()&&typeof Blob!="undefined"&&typeof atob!="undefined"){let e=atob(La),t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return createImageBitmap(new Blob([t],{type:"image/jpeg"})).then(r=>{let i=new OffscreenCanvas(1,1);try{let s=i.getContext("2d",kt);return s.drawImage(r,1,1,1,1,0,0,1,1),s.getImageData(0,0,1,1).data[0]<240}finally{r.close()}})}return $r()&&typeof Image!="undefined"?new Promise(e=>{let t=new Image;t.onload=()=>{try{let r=document.createElement("canvas");r.width=1,r.height=1;let i=r.getContext("2d",kt);i.drawImage(t,1,1,1,1,0,0,1,1),e(i.getImageData(0,0,1,1).data[0]<240)}catch(r){e(!0)}},t.onerror=()=>e(!0),t.src=`data:image/jpeg;base64,${La}`}):!0}).catch(()=>!0)}function Ks(){return Promise.resolve().then(()=>{if(!Ee.create_image_bitmap&&!Wr()||typeof Blob=="undefined"||typeof atob=="undefined")return!0;let e=Xr(),t=$r();if(!e&&!t)return!0;let r=atob(La),i=new Uint8Array(r.length);for(let s=0;s<r.length;s++)i[s]=r.charCodeAt(s);return createImageBitmap(new Blob([i],{type:"image/jpeg"})).then(s=>createImageBitmap(s,1,1,1,1).then(c=>{let u;e?u=new OffscreenCanvas(1,1):(u=document.createElement("canvas"),u.width=1,u.height=1);try{let f=u.getContext("2d",kt);return f.drawImage(c,0,0),c.width!==1||c.height!==1||f.getImageData(0,0,1,1).data[0]<240}finally{s.close(),c.close()}},()=>(s.close(),!0)))}).catch(()=>!0)}function Zs(){return Promise.resolve().then(()=>{if(!Wr())return!1;let e=20,t=5,r;if(Ee.canvas||$r())r=document.createElement("canvas"),r.width=e,r.height=e;else if(Ee.offscreen_canvas||Xr())r=new OffscreenCanvas(e,e),r.getContext("2d",kt).clearRect(0,0,e,e);else return!1;return createImageBitmap(r,0,0,e,e,{resizeWidth:t,resizeHeight:t,resizeQuality:"high"}).then(i=>{let s=i.width===t&&!!i.close;return i.close&&i.close(),r=null,s})}).catch(()=>!1)}function Js(){if(un)return Promise.resolve(Object.assign({},Ee));if(Tt)return Tt.then(()=>Object.assign({},Ee));Ee.canvas=$r(),Ee.offscreen_canvas=Xr(),Ee.may_be_worker=zs(),Ee.create_image_bitmap=Wr(),Ee.safari_put_image_data_fix=js();let e=qs().then(i=>{Ee.bug_canvas_orientation_region=i}).catch(()=>{}),t=Ks().then(i=>{Ee.bug_image_bitmap_orientation_region=i}).catch(()=>{}),r=Zs().then(i=>{Ee.cib_resize=i}).catch(()=>{});return Tt=Promise.all([e,t,r]).then(()=>(un=!0,Tt=null,Object.assign({},Ee)),i=>{throw Tt=null,i}),Tt}function fn(e,t,r,i,s,c,u){try{var f=e[c](u),d=f.value}catch(g){r(g);return}f.done?t(d):Promise.resolve(d).then(i,s)}function We(e){return function(){var t=this,r=arguments;return new Promise(function(i,s){var c=e.apply(t,r);function u(d){fn(c,i,s,u,f,"next",d)}function f(d){fn(c,i,s,u,f,"throw",d)}u(void 0)})}}var dn=`/*!

pica
https://github.com/nodeca/pica

*/
!function(){var A;function t(A){const t=A.replace(/[\\r\\n=]/g,""),e=t.length,n=new Uint8Array(3*e>>2);let a=0,i=0;for(let s=0;s<e;s++)s%4==0&&s&&(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a),a=a<<6|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(s));const r=e%4*6;return 0===r?(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a):18===r?(n[i++]=a>>10&255,n[i++]=a>>2&255):12===r&&(n[i++]=a>>4&255),n}var e={js:!0,wasm:!0},n=class{constructor(A){const t=Object.assign({},e,A||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0],!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}has_wasm(){return function(){if(void 0!==A)return A;if(A=!1,"undefined"==typeof WebAssembly)return A;try{const t=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),e=new WebAssembly.Module(t);return 0!==new WebAssembly.Instance(e,{}).exports.test(4)&&(A=!0),A}catch(t){}return A}()}use(A){return this.__modules[A.name]=A,this.options.wasm&&this.has_wasm()&&A.wasm_fn?this[A.name]=A.wasm_fn:this[A.name]=A.fn,this}init(){return this.__init_promise?this.__init_promise:this.options.js||!this.options.wasm||this.has_wasm()?(this.__init_promise=Promise.all(Object.keys(this.__modules).map(A=>{const e=this.__modules[A];return this.options.wasm&&this.has_wasm()&&e.wasm_fn?this.__wasm[A]?null:WebAssembly.compile(t(e.wasm_src)).then(t=>{this.__wasm[A]=t}):null})).then(()=>this),this.__init_promise):Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\\'s not supported'))}__reallocate(A){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(A/65536)}),this.__memory;const t=this.__memory.buffer.byteLength;return t<A&&this.__memory.grow(Math.ceil((A-t)/65536)),this.__memory}__instance(A,e,n){if(e&&this.__reallocate(e),!this.__wasm[A]){const e=this.__modules[A];this.__wasm[A]=new WebAssembly.Module(t(e.wasm_src))}if(!this.__cache[A]){const t={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[A]=new WebAssembly.Instance(this.__wasm[A],{env:Object.assign(t,n||{})})}return this.__cache[A]}__align(A,t){const e=A%(t=t||8);return A+(e?t-e:0)}};function a(A,t,e,n,a,i){let r,s,o,g,I,h,B,Q,E,C,f,c,u,d;for(E=0;E<i;E++){for(h=E*a,B=E,Q=0,r=A[h],I=r*n[6],g=I,f=n[0],c=n[1],u=n[4],d=n[5],C=0;C<a;C++)s=A[h],o=s*f+r*c+g*u+I*d,I=g,g=o,r=s,e[Q]=g,Q++,h++;for(h--,Q--,B+=i*(a-1),r=A[h],I=r*n[7],g=I,s=r,f=n[2],c=n[3],C=a-1;C>=0;C--)o=s*f+r*c+g*u+I*d,I=g,g=o,r=s,s=A[h],t[B]=e[Q]+g,h--,Q--,B-=i}}function i(A,t,e,n){if(!n)return;const i=new Uint16Array(A.length),r=new Float32Array(Math.max(t,e)),s=function(A){A<.5&&(A=.5);const t=Math.exp(.527076)/A,e=Math.exp(-t),n=Math.exp(-2*t),a=(1-e)*(1-e)/(1+2*t*e-n),i=a*(t-1)*e,r=a*(t+1)*e,s=-a*n,o=2*e,g=-n;return new Float32Array([a,i,r,s,o,g,(a+i)/(1-o-g),(r+s)/(1-o-g)])}(n);a(A,i,r,s,t,e),a(i,A,r,s,e,t)}var r={name:"unsharp_mask",fn:function(A,t,e,n,a,r){let s,o,g,I,h;if(0===n||a<.5)return;a>2&&(a=2);const B=function(A,t,e){const n=t*e,a=new Uint16Array(n);let i,r,s,o;for(let g=0;g<n;g++)i=A[4*g],r=A[4*g+1],s=A[4*g+2],o=i>=r&&i>=s?i:r>=s&&r>=i?r:s,a[g]=o<<8;return a}(A,t,e),Q=new Uint16Array(B);i(Q,t,e,a);const E=n/100*4096+.5|0,C=r<<8,f=t*e;for(let i=0;i<f;i++)s=B[i],I=s-Q[i],Math.abs(I)>=C&&(o=s+(E*I+2048>>12),o=o>65280?65280:o,o=o<0?0:o,s=0!==s?s:1,g=(o<<12)/s|0,h=4*i,A[h]=A[h]*g+2048>>12,A[h+1]=A[h+1]*g+2048>>12,A[h+2]=A[h+2]*g+2048>>12)},wasm_fn:function(A,t,e,n,a,i){if(0===n||a<.5)return;a>2&&(a=2);const r=t*e,s=4*r,o=2*r,g=2*r,I=4*Math.max(t,e),h=s,B=h+o,Q=B+g,E=Q+g,C=E+I,f=this.__instance("unsharp_mask",s+o+2*g+I+32,{exp:Math.exp}),c=new Uint32Array(A.buffer);new Uint32Array(this.__memory.buffer).set(c);let u=f.exports.hsv_v16||f.exports._hsv_v16;if(!u)throw new Error("WASM hsv_v16 function is not available");if(u(0,h,t,e),u=f.exports.blurMono16||f.exports._blurMono16,!u)throw new Error("WASM blurMono16 function is not available");if(u(h,B,Q,E,C,t,e,a),u=f.exports.unsharp||f.exports._unsharp,!u)throw new Error("WASM unsharp function is not available");u(0,0,h,B,t,e,n,i),c.set(new Uint32Array(this.__memory.buffer,0,r))},wasm_src:"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"},s={filter:{box:{win:.5,fn:A=>(A<0&&(A=-A),A<.5?1:0)},hamming:{win:1,fn(A){if(A<0&&(A=-A),A>=1)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(A){if(A<0&&(A=-A),A>=2)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(A){if(A<0&&(A=-A),A>=3)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn:A=>(A<0&&(A=-A),A>=2.5?0:A>=1.5?-.125*(A-2.5)*(A-2.5):A>=.5?.25*(4*A*A-11*A+7):1.0625-1.75*A*A)}}};function o(A){return Math.round(16383*A)}function g(A,t,e,n,a){const i=s.filter[A].fn,r=1/n,g=Math.min(1,n),I=s.filter[A].win/g;let h,B,Q,E,C,f,c,u,d,l,w,m,y,_,b,D,M;const p=Math.floor(2*(I+1)),G=new Int16Array((p+2)*e);let U=0;const F=!G.subarray||!G.set;for(h=0;h<e;h++){for(B=(h+.5)*r+a,Q=Math.max(0,Math.floor(B-I)),E=Math.min(t-1,Math.ceil(B+I)),C=E-Q+1,f=new Float32Array(C),c=new Int16Array(C),u=0,d=Q,l=0;d<=E;d++,l++)w=i((d+.5-B)*g),u+=w,f[l]=w;for(m=0,l=0;l<f.length;l++)y=f[l]/u,m+=y,c[l]=o(y);for(c[e>>1]+=o(1-m),_=0;_<c.length&&0===c[_];)_++;if(_<c.length){for(b=c.length-1;b>0&&0===c[b];)b--;if(D=Q+_,M=b-_+1,G[U++]=D,G[U++]=M,F)for(l=_;l<=b;l++)G[U++]=c[l];else G.set(c.subarray(_,b+1),U),U+=M}else G[U++]=0,G[U++]=0}return G}function I(A){return A<0?0:A>255?255:A}function h(A){return A>=0?A:0}var B=!0;try{B=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]}catch(G){}function Q(A,t,e){if(B)t.set(function(A){return new Uint8Array(A.buffer,0,A.byteLength)}(A),e);else for(let n=e,a=0;a<A.length;a++){const e=A[a];t[n++]=255&e,t[n++]=e>>8&255}}var E={name:"resize",fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,B=A.offsetY||0,Q=A.dest||new Uint8Array(a*i*4),E=void 0===A.filter?"mks2013":A.filter,C=g(E,e,a,r,o),f=g(E,n,i,s,B),c=new Uint16Array(a*n*4);return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,f,c,u=0,d=0;for(C=0;C<n;C++){for(I=0,f=0;f<a;f++){for(B=i[I++],Q=i[I++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)c=i[I++],g=g+c*A[E+3]|0,o=o+c*A[E+2]|0,s=s+c*A[E+1]|0,r=r+c*A[E]|0,E=E+4|0;t[d+3]=h(g>>7),t[d+2]=h(o>>7),t[d+1]=h(s>>7),t[d]=h(r>>7),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(t,c,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,f,c,u=0,d=0;for(C=0;C<n;C++){for(h=0,f=0;f<a;f++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)c=i[h++],g=g+c*A[E+3]|0,o=o+c*A[E+2]|0,s=s+c*A[E+1]|0,r=r+c*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,t[d+3]=I(g+8192>>14),t[d+2]=I(o+8192>>14),t[d+1]=I(s+8192>>14),t[d]=I(r+8192>>14),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(c,Q,n,a,i,f),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(Q,a,i)):(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,f,c,u,d=0,l=0;for(f=0;f<n;f++){for(B=0,c=0;c<a;c++){for(Q=i[B++],E=i[B++],C=d+4*Q|0,r=s=o=g=0;E>0;E--)u=i[B++],I=A[C+3],g=g+u*I|0,o=o+u*A[C+2]*I|0,s=s+u*A[C+1]*I|0,r=r+u*A[C]*I|0,C=C+4|0;o=o/255|0,s=s/255|0,r=r/255|0,t[l+3]=h(g>>7),t[l+2]=h(o>>7),t[l+1]=h(s>>7),t[l]=h(r>>7),l=l+4*n|0}l=4*(f+1)|0,d=(f+1)*e*4|0}}(t,c,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,f,c,u=0,d=0;for(C=0;C<n;C++){for(h=0,f=0;f<a;f++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)c=i[h++],g=g+c*A[E+3]|0,o=o+c*A[E+2]|0,s=s+c*A[E+1]|0,r=r+c*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,g=I(g+8192>>14),g>0&&(r=255*r/g|0,s=255*s/g|0,o=255*o/g|0),t[d+3]=g,t[d+2]=I(o+8192>>14),t[d+1]=I(s+8192>>14),t[d]=I(r+8192>>14),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(c,Q,n,a,i,f)),Q},wasm_fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,I=A.offsetY||0,h=A.dest||new Uint8Array(a*i*4),B=void 0===A.filter?"mks2013":A.filter,E=g(B,e,a,r,o),C=g(B,n,i,s,I),f=Math.max(t.byteLength,h.byteLength),c=this.__align(0+f),u=n*a*4*2,d=this.__align(c+u),l=this.__align(d+E.byteLength),w=l+C.byteLength,m=this.__instance("resize",w),y=new Uint8Array(this.__memory.buffer),_=new Uint32Array(this.__memory.buffer),b=new Uint32Array(t.buffer);_.set(b),Q(E,y,d),Q(C,y,l);const D=m.exports.convolveHV||m.exports._convolveHV;if(!D)throw new Error("WASM resize function is not available");return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(D(d,l,c,e,n,a,i,0),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(h,a,i)):D(d,l,c,e,n,a,i,1),new Uint32Array(h.buffer).set(new Uint32Array(this.__memory.buffer,0,i*a)),h},wasm_src:"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"},C=class extends n{constructor(A){const t=A||[],e={js:t.indexOf("js")>=0,wasm:t.indexOf("wasm")>=0};super(e),this.features={js:e.js,wasm:e.wasm&&this.has_wasm()},this.use(r),this.use(E)}resizeAndUnsharp(A){const t=this.resize(A);return A.unsharpAmount&&this.unsharp_mask(t,A.toWidth,A.toHeight,A.unsharpAmount,A.unsharpRadius,A.unsharpThreshold),t}},f="/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==",c={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},u=!1,d=null,l={willReadFrequently:!0};function w(){if("undefined"==typeof document||!document.createElement)return!1;try{const A=document.createElement("canvas");A.width=2,A.height=1;const t=A.getContext("2d",l);let e=t.createImageData(2,1);return e.data[0]=12,e.data[1]=23,e.data[2]=34,e.data[3]=255,e.data[4]=45,e.data[5]=56,e.data[6]=67,e.data[7]=255,t.putImageData(e,0,0),e=t.getImageData(0,0,2,1),12===e.data[0]&&23===e.data[1]&&34===e.data[2]&&255===e.data[3]&&45===e.data[4]&&56===e.data[5]&&67===e.data[6]&&255===e.data[7]}catch(G){return!1}}function m(){if("undefined"==typeof OffscreenCanvas)return!1;try{const A=new OffscreenCanvas(2,1).getContext("2d",l);let t=A.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,A.putImageData(t,0,0),t=A.getImageData(0,0,2,1),12===t.data[0]&&23===t.data[1]&&34===t.data[2]&&255===t.data[3]&&45===t.data[4]&&56===t.data[5]&&67===t.data[6]&&255===t.data[7]}catch(G){return!1}}function y(){return"undefined"!=typeof createImageBitmap}function _(){if(u)return Promise.resolve(Object.assign({},c));if(d)return d.then(()=>Object.assign({},c));c.canvas=w(),c.offscreen_canvas=m(),c.may_be_worker="undefined"!=typeof Worker&&"undefined"!=typeof URL&&!!URL.createObjectURL,c.create_image_bitmap=y(),c.safari_put_image_data_fix=function(){try{return!!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.indexOf("Safari")>=0&&navigator.userAgent.indexOf("Chrome")<0)}catch(G){return!1}}();const A=Promise.resolve().then(()=>{if(m()&&y()&&"undefined"!=typeof Blob&&"undefined"!=typeof atob){const A=atob(f),t=new Uint8Array(A.length);for(let e=0;e<A.length;e++)t[e]=A.charCodeAt(e);return createImageBitmap(new Blob([t],{type:"image/jpeg"})).then(A=>{const t=new OffscreenCanvas(1,1);try{const e=t.getContext("2d",l);return e.drawImage(A,1,1,1,1,0,0,1,1),e.getImageData(0,0,1,1).data[0]<240}finally{A.close()}})}return!w()||"undefined"==typeof Image||new Promise(A=>{const t=new Image;t.onload=()=>{try{const e=document.createElement("canvas");e.width=1,e.height=1;const n=e.getContext("2d",l);n.drawImage(t,1,1,1,1,0,0,1,1),A(n.getImageData(0,0,1,1).data[0]<240)}catch(G){A(!0)}},t.onerror=()=>A(!0),t.src=\`data:image/jpeg;base64,\${f}\`})}).catch(()=>!0).then(A=>{c.bug_canvas_orientation_region=A}).catch(()=>{}),t=Promise.resolve().then(()=>{if(!c.create_image_bitmap&&!y())return!0;if("undefined"==typeof Blob||"undefined"==typeof atob)return!0;const A=m(),t=w();if(!A&&!t)return!0;const e=atob(f),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return createImageBitmap(new Blob([n],{type:"image/jpeg"})).then(t=>createImageBitmap(t,1,1,1,1).then(e=>{let n;A?n=new OffscreenCanvas(1,1):(n=document.createElement("canvas"),n.width=1,n.height=1);try{const A=n.getContext("2d",l);return A.drawImage(e,0,0),1!==e.width||1!==e.height||A.getImageData(0,0,1,1).data[0]<240}finally{t.close(),e.close()}},()=>(t.close(),!0)))}).catch(()=>!0).then(A=>{c.bug_image_bitmap_orientation_region=A}).catch(()=>{}),e=Promise.resolve().then(()=>{if(!y())return!1;const A=20;let t;if(c.canvas||w())t=document.createElement("canvas"),t.width=A,t.height=A;else{if(!c.offscreen_canvas&&!m())return!1;t=new OffscreenCanvas(A,A),t.getContext("2d",l).clearRect(0,0,A,A)}return createImageBitmap(t,0,0,A,A,{resizeWidth:5,resizeHeight:5,resizeQuality:"high"}).then(A=>{const e=5===A.width&&!!A.close;return A.close&&A.close(),t=null,e})}).catch(()=>!1).then(A=>{c.cib_resize=A}).catch(()=>{});return d=Promise.all([A,t,e]).then(()=>(u=!0,d=null,Object.assign({},c)),A=>{throw d=null,A})}var b=self,D=null;function M(A,t){return D||(D=new C(A.features)),D.resizeAndUnsharp(t)}function p(A){if("bitmap"===A.job.kind)return void function(A,t){let e=new OffscreenCanvas(t.width,t.height);const n=e.getContext("2d",{willReadFrequently:!0});n.drawImage(t.src,0,0);const a=n.getImageData(0,0,t.width,t.height).data;e.width=e.height=0,e=null,t.src.close();const i=M(A,{src:a,width:t.width,height:t.height,toWidth:t.toWidth,toHeight:t.toHeight,scaleX:t.scaleX,scaleY:t.scaleY,offsetX:t.offsetX,offsetY:t.offsetY,filter:t.filter,unsharpAmount:t.unsharpAmount,unsharpRadius:t.unsharpRadius,unsharpThreshold:t.unsharpThreshold});b.postMessage({kind:"array",data:i},[i.buffer])}(A,A.job);const t=M(A,A.job);b.postMessage({kind:"array",data:t},[t.buffer])}b.onmessage=function(A){Promise.resolve().then(()=>function(A){switch(A.method){case"get_supported_features":return _().then(A=>{b.postMessage({data:A})});case"resize":return p(A),Promise.resolve();default:return Promise.reject(new Error(\`Unknown worker method: \${A.method}\`))}}(A.data)).catch(A=>{b.postMessage({err:A})})}}();
//# sourceURL=pica-inline-worker.js`,An=1;typeof navigator!="undefined"&&(An=Math.min(navigator.hardwareConcurrency||1,4));var el={tile:1024,concurrency:An,features:["js","wasm","ww"],idle:2e3},rr={filter:"mks2013",unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},vt={willReadFrequently:!0},tl=class{constructor(e){Ce(this,"options",void 0),Ce(this,"__limit",void 0),Ce(this,"resize_features",void 0),Ce(this,"__workersPool",void 0),Ce(this,"capabilities",void 0),Ce(this,"__requested_features",void 0),Ce(this,"__mathlib",void 0),Ce(this,"__initPromise",void 0),this.options=Object.assign({},el,e||{}),(this.options.features.indexOf("ww")>=0||this.options.features.indexOf("all")>=0)&&this.options.workerURL,this.__limit=$s(this.options.concurrency),this.resize_features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.capabilities={worker:!1,ww_offscreen_canvas:!1,canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},this.__requested_features=[],this.__mathlib=null}init(){return this.__initPromise?this.__initPromise:(this.__initPromise=this.__init(),this.__initPromise)}__init(){var e=this;return We(function*(){let t=e.options.features.slice();t.indexOf("all")>=0&&(t=["cib","wasm","js","ww"]),e.__requested_features=t,e.__mathlib=new Gs(t);let r=yield Js();if(Object.assign(e.capabilities,r),e.capabilities.cib_resize&&t.indexOf("cib")>=0&&(e.resize_features.cib=!0),e.capabilities.may_be_worker&&t.indexOf("ww")>=0&&dn&&(e.__workersPool=new Hs(()=>e.__createWorkerSlot(),e.options.idle)),e.__workersPool)try{let s=yield e.__invokeWorker("get_supported_features"),c=s&&s.data;c&&(e.capabilities.worker=!0,e.resize_features.ww=!0,e.capabilities.ww_offscreen_canvas=!!c.offscreen_canvas)}catch(s){}let i=yield e.__mathlib.init();return Object.assign(e.resize_features,i.features),e})()}createCanvas(e,t,r){if(r&&this.capabilities.offscreen_canvas)return new OffscreenCanvas(e,t);if(this.capabilities.canvas){let i=document.createElement("canvas");return i.width=e,i.height=t,i}if(this.capabilities.ww_offscreen_canvas)return new OffscreenCanvas(e,t);throw new Error("Pica: cannot create canvas")}__createWorkerSlot(){if(this.options.workerURL){let e=new Worker(String(this.options.workerURL));return{value:e,destroy(){e.terminate()}}}{let e=window.URL.createObjectURL(new Blob([dn],{type:"text/javascript"})),t=new Worker(e);return{value:t,destroy(){if(t.terminate(),typeof window!="undefined"){var r,i;(r=window.URL)===null||r===void 0||(i=r.revokeObjectURL)===null||i===void 0||i.call(r,e)}}}}}__invokeWorker(e,t,r,i){return new Promise((s,c)=>{let u=this.__workersPool.acquire();i&&i.cancelToken&&i.cancelToken.catch(f=>c(f)),u.value.onmessage=f=>{u.release(),f.data.err?c(f.data.err):s(f.data)},u.value.postMessage(Object.assign({method:e},t||{}),r||[])})}__invokeResize(e,t){var r=this;return We(function*(){if(yield Promise.resolve(),!r.resize_features.ww){if(e.kind!=="array")throw new Error("Pica: resize tile data is missing");let s={src:e.src,width:e.width,height:e.height,toWidth:e.toWidth,toHeight:e.toHeight,scaleX:e.scaleX,scaleY:e.scaleY,offsetX:e.offsetX,offsetY:e.offsetY,filter:e.filter,unsharpAmount:e.unsharpAmount,unsharpRadius:e.unsharpRadius,unsharpThreshold:e.unsharpThreshold};return{kind:"array",data:r.__mathlib.resizeAndUnsharp(s)}}let i=[];return e.kind==="array"?i.push(e.src.buffer):i.push(e.src),r.__invokeWorker("resize",{job:e,features:r.__requested_features},i,t)})()}__extractTileData(e,t,r,i){if(this.resize_features.ww&&this.capabilities.ww_offscreen_canvas){this.debug("Create tile imageBitmap");let f=this.createCanvas(e.width,e.height,{preferOffscreen:!0});if(f.getContext("2d",vt).drawImage(r.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),!("transferToImageBitmap"in f))throw new Error("Pica: offscreen canvas is not available for worker transfer");return Object.assign({},i,{kind:"bitmap",src:f.transferToImageBitmap()})}if(on(t))return r.srcCtx||(r.srcCtx=t.getContext("2d",vt)),this.debug("Get tile pixel data"),Object.assign({},i,{kind:"array",src:r.srcCtx.getImageData(e.x,e.y,e.width,e.height).data});this.debug("Draw tile imageBitmap/image to temporary canvas");let s=this.createCanvas(e.width,e.height,{preferOffscreen:!0}),c=s.getContext("2d",vt);c.globalCompositeOperation="copy",c.drawImage(r.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),this.debug("Get tile pixel data");let u=c.getImageData(0,0,e.width,e.height).data;return s.width=s.height=0,Object.assign({},i,{kind:"array",src:u})}__landTileData(e,t,r){if(t.kind==="bitmap")return r.toCtx.drawImage(t.data,e.toX,e.toY),t.data.close(),null;this.debug("Draw tile");let i=r.toCtx.createImageData(e.toWidth,e.toHeight);return i.data.set(t.data),this.capabilities.safari_put_image_data_fix?r.toCtx.putImageData(i,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth+1e-5,e.toInnerHeight+1e-5):r.toCtx.putImageData(i,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth,e.toInnerHeight),null}__tileAndResize(e,t,r,i){var s=this;return We(function*(){let c={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null},u=g=>s.__limit(We(function*(){if(i.canceled)return i.cancelToken;let b={width:g.width,height:g.height,toWidth:g.toWidth,toHeight:g.toHeight,scaleX:g.scaleX,scaleY:g.scaleY,offsetX:g.offsetX,offsetY:g.offsetY,filter:r.filter,unsharpAmount:r.unsharpAmount,unsharpRadius:r.unsharpRadius,unsharpThreshold:r.unsharpThreshold};s.debug("Invoke resize math");let M=yield s.__extractTileData(g,e,c,b);s.debug("Invoke resize math");let v=yield s.__invokeResize(M,i);return i.canceled?i.cancelToken:s.__landTileData(g,v,c)}));if(yield Promise.resolve(),c.toCtx=t.getContext("2d",vt),!on(e))if(sn(e))c.srcImageBitmap=e,c.isImageBitmapReused=!0;else if(Ur(e)){if(s.capabilities.create_image_bitmap){s.debug("Decode image via createImageBitmap");try{c.srcImageBitmap=yield createImageBitmap(e)}catch(g){}}}else throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap');if(i.canceled)return i.cancelToken;s.debug("Calculate tiles");let f=Vs({width:r.width,height:r.height,srcTileSize:s.options.tile,toWidth:r.toWidth,toHeight:r.toHeight,destTileBorder:Math.ceil(Math.max(3,2.5*r.unsharpRadius|0))}).map(g=>u(g));function d(g){g.srcImageBitmap&&(g.isImageBitmapReused||g.srcImageBitmap.close(),g.srcImageBitmap=null)}s.debug("Process tiles");try{return yield Promise.all(f),s.debug("Finished!"),d(c),t}catch(g){throw d(c),g}})()}__planStagesAndResize(e,t,r,i){var s=this;return We(function*(){let c=e,u=r.width,f=r.height,d=Ys(r.width,r.height,r.toWidth,r.toHeight,s.options.tile);for(;d.length>0;){if(i.canceled)return i.cancelToken;let[g,b]=d.shift(),M=d.length===0,v;M||!cn(r.filter)?v=r.filter:r.filter==="box"?v="box":v="hamming";let E=Hr(Hr({},r),{},{filter:v,width:u,height:f,toWidth:g,toHeight:b}),P=M?t:s.createCanvas(g,b,{preferOffscreen:!0}),Q=c!==e?c:void 0;try{yield s.__tileAndResize(c,P,E,i)}finally{Q&&(Q.width=Q.height=0)}c=P,u=g,f=b}return t})()}__resizeViaCreateImageBitmap(e,t,r,i){var s=this;return We(function*(){var c;let u=t.getContext("2d",vt);s.debug("Resize via createImageBitmap()");let f=yield createImageBitmap(e,{resizeWidth:r.toWidth,resizeHeight:r.toHeight,resizeQuality:Xs((c=Ws(r.filter))!==null&&c!==void 0?c:3)});if(i.canceled)return i.cancelToken;if(!r.unsharpAmount)return u.drawImage(f,0,0),f.close(),u=null,s.debug("Finished!"),t;s.debug("Unsharp result");let d=s.createCanvas(r.toWidth,r.toHeight),g=d.getContext("2d",vt);g.drawImage(f,0,0),f.close();let b=g.getImageData(0,0,r.toWidth,r.toHeight);return s.__mathlib.unsharp_mask(b.data,r.toWidth,r.toHeight,r.unsharpAmount,r.unsharpRadius,r.unsharpThreshold),u.putImageData(b,0,0),d.width=d.height=0,b=g=d=u=null,s.debug("Finished!"),t})()}resize(e,t,r){var i=this;return We(function*(){i.debug("Start resize...");let s={};r&&Object.assign(s,r);let c=s.filter||rr.filter;if(Object.prototype.hasOwnProperty.call(s,"quality")){let d=s.quality;if(typeof d!="number"||d<0||d>3)throw new Error(`Pica: .quality should be [0..3], got ${d}`);c=ln(d)}let u={filter:c,unsharpAmount:s.unsharpAmount||rr.unsharpAmount,unsharpRadius:s.unsharpRadius||rr.unsharpRadius,unsharpThreshold:s.unsharpThreshold||rr.unsharpThreshold,width:Ur(e)?e.naturalWidth:e.width,height:Ur(e)?e.naturalHeight:e.height,toWidth:t.width,toHeight:t.height};if(u.unsharpRadius>2&&(u.unsharpRadius=2),t.width===0||t.height===0)return Promise.reject(new Error(`Invalid output size: ${t.width}x${t.height}`));let f={cancelToken:s.cancelToken,canceled:!1};if(f.cancelToken&&(f.cancelToken=f.cancelToken.then(d=>{throw f.canceled=!0,d},d=>{throw f.canceled=!0,d})),yield i.init(),f.canceled)return f.cancelToken;if(i.capabilities.bug_image_bitmap_orientation_region&&(Ur(e)||sn(e))){let d=i.createCanvas(u.width,u.height);d.getContext("2d",vt).drawImage(e,0,0),e=d}if(i.resize_features.cib){if(cn(u.filter))return i.__resizeViaCreateImageBitmap(e,t,u,f);i.debug("cib is enabled, but not supports provided filter, fallback to manual math")}if(!i.capabilities.canvas&&!i.capabilities.offscreen_canvas){let d=new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");throw d.code="ERR_GET_IMAGE_DATA",d}return i.__planStagesAndResize(e,t,u,f)})()}resizeBuffer(e){var t=this;return We(function*(){let r=Object.assign({},rr,e);if(Object.prototype.hasOwnProperty.call(r,"quality")){let s=r.quality;if(typeof s!="number"||s<0||s>3)throw new Error(`Pica: .quality should be [0..3], got ${s}`);r.filter=ln(s)}if(yield t.init(),!t.__mathlib)throw new Error("Pica: math library is not initialized");let i={src:r.src,width:r.width,height:r.height,toWidth:r.toWidth,toHeight:r.toHeight,dest:r.dest,scaleX:r.toWidth/r.width,scaleY:r.toHeight/r.height,offsetX:0,offsetY:0,filter:r.filter,unsharpAmount:r.unsharpAmount,unsharpRadius:r.unsharpRadius,unsharpThreshold:r.unsharpThreshold};return t.__mathlib.resizeAndUnsharp(i)})()}toBlob(e,t,r){return We(function*(){if(t=t||"image/png","toBlob"in e&&e.toBlob)return new Promise(u=>{e.toBlob(f=>u(f),t,r)});if("convertToBlob"in e&&e.convertToBlob)return e.convertToBlob({type:t,quality:r});let i=atob(e.toDataURL(t,r).split(",")[1]),s=i.length,c=new Uint8Array(s);for(let u=0;u<s;u++)c[u]=i.charCodeAt(u);return new Blob([c],{type:t})})()}debug(...e){}};function gn(e){return new tl(e)}var Va=da(bn()),Bn=da(Cn());var vn=["benbenn.jpg","cezanne2.jpg","colorroses.jpg","colorswirls.jpg","coolcar.jpg","darkbrewery.jpg","dhuku.jpg","greentruck.jpg","frida.jpg","homer.jpg","keyssunset.jpg","lobsterpot.jpg","myersflat.jpg","myrtle.jpg","parrot.jpg","redrose.jpg","robert_s_duncanson.jpg","seurat.jpg","vangogh.jpg"];var Te,rl=document.getElementById("brightSlider"),al=document.getElementById("contrastSlider"),il=document.getElementById("saturationSlider"),nl=document.getElementById("noiseSlider"),ol=document.getElementById("diffuseSlider"),sl=document.getElementById("orderedSlider"),ll=document.getElementById("diversitySlider"),$a=document.getElementById("imageUpload"),_n=document.getElementById("srcimage"),nr=document.getElementById("resizecanvas"),ir=document.getElementById("destcanvas"),Xa=class{constructor(){this.newWorker()}newWorker(){this.worker&&(this.worker.onmessage=()=>{}),this.worker=new Worker("./gen/worker.js"),this.worker.onmessage=t=>{var r=t.data;r!=null&&r.img!=null&&this.pixelsAvailable!=null&&(this.pixelsAvailable(r),this.lastPixels=r)}}setSettings(t){this.settings=t,this.worker.postMessage({cmd:"setSettings",data:t})}setSourceImage(t){this.worker.postMessage({cmd:"setSourceImage",data:t})}restart(){this.worker.postMessage({cmd:"restart"})}},j=new Xa,wt,Yr,Mn=[{name:"Floyd-Steinberg",kernel:Gi},{name:"False Floyd",kernel:Ui},{name:"Atkinson",kernel:Ni},{name:"Sierra 2",kernel:Hi},{name:"Sierra Lite",kernel:$i},{name:"Stucki",kernel:Xi},{name:"Two-D",kernel:Wi},{name:"Right",kernel:Yi},{name:"Down",kernel:Vi},{name:"Double Down",kernel:zi},{name:"Diagonal",kernel:ji},{name:"Diamond",kernel:qi}],cl=[{id:"perceptual",name:"Perceptual"},{id:"hue",name:"Hue-Based"},{id:"dist",name:"Distance"},{id:"max",name:"Maximum"}],In=!1;function za(e){if(In)return;In=!0;let t=(e==null?void 0:e.message)||String(e);console.error("Canvas access error:",e),(t.includes("fingerprint")||t.includes("canvas")||t.includes("getImageData"))&&alert(`\u26A0\uFE0F Canvas Access Blocked

Dithertron cannot access canvas image data. This is usually caused by browser fingerprinting protection.

To fix this:
\u2022 Firefox: Disable 'Enhanced Tracking Protection' for this site (shield icon in address bar)
\u2022 Brave: Disable 'Block fingerprinting' in Shields settings
\u2022 Other browsers: Check privacy/security settings

Technical details: `+t)}function hl(){try{let e=document.createElement("canvas");e.width=e.height=1;let t=e.getContext("2d");return t.fillStyle="rgb(255, 0, 0)",t.fillRect(0,0,1,1),t.getImageData(0,0,1,1),!0}catch(e){return za(e),!1}}function ul(e){try{return new Uint32Array(e.getContext("2d").getImageData(0,0,e.width,e.height).data.buffer)}catch(t){throw za(t),t}}function fl(e,t){var r=e.getContext("2d"),i=r.createImageData(e.width,e.height),s=new Uint32Array(i.data.buffer);s.length==t.length?(s.set(t),r.putImageData(i,0,0)):console.log("drawRGBA(): array length mismatch")}function dl(e,t,r,i,s){t*=1,r*=1;for(var c=new Uint8ClampedArray(e.buffer),u=0;u<c.length;u+=4){var f=c[u],d=c[u+1],g=c[u+2];if(i!=1){var b=.2989*f+.587*d+.114*g;f=b*(1-i)+f*i,d=b*(1-i)+d*i,g=b*(1-i)+g*i}c[u]=Math.pow(f*t,s)+r,c[u+1]=Math.pow(d*t,s)+r,c[u+2]=Math.pow(g*t,s)+r}}function Ft(){var e=ul(nr);let t=(parseFloat(al.value)-50)/100+1,r=(parseFloat(rl.value)-t*50)*(128/50),i=(parseFloat(il.value)-50)/50+1;dl(e,t,r,i,1),j.setSourceImage(e),It()}function It(){var e=$("#diffuseTypeSelect")[0].selectedOptions[0];e&&(j.settings.ditherfn=Mn[parseInt(e.value)].kernel);var e=$("#errorFuncSelect")[0].selectedOptions[0];e&&(j.settings.errfn=e.value),j.settings.diffuse=parseFloat(ol.value)/100,j.settings.ordered=parseFloat(sl.value)/100,j.settings.noise=parseFloat(nl.value),j.settings.paletteDiversity=parseFloat(ll.value)/200+.75,j.setSettings(j.settings),j.restart()}function ml(){let e=Te==null?void 0:Te.getCroppedCanvas();!(e!=null&&e.width)||!(e!=null&&e.height)||gn().resize(e,nr,{}).then(()=>{Ft()}).catch(t=>{za(t)})}function Dn(e){var t=e.width+" x "+e.height;return e.reduce?t+=", "+e.reduce+" out of "+e.pal.length+" colors":e.pal&&(t+=", "+e.pal.length+" colors"),e.block&&(t+=", ",t+=e.block.colors+" colors per ",t+=e.block.w+"x"+e.block.h+" block"),t}function pl(e){$("#targetFormatInfo").text(Dn(e)+(e.caveat?" *":"")).attr("title",e.caveat||"")}function Al(e){var t=$("#paletteSwatches");t.empty(),e&&e.length<64&&e.forEach((r,i)=>{var s="rgb("+(r&255)+","+(r>>8&255)+","+(r>>16&255)+")",c=$('<span style="width:2em">&nbsp;</span>').css("background-color",s);t.append(c)})}function gl(e){let t=j.settings;return(e==null?void 0:e.naturalWidth)==t.width&&(e==null?void 0:e.naturalHeight)==t.height}function bl(){console.log("Width and height exact match!"),Te.clear(),Te.disable(),nr.getContext("2d").drawImage(_n,0,0),Ft()}function Vr(e){Te&&Te.destroy();let t=j.settings,r=t.width*(t.scaleX||1)/t.height||4/3;Te=new En.default(_n,{viewMode:1,autoCropArea:1,initialAspectRatio:r,crop(i){gl(Te.getImageData())?bl():ml()}}),Te.replace(e),Tn()}function wn(e){var t=e.conv!="DitheringCanvas";j.newWorker(),j.setSettings(e),j.restart(),pl(e),nr.width=ir.width=e.width,nr.height=ir.height=e.height;let r=e.scaleX||1;ir.style.aspectRatio=(e.width*r/e.height).toString(),$("#noiseSection").css("display",t?"flex":"none"),$("#diversitySection").css("display",e.reduce?"flex":"none"),$("#downloadNativeBtn").css("display",e.toNative?"inline":"none"),$("#gotoIDE").css("display",Rn()?"inline":"none"),Te&&Vr(Te.url),Tn(),Rl(e)}function zr(){var e=wt||"image";try{e=e.split(".").shift()||"image"}catch(t){}return e+"-"+j.settings.id}function Sn(){var e=j.lastPixels;let t=j.settings.toNative;if(!t)return null;var r=Ma[t];return e&&r&&r(e,j.settings)}function xl(){var e=Sn();if(e!=null){var t=new Blob([e],{type:"application/octet-stream"});(0,Va.saveAs)(t,zr()+".bin")}}function Cl(){ir.toBlob(e=>{(0,Va.saveAs)(e,zr()+".png")},"image/png")}function vl(e){var t="";if(e!=null){for(var r=new Array,i=0;i<256;++i)r[i]=String.fromCharCode(i);for(var s=e.length,i=0;i<s;i++)t+=r[e[i]]}return t}function Rn(){var e="getFileViewerCode_"+j.settings.id.replace(/[^a-z0-9]/g,"_"),t=ka[e];return t}var Il=8190,yn="https://8bitworkshop.com",Pn="http://localhost:8000",Gc=Pn+"/dithertron/";function wl(e){return e.split(".")[0]}function yl(){if(window.location.hostname=="localhost"&&window.location.port=="8189")return Pn;var e=$(document.forms.ideForm).attr("action");try{return new URL(e||yn,window.location.href).origin}catch(t){return yn}}function El(e){return e==null?new Uint8Array(0):e instanceof Uint8Array?e:Uint8Array.from(e)}async function Bl(e,t){let r=Bn.default.createInstance({name:"__"+e,version:2});var i=[];for(let s of t)await r.getItem(s.name)!=null&&i.push(s.name);if(i.length>0&&!confirm(`The following project files already exist in 8bitworkshop and will be replaced:

`+i.join(`
`)+`

Continue?`))return!1;for(let s of t)await r.setItem(s.name,s.data);return!0}function _l(e){let t=new URLSearchParams;for(let r of e)t.append(r.name,r.value);return t.toString()}async function Ml(){function e(E,P,Q){$('<input type="hidden"/>').attr("name",P).val(Q).appendTo(E)}if(!confirm("Open code sample with image in 8bitworkshop?"))return;var t=j.settings.id.split(".")[0],r=document.forms.ideForm,i=$(r);i.empty(),t=="atari8"&&(t="atari8-800"),t=="cpc"&&(t="cpc.6128"),t=="sms"&&(t="sms-sms-libcv"),t=="sms-gg"&&(t="sms-gg-libcv");var s=t=="gb"?".sgb":".asm",c="viewer-"+zr()+s,u=zr()+".bin",f=Rn()();f=f.replace("$DATAFILE",u);var d=Sn(),g=[{name:"platform",value:t},{name:"file0_name",value:c},{name:"file0_data",value:f},{name:"file0_type",value:"utf8"},{name:"file1_name",value:u},{name:"file1_data",value:btoa(vl(d))},{name:"file1_type",value:"binary"}],b=(i.attr("action")||"")+"?"+_l(g);let M=window.location.hostname=="localhost";if(M&&(r.action="http://localhost:8000/"),b.length>Il&&!M){var v=yl();if(window.location.origin!=v){if(!confirm("Warning: this image is too large to pass through the URL, so Dithertron would need to save the project files directly into 8bitworkshop's local storage. This only works when Dithertron is served from the same origin as the IDE ("+v+"), but this page is on "+window.location.origin+`.

Try the URL anyway?`))return}else try{if(!await Bl(wl(t),[{name:c,data:f},{name:u,data:El(d)}]))return;e(i,"platform",t),e(i,"file",c),i.submit();return}catch(E){console.log(E),console.warn("Could not save project files to 8bitworkshop local storage, falling back to URL.",E),i.empty()}}for(let E of g)e(i,E.name,E.value);i.submit()}function Wa(e){$("#sourceName").text(e||"(none)")}function Ya(e){e.type.startsWith("image/")&&(wt=e.name||"pasted.png",Yr="",$a.value="",Wa(wt),Vr(URL.createObjectURL(e)))}function Dl(){let e=document.getElementById("dropOverlay"),t=0;["dragover","drop"].forEach(r=>{window.addEventListener(r,i=>{i.preventDefault()})}),window.addEventListener("dragenter",r=>{r.preventDefault(),t++,e.classList.add("dragover")}),window.addEventListener("dragleave",r=>{r.preventDefault(),--t<=0&&(t=0,e.classList.remove("dragover"))}),window.addEventListener("drop",r=>{var s,c;r.preventDefault(),t=0,e.classList.remove("dragover");let i=(c=(s=r.dataTransfer)==null?void 0:s.files)==null?void 0:c[0];i&&Ya(i)}),window.addEventListener("paste",r=>{var s;let i=(s=r.clipboardData)==null?void 0:s.items;if(i){for(let c of Array.from(i))if(c.type.startsWith("image/")){let u=c.getAsFile();if(u){Ya(u),r.preventDefault();break}}}})}function Tn(){let e={sys:j.settings.id,image:Yr};window.location.hash="#"+$.param(e)}function Sl(e){e.startsWith("?")&&(e=e.substr(1));var t=e.split("&");if(!t||t.length==0)return{};for(var r={},i=0;i<t.length;++i){var s=t[i].split("=",2);s.length==1?r[s[0]]="":r[s[0]]=decodeURIComponent(s[1].replace(/\+/g," "))}return r}function Rl(e){let t=$("#targetFormatSelect");t.empty();let[r,i]=e.name.split(" ("),s=new Set,c=null;Jt.forEach(u=>{if(u==null)t.append($("<option disabled></option>"));else{let[f,d]=u.name.split(" ("),g=$("<option />").text(u.name).val(u.id);if(f==r)c||(c=$("<optgroup />").attr("label",r),t.append(c)),c.append(g);else if(!s.has(f)){let b=$("<option />").text(f).val(u.id);t.append(b)}s.add(f)}}),t.val(e.id)}function Pl(){if(window.addEventListener("load",function(){hl(),document.querySelector('input[type="file"]').addEventListener("change",function(s){var c=s.target,u=c.files&&c.files[0];u&&Ya(u)}),Dl(),vn.forEach(s=>{$('<a class="dropdown-item" href="#"></a>').text(s).appendTo("#examplesMenu")}),$("#examplesMenu").click(s=>{s.preventDefault();var c=$(s.target).text();wt=Yr=c,Wa(c),Vr("images/"+c),$a.value=""}),Mn.forEach((s,c)=>{var u=$("<option />").text(s.name).val(c);$("#diffuseTypeSelect").append(u)}),cl.forEach((s,c)=>{var u=$("<option />").text(s.name).val(s.id);$("#errorFuncSelect").append(u)}),j.pixelsAvailable=s=>{fl(ir,s.img),Al(s.pal)};let t=Sl(window.location.hash.substring(1)),r=t.sys||Jt[0].id,i=kr[r];wn(i),wt=Yr=t.image||"seurat.jpg",Wa(wt),Vr("images/"+wt),$("#diffuseSlider").on("change",It),$("#orderedSlider").on("change",It),$("#noiseSlider").on("change",It),$("#diversitySlider").on("change",Ft),$("#brightSlider").on("change",Ft),$("#contrastSlider").on("change",Ft),$("#saturationSlider").on("change",Ft),$("#resetButton").on("click",It),$("#diffuseTypeSelect").on("change",It),$("#targetFormatSelect").change(s=>{var c=s.target.selectedOptions[0];c&&wn(kr[c.value])}),$("#errorFuncSelect").on("change",It),$("#openImageBtn").click(()=>$a.click()),$("#downloadImageBtn").click(Cl),$("#downloadNativeBtn").click(xl),$("#gotoIDE").click(Ml)}),window.location.search=="?printmeta"){let t=function(){var r="";Jt.forEach(i=>{i&&(r+="* "+i.name+" - "+Dn(i)+`
`)}),console.log(r)};var e=t;t()}}Pl();export{j as dithertron,Pl as startUI};
/*! Bundled license information:

cropperjs/dist/cropper.js:
  (*!
   * Cropper.js v1.6.3
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2026-08-23T09:24:57.458Z
   *)

localforage/dist/localforage.js:
  (*!
      localForage -- Offline Storage, Improved
      Version 1.9.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  *)

pica/dist/pica.mjs:
  (*!
  
  pica
  https://github.com/nodeca/pica
  
  *)
*/
//# sourceMappingURL=ui.js.map
