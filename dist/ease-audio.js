/* ease-audio */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.EaseAudio = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

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

  var createClass = _createClass;

  let AudioCtx =
  /*#__PURE__*/
  function () {
    function AudioCtx() {
      classCallCheck(this, AudioCtx);

      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.audioDom = new window.Audio();
      this.audio = this.audioCtx.createMediaElementSource(this.audioDom);
    }

    createClass(AudioCtx, [{
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

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

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

  var defineProperty = _defineProperty;

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
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  var _instanceof_1 = _instanceof;

  function getUA(u) {
    if (!u) return false; // console.log(u)

    const obj = {
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

  let ua;

  try {
    ua = window && window.navigator && window.navigator.userAgent;
  } catch (error) {
    console.error("[isIE]: ".concat(error));
  }

  const isIE = ua ? getUA(ua).trident : false;
  const isEdge = ua ? getUA(ua).edge : false;

  // adapt IE add event
  const addListener = function addListener(event, fn, dom) {
    if (!window) return false;
    const eventDOM = dom || window;

    if (window.addEventListener) {
      eventDOM.addEventListener(event, fn, false);
    } else {
      eventDOM.attachEvent("on".concat(event), fn);
    }
  }; // adapt IE remove event

  const removeListener = function removeListener(event, fn, dom) {
    if (!window) return false;
    const eventDOM = dom || window;

    if (window.removeEventListener) {
      eventDOM.removeEventListener(event, fn, false);
    } else {
      eventDOM.detachEvent("on".concat(event), fn);
    }
  }; // prevent default

  const getType = function getType(obj) {
    if (typeof obj !== 'object') return typeof obj;
    const len = Object.prototype.toString.call(obj).length - 1;
    return Object.prototype.toString.call(obj).slice(8, len).toLowerCase();
  };

  const playStateSet = ['loading', 'playing', 'paused', 'stopped', 'ended', 'loaderror', 'playerror', 'unloaded'];
  const playModelSet = ['list-once', 'list-random', 'list-loop', 'single-once', 'single-loop'];
  const supportEvents = ['onplay', 'onpause', 'onstop', 'onend', 'onload', 'onunload', 'oncanplay', 'onprogress', 'onvolume', 'onseeking', 'onseeked', 'onrate', 'ontimeupdate', 'onloaderror', 'onplayerror', 'oncut', 'onpick'];
  const logLevel = ['detail', 'info', 'warn', 'error', 'silent'];
  const defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
  let AudioH5 =
  /*#__PURE__*/
  function () {
    function AudioH5(config) {
      classCallCheck(this, AudioH5);

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

    createClass(AudioH5, [{
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

            let play = this.audioH5.play();

            if (play && typeof Promise !== 'undefined' && (_instanceof_1(play, Promise) || typeof play.then === 'function')) {
              this.playLocker = true;
              play.then(function () {
                _this.lockQueue.forEach(function (v) {
                  return v && v();
                });

                _this.lockQueue.splice(0);

                _this.playLocker = false;
              }).catch(function (err) {
                _this.lockQueue.splice(0);

                _this.playLocker = false;

                _this._setPlayState(playStateSet[6]);

                _this._fireEventQueue(err, 'onplayerror');
              });
            } // If the sound is still paused, then we can assume there was a playback issue.


            if (this.audioH5.paused) {
              const err = "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.";

              this._setPlayState(playStateSet[6]);

              this._fireEventQueue(err, 'onplayerror');
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
        var _this2 = this;

        if (this._checkInit()) {
          this._playLockQueue(function () {
            return _this2.audioH5.pause();
          });

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
          for (let i = 0; i < this.playList.length; i++) {
            if (this.playList[i].playId === playId) {
              this.unload(true);

              this._setPlayIndex(i);

              const src = this.playList[this.playIndex].src;

              const config = objectSpread({}, this.config, {
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
        var _this3 = this;

        if (this._checkInit()) {
          this._playLockQueue(function () {
            return _this3.audioH5.load();
          });

          return this.playId;
        }
      }
    }, {
      key: "seek",
      value: function seek(val) {
        var _this4 = this;

        if (this._checkInit()) {
          if (this._checkType(val, 'number')) {
            // IE cannot set currentTime when the metaData is loading
            if (isIE && !this.metaDataLoaded) {
              this.seekValue = val;
              return;
            }

            const duration = this.audioH5.duration;
            if (val > duration) val = duration;
            if (val < 0) val = 0;
            this.seekValue = null;

            this._playLockQueue(function () {
              return _this4.audioH5.currentTime = val;
            });
          } else {
            return this.audioH5.currentTime;
          }
        }
      }
    }, {
      key: "rate",
      value: function rate(val) {
        var _this5 = this;

        if (this._checkInit()) {
          if (this._checkType(val, 'number')) {
            if (val > 2) val = 2;
            if (val < 0.5) val = 0.5;

            this._playLockQueue(function () {
              return _this5.audioH5.playbackRate = val;
            });

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
        var _this6 = this;

        if (this._checkInit()) {
          if (this._checkType(val, 'number')) {
            if (val > 1) val = 1;
            if (val < 0) val = 0;

            this._playLockQueue(function () {
              _this6.audioH5.muted = false;
              _this6.audioH5.volume = val;
            });

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
        var _this7 = this;

        if (this._checkInit()) {
          if (this._checkType(bool, 'boolean', true)) {
            this._playLockQueue(function () {
              return _this7.audioH5.muted = bool;
            });

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
      value: function stop(forbidEvent) {
        var _this8 = this;

        if (this._checkInit() && this.playState !== playStateSet[3]) {
          this._playLockQueue(function () {
            if (!forbidEvent) {
              _this8._blockEvent({
                block: true
              });

              _this8._setPlayState(playStateSet[3]);

              _this8._fireEventQueue(_this8.playId, 'onstop');
            }

            _this8.audioH5.currentTime = 0;

            _this8.audioH5.pause();
          });

          return this.playId;
        }
      }
    }, {
      key: "unload",
      value: function unload(forbidEvent) {
        var _this9 = this;

        if (this._checkInit()) {
          this.stop(true);

          this._unregisterEvent();

          this._playLockQueue(function () {
            if (!forbidEvent) {
              _this9._setPlayState(playStateSet[7]);

              _this9._fireEventQueue(_this9.playId, 'onunload');
            }

            _this9.audioH5.src = defaultSrc;
            _this9.audioH5 = null;
            _this9.isInit = false;
          });
        }
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
        if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
          const queueName = event.indexOf('on') === 0 ? event : "on".concat(event);

          this._onEvent(queueName, cb);
        }
      }
      /* remove event from events queue */

    }, {
      key: "off",
      value: function off(event, cb) {
        if (this._checkInit() && this._checkType(event, 'string', true)) {
          const queueName = event.indexOf('on') === 0 ? event : "on".concat(event);

          this._offEvent(queueName, cb);
        }
      }
      /* fire only one time */

    }, {
      key: "once",
      value: function once(event, cb) {
        var _this10 = this;

        if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
          const queueName = event.indexOf('on') === 0 ? event : "on".concat(event);
          const funcName = "EASE_AUDIO_".concat(queueName.toUpperCase(), "_ONCE_CALLBACK");

          const once = function once(e) {
            cb && cb(e);

            _this10._offEvent(queueName, once, funcName);
          };

          this._onEvent(queueName, once, funcName);
        }
      }
      /* set play list */

    }, {
      key: "playlist",
      value: function playlist(data) {
        const action = data.action,
              list = data.list,
              playId = data.playId,
              params = data.params;

        if (this._checkInit() && this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true)) && (!params || this._checkType(params, 'object', true))) {
          this._handlePlayList(data);

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
        this.lockQueue = new Array(0);
        this.playLocker = false;
        this.playId = 1000;
        this.playModel = playModelSet.indexOf(config.playModel) !== -1 && config.playModel || config.loop && playModelSet[3] || playModelSet[0];
        this.playIndex = 0;
        this.playList = new Array(0);
        this.buffered = new Array(0);
        this.eventController = new Array(0);
        this.eventMethods = Object.create(null); // playlist convert to src

        let src;

        if (config.playlist && this._checkType(config.playlist, 'array')) {
          for (let i = 0; i < config.playlist.length; i++) {
            if (this._checkType(config.playlist[i], 'object')) continue;
            config.playlist[i] = Object.create(null, {
              src: {
                writable: true,
                enumerable: true,
                configurable: true,
                value: config.playlist[i]
              }
            });
          }

          this._handlePlayList({
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


        this._createAudio(objectSpread({}, config, {
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
        this.config = objectSpread({}, this.config, params);
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
          const readyState = this.audioH5.readyState;
          const isReady = readyState > 2;
          const paused = this.audioH5.paused;
          const ended = this.audioH5.ended;
          const seeking = this.audioH5.seeking; // filter impossible state

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
        const playModel = this.playModel;
        const maxIndex = this.playList.length - 1;

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
      /* handle play list */

    }, {
      key: "_handlePlayList",
      value: function _handlePlayList(_ref) {
        var _this11 = this;

        let action = _ref.action,
            list = _ref.list,
            playId = _ref.playId,
            params = _ref.params;

        switch (action) {
          case 'add':
            this.playList = [].concat(toConsumableArray(this.playList), toConsumableArray(list.map(function (v) {
              if (_this11._checkType(v, 'object')) {
                v.playId = _this11.idCounter;
                _this11.idCounter++;
                return v;
              }
            })));
            break;

          case 'delete':
            if (playId) {
              for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                  return this.playList.splice(i, 1);
                }
              }
            }

            break;

          case 'insert':
            if (playId && list) {
              for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                  var _this$playList;

                  return (_this$playList = this.playList).splice.apply(_this$playList, [i, 0].concat(toConsumableArray(list.map(function (v) {
                    v.playId = _this11.idCounter;
                    _this11.idCounter++;
                    return v;
                  }))));
                }
              }
            }

            break;

          case 'replace':
            if (playId && list) {
              for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                  var _this$playList2;

                  return (_this$playList2 = this.playList).splice.apply(_this$playList2, [i, 1].concat(toConsumableArray(list.map(function (v) {
                    v.playId = _this11.idCounter;
                    _this11.idCounter++;
                    return v;
                  }))));
                }
              }
            }

            break;

          case 'update':
            if (playId && params) {
              for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                  const newData = objectSpread({}, this.playList[i], params);

                  return this.playList.splice(i, 1, newData);
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
        this.stop(true); // can't cut audio if the playModel is single-once

        if (this._checkInit() && this.playModel !== 'single-once') {
          this.metaDataLoaded = false;
          this.seekValue = null;

          this._setPlayIndex();

          if (!this.playList[this.playIndex]) return;
          const src = this.playList[this.playIndex].src;

          if (endCut) {
            // resolve the IOS auto play problem
            this.audioH5.src = src;
            this.load();
          } else {
            this.unload(true);

            const config = objectSpread({}, this.config, {
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
          for (let k in this[eventQueue]) {
            this[eventQueue][k] && this[eventQueue][k](e);
          }
        }
      }
      /* register Audio Event */

    }, {
      key: "_registerEvent",
      value: function _registerEvent(config) {
        var _this12 = this;

        const curry = function curry(cb, eventName) {
          return function (e) {
            if (!_this12._triggerEventController(eventName)) return;
            return cb && cb(e);
          };
        };
        /* bindind received event callbacks */


        const configKeys = Object.keys(config);
        configKeys.forEach(function (v) {
          if (v.indexOf('on') === 0) {
            const funcName = "EASE_AUDIO_".concat(v.toUpperCase(), "_INITIAL_CALLBACK");

            _this12._onEvent(v, config[v], funcName);
          }
        });
        this.eventMethods = {
          // loading state
          loadstart: function loadstart(e) {
            _this12.playState === playStateSet[1] && _this12._setPlayState(playStateSet[0]);

            _this12._fireEventQueue(e, 'onload');
          },
          // playing state
          playing: function playing(e) {
            _this12._setPlayState(playStateSet[1]);

            _this12._fireEventQueue(e, 'onplay');
          },
          canplaythrough: function canplaythrough(e) {
            _this12.playState === playStateSet[0] && _this12._setPlayState(playStateSet[1]);
          },
          // paused state
          pause: function pause(e) {
            _this12._setPlayState(playStateSet[2]);

            _this12._fireEventQueue(e, 'onpause');
          },
          // ended state
          ended: function ended(e) {
            if (_this12.isEnd) {
              _this12.isEnd = false;
            } else {
              _this12.isEnd = true;

              _this12._fireEventQueue(e, 'onend');

              _this12.config.endAutoCut && _this12._cut(true);
            }
          },
          // loaderror state
          error: function error(e) {
            _this12._setPlayState(playStateSet[5]);

            _this12._fireEventQueue(e, 'onloaderror');
          },
          // others
          progress: function progress(e) {
            const ranges = e.target.buffered;
            const total = e.total || 1;
            let buffered = 0;
            let loaded = e.loaded || 0;
            let progress = loaded / total;

            if (ranges && ranges.length) {
              for (let i = 0, j = ranges.length; i < j; i++) {
                _this12.buffered.push({
                  'start': ranges.start(i) * 1000,
                  'end': ranges.end(i) * 1000
                });
              }

              buffered = (ranges.end(0) - ranges.start(0)) * 1000;
              loaded = Math.min(1, buffered / (e.target.duration * 1000));
              progress = loaded / total;
            }

            _this12._fireEventQueue({
              e: e,
              progress: progress
            }, 'onprogress');
          },
          durationchange: function durationchange(e) {},
          loadedmetadata: function loadedmetadata(e) {
            _this12.metaDataLoaded = true;
            _this12.seekValue && _this12.seek(_this12.seekValue);
          },
          loadeddata: function loadeddata(e) {},
          timeupdate: function timeupdate(e) {
            // playState is loading but actually is playing
            if (_this12.playState === playStateSet[0]) {
              _this12._logInfo("timeupdate's playing");

              _this12._setPlayState(playStateSet[1]);

              _this12._fireEventQueue(e, 'onplay');
            } // Depending on currentTime and duration to mimic end event


            const isEnd = _this12.audioH5.duration && +_this12.audioH5.currentTime >= +_this12.audioH5.duration;

            if (isEnd) {
              _this12._logInfo("timeupdate's ended");

              if (_this12.isEnd) {
                _this12.isEnd = false;
              } else {
                _this12.isEnd = true;

                _this12._fireEventQueue(e, 'onend');

                _this12.config.endAutoCut && _this12._cut(true);
              }
            }

            _this12._fireEventQueue(e, 'ontimeupdate');
          },
          canplay: function canplay(e) {
            _this12._fireEventQueue(e, 'oncanplay');
          },
          seeking: function seeking(e) {
            _this12._fireEventQueue(e, 'onseeking');
          },
          seeked: function seeked(e) {
            _this12._fireEventQueue(e, 'onseeked');
          },
          play: function play(e) {},
          volumechange: function volumechange(e) {
            _this12._fireEventQueue(e, 'onvolume');
          },
          ratechange: function ratechange(e) {
            _this12._fireEventQueue(e, 'onrate');
          },
          abort: function abort(e) {},
          suspend: function suspend(e) {}
        };

        for (let k in this.eventMethods) {
          this.eventMethods[k] = curry(this.eventMethods[k], k);
        }

        for (let k in this.eventMethods) {
          this._bindEvent(this.eventMethods[k], k);
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
          for (let k in this.eventMethods) {
            this._removeEvent(this.eventMethods[k], k);
          }
        }
      }
      /* not remove but block event callback */

    }, {
      key: "_blockEvent",
      value: function _blockEvent(_ref2) {
        let event = _ref2.event,
            block = _ref2.block;

        if (this._checkInit()) {
          if (event && this._checkType(event, 'string')) {
            this.eventController[event] = !block;
          } else {
            for (let k in this.eventMethods) {
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
      /* playLock queue handle */

    }, {
      key: "_playLockQueue",
      value: function _playLockQueue(fn) {
        if (this.playLocker) {
          return this.lockQueue.push(fn);
        }

        return fn && fn();
      }
      /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

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
        const canLog = this.logLevel !== 'silent' && this.logLevel === 'detail';
        return canLog && this.debug && console.log('[EASE_AUDIO_H5 DETAIL]:', detail);
      }
      /* info logger */

    }, {
      key: "_logInfo",
      value: function _logInfo(info) {
        const canLog = this.logLevel !== 'silent' && this.logLevel !== 'error' && this.logLevel !== 'warn';
        return canLog && this.debug && console.info('[EASE_AUDIO_H5 INFO]:', info);
      }
      /* warn logger */

    }, {
      key: "_logWarn",
      value: function _logWarn(warn) {
        const canLog = this.logLevel !== 'silent' && this.logLevel !== 'error';
        return canLog && this.debug && console.warn('[EASE_AUDIO_H5 WARN]:', warn);
      }
      /* error logger */

    }, {
      key: "_logErr",
      value: function _logErr(err) {
        const canLog = this.logLevel !== 'silent';
        return canLog && this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err);
      }
    }, {
      key: "duration",
      get: function get() {
        return this.audioH5.duration;
      }
    }, {
      key: "setProps",
      set: function set(_ref3) {
        let prop = _ref3.prop,
            value = _ref3.value;

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

  let EaseAudio =
  /*#__PURE__*/
  function () {
    function EaseAudio(config) {
      var _this = this;

      classCallCheck(this, EaseAudio);

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

      this.stop = function () {
        return _this.audio.stop();
      };

      this.unload = function () {
        return _this.audio.unload();
      };

      this.on = this.audio.on;
      this.off = this.audio.off;
      this.once = this.audio.once;
      this.model = this.audio.model;
    }

    createClass(EaseAudio, [{
      key: "_createAudio",
      value: function _createAudio(config) {
        let audio = {
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

        const _ref = config || {},
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
