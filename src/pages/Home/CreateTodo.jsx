import React, { useState, useEffect } from "react";

const CreateTodo = () => {
  const [todoText, setTodoText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        isCompleted: false,
        todoText: todoText,
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTodoText("");
    }
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") {
      return task.isCompleted;
    }
    if (filter === "Active") {
      return !task.isCompleted;
    }
    return true;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="input input-lg w-full mt-24 placeholder:font-semibold placeholder:text-xl"
          value={todoText}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (todoText.trim()) {
                handleKeyPress(e);
              }
            }
          }}
        />
      </div>

      <div className="mt-6 rounded-lg bg-purple-50 shadow-2xl text-gray-700 font-semibold">
        {filteredTasks.map((task) => (
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
          <p>{filteredTasks.length} Items Left</p>
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
