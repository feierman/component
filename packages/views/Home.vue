<script setup lang="ts">

import Carousel from "../components/carousel/Carousel.vue";
import Tabs from "../components/tabs/Tabs.vue";

</script>

<template>
  <a-layout-content class="a-layout-content">
    <Carousel />
    <!-- 轮播图下方的 Tabs 组件 -->
    <div class="tabs">
      <Tabs  />
    </div>
  </a-layout-content>
</template>

<style scoped lang="scss">
@use '@/theme/src/index.scss' as *;
.a-layout-content{
  margin:  10px auto;
}
.tabs{
  @include flex-center;
  margin-top: $spacing-sm;
}
</style>