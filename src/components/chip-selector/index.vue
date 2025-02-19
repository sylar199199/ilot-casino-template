<template>
  <div class="chip-selector-content" id="chip-selector-content">
    <div class="left-arrow" @click="arrowClick('left')"></div>
    <div class="right-arrow" @click="arrowClick('right')"></div>
    <div class="chip-selector" ref="chipSelector">
      <div
        class="chip-selector-box"
        :class="[`color-${item.color}`, { disabled }, mode]"
        v-for="(item, i) in calcChipList"
        :id="`chip-${item.color}`"
        :key="item.value"
        @click="boxSelect(item, i)"
      >
        <div v-show="currentAmount === item.value || item.active" class="chip-active"></div>
        {{ item.label }}
      </div>
      <div v-if="disabled" class="chip-layer" :style="{ width: 56 * calcChipList.length + 'px' }"></div>
    </div>
    <!-- 置顶筹码 -->
    <div
      v-if="toppingChipShow"
      class="topping-chip chip-selector-box"
      :class="[`color-${toppingChip.color}`, mode, {'event-none': toppingChipEventNone}]"
      @click="toppingChipClick"
      @touchmove="toppingChipEventNone = true"
      @touchend="toppingChipEventNone = false"
    >
      <div v-show="currentAmount === toppingChip.value || toppingChip.active" class="chip-active"></div>
      {{ toppingChip.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useMRouletteStore } from '@/stores/million-roulette'
import { useUserStore } from '@/stores/user'
import {getChipList, getDefaultAmount, getDefaultColor} from './utils/chip'

export default defineComponent({
  name: 'ChipSelector',
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    balance: {
      type: [Number, String],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: '', // multiple-虚拟联赛串关
    },
    // 缓存的订单金额，用于设置默认投注额
    cacheOrderAmount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      initAmountFlag: false,
      arrowMove: 100,
      toppingChipShow: true,
      toppingChipEventNone: false,
    }
  },
  setup() {
    const userStore = useUserStore()
    const mRouletteStore = useMRouletteStore()
    return { userStore, mRouletteStore }
  },
  computed: {
    ...mapState(useUserStore, ['isLogin']),

    currentAmount: {
      get() {
        return this.amount
      },
      set(newVal: any) {
        this.$emit('update:amount', newVal)
      },
    },
    calcChipList() {
      return getChipList()
    },
    toppingChip() {
      return this.calcChipList[this.calcChipList.length - 2]
    },
  },
  watch: {
    isLogin: {
      immediate: true,
      handler(newVal, oldVal) {
        // console.log('isLogin', newVal, oldVal)
        if (newVal && oldVal === false) {
          setTimeout(() => {
            this.initAmount()
          }, 500)
        }
      },
    },
    startNewRound: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.initAmount()
        }
      },
    },
  },
  mounted() {
    this.checkInitAmount()
    this.initSelector()
  },
  methods: {
    initSelector() {
      let box = this.$refs.chipSelector as HTMLElement
      let isDragging = false // 是否正在拖拽
      let startX: number, startY: number, scrollLeft: number, scrollTop: number // 鼠标按下时的位置和盒子的滚动位置
      const lastBox = box.querySelectorAll('.chip-selector-box')[this.calcChipList.length - 1] as HTMLElement
      const lastBoxLeft = lastBox.offsetLeft
      const boxWidth = box.offsetWidth

      // 鼠标横向拖拽
      box.addEventListener('mousedown', e => {
        isDragging = true
        startX = e.pageX - box.offsetLeft
        startY = e.pageY - box.offsetTop
        scrollLeft = box.scrollLeft
        scrollTop = box.scrollTop
      })
      box.addEventListener('scroll', (e: any) => {
        this.toppingChipShow = box.scrollLeft <= (lastBoxLeft - boxWidth - 3)
      })
      document.addEventListener('mousemove', e => {
        if (isDragging) {
          let distanceX = e.pageX - box.offsetLeft - startX
          let distanceY = e.pageY - box.offsetTop - startY
          box.scrollLeft = scrollLeft - distanceX
          box.scrollTop = scrollTop - distanceY
        }
      })
      document.addEventListener('mouseup', e => {
        isDragging = false
      })
    },
    initAmount() {
      (window as any).initChipSelector = true
      const balance = this.isLogin ? parseFloat(this.balance as any) : 0
      let defaultAmount
      if (this.mRouletteStore.handleBetMoney && balance >= this.mRouletteStore.handleBetMoney) {
        defaultAmount = this.mRouletteStore.handleBetMoney
      } else {
        defaultAmount = Math.max(this.cacheOrderAmount, getDefaultAmount(balance))
      }

      this.currentAmount = defaultAmount
      this.scrollTo(defaultAmount)
      this.$emit('chipSelected', {
        value: defaultAmount,
        color: getDefaultColor(defaultAmount)
      })
    },
    checkInitAmount() {
      if ((window as any).initChipSelector) {
        this.scrollTo(this.currentAmount)
      } else {
        setTimeout(() => {
          this.initAmount()
        }, this.cacheOrderAmount ? 0 : 500)
      }
    },
    boxSelect(item: any, i: number) {
      if (this.disabled) return
      item.active = true
      this.$forceUpdate()
      setTimeout(() => {
        item.active = false
        this.$forceUpdate()
      }, 200)
      this.checkEdge(i)
      this.currentAmount = item.value
      this.mRouletteStore.handleBetMoney = item.value
      this.$emit('chipSelected', item)
    },
    checkEdge(i: number) {
      const container = document.querySelector('.chip-selector') as HTMLElement
      const div = container.querySelectorAll('.chip-selector-box')[i] as HTMLElement
      const containerRect = container.getBoundingClientRect() // 获取容器的位置信息
      const divRect = div.getBoundingClientRect() // 获取 div 的位置信息
      const edgeThreshold = 0 // 边缘阈值
      function getNearEdge() {
        // 计算 div 的边缘与容器边缘的距离
        const divLeftEdgeDistance = divRect.left - containerRect.left
        const divRightEdgeDistance = containerRect.right - divRect.right
        const nearLeftEdge = divLeftEdgeDistance - edgeThreshold // 距离左边缘的长度
        const nearRightEdge = divRightEdgeDistance - edgeThreshold // 距离右边缘的长度
        return {
          nearLeftEdge,
          nearRightEdge,
        }
      }

      const { nearLeftEdge, nearRightEdge } = getNearEdge()
      if (nearLeftEdge < 0) {
        container.scrollTo({
          left: container.scrollLeft + nearLeftEdge - divRect.width,
          behavior: 'smooth',
        })
      } else if (nearRightEdge < 0) {
        container.scrollTo({
          left: container.scrollLeft - nearRightEdge + divRect.width,
          behavior: 'smooth',
        })
      }
    },
    scrollTo(amount: any) {
      this.$nextTick(() => {
        const box = this.$refs.chipSelector as HTMLElement
        const chipIndex = this.calcChipList.findIndex(item => item.value === amount)
        if (box) {
          const prevIndex = chipIndex === 0 ? 0 : chipIndex - 1
          const boxItem = box.querySelectorAll('.chip-selector-box')[prevIndex] as HTMLElement
          if (boxItem) {
            box.scrollLeft = boxItem.offsetLeft
          }
        }
      })
    },
    arrowClick(type: any) {
      const container = document.querySelector('.chip-selector') as HTMLElement
      const arrowMove = type === 'right' ? this.arrowMove : -this.arrowMove
      container.scrollTo({
        left: container.scrollLeft + arrowMove,
        behavior: 'smooth',
      })
    },
    toppingChipClick() {
      this.scrollTo(this.toppingChip.value)
      const i = this.calcChipList.findIndex(item => item.value === this.toppingChip.value)
      this.boxSelect(this.toppingChip, i)
    },
  },
})
</script>

