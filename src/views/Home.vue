<template>
   <header class="bg-at-light-green text-white">
      <nav class="container py-5 px-4 flex flex-col gap-4items-center sm:flex-row">
          <div class="flex items-center gap-x-4">
         <img class="w-14" src="" alt="">
         <h1 class="text-lg">Fucking Tasks</h1>

         <ul class="flex flex-1 justify-end gap-x-10">
            <router-link class= "cursor-ponter" :to="'/home'" > Home </router-link>
            <!-- <router-link class= "cursor-ponter" :to="'/auth'" > LogIn </router-link> -->
            <button class="cursor-ponter" @click="logout">Log Out</button>
         </ul>
         </div>
      </nav>
  </header>
<TaskItem />
</template>

<script setup>
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import router from '../router';
import { useUserStore } from '../store/user';
import TaskItem from '../components/TaskItem.vue';

const user = useUserStore();

const logout = async () => {
    await user.signOut();
    router.push({
        path:'/auth',
    });
}
</script>

<style>

</style>