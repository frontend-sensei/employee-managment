import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/auth'
import employee from './modules/employee/employee'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    employee
  }
})
