<template>
  <div class="common-header">
    <i class="icon-back" @click="handleBack"></i>
    <h2 class="page-title"><slot>{{ pageTitle }}</slot></h2>
    <slot name="right"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getTargetOrigin } from '@/utils/getTargetOrigin'

export default defineComponent({
  data() {
    return {
      pageTitle: this.$route.meta.title,
    }
  },
  methods: {
    handleBack() {
      if (window === window.parent) {
        this.$router.back()
      } else if (/-pos$/.test(this.$route.path)) {
        const data = { type: 'linkPage', pageName: 'home' }
        window.parent.postMessage(data, getTargetOrigin())
      } else {
        const data = { name: 'routerBack' }
        window.parent.postMessage(data, getTargetOrigin())
      }
    },
  },
})
</script>


<style lang="less" scoped>
.common-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 17.1875vw;
  background: #252947;
}

.icon-back {
  position: absolute;
  display: block;
  width: 10vw;
  height: 17.1875vw;
  background: url('@/assets/icon/icon-back.png') center center / 7.5vw 7.5vw no-repeat;
  cursor: pointer;
}

.page-title {
  width: 100%;
  text-align: center;
  line-height: 17.1875vw;
  font-size: 4.6875vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.87);
}
</style>
