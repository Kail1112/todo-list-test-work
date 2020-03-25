/*
* getCookie - функция получение cookie
* */
const getCookie = (name, from = document.cookie) => {
  let matches = from.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/*
* setCookie - функция добавление в cookie
* */
const setCookie = (name, value, options = {}) =>{
  options = {
    path: '/',
    ...options
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

/*
* deleteCookie - функция удаление из cookie
* */
const deleteCookie = (name) => {
  setCookie(name, "", {
    'max-age': -1
  })
}

export {getCookie, setCookie, deleteCookie};
