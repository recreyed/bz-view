import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/noAuth': {
        target: 'https://bz-view-node-dc2t2onjk-recreyed.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/noAuth/, ''),
      },
      '/common': {
        target: 'https://bz-view-node-dc2t2onjk-recreyed.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/common/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

