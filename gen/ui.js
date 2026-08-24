var mn=Object.create;var Pt=Object.defineProperty,pn=Object.defineProperties,gn=Object.getOwnPropertyDescriptor,bn=Object.getOwnPropertyDescriptors,xn=Object.getOwnPropertyNames,ra=Object.getOwnPropertySymbols,Cn=Object.getPrototypeOf,ia=Object.prototype.hasOwnProperty,In=Object.prototype.propertyIsEnumerable;var aa=(e,t,r)=>t in e?Pt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ve=(e,t)=>{for(var r in t||(t={}))ia.call(t,r)&&aa(e,r,t[r]);if(ra)for(var r of ra(t))In.call(t,r)&&aa(e,r,t[r]);return e},we=(e,t)=>pn(e,bn(t));var na=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},oa=(e,t)=>{for(var r in t)Pt(e,r,{get:t[r],enumerable:!0})},vn=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of xn(t))!ia.call(e,s)&&s!==r&&Pt(e,s,{get:()=>t[s],enumerable:!(i=gn(t,s))||i.enumerable});return e};var sa=(e,t,r)=>(r=e!=null?mn(Cn(e)):{},vn(t||!e||!e.__esModule?Pt(r,"default",{value:e,enumerable:!0}):r,e));var ti=na((br,xr)=>{(function(e,t){typeof br=="object"&&typeof xr!="undefined"?xr.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis!="undefined"?globalThis:e||self,e.Cropper=t())})(br,(function(){"use strict";function e(c,a){(a==null||a>c.length)&&(a=c.length);for(var o=0,n=Array(a);o<a;o++)n[o]=c[o];return n}function t(c){if(Array.isArray(c))return e(c)}function r(c,a){if(!(c instanceof a))throw new TypeError("Cannot call a class as a function")}function i(c,a){for(var o=0;o<a.length;o++){var n=a[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(c,x(n.key),n)}}function s(c,a,o){return a&&i(c.prototype,a),o&&i(c,o),Object.defineProperty(c,"prototype",{writable:!1}),c}function l(c,a,o){return(a=x(a))in c?Object.defineProperty(c,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):c[a]=o,c}function h(c){if(typeof Symbol!="undefined"&&c[Symbol.iterator]!=null||c["@@iterator"]!=null)return Array.from(c)}function d(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function f(c,a){var o=Object.keys(c);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(c);a&&(n=n.filter(function(g){return Object.getOwnPropertyDescriptor(c,g).enumerable})),o.push.apply(o,n)}return o}function A(c){for(var a=1;a<arguments.length;a++){var o=arguments[a]!=null?arguments[a]:{};a%2?f(Object(o),!0).forEach(function(n){l(c,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(o)):f(Object(o)).forEach(function(n){Object.defineProperty(c,n,Object.getOwnPropertyDescriptor(o,n))})}return c}function m(c){return t(c)||h(c)||P(c)||d()}function B(c,a){if(typeof c!="object"||!c)return c;var o=c[Symbol.toPrimitive];if(o!==void 0){var n=o.call(c,a||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(c)}function x(c){var a=B(c,"string");return typeof a=="symbol"?a:a+""}function w(c){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},w(c)}function P(c,a){if(c){if(typeof c=="string")return e(c,a);var o={}.toString.call(c).slice(8,-1);return o==="Object"&&c.constructor&&(o=c.constructor.name),o==="Map"||o==="Set"?Array.from(c):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(c,a):void 0}}var R=typeof window!="undefined"&&typeof window.document!="undefined",M=R?window:{},Q=R&&M.document.documentElement?"ontouchstart"in M.document.documentElement:!1,S=R?"PointerEvent"in M:!1,k="cropper",H="all",te="crop",j="move",T="zoom",X="e",W="w",re="s",V="n",ne="ne",pe="nw",ye="se",Ge="sw",qe="".concat(k,"-crop"),Bt="".concat(k,"-disabled"),oe="".concat(k,"-hidden"),Et="".concat(k,"-hide"),Ze="".concat(k,"-invisible"),Ke="".concat(k,"-modal"),dt="".concat(k,"-move"),_e="".concat(k,"Action"),Je="".concat(k,"Preview"),Wt="crop",Rr="move",Sr="none",Yt="crop",zt="cropend",jt="cropmove",Vt="cropstart",kr="dblclick",Si=Q?"touchstart":"mousedown",ki=Q?"touchmove":"mousemove",Qi=Q?"touchend touchcancel":"mouseup",Qr=S?"pointerdown":Si,Tr=S?"pointermove":ki,Fr=S?"pointerup pointercancel":Qi,Or="ready",Lr="resize",Ur="wheel",qt="zoom",Gr="image/jpeg",Ti=/^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,Fi=/^data:/,Oi=/^data:image\/jpeg;base64,/,yt=/\s+/,Li=/^(img|canvas)$/i,Nr=200,Hr=100,$r={viewMode:0,dragMode:Wt,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:Nr,minContainerHeight:Hr,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},Ui='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',Gi=Number.isNaN||M.isNaN,Zt=Number.isFinite||M.isFinite;function F(c){return typeof c=="number"&&!Gi(c)}var Xr=function(a){return a>0&&a<1/0};function Kt(c){return typeof c=="undefined"}function Re(c){return w(c)==="object"&&c!==null}var Ni=Object.prototype.hasOwnProperty;function et(c){if(!Re(c))return!1;try{var a=c.constructor,o=a.prototype;return a&&o&&Ni.call(o,"isPrototypeOf")}catch(n){return!1}}function q(c){return typeof c=="function"}var Hi=Array.prototype.slice;function Wr(c){return Array.from?Array.from(c):Hi.call(c)}function Z(c,a){return c&&q(a)&&(Array.isArray(c)||F(c.length)?Wr(c).forEach(function(o,n){a.call(c,o,n,c)}):Re(c)&&Object.keys(c).forEach(function(o){a.call(c,c[o],o,c)})),c}var Y=Object.assign||function(a){for(var o=arguments.length,n=new Array(o>1?o-1:0),g=1;g<o;g++)n[g-1]=arguments[g];return Re(a)&&n.length>0&&n.forEach(function(u){Re(u)&&Object.keys(u).forEach(function(p){a[p]=u[p]})}),a},$i=/\.\d*(?:0|9){12}\d*$/;function tt(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return $i.test(c)?Math.round(c*a)/a:c}var Xi=/^width|height|left|top|marginLeft|marginTop$/;function Se(c,a){var o=c.style;Z(a,function(n,g){Xi.test(g)&&F(n)&&(n="".concat(n,"px")),o[g]=n})}function Wi(c,a){return c.classList?c.classList.contains(a):c.className.split(yt).indexOf(a)>-1}function ae(c,a){if(a){if(F(c.length)){Z(c,function(n){ae(n,a)});return}if(c.classList){c.classList.add(a);return}var o=c.className.trim();o?o.indexOf(a)<0&&(c.className="".concat(o," ").concat(a)):c.className=a}}function Ce(c,a){if(a){if(F(c.length)){Z(c,function(o){Ce(o,a)});return}if(c.classList){c.classList.remove(a);return}c.className.indexOf(a)>=0&&(c.className=c.className.split(yt).filter(function(o){return o&&o!==a}).join(" "))}}function rt(c,a,o){if(a){if(F(c.length)){Z(c,function(n){rt(n,a,o)});return}o?ae(c,a):Ce(c,a)}}var Yi=/([a-z\d])([A-Z])/g;function Jt(c){return typeof c=="string"?c.replace(Yi,"$1-$2").toLowerCase():""}function er(c,a){return Re(c[a])?c[a]:c.dataset?c.dataset[a]:c.getAttribute("data-".concat(Jt(a)))}function ut(c,a,o){Re(o)?c[a]=o:c.dataset?c.dataset[a]=o:c.setAttribute("data-".concat(Jt(a)),o)}function zi(c,a){if(Re(c[a]))try{delete c[a]}catch(o){c[a]=void 0}else if(c.dataset)try{delete c.dataset[a]}catch(o){c.dataset[a]=void 0}else c.removeAttribute("data-".concat(Jt(a)))}var Yr=(function(){var c=!1;if(R){var a=!1,o=function(){},n=Object.defineProperty({},"once",{get:function(){return c=!0,a},set:function(u){a=u}});M.addEventListener("test",o,n),M.removeEventListener("test",o,n)}return c})();function ge(c,a,o){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};if(!(!c||!a||!q(c.removeEventListener))){var g=o;a.trim().split(yt).forEach(function(u){if(!Yr){var p=c.__cropperListeners__||{};p[u]&&p[u][o]&&(g=p[u][o],delete p[u][o],Object.keys(p[u]).length===0&&delete p[u],Object.keys(p).length===0&&delete c.__cropperListeners__)}c.removeEventListener(u,g,n)})}}function ue(c,a,o){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};if(!(!c||!a||!q(c.addEventListener)||!q(o))){var g=o;a.trim().split(yt).forEach(function(u){if(n.once&&!Yr){var p=c.__cropperListeners__||{};g=function(){p[u]&&p[u][o]&&delete p[u][o],c.removeEventListener(u,g,n);for(var _=arguments.length,E=new Array(_),C=0;C<_;C++)E[C]=arguments[C];o.apply(c,E)},p[u]||(p[u]={}),p[u][o]&&c.removeEventListener(u,p[u][o],n),p[u][o]=g,c.__cropperListeners__=p}c.addEventListener(u,g,n)})}}function at(c,a,o){if(!c||!a||!q(c.dispatchEvent))return!1;var n;if(q(Event)&&q(CustomEvent))n=new CustomEvent(a,{detail:o,bubbles:!0,cancelable:!0});else if(Re(document)&&q(document.createEvent))n=document.createEvent("CustomEvent"),n.initCustomEvent(a,!0,!0,o);else return!1;return c.dispatchEvent(n)}function zr(c){if(!c||!q(c.getBoundingClientRect))return{left:0,top:0};var a=c.getBoundingClientRect(),o=document||{},n=o.documentElement,g=n===void 0?{}:n,u=M.pageXOffset||0,p=M.pageYOffset||0;return{left:a.left+(u-(g.clientLeft||0)),top:a.top+(p-(g.clientTop||0))}}var tr=M.location,ji=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i;function jr(c){var a=c.match(ji);return a!==null&&(a[1]!==tr.protocol||a[2]!==tr.hostname||a[3]!==tr.port)}function Vr(c){var a=c.indexOf("#"),o=a>=0?c.slice(a):"",n=a>=0?c.slice(0,a):c,g="timestamp=".concat(new Date().getTime());return"".concat(n).concat(n.indexOf("?")===-1?"?":"&").concat(g).concat(o)}function ft(c){var a=c.rotate,o=c.scaleX,n=c.scaleY,g=c.translateX,u=c.translateY,p=[];F(g)&&g!==0&&p.push("translateX(".concat(g,"px)")),F(u)&&u!==0&&p.push("translateY(".concat(u,"px)")),F(a)&&a!==0&&p.push("rotate(".concat(a,"deg)")),F(o)&&o!==1&&p.push("scaleX(".concat(o,")")),F(n)&&n!==1&&p.push("scaleY(".concat(n,")"));var I=p.length?p.join(" "):"none";return{WebkitTransform:I,msTransform:I,transform:I}}function Vi(c){var a=A({},c),o=0;return Z(c,function(n,g){delete a[g],Z(a,function(u){var p=Math.abs(n.startX-u.startX),I=Math.abs(n.startY-u.startY),_=Math.abs(n.endX-u.endX),E=Math.abs(n.endY-u.endY),C=Math.sqrt(p*p+I*I),v=Math.sqrt(_*_+E*E);if(!(!Zt(C)||!Zt(v)||C===0||v===C)){var y=(v-C)/C;Zt(y)&&Math.abs(y)>Math.abs(o)&&(o=y)}})}),o}function _t(c,a){var o=c.pageX,n=c.pageY,g={endX:o,endY:n};return a?g:A({startX:o,startY:n},g)}function qi(c){var a=0,o=0,n=0;return Z(c,function(g){var u=g.startX,p=g.startY;a+=u,o+=p,n+=1}),a/=n,o/=n,{pageX:a,pageY:o}}function ke(c){var a=c.aspectRatio,o=c.height,n=c.width,g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"contain",u=Xr(n),p=Xr(o);if(u&&p){var I=o*a;g==="contain"&&I>n||g==="cover"&&I<n?o=n/a:n=o*a}else u?o=n/a:p&&(n=o*a);return{width:n,height:o}}function Zi(c){var a=c.width,o=c.height,n=c.degree;if(n=Math.abs(n)%180,n===90)return{width:o,height:a};var g=n%90*Math.PI/180,u=Math.sin(g),p=Math.cos(g),I=a*p+o*u,_=a*u+o*p;return n>90?{width:_,height:I}:{width:I,height:_}}function Ki(c,a,o,n){var g=a.aspectRatio,u=a.naturalWidth,p=a.naturalHeight,I=a.rotate,_=I===void 0?0:I,E=a.scaleX,C=E===void 0?1:E,v=a.scaleY,y=v===void 0?1:v,L=o.aspectRatio,O=o.naturalWidth,z=o.naturalHeight,G=n.fillColor,J=G===void 0?"transparent":G,ie=n.imageSmoothingEnabled,K=ie===void 0?!0:ie,Me=n.imageSmoothingQuality,de=Me===void 0?"low":Me,D=n.maxWidth,N=D===void 0?1/0:D,ee=n.maxHeight,fe=ee===void 0?1/0:ee,Pe=n.minWidth,Ne=Pe===void 0?0:Pe,He=n.minHeight,Qe=He===void 0?0:He,Ie=document.createElement("canvas"),le=Ie.getContext("2d"),$e=ke({aspectRatio:L,width:N,height:fe}),Mt=ke({aspectRatio:L,width:Ne,height:Qe},"cover"),rr=Math.min($e.width,Math.max(Mt.width,O)),ar=Math.min($e.height,Math.max(Mt.height,z)),Kr=ke({aspectRatio:g,width:N,height:fe}),Jr=ke({aspectRatio:g,width:Ne,height:Qe},"cover"),ea=Math.min(Kr.width,Math.max(Jr.width,u)),ta=Math.min(Kr.height,Math.max(Jr.height,p)),fn=[-ea/2,-ta/2,ea,ta];return Ie.width=tt(rr),Ie.height=tt(ar),le.fillStyle=J,le.fillRect(0,0,rr,ar),le.save(),le.translate(rr/2,ar/2),le.rotate(_*Math.PI/180),le.scale(C,y),le.imageSmoothingEnabled=K,le.imageSmoothingQuality=de,le.drawImage.apply(le,[c].concat(m(fn.map(function(An){return Math.floor(tt(An))})))),le.restore(),Ie}var qr=String.fromCharCode;function Ji(c,a,o){var n="";o+=a;for(var g=a;g<o;g+=1)n+=qr(c.getUint8(g));return n}var en=/^data:.*,/;function tn(c){var a=c.replace(en,""),o=atob(a),n=new ArrayBuffer(o.length),g=new Uint8Array(n);return Z(g,function(u,p){g[p]=o.charCodeAt(p)}),n}function rn(c,a){for(var o=[],n=8192,g=new Uint8Array(c);g.length>0;)o.push(qr.apply(null,Wr(g.subarray(0,n)))),g=g.subarray(n);return"data:".concat(a,";base64,").concat(btoa(o.join("")))}function an(c){var a=new DataView(c),o;try{var n,g,u;if(a.getUint8(0)===255&&a.getUint8(1)===216)for(var p=a.byteLength,I=2;I+1<p;){if(a.getUint8(I)===255&&a.getUint8(I+1)===225){g=I;break}I+=1}if(g){var _=g+4,E=g+10;if(Ji(a,_,4)==="Exif"){var C=a.getUint16(E);if(n=C===18761,(n||C===19789)&&a.getUint16(E+2,n)===42){var v=a.getUint32(E+4,n);v>=8&&(u=E+v)}}}if(u){var y=a.getUint16(u,n),L,O;for(O=0;O<y;O+=1)if(L=u+O*12+2,a.getUint16(L,n)===274){L+=8,o=a.getUint16(L,n),a.setUint16(L,1,n);break}}}catch(z){o=1}return o}function nn(c){var a=0,o=1,n=1;switch(c){case 2:o=-1;break;case 3:a=-180;break;case 4:n=-1;break;case 5:a=90,n=-1;break;case 6:a=90;break;case 7:a=90,o=-1;break;case 8:a=-90;break}return{rotate:a,scaleX:o,scaleY:n}}var on={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var a=this.element,o=this.options,n=this.container,g=this.cropper,u=Number(o.minContainerWidth),p=Number(o.minContainerHeight);ae(g,oe),Ce(a,oe);var I={width:Math.max(n.offsetWidth,u>=0?u:Nr),height:Math.max(n.offsetHeight,p>=0?p:Hr)};this.containerData=I,Se(g,{width:I.width,height:I.height}),ae(a,oe),Ce(g,oe)},initCanvas:function(){var a=this.containerData,o=this.imageData,n=this.options.viewMode,g=Math.abs(o.rotate)%180===90,u=g?o.naturalHeight:o.naturalWidth,p=g?o.naturalWidth:o.naturalHeight,I=u/p,_=a.width,E=a.height;a.height*I>a.width?n===3?_=a.height*I:E=a.width/I:n===3?E=a.width/I:_=a.height*I;var C={aspectRatio:I,naturalWidth:u,naturalHeight:p,width:_,height:E};this.canvasData=C,this.limited=n===1||n===2,this.limitCanvas(!0,!0),C.width=Math.min(Math.max(C.width,C.minWidth),C.maxWidth),C.height=Math.min(Math.max(C.height,C.minHeight),C.maxHeight),C.left=(a.width-C.width)/2,C.top=(a.height-C.height)/2,C.oldLeft=C.left,C.oldTop=C.top,this.initialCanvasData=Y({},C)},limitCanvas:function(a,o){var n=this.options,g=this.containerData,u=this.canvasData,p=this.cropBoxData,I=n.viewMode,_=u.aspectRatio,E=this.cropped&&p;if(a){var C=Number(n.minCanvasWidth)||0,v=Number(n.minCanvasHeight)||0;I>1?(C=Math.max(C,g.width),v=Math.max(v,g.height),I===3&&(v*_>C?C=v*_:v=C/_)):I>0&&(C?C=Math.max(C,E?p.width:0):v?v=Math.max(v,E?p.height:0):E&&(C=p.width,v=p.height,v*_>C?C=v*_:v=C/_));var y=ke({aspectRatio:_,width:C,height:v});C=y.width,v=y.height,u.minWidth=C,u.minHeight=v,u.maxWidth=1/0,u.maxHeight=1/0}if(o)if(I>(E?0:1)){var L=g.width-u.width,O=g.height-u.height;u.minLeft=Math.min(0,L),u.minTop=Math.min(0,O),u.maxLeft=Math.max(0,L),u.maxTop=Math.max(0,O),E&&this.limited&&(u.minLeft=Math.min(p.left,p.left+(p.width-u.width)),u.minTop=Math.min(p.top,p.top+(p.height-u.height)),u.maxLeft=p.left,u.maxTop=p.top,I===2&&(u.width>=g.width&&(u.minLeft=Math.min(0,L),u.maxLeft=Math.max(0,L)),u.height>=g.height&&(u.minTop=Math.min(0,O),u.maxTop=Math.max(0,O))))}else u.minLeft=-u.width,u.minTop=-u.height,u.maxLeft=g.width,u.maxTop=g.height},renderCanvas:function(a,o){var n=this.canvasData,g=this.imageData;if(o){var u=Zi({width:g.naturalWidth*Math.abs(g.scaleX||1),height:g.naturalHeight*Math.abs(g.scaleY||1),degree:g.rotate||0}),p=u.width,I=u.height,_=n.width*(p/n.naturalWidth),E=n.height*(I/n.naturalHeight);n.left-=(_-n.width)/2,n.top-=(E-n.height)/2,n.width=_,n.height=E,n.aspectRatio=p/I,n.naturalWidth=p,n.naturalHeight=I,this.limitCanvas(!0,!1)}(n.width>n.maxWidth||n.width<n.minWidth)&&(n.left=n.oldLeft),(n.height>n.maxHeight||n.height<n.minHeight)&&(n.top=n.oldTop),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),this.limitCanvas(!1,!0),n.left=Math.min(Math.max(n.left,n.minLeft),n.maxLeft),n.top=Math.min(Math.max(n.top,n.minTop),n.maxTop),n.oldLeft=n.left,n.oldTop=n.top,Se(this.canvas,Y({width:n.width,height:n.height},ft({translateX:n.left,translateY:n.top}))),this.renderImage(a),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(a){var o=this.canvasData,n=this.imageData,g=n.naturalWidth*(o.width/o.naturalWidth),u=n.naturalHeight*(o.height/o.naturalHeight);Y(n,{width:g,height:u,left:(o.width-g)/2,top:(o.height-u)/2}),Se(this.image,Y({width:n.width,height:n.height},ft(Y({translateX:n.left,translateY:n.top},n)))),a&&this.output()},initCropBox:function(){var a=this.options,o=this.canvasData,n=a.aspectRatio||a.initialAspectRatio,g=Number(a.autoCropArea)||.8,u={width:o.width,height:o.height};n&&(o.height*n>o.width?u.height=u.width/n:u.width=u.height*n),this.cropBoxData=u,this.limitCropBox(!0,!0),u.width=Math.min(Math.max(u.width,u.minWidth),u.maxWidth),u.height=Math.min(Math.max(u.height,u.minHeight),u.maxHeight),u.width=Math.max(u.minWidth,u.width*g),u.height=Math.max(u.minHeight,u.height*g),u.left=o.left+(o.width-u.width)/2,u.top=o.top+(o.height-u.height)/2,u.oldLeft=u.left,u.oldTop=u.top,this.initialCropBoxData=Y({},u)},limitCropBox:function(a,o){var n=this.options,g=this.containerData,u=this.canvasData,p=this.cropBoxData,I=this.limited,_=n.aspectRatio;if(a){var E=Number(n.minCropBoxWidth)||0,C=Number(n.minCropBoxHeight)||0,v=I?Math.min(g.width,u.width,u.width+u.left,g.width-u.left):g.width,y=I?Math.min(g.height,u.height,u.height+u.top,g.height-u.top):g.height;E=Math.min(E,g.width),C=Math.min(C,g.height),_&&(E&&C?C*_>E?C=E/_:E=C*_:E?C=E/_:C&&(E=C*_),y*_>v?y=v/_:v=y*_),p.minWidth=Math.min(E,v),p.minHeight=Math.min(C,y),p.maxWidth=v,p.maxHeight=y}o&&(I?(p.minLeft=Math.max(0,u.left),p.minTop=Math.max(0,u.top),p.maxLeft=Math.min(g.width,u.left+u.width)-p.width,p.maxTop=Math.min(g.height,u.top+u.height)-p.height):(p.minLeft=0,p.minTop=0,p.maxLeft=g.width-p.width,p.maxTop=g.height-p.height))},renderCropBox:function(){var a=this.options,o=this.containerData,n=this.cropBoxData;(n.width>n.maxWidth||n.width<n.minWidth)&&(n.left=n.oldLeft),(n.height>n.maxHeight||n.height<n.minHeight)&&(n.top=n.oldTop),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),this.limitCropBox(!1,!0),n.left=Math.min(Math.max(n.left,n.minLeft),n.maxLeft),n.top=Math.min(Math.max(n.top,n.minTop),n.maxTop),n.oldLeft=n.left,n.oldTop=n.top,a.movable&&a.cropBoxMovable&&ut(this.face,_e,n.width>=o.width&&n.height>=o.height?j:H),Se(this.cropBox,Y({width:n.width,height:n.height},ft({translateX:n.left,translateY:n.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),at(this.element,Yt,this.getData())}},sn={initPreview:function(){var a=this.element,o=this.crossOrigin,n=this.options.preview,g=o?this.crossOriginUrl:this.url,u=a.alt||"The image to preview",p=document.createElement("img");if(o&&(p.crossOrigin=o),p.src=g,p.alt=u,this.viewBox.appendChild(p),this.viewBoxImage=p,!!n){var I=n;typeof n=="string"?I=a.ownerDocument.querySelectorAll(n):n.querySelector&&(I=[n]),this.previews=I,Z(I,function(_){var E=document.createElement("img");ut(_,Je,{width:_.offsetWidth,height:_.offsetHeight,html:_.innerHTML}),o&&(E.crossOrigin=o),E.src=g,E.alt=u,E.style.cssText="display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;",_.innerHTML="",_.appendChild(E)})}},resetPreview:function(){Z(this.previews,function(a){var o=er(a,Je);Se(a,{width:o.width,height:o.height}),a.innerHTML=o.html,zi(a,Je)})},preview:function(){var a=this.imageData,o=this.canvasData,n=this.cropBoxData,g=n.width,u=n.height,p=a.width,I=a.height,_=n.left-o.left-a.left,E=n.top-o.top-a.top;!this.cropped||this.disabled||(Se(this.viewBoxImage,Y({width:p,height:I},ft(Y({translateX:-_,translateY:-E},a)))),Z(this.previews,function(C){var v=er(C,Je),y=v.width,L=v.height,O=y,z=L,G=1;g&&(G=y/g,z=u*G),u&&z>L&&(G=L/u,O=g*G,z=L),Se(C,{width:O,height:z}),Se(C.getElementsByTagName("img")[0],Y({width:p*G,height:I*G},ft(Y({translateX:-_*G,translateY:-E*G},a))))}))}},ln={bind:function(){var a=this.element,o=this.options,n=this.cropper;q(o.cropstart)&&ue(a,Vt,o.cropstart),q(o.cropmove)&&ue(a,jt,o.cropmove),q(o.cropend)&&ue(a,zt,o.cropend),q(o.crop)&&ue(a,Yt,o.crop),q(o.zoom)&&ue(a,qt,o.zoom),ue(n,Qr,this.onCropStart=this.cropStart.bind(this)),o.zoomable&&o.zoomOnWheel&&ue(n,Ur,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),o.toggleDragModeOnDblclick&&ue(n,kr,this.onDblclick=this.dblclick.bind(this)),ue(a.ownerDocument,Tr,this.onCropMove=this.cropMove.bind(this)),ue(a.ownerDocument,Fr,this.onCropEnd=this.cropEnd.bind(this)),o.responsive&&ue(window,Lr,this.onResize=this.resize.bind(this))},unbind:function(){var a=this.element,o=this.options,n=this.cropper;q(o.cropstart)&&ge(a,Vt,o.cropstart),q(o.cropmove)&&ge(a,jt,o.cropmove),q(o.cropend)&&ge(a,zt,o.cropend),q(o.crop)&&ge(a,Yt,o.crop),q(o.zoom)&&ge(a,qt,o.zoom),ge(n,Qr,this.onCropStart),o.zoomable&&o.zoomOnWheel&&ge(n,Ur,this.onWheel,{passive:!1,capture:!0}),o.toggleDragModeOnDblclick&&ge(n,kr,this.onDblclick),ge(a.ownerDocument,Tr,this.onCropMove),ge(a.ownerDocument,Fr,this.onCropEnd),o.responsive&&ge(window,Lr,this.onResize)}},cn={resize:function(){if(!this.disabled){var a=this.options,o=this.container,n=this.containerData,g=o.offsetWidth/n.width,u=o.offsetHeight/n.height,p=Math.abs(g-1)>Math.abs(u-1)?g:u;if(p!==1){var I,_;a.restore&&(I=this.getCanvasData(),_=this.getCropBoxData()),this.render(),a.restore&&(this.setCanvasData(Z(I,function(E,C){I[C]=E*p})),this.setCropBoxData(Z(_,function(E,C){_[C]=E*p})))}}},dblclick:function(){this.disabled||this.options.dragMode===Sr||this.setDragMode(Wi(this.dragBox,qe)?Rr:Wt)},wheel:function(a){var o=this,n=Number(this.options.wheelZoomRatio)||.1,g=1;this.disabled||(a.preventDefault(),!this.wheeling&&(this.wheeling=!0,setTimeout(function(){o.wheeling=!1},50),a.deltaY?g=a.deltaY>0?1:-1:a.wheelDelta?g=-a.wheelDelta/120:a.detail&&(g=a.detail>0?1:-1),this.zoom(-g*n,a)))},cropStart:function(a){var o=a.buttons,n=a.button;if(!(this.disabled||(a.type==="mousedown"||a.type==="pointerdown"&&a.pointerType==="mouse")&&(F(o)&&o!==1||F(n)&&n!==0||a.ctrlKey))){var g=this.options,u=this.pointers,p;a.changedTouches?Z(a.changedTouches,function(I){u[I.identifier]=_t(I)}):u[a.pointerId||0]=_t(a),Object.keys(u).length>1&&g.zoomable&&g.zoomOnTouch?p=T:p=er(a.target,_e),Ti.test(p)&&at(this.element,Vt,{originalEvent:a,action:p})!==!1&&(a.preventDefault(),this.action=p,this.cropping=!1,p===te&&(this.cropping=!0,ae(this.dragBox,Ke)))}},cropMove:function(a){var o=this.action;if(!(this.disabled||!o)){var n=this.pointers;a.preventDefault(),at(this.element,jt,{originalEvent:a,action:o})!==!1&&(a.changedTouches?Z(a.changedTouches,function(g){Y(n[g.identifier]||{},_t(g,!0))}):Y(n[a.pointerId||0]||{},_t(a,!0)),this.change(a))}},cropEnd:function(a){if(!this.disabled){var o=this.action,n=this.pointers;a.changedTouches?Z(a.changedTouches,function(g){delete n[g.identifier]}):delete n[a.pointerId||0],o&&(a.preventDefault(),Object.keys(n).length||(this.action=""),this.cropping&&(this.cropping=!1,rt(this.dragBox,Ke,this.cropped&&this.options.modal)),at(this.element,zt,{originalEvent:a,action:o}))}}},hn={change:function(a){var o=this.options,n=this.canvasData,g=this.containerData,u=this.cropBoxData,p=this.pointers,I=this.action,_=o.aspectRatio,E=u.left,C=u.top,v=u.width,y=u.height,L=E+v,O=C+y,z=0,G=0,J=g.width,ie=g.height,K=!0,Me;!_&&a.shiftKey&&(_=v&&y?v/y:1),this.limited&&(z=u.minLeft,G=u.minTop,J=z+Math.min(g.width,n.width,n.left+n.width),ie=G+Math.min(g.height,n.height,n.top+n.height));var de=p[Object.keys(p)[0]],D={x:de.endX-de.startX,y:de.endY-de.startY},N=function(fe){switch(fe){case X:L+D.x>J&&(D.x=J-L);break;case W:E+D.x<z&&(D.x=z-E);break;case V:C+D.y<G&&(D.y=G-C);break;case re:O+D.y>ie&&(D.y=ie-O);break}};switch(I){case H:E+=D.x,C+=D.y;break;case X:if(D.x>=0&&(L>=J||_&&(C<=G||O>=ie))){K=!1;break}N(X),v+=D.x,v<0&&(I=W,v=-v,E-=v),_&&(y=v/_,C+=(u.height-y)/2);break;case V:if(D.y<=0&&(C<=G||_&&(E<=z||L>=J))){K=!1;break}N(V),y-=D.y,C+=D.y,y<0&&(I=re,y=-y,C-=y),_&&(v=y*_,E+=(u.width-v)/2);break;case W:if(D.x<=0&&(E<=z||_&&(C<=G||O>=ie))){K=!1;break}N(W),v-=D.x,E+=D.x,v<0&&(I=X,v=-v,E-=v),_&&(y=v/_,C+=(u.height-y)/2);break;case re:if(D.y>=0&&(O>=ie||_&&(E<=z||L>=J))){K=!1;break}N(re),y+=D.y,y<0&&(I=V,y=-y,C-=y),_&&(v=y*_,E+=(u.width-v)/2);break;case ne:if(_){if(D.y<=0&&(C<=G||L>=J)){K=!1;break}N(V),y-=D.y,C+=D.y,v=y*_}else N(V),N(X),D.x>=0?L<J?v+=D.x:D.y<=0&&C<=G&&(K=!1):v+=D.x,D.y<=0?C>G&&(y-=D.y,C+=D.y):(y-=D.y,C+=D.y);v<0&&y<0?(I=Ge,y=-y,v=-v,C-=y,E-=v):v<0?(I=pe,v=-v,E-=v):y<0&&(I=ye,y=-y,C-=y);break;case pe:if(_){if(D.y<=0&&(C<=G||E<=z)){K=!1;break}N(V),y-=D.y,C+=D.y,v=y*_,E+=u.width-v}else N(V),N(W),D.x<=0?E>z?(v-=D.x,E+=D.x):D.y<=0&&C<=G&&(K=!1):(v-=D.x,E+=D.x),D.y<=0?C>G&&(y-=D.y,C+=D.y):(y-=D.y,C+=D.y);v<0&&y<0?(I=ye,y=-y,v=-v,C-=y,E-=v):v<0?(I=ne,v=-v,E-=v):y<0&&(I=Ge,y=-y,C-=y);break;case Ge:if(_){if(D.x<=0&&(E<=z||O>=ie)){K=!1;break}N(W),v-=D.x,E+=D.x,y=v/_}else N(re),N(W),D.x<=0?E>z?(v-=D.x,E+=D.x):D.y>=0&&O>=ie&&(K=!1):(v-=D.x,E+=D.x),D.y>=0?O<ie&&(y+=D.y):y+=D.y;v<0&&y<0?(I=ne,y=-y,v=-v,C-=y,E-=v):v<0?(I=ye,v=-v,E-=v):y<0&&(I=pe,y=-y,C-=y);break;case ye:if(_){if(D.x>=0&&(L>=J||O>=ie)){K=!1;break}N(X),v+=D.x,y=v/_}else N(re),N(X),D.x>=0?L<J?v+=D.x:D.y>=0&&O>=ie&&(K=!1):v+=D.x,D.y>=0?O<ie&&(y+=D.y):y+=D.y;v<0&&y<0?(I=pe,y=-y,v=-v,C-=y,E-=v):v<0?(I=Ge,v=-v,E-=v):y<0&&(I=ne,y=-y,C-=y);break;case j:this.move(D.x,D.y),K=!1;break;case T:this.zoom(Vi(p),a),K=!1;break;case te:if(!D.x||!D.y){K=!1;break}Me=zr(this.cropper),E=de.startX-Me.left,C=de.startY-Me.top,v=u.minWidth,y=u.minHeight,D.x>0?I=D.y>0?ye:ne:D.x<0&&(E-=v,I=D.y>0?Ge:pe),D.y<0&&(C-=y),this.cropped||(Ce(this.cropBox,oe),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0));break}K&&(u.width=v,u.height=y,u.left=E,u.top=C,this.action=I,this.renderCropBox()),Z(p,function(ee){ee.startX=ee.endX,ee.startY=ee.endY})}},dn={crop:function(){return this.ready&&!this.cropped&&!this.disabled&&(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&ae(this.dragBox,Ke),Ce(this.cropBox,oe),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=Y({},this.initialImageData),this.canvasData=Y({},this.initialCanvasData),this.cropBoxData=Y({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(Y(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),Ce(this.dragBox,Ke),ae(this.cropBox,oe)),this},replace:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return!this.disabled&&a&&(this.isImg&&(this.element.src=a),o?(this.url=a,this.image.src=a,this.ready&&(this.viewBoxImage.src=a,Z(this.previews,function(n){n.getElementsByTagName("img")[0].src=a}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(a))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,Ce(this.cropper,Bt)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,ae(this.cropper,Bt)),this},destroy:function(){var a=this.element;return a[k]?(a[k]=void 0,this.isImg&&this.replaced&&(a.src=this.originalUrl),this.uncreate(),this):this},move:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a,n=this.canvasData,g=n.left,u=n.top;return this.moveTo(Kt(a)?a:g+Number(a),Kt(o)?o:u+Number(o))},moveTo:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a,n=this.canvasData,g=!1;return a=Number(a),o=Number(o),this.ready&&!this.disabled&&this.options.movable&&(F(a)&&(n.left=a,g=!0),F(o)&&(n.top=o,g=!0),g&&this.renderCanvas(!0)),this},zoom:function(a,o){var n=this.canvasData;return a=Number(a),a<0?a=1/(1-a):a=1+a,this.zoomTo(n.width*a/n.naturalWidth,null,o)},zoomTo:function(a,o,n){var g=this.options,u=this.canvasData,p=u.width,I=u.height,_=u.naturalWidth,E=u.naturalHeight;if(a=Number(a),a>=0&&this.ready&&!this.disabled&&g.zoomable){var C=_*a,v=E*a;if(at(this.element,qt,{ratio:a,oldRatio:p/_,originalEvent:n})===!1)return this;if(n){var y=this.pointers,L=zr(this.cropper),O=y&&Object.keys(y).length?qi(y):{pageX:n.pageX,pageY:n.pageY};u.left-=(C-p)*((O.pageX-L.left-u.left)/p),u.top-=(v-I)*((O.pageY-L.top-u.top)/I)}else et(o)&&F(o.x)&&F(o.y)?(u.left-=(C-p)*((o.x-u.left)/p),u.top-=(v-I)*((o.y-u.top)/I)):(u.left-=(C-p)/2,u.top-=(v-I)/2);u.width=C,u.height=v,this.renderCanvas(!0)}return this},rotate:function(a){return this.rotateTo((this.imageData.rotate||0)+Number(a))},rotateTo:function(a){return a=Number(a),F(a)&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=a%360,this.renderCanvas(!0,!0)),this},scaleX:function(a){var o=this.imageData.scaleY;return this.scale(a,F(o)?o:1)},scaleY:function(a){var o=this.imageData.scaleX;return this.scale(F(o)?o:1,a)},scale:function(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a,n=this.imageData,g=!1;return a=Number(a),o=Number(o),this.ready&&!this.disabled&&this.options.scalable&&(F(a)&&(n.scaleX=a,g=!0),F(o)&&(n.scaleY=o,g=!0),g&&this.renderCanvas(!0,!0)),this},getData:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,o=this.options,n=this.imageData,g=this.canvasData,u=this.cropBoxData,p;if(this.ready&&this.cropped){p={x:u.left-g.left,y:u.top-g.top,width:u.width,height:u.height};var I=n.width/n.naturalWidth;if(Z(p,function(C,v){p[v]=C/I}),a){var _=Math.round(p.y+p.height),E=Math.round(p.x+p.width);p.x=Math.round(p.x),p.y=Math.round(p.y),p.width=E-p.x,p.height=_-p.y}}else p={x:0,y:0,width:0,height:0};return o.rotatable&&(p.rotate=n.rotate||0),o.scalable&&(p.scaleX=n.scaleX||1,p.scaleY=n.scaleY||1),p},setData:function(a){var o=this.options,n=this.imageData,g=this.canvasData,u={};if(this.ready&&!this.disabled&&et(a)){var p=!1;o.rotatable&&F(a.rotate)&&a.rotate!==n.rotate&&(n.rotate=a.rotate,p=!0),o.scalable&&(F(a.scaleX)&&a.scaleX!==n.scaleX&&(n.scaleX=a.scaleX,p=!0),F(a.scaleY)&&a.scaleY!==n.scaleY&&(n.scaleY=a.scaleY,p=!0)),p&&this.renderCanvas(!0,!0);var I=n.width/n.naturalWidth;F(a.x)&&(u.left=a.x*I+g.left),F(a.y)&&(u.top=a.y*I+g.top),F(a.width)&&(u.width=a.width*I),F(a.height)&&(u.height=a.height*I),this.setCropBoxData(u)}return this},getContainerData:function(){return this.ready?Y({},this.containerData):{}},getImageData:function(){return this.sized?Y({},this.imageData):{}},getCanvasData:function(){var a=this.canvasData,o={};return this.ready&&Z(["left","top","width","height","naturalWidth","naturalHeight"],function(n){o[n]=a[n]}),o},setCanvasData:function(a){var o=this.canvasData,n=o.aspectRatio;return this.ready&&!this.disabled&&et(a)&&(F(a.left)&&(o.left=a.left),F(a.top)&&(o.top=a.top),F(a.width)?(o.width=a.width,o.height=a.width/n):F(a.height)&&(o.height=a.height,o.width=a.height*n),this.renderCanvas(!0)),this},getCropBoxData:function(){var a=this.cropBoxData,o;return this.ready&&this.cropped&&(o={left:a.left,top:a.top,width:a.width,height:a.height}),o||{}},setCropBoxData:function(a){var o=this.cropBoxData,n=this.options.aspectRatio,g,u;return this.ready&&this.cropped&&!this.disabled&&et(a)&&(F(a.left)&&(o.left=a.left),F(a.top)&&(o.top=a.top),F(a.width)&&a.width!==o.width&&(g=!0,o.width=a.width),F(a.height)&&a.height!==o.height&&(u=!0,o.height=a.height),n&&(g?o.height=o.width/n:u&&(o.width=o.height*n)),this.renderCropBox()),this},getCroppedCanvas:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var o=this.canvasData,n=Ki(this.image,this.imageData,o,a);if(!this.cropped)return n;var g=this.getData(a.rounded),u=g.x,p=g.y,I=g.width,_=g.height,E=n.width/Math.floor(o.naturalWidth);E!==1&&(u*=E,p*=E,I*=E,_*=E);var C=I/_,v=ke({aspectRatio:C,width:a.maxWidth||1/0,height:a.maxHeight||1/0}),y=ke({aspectRatio:C,width:a.minWidth||0,height:a.minHeight||0},"cover"),L=ke({aspectRatio:C,width:a.width||(E!==1?n.width:I),height:a.height||(E!==1?n.height:_)}),O=L.width,z=L.height;O=Math.min(v.width,Math.max(y.width,O)),z=Math.min(v.height,Math.max(y.height,z));var G=document.createElement("canvas"),J=G.getContext("2d");G.width=tt(O),G.height=tt(z),J.fillStyle=a.fillColor||"transparent",J.fillRect(0,0,O,z);var ie=a.imageSmoothingEnabled,K=ie===void 0?!0:ie,Me=a.imageSmoothingQuality;J.imageSmoothingEnabled=K,Me&&(J.imageSmoothingQuality=Me);var de=n.width,D=n.height,N=u,ee=p,fe,Pe,Ne,He,Qe,Ie;N<=-I||N>de?(N=0,fe=0,Ne=0,Qe=0):N<=0?(Ne=-N,N=0,fe=Math.min(de,I+N),Qe=fe):N<=de&&(Ne=0,fe=Math.min(I,de-N),Qe=fe),fe<=0||ee<=-_||ee>D?(ee=0,Pe=0,He=0,Ie=0):ee<=0?(He=-ee,ee=0,Pe=Math.min(D,_+ee),Ie=Pe):ee<=D&&(He=0,Pe=Math.min(_,D-ee),Ie=Pe);var le=[N,ee,fe,Pe];if(Qe>0&&Ie>0){var $e=O/I;le.push(Ne*$e,He*$e,Qe*$e,Ie*$e)}return J.drawImage.apply(J,[n].concat(m(le.map(function(Mt){return Math.floor(tt(Mt))})))),G},setAspectRatio:function(a){var o=this.options;return!this.disabled&&!Kt(a)&&(o.aspectRatio=Math.max(0,a)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(a){var o=this.options,n=this.dragBox,g=this.face;if(this.ready&&!this.disabled){var u=a===Wt,p=o.movable&&a===Rr;a=u||p?a:Sr,o.dragMode=a,ut(n,_e,a),rt(n,qe,u),rt(n,dt,p),o.cropBoxMovable||(ut(g,_e,a),rt(g,qe,u),rt(g,dt,p))}return this}},un=M.Cropper,Zr=(function(){function c(a){var o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(r(this,c),!a||!Li.test(a.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=a,this.options=Y({},$r,et(o)&&o),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return s(c,[{key:"init",value:function(){var o=this.element,n=o.tagName.toLowerCase(),g;if(!o[k]){if(o[k]=this,n==="img"){if(this.isImg=!0,g=o.getAttribute("src")||"",this.originalUrl=g,!g)return;g=o.src}else n==="canvas"&&window.HTMLCanvasElement&&(g=o.toDataURL());this.load(g)}}},{key:"load",value:function(o){var n=this;if(o){this.url=o,this.imageData={};var g=this.element,u=this.options;if(!u.rotatable&&!u.scalable&&(u.checkOrientation=!1),!u.checkOrientation||!window.ArrayBuffer){this.clone();return}if(Fi.test(o)){Oi.test(o)?this.read(tn(o)):this.clone();return}var p=new XMLHttpRequest,I=this.clone.bind(this);this.reloading=!0,this.xhr=p,p.onabort=I,p.onerror=I,p.ontimeout=I,p.onprogress=function(){p.getResponseHeader("content-type")!==Gr&&p.abort()},p.onload=function(){n.read(p.response)},p.onloadend=function(){n.reloading=!1,n.xhr=null},u.checkCrossOrigin&&jr(o)&&g.crossOrigin&&(o=Vr(o)),p.open("GET",o,!0),p.responseType="arraybuffer",p.withCredentials=g.crossOrigin==="use-credentials",p.send()}}},{key:"read",value:function(o){var n=this.options,g=this.imageData,u=an(o),p=0,I=1,_=1;if(u>1){this.url=rn(o,Gr);var E=nn(u);p=E.rotate,I=E.scaleX,_=E.scaleY}n.rotatable&&(g.rotate=p),n.scalable&&(g.scaleX=I,g.scaleY=_),this.clone()}},{key:"clone",value:function(){var o=this.element,n=this.url,g=o.crossOrigin,u=n;this.options.checkCrossOrigin&&jr(n)&&(g||(g="anonymous"),u=Vr(n)),this.crossOrigin=g,this.crossOriginUrl=u;var p=document.createElement("img");g&&(p.crossOrigin=g),p.src=u||n,p.alt=o.alt||"The image to crop",this.image=p,p.onload=this.start.bind(this),p.onerror=this.stop.bind(this),ae(p,Et),o.parentNode.insertBefore(p,o.nextSibling)}},{key:"start",value:function(){var o=this,n=this.image;n.onload=null,n.onerror=null,this.sizing=!0;var g=M.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(M.navigator.userAgent),u=function(E,C){Y(o.imageData,{naturalWidth:E,naturalHeight:C,aspectRatio:E/C}),o.initialImageData=Y({},o.imageData),o.sizing=!1,o.sized=!0,o.build()};if(n.naturalWidth&&!g){u(n.naturalWidth,n.naturalHeight);return}var p=document.createElement("img"),I=document.body||document.documentElement;this.sizingImage=p,p.onload=function(){u(p.width,p.height),g||I.removeChild(p)},p.src=n.src,g||(p.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",I.appendChild(p))}},{key:"stop",value:function(){var o=this.image;o.onload=null,o.onerror=null,o.parentNode.removeChild(o),this.image=null}},{key:"build",value:function(){if(!(!this.sized||this.ready)){var o=this.element,n=this.options,g=this.image,u=o.parentNode,p=document.createElement("div");p.innerHTML=Ui;var I=p.querySelector(".".concat(k,"-container")),_=I.querySelector(".".concat(k,"-canvas")),E=I.querySelector(".".concat(k,"-drag-box")),C=I.querySelector(".".concat(k,"-crop-box")),v=C.querySelector(".".concat(k,"-face"));this.container=u,this.cropper=I,this.canvas=_,this.dragBox=E,this.cropBox=C,this.viewBox=I.querySelector(".".concat(k,"-view-box")),this.face=v,_.appendChild(g),ae(o,oe),u.insertBefore(I,o.nextSibling),Ce(g,Et),this.initPreview(),this.bind(),n.initialAspectRatio=Math.max(0,n.initialAspectRatio)||NaN,n.aspectRatio=Math.max(0,n.aspectRatio)||NaN,n.viewMode=Math.max(0,Math.min(3,Math.round(n.viewMode)))||0,ae(C,oe),n.guides||ae(C.getElementsByClassName("".concat(k,"-dashed")),oe),n.center||ae(C.getElementsByClassName("".concat(k,"-center")),oe),n.background&&ae(I,"".concat(k,"-bg")),n.highlight||ae(v,Ze),n.cropBoxMovable&&(ae(v,dt),ut(v,_e,H)),n.cropBoxResizable||(ae(C.getElementsByClassName("".concat(k,"-line")),oe),ae(C.getElementsByClassName("".concat(k,"-point")),oe)),this.render(),this.ready=!0,this.setDragMode(n.dragMode),n.autoCrop&&this.crop(),this.setData(n.data),q(n.ready)&&ue(o,Or,n.ready,{once:!0}),at(o,Or)}}},{key:"unbuild",value:function(){if(this.ready){this.ready=!1,this.unbind(),this.resetPreview();var o=this.cropper.parentNode;o&&o.removeChild(this.cropper),Ce(this.element,oe)}}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=un,c}},{key:"setDefaults",value:function(o){Y($r,et(o)&&o)}}])})();return Y(Zr.prototype,on,sn,ln,cn,hn,dn),Zr}))});var Ii=na((wr,Br)=>{(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof wr!="undefined"?t():(t(),e.FileSaver={})})(wr,function(){"use strict";function e(d,f){return typeof f=="undefined"?f={autoBom:!1}:typeof f!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),f={autoBom:!f}),f.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(d.type)?new Blob(["\uFEFF",d],{type:d.type}):d}function t(d,f,A){var m=new XMLHttpRequest;m.open("GET",d),m.responseType="blob",m.onload=function(){h(m.response,f,A)},m.onerror=function(){console.error("could not download file")},m.send()}function r(d){var f=new XMLHttpRequest;f.open("HEAD",d,!1);try{f.send()}catch(A){}return 200<=f.status&&299>=f.status}function i(d){try{d.dispatchEvent(new MouseEvent("click"))}catch(A){var f=document.createEvent("MouseEvents");f.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),d.dispatchEvent(f)}}var s=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:void 0,l=s.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),h=s.saveAs||(typeof window!="object"||window!==s?function(){}:"download"in HTMLAnchorElement.prototype&&!l?function(d,f,A){var m=s.URL||s.webkitURL,B=document.createElement("a");f=f||d.name||"download",B.download=f,B.rel="noopener",typeof d=="string"?(B.href=d,B.origin===location.origin?i(B):r(B.href)?t(d,f,A):i(B,B.target="_blank")):(B.href=m.createObjectURL(d),setTimeout(function(){m.revokeObjectURL(B.href)},4e4),setTimeout(function(){i(B)},0))}:"msSaveOrOpenBlob"in navigator?function(d,f,A){if(f=f||d.name||"download",typeof d!="string")navigator.msSaveOrOpenBlob(e(d,A),f);else if(r(d))t(d,f,A);else{var m=document.createElement("a");m.href=d,m.target="_blank",setTimeout(function(){i(m)})}}:function(d,f,A,m){if(m=m||open("","_blank"),m&&(m.document.title=m.document.body.innerText="downloading..."),typeof d=="string")return t(d,f,A);var B=d.type==="application/octet-stream",x=/constructor/i.test(s.HTMLElement)||s.safari,w=/CriOS\/[\d]+/.test(navigator.userAgent);if((w||B&&x||l)&&typeof FileReader!="undefined"){var P=new FileReader;P.onloadend=function(){var Q=P.result;Q=w?Q:Q.replace(/^data:[^;]*;/,"data:attachment/file;"),m?m.location.href=Q:location=Q,m=null},P.readAsDataURL(d)}else{var R=s.URL||s.webkitURL,M=R.createObjectURL(d);m?m.location=M:location.href=M,m=null,setTimeout(function(){R.revokeObjectURL(M)},4e4)}});s.saveAs=h.saveAs=h,typeof Br!="undefined"&&(Br.exports=h)})});function b(e,t,r){return(e&255)<<0|(t&255)<<8|(r&255)<<16}var Dt=[b(0,0,0),b(255,255,255)],Ws=[b(0,0,0),b(255,128,64),b(64,255,128),b(128,64,255),b(255,255,255)],Ys=[0,16777215,b(163,64,69),b(125,235,228),b(174,70,186),b(94,202,84),b(60,57,200),b(255,255,111),b(174,96,47),b(110,73,0),b(232,122,128),b(92,92,92),b(143,143,143),b(179,255,167),b(129,126,255),b(199,199,199)],Be=[b(0,0,0),b(255,255,255),b(129,51,56),b(117,206,200),b(142,60,151),b(86,172,77),b(46,44,155),b(237,241,113),b(142,80,41),b(85,56,0),b(196,108,113),b(74,74,74),b(123,123,123),b(169,255,159),b(112,109,235),b(178,178,178)],ir=[b(0,0,0),b(255,255,255),b(120,41,34),b(135,214,221),b(170,95,182),b(85,160,73),b(64,49,141),b(191,206,114),b(170,116,73),b(234,180,137),b(184,105,98),b(199,255,255),b(234,159,246),b(148,224,137),b(128,113,204),b(255,255,178)],la=[b(0,0,0),b(0,0,0),b(33,200,66),b(94,220,120),b(84,85,237),b(125,118,252),b(212,82,77),b(66,235,245),b(252,85,84),b(255,121,120),b(212,193,84),b(230,206,128),b(33,176,59),b(201,91,186),b(204,204,204),b(255,255,255)],Rt=[5395026,11796480,10485760,11599933,7602281,91,95,6208,12048,543240,26368,1196544,7153664,0,0,0,12899815,16728064,14421538,16729963,14090399,6818519,6588,21681,27227,35843,43776,2918400,10777088,0,0,0,16316664,16755516,16742785,16735173,16730354,14633471,4681215,46327,57599,58229,259115,7911470,15065624,7895160,0,0,16777215,16773822,16300216,16300248,16758527,16761855,13095423,10148607,8973816,8650717,12122296,16119980,16777136,16308472,0,0],ca=[b(0,0,0),b(255,68,253),b(20,245,60),b(20,207,253),b(255,106,60),b(255,255,255)],nr=[b(0,0,0),b(227,30,96),b(96,78,189),b(255,68,253),b(0,163,96),b(156,156,156),b(20,207,253),b(208,195,255),b(96,114,3),b(255,106,60),b(156,156,156),b(255,160,208),b(20,245,60),b(208,221,141),b(114,255,208),b(255,255,255)],ha=[0,2368548,4737096,7171437,9539985,11974326,14342874,16777215,12255269,14680137,16716142,16725394,16734903,16744155,16753663,16762879,11534409,13959277,16318866,16721334,16730842,16740095,16749311,16758783,10420330,12779662,15138995,16718039,16727291,16736767,16745983,16755199,8847495,11206827,13631696,15994612,16724735,16733951,16743423,16752639,6946975,9306307,11731175,14092287,16461055,16732415,16741631,16751103,4784304,7143637,9568505,11929087,14297599,16731647,16741119,16750335,2425019,4784352,7209215,9570047,12004095,14372863,16741375,16750847,191,2359523,4718847,7146495,9515263,11949311,14318079,16752127,187,224,2294015,4658431,7092735,9461247,11895551,14264063,176,213,249,2367999,4736511,7105279,9539327,11908095,159,195,3303,209151,2577919,4946431,7380735,9749247,135,171,7888,17140,681983,3050495,5484543,7853311,106,3470,12723,22231,31483,1548031,3916799,6285311,73,8557,17810,27318,36570,373759,2742271,5176575,4389,13641,23150,32402,41911,51163,2026495,4456447,9472,18724,27976,37485,46737,56246,1834970,4194303,14080,23296,32803,42055,51564,60816,2031541,4456409,18176,27648,36864,46116,55624,392556,2752401,5177269,21760,30976,40192,49667,58919,1572683,3932016,6291348,24320,33536,43008,52224,716810,3079982,5504851,7864183,25856,35328,44544,250368,2619136,4980503,7405371,9764703,26624,35840,45312,2413824,4782336,7143173,9568041,11927374,26112,35584,2338560,4707328,7141376,9502464,11927326,14286659,24832,2393344,4762112,7196160,9564928,11992832,14352155,16711487,2447360,4815872,7250176,9618688,12052992,14417664,16776990,16777027,4803328,7172096,9606144,11974912,14343424,16776965,16777001,16777038,6962176,9330688,11764992,14133504,16502272,16773655,16777019,16777055,8858112,11226880,13660928,16029440,16759818,16769070,16777043,16777079,10426112,12794624,15163392,16745475,16754727,16764235,16773488,16777108,11534848,13969152,16337664,16740388,16749640,16759148,16768401,16777141,12255232,14684928,16725795,16735047,16744556,16753808,16763317,16772569],Te=[0,0,4210752,4210752,7105644,7105644,9474192,9474192,11579568,11579568,13158600,13158600,14474460,14474460,16053492,16053492,17476,17476,1074276,1074276,2393220,2393220,3448992,3448992,4241592,4241592,5296336,5296336,6088936,6088936,6880508,6880508,10352,10352,1328260,1328260,2645144,2645144,3963052,3963052,5016764,5016764,6070476,6070476,6862044,6862044,7915756,7915756,6276,6276,1586328,1586328,3166380,3166380,4745408,4745408,6062288,6062288,7378144,7378144,8431852,8431852,9747708,9747708,136,136,2105500,2105500,3947696,3947696,5789888,5789888,7368912,7368912,8947936,8947936,10526956,10526956,11842812,11842812,6029432,6029432,7610508,7610508,8928416,8928416,10246320,10246320,11563200,11563200,12616912,12616912,13671644,13671644,14725356,14725356,7864392,7864392,9445472,9445472,10763384,10763384,12081292,12081292,13398176,13398176,14451892,14451892,15506628,15506628,16560340,16560340,8650772,8650772,9969712,9969712,11287628,11287628,12605544,12605544,13660284,13660284,14715028,14715028,15507624,15507624,16561340,16561340,8912896,8912896,10231836,10231836,11550776,11550776,12606544,12606544,13661288,13661288,14716028,14716028,15508624,15508624,16562340,16562340,8132608,8132608,9451548,9451548,11031608,11031608,12349520,12349520,13404264,13404264,14457980,14457980,15512720,15512720,16566436,16566436,6040576,6040576,7883804,7883804,9463864,9463864,11306064,11306064,12622952,12622952,13939836,13939836,15256720,15256720,16572580,16572580,2898944,2898944,4742172,4742172,6585400,6585400,8428624,8428624,9745512,9745512,11325564,11325564,12641424,12641424,13958308,13958308,15360,15360,2120736,2120736,4226112,4226112,6069340,6069340,7648372,7648372,9228428,9228428,10806436,10806436,12123320,12123320,14356,14356,1858612,1858612,3701840,3701840,5281900,5281900,6861956,6861956,8178844,8178844,9495732,9495732,10812616,10812616,12332,12332,1855564,1855564,3436648,3436648,5016708,5016708,6596764,6596764,7913652,7913652,8967372,8967372,10284256,10284256,10308,10308,1591396,1591396,3172484,3172484,4490400,4490400,5807288,5807288,7124176,7124176,8178920,8178920,9232636,9232636],or=[0,11141120,43520,11184640,170,11141290,21930,11184810,5592405,16733525,5635925,16777045,5592575,16733695,5636095,16777215],da=[0,43520,170,21930],ua=[0,11184640,11141290,11184810],fa=[0,11184640,170,11184810],Aa=[0,5635925,5592575,5636095],ma=[0,16777045,16733695,16777215],pa=[0,16776960,5592575,16777215],ga=it(2,2,2),ba=it(3,3,2),xa=it(4,4,4),sr=it(3,3,3),lr=it(1,1,1),Xe=[b(0,0,0),b(1,0,206),b(207,1,0),b(207,1,206),b(0,207,21),b(1,207,207),b(207,207,21),b(207,207,207),b(0,0,0),b(2,0,253),b(255,2,1),b(255,2,253),b(0,255,28),b(2,255,255),b(255,255,29),b(255,255,255)],Fe=[b(0,0,0),b(0,117,255),b(255,76,57),b(209,185,81),b(9,185,0),b(48,223,16),b(255,229,1),b(255,255,255),b(140,140,140),b(40,229,192),b(255,160,46),b(100,103,0),b(255,41,255),b(140,143,255),b(124,237,0),b(196,43,252)],cr=[0,8388752,16711680,128,8388736,16711808,255,8388863,16711935,32768,8421376,16744448,32896,8421504,16744576,33023,8421631,16744703,65280,8453888,16776960,65408,8454016,16777088,65535,8454143,16777215],Ca=[0,1911635,8267091,34641,11227702,6248271,12764103,16773608,16711757,16753408,16772135,58422,2731519,8615580,16742312,16764074],Ia=[1313820,4465716,3159149,5130831,8735792,3433764,13649480,7696737,5864910,13794604,8754593,7186988,13806233,7193290,14341214,14610134],va=[16579836,16724307,183389,4931571],wa=[997391,3170864,1027212,1035436];var hr=it(4,4,4);var At=hr,Ba=hr,Ea=hr,Ae=wn(),ya=Bn(),St=[b(48,210,0),b(245,245,128),b(76,58,180),b(154,50,54)],kt=[b(216,216,216),b(65,175,113),b(216,110,240),b(212,127,0)];function it(e,t,r){for(var i=1<<e+t+r,s=255/((1<<e)-1),l=255/((1<<t)-1),h=255/((1<<r)-1),d=new Uint32Array(i),f=0;f<i;f++){var A=f&(1<<e)-1,m=f>>e&(1<<t)-1,B=f>>e+t&(1<<r)-1;d[f]=b(A*s,m*l,B*h)}return d}function wn(){let e=new Uint32Array(32768),t=0;for(let r=0;r<32;++r)for(let i=0;i<32;++i)for(let s=0;s<32;++s,++t){let l=r<<3|i<<11|s<<19;l|=(r&28)>>2|(i&28)>>2<<8|(s&28)>>2<<16,e[t]=l}return e}function Bn(){let e=new Uint32Array(2048),t=0;for(let r=0;r<16;++r)for(let i=0;i<16;++i)for(let s=0;s<8;++s,++t){let l=r<<4|i<<12|s<<21;e[t]=l}return e}var mt=[{id:"c64.multi",name:"C-64 Multi",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Be,block:{w:4,h:8,colors:4,xb:1,yb:2},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},toNative:"exportC64Multi"},{id:"c64.multi.fli",name:"C-64 Multi FLI (w/o bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Be,block:{w:4,h:1,colors:4,xb:1},paletteChoices:{background:!0},cell:{w:4,h:8,msbToLsb:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.bug",name:"C-64 Multi FLI (with bug)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Be,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank.left",name:"C-64 Multi FLI (Left blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Be,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!1,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.multi.fli.blank",name:"C-64 Multi FLI (L/R blank)",width:160,height:200,scaleX:.936*2,conv:"VICII_Canvas",pal:Be,block:{w:4,h:1,colors:4,xb:1},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0},cb:{w:4,h:8,xb:1,yb:2},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Multi"},{id:"c64.hires",name:"C-64 Hires",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Be,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},toNative:"exportC64Hires"},{id:"c64.hires.fli",name:"C-64 Hires FLI (w/o bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Be,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.bug",name:"C-64 Hires FLI (with bug)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Be,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!0,blankLeft:!1,blankRight:!1,blankColumns:3},toNative:"exportC64Hires"},{id:"c64.hires.fli.blank",name:"C-64 Hires FLI (L/R blank)",width:320,height:200,scaleX:.936,conv:"VICII_Canvas",pal:Be,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},param:{extra:1},fli:{bug:!1,blankLeft:!0,blankRight:!0,blankColumns:3},toNative:"exportC64Hires"},{id:"nes",name:"NES (4 color, 240 tiles)",width:160,height:96,scaleX:8/7,conv:"DitheringCanvas",pal:Rt,reduce:4,toNative:"exportNES"},{id:"msx",name:"MSX/Coleco (TMS9918A)",width:256,height:192,conv:"Msx_Canvas",pal:la,block:{w:8,h:1,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportTMS9918"},{id:"apple2.hires",name:"Apple ][ (Hires)",width:140,height:192,scaleX:2,conv:"Apple2_Canvas",pal:ca,block:{w:7,h:1,colors:4},toNative:"exportApple2HiresToHGR"},{id:"atari8.d",name:"Atari ANTIC (Mode D)",width:160,height:96,scaleX:.8571,conv:"DitheringCanvas",pal:Te,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"atari8.f.10",name:"Atari ANTIC (Mode F/10)",width:80,height:192,scaleX:.8571*4,conv:"DitheringCanvas",pal:Te,reduce:9,toNative:"exportFrameBuffer",exportFormat:{bpp:4,brev:!0}},{id:"vcs",name:"Atari VCS",width:40,height:192,scaleX:6,conv:"DitheringCanvas",pal:Te,reduce:2,toNative:"exportVCSPlayfield"},{id:"vcs.color",name:"Atari VCS (Color)",width:40,height:192,scaleX:6,conv:"VCSColorPlayfield_Canvas",pal:Te,toNative:"exportVCSPlayfield"},{id:"astrocade",name:"Bally Astrocade",width:160,height:98,scaleX:1,conv:"DitheringCanvas",pal:ha,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,brev:!0}},{id:"zx",name:"ZX Spectrum",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:Xe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},toNative:"exportZXSpectrum"},{id:"zx.dark",name:"ZX Spectrum (dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:Xe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},toNative:"exportZXSpectrum"},{id:"zx.bright",name:"ZX Spectrum (bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:Xe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},toNative:"exportZXSpectrum"},{id:"zx.dark.bright",name:"ZX Spectrum (dark made bright only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:Xe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:0,max:7}},customize:{flipPalette:!0},toNative:"exportZXSpectrum"},{id:"zx.bright.dark",name:"ZX Spectrum (bright made dark only)",width:256,height:192,conv:"ZXSpectrum_Canvas",pal:Xe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{colorsRange:{min:8,max:15}},customize:{flipPalette:!0},toNative:"exportZXSpectrum"},{id:"cpc.mode0",name:"Amstrad CPC (mode 0)",width:160,height:200,scaleX:2,conv:"DitheringCanvas",pal:cr,reduce:16,toNative:"exportFrameBuffer",exportFormat:{bpp:4,yremap:[3,80,2048],bitremap:[7,3,5,1,6,2,4,0]}},{id:"cpc.mode1",name:"Amstrad CPC (mode 1)",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:cr,reduce:4,toNative:"exportFrameBuffer",exportFormat:{bpp:2,yremap:[3,80,2048],bitremap:[7,3,6,2,5,1,4,0]}},null,{id:"vic20.hires",name:"VIC-20 Hires",width:160,height:160,scaleX:1.5,conv:"VICII_Canvas",pal:ir,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicHires"},{id:"vic20.multi",name:"VIC-20 Multi",width:80,height:160,scaleX:3,conv:"VICII_Canvas",pal:ir,block:{w:4,h:8,colors:4},cell:{w:4,h:8,msbToLsb:!0},paletteChoices:{background:!0,backgroundRange:{min:0,max:15},aux:!0,auxRange:{min:0,max:15},border:!0,borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},toNative:"exportVicMulti"},{id:"nes.1bpp",name:"NES (1bpp) (8x8) (32x32) Planar",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:2,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:1},auxRange:{min:0,max:1},borderRange:{min:0,max:1},colorsRange:{min:0,max:1}},reduce:2,customize:{outputTileset:!1,outputPalette:!0},toNative:"exportSNES"},{id:"nes.2bpp",name:"NES (2bpp) (8x8) (32x32) Planar",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},reduce:4,customize:{outputTileset:!1,outputPalette:!0},toNative:"exportSNES"},{id:"snes.2bpp",name:"SNES (+Gameboy/GBC) (2bpp) (8x8) (32x32) Planar",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},customize:{outputTileset:!1,outputPalette:!1,planeToMemory:"interleaved"},reduce:4,toNative:"exportSNES"},{id:"snes.3bpp",name:"SNES (3bpp) (8x8) (32x32) Planar",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:8,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:7},auxRange:{min:0,max:7},borderRange:{min:0,max:7},colorsRange:{min:0,max:7}},reduce:8,customize:{planeToMemory:"interleaved"},toNative:"exportSNES"},{id:"snes.4bpp",name:"SNES (4bpp) (8x8) (32x32) Planar",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{planeToMemory:"interleaved"},reduce:16,toNative:"exportSNES"},{id:"snes.8bpp",name:"SNES (8bpp) (8x8) (32x32) Planar",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{planeToMemory:"interleaved"},reduce:256,toNative:"exportSNES"},{id:"snes.mode7",name:"SNES (Mode 7) (8bpp) (8x8) (32x32)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{bitsInPlane:8,planes:1},reduce:256,toNative:"exportSNES"},{id:"neo.geopocket",name:"NEO Geo Pocket Color (2pp) (8x8) (32x32)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:256,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:255},auxRange:{min:0,max:255},borderRange:{min:0,max:255},colorsRange:{min:0,max:255}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:2,planes:1,planeLittleEndian:!1},reduce:256,toNative:"exportSNES"},{id:"virtualboy",name:"Virtual Boy (2pp) (8x8) (32x32)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:4,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:3},auxRange:{min:0,max:3},borderRange:{min:0,max:3},colorsRange:{min:0,max:3}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:2,planes:1,planeLittleEndian:!0},reduce:4,toNative:"exportSNES"},{id:"gg.4pp",name:"Game Gear (+Sega Master Systems/Wonder Color) (4bpp) (8x8) (32x32) Linear",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{outputTileset:!1,outputPalette:!1,planeToMemory:"linear"},reduce:16,toNative:"exportSNES"},{id:"genesis",name:"Genesis/x68k (4pp) (8x8) (32x32)",width:256,height:256,scaleX:1,conv:"SNES_Canvas",pal:Ae,block:{w:8,h:8,colors:16,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},auxRange:{min:0,max:15},borderRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{outputTileset:!1,outputPalette:!1,bitsInPlane:4,planes:1,planeLittleEndian:!0},reduce:16,toNative:"exportSNES"},{id:"snes.8bpp.direct",name:"SNES (8bpp) (8x8) (32x32) Direct Color",width:256,height:256,scaleX:1,conv:"SNES_Canvas_Direct",pal:ya,block:{w:8,h:8,colors:2048,msbToLsb:!1},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:2047},auxRange:{min:0,max:2047},borderRange:{min:0,max:2047},colorsRange:{min:0,max:2047}},customize:{outputTileset:!0,outputPalette:!1,transformColor:"bbgggrrr",planes:8},toNative:"exportSNES"},{id:"stic",name:"Intellivision STIC (GRAM/GROM) (FGBG)",width:64,height:64,conv:"Stic_Fgbg_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},paletteChoices:{backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticFgbg"},{id:"stic.stack.grom",name:"Intellivision STIC (GROM only) (Color Stack Mode)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8,xb:0,yb:0},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticColorStack"},{id:"stic.stack.gram",name:"Intellivision STIC (GRAM only) (Color Stack Mode)",width:64,height:64,conv:"Stic_ColorStack_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:15}},toNative:"exportSticColorStack"},{id:"stic.stack.gromram",name:"Intellivision STIC (GROM+GRAM) (Color Stack Mode)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0,xb:0,yb:0},cb:{w:8,h:8},param:{cell:!0,extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},toNative:"exportSticColorStack"},{id:"stic.stack.grom.single",name:"Intellivision STIC (GROM only) (Single BG Color Stack)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8,xb:0,yb:0},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"stic.stack.gram.single",name:"Intellivision STIC (GRAM only) (Single BG Color Stack)",width:64,height:64,conv:"Stic_ColorStack_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0},cb:{w:8,h:8},param:{extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:15}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"stic.stack.gromram.single",name:"Intellivision STIC (GROM+GRAM) (Single BG Color Stack)",width:160,height:96,conv:"Stic_ColorStack_Canvas",pal:Fe,block:{w:8,h:8,colors:2},cell:{w:8,h:8,msbToLsb:!0,xb:0,yb:0},cb:{w:8,h:8},param:{cell:!0,extra:4},paletteChoices:{colors:1,backgroundRange:{min:0,max:15},colorsRange:{min:0,max:7}},customize:{singleColor:!0},toNative:"exportSticColorStack"},{id:"nes4f",name:"NES (4 color, full screen)",width:256,height:240,scaleX:8/7,conv:"DitheringCanvas",pal:Rt,reduce:4,toNative:"exportNES"},{id:"nes5f",name:"NES (5 color, full screen)",width:256,height:240,scaleX:8/7,conv:"NES_Canvas",pal:Rt,reduce:5,toNative:"exportNES"},{id:"atari7800.160a",name:"Atari 7800 (160A)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:Te,reduce:4},{id:"atari7800.160b",name:"Atari 7800 (160B)",width:160,height:240,scaleX:2,conv:"DitheringCanvas",pal:Te,reduce:12},{id:"sms",name:"Sega Master System",width:176,height:144,scaleX:8/7,conv:"DitheringCanvas",pal:ga,reduce:16},{id:"sms-gg",name:"Sega GameGear",width:160,height:144,scaleX:1.2,conv:"DitheringCanvas",pal:Ea,reduce:16},{id:"bbcmicro.mode2",name:"BBC Micro (mode 2)",width:160,height:256,scaleX:2,conv:"DitheringCanvas",pal:lr},{id:"apple2.lores",name:"Apple ][ (Lores)",width:40,height:48,scaleX:1.5,conv:"DitheringCanvas",pal:nr,toNative:"exportFrameBuffer",exportFormat:{bpp:4}},{id:"apple2.dblhires",name:"Apple ][ (Double-Hires)",width:140,height:192,scaleX:2,conv:"DitheringCanvas",pal:nr},{id:"appleiigs.320.16",name:"Apple IIGS (16 colors)",width:320,height:200,conv:"DitheringCanvas",pal:Ba,reduce:16},{id:"channelf",name:"Fairchild Channel F",width:102,height:58,conv:"DitheringCanvas",pal:va,reduce:4},{id:"mac",name:"Mac 128K",width:512,height:342,conv:"DitheringCanvas",pal:Dt},{id:"x86.cga.04h.1",name:"PC CGA (Mode 04h, palette 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:da,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.1B",name:"PC CGA (Mode 04h, bright 1)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:Aa,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2",name:"PC CGA (Mode 04h, palette 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:ua,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.04h.2B",name:"PC CGA (Mode 04h, bright 2)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:ma,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h",name:"PC CGA (Mode 05h)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:fa,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.cga.05h.B",name:"PC CGA (Mode 05h, bright)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:pa,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:2}},{id:"x86.ega.0dh",name:"PC EGA (Mode 0Dh)",width:320,height:200,scaleX:200/320*1.37,conv:"DitheringCanvas",pal:or,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"x86.ega.10h",name:"PC EGA (Mode 10h)",width:640,height:350,scaleX:350/640*1.37,conv:"DitheringCanvas",pal:or,toNative:"exportFrameBuffer",exportFormat:{bpp:1,np:4}},{id:"williams",name:"Williams Arcade",width:304,height:256,conv:"DitheringCanvas",pal:ba,reduce:16},{id:"mcr2",name:"Bally MCR-II (4bpp) (8x8) (32x30)",width:256,height:240,scaleX:1,conv:"SNES_Canvas",pal:xa,block:{w:16,h:16,colors:4},cell:{w:16,h:16,msbToLsb:!0},reduce:64,toNative:"exportSNES"},{id:"pico8",name:"PICO-8",width:128,height:128,conv:"DitheringCanvas",pal:Ca},{id:"tic80",name:"TIC-80",width:240,height:136,conv:"DitheringCanvas",pal:Ia},{id:"gb",name:"Game Boy Classic",width:160,height:144,scaleX:10/9,conv:"DitheringCanvas",pal:wa},{id:"amiga.lores",name:"Amiga (Lores)",width:320,height:256,conv:"DitheringCanvas",pal:At,reduce:32},{id:"amiga.lores.ham6",name:"Amiga (Lores, HAM6)",width:320,height:256,conv:"HAM6_Canvas",pal:At,reduce:16,extraColors:48},{id:"cx16.lores",name:"Commander X16 (Lores)",width:320,height:240,scaleX:1,conv:"DitheringCanvas",pal:At,reduce:256},{id:"cx16.hires",name:"Commander X16 (Hires, cropped)",width:640,height:400,scaleX:1,conv:"DitheringCanvas",pal:At,reduce:16},{id:"compucolor",name:"Compucolor",width:160,height:192,scaleX:1.6,conv:"Compucolor_Canvas",pal:Xe,block:{w:2,h:4,colors:2}},{id:"teletext",name:"Teletext",width:80,height:72,scaleX:4/3,conv:"Teletext_Canvas",pal:lr,block:{w:2,h:3,colors:2}},{id:"atarist",name:"Atari ST",width:320,height:200,scaleX:1,conv:"DitheringCanvas",pal:sr,reduce:16},{id:"MC6847.CG2.palette0",name:"MC6847 (CG2, palette 0)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:St,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG2.palette1",name:"MC6847 (CG2, palette 1)",width:128,height:64,scaleX:1/1.3,conv:"DitheringCanvas",pal:kt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette0",name:"MC6847 (CG3, palette 0)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:St,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG3.palette1",name:"MC6847 (CG3, palette 1)",width:128,height:96,scaleX:1/1.3*96/64,conv:"DitheringCanvas",pal:kt,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette0",name:"MC6847 (CG6, palette 0)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:St,reduce:4,toNative:"exportMC6847"},{id:"MC6847.CG6.palette1",name:"MC6847 (CG6, palette 1)",width:128,height:192,scaleX:1/1.3*192/64,conv:"DitheringCanvas",pal:kt,reduce:4,toNative:"exportMC6847"},{id:"vcs.48",name:"Atari VCS (48x48 bitmap)",width:48,height:48,conv:"DitheringCanvas",pal:Te,reduce:2},{id:"pce.256x240",name:"PC Engine (256x240)",width:256,height:240,scaleX:5/4,conv:"DitheringCanvas",pal:sr,reduce:16},{id:"phememo-d30.landscape",name:"Phomemo D30 (landscape)",width:288,height:88,conv:"DitheringCanvas",pal:Dt},{id:"phememo-d30.portrait",name:"Phomemo D30 (portrait)",width:88,height:288,conv:"DitheringCanvas",pal:Dt}],Qt={};mt.forEach(e=>{e&&(Qt[e.id||e.name]=e)});var Ar={};oa(Ar,{bitOverlayUint8Array:()=>ot,exportApple2HiresToHGR:()=>Pn,exportC64Hires:()=>Tn,exportC64Multi:()=>Qn,exportCombinedImageAndColorCellBuffer:()=>Ee,exportFrameBuffer:()=>Pa,exportMC6847:()=>eo,exportNES:()=>Zn,exportNES5Color:()=>Kn,exportSNES:()=>qn,exportSticColorStack:()=>Hn,exportSticFgbg:()=>Gn,exportTMS9918:()=>Xn,exportVCSPlayfield:()=>Jn,exportVicHires:()=>Fn,exportVicMulti:()=>On,exportZXSpectrum:()=>Un,getSnesBitplanCellMapper:()=>Ra,getSnesTilemapMapper:()=>Sa});function ce(e,t){return t||(t=2),yn(e,t,16)}function yn(e,t,r){try{for(var i=e.toString(r).toUpperCase();i.length<t;)i="0"+i;return i}catch(s){return e+""}}function be(e,t){e||(t==null?console.assert(e):console.assert(e,t))}function nt(e,t){return e.map(r=>t.indexOf(r&16777215))}function pt(e,t,r,i){if(t==0)return[];let s=e,l=[];for(;t>0;)l.push(s&r),s>>=i,--t;return l}function xe(e,t,r){return pt(e,t,r.paletteBitFilter,r.paletteBits)}function Tt(e,t,r,i,s){return r==0?[]:(be(e<t.length),pt(t[e],r,i,s))}function dr(e,t,r,i){return Tt(e,t,r,i.paletteBitFilter,i.paletteBits)}function Mn(e,t){if(!t)return e;for(var r=0,i=0;i<t.length;i++){var s=t[i];s<0&&(s=-s-1,r^=1<<s),e&1<<i&&(r^=1<<s)}return r}function _a(e,t){t.destfmt&&(t=t.destfmt);var r=t.w,i=t.h,s=t.count||1,l=t.bpp||1,h=t.np||1,d=t.bpw||8,f=t.sl||Math.ceil(t.w*l/d),A=(1<<l)-1,m=t.pofs||f*i*s,B=t.skip||0,x;h>0&&t.sl?x=new Uint8Array(f*i*s):t.yremap?x=new Uint8Array(s*((i>>t.yremap[0])*t.yremap[1]+((1<<t.yremap[0])-1)*t.yremap[2])):d<=8?x=new Uint8Array(f*i*s*h):x=new Uint32Array(f*i*s*h);for(var w=0;w<s;w++)for(var P=e[w],R=0,M=0;M<i;M++){var Q=t.flip?i-1-M:M,S=w*f*i+Q*f;t.yremap&&(S=(M>>t.yremap[0])*t.yremap[1]+(M&(1<<t.yremap[0])-1)*t.yremap[2]);for(var k=0,H=0;H<r;H++){var te=P[R++]&255,j=Mn(S,t.remap);if(t.bitremap)for(var T=0;T<(t.bpp||1);T++)te&1<<T&&(x[j]|=1<<t.bitremap[k+T]);else for(var T=0;T<h;T++){var X=te>>T*l&A;x[j+T*m+B]|=t.brev?X<<d-k-l:X<<k}k+=l,k>=d&&(S+=1,k=0)}}return x}function Ma(e){var t=0;e.forEach(i=>{t+=i.length});var r=new Uint8Array(t);return t=0,e.forEach(i=>{r.set(i,t),t+=i.length}),r}function Pa(e,t){var r=t.exportFormat;if(!r)throw"No export format";return r.w=e.width,r.h=e.height,new Uint8Array(_a([e.indexed],r))}function Pn(e,t){for(var r=new Uint8Array(8192),i=0,s=0;s<e.height;s++)for(var l=(s&7)*1024+(s>>3&7)*128+(s>>6)*40,h=0;h<e.width;h+=7){for(var d=0,f=0,A=0;A<7;A++){var m=e.indexed[i++]&255;(m==3||m==4)&&(f|=128),m>=3&&(m-=2),d|=m<<A*2}r[l++]=d&127|f,r[l++]=d>>7&127|f}return r}function ot(e,t,r,i,s,l){l=l===void 0?!0:l;let h=(1<<s)-1,f=(r&h)<<i;h<<=i,t+=l?0:(s+i-1)/8;let A=l?1:-1;for(let m=s+i;m>0;m-=8,t+=A){let x=(-1^h)&255,w=f&255;be(t<e.length),e[t]=e[t]&x|w,f>>=8,h>>=8}}function Dn(e,t){if(t===void 0)return;let r=t.fullPaletteMode===void 0?e.fullPaletteMode:t.fullPaletteMode;if(t.prepare===void 0)throw'The "prepare" method is required.';let i,s=()=>(i=t.prepare(),i.littleEndian=i.littleEndian===void 0?!0:i.littleEndian,i),l=t.paramToBitPattern!==void 0?t.paramToBitPattern:(f,A,m)=>{if(r)return A;let B=pt(f,t.colors===void 0?e.colors:t.colors,t.paletteBitFilter===void 0?e.paletteBitFilter:t.paletteBitFilter,t.paletteBits===void 0?e.paletteBits:t.paletteBits);if(t.globalColorsBitPattern!==void 0){for(let x=0;x<t.globalColorsBitPattern.length;++x)if(A==t.globalColorsBitPattern[x].paletteIndex)return t.globalColorsBitPattern[x].bitPattern}if(t.globalColorToBitPattern!==void 0){let x=t.globalColorToBitPattern(f,A,m);if(x!==void 0)return x}if(t.colorToBitPattern!==void 0){let x=t.colorToBitPattern(f,A,m);if(x!==void 0)return x}for(let x=0;x<B.length&&x<t.colorsBitPattern.length;++x)if(A==B[x])return t.colorsBitPattern[x];return console.log("global nor param color does not contain color from image",e,t,f,A,m),be(!1),0},h=t.iterate!==void 0?t.iterate:f=>{let A=t.params===void 0?e.params:t.params,m=t.indexed===void 0?e.indexed:t.indexed;if(t.xyToBitInfo!==void 0){if(m===void 0||A===void 0&&!r)throw'Both "params" and "indexed" must be defined.';for(let B=0,x=0;x<(t.height===void 0?e.height:t.height);++x)for(let w=0;w<(t.width===void 0?e.width:t.width);++w,++B){let P=t.xyToBitInfo(w,x);be(A===void 0||P.paramOffset<A.length);let R=l(A===void 0?0:A[P.paramOffset],m[B],P);ot(f,P.offset,R,P.bitShift,P.bitCount,i.littleEndian)}}};return{prepare:s,prefill:t.prefill,iterate:t.iterate===void 0?h:t.iterate,commit:t.commit,finalize:t.finalize,xyToBitInfo:t.xyToBitInfo,paramToBitPattern:l,globalColorsBitPattern:t.globalColorsBitPattern===void 0?[]:t.globalColorsBitPattern,globalColorToBitPattern:t.globalColorToBitPattern,colorsBitPattern:t.colorsBitPattern,colorToBitPattern:t.colorToBitPattern}}function Rn(e,t){if(t!==void 0){if("prepare"in t)return Dn(e,t);if("data"in t)return{prepare(){return{data:t.data()}}};throw'Either "prepare" or "data" on a "CellExporterMapper" or "DataMapper" must be defined.'}}function Sn(e,t,r){if(r===void 0||!e)return;let i;if(r.prepare===void 0)throw'The "prepare" method is required.';let s=()=>(i=r.prepare(),i.littleEndian=i.littleEndian===void 0?!0:i.littleEndian,i),l=()=>{let d=r.params===void 0?t.params:r.params;if(!(r.paramToBitInfo===void 0&&r.paramToBitPattern===void 0)){if(r.paramToBitInfo===void 0||r.paramToBitPattern===void 0||d===void 0)throw'All of "paramToBitInfo" and "paramToBitPattern" and "params" must be defined.';for(let f=0;f<d.length;f++){let A=d[f],m=r.paramToBitInfo(f),B=r.paramToBitPattern(A,m);ot(i.data,m.offset,B,m.bitShift,m.bitCount,i.littleEndian)}}};return{prepare:s,prefill:r.prefill,iterate:r.iterate===void 0?l:r.iterate,commit:r.commit,finalize:r.finalize,params:r.params===void 0?t.params:r.params,paramToBitInfo:r.paramToBitInfo,paramToBitPattern:r.paramToBitPattern}}function Ft(e,t,r){if(!(!e||r===void 0)){if("prepare"in r)return Sn(e,t,r);if("data"in r)return{prepare(){return{data:r.data()}}};throw'Either "prepare" or "data" on a "ParamExporterMapper" or "DataMapper" must be defined.'}}function Ee(e){let t=Rn({width:e.content.width,height:e.content.height,params:e.content.blockParams,indexed:e.message.indexed,colors:e.content.block.colors,fullPaletteMode:e.content.fullPaletteMode,paletteBitFilter:e.content.paletteBitFilter,paletteBits:e.content.paletteBits},e.cellMapper),r=Ft(e.colorParamMapper!==void 0,{params:e.content.blockParams},e.colorParamMapper),i=Ft(e.content.paramInfo.cb,{params:e.content.cbParams},e.colorBlockParamMapper),s=Ft(e.content.paramInfo.cell,{params:e.content.cellParams},e.cellParamMapper),l=Ft(e.content.paramInfo.extra>0,{params:e.content.extraParams},e.extraParamMapper),h=[t,r,i,s,l],d=h.filter(x=>x!==void 0),f=[],A=[];for(let x=0;x<h.length;++x){let w=h[x];if(w===void 0){A.push(void 0);continue}let P=w.prepare();f.push(P),A.push(P.data)}for(let x=0;x<d.length;++x){let w=d[x];w.prefill!==void 0&&w.prefill(f[x].data)}for(let x=0;x<d.length;++x){let w=d[x];w.iterate!==void 0&&w.iterate(f[x].data)}for(let x=0;x<d.length;++x){let w=d[x];w.commit!==void 0&&w.commit(f[x].data)}let m=!0;for(let x=0;m;++x){m=!1;for(let w=0;w<d.length;++w){let P=d[w];P.finalize!==void 0&&(m=P.finalize(w,A[0],A[1],A[2],A[3],A[4])||m)}}let B=A.filter(x=>x!==void 0);return e.reorderArrays!==void 0&&(B=e.reorderArrays(B)),Ma(B)}function We(e,t){let r=e.bitsPerColor,i=e.cell.w*r,s=e.cell.h*i,l=Math.ceil(s/8),h=0;return we(ve({},t),{prepare(){return h=e.block.columns*l,{data:new Uint8Array(e.width*e.height*r/8)}},xyToBitInfo(f,A){let m=Math.floor(f/e.block.w),B=Math.floor(f/e.cell.w),x=Math.floor(A/e.cell.h),w=Math.floor(A/e.block.h)*e.block.columns+m,P=l*B,R=h*x,M=Math.floor(f%e.cell.w*r/8),Q=Math.floor(A%e.cell.h*i/8),S=e.cell.msbToLsb?i-(f%e.cell.w+1)*r:f%e.cell.w*r;return{offset:R+P+Q+M,bitShift:S,bitCount:r,paramOffset:w}}})}function gt(e,t){let r=e.fliMode,i=e.bitsPerColor,s=0;return we(ve({},t),{prepare(){let h=e.cell.columns*e.cell.rows;return s=1<<Math.ceil(Math.log2(h)),{data:new Uint8Array(r?s*e.cell.h:e.cell.columns*e.cell.rows)}},paramToBitInfo(h){let d=0;return r?d=(Math.floor(h/e.cell.columns)&e.cell.h-1)*s+Math.floor(h/(i*e.width))*e.cell.columns+h%e.cell.columns:d=h,{offset:d,bitShift:0,bitCount:8,paramOffset:h}}})}function kn(e,t){return we(ve({},t),{prepare(){return{data:new Uint8Array(e.cb.columns*e.cb.rows)}},paramToBitInfo(i){return{offset:i,bitShift:0,bitCount:8,paramOffset:i}}})}function Qn(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:We(r,{globalColorsBitPattern:[{paletteIndex:r.backgroundColor&15,bitPattern:0}],colorsBitPattern:[2,1,3]}),colorParamMapper:gt(r,{paramToBitPattern(i,s){let l=xe(i,2,r);return l[0]|l[1]<<4}}),colorBlockParamMapper:kn(r,{paramToBitPattern(i,s){return xe(i,1,r)[0]}}),extraParamMapper:{data(){let i=new Uint8Array(2);return i[0]=r.backgroundColor&15|(r.auxColor&15)<<4,i[1]=r.borderColor&15,i}}})}function Tn(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:We(r,{colorsBitPattern:[1,0]}),colorParamMapper:gt(r,{paramToBitPattern(i,s){let l=xe(i,2,r);return l[0]<<4|l[1]}}),extraParamMapper:{data(){let i=new Uint8Array(2);return i[0]=r.backgroundColor&15|(r.auxColor&15)<<4,i[1]=r.borderColor&15,i}}})}function Fn(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:We(r,{globalColorsBitPattern:[{paletteIndex:r.backgroundColor,bitPattern:0}],colorsBitPattern:[1]}),colorParamMapper:gt(r,{paramToBitPattern(i,s){return xe(i,1,r)[0]}}),extraParamMapper:{data(){let i=new Uint8Array(3);return i[0]=r.backgroundColor,i[1]=r.borderColor,i[2]=r.auxColor,i}}})}function On(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:We(r,{globalColorsBitPattern:[{paletteIndex:r.backgroundColor,bitPattern:0},{paletteIndex:r.borderColor,bitPattern:1},{paletteIndex:r.auxColor,bitPattern:3}],colorsBitPattern:[2]}),colorParamMapper:gt(r,{paramToBitPattern(i,s){return xe(i,1,r)[0]}}),extraParamMapper:{data(){let i=new Uint8Array(3);return i[0]=r.backgroundColor,i[1]=r.borderColor,i[2]=r.auxColor,i}}})}function Ln(e,t){let r=e.bitsPerColor,i=e.cell.w*r;return we(ve({},t),{prepare(){return{data:new Uint8Array(e.width*e.height*e.bitsPerColor/8)}},xyToBitInfo(l,h){let d=Math.floor(l/e.block.w),f=Math.floor(h/e.block.h)*e.block.columns+d,A=Math.floor(l/e.block.w),m=(h&192)>>6<<11|(h&7)>>0<<8|(h&56)>>3<<5|(A&31)>>0<<0,B=e.cell.msbToLsb?i-(l%e.cell.w+1)*r:l%e.cell.w*r;return{offset:m,bitShift:B,bitCount:r,paramOffset:f}}})}function Un(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:Ln(r,{colorsBitPattern:[0,1]}),colorParamMapper:gt(r,{paramToBitPattern(i,s){let l=xe(i,2,r);return(l[0]&7)<<3|l[1]&7|(l[0]&8)>>3<<6}})})}function Da(e,t){return we(ve({},t),{prepare(){let i=20,s=12;return{data:new Uint8Array(i*s*2),littleEndian:!0}},prefill(i){let s=7,l=0,h=0,d=0,f=s|(l&3)<<9|(l&4)>>2<<13|(l&8)>>3<<12|h<<3<<(d<<11),A=f&255,m=(f&65280)>>8;for(let w=0;w<i.length;++w)w%2==0?i[w]=A:i[w]=m;let B=360,x=[45,65,68,69,0,66,89,0,36,73,84,72,69,82,84,83,79,78];for(let w=0;w<x.length;++w){let P=s|(l&3)<<9|(l&4)>>2<<13|(l&8)>>3<<12|x[w]<<3<<(d<<11),R=P&255,M=(P&65280)>>8;i[B+w*2]=R,i[B+w*2+1]=M}},paramToBitInfo(i){let s=Math.floor(i/Math.floor(e.width/e.block.w)),l=i%Math.floor(e.width/e.block.w);return{offset:(s*20+l)*2,bitShift:0,bitCount:16,paramOffset:i}}})}function Gn(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:We(r,{colorsBitPattern:[0,1]}),colorParamMapper:Da(r,{paramToBitPattern(i,s){let l=xe(i,2,r),h=l[0],d=l[1],f=1,A=s.paramOffset&63;return h|(d&3)<<9|(d&4)>>2<<13|(d&8)>>3<<12|A<<3<<(f<<11)}})})}function Nn(e,t){return we(ve({},t),{prepare(){let s=8,l=8;return{data:new Uint8Array(s*l*8),littleEndian:!0}},finalize(s,l,h,d,f,A){for(let m=0;m<e.cellParams.length;++m){let B=Tt(m,e.cellParams,2,255,8);if(B[0]==0)continue;let x=B[1]*8,w=m%e.cell.columns,R=Math.floor(m/e.cell.columns)*e.cell.columns*8+w*8;for(let M=0;M<8;++M)f[x+M]=l[R+M]}return!1}})}function Hn(e,t){let r=e.content,i=[0,1],s=We(r,{paramToBitPattern(l,h,d){let f=xe(l,r.paletteChoices.colors,r);for(let m=0;m<r.paletteChoices.colors;++m)if(f[m]==h)return i[1+m];let A=dr(d.paramOffset,r.cbParams,1,r)[0];return A==h?i[0]:(console.log("cb nor param color does not contain color from image",l,h,f,d,A),be(!1),0)}});return Ee({message:e,content:r,cellMapper:s,colorParamMapper:Da(r,{paramToBitPattern(l,h){let d=xe(l,2,r),f=d[0],A=d[1],m=r.block.size=512,B=(f&8)!=0,x=r.paramInfo.cell?Tt(h.paramOffset,r.cellParams,2,255,8):[m?1:0,m?h.paramOffset&63:0],w=x[0]!=0;be(!B||B&&w);let P=w?1:0,R=w?x[1]&63:h.paramOffset&255;return f&7|(f&8)>>3<<12|(A&1)<<13|R<<3<<(P<<11)}}),cellParamMapper:r.paramInfo.cell?Nn(r):void 0,extraParamMapper:{data(){let l=new Uint8Array(r.paramInfo.extra);for(let h=0;h<r.paramInfo.extra;++h)l[h]=dr(h,r.extraParams,1,r)[0];return l}}})}function $n(e,t){return we(ve({},t),{prepare(){return{data:new Uint8Array(e.block.size)}},paramToBitInfo(i){let s=i&31,l=i>>5;return{offset:l&7|s<<3|l>>3<<8,bitShift:0,bitCount:8,paramOffset:i}}})}function Xn(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:We(r,{colorsBitPattern:[0,1]}),colorParamMapper:$n(r,{paramToBitPattern(i,s){let l=xe(i,2,r);return l[0]=l[0]==0?1:l[0],l[1]=l[1]==0?1:l[1],l[0]|l[1]<<4}})})}function Wn(e,t,r,i,s,l,h){let d=s*h.block.w,f=Math.floor(d*h.block.h*e+d*i)/8,A=h.cell.msbToLsb?(h.block.w-(r+1))*s:r*s,m=Math.floor(A/8);return m=l?m:Math.floor(d/8)-m-1,A=A%8,be((f+m)*8<t*d*h.block.h),{offset:f+m,bitShift:A,bitCount:s}}function Yn(e,t,r,i,s,l,h){let d=s*h.block.w,f=(i&1)!=0,A=Math.floor(((d*h.block.h*(e>>1)<<1)+d*i*(f?1:0))/8),m=h.cell.msbToLsb?(h.block.w-(r+1))*s:r*s,B=Math.floor(m/8);return B=l?B:Math.floor(d/8)-B-1,m=m%8,be((A+B)*8<t*d*h.block.h),{offset:A+B,bitShift:m,bitCount:s}}function zn(e,t,r,i,s,l,h){let d=s*h.block.w,f=Math.floor(d*t*i+d*e)/8,A=h.cell.msbToLsb?(h.block.w-(r+1))*s:r*s,m=Math.floor(A/8);return m=l?m:Math.floor(d/8)-m-1,A=A%8,be((f+m)*8<t*d*h.block.h),{offset:f+m,bitShift:A,bitCount:s}}var ur={Default:Wn,interleaved:Yn,linear:zn},fr={Default:jn,bbgggrrr:Vn};function jn(e,t){return e}function Vn(e,t){let r=t[e],i=r&255,s=r>>8&255;return(r>>16&255&192)>>6<<6|(s&224)>>5<<3|(i&224)>>5<<0}function Ra(e,t,r,i){let s=e.indexed,l=0,h=0,d=0,f=0,A=32,m=32;return we(ve({},i),{prepare(){return l=r.customize===void 0?Math.ceil(Math.log2(t.block.colors)):"planes"in r.customize?r.customize.planes:Math.ceil(Math.log2(t.block.colors)),h=t.block.w*t.block.h,d=t.block.columns*t.block.rows,f=r.customize===void 0?1:"bitsInPlane"in r.customize?r.customize.bitsInPlane:1,{data:new Uint8Array(Math.floor(l*f*h*d/8))}},iterate(x){let w=Math.floor(t.block.columns/A),P=Math.floor(t.block.rows/m),R=Math.floor(l*f*h*A*m/8),M=Math.floor(l*f*h/8),Q=M*A,S=r.customize===void 0?ur.Default:"planeToMemory"in r.customize?ur[r.customize.planeToMemory]:ur.Default,k=r.customize===void 0?fr.Default:"transformColor"in r.customize?fr[r.customize.transformColor]:fr.Default,H=(1<<f)-1,te=r.customize===void 0?!0:"planeLittleEndian"in r.customize?r.customize.littleEndian:!0,j=t.block.msbToLsb?(T,X)=>{let W=(l-(T+1))*f,re=X&H<<W;return{extractedBits:re>>W,filteredColor:X^re}}:(T,X)=>{let W=T*f,re=X&H<<W;return{extractedBits:re,filteredColor:X^re}};for(let T=0;T<s.length;++T){let X=Math.floor(T/t.block.w)%t.block.columns,W=Math.floor(T/(t.width*t.block.h)),re=Math.floor(X/A),pe=(Math.floor(W/m)*w+re)*R,ye=X%A,Ge=W%m,qe=k(s[T],r.pal),Bt=T%t.block.w,oe=Math.floor(T/t.width)%t.block.h,Et=Q*Ge+M*ye;for(let Ze=0;Ze<l;++Ze){let{extractedBits:Ke,filteredColor:dt}=j(Ze,qe),_e=S(Ze,l,Bt,oe,f,te,t);qe=dt;let Je=pe+Et+_e.offset;ot(x,Je,Ke,_e.bitShift,_e.bitCount,te)}}}})}function Sa(e,t,r,i){let s=0,l=32,h=32,d=r.customize===void 0?!0:"outputTileset"in r.customize?r.customize.littleEndian:!0,f=r.customize===void 0?!0:"outputPalette"in r.customize?r.customize.littleEndian:!0;return!d&&!f?void 0:we(ve({},i),{prepare(){return s=t.block.columns*t.block.rows,{data:new Uint8Array(2*s*(d?1:0)+(f?t.block.colors:0))}},iterate(m){let B=r.customize===void 0?!1:"tilesetLittleEndian"in r.customize?r.customize.littleEndian:!1;if(d){let x=Math.floor(t.block.columns/l),w=Math.floor(t.block.rows/h),P=Math.floor(l*h*2);for(let R=0;R<t.block.rows;++R)for(let M=0;M<t.block.columns;++M){let Q=Math.floor(M/l),H=(Math.floor(R/h)*x+Q)*P,te=M%l,j=R%h,T=(j*t.block.columns+te)*2,X=H+T,W=pt(t.blockParams[R*M+M],1,3,2),re=0,V=0,ne=W[0]&7,pe=j*l+te&1023,ye=re<<15|V<<14|ne<<10|pe;ot(m,X,ye,0,16,B)}}if(f){let x=d?0:Math.floor(2*s/8);for(let w=0;w<t.block.colors;++w){let P=e.pal[w],R=P&255,M=P>>8&255,Q=P>>16&255,S=R>>3&31|(M>>3&31)<<5|(Q>>3&31)<<10;ot(m,x+w*2,S,0,16,B)}}}})}function qn(e,t){let r=e.content;return Ee({message:e,content:r,cellMapper:Ra(e,r,t,{}),colorParamMapper:Sa(e,r,t,{})})}function Zn(e,t){for(var r=0,i=e.width/8,s=e.height/8,l=new Uint8Array(e.width*e.height*2/8),h=0;h<e.height;h++)for(var d=0;d<e.width;d++){var f=Math.floor(d/8)+Math.floor(h/8)*i,A=f*16+(h&7),m=7-(d&7),B=e.indexed[r]&255;l[A]|=(B&1)<<m,l[A+8]|=(B>>1&1)<<m,r++}return l}function Kn(e,t){if(!t.block)throw"No block size";var r=Pa(e,t),i={w:t.block.w,h:t.block.h,bpp:2},s=new Uint8Array(_a([e.indexed],i));return Ma([r,s])}function Jn(e,t){var r=new Uint8Array(6*e.height);let i=[3,2,1,0,-1,-1,-1,-1,4,5,6,7,8,9,10,11,19,18,17,16,15,14,13,12,23,22,21,20,-1,-1,-1,-1,24,25,26,27,28,29,30,31,39,38,37,36,35,34,33,32];for(var s=0;s<e.height;s++)for(var l=0;l<48;l++){var h=i[l];if(h>=0&&(h+=s*e.width,e.indexed[h])){var d=(l>>3)*e.height+e.height-s-1;r[d]|=128>>(l&7)}}return r}function eo(e,t){var r=new Uint8Array(e.width*e.height/4);let i=0,s=0;for(var l=0;l<e.height;l++)for(var h=0;h<e.width;h+=4,s+=4)r[i++]=((e.indexed[s+0]&3)<<6)+((e.indexed[s+1]&3)<<4)+((e.indexed[s+2]&3)<<2)+((e.indexed[s+3]&3)<<0);return console.log(r),r}var gr={};oa(gr,{getFileViewerCode_apple2_hires:()=>Ao,getFileViewerCode_astrocade:()=>bo,getFileViewerCode_atari8_d:()=>Ha,getFileViewerCode_atari8_f_10:()=>xo,getFileViewerCode_c64_fli:()=>Oe,getFileViewerCode_c64_hires:()=>fo,getFileViewerCode_c64_hires_fli:()=>yo,getFileViewerCode_c64_hires_fli_blank:()=>Mo,getFileViewerCode_c64_hires_fli_bug:()=>_o,getFileViewerCode_c64_multi:()=>uo,getFileViewerCode_c64_multi_fli:()=>Po,getFileViewerCode_c64_multi_fli_blank:()=>Ro,getFileViewerCode_c64_multi_fli_blank_left:()=>So,getFileViewerCode_c64_multi_fli_bug:()=>Do,getFileViewerCode_cpc:()=>pr,getFileViewerCode_cpc_mode0:()=>Bo,getFileViewerCode_cpc_mode1:()=>Eo,getFileViewerCode_msx:()=>po,getFileViewerCode_nes:()=>mo,getFileViewerCode_vcs:()=>go,getFileViewerCode_zx:()=>bt,getFileViewerCode_zx_bright:()=>Io,getFileViewerCode_zx_bright_dark:()=>wo,getFileViewerCode_zx_dark:()=>Co,getFileViewerCode_zx_dark_bright:()=>vo});var mr=`
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
`;var ka=`
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
`;var Qa=`
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
`;var Ta=`
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
`;var Fa=`
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
`;var Oa=`
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
`;var La=`
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
`;var Ua=`
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
`;var Ga=`
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
`;var Na=`
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
`;function uo(){var e=mr;return e=e.replace("$USE_MULTI_MODE","1"),e}function fo(){var e=mr;return e=e.replace("$USE_MULTI_MODE","0"),e}function Ao(){return ka}function mo(){var e=Qa,t=nt(U.lastPixels.pal,U.settings.pal);return e=e.replace("hex 1f;screen color","hex "+ce(t[0])),e=e.replace("hex 01112100;background 0","hex "+ce(t[1])+ce(t[2])+ce(t[3])+ce(0)),e}function po(){return Ta}function go(){var e=Fa,t=nt(U.lastPixels.pal,U.settings.pal);return e=e.replace("#$F6","#$"+ce(t[0])),e=e.replace("#$F7","#$"+ce(t[1])),e}function bo(){var e=Oa,t=nt(U.lastPixels.pal,U.settings.pal);return e=e.replace("$b0","$"+ce(t[0])),e=e.replace("$b1","$"+ce(t[1])),e=e.replace("$b2","$"+ce(t[2])),e=e.replace("$b3","$"+ce(t[3])),e}function Ha(){for(var e=La,t=nt(U.lastPixels.pal,U.settings.pal),r=0;r<t.length;r++)e=e.replace("$00;PF"+r,"$"+ce(t[r]));return e}function xo(){let e=Ha();return e=e.replace(".byte $4d",".byte $4f"),e=e.replace(".byte $0d",".byte $0f"),e=e.replace("#$00;PRIOR","#$80"),e=e.replace("COLOR0+4","PCOLR0+0"),e=e.replace("COLOR0+0","PCOLR0+1"),e=e.replace("COLOR0+1","PCOLR0+2"),e=e.replace("COLOR0+2","PCOLR0+3"),e=e.replace(";GPIOMODE equ 1","GPIOMODE equ 1"),e}function bt(){var e=Ua;return e}function Co(){return bt()}function Io(){return bt()}function vo(){return bt()}function wo(){return bt()}function pr(e){var t=Ga,r=nt(U.lastPixels.pal,U.settings.pal);t=t.replace("$MODE",e+"");for(var i=0;i<16;i++)t=t.replace("$c"+i,"$"+ce(r[i]||0));return t}function Bo(e){return pr(0)}function Eo(e){return pr(1)}function Oe(){var e=Na;return e}function yo(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","0"),e}function _o(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","0"),e}function Mo(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","0"),e}function Po(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","1"),e}function Do(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","1"),e}function Ro(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","1"),e}function So(){let e=Oe();return e=e.replace("$USE_MULTI_MODE","1"),e}var $a=[[1,0,.4375],[-1,1,.1875],[0,1,.3125],[1,1,.0625]],Xa=[[1,0,3/8],[0,1,3/8],[1,1,2/8]],Wa=[[1,0,1/6],[2,0,1/6],[-1,1,1/6],[0,1,1/6],[1,1,1/6],[0,2,1/6]],Ya=[[1,0,4/16],[2,0,3/16],[-2,1,1/16],[-1,1,2/16],[0,1,3/16],[1,1,2/16],[2,1,1/16]],za=[[1,0,2/4],[-1,1,1/4],[0,1,1/4]],ja=[[1,0,8/42],[2,0,4/42],[-2,1,2/42],[1,-1,4/42],[0,1,8/42],[1,1,4/42],[2,1,2/42],[-2,2,1/42],[-1,2,2/42],[0,2,4/42],[1,2,2/42],[2,2,1/42]],Va=[[1,0,.5],[0,1,.5]],qa=[[1,0,1]],Za=[[0,1,1]],Ka=[[0,1,2/4],[0,2,1/4],[1,2,1/4]],Ja=[[1,1,1]],ei=[[0,1,6/16],[-1,1,3/16],[1,1,3/16],[-2,2,1/16],[0,2,2/16],[2,2,1/16]];var Ei=sa(ti());var Qo="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function ri(e){let t=e.replace(/[\r\n=]/g,""),r=t.length,i=new Uint8Array(r*3>>2),s=0,l=0;for(let d=0;d<r;d++)d%4===0&&d&&(i[l++]=s>>16&255,i[l++]=s>>8&255,i[l++]=s&255),s=s<<6|Qo.indexOf(t.charAt(d));let h=r%4*6;return h===0?(i[l++]=s>>16&255,i[l++]=s>>8&255,i[l++]=s&255):h===18?(i[l++]=s>>10&255,i[l++]=s>>2&255):h===12&&(i[l++]=s>>4&255),i}var Ye;function To(){if(typeof Ye!="undefined"||(Ye=!1,typeof WebAssembly=="undefined"))return Ye;try{let e=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),t=new WebAssembly.Module(e);return new WebAssembly.Instance(t,{}).exports.test(4)!==0&&(Ye=!0),Ye}catch(e){}return Ye}var Fo={js:!0,wasm:!0},Oo=class{constructor(e){let t=Object.assign({},Fo,e||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1,!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}has_wasm(){return To()}use(e){return this.__modules[e.name]=e,this.options.wasm&&this.has_wasm()&&e.wasm_fn?this[e.name]=e.wasm_fn:this[e.name]=e.fn,this}init(){return this.__init_promise?this.__init_promise:!this.options.js&&this.options.wasm&&!this.has_wasm()?Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`)):(this.__init_promise=Promise.all(Object.keys(this.__modules).map(e=>{let t=this.__modules[e];return!this.options.wasm||!this.has_wasm()||!t.wasm_fn||this.__wasm[e]?null:WebAssembly.compile(ri(t.wasm_src)).then(r=>{this.__wasm[e]=r})})).then(()=>this),this.__init_promise)}__reallocate(e){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(e/65536)}),this.__memory;let t=this.__memory.buffer.byteLength;return t<e&&this.__memory.grow(Math.ceil((e-t)/65536)),this.__memory}__instance(e,t,r){if(t&&this.__reallocate(t),!this.__wasm[e]){let i=this.__modules[e];this.__wasm[e]=new WebAssembly.Module(ri(i.wasm_src))}if(!this.__cache[e]){let i={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[e]=new WebAssembly.Instance(this.__wasm[e],{env:Object.assign(i,r||{})})}return this.__cache[e]}__align(e,t){t=t||8;let r=e%t;return e+(r?t-r:0)}};function Lo(e){e<.5&&(e=.5);let t=Math.exp(.527076)/e,r=Math.exp(-t),i=Math.exp(-2*t),s=(1-r)*(1-r)/(1+2*t*r-i),l=s,h=s*(t-1)*r,d=s*(t+1)*r,f=-s*i,A=2*r,m=-i,B=(l+h)/(1-A-m),x=(d+f)/(1-A-m);return new Float32Array([l,h,d,f,A,m,B,x])}function ai(e,t,r,i,s,l){let h,d,f,A,m,B,x,w,P,R,M,Q,S,k;for(P=0;P<l;P++){for(B=P*s,x=P,w=0,h=e[B],m=h*i[6],A=m,M=i[0],Q=i[1],S=i[4],k=i[5],R=0;R<s;R++)d=e[B],f=d*M+h*Q+A*S+m*k,m=A,A=f,h=d,r[w]=A,w++,B++;for(B--,w--,x+=l*(s-1),h=e[B],m=h*i[7],A=m,d=h,M=i[2],Q=i[3],R=s-1;R>=0;R--)f=d*M+h*Q+A*S+m*k,m=A,A=f,h=d,d=e[B],t[x]=r[w]+A,B--,w--,x-=l}}function Uo(e,t,r,i){if(!i)return;let s=new Uint16Array(e.length),l=new Float32Array(Math.max(t,r)),h=Lo(i);ai(e,s,l,h,t,r,i),ai(s,e,l,h,r,t,i)}function Go(e,t,r){let i=t*r,s=new Uint16Array(i),l,h,d,f;for(let A=0;A<i;A++)l=e[4*A],h=e[4*A+1],d=e[4*A+2],f=l>=h&&l>=d?l:h>=d&&h>=l?h:d,s[A]=f<<8;return s}function No(e,t,r,i,s,l){let h,d,f,A,m;if(i===0||s<.5)return;s>2&&(s=2);let B=Go(e,t,r),x=new Uint16Array(B);Uo(x,t,r,s);let w=i/100*4096+.5|0,P=l<<8,R=t*r;for(let M=0;M<R;M++)h=B[M],A=h-x[M],Math.abs(A)>=P&&(d=h+(w*A+2048>>12),d=d>65280?65280:d,d=d<0?0:d,h=h!==0?h:1,f=(d<<12)/h|0,m=M*4,e[m]=e[m]*f+2048>>12,e[m+1]=e[m+1]*f+2048>>12,e[m+2]=e[m+2]*f+2048>>12)}function Ho(e,t,r,i,s,l){if(i===0||s<.5)return;s>2&&(s=2);let h=t*r,d=h*4,f=h*2,A=h*2,m=Math.max(t,r)*4,B=32,x=0,w=d,P=w+f,R=P+A,M=R+A,Q=M+m,S=this.__instance("unsharp_mask",d+f+A*2+m+B,{exp:Math.exp}),k=new Uint32Array(e.buffer);new Uint32Array(this.__memory.buffer).set(k);let H=S.exports.hsv_v16||S.exports._hsv_v16;if(!H)throw new Error("WASM hsv_v16 function is not available");if(H(x,w,t,r),H=S.exports.blurMono16||S.exports._blurMono16,!H)throw new Error("WASM blurMono16 function is not available");if(H(w,P,R,M,Q,t,r,s),H=S.exports.unsharp||S.exports._unsharp,!H)throw new Error("WASM unsharp function is not available");H(x,x,w,P,t,r,i,l),k.set(new Uint32Array(this.__memory.buffer,0,h))}var $o={name:"unsharp_mask",fn:No,wasm_fn:Ho,wasm_src:"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"},ii={filter:{box:{win:.5,fn(e){return e<0&&(e=-e),e<.5?1:0}},hamming:{win:1,fn(e){if(e<0&&(e=-e),e>=1)return 0;if(e<11920929e-14)return 1;let t=e*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(e){if(e<0&&(e=-e),e>=2)return 0;if(e<11920929e-14)return 1;let t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(e){if(e<0&&(e=-e),e>=3)return 0;if(e<11920929e-14)return 1;let t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn(e){return e<0&&(e=-e),e>=2.5?0:e>=1.5?-.125*(e-2.5)*(e-2.5):e>=.5?.25*(4*e*e-11*e+7):1.0625-1.75*e*e}}}};function ni(e){return Math.round(e*16383)}function Lt(e,t,r,i,s){let l=ii.filter[e].fn,h=1/i,d=Math.min(1,i),f=ii.filter[e].win/d,A,m,B,x,w,P,R,M,Q,S,k,H,te,j,T,X,W,re=Math.floor((f+1)*2),V=new Int16Array((re+2)*r),ne=0,pe=!V.subarray||!V.set;for(A=0;A<r;A++){for(m=(A+.5)*h+s,B=Math.max(0,Math.floor(m-f)),x=Math.min(t-1,Math.ceil(m+f)),w=x-B+1,P=new Float32Array(w),R=new Int16Array(w),M=0,Q=B,S=0;Q<=x;Q++,S++)k=l((Q+.5-m)*d),M+=k,P[S]=k;for(H=0,S=0;S<P.length;S++)te=P[S]/M,H+=te,R[S]=ni(te);for(R[r>>1]+=ni(1-H),j=0;j<R.length&&R[j]===0;)j++;if(j<R.length){for(T=R.length-1;T>0&&R[T]===0;)T--;if(X=B+j,W=T-j+1,V[ne++]=X,V[ne++]=W,!pe)V.set(R.subarray(j,T+1),ne),ne+=W;else for(S=j;S<=T;S++)V[ne++]=R[S]}else V[ne++]=0,V[ne++]=0}return V}function Le(e){return e<0?0:e>255?255:e}function Ue(e){return e>=0?e:0}function Xo(e,t,r,i,s,l){let h,d,f,A,m,B,x,w,P,R,M,Q=0,S=0;for(P=0;P<i;P++){for(m=0,R=0;R<s;R++){for(B=l[m++],x=l[m++],w=Q+B*4|0,h=d=f=A=0;x>0;x--)M=l[m++],A=A+M*e[w+3]|0,f=f+M*e[w+2]|0,d=d+M*e[w+1]|0,h=h+M*e[w]|0,w=w+4|0;t[S+3]=Ue(A>>7),t[S+2]=Ue(f>>7),t[S+1]=Ue(d>>7),t[S]=Ue(h>>7),S=S+i*4|0}S=(P+1)*4|0,Q=(P+1)*r*4|0}}function Wo(e,t,r,i,s,l){let h,d,f,A,m,B,x,w,P,R,M,Q=0,S=0;for(P=0;P<i;P++){for(m=0,R=0;R<s;R++){for(B=l[m++],x=l[m++],w=Q+B*4|0,h=d=f=A=0;x>0;x--)M=l[m++],A=A+M*e[w+3]|0,f=f+M*e[w+2]|0,d=d+M*e[w+1]|0,h=h+M*e[w]|0,w=w+4|0;h>>=7,d>>=7,f>>=7,A>>=7,t[S+3]=Le(A+8192>>14),t[S+2]=Le(f+8192>>14),t[S+1]=Le(d+8192>>14),t[S]=Le(h+8192>>14),S=S+i*4|0}S=(P+1)*4|0,Q=(P+1)*r*4|0}}function Yo(e,t,r,i,s,l){let h,d,f,A,m,B,x,w,P,R,M,Q,S=0,k=0;for(R=0;R<i;R++){for(B=0,M=0;M<s;M++){for(x=l[B++],w=l[B++],P=S+x*4|0,h=d=f=A=0;w>0;w--)Q=l[B++],m=e[P+3],A=A+Q*m|0,f=f+Q*e[P+2]*m|0,d=d+Q*e[P+1]*m|0,h=h+Q*e[P]*m|0,P=P+4|0;f=f/255|0,d=d/255|0,h=h/255|0,t[k+3]=Ue(A>>7),t[k+2]=Ue(f>>7),t[k+1]=Ue(d>>7),t[k]=Ue(h>>7),k=k+i*4|0}k=(R+1)*4|0,S=(R+1)*r*4|0}}function zo(e,t,r,i,s,l){let h,d,f,A,m,B,x,w,P,R,M,Q=0,S=0;for(P=0;P<i;P++){for(m=0,R=0;R<s;R++){for(B=l[m++],x=l[m++],w=Q+B*4|0,h=d=f=A=0;x>0;x--)M=l[m++],A=A+M*e[w+3]|0,f=f+M*e[w+2]|0,d=d+M*e[w+1]|0,h=h+M*e[w]|0,w=w+4|0;h>>=7,d>>=7,f>>=7,A>>=7,A=Le(A+8192>>14),A>0&&(h=h*255/A|0,d=d*255/A|0,f=f*255/A|0),t[S+3]=A,t[S+2]=Le(f+8192>>14),t[S+1]=Le(d+8192>>14),t[S]=Le(h+8192>>14),S=S+i*4|0}S=(P+1)*4|0,Q=(P+1)*r*4|0}}function jo(e,t,r){let i=3,s=t*r*4|0;for(;i<s;){if(e[i]!==255)return!0;i=i+4|0}return!1}function Vo(e,t,r){let i=3,s=t*r*4|0;for(;i<s;)e[i]=255,i=i+4|0}function qo(e){let t=e.src,r=e.width,i=e.height,s=e.toWidth,l=e.toHeight,h=e.scaleX||e.toWidth/e.width,d=e.scaleY||e.toHeight/e.height,f=e.offsetX||0,A=e.offsetY||0,m=e.dest||new Uint8Array(s*l*4),B=typeof e.filter=="undefined"?"mks2013":e.filter,x=Lt(B,r,s,h,f),w=Lt(B,i,l,d,A),P=new Uint16Array(s*i*4);return jo(t,r,i)?(Yo(t,P,r,i,s,x),zo(P,m,i,s,l,w)):(Xo(t,P,r,i,s,x),Wo(P,m,i,s,l,w),Vo(m,s,l)),m}function Zo(e,t,r){let i=3,s=t*r*4|0;for(;i<s;){if(e[i]!==255)return!0;i=i+4|0}return!1}function Ko(e,t,r){let i=3,s=t*r*4|0;for(;i<s;)e[i]=255,i=i+4|0}function Jo(e){return new Uint8Array(e.buffer,0,e.byteLength)}var gi=!0;try{gi=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1}catch(e){}function oi(e,t,r){if(gi){t.set(Jo(e),r);return}for(let i=r,s=0;s<e.length;s++){let l=e[s];t[i++]=l&255,t[i++]=l>>8&255}}function es(e){let t=e.src,r=e.width,i=e.height,s=e.toWidth,l=e.toHeight,h=e.scaleX||e.toWidth/e.width,d=e.scaleY||e.toHeight/e.height,f=e.offsetX||0,A=e.offsetY||0,m=e.dest||new Uint8Array(s*l*4),B=typeof e.filter=="undefined"?"mks2013":e.filter,x=Lt(B,r,s,h,f),w=Lt(B,i,l,d,A),P=0,R=Math.max(t.byteLength,m.byteLength),M=this.__align(P+R),Q=i*s*4*2,S=this.__align(M+Q),k=this.__align(S+x.byteLength),H=k+w.byteLength,te=this.__instance("resize",H),j=new Uint8Array(this.__memory.buffer),T=new Uint32Array(this.__memory.buffer),X=new Uint32Array(t.buffer);T.set(X),oi(x,j,S),oi(w,j,k);let W=te.exports.convolveHV||te.exports._convolveHV;if(!W)throw new Error("WASM resize function is not available");return Zo(t,r,i)?W(S,k,M,r,i,s,l,1):(W(S,k,M,r,i,s,l,0),Ko(m,s,l)),new Uint32Array(m.buffer).set(new Uint32Array(this.__memory.buffer,0,l*s)),m}var ts={name:"resize",fn:qo,wasm_fn:es,wasm_src:"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"},rs=class extends Oo{constructor(e){let t=e||[],r={js:t.indexOf("js")>=0,wasm:t.indexOf("wasm")>=0};super(r),this.features={js:r.js,wasm:r.wasm&&this.has_wasm()},this.use($o),this.use(ts)}resizeAndUnsharp(e){let t=this.resize(e);return e.unsharpAmount&&this.unsharp_mask(t,e.toWidth,e.toHeight,e.unsharpAmount,e.unsharpRadius,e.unsharpThreshold),t}};function Ct(e){"@babel/helpers - typeof";return Ct=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ct(e)}function as(e,t){if(Ct(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,t||"default");if(Ct(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function is(e){var t=as(e,"string");return Ct(t)=="symbol"?t:t+""}function se(e,t,r){return(t=is(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function si(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,i)}return r}function Ut(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?si(Object(r),!0).forEach(function(i){se(e,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):si(Object(r)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(r,i))})}return e}var li=100,ns=class{constructor(e,t){se(this,"create",void 0),se(this,"available",void 0),se(this,"acquired",void 0),se(this,"lastId",void 0),se(this,"timeoutId",void 0),se(this,"idle",void 0),this.create=e,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=t||2e3}acquire(){let e;return this.available.length!==0?e=this.available.pop():e=Ut(Ut({},this.create()),{},{id:this.lastId++,lastUsed:0}),this.acquired[e.id]=e,{value:e.value,release:()=>this.release(e)}}release(e){delete this.acquired[e.id],e.lastUsed=Date.now(),this.available.push(e),this.timeoutId===0&&(this.timeoutId=setTimeout(()=>this.gc(),li))}gc(){let e=Date.now();this.available=this.available.filter(t=>e-t.lastUsed>this.idle?(t.destroy(),!1):!0),this.available.length!==0?this.timeoutId=setTimeout(()=>this.gc(),li):this.timeoutId=0}};function Ir(e){var t,r;return(t=e==null||(r=e.constructor)===null||r===void 0?void 0:r.name)!==null&&t!==void 0?t:""}function ci(e){let t=Ir(e);return t==="HTMLCanvasElement"||t==="OffscreenCanvas"||t==="Canvas"||t==="CanvasElement"}function Ot(e){return Ir(e)==="HTMLImageElement"}function hi(e){return Ir(e)==="ImageBitmap"}function os(e){let t=0,r=[];function i(){if(t<e&&r.length){var s;t++,(s=r.shift())===null||s===void 0||s()}}return function(l){return new Promise((h,d)=>{r.push(()=>{l().then(f=>{h(f),t--,i()},f=>{d(f),t--,i()})}),i()})}}function ss(e){switch(e){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"}var vr=["box","hamming","lanczos2","lanczos3"];function di(e){return vr[e]}function ui(e){return vr.indexOf(e)>=0}function ls(e){let t=vr.indexOf(e);return t>=0?t:void 0}function cs(e,t,r,i,s){let l=r/e,h=i/t,d=9/s;if(d>.5)return[[r,i]];let f=Math.ceil(Math.log(Math.min(l,h))/Math.log(d));if(f<=1)return[[r,i]];let A=[];for(let m=0;m<f;m++){let B=Math.round(Math.pow(Math.pow(e,f-m-1)*Math.pow(r,m+1),1/f)),x=Math.round(Math.pow(Math.pow(t,f-m-1)*Math.pow(i,m+1),1/f));A.push([B,x])}return A}var bi=1e-5;function st(e){let t=Math.round(e);return Math.abs(e-t)<bi?t:Math.floor(e)}function fi(e){let t=Math.round(e);return Math.abs(e-t)<bi?t:Math.ceil(e)}function hs(e){let t=e.toWidth/e.width,r=e.toHeight/e.height,i=st(e.srcTileSize*t)-2*e.destTileBorder,s=st(e.srcTileSize*r)-2*e.destTileBorder;if(i<1||s<1)throw new Error("Internal error in pica: target tile width/height is too small.");let l,h,d,f,A,m,B=[],x;for(f=0;f<e.toHeight;f+=s)for(d=0;d<e.toWidth;d+=i)l=d-e.destTileBorder,l<0&&(l=0),A=d+i+e.destTileBorder-l,l+A>=e.toWidth&&(A=e.toWidth-l),h=f-e.destTileBorder,h<0&&(h=0),m=f+s+e.destTileBorder-h,h+m>=e.toHeight&&(m=e.toHeight-h),x={toX:l,toY:h,toWidth:A,toHeight:m,toInnerX:d,toInnerY:f,toInnerWidth:i,toInnerHeight:s,offsetX:l/t-st(l/t),offsetY:h/r-st(h/r),scaleX:t,scaleY:r,x:st(l/t),y:st(h/r),width:fi(A/t),height:fi(m/r)},B.push(x);return B}var Cr="/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==",he={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},Ai=!1,lt=null,ct={willReadFrequently:!0};function Gt(){if(typeof document=="undefined"||!document.createElement)return!1;try{let e=document.createElement("canvas");e.width=2,e.height=1;let t=e.getContext("2d",ct),r=t.createImageData(2,1);return r.data[0]=12,r.data[1]=23,r.data[2]=34,r.data[3]=255,r.data[4]=45,r.data[5]=56,r.data[6]=67,r.data[7]=255,t.putImageData(r,0,0),r=t.getImageData(0,0,2,1),r.data[0]===12&&r.data[1]===23&&r.data[2]===34&&r.data[3]===255&&r.data[4]===45&&r.data[5]===56&&r.data[6]===67&&r.data[7]===255}catch(e){return!1}}function Nt(){if(typeof OffscreenCanvas=="undefined")return!1;try{let e=new OffscreenCanvas(2,1).getContext("2d",ct),t=e.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,e.putImageData(t,0,0),t=e.getImageData(0,0,2,1),t.data[0]===12&&t.data[1]===23&&t.data[2]===34&&t.data[3]===255&&t.data[4]===45&&t.data[5]===56&&t.data[6]===67&&t.data[7]===255}catch(e){return!1}}function Ht(){return typeof createImageBitmap!="undefined"}function ds(){return typeof Worker!="undefined"&&typeof URL!="undefined"&&!!URL.createObjectURL}function us(){try{return!!(typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.indexOf("Safari")>=0&&navigator.userAgent.indexOf("Chrome")<0)}catch(e){return!1}}function fs(){return Promise.resolve().then(()=>{if(Nt()&&Ht()&&typeof Blob!="undefined"&&typeof atob!="undefined"){let e=atob(Cr),t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return createImageBitmap(new Blob([t],{type:"image/jpeg"})).then(r=>{let i=new OffscreenCanvas(1,1);try{let s=i.getContext("2d",ct);return s.drawImage(r,1,1,1,1,0,0,1,1),s.getImageData(0,0,1,1).data[0]<240}finally{r.close()}})}return Gt()&&typeof Image!="undefined"?new Promise(e=>{let t=new Image;t.onload=()=>{try{let r=document.createElement("canvas");r.width=1,r.height=1;let i=r.getContext("2d",ct);i.drawImage(t,1,1,1,1,0,0,1,1),e(i.getImageData(0,0,1,1).data[0]<240)}catch(r){e(!0)}},t.onerror=()=>e(!0),t.src=`data:image/jpeg;base64,${Cr}`}):!0}).catch(()=>!0)}function As(){return Promise.resolve().then(()=>{if(!he.create_image_bitmap&&!Ht()||typeof Blob=="undefined"||typeof atob=="undefined")return!0;let e=Nt(),t=Gt();if(!e&&!t)return!0;let r=atob(Cr),i=new Uint8Array(r.length);for(let s=0;s<r.length;s++)i[s]=r.charCodeAt(s);return createImageBitmap(new Blob([i],{type:"image/jpeg"})).then(s=>createImageBitmap(s,1,1,1,1).then(l=>{let h;e?h=new OffscreenCanvas(1,1):(h=document.createElement("canvas"),h.width=1,h.height=1);try{let d=h.getContext("2d",ct);return d.drawImage(l,0,0),l.width!==1||l.height!==1||d.getImageData(0,0,1,1).data[0]<240}finally{s.close(),l.close()}},()=>(s.close(),!0)))}).catch(()=>!0)}function ms(){return Promise.resolve().then(()=>{if(!Ht())return!1;let e=20,t=5,r;if(he.canvas||Gt())r=document.createElement("canvas"),r.width=e,r.height=e;else if(he.offscreen_canvas||Nt())r=new OffscreenCanvas(e,e),r.getContext("2d",ct).clearRect(0,0,e,e);else return!1;return createImageBitmap(r,0,0,e,e,{resizeWidth:t,resizeHeight:t,resizeQuality:"high"}).then(i=>{let s=i.width===t&&!!i.close;return i.close&&i.close(),r=null,s})}).catch(()=>!1)}function ps(){if(Ai)return Promise.resolve(Object.assign({},he));if(lt)return lt.then(()=>Object.assign({},he));he.canvas=Gt(),he.offscreen_canvas=Nt(),he.may_be_worker=ds(),he.create_image_bitmap=Ht(),he.safari_put_image_data_fix=us();let e=fs().then(i=>{he.bug_canvas_orientation_region=i}).catch(()=>{}),t=As().then(i=>{he.bug_image_bitmap_orientation_region=i}).catch(()=>{}),r=ms().then(i=>{he.cib_resize=i}).catch(()=>{});return lt=Promise.all([e,t,r]).then(()=>(Ai=!0,lt=null,Object.assign({},he)),i=>{throw lt=null,i}),lt}function mi(e,t,r,i,s,l,h){try{var d=e[l](h),f=d.value}catch(A){r(A);return}d.done?t(f):Promise.resolve(f).then(i,s)}function De(e){return function(){var t=this,r=arguments;return new Promise(function(i,s){var l=e.apply(t,r);function h(f){mi(l,i,s,h,d,"next",f)}function d(f){mi(l,i,s,h,d,"throw",f)}h(void 0)})}}var pi=`/*!

pica
https://github.com/nodeca/pica

*/
!function(){var A;function t(A){const t=A.replace(/[\\r\\n=]/g,""),e=t.length,n=new Uint8Array(3*e>>2);let a=0,i=0;for(let s=0;s<e;s++)s%4==0&&s&&(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a),a=a<<6|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(s));const r=e%4*6;return 0===r?(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a):18===r?(n[i++]=a>>10&255,n[i++]=a>>2&255):12===r&&(n[i++]=a>>4&255),n}var e={js:!0,wasm:!0},n=class{constructor(A){const t=Object.assign({},e,A||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0],!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}has_wasm(){return function(){if(void 0!==A)return A;if(A=!1,"undefined"==typeof WebAssembly)return A;try{const t=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),e=new WebAssembly.Module(t);return 0!==new WebAssembly.Instance(e,{}).exports.test(4)&&(A=!0),A}catch(t){}return A}()}use(A){return this.__modules[A.name]=A,this.options.wasm&&this.has_wasm()&&A.wasm_fn?this[A.name]=A.wasm_fn:this[A.name]=A.fn,this}init(){return this.__init_promise?this.__init_promise:this.options.js||!this.options.wasm||this.has_wasm()?(this.__init_promise=Promise.all(Object.keys(this.__modules).map(A=>{const e=this.__modules[A];return this.options.wasm&&this.has_wasm()&&e.wasm_fn?this.__wasm[A]?null:WebAssembly.compile(t(e.wasm_src)).then(t=>{this.__wasm[A]=t}):null})).then(()=>this),this.__init_promise):Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\\'s not supported'))}__reallocate(A){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(A/65536)}),this.__memory;const t=this.__memory.buffer.byteLength;return t<A&&this.__memory.grow(Math.ceil((A-t)/65536)),this.__memory}__instance(A,e,n){if(e&&this.__reallocate(e),!this.__wasm[A]){const e=this.__modules[A];this.__wasm[A]=new WebAssembly.Module(t(e.wasm_src))}if(!this.__cache[A]){const t={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[A]=new WebAssembly.Instance(this.__wasm[A],{env:Object.assign(t,n||{})})}return this.__cache[A]}__align(A,t){const e=A%(t=t||8);return A+(e?t-e:0)}};function a(A,t,e,n,a,i){let r,s,o,g,I,h,B,Q,E,C,f,c,u,d;for(E=0;E<i;E++){for(h=E*a,B=E,Q=0,r=A[h],I=r*n[6],g=I,f=n[0],c=n[1],u=n[4],d=n[5],C=0;C<a;C++)s=A[h],o=s*f+r*c+g*u+I*d,I=g,g=o,r=s,e[Q]=g,Q++,h++;for(h--,Q--,B+=i*(a-1),r=A[h],I=r*n[7],g=I,s=r,f=n[2],c=n[3],C=a-1;C>=0;C--)o=s*f+r*c+g*u+I*d,I=g,g=o,r=s,s=A[h],t[B]=e[Q]+g,h--,Q--,B-=i}}function i(A,t,e,n){if(!n)return;const i=new Uint16Array(A.length),r=new Float32Array(Math.max(t,e)),s=function(A){A<.5&&(A=.5);const t=Math.exp(.527076)/A,e=Math.exp(-t),n=Math.exp(-2*t),a=(1-e)*(1-e)/(1+2*t*e-n),i=a*(t-1)*e,r=a*(t+1)*e,s=-a*n,o=2*e,g=-n;return new Float32Array([a,i,r,s,o,g,(a+i)/(1-o-g),(r+s)/(1-o-g)])}(n);a(A,i,r,s,t,e),a(i,A,r,s,e,t)}var r={name:"unsharp_mask",fn:function(A,t,e,n,a,r){let s,o,g,I,h;if(0===n||a<.5)return;a>2&&(a=2);const B=function(A,t,e){const n=t*e,a=new Uint16Array(n);let i,r,s,o;for(let g=0;g<n;g++)i=A[4*g],r=A[4*g+1],s=A[4*g+2],o=i>=r&&i>=s?i:r>=s&&r>=i?r:s,a[g]=o<<8;return a}(A,t,e),Q=new Uint16Array(B);i(Q,t,e,a);const E=n/100*4096+.5|0,C=r<<8,f=t*e;for(let i=0;i<f;i++)s=B[i],I=s-Q[i],Math.abs(I)>=C&&(o=s+(E*I+2048>>12),o=o>65280?65280:o,o=o<0?0:o,s=0!==s?s:1,g=(o<<12)/s|0,h=4*i,A[h]=A[h]*g+2048>>12,A[h+1]=A[h+1]*g+2048>>12,A[h+2]=A[h+2]*g+2048>>12)},wasm_fn:function(A,t,e,n,a,i){if(0===n||a<.5)return;a>2&&(a=2);const r=t*e,s=4*r,o=2*r,g=2*r,I=4*Math.max(t,e),h=s,B=h+o,Q=B+g,E=Q+g,C=E+I,f=this.__instance("unsharp_mask",s+o+2*g+I+32,{exp:Math.exp}),c=new Uint32Array(A.buffer);new Uint32Array(this.__memory.buffer).set(c);let u=f.exports.hsv_v16||f.exports._hsv_v16;if(!u)throw new Error("WASM hsv_v16 function is not available");if(u(0,h,t,e),u=f.exports.blurMono16||f.exports._blurMono16,!u)throw new Error("WASM blurMono16 function is not available");if(u(h,B,Q,E,C,t,e,a),u=f.exports.unsharp||f.exports._unsharp,!u)throw new Error("WASM unsharp function is not available");u(0,0,h,B,t,e,n,i),c.set(new Uint32Array(this.__memory.buffer,0,r))},wasm_src:"AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"},s={filter:{box:{win:.5,fn:A=>(A<0&&(A=-A),A<.5?1:0)},hamming:{win:1,fn(A){if(A<0&&(A=-A),A>=1)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(A){if(A<0&&(A=-A),A>=2)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(A){if(A<0&&(A=-A),A>=3)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn:A=>(A<0&&(A=-A),A>=2.5?0:A>=1.5?-.125*(A-2.5)*(A-2.5):A>=.5?.25*(4*A*A-11*A+7):1.0625-1.75*A*A)}}};function o(A){return Math.round(16383*A)}function g(A,t,e,n,a){const i=s.filter[A].fn,r=1/n,g=Math.min(1,n),I=s.filter[A].win/g;let h,B,Q,E,C,f,c,u,d,l,w,m,y,_,b,D,M;const p=Math.floor(2*(I+1)),G=new Int16Array((p+2)*e);let U=0;const F=!G.subarray||!G.set;for(h=0;h<e;h++){for(B=(h+.5)*r+a,Q=Math.max(0,Math.floor(B-I)),E=Math.min(t-1,Math.ceil(B+I)),C=E-Q+1,f=new Float32Array(C),c=new Int16Array(C),u=0,d=Q,l=0;d<=E;d++,l++)w=i((d+.5-B)*g),u+=w,f[l]=w;for(m=0,l=0;l<f.length;l++)y=f[l]/u,m+=y,c[l]=o(y);for(c[e>>1]+=o(1-m),_=0;_<c.length&&0===c[_];)_++;if(_<c.length){for(b=c.length-1;b>0&&0===c[b];)b--;if(D=Q+_,M=b-_+1,G[U++]=D,G[U++]=M,F)for(l=_;l<=b;l++)G[U++]=c[l];else G.set(c.subarray(_,b+1),U),U+=M}else G[U++]=0,G[U++]=0}return G}function I(A){return A<0?0:A>255?255:A}function h(A){return A>=0?A:0}var B=!0;try{B=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]}catch(G){}function Q(A,t,e){if(B)t.set(function(A){return new Uint8Array(A.buffer,0,A.byteLength)}(A),e);else for(let n=e,a=0;a<A.length;a++){const e=A[a];t[n++]=255&e,t[n++]=e>>8&255}}var E={name:"resize",fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,B=A.offsetY||0,Q=A.dest||new Uint8Array(a*i*4),E=void 0===A.filter?"mks2013":A.filter,C=g(E,e,a,r,o),f=g(E,n,i,s,B),c=new Uint16Array(a*n*4);return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,f,c,u=0,d=0;for(C=0;C<n;C++){for(I=0,f=0;f<a;f++){for(B=i[I++],Q=i[I++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)c=i[I++],g=g+c*A[E+3]|0,o=o+c*A[E+2]|0,s=s+c*A[E+1]|0,r=r+c*A[E]|0,E=E+4|0;t[d+3]=h(g>>7),t[d+2]=h(o>>7),t[d+1]=h(s>>7),t[d]=h(r>>7),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(t,c,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,f,c,u=0,d=0;for(C=0;C<n;C++){for(h=0,f=0;f<a;f++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)c=i[h++],g=g+c*A[E+3]|0,o=o+c*A[E+2]|0,s=s+c*A[E+1]|0,r=r+c*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,t[d+3]=I(g+8192>>14),t[d+2]=I(o+8192>>14),t[d+1]=I(s+8192>>14),t[d]=I(r+8192>>14),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(c,Q,n,a,i,f),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(Q,a,i)):(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,f,c,u,d=0,l=0;for(f=0;f<n;f++){for(B=0,c=0;c<a;c++){for(Q=i[B++],E=i[B++],C=d+4*Q|0,r=s=o=g=0;E>0;E--)u=i[B++],I=A[C+3],g=g+u*I|0,o=o+u*A[C+2]*I|0,s=s+u*A[C+1]*I|0,r=r+u*A[C]*I|0,C=C+4|0;o=o/255|0,s=s/255|0,r=r/255|0,t[l+3]=h(g>>7),t[l+2]=h(o>>7),t[l+1]=h(s>>7),t[l]=h(r>>7),l=l+4*n|0}l=4*(f+1)|0,d=(f+1)*e*4|0}}(t,c,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,f,c,u=0,d=0;for(C=0;C<n;C++){for(h=0,f=0;f<a;f++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)c=i[h++],g=g+c*A[E+3]|0,o=o+c*A[E+2]|0,s=s+c*A[E+1]|0,r=r+c*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,g=I(g+8192>>14),g>0&&(r=255*r/g|0,s=255*s/g|0,o=255*o/g|0),t[d+3]=g,t[d+2]=I(o+8192>>14),t[d+1]=I(s+8192>>14),t[d]=I(r+8192>>14),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(c,Q,n,a,i,f)),Q},wasm_fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,I=A.offsetY||0,h=A.dest||new Uint8Array(a*i*4),B=void 0===A.filter?"mks2013":A.filter,E=g(B,e,a,r,o),C=g(B,n,i,s,I),f=Math.max(t.byteLength,h.byteLength),c=this.__align(0+f),u=n*a*4*2,d=this.__align(c+u),l=this.__align(d+E.byteLength),w=l+C.byteLength,m=this.__instance("resize",w),y=new Uint8Array(this.__memory.buffer),_=new Uint32Array(this.__memory.buffer),b=new Uint32Array(t.buffer);_.set(b),Q(E,y,d),Q(C,y,l);const D=m.exports.convolveHV||m.exports._convolveHV;if(!D)throw new Error("WASM resize function is not available");return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(D(d,l,c,e,n,a,i,0),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(h,a,i)):D(d,l,c,e,n,a,i,1),new Uint32Array(h.buffer).set(new Uint32Array(this.__memory.buffer,0,i*a)),h},wasm_src:"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"},C=class extends n{constructor(A){const t=A||[],e={js:t.indexOf("js")>=0,wasm:t.indexOf("wasm")>=0};super(e),this.features={js:e.js,wasm:e.wasm&&this.has_wasm()},this.use(r),this.use(E)}resizeAndUnsharp(A){const t=this.resize(A);return A.unsharpAmount&&this.unsharp_mask(t,A.toWidth,A.toHeight,A.unsharpAmount,A.unsharpRadius,A.unsharpThreshold),t}},f="/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==",c={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},u=!1,d=null,l={willReadFrequently:!0};function w(){if("undefined"==typeof document||!document.createElement)return!1;try{const A=document.createElement("canvas");A.width=2,A.height=1;const t=A.getContext("2d",l);let e=t.createImageData(2,1);return e.data[0]=12,e.data[1]=23,e.data[2]=34,e.data[3]=255,e.data[4]=45,e.data[5]=56,e.data[6]=67,e.data[7]=255,t.putImageData(e,0,0),e=t.getImageData(0,0,2,1),12===e.data[0]&&23===e.data[1]&&34===e.data[2]&&255===e.data[3]&&45===e.data[4]&&56===e.data[5]&&67===e.data[6]&&255===e.data[7]}catch(G){return!1}}function m(){if("undefined"==typeof OffscreenCanvas)return!1;try{const A=new OffscreenCanvas(2,1).getContext("2d",l);let t=A.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,A.putImageData(t,0,0),t=A.getImageData(0,0,2,1),12===t.data[0]&&23===t.data[1]&&34===t.data[2]&&255===t.data[3]&&45===t.data[4]&&56===t.data[5]&&67===t.data[6]&&255===t.data[7]}catch(G){return!1}}function y(){return"undefined"!=typeof createImageBitmap}function _(){if(u)return Promise.resolve(Object.assign({},c));if(d)return d.then(()=>Object.assign({},c));c.canvas=w(),c.offscreen_canvas=m(),c.may_be_worker="undefined"!=typeof Worker&&"undefined"!=typeof URL&&!!URL.createObjectURL,c.create_image_bitmap=y(),c.safari_put_image_data_fix=function(){try{return!!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.indexOf("Safari")>=0&&navigator.userAgent.indexOf("Chrome")<0)}catch(G){return!1}}();const A=Promise.resolve().then(()=>{if(m()&&y()&&"undefined"!=typeof Blob&&"undefined"!=typeof atob){const A=atob(f),t=new Uint8Array(A.length);for(let e=0;e<A.length;e++)t[e]=A.charCodeAt(e);return createImageBitmap(new Blob([t],{type:"image/jpeg"})).then(A=>{const t=new OffscreenCanvas(1,1);try{const e=t.getContext("2d",l);return e.drawImage(A,1,1,1,1,0,0,1,1),e.getImageData(0,0,1,1).data[0]<240}finally{A.close()}})}return!w()||"undefined"==typeof Image||new Promise(A=>{const t=new Image;t.onload=()=>{try{const e=document.createElement("canvas");e.width=1,e.height=1;const n=e.getContext("2d",l);n.drawImage(t,1,1,1,1,0,0,1,1),A(n.getImageData(0,0,1,1).data[0]<240)}catch(G){A(!0)}},t.onerror=()=>A(!0),t.src=\`data:image/jpeg;base64,\${f}\`})}).catch(()=>!0).then(A=>{c.bug_canvas_orientation_region=A}).catch(()=>{}),t=Promise.resolve().then(()=>{if(!c.create_image_bitmap&&!y())return!0;if("undefined"==typeof Blob||"undefined"==typeof atob)return!0;const A=m(),t=w();if(!A&&!t)return!0;const e=atob(f),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return createImageBitmap(new Blob([n],{type:"image/jpeg"})).then(t=>createImageBitmap(t,1,1,1,1).then(e=>{let n;A?n=new OffscreenCanvas(1,1):(n=document.createElement("canvas"),n.width=1,n.height=1);try{const A=n.getContext("2d",l);return A.drawImage(e,0,0),1!==e.width||1!==e.height||A.getImageData(0,0,1,1).data[0]<240}finally{t.close(),e.close()}},()=>(t.close(),!0)))}).catch(()=>!0).then(A=>{c.bug_image_bitmap_orientation_region=A}).catch(()=>{}),e=Promise.resolve().then(()=>{if(!y())return!1;const A=20;let t;if(c.canvas||w())t=document.createElement("canvas"),t.width=A,t.height=A;else{if(!c.offscreen_canvas&&!m())return!1;t=new OffscreenCanvas(A,A),t.getContext("2d",l).clearRect(0,0,A,A)}return createImageBitmap(t,0,0,A,A,{resizeWidth:5,resizeHeight:5,resizeQuality:"high"}).then(A=>{const e=5===A.width&&!!A.close;return A.close&&A.close(),t=null,e})}).catch(()=>!1).then(A=>{c.cib_resize=A}).catch(()=>{});return d=Promise.all([A,t,e]).then(()=>(u=!0,d=null,Object.assign({},c)),A=>{throw d=null,A})}var b=self,D=null;function M(A,t){return D||(D=new C(A.features)),D.resizeAndUnsharp(t)}function p(A){if("bitmap"===A.job.kind)return void function(A,t){let e=new OffscreenCanvas(t.width,t.height);const n=e.getContext("2d",{willReadFrequently:!0});n.drawImage(t.src,0,0);const a=n.getImageData(0,0,t.width,t.height).data;e.width=e.height=0,e=null,t.src.close();const i=M(A,{src:a,width:t.width,height:t.height,toWidth:t.toWidth,toHeight:t.toHeight,scaleX:t.scaleX,scaleY:t.scaleY,offsetX:t.offsetX,offsetY:t.offsetY,filter:t.filter,unsharpAmount:t.unsharpAmount,unsharpRadius:t.unsharpRadius,unsharpThreshold:t.unsharpThreshold});b.postMessage({kind:"array",data:i},[i.buffer])}(A,A.job);const t=M(A,A.job);b.postMessage({kind:"array",data:t},[t.buffer])}b.onmessage=function(A){Promise.resolve().then(()=>function(A){switch(A.method){case"get_supported_features":return _().then(A=>{b.postMessage({data:A})});case"resize":return p(A),Promise.resolve();default:return Promise.reject(new Error(\`Unknown worker method: \${A.method}\`))}}(A.data)).catch(A=>{b.postMessage({err:A})})}}();
//# sourceURL=pica-inline-worker.js`,xi=1;typeof navigator!="undefined"&&(xi=Math.min(navigator.hardwareConcurrency||1,4));var gs={tile:1024,concurrency:xi,features:["js","wasm","ww"],idle:2e3},xt={filter:"mks2013",unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},ze={willReadFrequently:!0},bs=class{constructor(e){se(this,"options",void 0),se(this,"__limit",void 0),se(this,"resize_features",void 0),se(this,"__workersPool",void 0),se(this,"capabilities",void 0),se(this,"__requested_features",void 0),se(this,"__mathlib",void 0),se(this,"__initPromise",void 0),this.options=Object.assign({},gs,e||{}),(this.options.features.indexOf("ww")>=0||this.options.features.indexOf("all")>=0)&&this.options.workerURL,this.__limit=os(this.options.concurrency),this.resize_features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.capabilities={worker:!1,ww_offscreen_canvas:!1,canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},this.__requested_features=[],this.__mathlib=null}init(){return this.__initPromise?this.__initPromise:(this.__initPromise=this.__init(),this.__initPromise)}__init(){var e=this;return De(function*(){let t=e.options.features.slice();t.indexOf("all")>=0&&(t=["cib","wasm","js","ww"]),e.__requested_features=t,e.__mathlib=new rs(t);let r=yield ps();if(Object.assign(e.capabilities,r),e.capabilities.cib_resize&&t.indexOf("cib")>=0&&(e.resize_features.cib=!0),e.capabilities.may_be_worker&&t.indexOf("ww")>=0&&pi&&(e.__workersPool=new ns(()=>e.__createWorkerSlot(),e.options.idle)),e.__workersPool)try{let s=yield e.__invokeWorker("get_supported_features"),l=s&&s.data;l&&(e.capabilities.worker=!0,e.resize_features.ww=!0,e.capabilities.ww_offscreen_canvas=!!l.offscreen_canvas)}catch(s){}let i=yield e.__mathlib.init();return Object.assign(e.resize_features,i.features),e})()}createCanvas(e,t,r){if(r&&this.capabilities.offscreen_canvas)return new OffscreenCanvas(e,t);if(this.capabilities.canvas){let i=document.createElement("canvas");return i.width=e,i.height=t,i}if(this.capabilities.ww_offscreen_canvas)return new OffscreenCanvas(e,t);throw new Error("Pica: cannot create canvas")}__createWorkerSlot(){if(this.options.workerURL){let e=new Worker(String(this.options.workerURL));return{value:e,destroy(){e.terminate()}}}{let e=window.URL.createObjectURL(new Blob([pi],{type:"text/javascript"})),t=new Worker(e);return{value:t,destroy(){if(t.terminate(),typeof window!="undefined"){var r,i;(r=window.URL)===null||r===void 0||(i=r.revokeObjectURL)===null||i===void 0||i.call(r,e)}}}}}__invokeWorker(e,t,r,i){return new Promise((s,l)=>{let h=this.__workersPool.acquire();i&&i.cancelToken&&i.cancelToken.catch(d=>l(d)),h.value.onmessage=d=>{h.release(),d.data.err?l(d.data.err):s(d.data)},h.value.postMessage(Object.assign({method:e},t||{}),r||[])})}__invokeResize(e,t){var r=this;return De(function*(){if(yield Promise.resolve(),!r.resize_features.ww){if(e.kind!=="array")throw new Error("Pica: resize tile data is missing");let s={src:e.src,width:e.width,height:e.height,toWidth:e.toWidth,toHeight:e.toHeight,scaleX:e.scaleX,scaleY:e.scaleY,offsetX:e.offsetX,offsetY:e.offsetY,filter:e.filter,unsharpAmount:e.unsharpAmount,unsharpRadius:e.unsharpRadius,unsharpThreshold:e.unsharpThreshold};return{kind:"array",data:r.__mathlib.resizeAndUnsharp(s)}}let i=[];return e.kind==="array"?i.push(e.src.buffer):i.push(e.src),r.__invokeWorker("resize",{job:e,features:r.__requested_features},i,t)})()}__extractTileData(e,t,r,i){if(this.resize_features.ww&&this.capabilities.ww_offscreen_canvas){this.debug("Create tile imageBitmap");let d=this.createCanvas(e.width,e.height,{preferOffscreen:!0});if(d.getContext("2d",ze).drawImage(r.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),!("transferToImageBitmap"in d))throw new Error("Pica: offscreen canvas is not available for worker transfer");return Object.assign({},i,{kind:"bitmap",src:d.transferToImageBitmap()})}if(ci(t))return r.srcCtx||(r.srcCtx=t.getContext("2d",ze)),this.debug("Get tile pixel data"),Object.assign({},i,{kind:"array",src:r.srcCtx.getImageData(e.x,e.y,e.width,e.height).data});this.debug("Draw tile imageBitmap/image to temporary canvas");let s=this.createCanvas(e.width,e.height,{preferOffscreen:!0}),l=s.getContext("2d",ze);l.globalCompositeOperation="copy",l.drawImage(r.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),this.debug("Get tile pixel data");let h=l.getImageData(0,0,e.width,e.height).data;return s.width=s.height=0,Object.assign({},i,{kind:"array",src:h})}__landTileData(e,t,r){if(t.kind==="bitmap")return r.toCtx.drawImage(t.data,e.toX,e.toY),t.data.close(),null;this.debug("Draw tile");let i=r.toCtx.createImageData(e.toWidth,e.toHeight);return i.data.set(t.data),this.capabilities.safari_put_image_data_fix?r.toCtx.putImageData(i,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth+1e-5,e.toInnerHeight+1e-5):r.toCtx.putImageData(i,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth,e.toInnerHeight),null}__tileAndResize(e,t,r,i){var s=this;return De(function*(){let l={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null},h=A=>s.__limit(De(function*(){if(i.canceled)return i.cancelToken;let m={width:A.width,height:A.height,toWidth:A.toWidth,toHeight:A.toHeight,scaleX:A.scaleX,scaleY:A.scaleY,offsetX:A.offsetX,offsetY:A.offsetY,filter:r.filter,unsharpAmount:r.unsharpAmount,unsharpRadius:r.unsharpRadius,unsharpThreshold:r.unsharpThreshold};s.debug("Invoke resize math");let B=yield s.__extractTileData(A,e,l,m);s.debug("Invoke resize math");let x=yield s.__invokeResize(B,i);return i.canceled?i.cancelToken:s.__landTileData(A,x,l)}));if(yield Promise.resolve(),l.toCtx=t.getContext("2d",ze),!ci(e))if(hi(e))l.srcImageBitmap=e,l.isImageBitmapReused=!0;else if(Ot(e)){if(s.capabilities.create_image_bitmap){s.debug("Decode image via createImageBitmap");try{l.srcImageBitmap=yield createImageBitmap(e)}catch(A){}}}else throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap');if(i.canceled)return i.cancelToken;s.debug("Calculate tiles");let d=hs({width:r.width,height:r.height,srcTileSize:s.options.tile,toWidth:r.toWidth,toHeight:r.toHeight,destTileBorder:Math.ceil(Math.max(3,2.5*r.unsharpRadius|0))}).map(A=>h(A));function f(A){A.srcImageBitmap&&(A.isImageBitmapReused||A.srcImageBitmap.close(),A.srcImageBitmap=null)}s.debug("Process tiles");try{return yield Promise.all(d),s.debug("Finished!"),f(l),t}catch(A){throw f(l),A}})()}__planStagesAndResize(e,t,r,i){var s=this;return De(function*(){let l=e,h=r.width,d=r.height,f=cs(r.width,r.height,r.toWidth,r.toHeight,s.options.tile);for(;f.length>0;){if(i.canceled)return i.cancelToken;let[A,m]=f.shift(),B=f.length===0,x;B||!ui(r.filter)?x=r.filter:r.filter==="box"?x="box":x="hamming";let w=Ut(Ut({},r),{},{filter:x,width:h,height:d,toWidth:A,toHeight:m}),P=B?t:s.createCanvas(A,m,{preferOffscreen:!0}),R=l!==e?l:void 0;try{yield s.__tileAndResize(l,P,w,i)}finally{R&&(R.width=R.height=0)}l=P,h=A,d=m}return t})()}__resizeViaCreateImageBitmap(e,t,r,i){var s=this;return De(function*(){var l;let h=t.getContext("2d",ze);s.debug("Resize via createImageBitmap()");let d=yield createImageBitmap(e,{resizeWidth:r.toWidth,resizeHeight:r.toHeight,resizeQuality:ss((l=ls(r.filter))!==null&&l!==void 0?l:3)});if(i.canceled)return i.cancelToken;if(!r.unsharpAmount)return h.drawImage(d,0,0),d.close(),h=null,s.debug("Finished!"),t;s.debug("Unsharp result");let f=s.createCanvas(r.toWidth,r.toHeight),A=f.getContext("2d",ze);A.drawImage(d,0,0),d.close();let m=A.getImageData(0,0,r.toWidth,r.toHeight);return s.__mathlib.unsharp_mask(m.data,r.toWidth,r.toHeight,r.unsharpAmount,r.unsharpRadius,r.unsharpThreshold),h.putImageData(m,0,0),f.width=f.height=0,m=A=f=h=null,s.debug("Finished!"),t})()}resize(e,t,r){var i=this;return De(function*(){i.debug("Start resize...");let s={};r&&Object.assign(s,r);let l=s.filter||xt.filter;if(Object.prototype.hasOwnProperty.call(s,"quality")){let f=s.quality;if(typeof f!="number"||f<0||f>3)throw new Error(`Pica: .quality should be [0..3], got ${f}`);l=di(f)}let h={filter:l,unsharpAmount:s.unsharpAmount||xt.unsharpAmount,unsharpRadius:s.unsharpRadius||xt.unsharpRadius,unsharpThreshold:s.unsharpThreshold||xt.unsharpThreshold,width:Ot(e)?e.naturalWidth:e.width,height:Ot(e)?e.naturalHeight:e.height,toWidth:t.width,toHeight:t.height};if(h.unsharpRadius>2&&(h.unsharpRadius=2),t.width===0||t.height===0)return Promise.reject(new Error(`Invalid output size: ${t.width}x${t.height}`));let d={cancelToken:s.cancelToken,canceled:!1};if(d.cancelToken&&(d.cancelToken=d.cancelToken.then(f=>{throw d.canceled=!0,f},f=>{throw d.canceled=!0,f})),yield i.init(),d.canceled)return d.cancelToken;if(i.capabilities.bug_image_bitmap_orientation_region&&(Ot(e)||hi(e))){let f=i.createCanvas(h.width,h.height);f.getContext("2d",ze).drawImage(e,0,0),e=f}if(i.resize_features.cib){if(ui(h.filter))return i.__resizeViaCreateImageBitmap(e,t,h,d);i.debug("cib is enabled, but not supports provided filter, fallback to manual math")}if(!i.capabilities.canvas&&!i.capabilities.offscreen_canvas){let f=new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");throw f.code="ERR_GET_IMAGE_DATA",f}return i.__planStagesAndResize(e,t,h,d)})()}resizeBuffer(e){var t=this;return De(function*(){let r=Object.assign({},xt,e);if(Object.prototype.hasOwnProperty.call(r,"quality")){let s=r.quality;if(typeof s!="number"||s<0||s>3)throw new Error(`Pica: .quality should be [0..3], got ${s}`);r.filter=di(s)}if(yield t.init(),!t.__mathlib)throw new Error("Pica: math library is not initialized");let i={src:r.src,width:r.width,height:r.height,toWidth:r.toWidth,toHeight:r.toHeight,dest:r.dest,scaleX:r.toWidth/r.width,scaleY:r.toHeight/r.height,offsetX:0,offsetY:0,filter:r.filter,unsharpAmount:r.unsharpAmount,unsharpRadius:r.unsharpRadius,unsharpThreshold:r.unsharpThreshold};return t.__mathlib.resizeAndUnsharp(i)})()}toBlob(e,t,r){return De(function*(){if(t=t||"image/png","toBlob"in e&&e.toBlob)return new Promise(h=>{e.toBlob(d=>h(d),t,r)});if("convertToBlob"in e&&e.convertToBlob)return e.convertToBlob({type:t,quality:r});let i=atob(e.toDataURL(t,r).split(",")[1]),s=i.length,l=new Uint8Array(s);for(let h=0;h<s;h++)l[h]=i.charCodeAt(h);return new Blob([l],{type:t})})()}debug(...e){}};function Ci(e){return new bs(e)}var Pr=sa(Ii());var vi=["benbenn.jpg","cezanne2.jpg","colorroses.jpg","colorswirls.jpg","coolcar.jpg","darkbrewery.jpg","dhuku.jpg","greentruck.jpg","frida.jpg","homer.jpg","keyssunset.jpg","lobsterpot.jpg","myersflat.jpg","myrtle.jpg","parrot.jpg","redrose.jpg","robert_s_duncanson.jpg","seurat.jpg","vangogh.jpg"];var me,xs=document.getElementById("brightSlider"),Cs=document.getElementById("contrastSlider"),Is=document.getElementById("saturationSlider"),vs=document.getElementById("noiseSlider"),ws=document.getElementById("diffuseSlider"),Bs=document.getElementById("orderedSlider"),Es=document.getElementById("diversitySlider"),Er=document.getElementById("imageUpload"),yi=document.getElementById("srcimage"),wt=document.getElementById("resizecanvas"),It=document.getElementById("destcanvas"),yr=class{constructor(){this.newWorker()}newWorker(){this.worker&&(this.worker.onmessage=()=>{}),this.worker=new Worker("./gen/worker.js"),this.worker.onmessage=t=>{var r=t.data;r!=null&&r.img!=null&&this.pixelsAvailable!=null&&(this.pixelsAvailable(r),this.lastPixels=r)}}setSettings(t){this.settings=t,this.worker.postMessage({cmd:"setSettings",data:t})}setSourceImage(t){this.worker.postMessage({cmd:"setSourceImage",data:t})}restart(){this.worker.postMessage({cmd:"restart"})}},U=new yr,Ve,$t,_i=[{name:"Floyd-Steinberg",kernel:$a},{name:"False Floyd",kernel:Xa},{name:"Atkinson",kernel:Wa},{name:"Sierra 2",kernel:Ya},{name:"Sierra Lite",kernel:za},{name:"Stucki",kernel:ja},{name:"Two-D",kernel:Va},{name:"Right",kernel:qa},{name:"Down",kernel:Za},{name:"Double Down",kernel:Ka},{name:"Diagonal",kernel:Ja},{name:"Diamond",kernel:ei}],ys=[{id:"perceptual",name:"Perceptual"},{id:"hue",name:"Hue-Based"},{id:"dist",name:"Distance"},{id:"max",name:"Maximum"}],wi=!1;function Dr(e){if(wi)return;wi=!0;let t=(e==null?void 0:e.message)||String(e);console.error("Canvas access error:",e),(t.includes("fingerprint")||t.includes("canvas")||t.includes("getImageData"))&&alert(`\u26A0\uFE0F Canvas Access Blocked

Dithertron cannot access canvas image data. This is usually caused by browser fingerprinting protection.

To fix this:
\u2022 Firefox: Disable 'Enhanced Tracking Protection' for this site (shield icon in address bar)
\u2022 Brave: Disable 'Block fingerprinting' in Shields settings
\u2022 Other browsers: Check privacy/security settings

Technical details: `+t)}function _s(){try{let e=document.createElement("canvas");e.width=e.height=1;let t=e.getContext("2d");return t.fillStyle="rgb(255, 0, 0)",t.fillRect(0,0,1,1),t.getImageData(0,0,1,1),!0}catch(e){return Dr(e),!1}}function Ms(e){try{return new Uint32Array(e.getContext("2d").getImageData(0,0,e.width,e.height).data.buffer)}catch(t){throw Dr(t),t}}function Ps(e,t){var r=e.getContext("2d"),i=r.createImageData(e.width,e.height),s=new Uint32Array(i.data.buffer);s.length==t.length?(s.set(t),r.putImageData(i,0,0)):console.log("drawRGBA(): array length mismatch")}function Ds(e,t,r,i,s){t*=1,r*=1;for(var l=new Uint8ClampedArray(e.buffer),h=0;h<l.length;h+=4){var d=l[h],f=l[h+1],A=l[h+2];if(i!=1){var m=.2989*d+.587*f+.114*A;d=m*(1-i)+d*i,f=m*(1-i)+f*i,A=m*(1-i)+A*i}l[h]=Math.pow(d*t,s)+r,l[h+1]=Math.pow(f*t,s)+r,l[h+2]=Math.pow(A*t,s)+r}}function ht(){var e=Ms(wt);let t=(parseFloat(Cs.value)-50)/100+1,r=(parseFloat(xs.value)-t*50)*(128/50),i=(parseFloat(Is.value)-50)/50+1;Ds(e,t,r,i,1),U.setSourceImage(e),je()}function je(){var e=$("#diffuseTypeSelect")[0].selectedOptions[0];e&&(U.settings.ditherfn=_i[parseInt(e.value)].kernel);var e=$("#errorFuncSelect")[0].selectedOptions[0];e&&(U.settings.errfn=e.value),U.settings.diffuse=parseFloat(ws.value)/100,U.settings.ordered=parseFloat(Bs.value)/100,U.settings.noise=parseFloat(vs.value),U.settings.paletteDiversity=parseFloat(Es.value)/200+.75,U.setSettings(U.settings),U.restart()}function Rs(){let e=me==null?void 0:me.getCroppedCanvas();!(e!=null&&e.width)||!(e!=null&&e.height)||Ci().resize(e,wt,{}).then(()=>{ht()}).catch(t=>{Dr(t)})}function Mi(e){var t=e.width+" x "+e.height;return e.reduce?t+=", "+e.reduce+" out of "+e.pal.length+" colors":e.pal&&(t+=", "+e.pal.length+" colors"),e.block&&(t+=", ",t+=e.block.colors+" colors per ",t+=e.block.w+"x"+e.block.h+" block"),t}function Ss(e){$("#targetFormatInfo").text(Mi(e))}function ks(e){var t=$("#paletteSwatches");t.empty(),e&&e.length<64&&e.forEach((r,i)=>{var s="rgb("+(r&255)+","+(r>>8&255)+","+(r>>16&255)+")",l=$('<span style="width:2em">&nbsp;</span>').css("background-color",s);t.append(l)})}function Qs(e){let t=U.settings;return(e==null?void 0:e.naturalWidth)==t.width&&(e==null?void 0:e.naturalHeight)==t.height}function Ts(){console.log("Width and height exact match!"),me.clear(),me.disable(),wt.getContext("2d").drawImage(yi,0,0),ht()}function Xt(e){me&&me.destroy();let t=U.settings,r=t.width*(t.scaleX||1)/t.height||4/3;me=new Ei.default(yi,{viewMode:1,autoCropArea:1,initialAspectRatio:r,crop(i){Qs(me.getImageData())?Ts():Rs()}}),me.replace(e),Ri()}function Bi(e){var t=e.conv!="DitheringCanvas";U.newWorker(),U.setSettings(e),U.restart(),Ss(e),wt.width=It.width=e.width,wt.height=It.height=e.height;let r=e.scaleX||1;It.style.aspectRatio=(e.width*r/e.height).toString(),$("#noiseSection").css("display",t?"flex":"none"),$("#diversitySection").css("display",e.reduce?"flex":"none"),$("#downloadNativeBtn").css("display",e.toNative?"inline":"none"),$("#gotoIDE").css("display",Di()?"inline":"none"),me&&Xt(me.url),Ri(),Hs(e)}function vt(){var e=Ve||"image";try{e=e.split(".").shift()||"image"}catch(t){}return e+"-"+U.settings.id}function Pi(){var e=U.lastPixels;let t=U.settings.toNative;if(!t)return null;var r=Ar[t];return e&&r&&r(e,U.settings)}function Fs(){var e=Pi();if(e!=null){var t=new Blob([e],{type:"application/octet-stream"});(0,Pr.saveAs)(t,vt()+".bin")}}function Os(){It.toBlob(e=>{(0,Pr.saveAs)(e,vt()+".png")},"image/png")}function Ls(e){var t="";if(e!=null){for(var r=new Array,i=0;i<256;++i)r[i]=String.fromCharCode(i);for(var s=e.length,i=0;i<s;i++)t+=r[e[i]]}return t}function Di(){var e="getFileViewerCode_"+U.settings.id.replace(/[^a-z0-9]/g,"_"),t=gr[e];return t}async function Us(){function e(h,d,f){$('<input type="hidden"/>').attr("name",d).val(f).appendTo(h)}if(confirm("Open code sample with image in 8bitworkshop?")){var t=U.settings.id.split(".")[0],r=$(document.forms.ideForm);r.empty(),t=="atari8"&&(t="atari8-800"),t=="cpc"&&(t="cpc.6128"),e(r,"platform",t);var i="viewer-"+vt()+".asm",s=vt()+".bin";e(r,"file0_name",i);var l=Di()();l=l.replace("$DATAFILE",vt()+".bin"),e(r,"file0_data",l),e(r,"file0_type","utf8"),e(r,"file1_name",s),e(r,"file1_data",btoa(Ls(Pi()))),e(r,"file1_type","binary"),r.submit()}}function _r(e){$("#sourceName").text(e||"(none)")}function Mr(e){e.type.startsWith("image/")&&(Ve=e.name||"pasted.png",$t="",Er.value="",_r(Ve),Xt(URL.createObjectURL(e)))}function Gs(){let e=document.getElementById("dropOverlay"),t=0;["dragover","drop"].forEach(r=>{window.addEventListener(r,i=>{i.preventDefault()})}),window.addEventListener("dragenter",r=>{r.preventDefault(),t++,e.classList.add("dragover")}),window.addEventListener("dragleave",r=>{r.preventDefault(),--t<=0&&(t=0,e.classList.remove("dragover"))}),window.addEventListener("drop",r=>{var s,l;r.preventDefault(),t=0,e.classList.remove("dragover");let i=(l=(s=r.dataTransfer)==null?void 0:s.files)==null?void 0:l[0];i&&Mr(i)}),window.addEventListener("paste",r=>{var s;let i=(s=r.clipboardData)==null?void 0:s.items;if(i){for(let l of Array.from(i))if(l.type.startsWith("image/")){let h=l.getAsFile();if(h){Mr(h),r.preventDefault();break}}}})}function Ri(){let e={sys:U.settings.id,image:$t};window.location.hash="#"+$.param(e)}function Ns(e){e.startsWith("?")&&(e=e.substr(1));var t=e.split("&");if(!t||t.length==0)return{};for(var r={},i=0;i<t.length;++i){var s=t[i].split("=",2);s.length==1?r[s[0]]="":r[s[0]]=decodeURIComponent(s[1].replace(/\+/g," "))}return r}function Hs(e){let t=$("#targetFormatSelect");t.empty();let[r,i]=e.name.split(" ("),s=new Set,l=null;mt.forEach(h=>{if(h==null)t.append($("<option disabled></option>"));else{let[d,f]=h.name.split(" ("),A=$("<option />").text(h.name).val(h.id);if(d==r)l||(l=$("<optgroup />").attr("label",r),t.append(l)),l.append(A);else if(!s.has(d)){let m=$("<option />").text(d).val(h.id);t.append(m)}s.add(d)}}),t.val(e.id)}function $s(){if(window.addEventListener("load",function(){_s(),document.querySelector('input[type="file"]').addEventListener("change",function(s){var l=s.target,h=l.files&&l.files[0];h&&Mr(h)}),Gs(),vi.forEach(s=>{$('<a class="dropdown-item" href="#"></a>').text(s).appendTo("#examplesMenu")}),$("#examplesMenu").click(s=>{var l=$(s.target).text();Ve=$t=l,_r(l),Xt("images/"+l),Er.value=""}),_i.forEach((s,l)=>{var h=$("<option />").text(s.name).val(l);$("#diffuseTypeSelect").append(h)}),ys.forEach((s,l)=>{var h=$("<option />").text(s.name).val(s.id);$("#errorFuncSelect").append(h)}),U.pixelsAvailable=s=>{Ps(It,s.img),ks(s.pal)};let t=Ns(window.location.hash.substring(1)),r=t.sys||mt[0].id,i=Qt[r];Bi(i),Ve=$t=t.image||"seurat.jpg",_r(Ve),Xt("images/"+Ve),$("#diffuseSlider").on("change",je),$("#orderedSlider").on("change",je),$("#noiseSlider").on("change",je),$("#diversitySlider").on("change",ht),$("#brightSlider").on("change",ht),$("#contrastSlider").on("change",ht),$("#saturationSlider").on("change",ht),$("#resetButton").on("click",je),$("#diffuseTypeSelect").on("change",je),$("#targetFormatSelect").change(s=>{var l=s.target.selectedOptions[0];l&&Bi(Qt[l.value])}),$("#errorFuncSelect").on("change",je),$("#openImageBtn").click(()=>Er.click()),$("#downloadImageBtn").click(Os),$("#downloadNativeBtn").click(Fs),$("#gotoIDE").click(Us)}),window.location.search=="?printmeta"){let t=function(){var r="";mt.forEach(i=>{i&&(r+="* "+i.name+" - "+Mi(i)+`
`)}),console.log(r)};var e=t;t()}}$s();export{U as dithertron,$s as startUI};
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

pica/dist/pica.mjs:
  (*!
  
  pica
  https://github.com/nodeca/pica
  
  *)
*/
//# sourceMappingURL=ui.js.map
