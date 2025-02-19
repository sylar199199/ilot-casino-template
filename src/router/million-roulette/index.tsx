const MillionRoulette = () => import(/* webpackChunkName: "fruitParty" */ '@/views/million-roulette/index.vue')

const routes = [
  {
    path: '/',
    component: MillionRoulette,
    meta: { title: '' },
  },
]

export default routes
