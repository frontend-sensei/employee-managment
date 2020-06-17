import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/auth'
import modal from './modules/modal/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    modal
  }
})
