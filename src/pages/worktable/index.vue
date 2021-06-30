<template>
  <view class="page-worktable" :style="{ '--bar-height': `${safeTop}px` }">
    worktable page
  </view>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import TabBar, { TabBarKey } from '@/mixins/tabBar';
import SafeTop from '@/mixins/safeTop';

@Component
export default class Worktable extends Mixins(TabBar, SafeTop) {
  onShow() {
    this.setTabBar(TabBarKey.worktable);
  }
}
</script>

<style lang="less" scoped>
.page-worktable {
  height: 100vh;
  padding-top: var(--bar-height);
}
</style>
