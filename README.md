# Description
[ease-audio.js](https://github.com/BobbyLH/ease-audio) is an audio library base on **HTML5 Audio**.



## Quick Start

Several options to get up and running:

* Clone the repo: `git clone https://github.com/BobbyLH/ease-audio`
* Install with [npm](https://www.npmjs.com/package/ease-audio): `npm install ease-audio`
* Install with [Yarn](https://yarnpkg.com/en/package/ease-audio): `yarn add ease-audio`

In the browser:

```html
<script src='pathTo/dist/audio.js' ></script>
<script>
    const EaseAudio = window.EaseAudio.default
    var sound = new EaseAudio({
      playlist: ['sound.mp3']
    });
</script>
```



## Examples

### Most basic:
```javascript
var sound = new EaseAudio({
  playlist: ['sound.mp3', 'sound2.mp3'],
  autocut: true
});

sound.play();
```

### More options:
```javascript
var sound = new EaseAudio({
  playlist: [
    {src: 'sound1.mp3', tag: 'your tag'}, 
    {src: 'sound2.mp3', tag: 'your tag'}
  ],
  // pick second playlist item for initiation
  initIndex: 1,
  autocut: (currentId, nextId) => {
    // do something, such as http(s) request
    return true
  }
  volume: 1,
  playModel: 'list-once',
  preload: true,
  loop: true,
  autoPlay: true,
  onload: e => {
    console.log('loading')
  },
  oncanplay: e => {
    console.log('can play')
    sound.play()
  },
  onplay: e => {
    console.log('playing')
  },
  onpause: e => {
    console.log('paused')
  },
  onstop: id => {
    console.log('stopped')
  },
  onend: e => {
    console.log('ended')
  },
  onseek: e => {
    console.log('seeking')
  }
});
```

### Listen for events:
```javascript
var sound = new EaseAudio({
  playlist: ['sound.mp3']
});

// Clear listener after first call onload event.
sound.once('load', function(){
  console.log('loading')
});

// Fires when the sound finishes playing.
sound.on('end', function(){
  console.log('ended!');
});
```


### ES6:
```javascript
import EaseAudio from 'ease-audio';

// or const EaseAudio = require('ease-audio').default

// or const { EaseAudio } = require('ease-audio')

// Setup the new EaseAudio.
const sound = new EaseAudio({
  playlist: ['sound.mp3']
});

// load the sound.
sound.load();

// Play the sound.
sound.play();

// Change the volume.
sound.volume(0.5)
```



## API


### Options
#### playlist `Array` `[]` *`required`*
The play list for list model, the src(`The sources to the track to be loaded for the sound`) property is *`required`*.
#### autocut `Boolean` or `Function(currentId, nextId)`
Set or return(`Function`) to `true` the EaseAudio going to play next track(according to playModel) when the current has have finished.
#### playModel `String` `list-once`
This property defines the play model that when `cut` or `end auto cut` sound will be comply. Valid levels include(If set the `loop` to `true` without set playModel property, then the play model will be `single-once`):<br>
- `list-once`
- `list-random`
- `list-loop`
- `single-once`
- `single-loop`
#### volume `Number` `1.0`
The volume of the specific track, from `0.0` to `1.0`.
#### loop `Boolean` `false`
Set to `true` to automatically loop the sound forever.
#### preload `Boolean` `true`
Automatically begin downloading the audio file.
#### autoplay `Boolean` `false`
Set to `true` to automatically start playback when sound is loaded.
#### mute `Boolean` `false`
Set to `true` to load the audio muted.
#### rate `Number` `1.0`
The rate of playback. 0.5 to 2.0, with 1.0 being normal speed.
#### onload `Function`
Fires when the sound is start loading.
#### onunload `Function`
Fires when the sound is start unload.
#### onplay `Function`
Fires when the sound begins playing. The first parameter is the event object.
#### onpause `Function`
Fires when the sound has been paused. The first parameter is the event object.
#### onstop `Function`
Fires when the sound has been stopped. The first parameter is the ID of the sound.
#### onend `Function`
Fires when the sound finishes playing (if it is looping, it'll fire at the end of each loop). The first parameter is the event object.
#### onfinish `Function`
Fires when the playlist has been finished. The first parameter is the ID of the sound.
#### onmute `Function`
Fires when the sound has been muted/unmuted. The first parameter is the event object.
#### onvolume `Function`
Fires when the sound's volume has changed. The first parameter is the event object.
#### onrate `Function`
Fires when the sound's playback rate has changed. The first parameter is the event object.
#### onseeking `Function`
Fires when the sound start seeking. The first parameter is the event object.
#### onseeked `Function`
Fires when the sound has been seeked. The first parameter is the event object.
#### oncut `Function`
Fires when the sound has been cutted. The first parameter is the ID of the sound.
#### onpick `Function`
Fires when the sound has been picked. The first parameter is the ID of the sound.
#### onloaderror `Function`
Fires when the sound is unable to load. The first parameter is the event object.
#### onplayerror `Function`
Fires when the sound is unable to play. The first parameter is the error message.
#### debug `Boolean` `false`
Set to `true` will log the debug information.
#### logLevel `string` `error`
This property defines the level of messages that the EaseAudio will log. Valid levels include:<br>
- `detail`
- `info`
- `warn`
- `error`
- `silent`


### Methods
#### init(config)
If without config when new EaseAudio, you still can call this method with some configurations to construction.

#### play()
Begin playback of sound.

#### pause()
Pause playback of sound.

#### toggle()
Auto switch to play or pause according current play state.

#### cut()
According to play model auto cut playback for sound.

#### pick(playId)
According to play id pick playback for sound.This method necessarily takes 1 arguments.
* **playId**: `Number` *`required`* The playId which from playlist.

#### load()
If you set `preload` to false, you must call `load` before you can play any sounds.

#### seek([seek])
Get/set the position of playback for sound. This method optionally takes 0 or 1 arguments.
* **seek**: `Number` `optional` The position to move current playback to (in seconds).

#### rate([rate])
Get/set the rate of playback for sound. This method optionally takes 0 or 1 arguments.
* **rate**: `Number` `optional` The rate of playback. 0.5 to 2.0, with 1.0 being normal speed.

#### volume([volume])
Get/set volume of sound. This method optionally takes 0 or 1 arguments.
* **volume**: `Number` `optional` Volume from `0.0` to `1.0`.

#### mute(muted)
Mutes the sound, but doesn't pause the playback.
* **muted**: `Boolean` True to mute and false to unmute.

#### stop()
Stops playback of sound, resetting `seek` to `0`.

#### unload()
Unload and destroy the EaseAudio object. This will immediately stop and remove it from the cache.

#### on(event, function)
Listen for events. Multiple events can be added by calling this multiple times.
* **event**: `String` Name of event to fire/set (`play`, `pause`, `stop`, `end`, `load`, `unload`, `canplay`, `canplaythrough`, `progress`, `volume`, `seek`, `rate`, `timeupdate`, `loaderror`, `playerror`).
* **function**: `Function` Define function to fire on event.

#### once(event, function)
Same as `on`, but it removes itself after the callback is fired.
* **event**: `String` Name of event to fire/set (`play`, `pause`, `stop`, `end`, `load`, `unload`, `canplay`, `canplaythrough`, `progress`, `volume`, `seek`, `rate`, `timeupdate`, `loaderror`, `playerror`).
* **function**: `Function` Define function to fire on event.

#### off(event, [function])
Remove event listener that you've set. Call without parameters to remove all events.
* **event**: `String` Name of event (`play`, `pause`, `stop`, `end`, `load`, `unload`, `canplay`, `canplaythrough`, `progress`, `volume`, `seek`, `rate`, `timeupdate`, `loaderror`, `playerror`).
* **function**: `Function` `optional` The listener to remove. Omit this to remove all events of type.


### Properties
#### duration `Number`
Return the track duration property.

#### playState `String`
Return the play state(`loading`, `loaded`, `playing`, `paused`, `stopped`, `ended`, `finished`, `loaderror`, `playerror`, `unloaded`).

#### playId `Number`
Return the current playing id.

#### playingData `Object`
Return the current playing item data.

#### playlist `Array`
Return the playlist.

#### playlist = `{action, list, playId, params}`
Set the playlist according to `action` and `playId` arguments.
* **action**: `String` Action of setting (`add`, `delete`, `insert`, `replace`, `update`,  `reset`).
* **list**: `Array` `optional` Add/insert/replace the list to playlist when the action is `add`, `insert`, `replace`.
* **playId**: `Array` `optional` Delete/insert/replace/update a item according to playId.
* **params**: `Object` `optional` Update a item  from params according to playId.

#### networkState `String`
Return the track network state.

### Browser Compatibility
* Google Chrome 50+
* Internet Explorer 9.0+
* Firefox 40+
* Safari 8+
* Opera 50.0+
* Microsoft Edge 12+
* Android WebView 4+
* Samsung 4+
* IOS 8+

## License

Copyright (c) 2018-2019 Bobby.li

Released under the MIT License