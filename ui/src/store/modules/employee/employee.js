import axios from 'axios'

export default {

  state: {
    employees: []
  },

  getters: {
    employees(state) {
      return state.employees
    }
  },

  mutations: {
    setEmployees(state, data) {
      state.employees = data
    },
    createEmployee(state, data) {
      state.employees.push(data)
    },
    updateEmployee(state, data) {
      const index = state.employees.findIndex(e => e._id === data._id)
      Object.assign(state.employees[index], data)
    },
    deleteEmployee(state, data) {
      state.employees = state.employees.filter(e => e._id !== data._id)
    },
  },

  actions: {

    fetchEmployees(context) {
      axios({
        method: 'get',
        url: '/employee',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => {
        context.commit('setEmployees', res.data.employees)
      })
      .catch(err => {
        console.log('error', err)
      })
    },

    createEmployee(context, data) {
      axios({
        method: 'post',
        url: '/employee',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(data)
      })
      .then((res) => {
        context.commit('createEmployee', res.data.employee)
      })
      .catch(err => {
        console.log('error', err)
      })
    },

    updateEmployee(context, data) {
      axios({
        method: 'post',
        url: '/employee/edit',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(data)
      })
      .then((res) => {
        context.commit('updateEmployee', data)
      })
      .catch(err => {
        console.log('error', err)
      })
    },

    deleteEmployee(context, data) {
      axios({
        method: 'post',
        url: '/employee/delete',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(data)
      })
      .then((res) => {
        context.commit('deleteEmployee', data)
      })
      .catch(err => {
        console.log('error', err)
      })
    },

  }
}