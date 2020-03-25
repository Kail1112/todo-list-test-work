/*
* Функция удаления заметки
* */

import getNotes from "./getNotes"; /// Функция получения актуального списка заметок
import updateNotes from "./updateNotes"; /// Функция изменения записей

/**
 * @param {string|number} id
 * @param {function} callback
 * @return void
 * */

const deleteNotes = async (id, callback = (notes, hash) => {}) => {
  let maxId = 0
  const {result} = getNotes()
  let newValuesHash = {}
  const newValues = result.reduce((acc, note) => {
    if (note.id * 1 !== id * 1) {
      acc.push(note)
      newValuesHash[note.id] = acc.length - 1
      if (note.id * 1 > maxId) maxId = note.id * 1
    }
    return acc
  }, [])
  await updateNotes(newValues)
  callback(newValues, newValuesHash)
}

export default deleteNotes
