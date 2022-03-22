// Añadir + signIn + signOut + titulo 

<template>
<div>
    <h1>Welcome to the Vue Task App</h1>
<div>
  <SingIn v-if="component"/>
  <SingUp v-else/>
</div>
</div>
<div class="button-singup">
    <button @click="changeComponent" v-if="component">Click to Sing Up</button>
    <button @click="changeComponent" v-else="component">Click to Sing In</button>
</div>
</template>

<script setup>
import { ref } from "vue";
import SingIn from "../components/SignIn.vue"
import SingUp from "../components/SignUp.vue"
import router from "../router";

const component = ref(true);

function changeComponent(){
    component.value = !component.value;
}
</script>

<style>

</style>