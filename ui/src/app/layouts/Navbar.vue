<template>
  <div>
    <v-app-bar
      color="blue darken-3"
      dense
      dark
    >
      <v-toolbar-title>Employee management</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="authLogout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['authLogout'])
  }
}
</script>