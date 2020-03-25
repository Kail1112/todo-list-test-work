import updateNotes from "../service/updateNotes"; /// Функция изменения записей
import getNotes from "../service/getNotes"; /// Функция получения актуального списка заметок

export default {
  /// setStates - установка состояний
  setStates (state, params) {
    const {result, hash} = params
    state.notes = result
    state.hashNotes = hash
  },
  /// updateNotes - изменение заметки
  updateNotes (state, params) {
    /*
    * 1. action - действие ( добавление, удаление или изменение )
    * 2. idNote - id записи
    * 4. value - занчения
    * */
    const {action, idNote, value} = params
    const {notes, hashNotes} = state
    switch (action) {
      case 'delete': {
        const indexFromMain = hashNotes[idNote]
        state.notes = [...notes.slice(0, indexFromMain), ...notes.slice(indexFromMain + 1)]
      } break;
      case 'update': {
        /// Добавление нового пункта
        const indexFromMain = hashNotes[idNote]
        state.notes[indexFromMain].values = value
      } break;
    }
  },
  /// addNote - добавление новой заметки
  addNote (state, params) {
    const {hashNotes} = state
    const newId = hashNotes.lastId + 1
    state.hashNotes.lastId = newId
    const {title, values} = params
    const template = { title, id: newId, values }
    state.notes.unshift(template)
    updateNotes(state.notes)
  },
}
