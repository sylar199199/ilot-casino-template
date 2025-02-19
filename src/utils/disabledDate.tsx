import dayjs from 'dayjs'

// 只允许查询近6个月的时间范围
export function disabledDate (current: any) {
  const now = dayjs().valueOf()
  const last6Month = dayjs(now).subtract(6, 'month').valueOf()
  const nowTimestamp = dayjs(now).valueOf()
  const currentTimestamp = dayjs(current).valueOf()

  return currentTimestamp < last6Month || currentTimestamp > nowTimestamp
}
