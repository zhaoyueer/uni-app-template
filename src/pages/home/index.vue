<template>
  <view class="page-home" :style="{ '--bar-height': `${safeTop}px` }">
    <view class="text">home page</view>
  </view>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import SafeTop from '@/mixins/safeTop';

@Component({
  components: {},
})
export default class Home extends Mixins(SafeTop) {}
</script>

<style lang="less">
.page-home {
  height: 100vh;
  padding-top: var(--bar-height);
}
</style>
