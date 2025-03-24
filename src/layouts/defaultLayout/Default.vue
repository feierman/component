<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
	<m-container>
    <m-header ><h1>Header</h1></m-header>
        <m-container>
            <m-aside width="200px">侧边栏</m-aside>
			      <m-main><h1>Main</h1></m-main>
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
		//gap: $space-1;
	}
	.m-header{
		height: $default-height-60;
	}
	.m-aside{
		width: $default-width;
	}
	.m-main{
		flex: 1;
	}
	.m-footer{
		background-color: $background-light
	}
</style>