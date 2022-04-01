<template>
  <header class="justify-between text-white">
    <nav
      class="flex justify-between items-center bg-gradient-to-r from-pink via-purple to-indigo text-white py-8 px-10"
    >
      <div class="flex items-center">
        <img class="" src="" alt="" />
        <!-- <h1 class="text-lg font-bold">Shitty Things To-do 💕</h1> -->
        <blockquote
          class="text-2xl p-10 font-semibold italic text-center text-slate-900"
        >
          <span
            class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue relative inline-block"
          >
            <h1 class="relative text-white">Shitty Things To-do 💕</h1>
          </span>
        </blockquote>
      </div>
      <div>
        <ul class="flex">
          <!-- <router-link class="cursor-ponter" :to="'/home'"> Home </router-link> -->
          <!-- <router-link class= "cursor-ponter" :to="'/auth'" > LogIn </router-link> -->
          <button class="cursor-ponter hover:text-pink" @click="logout">
            Bye Bye
          </button>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import router from "../router";
import { useUserStore } from "../store/user";

const user = useUserStore();

const logout = async () => {
  await user.signOut();
  router.push({
    path: "/auth",
  });
};
</script>

<style scoped></style>
