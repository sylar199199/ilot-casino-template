import { App } from 'vue'
import { Axios } from 'axios'
import http from '@/utils/http'
import api from '@/apis'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: Axios,
    $api: any
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$http = http
    app.config.globalProperties.$api = api
    app.provide('$api', api)
  }
}
