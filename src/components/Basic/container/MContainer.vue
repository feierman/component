<template>
	<div class="m-container" :class="direction">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import { computed, useSlots } from 'vue';
	
	const slots = useSlots();
	
	const direction = computed(() => {
		if (slots.default) {
			const vnodes = slots.default();
			const hasHeaderOrFooter = vnodes.some((node) => {
				// 检查组件的 name 属性，确保正确识别
				return node.type?.name === 'MHeader' || node.type?.name === 'MFooter';
			});
			return hasHeaderOrFooter ? 'vertical' : 'horizontal';
		}
		return 'vertical'; // 默认垂直布局
	});
</script>

<style lang="scss" scoped>
	.m-container {
		display: flex;
		flex-direction: column;
		&:deep(.horizontal) {
			flex-direction: row; // 水平排列时，使用 horizontal 类
		}
		.m-header,
		.m-footer {
			flex-shrink: 0; // 防止 header 和 footer 收缩
		}
		.m-aside,
		.m-main {
			min-height: 200px; // 设置最小高度，可根据实际情况调整
		}
	}
</style>