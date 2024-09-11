import React, { useState } from "react";

const CreateTodo = ({
  tasks,
  addTask,
  handleCompleteTask,
  handleRemoveTask,
  filter,
  setFilter,
}) => {
  const [todoText, setTodoText] = useState("");

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      addTask(todoText);
      setTodoText("");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="input input-lg w-full mt-24 placeholder:font-semibold placeholder:text-xl"
          value={todoText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="mt-6 rounded-lg bg-purple-50 shadow-2xl text-gray-700 font-semibold">
        {tasks.map((task) => (
          <>
            <div
              key={task.id}
              className="flex justify-between items-center py-5 px-5"
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name={`radio-${task.id}`}
                  className="radio radio-primary"
                  checked={task.isCompleted}
                  onChange={() => handleCompleteTask(task.id)}
                />
                <span className={`${task.isCompleted ? "line-through" : ""}`}>
                  {task.todoText}
                </span>
              </div>
              <button onClick={() => handleRemoveTask(task.id)}>🗑️</button>
            </div>
            <hr />
          </>
        ))}

        <div className="flex justify-between items-center py-5 px-5">
          <p>{tasks.length} Items Left</p>
          <div className="flex gap-3">
            <p
              onClick={() => setFilter("All")}
              className={`cursor-pointer ${
                filter === "All" ? "text-blue-500" : ""
              }`}
            >
              All
            </p>
            <p
              onClick={() => setFilter("Active")}
              className={`cursor-pointer ${
                filter === "Active" ? "text-blue-500" : ""
              }`}
            >
              Active
            </p>
            <p
              onClick={() => setFilter("Completed")}
              className={`cursor-pointer ${
                filter === "Completed" ? "text-blue-500" : ""
              }`}
            >
              Completed
            </p>
          </div>

          <p>Clear Completed</p>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
