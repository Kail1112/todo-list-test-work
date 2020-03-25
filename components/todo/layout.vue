<template>
  <ul class="todo">
    <li v-for="(item, index) in todo"
        :key="`todo-item-${index}`"
        :class="item.checked | checkedClass">
      {{index}}). {{item.text}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "TodoList",
    props: {
      idParent: [String, Number, null],
      todo: [Array, null]
    },
    filters: {
      checkedClass: checked => checked ? 'todo-item checked' : 'todo-item'
    }
  }
</script>
