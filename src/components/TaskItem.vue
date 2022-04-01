<template>
  <!-- TaskItem -->

  <div
    class="container mx-auto my-10 p-5 justify-between rounded-md bg-white shadow-lg flex flex-row items-center gap-y-1 space-x-20"
  >
    <div v-if="editDialog">
      <input
        class="px-4 py-2 rounded-sm border-solid border-2 border-pink bg-white hover:bg-grey"
        v-model="editTask"
        type="text"
      />
    </div>

    <div v-else>
      <span class="truncate text-center sm:w-1/2 mb-1 text-xl text-purple">
        {{ item.title }}
      </span>
    </div>

    <div class="flex flex-row items-center space-x-20">
      <!-- ToggleEdit button -->
      <button
        v-if="!editDialog"
        id="editButton"
        class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-pink"
        @click="toggleEdit()"
      >
        Edit ✏️
      </button>

      <!-- Save Edit button -->

      <div v-if="editDialog">
        <button
          class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-pink"
          @click.prevent="edit()"
        >
          Save the queen!
        </button>
        <p>{{ errorInput }}</p>
      </div>

      <!-- Delete button  -->
      <button
        v-if="!editDialog"
        class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-red"
        @click="remove()"
      >
        Delete 🗑️
      </button>
      <div v-if="!item.is_complete">
        <button
          v-if="!editDialog"
          class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-at-light-green"
          @click="toggleTask()"
        >
          Done!
        </button>
      </div>
      <div v-if="item.is_complete">✅</div>
      <div v-if="!item.is_complete" class="grayscale">✅</div>
      <div v-if="item.is_complete">
        <button
          v-if="!editDialog"
          class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-at-light-green"
          @click="toggleTask()"
        >
          Undone
        </button>
      </div>
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

const emit = defineEmits(["childEdit", "childRemove", "childToggle"]);

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
    editDialog.value = false; // que quiere decir que se muestra
    const editValues = {
      oldValue: props.item,
      newValue: editTask.value,
    };
    emit("childEdit", editValues);
    editDialog.value = false;
  }
}

//Function to remove items

function remove() {
  emit("childRemove", props.item);
}

// Toggle Done & Undone
function toggleTask() {
  emit("childToggle", props.item);
}
</script>

<style></style>
