<template>
  <div class='header d-flex justify-space-between align-center'>
    <section class='notice-list d-flex align-center'>
      <span>Luck Dice</span>
      <Wallet />
    </section>
    <div class='menu-icon' @click.stop='menuClick'></div>
    <HomeDropMenu v-model:visible='dropMenuVisible'
                  @showNewGuide="$emit('showNewGuide')"
                  @help="$emit('help')"
                  @sound="$emit('sound')"
                  @history="$emit('history')"
                  @set-profile="$emit('set-profile')"
    />
<!--    <CommonMarquee :key='topListKey'>-->
<!--      <div class='d-flex'>-->
<!--        <span v-for='(item, index) in topList' :key='`${index}-${item.playerId}`'-->
<!--              class='notice-list-txt'>Congrats! {{ item.playerNick }} won <strong> {{ $t('common.currencySYMBOL')-->
<!--          }} {{ fmoneyHandler(item.showWinAmount) }} </strong></span>-->
<!--      </div>-->
<!--    </CommonMarquee>-->
  </div>
</template>

<script lang='ts'>
import { defineComponent, defineAsyncComponent } from 'vue'
import { useCommonStore } from '@/stores/common'
import { useMRouletteStore } from '@/stores/million-roulette'
import CommonMarquee from '@/components/CommonMarquee/index.vue'
import Wallet from '@/views/million-roulette/components/Wallet.vue'

import { fmoney } from '@/utils/filters'
import { mapState } from 'pinia'

export default defineComponent({
  setup() {
    const commonStore = useCommonStore()
    const mRouletteStore = useMRouletteStore()
    return { commonStore, mRouletteStore }
  },
  components: {
    Wallet,
    CommonMarquee,
    HomeDropMenu: defineAsyncComponent(() => import('./HomeDropMenu.vue')),
  },
  computed: {
    ...mapState(useMRouletteStore, ['topListKey', 'topList']),
  },
  data() {
    return {
      dropMenuVisible: false,
    }
  },
  created() {
  },
  methods: {
    fmoneyHandler(val: any) {
      return fmoney(val)
    },
    menuClick() {
      this.dropMenuVisible = !this.dropMenuVisible
    },
  },
})
</script>

<style scoped lang='less'>
.header {
  background: #000000;
  padding-right: 5px;
  .notice-list {
    flex: 1;
    height: 30px;
    line-height: 20px;
  }

  .menu-icon {
    width: 26px;
    height: 26px;
    background: url('../images/header/menu-icon.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}

/deep/ .notice-list-txt {
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 400;
  margin-right: 60px;

  strong {
    color: #19B864;
  }
}
</style>
