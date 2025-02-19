import { useUserStore } from '@/stores/user'
import { useCommonStore } from '@/stores/common'

async function iframeHandler(data: any) {
  const userStore = useUserStore()
  const commonStore = useCommonStore()
  if (data.type === 'iframeClose') {
    userStore.setLoginDialogShow({ status: false, type: 'login' })
  } else if (data.type === 'loginSuccess') {
    data.token && localStorage.setItem('token', data.token)
    await userStore.getLoginInfo()
    await userStore.getAccountInfo()
    userStore.setLoginDialogShow({ status: false, type: 'login' })
    commonStore.msgData = {
      msg: 'Login successful',
      msgType: 'success',
      status: true,
      num: Math.random(),
    }
    userStore.isLogin = true
  } else if (data.type === 'registerSuccess') {
    data.token && localStorage.setItem('token', data.token)
    await userStore.getLoginInfo()
    await userStore.getAccountInfo()
    userStore.setLoginDialogShow({ status: false, type: 'register' })
    commonStore.msgData = {
      msg: 'Register successful',
      msgType: 'success',
      status: true,
      num: Math.random(),
    }
    userStore.isLogin = true
  } else if (data.type === 'changeLoginComponent') {
    userStore.setLoginDialogShow({ status: true, type: data.name })
  }
}

export default iframeHandler
