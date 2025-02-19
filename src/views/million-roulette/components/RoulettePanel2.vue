// RouletteWheel.vue
<template>
  <div class="main">
    <button type="button" class="btn" id="spin" @click="handleSpin" v-if="!isSpinning">
      <span class="btn-label">Spin</span>
    </button>
    <button type="button" class="btn btn-reset" id="reset" @click="handleReset" v-else :disabled="isDisabled">
      <span class="btn-label">New Game</span>
    </button>
    <div class="plate" id="plate">
      <ul class="inner" :data-spinto="spinTo" :class="{ rest: isResting }">
        <li v-for="n in 37" :key="n-1" class="number">
          <label>
            <input type="radio" name="pit" :value="n-1" />
            <span class="pit">{{ ROULETTE_NUMBERS[n-1] }}</span>
          </label>
        </li>
      </ul>
      <div class="ball" :class="{ spinning: isSpinning }" :style="ballStyle"></div>
      <div class="data" :class="{ reveal: isRevealed }">
        <div class="data-inner">
          <div class="mask">{{ maskText }}</div>
          <div class="result" :style="{ 'background-color': resultColor }">
            <div class="result-number">{{ currentNumber }}</div>
            <div class="result-color">{{ currentColor }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="previous-results">
      <ol class="previous-list">
        <li v-if="previousResults.length === 0" class="visuallyhidden placeholder">
          No results yet.
        </li>
        <li
          v-else
          v-for="(result, index) in previousResults"
          :key="index"
          :class="['previous-result', `color-${result.color}`]"
        >
          <span class="previous-number">{{ result.number }}</span>
          <span class="previous-color">{{ result.color }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
interface SpinResult {
  number: number;
  color: string;
}

export default {
  name: 'RouletteWheel',
  data() {
    return {
      spinTo: null as number | null,
      isSpinning: false,
      isDisabled: false,
      isResting: false,
      isRevealed: false,
      maskText: 'Place Your Bets',
      currentNumber: '00',
      currentColor: '',
      previousResults: [] as SpinResult[],
      TIMER: 9000,
      RED_NUMBERS: [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3],
      ROULETTE_NUMBERS: [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
        11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
        22, 18, 29, 7, 28, 12, 35, 3, 26
      ],
      finalAngle: 0
    }
  },
  computed: {
    resultColor(): string {
      return this.currentColor;
    },
    ballStyle() {
      if (!this.isSpinning) {
        return {
          transform: `translate(-50%, -50%) rotate(${this.finalAngle}deg) translateY(-140px)`
        };
      }
      return {};
    }
  },
  methods: {
    getColor(number: number): string {
      if (number === 0) return 'green';
      return this.RED_NUMBERS.includes(number) ? 'red' : 'black';
    },

    handleSpin() {
      const randomNumber = Math.floor(Math.random() * 37);
      console.log('打印 randomNumber', randomNumber);
      this.spinTo = randomNumber;
      this.isSpinning = true;
      this.isDisabled = true;

      // 计算最终角度
      const numberIndex = this.ROULETTE_NUMBERS.indexOf(randomNumber);
      this.finalAngle = numberIndex * (360 / 37);
      console.log('最终角度：', this.finalAngle);

      setTimeout(() => {
        this.maskText = 'No More Bets';
      }, this.TIMER / 2);

      setTimeout(() => {
        this.maskText = 'Place Your Bets';
      }, this.TIMER + 500);

      setTimeout(() => {
        this.isDisabled = false;
        const color = this.getColor(randomNumber);

        this.currentNumber = randomNumber.toString();
        this.currentColor = color;
        this.isRevealed = true;
        this.isResting = true;

        this.previousResults.unshift({
          number: randomNumber,
          color: color
        });
      }, this.TIMER);
    },

    handleReset() {
      this.spinTo = null;
      this.isResting = false;
      this.isSpinning = false;
      this.isRevealed = false;
      this.finalAngle = 0;
    }
  }
}
</script>

<style scoped lang="less">
.main {
  width: 375px;
  margin: 0 auto;
}

.plate {
  background-color: gray;
  width: 350px;
  height: 350px;
  margin: 12px; /* 6px * 2 */
  border-radius: 50%;
  position: relative;
  animation: rotate 24s infinite linear;
}

.plate:after,
.plate:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
}

.plate:after {
  top: -6px;
  right: -6px;
  bottom: -6px;
  left: -6px;
  border: 6px solid gold;
  box-shadow: inset 0px 0px 0px 2px #998100,
              0px 0px 0px 2px #ffd700;
}

.plate:before {
  background: rgba(0,0,0,.65);
  border: 1px solid silver;
  box-shadow: inset 0px 0px 0px 2px #404040;
  top: 12%;
  left: 12%;
  right: 12%;
  bottom: 12%;
  z-index: 1;
}

.number {
  width: 32px;
  height: 175px; /* 350px / 2 */
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 0;
  left: calc(50% - 16px); /* 50% - (32px / 2) */
  transform-origin: 50% 100%;
  background-color: transparent;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 175px solid black;
  box-sizing: border-box;
}

.number:nth-child(odd) {
  border-top-color: red;
}

.number:nth-child(37) {
  border-top-color: green;
}

.pit {
  color: #fff;
  padding-top: 12px;
  width: 32px;
  display: inline-block;
  font-size: 12px;
  transform: scale(1,1.8);
  position: absolute;
  top: -175px;
  left: -16px;
}

.inner {
  display: block;
  height: 350px;
  width: 350px;
  position: relative;
}

.inner:after,
.inner:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
}

