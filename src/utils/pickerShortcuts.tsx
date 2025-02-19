import dayjs from 'moment'

// 日期时间快捷选项
export const dateShortcuts = [
  {
    text: 'Last week',
    value: () => {
      const now = dayjs().format('YYYY-MM-DD')

      return [dayjs(now).subtract(7, 'day'), dayjs(now)]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const now = dayjs().format('YYYY-MM-DD')

      return [dayjs(now).subtract(1, 'month'), dayjs(now)]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const now = dayjs().format('YYYY-MM-DD')

      return [dayjs(now).subtract(3, 'month'), dayjs(now)]
    },
  },
  {
    text: 'Last 6 months',
    value: () => {
      const now = dayjs().format('YYYY-MM-DD')

      return [dayjs(now).subtract(6, 'month'), dayjs(now)]
    },
  },
]

// 月份时间快捷选项
export const monthShortcuts = [
  {
    text: 'This month',
    value: () => {
      const now = dayjs().format('YYYY-MM')

      return [dayjs(now), dayjs(now)]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const now = dayjs().format('YYYY-MM')

      return [dayjs(now).subtract(3, 'month'), dayjs(now)]
    },
  },
  {
    text: 'Last 6 months',
    value: () => {
      const now = dayjs().format('YYYY-MM')

      return [dayjs(now).subtract(6, 'month'), dayjs(now)]
    },
  },
]
