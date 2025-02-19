// 判断是否为空
export function isEmpty(value: any) {
  return [null, undefined, ''].includes(value)
}
