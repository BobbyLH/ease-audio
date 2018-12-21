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
    this.load = this.audio.load
    this.seek = this.audio.seek
    this.volume = this.audio.volume
    this.muted = this.audio.muted
    this.stop = this.audio.stop
    this.unload = this.audio.unload
    this.model = this.audio.model
  }

  _createAudio (config) {
    let audio
    const { usingWebAudio } = config || {}

    try {
      if (usingWebAudio && (window.AudioContext || window.webkitAudioContext)) {
        audio = new AudioCtx(config)
      } else if (window.Audio) {
        audio = new AudioH5(config)
      } else {
        audio = null
      }
    } catch (err) {
      console.error('[EASE_AUDIO ERROR]:', err)
      audio = null
    }

    return audio
  }

  get duration () {
    return this.audio.duration
  }

  get playState () {
    return this.audio.playState
  }

  get playId () {
    return this.audio.playList[this.audio.playIndex].id
  }

  get playList () {
    return this.audio.playList
  }

  get networkState () {
    return this.audio.networkState
  }
}

export default EaseAudio
