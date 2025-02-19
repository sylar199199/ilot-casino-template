<template>
  <div class="game-footer">
    <!--    下注选项-->
    <ChipBetOptions/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useMRouletteStore } from '@/stores/million-roulette'
import ChipBetOptions from '@/views/million-roulette/components/ChipBetOptions.vue'

export default defineComponent({
  components: {
    ChipBetOptions
  },
  computed: {
    ...mapState(useUserStore, ['loginInfo']),
    ...mapState(useMRouletteStore, []),
  },
  methods: {
  },
})
</script>

<style lang="less" scoped>
.game-footer {
  background: #00b300;
  width: 100%;
  height: 110px;
}
</style>
