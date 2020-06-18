<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Сотрудники</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Создать</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
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
                        v-model="editedItem.fullName" 
                        :rules="fullName"
                        label="ФИО*" 
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.position"
                        :rules="position"
                        label="Должность*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.salary"
                        :rules="salary"
                        label="Оклад*"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-row justify="center">
                        <v-date-picker v-model="editedItem.dateOfBirth"></v-date-picker>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save" :disabled="!valid">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
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
      ],

      dialog: false,
      headers: [
        {
          text: 'ФИО',
          align: 'start',
          sortable: false,
          value: 'fullName',
        },
        { text: 'Дата рождения', value: 'dateOfBirth' },
        { text: 'Должность', value: 'position' },
        { text: 'Оклад', value: 'salary' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        fullName: '',
        position: '',
        salary: '',
        dateOfBirth: new Date().toISOString().substr(0, 10)
      },
      defaultItem: {
        fullName: '',
        position: '',
        salary: '',
        dateOfBirth: new Date().toISOString().substr(0, 10)
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Создание сотрудника' : 'Редактирование сотрудника'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            fullName: 'Saijo Masataka',
            position: 'Frontend',
            salary: '1000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Фыв йцвфыв',
            position: 'Frontend',
            salary: '1000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'авпвап ваыа',
            position: 'Backend',
            salary: '1500',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Saijo Masataka',
            position: 'Python',
            salary: '2000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Фыв йцвфыв',
            position: 'Frontend',
            salary: '1000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'авпвап ваыа',
            position: 'Backend',
            salary: '1500',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Saijo Masataka',
            position: 'Python',
            salary: '2000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Фыв йцвфыв',
            position: 'Frontend',
            salary: '1000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'авпвап ваыа',
            position: 'Backend',
            salary: '1500',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Saijo Masataka',
            position: 'Python',
            salary: '2000',
            dateOfBirth: '1900-01-19'
          },
          {
            fullName: 'Saijo Masataka',
            position: 'Python',
            salary: '2000',
            dateOfBirth: '1900-01-19'
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          console.log('Edited item')
        } else {
          this.desserts.push(this.editedItem)
          console.log('Created item')
        }
        this.close()
      },
    },
  }
</script>