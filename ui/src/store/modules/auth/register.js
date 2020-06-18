import axios from 'axios'

export default {
  actions: {
    register({}, data) {

      axios({
        method: 'post',
        url: '/register',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(data)
      })

    }
  }
}