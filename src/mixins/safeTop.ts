import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SafeTop extends Vue {
  safeTop = 0;
  created() {
    // #ifdef MP-WEIXIN
    this.safeTop = uni.getSystemInfoSync().statusBarHeight;
    // #endif
  }
}
