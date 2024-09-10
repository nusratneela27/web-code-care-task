import React from "react";

const CreateTodo = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Create a new todo..."
        className="input input-lg w-full mt-24 placeholder:font-semibold placeholder:text-xl"
      />
    </div>
  );
};

export default CreateTodo;
