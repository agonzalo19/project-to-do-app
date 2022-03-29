import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),

  // Take Tasks
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("is_complete", { ascending: true });
      return (this.tasks = tasks);
    },

    // Insert Task

    async addTask(title) {
      // console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
        },
      ]);
    },

    // Edit Task

    // async toggleDone(bool, id) {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .update({ is_complete: bool })
    //     .match({ id: id });
    // },

    // async editTask(title, id) {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .update({ title: title })
    //     .match({ id: id });
    // },

    // // Delete Task

    // async deleteTask(id) {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .delete()
    //     .match({ id: id });
    // },

    // // Complate Task

    // async allDone() {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .update({ is_complete: true })
    //     .match({ is_complete: false });
    // },

    // // Uncomplate Task

    // async allUndone() {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .update({ is_complete: false })
    //     .match({ is_complete: true });
    // },

    // // Remove Task
    // async removeAll() {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .delete()
    //     .match({ user_id: useUserStore().user.id });
    // },
  },
});
