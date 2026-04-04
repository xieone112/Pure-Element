import type { App } from "vue";
import Icon from "./Icon.vue";

Icon.install = (app: App) => {
  app.component(Icon.name || "pr-icon", Icon)
}

export default Icon
export * from './types'
