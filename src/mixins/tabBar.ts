import Vue from 'vue';
import Component from 'vue-class-component';

export enum TabBarKey {
  'home' = 'home',
  'worktable' = 'worktable',
}

@Component
export default class TabBar extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $mp!: any;

  setTabBar(key: TabBarKey) {
    if (
      typeof this.$mp.page.getTabBar === 'function' &&
      this.$mp.page.getTabBar()
    ) {
      this.$mp.page.getTabBar().setData({
        selected: key,
      });
    }
  }
}
