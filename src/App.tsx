import { useState } from "react";
import TaskForm from "./components/taskForm";
import TaskList from "./components/taskList";
import { useTasks } from "./hooks/useTaskHook";
import Button from "./components/button";
import { Toaster } from "react-hot-toast";
function App() {
  const {
    tasks,
    inputVal,
    setInputVal,
    warning,
    setWarning,
    isEdit,
    handleSubmit,
    handleEdit,
    onDelete,
    handleCompleted,
    handleFavorite,
  } = useTasks();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const visibleTasks = showFavoritesOnly
    ? tasks.filter((t) => t.favorite)
    : tasks;
  const sortedTasks = visibleTasks
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <TaskForm
        inputVal={inputVal}
        setInputVal={setInputVal}
        warning={warning}
        setWarning={setWarning}
        handleSubmit={handleSubmit}
        isEdit={isEdit !== null}
      />
      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          Tasks
        </h3>
        <Button
          variant="secondary"
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${showFavoritesOnly
              ? "bg-yellow-400 text-white hover:bg-yellow-500"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {showFavoritesOnly ? "★ Favorites Only" : "☆ Show Favorites Only"}
        </Button>
      </div>
      <div className="mt-4">
        <TaskList
          tasks={sortedTasks}
          showFavoritesOnly={showFavoritesOnly}
          onEdit={handleEdit}
          onDelete={onDelete}
          onComplete={handleCompleted}
          onFavorite={handleFavorite}
            isEdit={isEdit}
        />
      </div>
    </div>
  );
}

export default App;