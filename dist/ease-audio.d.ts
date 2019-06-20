interface Iplaylist {
  src: string;
  playId?: number;
  [propName: string]: any;
}

type TplayId = number
type TplayIndex = number
type TprevPlayIndex = number

type TplayState = number
type TplayStateStr = 'loading' | 'playing' | 'paused' | 'stopped' | 'ended' | 'finished' | 'loaderror' | 'playerror' | 'unloaded' | 'loaded'
type TplayStateSet = TplayState | TplayStateStr

type TplayModel = number
type TplayModelStr = 'list-once' | 'list-random' | 'list-loop' | 'single-once' | 'single-loop'
type TplayModelSet = TplayModel | TplayModelStr

type TlogLevel = number
type TlogLevelStr = 'detail' | 'info' | 'warn' | 'error' | 'silent'
type TlogLevelSet = TlogLevel | TlogLevelStr

type TdefaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
type Tplaylist = Array<Iplaylist>
type TautocutCallback = (currentId: number, nextId: number) => boolean
type TeventParameter = Event | ProgressEvent | number | string | undefined
type Teventcallback = (e: Event) => any
type TprogressEventCallback = (e: ProgressEvent) => any
type TcustomEventCallback = (e: number | string | undefined) => any
type TentireEventCallback = Teventcallback | TprogressEventCallback | TcustomEventCallback
type TlockQueue = Array<() => any>
type TEvent = 'play' | 'pause' | 'stop' | 'end' | 'finish' | 'load' | 'unload' | 'canplay' | 'canplaythrough' | 'progress' | 'volume' | 'seeking' | 'seeked' | 'rate' | 'timeupdate' | 'loaderror' | 'playerror' | 'cut' | 'pick';
type TonEvent = 'onplay' | 'onpause' | 'onstop' | 'onend' | 'onfinish' | 'onload' | 'onunload' | 'oncanplay' | 'oncanplaythrough' | 'onprogress' | 'onvolume' | 'onseeking' | 'onseeked' | 'onrate' | 'ontimeupdate' | 'onloaderror' | 'onplayerror' | 'oncut' | 'onpick';
type TAudioEventUseful = 'loadstart' | 'seeking' | 'canplaythrough' | 'playing' | 'pause' | 'ended' | 'error' | 'progress' | 'durationchange' | 'loadedmetadata' | 'loadeddata' | 'timeupdate' | 'canplay' | 'seeked' | 'volumechange' | 'ratechange';
type TAudioEventUseless = 'finish' | 'playerror' | 'cut' | 'pick' | 'play' | 'abort' | 'suspend';
type TAudioEvent = TAudioEventUseful | TAudioEventUseless;
type TlockTags = 'cutpick' | 'seek' | 'volume' | 'rate' | 'mute' | 'pause_wait' | 'pause_cancel';
type FAnyMethod = () => any;
type FEventBind = (arg1: TEvent | TonEvent, arg2: TentireEventCallback) => boolean;
type FEventUnBind = (arg1: TEvent | TonEvent, arg2?: TentireEventCallback) => boolean;
type Finit = (arg1: Iconfig) => IreturnParams | void;
type Fpick = (arg1: TplayId) => IreturnParams | void;
type Fcut = () => IreturnParams | void;
type Fmodel = (model?: TplayStateSet) => TplayStateSet | void;
type Fplaylist = (data?: IsetPlaylist) => Tplaylist;
type FHandleAudio = (arg1?: number | boolean) => TplayId | boolean | void;

interface IupdateConfig {
  src?: string;
  autocut?: boolean | TautocutCallback;
  playModel?: TplayModelStr;
  volume?: number;
  loop?: boolean;
  preload?: boolean;
  autoplay?: boolean;
  mute?: boolean;
  rate?: number;
  playbackRate?: number;
  onplay?: Teventcallback;
  onpause?: Teventcallback;
  onstop?: TcustomEventCallback;
  onend?: Teventcallback;
  onfinish?: TcustomEventCallback;
  onload?: Teventcallback;
  onunload?: Teventcallback;
  oncanplay?: Teventcallback;
  oncanplaythrough?: Teventcallback;
  onprogress?: TprogressEventCallback;
  onvolume?: Teventcallback;
  onseeking?: Teventcallback;
  onseeked?: Teventcallback;
  onrate?: Teventcallback;
  ontimeupdate?: Teventcallback;
  onloaderror?: Teventcallback | TcustomEventCallback;
  onplayerror?: Teventcallback | TcustomEventCallback;
  oncut?: TcustomEventCallback;
  onpick?: TcustomEventCallback;
  debug?: boolean;
  logLevel?: TlogLevelStr
}

