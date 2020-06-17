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
      @click="onLogin"
    >Login</v-btn>

  </v-form>
</template>

<script>
  import auth from '@/app/mixins/auth'

  export default {

    mixins: [auth],

    methods: {

      async onLogin() {
        if (!this.validate()) return false
        
        const { login, password } = this
        this.reset()
        await this.$store.dispatch('authLogin', { login, password })
      }

    }
  }
</script>