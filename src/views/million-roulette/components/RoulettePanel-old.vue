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
      <svg width="350" height="350">
        <circle cx="175" cy="175" r="175" style="touch-action: none;"></circle>
      </svg>
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
      currentWheelIndex: 0,
      isRotating: false,
      wheelRotation: 0,
      ballRotation: 0,
      ballPosition: -150,
      rouletteWheelNumbers: [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30,
        8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7,
        28, 12, 35, 3, 26
      ],
      eventHandlers: null
    }
  },
  methods: {
    getRouletteWheelNumber(index) {
      return this.rouletteWheelNumbers[index >= 0 ? index % 37 : 37 - Math.abs(index % 37)]
    },
    getRouletteWheelColor(index) {
      const i = index >= 0 ? index % 37 : 37 - Math.abs(index % 37)
      return i === 0 ? "green" : i % 2 === 0 ? "black" : "red"
    },
    // 创建结果显示区
    addFlipper() {
      const mkDiv = (className) => {
        const d = document.createElement("div")
        d.classList.add(...className.split(" "))
        return d
      }
      const flipper = mkDiv("flipper")
      const front = mkDiv("front-face")
      const back = mkDiv("back-face")
      flipper.appendChild(front)
      flipper.appendChild(back)
      document.querySelector(".result").appendChild(flipper)
      return (number, color) => {
        flipper.classList.add("flip", color)
        back.innerText = number
      }
    },


    startRotation(speed) {
      if (this.isRotating) return

      this.isRotating = true
      const writeResult = this.addFlipper()
      const bezier = [0.165, 0.84, 0.44, 1.005]
      const newWheelIndex = this.currentWheelIndex - speed
      const result = this.getRouletteWheelNumber(newWheelIndex)
      const resultColor = this.getRouletteWheelColor(newWheelIndex)

      // 轮盘动画
      const newWheelRotation = this.currentWheelRotation + (360 / 37) * speed
      console.log(this.getRouletteWheelNumber(this.currentWheelIndex), "---> ", result)
      anime({
        targets: this.$el.querySelectorAll('.layer-2, .layer-4'),
        rotate: newWheelRotation,
        duration: 5000,
        loop: 1,
        easing: `cubicBezier(${bezier.join(',')})`,
        complete: () => {
          this.currentWheelRotation = newWheelRotation
          this.currentWheelIndex = newWheelIndex
          this.wheelRotation = newWheelRotation
        }
      })

      // 小球动画
      const newBallRotation = -4 * 360 + this.currentBallRotation
      console.log("newRotaion", newBallRotation)
      this.ballPosition = -150
      anime({
        targets: this.$el.querySelector('.ball-container'),
        translateY: [
          { value: -10, duration: 0 },
          { value: -10, duration: 2000 },
          { value: -5, duration: 1000 },
          { value: -5, duration: 900 },
          { value: 0, duration: 1000 }
        ],
        rotate: [{ value: newBallRotation, duration: 4000 }],
        duration: 4000,
        loop: 1,
        easing: `cubicBezier(${bezier.join(',')})`,
        complete: () => {
          this.currentBallRotation = newBallRotation
          this.ballRotation = newBallRotation
          writeResult(result, resultColor)
          this.isRotating = false
        }
      })
    },
    isInRadiusEl(el, x, y) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = x - cx
      const dy = y - cy
      const r = rect.width / 2
      return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(r, 2)
    },
    handleMouseInteraction() {
      let startPos = null
      const wheel = this.$el.querySelector('circle')

      const handleStart = (e) => {
        const pos = e.type.includes('touch') ?
          { x: e.touches[0].clientX, y: e.touches[0].clientY } :
          { x: e.clientX, y: e.clientY }
        if (this.isInRadiusEl(wheel, pos.x, pos.y)) {
          startPos = pos
        }
      }

      const handleEnd = (e) => {
        if (!startPos) return
        const pos = e.type.includes('touch') ?
          { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } :
          { x: e.clientX, y: e.clientY }

        const distance = Math.round(
          Math.sqrt(Math.pow(startPos.x - pos.x, 2) + Math.pow(startPos.y - pos.y, 2)) / 4
        )

        if (Math.abs(distance) > 3) {
          this.startRotation(distance)
        }
        startPos = null
      }

      // 存储事件处理函数引用
      this.eventHandlers = {
        handleStart,
        handleEnd
      }

      // 添加事件监听
      this.$el.addEventListener('mousedown', handleStart)
      this.$el.addEventListener('touchstart', handleStart)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchend', handleEnd)
    }
  },
  mounted() {
    this.handleMouseInteraction()
    // 监听键盘 k
    document.addEventListener('keydown', (e) => {
      if (e.key === 'k') {
        this.startRotation(10)
      }
    })
  },
  beforeDestroy() {
    // 移除事件监听
    if (this.eventHandlers) {
      const { handleStart, handleEnd } = this.eventHandlers
      this.$el.removeEventListener('mousedown', handleStart)
      this.$el.removeEventListener('touchstart', handleStart)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchend', handleEnd)
    }
  }
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
  box-shadow: 2px 10px 30px rgba(0,0,0,.4);
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
    background: #fff radial-gradient(circle at 5px 5px,#fff,#444);
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
