import { App } from 'vue'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getQueryParamsBySessionStorage } from './../utils/utils'

const firebaseConfig = {
  apiKey: 'AIzaSyCnXcYHqF0ZkRUf32juA3iaak-TGBuMNV0',
  authDomain: 'ilot-platform.firebaseapp.com',
  projectId: 'ilot-platform',
  storageBucket: 'ilot-platform.appspot.com',
  messagingSenderId: '162900212373',
  appId: '1:162900212373:web:b8d5e8d9fc4586d199f99c',
  measurementId: 'G-09B7E67RGD'
}

const firebase:any = initializeApp(firebaseConfig)
firebase['getAnalytics'] = getAnalytics
firebase['logEvent'] = logEvent

class EventTrack {
  /**
   * 埋点上报(基于FireBase埋点事件)
   * @version  2.0
   * @param {*} eventName 事件名称
   * @param {*} EventParams  事件参数，json格式对象 比如：{'action':'buy','platfrom':'APP','device_id':'3xed323'}
   */
  async tracking_v2 (eventName: string,eventParams: { [x: string]: any } = {}) {
    /* 公共参数设置 */
    // 获取用户ID
    let qryParamObj = getQueryParamsBySessionStorage()
    // console.log(qryParamObj)
    if (qryParamObj) {
      let utm = JSON.parse(qryParamObj)
      eventParams['utm_source'] = utm.utm_source
      eventParams['utm_medium'] = utm.utm_medium
      eventParams['utm_campaign'] = utm.utm_campaign
      eventParams['channel_from'] = utm.c
    }
    // console.log(eventParams)
    // 调用JS SDK 上报
    const analytics = firebase.getAnalytics()
    firebase.logEvent(analytics, eventName, eventParams)
  }
}

const ET = new EventTrack()
export default {
  install(app: App) {
    app.config.globalProperties.$ET = ET
    app.provide('$ET', ET)
  },
}
