<template>
  <div class="container">
    <div class="row" v-if="note !== undefined && note !== null">
      <div class="col-12">
        <div class="title-page">
          <router-link class="go-back btn" :to="{ path: '/'}" v-text="'Назад'"/>
          <h1 v-if="note['title'] !== undefined && note['title'] !== null">Изменение заметки - {{note.title}}</h1>
        </div>
      </div>
      <div class="col-12">
        <div class="note-add-list__top">
          <h4>Список дел:</h4>
        </div>
        <div class="note-add-list">
          <ul v-if="Array.isArray(note.values) && note.values.length > 0">
            <NoteAddItem v-for="(todo, index) in note.values"
                         :key="`todoItem-${index}`"
                         v-bind:indexElement="index"
                         v-bind:checked="todo.checked"
                         v-bind:funcChangeChecked="changeTodoChecked"
                         v-bind:funcDeleteElement="deleteTodo">
              <template v-slot:input>
                <input type="text" v-model="todo.text" class="input full" placeholder="Пункт">
              </template>
            </NoteAddItem>
          </ul>
          <button v-else class="btn" @click="addNewTodo">Добавить пункт</button>
        </div>
        <div class="note-add-list__bottom" v-if="Array.isArray(note.values) && note.values.length > 0">
          <div class="row">
            <div class="col-auto">
              <button class="btn" @click="addNewTodo">Добавить пункт</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-auto">
            <button class="btn" @click="saveNote">сохранить изменения</button>
          </div>
          <div class="col-auto">
            <router-link class="btn error" :to="{ path: '/'}" v-text="'отменить редактирование'"/>
          </div>
          <div class="col-auto">
            <button class="btn error" @click="deleteNoteConfirm">удалить</button>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="note['prevState'] !== undefined || step === -1">
        <div class="row">
          <div class="col-auto" v-if="note['prevState'] !== undefined && step === 0">
            <button class="btn error" @click="goPrevState">отменить внесенное изменение</button>
          </div>
          <div class="col-auto" v-if="note['prevState'] === undefined && step === -1">
            <button class="btn" @click="goNextState">повторить отмененное изменение</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getNotes from "../../service/getNotes"; /// Функция получения актуального списка заметок
  import updateNotes from "../../service/updateNotes"; /// Функция изменения записей
  import NoteAddItem from "../../components/note/add.item";
  import generateModal from "../../service/generateModal"; /// Функция генерации модального окна
  import deleteNotes from "../../service/deleteNotes"; /// Функция удаления заметки
  export default {
    name: "index",
    data () {
      return {
        note: null,
        noteOld: null,
        allNotes: null,
        step: 0
      }
    },
    mounted () {
      const getInfo = async () => {
        const notes = await getNotes()
        if (this.allNotes === null) this.allNotes = notes
        this.$root.$store.dispatch('setStates', notes)
        const getNote = this.$root.$store.getters.GET_NOTE(this.$root.$route.params.ID_NOTE)
        this.note = Object.entries(getNote).reduce((acc, item) => {
          const [index, val] = item
          acc[index] = Array.isArray(val) ? val.reduce((acc, item) => {acc.push({text: item.text, checked: item.checked}); return acc}, []) : val
          return acc
        }, {})
        this.noteOld = Object.entries(getNote).reduce((acc, item) => {
          const [index, val] = item
          acc[index] = Array.isArray(val) ? val.reduce((acc, item) => {acc.push({text: item.text, checked: item.checked}); return acc}, []) : val
          return acc
        }, {})
      }
      getInfo()
    },
    methods: {
      /// addNewTodo - добавление новой заметки
      addNewTodo () {
        this.note.values.push({text: '', checked: false})
      },
      /// changeTodoChecked - измненение активности дела
      changeTodoChecked (indexElement, newChecked) {
        this.note.values[indexElement].checked = newChecked
      },
      /// deleteTodo - удаление дела
      deleteTodo (indexElement) {
        this.note.values = [...this.note.values.slice(0, (indexElement * 1)), ...this.note.values.slice((indexElement * 1) + 1)]
      },
      /// saveNote - сохранение заметки
      saveNote () {
        const oldString = JSON.stringify(this.noteOld)
        const newString = JSON.stringify(this.note)
        if (oldString !== newString) {
          const idNote = this.$root.$route.params.ID_NOTE
          let linkToAllNotes =  this.allNotes.hash[idNote] === undefined
                                ?
                                (
                                  this.allNotes.hash[idNote * 1] === undefined
                                  ?
                                  false
                                  :
                                  this.allNotes.hash[idNote * 1]
                                )
                                :
                                this.allNotes.hash[idNote * 1]
          if (linkToAllNotes !== false) {
            this.allNotes.result[linkToAllNotes]['prevState'] = Object.entries(this.noteOld).reduce((acc, item) => {
              const [index, val] = item
              if (index !== 'prevState' && index !== 'nowState') acc[index] = val
              return acc
            }, {})
            this.allNotes.result[linkToAllNotes]['nowState'] = Object.entries(this.note).reduce((acc, item) => {
              const [index, val] = item
              if (index !== 'prevState' && index !== 'nowState') acc[index] = val
              return acc
            }, {})
            this.allNotes.result[linkToAllNotes]['title'] = this.note.title
            this.allNotes.result[linkToAllNotes]['values'] = this.note.values
          }
          updateNotes(this.allNotes.result)
          this.note = Object.entries(this.note).reduce((acc, item) => {
            const [index, val] = item
            acc[index] = Array.isArray(val) ? val.reduce((acc, item) => {acc.push({text: item.text, checked: item.checked}); return acc}, []) : val
            return acc
          }, {})
          this.noteOld = Object.entries(this.note).reduce((acc, item) => {
            const [index, val] = item
            acc[index] = Array.isArray(val) ? val.reduce((acc, item) => {acc.push({text: item.text, checked: item.checked}); return acc}, []) : val
            return acc
          }, {})
        }
      },
      /// goPrevState - отменить внесенное изменение
      goPrevState () {
        this.noteOld = Object.entries(this.note).reduce((acc, item) => {
          const [index, val] = item
          acc[index] = val
          return acc
        }, {})
        this.note = this.note.prevState
        this.step = -1
      },
      /// goNextState - повторить отмененное изменение
      goNextState () {
        this.note = this.noteOld
        this.noteOld = this.note.prevState
        this.step = 0
      },
      /// deleteNoteConfirm - удаление заметки ( генерация модалки )
      deleteNoteConfirm () {
        generateModal(`Удалить заметку ${this.note.title}?`, () => {
          this.deleteNote()
        })
      },
      /// deleteNote - удаление заметки
      deleteNote () {
        deleteNotes(this.note.id)
        this.$root.$router.push({ path: '/' })
      },
    },
    beforeRouteLeave (to, from, next) {
      const oldString = JSON.stringify(this.noteOld)
      const newString = JSON.stringify(this.note)
      if (oldString !== newString) {
          generateModal('Вы хотите уйти? У вас есть несохранённые изменения!', () => {
            this.saveNote()
            next()
          }, () => next(), 'Сохранить', 'Не сохранить')
      } else {
        next()
      }
    },
    components: {
      NoteAddItem
    }
  }
</script>
