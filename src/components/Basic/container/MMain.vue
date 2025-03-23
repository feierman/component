<!--路径 /src/components/Basic/container/MFooter.vue-->
<template>
	<main class="m-main">
		<slot></slot>
	</main>
</template>
<script setup lang="ts">
	import { defineOptions } from 'vue';
	defineOptions({
	})
</script>
<style lang="scss" scoped>
	
	.m-main {
		flex: 1;
	}
</style>