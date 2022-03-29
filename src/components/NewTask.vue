<template>

<div>
<h3>Fuck List</h3>

<form class="mx-auto my-20 p-5 rounded-md bg-gray-100 shadow-lg w-3/4 justify-center flex flex-col items-center gap-y-5" action="" >
   <div class="flex flex-col sm:flex-row justify-center items-center my-5 gap-10 w-full"></div>
   <label class="font-mono text-xl" for="name">New Todo</label>
   <input
      class="w-300px h-8 border border-gray-special/50 rounded p-2"
      v-model="newTodo"
    />
<button class="block w-full btn-template bg-blue-500 sm:inline sm:w-32 hover:bg-blue-600"
        @click.prevent="addTodo">Add Task</button> 
  </form>

 <!-- <p v-if="newTodo.length < 4"  class="font-mono text-red-600 font-bold ml-10">
      {{ newTodoErr }} </p> -->

  <div class="flex flex-col sm:flex-row gap-5 items-center justify-center my-10">
    <section v-for="(todo, i) in datosTask" :key="'todo' + i">
      <div>
        <span>{{ todo.title }}</span>
      </div>
    </section>

  </div>

  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { ref, computed } from 'vue';
import { supabase } from "../supabase";

const newTodo =ref("");
const todos = ([]);
const errorMsg = ref ("");
const taskStore = useTaskStore();
// const newTodoErr = ref("Please, write a word with more than three characters");

let datosTask = ref([]);

async function fetchAllTask(){
    const thisTask = await taskStore.fetchTasks();
    datosTask.value = thisTask;

}
     fetchAllTask();


async function addTodo(){
    
    await taskStore.addTask(newTodo.value);
    await fetchAllTask();
    newTodo.value = "";
}
</script>

<style>
</style>