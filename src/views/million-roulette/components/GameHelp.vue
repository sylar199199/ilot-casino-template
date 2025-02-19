<template>
  <CommonDialog v-model:visible="calcVisible" title="">
    <i class="dialog-title"></i>
    <div class="rules-content">
      <p class="rule-item">Welcome to the virtual car racing game, where you can experience the thrill of placing real
        money bets on the outcome of continuous virtual car races, available 24/7. Please note that a Play for Fun
        version of the game is not offered.</p>
      <p class="rule-item">All players participate in the game simultaneously, witnessing the same races and results,
        regardless of their location. Our race simulations are generated using a blend of Artificial Intelligence and
        independent random number generators.</p>
      <h2 class="rule-title">Events and Races</h2>
      <p class="rule-item">Race events are displayed non-stop, with a new event beginning as soon as the previous one
        concludes. Each race event has an approximate duration of 3 minutes and features a fixed number of 6
        participants.</p>
      <h2 class="rule-title">Betting</h2>
      <p class="rule-item">You have the opportunity to place bets up to 10 seconds before the start of each race.
        Betting options for upcoming races on the current race day remain open.</p>
      <p class="rule-item">The following betting options are available for the races:</p>
      <p class="rule-item">Win – Bet on a specific car to win the race (e.g., Car No.1 finishes 1st).</p>
      <p class="rule-item">Place (1-2) – Bet on a selected car to finish in either 1st or 2nd position in a race (e.g.,
        Selection 1: Car No.1 finishes 1st or 2nd).</p>
      <p class="rule-item">Show (1-3) – Bet on a chosen car to finish in 1st, 2nd, or 3rd position in the race (e.g.,
        Selection 1: Car No.1 finishes 1st, 2nd, or 3rd).</p>
      <p class="rule-item">Even/Odd – Bet on an Even (2/4/6) or Odd (1/3/5) numbered car to finish in 1st position in a
        race.</p>
      <p class="rule-item">Over/Under – Bet on whether the winner will be over or under (Selection Over: Car No.4, No.5,
        or No.6 finishes 1st; Selection Under: Car No.1, No.2, or No.3 finishes 1st).</p>
      <p class="rule-item">Exacta – Bet on the two cars to finish in 1st and 2nd positions, in the predicted order. Both
        predictions must be correct for the bet to win (e.g., Selection 1, 2: Car No.1 finishes 1st, Car No.2 finishes
        2nd).</p>
      <p class="rule-item">Quinella – Bet on the two cars you expect to finish 1st and 2nd in any order. Both
        predictions must be correct for the bet to win (e.g., Selection1&2: Car No.1 and No.2 finish 1st and 2nd in any
        order).</p>
      <p class="rule-item">Trifecta – Bet on the three cars to finish 1st, 2nd, and 3rd in the correct order. All three
        predictions must be correct for the bet to win (e.g., Selection 1, 2, 3: Car No.1 finishes 1st, Car No.2
        finishes 2nd, Car No.3 finishes 3rd).</p>
      <h2 class="rule-title">Placing Your Bets</h2>
      <p class="rule-item">Simply click on the odds corresponding to the bet you wish to place to make your selections,
        and the betslip will open. After choosing all your selections, enter your stake in the betslip Stake field and
        click on "Bet" to confirm your wagers.</p>
      <p class="rule-item">Please note that Virtual Car Racing bets cannot be combined in the same betslip with bets
        placed on real sporting events.</p>
      <p class="rule-item">If your bet is successful, your winnings will be automatically credited to your account.</p>
    </div>
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
  },
  methods: {
    numToAmount,
  },
})
</script>

<style lang="less" scoped>
.common-dialog {
  :deep(.common-dialog-content) { // NOSONAR
    margin-top: 50px;
    margin-bottom: 0;
    padding-bottom: 20px;
    width: 335px;
  }

}

.common-dialog {
  :deep(.icon-close) { // NOSONAR
    right: 3px;
    top: -39px;
    width: 24px;
    height: 24px;
    background: url(../images/icon-close.png) center center / 100% 100% no-repeat;
  }
}

.dialog-title {
  margin: -96px auto 30px auto;
  display: block;
  width: 218px;
  height: 117px;
}

.rules-content {
  max-height: 65vh;
  overflow: auto;
}

.rule-title {
  padding: 0 18px 4px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  line-height: 21px;
}

.rule-item {
  padding: 0 18px 20px 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 21px;
}

.pt0 {
  padding-top: 0;
}

.rules-table {
  margin: 12px 21px 0 24px;
  width: calc(100% - 45px);
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-right: none;
  border-bottom: none;

  th, td {
    width: 93px;
    font-size: 10px;
    text-align: center;
    padding: 2px 2px;
    line-height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.54);
    border-left: none;
    border-top: none;
  }

  .amount {
    color: #FFD338;
  }
}
</style>
