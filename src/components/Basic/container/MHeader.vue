<!--路径 /src/components/Basic/container/MHeader.vue-->

<!-- 组件模板 -->
<template>
  <!-- 头部容器，使用 header 标签，动态绑定高度 -->
  <header class="m-header" :style="{ height }">
    <!-- 默认插槽，用于插入头部内容 -->
    <slot></slot>
  </header>
</template>

<!-- 组件逻辑 -->
<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

/**
 * 设置组件选项
 * - name: 设置组件名称为 MHeader，用于父组件（如 m-container）动态检测
 */
defineOptions({
  name: 'MHeader',
});

/**
 * 定义组件的 Props
 * @prop {String} height - 头部的高度，默认值为 '60px'，支持自定义
 */
defineProps({
  height: {
    type: String,
    default: '60px',
  },
});
</script>

<!-- 组件样式 -->
<style lang="scss" scoped>
/**
 * 头部样式
 * - display: flex; 使用 Flexbox 布局，使内容可以水平排列
 * - align-items: center; 垂直居中对齐子元素
 * - height: 通过 v-bind 动态绑定 height prop，实现高度可配置
 * - background-color: 使用 $gray-100 变量设置背景色，需在项目中定义
 * - padding: 使用 $space-1 变量设置内边距，需在项目中定义
 */
.m-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind(height);
  background-color: $primary-light-5;
  padding: $space-1;
}
</style>