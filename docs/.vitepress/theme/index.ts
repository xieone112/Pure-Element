import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import '@/styles/index.scss'
import './custom.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

library.add(fas)

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', AntDesignContainer)
  },
}