let mocks: any = {}
let matches = import.meta.globEager('./*/*.tsx')

for (const key in matches) {
  mocks = Object.assign(mocks, matches[key].default)
}

export default mocks
