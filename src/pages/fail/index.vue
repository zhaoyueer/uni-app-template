<template>
  <view class="page-fail">
    <empty
      desc="网络开小差了，请刷新重试！"
      showReloadBtn
      btnText="重新加载"
      @reload="handleReload"
    />
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Empty from '@/components/empty/index.vue';
import { namespace } from 'vuex-class';
import { UPDATED_JUMPED } from '@/store/modules/global';

const globaModule = namespace('global');

@Component({
  components: {
    Empty,
  },
})
export default class Fail extends Vue {
  redirectUrl = '/pages/home/index';
  @globaModule.Mutation(UPDATED_JUMPED) updateJumped!: (
    payload: boolean,
  ) => void;

  onLoad(query: { redirectUrl: string }) {
    if (query.redirectUrl) {
      this.redirectUrl = decodeURIComponent(query.redirectUrl);
    }
  }

  onHide() {
    this.updateJumped(false);
  }

  onUnload() {
    this.updateJumped(false);
  }

  handleReload() {
    this.updateJumped(false);
    // #ifdef MP-WEIXIN
    if (
      this.redirectUrl.includes('/pages/home/index') ||
      this.redirectUrl.includes('/pages/worktable/index')
    ) {
      uni.switchTab({
        url: this.redirectUrl,
      });
    } else {
      uni.redirectTo({
        url: this.redirectUrl,
      });
    }
    // #endif
    // #ifdef H5
    uni.redirectTo({
      url: this.redirectUrl,
    });
    // #endif
  }
}
</script>

<style lang="less">
.page-fail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .component-empty {
    .btn.reload-btn {
      margin-top: 68rpx;
    }
  }
}
</style>
