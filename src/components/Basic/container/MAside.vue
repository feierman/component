<!--路径 /src/components/Basic/container/MAside.vue-->

<!-- 组件模板 -->
<template>
  <!-- 侧边栏容器，使用 aside 标签，动态绑定宽度 -->
  <aside class="m-aside" :style="{ width }">
    <!-- 默认插槽，用于插入侧边栏内容 -->
    <slot></slot>
  </aside>
</template>

<!-- 组件逻辑 -->
<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

/**
 * 设置组件名称，用于父组件（如 m-container）动态检测
 * 名称必须与父组件中检查的名称一致（例如 MAside）
 */
defineOptions({
  name: 'MAside',
});

/**
 * 定义组件的 Props
 * @prop {String} width - 侧边栏的宽度，默认值为 '300px'，支持自定义
 */
defineProps({
  width: {
    type: String,
    default: '300px',
  },
});


</script>

<!-- 组件样式 -->
<style lang="scss" scoped>
/**
 * 侧边栏样式
 * - width: 通过 v-bind 动态绑定 width prop，实现宽度可配置
 * - background-color: 使用 $gray-100 变量设置背景色，需在项目中定义
 * - padding: 使用 $space-1 变量设置内边距，需在项目中定义
 */
.m-aside {
  display: flex;
  align-items: center;
  justify-content: center;
  width: v-bind(width);
  background-color: $bg-disabled;
  padding:$spacing-sm ;
}
</style>
```

