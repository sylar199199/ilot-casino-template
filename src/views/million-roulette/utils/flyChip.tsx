import { useMRouletteStore } from '@/stores/million-roulette'

let mRouletteStore = null as any

export function randomBl() {
  return Math.random() >= 0.5
}

export function randomNum(num: number) {
  return Math.floor(Math.random() * num)
}

// 获取动画元素
export function createFlyChipElement(marketName: string, outcome: any, blSelf: boolean) {
  // 创建金币元素
  const element = document.createElement('div')
  element.classList.add('fly-chip')
  element.classList.add('temp')
  if (blSelf) {
    element.classList.add('pre-bet')
  }
  element.setAttribute('data-market', marketName)
  element.setAttribute('data-outcome', outcome.id)
  return element
}

// 获取节点位置
export function getPos(dom: HTMLElement) {
  let left = dom.offsetLeft
  let top = dom.offsetTop
  let parentElement = dom.parentElement
  while (parentElement && !parentElement.classList.contains('page-container')) {
    left += parentElement.offsetLeft
    top += parentElement.offsetTop
    parentElement = parentElement.parentElement
  }
  return { left, top }
}

export function getBoundingClientRect(to: HTMLElement, marketName?: string) {
  if (to) return to.getBoundingClientRect()
  const ratio = window.innerWidth / 375
  if (marketName && ['O/U E/O'].includes(marketName)) {
    return { width: 150 * ratio, height: 92 * ratio }
  } else {
    return { width: 90 * ratio, height: 72 * ratio }
  }
}

export function getRandomPos(to: HTMLElement, marketName?: string) {
  const { width, height } = getBoundingClientRect(to, marketName)
  const random = Math.random()
  if (random <= 0.5) {
    return {
      left: randomNum(0.3 * width - 18),
      top: randomNum(0.75 * height - 18),
    }
  } else {
    return {
      left: 0.7 * width + randomNum(0.3 * width - 18),
      top: randomNum(0.75 * height - 18),
    }
  }
}

export function flyChip(marketName: string, outcome: any, fromSelector: string, toSelector: string, blSelf: boolean, initScale = 1,) {
  const from = document.querySelector(fromSelector) as HTMLElement
  const to = document.querySelector(toSelector) as HTMLElement
  if (!from) return
  if (!to) {
    // 存入pinia
    if (!mRouletteStore) mRouletteStore = useMRouletteStore()
    const flyChipInfo = {
      key: new Date().getTime() + Math.random(),
      matchId: mRouletteStore.matchId,
      marketName,
      outcomeId: outcome.id,
      blSelf,
      style: null,
    }
    mRouletteStore.flyChips.push(flyChipInfo)
    return
  }
  // 创建动画元素
  const flyChipElement = createFlyChipElement(marketName, outcome, blSelf)
  if (!flyChipElement) return
  // 初始化动画元素位置
  const { left: startLeft, top: startTop } = getPos(from)
  const { width, height } = from.getBoundingClientRect()
  const { width: chipWidth, height: chipHeight } = flyChip.getBoundingClientRect()
  flyChip.style.left = (startLeft + 0.5 * (width - chipWidth)) + 'px'
  flyChip.style.top = (startTop + 0.5 * (height - chipHeight)) + 'px'
  flyChip.style.opacity = '0.3'
  flyChip.style.transform = `perspective(1000px) rotateX(0deg) scale(${initScale})`
  flyChip.style.transformOrigin = 'left top'
  flyChip.style.transition = 'all ease-in 0.3s'
  // 插入动画元素
  const pageContent = document.querySelector('.page-container') as HTMLElement
  pageContent.appendChild(flyChip)
  // 动画元素飞入目标位置
  window.requestAnimationFrame(() => {
    const { left: endLeft, top: endTop } = getPos(to)
    const { left: randomLeft, top: randomTop } = getRandomPos(to, marketName)
    const chipStyle = {
      left: (endLeft + randomLeft) / 3.75 + 'vw',
      top: (endTop + randomTop) / 3.75 + 'vw',
      opacity: '1',
      transform: 'perspective(1000px) scale(0.8)',
    }
    flyChip.style.left = chipStyle.left
    flyChip.style.top = chipStyle.top
    flyChip.style.opacity = chipStyle.opacity
    flyChip.style.transform = chipStyle.transform
    // 存入pinia
    if (!mRouletteStore) mRouletteStore = useMRouletteStore()
    const flyChipInfo = {
      key: new Date().getTime() + Math.random(),
      matchId: mRouletteStore.matchId,
      marketName,
      outcomeId: outcome.id,
      blSelf,
      style: {
        left: randomLeft / 3.75 + 'vw',
        top: randomTop / 3.75 + 'vw',
        opacity: '1',
        transform: 'perspective(1000px) scale(0.8)',
      },
    }
    setTimeout(() => {
      mRouletteStore.flyChips.push(flyChipInfo)
      clearChip('.fly-chip.temp')
    }, 400)
  })
}

export function addChipTag(chipSelector: string, tag: string) {
  const chips = document.querySelectorAll(chipSelector)
  chips.forEach((chip: any) => {
    chip.setAttribute('data-tag', tag)
  })
}

export function setChipSuccess(chipSelector: string) {
  const chips = document.querySelectorAll(chipSelector)
  chips.forEach((chip: any) => {
    chip.classList.remove('pre-bet')
  })
}

export function clearChip(chipSelector: string) {
  const chips = document.querySelectorAll(chipSelector)
  chips.forEach((chip: any) => {
    chip.parentNode.removeChild(chip)
  })
}

export function clearAllChip() {
  clearChip('.fly-chip')
}
