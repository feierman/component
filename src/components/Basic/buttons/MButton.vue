<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :style="buttonStyle"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="m-button__loading">
      <component :is="loadingIcon" />
    </span>
    <span v-if="$slots.icon || icon" class="m-button__icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span v-if="$slots.default" class="m-button__content">
      <slot v-if="shouldAddSpace" v-html="formattedContent" />
      <slot v-else />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineExpose, useSlots } from 'vue';
import type { Component } from 'vue';
// import Loading from './icons/Loading.vue'; // 假设默认加载图标

// 获取 slots
const slots = useSlots();

// 定义 props 并设置默认值
const props = withDefaults(
  defineProps<{
    size?: '' | 'large' | 'default' | 'small';
    type?: '' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    plain?: boolean;
    text?: boolean;
    bg?: boolean;
    link?: boolean;
    round?: boolean;
    circle?: boolean;
    loading?: boolean;
    loadingIcon?: string | Component;
    disabled?: boolean;
    icon?: string | Component;
    autofocus?: boolean;
    nativeType?: 'button' | 'submit' | 'reset';
    autoInsertSpace?: boolean;
    color?: string;
    dark?: boolean;
    tag?: string | Component;
  }>(),
  {
    size: '',
    type: '',
    plain: false,
    text: false,
    bg: false,
    link: false,
    round: false,
    circle: false,
    loading: false,
    // loadingIcon: () => Loading,
    disabled: false,
    icon: '',
    autofocus: false,
    nativeType: 'button',
    autoInsertSpace: false,
    color: '',
    dark: false,
    tag: 'button',
  }
);

// 定义 emits
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// 计算按钮类名
const buttonClasses = computed(() => [
  'm-button',
  props.type ? `m-button--${props.type}` : '',
  props.size ? `m-button--${props.size}` : '',
  {
    'is-plain': props.plain,
    'is-text': props.text,
    'is-bg': props.bg && props.text,
    'is-link': props.link,
    'is-round': props.round,
    'is-circle': props.circle,
    'is-loading': props.loading,
    'is-disabled': props.disabled,
    'is-dark': props.dark,
  },
]);

// 计算按钮样式
const buttonStyle = computed(() => {
  if (!props.color) return {};
  return {
    '--m-button-bg-color': props.color,
    '--m-button-border-color': props.color,
    '--m-button-hover-bg-color': darkenColor(props.color, 0.1),
    '--m-button-active-bg-color': darkenColor(props.color, 0.2),
    '--m-button-text-color': props.plain || props.text || props.link ? props.color : '#fff',
  };
});

// 判断是否需要插入空格
const shouldAddSpace = computed(() => {
  if (!props.autoInsertSpace || !slots.default) return false;
  const defaultSlot = slots.default();
  if (!defaultSlot || defaultSlot.length === 0) return false;
  const content = defaultSlot[0]?.children;
  if (typeof content !== 'string' || content.length !== 2) return false;
  return /^[\u4e00-\u9fa5]{2}$/.test(content);
});

// 格式化内容（插入空格）
const formattedContent = computed(() => {
  if (!shouldAddSpace.value) return '';
  const defaultSlot = slots.defaul?.();
  if (!defaultSlot || defaultSlot.length === 0) return '';
  const content = defaultSlot[0].children as string;
  return `${content[0]} ${content[1]}`;
});

// 点击事件处理
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

// 暴露属性
defineExpose({
  size: computed(() => props.size),
  type: computed(() => props.type),
  disabled: computed(() => props.disabled),
  shouldAddSpace,
});

// 辅助函数：颜色加深
function darkenColor(color: string, amount: number): string {
  let usePound = false;
  if (color[0] === '#') {
    color = color.slice(1);
    usePound = true;
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) - Math.round(255 * amount);
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * amount);
  let b = (num & 0x0000ff) - Math.round(255 * amount);
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  const newColor = (r << 16) | (g << 8) | b;
  return (usePound ? '#' : '') + newColor.toString(16).padStart(6, '0');
}
</script>

<style lang="scss" scoped>
// 样式保持不变
.m-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-md;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  border: 1px solid $border-base;
  border-radius: $border-radius-md;
  background-color: $bg-base;
  color: $text-regular;
  cursor: pointer;
  transition: $transition-base;
  outline: none;
  
  &--large {
    height: $height-lg;
    padding: $spacing-md $spacing-lg;
    font-size: $font-size-lg;
  }
  
  &--small {
    height: $height-sm;
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-sm;
  }
  
  &:hover {
    border-color: $border-hover;
    background-color: $fill-hover;
  }
  
  &:active {
    background-color: $fill-light;
  }
  
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: $bg-disabled;
    border-color: $border-disabled;
    color: $text-disabled;
  }
  
  &.is-round {
    border-radius: $border-radius-lg;
  }
  
  &.is-circle {
    border-radius:$border-radius-circle;
    padding: 0;
    width: var(--m-button-size, $height-md);
    height: var(--m-button-size, $height-md);
  }
  
  &.is-plain {
    background-color: transparent;
    border-color: $border-light;
    
    &:hover {
      background-color: $fill-light;
    }
  }
  
  &.is-text {
    border: none;
    background-color: transparent;
    color: $text-secondary;
    
    &.is-bg {
      background-color: $fill-light;
    }
    
    &:hover {
      color: $primary;
      background-color: $fill-hover;
    }
  }
  
  &.is-link {
    border: none;
    background-color: transparent;
    color: $primary;
    
    &:hover {
      color: $primary-dark-2;
      text-decoration: underline;
    }
  }
  
  &.is-loading {
    position: relative;
    pointer-events: none;
    
    .m-button__loading {
      display: inline-block;
      margin-right: $spacing-xs;
      animation: spin 1s linear infinite;
    }
  }
  
  &.is-dark {
    filter: brightness(0.8);
  }
  
  &--primary {
    background-color: var(--m-button-bg-color, $primary);
    border-color: var(--m-button-border-color, $primary);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $primary-dark-2);
      border-color: var(--m-button-hover-bg-color, $primary-dark-2);
    }
    
    &.is-plain {
      background-color: $primary-light-9;
      border-color: $primary-light-5;
      color: $primary;
      
      &:hover {
        background-color: $primary-light-7;
        border-color: $primary-light-3;
      }
    }
  }
  
  &--success {
    background-color: var(--m-button-bg-color, $success);
    border-color: var(--m-button-border-color, $success);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $success-dark-2);
      border-color: var(--m-button-hover-bg-color, $success-dark-2);
    }
  }
  
  &--warning {
    background-color: var(--m-button-bg-color, $warning);
    border-color: var(--m-button-border-color, $warning);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $warning-dark-2);
      border-color: var(--m-button-hover-bg-color, $warning-dark-2);
    }
  }
  
  &--danger {
    background-color: var(--m-button-bg-color, $error);
    border-color: var(--m-button-border-color, $error);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $error-dark-2);
      border-color: var(--m-button-hover-bg-color, $error-dark-2);
    }
  }
  
  &--info {
    background-color: var(--m-button-bg-color, $info);
    border-color: var(--m-button-border-color, $info);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $info-dark-2);
      border-color: var(--m-button-hover-bg-color, $info-dark-2);
    }
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>