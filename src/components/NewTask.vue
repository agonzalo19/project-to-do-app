<template>
  <div class="bg-midium-grey justify-center flex flex-col">
    <!-- <h3 class="text-2xl text-at-light-green">Fuck List</h3> -->

    <!-- New task -->

    <form
      class="mx-auto my-10 p-10 rounded-md bg-white shadow-lg justify-center flex flex-row items-center gap-y-5 space-x-10"
      action=""
    >
      <!-- <label class="text-2xl text-at-light-green" for="name">New Task</label> -->
      <input
        class="pl-4 px-10 py-4 pr-30 rounded-sm border-solid border-2 border-pink bg-white hover:bg-grey focus:border-pink border-2 text-purple"
        v-model="newTodo"
        placeholder="+ Add your pending task"
      />
      <button
        class="flex px-4 py-4 rounded-sm text-white bg-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green items-center"
        type="text"
        @click.prevent="addTodo"
      >
        Add Task
      </button>
      <p v-if="emptyNew" class="font-mono text-red-600 font-bold ml-10">
        {{ errorInput }}
      </p>
      <!-- FALTA LLAMAR AL ERROR <p v-if="newTodo.length < 4"  class="font-mono text-red-600 font-bold ml-10">
      {{ newTodoErr }} </p> -->
    </form>

    <!-- TaskItem > insert import Child functions -->

    <TaskItem
      v-for="(todo, index) in datosTask"
      :key="todo.id"
      :item="todo"
      @childEdit="saveEdit"
      @childRemove="remove"
      @childToggle="toggleTask"
    />

    <blockquote
      class="text-2xl p-10 font-semibold italic text-center text-slate-900"
    >
      Don't stress, your
      <span
        class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink relative inline-block"
      >
        <span class="relative text-white">fucking to-do list </span>
      </span>
      can wait for you.
    </blockquote>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";

import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";

import { useRoute } from "vue-router";

import TaskItem from "./TaskItem.vue";

//To register in supabase

const newTodo = ref("");
const todos = []; // No se usa ?
let datosTask = ref([]); // Nuevo array

const storeTasks = useTaskStore();
const user = useUserStore();
const router = useRoute();

let emptyNew = ref(false); // error box initially hidden
let errorInput = ref(""); // error message variable

// Function to  fetch task from Supabase using Pinia
async function fetchAllTasks() {
  const thisTask = await useTaskStore().fetchTasks();
  datosTask.value = thisTask;
}
fetchAllTasks();

// Add Task

async function addTodo() {
  if (newTodo.value === "") {
    emptyNew.value = true; // shows error
    errorInput.value = "New Todo field cannot be empty";
    setTimeout(() => {
      emptyNew.value = false; // hides error
    }, 3000);
  } else {
    emptyNew.value = false;
    await useTaskStore().addTask(newTodo.value);
    await fetchAllTasks();
    newTodo.value = "";
  }
}

// Edit Task

async function saveEdit(item) {
  const newTaskTitle = item.newValue;
  const editId = item.oldValue.id;
  await useTaskStore().editTask(newTaskTitle, editId);
  fetchAllTasks();
}

// Function to remove currentTask
async function remove(item) {
  await useTaskStore().removeTask(item.id);
  fetchAllTasks();
}

//Complete Tasks between done & undone [true or false]
async function toggleTask(item) {
  const toggleComplete = !item.is_complete;
  const toggleId = item.id;
  await useTaskStore().isComplete(toggleComplete, toggleId);
  fetchAllTasks();
}
</script>

<style></style>
