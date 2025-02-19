/**
 * 自动化导入
 * 使用文件名作为命名空间，防止同名数据覆盖
 */

let moduleConfig: any = {}

const files = import.meta.glob('./*.tsx', { eager: true })
Object.keys(files).forEach((fileName) => {
  const name = fileName.replace(/\.\/|\.tsx/g, '')
  moduleConfig[name] = (files[fileName] as any).default
})
export default moduleConfig