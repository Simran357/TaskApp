
import type { Task ,Action} from "./interface";

export const Reducerfn = (tasks: Task[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.payload];
    case "EDIT":
      return tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    case "DELETE":
      return tasks.filter((task) => task._id !== action.payload);
    case "TOGGLE_COMPLETE":
      return tasks.map((task) =>
        task._id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "TOGGLE_FAVORITE":
      return tasks.map((task) =>
        task._id === action.payload
          ? { ...task, favorite: !task.favorite }
          : task
      );
    case "SET_TASKS":
      return action.payload;
    default:
      return tasks;
  }
};
