<template>
  
  <Nav />
  <NewTask />

</template>

<script setup>
import { supabase } from '../supabase';
// import { useRouter } from 'vue-router';
// import router from '../router';
import { useUserStore } from '../store/user';
import NewTask from "../components/NewTask.vue"
import Nav from "../components/Nav.vue" 


// const user = useUserStore();
// const logout = async () => {
//     await user.signOut();
//     router.push({
//         path:'/auth',
//     });
// }
</script>

<style>

</style>