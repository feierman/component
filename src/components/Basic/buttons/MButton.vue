MButton.vue

<template>
  <!-- 动态组件，可渲染为按钮或自定义标签 -->
  <component
    :is="tag"
    :class="buttonClasses"
    :style="buttonStyle"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <!-- 加载状态指示器 -->
    <span v-if="loading" class="m-button__loading">
      <!-- 默认旋转加载图标 -->
      <m-icon v-if="!loadingIcon" name="loading1" class="spin" :color="iconColor" />
      <!-- 如果提供了自定义加载图标，则使用它 -->
      <component v-else :is="loadingIcon" class="spin" />
    </span>
    
    <!-- 图标插槽或基于 prop 的图标 -->
    <span v-if="$slots.icon || icon" class="m-button__icon">
      <slot name="icon" :iconColor="iconColor">
        <!-- 如果没有提供插槽，则使用默认图标 -->
        <m-icon :name="icon" :color="iconColor" />
      </slot>
    </span>
    <!-- 默认插槽内容 -->
    <span v-if="$slots.default && !loading" class="m-button__content">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { Component } from 'vue';
import MIcon from '../micon/MIcon.vue'; // 自定义图标组件

const slots = useSlots(); // 获取插槽，用于条件渲染

// 定义带有默认值的 props
const props = withDefaults(
  defineProps<{
    size?: '' | 'large' | 'default' | 'small'; // 按钮尺寸
    type?: '' | 'primary' | 'success' | 'warning' | 'danger' | 'info'; // 按钮类型
    plain?: boolean; // 朴素样式（仅边框）
    text?: boolean; // 纯文本按钮
    bg?: boolean; // 文本按钮的背景
    link?: boolean; // 链接样式按钮
    round?: boolean; // 圆角按钮
    circle?: boolean; // 圆形按钮
    loading?: boolean; // 显示加载状态
    loadingIcon?: string | Component; // 自定义加载图标
    disabled?: boolean; // 禁用按钮
    icon?: string; // 图标名称
    autofocus?: boolean; // 自动聚焦
    nativeType?: 'button' | 'submit' | 'reset'; // 原生按钮类型
    autoInsertSpace?: boolean; // 自动在两个中文字符间插入空格
    color?: string; // 自定义颜色
    dark?: boolean; // 暗色模式
    tag?: string | Component; // 自定义渲染标签或组件
  }>(),
  {
    size: '', // 默认尺寸为空
    type: '', // 默认类型为空
    plain: false, // 默认非朴素样式
    text: false, // 默认非文本按钮
    bg: false, // 默认无背景
    link: false, // 默认非链接样式
    round: false, // 默认非圆角
    circle: false, // 默认非圆形
    loading: false, // 默认不显示加载状态
    loadingIcon: '', // 默认无自定义加载图标
    disabled: false, // 默认不禁用
    icon: '', // 默认无图标
    autofocus: false, // 默认不自动聚焦
    nativeType: 'button', // 默认原生类型为 button
    autoInsertSpace: false, // 默认不自动插入空格
    color: '', // 默认无自定义颜色
    dark: false, // 默认非暗色模式
    tag: 'button', // 默认渲染为 button 标签
  }
);

// 定义事件
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void; // 点击事件
}>();

// 计算按钮的类名
const buttonClasses = computed(() => [
  'm-button', // 基础类名
  props.type ? `m-button--${props.type}` : '', // 类型类名
  props.size ? `m-button--${props.size}` : '', // 尺寸类名
  { 'is-plain': props.plain }, // 朴素样式
  { 'is-text': props.text }, // 文本样式
  { 'is-bg': props.bg && props.text }, // 文本按钮背景
  { 'is-link': props.link }, // 链接样式
  { 'is-round': props.round }, // 圆角样式
  { 'is-circle': props.circle }, // 圆形样式
  { 'is-loading': props.loading }, // 加载状态
  { 'is-disabled': props.disabled }, // 禁用状态
  { 'is-dark': props.dark }, // 暗色模式
].filter(Boolean));

// 动态计算图标颜色
const iconColor = computed(() => {
  // 如果指定了自定义颜色
  if (props.color) {
    return props.plain || props.text || props.link ? props.color : '#fff';
  }
  
  // 根据按钮类型设置图标颜色
  if (props.plain || props.text || props.link) {
    switch (props.type) {
      case 'primary': return 'm.$primary'; // 主色调
      case 'success': return 'm.$success'; // 成功色调
      case 'warning': return 'm.$warning'; // 警告色调
      case 'danger': return 'm.$danger'; // 危险色调
      case 'info': return 'm.$info'; // 信息色调
      default: return 'm.$text-regular'; // 默认文本颜色
    }
  } else {
    // 实心按钮默认使用白色图标
    return '#fff';
  }
});

