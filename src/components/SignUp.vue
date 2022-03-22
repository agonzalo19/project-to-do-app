<template>
<div>
<section>
  
  <form @submit.prevent="register">
  <h3>Sing Up</h3>
  
    <div>
    <label class="labe">Email</label><br>
    <input id="email" type="email" name="email" required placeholder="Email" v-model="email"> <br>
    
    <label class="label">Password</label><br>
    <input id="password" name="password" type="password" required placeholder="Choose your password" v-model="password"><br>
    
    <label for="ConfirmPassword" class="label">Confirm password</label><br>
    <input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Repeat your password" v-model="confirmPassword"><br>

    <div v-if="register" >
      <p>{{errorMsg}}</p>
    </div>

    <button type="submit">Register</button>
  
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
const confirmPassword = ref("");
const errorMsg = ref("");
const router = useRouter();

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
      router.push('/Auth');
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