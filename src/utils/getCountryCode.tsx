/**
 * 根据路由获取国家代码
 */
export function getRouteCountryCode() {
  const { pathname } = window.location
  let countryCode = '' // 非兜底方案，无默认值
  if (/\/ng\/?$/.test(pathname)) {
    countryCode = 'ng'
  } else if (/\/ke\/?$/.test(pathname)) {
    countryCode = 'ke'
  } else if (/\/gh\/?$/.test(pathname)) {
    countryCode = 'gh'
  }
  return countryCode
}

/**
 * 根据缓存获取国家代码
 */
export function getLocalCountryCode() {
  return localStorage.getItem('countryCode') || '' // 非兜底方案，无默认值
}

/**
 * 根据时区获取国家代码
 */
export function getTimeZoneCountryCode() {
  const timeZone = new Date().getTimezoneOffset()
  if (timeZone === -180) return 'ke'
  if (timeZone === 0) return 'gh'
  return 'ng'
}
/**
 * 设置countryCode
 */
export function getCountryCode() {
  let countryCode // 默认尼日
  if (getRouteCountryCode()) {
    countryCode = getRouteCountryCode()
  } else if (getLocalCountryCode()) {
    countryCode = getLocalCountryCode()
  } else {
    countryCode = getTimeZoneCountryCode()
  }
  // 缓存到window上
  (window as any).countryCode = countryCode
  // 保存到本地localStorage
  localStorage.setItem('countryCode', countryCode)
  return countryCode
}


