<script setup lang="ts">
import { ref } from 'vue';
import Carousel from "../components/carousel/Carousel.vue";
import TabsMain from "../components/tabs/TabsMain.vue";
import Tabs from "@/components/tabs/Tabs.vue";
import TabPane from '@/components/tabs/TabPane.vue'

const activeTab = ref('about') // 默认激活“关于”页
</script>

<template>
  <a-layout-content class="a-layout-content">
    <Carousel />
    <!-- 轮播图下方的 TabsMain 组件 -->
    <div class="tabs">
      <TabsMain  />
    </div>
    <Tabs v-model="activeTab" >
      <TabPane name="home" label="首页">
        <h2>首页内容</h2>
        <p>欢迎访问首页。</p>
      </TabPane>
      <TabPane name="about" label="关于">
        <h2>关于我们</h2>
        <p>这里是关于页面。</p>
      </TabPane>
      <TabPane name="contact" label="联系">
        <h2>联系我们</h2>
        <p>欢迎留言。</p>
      </TabPane>
    </Tabs>
  </a-layout-content>
</template>

<style scoped lang="scss">
@use '@/theme/src/index.scss' as *;
.a-layout-content{
  margin:  10px auto;
}
.tabs{
  @include flex-center;
  margin-top: $spacing-sm;
}
</style>