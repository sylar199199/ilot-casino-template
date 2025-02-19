import router from '@/router'

export function backGameRoom(res: { cfg: { matchMode: string; id: any }; roomId: any; playerNum: any }) {
  let from = 'match'
  if (res.cfg.matchMode === 'invite') {
    from = 'friend'
  }
  router.push({
    path: '/game-room',
    query: {
      roomId: res.roomId,
      id: res.cfg.id,
      players: res.playerNum,
      from: from,
      recovery: 1, // 恢复游戏
    }
  })
}