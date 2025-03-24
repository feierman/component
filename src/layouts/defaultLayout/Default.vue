<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
	<m-container>
    <m-header >
	   
    </m-header>
        <m-container>
	        <m-main>
		       
	        </m-main>
		    </m-container>
	</m-container>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
	.m-container {
    width: 100vw;
    height: 100vh;
		//gap: $space-1;
	}
	.m-header{
		height: $default-height-60;
		background-color: $primary;
	}
	.m-aside{
		width: $default-width;
	}
	.m-main{
		flex: 1;
		background-color: $bg-light;
	}
	.m-footer{
	}
</style>