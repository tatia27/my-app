import { memo, useCallback, type Dispatch, type SetStateAction } from "react";
import type { TaskInfo } from "../../types";
import s from "./Task.module.scss";

interface Props {
  id: string;
  name: string;
  completed: boolean;
  setTasks: Dispatch<SetStateAction<TaskInfo[]>>;
}

export const Task = memo((props: Props) => {
  const {
    id, //
    name,
    completed,
    setTasks,
  } = props;

  const handleToggleTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    },
    [setTasks],
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks],
  );

  // * Render
  return (
    <div className={`${s.task} ${completed ? s.completed : ""}`}>
      <div className={s.label}>
        <input
          className={s.checkbox}
          type="checkbox"
          checked={completed}
          onChange={() => handleToggleTask(id)}
        />
        <span className={s.name}>{name}</span>
      </div>

      <button
        type="button"
        className={s.deleteBtn}
        onClick={() => handleDeleteTask(id)}
      >
        Удалить
      </button>
    </div>
  );
});
