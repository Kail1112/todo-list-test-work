<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- Добавить новую заметку -->
        <NoteAdd v-if="added" v-bind:funcChangeAdded="changeAdded"/>
        <button v-else class="btn" @click="changeAdded">Добавить новую заметку</button>
        <!-- Добавить новую заметку - END -->
      </div>
      <div class="col-lg-6" v-for="(note, index) in notes" :key="`note-${index}-${note.id}`">
        <!-- Список заметок -->
        <NoteLayout
          v-bind:id="note.id"
          v-bind:title="note.title"
          v-bind:todo="note.values"
        />
        <!-- Список заметок - END -->
      </div>
    </div>
  </div>
</template>

<script>
  import NoteLayout from '../components/note/layout'; /// Разметка для заметки
  import NoteAdd from '../components/note/add'; /// Форма добавления новой заметки
  import getNotes from "../service/getNotes"; /// Функция получения актуального списка заметок
  export default {
    data () {
      return {
        added: false
      }
    },
    computed: {
      notes () {
        return this.$root.$store.getters.GET_NOTES
      }
    },
    methods: {
      // changeAdded - изменение состояния
      changeAdded () {
        this.added = !this.added
      }
    },
    components: {
      NoteLayout,
      NoteAdd
    },
    mounted () {
      this.$root.$store.dispatch('setStates', getNotes())
    }
  }
</script>
