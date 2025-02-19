<template>
  <div class="common-guide"></div>
</template>

<style lang="less" scoped>
.common-guide {
  width: 16.5625vw;
  height: 22.5vw;
  background: url(./images/arrow.png) center center / 100% 100% no-repeat;
  animation: move 1s ease-in infinite;
}

@keyframes move {
  100% {
    transform: translate(0, -20px);
  }
}
</style>