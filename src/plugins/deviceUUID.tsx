import { App } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export function buildUUID(): string {
  return uuidv4()
} 

export default {
  install(app: App) {
    localStorage.getItem('deviceCode') || localStorage.setItem('deviceCode', buildUUID())
  },
}
