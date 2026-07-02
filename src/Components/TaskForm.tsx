import React from "react";
import Button from "./Button";
interface TaskFormProps {
  inputVal: {
    title: string;
    disc: string;
  };
  setInputVal: React.Dispatch<
    React.SetStateAction<{
      title: string;
      disc: string;
    }>
  >;
  warning: string;
  setWarning: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  isEdit: boolean;
}

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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {warning && (
          <div className="rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-2">
            {warning}
          </div>
        )}
<Button variant="primary" onClick={handleSubmit} className="w-full">
  {isEdit ? "Update" : "Add"}
</Button>
      </div>
    </>
  );
};

export default TaskForm;