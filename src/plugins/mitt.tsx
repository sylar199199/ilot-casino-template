import { App } from 'vue'
import mitt from 'mitt'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $mitt: any,
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$mitt = mitt()
    app.provide('$mitt', mitt())
  },
}
