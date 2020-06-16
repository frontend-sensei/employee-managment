<template>
  <div class="admin-login">
    
    <h2 class="admin-login-headline">Admin Panel</h2>
    <form class="admin-login-form" 
    @submit.prevent="onLogin">

      <AppInput
        :model="login"
        :type="'text'"
        :name="'login'"
        :label="'Login'"
        @getInputValue="val => login = val"
      />

      <AppInput
        :model="password"
        :type="'password'"
        :name="'password'"
        :label="'Password'"
        @getInputValue="val => password = val"
      />

      <button class="admin-login-form__btn">Login</button>

    </form>

  </div>
</template>

<script>
import AppInput from './components/AppInput'
export default {
  components: {
    AppInput
  },

  data: () => {
    return {
      login: "",
      password: "",
    }
  },

  methods: {
    onLogin() {
      const data = {
        login: this.login,
        password: this.password,
      }

      this.axios({
        method: 'post',
        url: 'http://localhost:3000/api/admin-login',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(data)
      }).then((res) => {
        const token = res.data.token
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        localStorage.setItem('admin-token', token)

        this.login = this.password = ''
        
        this.$router.push({name: 'AdminPanel'})
      }).catch(err => {
        localStorage.removeItem('admin-token')
        console.log(err)
      })
    }
  }

}
</script>