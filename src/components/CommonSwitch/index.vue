<template>
  <div class="common-switch" :class="[calcValue]" @click.stop="handleSwitch">
    <div class="common-switch-inner"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: 'off',
    },
  },
  computed: {
    calcValue: {
      get() {
        return this.value
      },
      set(newVal: string) {
        this.$emit('update:value', newVal)
      },
    },
  },
  methods: {
    handleSwitch() {
      this.calcValue = this.calcValue === 'on' ? 'off' : 'on'
    },
  },
})
</script>

<style lang="less" scoped>
.common-switch {
  position: relative;
  width: 59px;
  height: 28px;
  border-radius: 14px;
  transition: all ease-in 0.2s;
  .common-switch-inner {
    position: absolute;
    top: 2px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    transition: all ease-in 0.2s;
  }
  &.on {
    background: #35D1A0;
    .common-switch-inner {
      left: 32px;
      background: linear-gradient( 180deg, #8398FF 0%, #4C5FFF 100%);
    }
  }
  &.off {
    background: #110040;
    .common-switch-inner {
      left: 3px;
      background: linear-gradient( 180deg, #8398FF 0%, #4C5FFF 100%);
    }
  }
}
</style>
