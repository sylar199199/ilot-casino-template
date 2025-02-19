import store from '@/store'
import { getTargetOrigin } from '@/utils/getTargetOrigin'

export function toLogin() {
  if (window !== window.parent) { // iframe嵌套
    const data = { type: 'login', fromURL: location.href }
    window.parent.postMessage({ data }, getTargetOrigin())
  } else {
    store.commit('SET_LOGIN_DIALOG_SHOW', { status: true, type: 'login' })
  }
}
