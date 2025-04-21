import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),
    ],
    //@别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@api': path.resolve(__dirname, 'src/api'), // 将 '@api' 别名指向 'src/api' 文件夹        },
        },
    },
    css:{
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/theme/src/index.scss" as *;`
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 代理目标地址
                changeOrigin: true, // 是否更改请求头中的 `origin` 字段
                // rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，移除 `/api` 前缀
            }
        }
    }
})
