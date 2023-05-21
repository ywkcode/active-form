import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  devServer: {
    port: 8080,   // 端口号
  },
  plugins: [vue()],
})
