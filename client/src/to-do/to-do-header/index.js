import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Label from "../../components/Label";
import classes from "./index.module.css";
import { images } from "../../assets/images";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/userSlice";

const TodoHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={classes["header"]}>
      <div className={classes["header-label"]}>
        <img alt="todo-logo" src={images.TodoIcon} />
        <Label labelText="TODO APP" />
      </div>
      <div className={classes["cta"]}>
        {!localStorage.getItem("user_id") && (
          <Button label="Login" onClick={() => navigate("/login")} />
        )}
        {!localStorage.getItem("user_id") && (
          <Button label="Sign Up" onClick={() => navigate("/signup")} />
        )}
        {localStorage.getItem("user_id") && (
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("user_id");
              dispatch(updateUser(null));
              // navigate("/");
            }}
          >
            <Label
              labelText="LOGOUT"
              variant="button"
              display="block"
              gutterBottom
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TodoHeader;
