import { useEffect, useReducer, useState } from "react";
import { Reducerfn } from "../utils/reducer.js";
import type { Task, InputVal } from "../utils/interface.js";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  favoriteTask,
} from "../api/taskApi";
import toast from "react-hot-toast";
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



  const handleCompleted = async (id: string, completed: boolean) => {
    await completeTask(id, !completed);
    await fetchTasks();
  };

  const handleFavorite = async (id: string, favorite: boolean) => {
    console.log("Clicked:", id, favorite);
    await favoriteTask(id, !favorite);
    await fetchTasks();
  };

 const onDelete = (task: Task) => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">
        Are you sure you want to delete this task?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          Cancel
        </button>

        <button
          className="px-3 py-1 rounded bg-red-500 text-white"
          onClick={async () => {
            await deleteTask(task._id);
            await fetchTasks();

            toast.dismiss(t.id);
            toast.success("Task deleted!");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));
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
    handleCompleted,
    handleFavorite,
    fetchTasks,
    setIsEdit,
    onDelete

  };
};