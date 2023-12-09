import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Textfield from "../Textfield";
import Switch from "../switch";
import classes from "./index.module.css";

const AddTodoDialogContent = forwardRef(
  ({ selectedTodo, taskRef, addTodoRef, ...props }, ref) => {
    const [task, setTask] = useState(selectedTodo?.task || "");
    const [description, setDescription] = useState(
      selectedTodo?.description || ""
    );
    const [isCompleted, setIsCompleted] = useState(
      selectedTodo?.is_completed || false
    );

    useImperativeHandle(
      ref,
      () => ({
        getPayload: () => {
          return {
            task,
            description,
            is_completed: isCompleted,
          };
        },
      }),
      [isCompleted, description, task]
    );

    useEffect(() => {
      taskRef.current?.focus();
    }, [taskRef]);

    return (
      <div className={classes["add-todo-container"]}>
        <Textfield
          label="Task"
          ref={taskRef}
          autoFocus={true}
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          onEnter={() => {
            addTodoRef.current?.click();
          }}
        />
        <Textfield
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onEnter={() => {
            addTodoRef.current?.click();
          }}
        />
        <Switch
          label="Completed"
          checked={isCompleted}
          onChange={() => {
            setIsCompleted(!isCompleted);
          }}
        />
      </div>
    );
  }
);

export default AddTodoDialogContent;