interface Iconfig extends IupdateConfig {
  playlist: Tplaylist;
  initIndex?: number;
  usingWebAudio?: boolean;
}

interface IlockTags {
  cutpick: number;
  seek: number;
  volume: number;
  rate: number;
  mute: number;
  pause_wait: boolean;
  pause_cancel: boolean;
}

interface Ibuffered {
  start: number;
  end: number;
}

interface IeventController {
  [propName: string]: boolean;
}

interface IeventMethods {
  loadstart: Teventcallback;
  seeking: Teventcallback;
  canplaythrough: Teventcallback;
  playing: Teventcallback;
  pause: Teventcallback;
  ended: Teventcallback;
  finish: TcustomEventCallback;
  error: Teventcallback | TcustomEventCallback;
  playerror: Teventcallback | TcustomEventCallback;
  progress: TprogressEventCallback;
  durationchange: Teventcallback;
  loadedmetadata: Teventcallback;
  loadeddata: Teventcallback;
  timeupdate: Teventcallback;
  canplay: Teventcallback;
  seeked: Teventcallback;
  volumechange: Teventcallback;
  ratechange: Teventcallback;
  cut: TcustomEventCallback;
  pick:TcustomEventCallback;
  play: Teventcallback;
  abort: Teventcallback;
  suspend: Teventcallback;
}

interface Ieventcallback {
  [propName: string]: TentireEventCallback;
}

interface IreturnParams {
  playId: TplayId | undefined;
  playingData: Iplaylist | undefined;
  playlist: Tplaylist | undefined;
}

interface IblockEvent {
  event?: TAudioEvent;
  block: boolean;
}

interface IsetPlaylist {
  action: 'add' | 'delete' | 'insert' | 'replace' | 'replaceAll' | 'update' | 'reverse' | 'reset';
  list?: Tplaylist;
  playId?: number;
  params?: Object;
}

interface IAudio {
  init: Finit;
  play: FHandleAudio;
  pause: FHandleAudio;
  toggle: FHandleAudio;
  load: FHandleAudio;
  seek: FHandleAudio;
  volume: FHandleAudio;
  stop: FHandleAudio;
  unload: FHandleAudio;
  on: FEventBind;
  off: FEventUnBind;
  once: FEventBind;
  cut: Fcut;
  pick: Fpick;
  rate: FHandleAudio;
  model: Fmodel;
  mute: FHandleAudio;
  playlist: Fplaylist;
}

declare class EaseAudio<Iconfig> {
  constructor(config: Iconfig | void)
  public init: Finit;
  public play: FHandleAudio;
  public pause: FHandleAudio;
  public toggle: FHandleAudio;
  public cut: Fcut;
  public pick: Fpick;
  public load: FHandleAudio;
  public seek: FHandleAudio;
  public rate: FHandleAudio;
  public volume: FHandleAudio;
  public mute: FHandleAudio;
  public stop: FHandleAudio;
  public unload: FHandleAudio;
  public on: FEventBind;
  public off: FEventUnBind;
  public once: FEventBind;
  public model: Fmodel;
  public playlist: Fplaylist;
  public readonly duration: number;
  public readonly playState: TplayStateStr;
  public readonly playId: TplayId;
  public readonly playingData: Iplaylist;
  public readonly networkState: number;
}

export {
  TplayState,
  TplayStateSet,
  TplayStateStr,
  TplayModel,
  TplayModelSet,
  TplayModelStr,
  TlogLevel,
  TlogLevelSet,
  TlogLevelStr,
  Iplaylist,
  TplayId,
  TplayIndex,
  TprevPlayIndex,
  TdefaultSrc,
  Tplaylist,
  TautocutCallback,
  TeventParameter,
  Teventcallback,
  TprogressEventCallback,
  TcustomEventCallback,
  TentireEventCallback,
  TlockQueue,
  TEvent,
  TonEvent,
  TAudioEventUseful,
  TAudioEventUseless,
  TAudioEvent,
  TlockTags,
  FAnyMethod,
  FEventBind,
  FEventUnBind,
  Finit,
  Fpick,
  Fcut,
  Fmodel,
  Fplaylist,
  FHandleAudio,
  IupdateConfig,
  Iconfig,
  IlockTags,
  Ibuffered,
  IeventController,
  IeventMethods,
  Ieventcallback,
  IreturnParams,
  IblockEvent,
  IsetPlaylist,
  IAudio,
  EaseAudio
}

export default EaseAudio