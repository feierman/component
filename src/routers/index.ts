//定义路由
import { createRouter,createWebHistory   } from "vue-router";

import Home from "../views/Home.vue";

const routes= [
    {
        path:'/',
        component:Home
    },
    {
        path:'/xianluList',
        component:()=>import('../views/xoanlist.vue')
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default  router