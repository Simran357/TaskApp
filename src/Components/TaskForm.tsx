import type { TaskFormProps } from "../utils/interface";

import Button from "./button";
const TaskForm = ({
  inputVal,
  setInputVal,
  warning,
  setWarning,
  handleSubmit,
  isEdit,
}: TaskFormProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">
        {isEdit ? "Update Task" : "Add Task"}
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task"
          value={inputVal.title}
          onChange={(e) => {
            setInputVal((prev) => ({
              ...prev,
              title: e.target.value,
            }));

            if (warning) setWarning("");
          }}
          onBlur={() => {
            if (!inputVal.title.trim()) {
              setWarning("Task is required");
            } else {
              setWarning("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200
${
  warning === "Task is required"
    ? "border-red-500 bg-red-50 placeholder-red-400 focus:ring-2 focus:ring-red-300 animate-pulse"
    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
}`}/>
        {warning === "Task is required" && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            ⚠️ Task is required
          </p>
        )}
        <input
          type="text"
          placeholder="Description"
          value={inputVal.disc}
          onChange={(e) => {
            setInputVal((prev) => ({
              ...prev,
              disc: e.target.value,
            }));
            if (warning) setWarning("");
          }}
          onBlur={() => {
            if (!inputVal.disc.trim()) {
              setWarning("Description is required");
            } else {
              setWarning("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          className={`w-full px-4 py-2 rounded-lg border transition-all duration-200
    ${warning === "Description is required"
              ? "border-red-500 bg-red-50 placeholder-red-400 focus:ring-2 focus:ring-red-300 animate-pulse"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`} />
        {warning === "Description is required" && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            ⚠️ Description is required
          </p>
        )}
        <Button variant="primary" onClick={handleSubmit} className="w-full">
          {isEdit ? "Update" : "Add"}
        </Button>
      </div>
    </>
  );
};

export default TaskForm;