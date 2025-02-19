<template>
  <IlotBack @back="handleBack" />
  <IlotBet @home="handleHome" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IlotBack from './IlotBack.vue'
import IlotBet from './IlotBet.vue'

export default defineComponent({
  components: {
    IlotBack,
    IlotBet,
  },
  emits: ['back', 'home'],
  methods: {
    handleBack() {
      this.$emit('back')
    },
    handleHome() {
      this.$emit('home')
    },
  },
})
</script>

<style lang="less" scoped>
.icon-back {
  position: absolute;
  left: 0;
}

.ilot-bet {
  position: absolute;
  left: 11.73333333vw;
}
</style>
