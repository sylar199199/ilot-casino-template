import axios from 'axios'
import mocks from '@/mock'
import rsaUtil from 'ilot-common/ilot-sign'
import { checkPlatform } from './common'
import { responseHandler, errorHandler } from './utils'

const http = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 15000,
})

// mock开关
const mockSwitch = false
const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test'

const platform = checkPlatform();
(window as any).platform = platform;
(window as any).deviceID = localStorage.getItem('deviceCode');
(window as any).deviceSoftVersion = process.env.VITE_VERSION

// 请求拦截器
http.interceptors.request.use(
  function (config: any) {
    if (config.data && config.data.baseURL) {
      config.baseURL = config.data.baseURL
      delete config.data.baseURL
    }
    // 添加公共参数
    let deviceCode = localStorage.getItem('deviceCode')
    let deviceSoftVersion = process.env.VITE_VERSION
    let platformModel = '1.0'
    if (!(config.data && config.data.normalData)) {
      let normalData = {
        deviceCode: deviceCode, // 设备编号:如果是web页面或者app则传Mac地址
        deviceSoftVersion: deviceSoftVersion, // 设备软件版本号:如果是web页面或者app则传前端包版本
        platform: platform, // 平台：0-投注设备，1-IOS，2-Android，3-H5，4-PC
        platformModel: platformModel, // 平台型号:投注机传设备型号，Android传Android版本，IOS传IOS版本，PC传浏览器型号及版本
        timestamp: config.data && config.data.timestamp ? config.data.timestamp : new Date().getTime() // 设备编号:如果是web页面或者app则传Mac地址
      }
      config.data = Object.assign({}, config.data, normalData)
    }
    // 添加请求头
    const token = localStorage.getItem('token') || ''
    config.headers['User-Token'] = token
    config.headers['Sign'] = rsaUtil.signParams(config.data)
    config.headers['Country-Code'] = localStorage.getItem('countryCode') || 'ng'

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response: any) {
    const config = response.config
    if (isDev && mockSwitch && mocks[config.url]) {
      return responseHandler(mocks[config.url]())
    } else {
      return responseHandler(response)
    }
  },
  function (error) {
    const { config } = error
    if (isDev && mockSwitch && mocks[config.url]) {
      return responseHandler(mocks[config.url]())
    } else {
      return Promise.reject(errorHandler(error))
    }
  }
)

export default http
