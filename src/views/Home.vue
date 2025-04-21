<script setup lang="ts">
import Carousel from "../components/carousel/Carousel.vue";
import TabsMain from "../components/tabs/TabsMain.vue";


</script>

<template>
  <a-layout-content class="a-layout-content">
    <Carousel />
    <!-- 轮播图下方的 TabsMain 组件 -->
    <div class="tabs">
      <TabsMain  />
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
@media screen and (max-width: 768px) {
  .tabs{
    margin-top: $spacing-xs;
  }
}
</style>