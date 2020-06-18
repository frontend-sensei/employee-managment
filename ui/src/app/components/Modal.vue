<template>
  <v-row justify="center">
    <v-dialog v-model="dialogIsVisible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              >
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                    v-model="dialogData.fullName" 
                    :rules="fullName"
                    label="ФИО*" 
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="dialogData.position"
                    :rules="position"
                    label="Должность*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="dialogData.salary"
                    :rules="salary"
                    label="Оклад*"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-row justify="center">
                    <v-date-picker v-model="dialogData.dateOfBirth"></v-date-picker>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="hideDialogHandler">Close</v-btn>
          <v-btn color="blue darken-1" text :disabled="!valid" @click="hideDialogHandler">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      valid: true,
      picker: new Date().toISOString().substr(0, 10),
      fullName: [
        v => !!v || 'ФИО обязательное поле',
        v => /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(v) || 'Только буквы',
      ],
      position: [
        v => !!v || 'Позиция обязательное поле',
        v => /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(v) || 'Только буквы',
      ],
      salary: [
        v => /^[0-9]+$/.test(v) || 'Только цифры',
      ]
    }),

    computed: {
      dialogIsVisible() {
        return this.$store.getters.dialogIsVisible
      },
      ...mapGetters(['dialogData'])
    },

    methods: {
      ...mapMutations(['hideDialog']),
      hideDialogHandler() {
        this.reset()
        this.hideDialog()
      },
      validate() {
        return this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
    }
  }
</script>