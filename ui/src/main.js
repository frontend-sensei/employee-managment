import './assets/scss/index.scss'

import Vue from 'vue'
import App from './app/App'
import router from './app-routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
