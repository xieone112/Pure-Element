/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/*.{test,spec}.?(c|m)[jt]s?(x)',
      '**/*.test2.tsx',
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
