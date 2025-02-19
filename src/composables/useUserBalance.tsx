import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function useUserBalance(maxValue: any) {
  const userStore = useUserStore()
  const userBalance = computed(() => {
    if (!userStore.isLogin) return { value: null, unit: '' }
    const userBalanceValue = (userStore.accountInfo as any).totalBalance || 0
    const re = /(\d+\.\d{2})\d*/
    if (!maxValue || userBalanceValue <= maxValue) {
      return { value: userBalanceValue.toFixed(2), unit: '' }
    } else if (userBalanceValue > maxValue && userBalanceValue <= 1000 * maxValue) {
      return { value: String((userBalanceValue / 1000).toFixed(2)).replace(re, '$1'), unit: 'K' }
    } else {
      return { value: String((userBalanceValue / 1000000).toFixed(2)).replace(re, '$1'), unit: 'M' }
    }
  })
  return { userBalance }
}