// 计算按钮样式
const buttonStyle = computed(() => {
  if (!props.color) return {}; // 无自定义颜色时返回空对象
  return {
    '--m-button-bg-color': props.color, // 背景颜色
    '--m-button-border-color': props.color, // 边框颜色
    '--m-button-hover-bg-color': darkenColor(props.color, 0.1), // 悬停时颜色变暗
    '--m-button-active-bg-color': darkenColor(props.color, 0.2), // 点击时颜色更暗
    '--m-button-text-color': props.plain || props.text || props.link ? props.color : '#fff', // 文本颜色
  };
});

const shouldAddSpace = computed(() => {
  if (!props.autoInsertSpace || !slots.default) return false;
  const defaultSlot = slots.default();
  if (!defaultSlot || defaultSlot.length === 0) return false;
  const content = defaultSlot[0]?.children;
  console.log('Slot content:', content); // 调试插槽内容
  if (typeof content !== 'string' || content.length !== 2) return false;
  return /^[\u4e00-\u9fa5]{2}$/.test(content);
});

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) emit('click', event); // 未禁用时触发点击事件
};

// 颜色变暗函数
function darkenColor(color: string, amount: number): string {
  let usePound = false;
  if (color[0] === '#') {
    color = color.slice(1); // 移除 # 前缀
    usePound = true;
  }
  const num = parseInt(color, 16); // 将颜色转为 16 进制整数
  let r = (num >> 16) - Math.round(255 * amount); // 红色分量变暗
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * amount); // 绿色分量变暗
  let b = (num & 0x0000ff) - Math.round(255 * amount); // 蓝色分量变暗
  r = Math.max(0, r); // 确保不低于 0
  g = Math.max(0, g);
  b = Math.max(0, b);
  const newColor = (r << 16) | (g << 8) | b; // 重组颜色值
  return (usePound ? '#' : '') + newColor.toString(16).padStart(6, '0'); // 返回 6 位 16 进制颜色值
}

// 暴露给外部使用的属性
defineExpose({
  size: computed(() => props.size), // 按钮尺寸
  type: computed(() => props.type), // 按钮类型
  disabled: computed(() => props.disabled), // 禁用状态
  shouldAddSpace, // 是否需要添加空格
});
</script>

<style lang="scss">
@use "@/style/variable.scss" as m; // 引入全局变量

