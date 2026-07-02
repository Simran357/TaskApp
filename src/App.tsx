import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {Reducerfn} from "./Utils/Reducer.js";
import type {Task, InputVal} from "./Utils/interface.js";
import  TaskForm  from "./Components/TaskForm.js";
import TaskList from "./Components/TaskList";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  favoriteTask,
} from "./api/TaskApi.js";
import Button from "./Components/Button.js";





function App() {
  const [tasks, dispatch] = useReducer(Reducerfn, [] as Task[]);
  const [isEdit, setEdited] = useState<string | null>(null);
  const [warning, setWarning] = useState<string>("");
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  const [inputVal, setInputVal] = useState<InputVal>({
    title: "",
    disc: "",
  });

  const GetTask = async (): Promise<void> => {
    try {
      const response = await getTasks();
      console.log(response.data);

      dispatch({
        type: "SET_TASKS",
        payload: response.data.tasks.map((task) => ({
          ...task,
          id: task._id,
          favorite: task.favorite ?? false,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("fetching data..");
    GetTask();
  }, []);

  const AddTask = async (): Promise<void> => {
    try {
      const response = await addTask(
        inputVal.title,
        inputVal.disc,
        isCompleted,
        false
      );

      console.log(response.data);
      await GetTask(); // Refresh tasks
    } catch (error) {
      console.log(error, "error in post api");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!inputVal.title.trim() || !inputVal.disc.trim()) {
      setWarning("⚠️ Please fill in both Title and Description.");
      return;
    }

    setWarning("");

    if (isEdit) {
      const existing = tasks.find((task) => task.id === isEdit);

      dispatch({
        type: "EDIT",
        payload: {
          id: isEdit,
          _id: isEdit,
          task: inputVal.title,
          disc: inputVal.disc,
          completed: existing?.completed ?? false,
          favorite: existing?.favorite ?? false,
        },
      });

      try {
        await axios.put(`http://localhost:5001/Api/UpdateTask/${isEdit}`, {
          task: inputVal.title,
          disc: inputVal.disc,
        });

        await GetTask(); // Refresh tasks
      } catch (error) {
        console.log(error, "error updating task");
      }

      setEdited(null);
    } else {
      dispatch({
        type: "ADD",
        payload: {
          id: String(Date.now()),
          _id: String(Date.now()),
          task: inputVal.title,
          disc: inputVal.disc,
          completed: false,
          favorite: false,
        },
      });

      await AddTask();
    }

    setInputVal({
      title: "",
      disc: "",
    });
  };

  console.log(tasks);

  const handleEdit = (task: Task): void => {
    if (task.completed) return;

    setEdited(task.id);
    setInputVal({
      title: task.task,
      disc: task.disc,
    });
  };

  const handleDelete = async (task: Task): Promise<void> => {
    if (task.completed) return;
    console.log(task);

    try {
      const res = await deleteTask(task._id);
      console.log(res);
      await GetTask();
      setInputVal({
        title: "",
        disc: "",
      });
      setEdited(null);
    } catch (error) {
      console.log(error, "error deleting task");
    }
  };

  const HandleCompleted = async (
    id: string,
    completed: boolean
  ): Promise<void> => {
    try {
      const res = await completeTask(id, !completed);
      console.log(res);
      await GetTask();
    } catch (error) {
      console.log(error, "error completing task");
    }
  };

  const HandleFavorite = async (
    id: string,
    favorite: boolean
  ): Promise<void> => {
    // Optimistic update so the star responds instantly
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });

    try {
      const res = await favoriteTask(id, !favorite);
      console.log(res);
      await GetTask();
    } catch (error) {
      console.log(error, "error favoriting task");
      // Roll back the optimistic update if the request failed
      dispatch({ type: "TOGGLE_FAVORITE", payload: id });
    }
  };

  const visibleTasks = showFavoritesOnly
    ? tasks.filter((task) => task.favorite)
    : tasks;

  const sortedTasks = [...visibleTasks].sort((a, b) => {
    if (a.favorite === b.favorite) return 0;
    return a.favorite ? -1 : 1;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <TaskForm
        inputVal={inputVal}
        setInputVal={setInputVal}
        warning={warning}
        setWarning={setWarning}
        handleSubmit={handleSubmit}
        isEdit={isEdit !== null}
      />
      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Tasks
        </h3>

    
<Button
  variant="warning"
  onClick={() => setShowFavoritesOnly((prev) => !prev)}
>
  {showFavoritesOnly ? "★ Favorites Only" : "☆ Show Favorites"}
</Button>
      </div>

      <div className="mt-4">
        {sortedTasks.length > 0 ? (
          <div className="grid gap-4">
            <TaskList
  tasks={sortedTasks}
  showFavoritesOnly={showFavoritesOnly}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onComplete={HandleCompleted}
  onFavorite={HandleFavorite}
/>
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-500">
              {showFavoritesOnly ? "No favorites yet ⭐" : "No tasks yet 📒"}
            </h2>

            <p className="mt-2 text-gray-400">
              {showFavoritesOnly
                ? "Star a task to see it here."
                : "Add your first task to get started."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;