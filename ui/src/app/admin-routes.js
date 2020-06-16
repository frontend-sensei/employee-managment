import Auth from './pages/Auth'
import Main from './pages/Main'

import AdminPanel from './TheAdminPanel'



// Middleware
const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('admin-token')) {
    next()
    return
  }
  next('/')
}
const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('admin-token')) {
    next()
    return
  }
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
    name: 'AdminPanel',
    component: AdminPanel,
    beforeEnter: ifAuthenticated,
    redirect: {name: 'admin-panel-home'},
    children: [
      {
        path: 'home',
        name: 'admin-panel-home',
        component: Main
      },
      // {
      //   path: 'genres',
      //   name: 'admin-panel-genres',
      //   component: AdminGenres
      // }
    ]
  }
]

export default adminRoutes
