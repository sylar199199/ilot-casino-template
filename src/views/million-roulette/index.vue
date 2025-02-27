<template>
  <div ref="pageContainer" class="page-container ignore-pxtorem relative">
    <GameHeader
      @help="gameHelpVisible = true"
      @history="gameRecordsVisible = true"
      @sound="soundControlVisible = true"
    />
    <RoulettePanel />
    <!--     投注提示-->
<!--    <GameTips >Place Your Bet</GameTips>-->

    <Board />
    <!--    游戏帮助-->
    <GameHelp v-if="gameHelpVisible" v-model:visible="gameHelpVisible" />
    <!--    中奖弹窗-->
    <GameWin v-if="gameWinVisible" v-model:visible="gameWinVisible" :money="gameWinAmount" />
    <!--    历史记录-->
    <GameRecords v-model:visible="gameRecordsVisible"/>
    <!--    声音控制-->
    <SoundControl v-if="soundControlVisible" v-model:visible="soundControlVisible" />
    <!--    没钱提示-->
    <NoMoneyTip v-model:visible="noMoneyTipVisible" />

    <CommonLoading v-if="betLoading" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, defineAsyncComponent } from 'vue'
import { mapState } from 'pinia'
import { useCommonStore } from '@/stores/common'
import { useUserStore } from '@/stores/user'
import { useMRouletteStore } from '@/stores/million-roulette'
import {useMusicStore} from '@/stores/music'
import { playGameBgMusic } from './utils/playGameMusic'
import checkCanBet from 'ilot-common/ilot-check-canbet'
import GameHeader from './components/GameHeader.vue'
import Board from './components/Board.vue'

import './styles/fontface.less'
import './styles/flychip.less'
import RoulettePanel from '@/views/million-roulette/components/RoulettePanel.vue'

export default defineComponent({
  components: {
    RoulettePanel,
    GameHeader,
    Board,
    GameTips: defineAsyncComponent(() => import('./components/GameTips.vue')),
    GameHelp: defineAsyncComponent(() => import('./components/GameHelp.vue')),
    GameWin: defineAsyncComponent(() => import('./components/GameWin.vue')),
    GameRecords: defineAsyncComponent(() => import('./components/GameRecords.vue')),
    SoundControl: defineAsyncComponent(() => import('./components/SoundControl.vue')),
    NoMoneyTip: defineAsyncComponent(() => import('@/components/NoMoneyTip/index.vue')),
    CommonLoading: defineAsyncComponent(() => import('@/components/CommonLoading/index.vue')),
  },
  setup() {
    const commonStore = useCommonStore()
    const userStore = useUserStore()
    const mRouletteStore = useMRouletteStore()
    const musicStore = useMusicStore()
    return { commonStore, userStore, mRouletteStore, musicStore }
  },
  data() {
    return {
      bg: null,
      beting: false, // 投注防抖
      eventDataList: <any>[], // 投注事件汇总
      toggleStage: false,
      betLoading: false,
      gameHelpVisible: false,
      gameWinVisible: false,
      gameWinAmount: 0,
      gameRecordsTab: 'betHistory',
      gameRecordsVisible: false,
      soundControlVisible: false,
      setProfileVisible: false,
      noMoneyTipVisible: false,
      usedCouponData: null as any,
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLogin', 'loginInfo', 'accountInfo', 'couponData']),
    ...mapState(useMRouletteStore, ['betMoney', 'gameId']),
  },
  watch: {
    isLogin: {
      immediate: true,
      handler(newVal: boolean) {
        if (newVal) {
          this.userStore.queryCouponList(this.gameId.toString())
        }
      }
    },
    loginInfo: {
      deep: true,
      immediate: true,
      handler(newVal) {
      }
    },
  },
  created() {
    this.initGame()
  },
  methods: {
    initGame() {
      this.loadAsyncComponent()
      this.musicStore.mainBgMusic = playGameBgMusic('bg.mp3', {loop: true})
      this.musicStore.mainBgMusicPlayStatus = true
    },
    // 加载异步组件
    loadAsyncComponent() {
      document.onload = () => {
        !(() => import('./components/GameTips.vue'))()
        !(() => import('./components/GameHelp.vue'))()
        !(() => import('./components/GameWin.vue'))()
        !(() => import('./components/GameRecords.vue'))()
        !(() => import('./components/SoundControl.vue'))()
        !(() => import('@/components/SetProfile/index.vue'))()
        !(() => import('@/components/NoMoneyTip/index.vue'))()
        !(() => import('@/components/CommonLoading/index.vue'))()
        !(() => import('./audios/bg.mp3'))()
      }
    },

  },
})
</script>

<style lang="less" scoped>
.page-container {
  //background: url("./images/bg-vertical-container.png") no-repeat center / cover;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  color: #ffffff;
}
</style>
