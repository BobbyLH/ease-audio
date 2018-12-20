export class AudioCtx {
  constructor () {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.audioDom = new window.Audio()
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
