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
    define: {
        'process.env': {}
    },
    //@别名
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "packages"),
        },
    },
    css:{
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/theme/src/index.scss" as *;`
            }
        }
    }
})
