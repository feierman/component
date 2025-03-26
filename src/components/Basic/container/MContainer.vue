<!-- /src/components/Basic/container/MContainer.vue -->

<!-- 组件模板 -->
<template>
    <!-- 布局容器，使用 div 标签，动态绑定 direction 类来控制排列方向 -->
    <div class="m-container" :class="direction">
        <!-- 默认插槽，用于插入子组件（如 m-aside、m-header 等） -->
        <slot></slot>
    </div>
</template>

<!-- 组件逻辑 -->
<script setup lang="ts">
import { computed, useSlots } from 'vue';

/**
 * 设置组件名称，用于标识组件
 * 名称必须与父组件或子组件中检查的名称一致（例如 MContainer）
 */
defineOptions({
    name: 'MContainer',
});

/**
 * 获取插槽内容
 * useSlots 用于访问组件的插槽内容，以便动态检测子组件类型
 */
const slots = useSlots();

/**
 * 计算布局方向
 * 根据子组件的类型动态决定排列方向：
 * - 如果子组件中包含 MHeader 或 MFooter，则为垂直排列（vertical）
 * - 否则为水平排列（horizontal）
 * @returns {string} 返回 'vertical' 或 'horizontal'，用于动态绑定类名
 */
const direction = computed(() => {
    if (slots.default) {
        // 获取默认插槽中的虚拟节点（vnodes）
        const vnodes = slots.default();
        // 检查是否存在 MHeader 或 MFooter 子组件
        const hasHeaderOrFooter = vnodes.some((node) => {
            // 类型安全检查，确保 node.types 是对象且包含 name 属性
            return (
                node.type &&
                typeof node.type === 'object' &&
                'name' in node.type &&
                (node.type.name === 'MHeader' || node.type.name === 'MFooter')
            );
        });
        // 根据检测结果返回布局方向
        return hasHeaderOrFooter ? 'vertical' : 'horizontal';
    }
    // 如果没有插槽内容，默认返回垂直布局
    return 'vertical';
});
</script>

<!-- 组件样式 -->
<style lang="scss" scoped>
@use "@/style/variable.scss" as v;

/**
 * 布局容器样式
 * - display: flex; 使用 Flexbox 布局
 * - height: 100vh; 容器高度占满视口
 * - gap: $space-1; 子组件之间的间距，需在项目中定义 $space-1 变量
 */
.m-container {
    display: flex;
    width: 100vw;
    height: 100vh;

    /**
   * 垂直排列样式
   * 当 direction 为 'vertical' 时应用
   */
    &.vertical {
        flex-direction: column;
    }

    /**
   * 水平排列样式
   * 当 direction 为 'horizontal' 时应用
   */
    &.horizontal {
        flex-direction: row;
    }
}
</style>