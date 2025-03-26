<!--路径 /src/components/Basic/container/Main.vue-->

<!-- 组件模板 -->
<template>
  <!-- 主内容容器，使用 main 标签 -->
  <main class="m-main">
    <!-- 默认插槽，用于插入主内容 -->
    <slot></slot>
  </main>
</template>

<!-- 组件逻辑 -->
<script setup lang="ts">

/**
 * 设置组件选项
 * - name: 设置组件名称为 MMain，用于父组件（如 m-container）动态检测
 */
defineOptions({
  name: 'MMain',
});
</script>

<!-- 组件样式 -->
<style lang="scss" scoped>
/**
 * 主内容样式
 * - flex: 1; 使主内容占据剩余空间（如果父容器是 flex 布局）
 * - background-color: 使用 $gray-200 变量设置背景色，需在项目中定义
 */
.m-main {
  flex: 1;
  background-color: $primary;
  display: flex;
  justify-content: center;
}
</style>