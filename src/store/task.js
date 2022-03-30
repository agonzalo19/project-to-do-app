import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),

  actions: {
    // Take Tasks
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("is_complete", { ascending: true });
      return (this.tasks = tasks);
    },

    //Insert Task

    async addTask(title) {
      const { error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
        },
      ]);
      if (error) throw error;
    },

    // Edit Task

    async editTask(item, index) {
      const { error } = await supabase
        .from("tasks")
        .update({ title: item })
        .match({ id: index });
    },

    // Delete Task
    async removeTodo(item) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: item });
      if (error) throw error;
    },
    // const { data, error } = await supabase
    //         .from('tasks')
    //         .update({ is_complete: bool })
    //         .match({ id: id })
    // },

    // async toggleDone(bool, id) {
    //     const { data, error } = await supabase
    //         .from('tasks')
    //         .update({ is_complete: bool })
    //         .match({ id: id })
    // },

    // async editTask(title, id) {
    //     const { data, error } = await supabase
    //         .from('tasks')
    //         .update({ title: title })
    //         .match({ id: id })
    // },
    // // Delete Task

    // async deleteTask(id) {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .delete()
    //     .match({ id: id });
    // },

    // Complate Task

    async isComplete(taskId, status) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: status })
        .match({ id: taskId });
      if (error) throw error;
    },

    // // Uncomplate Task

    // async allUndone() {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .update({ is_complete: false })
    //     .match({ is_complete: true });
    // },

    // // Remove Task
    // async removeToodo() {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .delete()
    //     .match({ user_id: useUserStore().user.id });
  },
});
