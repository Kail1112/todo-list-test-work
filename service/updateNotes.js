/*
* Функция изменения записей
* */

import {setCookie} from "./cookie";

/**
 * @param {object} state
 * @return void
 * */

const updateNotes = (notes) => {
  setCookie('todoListTestWork-notes', JSON.stringify(notes))
}

export default updateNotes
