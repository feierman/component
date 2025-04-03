<script setup lang="ts">

import Carousel from "../components/carousel/Carousel.vue";
import Tabs from "../components/tabs/Tabs.vue";

</script>

<template>
  <a-layout-content class="a-layout-content">
    <Carousel />
    <!-- 轮播图下方的 Tabs 组件 -->
    <div class="below-carousel">
      <Tabs  />
    </div>
  </a-layout-content>
</template>

<style scoped lang="scss">
.a-layout-content{
  margin:  10px auto;
}
.below-carousel{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>