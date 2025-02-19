import { App } from 'vue'
import { Message, ElMessage } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: Message,
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$message = ElMessage
  }
}
