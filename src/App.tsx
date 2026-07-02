import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import type {Reducerfn} from "./Utils/Reducer.js";
import type {Task} from "./Utils/interface.js";



interface TaskListResponse {
  tasks: Task[];
}

interface InputVal {
  title: string;
  disc: string;
}

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
      const response = await axios.get<TaskListResponse>(
        "http://localhost:5001/Api/GetTask"
      );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddTask = async (): Promise<void> => {
    try {
      const response = await axios.post<TaskListResponse>(
        "http://localhost:5001/Api/AddTask",
        {
          task: inputVal.title,
          disc: inputVal.disc,
          status: isCompleted,
          favorite: false,
        }
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
      const res = await axios.delete<TaskListResponse>(
        `http://localhost:5001/Api/DeleteTask/${task._id}`
      );
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
      const res = await axios.put<TaskListResponse>(
        `http://localhost:5001/Api/completeTask/${id}`,
        {
          completed: !completed,
        }
      );
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
      const res = await axios.put<TaskListResponse>(
        `http://localhost:5001/Api/FavTask/${id}`,
        {
          favorite: !favorite,
        }
      );
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
      <h2 className="text-2xl font-bold text-center mb-6">
        {isEdit ? "Update Task" : "Add Task"}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task"
          value={inputVal.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputVal({
              ...inputVal,
              title: e.target.value,
            });

            if (warning) setWarning("");
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Description"
          value={inputVal.disc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputVal({
              ...inputVal,
              disc: e.target.value,
            });

            if (warning) setWarning("");
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {warning && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-2">
            {warning}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Tasks
        </h3>

        <button
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            showFavoritesOnly
              ? "bg-yellow-400 text-white hover:bg-yellow-500"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {showFavoritesOnly ? "★ Favorites Only" : "☆ Show Favorites Only"}
        </button>
      </div>

      <div className="mt-4">
        {sortedTasks.length > 0 ? (
          <div className="grid gap-4">
            {sortedTasks.map((task) => (
              <div
                key={task._id}
                className={`relative rounded-xl border p-5 shadow-sm transition-all duration-300 ${
                  task.completed
                    ? "bg-gray-100 border-gray-300"
                    : task.favorite
                    ? "bg-yellow-50 border-yellow-300 hover:shadow-lg"
                    : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-500"
                }`}
              >
                {/* Favorite Star */}
                <button
                  onClick={() => HandleFavorite(task._id, task.favorite)}
                  aria-label={
                    task.favorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className={`absolute top-4 right-4 text-2xl leading-none transition-transform hover:scale-110 ${
                    task.favorite ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  {task.favorite ? "★" : "☆"}
                </button>

                {/* Title */}
                <h3
                  className={`text-xl font-semibold pr-8 ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.task}
                </h3>

                {/* Description */}
                <p
                  className={`mt-2 text-sm pr-8 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {task.disc}
                </p>

                {/* Bottom Section */}
                <div className="mt-5 flex items-center justify-between">
                  {/* Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        HandleCompleted(task._id, task.completed)
                      }
                      className="h-5 w-5 accent-green-600"
                    />
                    <span
                      className={`font-medium ${
                        task.completed ? "text-green-600" : "text-gray-700"
                      }`}
                    >
                      {task.completed ? "Completed ✅" : "Mark Complete"}
                    </span>
                  </label>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      disabled={task.completed}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        task.completed
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task)}
                      disabled={task.completed}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        task.completed
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
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