<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
	<header class="m-header" :style="{ height }">
		<slot></slot>
	</header>
</template>

<script setup lang="ts">
	import { defineProps,defineOptions } from 'vue';
	defineOptions({
		name: 'MHeader',
	})
	defineProps({
		height: {
			type: String,
			default: '60px',
		},
	});
</script>

<style lang="scss" scoped>
	.m-header {
		height: v-bind(height);
	}
</style>