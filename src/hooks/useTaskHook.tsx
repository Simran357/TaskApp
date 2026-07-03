import { useEffect, useReducer, useState } from "react";
import { Reducerfn } from "../utils/Reducer";
import type { Task, InputVal } from "../utils/Interface.js";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  favoriteTask,
} from "../api/TaskApi";

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(Reducerfn, [] as Task[]);
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [warning, setWarning] = useState("");
  const [inputVal, setInputVal] = useState<InputVal>({
    title: "",
    disc: "",
  });

const fetchTasks = async () => {
  const res = await getTasks();
  console.log("GET TASKS RESPONSE");
  dispatch({
    type: "SET_TASKS",
    payload: res.data.tasks.map((task: Task) => ({
      ...task,
      id: task._id,
      favorite: task.favorite ?? false,
    })),
  });
};
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (!inputVal.title.trim() || !inputVal.disc.trim()) {
      setWarning("⚠️ Please fill all fields");
      return;
    }
    setWarning("");
    try {
      if (isEdit) {
        await updateTask(isEdit, inputVal.title, inputVal.disc);
      } else {
        await addTask(inputVal.title, inputVal.disc, false, false);
      }
      await fetchTasks();
      setInputVal({ title: "", disc: "" });
      setIsEdit(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (task: Task) => {
    if (task.completed) return;

    setIsEdit(task.id);
    setInputVal({
      title: task.task,
      disc: task.disc,
    });
  };

  const handleDelete = async (task: Task) => {
    if (task.completed) return;
    await deleteTask(task._id);
    await fetchTasks();
    setIsEdit(null);
  };

  const handleCompleted = async (id: string, completed: boolean) => {
    await completeTask(id, !completed);
    await fetchTasks();
  };

  const handleFavorite = async (id: string, favorite: boolean) => {
  console.log("Clicked:", id, favorite);
  await favoriteTask(id, !favorite);
  await fetchTasks();
};

  return {
    tasks,
    inputVal,
    setInputVal,
    warning,
    setWarning,
    isEdit,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCompleted,
    handleFavorite,
  };
};