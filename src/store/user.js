import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  //Comprovar en la base de datos si existe el usuario
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },

//  Nos ppermite registrar un usuario email i pasword en  base de datos
    async signUp(email, password) {
      //console.log("asdfasdfasdf");
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
//Falta definir i pintar en el componente de signIn
    signIn(){},
//Falta definir i pintar en el componente de signOut
    signOut(){},

    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});









