import { ref } from 'vue'
import { getCountryCode } from '@/utils/getCountryCode'

export function useCountryCode() {
  const countryCode = ref(getCountryCode())
  return { countryCode }
}
