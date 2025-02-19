<template>
  <div class="finger"></div>
</template>

<style lang="less" scoped>
.finger {
  width: 78px;
  height: 78px;
  background: url(./images/finger.png) 0 0 / 100% 100% no-repeat;
  animation: move 1s cubic-bezier(0.12,0.78,0.53,0.92) infinite;
}

@keyframes move {
  100% {
    transform: scale(0.6) translate(-20px, -20px) perspective(1200px) rotateX(0deg);
  }
}
</style>
