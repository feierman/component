<template>
<a-row>
  <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24">
    <a-carousel :dot-position="dotPosition" autoplay :dots="false">
      <router-link to="/" class="carousel-item" >
      <img src="https://images.pexels.com/photos/4847335/pexels-photo-4847335.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="">
      </router-link>
      <router-link to="/" class="carousel-item" >
        <img src="https://images.pexels.com/photos/4847335/pexels-photo-4847335.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="">
      </router-link>
    </a-carousel>
  </a-col>
</a-row>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {  CarouselProps } from 'ant-design-vue';
const dotPosition = ref<CarouselProps['dotPosition']>('right');

</script>
<style scoped lang="scss">
@use '@/theme/src/common/index' as *;
.carousel-item{
  height: 140px;
  img{
    //图像自适应
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>
