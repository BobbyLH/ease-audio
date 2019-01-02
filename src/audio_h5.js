import { addListener, removeListener, getType, isIE } from '../utils'

const playStateSet = [
  'loading',
  'playing',
  'paused',
  'stopped',
  'ended',
  'loaderror',
  'playerror'
]

const playModelSet = ['list-once', 'list-random', 'list-loop', 'single-once', 'single-loop']

const supportEvents = ['onplay', 'onpause', 'onstop', 'onend', 'onload', 'oncanplay', 'onprogress', 'onvolume', 'onseek', 'onrate', 'ontimeupdate', 'onloaderror', 'onplayerror']

const logLevel = ['detail', 'info', 'warn', 'error', 'silent']

const defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'

export class AudioH5 {
  constructor (config) {
    this.isInit = false

    this.init = this.init.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.toggle = this.toggle.bind(this)
    this.cut = this.cut.bind(this)
    this.pick = this.pick.bind(this)
    this.load = this.load.bind(this)
    this.seek = this.seek.bind(this)
    this.rate = this.rate.bind(this)
    this.volume = this.volume.bind(this)
    this.muted = this.muted.bind(this)
    this.stop = this.stop.bind(this)
    this.unload = this.unload.bind(this)
    this.model = this.model.bind(this)
    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
    this.once = this.once.bind(this)
    this.playlist = this.playlist.bind(this)

    this.init(config)
  }

  get duration () {
    return this.audioH5.duration
  }

  set setProps ({prop, value}) {
    if (this.audioH5[prop] && !this._checkType(this.audioH5[prop], 'function')) {
      this.audioH5[prop] = value
      this._updateConfig({prop: value})
    }
  }

  init (config) {
    if (!this.isInit && config && this._checkType(config, 'object') && JSON.stringify(config) !== '{}') {
      this._initial(config)
      this._registerEvent(config)

      return this._returnParams()
    }
  }

  play () {
    if (this._checkInit()) {
      this._blockEvent({block: false})
      this.audioH5.play()

      return this.playId
    }
  }

  pause () {
    if (this._checkInit()) {
      this.audioH5.pause()

      return this.playId
    }
  }

  toggle () {
    if (this._checkInit() && this.playState !== 'stopped' && this.playState !== 'ended' && this.playState !== 'loaderror' && this.playState !== 'playerror') {
      this.playState === null || this.playState === 'paused' ? this.play() : this.pause()

      return this.playId
    }
  }

  cut () {
    if (this._checkInit()) {
      this._cut()

      return this._returnParams()
    }
  }

  pick (playId) {
    if (this._checkInit() && this._checkType(playId, 'number', true)) {
      for (let i = 0; i < this.playList.length; i++) {
        if (this.playList[i].playId === playId) {
          this.unload()

          this._setPlayIndex(i)
          const src = this.playList[this.playIndex].src

          const config = {...this.config, src}
          this._createAudio(config)
          this._registerEvent(config)
          this.play()
          break
        }
      }

      return this._returnParams()
    }
  }

  load () {
    if (this._checkInit()) {
      this.audioH5.load()

      return this.playId
    }
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
    if (this._checkInit()) {
      if (this._checkType(bool, 'boolean', true)) {
        this.audioH5.muted = bool
        this._updateConfig({muted: bool})
      } else {
        return this.audioH5.muted
      }
    }
  }

  stop () {
    if (this._checkInit() && this.playState !== playStateSet[3]) {
      this._blockEvent({block: true})
      this.audioH5.currentTime = 0
      this.audioH5.pause()

      this._setPlayState(playStateSet[3])
      this._fireEventQueue(this.playId, 'onstop')

      return this.playId
    }
  }

  unload () {
    this.stop()
    this._unregisterEvent()
    this.audioH5.src = defaultSrc
    this.audioH5 = null
    this.isInit = false
  }

  /* set play model */
  model (model) {
    if (this._checkInit()) {
      if (playModelSet.indexOf(model) !== -1) {
        // model contain: list-once, list-random, list-loop, single-once, single-loop
        this.playModel = model
      } else {
        return this.playModel
      }
    }
  }

