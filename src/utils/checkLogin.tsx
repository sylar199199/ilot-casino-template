import { useUserStore } from '@/stores/user'

// 登录校验
export function checkLogin() {
  const userStore = useUserStore()
  if (!userStore.isLogin) {
    localStorage.setItem('forceLogin', 'true')
    userStore.setLoginDialogShow({status: true, type: 'login'})
    return false
  } else {
    return true
  }
}
