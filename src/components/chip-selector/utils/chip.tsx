// 获取筹码列表
export function getChipList() {
  const countryCode = localStorage.getItem('countryCode')
  if (countryCode === 'gh') {
    return [
      { label: '0.5', value: 0.5, color: 'red' },
      { label: '1', value: 1, color: 'green' },
      { label: '2', value: 2, color: 'skyblue' },
      { label: '5', value: 5, color: 'black' },
      { label: '10', value: 10, color: 'blue' },
      { label: '20', value: 20, color: 'yellow' },
      { label: '50', value: 50, color: 'pink' },
      { label: '100', value: 100, color: 'orange' },
      { label: '500', value: 500, color: 'khaki' },
    ]
  } else if (countryCode === 'ke') {
    return [
      { label: '3', value: 3, color: 'red' },
      { label: '20', value: 20, color: 'green' },
      { label: '50', value: 50, color: 'skyblue' },
      { label: '100', value: 100, color: 'black' },
      { label: '200', value: 200, color: 'blue' },
      { label: '500', value: 500, color: 'yellow' },
      { label: '1K', value: 1000, color: 'pink' },
      { label: '2K', value: 2000, color: 'orange' },
      { label: '5K', value: 5000, color: 'khaki' },
    ]
  } else {
    return [
      { label: '50', value: 50, color: 'red' },
      { label: '100', value: 100, color: 'green' },
      { label: '200', value: 200, color: 'skyblue' },
      { label: '500', value: 500, color: 'black' },
      { label: '1K', value: 1000, color: 'blue' },
      { label: '2K', value: 2000, color: 'yellow' },
      { label: '5K', value: 5000, color: 'pink' },
      { label: '10K', value: 10000, color: 'orange' },
      { label: '20K', value: 20000, color: 'khaki' },
    ]
  }
}


// 根据余额获取默认投注额
export function getDefaultAmount(balance: any) {
  const countryCode = localStorage.getItem('countryCode')
  if (countryCode === 'gh') {
    if (balance >= 1000) {
      return 10
    } else if (balance >= 200) {
      return 5
    } else if (balance >= 50) {
      return 2
    } else {
      return 1
    }
  } else if (countryCode === 'ke') {
    if (balance >= 10000) {
      return 100
    } else if (balance >= 2000) {
      return 50
    } else if (balance >= 500) {
      return 20
    } else {
      return 3
    }
  } else {
    if (balance >= 100000) {
      return 1000
    } else if (balance >= 20000) {
      return 500
    } else if (balance >= 5000) {
      return 200
    } else {
      return 100
    }
  }
}
export function getDefaultColor(amount: number){
  const countryCode = localStorage.getItem('countryCode')
  if (countryCode === 'gh') {
    switch (amount) {
      case 10:
        return 'blue'
      case 5:
        return 'black'
      case 2:
        return 'skyblue'
      case 1:
        return 'green'
    }
  }
  if(countryCode === 'ke'){
    switch (amount) {
      case 100:
        return 'blue'
      case 50:
        return 'black'
      case 20:
        return 'skyblue'
      case 10:
        return 'green'
    }
  }
  if (countryCode === 'ng') {
    switch (amount) {
      case 1000:
        return 'blue'
      case 500:
        return 'black'
      case 200:
        return 'skyblue'
      case 100:
        return 'green'
    }
  }
}
