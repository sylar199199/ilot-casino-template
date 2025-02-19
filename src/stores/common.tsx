import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  // 持久化
  persist: {
    key: 'ilot-common-store',
    storage: window.sessionStorage,
  },

  state: () => {
    return {
      // 消息弹窗
      msgData: {
        msg: '', // 提示框信息
        msgType: 'error', // 提示框类型 error、warning、info、success
        status: false, // 提示框状态
        num: 1, // 用随机数
      },
      commonLoading: false,
      netWorkError: false,
      isVerticalScreen: true,
    }
  },

  actions: {
    showMsg({ msg, msgType }: any) {
      const obj = {
        msg,
        msgType,
        status: true,
        num: Math.random(),
      }
      this.msgData = obj
    }
  },
})
