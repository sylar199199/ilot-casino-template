export function getLoginType() {
  const registTime = localStorage.getItem('registTime')
  const forceLogin = localStorage.getItem('forceLogin')
  return !registTime && !forceLogin ? 'register' : 'login'
}
