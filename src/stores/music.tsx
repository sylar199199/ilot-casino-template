import {defineStore} from 'pinia'

export const useMusicStore = defineStore('music', {
    // 持久化
    persist: {
        key: 'ilot-game-lucky-dice-music',
        storage: window.sessionStorage,
    },

    state: () => {
        return {
            soundSwitch: 'on', // 音效开关
            clickSoundSwitch: 'on',
            mainBgMusic: null as any, // 背景音乐
            mainBgMusicPlayStatus: false, // 背景音乐播放状态
        }
    },
    getters: {},
})
