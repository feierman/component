<template>
  <div class="tabs-container">
    <!-- 标签页头部 -->
    <div class="tabs-header">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :class="['tab-item', { active: activeTab === index }]"
        @click="switchTab(index)"
      >
        {{ tab.label }}
      </div>
    </div>
    <!-- 标签页内容 -->
    <div class="tabs-content">
      <slot v-if="tabs.length && tabs[activeTab]" :name="tabs[activeTab].slotName" />
      <div v-else class="no-content">暂无内容</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 * 定义 Tab 接口
 */
interface Tab {
  id: string // 唯一标识
  label: string // 标签显示文本
  slotName: string // 对应插槽名称
}

/**
 * 定义 props
 */
const props = defineProps<{
  tabs: Tab[] // 标签页数据，必填
}>()

/**
 * 当前激活的标签页索引
 */
const activeTab = ref(0)

/**
 * 监听 tabs 变化，确保 activeTab 有效
 */
watch(
  () => props.tabs,
  (newTabs) => {
    if (!newTabs || newTabs.length === 0) {
      activeTab.value = 0
    } else if (activeTab.value >= newTabs.length) {
      activeTab.value = newTabs.length - 1
    }
  },
  { immediate: true }
)

/**
 * 切换标签页
 * @param index 目标标签页索引
 */
const switchTab = (index: number) => {
  if (index >= 0 && index < props.tabs.length) {
    activeTab.value = index
  }
}
</script>

<style scoped lang="scss">
.tabs-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.tabs-header {
  display: flex;
}

.tab-item {
  padding: $spacing-xs ;
  cursor: pointer;
  font-size: $font-size-base;
  color: $text-primary;
  transition: all 0.3s ease ;
}

.tab-item:hover {
  color: $primary;
}

.tab-item.active {
  color: $primary;
  border-bottom: 2px solid $primary;
}

.tabs-content {
  padding: $spacing-sm;
  border-radius: 0 0 8px 8px;
}

.no-content {
  @include flex-center;
  height: 369px;
  color: $bg-dark-lighter-5;
  text-align: center;
  overflow: hidden;
}
</style>