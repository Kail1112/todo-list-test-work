<template>
  <li>
    <div class="row">
      <div class="col-lg-8">
        <slot name="input"/>
      </div>
      <div class="col-lg-2">
        <label>
          <input type="checkbox" :checked="checked" @change="changeChecked">
          <span>Завершено</span>
        </label>
      </div>
      <div class="col-lg-2">
        <button class="btn full error" @click="deleteElement">Удалить</button>
      </div>
    </div>
  </li>
</template>

<script>
  /*
  * Шаблон элемента дела
  * */
  export default {
    name: "NoteAddItem",
    props: {
      indexElement: [Number, null],
      checked: [Boolean, null],
      funcChangeChecked: [Function, null],
      funcDeleteElement: [Function, null]
    },
    methods: {
      /// changeChecked - изменение активности
      changeChecked (e) {
        this.$props.funcChangeChecked(this.indexElement, e.target.checked)
      },
      /// deleteElement - удаление заметки
      deleteElement () {
        this.$props.funcDeleteElement(this.indexElement)
      }
    }
  }
</script>
