export function download(resBlob: any, fileName: string, target = '_self', fileType = '.xls') {
  var blob = new Blob([resBlob], {
    type: 'application/vnd.ms-excel;charset=utf-8'
  })
  var navigator = window.navigator as any
  if (window.navigator && navigator.msSaveOrOpenBlob) {
    // 兼容IE
    navigator.msSaveOrOpenBlob(blob, fileName + fileType)
  } else {
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.target = target
    a.style.display = 'none'
    a.setAttribute('download', fileName + fileType)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a) // 下载完成移除元素
    window.URL.revokeObjectURL(url) // 释放掉blob对象
  }
}
