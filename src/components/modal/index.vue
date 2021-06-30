<template>
  <view
    @click="handleClose"
    class="component-modal"
    :class="[{ 'z-show': visible }, externalClass]"
    @touchmove.stop="catchTouchMove"
  >
    <view class="component-modal-box">
      <slot></slot>
      <view v-if="confirmFooter" class="confirm-footer">
        <button @click="handleCancel" class="btn-cancel btn">
          {{ leftBtnTxt }}
        </button>
        <button @click="handleConfirm" class="btn-confirm btn">
          {{ rightBtnTxt }}
        </button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop(Boolean)
  visible!: boolean;

  @Prop(Boolean)
  maskCloseable!: boolean;

  @Prop(Boolean)
  confirmFooter!: boolean;

  @Prop(String)
  externalClass!: string;

  @Prop({ type: String, default: '取消' }) leftBtnTxt!: string;
  @Prop({ type: String, default: '确认' }) rightBtnTxt!: string;

  handleClose() {
    if (!this.maskCloseable) {
      return;
    }
    this.$emit('close');
  }

  handleConfirm() {
    this.$emit('confirm');
  }

  handleCancel() {
    this.$emit('cancel');
  }

  catchTouchMove() {
    return;
  }
}
</script>

<style lang="less">
.component-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.78);
  transform: scale3d(1, 1, 0);
  transition: all 0.3s ease-in;
  opacity: 0;

  &.z-show {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }

  &-box {
    width: 616rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 48rpx;
    padding: 88rpx 32rpx 28rpx;
  }

  .confirm-footer {
    display: flex;
    justify-content: space-between;
    .btn {
      background: #7444ff;
      border-radius: 62rpx;
      font-size: 36rpx;
      width: 256rpx;
      height: 108rpx;
      line-height: 108rpx;

      &.btn-cancel {
        background: #f1f3f9;
        color: #788295;
      }

      &.btn-confirm {
        background: #7444ff;
        color: #fff;
      }
    }
  }
}
</style>
