<template>
  <div>
    <section class="max-w-screen-sm mx-auto">
      <form
        form
        @submit.prevent="login"
        class="mx-auto my-10 p-10 flex flex-col bg-gray-200 rounded-md shadow-lg"
      >
        <div>
          <h3 class="text-3xl mb-5">Sing In</h3>

          <div class="flex flex-col mb-2">
            <label for="email" class="mb-1 text-lg text-green-500">Email</label
            ><br />
            <input
              class="p-2 pl-12 text-gray-500 rounded bg-icon bg-email focus:outline-none"
              id="email"
              type="email"
              name="email"
              required
              placeholder="Email"
              v-model="email"
            />
            <br />
          </div>
          <div class="flex flex-col mb-2">
            <label class="mb-1 text-lg text-green-500">Password</label><br />
            <input
              class="p-2 pl-12 text-gray-500 rounded bg-icon bg-email focus:outline-none"
              id="password"
              name="password"
              type="password"
              required
              placeholder="Choose your password"
              v-model="password"
            /><br />
          </div>
          <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
          </div>

          <button
            class="block w-full sm:inline sm:w-36 font-mono mt-5 py-2 px-6 rounded self-start text-white font-bold bg-green-400 border-solid border-2 border-transparent hover:border-green-400 hover:bg-white hover:text-green-400"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      <p class="flex justify-center">
        Don't have an account?
        <RouteAuth :route="route" :buttonText="buttonText" />
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import RouteAuth from "../components/RouteAuth.vue";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const route = "/auth/sign-up";
const buttonText = "Sign Up";

const login = async () => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push("/");
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
