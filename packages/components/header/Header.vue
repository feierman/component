<template>
    <a-row>
        <a-col :xs="{span:24}" :sm="{span:3}" :md="{span:3}" :lg="{span:3}" :xl="{span:3}" :xxl="{span:3}" class="logo">
            <router-link to="/">
                <a-image
                    src="https://static.vecteezy.com/system/resources/previews/022/227/364/original/openai-chatgpt-logo-icon-free-png.png"
                    :width="50" :height="50" :preview="false"></a-image>
            </router-link>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{span:18 }" :md="{span:18 , offset:3}" :lg="{span:18 , offset:3}"
            :xl="{span:18 , offset:3}" :xxl="{span:18 , offset:3}" class="menu">
            <a-menu v-model="current" :items="items" mode="horizontal"></a-menu>
            <!-- <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" /> -->
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { MenuProps } from 'ant-design-vue/es/menu';
import { h, ref } from 'vue';

const current = ref<string[]>(['home']);
const items = ref<(MenuProps['items'])>([
    {
        key: 'home',

        label: '首页',
    },
    {
        key: 'tools',
        label: '物流工具',
        children: [
            {
                key: 'message_add',
                label: '信息发布',
            },
            {
                key: 'order_search',
                label: '订单查询',
            },

        ]
    },
    {
        key: 'Merchant_settled ',
        label: h('span', { class: 'red-menu-item' }, '商家入驻'),
    },
    {
        key: 'login',
        label: '登录',
    },
    

])
</script>

<style scoped lang="scss">
@use '@/theme/src/common/index'as *;
    .menu {
        
        :deep(.ant-menu) {
            min-width: 100%;
            justify-content: flex-end;
          border-bottom: none;
        }
        
    }
        :deep(.red-menu-item) {
            color: $danger;
            
        }
    //xs: <576px 隐藏menu
@media screen and (max-width: 576px) {
        .menu {
            display: none;
        }
    }

    //md: 768px 
@media screen and (max-width: 768px) {
        .menu {
            display: none;
        }
    }




    


    //sm: >=567px
    //lg: 992px 
    //xl: 1200px 

    //xxl: 1600px 
</style>