<script lang="ts">
export default {
  mpType: 'app',

  onLaunch() {
    wx.loadFontFace({
      global: true,
      family: 'FZY4JW',
      source:
        'url("https://cdn.llscdn.com/sprout/FZY4JW-6690ac921c340133415833f946589172.woff")',
    });
  },
};
</script>

<style lang="less">
/*每个页面公共css */

/*  #ifdef  H5  */
@font-face {
  font-family: 'FZY4JW';
  font-display: swap;
  src: url('https://cdn.llscdn.com/sprout/FZY4JW-6690ac921c340133415833f946589172.woff');
}
/** 去掉uni shadow-gray图片获取 h5下方无tab */
body::after {
  content: none;
}
/*  #endif  */

view,
cover-view {
  box-sizing: border-box;
  font-family: 'FZY4JW', 'PingFang SC', sans-serif;
}

view[hidden],
image[hidden] {
  display: none !important;
}

page {
  font-family: 'FZY4JW', 'PingFang SC', sans-serif;
  font-size: 28rpx;
  line-height: 1.5;
  color: #202b43;
}

button {
  padding: 0;
  margin: 0;
  &::after {
    // 处理按钮上下的黑边
    border: none;
  }
}
</style>
