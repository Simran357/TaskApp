import type {  TaskCardProps } from "../utils/interface";
import Button from "./button";
const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onComplete,
  onFavorite,
}: TaskCardProps) => {
  return (
    <div
      className={`relative rounded-xl border p-5 shadow-sm transition-all duration-300 ${
        task.completed
          ? "bg-gray-100 border-gray-300"
          : task.favorite
          ? "bg-yellow-50 border-yellow-300 hover:shadow-lg"
          : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-500"
      }`}
    >
    <button
        onClick={() => onFavorite(task._id, task.favorite)}
        className={`absolute top-4 right-4 text-2xl ${
          task.favorite ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        {task.favorite ? "★" : "☆"}
      </button>
      <h3
        className={`text-xl font-semibold ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.task}
      </h3>
      <p
        className={`mt-2 ${
          task.completed ? "line-through text-gray-400" : "text-gray-600"
        }`}
      >
        {task.disc}
      </p>
      <div className="mt-5 flex justify-between items-center">
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onComplete(task._id, task.completed)}
          />
          {task.completed ? "Completed ✅" : "Mark Complete"}
        </label>

        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => onEdit(task)}
            disabled={task.completed}
          >
            ✏️ Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(task)}
            disabled={task.completed}
          >
            🗑 Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;