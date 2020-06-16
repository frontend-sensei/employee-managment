<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-card class="flex xs11 sm8 md6">
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark 
        centered
      >
        <v-tab
          v-for="item in items"
          :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.tab"
        >
          <v-card flat class="pa-4">
            <component :is="item.component"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
    'login': () => import('@/app/components/Login'),
    'registration': () => import('@/app/components/Registration'),
  },
  
  data () {
    return {
      tab: null,
      items: [
        { tab: 'login', component: 'login' },
        { tab: 'Registration', component: 'registration' },
      ],
    }
  },
}
</script>