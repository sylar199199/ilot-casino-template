/*
* common.js
* 说明：定义通用的方法，计算，消息，数据处理等
*/

// 判断是否为空
export function isEmpty(value: any) {
  return [null, undefined, ''].includes(value)
}

// 判断浏览器类型
export function getBrowser() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  // 判断是否Opera浏览器 OPR/43.0.2442.991
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  }
  // 判断是否Firefox浏览器 Firefox/51.0
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  // 判断是否IE浏览器  Trident/7.0 rv:11.0
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  }
  // 判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  }
  // Chrome/56.0.2924.87
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  // 判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
}

/**
 * 判断当前是否PC端环境
 */
export function isPc() {
  const userAgentInfo = navigator.userAgent;
  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];

  // 使用 for...of 循环遍历移动设备标识符
  for (const agent of mobileAgents) {
    if (userAgentInfo.includes(agent)) {
      return false; // 如果匹配到移动设备标识符，返回 false
    }
  }

  // 如果没有匹配到任何移动设备标识符，返回 true
  return true;
}

/**
 * 判断当前是否PC端环境
 * 平台：0-投注设备，1-IOS，2-Android，3-H5，4-PC
 */
export function checkPlatform() {
  if ((window as any).isApp) {
    return 2
  } else if (isPc()) {
    return 4
  } else if (localStorage.getItem('palmPayDeviceSN')) {
    return 5
  } else {
    return 3
  }
}

// 获取dom元素的绝对位置(top)
export function getTop(e: any) {
  let posTop = e.offsetTop
  if (e.offsetParent != null) {
    posTop += getTop(e.offsetParent)
  }
  return posTop
}

/**
 * 对象数组根据key去重
 * @param arr 数组
 * @param key 去重标识
 */
export function uniqueArr(arr: any, key: any) {
  return Object.values(arr.reduce((acc: any, cur: any) => {
    acc[cur[key]] = cur
    return acc
  }, {}))
}

/**
 * copy方法
 * @param {string} text
 */

export function copyFn(text: string) {
  // 兼容非安全域，非安全域下不可使用navigator.clipboard.writeText
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      // store.dispatch('showMsg', {
      //   msg: 'Copy succeeded !',
      //   msgType: 'success',
      // })
    })
    .catch((error) => {
      console.error('复制失败:', error)
    })
  } else {
    // 创建text area
    const textArea = document.createElement('textarea')
    textArea.value = text
    // 使text area不在viewport，同时设置不可见
    document.body.appendChild(textArea)
    textArea.style.opacity = '0'
    textArea.focus()
    textArea.select()
    textArea.remove()
    // store.dispatch('showMsg', {
    //   msg: 'Copy succeeded !',
    //   msgType: 'success',
    // })
  }
}
