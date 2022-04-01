<template>
  <!-- TaskItem -->

  <div
    class="mx-auto my-10 p-5 rounded-md bg-gray-100 shadow-lg flex flex-row items-center gap-y-1 space-x-20"
  >
    <div v-if="editDialog">
      <input class="" v-model="editTask" type="text" />
    </div>

    <div v-else>
      <span class="text-center sm:w-1/2 mb-1 text-xl text-purple">
        {{ item.title }}
      </span>
    </div>
    <div v-if="item.is_complete">Done ✅</div>

    <div class="flex flex-row items-center space-x-20">
      <!-- ToggleEdit button -->
      <button
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
          Save
        </button>
        <p>{{ errorInput }}</p>
      </div>

      <!-- Delete button  -->
      <button
        class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-red"
        @click="remove()"
      >
        Delete 🗑️
      </button>
      <button
        class="lex-no-shrink p-2 ml-2 rounded hover:text-white hover:bg-at-light-green"
        @click="toggleTask()"
      >
        Fuck yeah
      </button>
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