  /* add event to events queue */
  on (event, cb) {
    if (this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
      const queueName = event.indexOf('on') === 0 ? event : `on${event}`
      this._onEvent(queueName, cb)
    }
  }

  /* remove event from events queue */
  off (event, cb) {
    if (this._checkType(event, 'string', true)) {
      const queueName = event.indexOf('on') === 0 ? event : `on${event}`
      this._offEvent(queueName, cb)
    }
  }

  /* fire only one time */
  once (event, cb) {
    if (this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
      const queueName = event.indexOf('on') === 0 ? event : `on${event}`
      const funcName = `EASE_AUDIO_${queueName.toUpperCase()}_ONCE_CALLBACK`
      const once = e => {
        cb && cb(e)
        this._offEvent(queueName, once, funcName)
      }
      this._onEvent(queueName, once, funcName)
    }
  }

  /* set play list */
  playlist ({action, list, playId}) {
    if (this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true))) {
      this._updatePlayList({action, list, playId})

      return this._returnParams()
    }
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  _initial (config) {
    this.config = config // preserve initial config
    this.playState = null
    this.debug = config.debug || false
    this.logLevel = (logLevel.indexOf(config.logLevel) !== -1 && config.logLevel) || logLevel[3]
    this.idCounter = 1000
    this.playId = 1000
    this.playModel = (playModelSet.indexOf(config.playModel) !== -1 && config.playModel) || (config.loop && playModelSet[3]) || playModelSet[0]
    this.playIndex = 0
    this.playList = new Array(0)
    this.buffered = new Array(0)
    this.eventController = new Array(0)
    this.eventMethods = {}

    // playlist convert to src
    let src
    if (config.playlist && this._checkType(config.playlist, 'array')) {
      this.playlist({action: 'add', list: config.playlist})
      src = config.playlist[0].src
      if (!src || !this._checkType(src, 'string')) {
        src = defaultSrc
        this._logErr('The src property is necessary and must be string!')
      }
    } else {
      this._logErr('Please pass correct playlist parameters!')
      src = defaultSrc
    }

    // create Audio Object
    this._createAudio({...config, src})
  }

  _createAudio (config) {
    this.isInit = true

    this.audioH5 = new window.Audio()
    this.audioH5.autoplay = config.autoplay || false
    this.audioH5.loop = config.loop || false
    this.audioH5.src = this._srcAssemble(config.src)
    this.audioH5.preload = config.preload || true
    this.audioH5.volume = config.volume || (config.volume === 0 ? 0 : 1)
    this.audioH5.muted = config.muted || false
    this.audioH5.playbackRate = config.rate || config.playbackRate || 1
    this.audioH5.controls = false
  }

  _srcAssemble (src) {
    if (src && this._checkType(src, 'string')) {
      return src
    }
    return defaultSrc
  }

  _updateConfig (params) {
    this.config = {...this.config, ...params}
  }

  _returnParams () {
    return {playId: this.playId, playingData: this.playList[this.playIndex], playlist: this.playList}
  }

  /* set play state */
  _setPlayState (state) {
    if (this._checkType(state, 'string', true) && this.playState !== state) {
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

      this._logInfo(`setPlayState - ${state}`)
      this.playState = state
      return this.playState
    }
  }

  /* set play index */
  _setPlayIndex (index) {
    const playModel = this.playModel
    const maxIndex = this.playList.length - 1

    if (index === 0) {
      this.playIndex = 0
      this.playId = (this.playList[0] && this.playList[0].playId) || this.playId
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

    this.playId = (this.playList[this.playIndex] && this.playList[this.playIndex].playId) || this.playId

    this._log(`setPlayIndex - playIndex: ${this.playIndex}  playId: ${this.playId}`)
    return this.playIndex
  }

  /* reset play list */
  _resetPlayList () {
    this.playList = []
    this._setPlayIndex(0)
  }

  /* update play list */
  _updatePlayList ({action, list, playId}) {
    switch (action) {
      case 'add':
        this.playList = [...this.playList, ...list.map(v => {
          if (this._checkType(v, 'object')) {
            v.playId = this.idCounter
            this.idCounter++
            return v
          }
        })]
        break
      case 'delete':
        if (playId) {
          for (let i = 0; i < this.playList.length; i++) {
            if (this.playList[i].playId === playId) {
              return this.playList.splice(i, 1)
            }
          }
        }
        break
      case 'insert':
        if (playId && list) {
          for (let i = 0; i < this.playList.length; i++) {
            if (this.playList[i].playId === playId) {
              return this.playList.splice(i, 0, ...list)
            }
          }
        }
        break
      case 'reset':
        this._resetPlayList()
        break
      default:
        this._resetPlayList()
    }
  }

  /* cut audio */
  _cut (endCut) {
    this.stop()
    // can't cut audio if the playModel is single-once
    if (this._checkInit() && this.playModel !== 'single-once') {
      this.metaDataLoaded = false
      this.seekValue = null
      this._setPlayIndex()
      if (!this.playList[this.playIndex]) return
      const src = this.playList[this.playIndex].src

      if (endCut) {
        // resolve the IOS auto play problem
        this.audioH5.src = src
        this.load()
      } else {
        this.unload()
        const config = {...this.config, src}
        this._createAudio(config)
        this._registerEvent(config)
      }

      this.play()
      return this._setPlayState(playStateSet[1])
    }
  }

  /* generate received event callback queue */
  _onEvent (event, cb, name) {
    if (supportEvents.indexOf(event) !== -1) {
      if (!this[event]) this[event] = {}
      this[event][name || cb.name || `anonymous-${new Date().getTime()}`] = cb
    }
  }

  /* delete received event callback queue */
  _offEvent (event, cb, name) {
    if (supportEvents.indexOf(event) !== -1) {
      if (!cb) this[event] = null
      else if (name || cb.name) delete this[event][name || cb.name]
    }
  }

  /* fire event callback queue */
  _fireEventQueue (e, eventQueue) {
    if (this[eventQueue]) {
      for (let k in this[eventQueue]) {
        this[eventQueue][k] && this[eventQueue][k](e)
      }
    }
  }

  /* register Audio Event */
  _registerEvent (config) {
    const curry = (cb, eventName) => e => {
      if (!this._triggerEventController(eventName)) return
      return cb && cb(e)
    }

    /* bindind received event callbacks */
    const configKeys = Object.keys(config)
    configKeys.forEach(v => {
      if (v.indexOf('on') === 0) {
        const funcName = `EASE_AUDIO_${v.toUpperCase()}_INITIAL_CALLBACK`
        this._onEvent(v, config[v], funcName)
      }
    })

    this.eventMethods = {
      // loading state
      loadstart: e => {
        this.playState === playStateSet[1] && this._setPlayState(playStateSet[0])
        this._fireEventQueue(e, 'onload')
      },
      // playing state
      playing: e => {
        this._setPlayState(playStateSet[1])
        this._fireEventQueue(e, 'onplay')
      },
      canplaythrough: e => {
        this.playState === playStateSet[0] && this._setPlayState(playStateSet[1])
      },
      // paused state
      pause: e => {
        this._setPlayState(playStateSet[2])
        this._fireEventQueue(e, 'onpause')
      },
      // ended state
      ended: e => {
        if (this.isEnd) {
          this.isEnd = false
        } else {
          this.isEnd = true
          this.config.endAutoCut && this._cut(true)
          this._fireEventQueue(e, 'onend')
        }
      },
      // loaderror state
      error: e => {
        this._setPlayState(playStateSet[5])
        this._fireEventQueue(e, 'onloaderror')
      },
      // playerror state
      stalled: e => {
        this._setPlayState(playStateSet[6])
        this._fireEventQueue(e, 'onplayerror')
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

        this._fireEventQueue({e, progress}, 'onprogress')
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
          this._logInfo("timeupdate's playing")
          this._setPlayState(playStateSet[1])
          this._fireEventQueue(e, 'onplay')
        }

        // Depending on currentTime and duration to mimic end event
        const isEnd = this.audioH5.duration && this.audioH5.currentTime === this.audioH5.duration
        if (isEnd) {
          this._logInfo("timeupdate's ended")
          if (this.isEnd) {
            this.isEnd = false
          } else {
            this.isEnd = true
            this.config.endAutoCut && this._cut(true)
            this._fireEventQueue(e, 'onend')
          }
        }

        this._fireEventQueue(e, 'ontimeupdate')
      },
      canplay: e => {
        this._fireEventQueue(e, 'oncanplay')
      },
      seeking: e => {
        this._fireEventQueue(e, 'onseek')
      },
      seeked: e => {},
      play: e => {},
      volumechange: e => {
        this._fireEventQueue(e, 'onvolume')
      },
      ratechange: e => {
        this._fireEventQueue(e, 'onrate')
      },
      abort: e => {},
      suspend: e => {}
    }

    for (let k in this.eventMethods) {
      this.eventMethods[k] = curry(this.eventMethods[k], k)
    }

    for (let k in this.eventMethods) {
      this._bindEvent(this.eventMethods[k], k)
    }

    this._blockEvent({block: false})
  }

  /* unregister Audio Event */
  _unregisterEvent () {
    if (this._checkInit()) {
      for (let k in this.eventMethods) {
        this._removeEvent(this.eventMethods[k], k)
      }
    }
  }

  /* not remove but block event callback */
  _blockEvent ({event, block}) {
    if (this._checkInit()) {
      if (event && this._checkType(event, 'string')) {
        this.eventController[event] = !block
      } else {
        for (let k in this.eventMethods) {
          this.eventController[k] = !block
        }
      }
    }
  }

  /* whether or not trigger event callback */
  _triggerEventController (event) {
    if (!this.eventController[event]) return false
    this._log(`trigger ${event} event`)

    return true
  }

  /* bind event */
  _bindEvent (cb, event) {
    if (!this._checkType(event, 'string')) return this._logErr(`bindEvent - bind event name is not string`)
    this._checkType(cb, 'function', true) && addListener(event, cb, this.audioH5)
  }

  /* remove event */
  _removeEvent (cb, event) {
    if (!this._checkType(event, 'string')) return this._logErr(`removeEvent - unbind event name is not string`)
    this._checkType(cb, 'function', true) && removeListener(event, cb, this.audioH5)
  }

  /* check type */
  _checkType (element, type, logErr) {
    if (typeof type !== 'string') return this._logWarn('checkType - The type must be string')
    if (getType(element) !== type) {
      logErr && this._logErr(`Your parameter(${element}) type is ${getType(element)}, please pass the ${type} type`)
      return false
    }
    return true
  }

  /* check whether or not init Audio */
  _checkInit () {
    if (!this.isInit) {
      this._logWarn("checkInit - The Audio haven't been initiated")
      return false
    }
    return true
  }

  /* detail logger */
  _log (detail) {
    const canLog = this.logLevel !== 'silent' && this.logLevel === 'detail'

    return canLog && this.debug && console.log('[EASE_AUDIO_H5 DETAIL]:', detail)
  }

  /* info logger */
  _logInfo (info) {
    const canLog = this.logLevel !== 'silent' && this.logLevel !== 'error' && this.logLevel !== 'warn'

    return canLog && this.debug && console.info('[EASE_AUDIO_H5 INFO]:', info)
  }

  /* warn logger */
  _logWarn (warn) {
    const canLog = this.logLevel !== 'silent' && this.logLevel !== 'error'

    return canLog && this.debug && console.warn('[EASE_AUDIO_H5 WARN]:', warn)
  }

  /* error logger */
  _logErr (err) {
    const canLog = this.logLevel !== 'silent'

    return canLog && this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err)
  }
}

export default AudioH5
