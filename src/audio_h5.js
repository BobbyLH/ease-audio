"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("../utils");
var playStateSet;
(function (playStateSet) {
    playStateSet[playStateSet["loading"] = 0] = "loading";
    playStateSet[playStateSet["playing"] = 1] = "playing";
    playStateSet[playStateSet["paused"] = 2] = "paused";
    playStateSet[playStateSet["stopped"] = 3] = "stopped";
    playStateSet[playStateSet["ended"] = 4] = "ended";
    playStateSet[playStateSet["finished"] = 5] = "finished";
    playStateSet[playStateSet["loaderror"] = 6] = "loaderror";
    playStateSet[playStateSet["playerror"] = 7] = "playerror";
    playStateSet[playStateSet["unloaded"] = 8] = "unloaded";
    playStateSet[playStateSet["loaded"] = 9] = "loaded";
})(playStateSet || (playStateSet = {}));
var playModelSet;
(function (playModelSet) {
    playModelSet[playModelSet["list-once"] = 0] = "list-once";
    playModelSet[playModelSet["list-random"] = 1] = "list-random";
    playModelSet[playModelSet["list-loop"] = 2] = "list-loop";
    playModelSet[playModelSet["single-once"] = 3] = "single-once";
    playModelSet[playModelSet["single-loop"] = 4] = "single-loop";
})(playModelSet || (playModelSet = {}));
var supportEvents;
(function (supportEvents) {
    supportEvents[supportEvents["onplay"] = 0] = "onplay";
    supportEvents[supportEvents["onpause"] = 1] = "onpause";
    supportEvents[supportEvents["onstop"] = 2] = "onstop";
    supportEvents[supportEvents["onend"] = 3] = "onend";
    supportEvents[supportEvents["onfinish"] = 4] = "onfinish";
    supportEvents[supportEvents["onload"] = 5] = "onload";
    supportEvents[supportEvents["onunload"] = 6] = "onunload";
    supportEvents[supportEvents["oncanplay"] = 7] = "oncanplay";
    supportEvents[supportEvents["oncanplaythrough"] = 8] = "oncanplaythrough";
    supportEvents[supportEvents["onprogress"] = 9] = "onprogress";
    supportEvents[supportEvents["onvolume"] = 10] = "onvolume";
    supportEvents[supportEvents["onseeking"] = 11] = "onseeking";
    supportEvents[supportEvents["onseeked"] = 12] = "onseeked";
    supportEvents[supportEvents["onrate"] = 13] = "onrate";
    supportEvents[supportEvents["ontimeupdate"] = 14] = "ontimeupdate";
    supportEvents[supportEvents["onloaderror"] = 15] = "onloaderror";
    supportEvents[supportEvents["onplayerror"] = 16] = "onplayerror";
    supportEvents[supportEvents["oncut"] = 17] = "oncut";
    supportEvents[supportEvents["onpick"] = 18] = "onpick";
})(supportEvents || (supportEvents = {}));
var uselessEvents;
(function (uselessEvents) {
    uselessEvents[uselessEvents["finish"] = 0] = "finish";
    uselessEvents[uselessEvents["playerror"] = 1] = "playerror";
    uselessEvents[uselessEvents["cut"] = 2] = "cut";
    uselessEvents[uselessEvents["pick"] = 3] = "pick";
    uselessEvents[uselessEvents["play"] = 4] = "play";
    uselessEvents[uselessEvents["abort"] = 5] = "abort";
    uselessEvents[uselessEvents["suspend"] = 6] = "suspend";
})(uselessEvents || (uselessEvents = {}));
var logLevelSet;
(function (logLevelSet) {
    logLevelSet[logLevelSet["detail"] = 0] = "detail";
    logLevelSet[logLevelSet["info"] = 1] = "info";
    logLevelSet[logLevelSet["warn"] = 2] = "warn";
    logLevelSet[logLevelSet["error"] = 3] = "error";
    logLevelSet[logLevelSet["silent"] = 4] = "silent";
})(logLevelSet || (logLevelSet = {}));
var defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
var AudioH5 = /** @class */ (function () {
    function AudioH5(config) {
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
        this.mute = this.mute.bind(this);
        this.stop = this.stop.bind(this);
        this.unload = this.unload.bind(this);
        this.model = this.model.bind(this);
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.once = this.once.bind(this);
        this.playlist = this.playlist.bind(this);
        this.init(config);
    }
    Object.defineProperty(AudioH5.prototype, "duration", {
        /**
         * duration getter
         *
         * @return {number} the audio's duration
         */
        get: function () {
            return this.audioH5 ? this.audioH5.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioH5.prototype, "networkState", {
        /**
         * networkState getter
         *
         * @return {number}
         */
        get: function () {
            return this.audioH5 ? this.audioH5.networkState : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioH5.prototype, "playlists", {
        /**
         * get playList
         *
         * @return {Tplaylist}
         */
        get: function () {
            return this.playList || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioH5.prototype, "playid", {
        /**
         * get playId
         *
         * @return {TplayId}
         */
        get: function () {
            return this.playId || 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioH5.prototype, "playstate", {
        /**
         * get playstate
         *
         * @return {TplayStateStr | null}
         */
        get: function () {
            return !this.playState && this.playState !== 0 ? null : playStateSet[this.playState || 0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * init Audio
     * @param {Iconfig} config
     *
     * @returns {IreturnParams | void}
     */
    AudioH5.prototype.init = function (config) {
        if (!this.isInit && config && this._checkType(config, 'object') && JSON.stringify(config) !== '{}') {
            this._initial(config);
            this._registerEvent(config);
            return this._returnParams();
        }
    };
    /**
     * method - play
     *
     * @return {number | void} playId
     */
    AudioH5.prototype.play = function () {
        var _this = this;
        if (this._checkInit()) {
            if (!this.playLocker) {
                try {
                    if (this.audioH5.src === defaultSrc) {
                        // without correct src the sound couldn't play
                        // manual trigger load error event
                        var err = 'Because the error src property, manual trigger load error event';
                        return this.eventMethods && this.eventMethods.error(err);
                    }
                    this._blockEvent({ block: false });
                    var play = this.audioH5.play();
                    if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
                        this.playLocker = true;
                        play.then(function () {
                            _this.playLocker = false; // this controller must be set before trigger lock queue
                            if (_this.lockQueue) {
                                _this.lockQueue.forEach(function (v) { return v && v(); });
                                _this.lockQueue.splice(0);
                            }
                        })["catch"](function (err) {
                            _this.playLocker = false;
                            if (_this.playErrLocker) {
                                // trigger lock queue if the playErrLocker is a truthy
                                _this.playErrLocker = false;
                                _this.lockQueue && _this.lockQueue.forEach(function (v) { return v && v(); });
                            }
                            else {
                                // set play error if not trigger load error
                                if (_this.playState !== playStateSet.loaderror) {
                                    _this.eventMethods && _this.eventMethods.playerror(err);
                                }
                            }
                            _this.lockQueue && _this.lockQueue.splice(0);
                        });
                    }
                    // If the sound is still paused, then we can assume there was a playback issue.
                    if (this.audioH5.paused) {
                        var err = "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.";
                        this.eventMethods && this.eventMethods.playerror(err);
                    }
                }
                catch (err) {
                    // set play error if not trigger load error and playErrLocker is a falsy
                    if (!this.playErrLocker && this.playState !== playStateSet.loaderror) {
                        this.eventMethods && this.eventMethods.playerror(err);
                    }
                    else {
                        this.playErrLocker = false;
                    }
                }
            }
            else if (this.lockTags && this.lockTags.pause_wait) {
                // trigger play when the playLock means cancel pause
                this.lockTags.pause_cancel = true;
            }
            return this.playId;
        }
    };
    /**
     * method - pause
     *
     * @return {number | void} playId
     */
    AudioH5.prototype.pause = function () {
        var _this = this;
        if (this._checkInit()) {
            // the pause method in lockQueue allow only one
            if (!this.lockTags.pause_wait) {
                this._playLockQueue((function (playLock) {
                    _this.lockTags.pause_wait = playLock;
                    return function () {
                        _this.lockTags.pause_wait = false;
                        if (_this.lockTags.pause_cancel) {
                            _this.lockTags.pause_cancel = false;
                            return;
                        }
                        _this.audioH5.pause();
                    };
                })(this.playLocker));
            }
            else {
                // trigger pause when the playLock means allow pause
                this.lockTags.pause_cancel = false;
            }
            return this.playId;
        }
    };
    /**
     * method - toggle - switch between play and pause
     *
     * @return {number | void} playId
     */
    AudioH5.prototype.toggle = function () {
        if (this._checkInit() && this.playState !== playStateSet.loaderror && this.playState !== playStateSet.playerror && this.playState !== playStateSet.unloaded) {
            if (this.lockTags.pause_wait) {
                this.lockTags.pause_cancel = !this.lockTags.pause_cancel;
            }
            else {
                if (this.playState === null || this.playState === playStateSet.paused || this.playState === playStateSet.loaded) {
                    // trigger play method
                    this.play();
                }
                else {
                    this.pause();
                }
            }
            return this.playId;
        }
    };
    /**
     * method - cut - cut song
     *
     * @return {IreturnParams | void}
     */
    AudioH5.prototype.cut = function () {
        if (this._checkInit()) {
            this._cut();
            return this._returnParams();
        }
    };
    /**
     * method - pick - pick song according to playId
     * @param playId
     *
     * @return {IreturnParams | void}
     */
    AudioH5.prototype.pick = function (playId) {
        var _this = this;
        if (this._checkInit() && this._checkType(playId, 'number', true)) {
            for (var i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                    this._setPlayIndex(i);
                    this._setPlayId();
                    this.eventMethods && this.eventMethods.pick(this.playId);
                    this.playErrLocker = true;
                    this._abortLoad();
                    this._commonLock('cutpick', function () {
                        _this.unload(true);
                        var src = _this.playList[_this.playIndex].src;
                        var config = Object.assign(_this.config, { src: src });
                        _this._createAudio(config);
                        _this._registerEvent(config);
                        _this.play();
                    });
                    break;
                }
            }
            return this._returnParams();
        }
    };
    /**
     * method - load - manual load song
     *
     * @return {number | void} playId
     */
    AudioH5.prototype.load = function () {
        var _this = this;
        if (this._checkInit()) {
            this._playLockQueue(function () { return _this.audioH5.load(); });
            return this.playId;
        }
    };
    AudioH5.prototype.seek = function (val) {
        var _this = this;
        if (this._checkInit()) {
            if (this._checkType(val, 'number')) {
                // IE cannot set currentTime when the metaData is loading
                if (utils_1.isIE && !this.metaDataLoaded) {
                    this.seekValue = val;
                    return;
                }
                var duration = this.audioH5.duration;
                if (val > duration)
                    val = duration;
                if (val < 0)
                    val = 0;
                this.seekValue = null;
                this._commonLock('seek', function () { return (_this.audioH5.currentTime = val); });
            }
            else {
                return this.audioH5.currentTime;
            }
        }
    };
    /**
     * method - rate - set or get play rate ratio
     * @param {number} val
     *
     * @return {number | void} playbackRate
     */
    AudioH5.prototype.rate = function (val) {
        var _this = this;
        if (this._checkInit()) {
            if (this._checkType(val, 'number')) {
                if (val > 2)
                    val = 2;
                if (val < 0.5)
                    val = 0.5;
                this._commonLock('rate', function () { return (_this.audioH5.playbackRate = val); });
                this._updateConfig({ rate: val });
            }
            else {
                return this.audioH5.playbackRate;
            }
        }
    };
    /**
     * method - volume - set or get volume
     * @param {number} val
     *
     * @return {number | void} volume
     */
    AudioH5.prototype.volume = function (val) {
        var _this = this;
        if (this._checkInit()) {
            if (this._checkType(val, 'number')) {
                if (val > 1)
                    val = 1;
                if (val < 0)
                    val = 0;
                this._commonLock('volume', function () {
                    {
                        _this.audioH5.muted = false;
                    }
                    {
                        _this.audioH5.volume = val;
                    }
                });
                this._updateConfig({ volume: val });
            }
            else {
                return this.audioH5.volume;
            }
        }
    };
    /**
     * method - muted - set or get muted
     * @param {boolean} bool
     *
     * @return {boolean | void} whether or not muted
     */
    AudioH5.prototype.mute = function (bool) {
        var _this = this;
        if (this._checkInit()) {
            if (this._checkType(bool, 'boolean')) {
                this._commonLock('mute', function () { return (_this.audioH5.muted = bool); });
                this._updateConfig({ mute: bool });
            }
            else {
                return this.audioH5.muted;
            }
        }
    };
    /**
     * method - stop - stop the playing song
     * @param {boolean} forbidEvent
     *
     * @return {number | void} playId
     */
    AudioH5.prototype.stop = function (forbidEvent) {
        var _this = this;
        if (this._checkInit() && this.playState !== playStateSet.stopped) {
            this._playLockQueue(function () {
                if (!forbidEvent) {
                    _this._blockEvent({ block: true });
                    _this._setPlayState(playStateSet.stopped);
                    _this._fireEventQueue(_this.playId, 'onstop');
                }
                if (_this.audioH5) {
                    if (typeof _this.audioH5.duration !== 'undefined') {
                        _this.audioH5.currentTime = 0;
                        _this.audioH5.pause();
                    }
                    else {
                        _this.audioH5.muted = true;
                    }
                }
            });
            return this.playId;
        }
    };
    /**
     * method - unload - unload the Audio
     * @param forbidEvent
     *
     * @return {void}
     */
    AudioH5.prototype.unload = function (forbidEvent) {
        var _this = this;
        if (this._checkInit()) {
            this.stop(true);
            this._unregisterEvent();
            this._playLockQueue(function () {
                if (!forbidEvent) {
                    _this._setPlayState(playStateSet.unloaded);
                    _this._fireEventQueue(_this.playId, 'onunload');
                }
                _this._abortLoad();
                delete _this.audioH5;
                _this.isInit = false;
            });
        }
    };
    /**
     * method - model - set or get playModel
     * @param {TplayModelStr} model
     *
     * @return {string | void} playModel
     */
    AudioH5.prototype.model = function (model) {
        if (this._checkInit()) {
            // model contain: list-once, list-random, list-loop, single-once, single-loop
            if (model) {
                this.playModel = playModelSet[model];
            }
            else {
                return (playModelSet[this.playModel || 0]);
            }
        }
    };
    /**
     * add event to events queue
     * @param {string} event TEvent
     * @param {Function} cb TentireEventCallback
     *
     * @return {boolean} whether or not successful bind event callback
     */
    AudioH5.prototype.on = function (event, cb) {
        if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
            var queueName = event.indexOf('on') === 0 ? event : "on" + event;
            return this._onEvent(queueName, cb);
        }
        return false;
    };
    /**
     * remove event from events queue
     * @param {string} event TEvent
     * @param {Function} cb TentireEventCallback
     *
     * @return {boolean} whether or not successful unbind event callback
     */
    AudioH5.prototype.off = function (event, cb) {
        if (this._checkInit() && this._checkType(event, 'string', true)) {
            var queueName = event.indexOf('on') === 0 ? event : "on" + event;
            return this._offEvent(queueName, cb);
        }
        return false;
    };
    /* fire only one time */
    /**
     * fire only one time
     * @param {string} event TEvent
     * @param {Function} cb TentireEventCallback
     *
     * @return {boolean} whether or not successful bind once event callback
     */
    AudioH5.prototype.once = function (event, cb) {
        var _this = this;
        if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
            var queueName_1 = event.indexOf('on') === 0 ? event : "on" + event;
            var funcName_1 = "EASE_AUDIO_" + queueName_1.toUpperCase() + "_ONCE_CALLBACK";
            var once_1 = function (e) {
                cb && cb(e);
                _this._offEvent(queueName_1, once_1, funcName_1);
            };
            return this._onEvent(queueName_1, once_1, funcName_1);
        }
        return false;
    };
    /**
     * set play list
     * @param {IsetPlaylist} data
     *
     * @return {IreturnParams | void}
     */
    AudioH5.prototype.playlist = function (data) {
        var action = data.action, list = data.list, playId = data.playId, params = data.params;
        if (this._checkInit() && this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true)) && (!params || this._checkType(params, 'object', true))) {
            this._handlePlayList(data);
            return this._returnParams();
        }
    };
    /**
     * initial audio
     * @param {Iconfig} config
     *
     * @return {void}
     */
    AudioH5.prototype._initial = function (config) {
        this.config = config; // preserve initial config
        this.playState = null;
        this.debug = config.debug || false;
        this.logLevel = (config.logLevel && logLevelSet[config.logLevel]) || logLevelSet['error'];
        this.idCounter = 1000;
        this.lockQueue = new Array(0);
        this.playLocker = false;
        this.playErrLocker = false;
        this.lockTags = {
            cutpick: 0,
            seek: 0,
            volume: 0,
            rate: 0,
            mute: 0,
            pause_wait: false,
            pause_cancel: false
        };
        this.playId = 1000;
        this.playModel = (config.playModel && playModelSet[config.playModel]) || (config.loop && playModelSet['list-loop']) || playModelSet['list-once'];
        this.playIndex = 0;
        this.prevPlayIndex = 0;
        this.playList = new Array(0);
        this.buffered = new Array(0);
        this.eventController = Object.create(null);
        this.eventMethods = Object.create(null);
        // playlist convert to src
        var src;
        if (config.playlist && this._checkType(config.playlist, 'array')) {
            for (var i = 0; i < config.playlist.length; i++) {
                if (this._checkType(config.playlist[i], 'object'))
                    continue;
                config.playlist[i] = Object.create(null, {
                    src: {
                        writable: true,
                        enumerable: true,
                        configurable: true,
                        value: config.playlist[i]
                    }
                });
            }
            this._handlePlayList({ action: 'add', list: config.playlist });
            var srcIndex = config.initIndex && this.playList[config.initIndex] ? config.initIndex : 0;
            this._setPlayIndex(srcIndex);
            this._setPlayId();
            src = this.playList[srcIndex].src;
        }
        else {
            this._logErr('Please pass correct playlist parameters!');
        }
        // create Audio Object
        this._createAudio(__assign({}, config, { src: src }));
    };
    /**
     * create HMTL Audio Object
     * @param {Iconfig} config
     *
     * @return {void}
     */
    AudioH5.prototype._createAudio = function (config) {
        if (typeof window !== 'undefined' && !this.audioH5) {
            this.isInit = true;
            this.audioH5 = new Audio();
            this.audioH5.autoplay = config.autoplay || false;
            this.audioH5.loop = config.loop || false;
            this.audioH5.src = this._srcAssemble(config.src);
            this.audioH5.preload = config.preload === false ? 'none' : 'auto';
            this.audioH5.volume = config.volume || (config.volume === 0 ? 0 : 1);
            this.audioH5.muted = config.mute || false;
            this.audioH5.playbackRate = config.rate || config.playbackRate || 1;
            this.audioH5.controls = false;
        }
    };
    /**
     * The src compatible process
     * @param {string} src
     *
     * @return {string | TdefaultSrc} return src or defaultSrc
     */
    AudioH5.prototype._srcAssemble = function (src) {
        if (src && this._checkType(src, 'string')) {
            return src;
        }
        this._logErr("The playId's " + this.playId + " src property is: " + src + ".\nIt's necessary and must be string!");
        return defaultSrc;
    };
    /**
     * update config
     * @param {IupdateConfig} params
     *
     * @return {void}
     */
    AudioH5.prototype._updateConfig = function (params) {
        Object.assign(this.config, params);
    };
    /**
     * return formatted parameters
     *
     * @return {IreturnParams}
     */
    AudioH5.prototype._returnParams = function () {
        return {
            playId: this.playId,
            playingData: this.playList && this.playList[this.playIndex || 0],
            playlist: this.playList
        };
    };
    /**
     * abort load sound
     *
     * @return {void}
     */
    AudioH5.prototype._abortLoad = function () {
        if (this.audioH5 && this.audioH5.src !== defaultSrc) {
            this.audioH5.src = defaultSrc;
            this.audioH5.currentTime = 0;
            this.audioH5.load();
        }
    };
    /**
     * set play state
     * @param {TplayState} state
     *
     * @return {TplayState | false}
     */
    AudioH5.prototype._setPlayState = function (state) {
        if (this.audioH5 && this._checkType(state, 'number', true) && this.playState !== state) {
            var readyState = this.audioH5.readyState;
            var isReady = readyState > 2;
            var paused = this.audioH5.paused;
            var stopped = this.playState === playStateSet.stopped;
            var ended = this.playState === playStateSet.ended;
            var finished = this.playState === playStateSet.finished;
            var unloaded = this.playState === playStateSet.unloaded;
            var seeking = this.audioH5.seeking;
            // filter impossible state
            switch (state) {
                case playStateSet.loading:
                    // could not be loading: ready and not finished
                    if (!finished && isReady)
                        return false;
                    break;
                case playStateSet.playing:
                    // could not be playing: paused or unloaded or seeking or not ready when not finished
                    if (!finished && (paused || unloaded || seeking || !isReady))
                        return false;
                    break;
                case playStateSet.paused:
                    // could not be paused: stopped or ended or finished
                    if (stopped || ended || finished || unloaded)
                        return false;
                    break;
            }
            this._logInfo("setPlayState - " + playStateSet[state]);
            this.playState = state;
            return this.playState;
        }
        return false;
    };
    /**
     * set play index
     * @param {TplayIndex} index
     *
     * @return {TplayIndex}
     */
    AudioH5.prototype._setPlayIndex = function (index) {
        var playModel = this.playModel;
        var maxIndex = this.playList.length - 1;
        // reserve playIndex
        this.prevPlayIndex = this.playIndex;
        if (index === 0) {
            this.playIndex = 0;
            return this.playIndex;
        }
        switch (playModelSet[playModel]) {
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
        !this.playIndex && (this.playIndex = 0);
        this._log("setPlayIndex - playIndex: " + this.playIndex);
        return this.playIndex;
    };
    /**
     * set playId
     * @param {boolean} isSet
     *
     * @return {TplayId}
     */
    AudioH5.prototype._setPlayId = function (isSet) {
        if (isSet === void 0) { isSet = true; }
        var playId = (this.playList && this.playList[this.playIndex] && this.playList[this.playIndex].playId) || this.playId;
        if (isSet === true)
            this.playId = playId;
        return playId;
    };
    /**
     * handle play list
     * @param {IsetPlaylist} data
     *
     * @return {void}
     */
    AudioH5.prototype._handlePlayList = function (data) {
        var _this = this;
        var action = data.action, list = data.list, playId = data.playId, params = data.params;
        var playlist = new (Array.bind.apply(Array, [void 0].concat((this.playList || []))))();
        switch (action) {
            case 'add':
                if (!list)
                    return;
                Array.prototype.forEach.call(list, function (v, k, thisArr) {
                    !_this.idCounter && (_this.idCounter = 1000);
                    v.playId = _this.idCounter;
                    _this.idCounter++;
                    thisArr[k] = v;
                });
                this.playList = Array.prototype.concat.call(playlist, list);
                break;
            case 'delete':
                if (playId) {
                    for (var i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            playlist.splice(i, 1);
                            this.playList = playlist.slice();
                            break;
                        }
                    }
                }
                break;
            case 'insert':
                if (playId && list) {
                    for (var i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            playlist.splice.apply(playlist, [i, 0].concat(list.map(function (v) {
                                !_this.idCounter && (_this.idCounter = 1000);
                                v.playId = _this.idCounter;
                                _this.idCounter++;
                                return v;
                            })));
                            this.playList = playlist.slice();
                            break;
                        }
                    }
                }
                break;
            case 'replace':
                if (playId && list) {
                    for (var i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            playlist.splice.apply(playlist, [i, 1].concat(list.map(function (v) {
                                !_this.idCounter && (_this.idCounter = 1000);
                                v.playId = _this.idCounter;
                                _this.idCounter++;
                                return v;
                            })));
                            this.playList = playlist.slice();
                            break;
                        }
                    }
                }
                break;
            case 'update':
                if (playId && params) {
                    for (var i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            var newData = __assign({}, playlist[i], params);
                            playlist.splice(i, 1, newData);
                            this.playList = playlist.slice();
                            break;
                        }
                    }
                }
                break;
            case 'reset':
                this._resetPlayList();
                break;
        }
    };
    /**
     * reset play list
     *
     * @return {void}
     */
    AudioH5.prototype._resetPlayList = function () {
        this.playList = new Array(0);
        this._setPlayIndex(0);
    };
    /**
     * cut audio
     * @param {boolean} autocut
     *
     * @return {void}
     */
    AudioH5.prototype._cut = function (autocut) {
        var _this = this;
        if (this._checkInit()) {
            if (this.playModel === playModelSet['single-once']) {
                // can't cut audio if the playModel is single-once
                this._logWarn('Cannot cut audio if the playModel is single-once');
                this.stop();
            }
            else {
                this.metaDataLoaded = false;
                this.seekValue = null;
                !autocut && this._setPlayIndex();
                // on finish
                if (this.playList && !this.playList[this.playIndex]) {
                    this._setPlayIndex(this.prevPlayIndex);
                    return this.eventMethods && this.eventMethods.finish(this.playId);
                }
                this._setPlayId();
                this.eventMethods && this.eventMethods.cut(this.playId);
                this.playErrLocker = true;
                this._abortLoad();
                return this._commonLock('cutpick', function () {
                    var src = _this.playList[_this.playIndex].src;
                    if (autocut) {
                        if (_this.audioH5 && src) {
                            // resolve the IOS auto play problem
                            _this.audioH5.src = src;
                            _this.audioH5.load();
                        }
                    }
                    else {
                        _this.unload(true);
                        var config = Object.assign(_this.config, { src: src });
                        _this._createAudio(config);
                        _this._registerEvent(config);
                    }
                    return _this.play();
                });
            }
        }
    };
    /**
     * generate received event callback queue
     * @param {string} event TonEvent
     * @param {Function} cb TentireEventCallback
     * @param {string} name the special name for same events
     *
     * @return {boolean} whether or not successful bind event callback
     */
    AudioH5.prototype._onEvent = function (event, cb, name) {
        if (!isNaN(supportEvents[event])) {
            try {
                if (!this[event])
                    this[event] = Object.create(null)(this[event])[name || cb.name || "anonymous-" + new Date().getTime()] = cb;
                return true;
            }
            catch (error) {
                this._logErr(error);
            }
        }
        return false;
    };
    /**
     * delete received event callback queue
     * @param {string} event TonEvent
     * @param {Function} cb TentireEventCallback
     * @param {string} name the special name for same events
     *
     * @return {boolean} whether or not successful unbind event callback
     */
    AudioH5.prototype._offEvent = function (event, cb, name) {
        if (!isNaN(supportEvents[event])) {
            try {
                if (!cb)
                    this[event] = null;
                else if (name || cb.name)
                    delete this[event][name || cb.name];
                return true;
            }
            catch (error) {
                this._logErr(error);
            }
        }
        return false;
    };
    /**
     * fire event callback queue
     * @param {TeventParameter} e
     * @param {TonEvent} eventQueue
     *
     * @return {void}
     */
    AudioH5.prototype._fireEventQueue = function (e, eventQueue) {
        if (this[eventQueue]) {
            for (var k in this[eventQueue]) {
                this[eventQueue][k] && this[eventQueue][k](e);
            }
        }
    };
    /**
     * register Audio Event
     * @param {Iconfig} config
     */
    AudioH5.prototype._registerEvent = function (config) {
        var _this = this;
        var curry = function (cb, eventName) { return function (e) {
            if (!_this._triggerEventController(eventName))
                return;
            return cb && cb(e);
        }; };
        /* bindind received event callbacks */
        var configKeys = Object.keys(config);
        configKeys.forEach(function (v) {
            if (v.indexOf('on') === 0) {
                var cb = config[v];
                if (cb && _this._checkType(cb, 'function', true)) {
                    var funcName = "EASE_AUDIO_" + v.toUpperCase() + "_INITIAL_CALLBACK";
                    _this._onEvent(v, cb, funcName);
                }
            }
        });
        this.eventMethods = {
            // loading state
            loadstart: function (e) {
                if (_this.audioH5 && _this.audioH5.src === defaultSrc)
                    return;
                _this._setPlayState(playStateSet.loading);
                _this._fireEventQueue(e, 'onload');
            },
            seeking: function (e) {
                if (_this.audioH5 && _this.audioH5.src !== defaultSrc && _this.playState !== playStateSet.paused)
                    _this._setPlayState(playStateSet.loading);
                _this._fireEventQueue(e, 'onseeking');
            },
            // loaded state
            canplaythrough: function (e) {
                if (_this.audioH5 && _this.audioH5.src === defaultSrc)
                    return;
                _this.playState === playStateSet.loading && _this._setPlayState(playStateSet.loaded);
                _this._fireEventQueue(e, 'oncanplaythrough');
            },
            // playing state
            playing: function (e) {
                _this._setPlayState(playStateSet.playing);
                _this._fireEventQueue(e, 'onplay');
                // if playing then set the isTriggerEnd to false
                if (_this.isTriggerEnd)
                    _this.isTriggerEnd = false;
            },
            // paused state
            pause: function (e) {
                // resolve ios cannot trigger onend but onpause event
                if (!_this.isTriggerEnd) {
                    _this._setPlayState(playStateSet.paused);
                    _this._fireEventQueue(e, 'onpause');
                }
            },
            // ended state
            ended: function (e) {
                if (_this.isTriggerEnd) {
                    _this.isTriggerEnd = false;
                }
                else {
                    _this.isTriggerEnd = true;
                    _this._setPlayState(playStateSet.ended);
                    _this._fireEventQueue(e, 'onend');
                    return _this._autocut();
                }
            },
            // finish state
            // The Audio not really exist this event, just for intergration
            finish: function (e) {
                _this._setPlayState(playStateSet.finished);
                _this._fireEventQueue(e, 'onfinish');
            },
            // loaderror state
            error: function (e) {
                _this._setPlayState(playStateSet.loaderror);
                _this._fireEventQueue(e, 'onloaderror');
            },
            // playerror state
            // The Audio not really exist this event, just for intergration
            playerror: function (e) {
                _this._setPlayState(playStateSet.playerror);
                _this._fireEventQueue(e, 'onplayerror');
            },
            // others
            progress: function (e) {
                var ranges = e.target.buffered;
                var total = (e.total || 1);
                var buffered = 0;
                var loaded = (e.loaded || 0);
                var progress = loaded / total;
                if (ranges && ranges.length) {
                    for (var i = 0, j = ranges.length; i < j; i++) {
                        _this.buffered && _this.buffered.push({
                            'start': ranges.start(i) * 1000,
                            'end': ranges.end(i) * 1000
                        });
                    }
                    buffered = (ranges.end(0) - ranges.start(0)) * 1000;
                    loaded = Math.min(1, buffered / (e.target.duration * 1000));
                    progress = loaded / total;
                }
                _this._fireEventQueue(Object.assign(e, { progress: progress }), 'onprogress');
            },
            durationchange: function (e) { },
            loadedmetadata: function (e) {
                _this.metaDataLoaded = true;
                _this.seekValue && _this.seek(_this.seekValue);
            },
            loadeddata: function (e) { },
            timeupdate: function (e) {
                // playState is loading but actually is playing
                if (_this.playState === playStateSet.loading) {
                    _this._logInfo("timeupdate's playing");
                    _this._setPlayState(playStateSet.playing);
                    _this._fireEventQueue(e, 'onplay');
                }
                // Depending on currentTime and duration to mimic end event
                var isEnd = _this.audioH5 && _this.audioH5.duration && +_this.audioH5.currentTime >= +_this.audioH5.duration;
                if (isEnd) {
                    if (_this.isTriggerEnd) {
                        _this.isTriggerEnd = false;
                    }
                    else {
                        _this._logInfo("timeupdate's ended");
                        _this.isTriggerEnd = true;
                        _this._setPlayState(playStateSet.ended);
                        _this._fireEventQueue(e, 'onend');
                        return _this._autocut();
                    }
                }
                _this._fireEventQueue(e, 'ontimeupdate');
            },
            canplay: function (e) { return _this._fireEventQueue(e, 'oncanplay'); },
            seeked: function (e) { return _this._fireEventQueue(e, 'onseeked'); },
            volumechange: function (e) { return _this._fireEventQueue(e, 'onvolume'); },
            ratechange: function (e) { return _this._fireEventQueue(e, 'onrate'); },
            cut: function (e) { return _this._fireEventQueue(e, 'oncut'); },
            pick: function (e) { return _this._fireEventQueue(e, 'onpick'); },
            play: function (e) { },
            abort: function (e) { },
            suspend: function (e) { }
        };
        for (var k in this.eventMethods) {
            // filter useless events
            if (uselessEvents[k] !== 'undefined')
                continue;
            // bind controller scope for every each event
            this.eventMethods[k] = curry(this.eventMethods[k], k);
            this._bindEvent(this.eventMethods[k], k);
        }
        this._blockEvent({ block: false });
    };
    /**
     * unregister Audio Event
     *
     * @return {void}
     */
    AudioH5.prototype._unregisterEvent = function () {
        if (this._checkInit()) {
            for (var k in this.eventMethods) {
                if (uselessEvents[k] !== 'undefined')
                    continue;
                this._removeEvent(this.eventMethods[k], k);
            }
        }
    };
    /**
     * not remove but block event callback
     * @param {IblockEvent} params
     *
     * @return {void}
     */
    AudioH5.prototype._blockEvent = function (params) {
        if (this._checkInit()) {
            var event = params.event, block = params.block;
            if (event && this._checkType(event, 'string')) {
                this.eventController[event] = !block;
            }
            else {
                for (var k in this.eventMethods) {
                    this.eventController[k] = !block;
                }
            }
        }
    };
    /**
     * whether or not trigger event callback
     * @param {TAudioEvent} event
     *
     * @return {boolean} the event whether or not be blocked
     */
    AudioH5.prototype._triggerEventController = function (event) {
        if (this.eventController && !this.eventController[event])
            return false;
        this._log("trigger " + event + " event");
        return true;
    };
    /**
     * bind event
     * @param {TentireEventCallback} cb
     * @param {TAudioEvent} event
     *
     * @return {void}
     */
    AudioH5.prototype._bindEvent = function (cb, event) {
        if (!this._checkType(event, 'string'))
            return this._logErr("bindEvent - bind event name is not string");
        this._checkType(cb, 'function', true) && utils_1.addListener(event, cb, this.audioH5);
    };
    /**
     * remove event
     * @param {TentireEventCallback} cb
     * @param {TAudioEvent} event
     *
     * @return {void}
     */
    AudioH5.prototype._removeEvent = function (cb, event) {
        if (!this._checkType(event, 'string'))
            return this._logErr("removeEvent - unbind event name is not string");
        this._checkType(cb, 'function', true) && utils_1.removeListener(event, cb, this.audioH5);
    };
    /**
     * playLock queue handle
     * @param {() => any} fn
     *
     * @return {any}
     */
    AudioH5.prototype._playLockQueue = function (fn) {
        if (this.playLocker) {
            return this.lockQueue.push(fn);
        }
        return fn && fn();
    };
    /**
     * trigger lockqueue general method
     * @param tag
     * @param fn
     *
     * @return {void}
     */
    AudioH5.prototype._commonLock = function (tag, fn) {
        var _this = this;
        if (this.playLocker) {
            var lockTags = this.lockTags[tag];
            typeof lockTags === 'number' && (this.lockTags[tag] = lockTags + 1);
        }
        this._playLockQueue((function (id) { return function () {
            if (id !== _this.lockTags[tag])
                return;
            fn && fn();
        }; })(this.lockTags[tag]));
    };
    /**
     * handle onend auto cut sound
     *
     * @return {Promise<any> | any}
     */
    AudioH5.prototype._autocut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var autocut, nextId, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        autocut = this.config.autocut;
                        this._setPlayIndex();
                        nextId = this._setPlayId(false);
                        if (!this._checkType(autocut, 'function')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, autocut(this.playId, nextId)];
                    case 2:
                        autocut = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this._logErr("autocut occur error, it's " + err_1);
                        // withdrawl set playIndex operation
                        this._setPlayIndex(this.prevPlayIndex);
                        return [2 /*return*/, this.eventMethods.finish(this.playId)];
                    case 4: return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this._checkType(autocut, 'boolean') ? resolve(autocut) : reject(autocut);
                        }).then(function (isCut) {
                            if (isCut)
                                return _this._cut(true);
                            _this._setPlayIndex(_this.prevPlayIndex);
                            return _this.eventMethods.finish(_this.playId);
                        })["catch"](function (err) {
                            _this._logWarn("The autocut property type should be boolean or function return boolean, now the result " + err + " type was " + typeof err);
                            _this._setPlayIndex(_this.prevPlayIndex);
                            return _this.eventMethods.finish(_this.playId);
                        })];
                }
            });
        });
    };
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
    // protected methods
    // ---------------
    // ---------------
    // ---------------
    /**
     * check element type whether or not match the type parameter
     * @param {any} element
     * @param {string} type
     * @param {boolean} logErr
     *
     * @return {boolean}
     */
    AudioH5.prototype._checkType = function (element, type, logErr) {
        if (typeof type !== 'string') {
            this._logWarn('checkType - The {type} parameter must be string');
            return false;
        }
        if (utils_1.getType(element) !== type) {
            logErr && this._logErr("Your parameter(" + element + ") type is " + utils_1.getType(element) + ", please pass the " + type + " type");
            return false;
        }
        return true;
    };
    /**
     * check whether or not init Audio
     *
     * @return {boolean}
     */
    AudioH5.prototype._checkInit = function () {
        if (!this.isInit) {
            this._logWarn("checkInit - The Audio haven't been initiated");
            return false;
        }
        return true;
    };
    /**
     * detail logger
     * @param {string | Object | Array<any>} detail the log message
     *
     * @return {void}
     */
    AudioH5.prototype._log = function (detail) {
        var canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel === logLevelSet['detail'];
        canLog && this.debug && this._logOptimize(detail, 'log');
    };
    /**
     * info logger
     * @param {string | Object | Array<any>} info the log message
     *
     * @return {void}
     */
    AudioH5.prototype._logInfo = function (info) {
        var canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'] && this.logLevel !== logLevelSet['warn'];
        canLog && this.debug && this._logOptimize(info, 'info');
    };
    /**
     * warn logger
     * @param {string | Object | Array<any>} warn the warn log message
     *
     * @return {void}
     */
    AudioH5.prototype._logWarn = function (warn) {
        var canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'];
        canLog && this.debug && this._logOptimize(warn, 'warn');
    };
    /**
     * error logger
     * @param {string | Object | Array<any>} error the error log message
     *
     * @return {void}
     */
    AudioH5.prototype._logErr = function (error) {
        var canLog = this.logLevel !== logLevelSet['silent'];
        canLog && this.debug && this._logOptimize(error, 'error');
    };
    /**
     * console logger optimize
     * @param {string | Object | Array<any>} msg the log message
     * @param {string} method the logger method in console Object
     *
     * @return {void}
     */
    AudioH5.prototype._logOptimize = function (msg, method) {
        var logger = console[method] || console.log;
        var prefix = "[EASE_AUDIO_H5 " + method.toUpperCase() + "]:";
        if ((this._checkType(msg, 'object') || this._checkType(msg, 'array')) && console.table) {
            logger(prefix);
            console.table(msg);
            return;
        }
        logger(prefix, msg);
    };
    return AudioH5;
}());
exports.AudioH5 = AudioH5;
exports["default"] = AudioH5;
