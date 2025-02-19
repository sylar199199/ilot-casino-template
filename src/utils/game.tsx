import store from '@/store'

// 清空房间信息
export function clearRoomInfo() {
  store.commit('SET_GAME_STATUS', '') // 重置游戏状态
  store.commit('SET_USER_CARD_LIST', []) // 清空用户的牌
  store.commit('SET_TABLE_CARD_LIST', []) // 清空牌桌上的牌
  store.commit('SET_CARD_SIZE', []) // 重置牌数量
  store.commit('SET_FUNC_CARD_ENABLE', false) // 功能牌是否生效
  store.commit('SET_CURRENT_PLAYER_SN', -1) // 重置当前是谁出牌
  store.commit('SET_CURRENT_SEQ', -1) // 重置回合数
  store.commit('SET_GAME_HINT', '') // 清空牌局提示
  store.commit('SET_AUDIO_HINT', '') // 清空音频提示
  store.commit('SET_GAME_RANK', []) // 重置游戏排名
}
