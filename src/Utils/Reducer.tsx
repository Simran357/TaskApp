
import type { Task } from "./Interface";

import type { Action } from "./Interface";

export const Reducerfn = (tasks: Task[], action: Action) => {
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
