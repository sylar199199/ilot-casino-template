<template>
  <div class="common-marquee" ref="marquee">
    <div class="marquee-wrap" ref="marqueeWrap">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue"

export default defineComponent({
  props: {
    speed: {
      type: Number,
      default: 0.5
    }
  },
  mounted() {
    this.initMarquee()
  },
  methods: {
    initMarquee() {
      const marquee = this.$refs.marquee as HTMLElement
      const marqueeWrap = this.$refs.marqueeWrap as HTMLElement
      if (!marquee || !marqueeWrap) return
      // marquee容器宽度
      const marqueeWidth = marquee.offsetWidth
      // slot内容宽度
      const marqueeWrapWidth = marqueeWrap.offsetWidth
      if (!marqueeWrapWidth) return
      // 开始滚动
      let marqueePosition = marqueeWidth
      marqueeWrap.style.transform = 'translateX(' + marqueePosition + 'px)'
      const marqueeAnimation: any = () => {
        marqueePosition -= this.speed
        marqueeWrap.style.transform = 'translateX(' + marqueePosition + 'px)'
        if (marqueePosition <= -marqueeWrapWidth) {
          marqueePosition = marqueeWidth
        }
        requestAnimationFrame(marqueeAnimation)
      }
      requestAnimationFrame(marqueeAnimation)
      onBeforeUnmount(() => {
        cancelAnimationFrame(marqueeAnimation)
      })
    },
  },
})
</script>

<style lang="less" scoped>
.common-marquee {
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 20px;
}

.marquee-wrap {
  position: absolute;
  white-space: nowrap;
  animation: none;
}
</style>
