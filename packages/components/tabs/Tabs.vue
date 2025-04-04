<template>
  <div class="nav-tabs">
    <a-row class="tabs-header">
      <a-col
          v-for="(tab, index) in tabs"
          :key="tab.key"
          :span="8"
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
			  :class="['tab-pane', { active: activeKey === tab.key }]"
		  >
			          <component :is="tab.content"></component>
		  </a-col>
	  </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Search from '@/components/searchs/Search.vue'
// 定义 Tab 数据类型
interface Tab {
  key: string;
  title: string;
  icon: string; // 图标类名
  content: any; // 内容
}

// 定义 tabs 数据
const tabs = [
  {
    key: 'tab1',
    title: '线路查询',
    icon: 'iconfont icon-xianluchaxun1',
    content: Search,
  },
  {
    key: 'tab2',
    title: '公司查询',
    icon: 'iconfont icon-gongsichaxun',
    content:Search,
  },
  {
    key: 'tab3',
    title: '快运查询',
    icon: 'iconfont icon-jiaotongyunshu1',
    content: Search
  },
];

// 当前激活的 tab
const activeKey = ref<string>('tab1');

// 切换 tab
const switchTab = (tabId: string, index: number) => {
  activeKey.value = tabId;
  console.log(`点击了第 ${index + 1} 个tab`);
};
</script>

<style scoped lang="scss">
@use 'index.scss' as *;
</style>