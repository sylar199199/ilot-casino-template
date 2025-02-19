import { reactive } from 'vue'
import { useCountryCode } from './useCountryCode'

export function useCurrency() {
  const { countryCode } = useCountryCode()
  let currency = reactive({
    CODE: 'NGN', // 代码
    SYMBOL: '₦', // 符号，放在货币前面
    'SYMBOL-SUFFIX': 'NGN', // 符号，放在货币后面
    'SYMBOL-SHORT': '₦', // 符号简写
  })
  if (countryCode.value === 'ke') {
    currency = reactive({
      CODE: 'KES', // 代码
      SYMBOL: 'KES', // 符号，放在货币前面
      'SYMBOL-SUFFIX': 'Ksh', // 符号，放在货币后面
      'SYMBOL-SHORT': '', // 符号简写
    })
  } else if (countryCode.value === 'gh') {
    currency = reactive({
      CODE: 'GHS', // 代码
      SYMBOL: 'GHS', // 符号，放在货币前面
      'SYMBOL-SUFFIX': 'GHS', // 符号，放在货币后面
      'SYMBOL-SHORT': '', // 符号简写
    })
  }
  return { currency }
}
