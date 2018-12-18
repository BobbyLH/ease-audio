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

  destory () {

  }

  seek () {

  }

  state () {

  }
}

export default AudioCtx
