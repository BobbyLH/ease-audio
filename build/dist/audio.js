(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/EaseAudio.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_expose-loader@0.7.5@expose-loader/index.js?EaseAudio!./src/Audio.js-exposed":
/*!******************************************************************************************!*\
  !*** ./node_modules/_expose-loader@0.7.5@expose-loader?EaseAudio!./src/Audio.js-exposed ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global[\"EaseAudio\"] = __webpack_require__(/*! -!./node_modules/_babel-loader@8.0.4@babel-loader/lib!./Audio.js */ \"./src/Audio.js\");\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/_webpack@4.27.1@webpack/buildin/global.js */ \"./node_modules/_webpack@4.27.1@webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/Audio.js-exposed?./node_modules/_expose-loader@0.7.5@expose-loader?EaseAudio");

/***/ }),

/***/ "./node_modules/_webpack@4.27.1@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/Audio.js":
/*!**********************!*\
  !*** ./src/Audio.js ***!
  \**********************/
/*! exports provided: EaseAudio, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EaseAudio\", function() { return EaseAudio; });\n/* harmony import */ var _audio_ctx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio_ctx */ \"./src/audio_ctx.js\");\n/* harmony import */ var _audio_h5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio_h5 */ \"./src/audio_h5.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar EaseAudio =\n/*#__PURE__*/\nfunction () {\n  function EaseAudio(config) {\n    _classCallCheck(this, EaseAudio);\n\n    this.audio = this._createAudio(config);\n    this.init = this.audio.init;\n    this.play = this.audio.play;\n    this.pause = this.audio.pause;\n    this.toggle = this.audio.toggle;\n    this.cut = this.audio.cut;\n    this.load = this.audio.load;\n    this.seek = this.audio.seek;\n    this.volume = this.audio.volume;\n    this.muted = this.audio.muted;\n    this.stop = this.audio.stop;\n    this.unload = this.audio.unload;\n    this.model = this.audio.model;\n  }\n\n  _createClass(EaseAudio, [{\n    key: \"_createAudio\",\n    value: function _createAudio(config) {\n      var audio;\n\n      var _ref = config || {},\n          usingWebAudio = _ref.usingWebAudio;\n\n      try {\n        if (usingWebAudio && (window.AudioContext || window.webkitAudioContext)) {\n          audio = new _audio_ctx__WEBPACK_IMPORTED_MODULE_0__[\"default\"](config);\n        } else if (window.Audio) {\n          audio = new _audio_h5__WEBPACK_IMPORTED_MODULE_1__[\"default\"](config);\n        } else {\n          audio = null;\n        }\n      } catch (err) {\n        console.error('[EASE_AUDIO ERROR]:', err);\n        audio = null;\n      }\n\n      return audio;\n    }\n  }, {\n    key: \"duration\",\n    get: function get() {\n      return this.audio.duration;\n    }\n  }, {\n    key: \"playState\",\n    get: function get() {\n      return this.audio.playState;\n    }\n  }, {\n    key: \"playId\",\n    get: function get() {\n      return this.audio.playList[this.audio.playIndex].id;\n    }\n  }, {\n    key: \"networkState\",\n    get: function get() {\n      return this.audio.networkState;\n    }\n  }]);\n\n  return EaseAudio;\n}();\n/* harmony default export */ __webpack_exports__[\"default\"] = (EaseAudio);\n\n//# sourceURL=webpack:///./src/Audio.js?");

/***/ }),

/***/ "./src/EaseAudio.js":
/*!**************************!*\
  !*** ./src/EaseAudio.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! expose-loader?EaseAudio!./Audio.js */ \"./node_modules/_expose-loader@0.7.5@expose-loader/index.js?EaseAudio!./src/Audio.js-exposed\");\n\n//# sourceURL=webpack:///./src/EaseAudio.js?");

/***/ }),

/***/ "./src/audio_ctx.js":
/*!**************************!*\
  !*** ./src/audio_ctx.js ***!
  \**************************/
