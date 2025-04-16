<template>
  <div class="nav-tabs">
    <a-row class="tabs-header">
      <a-col
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :xs="8" :sm="8" :md="8" :lg="8" :xl="8"
        :data-tab="tab.key"
        :class="['tabs-header-item', { active: activeKey === tab.key }]"
        @click="switchTab(tab.key, index)"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.title }}</span>
      </a-col>
    </a-row>
    <a-row class="tabs-content">
      <a-col
        v-for="tab in tabs"
        :key="tab.key"
        :id="tab.key"
        :span="24"
        class="tab-pane"
        v-show="activeKey === tab.key"
      >
        <component :is="tab.content" :start-city="startPoint" :key="tab.key" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Search from '@/components/searchs/Search.vue';
import Gongsi from '@/components/searchs/Gongsi.vue';
// import { fetchStartPoint } from '@/api/amap';
import { useCityStore } from '@/stores';


interface Tab {
  key: string;
  title: string;
  icon: string;
  content: any;
}

const tabs : Tab[] = [
  { key: 'tab1', title: '线路查询', icon: 'iconfont icon-xianluchaxun1', content: Search },
  { key: 'tab2', title: '公司查询', icon: 'iconfont icon-gongsichaxun', content: Gongsi },
  { key: 'tab3', title: '快运查询', icon: 'iconfont icon-jiaotongyunshu1', content: Search },
];

const activeKey = ref<string>('tab1');
const cityStore = useCityStore();
const startPoint = ref<string>(cityStore.city);


const switchTab = async (key: string, index: number) => {
  activeKey.value = key;
  console.log(`切换到选项卡： ${key}`);
  if (key === 'tab1' || key === 'tab3') {
    startPoint.value = await cityStore.fetchStartPoint();
  }
};

onMounted(async () => {
  console.log('组件安装。正在加载 tab1 的初始数据...');
  startPoint.value = await cityStore.fetchStartPoint();
});
</script>

<style scoped lang="scss">
@use 'index.scss' as *;
</style>