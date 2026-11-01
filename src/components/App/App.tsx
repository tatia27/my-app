import { useState, useEffect, useMemo, useCallback } from "react";
import { Task } from "../Task/Task";
import { AddTask } from "../AddTask/AddTask";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { loadTasksFromStorage } from "../../lib/getTasks";
import type { TaskInfo, FilterType } from "../../types";
import s from "./App.module.scss";

export const App = () => {
  const [tasks, setTasks] = useState<TaskInfo[]>(loadTasksFromStorage);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      case "all":
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // * Render
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Список задач</h1>

      <AddTask setTasks={setTasks} />

      <TaskFilter filter={filter} onFilterChange={handleFilterChange} />

      <div className={s.tasks}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item) => (
            <Task key={item.id} setTasks={setTasks} {...item} />
          ))
        ) : (
          <p className={s.empty}>Нет задач</p>
        )}
      </div>
    </div>
  );
};
