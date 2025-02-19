import { App } from 'vue'
import * as filters from '@/utils/filters'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: typeof filters
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$filters = filters
  },
}
