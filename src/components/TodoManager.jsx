import React, { useState, useEffect } from "react";
import CreateTodo from "../pages/Home/CreateTodo";

const TodoManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (todoText) => {
    const newTask = {
      id: Date.now(),
      isCompleted: false,
      todoText,
    };

    setTasks([...tasks, newTask]);
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
    <CreateTodo
      tasks={filteredTasks}
      addTask={addTask}
      handleCompleteTask={handleCompleteTask}
      handleRemoveTask={handleRemoveTask}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default TodoManager;