.m-button {
  display: inline-flex; // 内联弹性布局
  align-items: center; // 垂直居中对齐
  justify-content: center; // 水平居中对齐
  text-align: center; // 文本居中
  line-height: m.$line-height-tight; // 紧凑行高
  vertical-align: middle; // 垂直居中
  padding: m.$spacing-xs m.$spacing-md; // 内边距
  font-family: m.$font-family-base; // 字体
  font-size: m.$font-size-base; // 字体大小
  font-weight: m.$font-weight-regular; // 字体粗细
  border: 1px solid m.$border-base; // 边框
  border-radius: m.$border-radius-md; // 圆角
  background-color: m.$bg-light; // 背景颜色
  color: m.$text-regular; // 文本颜色
  cursor: pointer; // 鼠标指针
  transition: m.$transition-base; // 过渡动画
  outline: none; // 移除轮廓
  white-space: nowrap; // 禁止换行
  min-width: m.$width-btn-min; // 最小宽度
  overflow: hidden; // 溢出隐藏
  text-overflow: ellipsis; // 文本溢出显示省略号
  
  .m-button__icon {
    display: flex; // 弹性布局
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
    margin-right: m.$spacing-xxs; // 右边距
  }
  
  &.is-circle {
    border-radius: 50%; // 圆形
    padding: 0; // 无内边距
    min-width: m.$height-md; // 最小宽度
    min-height: m.$height-md; // 最小高度
    display: flex; // 弹性布局
    align-items: center; // 垂直居中
    justify-content: center; // 水平居中
  }
  
  &:hover {
    border-color: m.$primary-light-8; // 悬停边框颜色
    background-color: m.$fill-light; // 悬停背景颜色
    color: m.$primary; // 悬停文本颜色
  }
  
  &--large {
    padding: m.$spacing-sm m.$spacing-lg; // 大尺寸内边距
    font-size: m.$font-size-lg; // 大尺寸字体
  }
  
  &--small {
    padding: m.$spacing-xs m.$spacing-sm; // 小尺寸内边距
    font-size: m.$font-size-sm; // 小尺寸字体
  }
  
  &:active {
    background-color: m.$fill-light; // 点击时背景颜色
  }
  
  &.is-disabled {
    cursor: not-allowed; // 禁用鼠标指针
    opacity: 0.5; // 透明度
    background-color: m.$bg-disabled; // 禁用背景颜色
    border-color: m.$border-disabled; // 禁用边框颜色
    color: m.$text-disabled; // 禁用文本颜色
  }
  
  &.is-round {
    border-radius: m.$border-radius-lg; // 大圆角
  }
  
  &.is-plain {
    background-color: transparent; // 透明背景
    border-color: m.$border-light; // 浅色边框
    &:hover {
      background-color: m.$fill-light; // 悬停背景颜色
    }
  }
  
  &.is-text {
    border: none; // 无边框
    background-color: transparent; // 透明背景
    color: m.$text-secondary; // 次要文本颜色
    &.is-bg {
      background-color: m.$fill-light; // 有背景时的颜色
    }
    &:hover {
      color: m.$primary; // 悬停主色调
      background-color: m.$fill-hover; // 悬停背景颜色
    }
    &.m-button--primary { color: m.$primary; } // 主色调
    &.m-button--success { color: m.$success; } // 成功色调
    &.m-button--warning { color: m.$warning; } // 警告色调
    &.m-button--danger { color: m.$danger; } // 危险色调
    &.m-button--info { color: m.$info; } // 信息色调
  }
  
  &.is-link {
    border: none; // 无边框
    background: none; // 无背景
    color: m.$text-primary; // 主文本颜色
    &:hover {
      color: m.$text-secondary; // 悬停次要文本颜色
      background: none; // 无背景
    }
    &.m-button--primary { color: m.$primary; &:hover { color: m.$primary-light-7; } } // 主色调
    &.m-button--success { color: m.$success; &:hover { color: m.$success-light-7; } } // 成功色调
    &.m-button--warning { color: m.$warning; &:hover { color: m.$warning-light-7; } } // 警告色调
    &.m-button--danger { color: m.$danger; &:hover { color: m.$danger-light-7; } } // 危险色调
    &.m-button--info { color: m.$info; &:hover { color: m.$info-light-7; } } // 信息色调
  }
  
  &.is-loading {
    opacity: 0.7; // 加载时透明度
    cursor: wait; // 等待鼠标指针
    .m-button__loading {
      display: inline-flex; // 内联弹性布局
      align-items: center; // 垂直居中
      justify-content: center; // 水平居中
      margin-right: m.$spacing-xs; // 右边距
    }
    .spin {
      animation: spin 1s linear infinite; // 旋转动画
    }
  }
  
  &.is-dark {
    filter: brightness(0.8); // 暗色模式降低亮度
  }
  
  &--primary {
    background-color: var(--m-button-bg-color, m.$primary); // 主色调背景
    border-color: var(--m-button-border-color, m.$primary); // 主色调边框
    color: var(--m-button-text-color, m.$bg-base); // 文本颜色
    &:hover {
      background-color: var(--m-button-hover-bg-color, m.$primary-light-5); // 悬停背景
      border-color: var(--m-button-hover-bg-color, m.$primary-light-9); // 悬停边框
    }
    &.is-plain {
      background-color: m.$primary-light-9; // 朴素样式背景
      border-color: m.$primary-light-5; // 朴素样式边框
      color: m.$primary; // 文本颜色
      &:hover {
        background-color: m.$primary-light-7; // 悬停背景
        border-color: m.$primary-light-3; // 悬停边框
      }
    }
  }
  
  &--success {
    background-color: var(--m-button-bg-color, m.$success); // 成功色调背景
    border-color: var(--m-button-border-color, m.$success); // 成功色调边框
    color: var(--m-button-text-color, m.$bg-base); // 文本颜色
    &:hover {
      background-color: var(--m-button-hover-bg-color, m.$success-dark-2); // 悬停背景
      border-color: var(--m-button-hover-bg-color, m.$success-dark-2); // 悬停边框
    }
  }
  
  &--warning {
    background-color: var(--m-button-bg-color, m.$warning); // 警告色调背景
    border-color: var(--m-button-border-color, m.$warning); // 警告色调边框
    color: var(--m-button-text-color, m.$bg-base); // 文本颜色
    &:hover {
      background-color: var(--m-button-hover-bg-color, m.$warning-dark-2); // 悬停背景
      border-color: var(--m-button-hover-bg-color, m.$warning-dark-2); // 悬停边框
    }
  }
  
  &--danger {
    background-color: var(--m-button-bg-color, m.$danger); // 危险色调背景
    border-color: var(--m-button-border-color, m.$danger); // 危险色调边框
    color: var(--m-button-text-color, m.$bg-base); // 文本颜色
    &:hover {
      background-color: var(--m-button-hover-bg-color, m.$danger-dark-2); // 悬停背景
      border-color: var(--m-button-hover-bg-color, m.$danger-dark-2); // 悬停边框
    }
  }
  
  &--info {
    background-color: var(--m-button-bg-color, m.$info); // 信息色调背景
    border-color: var(--m-button-border-color, m.$info); // 信息色调边框
    color: var(--m-button-text-color, m.$bg-base); // 文本颜色
    &:hover {
      background-color: var(--m-button-hover-bg-color, m.$info-dark-2); // 悬停背景
      border-color: var(--m-button-hover-bg-color, m.$info-dark-2); // 悬停边框
    }
  }
  &--success,&--warning,&--danger,&--info,&--primary {
    &:hover {
      color: m.$bg-base; // 悬停时文本颜色
    }
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg); // 旋转 360 度
  }
}
</style>