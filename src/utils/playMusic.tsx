import { useMusicStore } from '@/stores/music'

const audioObj: Record<string, HTMLAudioElement> = {}

// 创建或获取音频实例
function getAudioElement(url: string, loop: boolean = false): HTMLAudioElement {
  if (!audioObj[url]) {
    audioObj[url] = new Audio(url)
  }
  const audio = audioObj[url]
  audio.currentTime = 0
  audio.loop = loop
  return audio
}

// 处理自动播放
function handleAutoPlay(audioElement: HTMLAudioElement): void {
  const promise = audioElement.play()
  if (!promise) return

  promise.catch(() => {
    const playOnClick = () => {
      audioElement.play()
      window.removeEventListener('click', playOnClick)
    }
    window.addEventListener('click', playOnClick)
  })
}

// 添加可见性变化监听
function addVisibilityListener(audioElement: HTMLAudioElement, isBgMusic: boolean = false) {
  const musicStore = useMusicStore()

  const handleVisibilityChange = () => {
    if (musicStore.clickSoundSwitch === 'off') {
      setTimeout(() => {
        audioElement.pause()
      }, 500)
      return
    }

    const isVisible = document.visibilityState === 'visible'

    if (isBgMusic) {
      // 背景音乐的处理
      if (isVisible) {
        if (musicStore.mainBgMusicPlayStatus) {
          audioElement.play()
        }
      } else {
        audioElement.pause()
      }
    } else {
      // 音效的处理
      if (!isVisible) {
        audioElement.pause()
      } else if (audioElement.currentTime < audioElement.duration) {
        // 只有在音效还没播放完时才恢复播放
        audioElement.play()
      }
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('pagehide', () => audioElement.pause())
}

// 播放音乐主函数
export function playMusic(url: string, { loop = false, clickSoundSwitch = 'on' }) {
  const isBgMusic = url.includes('bg')
  const audioElement = getAudioElement(url, loop)

  // 只有非背景音乐时才设置 muted
  if (!isBgMusic) {
    audioElement.muted = true
  }

  if (clickSoundSwitch !== 'off') {
    const playMusic = () => handleAutoPlay(audioElement)
    playMusic()
    audioElement.addEventListener('loadeddata', playMusic)
  }

  addVisibilityListener(audioElement, isBgMusic)

  return audioElement
}

// 播放音效
export function playSoundMusic(url: string, { loop = false, clickSoundSwitch = 'on' }) {
  const audioElement = getAudioElement(url, loop)

  if (clickSoundSwitch !== 'off') {
    const playMusic = () => handleAutoPlay(audioElement)
    playMusic()
    audioElement.addEventListener('loadeddata', playMusic)
  }

  addVisibilityListener(audioElement, false)

  return audioElement
}

// 暂停音频
export function pauseMusic(url: string) {
  const audioElement = audioObj[url]
  if (audioElement) {
    audioElement.pause()
  }
  return audioElement
}
