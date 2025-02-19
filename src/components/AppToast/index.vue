<template>
  <div v-if="snackbar" :class="['app-toast', colorName]">
    <div class="toast-text">{{ msgData.msg }}</div>
    <div class="toast-close" @click="closeMsg">CLOSE</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useCommonStore } from '@/stores/common'

export default defineComponent({
  setup() {
    const commonStore = useCommonStore()
    return { commonStore }
  },
  data() {
    return {
      timer: null,
      snackbar: false,
      colorName: 'warning' // success/warning
    }
  },
  computed: {
    ...mapState(useCommonStore, ['msgData'])
  },
  watch: {
    snackbar: {
      handler(newValue) {
        if (newValue) return
        let obj = {
          msg: '',
          msgType: '',
          status: newValue,
          num: Math.random(),
        }
        this.commonStore.msgData = obj
      }
    },
    'msgData.status': {
      deep: true,
      immediate: true,
      handler() {
        if (this.msgData.status) {
          this.snackbar = this.msgData.status
          if (this.msgData.msgType !== '') {
            this.colorName = this.msgData.msgType
          }
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.closeMsg()
          }, 3000) as any
        }
      }
    }
  },
  methods: {
    closeMsg() {
      this.snackbar = false
    }
  }
})
</script>

<style lang="less" scoped>
.app-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 100;
  width: 90%;
  display: flex;
  padding: 14px 16px;
  transform: translateX(-50%);
  color: #fff;
  background: #ff5722;
  border-radius: 4px;
  font-size: 14px;
  .toast-text {
    line-height: 1.2;
    padding-right: 10px;
    word-break: break-all;
    flex: 1;
  }
  .toast-close {
    font-weight: bold;
  }
  &.success {
    background: #19B864;
  }
}
</style>
