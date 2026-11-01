import {
  memo,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { TaskInfo } from "../../types";
import s from "./AddTask.module.scss";

interface Props {
  setTasks: Dispatch<SetStateAction<TaskInfo[]>>;
}

export const AddTask = memo((props: Props) => {
  const { setTasks } = props;

  const [task, setTask] = useState("");

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = task.trim();
      if (!trimmed) return;

      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: trimmed,
          completed: false,
        },
      ]);

      setTask("");
    },
    [task, setTasks],
  );

  // * Render
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Новая задача"
        className={s.input}
      />
      <button type="submit" className={s.button}>
        Добавить
      </button>
    </form>
  );
});
