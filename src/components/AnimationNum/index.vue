<template>
  <span class="animate-num">{{ calcNumView }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    num: {
      type: Number,
      required: true,
    },
    formatter: {
      type: Function,
      default: (num: number) => num,
    },
  },
  data() {
    return {
      numView: 0,
    }
  },
  computed: {
    calcNumView() {
      const calcNumView = this.formatter(this.numView)
      if (this.num < 100) {
        const tail = String(calcNumView).match(/\.\d+/)
        return calcNumView.replace(/\.\d+/, '') + (tail ? tail[0].padEnd(3, '0') : '.00')
      } else {
        return calcNumView
      }
    },
  },
  watch: {
    num: {
      immediate: true,
      handler(newVal: number, oldVal: number) {
        if (!newVal) return
        if (!oldVal) oldVal = 0
        const newVal10 = this.$NP.times(newVal, 10)
        const getFloatNum = () => {
          if (Math.ceil(newVal) === newVal) { // 整数
            return 0
          } else if (Math.ceil(newVal10) === newVal10) { // 1位小数
            return 1
          } else { // 2位小数
            return 2
          }
        }
        const floatNum = getFloatNum()
        const minStep = newVal < 100 ? 0.01 : 1 / Math.pow(10, floatNum)
        let diff = this.$NP.divide(this.$NP.plus(newVal, -oldVal), 60)
        diff = diff < minStep ? minStep : diff
        this.numView = oldVal
        const step = () => {
          if (this.numView + diff < newVal) {
            this.numView = this.$NP.round(this.$NP.plus(this.numView, diff), newVal < 100 ? 2 : floatNum)
            window.requestAnimationFrame(step)
          } else {
            this.numView = newVal
          }
        }
        window.requestAnimationFrame(step)
      },
    },
  },
})
</script>
