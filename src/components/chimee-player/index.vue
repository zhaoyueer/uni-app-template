<template>
  <view
    class="component-chimee-player"
    :class="{ 'center-play-btn': showCenterPlayBtn }"
    :id="videoId"
  ></view>
</template>

<script lang="ts">
/**
 * h5 video组件
 */
// #ifdef H5
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import '@/npm-lib/chimee-mobile-player/style.css';
import ChimeeMobilePlayer, { ChimeeMobileOptions } from 'chimee-mobile-player';

type ObjectFit = 'fill' | 'cover' | 'contain' | 'scale-down';
export type ChimeeOptions = Omit<ChimeeMobileOptions, 'wrapper' | 'controls'>;

@Component
export default class ChimeePlayer extends Vue {
  @Prop(Object)
  options!: ChimeeOptions;

  @Prop(String)
  videoId!: string;

  @Prop(Boolean)
  controls!: boolean;

  @Prop({ type: String, default: 'fill' })
  objectFit!: ObjectFit;

  @Prop({ type: String, default: 'chimee-player-container' })
  containerClassName!: '';

  @Prop({ type: String, default: 'chimee-player-video' })
  videoClassName!: '';

  /**
   * 是否显示中间播放图标
   */
  @Prop({ type: Boolean, default: true })
  showCenterPlayBtn!: boolean;

  /**
   * 是否显示视频中间的状态图标
   */
  @Prop({ type: Boolean, default: true })
  chimeeState!: boolean;

  chimeePlayer?: ChimeeMobilePlayer = undefined;

  mounted() {
    this.initPlayer();
  }

  @Watch('controls')
  handleWatchControls(newVal: boolean) {
    if (this.chimeePlayer) {
      this.chimeePlayer.controls = newVal;
    }
  }

  @Watch('objectFit')
  handleWatchObjectFit(newVal: ObjectFit) {
    if (this.chimeePlayer) {
      this.chimeePlayer.$video.style.objectFit = newVal;
    }
  }

  @Watch('options')
  handleWatchOptions() {
    this.chimeePlayer?.destroy();
    this.initPlayer();
  }

  initPlayer() {
    const { poster, ...others } = this.options;
    this.chimeePlayer = new ChimeeMobilePlayer({
      wrapper: `#${this.videoId}`,
      ...others,
      poster,
      controls: this.controls,
    });
    this.$emit('init-player', this.chimeePlayer);
    if (!this.chimeeState) {
      this.chimeePlayer.unuse('chimeeState');
    }
    // 下方控制器蒙层, 以免视频背景色与控制器时间文案颜色相近
    const maskEL = document.createElement('div');
    maskEL.className = 'video-control-mask';
    this.chimeePlayer.$container.appendChild(maskEL);
    this.chimeePlayer.on('barShow', () => {
      maskEL.style.display = 'block';
    });
    this.chimeePlayer.on('barHide', () => {
      maskEL.style.display = 'none';
    });

    let coverEl: HTMLDivElement | null = null;
    if (poster) {
      // 封面图单独处理, video本身封面图兼容性不好
      coverEl = document.createElement('div');
      coverEl.className = 'video-cover';
      coverEl.style.backgroundImage = `url(${poster})`;
      this.chimeePlayer.$container.appendChild(coverEl);
    }
    this.chimeePlayer.$video.style.objectFit = this.objectFit;
    this.chimeePlayer.$video.className = this.videoClassName;
    this.chimeePlayer.$container.className = this.containerClassName;
    this.chimeePlayer.on('play', () => {
      if (coverEl) {
        coverEl.style.display = 'none';
      }
      this.$emit('play');
    });

    this.chimeePlayer.on('pause', () => {
      this.$emit('pause');
    });

    this.chimeePlayer.on('ended', () => {
      this.$emit('ended');
    });

    this.chimeePlayer.on('fullscreenchange', () => {
      if (this.chimeePlayer?.isFullscreen) {
        this.chimeePlayer?.$container.classList.add('fullscreen');
        this.$emit('fullscreenchange', {
          detail: { fullScreen: true },
        });
      } else {
        this.chimeePlayer?.$container.classList.remove('fullscreen');
        this.$emit('fullscreenchange', {
          detail: { fullScreen: false },
        });
      }
    });
  }
}
// #endif
</script>

<style lang="less" scoped>
// #ifdef H5
.component-chimee-player {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;

  &.center-play-btn {
    /deep/ chimee-state.play {
      chimee-state-play {
        display: inline-block;
      }
    }
  }

  /deep/ chimee-state.play {
    chimee-state-play {
      display: none;
    }
  }

  /deep/ chimee-control {
    left: 15px;
    bottom: 11px;
    right: 12px;
    height: 44px;
    width: auto;
    background: transparent !important;

    &.pause {
      chimee-control-state {
        background-image: url(https://cdn.llscdn.com/misc/video-pause-3d868791e21b59eb0d05f62fb08f2cf6.png);
      }
    }
    chimee-control-wrap {
      height: 100%;
      background: transparent;
      align-items: center;

      chimee-current-time {
        font-size: 14px;
        line-height: 1.5;
        height: auto;
        width: 36px;
        background: transparent !important;
        font-family: FZY4JW, 'PingFang SC', 'Helvetica Neue', 'Helvetica',
          'STHeitiSC-Light', 'Arial', sans-serif;
      }

      chimee-progressbar {
        margin: 0 14px;
        height: 40px;

        .chimee-progressbar-line {
          top: 50%;
          transform: translateY(-50%);
          height: 8px;
        }

        chimee-progressbar-bg {
          border-radius: 9px;
          opacity: 0.3;
          background: #ffffff;
        }

        chimee-progressbar-buffer {
          background: #ffbe00;
          border-radius: 9px;
        }

        chimee-progressbar-all {
          background: #ffbe00;

          chimee-progressbar-ball {
            width: 18px;
            height: 18px;
            top: -7px;
            right: -12px;
            border-radius: 50%;
            border: 2px solid #fff;
            background: #ffb400;
          }
        }
      }

      chimee-control-state {
        width: 38px;
        height: 38px;
        flex-basis: 38px;
        margin-right: 11px;
        background: url(https://cdn.llscdn.com/misc/video-play-d00ab6aa6f53226afbd20cb600083e38.png)
          no-repeat;
        background-size: cover;
        svg {
          display: none;
        }
      }

      chimee-total-time {
        font-size: 14px;
        line-height: 1.5;
        height: auto;
        font-family: FZY4JW, 'PingFang SC', 'Helvetica Neue', 'Helvetica',
          'STHeitiSC-Light', 'Arial', sans-serif;
      }

      chimee-screen {
        flex-basis: 28px !important;
        height: 28px !important;
        margin-left: 8px !important;
        chimee-screen-full,
        chimee-screen-small {
          width: 28px !important;
          height: 28px !important;
          background: url(https://cdn.llscdn.com/misc/fullscreen-5e61444b26bdc5d66c0accf9eb49aca9.png)
            no-repeat;
          background-size: cover;
          svg {
            display: none;
          }
        }
      }
    }
  }

  /deep/ .video-control-mask {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 72px;
    background: url(https://cdn.llscdn.com/misc/cover-mask-62be76a5a7e76071b8e65c46c87767d0.png)
      no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    border-radius: 0 0 14px 14px;
  }

  /deep/ .video-cover {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
}
// #endif
</style>
