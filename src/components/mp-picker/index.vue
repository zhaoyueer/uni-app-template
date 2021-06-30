<template>
  <popup
    @close="handleClose"
    :maskCloseable="maskCloseable"
    :externalClass="classNames"
    :visible="visible"
  >
    <view class="picker-header">
      <text class="cancel" @click="handleCancel">取消</text>
      <text class="confirm" @click="handleConfirm">{{ confirmText }}</text>
    </view>
    <picker-view
      v-if="visible"
      :style="{
        '--height': realHeight,
        '--item-height': realItemHeight,
      }"
      indicator-class="indicator-class"
      class="picker-view"
      :value="value"
      @change="handleChange"
    >
      <picker-view-column
        class="picker-column"
        :style="{ '--font-color': selectedFontColor }"
        v-for="(rangeItem, index) in range"
        :key="index"
      >
        <view
          class="picker-column-item"
          :class="{ 'z-selected': currentValue[index] === columnIndex }"
          v-for="(item, columnIndex) in rangeItem"
          :key="columnIndex"
        >
          {{ getItemShow(item) }}
        </view>
      </picker-view-column>
    </picker-view>
  </popup>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import Popup from '@/components/popup/index.vue';
import { Options } from '@/utils/vue-decorator';

@Component({
  components: {
    Popup,
  },
})
@Options({
  styleIsolation: 'shared',
})
export default class Modal extends Vue {
  @Prop(Boolean)
  visible!: boolean;

  @Prop({ type: Boolean, default: true })
  maskCloseable!: boolean;

  @Prop(Boolean)
  confirmFooter!: boolean;

  @Prop(String)
  externalClass!: string;

  @Prop({ type: String, default: '确定' })
  confirmText!: string;

  /**
   * 选中的文字颜色
   */
  @Prop({ type: String, default: '#202B43' })
  selectedFontColor!: string;

  @Prop(Array)
  range!: string[][] | number[][];

  @Prop(String)
  rangeKey!: string;

  @Prop({ type: Number, default: 400 })
  height!: number;

  /**
   * 行高
   */
  @Prop({ type: Number, default: 120 })
  itemHeight!: number;

  @Prop(Array)
  value!: number[];

  currentValue: number[] = this.value;

  get classNames() {
    return (
      'component-mp-picker' +
      (this.externalClass ? ` ${this.externalClass}` : '')
    );
  }

  get realHeight() {
    return `${uni.upx2px(this.height)}px`;
  }

  get realItemHeight() {
    return `${uni.upx2px(this.itemHeight)}px`;
  }

  @Watch('visible')
  handleWatchVisible(newVal: boolean) {
    if (newVal) {
      this.currentValue = this.value;
    }
  }

  getItemShow(item: string | number | Record<string, unknown>) {
    if (typeof item === 'object') {
      return item[this.rangeKey] as string | number;
    }
    return item;
  }

  handleChange(e: { detail: { value: number[] } }) {
    this.currentValue = e.detail.value;
    this.$emit('change', e);
  }

  handleClose() {
    if (!this.maskCloseable) {
      return;
    }
    this.$emit('close');
  }

  handleConfirm() {
    this.$emit('confirm', this.currentValue);
  }

  handleCancel() {
    this.$emit('cancel');
  }
}
</script>

<style lang="less">
.component-mp-picker {
  background: #fff;

  .picker-header {
    height: 112rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32rpx;
    padding: 0 40rpx;

    .cancel {
      color: #b5b7bc;
    }
  }

  .picker-view {
    height: var(--height);
  }
  .picker-column {
    font-size: 36rpx;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      &.z-selected {
        color: var(--font-color);
      }
    }
  }
  /deep/ .indicator-class {
    height: var(--item-height);
    background-color: #f5f7f8;
    z-index: 0; // 否则会覆盖字体
  }
}
</style>
