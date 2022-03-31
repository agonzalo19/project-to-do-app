<template>

<div class="justify-center flex flex-col ">
<h3 class="text-2xl text-at-light-green">Fuck List</h3>

<!-- New task -->

<form class="mx-auto my-20 p-10 rounded-md bg-gray-100 shadow-lg justify-center flex flex-row items-center gap-y-5 space-x-20" action="" >

   <label class="text-2xl text-at-light-green" for="name">New Task</label>
   <input
      class="py-2 px-5 text-gray-500 focus:outline-none rounded-sm"
      v-model="newTodo"
      v-on:keyup.enter="addTodo"
      placeholder="Put your fuck task"/>
    <button
    class=" flex py-2 px-10 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green items-center"
    type="text"
    @click.prevent="addTodo">Add Task</button> 


 <!-- FALTA LLAMAR AL ERROR <p v-if="newTodo.length < 4"  class="font-mono text-red-600 font-bold ml-10">
      {{ newTodoErr }} </p> -->
</form>

<div class="p-30 my-5 p-5 mx-auto space-x-20 flex flex-row sm:flex-row items-center justify-center rounded-md bg-at-light-green text-white shadow-lg "
v-for="(todo, i) in datosTask" :key="'todo' + i"
>

          <span :class="{completed: todo.is_complete}" class="text-center sm:w-1/2 mb-1 text-xl text-white">{{ todo.title }} </span>
         
            <!-- Edit button -->
          <div class="flex flex-row items-center gap-y-5 space-x-20">
          <div>
            <button class="" @click="changeState">Edit📝</button>
            <input v-if="isEditing" v-model= "todo.title"/>
          </div>

          <button @click="saveEdit(todo)">Save</button>
          
            <!-- Delete button -->
          <button @click="removeTodo(todo)">Delete🗑️</button>
          
             <!-- Complate button -->
          <button @click="completedTask(todo)">Completado</button>
          </div>


    </div>

  </div>

</template>

<script setup>
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { ref, computed } from 'vue';
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

const newTodo =ref("");
const todos = ([]);
const errorMsg = ref ("");
let datosTask = ref([]);

const taskStore = useTaskStore();
const user = useUserStore();
const router = useRoute();

const isEditing = ref(false);
const editingId = ref('');

const isCompleted = ref(false)
// const newTodoErr = ref("Please, write a word with more than three characters");



async function fetchAllTask(){
    const thisTask = await taskStore.fetchTasks();
    datosTask.value = thisTask;

}
     fetchAllTask();

// Add Task

async function addTodo(){
    
    await taskStore.addTask(newTodo.value);
    await fetchAllTask();
    console.log("hola");
    newTodo.value = "";
}

// Change State
async function changeState() {
  isEditing.value = true;
}

// Edit Task
async function saveEdit(item){
  await taskStore.editTask(item.title, item.id)
  isEditing.value = false;
  await fetchAllTask()
}

// Remove Task
async function removeTodo(task) {
  await taskStore.removeTodo(task.id);
  await fetchAllTask()
}

//Complate Task
async function completedTask(todo) {
  const indexId = todo.id
  todo.is_complete = !todo.is_complete
  await taskStore.isComplete(indexId, todo.is_complete);
  await fetchAllTask()
}

</script>

<style>
</style>