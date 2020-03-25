export default {
  /// GET_NOTES - получение всего списка заметок
  GET_NOTES: state => state.notes,
  /// GET_NOTE - получение информации о заметке
  GET_NOTE: state => (id) => {
    const note = state.hashNotes[id]
    const altNote = state.hashNotes[id * 1]
    return note === undefined ? ( altNote !== undefined ? state.notes[altNote] : null ) : state.notes[note]
  }
}
