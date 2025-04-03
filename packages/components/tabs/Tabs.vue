<template>
  <div class="nav-tabs">
    <a-row class="tabs-header">
      <a-col
        v-for="(tab, index) in tabs"
        :key="index"
        class="tabs-header-item"
        :class="{ active: activeIndex === index }"
        @click="changeTab(index)"
       
      >
        <i v-if="tab.icon" :class="tab.icon"></i>
        {{ tab.title }}
      </a-col>
    </a-row>
    <a-row class="tabs-content">
      <a-col v-if="tabs[activeIndex]" :span="24">
        <component :is="tabs[activeIndex]?.content" :key="activeIndex" v-if="tabs[activeIndex]" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref,onUpdated } from 'vue';
import Search from "@/components/searchs/Search.vue";
interface Tab {
  title: string;
  content: string | any;
  icon?: string;
}

const tabs: Tab[] = [
  { title: '物流查询', content: Search, icon: 'iconfont icon-jiaotongyunshu' },
  { title: '公司查询', content: '', icon: 'iconfont icon-shangjiaruzhu'},
  { title: '快运查询', content: Search,icon: 'iconfont icon-jiaotongyunshu1' },
];

const activeIndex = ref(0);

const changeTab = (index: number) => {
  console.log('切换到标签页:', index);
  activeIndex.value = index;
  console.log('activeIndex:', activeIndex.value);
  
};


</script>

<style scoped lang="scss">
@use 'index' as *;
</style>