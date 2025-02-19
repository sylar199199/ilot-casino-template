<template>
  <div class="roulette-panel">
    <div class="roulette-wheel">
      <div class="layer-2 wheel" :style="{ transform: `rotate(${wheelRotation}deg)` }"></div>
      <div class="layer-3"></div>
      <div class="layer-4 wheel" :style="{ transform: `rotate(${wheelRotation}deg)` }"></div>
      <div class="layer-5"></div>
      <div class="ball-container" :style="{ transform: `rotate(${ballRotation}deg)` }">
        <div class="ball" :style="{ transform: `translateY(${ballPosition}px)` }"></div>
      </div>
    </div>
    <div class="result"></div>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'RoulettePanel',
  data() {
    return {
      currentBallRotation: 0,
      currentWheelRotation: 0,
      isRotating: false,
      wheelRotation: 0,
      ballRotation: 0,
      ballPosition: -111,
      // 轮盘数字数组，0在顶部，顺时针排列
      rouletteWheelNumbers: [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30,
        8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7,
        28, 12, 35, 3, 26,
      ],
    }
  },
  methods: {
    handleKeyDown(e) {
      if (e.key === 'k') {
        const randomResult = Math.floor(Math.random() * 37)
        console.log('打印 randomResult', randomResult)
        this.startRotation(randomResult)
      }
    },
    startRotation(randomResult) {
      if (this.isRotating) return
      this.isRotating = true
      const randomDeg = Math.random() * 360
      // 获取目标数字的位置
      const targetIndex = this.rouletteWheelNumbers.indexOf(randomResult)
      console.log('目标数字:', randomResult, '位置:', targetIndex)

      // 每个数字占用的角度
      const anglePerNumber = 360 / this.rouletteWheelNumbers.length

      // 基础旋转4圈
      const baseRotation = 360 * 4

      // 计算小球最终需要停在的角度
      const targetBallAngle = anglePerNumber * targetIndex

      // 小球需要旋转的总角度 (逆时针, 所以是负数)
      const ballRotation = -baseRotation + (targetBallAngle - 360) + randomDeg

      // 轮盘转动角度(顺时针)
      const wheelRotation = baseRotation +randomDeg

      console.log('小球目标角度:', targetBallAngle)
      console.log('小球总旋转角度:', ballRotation)
      console.log('轮盘总旋转角度:', wheelRotation)

      // 重置当前角度，避免累积误差
      this.currentWheelRotation = 0
      this.currentBallRotation = 0
      // 小球动画 - 逆时针旋转
      anime({
        targets: this.$el.querySelector('.ball-container'),
        translateY: [
          { value: -111, duration: 0 },
          { value: -50, duration: 2000 },
          { value: -30, duration: 1000 },
          { value: -20, duration: 900 },
          { value: 0, duration: 1000 },
        ],
        rotate: [
          {
            value: ballRotation,
            duration: 5000,
            easing: 'cubicBezier(0.165, 0.84, 0.44, 1.005)',
          },
        ],
        complete: () => {
          this.ballRotation = ballRotation % 360
          this.isRotating = false
        },
      })
      // 轮盘动画 - 顺时针旋转
      anime({
        targets: this.$el.querySelectorAll('.layer-2, .layer-4'),
        rotate: [
          {
            value: wheelRotation,
            duration: 5000,
            easing: 'cubicBezier(0.165, 0.84, 0.44, 1.005)',
          },
        ],
        complete: () => {
          this.wheelRotation = wheelRotation % 360
        },
      })


    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
}
</script>

<style lang="scss" scoped>
.roulette-panel {
  margin: 0;
  padding: 0;
  background-image: url('@/demoRoulette/assets/felt.png'), -webkit-radial-gradient(50% 40%, circle farthest-corner, #527c14, #243a0a);
  background-size: 180px 180px, auto;
  background-attachment: fixed;
  user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

.roulette-wheel {
  float: right;
  width: 350px;
  height: 350px;
  border-radius: 100%;
  background: url('@/demoRoulette/assets/roulette_1.jpg');
  background-size: 350px 350px;
  shape-outside: circle(175px);
  margin: 0 0 1em 1em;
  box-shadow: 2px 10px 30px rgba(0, 0, 0, .4);
  position: relative;
  touch-action: none;
  overflow: visible;

  .layer-2,
  .layer-3,
  .layer-4,
  .layer-5,
  .ball-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 350px 350px;
  }

  .layer-2,
  .layer-4,
  .ball-container {
    will-change: transform;
  }

  .layer-2 {
    background-image: url('@/demoRoulette/assets/roulette_2.png');
  }

  .layer-3 {
    background-image: url('@/demoRoulette/assets/roulette_3.png');
  }

  .layer-4 {
    background-image: url('@/demoRoulette/assets/roulette_4.png');
  }

  .layer-5 {
    background-image: url('@/demoRoulette/assets/roulette_5.png');
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  circle {
    cursor: pointer;
    fill: transparent;
  }

  .ball-container {
    transform-origin: center center;
  }

  .ball {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background: #fff radial-gradient(circle at 5px 5px, #fff, #444);
    box-shadow: 1px 1px 4px #000;
    transform: translateY(-116px);
    top: 50%;
    left: 50%;
    margin: -7px;
    will-change: transform
  }
}

// Flipper styles
.flipper {
  display: inline-block;
  position: relative;
  width: 96px;
  height: 128px;
  transition: all 2s cubic-bezier(0.240, 1.650, 0.915, 0.835);
  transform-style: preserve-3d;
  font-family: monospace;
  user-select: none;

  &.flip {
    transform: rotateX(90deg);
  }

  .front-face,
  .back-face {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    font-size: 76px;
  }

  .front-face {
    background-color: #fc216100;
    color: #fff;
    text-shadow: 0 1px 1px #b50236;
    transform: rotateX(0deg) translateZ(64px);
  }

  .back-face {
    color: #dca041;
    transform: rotateX(-90deg) translateZ(64px);
    outline: solid 2px;
  }

  &.red .back-face {
    background-color: #c52703;
  }

  &.black .back-face {
    background-color: #242324;
  }

  &.green .back-face {
    background-color: #436410;
  }
}

.result {
  max-width: 500px;
  margin: auto;
  perspective: 1000px;
  -webkit-perspective: 1000px;

  .flipper {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 2640px) {
  .roulette-wheel {
    float: none;
    margin: 1em auto;
  }
}

@media screen and (max-width: 375px) {
  .roulette-panel {
    padding: 0 20px;
  }
  .roulette-wheel {
    float: none;
    left: 30px;
  }
}
</style>
