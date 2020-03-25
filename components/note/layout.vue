<template>
  <div class="note">
    <div class="note-top">
      <h2>{{title}}</h2>
    </div>
    <div class="note-middle">
      <!-- Список дел -->
      <TodoList v-if="Array.isArray(todoList) && todoList.length > 0" v-bind:todo="todoList"/>
      <!-- Список дел - END -->
    </div>
    <div class="note-bottom">
      <div class="row">
        <div class="col-sm-6 col-12">
          <router-link class="btn full" :to="{ path: `/${id}`}" v-text="'Изменить заметку'"/>
        </div>
        <div class="col-sm-6 col-12">
          <button class="btn full error" @click="confirmDeleteNote">Удалить заметку</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoList from '../todo/layout'; /// Разметка списка дел
  import deleteNotes from "../../service/deleteNotes"; /// Функция удаления заметки
  import generateModal from "../../service/generateModal"; /// Функция генерации модального окна
  export default {
    name: "NoteLayout",
    props: {
      id: [String, Number, null],
      title: [String, null],
      todo: [Array, null]
    },
    computed: {
      todoList () {
        const {$props: props} = this
        return [...props.todo.slice(0, 4)]
      }
    },
    methods: {
      /// confirmDeleteNote - нужно ли удалить
      confirmDeleteNote () {
        generateModal(`Удалить заметку ${this.title}?`, () => {
          this.deleteNote()
        })
      },
      /// deleteNote - метод удаления заметки
      deleteNote () {
        deleteNotes(this.$props.id, (notes, hash) => {
          this.$root.$store.dispatch('setStates', {result: notes, hash})
        })
      }
    },
    components: {
      TodoList
    },
  }
</script>
