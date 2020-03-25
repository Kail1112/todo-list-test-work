/*
* Функция генерации модального окна
* */

/**
 * @param {string} title
 * @param {function} successFunction
 * @param {function} cancelFunction
 * @param {string} successBtn
 * @param {string} cancelBtn
 * */

const generateModal = (title, successFunction, cancelFunction, successBtn = 'Удалить', cancelBtn = 'Отменить') => {
  let modal     = document.createElement('div');
  modal.className = 'modal openModal'
  modal.innerHTML = `
                      <div class="modal-container">
                        <div class="modal-head">
                          <p>${title}</p>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-6"><button class="modal-success-btn btn full error">${successBtn}</button></div>
                            <div class="col-6"><button class="modal-cancel-btn btn full modal-close-elements">${cancelBtn}</button></div>
                          </div>
                        </div>
                      </div>
                    `
  document.body.appendChild(modal);
  document.querySelector('.modal-success-btn').addEventListener('click', () => {
    successFunction()
    document.body.removeChild(modal);
  })
  document.querySelector('.modal-cancel-btn').addEventListener('click', () => {
    cancelFunction()
    document.body.removeChild(modal);
  })
  document.querySelectorAll('.modal-close-elements').forEach(item => {
    item.addEventListener('click', (e) => {
      document.body.removeChild(modal);
    })
  })
}

export default generateModal
