<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
	<m-container>
        <m-aside width="200px">Aside</m-aside>
        <m-container>
            <m-header >Header</m-header>
			<m-main>Main</m-main>
		</m-container>
	</m-container>
</template>

<script setup lang="ts">
	// 自动导入 m-container
</script>

<style scoped lang="scss">
	.m-container {
        width: 100vw;
		height: 100vh;
		gap: $space-1;
	}
	.m-header{
		height: $default-height;
		background-color: $primary;
	}
	.m-aside{
		width: $default-width;
		background-color: $primary;
	}
	.m-main{
		flex: 1;
		background-color: $primary;
	}
	.m-footer{
		background-color: $gray-300;
	}
</style>