import EaseAudio from '../dist/ease-audio'
import 'mocha'
import { expect } from 'chai'

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
      onseek: e => console.log('onseek:', e),
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
      expect(state).to.match(/(playing|paused)/)
      console.log('playState:', audio.playState)
    }
  })
})