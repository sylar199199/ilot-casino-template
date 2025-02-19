import { useUserStore } from '@/stores/user'
import { useCommonStore } from '@/stores/common'

// 响应处理
export function responseHandler(res: any) {
  if (res.data.code !== 0 && res.data.msg) {
    const commonStore = useCommonStore()
    commonStore.showMsg({
      msg: res.data.msg,
      msgType: 'warning',
    })

    // 登录态失效
    if (res.data.code === 20018) {
      localStorage.removeItem('token')
      const userStore = useUserStore()
      userStore.isLogin = false
      userStore.loginInfo = {}
      userStore.accountInfo = {}
      userStore.loginDialogShow = { status: true, type: 'login' }
    }
  }
  return res.data
}

// 保存浏览器参数到SessionStorage，参数用作后续api回调
export function errorHandler(error: any) {
  if (error && error.stack) {
    const commonStore = useCommonStore()
    commonStore.netWorkError = true
  }

  return error
}

// 错误处理
export function saveQueryParamsToSessionStorage() {
  if (!sessionStorage) return
  // 如果已经存在则返回（不替换）
  let param = sessionStorage.getItem('ad-query-param')
  // 初始化链接参数
  let initQuery = getinitQuery('') || {}
  if (initQuery.c) {
    sessionStorage.setItem('channel', initQuery.c || '')
  }
  if (param && JSON.stringify(param) !== '{}') return
  // 为空不保存
  if (!initQuery || JSON.stringify(initQuery) === '{}') return
  // 广告平台归因回传参数保存到session，参数用作后续api回调
  sessionStorage.setItem('ad-query-param', JSON.stringify(initQuery))
}

// 获取浏览器参数到SessionStorage
export function getQueryParamsBySessionStorage() {
  if (!sessionStorage) return
  return sessionStorage.getItem('ad-query-param')
}

export const getinitQuery = (href: string = window.location.href): Record<string, string> => {
  const initQuery: Record<string, string> = {};
  let search = '';

  try {
    search = href.split('?')[1]?.split('#')[0] || '';
  } catch (err) {
    console.log(err)
  }

  if (!search) return initQuery;

  const searchList = search.split('&');

  for (const item of searchList) {
    if (!item) continue;
    const [key, value = ''] = item.split('=');
    if (key) initQuery[key] = value;
  }

  return initQuery;
}
