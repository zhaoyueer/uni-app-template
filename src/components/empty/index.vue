<template>
  <view class="component-empty">
    <webp-image :src="img.src" :width="img.width" :height="img.height" center />
    <text class="desc">{{ desc }}<slot></slot></text>
    <button @click="handleReload" v-if="showReloadBtn" class="btn reload-btn">
      {{ btnText }}
    </button>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import WebpImage from '@/components/webp-image/index.vue';

@Component({
  components: {
    WebpImage,
  },
})
export default class Empty extends Vue {
  @Prop(String)
  desc!: string;

  @Prop({
    type: Object,
    default() {
      return {
        src: 'https://sprout.llscdn.com/54a9f5edc68eed37e88c34e408fc6bf8.png',
        width: 275,
        height: 150,
      };
    },
  })
  img!: {
    src: string;
    width: number;
    height: number;
  };

  @Prop(Boolean)
  showReloadBtn!: boolean;

  @Prop({
    type: String,
    default: '刷新',
  })
  btnText!: string;

  @Emit('reload')
  handleReload() {}
}
</script>

<style lang="less">
.component-empty {
  .desc {
    margin-top: 30rpx;
    color: #b5b7bc;
    font-size: 32rpx;
    display: block;
    text-align: center;
  }

  .btn {
    margin: 40rpx auto 0;
    width: 428rpx;
    border-radius: 64rpx;
    height: 108rpx;
    line-height: 108rpx;
    font-size: 40rpx;
    color: #fff;
    background: #7444ff;
  }
}
</style>
