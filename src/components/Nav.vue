<template>
  <header class="bg-at-light-green text-white">
      <nav class="container py-5 px-4 flex flex-col gap-4items-center sm:flex-row">
          <div class="flex items-center gap-x-4">
         <img class="w-14" src="" alt="">
         <h1 class="text-lg">Fucking Tasks</h1>

         <ul class="flex flex-1 justify-end gap-x-10">
            <router-link class= "cursor-ponter" :to="'/home'" > Home </router-link>
            <router-link class= "cursor-ponter" :to="'/home'" > LogIn </router-link>
            <li class="cursor-ponter" @click="signOut">LogOut</li>
         </ul>
         </div>

      </nav>
  </header>

</template>

<script setup>
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import router from '../router';

const signOut = async () =>{
    await supabase.auth.signOut()
    router.push('/');
}

</script>

<style scoped>

</style>