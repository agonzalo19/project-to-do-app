<template>

<div>
<h3>Fuck List</h3>

<form class="mx-auto my-20 p-5 rounded-md bg-gray-100 shadow-lg w-3/4 justify-center flex flex-col items-center gap-y-5" action="" >
   <div class="flex flex-col sm:flex-row justify-center items-center my-5 gap-10 w-full"></div>
   <label class="font-mono text-xl" for="name">New Task</label>
   
   <!-- New task -->

   <input
      class="w-300px h-8 border border-gray-special/50 rounded p-2"
      v-model="newTodo"
      placeholder="Put your fuck task"/>
    <button class="block w-full btn-template bg-green-500 sm:inline sm:w-32 hover:bg-green-600" @click.prevent="addTodo">Add Task</button> 
  </form>

 <!-- FALTA LLAMAR AL ERROR <p v-if="newTodo.length < 4"  class="font-mono text-red-600 font-bold ml-10">
      {{ newTodoErr }} </p> -->

  <div class="flex flex-col sm:flex-row gap-5 items-center justify-center my-10">
    
    <div v-for="(todo, i) in datosTask" :key="'todo' + i">
          <span :class="{completed: todo.is_complete}">{{ todo.title }}</span>
          <div>

            <!-- Edit button -->
          <div>
            <button @click="changeState">📝</button>
            <input v-if="isEditing" v-model= "todo.title"/>
            <button @click="saveEdit">Save</button>
            </div>
          
          <button @click="removeTodo(todo)">🗑️</button>
          
           
          <button ></button>
          </div>
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


// async function editTodo(i) {
//     isEditing.value = true;
//     editingId.value = datosTask.value[i].id;
//     newTodo.value = datosTask.value[i].title; 
// }



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