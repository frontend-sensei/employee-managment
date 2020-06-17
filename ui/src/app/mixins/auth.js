export default {
  
  data() {
    return {
      valid: true,

      login: '',
      loginRules: [
        v => !!v || 'Логин обязательное поле',
        v => (v && v.length <= 10) || 'Логин должен быть максимум 10 символов',
        v => (v && v.length >= 3) || 'Логин должен быть минимум 3 символа',
      ],

      password: '',
      passwordRules: [
        v => !!v || 'Пароль обязательное поле',
        v => (v && v.length <= 20) || 'Пароль должен быть максимум 20 символов',
        v => (v && v.length >= 6) || 'Пароль  должен быть минимум 6 символа',
      ]
    }
  },

  methods: {

    validate() {
      return this.$refs.form.validate()
    },

    reset() {
      this.$refs.form.reset()
    },

  }
}