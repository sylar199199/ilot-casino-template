<template>
  <div v-if="calcVisible" class="game-drop-menu">
    <div class="menu-item" @click="howToPlay">
      <p class="menu-text">How to play</p>
    </div>
    <div class="menu-item" @click="viewRecord">
      <p class="menu-text">History</p>
    </div>
    <div class="menu-item" @click="showSoundControl">
      <p class="menu-text">Sound</p>
    </div>
    <div class="menu-item" @click="toHome">
      <p class="menu-text">Home</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { checkLogin } from '@/utils/checkLogin'
import { goHome } from '@/utils/toPlatformFn'
import { useUserStore } from '@/stores/user'
import { useCommonStore } from '@/stores/common'
import { mapState } from 'pinia'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const userStore = useUserStore()
    const commonStore = useCommonStore()
    return { userStore, commonStore }
  },
  computed: {
    ...mapState(useUserStore, ['isLogin']),
    calcVisible: {
      get() {
        return this.visible
      },
      set(newVal: boolean) {
        this.$emit('update:visible', newVal)
      },
    },
  },
  watch: {
    calcVisible: {
      immediate: true,
      handler(newVal) {
        const handler = () => {
          this.calcVisible = false
        }
        if (newVal) {
          window.requestAnimationFrame(() => {
            document.body.addEventListener('click', handler, false)
          })
        } else {
          document.body.removeEventListener('click', handler)
        }
      }
    },
  },
  methods: {
    // 查看投注记录
    viewRecord() {
      (this as any).$ET.tracking_v2('cash_handits_page_view', {
        action: 'click',
        origin_from: '/',
        target_from: 'history'
      })
      if (!checkLogin()) return
      this.$emit('history')
    },
    toHome() {
      goHome()
    },
    howToPlay(){
      this.$emit('help')
    },
    showSoundControl() {
      this.$emit('sound')
    },
  },
})
</script>


<style lang="less" scoped>
.game-drop-menu {
  position: absolute;
  right: 9px;
  top: 46px;
  z-index: 99;
  width: 180px;
  background: #350098;
  border-radius: 8px;
  animation-duration: 0.6s;
  padding: 10px 0;
}

.menu-item {
  cursor: pointer;
  width: 86%;
  margin: 10px auto 0;
  text-align: center;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  .menu-text {
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 32px;
  }
}

.menu-divider {
  margin: auto;
  width: 90px;
  height: 1px;
  border: 1px solid #5D68C1;
}

.home-info {
  text-align: center;
}

.avatar img{
  width: 32px;
  height: 32px;
  border-radius: 100%;
  border: 2px solid #fff;
}

.user-info-name{
  font-size: 12px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 14px;
  padding: 0 10px;
  margin-top: 4px;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: url('@/assets/img/aviator/edit.png') no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

// 从左侧滑入
@-webkit-keyframes zoomInLeft {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
@keyframes zoomInLeft {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
.animate__zoomInLeft {
  -webkit-animation-name: zoomInLeft;
  animation-name: zoomInLeft;
}

// 从左侧滑出
@-webkit-keyframes fadeOutLeft {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
.animate__fadeOutLeft {
  -webkit-animation-name: fadeOutLeft;
  animation-name: fadeOutLeft;
}
</style>
