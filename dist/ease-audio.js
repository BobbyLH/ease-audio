/* ease-audio */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.EaseAudio = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var AudioCtx =
  /*#__PURE__*/
  function () {
    function AudioCtx() {
      _classCallCheck(this, AudioCtx);

      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.audioDom = new window.Audio();
      this.audio = this.audioCtx.createMediaElementSource(this.audioDom);
    }

    _createClass(AudioCtx, [{
      key: "play",
      value: function play() {}
    }, {
      key: "pause",
      value: function pause() {}
    }, {
      key: "stop",
      value: function stop() {}
    }, {
      key: "unload",
      value: function unload() {}
    }, {
      key: "seek",
      value: function seek() {}
    }]);

    return AudioCtx;
  }();

  function getUA(u) {
    if (!u) return false; // console.log(u)

    var obj = {
      edge: u.indexOf('Edge') > -1,
      // Edge内核
      trident: u.indexOf('Trident') > -1,
      // IE内核
      presto: u.indexOf('Presto') > -1,
      // opera内核
      webKit: u.indexOf('AppleWebKit') > -1,
      // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g),
      // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1,
      // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1,
      // 是否iPad
      webApp: u.indexOf('Safari') === -1,
      // 是否web程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1,
      // 是否微信
      weibo: u.indexOf('Weibo') > -1,
      // 是否微博
      facebook: u.indexOf('FBAN') > -1,
      // 是否facebook
      twitter: u.indexOf('FBAN') > -1,
      // 是否twitter
      qq: u.match(/\sQQ/i) === ' qq',
      // 是否QQ
      hmlyApp: /himalaya/i.test(u) // 是否在 himalaya app

    };
    return obj;
  }

  var ua;

  try {
    ua = window && window.navigator && window.navigator.userAgent;
  } catch (error) {
    console.error("[isIE]: ".concat(error));
  }

  var isIE = ua ? getUA(ua).trident : false;
  var isEdge = ua ? getUA(ua).edge : false;

  // adapt IE add event
  var addListener = function addListener(event, fn, dom) {
    if (!window) return false;
    var eventDOM = dom || window;

    if (window.addEventListener) {
      eventDOM.addEventListener(event, fn, false);
    } else {
      eventDOM.attachEvent("on".concat(event), fn);
    }
  }; // adapt IE remove event

  var removeListener = function removeListener(event, fn, dom) {
    if (!window) return false;
    var eventDOM = dom || window;

    if (window.removeEventListener) {
      eventDOM.removeEventListener(event, fn, false);
    } else {
      eventDOM.detachEvent("on".concat(event), fn);
    }
  }; // prevent default

  var getType = function getType(obj) {
    if (_typeof(obj) !== 'object') return _typeof(obj);
    var len = Object.prototype.toString.call(obj).length - 1;
    return Object.prototype.toString.call(obj).slice(8, len).toLowerCase();
  };

  var playStateSet = ['loading', 'playing', 'paused', 'stopped', 'ended', 'loaderror', 'playerror'];
  var playModelSet = ['list-once', 'list-random', 'list-loop', 'single-once', 'single-loop'];
  var supportEvents = ['onplay', 'onpause', 'onstop', 'onend', 'onload', 'oncanplay', 'onprogress', 'onvolume', 'onseek', 'onrate', 'ontimeupdate', 'onloaderror', 'onplayerror', 'oncut', 'onpick'];
  var logLevel = ['detail', 'info', 'warn', 'error', 'silent'];
  var defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
  var AudioH5 =
  /*#__PURE__*/
  function () {
    function AudioH5(config) {
      _classCallCheck(this, AudioH5);

      this.isInit = false;
      this.init = this.init.bind(this);
      this.play = this.play.bind(this);
      this.pause = this.pause.bind(this);
      this.toggle = this.toggle.bind(this);
      this.cut = this.cut.bind(this);
      this.pick = this.pick.bind(this);
      this.load = this.load.bind(this);
      this.seek = this.seek.bind(this);
      this.rate = this.rate.bind(this);
      this.volume = this.volume.bind(this);
      this.muted = this.muted.bind(this);
      this.stop = this.stop.bind(this);
      this.unload = this.unload.bind(this);
      this.model = this.model.bind(this);
      this.on = this.on.bind(this);
      this.off = this.off.bind(this);
      this.once = this.once.bind(this);
      this.playlist = this.playlist.bind(this);
      this.init(config);
    }

    _createClass(AudioH5, [{
      key: "init",
      value: function init(config) {
        if (!this.isInit && config && this._checkType(config, 'object') && JSON.stringify(config) !== '{}') {
          this._initial(config);

          this._registerEvent(config);

          return this._returnParams();
        }
      }
    }, {
      key: "play",
      value: function play() {
        var _this = this;

        if (this._checkInit()) {
          try {
            this._blockEvent({
              block: false
            });

            var play = this.audioH5.play();

            if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
              play.catch(function (err) {
                _this._setPlayState(playStateSet[6]);

                _this._fireEventQueue(err, 'onplayerror');
              });
            } // If the sound is still paused, then we can assume there was a playback issue.


            if (this.audioH5.paused) {
              this._setPlayState(playStateSet[6]);

              this._fireEventQueue(this.playId, 'onplayerror');
            }
          } catch (err) {
            this._setPlayState(playStateSet[6]);

            this._fireEventQueue(err, 'onplayerror');
          }

          return this.playId;
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this._checkInit()) {
          this.audioH5.pause();
          return this.playId;
        }
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this._checkInit() && this.playState !== 'stopped' && this.playState !== 'ended' && this.playState !== 'loaderror' && this.playState !== 'playerror') {
          this.playState === null || this.playState === 'paused' ? this.play() : this.pause();
          return this.playId;
        }
      }
    }, {
      key: "cut",
      value: function cut() {
        if (this._checkInit()) {
          this._cut();

          return this._returnParams();
        }
      }
    }, {
      key: "pick",
      value: function pick(playId) {
        if (this._checkInit() && this._checkType(playId, 'number', true)) {
          for (var i = 0; i < this.playList.length; i++) {
            if (this.playList[i].playId === playId) {
              this.unload();

              this._setPlayIndex(i);

              var src = this.playList[this.playIndex].src;

              var config = _objectSpread({}, this.config, {
                src: src
              });

              this._createAudio(config);

              this._registerEvent(config);

              this._fireEventQueue(this.playId, 'onpick');

              this.play();
              break;
            }
          }

          return this._returnParams();
        }
      }
    }, {
      key: "load",
      value: function load() {
        if (this._checkInit()) {
          this.audioH5.load();
          return this.playId;
        }
      }
    }, {
      key: "seek",
      value: function seek(val) {
        if (this._checkInit()) {
          if (this._checkType(val, 'number')) {
            // IE cannot set currentTime when the metaData is loading
            if (isIE && !this.metaDataLoaded) {
              this.seekValue = val;
              return;
            }

            var duration = this.audioH5.duration;
            if (val > duration) val = duration;
            if (val < 0) val = 0;
            this.seekValue = null;
            this.audioH5.currentTime = val;
          } else {
            return this.audioH5.currentTime;
          }
        }
      }
    }, {
      key: "rate",
      value: function rate(val) {
        if (this._checkInit()) {
          if (this._checkType(val, 'number')) {
            if (val > 2) val = 2;
            if (val < 0.5) val = 0.5;
            this.audioH5.playbackRate = val;

            this._updateConfig({
              rate: val
            });
          } else {
            return this.audioH5.playbackRate;
          }
        }
      }
    }, {
      key: "volume",
      value: function volume(val) {
        if (this._checkInit()) {
          if (this._checkType(val, 'number')) {
            if (val > 1) val = 1;
            if (val < 0) val = 0;
            this.audioH5.muted = false;
            this.audioH5.volume = val;

            this._updateConfig({
              volume: val
            });
          } else {
            return this.audioH5.volume;
          }
        }
      }
    }, {
      key: "muted",
      value: function muted(bool) {
        if (this._checkInit()) {
          if (this._checkType(bool, 'boolean', true)) {
            this.audioH5.muted = bool;

            this._updateConfig({
              muted: bool
            });
          } else {
            return this.audioH5.muted;
          }
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this._checkInit() && this.playState !== playStateSet[3]) {
          this._blockEvent({
            block: true
          });

          this.audioH5.currentTime = 0;
          this.audioH5.pause();

          this._setPlayState(playStateSet[3]);

          this._fireEventQueue(this.playId, 'onstop');

          return this.playId;
        }
      }
    }, {
      key: "unload",
      value: function unload() {
        this.stop();

        this._unregisterEvent();

        this.audioH5.src = defaultSrc;
        this.audioH5 = null;
        this.isInit = false;
      }
      /* set play model */

    }, {
      key: "model",
      value: function model(_model) {
        if (this._checkInit()) {
          if (playModelSet.indexOf(_model) !== -1) {
            // model contain: list-once, list-random, list-loop, single-once, single-loop
            this.playModel = _model;
          } else {
            return this.playModel;
          }
        }
      }
      /* add event to events queue */

    }, {
      key: "on",
      value: function on(event, cb) {
        if (this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
          var queueName = event.indexOf('on') === 0 ? event : "on".concat(event);

          this._onEvent(queueName, cb);
        }
      }
      /* remove event from events queue */

    }, {
      key: "off",
      value: function off(event, cb) {
        if (this._checkType(event, 'string', true)) {
          var queueName = event.indexOf('on') === 0 ? event : "on".concat(event);

          this._offEvent(queueName, cb);
        }
      }
      /* fire only one time */

    }, {
      key: "once",
      value: function once(event, cb) {
        var _this2 = this;

        if (this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
          var queueName = event.indexOf('on') === 0 ? event : "on".concat(event);
          var funcName = "EASE_AUDIO_".concat(queueName.toUpperCase(), "_ONCE_CALLBACK");

          var once = function once(e) {
            cb && cb(e);

            _this2._offEvent(queueName, once, funcName);
          };

          this._onEvent(queueName, once, funcName);
        }
      }
      /* set play list */

    }, {
      key: "playlist",
      value: function playlist(_ref) {
        var action = _ref.action,
            list = _ref.list,
            playId = _ref.playId;

        if (this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true))) {
          this._updatePlayList({
            action: action,
            list: list,
            playId: playId
          });

          return this._returnParams();
        }
      }
      /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

    }, {
      key: "_initial",
      value: function _initial(config) {
        this.config = config; // preserve initial config

        this.playState = null;
        this.debug = config.debug || false;
        this.logLevel = logLevel.indexOf(config.logLevel) !== -1 && config.logLevel || logLevel[3];
        this.idCounter = 1000;
        this.playId = 1000;
        this.playModel = playModelSet.indexOf(config.playModel) !== -1 && config.playModel || config.loop && playModelSet[3] || playModelSet[0];
        this.playIndex = 0;
        this.playList = new Array(0);
        this.buffered = new Array(0);
        this.eventController = new Array(0);
        this.eventMethods = {}; // playlist convert to src

        var src;

        if (config.playlist && this._checkType(config.playlist, 'array')) {
          this.playlist({
            action: 'add',
            list: config.playlist
          });
          src = config.playlist[0] && config.playlist[0].src;

          if (!src || !this._checkType(src, 'string')) {
            src = defaultSrc;

            this._logErr('The src property is necessary and must be string!');
          }
        } else {
          this._logErr('Please pass correct playlist parameters!');

          src = defaultSrc;
        } // create Audio Object


        this._createAudio(_objectSpread({}, config, {
          src: src
        }));
      }
    }, {
      key: "_createAudio",
      value: function _createAudio(config) {
        this.isInit = true;
        this.audioH5 = new window.Audio();
        this.audioH5.autoplay = config.autoplay || false;
        this.audioH5.loop = config.loop || false;
        this.audioH5.src = this._srcAssemble(config.src);
        this.audioH5.preload = config.preload || true;
        this.audioH5.volume = config.volume || (config.volume === 0 ? 0 : 1);
        this.audioH5.muted = config.muted || false;
        this.audioH5.playbackRate = config.rate || config.playbackRate || 1;
        this.audioH5.controls = false;
      }
    }, {
      key: "_srcAssemble",
      value: function _srcAssemble(src) {
        if (src && this._checkType(src, 'string')) {
          return src;
        }

        return defaultSrc;
      }
    }, {
      key: "_updateConfig",
      value: function _updateConfig(params) {
        this.config = _objectSpread({}, this.config, params);
      }
    }, {
      key: "_returnParams",
      value: function _returnParams() {
        return {
          playId: this.playId,
          playingData: this.playList[this.playIndex],
          playlist: this.playList
        };
      }
      /* set play state */

    }, {
      key: "_setPlayState",
      value: function _setPlayState(state) {
        if (this._checkType(state, 'string', true) && this.playState !== state) {
          var readyState = this.audioH5.readyState;
          var isReady = readyState > 2;
          var paused = this.audioH5.paused;
          var ended = this.audioH5.ended;
          var seeking = this.audioH5.seeking; // filter impossible state

          switch (state) {
            case playStateSet[0]:
              // loading
              if (paused || ended || isReady) return false;
              break;

            case playStateSet[1]:
              // playing
              if (paused || ended || seeking || !isReady) return false;
              break;

            case playStateSet[2]:
              // paused
              if (ended) return false;
              break;
          }

          this._logInfo("setPlayState - ".concat(state));

          this.playState = state;
          return this.playState;
        }
      }
      /* set play index */

    }, {
      key: "_setPlayIndex",
      value: function _setPlayIndex(index) {
        var playModel = this.playModel;
        var maxIndex = this.playList.length - 1;

        if (index === 0) {
          this.playIndex = 0;
          this.playId = this.playList[0] && this.playList[0].playId || this.playId;
          return;
        }

        switch (playModel) {
          case 'list-once':
            this.playIndex = index || (maxIndex >= this.playIndex ? ++this.playIndex : this.playIndex);
            break;

          case 'list-random':
            this.playIndex = index || Math.round(Math.random() * maxIndex);
            break;

          case 'list-loop':
            this.playIndex = index || (maxIndex > this.playIndex ? ++this.playIndex : 0);
            break;

          case 'single-once':
            this.playIndex = index || this.playIndex;
            break;

          case 'single-loop':
            this.playIndex = index || this.playIndex;
            break;

          default:
            this.playIndex = index || this.playIndex;
        }

        this.playId = this.playList[this.playIndex] && this.playList[this.playIndex].playId || this.playId;

        this._log("setPlayIndex - playIndex: ".concat(this.playIndex, "  playId: ").concat(this.playId));

        return this.playIndex;
      }
      /* reset play list */

    }, {
      key: "_resetPlayList",
      value: function _resetPlayList() {
        this.playList = [];

        this._setPlayIndex(0);
      }
      /* update play list */

    }, {
      key: "_updatePlayList",
      value: function _updatePlayList(_ref2) {
        var _this3 = this;

        var action = _ref2.action,
            list = _ref2.list,
            playId = _ref2.playId;

        switch (action) {
          case 'add':
            this.playList = [].concat(_toConsumableArray(this.playList), _toConsumableArray(list.map(function (v) {
              if (_this3._checkType(v, 'object')) {
                v.playId = _this3.idCounter;
                _this3.idCounter++;
                return v;
              }
            })));
            break;

          case 'delete':
            if (playId) {
              for (var i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                  return this.playList.splice(i, 1);
                }
              }
            }

            break;

          case 'insert':
            if (playId && list) {
              for (var _i = 0; _i < this.playList.length; _i++) {
                if (this.playList[_i].playId === playId) {
                  var _this$playList;

                  return (_this$playList = this.playList).splice.apply(_this$playList, [_i, 0].concat(_toConsumableArray(list)));
                }
              }
            }

            break;

          case 'reset':
            this._resetPlayList();

            break;

          default:
            this._resetPlayList();

        }
      }
      /* cut audio */

    }, {
      key: "_cut",
      value: function _cut(endCut) {
        this.stop(); // can't cut audio if the playModel is single-once

        if (this._checkInit() && this.playModel !== 'single-once') {
          this.metaDataLoaded = false;
          this.seekValue = null;

          this._setPlayIndex();

          if (!this.playList[this.playIndex]) return;
          var src = this.playList[this.playIndex].src;

          if (endCut) {
            // resolve the IOS auto play problem
            this.audioH5.src = src;
            this.load();
          } else {
            this.unload();

            var config = _objectSpread({}, this.config, {
              src: src
            });

            this._createAudio(config);

            this._registerEvent(config);
          }

          this._fireEventQueue(this.playId, 'oncut');

          this.play();
          return this._setPlayState(playStateSet[1]);
        }
      }
      /* generate received event callback queue */

    }, {
      key: "_onEvent",
      value: function _onEvent(event, cb, name) {
        if (supportEvents.indexOf(event) !== -1) {
          if (!this[event]) this[event] = {};
          this[event][name || cb.name || "anonymous-".concat(new Date().getTime())] = cb;
        }
      }
      /* delete received event callback queue */

    }, {
      key: "_offEvent",
      value: function _offEvent(event, cb, name) {
        if (supportEvents.indexOf(event) !== -1) {
          if (!cb) this[event] = null;else if (name || cb.name) delete this[event][name || cb.name];
        }
      }
      /* fire event callback queue */

    }, {
      key: "_fireEventQueue",
      value: function _fireEventQueue(e, eventQueue) {
        if (this[eventQueue]) {
          for (var k in this[eventQueue]) {
            this[eventQueue][k] && this[eventQueue][k](e);
          }
        }
      }
      /* register Audio Event */

    }, {
      key: "_registerEvent",
      value: function _registerEvent(config) {
        var _this4 = this;

        var curry = function curry(cb, eventName) {
          return function (e) {
            if (!_this4._triggerEventController(eventName)) return;
            return cb && cb(e);
          };
        };
        /* bindind received event callbacks */


        var configKeys = Object.keys(config);
        configKeys.forEach(function (v) {
          if (v.indexOf('on') === 0) {
            var funcName = "EASE_AUDIO_".concat(v.toUpperCase(), "_INITIAL_CALLBACK");

            _this4._onEvent(v, config[v], funcName);
          }
        });
        this.eventMethods = {
          // loading state
          loadstart: function loadstart(e) {
            _this4.playState === playStateSet[1] && _this4._setPlayState(playStateSet[0]);

            _this4._fireEventQueue(e, 'onload');
          },
          // playing state
          playing: function playing(e) {
            _this4._setPlayState(playStateSet[1]);

            _this4._fireEventQueue(e, 'onplay');
          },
          canplaythrough: function canplaythrough(e) {
            _this4.playState === playStateSet[0] && _this4._setPlayState(playStateSet[1]);
          },
          // paused state
          pause: function pause(e) {
            _this4._setPlayState(playStateSet[2]);

            _this4._fireEventQueue(e, 'onpause');
          },
          // ended state
          ended: function ended(e) {
            if (_this4.isEnd) {
              _this4.isEnd = false;
            } else {
              _this4.isEnd = true;

              _this4._fireEventQueue(e, 'onend');

              _this4.config.endAutoCut && _this4._cut(true);
            }
          },
          // loaderror state
          error: function error(e) {
            _this4._setPlayState(playStateSet[5]);

            _this4._fireEventQueue(e, 'onloaderror');
          },
          // others
          progress: function progress(e) {
            var ranges = e.target.buffered;
            var total = e.total || 1;
            var buffered = 0;
            var loaded = e.loaded || 0;
            var progress = loaded / total;

            if (ranges && ranges.length) {
              for (var i = 0, j = ranges.length; i < j; i++) {
                _this4.buffered.push({
                  'start': ranges.start(i) * 1000,
                  'end': ranges.end(i) * 1000
                });
              }

              buffered = (ranges.end(0) - ranges.start(0)) * 1000;
              loaded = Math.min(1, buffered / (e.target.duration * 1000));
              progress = loaded / total;
            }

            _this4._fireEventQueue({
              e: e,
              progress: progress
            }, 'onprogress');
          },
          durationchange: function durationchange(e) {},
          loadedmetadata: function loadedmetadata(e) {
            _this4.metaDataLoaded = true;
            _this4.seekValue && _this4.seek(_this4.seekValue);
          },
          loadeddata: function loadeddata(e) {},
          timeupdate: function timeupdate(e) {
            // playState is loading but actually is playing
            if (_this4.playState === playStateSet[0]) {
              _this4._logInfo("timeupdate's playing");

              _this4._setPlayState(playStateSet[1]);

              _this4._fireEventQueue(e, 'onplay');
            } // Depending on currentTime and duration to mimic end event


            var isEnd = _this4.audioH5.duration && _this4.audioH5.currentTime === _this4.audioH5.duration;

            if (isEnd) {
              _this4._logInfo("timeupdate's ended");

              if (_this4.isEnd) {
                _this4.isEnd = false;
              } else {
                _this4.isEnd = true;

                _this4._fireEventQueue(e, 'onend');

                _this4.config.endAutoCut && _this4._cut(true);
              }
            }

            _this4._fireEventQueue(e, 'ontimeupdate');
          },
          canplay: function canplay(e) {
            _this4._fireEventQueue(e, 'oncanplay');
          },
          seeking: function seeking(e) {
            _this4._fireEventQueue(e, 'onseek');
          },
          seeked: function seeked(e) {},
          play: function play(e) {},
          volumechange: function volumechange(e) {
            _this4._fireEventQueue(e, 'onvolume');
          },
          ratechange: function ratechange(e) {
            _this4._fireEventQueue(e, 'onrate');
          },
          abort: function abort(e) {},
          suspend: function suspend(e) {}
        };

        for (var k in this.eventMethods) {
          this.eventMethods[k] = curry(this.eventMethods[k], k);
        }

        for (var _k in this.eventMethods) {
          this._bindEvent(this.eventMethods[_k], _k);
        }

        this._blockEvent({
          block: false
        });
      }
      /* unregister Audio Event */

    }, {
      key: "_unregisterEvent",
      value: function _unregisterEvent() {
        if (this._checkInit()) {
          for (var k in this.eventMethods) {
            this._removeEvent(this.eventMethods[k], k);
          }
        }
      }
      /* not remove but block event callback */

    }, {
      key: "_blockEvent",
      value: function _blockEvent(_ref3) {
        var event = _ref3.event,
            block = _ref3.block;

        if (this._checkInit()) {
          if (event && this._checkType(event, 'string')) {
            this.eventController[event] = !block;
          } else {
            for (var k in this.eventMethods) {
              this.eventController[k] = !block;
            }
          }
        }
      }
      /* whether or not trigger event callback */

    }, {
      key: "_triggerEventController",
      value: function _triggerEventController(event) {
        if (!this.eventController[event]) return false;

        this._log("trigger ".concat(event, " event"));

        return true;
      }
      /* bind event */

    }, {
      key: "_bindEvent",
      value: function _bindEvent(cb, event) {
        if (!this._checkType(event, 'string')) return this._logErr("bindEvent - bind event name is not string");
        this._checkType(cb, 'function', true) && addListener(event, cb, this.audioH5);
      }
      /* remove event */

    }, {
      key: "_removeEvent",
      value: function _removeEvent(cb, event) {
        if (!this._checkType(event, 'string')) return this._logErr("removeEvent - unbind event name is not string");
        this._checkType(cb, 'function', true) && removeListener(event, cb, this.audioH5);
      }
      /* check type */

    }, {
      key: "_checkType",
      value: function _checkType(element, type, logErr) {
        if (typeof type !== 'string') return this._logWarn('checkType - The type must be string');

        if (getType(element) !== type) {
          logErr && this._logErr("Your parameter(".concat(element, ") type is ").concat(getType(element), ", please pass the ").concat(type, " type"));
          return false;
        }

        return true;
      }
      /* check whether or not init Audio */

    }, {
      key: "_checkInit",
      value: function _checkInit() {
        if (!this.isInit) {
          this._logWarn("checkInit - The Audio haven't been initiated");

          return false;
        }

        return true;
      }
      /* detail logger */

    }, {
      key: "_log",
      value: function _log(detail) {
        var canLog = this.logLevel !== 'silent' && this.logLevel === 'detail';
        return canLog && this.debug && console.log('[EASE_AUDIO_H5 DETAIL]:', detail);
      }
      /* info logger */

    }, {
      key: "_logInfo",
      value: function _logInfo(info) {
        var canLog = this.logLevel !== 'silent' && this.logLevel !== 'error' && this.logLevel !== 'warn';
        return canLog && this.debug && console.info('[EASE_AUDIO_H5 INFO]:', info);
      }
      /* warn logger */

    }, {
      key: "_logWarn",
      value: function _logWarn(warn) {
        var canLog = this.logLevel !== 'silent' && this.logLevel !== 'error';
        return canLog && this.debug && console.warn('[EASE_AUDIO_H5 WARN]:', warn);
      }
      /* error logger */

    }, {
      key: "_logErr",
      value: function _logErr(err) {
        var canLog = this.logLevel !== 'silent';
        return canLog && this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err);
      }
    }, {
      key: "duration",
      get: function get() {
        return this.audioH5.duration;
      }
    }, {
      key: "setProps",
      set: function set(_ref4) {
        var prop = _ref4.prop,
            value = _ref4.value;

        if (this.audioH5[prop] && !this._checkType(this.audioH5[prop], 'function')) {
          this.audioH5[prop] = value;

          this._updateConfig({
            prop: value
          });
        }
      }
    }]);

    return AudioH5;
  }();

  var EaseAudio =
  /*#__PURE__*/
  function () {
    function EaseAudio(config) {
      _classCallCheck(this, EaseAudio);

      this.audio = this._createAudio(config);
      this.init = this.audio.init;
      this.play = this.audio.play;
      this.pause = this.audio.pause;
      this.toggle = this.audio.toggle;
      this.cut = this.audio.cut;
      this.pick = this.audio.pick;
      this.load = this.audio.load;
      this.seek = this.audio.seek;
      this.volume = this.audio.volume;
      this.muted = this.audio.muted;
      this.stop = this.audio.stop;
      this.unload = this.audio.unload;
      this.on = this.audio.on;
      this.off = this.audio.off;
      this.once = this.audio.once;
      this.model = this.audio.model;
    }

    _createClass(EaseAudio, [{
      key: "_createAudio",
      value: function _createAudio(config) {
        var audio = {
          init: initFunc,
          play: initFunc,
          pause: initFunc,
          toggle: initFunc,
          load: initFunc,
          seek: initFunc,
          volume: initFunc,
          muted: initFunc,
          stop: initFunc,
          unload: initFunc,
          on: initFunc,
          off: initFunc,
          once: initFunc
        };

        var _ref = config || {},
            usingWebAudio = _ref.usingWebAudio;

        try {
          if (usingWebAudio && (window.AudioContext || window.webkitAudioContext)) {
            audio = new AudioCtx(config);
          } else if (window.Audio) {
            audio = new AudioH5(config);
          }
        } catch (err) {
          console.error('[EASE_AUDIO ERROR]:', err);
        }

        return audio;
      }
    }, {
      key: "duration",
      get: function get() {
        return this.audio.duration;
      }
    }, {
      key: "playState",
      get: function get() {
        return this.audio.playState;
      }
    }, {
      key: "playId",
      get: function get() {
        return this.audio.playId;
      }
    }, {
      key: "playingData",
      get: function get() {
        return this.audio.playList[this.audio.playIndex];
      }
    }, {
      key: "playlist",
      set: function set(params) {
        this.audio.playlist(params);
      },
      get: function get() {
        return this.audio.playList;
      }
    }, {
      key: "networkState",
      get: function get() {
        return this.audio.networkState;
      }
    }]);

    return EaseAudio;
  }();

  function initFunc() {
    return console.error('[EASE_AUDIO ERROR]: Initialize failed');
  }

  exports.default = EaseAudio;
  exports.EaseAudio = EaseAudio;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
/* Copyright (c) 2018-2019 Bobby.li 
* MIT License 
*/
