import './theme/src/common/Normalize.scss'
import './assets/fonts/iconfont.css'
import { createApp } from 'vue'
import router from "./routers";
// 注册pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
import App from './App.vue'
createApp(App).use(router).use(pinia).mount('#app')
