<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
	<footer class="m-footer">
		<slot></slot>
	</footer>
</template>

<script setup lang="ts">
	import { defineProps,defineOptions } from 'vue';
	defineOptions({
		name: 'MFooter',
	})
	defineProps({
		height: {
			type: String,
			default: '60px',
		},
	});
</script>

<style lang="scss" scoped>
	
	.m-footer {
		height: v-bind(height);
	}
</style>