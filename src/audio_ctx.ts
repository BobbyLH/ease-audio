import { Iconfig } from './ease-audio.d'

export class AudioCtx {
  constructor (config: Iconfig | void) {
    // this.audioCtx = typeof window !== 'undefined' && new (window.AudioContext || window.webkitAudioContext)()
    // this.audioDom = typeof window !== 'undefined' && new window.Audio()
    // this.audio = this.audioCtx.createMediaElementSource(this.audioDom)
  }

  init () {}
  play () {}
  pause () {}
  toggle () {}
  load () {}
  seek () {}
  volume () {}
  stop () {}
  unload () {}
  on () {}
  off () {}
  once () {}
  cut () {}
  pick () {}
  rate () {}
  model () {}
  mute () {}
  playlist () {}
}

export default AudioCtx
