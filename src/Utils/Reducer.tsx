
import type {Task} from "./interface";
type Action =
  | { type: "ADD"; payload: Task }
  | { type: "EDIT"; payload: Task }
  | { type: "DELETE"; payload: string }
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string };




export const Reducerfn = (tasks: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.payload];

    case "EDIT":
      return tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

    case "DELETE":
      return tasks.filter((task) => task.id !== action.payload);

    case "TOGGLE_COMPLETE":
      return tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case "TOGGLE_FAVORITE":
      return tasks.map((task) =>
        task.id === action.payload
          ? { ...task, favorite: !task.favorite }
          : task
      );

    case "SET_TASKS":
      return action.payload;

    default:
      return tasks;
  }
};
