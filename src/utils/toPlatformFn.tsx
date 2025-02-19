import { getHostUrl } from './hostUrl'

// 跳转提现页
export function goWithdraw() {
  const origin = getHostUrl()
  const { href } = location
  location.href = `${origin}/withdraw?fromUrl=${href}`
}

// 跳转充值页
export function goDeposit() {
  const origin = getHostUrl()
  const { href } = location
  location.href = `${origin}/recharge?fromUrl=${href}`
}

export function goHome() {
  if (window === window.parent) {
    location.href = window.location.protocol + '//' + window.location.host + '/casino'
  } else {
    if (localStorage.getItem('countryCode') === 'ke') {
      const routeName = /content/.test(location.search) ? 'casino' : 'home'
      window.parent.postMessage({name: 'router', routeName}, location.origin)
    } else {
      window.parent && (window.parent as any).vm.$store.dispatch('getPackageComp', { packageName: 'ExitGameDialog' })
    }
  }
}