.inner:after {
  z-index: 3;
  top: 24%;
  right: 24%;
  bottom: 24%;
  left: 24%;
  background-color: #404040;
  border: 3px solid #404040;
}

.inner:before {
  top: 24%;
  bottom: 21%;
  left: 24%;
  right: 22%;
  content: '';
  color: #fff;
  font-size: 60px;
  z-index: 5;
  border-radius: 0;
}

.inner.rest:before {
  transition: top .5s ease-in, right .5s ease-in, bottom .5s ease-in, left .5s ease-in;
  top: 25%;
  right: 25%;
  bottom: 24%;
  left: 25%;
}

.btn {
  background: green;
  border: 1px solid #001a00;
  border-top-color: #00b300;
  border-left-color: #00b300;
  display: inline-block;
  font-size: 15px;
  width: 175px; /* 350px / 2 */
  padding: 12px;
  margin: 12px;
  cursor: pointer;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  border-radius: 3px;
}

.btn-label {
  padding: 12px;
  white-space: nowrap;
}

.btn.btn-reset {
  background: darkgreen;
  border: 1px solid #001a00;
  border-top-color: #00b300;
  border-left-color: #00b300;
}

.btn.disabled {
  opacity: .2;
  transition: opacity .24s linear;
  cursor: not-allowed;
}

.data {
  display: block;
  position: absolute;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  border-radius: 50%;
  animation: rotate 24s reverse linear infinite;
  perspective: 2000px;
  z-index: 100;
}

.data-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.72s;
  transform-style: preserve-3d;
}

.data.reveal .data-inner {
  transform: rotateY(180deg);
}

.mask,
.result {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
}

.mask {
  color: #fff;
  font-size: 24px;
  margin: auto;
  line-height: 1.4;
  padding-top: 36px;
}

.result {
  background-color: green;
  color: white;
  transform: rotateY(180deg);
  align-items: center;
}

.result-number {
  font-size: 72px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 12px;
}

.result-color {
  text-transform: uppercase;
  font-size: 21px;
  line-height: 1;
}

.previous-results {
  max-width: 350px;
  margin: 24px 12px;
}

.previous-list {
  perspective: 2000;
}

