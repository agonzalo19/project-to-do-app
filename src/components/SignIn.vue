<template>
<div>
<section>
  <form form @submit.prevent="login">
  
  <div>
  <h3>Sing In</h3>
 
    <div>
    <label class="label">Email</label><br>
    <input id="email" type="email" name="email" required placeholder="Email" v-model="email"> <br>
    
    <label class="label">Password</label><br>
    <input id="password" name="password" type="password" required placeholder="Choose your password" v-model="password"><br>

    <div v-if="register" >
      <p>{{errorMsg}}</p>
    </div>

    <button type="submit">Sign In</button>
    
    </div>
  </div>
 
  </form>
</section>
</div>
</template>

<script setup>

import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();

const login = async () => {
  try{
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
      });
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.log("hola");
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  }


</script>

<style>

</style>