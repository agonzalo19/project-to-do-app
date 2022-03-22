import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  // Coger tareas de eun usuario completpp
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
  },
});

// Falta Editar tarea, eliminar tarea, editar tarea