declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

interface Window {
  AndroidApiCocos: {
    invoke: (method: string, ...args: unknown[]) => void
  },
  AndroidApi: {
    invoke: (method: string, ...args: unknown[]) => void
  }
  webkit: {
    messageHandlers: {
        iOSApi: {
            postMessage: ({ eventName: string, args: any }) => void
        }
    }
  }
  [key: string]: unknown
}

declare module 'chimee-mobile-player' {
  export default class ChimeeMobilePlayer extends HTMLVideoElement {
    public constructor(options: ChimeeMobileOptions);
    public isFullscreen: boolean;
    public $container: HTMLElement;
    public $video: HTMLVideoElement;
    public on: (type: string, callback: (v?: any) => void) => void;
    public pause: () => void;
    public unuse: (pluginName: string) => void;
    public destroy: () => void;
    public static install: (plugin: any) => void;
    public static uninstall: (pluginName: string) => void;
  }

  export interface ChimeeMobileOptions {
    wrapper: string;
    src?: string;
    autoplay?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    preload?: 'auto';
    x5VideoPlayerFullscreen?: boolean;
    x5VideoOrientation?: 'landscape|portrait' | 'landscape' | 'portrait';
    x5VideoPlayerType?: 'h5';
    xWebkitAirplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    poster?: string;
    plugin?: {
        name: string;
        [key: string]: unknown;
    }[]
  }
}
