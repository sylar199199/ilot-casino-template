<template>
  <CommonDialog v-model:visible="calcVisible">
    <div class="light-bg"></div>
    <div class="bonus-box-border">
      <div class="congrats"></div>
      <div class="bonus-box-content">
        <div class="bonus-box-inner">
          <div class="bonus-box-inner-content">
            <p class="you-win">You win</p>
            <p class="money" :text="`${currency.SYMBOL} ${calcMoney}`">{{ currency.SYMBOL }} {{ calcMoney }}</p>
          </div>
        </div>
      </div>
    </div>
  </CommonDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { numToAmount } from '@/utils/filters'
import CommonDialog from '@/components/CommonDialog/index.vue'
import { useCurrency } from '@/composables/useCurrency'

export default defineComponent({
  components: {
    CommonDialog,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    money: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    calcVisible: {
      get() {
        return this.visible
      },
      set(newVal: boolean) {
        this.$emit('update:visible', newVal)
      },
    },
    calcMoney() {
      return numToAmount(this.money as number)
    },
  },
  setup() {
    const { currency } = useCurrency()
    return { currency }
  },
})
</script>

<style lang="less" scoped>
.common-dialog /deep/ .common-dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 434px;
  background: transparent;
}

.common-dialog /deep/ .icon-close {
  top: auto;
  right: auto;
  bottom: 0;
  width: 25px;
  height: 25px;
  background: url('@/assets/icon/icon-close-large.png') center center / 100% 100% no-repeat;
}

.light-bg {
  position: absolute;
  width: 434px;
  height: 434px;
  background: url('../images/light-bg.png') center center / 100% 100% no-repeat;
  animation: rotate 3s linear 0s infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.congrats {
  position: absolute;
  top: -70px;
  width: 266px;
  height: 126px;
  background: url(../images/congrats.png) center center / 100% 100% no-repeat;
}

.bonus-box-border {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 303px;
  height: 164px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(65, 78, 254, 1), rgba(69, 91, 255, 1));
}

.bonus-box-content {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 299px;
  height: 160px;
  background: linear-gradient( 180deg, #350098 0%, #2C4FED 100%);
  border-radius: 15px;
}

.bonus-box-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 115px;
  border-radius: 16px;
  background: #333DF2;
}

.bonus-box-inner-content {
  width: 246px;
  height: 111px;
  border-radius: 15px;
  background: linear-gradient( 180deg, #121658 0%, #1520A0 100%);
}

.you-win {
  padding-top: 25px;
  font-size: 23px;
  font-weight: bold;
  color: #FFEB62;
  text-align: center;
  line-height: 16px;
  text-transform: uppercase;
}

.money {
  position: relative;
  padding-top: 3px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  line-height: 45px;
  text-shadow: 0px 2px 0px #B77F00;
  &::before {
    content: attr(text);
    position: absolute;
    background: linear-gradient(180deg, #FFDD36 0%, #FFFFFF 53%, #F9CD46 56%, #F7C135 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
  }
}
</style>
