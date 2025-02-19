import { defineStore } from 'pinia'
import api from '@/apis'

export const useMRouletteStore = defineStore('million-roulette', {
  // 持久化
  persist: {
    key: 'ilot-game-million-roulette',
    storage: window.sessionStorage,
  },

  state: () => {
    return {
      gameId: 50014,
      betMoney: 100,
      handleBetMoney: 0,
      selectedChipId: '',
      topListKey: Date.now(),
      topList: [], // 大奖播报
    }
  },

  getters: {
    userRank: (state: any) => {
      const userRank = state.ranks.filter((rank: any) => rank.uid === state.uid)[0]
      return userRank ? userRank.no : ''
    }, // 用户排名
  },

  actions: {
    // 获取排行榜
    // async getRanks(matchId: string) {
    //   const data = { matchId }
    //   const res = await (api as any).getRanks(data)
    //   if (res.code === 0 && res.data) {
    //     this.ranks = res.data.ranks || []
    //     this.uid = res.data.uid
    //   }
    // },
  },
})

