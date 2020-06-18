import Auth from './pages/Auth'
import Home from './pages/Home'

// Middleware
const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('token')) return next()
  next('/')
}
const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) return next()
  next('/auth')
}

const adminRoutes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  }
]

export default adminRoutes
