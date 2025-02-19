<template>
  <i class="icon-back" @click="onBack"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getHostUrl } from '@/utils/hostUrl'
import { getTargetOrigin } from '@/utils/getTargetOrigin'

export default defineComponent({
  methods: {
    onBack() {
      this.$emit('back')
      if (history.length > 1) {
        this.$router.back()
      } else {
        let targetUrl = getHostUrl()
        const channel = sessionStorage.getItem('channel')
        if (channel) targetUrl += `?c=${channel}`
        if (window === window.parent) {
          location.href = targetUrl
        } else {
          window.parent.postMessage({ name: 'jumpUrl', targetUrl }, getTargetOrigin())
        }
      }
    },
  },
})
</script>

<style lang="less" scoped>
.icon-back {
  display: block;
  width: 11.73333333vw;
  height: 6.4vw;
  background-image: url(./images/icon-back.png);
  background-position: 2.93333333vw 0;
  background-size: 6.4vw 6.4vw;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
