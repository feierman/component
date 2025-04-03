<script setup lang="ts">

</script>

<template>
<div class="search-box">
      <a-row :gutter="2" class="groupInput">
        <a-col :span='9' class="start" >
          <a-input placeholder="起点">
            <template #prefix>
              <i class="iconfont icon-qidian1" ></i>
            </template>
          </a-input>
        </a-col>
        <a-col class="icon" :span="2" >
          <i class="iconfont icon-wangfan"></i>
        </a-col>
        <a-col :span="9" class="end">
          <a-input placeholder="终点">
            <template #prefix>
              <i class="iconfont icon-zhongdian1"></i>
            </template>
          </a-input>
        </a-col>
        <a-col :span="4" class="submitBtn" >
          <a-button type="primary" block size="large" style="height: 97%; width: 100%">
            <template #icon>
              <i class="iconfont icon-sousuo" style="padding-right: 5px"></i>
            </template>
            <span>搜索</span>
          </a-button>
        </a-col>
      </a-row>
      <a-row class="history_box">
        <a-col :span="1" >
          <i class="iconfont icon-shanchu2"></i>
        </a-col>
        <a-col :span="22">
          <a-tag>linyi </a-tag>
        </a-col>
        <a-col :span="1" >
            <i class="iconfont icon-qingkong1" style="color: red"></i>
        </a-col>
      </a-row>
    </div>
<!--  历史记录-->



</template>

<style scoped lang="scss"  >
@use '@/theme/src/common/var' as *;
.search-box{
  padding: $spacing-md;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .groupInput{
    height: 50px;
    width: 100%;
    display: flex;
  }
  .start,.end{
    display: flex;
    i{
      padding: $spacing-xs;
    }
  }
  input{
    height: 50px;
  }
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      font-size: $font-size-h1;
      color: $primary;
    }
  }
  
  .history_box{
    height: 40px;
    width: 100%;
    margin-top: $spacing-sm;
    display: flex;
    align-items: center;
    border-radius: $border-radius-base;
    i{
      margin:0 $spacing-xs 0 $spacing-sm;
      color: $text-regular;
    }
    
  }
}

</style>
