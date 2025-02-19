import { App } from 'vue'
import NP from 'number-precision'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $NP: typeof NP
  }
}

const originPlus = NP.plus
const originMinus = NP.minus
const originTimes = NP.times
const originDivide = NP.divide

export const plus = function (...nums: any[]) {
  return nums.reduce((prev, curt) => {
    return originPlus(prev, isNaN(curt) ? 0 : curt)
  }, 0)
}

export const minus = function (...nums: any[]) {
  return nums.reduce((prev, curt) => {
    return originMinus(prev, isNaN(curt) ? 0 : curt)
  }, 0)
}

export const times = function (...nums: any[]) {
  return nums.reduce((prev, curt) => {
    return originTimes(prev, isNaN(curt) ? 0 : curt)
  }, 1)
}

export const divide = function (...nums: any[]) {
  return nums.reduce((prev, curt) => {
    return originDivide(prev, isNaN(curt) ? 1 : curt)
  })
}

NP.plus = plus
NP.minus = minus
NP.times = times
NP.divide = divide

export const $NP = NP

export default {
  install(app: App) {
    app.config.globalProperties.$NP = NP
  },
}
