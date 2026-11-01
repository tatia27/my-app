import type { TaskInfo } from "../types";

export const DEFAULT_TASKS: TaskInfo[] = [
  { id: "1", name: "Составить план на день", completed: false },
  { id: "2", name: "Купить хлеб", completed: true },
  { id: "3", name: "Прогулка", completed: false },
];

export const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks) as TaskInfo[];
    }
  } catch (error) {
    console.error(error);
  }

  return DEFAULT_TASKS;
};
