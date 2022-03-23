<template>
  <form @submit.prevent="addTodo">
    <input
      class="w-300px h-8 border border-gray-special/50 rounded p-2"
      v-model="newTodo"
    />
    <button id="button_one" class="text-white rounded w-32 p-1 mb-5 font-bold">
      Add Task
    </button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input class="mr-2 p-5" type="checkbox" v-model="todo.done" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button class="ml-2" @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button
    class="bg-white w-48 h-10 mt-5 rounded font-bold"
    id="button_two"
    @click="hideCompleted = !hideCompleted"
  >
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button>
</template>
<script setup>
import { ref, computed } from "vue";
let id = 0;
const newTodo = ref("");
const hideCompleted = ref(false);
const todos = ref([{ id: id++, text: "", done: true }]);
const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});
function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false });
  newTodo.value = "";
}
function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
#button_one {
  background-color: rgb(226, 43, 195);
  margin-left: 10px;
}
#button_two {
  color: rgb(226, 43, 195);
  border: solid rgb(226, 43, 195) 2px;
}
</style>