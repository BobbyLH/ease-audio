import AudioCtx from './audio_ctx'
import AudioH5 from './audio_h5'

export class EaseAudio {
  constructor (config) {
    this.audio = this._createAudio(config)

    this.init = this.audio.init
    this.play = this.audio.play
    this.pause = this.audio.pause
    this.toggle = this.audio.toggle
    this.cut = this.audio.cut
    this.pick = this.audio.pick
    this.load = this.audio.load
    this.seek = this.audio.seek
    this.volume = this.audio.volume
    this.muted = this.audio.muted
    this.stop = this.audio.stop
    this.unload = this.audio.unload
    this.on = this.audio.on
    this.off = this.audio.off
    this.once = this.audio.once
    this.model = this.audio.model
  }

  get duration () {
    return this.audio.duration
  }

  get playState () {
    return this.audio.playState
  }

  get playId () {
    return this.audio.playId
  }

  get playingData () {
    return this.audio.playList[this.audio.playIndex]
  }

  set playlist (params) {
    this.audio.playlist(params)
  }

  get playlist () {
    return this.audio.playList
  }

  get networkState () {
    return this.audio.networkState
  }

  _createAudio (config) {
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
    }
    const { usingWebAudio } = config || {}

    try {
      if (usingWebAudio && (window.AudioContext || window.webkitAudioContext)) {
        audio = new AudioCtx(config)
      } else if (window.Audio) {
        audio = new AudioH5(config)
      }
    } catch (err) {
      console.error('[EASE_AUDIO ERROR]:', err)
    }

    return audio
  }
}

function initFunc () {
  return console.error('[EASE_AUDIO ERROR]: Initialize failed')
}

export default EaseAudio
