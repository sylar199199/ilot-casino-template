import { defineStore } from 'pinia'
import api from '@/apis'
import { plus } from '@/plugins/np'
import moment from 'dayjs'

export const useUserStore = defineStore('user', {
  // 持久化
  persist: {
    key: 'ilot-user-store',
    storage: window.localStorage,
  },

  state: () => {
    return {
      // 是否登录
      isLogin: false,
      // 登录信息
      loginInfo: {} as any,
      // 账户信息
      accountInfo: {} as any,
      // 登录弹窗
      loginDialogShow: {
        status: false,
        type: 'login', // 'login' 'register'
      },
      // 优惠卷列表
      couponData: [],
    }
  },

  getters: {
    // 弹窗类型
    dialogType: (state: any) => state.loginDialogShow.type,
  },

  actions: {
    async getLoginInfo() {
      try {
        const res = await (api as any).queryPlayer({})
        if (!res || res.code !== 0) return
        const obj = { ...res.data }
        this.loginInfo = obj
      } catch (err: any) {
        return err
      }
    },
    async getAccountInfo() {
      try {
        const res = await (api as any).queryAccountInfo({})
        if (!res || res.code !== 0) return
        const obj = {
          ...res.data,
          totalBalance: plus(parseFloat(res.data.withdrawableBalance), parseFloat(res.data.rbalance || 0)),
        }
        obj.oldTotalBalance = obj.totalBalance
        this.accountInfo = obj
      } catch (err: any) {
        return err
      }
    },
    async queryCouponList(gameId: string) {
      if (!localStorage.getItem('token')) return
      try {
        let res = await (api as any).queryCoupons({})
        if (res.code !== 0) return
        let array = res.data.coupons || []
        let time = moment(new Date()).valueOf()
        array.forEach((val: any) => {
          val.getTime = time
          val.serverTime = moment(res.data.serverTime).valueOf()
        })
        console.log('打印用户优惠卷', array)
        array = filterCouponList(array, gameId)
        console.log('可用优惠卷', array)
        this.couponData = array
      } catch (err) {
        return err
      }
    },
    setLoginDialogShow(loginDialogShow: { status: boolean, type: string }) {
      if (loginDialogShow.status && window !== window.parent) { // iframe嵌套
        try {
          const parentLocationOrigin = window.parent.location.origin
          window.parent.postMessage({ name: 'login' }, parentLocationOrigin)
        } catch {
          this.loginDialogShow = loginDialogShow
        }
      } else {
        this.loginDialogShow = loginDialogShow
      }
    }
  },
})
// 过滤出可用的优惠券
const filterCouponList = function(array: any[], gameId: any): any[] {
  let availableList: any[] = []
  array.forEach((item: any) => {
    if (typeFit(item)) {
      availableList.push(item)
    }
  })
  function typeFit(coupon: any): boolean {
    // 过滤掉非现金劵
    if (coupon.cashType !== 'cash') return false
    // 全场通用  universal "specialGame"
    if (coupon.urange === 'universal') return true
    if (coupon.urange === 'specialType') {
      let codeArr = coupon.urangeCode.split('|')
      if (codeArr.includes('2')) {
        return true
      }
    }
    if (coupon.urange === 'specialGame') {
      let codeArr = coupon.urangeCode.split('|')
      if (codeArr.includes(gameId)) {
        return true
      }
    }
    return false
  }

  return couponsSort(availableList)
}
// 优惠券排序
const couponsSort = (arr: any) => {
  if (arr.length > 0) {
    arr.sort(
      (a: any, b: any) => {
        if (Number(b.faceValue) === Number(a.faceValue)) {
          return moment(a.expireEndTime).valueOf() - moment(b.expireEndTime).valueOf()
        } else {
          return Number(b.faceValue) - Number(a.faceValue)
        }
      }
    )
  }
  return arr
}
