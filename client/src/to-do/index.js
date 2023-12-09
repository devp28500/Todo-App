import React from "react";
import { TodoContextProvider } from "./context";
import Todo from "./Todo";

const TodoWrapper = () => {
  return (
    <TodoContextProvider>
      <Todo />
    </TodoContextProvider>
  );
};

export default TodoWrapper;
