<template>
  <div class="tabs">
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
const tabs = ref<Tab[]>([
  {
    key: 'tab1',
    title: '线路查询',
    icon: 'iconfont icon-xianluchaxun01',
    content: Search,
  },
  {
    key: 'tab2',
    title: '公司查询',
    icon: 'iconfont icon-dingdan',
    content:Search,
  },
  {
    key: 'tab3',
    title: '快运查询',
    icon: 'iconfont icon-kefu',
    content: Search
  },
]);

// 当前激活的 tab
const activeKey = ref<string>('tab1');

// 切换 tab
const switchTab = (tabId: string, index: number) => {
  activeKey.value = tabId;
  console.log(`点击了第 ${index + 1} 个tab`);
};
</script>

<style scoped>
.tabs {
  width: 800px;
  height: 220px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #1677ff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}

.tabs-header {
  height: 60px;
  width: 100%;
  background-color: #1677ff;
  border-radius: 16px 16px 0 0;
  cursor: pointer;
}

.tabs-header-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #fff;

}

.tabs-header-item.active {
  opacity: 1;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  box-shadow: 12px 12px 0 0 #fff, -12px 12px 0 0 #fff;
  color: #1677ff;
}

.tabs-header-item.active::before {
  content: '';
  position: absolute;
  left: -12px;
  bottom: 0;
  width: 12px;
  height: 100%;
  border-radius: 0 0 16px 0;
  background: #1677ff;
}

.tabs-header-item.active::after {
  content: '';
  position: absolute;
  right: -12px;
  bottom: 0;
  width: 12px;
  height: 100%;
  border-radius: 0 0 0 16px;
  background: #1677ff;
}

.tabs-content {
  height: 200px;
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 16px 16px;
}

.tab-pane {
  display: none;
  height: calc(100% - 60px);
  padding: 20px;
  width: 100%;
  text-align: center;
}

.tab-pane.active {
  display: block;
}

/* 图标和文字间距 */
.tabs-header-item i {
  margin-right: 8px;
}
</style>