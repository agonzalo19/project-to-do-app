<template>
  <Nav />
  <NewTask />
  <Footer />
</template>

<script setup>
import { supabase } from "../supabase";
// import { useRouter } from 'vue-router';
// import router from '../router';
import { useUserStore } from "../store/user";
import NewTask from "../components/NewTask.vue";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
</script>

<style></style>
