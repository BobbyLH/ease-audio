"use strict";
exports.__esModule = true;
var AudioCtx = /** @class */ (function () {
    function AudioCtx(config) {
        // this.audioCtx = typeof window !== 'undefined' && new (window.AudioContext || window.webkitAudioContext)()
        // this.audioDom = typeof window !== 'undefined' && new window.Audio()
        // this.audio = this.audioCtx.createMediaElementSource(this.audioDom)
    }
    AudioCtx.prototype.init = function () { };
    AudioCtx.prototype.play = function () { };
    AudioCtx.prototype.pause = function () { };
    AudioCtx.prototype.toggle = function () { };
    AudioCtx.prototype.load = function () { };
    AudioCtx.prototype.seek = function () { };
    AudioCtx.prototype.volume = function () { };
    AudioCtx.prototype.stop = function () { };
    AudioCtx.prototype.unload = function () { };
    AudioCtx.prototype.on = function () { };
    AudioCtx.prototype.off = function () { };
    AudioCtx.prototype.once = function () { };
    AudioCtx.prototype.cut = function () { };
    AudioCtx.prototype.pick = function () { };
    AudioCtx.prototype.rate = function () { };
    AudioCtx.prototype.model = function () { };
    AudioCtx.prototype.mute = function () { };
    AudioCtx.prototype.playlist = function () { };
    return AudioCtx;
}());
exports.AudioCtx = AudioCtx;
exports["default"] = AudioCtx;
