<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
	<aside class="m-aside" :style="{ width }">
		<slot></slot>
	</aside>
</template>

<script setup lang="ts">
	import { defineProps,defineOptions } from 'vue';
	defineOptions({
		name: 'MAside',
	})
	defineProps({
		width: {
			type: String,
			default: '300px',
		},
	});
</script>

<style lang="scss" scoped>
	
	.m-aside {
		width: v-bind(width);
	}
</style>