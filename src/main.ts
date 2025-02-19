import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './plugins/pinia'
import http from './plugins/http'
import np from './plugins/np'
import dayjs from './plugins/dayjs'
import utils from './plugins/utils'
import filters from './plugins/filters'
import mitt from './plugins/mitt'
import deviceUUID from './plugins/deviceUUID'
import fireBase from './plugins/fireBase'
import i18n from './locales'

createApp(App)
  .use(router)
  .use(pinia)
  .use(http)
  .use(np)
  .use(dayjs)
  .use(utils)
  .use(filters)
  .use(mitt)
  .use(i18n)
  .use(deviceUUID)
  .use(fireBase)
  .mount('#app')
