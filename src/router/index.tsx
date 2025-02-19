import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory('/million-roulette'),
  routes,
})

router.beforeEach((to, from, next) => {
  // 设置标题
  if (to.meta.title) {
    document.title = `rick-car-${to.meta.title}`
  }

  // 滚动至顶部
  window.scrollTo(0, 0)

  // 路由支持带国家编码
  const countryCodeReg = /\/(ng|ke|gh)\/?$/
  if (countryCodeReg.test(to.path)) {
    next({
      path: to.path.replace(countryCodeReg, '') || '/',
      query: { ...to.query },
      params: { ...to.params },
    })
  } else {
    next()
  }
})

export default router
