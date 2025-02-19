import { computed, watch } from 'vue'
import {useMusicStore} from '@/stores/music'
import { playMusic, playSoundMusic } from '@/utils/playMusic'

export function playGameBgMusic(fileName: string, options: any) {
  const musicStore = useMusicStore()
  const clickSoundSwitch = computed(() => musicStore.clickSoundSwitch)
  const musicUrl = new URL(`../audios/${fileName}`, import.meta.url).href
  const audioElement = playMusic(musicUrl, { ...options, clickSoundSwitch: clickSoundSwitch.value })
  watch(clickSoundSwitch, (newVal) => {
    if (audioElement) {
      if (newVal === 'on') {
        options.loop && audioElement.play()
      } else {
        setTimeout(()=>{
          audioElement.pause()
        }, 200)
      }
    }
  }, { immediate: true })
  return audioElement
}
export function playSoundClickMusic(fileName: string, options: any) {
  const musicStore = useMusicStore()
  const clickSoundSwitch = computed(() => musicStore.clickSoundSwitch)
  const musicUrl = new URL(`../audios/${fileName}`, import.meta.url).href
  const audioElement = playSoundMusic(musicUrl, {...options, clickSoundSwitch: clickSoundSwitch.value})
  watch(clickSoundSwitch, (newVal) => {
    if (audioElement) {
      if (newVal === 'on') {
        !options.loop && audioElement.play()
      } else {
        audioElement.pause()
      }
    }
  }, {immediate: true})
  return audioElement
}
