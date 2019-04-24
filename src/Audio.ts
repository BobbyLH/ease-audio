import AudioCtx from './audio_ctx'
import AudioH5 from './audio_h5'
import {
  Iconfig,
  IsetPlaylist,
  Tplaylist,
  FAnyMethod,
  FEventBind,
  FEventUnBind,
  Finit,
  Fpick,
  Fcut,
  Fmodel,
  FHandleAudio,
  IAudio
} from './audio.d'

export class EaseAudio {
  public audio: AudioH5 | AudioCtx | IAudio;
  public init: Finit | FAnyMethod;
  public play: FHandleAudio | FAnyMethod;
  public pause: FHandleAudio | FAnyMethod;
  public toggle: FHandleAudio | FAnyMethod;
  public cut: Fcut | FAnyMethod;
  public pick: Fpick | FAnyMethod;
  public load: FHandleAudio | FAnyMethod;
  public seek: FHandleAudio | FAnyMethod;
  public rate: FHandleAudio | FAnyMethod;
  public volume: FHandleAudio | FAnyMethod;
  public mute: FHandleAudio | FAnyMethod;
  public stop: FHandleAudio | FAnyMethod;
  public unload: FHandleAudio | FAnyMethod;
  public on: FEventBind | FAnyMethod;
  public off: FEventUnBind | FAnyMethod;
  public once: FEventBind | FAnyMethod;
  public model: Fmodel | FAnyMethod;

  public constructor (config: Iconfig | void) {
    this.audio = this._createAudio(config)

    this.init = this.audio.init
    this.play = this.audio.play
    this.pause = this.audio.pause
    this.toggle = this.audio.toggle
    this.cut = this.audio.cut
    this.pick = this.audio.pick
    this.load = this.audio.load
    this.seek = this.audio.seek
    this.rate = this.audio.rate
    this.volume = this.audio.volume
    this.mute = this.audio.mute
    this.stop = () => this.audio.stop()
    this.unload = () => this.audio.unload()
    this.on = this.audio.on
    this.off = this.audio.off
    this.once = this.audio.once
    this.model = this.audio.model
  }

  public get duration () {
    return this.audio ? (<AudioH5>this.audio).duration : 0
  }

  public get playState () {
    return this.audio ? (<AudioH5>this.audio).playstate : null
  }

  public get playId () {
    return this.audio ? (<AudioH5>this.audio).playid : 1000
  }

  public get playingData () {
    let playingData = {}

    if (this.audio) {
      const playId = (<AudioH5>this.audio).playid
      const playList = (<AudioH5>this.audio).playlists
      const len = playList.length
      for (let i = 0; i < len; i++) {
        if (+playId === +((<Tplaylist>playList)[i].playId as number)) {
          playingData = (<Tplaylist>playList)[i]
          break
        }
      }
    }

    return playingData
  }

  public set playlist (params: IsetPlaylist) {
    this.audio && this.audio.playlist && (<AudioH5>this.audio).playlist(params)
  }

  public get playlist () {
    return this.audio ? (<any>this.audio).playlists : []
  }

  public get networkState () {
    return this.audio ? (<AudioH5>this.audio).networkState : 0
  }

  /**
   * create audio
   * @param {Iconfig} config
   * 
   * @return {AudioH5 | AudioCtx | IAudio}
   */
  private _createAudio (config: Iconfig | void): AudioH5 | AudioCtx | IAudio {
    const audio = {
      init: initFunc,
      play: initFunc,
      pause: initFunc,
      toggle: initFunc,
      load: initFunc,
      seek: initFunc,
      volume: initFunc,
      mute: initFunc,
      stop: initFunc,
      unload: initFunc,
      on: initFunc,
      off: initFunc,
      once: initFunc,
      model: initFunc,
      cut: initFunc,
      pick: initFunc,
      rate: initFunc,
      playlist: initFunc
    }

    try {
      if (typeof window !== 'undefined') {
        const usingWebAudio = config && config.usingWebAudio
        if (usingWebAudio && AudioContext) {
          return new AudioCtx(config)
        } else if (Audio) {
          return new AudioH5(config)
        }
      }
    } catch (err) {
      console.error('[EASE_AUDIO CREATE AUDIO ERROR]:', err)
    }

    return audio
  }
}

/**
 * initial default function
 * If trigger this function means that initialize failed
 * @return {void}
 */
function initFunc (): void {
  return console.error('[EASE_AUDIO ERROR]: Initialize failed')
}

export default EaseAudio
