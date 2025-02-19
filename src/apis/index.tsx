const matches = import.meta.glob('./*/*.tsx', { eager: true }) as any
let api = {}

for (const key in matches) {
  api = Object.assign(api, matches[key].default)
}

export default api
