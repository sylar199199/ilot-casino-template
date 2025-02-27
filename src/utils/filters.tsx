/**
 * 格式转换工具集
 */
import NP from 'number-precision'
import dayjs from 'dayjs'
import { isEmpty } from './index'

// 数值转百分比
export function numToPercent(value: number) {
  if (isNaN(value)) {
    return '-'
  }

  return NP.times(value, 100) + ' %'
}

// 金额格式化
export function numToAmount(value: number) {
  if (isNaN(value)) {
    return '-'
  }

  const intMatch = String(value).match(/^-?\d+/)
  const int = intMatch ? intMatch[0] : 0
  const tail = String(value).match(/\.\d+/)
  const moneyInt = String(int)
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/,$/, '')
    .replace(/,-$/, '-')
    .split('')
    .reverse()
    .join('')
  return moneyInt + (tail ? tail[0] : '')
}

// 日期格式化
export function formatTime(value: string) {
  if (isEmpty(value)) {
    return '-'
  }

  return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
}

/*
 * @desc 金额转为千分符显示
 * @params s  金额
 * @params n  显示小数位数
 **/
export const fmoney = (s: any, n = 2) => {
  s = s || 0
  let minus = false
  if (s < 0) {
    s = Math.abs(s)
    minus = true
  }
  s = parseFloat((s + '').replace(/[^\d.-]/g, '""')).toFixed(n) + ''
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  if (n === 0) {
    return t.split('').reverse().join('')
  }
  return (minus ? '-' : '') + t.split('').reverse().join('') + '.' + r
}

// 数字保留特定位数，多余舍去
export function truncateDecimals(num: number, digit = 2) {
  const strNumber = num.toString()
  const decimalIndex = strNumber.indexOf('.')
  if (decimalIndex !== -1) {
    return parseFloat(strNumber.slice(0, decimalIndex + digit + 1))
  } else {
    return num
  }
}


/**
 * 金额转换
 * 1千开始显示xx.xxK  k代表千 超过百万用M
 * separator-显示千分符
 */
export function tMoney(num: number, digit = 2, separator = true) {
  if (!num) num = 0
  if (num >= 1000000) {
    const result = truncateDecimals(NP.divide(num, 1000000), digit)
    return separator ? fmoney(result, digit) + 'M' : result.toFixed(digit) + 'M'
  } else if (num >= 1000) {
    const result = truncateDecimals(NP.divide(num, 1000), digit)
    return separator ? fmoney(result, digit) + 'K' : result.toFixed(digit) + 'K'
  } else {
    const result = truncateDecimals(num, digit)
    return separator ? fmoney(result, digit) : result.toFixed(digit)
  }
}
