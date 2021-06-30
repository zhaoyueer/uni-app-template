<template>
  <view v-if="loadingImg">
    <image
      v-show="isLoad"
      :src="url"
      :mode="mode"
      :lazy-load="lazyLoad"
      :show-menu-by-longpress="showMenuByLongpress"
      class="component-webp-image"
      :class="[{ 'z-center': center, 'load-success': isLoad }, externalClass]"
      :style="imageStyle"
      @error="handleError"
      @load="handleLoad"
      @click="handleClick"
    ></image>
    <image
      v-if="!isLoad"
      :src="loadingImg"
      :mode="mode"
      class="component-webp-image"
      :class="[{ 'z-center': center }, externalClass]"
      :style="imageStyle"
    ></image>
  </view>
  <image
    v-else
    :src="url"
    :mode="mode"
    :lazy-load="lazyLoad"
    :show-menu-by-longpress="showMenuByLongpress"
    class="component-webp-image"
    :class="[{ 'z-center': center }, externalClass]"
    :style="imageStyle"
    @error="handleError"
    @load="handleLoad"
    @click="handleClick"
  ></image>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class WebpImage extends Vue {
  @Prop({ type: String, required: true })
  src!: string;

  @Prop(Number)
  width!: number;

  @Prop(Number)
  height!: number;

  @Prop({ type: Boolean, default: true })
  webp!: boolean;

  @Prop({ type: Boolean, default: false })
  lazyLoad!: boolean;

  @Prop({ type: String, default: 'scaleToFill' })
  mode!: string;

  @Prop({ type: Boolean, default: false })
  center!: boolean;

  @Prop(String)
  externalClass!: string;

  @Prop(Boolean)
  showMenuByLongpress!: boolean;

  @Prop(String)
  loadingImg!: string;

  loadError = false;
  isLoad = false;

  get url() {
    if (this.webp && !this.loadError && this.src) {
      return `${this.src}?imageMogr2/format/webp`;
    }
    return this.src;
  }

  get imageStyle() {
    let style = [];
    if (this.width) {
      const width = `${uni.upx2px(this.width)}px`;
      style.push(`width:${width}`);
    }
    if (this.height) {
      const height = `${uni.upx2px(this.height)}px`;
      style.push(`height:${height}`);
    }
    return style.join(';');
  }

  @Watch('src')
  handleWatchSrc() {
    this.loadError = false;
  }

  @Emit('error')
  handleError() {
    this.loadError = true;
  }

  handleLoad() {
    if (this.loadingImg) {
      this.isLoad = true;
      this.$nextTick(() => {
        this.$emit('load');
      });
    } else {
      this.$emit('load');
    }
  }

  @Emit('click')
  handleClick() {}
}
</script>

<style lang="less">
.component-webp-image {
  display: block;
  width: 100%;
  height: 100%;

  &.load-success {
    animation: op 0.5s ease-out;

    @keyframes op {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 100;
      }
    }
  }
  &.z-center {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
