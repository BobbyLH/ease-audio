import AudioCtx from './audio_ctx';
import AudioH5 from './audio_h5';
export class EaseAudio {
    constructor(config) {
        this.audio = this._createAudio(config);
        this.init = this.audio.init;
        this.play = this.audio.play;
        this.pause = this.audio.pause;
        this.toggle = this.audio.toggle;
        this.cut = this.audio.cut;
        this.pick = this.audio.pick;
        this.load = this.audio.load;
        this.seek = this.audio.seek;
        this.rate = this.audio.rate;
        this.volume = this.audio.volume;
        this.mute = this.audio.mute;
        this.stop = () => this.audio.stop();
        this.unload = () => this.audio.unload();
        this.on = this.audio.on;
        this.off = this.audio.off;
        this.once = this.audio.once;
        this.model = this.audio.model;
    }
    get duration() {
        return this.audio ? this.audio.duration : 0;
    }
    get playState() {
        return this.audio ? this.audio.playstate : null;
    }
    get playId() {
        return this.audio ? this.audio.playid : 1000;
    }
    get playingData() {
        let playingData = {};
        if (this.audio) {
            const playId = this.audio.playid;
            const playList = this.audio.playlists;
            const len = playList.length;
            for (let i = 0; i < len; i++) {
                if (+playId === +playList[i].playId) {
                    playingData = playList[i];
                    break;
                }
            }
        }
        return playingData;
    }
    set playlist(params) {
        this.audio && this.audio.playlist && this.audio.playlist(params);
    }
    get playlist() {
        return this.audio ? this.audio.playlists : [];
    }
    get networkState() {
        return this.audio ? this.audio.networkState : 0;
    }
    /**
     * create audio
     * @param {Iconfig} config
     *
     * @return {AudioH5 | AudioCtx | IAudio}
     */
    _createAudio(config) {
        const audio = {
            init: initFunc,
            play: initFunc,
            pause: initFunc,
            toggle: initFunc,
            load: initFunc,
            seek: initFunc,
            volume: initFunc,
            mute: initFunc,
            stop: initFunc,
            unload: initFunc,
            on: initFunc,
            off: initFunc,
            once: initFunc,
            model: initFunc,
            cut: initFunc,
            pick: initFunc,
            rate: initFunc,
            playlist: initFunc
        };
        try {
            if (typeof window !== 'undefined') {
                const usingWebAudio = config.usingWebAudio;
                if (usingWebAudio && AudioContext) {
                    return new AudioCtx(config);
                }
                else if (Audio) {
                    return new AudioH5(config);
                }
            }
        }
        catch (err) {
            console.error('[EASE_AUDIO CREATE AUDIO ERROR]:', err);
        }
        return audio;
    }
}
/**
 * initial default function
 * If trigger this function means that initialize failed
 * @return {void}
 */
function initFunc() {
    return console.error('[EASE_AUDIO ERROR]: Initialize failed');
}
export default EaseAudio;
//# sourceMappingURL=Audio.js.map