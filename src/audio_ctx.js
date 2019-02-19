export class AudioCtx {
  constructor () {
    this.audioCtx = typeof window !== 'undefined' && new (window.AudioContext || window.webkitAudioContext)()
    this.audioDom = typeof window !== 'undefined' && new window.Audio()
    this.audio = this.audioCtx.createMediaElementSource(this.audioDom)
  }

  play () {

  }

  pause () {

  }

  stop () {

  }

  unload () {

  }

  seek () {

  }
}

export default AudioCtx
