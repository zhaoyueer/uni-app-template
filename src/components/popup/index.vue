<template>
  <view
    class="component-popup"
    :class="[
      { 'popup-show': visible },
      `popup-${position}`,
      externalClass,
      {
        'component-popup-pad': isPadDisplay,
      },
    ]"
    @touchmove.stop="catchTouchMove"
  >
    <view class="component-popup-mask" @tap="handleClose"></view>
    <view
      class="component-popup-container"
      :class="{ container100: position === 'top' || position === 'bottom' }"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Popup extends Vue {
  @Prop({ type: String, default: 'bottom' })
  position!: 'bottom' | 'top' | 'left' | 'right';

  @Prop(Boolean)
  visible!: boolean;

  @Prop(Boolean)
  isPadDisplay!: boolean;

  @Prop(String)
  externalClass!: string;

  @Prop({ type: Boolean, default: true })
  maskCloseable!: boolean;

  handleClose() {
    if (!this.maskCloseable) return;
    this.$emit('close');
  }

  catchTouchMove() {
    return;
  }
}
</script>

<style lang="less">
.component-popup {
  &.component-popup-pad {
    .component-popup-container.container100 {
      left: 50%;
      width: 750rpx;
      transform: translate3d(-50%, 100%, 0);
    }
    &.popup-show {
      .component-popup-container.container100 {
        transform: translate3d(-50%, 0, 0);
      }
    }
  }
  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.78);
    display: none;
  }
  &-container {
    position: fixed;
    left: 50%;
    top: 50%;
    background: #fff;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center;
    transition: all 0.4s ease;
    z-index: 101;
    opacity: 0;
  }
  .container100 {
    width: 100%;
  }
  &.popup-show .component-popup-container {
    opacity: 1;
  }
  &.popup-show .component-popup-mask {
    display: block;
  }
  &.popup-left .component-popup-container {
    left: 0;
    top: 0;
    transform: translate3d(-100%, 0, 0);
  }
  &.popup-show.popup-left .component-popup-container {
    transform: translate3d(0, 0, 0);
    top: 0;
    height: 100%;
  }
  &.popup-right .component-popup-container {
    right: 0;
    top: 0;
    left: auto;
    transform: translate3d(100%, 0, 0);
    height: 100%;
  }
  &.popup-show.popup-right .component-popup-container {
    transform: translate3d(0, 0, 0);
  }
  &.popup-bottom .component-popup-container {
    top: auto;
    left: 0;
    bottom: 0;
    transform: translate3d(0, 100%, 0);
    border-top-left-radius: 48rpx;
    border-top-right-radius: 48rpx;
  }
  &.popup-show.popup-bottom .component-popup-container {
    transform: translate3d(0, 0, 0);
  }
  &.popup-top .component-popup-container {
    top: 0;
    left: auto;
    transform: translate3d(0, -100%, 0);
  }
  &.popup-show.popup-top .component-popup-container {
    transform: translate3d(0, 0, 0);
  }
}
</style>
