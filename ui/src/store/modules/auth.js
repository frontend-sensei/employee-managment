export default {
  state: {
    token: localStorage.getItem('token') || null
  },

  getters: {
    getToken: state => {
        return state.token;
    },
  },

  mutations: {
    setToken: (state, payload) => {
        state.token = payload;
    },
  },
}