.previous-result {
  display: flex;
  margin: 1px;
  padding: 12px;
  color: #fff;
}

.previous-result:first-child {
  animation: flipin .48s ease-out;
}

.previous-number {
  flex: 1;
}

.color-green { background-color: green; }
.color-black { background-color: black; }
.color-red { background-color: red; }

.visuallyhidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.ball {
  width: 15px;
  height: 15px;
  background: radial-gradient(circle at 30% 30%, white, #ccc);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) translateY(-140px);
  z-index: 2;
  box-shadow:
    inset -2px -2px 6px rgba(0,0,0,0.3),
    1px 1px 4px rgba(255,255,255,0.8);
  transition: transform 0.3s ease-out;
}

.ball.spinning {
  animation: spin-ball 9s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
}

@keyframes spin-ball {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-140px);
  }
  90%, 100% {
    transform: translate(-50%, -50%) rotate(3600deg) translateY(-140px);
  }
}

@keyframes rotate {
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(360deg); }
}

@keyframes flipin {
  0% { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
}

/* 轮盘数字的旋转角度 */
.number:nth-child(1) { transform: rotateZ(9.72972973deg); }
.number:nth-child(2) { transform: rotateZ(19.45945946deg); }
.number:nth-child(3) { transform: rotateZ(29.18918919deg); }
.number:nth-child(4) { transform: rotateZ(38.91891892deg); }
.number:nth-child(5) { transform: rotateZ(48.64864865deg); }
.number:nth-child(6) { transform: rotateZ(58.37837838deg); }
.number:nth-child(7) { transform: rotateZ(68.10810811deg); }
.number:nth-child(8) { transform: rotateZ(77.83783784deg); }
.number:nth-child(9) { transform: rotateZ(87.56756757deg); }
.number:nth-child(10) { transform: rotateZ(97.2972973deg); }
.number:nth-child(11) { transform: rotateZ(107.02702703deg); }
.number:nth-child(12) { transform: rotateZ(116.75675676deg); }
.number:nth-child(13) { transform: rotateZ(126.48648649deg); }
.number:nth-child(14) { transform: rotateZ(136.21621622deg); }
.number:nth-child(15) { transform: rotateZ(145.94594595deg); }
.number:nth-child(16) { transform: rotateZ(155.67567568deg); }
.number:nth-child(17) { transform: rotateZ(165.40540541deg); }
.number:nth-child(18) { transform: rotateZ(175.13513514deg); }
.number:nth-child(19) { transform: rotateZ(184.86486486deg); }
.number:nth-child(20) { transform: rotateZ(194.59459459deg); }
.number:nth-child(21) { transform: rotateZ(204.32432432deg); }
.number:nth-child(22) { transform: rotateZ(214.05405405deg); }
.number:nth-child(23) { transform: rotateZ(223.78378378deg); }
.number:nth-child(24) { transform: rotateZ(233.51351351deg); }
.number:nth-child(25) { transform: rotateZ(243.24324324deg); }
.number:nth-child(26) { transform: rotateZ(252.97297297deg); }
.number:nth-child(27) { transform: rotateZ(262.7027027deg); }
.number:nth-child(28) { transform: rotateZ(272.43243243deg); }
.number:nth-child(29) { transform: rotateZ(282.16216216deg); }
.number:nth-child(30) { transform: rotateZ(291.89189189deg); }
.number:nth-child(31) { transform: rotateZ(301.62162162deg); }
.number:nth-child(32) { transform: rotateZ(311.35135135deg); }
.number:nth-child(33) { transform: rotateZ(321.08108108deg); }
.number:nth-child(34) { transform: rotateZ(330.81081081deg); }
.number:nth-child(35) { transform: rotateZ(340.54054054deg); }
.number:nth-child(36) { transform: rotateZ(350.27027027deg); }
.number:nth-child(37) { transform: rotateZ(360deg); }
</style>
