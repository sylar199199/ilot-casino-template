<template>
  <div class="chip-bet-options">
    <ChipSelector
      v-model:amount="mRouletteStore.betMoney"
      :balance="accountInfo.totalBalance"
      @chipSelected="chipSelected"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChipSelector from '@/components/chip-selector/index.vue'
import { useUserStore } from '@/stores/user'
import { useMRouletteStore } from '@/stores/million-roulette'
import { mapState } from 'pinia'
import {playSoundClickMusic} from '@/views/million-roulette/utils/playGameMusic'

export default defineComponent({
  components: {
    ChipSelector,
  },
  data() {
    return {
      amount: 0,
    }
  },
  setup() {
    const userStore = useUserStore()
    const mRouletteStore = useMRouletteStore()
    return { userStore, mRouletteStore }
  },
  computed: {
    ...mapState(useUserStore, ['accountInfo']),
  },
  methods: {
    chipSelected(info: any) {
      playSoundClickMusic('click.mp3', { loop: false })
      this.mRouletteStore.selectedChipId = `chip-${info.color}`
      this.mRouletteStore.betMoney = info.value
    },
  },
})
</script>

<style lang="less" scoped>
.chip-bet-options {
  width: 100%;
}
</style>
