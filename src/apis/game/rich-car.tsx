import http from '@/utils/http'

export default {
  // 投注
  handleBet: (params:any) => http.post('/cr/api/bet', { ...params }),
  // 游戏订单查询（不含税）
  queryBetHistory: (params: any) => http.post('/cr/api/getBetHistory', { ...params }),
  // 游戏订单查询（含税）
  queryBetHistoryTax: (params: any) => http.post('/cr/api/getBetTaxHistory', { ...params }),
  // 游戏订单详情
  queryBetDetail: (params: any) => http.get('/cr/api/bet_tax_detail', { ...params }),
  // 获取赛事记录
  getMatchRecords: (params: any) => http.post('/cr/un/getMatchRecords', { ...params }),
  // 获取球队统计
  getTeamStats: (params: any) => http.post('/cr/un/getTeamStats', { ...params }),
  // 获取排行榜
  getRanks: (params:any) => http.post('/cr/un/getRanks', { ...params }),
}
