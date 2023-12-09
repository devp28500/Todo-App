import React, { useCallback, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "../components/card";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import Label from "../components/Label";
import TodoContainer from "../components/todo-container";
import { displaySnackbar } from "../components/snackbar/displaySnackbar";
import userServices from "../services/userService";
import { updateUser } from "../redux/user/userSlice";
import { AppContext } from "../AppContext";
import { isEmpty, isValidEmail } from "../utils/validationUtils";
import classes from "./index.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitButtonRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const { updateLoading } = useContext(AppContext);

  const signupHandler = useCallback(async () => {
    if (isEmpty(name)) {
      displaySnackbar({
        message: "Please enter name.",
        type: "error",
      });
      nameRef.current?.focus();
      return;
    }

    if (!isValidEmail(email)) {
      displaySnackbar({
        message: "Please enter a valid email.",
        type: "error",
      });
      emailRef.current?.focus();
      return;
    }

    if (isEmpty(password)) {
      displaySnackbar({
        message: "Please enter password.",
        type: "error",
      });
      passwordRef.current?.focus();
      return;
    }

    try {
      updateLoading(true);
      const paylaod = {
        name,
        email,
        password,
      };
      const response = await userServices.addUser(paylaod);
      if (response?.status === 200) {
        localStorage.setItem("user_id", response?.result?.user_id);
        displaySnackbar({
          message: "User added successfully.",
          type: "success",
        });
        dispatch(updateUser(response?.result));
        navigate("/todo_app");
      }
    } finally {
      updateLoading(false);
    }
  }, [dispatch, email, name, navigate, password, updateLoading]);

  return (
    <TodoContainer>
      <div className={classes["sign-up-conatiner"]}>
        <Label labelText="SIGN UP" />
        <Card
          cardContent={
            <>
              <Textfield
                autoFocus
                label="Name"
                ref={nameRef}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onEnter={(e) => {
                  submitButtonRef.current?.click();
                }}
              />
              <Textfield
                label="Email Id"
                value={email}
                ref={emailRef}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onEnter={(e) => {
                  submitButtonRef.current?.click();
                }}
              />
              <Textfield
                label="Password"
                type="password"
                value={password}
                ref={passwordRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onEnter={(e) => {
                  submitButtonRef.current?.click();
                }}
              />
              <div className={classes["cta"]}>
                <Button
                  ref={submitButtonRef}
                  label="CREATE ACCOUNT"
                  onClick={signupHandler}
                />
                <div className={classes["cta-text"]}>
                  <Label
                    labelText="Already have an account?"
                    variant="caption"
                  />
                  <Link to="/login">
                    <Label labelText="Login" variant="caption" />
                  </Link>
                </div>
              </div>
            </>
          }
        />
      </div>
    </TodoContainer>
  );
};

export default SignUp;
