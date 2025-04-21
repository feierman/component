<template>
  <a-layout class="container" >
    <a-layout-header class="a-layout-header" > <Header /></a-layout-header>
    <a-layout-content> <router-view /></a-layout-content>

  </a-layout>
  
</template>

<script setup lang="ts">
import Header from "@/components/header/Header.vue";
</script>

<style scoped lang="scss">
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
