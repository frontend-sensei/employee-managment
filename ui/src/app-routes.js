import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import adminRoutes from './app/admin-routes'

const routes = [
  ...adminRoutes
  // {
  //   path: '/dear',
  //   name: 'dear',
  //   component: () => import('../views/Dear.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
