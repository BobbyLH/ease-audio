interface Iplaylist {
  src: string;
  playId?: number;
  [propName: string]: any;
}

type TplayState = number
type TlogLevel = number
type TplayId = number
type TplayModel = number
type TplayIndex = number
type TprevPlayIndex = number
type TplayStateStr = 'loading' | 'playing' | 'paused' | 'stopped' | 'ended' | 'finished' | 'loaderror' | 'playerror' | 'unloaded' | 'loaded'
type TplayStateSet = TplayState | TplayStateStr
type TplayModelStr = 'list-once' | 'list-random' | 'list-loop' | 'single-once' | 'single-loop'
type TplayModelSet = TplayModel | TplayModelStr
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
type Fplaylist = (data: IsetPlaylist) => IreturnParams | void;
type FHandleAudio = (arg1?: number | boolean) => TplayId | boolean | void;
type TEaseAudioMethod = FAnyMethod | FEventBind | FEventUnBind | Finit | Fpick | Fcut | Fmodel | Fplaylist | FHandleAudio;

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
  [propName: string]: Teventcallback;
}

interface IreturnParams {
  playId: number | undefined;
  playingData: Iplaylist | undefined;
  playlist: Tplaylist | undefined;
}

interface IblockEvent {
  event?: string;
  block: boolean;
}

interface IsetPlaylist {
  action: 'add' | 'delete' | 'insert' | 'replace' | 'update' | 'reset';
  list?: Tplaylist;
  playId?: number;
  params?: Object;
}

interface IAudio {
  init: TEaseAudioMethod;
  play: TEaseAudioMethod;
  pause: TEaseAudioMethod;
  toggle: TEaseAudioMethod;
  load: TEaseAudioMethod;
  seek: TEaseAudioMethod;
  volume: TEaseAudioMethod;
  stop: TEaseAudioMethod;
  unload: TEaseAudioMethod;
  on: TEaseAudioMethod;
  off: TEaseAudioMethod;
  once: TEaseAudioMethod;
  cut: TEaseAudioMethod;
  pick: TEaseAudioMethod;
  rate: TEaseAudioMethod;
  model: TEaseAudioMethod;
  mute: TEaseAudioMethod;
  playlist: TEaseAudioMethod;
}

export {
  TplayStateSet,
  TplayStateStr,
  TplayModelSet,
  TplayModelStr,
  TlogLevelSet,
  TlogLevelStr,
  Iplaylist,
  TplayState,
  TlogLevel,
  TplayId,
  TplayModel,
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
  TEaseAudioMethod,
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
  IAudio
}