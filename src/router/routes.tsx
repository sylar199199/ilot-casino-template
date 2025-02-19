import { RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = []
let matches = import.meta.glob('./*/*.tsx', { eager: true }) as any

for (const key in matches) {
  routes = routes.concat(matches[key].default)
}

export default routes
