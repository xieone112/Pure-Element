import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pure Element",
  description: "一套基于 Vue 3 与 TypeScript 的轻量组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '全局 API', link: '/api-examples' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Alert 提示', link: '/components/alert' },
          { text: 'Message 消息', link: '/components/message' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Icon 图标', link: '/components/icon' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Form 表单', link: '/components/form' },
        ]
      }
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
      },
    },
  },
})
