!function(t){var e={};function i(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e,i){"use strict";function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}i.r(e);var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.audioDom=new window.Audio,this.audio=this.audioCtx.createMediaElementSource(this.audioDom)}var e,i,a;return e=t,(i=[{key:"play",value:function(){}},{key:"pause",value:function(){}},{key:"stop",value:function(){}},{key:"destory",value:function(){}},{key:"seek",value:function(){}},{key:"state",value:function(){}}])&&n(e.prototype,i),a&&n(e,a),t}();var o,s=function(t){return!!t&&{edge:t.indexOf("Edge")>-1,trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1===t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/)||!!t.match(/Mobile/g),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Linux")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1===t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,weibo:t.indexOf("Weibo")>-1,facebook:t.indexOf("FBAN")>-1,twitter:t.indexOf("FBAN")>-1,qq:" qq"===t.match(/\sQQ/i),hmlyApp:/himalaya/i.test(t)}};try{o=window&&window.navigator&&window.navigator.userAgent}catch(t){console.error("[isIE]: ".concat(t))}var r=!!o&&s(o).trident;!!o&&s(o).edge;function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var l=function(t){if("object"!==u(t))return u(t);var e=Object.prototype.toString.call(t).length-1;return Object.prototype.toString.call(t).slice(8,e).toLowerCase()};function d(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){h(t,e,i[e])})}return t}function h(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function y(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var p=["loading","playing","paused","stoped","ended","loaderror","playerror"],f=["list-once","list-random","list-loop","single-once","single-loop"],v=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._init(e),this._registerEvent(e),this._presetEvent()}var e,i,n;return e=t,(i=[{key:"play",value:function(){this.audioH5.play()}},{key:"pause",value:function(){this.audioH5.pause()}},{key:"toggle",value:function(){"stoped"!==this.playState&&"ended"!==this.playState&&"loaderror"!==this.playState&&"playerror"!==this.playState&&(null===this.playState||"paused"===this.playState?this.play():this.pause())}},{key:"cut",value:function(t){if(!t.src)return this._logErr("cut -- The src is necessary");this.destory();var e=c({},this.config,t);this._createAudio(e),this._updatePlayList({type:"add",list:d(this._srcAssem(e.src))}),this.play()}},{key:"load",value:function(){this.audioH5.load()}},{key:"seek",value:function(t){if(!r||this.metaDataLoaded){if(!this._checkType(t,"number"))return this.audioH5.currentTime;var e=this.audioH5.duration;t>e&&(t=e),t<0&&(t=0),this.seekValue=null,this.audioH5.currentTime=t}else this.seekValue=t}},{key:"rate",value:function(t){if(!this._checkType(t,"number"))return this.audioH5.playbackRate;t>2&&(t=2),t<.5&&(t=.5),this.audioH5.playbackRate=t,this._updateConfig({rate:t})}},{key:"volume",value:function(t){if(!this._checkType(t,"number"))return this.audioH5.volume;t>1&&(t=1),t<0&&(t=0),this.audioH5.muted=!1,this.audioH5.volume=t,this._updateConfig({volume:t})}},{key:"muted",value:function(t){this._checkType(t,"boolean")&&(this.audioH5.muted=t,this._updateConfig({muted:t}))}},{key:"stop",value:function(){this._setPlayState(p[3]),this.audioH5.pause(),this.audioH5.src="javascript:void(0);"}},{key:"destory",value:function(){this.stop(),this.audioH5=null}},{key:"model",value:function(t){if(!this._checkType(t,"number"))return this._logErr("setPlayModel -- Please pass correct params");this.playModel=f[t]||this.playModel}},{key:"_init",value:function(t){this._createAudio(t),this.config=t,this.playState=null,this.metaDataLoaded=!1,this.seekValue=null,this.debug=t.debug||!1,this.playModel=f[t.playModel||0],this.playIndex=0,this.playList=d(this._srcAssem(t.src)),this.play=this.play.bind(this),this.pause=this.pause.bind(this),this.toggle=this.toggle.bind(this),this.cut=this.cut.bind(this),this.load=this.load.bind(this),this.seek=this.seek.bind(this),this.rate=this.rate.bind(this),this.volume=this.volume.bind(this),this.muted=this.muted.bind(this),this.stop=this.stop.bind(this),this.destory=this.destory.bind(this),this.model=this.model.bind(this)}},{key:"_createAudio",value:function(t){this.audioH5=new window.Audio,this.audioH5.autoplay=t.autoplay||!1,this.audioH5.loop=t.loop||!1,this.audioH5.src=this._srcAssem(t.src)[0],this.audioH5.preload=t.preload||!1,this.audioH5.volume=t.volume||0===t.volume?0:1,this.audioH5.muted=t.muted||!1,this.audioH5.playbackRate=t.rate||t.playbackRate||1,this.audioH5.currentTime=t.seek||t.currentTime||0,this.audioH5.controls=!1}},{key:"_srcAssem",value:function(t){return t?this._checkType(t,"array",!0)?d(t):[t]:["javascript:void(0);"]}},{key:"_updateConfig",value:function(t){this.config=c({},this.config,t)}},{key:"_setPlayState",value:function(t){if(this._checkType(t,"string")&&this.playState!==t){var e=this.audioH5.readyState,i=this.audioH5.paused,n=this.audioH5.ended,a=this.audioH5.seeking;switch(t){case p[0]:if(i||n||4===e)return!1;break;case p[1]:if(i||n||a||4!==e)return!1;break;case p[2]:if(n)return!1}return this._log("setPlayState - ".concat(t)),this.playState=t,this.playState}}},{key:"_setPlayIndex",value:function(t){var e=this.playModel,i=this.playList.length-1;if(0!==t)switch(e){case"list-once":this.playIndex=t||(i>=this.playIndex?++this.playIndex:this.playIndex);break;case"list-random":this.playIndex=t||Math.round(Math.random()*i);break;case"list-loop":this.playIndex=t||(i>this.playIndex?++this.playIndex:0);break;case"single-once":case"single-loop":this.playIndex=t||this.playIndex;break;default:this.playIndex=t||this.playIndex}else this.playIndex=0}},{key:"_resetPlayList",value:function(){this.playList=[],this._setPlayIndex(0)}},{key:"_updatePlayList",value:function(t){var e=t.type,i=t.list,n=t.index;switch(e){case"add":this.playList=[].concat(d(this.playList),d(i));break;case"delete":this.playList.splice(n,1);break;case"reset":this._resetPlayList();break;default:this._resetPlayList()}}},{key:"_onplay",value:function(t){this._bindEvent(t,"play")}},{key:"_onready",value:function(t){this._bindEvent(t,"playing")}},{key:"_oncanplay",value:function(t){this._bindEvent(t,"canplaythrough")}},{key:"_onpause",value:function(t){this._bindEvent(t,"pause")}},{key:"_onend",value:function(t){this._bindEvent(t,"ended")}},{key:"_onloading",value:function(t){this._bindEvent(t,"loadstart")}},{key:"_onloaded",value:function(t){this._bindEvent(t,"loadedmetadata")}},{key:"_onprogress",value:function(t){this._bindEvent(t,"progress")}},{key:"_onvolume",value:function(t){this._bindEvent(t,"volumechange")}},{key:"_onseeking",value:function(t){this._bindEvent(t,"seeking")}},{key:"_onseeked",value:function(t){this._bindEvent(t,"seeked")}},{key:"_onratechange",value:function(t){this._bindEvent(t,"ratechange")}},{key:"_ontimeupdate",value:function(t){this._bindEvent(t,"timeupdate")}},{key:"_onloaderror",value:function(t){this._bindEvent(t,"error")}},{key:"_onplayerror",value:function(t){this._bindEvent(t,"stalled")}},{key:"_presetEvent",value:function(){var t=this;this._bindEvent(function(e){return t.playState===p[1]&&t._setPlayState(p[0])},"loadstart"),this._bindEvent(function(e){return t.playState===p[1]&&t._setPlayState(p[0])},"durationchange"),this._bindEvent(function(e){return t.metaDataLoaded=!0,t.seekValue&&t._seek(t.seekValue),t.playState===p[1]&&t._setPlayState(p[0])},"loadedmetadata"),this._bindEvent(function(e){return t.playState===p[1]&&t._setPlayState(p[0])},"loadeddata"),this._bindEvent(function(e){return t.playState===p[1]&&t._setPlayState(p[0])},"progress"),this._bindEvent(function(e){return t.playState===p[1]&&t._setPlayState(p[0])},"seeking"),this._bindEvent(function(e){return t._setPlayState(p[1])},"play"),this._bindEvent(function(e){return t.playState===p[0]&&t._setPlayState(p[1])},"playing"),this._bindEvent(function(e){return t.playState===p[0]&&t._setPlayState(p[1])},"seeked"),this._bindEvent(function(e){return t.playState===p[0]&&t._setPlayState(p[1])},"canplaythrough"),this._bindEvent(function(e){return t._setPlayState(p[2])},"pause"),this._bindEvent(function(e){t.abortLoad=!0,t._log("abort"),t._setPlayState(p[3])},"abort"),this._bindEvent(function(e){if(t._stop(),t._setPlayIndex(),"single-once"!==t.playModel&&t.playList[t.playIndex]){var i=t.playList[t.playIndex];return t.audio.src=i,t.audio.play(),t._setPlayState(p[1])}return t._setPlayState(p[4])},"ended"),this._bindEvent(function(e){if(!t.abortLoad)return t._log("error"),t._setPlayState(p[5]);t.abortLoad=!1},"error"),this._bindEvent(function(e){return t._logErr("stalled -- ".concat(e)),t._setPlayState(p[6])},"stalled"),this._bindEvent(function(e){return t._log("purposing to suspend loading source")},"suspend")}},{key:"_bindEvent",value:function(t,e){if(!this._checkType(e,"string"))return this._logErr("[bind event name is not string");this._checkType(t,"function")&&function(t,e,i){if(!window)return!1;var n=i||window;window.addEventListener?n.addEventListener(t,e,!1):n.attachEvent("on".concat(t),e)}(e,t,this.audioH5)}},{key:"_removeEvent",value:function(t,e){if(!this._checkType(e,"string"))return this._logErr("[unbind event name is not string");this._checkType(t,"function")&&function(t,e,i){if(!window)return!1;var n=i||window;window.removeEventListener?n.removeEventListener(t,e,!1):n.detachEvent("on".concat(t),e)}(e,t,this.audioH5)}},{key:"_registerEvent",value:function(t){var e=this;Object.keys(t).forEach(function(i){if(0===i.indexOf("on")){var n="_".concat(i);e[n]&&e[n](t[i])}})}},{key:"_checkType",value:function(t,e,i){return"string"==typeof e&&(l(t)===e||(!i&&this._logErr("Your parameter(".concat(t,") type is ").concat(l(t),", please pass the ").concat(e," type")),!1))}},{key:"_log",value:function(t){return this.debug&&console.log("[AUDIO_H5 MESSAGE]:",t)}},{key:"_logErr",value:function(t){return this.debug&&console.error("[AUDIO_H5 ERROR]:",t)}},{key:"props",set:function(t){var e=t.prop,i=t.value;this.audioH5[e]&&!this._checkType(this.audioH5[e],"function")&&(this.audioH5[e]=i,this._updateConfig({prop:i}))}}])&&y(e.prototype,i),n&&y(e,n),t}();function b(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}i.d(e,"HMLY_AUDIO",function(){return _});var _=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audio=this._createAudio(e),this.play=this.audio.play,this.pause=this.audio.pause,this.toggle=this.audio.toggle,this.cut=this.audio.cut,this.load=this.audio.load,this.seek=this.audio.seek,this.volume=this.audio.volume,this.muted=this.audio.muted,this.stop=this.audio.stop,this.destory=this.audio.destory,this.model=this.audio.model}var e,i,n;return e=t,(i=[{key:"_createAudio",value:function(t){var e,i,n=t.usingWebAudio;try{e=n&&(window.AudioContext||window.webkitAudioContext)?new a(t):window.Audio?new v(t):null}catch(t){i=t,console.error("[HMLY_AUDIO ERROR]:",i),e=null}return e}},{key:"duration",get:function(){return this.audio.duration}},{key:"playState",get:function(){return this.audio.playState}},{key:"networkState",get:function(){return this.audio.networkState}}])&&b(e.prototype,i),n&&b(e,n),t}();e.default=_},,function(t,e,i){i(3)},function(t,e,i){(function(e){t.exports=e.HMAudio=i(0)}).call(this,i(4))},function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i}]);