<style lang='less' scoped>
.chip-selector-content {
  position: relative;
  max-width: 375px;
  padding: 0 32px;
  box-sizing: border-box;

  .left-arrow {
    position: absolute;
    top: 50%;
    left: 0;
    width: 28px;
    height: 28px;
    background: url('./images/left-arrow.png') no-repeat center / 100%;
    transform: translateY(-50%);
  }

  .right-arrow {
    position: absolute;
    top: 50%;
    right: 0;
    width: 28px;
    height: 28px;
    background: url('./images/right-arrow.png') no-repeat center / 100%;
    transform: translateY(-50%);
  }

  .chip-selector {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    user-select: none;
    background:#06157A;
    border: 1px solid #06157A;
    border-radius: 30px;
    padding: 0 6px 0 3px;
    overflow-y: hidden;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }

  .chip-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 2;
  }

  .chip-selector-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    font-weight: 900;
    font-size: 14px;
    color: #000000;
    margin-left: -1px;
    cursor: pointer;
    background: url('./images/chip-red.png') no-repeat center bottom / 42px;

    &:active {
      .chip-active {
        display: block !important;
      }
    }

    &.color-red {
      background: url('./images/chip-red.png') no-repeat center bottom / 42px;
    }

    &.color-black {
      background: url('./images/chip-black.png') no-repeat center bottom / 42px;
    }

    &.color-blue {
      background: url('./images/chip-blue.png') no-repeat center bottom / 42px;
    }

    &.color-green {
      background: url('./images/chip-green.png') no-repeat center bottom / 42px;
    }

    &.color-orange {
      background: url('./images/chip-orange.png') no-repeat center bottom / 42px;
    }

    &.color-pink {
      background: url('./images/chip-pink.png') no-repeat center bottom / 42px;
    }

    &.color-skyblue {
      background: url('./images/chip-skyblue.png') no-repeat center bottom / 42px;
    }

    &.color-yellow {
      background: url('./images/chip-yellow.png') no-repeat center bottom / 42px;
    }

    &.color-khaki {
      background: url('./images/chip-khaki.png') no-repeat center bottom / 42px;
    }
  }

  .chip-active {
    position: absolute;
    top: 1px;
    left: 0;
    width: 44px;
    height: 44px;
    box-shadow: 0 0 6px 0 #FFFA9D;
    border-radius: 50%;
    border: 2px solid #FFFA9D;
  }

  .topping-chip {
    position: absolute;
    top: 0;
    right: 30px;

    &.event-none {
      pointer-events: none;
    }
  }
}
</style>
