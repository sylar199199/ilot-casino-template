export function debounce(fn: any, delay = 500) { // NOSONAR
  let timer: any
  return function (this: any) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn.call(this, ...arguments, resolve, reject)
      }, delay)
    })
  }
}

export function throttle(fn: any, delay = 300) { // NOSONAR
  let timer: any
  let flag = true
  return function (this: any) {
    return new Promise((resolve, reject) => {
      if (flag) {
        fn.call(this, ...arguments, resolve, reject)
        flag = false
      }
      if (timer) return null
      timer = setTimeout(() => {
        timer = null
        flag = true
      }, delay)
    })
  }
}

/**
 * 延迟执行
 * @param {*} fn 方法
 * @param {*} delay 延时时间 单位：秒
 * @returns 返回
 */
export function delay(fn: any, delay = 1) { // NOSONAR
  return function (this: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn.call(this, ...arguments, resolve, reject)
      }, delay * 1000)
    })
  }
}
