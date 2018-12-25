# Description
[ease-audio.js](https://github.com/Bobby90622/ease-audio) is an audio library base on **HTML5 Audio** and **Web Audio**.

## Quick Start

Several options to get up and running:

* Clone the repo: `git clone https://github.com/Bobby90622/ease-audio`
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
  src: 'sound.mp3'
});

sound.play();
```

### More options:
```javascript
var sound = new EaseAudio({
  src: ['sound1.mp3', 'sound2.mp3'],
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
  src: ['sound.mp3']
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
  src: 'sound.mp3'
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
#### src `Array/String` `[]` *`required`*
The sources to the track(s) to be loaded for the sound (URLs or base64 data URIs). These should be in order of preference, howler.js will automatically load the first one that is compatible with the current browser..
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
#### play()
Begins playback of a sound. Returns the sound id to be used with other methods. Only method that can't be chained.
* **sprite/id**: `String/Number` `optional` Takes one parameter that can either be a sprite or sound ID. If a sprite is passed, a new sound will play based on the sprite's definition. If a sound ID is passed, the previously played sound will be played (for example, after pausing it). However, if an ID of a sound that has been drained from the pool is passed, nothing will play.

#### pause()
Pauses playback of sound or group, saving the `seek` of playback.
* **id**: `Number` `optional` The sound ID. If none is passed, all sounds in group are paused.

#### stop()
Stops playback of sound, resetting `seek` to `0`.
* **id**: `Number` `optional` The sound ID. If none is passed, all sounds in group are stopped.

#### mute([muted])
Mutes the sound, but doesn't pause the playback.
* **muted**: `Boolean` `optional` True to mute and false to unmute.

#### volume([volume])
Get/set volume of this sound or the group. This method optionally takes 0, 1 or 2 arguments.
* **volume**: `Number` `optional` Volume from `0.0` to `1.0`.

#### rate([rate])
Get/set the rate of playback for a sound. This method optionally takes 0, 1 or 2 arguments.
* **rate**: `Number` `optional` The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.

#### seek([seek])
Get/set the position of playback for a sound. This method optionally takes 0, 1 or 2 arguments.
* **seek**: `Number` `optional` The position to move current playback to (in seconds).

#### duration([id])
Get the duration of the audio source. Will return 0 until after the `load` event fires.
* **id**: `Number` `optional` The sound ID to check. Passing an ID will return the duration of the sprite being played on this instance; otherwise, the full source duration is returned.

#### on(event, function)
Listen for events. Multiple events can be added by calling this multiple times.
* **event**: `String` Name of event to fire/set (`load`, `canplay`, `loaderror`, `playerror`, `play`, `end`, `pause`, `stop`, `mute`, `volume`, `rate`, `seek`, `fade`, `unlock`).
* **function**: `Function` Define function to fire on event.

#### once(event, function)
Same as `on`, but it removes itself after the callback is fired.
* **event**: `String` Name of event to fire/set (`load`, `canplay`, `loaderror`, `playerror`, `play`, `end`, `pause`, `stop`, `mute`, `volume`, `rate`, `seek`, `fade`, `unlock`).
* **function**: `Function` Define function to fire on event.

#### off(event, [function])
Remove event listener that you've set. Call without parameters to remove all events.
* **event**: `String` Name of event (`load`,`canplay`, `loaderror`, `playerror`, `play`, `end`, `pause`, `stop`, `mute`, `volume`, `rate`, `seek`, `fade`, `unlock`).
* **function**: `Function` `optional` The listener to remove. Omit this to remove all events of type.

#### load()
This is called by default, but if you set `preload` to false, you must call `load` before you can play any sounds.

#### unload()
Unload and destroy the EaseAudio object. This will immediately stop all sounds attached to this sound and remove it from the cache.

### Properties
#### duration `Number`
Return the track duration property.


## License

Copyright (c) 2018-2018 Bobby.li

Released under the MIT License