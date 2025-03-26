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
import { computed,  useSlots } from 'vue';
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
    icon?: string ;
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
@use "@/style/variable.scss" as m;

.m-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: m.$spacing-xs m.$spacing-md;
  font-family: m.$font-family-base;
  font-size: m.$font-size-base;
  font-weight: m.$font-weight-regular;
  border: 1px solid m.$border-base;
  border-radius: m.$border-radius-md;
  background-color: m.$bg-light;
  color: m.$text-regular;
  cursor: pointer;
  transition: m.$transition-base;
  outline: none;
  
    &:hover {
      border-color: m.$primary-light-9;
      background-color: m.$fill-light;
      color: m.$primary-light-3;
    }
  // 大号按钮样式
  &--large {
    height: m.$height-lg;
    padding: m.$spacing-lg m.$spacing-lg;
    font-size: m.$font-size-lg;
  }
  //小号按钮样式
  &--small {
    height: m.$height-md;
    padding: m.$spacing-xs m.$spacing-sm;
    font-size: m.$font-size-sm;
  }
  
  &:active {
    background-color: m.$fill-light;
  }
  
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: m.$bg-disabled;
    border-color: m.$border-disabled;
    color: m.$text-disabled;
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
    &.m-button--primary {
      color: m.$primary;
    }
    &.m-button--success {
      color: m.$success;
    }
    &.m-button--warning {
      color: m.$warning;
    }
    &.m-button--danger {
      color: m.$danger;
    }
    &.m-button--info {
      color: m.$info;
    }
    
  }
  
  &.is-link {
    border: none;
    background: none;
    color: m.$text-primary;
    
    &:hover {
      color: m.$text-secondary;
      background: none;
    }
    //主色调 primary
    &.m-button--primary {
      color: m.$primary;
      &:hover {
        color: m.$primary-light-7;
      }
    }
    &.m-button--success {
      color: m.$success;
      &:hover {
        color: m.$success-light-7;
      }
    }
    &.m-button--warning {
      color: m.$warning;
      &:hover {
        color: m.$warning-light-7;
      }
    }
    &.m-button--danger {
      color: m.$danger;
      &:hover {
        color: m.$danger-light-7;
      }
    }
    &.m-button--info {
      color: m.$info;
      &:hover {
        color: m.$info-light-7;
      }
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
    background-color: var(--m-button-bg-color, m.$primary);
    border-color: var(--m-button-border-color, $primary);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, m.$primary-light-5);
      border-color: var(--m-button-hover-bg-color, m.$primary-light-9);
      color: var(--m-button-hover-text-color, m.$bg-base);
    }
    
    &.is-plain {
      background-color: m.$primary-light-9;
      border-color: m.$primary-light-5;
      color: m.$primary;
      
      &:hover {
        background-color: m.$primary-light-7;
        border-color: m.$primary-light-3;
      }
    }
  }
  
  &--success {
    background-color: var(--m-button-bg-color, m.$success);
    border-color: var(--m-button-border-color, m.$success);
    color: var(--m-button-text-color,  m.$bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $success-dark-2);
      border-color: var(--m-button-hover-bg-color, m.$success-dark-2);
      color: var(--m-button-hover-text-color, m.$bg-base);
    }
  }
  
  &--warning {
    background-color: var(--m-button-bg-color, $warning);
    border-color: var(--m-button-border-color, $warning);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $warning-dark-2);
      border-color: var(--m-button-hover-bg-color, $warning-dark-2);
      color: var(--m-button-hover-text-color, $bg-base);
    }
  }
  
  &--danger {
    background-color: var(--m-button-bg-color, $danger);
    border-color: var(--m-button-border-color, $danger);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $danger-dark-2);
      border-color: var(--m-button-hover-bg-color, $danger-dark-2);
      color: var(--m-button-hover-text-color, $bg-base);
    }
  }
  
  &--info {
    background-color: var(--m-button-bg-color, $info);
    border-color: var(--m-button-border-color, $info);
    color: var(--m-button-text-color, $bg-base);
    
    &:hover {
      background-color: var(--m-button-hover-bg-color, $info-dark-2);
      border-color: var(--m-button-hover-bg-color, $info-dark-2);
      color: var(--m-button-hover-text-color, $bg-base);
    }
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>