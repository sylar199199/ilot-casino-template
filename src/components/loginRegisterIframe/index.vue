<template>
  <iframe id="loginIframe" title="loginIframe" :src="calcUrl" frameborder="0" class="login-register-iframe"></iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { getHostUrl } from '@/utils/hostUrl'

export default defineComponent({
  computed: {
    ...mapState(useUserStore, ['dialogType']),
    calcUrl() {
      const c = sessionStorage.getItem('channel') || ''
      return getHostUrl() + '/' + this.dialogType + `?modeType=iframe&from=million-roulette&c=${c}`
    }
  },
})
</script>

<style lang="less" scoped>
.login-register-iframe{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90%;
  z-index: 999;
}
</style>
