<template>
  <a-row class="nav-bar">
    <!-- LOGO -->
    <a-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="logo">
      <router-link to="/">
        <a-image
            src="https://static.vecteezy.com/system/resources/previews/022/227/364/original/openai-chatgpt-logo-icon-free-png.png"
            :width="50"
            :height="50"
            :preview="false"
        />
      </router-link>
    </a-col>

    <!-- 大屏幕菜单 -->
    <a-col :xs="0" :sm="0" :md="6" :lg="6" :xl="6"  class="desktop-menu">
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :items="menuItems" />
    </a-col>

    <!-- 小屏幕汉堡按钮 -->
    <a-col :xs="1" :sm="1" :md="0" :lg="0" :xl="0" class="mobile-menu">
      <MenuOutlined @click="showDrawer" class="hamburger-icon" />
    </a-col>
  </a-row>

  <!-- 抽屉菜单 -->
  <a-drawer v-model:open="drawerVisible" title="导航栏" placement="right" :width="260" :closable="false">
    <a-menu v-model:selectedKeys="selectedKeys" mode="vertical" :items="menuItems" @click="closeDrawer" />
  </a-drawer>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { MenuProps } from 'ant-design-vue';
import { MenuOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['home']);
const drawerVisible = ref(false);

const menuItems = ref<MenuProps['items']>([
  { key: 'home', label: '首页' },
  {
    key: 'tools',
    label: '物流工具',
    children: [
      { key: 'message_add', label: '信息发布' },
      { key: 'order_search', label: '订单查询' },
    ],
  },
  { key: 'merchant_settled', label: '商家入驻' },
  { key: 'login', label: '登录' },
]);

const showDrawer = () => {
  drawerVisible.value = true;
};

const closeDrawer = () => {
  drawerVisible.value = false;
};
</script>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
}

.hamburger-icon {
  font-size: 20px;
  cursor: pointer;
}


</style>
