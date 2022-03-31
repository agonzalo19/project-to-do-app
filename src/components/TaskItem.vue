<template>
  <!-- TaskItem -->

  <div
    class="mx-auto my-20 p-10 rounded-md bg-gray-100 shadow-lg justify-center flex flex-row items-center gap-y-5 space-x-20"
  >
    <div v-if="editDialog"><input v-model="editTask" type="text" /></div>
    <div v-else>
      <span class="text-center sm:w-1/2 mb-1 text-xl text-at-light-green">
        Task: {{ item.title }}
      </span>
    </div>
    <!-- Que mostrar cuendo la tarea is complete
  <div v-if="item.is_complete">Done</div> -->

    <div class="flex flex-row items-center gap-y-5 space-x-20">
      <!-- ToggleEdit button -->
      <button
        class="grayscale text-gren-light hover:grayscale-0"
        @click="toggleEdit()"
      >
        Edit ✏️
      </button>
      <div v-if="editDialog">
        <button @click.prevent="edit()">Save</button>
        <p>{{ errorInput }}</p>
      </div>

      <!-- SaveEdit button 
    <button @click=""> Save</button>
          
 Delete button 
     <button class="lex-no-shrink p-2 ml-2 rounded text-red hover:text-white hover:bg-red" @click="">Delete 🗑️</button>
          
  Complate button 
    <button class= "grayscale hover:grayscale-0" @click=""> Done ✅</button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

//Edit variables

let editTask = ref(""); // Edit dialog
let editDialog = ref(false); // State of edit input

let currentIndex = ref(""); // Lo uso?
let taskDone = true; //Toggles boolean

//Error variables
let empty = ref(false); // empty for editing a task
let errorInput = ref(""); // error message variable

//IMPORTANT! Define children Functionos

const emit = defineEmits(["childEmit"]);

// IMPORTANT! Set up the content of the template as an array prop to be used on the parent
const props = defineProps(["item"]);

// Edit Dialog
function toggleEdit() {
  editDialog.value = !editDialog.value;
  editTask.value = props.item.title;
}

// Error functions
function errorHandle() {
  errorInput.value = "Task field edit connot be fucking empty";
  empty.value = true;
}

// Edit function

function edit() {
  if (editTask.value === "") errorHandle();
  else {
    empty.value = false;
    editDialog = false; // que quiere decir que se muestra
    const editValues = {
      oldValue: props.item,
      newValue: editTask.value,
    };
    emit("childEmit", editValues);
    editTask.value = "";
  }
}
</script>

<style></style>
