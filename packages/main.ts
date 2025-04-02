import './theme/src/common/Normalize.scss'
import './assets/fonts/iconfont.css'
import './theme/src/common/index.scss'
import { createApp } from 'vue'
import router from "./routers";
import App from './App.vue'

createApp(App).use(router).mount('#app')
