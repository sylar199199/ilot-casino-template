<template>
  <div class="common-loading show-overlay">
    <div class="common-loading-box">
      <img class="bet-reload-icon" src="@/assets/img/loading.png" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '18px',
    },
    height: {
      type: String,
      default: '18px',
    },
  },
})
</script>

<style lang="less" scoped>
.common-loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  .common-loading-box{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 27.5vw;
    height: 27.5vw;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    border-radius: 1.875vw;
    display: none;
  }
  .bet-reload-icon{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15.625vw;
    height: 15.625vw;
    margin-left: -8.125vw;
    margin-top: -8.125vw;
    animation: rotate 1s linear infinite;
  }
  &.show-overlay{
    .common-loading-box{
      display: block;
    }
  }
}
@keyframes rotate{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
