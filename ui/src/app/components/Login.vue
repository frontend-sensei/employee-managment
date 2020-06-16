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
      @click="validate"
    >
      Login
    </v-btn>

  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      login: '',
      loginRules: [
        v => !!v || 'Login is required',
        v => (v && v.length <= 10) || 'Login must be less than 10 characters',
        v => (v && v.length >= 3) || 'Login must be more than 3 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>