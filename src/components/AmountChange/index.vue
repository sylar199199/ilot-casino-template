<template>
  <!-- 个人金额变动提示模块 -->
  <div class="user-win">
    <template v-for="item in totalNum" :key="item">
      <span
        class="main-tit"
        :class="{
          'hide': item < totalNum
        }"
        :style="{
          'bottom': `${item}px`,
          'opacity': `${item === 30 ? 1 : 0.01 * item}`
        }"
        :text="winMoney"
      >
        {{ winMoney }}
      </span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { playAmountMusic } from './utils/playAmountMusic'

export default {
  data() {
    return {
      winMoney: 0,
      totalNum: 0,
      totalNumTimer: null,
      blShow: false,
      hideTimer: null
    }
  },
  computed: {
    ...mapState(useUserStore, ['accountInfo']),
  },
  watch: {
    'accountInfo.totalBalance': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (!oldVal || newVal === oldVal) return
        this.blShow = false
        this.$nextTick(() => {
          this.winMoney = this.$NP.plus(newVal, -oldVal)
          if (this.winMoney > 0) {
            this.winMoney = '+' + this.winMoney
            playAmountMusic('win-money.mp3', { loop: false }) // 赢钱音效
          }
          this.blShow = true
          this.hideTimer && clearTimeout(this.hideTimer)
          this.totalNumTimer && clearTimeout(this.totalNumTimer)
          this.totalNum = 0
          this.setTotalNum()
          this.hideTimer = setTimeout(() => {
            this.blShow = false
            this.totalNum = 0
          }, 5000)
        })
      }
    }
  },
  beforeDestroy() {
    this.hideTimer && clearTimeout(this.hideTimer)
    this.totalNumTimer && clearTimeout(this.totalNumTimer)
    this.hideTimer = null
    this.totalNumTimer = null
    this.blShow = false
    this.totalNum = 0
  },
  methods: {
    setTotalNum() {
      this.totalNum++
      if (this.totalNum >= 30) return
      this.totalNumTimer = setTimeout(() => {
        this.setTotalNum()
      }, 5)
    }
  }
}
</script>

<style lang="less" scoped>
.user-win{
  position: absolute;
  left: 73px;
  top: 24px;
  display: flex;
  .main-tit {
    position: absolute;
    left: 0;
    width: 100%;
    white-space: nowrap;
    text-align: center;
    z-index: 2;
    font-size: 14px;
    font-weight: 500;
    color: #FFD338;
    &.hide{
      transition: all linear .5s;
      opacity: 0 !important;
    }
  }
}
</style>
