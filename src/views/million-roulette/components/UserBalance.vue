<template>
  <div class="user-balance">
    <div class="balance-bg"></div>
    <div class="balance-content">
      <span class="balance-name">Balance:</span>
      <span class="balance-value" v-if="userStore.isLogin">{{ numToAmount(userBalance.value) }}{{ userBalance.unit }}</span>
      <span class="balance-value" v-else="!userStore.isLogin">--</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { useUserBalance } from '@/composables/useUserBalance'
import { useUserStore } from '@/stores/user'
import { numToAmount } from '@/utils/filters'

export default defineComponent({
  setup() {
    const { currency } = useCurrency()
    const { userBalance } = useUserBalance(999999.99)
    const userStore = useUserStore()
    return { currency, userBalance, numToAmount, userStore }
  },
})
</script>

<style lang="less" scoped>
.user-balance {
  position: absolute;
  left: 44px;
  top: 14px;
  width: 142px;
  height: 24px;
}

.balance-bg {
  width: 142px;
  height: 24px;
  background: #02023B;
  box-shadow: inset 0px 1px 1px 0px rgba(0,0,0,0.12);
  opacity: 0.49;
  transform: skewX(-25deg);
  transform-origin: left bottom;
}

.balance-content {
  position: absolute;
  left: 0;
  top: 0;
  padding-bottom: 1px;
  display: flex;
  align-items: center;
  width: 142px;
  height: 24px;
}

.balance-name {
  padding-left: 20px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
}

.balance-value {
  padding-left: 3px;
  line-height: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #FFCE22;
}
</style>
