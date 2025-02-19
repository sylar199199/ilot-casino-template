// 头像列表
export const headerUrlList = [
  'https://d.ilot.ng/images/avatar_1.png',
  'https://d.ilot.ng/images/avatar_2.png',
  'https://d.ilot.ng/images/avatar_3.png',
  'https://d.ilot.ng/images/avatar_4.png',
  'https://d.ilot.ng/images/avatar_5.png',
  'https://d.ilot.ng/images/avatar_6.png',
  'https://d.ilot.ng/images/avatar_7.png',
  'https://d.ilot.ng/images/avatar_8.png',
  'https://d.ilot.ng/images/avatar_9.png',
  'https://d.ilot.ng/images/avatar_10.png',
  'https://d.ilot.ng/images/avatar_11.png',
  'https://d.ilot.ng/images/avatar_12.png',
  'https://d.ilot.ng/images/avatar_13.png',
  'https://d.ilot.ng/images/avatar_14.png',
  'https://d.ilot.ng/images/avatar_15.png',
  'https://d.ilot.ng/images/avatar_16.png',
  'https://s.ilotbet.com/images/whot_avatar_1.png',
  'https://s.ilotbet.com/images/whot_avatar_2.png',
  'https://s.ilotbet.com/images/whot_avatar_3.png',
  'https://s.ilotbet.com/images/whot_avatar_4.png',
  'https://s.ilotbet.com/images/whot_avatar_5.png',
  'https://s.ilotbet.com/images/whot_avatar_6.png',
  'https://s.ilotbet.com/images/whot_avatar_7.png',
  'https://s.ilotbet.com/images/whot_avatar_8.png',
  'https://s.ilotbet.com/images/whot_avatar_9.png',
  'https://s.ilotbet.com/images/whot_avatar_10.png',
  'https://s.ilotbet.com/images/whot_avatar_11.png',
  'https://s.ilotbet.com/images/whot_avatar_12.png',
]

// 名称列表
const firstNameList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const lastNameList = ['Cookie', 'Tiger', 'Shadow', 'River', 'Eagle', 'Dream', 'Frost', 'Spark', 'Moon', 'Star', 'Jazz', 'Storm', 'Cloud', 'Pearl', 'Phoenix', 'Blaze', 'Lily', 'Ruby', 'Karma', 'Jazz', 'Ivy', 'Grace', 'Swift', 'Mystic', 'Flame', 'Nova', 'Hope', 'Rain', 'Dawn', 'Boise', 'Jade', 'Dust', 'Orion', 'Reef', 'Zenith', 'Willow', 'Swift', 'Charm', 'June', 'Bliss', 'Terra', 'Opal', 'Rogue', 'Hawk', 'Flora', 'Maple', 'Iris', 'Bliss', 'Yara', 'Venus', 'Leon', 'Indigo', 'Rory', 'Iris', 'Flynn', 'Blaze', 'Lotus', 'Fawn', 'Ash']

/* 随机头像 */
export function randomHeadUrl() {
  return Math.floor(Math.random() * headerUrlList.length)
}

export function randomUrl() {
  return headerUrlList[Math.floor(Math.random() * headerUrlList.length)]
}

// 全名
export function randomFullName() {
  const firstName = randomName(firstNameList) + randomName(firstNameList)
  const lastName = randomName(lastNameList)
  return `${firstName}.${lastName}`
}

// 随机名字
function randomName(arr: string | any[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}