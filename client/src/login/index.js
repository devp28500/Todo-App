import React, { useCallback, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import Label from "../components/Label";
import TodoContainer from "../components/todo-container";
import { displaySnackbar } from "../components/snackbar/displaySnackbar";
import userServices from "../services/userService";
import { updateUser } from "../redux/user/userSlice";
import { AppContext } from "../AppContext";
import classes from "./index.module.css";
import Card from "../components/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginRef = useRef();

  const { updateLoading } = useContext(AppContext);

  const loginHandler = useCallback(async () => {
    try {
      updateLoading(true);
      const payload = {
        email,
        password,
      };
      const response = await userServices.login(payload);
      if (response?.status === 200) {
        localStorage.setItem("user_id", response?.result?.user_id);
        dispatch(updateUser(response?.result));
        displaySnackbar({
          message: "Login Successfull",
          type: "success",
        });
        navigate("/todo_app");
      }
    } finally {
      updateLoading(false);
    }
  }, [dispatch, email, navigate, password, updateLoading]);

  return (
    <TodoContainer>
      <div className={classes["login-conatiner"]}>
        <Label labelText="LOGIN" />
        <Card
          cardContent={
            <>
              <Textfield
                autoFocus={true}
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onEnter={() => {
                  loginRef.current?.click();
                }}
              />
              <Textfield
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onEnter={() => {
                  loginRef.current?.click();
                }}
              />
              <div className={classes["cta"]}>
                <Button label="Login" onClick={loginHandler} ref={loginRef} />
                <Link to="/forgot_password">
                  <Label labelText="Forgot Password?" variant="caption" />
                </Link>
              </div>
              <div className={classes["create-acc-conatiner"]}>
                <Label variant="caption" labelText="Don't have an account?" />
                <Link to="/signup">
                  {<Label variant="caption" labelText="Create an Account" />}
                </Link>
              </div>
            </>
          }
        />
      </div>
    </TodoContainer>
  );
};

export default Login;
