<template>
  <div v-if="calcVisible" class="common-dialog">
    <div class="common-dialog-bg animate__animated" :class="[bgAnimateClass]" @click="clickModal"></div>
    <div class="common-dialog-content animate__animated" :class="[contentAnimateClass]">
      <i v-if="showCloseBtn" class="icon-close" @click="closeDialog"></i>
      <h2 v-if="title" class="dialog-title">{{ title }}</h2>
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
    title: {
      type: String,
      default: '',
    },
    // 是否点击空白处关闭
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    showCloseBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      startTime: new Date().getTime(),
      bgAnimateClass: 'animate__fadeIn',
      contentAnimateClass: 'animate__bounceInDown',
    }
  },
  computed: {
    calcVisible: {
      get() {
        return this.visible
      },
      set(newVal: boolean) {
        if (newVal) {
          this.$emit('update:visible', newVal)
        } else {
          this.bgAnimateClass = 'animate__fadeOut'
          this.contentAnimateClass = 'animate__zoomOut'
          setTimeout(() => {
            this.$emit('update:visible', newVal)
          }, 1000)
        }
      },
    },
  },
  methods: {
    closeDialog() {
      this.calcVisible = false
      this.$emit('close')
    },
    clickModal() {
      const timeEnough = new Date().getTime() - this.startTime > 1500
      if (this.closeOnClickModal && timeEnough) {
        this.closeDialog()
      }
    },
  },
})
</script>

<style lang="less" scoped>
.common-dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}

.common-dialog-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

.common-dialog-content {
  margin-bottom: 10vh;
  position: absolute;
  width: 303px;
  background: #350098;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 22px;
}

.icon-close {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 1;
  display: block;
  width: 24px;
  height: 24px;
  background: url('@/assets/icon/icon-close.png') 0 0 / 100% 100% no-repeat;
}

.dialog-title {
  padding: 18px 24px 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  line-height: 24px;
}

// 蒙层进入
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.animate__fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

// 蒙层消失
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
.animate__fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

// 弹窗进入
@-webkit-keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0) scaleY(0.9);
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0) scaleY(0.95);
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0) scaleY(0.985);
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0) scaleY(0.9);
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0) scaleY(0.95);
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0) scaleY(0.985);
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.animate__bounceInDown {
  -webkit-animation-name: bounceInDown;
  animation-name: bounceInDown;
}

// 弹窗消失
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}
.animate__zoomOut {
  -webkit-animation-name: zoomOut;
  animation-name: zoomOut;
}
</style>
