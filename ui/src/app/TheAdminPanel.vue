<template>
  <div class="admin-panel">


    <router-view></router-view>

  </div>
</template>

<script>
export default {

  created() {
    const token = localStorage.getItem('admin-token')
    if (token) {
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      console.log('added token to axios', this.axios.defaults.headers)
    }

    this.axios.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          console.log('Unauthorized')
          localStorage.removeItem('admin-token')
          this.$router.push({name: 'AdminPanelLogin'})
        } else { 
          console.log('Authorized')
        }
      });
    });
  }
};
</script>