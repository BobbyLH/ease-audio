var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addListener, removeListener, getType, isIE } from '../utils/index';
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
const defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
export class AudioH5 {
    constructor(config) {
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
    /**
     * duration getter
     *
     * @return {number} the audio's duration
     */
    get duration() {
        return this.audioH5 ? this.audioH5.duration : 0;
    }
    /**
     * networkState getter
     *
     * @return {number}
     */
    get networkState() {
        return this.audioH5 ? this.audioH5.networkState : 0;
    }
    /**
     * get playList
     *
     * @return {Tplaylist}
     */
    get playlists() {
        return this.playList || [];
    }
    /**
     * get playId
     *
     * @return {TplayId}
     */
    get playid() {
        return this.playId || 1000;
    }
    /**
     * get playstate
     *
     * @return {TplayStateStr | null}
     */
    get playstate() {
        return !this.playState && this.playState !== 0 ? null : playStateSet[this.playState || 0];
    }
    /**
     * init Audio
     * @param {Iconfig} config
     *
     * @returns {IreturnParams | void}
     */
    init(config) {
        if (!this.isInit && config && this._checkType(config, 'object') && JSON.stringify(config) !== '{}') {
            this._initial(config);
            this._registerEvent(config);
            return this._returnParams();
        }
    }
    /**
     * method - play
     *
     * @return {number | void} playId
     */
    play() {
        if (this._checkInit()) {
            if (!this.playLocker) {
                try {
                    if (this.audioH5.src === defaultSrc) {
                        // without correct src the sound couldn't play
                        // manual trigger load error event
                        const err = 'Because the error src property, manual trigger load error event';
                        return this.eventMethods && this.eventMethods.error(err);
                    }
                    this._blockEvent({ block: false });
                    let play = this.audioH5.play();
                    if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
                        this.playLocker = true;
                        play.then(() => {
                            this.playLocker = false; // this controller must be set before trigger lock queue
                            if (this.lockQueue) {
                                this.lockQueue.forEach(v => v && v());
                                this.lockQueue.splice(0);
                            }
                        }).catch(err => {
                            this.playLocker = false;
                            if (this.playErrLocker) {
                                // trigger lock queue if the playErrLocker is a truthy
                                this.playErrLocker = false;
                                this.lockQueue && this.lockQueue.forEach(v => v && v());
                            }
                            else {
                                // set play error if not trigger load error
                                if (this.playState !== playStateSet.loaderror) {
                                    this.eventMethods && this.eventMethods.playerror(err);
                                }
                            }
                            this.lockQueue && this.lockQueue.splice(0);
                        });
                    }
                    // If the sound is still paused, then we can assume there was a playback issue.
                    if (this.audioH5.paused) {
                        const err = `Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.`;
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
    }
    /**
     * method - pause
     *
     * @return {number | void} playId
     */
    pause() {
        if (this._checkInit()) {
            // the pause method in lockQueue allow only one
            if (!this.lockTags.pause_wait) {
                this._playLockQueue((playLock => {
                    this.lockTags.pause_wait = playLock;
                    return () => {
                        this.lockTags.pause_wait = false;
                        if (this.lockTags.pause_cancel) {
                            this.lockTags.pause_cancel = false;
                            return;
                        }
                        this.audioH5.pause();
                    };
                })(this.playLocker));
            }
            else {
                // trigger pause when the playLock means allow pause
                this.lockTags.pause_cancel = false;
            }
            return this.playId;
        }
    }
    /**
     * method - toggle - switch between play and pause
     *
     * @return {number | void} playId
     */
    toggle() {
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
    }
    /**
     * method - cut - cut song
     *
     * @return {IreturnParams | void}
     */
    cut() {
        if (this._checkInit()) {
            this._cut();
            return this._returnParams();
        }
    }
    /**
     * method - pick - pick song according to playId
     * @param playId
     *
     * @return {IreturnParams | void}
     */
    pick(playId) {
        if (this._checkInit() && this._checkType(playId, 'number', true)) {
            for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].playId === playId) {
                    this._setPlayIndex(i);
                    this._setPlayId();
                    this.eventMethods && this.eventMethods.pick(this.playId);
                    this.playErrLocker = true;
                    this._abortLoad();
                    this._commonLock('cutpick', () => {
                        this.unload(true);
                        const src = this.playList[this.playIndex].src;
                        const config = Object.assign(this.config, { src });
                        this._createAudio(config);
                        this._registerEvent(config);
                        this.play();
                    });
                    break;
                }
            }
            return this._returnParams();
        }
    }
    /**
     * method - load - manual load song
     *
     * @return {number | void} playId
     */
    load() {
        if (this._checkInit()) {
            this._playLockQueue(() => this.audioH5.load());
            return this.playId;
        }
    }
    seek(val) {
        if (this._checkInit()) {
            if (this._checkType(val, 'number')) {
                // IE cannot set currentTime when the metaData is loading
                if (isIE && !this.metaDataLoaded) {
                    this.seekValue = val;
                    return;
                }
                const duration = this.audioH5.duration;
                if (val > duration)
                    val = duration;
                if (val < 0)
                    val = 0;
                this.seekValue = null;
                this._commonLock('seek', () => (this.audioH5.currentTime = val));
            }
            else {
                return this.audioH5.currentTime;
            }
        }
    }
    /**
     * method - rate - set or get play rate ratio
     * @param {number} val
     *
     * @return {number | void} playbackRate
     */
    rate(val) {
        if (this._checkInit()) {
            if (this._checkType(val, 'number')) {
                if (val > 2)
                    val = 2;
                if (val < 0.5)
                    val = 0.5;
                this._commonLock('rate', () => (this.audioH5.playbackRate = val));
                this._updateConfig({ rate: val });
            }
            else {
                return this.audioH5.playbackRate;
            }
        }
    }
    /**
     * method - volume - set or get volume
     * @param {number} val
     *
     * @return {number | void} volume
     */
    volume(val) {
        if (this._checkInit()) {
            if (this._checkType(val, 'number')) {
                if (val > 1)
                    val = 1;
                if (val < 0)
                    val = 0;
                this._commonLock('volume', () => {
                    {
                        this.audioH5.muted = false;
                    }
                    {
                        this.audioH5.volume = val;
                    }
                });
                this._updateConfig({ volume: val });
            }
            else {
                return this.audioH5.volume;
            }
        }
    }
    /**
     * method - muted - set or get muted
     * @param {boolean} bool
     *
     * @return {boolean | void} whether or not muted
     */
    mute(bool) {
        if (this._checkInit()) {
            if (this._checkType(bool, 'boolean')) {
                this._commonLock('mute', () => (this.audioH5.muted = bool));
                this._updateConfig({ mute: bool });
            }
            else {
                return this.audioH5.muted;
            }
        }
    }
    /**
     * method - stop - stop the playing song
     * @param {boolean} forbidEvent
     *
     * @return {number | void} playId
     */
    stop(forbidEvent) {
        if (this._checkInit() && this.playState !== playStateSet.stopped) {
            this._playLockQueue(() => {
                if (!forbidEvent) {
                    this._blockEvent({ block: true });
                    this._setPlayState(playStateSet.stopped);
                    this._fireEventQueue(this.playId, 'onstop');
                }
                if (this.audioH5) {
                    if (typeof this.audioH5.duration !== 'undefined') {
                        this.audioH5.currentTime = 0;
                        this.audioH5.pause();
                    }
                    else {
                        this.audioH5.muted = true;
                    }
                }
            });
            return this.playId;
        }
    }
    /**
     * method - unload - unload the Audio
     * @param forbidEvent
     *
     * @return {void}
     */
    unload(forbidEvent) {
        if (this._checkInit()) {
            this.stop(true);
            this._unregisterEvent();
            this._playLockQueue(() => {
                if (!forbidEvent) {
                    this._setPlayState(playStateSet.unloaded);
                    this._fireEventQueue(this.playId, 'onunload');
                }
                this._abortLoad();
                delete this.audioH5;
                this.isInit = false;
            });
        }
    }
    /**
     * method - model - set or get playModel
     * @param {TplayModelStr} model
     *
     * @return {string | void} playModel
     */
    model(model) {
        if (this._checkInit()) {
            // model contain: list-once, list-random, list-loop, single-once, single-loop
            if (model) {
                this.playModel = playModelSet[model];
            }
            else {
                return (playModelSet[this.playModel || 0]);
            }
        }
    }
    /**
     * add event to events queue
     * @param {string} event TEvent
     * @param {Function} cb TentireEventCallback
     *
     * @return {boolean} whether or not successful bind event callback
     */
    on(event, cb) {
        if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
            const queueName = event.indexOf('on') === 0 ? event : `on${event}`;
            return this._onEvent(queueName, cb);
        }
        return false;
    }
    /**
     * remove event from events queue
     * @param {string} event TEvent
     * @param {Function} cb TentireEventCallback
     *
     * @return {boolean} whether or not successful unbind event callback
     */
    off(event, cb) {
        if (this._checkInit() && this._checkType(event, 'string', true)) {
            const queueName = event.indexOf('on') === 0 ? event : `on${event}`;
            return this._offEvent(queueName, cb);
        }
        return false;
    }
    /* fire only one time */
    /**
     * fire only one time
     * @param {string} event TEvent
     * @param {Function} cb TentireEventCallback
     *
     * @return {boolean} whether or not successful bind once event callback
     */
    once(event, cb) {
        if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
            const queueName = event.indexOf('on') === 0 ? event : `on${event}`;
            const funcName = `EASE_AUDIO_${queueName.toUpperCase()}_ONCE_CALLBACK`;
            const once = (e) => {
                cb && cb(e);
                this._offEvent(queueName, once, funcName);
            };
            return this._onEvent(queueName, once, funcName);
        }
        return false;
    }
    /**
     * set play list
     * @param {IsetPlaylist} data
     *
     * @return {IreturnParams | void}
     */
    playlist(data) {
        const { action, list, playId, params } = data;
        if (this._checkInit() && this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true)) && (!params || this._checkType(params, 'object', true))) {
            this._handlePlayList(data);
            return this._returnParams();
        }
    }
    /**
     * initial audio
     * @param {Iconfig} config
     *
     * @return {void}
     */
    _initial(config) {
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
        let src;
        if (config.playlist && this._checkType(config.playlist, 'array')) {
            for (let i = 0; i < config.playlist.length; i++) {
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
            const srcIndex = config.initIndex && this.playList[config.initIndex] ? config.initIndex : 0;
            this._setPlayIndex(srcIndex);
            this._setPlayId();
            src = this.playList[srcIndex].src;
        }
        else {
            this._logErr('Please pass correct playlist parameters!');
        }
        // create Audio Object
        this._createAudio(Object.assign({}, config, { src }));
    }
    /**
     * create HMTL Audio Object
     * @param {Iconfig} config
     *
     * @return {void}
     */
    _createAudio(config) {
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
    }
    /**
     * The src compatible process
     * @param {string} src
     *
     * @return {string | TdefaultSrc} return src or defaultSrc
     */
    _srcAssemble(src) {
        if (src && this._checkType(src, 'string')) {
            return src;
        }
        this._logErr(`The playId's ${this.playId} src property is: ${src}.\nIt's necessary and must be string!`);
        return defaultSrc;
    }
    /**
     * update config
     * @param {IupdateConfig} params
     *
     * @return {void}
     */
    _updateConfig(params) {
        Object.assign(this.config, params);
    }
    /**
     * return formatted parameters
     *
     * @return {IreturnParams}
     */
    _returnParams() {
        return {
            playId: this.playId,
            playingData: this.playList && this.playList[this.playIndex || 0],
            playlist: this.playList
        };
    }
    /**
     * abort load sound
     *
     * @return {void}
     */
    _abortLoad() {
        if (this.audioH5 && this.audioH5.src !== defaultSrc) {
            this.audioH5.src = defaultSrc;
            this.audioH5.currentTime = 0;
            this.audioH5.load();
        }
    }
    /**
     * set play state
     * @param {TplayState} state
     *
     * @return {TplayState | false}
     */
    _setPlayState(state) {
        if (this.audioH5 && this._checkType(state, 'number', true) && this.playState !== state) {
            const readyState = this.audioH5.readyState;
            const isReady = readyState > 2;
            const paused = this.audioH5.paused;
            const stopped = this.playState === playStateSet.stopped;
            const ended = this.playState === playStateSet.ended;
            const finished = this.playState === playStateSet.finished;
            const unloaded = this.playState === playStateSet.unloaded;
            const seeking = this.audioH5.seeking;
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
            this._logInfo(`setPlayState - ${playStateSet[state]}`);
            this.playState = state;
            return this.playState;
        }
        return false;
    }
    /**
     * set play index
     * @param {TplayIndex} index
     *
     * @return {TplayIndex}
     */
    _setPlayIndex(index) {
        const playModel = this.playModel;
        const maxIndex = this.playList.length - 1;
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
        this._log(`setPlayIndex - playIndex: ${this.playIndex}`);
        return this.playIndex;
    }
    /**
     * set playId
     * @param {boolean} isSet
     *
     * @return {TplayId}
     */
    _setPlayId(isSet = true) {
        const playId = (this.playList && this.playList[this.playIndex] && this.playList[this.playIndex].playId) || this.playId;
        if (isSet === true)
            this.playId = playId;
        return playId;
    }
    /**
     * handle play list
     * @param {IsetPlaylist} data
     *
     * @return {void}
     */
    _handlePlayList(data) {
        const { action, list, playId, params } = data;
        const playlist = new Array(...(this.playList || []));
        switch (action) {
            case 'add':
                if (!list)
                    return;
                Array.prototype.forEach.call(list, (v, k, thisArr) => {
                    !this.idCounter && (this.idCounter = 1000);
                    v.playId = this.idCounter;
                    this.idCounter++;
                    thisArr[k] = v;
                });
                this.playList = Array.prototype.concat.call(playlist, list);
                break;
            case 'delete':
                if (playId) {
                    for (let i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            playlist.splice(i, 1);
                            this.playList = [...playlist];
                            break;
                        }
                    }
                }
                break;
            case 'insert':
                if (playId && list) {
                    for (let i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            playlist.splice(i, 0, ...list.map(v => {
                                !this.idCounter && (this.idCounter = 1000);
                                v.playId = this.idCounter;
                                this.idCounter++;
                                return v;
                            }));
                            this.playList = [...playlist];
                            break;
                        }
                    }
                }
                break;
            case 'replace':
                if (playId && list) {
                    for (let i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            playlist.splice(i, 1, ...list.map(v => {
                                !this.idCounter && (this.idCounter = 1000);
                                v.playId = this.idCounter;
                                this.idCounter++;
                                return v;
                            }));
                            this.playList = [...playlist];
                            break;
                        }
                    }
                }
                break;
            case 'update':
                if (playId && params) {
                    for (let i = 0; i < playlist.length; i++) {
                        if (playlist[i].playId === playId) {
                            const newData = Object.assign({}, playlist[i], params);
                            playlist.splice(i, 1, newData);
                            this.playList = [...playlist];
                            break;
                        }
                    }
                }
                break;
            case 'reset':
                this._resetPlayList();
                break;
        }
    }
    /**
     * reset play list
     *
     * @return {void}
     */
    _resetPlayList() {
        this.playList = new Array(0);
        this._setPlayIndex(0);
    }
    /**
     * cut audio
     * @param {boolean} autocut
     *
     * @return {void}
     */
    _cut(autocut) {
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
                return this._commonLock('cutpick', () => {
                    const src = this.playList[this.playIndex].src;
                    if (autocut) {
                        if (this.audioH5 && src) {
                            // resolve the IOS auto play problem
                            this.audioH5.src = src;
                            this.audioH5.load();
                        }
                    }
                    else {
                        this.unload(true);
                        const config = Object.assign(this.config, { src });
                        this._createAudio(config);
                        this._registerEvent(config);
                    }
                    return this.play();
                });
            }
        }
    }
    /**
     * generate received event callback queue
     * @param {string} event TonEvent
     * @param {Function} cb TentireEventCallback
     * @param {string} name the special name for same events
     *
     * @return {boolean} whether or not successful bind event callback
     */
    _onEvent(event, cb, name) {
        if (!isNaN(supportEvents[event])) {
            try {
                if (!this[event])
                    this[event] = Object.create(null)(this[event])[name || cb.name || `anonymous-${new Date().getTime()}`] = cb;
                return true;
            }
            catch (error) {
                this._logErr(error);
            }
        }
        return false;
    }
    /**
     * delete received event callback queue
     * @param {string} event TonEvent
     * @param {Function} cb TentireEventCallback
     * @param {string} name the special name for same events
     *
     * @return {boolean} whether or not successful unbind event callback
     */
    _offEvent(event, cb, name) {
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
    }
    /**
     * fire event callback queue
     * @param {TeventParameter} e
     * @param {TonEvent} eventQueue
     *
     * @return {void}
     */
    _fireEventQueue(e, eventQueue) {
        if (this[eventQueue]) {
            for (let k in this[eventQueue]) {
                this[eventQueue][k] && this[eventQueue][k](e);
            }
        }
    }
    /**
     * register Audio Event
     * @param {Iconfig} config
     */
    _registerEvent(config) {
        const curry = (cb, eventName) => (e) => {
            if (!this._triggerEventController(eventName))
                return;
            return cb && cb(e);
        };
        /* bindind received event callbacks */
        const configKeys = Object.keys(config);
        configKeys.forEach(v => {
            if (v.indexOf('on') === 0) {
                const cb = config[v];
                if (cb && this._checkType(cb, 'function', true)) {
                    const funcName = `EASE_AUDIO_${v.toUpperCase()}_INITIAL_CALLBACK`;
                    this._onEvent(v, cb, funcName);
                }
            }
        });
        this.eventMethods = {
            // loading state
            loadstart: e => {
                if (this.audioH5 && this.audioH5.src === defaultSrc)
                    return;
                this._setPlayState(playStateSet.loading);
                this._fireEventQueue(e, 'onload');
            },
            seeking: e => {
                if (this.audioH5 && this.audioH5.src !== defaultSrc && this.playState !== playStateSet.paused)
                    this._setPlayState(playStateSet.loading);
                this._fireEventQueue(e, 'onseeking');
            },
            // loaded state
            canplaythrough: e => {
                if (this.audioH5 && this.audioH5.src === defaultSrc)
                    return;
                this.playState === playStateSet.loading && this._setPlayState(playStateSet.loaded);
                this._fireEventQueue(e, 'oncanplaythrough');
            },
            // playing state
            playing: e => {
                this._setPlayState(playStateSet.playing);
                this._fireEventQueue(e, 'onplay');
                // if playing then set the isTriggerEnd to false
                if (this.isTriggerEnd)
                    this.isTriggerEnd = false;
            },
            // paused state
            pause: e => {
                // resolve ios cannot trigger onend but onpause event
                if (!this.isTriggerEnd) {
                    this._setPlayState(playStateSet.paused);
                    this._fireEventQueue(e, 'onpause');
                }
            },
            // ended state
            ended: e => {
                if (this.isTriggerEnd) {
                    this.isTriggerEnd = false;
                }
                else {
                    this.isTriggerEnd = true;
                    this._setPlayState(playStateSet.ended);
                    this._fireEventQueue(e, 'onend');
                    return this._autocut();
                }
            },
            // finish state
            // The Audio not really exist this event, just for intergration
            finish: e => {
                this._setPlayState(playStateSet.finished);
                this._fireEventQueue(e, 'onfinish');
            },
            // loaderror state
            error: (e) => {
                this._setPlayState(playStateSet.loaderror);
                this._fireEventQueue(e, 'onloaderror');
            },
            // playerror state
            // The Audio not really exist this event, just for intergration
            playerror: (e) => {
                this._setPlayState(playStateSet.playerror);
                this._fireEventQueue(e, 'onplayerror');
            },
            // others
            progress: e => {
                const ranges = e.target.buffered;
                const total = (e.total || 1);
                let buffered = 0;
                let loaded = (e.loaded || 0);
                let progress = loaded / total;
                if (ranges && ranges.length) {
                    for (let i = 0, j = ranges.length; i < j; i++) {
                        this.buffered && this.buffered.push({
                            'start': ranges.start(i) * 1000,
                            'end': ranges.end(i) * 1000
                        });
                    }
                    buffered = (ranges.end(0) - ranges.start(0)) * 1000;
                    loaded = Math.min(1, buffered / (e.target.duration * 1000));
                    progress = loaded / total;
                }
                this._fireEventQueue(Object.assign(e, { progress }), 'onprogress');
            },
            durationchange: e => { },
            loadedmetadata: e => {
                this.metaDataLoaded = true;
                this.seekValue && this.seek(this.seekValue);
            },
            loadeddata: e => { },
            timeupdate: e => {
                // playState is loading but actually is playing
                if (this.playState === playStateSet.loading) {
                    this._logInfo("timeupdate's playing");
                    this._setPlayState(playStateSet.playing);
                    this._fireEventQueue(e, 'onplay');
                }
                // Depending on currentTime and duration to mimic end event
                const isEnd = this.audioH5 && this.audioH5.duration && +this.audioH5.currentTime >= +this.audioH5.duration;
                if (isEnd) {
                    if (this.isTriggerEnd) {
                        this.isTriggerEnd = false;
                    }
                    else {
                        this._logInfo("timeupdate's ended");
                        this.isTriggerEnd = true;
                        this._setPlayState(playStateSet.ended);
                        this._fireEventQueue(e, 'onend');
                        return this._autocut();
                    }
                }
                this._fireEventQueue(e, 'ontimeupdate');
            },
            canplay: e => this._fireEventQueue(e, 'oncanplay'),
            seeked: e => this._fireEventQueue(e, 'onseeked'),
            volumechange: e => this._fireEventQueue(e, 'onvolume'),
            ratechange: e => this._fireEventQueue(e, 'onrate'),
            cut: e => this._fireEventQueue(e, 'oncut'),
            pick: e => this._fireEventQueue(e, 'onpick'),
            play: e => { },
            abort: e => { },
            suspend: e => { }
        };
        for (let k in this.eventMethods) {
            // filter useless events
            if (uselessEvents[k] !== 'undefined')
                continue;
            // bind controller scope for every each event
            this.eventMethods[k] = curry(this.eventMethods[k], k);
            this._bindEvent(this.eventMethods[k], k);
        }
        this._blockEvent({ block: false });
    }
    /**
     * unregister Audio Event
     *
     * @return {void}
     */
    _unregisterEvent() {
        if (this._checkInit()) {
            for (let k in this.eventMethods) {
                if (uselessEvents[k] !== 'undefined')
                    continue;
                this._removeEvent(this.eventMethods[k], k);
            }
        }
    }
    /**
     * not remove but block event callback
     * @param {IblockEvent} params
     *
     * @return {void}
     */
    _blockEvent(params) {
        if (this._checkInit()) {
            const { event, block } = params;
            if (event && this._checkType(event, 'string')) {
                this.eventController[event] = !block;
            }
            else {
                for (let k in this.eventMethods) {
                    this.eventController[k] = !block;
                }
            }
        }
    }
    /**
     * whether or not trigger event callback
     * @param {TAudioEvent} event
     *
     * @return {boolean} the event whether or not be blocked
     */
    _triggerEventController(event) {
        if (this.eventController && !this.eventController[event])
            return false;
        this._log(`trigger ${event} event`);
        return true;
    }
    /**
     * bind event
     * @param {TentireEventCallback} cb
     * @param {TAudioEvent} event
     *
     * @return {void}
     */
    _bindEvent(cb, event) {
        if (!this._checkType(event, 'string'))
            return this._logErr(`bindEvent - bind event name is not string`);
        this._checkType(cb, 'function', true) && addListener(event, cb, this.audioH5);
    }
    /**
     * remove event
     * @param {TentireEventCallback} cb
     * @param {TAudioEvent} event
     *
     * @return {void}
     */
    _removeEvent(cb, event) {
        if (!this._checkType(event, 'string'))
            return this._logErr(`removeEvent - unbind event name is not string`);
        this._checkType(cb, 'function', true) && removeListener(event, cb, this.audioH5);
    }
    /**
     * playLock queue handle
     * @param {() => any} fn
     *
     * @return {any}
     */
    _playLockQueue(fn) {
        if (this.playLocker) {
            return this.lockQueue.push(fn);
        }
        return fn && fn();
    }
    /**
     * trigger lockqueue general method
     * @param tag
     * @param fn
     *
     * @return {void}
     */
    _commonLock(tag, fn) {
        if (this.playLocker) {
            const lockTags = this.lockTags[tag];
            typeof lockTags === 'number' && (this.lockTags[tag] = lockTags + 1);
        }
        this._playLockQueue((id => () => {
            if (id !== this.lockTags[tag])
                return;
            fn && fn();
        })(this.lockTags[tag]));
    }
    /**
     * handle onend auto cut sound
     *
     * @return {Promise<any> | any}
     */
    _autocut() {
        return __awaiter(this, void 0, void 0, function* () {
            let autocut = this.config.autocut;
            this._setPlayIndex();
            const nextId = this._setPlayId(false);
            if (this._checkType(autocut, 'function')) {
                try {
                    autocut = yield autocut(this.playId, nextId);
                }
                catch (err) {
                    this._logErr(`autocut occur error, it's ${err}`);
                    // withdrawl set playIndex operation
                    this._setPlayIndex(this.prevPlayIndex);
                    return this.eventMethods.finish(this.playId);
                }
            }
            return new Promise((resolve, reject) => {
                this._checkType(autocut, 'boolean') ? resolve(autocut) : reject(autocut);
            }).then(isCut => {
                if (isCut)
                    return this._cut(true);
                this._setPlayIndex(this.prevPlayIndex);
                return this.eventMethods.finish(this.playId);
            }).catch(err => {
                this._logWarn(`The autocut property type should be boolean or function return boolean, now the result ${err} type was ${typeof err}`);
                this._setPlayIndex(this.prevPlayIndex);
                return this.eventMethods.finish(this.playId);
            });
        });
    }
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
    _checkType(element, type, logErr) {
        if (typeof type !== 'string') {
            this._logWarn('checkType - The {type} parameter must be string');
            return false;
        }
        if (getType(element) !== type) {
            logErr && this._logErr(`Your parameter(${element}) type is ${getType(element)}, please pass the ${type} type`);
            return false;
        }
        return true;
    }
    /**
     * check whether or not init Audio
     *
     * @return {boolean}
     */
    _checkInit() {
        if (!this.isInit) {
            this._logWarn("checkInit - The Audio haven't been initiated");
            return false;
        }
        return true;
    }
    /**
     * detail logger
     * @param {string | Object | Array<any>} detail the log message
     *
     * @return {void}
     */
    _log(detail) {
        const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel === logLevelSet['detail'];
        canLog && this.debug && this._logOptimize(detail, 'log');
    }
    /**
     * info logger
     * @param {string | Object | Array<any>} info the log message
     *
     * @return {void}
     */
    _logInfo(info) {
        const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'] && this.logLevel !== logLevelSet['warn'];
        canLog && this.debug && this._logOptimize(info, 'info');
    }
    /**
     * warn logger
     * @param {string | Object | Array<any>} warn the warn log message
     *
     * @return {void}
     */
    _logWarn(warn) {
        const canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'];
        canLog && this.debug && this._logOptimize(warn, 'warn');
    }
    /**
     * error logger
     * @param {string | Object | Array<any>} error the error log message
     *
     * @return {void}
     */
    _logErr(error) {
        const canLog = this.logLevel !== logLevelSet['silent'];
        canLog && this.debug && this._logOptimize(error, 'error');
    }
    /**
     * console logger optimize
     * @param {string | Object | Array<any>} msg the log message
     * @param {string} method the logger method in console Object
     *
     * @return {void}
     */
    _logOptimize(msg, method) {
        const logger = console[method] || console.log;
        const prefix = `[EASE_AUDIO_H5 ${method.toUpperCase()}]:`;
        if ((this._checkType(msg, 'object') || this._checkType(msg, 'array')) && console.table) {
            logger(prefix);
            console.table(msg);
            return;
        }
        logger(prefix, msg);
    }
}
export default AudioH5;
//# sourceMappingURL=audio_h5.js.map