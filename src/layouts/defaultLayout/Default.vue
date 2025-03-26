<!--路径 /src/components/Basic/container/MContainer.vue-->
<template>
  <m-container>
    <m-header>
      <span>ui 组件库</span>
    </m-header>
    <m-container>
      <m-main>
        <Button />
      </m-main>
    </m-container>
  </m-container>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@use '@/style/variable.scss' as m;
	.m-container {
    //动态绑定高度 100vh-60px
    height: calc(100vh - 60px);
		gap: m.$spacing-sm;
	}
	.m-header{
		height: m.$height-xl;
		background-color: m.$primary-light-3;
    span {
      color: m.$text-primary;
      font: m.$font-weight-bold m.$font-size-lg m.$font-family-base;
      
    }
	}
	.m-aside{
		width: m.$width-sidebar;
	}
	.m-main{
		flex: 1;
		background-color: m.$bg-light;
        overflow: auto;
	}

</style>