/*
* Функция получения актуального списка заметок
* */

import {getCookie} from "./cookie";

/**
 * @return {object}
 * */

const getNotes = () => {
  let maxId = 0 /// для контроля id
  const cookie = getCookie('todoListTestWork-notes')
  if (cookie !== undefined) {
    const result = JSON.parse(cookie)
    let hash = result.reduce((acc, item, index) => {
      acc[item.id] = index
      if (item.id * 1 > maxId) maxId = item.id * 1
      return acc
    }, {})
    hash['lastId'] = maxId
    return {result, hash}
  } else return {result: [], hash: {lastId: 0}}
};

export default getNotes
