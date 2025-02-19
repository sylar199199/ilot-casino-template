<template>
  <div class="ilot-bet" @click="toIlot">
    <span class="name">iLOTBET</span>
    <i class="icon-right"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getHostUrl } from '@/utils/hostUrl'
import { getTargetOrigin } from '@/utils/getTargetOrigin'

export default defineComponent({
  methods: {
    toIlot() {
      this.$emit('home')
      let targetUrl = getHostUrl()
      const channel = sessionStorage.getItem('channel')
      if (channel) targetUrl += `?c=${channel}`
      if (window === window.parent) {
        location.href = targetUrl
      } else {
        window.parent.postMessage({ name: 'jumpUrl', targetUrl }, getTargetOrigin())
      }
    },
  },
})
</script>

<style lang="less" scoped>
.ilot-bet {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22.66666667vw;
  height: 6.4vw;
  background: #044316;
  border-radius: 3.2vw;
  border: 1px solid #179037;
  cursor: pointer;
}

.name {
  padding-left: 1.73333333vw;
  font-size: 3.2vw;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 3.73333333vw;
}

.icon-right {
  margin-left: 2.26666667vw;
  width: 1.73333333vw;
  height: 2.4vw;
  background: url(./images/icon-right.png) center center / 100% 100% no-repeat;
}
</style>
