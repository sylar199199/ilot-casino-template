import { computed } from 'vue'
import { useMRouletteStore } from '@/stores/million-roulette'

const RacingBgMap = new Map()
RacingBgMap.set(1, '#D4D4D4')
RacingBgMap.set(2, '#72BAFF')
RacingBgMap.set(3, '#69E49A')
RacingBgMap.set(4, '#A497FF')
RacingBgMap.set(5, 'linear-gradient(154deg, #F2C85D 0%, #FFF3D4 17%, #DFB654 23%, #FFE2A1 42%, #C59B44 55%, #FFE8BE 75%, #C18F3C 100%)')

export function useRacingBg() {
  const mRouletteStore = useMRouletteStore()
  const RacingBg = computed(() => RacingBgMap.get(mRouletteStore.selectedCount || 1))
  return { RacingBg }
}
