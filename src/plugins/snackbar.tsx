import { App } from 'vue'
import snackbar from '@/components/app-snackbar/snackbar'

export default {
  install(app: App) {
    app.config.globalProperties.$snackbar = snackbar
  },
}
