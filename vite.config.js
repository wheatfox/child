import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 使用相对路径，支持部署在子目录
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'], // 兼容主流浏览器
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {},

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
