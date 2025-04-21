<script setup lang="ts">

</script>

<template>
  <div class="search-gongsi">
    <a-row :gutter="10" class="groupInput">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24"
        class="gongsiInput" >
        <a-input placeholder="请输入公司名称" size="large">
          <template #prefix>
            <i class="iconfont icon-gongsichaxun" ></i>
          </template>
        </a-input>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24">
        <a-button type="primary" block size="large" style="height: 97%; width: 100%">
          <template #icon>
            <i class="iconfont icon-sousuo" style="padding-right: 5px"></i>
          </template>
          <span>搜索</span>
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
  .search-gongsi{
    width: 100%;
    min-height:160px !important;
    @include flex-center;
    .groupInput{
      width: 100%;
      @include flex-center;
    }
    .gongsiInput,button {
      margin-top: $spacing-sm;
      font: normal $font-weight-regular $font-size-md $font-primary;
      i{
        font-size: $font-size-2xl;
        color: $primary;
      }
      .icon-sousuo{
        margin-right: $spacing-sm;
        color: $bg-base;
      }
    }
  }
  
</style>