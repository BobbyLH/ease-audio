import EaseAudio from '../../js/src/index'
// import EaseAudio from '../../dist/ease-audio'

const audio = new EaseAudio()
const rootDom = document.getElementById('app')
const initBtn = document.createElement('button')
const loadBtn = document.createElement('button')
const playBtn = document.createElement('button')
const seekBtn = document.createElement('button')
const volumeBtn = document.createElement('button')
const muteBtn = document.createElement('button')
const setPlaylistBtn = document.createElement('button')
const getPlaylistBtn = document.createElement('button')
const cutBtn = document.createElement('button')
const getIdBtn = document.createElement('button')
const stopBtn = document.createElement('button')
const durationBtn = document.createElement('button')
const onBtn = document.createElement('button')
const offBtn = document.createElement('button')
const onceBtn = document.createElement('button')
const pickBtn = document.createElement('button')
const replaceListBtn = document.createElement('button')
const updateListBtn = document.createElement('button')

initBtn.innerText = '初始化'
initBtn.onclick = init
rootDom.appendChild(initBtn)

loadBtn.innerText = '加载'
loadBtn.onclick = load
rootDom.appendChild(loadBtn)

playBtn.innerText = '播放'
playBtn.onclick = playMusic
rootDom.appendChild(playBtn)

seekBtn.innerText = '寻址'
seekBtn.onclick = seek
rootDom.appendChild(seekBtn)

volumeBtn.innerText = '音量'
volumeBtn.onclick = volume
rootDom.appendChild(volumeBtn)

muteBtn.innerText = '静音'
muteBtn.onclick = muted
rootDom.appendChild(muteBtn)

setPlaylistBtn.innerText = '设置播放列表'
setPlaylistBtn.onclick = setPlaylist
rootDom.appendChild(setPlaylistBtn)

getPlaylistBtn.innerText = '获取播放列表'
getPlaylistBtn.onclick = getPlaylist
rootDom.appendChild(getPlaylistBtn)

cutBtn.innerText = '切歌'
cutBtn.onclick = cut
rootDom.appendChild(cutBtn)

getIdBtn.innerText = 'getId'
getIdBtn.onclick = getId
rootDom.appendChild(getIdBtn)

stopBtn.innerText = '停止'
stopBtn.onclick = stop
rootDom.appendChild(stopBtn)

durationBtn.innerText = 'duration'
durationBtn.onclick = duration
rootDom.appendChild(durationBtn)

onBtn.innerText = 'on'
onBtn.onclick = on
rootDom.appendChild(onBtn)

offBtn.innerText = 'off'
offBtn.onclick = off
rootDom.appendChild(offBtn)

onceBtn.innerText = 'once'
onceBtn.onclick = once
rootDom.appendChild(onceBtn)

pickBtn.innerText = 'pick 选歌'
pickBtn.onclick = pick
rootDom.appendChild(pickBtn)

replaceListBtn.innerText = '替换list的某个item'
replaceListBtn.onclick = replace
rootDom.appendChild(replaceListBtn)

updateListBtn.innerText = '更新list的某个item'
updateListBtn.onclick = update
rootDom.appendChild(updateListBtn)

function init () {
  const config = {
    debug: true,
    logLevel: 'info',
    // autoplay: true,
    // src: 'http://audio.xmcdn.com/group29/M01/AA/71/wKgJXVrpaoXApbrYABINQqa4hlE219.m4a',
    onplay: e => console.log('onplay:', e),
    onpause: e => console.log('onpause:', e),
    onstop: id => console.log('onstop', id),
    onseek: e => console.log('onseek:', e),
    onseeking: e => console.log('onseeking:', e),
    onprogress: e => console.log('onprogress:', e),
    playlist: [
      {src: 'http://audio.xmcdn.com/group29/M01/AA/71/wKgJXVrpaoXApbrYABINQqa4hlE219.m4a'},
      'http://audio.xmcdn.com/group36/M0A/28/2C/wKgJUloyLSPzMzrUAA_CiRLIGrE559.m4a',
      {src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a'}
    ]
  }
  console.log('res init: ', audio.init(config), audio)
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
  audio.mute(true)
}

function setPlaylist () {
  audio.playlist = {
    action: 'add',
    list: [
      {src: 'http://audio.xmcdn.com/group36/M0A/28/2C/wKgJUloyLSPzMzrUAA_CiRLIGrE559.m4a'},
      {src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a'}
    ]
  }
  console.log('playlist: ', audio.playlist)
}

function getPlaylist () {
  console.log('getPlaylistBtn', audio.playlist)
}

function cut () {
  const res = audio.cut()
  console.log('cut res', res)
  if (!res) console.log('playlist', audio.playList)
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

function on () {
  audio.on('play', () => console.log(444, 'rebind onplay'))
}

function off () {
  audio.off('play')
}

function once () {
  audio.once('play', () => console.log(555, 'once fire onplay'))
}

function pick () {
  audio.pick(1002)
}

function replace () {
  console.log('before', audio.playlist)
  setTimeout(() => {
    audio.playlist = {
      action: 'replace',
      list: [{src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a', tag: 'this is new item'}],
      playId: 1001
    }
    console.log('after', audio.playlist)
  }, 2000)
}

function update () {
  console.log('before', audio.playlist)
  setTimeout(() => {
    audio.playlist = {
      action: 'update',
      params: {src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a', tag: 'this is update item'},
      playId: 1001
    }
    console.log('after', audio.playlist)
  }, 2000)
}
