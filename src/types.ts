export interface TaskInfo {
  id: string;
  name: string;
  completed: boolean;
}

export interface Filter {
  key: FilterType;
  label: string;
}

export type FilterType = "all" | "active" | "completed";
