<template>
  <div class="left-finger"></div>
</template>

<style lang="less" scoped>
.left-finger {
  width: 52px;
  height: 55px;
  background: url(./images/left-finger.png) 0 0 / 100% 100% no-repeat;
  animation: move 1s cubic-bezier(0.12,0.78,0.53,0.92) infinite;
}

@keyframes move {
  100% {
    transform: translate(20px, -20px);
  }
}
</style>
