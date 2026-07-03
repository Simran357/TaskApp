import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/UseTaskHook";
import Button from "./components/Button";
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
    handleDelete,
    handleCompleted,
    handleFavorite,
  } = useTasks();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const visibleTasks = showFavoritesOnly
    ? tasks.filter((t) => t.favorite)
    : tasks;

const sortedTasks = [...visibleTasks].sort(
  (a, b) => Number(b.favorite) - Number(a.favorite)
);
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

    <div className="mt-6 flex justify-between items-center">
  <h3 className="text-sm font-semibold text-gray-500 uppercase">
    Tasks
  </h3>

  <Button
    variant="warning"
    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
  >
    {showFavoritesOnly ? "Show All" : "⭐ Favorites"}
  </Button>
</div>

      <div className="mt-4">
        <TaskList
          tasks={sortedTasks}
          showFavoritesOnly={showFavoritesOnly}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onComplete={handleCompleted}
          onFavorite={handleFavorite}
        />
      </div>

    </div>
  );
}

export default App;