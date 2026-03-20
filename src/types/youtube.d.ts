// YouTube IFrame Player API type declarations
interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getDuration(): number;
  getCurrentTime(): number;
  setPlaybackQuality(quality: string): void;
  destroy(): void;
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, unknown>;
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
  };
}

interface YTNamespace {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
}

interface Window {
  YT: YTNamespace;
  onYouTubeIframeAPIReady: (() => void) | undefined;
}

declare namespace YT {
  type Player = YTPlayer;
  type PlayerEvent = YTPlayerEvent;
}
