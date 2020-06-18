const dialogDataDefault = {
  fullName: '',
  position: '',
  salary: '',
  dateOfBirth: new Date().toISOString().substr(0, 10)
}

export default {

  state: {
    dialogIsVisible: false,
    dialogData: dialogDataDefault
  },

  getters: {
    dialogIsVisible(state) {
      return state.dialogIsVisible
    },
    dialogData(state) {
      return state.dialogData || dialogDataDefault
    }
  },

  mutations: {
    showDialog(state, data) {
      state.dialogIsVisible = true
      state.dialogData = data
    },
    hideDialog(state) {
      state.dialogIsVisible = false
      state.dialogData = dialogDataDefault
    }
  }
}