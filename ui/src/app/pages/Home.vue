<template>
  <div>
    <Navbar/>
    
    <Table/>
  </div>  
</template>

<script>
import Navbar from '@/app/layouts/Navbar'
import Table from '@/app/components/Table'

export default {
  components: { Navbar, Table },

  created() {
    const token = localStorage.getItem('token')

    if (token) {
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }

    this.axios.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          console.log('Unauthorized')
          localStorage.removeItem('token')
          this.$router.push({name: 'Auth'})
        } else { 
          console.log('Authorized')
        }
      });
    });
  },
}
</script>