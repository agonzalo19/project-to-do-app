<template>
<div>
<form @submit.prevent="addTask" >
    <h3>que te pillao</h3>
   <input
      class="w-300px h-8 border border-gray-special/50 rounded p-2"
      v-model="newTask"
    />
<button @click="createTask">Add Task</button> 
  </form>
    <!-- <span>{{ newTask }}</span>  -->
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { ref, computed } from 'vue';
import { supabase } from "../supabase";
// // import TaskItemVue from "./TaskItem.vue";
// // import router from "../router";
// import { useRouter } from "vue-router";

const newTask =ref("");
const myTasks = ([]);
const errorMsg = ref ("");
const storeTasks = useTaskStore();
// const router = useRouter()
//const user = useUserStore()
let datosTask = ref([]);


async function fetchAllTask(){
    const thisTask = await storeTasks.fetchTasks();
    console.log(myTasks);
    datosTask.value = thisTask;
}
 fetchAllTask();

async function createTask(){
    
    await storeTasks.addTask(newTask.value);
    
    await fetchAllTask();
    newTask.value = "";
}

</script>

<style>

</style>