<template>
  <CommonLayer v-model:visible="visible">
    <div class="game-tips"><slot></slot></div>
  </CommonLayer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import CommonLayer from '@/components/CommonLayer/index.vue'

export default defineComponent({
  components: {
    CommonLayer,
  },
  data() {
    return {
      visible: true,
    }
  },
})
</script>

<style lang="less" scoped>
.common-layer {
  bottom: auto;
}

.game-tips {
  position: relative;
  top: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 297px;
  height: 83px;
  background: url(../images/layer-bg.png) center center / 100% 100% no-repeat;
  font-family: myFont, sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #FFFFFF;
  text-shadow: 0px 2px 6px rgba(30,0,255,0.5);
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

// 进入
@-webkit-keyframes fadeInDownBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -200px, 0);
    transform: translate3d(0, -200px, 0);
  }

  to {
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

  to {
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
</style>
