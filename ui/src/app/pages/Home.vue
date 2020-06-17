<template>
  <div>
    <Navbar/>

    <v-btn
      color="primary ma-5"
      dark
      @click="openDialog(dialogDataEdit)"
    >
      Edit User 
    </v-btn>

    <v-btn
      color="primary"
      dark
      @click="openDialog()"
    >
      Create User 
    </v-btn>

    <Modal/>
  </div>  
</template>

<script>
import Navbar from '@/app/layouts/Navbar'
import Modal from '@/app/components/Modal'
import { mapMutations } from 'vuex'

export default {
  components: { Navbar, Modal },

  data() {
    return {
      dialogDataEdit: {
        fullName: 'Saijo Masataka',
        position: 'Frontend',
        salary: '1000',
        dateOfBirth: '1900-01-19'
      }
    }
  },

  created() {
    const token = localStorage.getItem('token')

    if (token) {
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      console.log('added token to axios', this.axios.defaults.headers)
    }

    this.axios.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          console.log('Unauthorized')
          localStorage.removeItem('token')
          this.$router.push({name: 'AdminPanelLogin'})
        } else { 
          console.log('Authorized')
        }
      });
    });
  },

  methods: {
    ...mapMutations({
      openDialog: 'showDialog',
    }),
  }
}
</script>