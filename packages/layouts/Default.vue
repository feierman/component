<template>
  <a-layout class="container" >
    <a-layout-header class="a-layout-header" > <Header /></a-layout-header>
    <a-layout-content> <router-view /></a-layout-content>

  </a-layout>
  
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import Header from "@/components/header/Header.vue";
</script>

<style scoped lang="scss">
@use '../theme/src/common/index' as *;
  .container{
    height: 100vh;
    background: $bg-base;
    //  禁止选中
    user-select: none !important;
  }
  .a-layout-header,.a-layout-footer{
    background: $bg-base;

  }
</style>
