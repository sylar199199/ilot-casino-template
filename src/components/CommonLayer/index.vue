<template>
  <div v-if="calcVisible" class="common-layer">
    <div class="common-layer-inner animate__animated" :class="[animateClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      animateClass: 'animate__fadeInDownBig',
    }
  },
  computed: {
    calcVisible: {
      get() {
        return this.visible
      },
      set(newVal: boolean) {
        this.$emit('update:visible', newVal)
      },
    },
  },
  created() {
    setTimeout(() => {
      this.animateClass = 'animate__fadeOut'
    }, 1500)
    setTimeout(() => {
      this.calcVisible = false
    }, 2500)
  },
})
</script>


<style lang="less" scoped>
.common-layer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 98;
  display: flex;
  justify-content: center;
  align-items: center;
  .common-layer-inner {
    position: relative;
    padding-bottom: 20vh;
  }
}

// 进入
@-webkit-keyframes fadeInDownBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -200px, 0);
    transform: translate3d(0, -200px, 0);
  }

  50%, to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInDownBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -200px, 0);
    transform: translate3d(0, -200px, 0);
  }

  50%, to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.animate__fadeInDownBig {
  -webkit-animation-name: fadeInDownBig;
  animation-name: fadeInDownBig;
}

// 消失
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }

  50%, to {
    opacity: 0;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }

  50%, to {
    opacity: 0;
  }
}
.animate__fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
</style>
