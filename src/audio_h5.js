import { addListener, removeListener, getType, isIE } from '../utils'

const playStateSet = [
  'loading',
  'playing',
  'paused',
  'stoped',
  'ended',
  'loaderror',
  'playerror'
]

const playModelSet = ['list-once', 'list-random', 'list-loop', 'single-once', 'single-loop']

const logLevel = ['detail', 'warn', 'error']

const defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'

export class AudioH5 {
  constructor (config) {
    this.isInit = false

    this.init = this.init.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.toggle = this.toggle.bind(this)
    this.cut = this.cut.bind(this)
    this.load = this.load.bind(this)
    this.seek = this.seek.bind(this)
    this.rate = this.rate.bind(this)
    this.volume = this.volume.bind(this)
    this.muted = this.muted.bind(this)
    this.stop = this.stop.bind(this)
    this.unload = this.unload.bind(this)
    this.model = this.model.bind(this)

    this.init(config)
  }

  get duration () {
    return this.audioH5.duration
  }

  set setAudioConfig ({prop, value}) {
    if (this.audioH5[prop] && !this._checkType(this.audioH5[prop], 'function')) {
      this.audioH5[prop] = value
      this._updateConfig({prop: value})
    }
  }

  init (config) {
    if (!this.isInit && config && this._checkType(config, 'object', true) && JSON.stringify(config) !== '{}') {
      this._initial(config)
      this._registerEvent(config)
    }
  }

  play () {
    if (this._checkInit()) {
      this._blockEvent(false)
      this.audioH5.play()
      return this.playList[this.playIndex] && this.playList[this.playIndex].id
    }
  }

  pause () {
    if (this._checkInit()) {
      this.audioH5.pause()
      return this.playList[this.playIndex] && this.playList[this.playIndex].id
    }
  }

  toggle () {
    if (this._checkInit() && this.playState !== 'stoped' && this.playState !== 'ended' && this.playState !== 'loaderror' && this.playState !== 'playerror') {
      this.playState === null || this.playState === 'paused' ? this.play() : this.pause()

      return this.playList[this.playIndex] && this.playList[this.playIndex].id
    }
  }

  cut (params) {
    if (this._checkType(params, 'object', true)) this._updateConfig(params)
    this._cut({src: params && params.src})

    return this.playList[this.playIndex] && this.playList[this.playIndex].id
  }

  load () {
    if (this._checkInit()) {
      this.audioH5.load()
      return this.playList[this.playIndex] && this.playList[this.playIndex].id
    }
  }

  seek (val) {
    if (this._checkInit()) {
      if (this._checkType(val, 'number', true)) {
        // IE cannot set currentTime when the metaData is loading
        if (isIE && !this.metaDataLoaded) {
          this.seekValue = val
          return
        }

        const duration = this.audioH5.duration
        if (val > duration) val = duration
        if (val < 0) val = 0
        this.seekValue = null
        this.audioH5.currentTime = val
      } else {
        return this.audioH5.currentTime
      }
    }
  }

  rate (val) {
    if (this._checkInit()) {
      if (this._checkType(val, 'number', true)) {
        if (val > 2) val = 2
        if (val < 0.5) val = 0.5
        this.audioH5.playbackRate = val
        this._updateConfig({rate: val})
      } else {
        return this.audioH5.playbackRate
      }
    }
  }

  volume (val) {
    if (this._checkInit()) {
      if (this._checkType(val, 'number', true)) {
        if (val > 1) val = 1
        if (val < 0) val = 0
        this.audioH5.muted = false
        this.audioH5.volume = val
        this._updateConfig({volume: val})
      } else {
        return this.audioH5.volume
      }
    }
  }

  muted (bool) {
    if (this._checkInit() && this._checkType(bool, 'boolean')) {
      this.audioH5.muted = bool
      this._updateConfig({muted: bool})

      return this.playList[this.playIndex] && this.playList[this.playIndex].id
    }
  }

