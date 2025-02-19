import { playMusic, pauseMusic } from '@/utils/playMusic'

export function playAmountMusic(fileName: string, options: any) {
  const musicUrl = new URL(`../audios/${fileName}`, import.meta.url).href
  playMusic(musicUrl, options)
}

export function pauseAmountMusic(fileName: string) {
  const musicUrl = new URL(`../audios/${fileName}`, import.meta.url).href
  pauseMusic(musicUrl)
}
