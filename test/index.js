import EaseAudio from '../dist/ease-audio'
import 'mocha'
import { expect } from 'chai'

let reserveList
const audio = new EaseAudio()
describe("EaseAudio's test module", function () {
  it("new Audio() - audio's property test", function () {
    expect(audio).to.be.an('object')
    expect(audio).to.have.property('audio').to.be.an('object')
    expect(audio).to.have.property('init').to.be.a('function')
    expect(audio).to.have.property('play').to.be.a('function')
    expect(audio).to.have.property('pause').to.be.a('function')
    expect(audio).to.have.property('toggle').to.be.a('function')
    expect(audio).to.have.property('load').to.be.a('function')
    expect(audio).to.have.property('seek').to.be.a('function')
    expect(audio).to.have.property('volume').to.be.a('function')
    expect(audio).to.have.property('stop').to.be.a('function')
    expect(audio).to.have.property('unload').to.be.a('function')
    expect(audio).to.have.property('on').to.be.a('function')
    expect(audio).to.have.property('off').to.be.a('function')
    expect(audio).to.have.property('once').to.be.a('function')
    expect(audio).to.have.property('cut').to.be.a('function')
    expect(audio).to.have.property('pick').to.be.a('function')
    expect(audio).to.have.property('rate').to.be.a('function')
    expect(audio).to.have.property('model').to.be.a('function')
    expect(audio).to.have.property('mute').to.be.a('function')
    expect(audio).to.have.property('playlist').to.be.an('array')
    expect(audio).to.have.property('duration').to.be.equal(0)
    expect(audio).to.have.property('playState').to.be.equal(null)
    expect(audio).to.have.property('playId').to.be.equal(1000)
    expect(audio).to.have.property('playingData').to.be.an('object')
    expect(audio).to.have.property('networkState').to.be.equal(0)
  })
  it('audio - init', function () {
    const config = {
      initIndex: 1,
      debug: true,
      logLevel: 'info',
      onplay: e => console.log('onplay:', e),
      onpause: e => console.log('onpause:', e),
      onstop: id => console.log('onstop', id),
      onseeking: e => console.log('onseeking:', e),
      onprogress: e => console.log('onprogress:', e),
      playlist: [
        {src: 'http://audio.xmcdn.com/group29/M01/AA/71/wKgJXVrpaoXApbrYABINQqa4hlE219.m4a'},
        'http://audio.xmcdn.com/group36/M0A/28/2C/wKgJUloyLSPzMzrUAA_CiRLIGrE559.m4a',
        {src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a'}
      ]
    }
    const initRes = audio.init(config)
    expect(initRes).to.be.an('object')
    expect(initRes).to.have.property('playlist').to.be.an('array').with.lengthOf(3)
    expect(initRes).to.have.property('playingData').to.be.an('object')
    expect(initRes).to.have.property('playId').to.be.equal(1001)
  })
  it('audio - load', function () {
    const loadRes = audio.load()
    expect(loadRes).to.be.a('number')
  })
  it('audio - on', function () {
    const onRes = audio.on('play', onPlay)
    expect(onRes).to.be.a('boolean')
  })
  it('audio - off', function () {
    const offRes = audio.off('play', onPlay)
    audio.off('pause')
    expect(offRes).to.be.a('boolean')
  })
  it('audio - once', function () {
    const onceRes = audio.once('pause', function (e) {
      console.log('onPuase event bind by once', e)
    })
    expect(onceRes).to.be.a('boolean')
  })
  it('audio - playlist - add', function () {
    audio.playlist = {
      action: 'add',
      list: [
        {src: 'http://audio.xmcdn.com/group36/M0A/28/2C/wKgJUloyLSPzMzrUAA_CiRLIGrE559.m4a', tag: 'this is old item', id: 5},
        {src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a'}
      ]
    }
    const list = audio.playlist
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(5)
    expect(list[3]).to.have.property('id').to.be.equal(5)
    expect(list[3]).to.have.property('tag').to.be.equal('this is old item')
  })
  it('audio - playlist - update', function () {
    audio.playlist = {
      action: 'update',
      params: {id: 12},
      playId: 1003
    }
    const list = audio.playlist
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(5)
    expect(list[3]).to.have.property('id').to.be.equal(12)
    expect(list[3]).to.have.property('tag').to.be.equal('this is old item')
  })
  it('audio - playlist - replace', function () {
    audio.playlist = {
      action: 'replace',
      list: [{src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a', tag: 'this is new item', newId: 6}],
      playId: 1003
    }
    const list = audio.playlist
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(5)
    expect(list[3]).to.not.have.property('id')
    expect(list[3]).to.have.property('playId').to.be.equal(1005)
    expect(list[3]).to.have.property('newId').to.be.equal(6)
    expect(list[3]).to.have.property('tag').to.be.equal('this is new item')
  })
  it('audio - playlist - insert', function () {
    audio.playlist = {
      action: 'insert',
      list: [{src: 'http://audio.xmcdn.com/group21/M0B/2E/08/wKgJLVrpYaLCVIMPABFX6j5WjMk013.m4a', tag: 'this is insert item'}],
      playId: 1002
    }
    const list = audio.playlist
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(6)
    expect(list[2]).to.have.property('playId').to.be.equal(1006)
    expect(list[2]).to.have.property('tag').to.be.equal('this is insert item')
  })
  it('audio - playlist - delete', function () {
    audio.playlist = {
      action: 'delete',
      playId: 1006
    }
    const list = audio.playlist
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(5)
    expect(list[2]).to.have.property('playId').to.be.equal(1002)
    reserveList = audio.playlist
  })
  it('audio - playlist - reset', function () {
    audio.playlist = {
      action: 'reset'
    }
    const list = audio.playlist
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(0)
  })
  it('audio - playlist - add', function () {
    audio.playlist = {
      action: 'add',
      list: reserveList
    }
    const list = audio.playlist
    const playId = list[0].playId
    expect(list).to.be.an('array')
    expect(list).to.with.lengthOf(5)
    expect(playId).to.equal(1007)
  })
  it('audio - volume', function () {
    const volumeRes1 = audio.volume()
    audio.volume(0.5)
    const volumeRes2 = audio.volume()
    audio.volume(1)
    const volumeRes3 = audio.volume()
    expect(volumeRes1).to.be.equal(1)
    expect(volumeRes2).to.be.equal(0.5)
    expect(volumeRes3).to.be.equal(1)
  })
  it('audio - rate', function () {
    const rateRes1 = audio.rate()
    audio.rate(2)
    const rateRes2 = audio.rate()
    audio.rate(1)
    const rateRes3 = audio.rate()
    expect(rateRes1).to.be.equal(1)
    expect(rateRes2).to.be.equal(2)
    expect(rateRes3).to.be.equal(1)
  })
  it('audio - mute', function () {
    const muteRes1 = audio.mute()
    audio.mute(true)
    const muteRes2 = audio.mute()
    audio.mute(false)
    const muteRes3 = audio.mute()
    expect(muteRes1).to.be.false
    expect(muteRes2).to.be.true
    expect(muteRes3).to.be.false
  })
  it('audio - model', function () {
    const modelRes1 = audio.model()
    audio.model('list-loop')
    const modelRes2 = audio.model()
    audio.model('singles-loop') // set faild cause this model is not support
    const modelRes3 = audio.model()
    expect(modelRes1).to.be.equal('list-once')
    expect(modelRes2).to.be.equal('list-loop')
    expect(modelRes3).to.be.equal('list-loop')
  })
  it('audio - toggle', function () {
    const rootDom = document.body
    const playBtn = document.createElement('button')
    playBtn.innerText = 'toggle (play/pause)'
    playBtn.onclick = toggle
    rootDom.appendChild(playBtn)

    function toggle () {
      const toggleRes = audio.toggle()
      const state = audio.playState
      expect(toggleRes).to.be.a('number')
      expect(state).to.be.a('string')
      expect(state).to.match(/(loaded|playing|paused)/)
      console.log('playState:', audio.playState)
    }
  })
})

function onPlay (e) {
  console.log('[test module]: bind event by on')
}
