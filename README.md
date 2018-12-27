# Description
[ease-audio.js](https://github.com/BobbyLH/ease-audio) is an audio library base on **HTML5 Audio** and **Web Audio**.



## Quick Start

Several options to get up and running:

* Clone the repo: `git clone https://github.com/BobbyLH/ease-audio`
* Install with [npm](https://www.npmjs.com/package/ease-audio): `npm install ease-audio`
* Install with [Yarn](https://yarnpkg.com/en/package/ease-audio): `yarn add ease-audio`

In the browser:

```html
<script src='pathTo/dist/audio.js' ></script>
<script>
    var sound = new EaseAudio({
      src: 'sound.mp3'
    });
</script>
```



## Examples

### Most basic:
```javascript
var sound = new EaseAudio({
  playlist: [{src: 'sound.mp3'}]
});

sound.play();
```

### More options:
```javascript
var sound = new EaseAudio({
  playlist: [
    {src: 'sound1.mp3'}, 
    {src: 'sound2.mp3'}
  ],
  volume: 1,
  playModel: 'list-once',
  preload: true,
  loop: true,
  autoPlay: true,
  onload: e => {
    console.log('loading')
  },
  oncanplay: e => {
    console.log('playing')
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
  playlist: [{src: 'sound.mp3'}]
});

// Clear listener after first call.
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

// Setup the new Howl.
const sound = new EaseAudio({
  playlist: [{src: 'sound.mp3'}]
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
#### onloaderror `Function`
Fires when the sound is unable to load. The first parameter is the event object.
#### onplayerror `Function`
Fires when the sound is unable to play. The first parameter is the event object.
#### onplay `Function`
Fires when the sound begins playing. The first parameter is the event object.
#### onend `Function`
Fires when the sound finishes playing (if it is looping, it'll fire at the end of each loop). The first parameter is the event object.
#### onpause `Function`
Fires when the sound has been paused. The first parameter is the event object.
#### onstop `Function`
Fires when the sound has been stopped. The first parameter is the ID of the sound.
#### onmute `Function`
Fires when the sound has been muted/unmuted. The first parameter is the event object.
#### onvolume `Function`
Fires when the sound's volume has changed. The first parameter is the event object.
#### onrate `Function`
Fires when the sound's playback rate has changed. The first parameter is the event object.
#### onseek `Function`
Fires when the sound has been seeked. The first parameter is the event object.
#### usingWebAudio `Boolean`
`true` if the Web Audio API is available.


### Methods
#### init()

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
* **rate**: `Number` `optional` The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.

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
* **event**: `String` Name of event to fire/set (`play`, `pause`, `stop`, `end`, `load`, `canplay`, `progress`, `volume`, `seek`, `rate`, `timeupdate`, `loaderror`, `playerror`).
* **function**: `Function` Define function to fire on event.

#### once(event, function)
Same as `on`, but it removes itself after the callback is fired.
* **event**: `String` Name of event to fire/set (`play`, `pause`, `stop`, `end`, `load`, `canplay`, `progress`, `volume`, `seek`, `rate`, `timeupdate`, `loaderror`, `playerror`).
* **function**: `Function` Define function to fire on event.

#### off(event, [function])
Remove event listener that you've set. Call without parameters to remove all events.
* **event**: `String` Name of event (`play`, `pause`, `stop`, `end`, `load`, `canplay`, `progress`, `volume`, `seek`, `rate`, `timeupdate`, `loaderror`, `playerror`).
* **function**: `Function` `optional` The listener to remove. Omit this to remove all events of type.

### Properties
#### duration `Number`
Return the track duration property.

#### playState `String`
Return the play state.

#### playId `Number`
Return the current playing id.

#### playingData `Object`
Return the current playing item data.

#### playlist `Array`
Return the playlist.

#### playlist = `{action, list, playId}`
Set the playlist according to `action` and `playId` arguments.
* **action**: `String` Action of setting (`add`, `delete`, `insert`, `reset`).
* **list**: `Array` `optional` Add/insert list to playlist when the action is `add` or `insert`.
* **playId**: `Array` `optional` Delete a item according to playId.

#### networkState `String`
Return the track network state.



## License

Copyright (c) 2018-2018 Bobby.li

Released under the MIT License