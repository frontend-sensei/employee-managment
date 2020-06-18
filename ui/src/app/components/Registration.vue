<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="login"
      :rules="loginRules"
      label="Login"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="20"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submit"
    >Register</v-btn>

  </v-form>
</template>

<script>
  import { mapActions } from 'vuex'
  import auth from '@/app/mixins/auth'

  export default {

    mixins: [auth],

    methods: {

      submit() {
        if (!this.validate()) return false
        const data = {
          login: this.login,
          password: this.password
        }
        this.register(data)
        this.reset()
      },

      ...mapActions(['register']),
    },
  }
</script>