/*! exports provided: AudioCtx, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AudioCtx\", function() { return AudioCtx; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar AudioCtx =\n/*#__PURE__*/\nfunction () {\n  function AudioCtx() {\n    _classCallCheck(this, AudioCtx);\n\n    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n    this.audioDom = new window.Audio();\n    this.audio = this.audioCtx.createMediaElementSource(this.audioDom);\n  }\n\n  _createClass(AudioCtx, [{\n    key: \"play\",\n    value: function play() {}\n  }, {\n    key: \"pause\",\n    value: function pause() {}\n  }, {\n    key: \"stop\",\n    value: function stop() {}\n  }, {\n    key: \"unload\",\n    value: function unload() {}\n  }, {\n    key: \"seek\",\n    value: function seek() {}\n  }]);\n\n  return AudioCtx;\n}();\n/* harmony default export */ __webpack_exports__[\"default\"] = (AudioCtx);\n\n//# sourceURL=webpack:///./src/audio_ctx.js?");

/***/ }),

/***/ "./src/audio_h5.js":
/*!*************************!*\
  !*** ./src/audio_h5.js ***!
  \*************************/
/*! exports provided: AudioH5, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AudioH5\", function() { return AudioH5; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./utils/index.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar playStateSet = ['loading', 'playing', 'paused', 'stoped', 'ended', 'loaderror', 'playerror'];\nvar playModelSet = ['list-once', 'list-random', 'list-loop', 'single-once', 'single-loop'];\nvar logLevel = ['detail', 'warn', 'error'];\nvar defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';\nvar AudioH5 =\n/*#__PURE__*/\nfunction () {\n  function AudioH5(config) {\n    _classCallCheck(this, AudioH5);\n\n    this.isInit = false;\n    this.init = this.init.bind(this);\n    this.play = this.play.bind(this);\n    this.pause = this.pause.bind(this);\n    this.toggle = this.toggle.bind(this);\n    this.cut = this.cut.bind(this);\n    this.load = this.load.bind(this);\n    this.seek = this.seek.bind(this);\n    this.rate = this.rate.bind(this);\n    this.volume = this.volume.bind(this);\n    this.muted = this.muted.bind(this);\n    this.stop = this.stop.bind(this);\n    this.unload = this.unload.bind(this);\n    this.model = this.model.bind(this);\n    this.init(config);\n  }\n\n  _createClass(AudioH5, [{\n    key: \"init\",\n    value: function init(config) {\n      if (!this.isInit && config && this._checkType(config, 'object', true) && JSON.stringify(config) !== '{}') {\n        this._initial(config);\n\n        this._presetEvent();\n\n        this._registerEvent(config);\n      }\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this._checkInit() && this.audioH5.play();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this._checkInit() && this.audioH5.pause();\n    }\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      if (this._checkInit() && this.playState !== 'stoped' && this.playState !== 'ended' && this.playState !== 'loaderror' && this.playState !== 'playerror') {\n        this.playState === null || this.playState === 'paused' ? this.play() : this.pause();\n      }\n    }\n  }, {\n    key: \"cut\",\n    value: function cut(params) {\n      if (this._checkType(params, 'object', true)) this._updateConfig(params);\n\n      this._cut({\n        src: params && params.src\n      });\n    }\n  }, {\n    key: \"load\",\n    value: function load() {\n      this._checkInit() && this.audioH5.load();\n    }\n  }, {\n    key: \"seek\",\n    value: function seek(val) {\n      if (this._checkInit()) {\n        if (this._checkType(val, 'number')) {\n          // IE cannot set currentTime when the metaData is loading\n          if (_utils__WEBPACK_IMPORTED_MODULE_0__[\"isIE\"] && !this.metaDataLoaded) {\n            this.seekValue = val;\n            return;\n          }\n\n          var duration = this.audioH5.duration;\n          if (val > duration) val = duration;\n          if (val < 0) val = 0;\n          this.seekValue = null;\n          this.audioH5.currentTime = val;\n        } else {\n          return this.audioH5.currentTime;\n        }\n      }\n    }\n  }, {\n    key: \"rate\",\n    value: function rate(val) {\n      if (this._checkInit()) {\n        if (this._checkType(val, 'number')) {\n          if (val > 2) val = 2;\n          if (val < 0.5) val = 0.5;\n          this.audioH5.playbackRate = val;\n\n          this._updateConfig({\n            rate: val\n          });\n        } else {\n          return this.audioH5.playbackRate;\n        }\n      }\n    }\n  }, {\n    key: \"volume\",\n    value: function volume(val) {\n      if (this._checkInit()) {\n        if (this._checkType(val, 'number')) {\n          if (val > 1) val = 1;\n          if (val < 0) val = 0;\n          this.audioH5.muted = false;\n          this.audioH5.volume = val;\n\n          this._updateConfig({\n            volume: val\n          });\n        } else {\n          return this.audioH5.volume;\n        }\n      }\n    }\n  }, {\n    key: \"muted\",\n    value: function muted(bool) {\n      if (this._checkInit() && this._checkType(bool, 'boolean')) {\n        this.audioH5.muted = bool;\n\n        this._updateConfig({\n          muted: bool\n        });\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this._checkInit()) {\n        this._setPlayState(playStateSet[3]);\n\n        this.audioH5.currentTime = 0;\n        this.audioH5.pause();\n        var id = this.playList[this.playIndex] && this.playList[this.playIndex].id;\n        this.onStop && this.onStop(id);\n      }\n    }\n  }, {\n    key: \"unload\",\n    value: function unload() {\n      this.stop();\n\n      this._rewriteEvent();\n\n      this.audioH5.src = defaultSrc;\n      this.audioH5 = null;\n      this.isInit = false;\n    } // set play model\n\n  }, {\n    key: \"model\",\n    value: function model(modelIndex) {\n      if (this._checkInit() && this._checkType(modelIndex, 'number')) {\n        // model contain: list-once(0), list-random(1), list-loop(2), single-once(3), single-loop(4)\n        this.playModel = playModelSet[modelIndex] || this.playModel;\n      }\n    }\n    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */\n\n  }, {\n    key: \"_initial\",\n    value: function _initial(config) {\n      this.config = config; // preserve initial config\n\n      this.playState = null;\n      this.debug = config.debug || false;\n      this.logLevel = config.logLevel || logLevel[2];\n      this.playId = 1000;\n      this.playModel = playModelSet[config.playModel && this._checkType(config.playModel, 'number') && config.playModel || config.loop && 3 || 0];\n      this.playIndex = 0;\n      this.playList = new Array(0);\n      this.buffered = new Array(0);\n      this.eventMethods = {}; // create Audio Object\n\n      this._createAudio(config);\n    }\n  }, {\n    key: \"_createAudio\",\n    value: function _createAudio(config) {\n      this._updatePlayList({\n        type: 'add',\n        list: _toConsumableArray(this._srcAssem(config.src))\n      });\n\n      this.audioH5 = new window.Audio();\n      this.audioH5.autoplay = config.autoplay || false;\n      this.audioH5.loop = config.loop || false;\n      this.audioH5.src = this.playList[this.playIndex].src;\n      this.audioH5.preload = config.preload || false;\n      this.audioH5.volume = config.volume || config.volume === 0 ? 0 : 1;\n      this.audioH5.muted = config.muted || false;\n      this.audioH5.playbackRate = config.rate || config.playbackRate || 1;\n      this.audioH5.currentTime = config.seek || config.currentTime || 0;\n      this.audioH5.controls = false;\n      this.isInit = true;\n    }\n  }, {\n    key: \"_srcAssem\",\n    value: function _srcAssem(srcs) {\n      var _this = this;\n\n      var srcArr = srcs ? this._checkType(srcs, 'array', true) ? _toConsumableArray(srcs.map(function (v) {\n        var data = {\n          id: _this.playId,\n          src: v\n        };\n        _this.playId++;\n        return data;\n      })) : _toConsumableArray([srcs].map(function (v) {\n        var data = {\n          id: _this.playId,\n          src: v\n        };\n        _this.playId++;\n        return data;\n      })) : _toConsumableArray([defaultSrc].map(function (v) {\n        var data = {\n          id: _this.playId,\n          src: v\n        };\n        _this.playId++;\n        return data;\n      }));\n      return srcArr;\n    }\n  }, {\n    key: \"_updateConfig\",\n    value: function _updateConfig(params) {\n      this.config = _objectSpread({}, this.config, params);\n    } // set play state\n\n  }, {\n    key: \"_setPlayState\",\n    value: function _setPlayState(state) {\n      if (this._checkType(state, 'string') && this.playState !== state) {\n        var readyState = this.audioH5.readyState;\n        var paused = this.audioH5.paused;\n        var ended = this.audioH5.ended;\n        var seeking = this.audioH5.seeking; // filter impossible state\n\n        switch (state) {\n          case playStateSet[0]:\n            // loading\n            if (paused || ended || readyState === 4) return false;\n            break;\n\n          case playStateSet[1]:\n            if (paused || ended || seeking || readyState !== 4) return false;\n            break;\n\n          case playStateSet[2]:\n            if (ended) return false;\n            break;\n        }\n\n        this._log(\"setPlayState - \".concat(state));\n\n        this.playState = state;\n        return this.playState;\n      }\n    } // set play index\n\n  }, {\n    key: \"_setPlayIndex\",\n    value: function _setPlayIndex(index) {\n      var playModel = this.playModel;\n      var maxIndex = this.playList.length - 1;\n\n      if (index === 0) {\n        this.playIndex = 0;\n        return;\n      }\n\n      switch (playModel) {\n        case 'list-once':\n          this.playIndex = index || (maxIndex >= this.playIndex ? ++this.playIndex : this.playIndex);\n          break;\n\n        case 'list-random':\n          this.playIndex = index || Math.round(Math.random() * maxIndex);\n          break;\n\n        case 'list-loop':\n          this.playIndex = index || (maxIndex > this.playIndex ? ++this.playIndex : 0);\n          break;\n\n        case 'single-once':\n          this.playIndex = index || this.playIndex;\n          break;\n\n        case 'single-loop':\n          this.playIndex = index || this.playIndex;\n          break;\n\n        default:\n          this.playIndex = index || this.playIndex;\n      }\n    } // reset play list\n\n  }, {\n    key: \"_resetPlayList\",\n    value: function _resetPlayList() {\n      this.playList = [];\n\n      this._setPlayIndex(0);\n    } // update play list\n\n  }, {\n    key: \"_updatePlayList\",\n    value: function _updatePlayList(_ref) {\n      var type = _ref.type,\n          list = _ref.list,\n          index = _ref.index;\n\n      switch (type) {\n        case 'add':\n          this.playList = [].concat(_toConsumableArray(this.playList), _toConsumableArray(list));\n          break;\n\n        case 'delete':\n          this.playList.splice(index, 1);\n          break;\n\n        case 'reset':\n          this._resetPlayList();\n\n          break;\n\n        default:\n          this._resetPlayList();\n\n      }\n    }\n  }, {\n    key: \"_cut\",\n    value: function _cut(_ref2) {\n      var src = _ref2.src,\n          autoCut = _ref2.autoCut;\n\n      // can't cut audio if the playModel is single-once\n      if (this._checkInit() && this.playModel !== 'single-once') {\n        this.metaDataLoaded = false;\n        this.seekValue = null;\n\n        this._setPlayIndex(src && this.playList.length);\n\n        if (!src && !this.playList[this.playIndex]) return this._setPlayState(playStateSet[4]);\n        var nextSrc = src || this.playList[this.playIndex].src;\n\n        if (autoCut) {\n          // resolve the IOS auto play problem\n          this.stop();\n          this.audioH5.src = nextSrc;\n          this.play();\n        } else {\n          this.unload();\n\n          var config = _objectSpread({}, this.config, {\n            src: nextSrc\n          });\n\n          this._createAudio(config);\n\n          this._presetEvent();\n\n          this._registerEvent(config);\n\n          this.play();\n        }\n\n        return this._setPlayState(playStateSet[1]);\n      }\n\n      return this._setPlayState(playStateSet[4]);\n    }\n    /* expose binding event */\n\n  }, {\n    key: \"_onplay\",\n    value: function _onplay(cb) {\n      this.onPlay = cb;\n    }\n  }, {\n    key: \"_onpause\",\n    value: function _onpause(cb) {\n      this.onPause = cb;\n    }\n  }, {\n    key: \"_onstop\",\n    value: function _onstop(cb) {\n      this.onStop = cb;\n    }\n  }, {\n    key: \"_onend\",\n    value: function _onend(cb) {\n      this.onEnd = cb;\n    }\n  }, {\n    key: \"_onload\",\n    value: function _onload(cb) {\n      this.onLoad = cb;\n    }\n  }, {\n    key: \"_onprogress\",\n    value: function _onprogress(cb) {\n      this.onProgress = cb;\n    }\n  }, {\n    key: \"_onvolume\",\n    value: function _onvolume(cb) {\n      this.onVolume = cb;\n    }\n  }, {\n    key: \"_onseek\",\n    value: function _onseek(cb) {\n      this.onSeek = cb;\n    }\n  }, {\n    key: \"_onrate\",\n    value: function _onrate(cb) {\n      this.onRate = cb;\n    }\n  }, {\n    key: \"_ontimeupdate\",\n    value: function _ontimeupdate(cb) {\n      this.onTimeupdate = cb;\n    }\n  }, {\n    key: \"_onloaderror\",\n    value: function _onloaderror(cb) {\n      this.onLoadError = cb;\n    }\n  }, {\n    key: \"_onplayerror\",\n    value: function _onplayerror(cb) {\n      this.onPlayError = cb;\n    }\n  }, {\n    key: \"_presetEvent\",\n    value: function _presetEvent() {\n      var _this2 = this;\n\n      this.eventMethods = {\n        // loading state\n        loadstart: function loadstart(e) {\n          _this2._logEvent('loadstart');\n\n          _this2.playState === playStateSet[1] && _this2._setPlayState(playStateSet[0]);\n          _this2.onLoad && _this2.onLoad(e);\n          return true;\n        },\n        // playing state\n        playing: function playing(e) {\n          _this2._logEvent('playing');\n\n          _this2._setPlayState(playStateSet[1]);\n\n          _this2.onPlay && _this2.onPlay(e);\n          return true;\n        },\n        canplaythrough: function canplaythrough(e) {\n          _this2._logEvent('canplaythrough');\n\n          _this2.playState === playStateSet[0] && _this2._setPlayState(playStateSet[1]);\n          return true;\n        },\n        // paused state\n        pause: function pause(e) {\n          _this2._logEvent('pause');\n\n          _this2._setPlayState(playStateSet[2]);\n\n          _this2.onPause && _this2.onPause(e);\n          return true;\n        },\n        // ended state\n        ended: function ended(e) {\n          _this2._logEvent('ended');\n\n          if (_this2.isEnd) {\n            _this2.isEnd = false;\n          } else {\n            _this2.isEnd = true;\n\n            _this2._cut({\n              autoCut: true\n            });\n\n            _this2.onEnd && _this2.onEnd(e);\n          }\n\n          return true;\n        },\n        // loaderror state\n        error: function error(e) {\n          _this2._logEvent('error');\n\n          _this2._setPlayState(playStateSet[5]);\n\n          _this2.onLoadError && _this2.onLoadError(e);\n          return true;\n        },\n        // playerror state\n        stalled: function stalled(e) {\n          _this2._logEvent(\"stalled\");\n\n          _this2._setPlayState(playStateSet[6]);\n\n          _this2.onPlayError && _this2.onPlayError(e);\n          return true;\n        },\n        // others\n        progress: function progress(e) {\n          _this2._logEvent('progress');\n\n          var ranges = e.target.buffered;\n          var total = e.total || 1;\n          var buffered = 0;\n          var loaded = e.loaded || 0;\n          var progress = loaded / total;\n\n          if (ranges && ranges.length) {\n            for (var i = 0, j = ranges.length; i < j; i++) {\n              _this2.buffered.push({\n                'start': ranges.start(i) * 1000,\n                'end': ranges.end(i) * 1000\n              });\n            }\n\n            buffered = (ranges.end(0) - ranges.start(0)) * 1000;\n            loaded = Math.min(1, buffered / (e.target.duration * 1000));\n            progress = loaded / total;\n          }\n\n          _this2.onProgress && _this2.onProgress({\n            e: e,\n            progress: progress\n          });\n          return true;\n        },\n        durationchange: function durationchange(e) {\n          return _this2._logEvent('durationchange');\n        },\n        loadedmetadata: function loadedmetadata(e) {\n          _this2._logEvent('loadedmetadata');\n\n          _this2.metaDataLoaded = true;\n          _this2.seekValue && _this2.seek(_this2.seekValue);\n          return true;\n        },\n        loadeddata: function loadeddata(e) {\n          return _this2._logEvent('loadeddata');\n        },\n        timeupdate: function timeupdate(e) {\n          // playState is loading but actually is playing\n          if (_this2.playState === playStateSet[0]) {\n            _this2._logEvent(\"timeupdate's playing\");\n\n            _this2._setPlayState(playStateSet[1]);\n\n            _this2.onPlay && _this2.onPlay(e);\n          } // Depending on currentTime and duration to mimic end event\n\n\n          var isEnd = _this2.audioH5.duration && _this2.audioH5.currentTime === _this2.audioH5.duration;\n\n          if (isEnd) {\n            _this2._logEvent(\"timeupdate's ended\");\n\n            if (_this2.isEnd) {\n              _this2.isEnd = false;\n            } else {\n              _this2.isEnd = true;\n\n              _this2._cut({\n                autoCut: true\n              });\n\n              _this2.onEnd && _this2.onEnd(e);\n            }\n          }\n\n          _this2.onTimeupdate && _this2.onTimeupdate(e);\n          return true;\n        },\n        seeking: function seeking(e) {\n          _this2._logEvent('seeking');\n\n          _this2.onSeek && _this2.onSeek(e);\n          return true;\n        },\n        seeked: function seeked(e) {\n          _this2._logEvent('seeked');\n\n          return true;\n        },\n        play: function play(e) {\n          _this2._logEvent('play');\n\n          return true;\n        },\n        volumechange: function volumechange(e) {\n          _this2._logEvent('volumechange');\n\n          _this2.onVolume && _this2.onVolume(e);\n          return true;\n        },\n        ratechange: function ratechange(e) {\n          _this2._logEvent('ratechange');\n\n          _this2.onRate && _this2.onRate(e);\n          return true;\n        },\n        abort: function abort(e) {\n          return _this2._logEvent('abort');\n        },\n        suspend: function suspend(e) {\n          return _this2._logEvent('suspend');\n        }\n      };\n\n      for (var k in this.eventMethods) {\n        this._bindEvent(this.eventMethods[k], k);\n      }\n    }\n  }, {\n    key: \"_bindEvent\",\n    value: function _bindEvent(cb, event) {\n      if (!this._checkType(event, 'string')) return this._logErr(\"[bind event name is not string\");\n      this._checkType(cb, 'function') && Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"addListener\"])(event, cb, this.audioH5);\n    }\n  }, {\n    key: \"_removeEvent\",\n    value: function _removeEvent(cb, event) {\n      if (!this._checkType(event, 'string')) return this._logErr(\"[unbind event name is not string\");\n      this._checkType(cb, 'function') && Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"removeListener\"])(event, cb, this.audioH5);\n    }\n  }, {\n    key: \"_registerEvent\",\n    value: function _registerEvent(config) {\n      var _this3 = this;\n\n      var eventNames = Object.keys(config);\n      eventNames.forEach(function (v) {\n        if (v.indexOf('on') === 0) {\n          var eventName = \"_\".concat(v);\n          _this3[eventName] && _this3[eventName](config[v]);\n        }\n      });\n    }\n  }, {\n    key: \"_rewriteEvent\",\n    value: function _rewriteEvent() {\n      if (this._checkInit()) {\n        for (var k in this.eventMethods) {\n          this._removeEvent(this.eventMethods[k], k);\n        }\n      }\n    }\n  }, {\n    key: \"_checkType\",\n    value: function _checkType(element, type, closeLog) {\n      if (typeof type !== 'string') return false;\n\n      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getType\"])(element) !== type) {\n        !closeLog && this._logErr(\"Your parameter(\".concat(element, \") type is \").concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getType\"])(element), \", please pass the \").concat(type, \" type\"));\n        return false;\n      }\n\n      return true;\n    }\n  }, {\n    key: \"_checkInit\",\n    value: function _checkInit() {\n      if (!this.isInit) {\n        this._logErr(\"The Audio haven't been initiated\");\n\n        return false;\n      }\n\n      return true;\n    }\n  }, {\n    key: \"_logEvent\",\n    value: function _logEvent(event) {\n      var canLog = this.logLevel === 'detail';\n      return canLog && this._log(\"trigger \".concat(event, \" event\"));\n    }\n  }, {\n    key: \"_log\",\n    value: function _log(msg) {\n      var canLog = this.logLevel === 'detail' || this.logLevel === 'warn';\n      return this.debug && canLog && console.log('[EASE_AUDIO_H5 MESSAGE]:', msg);\n    }\n  }, {\n    key: \"_logErr\",\n    value: function _logErr(err) {\n      return this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err);\n    }\n  }, {\n    key: \"duration\",\n    get: function get() {\n      return this.audioH5.duration;\n    }\n  }, {\n    key: \"setAudioConfig\",\n    set: function set(_ref3) {\n      var prop = _ref3.prop,\n          value = _ref3.value;\n\n      if (this.audioH5[prop] && !this._checkType(this.audioH5[prop], 'function')) {\n        this.audioH5[prop] = value;\n\n        this._updateConfig({\n          prop: value\n        });\n      }\n    }\n  }]);\n\n  return AudioH5;\n}();\n/* harmony default export */ __webpack_exports__[\"default\"] = (AudioH5);\n\n//# sourceURL=webpack:///./src/audio_h5.js?");

/***/ }),

/***/ "./utils/IE.js":
/*!*********************!*\
  !*** ./utils/IE.js ***!
  \*********************/
/*! exports provided: isIE, isEdge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isIE\", function() { return isIE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isEdge\", function() { return isEdge; });\n/* harmony import */ var _handleUA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handleUA */ \"./utils/handleUA.js\");\n\n\n\nvar ua;\n\ntry {\n  ua = window && window.navigator && window.navigator.userAgent;\n} catch (error) {\n  console.error(\"[isIE]: \".concat(error));\n}\n\nvar isIE = ua ? Object(_handleUA__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(ua).trident : false;\nvar isEdge = ua ? Object(_handleUA__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(ua).edge : false;\n\n//# sourceURL=webpack:///./utils/IE.js?");

/***/ }),