  stop () {
    if (this._checkInit() && this.playState !== playStateSet[3]) {
      this._blockEvent(true)
      this.audioH5.currentTime = 0
      this.audioH5.pause()

      const id = this.playList[this.playIndex] && this.playList[this.playIndex].id
      this._setPlayState(playStateSet[3])
      this.onStop && this.onStop(id)

      return id
    }
  }

  unload () {
    this.stop()
    this._unregisterEvent()
    this.audioH5.src = defaultSrc
    this.audioH5 = null
    this.isInit = false
  }

  // set play model
  model (modelIndex) {
    if (this._checkInit()) {
      if (this._checkType(modelIndex, 'number', true)) {
        // model contain: list-once(0), list-random(1), list-loop(2), single-once(3), single-loop(4)
        this.playModel = playModelSet[modelIndex] || this.playModel
      } else {
        return this.playModel
      }
    }
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  _initial (config) {
    this.config = config // preserve initial config
    this.playState = null
    this.debug = config.debug || false
    this.logLevel = config.logLevel || logLevel[2]
    this.playId = 1000
    this.playModel = playModelSet[(config.playModel && this._checkType(config.playModel, 'number') && config.playModel) || (config.loop && 3) || 0]
    this.playIndex = 0
    this.playList = new Array(0)
    this.buffered = new Array(0)
    this.eventController = new Array(0)
    this.eventMethods = {}

    // create Audio Object
    this._createAudio(config)
  }

  _createAudio (config) {
    this._updatePlayList({type: 'add', list: [...this._srcAssem(config.src)]})

    this.audioH5 = new window.Audio()
    this.audioH5.autoplay = config.autoplay || false
    this.audioH5.loop = config.loop || false
    this.audioH5.src = this.playList[this.playIndex].src
    this.audioH5.preload = config.preload || false
    this.audioH5.volume = config.volume || config.volume === 0 ? 0 : 1
    this.audioH5.muted = config.muted || false
    this.audioH5.playbackRate = config.rate || config.playbackRate || 1
    this.audioH5.currentTime = config.seek || config.currentTime || 0
    this.audioH5.controls = false

    this.isInit = true
  }

  _srcAssem (srcs) {
    const srcArr = srcs
    ? this._checkType(srcs, 'array', true)
      ? [...srcs.map(v => {
        const data = {id: this.playId, src: v}
        this.playId++
        return data
      })]
      : [...[srcs].map(v => {
        const data = {id: this.playId, src: v}
        this.playId++
        return data
      })]
    : [...[defaultSrc].map(v => {
      const data = {id: this.playId, src: v}
      this.playId++
      return data
    })]

    return srcArr
  }

  _updateConfig (params) {
    this.config = {...this.config, ...params}
  }

  // set play state
  _setPlayState (state) {
    if (this._checkType(state, 'string') && this.playState !== state) {
      const readyState = this.audioH5.readyState
      const paused = this.audioH5.paused
      const ended = this.audioH5.ended
      const seeking = this.audioH5.seeking

      // filter impossible state
      switch (state) {
        case playStateSet[0]:
          // loading
          if (paused || ended || readyState === 4) return false
          break
        case playStateSet[1]:
          if (paused || ended || seeking || readyState !== 4) return false
          break
        case playStateSet[2]:
          if (ended) return false
          break
      }

      this._log(`setPlayState - ${state}`)
      this.playState = state
      return this.playState
    }
  }

  // set play index
  _setPlayIndex (index) {
    const playModel = this.playModel
    const maxIndex = this.playList.length - 1

    if (index === 0) {
      this.playIndex = 0
      return
    }

    switch (playModel) {
      case 'list-once':
        this.playIndex = index || (maxIndex >= this.playIndex ? ++this.playIndex : this.playIndex)
        break
      case 'list-random':
        this.playIndex = index || Math.round(Math.random() * maxIndex)
        break
      case 'list-loop':
        this.playIndex = index || (maxIndex > this.playIndex ? ++this.playIndex : 0)
        break
      case 'single-once':
        this.playIndex = index || this.playIndex
        break
      case 'single-loop':
        this.playIndex = index || this.playIndex
        break
      default:
        this.playIndex = index || this.playIndex
    }
  }

  // reset play list
  _resetPlayList () {
    this.playList = []
    this._setPlayIndex(0)
  }

  // update play list
  _updatePlayList ({type, list, index}) {
    switch (type) {
      case 'add':
        this.playList = [...this.playList, ...list]
        break
      case 'delete':
        this.playList.splice(index, 1)
        break
      case 'reset':
        this._resetPlayList()
        break
      default:
        this._resetPlayList()
    }
  }

  // cut audio
  _cut ({src, autoCut}) {
    // can't cut audio if the playModel is single-once
    if (this._checkInit() && this.playModel !== 'single-once') {
      this.metaDataLoaded = false
      this.seekValue = null
      this._setPlayIndex(src && this.playList.length)
      if (!src && !this.playList[this.playIndex]) return this._setPlayState(playStateSet[4])
      const nextSrc = src || this.playList[this.playIndex].src

      if (autoCut) {
        // resolve the IOS auto play problem
        this.stop()
        this.audioH5.src = nextSrc
        this.play()
      } else {
        this.unload()
        const config = {...this.config, src: nextSrc}
        this._createAudio(config)
        this._registerEvent(config)
        this.play()
      }

      return this._setPlayState(playStateSet[1])
    }

    return this._setPlayState(playStateSet[4])
  }

  /* expose binding events */
  _onplay (cb) {
    this.onPlay = cb
  }

  _onpause (cb) {
    this.onPause = cb
  }

  _onstop (cb) {
    this.onStop = cb
  }

  _onend (cb) {
    this.onEnd = cb
  }

  _onload (cb) {
    this.onLoad = cb
  }

  _onprogress (cb) {
    this.onProgress = cb
  }

  _onvolume (cb) {
    this.onVolume = cb
  }

  _onseek (cb) {
    this.onSeek = cb
  }

  _onrate (cb) {
    this.onRate = cb
  }

  _ontimeupdate (cb) {
    this.onTimeupdate = cb
  }

  _onloaderror (cb) {
    this.onLoadError = cb
  }

  _onplayerror (cb) {
    this.onPlayError = cb
  }

  // bind event callback
  _bindEventCallback (config) {
    const eventNames = Object.keys(config)
    eventNames.forEach(v => {
      if (v.indexOf('on') === 0) {
        const eventName = `_${v}`
        this[eventName] && this[eventName](config[v])
      }
    })
  }

  // register Audio Event
  _registerEvent (config) {
    const curry = (cb, eventName) => e => {
      if (!this._triggerEvent(eventName)) return
      cb && cb(e)
      return true
    }

    this._bindEventCallback(config)

    this.eventMethods = {
      // loading state
      loadstart: e => {
        this.playState === playStateSet[1] && this._setPlayState(playStateSet[0])
        this.onLoad && this.onLoad(e)
      },
      // playing state
      playing: e => {
        this._setPlayState(playStateSet[1])
        this.onPlay && this.onPlay(e)
      },
      canplaythrough: e => {
        this.playState === playStateSet[0] && this._setPlayState(playStateSet[1])
      },
      // paused state
      pause: e => {
        this._setPlayState(playStateSet[2])
        this.onPause && this.onPause(e)
      },
      // ended state
      ended: e => {
        if (this.isEnd) {
          this.isEnd = false
        } else {
          this.isEnd = true
          this._cut({autoCut: true})
          this.onEnd && this.onEnd(e)
        }
      },
      // loaderror state
      error: e => {
        this._setPlayState(playStateSet[5])
        this.onLoadError && this.onLoadError(e)
      },
      // playerror state
      stalled: e => {
        this._setPlayState(playStateSet[6])
        this.onPlayError && this.onPlayError(e)
      },
      // others
      progress: e => {
        const ranges = e.target.buffered
        const total = (e.total || 1)
        let buffered = 0
        let loaded = (e.loaded || 0)
        let progress = loaded / total

        if (ranges && ranges.length) {
          for (let i = 0, j = ranges.length; i < j; i++) {
            this.buffered.push({
              'start': ranges.start(i) * 1000,
              'end': ranges.end(i) * 1000
            })
          }
          buffered = (ranges.end(0) - ranges.start(0)) * 1000
          loaded = Math.min(1, buffered / (e.target.duration * 1000))
          progress = loaded / total
        }

        this.onProgress && this.onProgress({e, progress})
      },
      durationchange: e => {},
      loadedmetadata: e => {
        this.metaDataLoaded = true
        this.seekValue && this.seek(this.seekValue)
      },
      loadeddata: e => {},
      timeupdate: e => {
        // playState is loading but actually is playing
        if (this.playState === playStateSet[0]) {
          this._log("timeupdate's playing")
          this._setPlayState(playStateSet[1])
          this.onPlay && this.onPlay(e)
        }

        // Depending on currentTime and duration to mimic end event
        const isEnd = this.audioH5.duration && this.audioH5.currentTime === this.audioH5.duration
        if (isEnd) {
          this._log("timeupdate's ended")
          if (this.isEnd) {
            this.isEnd = false
          } else {
            this.isEnd = true
            this._cut({autoCut: true})
            this.onEnd && this.onEnd(e)
          }
        }

        this.onTimeupdate && this.onTimeupdate(e)
      },
      seeking: e => {
        this.onSeek && this.onSeek(e)
      },
      seeked: e => {},
      play: e => {},
      volumechange: e => {
        this.onVolume && this.onVolume(e)
      },
      ratechange: e => {
        this.onRate && this.onRate(e)
      },
      abort: e => {},
      suspend: e => {}
    }

    for (let k in this.eventMethods) {
      this.eventMethods[k] = curry(this.eventMethods[k], k)
    }

    for (let k in this.eventMethods) {
      this._blockEvent(false)
      this._bindEvent(this.eventMethods[k], k)
    }
  }

  // block all events callback trigger
  _blockEvent (bool) {
    if (this._checkInit()) {
      for (let k in this.eventMethods) {
        this._eventController(k, !bool)
      }
    }
  }

  // unregister Audio Event
  _unregisterEvent () {
    if (this._checkInit()) {
      for (let k in this.eventMethods) {
        this._removeEvent(this.eventMethods[k], k)
      }
    }
  }

  // whether or not trigger event callback
  _triggerEvent (event) {
    if (!this.eventController[event]) return false
    this.logLevel === 'detail' && this._log(`trigger ${event} event`)

    return true
  }

  // event callback controller
  _eventController (event, bool) {
    this.eventController[event] = bool
  }

  // bind event
  _bindEvent (cb, event) {
    if (!this._checkType(event, 'string')) return this._logErr(`bindEvent - bind event name is not string`)
    this._checkType(cb, 'function') && addListener(event, cb, this.audioH5)
  }

  // remove event
  _removeEvent (cb, event) {
    if (!this._checkType(event, 'string')) return this._logErr(`removeEvent - unbind event name is not string`)
    this._checkType(cb, 'function') && removeListener(event, cb, this.audioH5)
  }

  // check type
  _checkType (element, type, closeLog) {
    if (typeof type !== 'string') return false
    if (getType(element) !== type) {
      !closeLog && this._logErr(`Your parameter(${element}) type is ${getType(element)}, please pass the ${type} type`)
      return false
    }
    return true
  }

  // check whether or not init Audio
  _checkInit () {
    if (!this.isInit) {
      this._logErr("checkInit - The Audio haven't been initiated")
      return false
    }
    return true
  }

  // normal logger
  _log (msg) {
    const canLog = this.logLevel === 'detail' || this.logLevel === 'warn'

    return this.debug && canLog && console.log('[EASE_AUDIO_H5 MESSAGE]:', msg)
  }

  // error logger
  _logErr (err) {
    return this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err)
  }
}

export default AudioH5
