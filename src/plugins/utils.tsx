import { App } from 'vue'
import * as utils from '@/utils'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $utils: typeof utils
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$utils = utils
  },
}
