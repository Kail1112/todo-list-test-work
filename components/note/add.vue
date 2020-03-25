<template>
  <form class="note-add" @submit="stopSubmit">
    <div class="row">
      <div class="col-12">
        <label class="label-input">
          <span class="label-input__signature">Заголовок заметки</span>
          <input class="input full" type="text" placeholder="Заголовок заметки" v-model="title">
        </label>
      </div>
      <div class="col-12">
        <div class="note-add-list__top">
          <h4>Список дел:</h4>
        </div>
        <div class="note-add-list">
          <ul v-if="Array.isArray(values) && values.length > 0">
            <NoteAddItem
              v-for="(todo, index) in values"
              :key="`todo-${index}`"
              v-bind:indexElement="index"
              v-bind:checked="todo.checked"
              v-bind:funcChangeChecked="changeCheckedTodo"
              v-bind:funcDeleteElement="deleteTodo"
            >
              <template v-slot:input>
                <input type="text" v-model="todo.text" class="input full" placeholder="Пункт">
              </template>
            </NoteAddItem>
          </ul>
          <button v-else class="btn" @click="add">Добавить пункт</button>
        </div>
        <div class="note-add-list__bottom" v-if="Array.isArray(values) && values.length > 0">
          <div class="row">
            <div class="col-auto">
              <button class="btn" @click="add">Добавить пункт</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-auto">
            <button class="btn" @click="addNewNote">Добавить</button>
          </div>
          <div class="col-auto">
            <button class="btn error" @click="cancelEdit">Отменить</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  /*
  * Форма добавления новой заметки
  * */
  import NoteAddItem from './add.item'; /// Шаблон элемента дела
  export default {
    name: "NoteAdd",
    data () {
      return {
        title: 'Новая заметка',
        values: []
      }
    },
    props: {
      funcChangeAdded: [Function, null]
    },
    methods: {
      /// stopSubmit - остановка нативного события
      stopSubmit (e) {
        e.preventDefault()
      },
      /// add - метод добавления новой заметки
      add () {
        this.values.push({text: '', checked: false})
      },
      /// changeCheckedTodo - изменение активности дела
      changeCheckedTodo (indexElement, newChecked) {
        this.values[indexElement].checked = newChecked
      },
      /// deleteTodo - удаление заметки
      deleteTodo (indexElement) {
        this.values = [...this.values.slice(0, (indexElement * 1)), ...this.values.slice((indexElement * 1) + 1)]
      },
      /// addNewNote - добавление новой заметки
      addNewNote () {
        this.$root.$store.dispatch('addNote', {title: this.title, values: this.values})
        this.cancelEdit()
      },
      /// cancelEdit - отмена
      cancelEdit () {
        this.title = 'Новая заметка'
        this.values = []
        this.$props.funcChangeAdded()
      }
    },
    components: {
      NoteAddItem
    }
  }
</script>
