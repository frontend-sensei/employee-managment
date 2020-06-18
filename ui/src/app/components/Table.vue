<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    :search="search"
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
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
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
      <span>Сотрудники не найдены</span>
    </template>
  </v-data-table>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      search: '',
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
      formTitle() {
        return this.editedIndex === -1 ? 'Создание сотрудника' : 'Редактирование сотрудника'
      },
      ...mapGetters(['employees'])
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.fetchEmployees()
    },

    methods: {
      editItem(item) {
        this.editedIndex = this.employees.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        confirm('Вы уверены что хотите удалить этого сотрудника?') && this.deleteEmployee(item)
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save() {
        if (this.editedIndex > -1) {
          this.updateEmployee(this.editedItem)
        } else {
          this.createEmployee(this.editedItem)
        }
        this.close()
      },

      ...mapActions(['fetchEmployees', 'createEmployee', 'updateEmployee', 'deleteEmployee'])
    },
  }
</script>