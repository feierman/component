<!--路径 src/App.vue-->
<template>
<Loading v-if="isLoading" />
<DefaultLayout v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DefaultLayout from './layouts/Default.vue'
import Loading from "@/components/Loading.vue";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<style scoped lang="scss">

</style>