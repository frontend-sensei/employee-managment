import axios from 'axios'
import router from '@/app-routes'

export default {
  actions: {

    authLogin({}, data) {
      axios({
        method: 'post',
        url: '/login',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(data)
      })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('token', token)
        router.push('/')
      })
      .catch(err => {
        localStorage.removeItem('token')
        console.log('error', err)
      })
    },

    authLogout() {
      localStorage.removeItem('token')
      router.push('/auth')
    }

  }
}