const EaseAudio = window.EaseAudio.default

var audio = new EaseAudio()

function init () {
  const config = {
    debug: true,
    logLevel: 'detail',
    playlist: [
      {src: 'http://audio.xmcdn.com/group29/M01/AA/71/wKgJXVrpaoXApbrYABINQqa4hlE219.m4a'},
      {src: 'http://audio.xmcdn.com/group36/M0A/28/2C/wKgJUloyLSPzMzrUAA_CiRLIGrE559.m4a'},
      {src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a'}
    ],
    onplay: e => console.log('onplay:', e),
    onpause: e => console.log('onpause:', e),
    onstop: id => console.log('onstop', id),
    onseek: e => console.log('onseek:', e),
    onprogress: e => console.log('onprogress:', e)
  }
  audio.init(config)
  console.log(audio, 'audio was inited')
}

function load () {
  audio.load()
}

function playMusic () {
  // if (isPlay) {
  //   isPlay = false
  //   audio.pause()
  // } else {
  //   isPlay = true
  //   audio.play()
  // }
  audio.toggle()
  console.log('playState:', audio.playState)
}

function seek () {
  audio.seek(200)
}

function volume () {
  audio.volume(0.4)
}

function muted () {
  audio.muted(true)
}

function cut () {
  audio.cut({
    src: ['http://audio.xmcdn.com/group36/M0A/28/2C/wKgJUloyLSPzMzrUAA_CiRLIGrE559.m4a']
  })
}

function getId () {
  console.log('playId:', audio.playId)
}

function stop () {
  audio.stop()
}

function duration () {
  console.log(audio.duration)
}