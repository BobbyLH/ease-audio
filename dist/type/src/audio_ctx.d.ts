import { Iconfig } from './audio.d';
export declare class AudioCtx {
    constructor(config: Iconfig);
    init(): void;
    play(): void;
    pause(): void;
    toggle(): void;
    load(): void;
    seek(): void;
    volume(): void;
    stop(): void;
    unload(): void;
    on(): void;
    off(): void;
    once(): void;
    cut(): void;
    pick(): void;
    rate(): void;
    model(): void;
    mute(): void;
    playlist(): void;
}
export default AudioCtx;
