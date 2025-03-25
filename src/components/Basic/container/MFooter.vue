<!--路径 /src/components/Basic/container/MFooter.vue-->

<!-- 组件模板 -->
<template>
  <!-- 底部容器，使用 footer 标签 -->
  <footer class="m-footer">
    <!-- 默认插槽，用于插入底部内容 -->
    <slot></slot>
  </footer>
</template>

<!-- 组件逻辑 -->
<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

/**
 * 设置组件选项
 * - name: 设置组件名称为 MFooter，用于父组件（如 m-container）动态检测
 */
defineOptions({
  name: 'MFooter',
});

/**
 * 定义组件的 Props
 * @prop {String} height - 底部的高度，默认值为 '60px'，支持自定义
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
 * 底部样式
 * - height: 通过 v-bind 动态绑定 height prop，实现高度可配置
 */
.m-footer {
  height: v-bind(height);
  padding: $spacing-sm;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>