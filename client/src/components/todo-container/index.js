import React from "react";
import TodoHeader from "../../to-do/to-do-header";
import classes from "./index.module.css";

const TodoContainer = ({ children }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div className={classes["todo-main-container"]}>
        <div className={classes["todo-conatiner"]}>
          <TodoHeader />
        </div>
        {children}
      </div>
    </div>
  );
};

export default TodoContainer;
