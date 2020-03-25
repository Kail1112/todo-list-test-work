export default {
  /// setStates - установка состояний
  setStates (context, params) {
    context.commit('setStates', params);
  },
  /// updateNotes - изменение заметки
  updateNotes (context, params) {
    context.commit('updateNotes', params);
  },
  /// addNote - добавление новой заметки
  addNote (context, params) {
    context.commit('addNote', params);
  },
}
