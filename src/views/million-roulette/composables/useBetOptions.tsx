import { computed, reactive, toValue } from 'vue'
import { useUserBalance } from '@/composables/useUserBalance'

export function useBetOptions() {
  const { userBalance } = useUserBalance(99999999)
  const betOptions = computed(() => {
    const userBalanceValue = Number(toValue(userBalance).value)
    const countryCode = localStorage.getItem('countryCode') || 'ng'
    if (countryCode === 'ng') {
      if (userBalanceValue >= 0 && userBalanceValue <= 10000) {
        return reactive([
          { money: 50 },
          { money: 200 },
          { money: 1000 },
        ])
      } else {
        return reactive([
          { money: 200 },
          { money: 1000 },
          { money: 5000 },
        ])
      }
    } else if (countryCode === 'ke') {
      if (userBalanceValue >= 0 && userBalanceValue <= 1000) {
        return reactive([
          { money: 5 },
          { money: 20 },
          { money: 100 },
        ])
      } else {
        return reactive([
          { money: 20 },
          { money: 100 },
          { money: 500 },
        ])
      }
    } { // gh
      if (userBalanceValue >= 0 && userBalanceValue <= 100) {
        return reactive([
          { money: 1 },
          { money: 2 },
          { money: 10 },
        ])
      } else {
        return reactive([
          { money: 2 },
          { money: 10 },
          { money: 50 },
        ])
      }
    } 
  })
  return { betOptions }
}
