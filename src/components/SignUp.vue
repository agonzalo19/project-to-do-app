<template>
<div>
<section class="max-w-screen-sm mx-auto">
  
  <form @submit.prevent="register"  class="mx-auto my-10 p-10 flex flex-col bg-gray-200 rounded-md shadow-lg">
  <h3 class="text-3xl mb-5">Sing Up</h3>
  
    <div class="flex flex-col mb-2">
    <label class="mb-1 text-lg text-green-500">Email</label><br>
    <input class="p-2 pl-12 text-gray-500 rounded bg-icon bg-email focus:outline-none" id="email" type="email" name="email" required placeholder="Email" v-model="email"> <br>
    
    <label class="mb-1 text-lg text-green-500">Password</label><br>
    <input class="p-2 pl-12 text-gray-500 rounded bg-icon bg-email focus:outline-none"  id="password" name="password" type="password" required placeholder="Choose your password" v-model="password"><br>
    
    <label for="ConfirmPassword" class="mb-1 text-lg text-green-500">Confirm password</label><br>
    <input class="p-2 pl-12 text-gray-500 rounded bg-icon bg-email focus:outline-none" id="confirmPassword" name="confirmPassword" type="password" required placeholder="Repeat your password" v-model="confirmPassword"><br>

    <div v-if="errorMsg" >
      <p>{{errorMsg}}</p>
    </div>

    <button class="block w-full sm:inline sm:w-36 font-mono mt-5 py-2 px-6 rounded self-start text-white font-bold bg-green-400 border-solid border-2 border-transparent hover:border-green-400 hover:bg-white hover:text-green-400" type="submit">Register</button>
  
    </div>
  </form>
  
 <p class="flex justify-center">Already have an account ? <RouteAuth 
  :route="route"
  :buttonText="buttonText"/></p>

</section>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
import RouteAuth from "../components/RouteAuth.vue"

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const router = useRouter();
const route = "/auth"
const buttonText = "Sign In"

const register = async () => {
  console.log(email.value)
  console.log(password.value)
  if (password.value === confirmPassword.value){
    try{
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push('/auth');
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  } else {
    errorMsg.value = "Error: Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
  }
};


// const { user, session, error } = await supabase.auth.signUp({
//   email: email.value,
//   password: password.value,
// })
// ;

// function checkPassword(){
//     if (password.value !== confirmPassword.value) {
//         errorMessage.value = true;
//         message.value = "Passwords do not match";
//         //catch(error)
//     } else
//         if (password.value.length < 6) {
//             errorMessage.value = true;
//         message.value = "Password must have a minimum of 6 characters";
//         }
//         else{
//           await signUp(email.value, password.value)
//         }
// }

// async function submitData(){
//     try {
//         await user.signUp(email.value, password.value)
//         email.value = ""
//         password.value = ""
//     }
//     catch (error) {
//         console.log(error);
//     }
//  async function signUp(){
//    if(password.value && email.value && confirmPassword.value){
//     try{
//       await UserStore.signUp(
//         email.value,
//         password.value,
//         confirmPassword.value
//       );
//       router.push({ path: "/"});
//     } catch (e){
//       message.value = "Could not sign you please contact support";
//     }
//   }else {
//     message.value = "Please enter valid login details";
//   }
// }
    


</script>

<style>

</style>