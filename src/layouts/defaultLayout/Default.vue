<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
  <m-container>
    <m-header></m-header>
    <m-container>
      <m-aside></m-aside>
      <m-main>
        <m-button  text>默认</m-button>
        <m-button  size="" >中文</m-button>
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
		gap: $spacing-sm;
	}
	.m-header{
		height: $height-lg;
		background-color: $primary-light-3;
    span {
      color: $text-primary;
      font: $font-weight-bold $font-size-lg $font-family-base;
      
    }
	}
	.m-aside{
		width: $width-sidebar;
	}
	.m-main{
		flex: 1;
		background-color: $bg-light;
	}

</style>