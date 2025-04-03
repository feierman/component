<template>
  <a-carousel :dot-position="dotPosition" autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type {  CarouselProps } from 'ant-design-vue';
const dotPosition = ref<CarouselProps['dotPosition']>('right');

</script>
<style scoped lang="scss">
@use '@/theme/src/common/index' as *;
:deep(.slick-slide) {
  text-align: center;
  height: 150px;
  line-height: 150px;
  background: $fill-base;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: $text-primary;
}
</style>
