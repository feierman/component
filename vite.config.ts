import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dirs:[
                'src/components'
            ],
            dts: 'src/components.d.ts'
        }),
    ],
    //@别名
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @use"@/style/variable.scss" as *;
            `,
            },
        },
    },
})