/***/ "./utils/eventBind.js":
/*!****************************!*\
  !*** ./utils/eventBind.js ***!
  \****************************/
/*! exports provided: addListener, removeListener, preventEvent, stopEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addListener\", function() { return addListener; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeListener\", function() { return removeListener; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"preventEvent\", function() { return preventEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stopEvent\", function() { return stopEvent; });\n // adapt IE add event\n\nvar addListener = function addListener(event, fn, dom) {\n  if (!window) return false;\n  var eventDOM = dom || window;\n\n  if (window.addEventListener) {\n    eventDOM.addEventListener(event, fn, false);\n  } else {\n    eventDOM.attachEvent(\"on\".concat(event), fn);\n  }\n}; // adapt IE remove event\n\nvar removeListener = function removeListener(event, fn, dom) {\n  if (!window) return false;\n  var eventDOM = dom || window;\n\n  if (window.removeEventListener) {\n    eventDOM.removeEventListener(event, fn, false);\n  } else {\n    eventDOM.detachEvent(\"on\".concat(event), fn);\n  }\n}; // prevent default\n\nvar preventEvent = function preventEvent(event) {\n  var e = event || window.event;\n\n  if (e && e.preventDefault) {\n    e.cancelable && !e.defaultPrevented && e.preventDefault();\n  } else {\n    e.returnValue = false;\n  }\n\n  return false;\n}; // stop propagat\n\nvar stopEvent = function stopEvent(event) {\n  var e = event || window.event;\n\n  if (e && e.stopPropagation) {\n    e.stopPropagation();\n  } else {\n    e.cancelBubble = true;\n  }\n};\n\n//# sourceURL=webpack:///./utils/eventBind.js?");

/***/ }),

