<template>
  <div class="wallet d-flex  align-center colorWhite">
    <img class='icon-wallet' src="../images/icon-wallet.png" id="lucky-dice-wallet" />
    <span class='uint-money font14 marginLeft5'>{{currency['CODE']}}</span>
<!--    <span class='balance-value marginLeft5' v-if='userStore.isLogin'>{{ calcUserBalance }}</span>-->
    <span class='balance-value marginLeft5' v-if='userStore.isLogin'>{{ fmoney(accountInfo.totalBalance) }}</span>
    <span class='balance-value marginLeft5' v-else>--</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCurrency } from '@/composables/useCurrency'
import { fmoney, tMoney } from '@/utils/filters'

export default defineComponent({
  setup() {
    const { currency } = useCurrency()
    const userStore = useUserStore()
    return { currency, fmoney, userStore }
  },
  components: {},

  props: {},
  computed: {
    ...mapState(useUserStore, ['accountInfo']),
    calcUserBalance() {
      return tMoney(this.accountInfo.totalBalance)
    },
  },
  methods: {},
})
</script>

<style lang="less" scoped>
.wallet {
  width: 167px;
  height: 26px;
  margin-left: 50px;
  .icon-wallet {
    width: 16px;
    height: 14px;
  }
  .balance-value {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #FFCE22;
  }
}


</style>
