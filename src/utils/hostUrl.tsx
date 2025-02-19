export function getHostUrl() {
  // 获取当前域名
  const origin = location.origin
  if (/http:\/\/localhost:/.test(origin)) {
    return process.env.VITE_ENV === 'dev' ? 'http://10.9.2.57:8308' : 'http://10.9.2.62:8308'
  } else {
    return origin
  }
}
