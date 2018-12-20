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

    this._presetEvent()
    this.init(config)
  }

  set props ({prop, value}) {
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
    this._checkInit() && this.audioH5.play()
  }

  pause () {
    this._checkInit() && this.audioH5.pause()
  }

  toggle () {
    if (this._checkInit() && this.playState !== 'stoped' && this.playState !== 'ended' && this.playState !== 'loaderror' && this.playState !== 'playerror') {
      this.playState === null || this.playState === 'paused' ? this.play() : this.pause()
    }
  }

  cut (params) {
    if (!params.src) return this._logErr(`cut -- The src is necessary`)
    if (this._checkInit()) {
      this.unload()
      const config = {...this.config, ...params}
      this._createAudio(config)
      this._updatePlayList({type: 'add', list: [...this._srcAssem(config.src)]})
      this.play()
    }
  }

  load () {
    this._checkInit() && this.audioH5.load()
  }

  seek (val) {
    if (this._checkInit()) {
      if (this._checkType(val, 'number')) {
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
      if (this._checkType(val, 'number')) {
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
      if (this._checkType(val, 'number')) {
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
    }
  }

  stop () {
    if (this._checkInit()) {
      this._setPlayState(playStateSet[3])
      this.audioH5.pause()
      this.audioH5.src = 'javascript:void(0);'
    }
  }

  unload () {
    this.stop()
    this.audioH5 = null
    this.isInit = false
  }

  // set play model
  model (modelIndex) {
    if (this._checkInit() && this._checkType(modelIndex, 'number')) {
      // model contain: list-once(0), list-random(1), list-loop(2), single-once(3), single-loop(4)
      this.playModel = playModelSet[modelIndex] || this.playModel
    }
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  _initial (config) {
    // create Audio Object
    this._createAudio(config)

    this.config = config // preserve initial config
    this.playState = null
    this.metaDataLoaded = false
    this.seekValue = null
    this.debug = config.debug || false
    this.playModel = playModelSet[config.playModel || 0]
    this.playIndex = 0
    this.playList = [...this._srcAssem(config.src)]
  }

  _createAudio (config) {
    this.audioH5 = new window.Audio()

    this.audioH5.autoplay = config.autoplay || false
    this.audioH5.loop = config.loop || false
    this.audioH5.src = this._srcAssem(config.src)[0]
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
      ? [...srcs]
      : [srcs]
    : ['javascript:void(0);']

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

  /* binding event */
  _onplay (cb) {
    this._bindEvent(cb, 'play')
  }

  _onready (cb) {
    this._bindEvent(cb, 'playing')
  }

  _oncanplay (cb) {
    this._bindEvent(cb, 'canplaythrough')
  }

  _onpause (cb) {
    this._bindEvent(cb, 'pause')
  }

  _onend (cb) {
    this._bindEvent(cb, 'ended')
  }

  _onloading (cb) {
    this._bindEvent(cb, 'loadstart')
  }

  _onloaded (cb) {
    this._bindEvent(cb, 'loadedmetadata')
  }

  _onprogress (cb) {
    this._bindEvent(cb, 'progress')
  }

  _onvolume (cb) {
    this._bindEvent(cb, 'volumechange')
  }

  _onseeking (cb) {
    this._bindEvent(cb, 'seeking')
  }

  _onseeked (cb) {
    this._bindEvent(cb, 'seeked')
  }

  _onratechange (cb) {
    this._bindEvent(cb, 'ratechange')
  }

  _ontimeupdate (cb) {
    this._bindEvent(cb, 'timeupdate')
  }

  _onloaderror (cb) {
    this._bindEvent(cb, 'error')
  }

  _onplayerror (cb) {
    this._bindEvent(cb, 'stalled')
  }

  _presetEvent () {
    // loading state
    this._bindEvent(e => this.playState === playStateSet[1] && this._setPlayState(playStateSet[0]), 'loadstart')
    this._bindEvent(e => this.playState === playStateSet[1] && this._setPlayState(playStateSet[0]), 'durationchange')
    this._bindEvent(e => {
      this.metaDataLoaded = true
      this.seekValue && this._seek(this.seekValue)
      return this.playState === playStateSet[1] && this._setPlayState(playStateSet[0])
    }, 'loadedmetadata')
    this._bindEvent(e => this.playState === playStateSet[1] && this._setPlayState(playStateSet[0]), 'loadeddata')
    this._bindEvent(e => this.playState === playStateSet[1] && this._setPlayState(playStateSet[0]), 'progress')
    this._bindEvent(e => this.playState === playStateSet[1] && this._setPlayState(playStateSet[0]), 'seeking')

    // playing state
    this._bindEvent(e => this._setPlayState(playStateSet[1]), 'play')
    this._bindEvent(e => this.playState === playStateSet[0] && this._setPlayState(playStateSet[1]), 'playing')
    this._bindEvent(e => this.playState === playStateSet[0] && this._setPlayState(playStateSet[1]), 'seeked')
    this._bindEvent(e => this.playState === playStateSet[0] && this._setPlayState(playStateSet[1]), 'canplaythrough')

    // paused state
    this._bindEvent(e => this._setPlayState(playStateSet[2]), 'pause')

    // stoped state
    this._bindEvent(e => {
      this.abortLoad = true
      this._log('abort')
      this._setPlayState(playStateSet[3])
    }, 'abort')

    // ended state
    this._bindEvent(e => {
      this._stop()
      this._setPlayIndex()
      if (this.playModel !== 'single-once' && this.playList[this.playIndex]) {
        const nextSrc = this.playList[this.playIndex]
        this.audio.src = nextSrc
        this.audio.play()
        return this._setPlayState(playStateSet[1])
      }
      return this._setPlayState(playStateSet[4])
    }, 'ended')

    // loaderror state
    this._bindEvent(e => {
      if (this.abortLoad) {
        this.abortLoad = false
        return
      }
      this._log('error')
      return this._setPlayState(playStateSet[5])
    }, 'error')

    // playerror state
    this._bindEvent(e => {
      this._logErr(`stalled -- ${e}`)
      return this._setPlayState(playStateSet[6])
    }, 'stalled')

    // others
    this._bindEvent(e => this._log('purposing to suspend loading source'), 'suspend')
  }

  _bindEvent (cb, event) {
    if (!this._checkType(event, 'string')) return this._logErr(`[bind event name is not string`)
    this._checkType(cb, 'function') && addListener(event, cb, this.audioH5)
  }

  _removeEvent (cb, event) {
    if (!this._checkType(event, 'string')) return this._logErr(`[unbind event name is not string`)
    this._checkType(cb, 'function') && removeListener(event, cb, this.audioH5)
  }

  _registerEvent (config) {
    const eventNames = Object.keys(config)
    eventNames.forEach(v => {
      if (v.indexOf('on') === 0) {
        const eventName = `_${v}`
        this[eventName] && this[eventName](config[v])
      }
    })
  }

  _checkType (element, type, closeLog) {
    if (typeof type !== 'string') return false
    if (getType(element) !== type) {
      !closeLog && this._logErr(`Your parameter(${element}) type is ${getType(element)}, please pass the ${type} type`)
      return false
    }
    return true
  }

  _checkInit () {
    if (!this.isInit) {
      this._logErr("The Audio haven't been initiated")
      return false
    }
    return true
  }

  _log (msg) {
    return this.debug && console.log('[EASE_AUDIO_H5 MESSAGE]:', msg)
  }

  _logErr (err) {
    return this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err)
  }
}

export default AudioH5
