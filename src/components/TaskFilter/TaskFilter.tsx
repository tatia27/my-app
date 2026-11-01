import { memo } from "react";
import type { Filter, FilterType } from "../../types";
import s from "./TaskFilter.module.scss";

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: Filter[] = [
  { key: "all", label: "Все" },
  { key: "active", label: "Активные" },
  { key: "completed", label: "Выполненные" },
];

export const TaskFilter = memo((props: Props) => {
  const {
    filter, //
    onFilterChange,
  } = props;

  // * Render
  return (
    <div className={s.filters}>
      {FILTERS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`${s.filterBtn} ${filter === item.key ? s.active : ""}`}
          onClick={() => onFilterChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
});
