// 获取节点位置
export function getPos(dom: HTMLElement) {
  let left = dom.offsetLeft
  let top = dom.offsetTop
  let parentElement = dom.parentElement
  while(parentElement && !parentElement.classList.contains('page-content')) {
    left += parentElement.offsetLeft
    top += parentElement.offsetTop
    parentElement = parentElement.parentElement
  }
  return { left, top }
}
