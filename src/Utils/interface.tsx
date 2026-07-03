export interface Task {
  id: string;
  _id: string;
  task: string;
  disc: string;
  completed: boolean;
  favorite: boolean;
}

export type Action =
  | { type: "ADD"; payload: Task }
  | { type: "EDIT"; payload: Task }
  | { type: "DELETE"; payload: string }
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string };

export interface TaskListResponse {
  tasks: Task[];
}


export interface TaskListProps {
  tasks: Task[];
  showFavoritesOnly: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (id: string, completed: boolean) => void;
  onFavorite: (id: string, favorite: boolean) => void;
}

export interface InputVal {
  title: string;
  disc: string;
}

export interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (id: string, completed: boolean) => void;
  onFavorite: (id: string, favorite: boolean) => void;
}

export interface TaskFormProps {
  inputVal: {
    title: string;
    disc: string;
  };
  setInputVal: React.Dispatch<
    React.SetStateAction<{
      title: string;
      disc: string;
    }>
  >;
  warning: string;
  setWarning: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  isEdit: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "secondary" | "warning";
  className?: string;
  type?: "button" | "submit" | "reset";
}