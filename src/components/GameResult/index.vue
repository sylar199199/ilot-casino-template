<template>
  <CommonDialog v-model:visible="calcVisible">
    <div class="success-icon"></div>
    <div class="bonus-box">
      <p class="conragts">Conragts！You get</p>
      <p class="money">{{ $t('common.currencySYMBOL') }} {{ calcMoney }}</p>
    </div>
    <div class="again-btn" @click="tryAgain">TRY AGAIN</div>
  </CommonDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { numToAmount } from '@/utils/filters'
import CommonDialog from '@/components/CommonDialog/index.vue'

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
  methods: {
    tryAgain() {
      this.calcVisible = false
      this.$emit('try-again')
    },
  },
})
</script>

<style lang="less" scoped>
.common-dialog {
  :deep(.common-dialog-content) { // NOSONAR
    width: 303px;
    height: 243px;
    background: #765BE1;
    border-radius: 8px;
  }
}

.common-dialog {
  :deep(.icon-close) { // NOSONAR
    top: auto;
    right: auto;
    bottom: -46px;
    width: 25px;
    height: 25px;
    background: url('@/assets/icon/icon-close-large.png') center center / 100% 100% no-repeat;
  }
}

.success-icon {
  position: relative;
  z-index: 1;
  margin-top: -80px;
  width: 290px;
  height: 138px;
  background: url(./images/icon-congrats.png) center center / 100% 100% no-repeat;
}

.conragts {
  padding-top: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #FFD338;
  text-align: center;
  line-height: 16px;
}

.money {
  padding-top: 9px;
  font-size: 36px;
  font-weight: bold;
  color: #FFD338;
  text-align: center;
  line-height: 45px;
}

.again-btn {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  background: #19B864;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 16px;
}
</style>
