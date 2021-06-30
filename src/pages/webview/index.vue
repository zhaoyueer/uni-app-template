<template>
  <web-view :src="url" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class WebView extends Vue {
  url = '';
  auth = false;
  onLoad(query: { url: string }) {
    this.setUrl(query.url);
  }

  setUrl(url: string) {
    url = decodeURIComponent(url || '');

    this.url = url;
  }
}
</script>
