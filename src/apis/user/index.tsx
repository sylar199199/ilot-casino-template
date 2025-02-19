import http from '@/utils/http'

export default {
  // 登陆
  userLogin: (params:any) => http.post('/user/un/login', {...params }),
  // 查询用户信息
  queryPlayer: (params = {}) => http.post('/user/api/queryPlayer', {...params }),
  // 查询账户信息
  queryAccountInfo: (params = {}) => http.post('/funds/api/queryAccountInfo', {...params }),
  // 更新用户信息
  updateUserInfo: (params: any) => http.post('/user/api/update', {...params }),
  // 查询优惠卷列表
  queryCoupons: (params = {}) => http.post('/coupon/api/coupons', params),
}
