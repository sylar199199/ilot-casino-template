import { App } from 'vue'
import dayjs from 'dayjs'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs
  },
}
