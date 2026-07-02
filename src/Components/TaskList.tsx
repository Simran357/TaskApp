import TaskCard from "./TaskCard";
import type { Task, TaskListProps } from "../Utils/interface";



const TaskList = ({
  tasks,
  showFavoritesOnly,
  onEdit,
  onDelete,
  onComplete,
  onFavorite,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};

export default TaskList;