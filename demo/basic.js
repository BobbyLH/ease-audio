const config = {
  debug: true,
  src: 'http://audio.xmcdn.com/group29/M01/AA/71/wKgJXVrpaoXApbrYABINQqa4hlE219.m4a',
  onplay: e => console.log('onplay:', e),
  onpause: e => console.log('onpause:', e)
}
const HMAudio = window.HMAudio.default

var audio = new HMAudio(config)
// var isPlay = false

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
  audio.seek(50)
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