/***/ "./utils/handleUA.js":
/*!***************************!*\
  !*** ./utils/handleUA.js ***!
  \***************************/
/*! exports provided: getUA, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUA\", function() { return getUA; });\n\n\nfunction getUA(u) {\n  if (!u) return false; // console.log(u)\n\n  var obj = {\n    edge: u.indexOf('Edge') > -1,\n    // Edge内核\n    trident: u.indexOf('Trident') > -1,\n    // IE内核\n    presto: u.indexOf('Presto') > -1,\n    // opera内核\n    webKit: u.indexOf('AppleWebKit') > -1,\n    // 苹果、谷歌内核\n    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,\n    // 火狐内核\n    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g),\n    // 是否为移动终端\n    ios: !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/),\n    // ios终端\n    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,\n    // android终端或者uc浏览器\n    iPhone: u.indexOf('iPhone') > -1,\n    // 是否为iPhone或者QQHD浏览器\n    iPad: u.indexOf('iPad') > -1,\n    // 是否iPad\n    webApp: u.indexOf('Safari') === -1,\n    // 是否web程序，没有头部与底部\n    weixin: u.indexOf('MicroMessenger') > -1,\n    // 是否微信\n    weibo: u.indexOf('Weibo') > -1,\n    // 是否微博\n    facebook: u.indexOf('FBAN') > -1,\n    // 是否facebook\n    twitter: u.indexOf('FBAN') > -1,\n    // 是否twitter\n    qq: u.match(/\\sQQ/i) === ' qq',\n    // 是否QQ\n    hmlyApp: /himalaya/i.test(u) // 是否在 himalaya app\n\n  };\n  return obj;\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (getUA);\n\n//# sourceURL=webpack:///./utils/handleUA.js?");

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: getUA, isIE, isEdge, addListener, removeListener, preventEvent, stopEvent, getType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handleUA_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handleUA.js */ \"./utils/handleUA.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getUA\", function() { return _handleUA_js__WEBPACK_IMPORTED_MODULE_0__[\"getUA\"]; });\n\n/* harmony import */ var _IE_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IE.js */ \"./utils/IE.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isIE\", function() { return _IE_js__WEBPACK_IMPORTED_MODULE_1__[\"isIE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isEdge\", function() { return _IE_js__WEBPACK_IMPORTED_MODULE_1__[\"isEdge\"]; });\n\n/* harmony import */ var _eventBind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventBind */ \"./utils/eventBind.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"addListener\", function() { return _eventBind__WEBPACK_IMPORTED_MODULE_2__[\"addListener\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"removeListener\", function() { return _eventBind__WEBPACK_IMPORTED_MODULE_2__[\"removeListener\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"preventEvent\", function() { return _eventBind__WEBPACK_IMPORTED_MODULE_2__[\"preventEvent\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"stopEvent\", function() { return _eventBind__WEBPACK_IMPORTED_MODULE_2__[\"stopEvent\"]; });\n\n/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type */ \"./utils/type.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getType\", function() { return _type__WEBPACK_IMPORTED_MODULE_3__[\"getType\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./utils/index.js?");

/***/ }),

/***/ "./utils/type.js":
/*!***********************!*\
  !*** ./utils/type.js ***!
  \***********************/
/*! exports provided: getType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getType\", function() { return getType; });\n\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar getType = function getType(obj) {\n  if (_typeof(obj) !== 'object') return _typeof(obj);\n  var len = Object.prototype.toString.call(obj).length - 1;\n  return Object.prototype.toString.call(obj).slice(8, len).toLowerCase();\n};\n\n//# sourceURL=webpack:///./utils/type.js?");

/***/ })

/******/ });
});