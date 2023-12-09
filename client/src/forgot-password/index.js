import React, { useCallback, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/card";
import Label from "../components/Label";
import Textfield from "../components/Textfield";
import TodoContainer from "../components/todo-container";
import { displaySnackbar } from "../components/snackbar/displaySnackbar";
import userServices from "../services/userService";
import { AppContext } from "../AppContext";
import classes from "./index.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetPasswordRef = useRef();

  const { updateLoading } = useContext(AppContext);

  const resetPasswordHandler = useCallback(async () => {
    try {
      updateLoading(true);
      const paylaod = {
        email,
        password,
      };
      const response = await userServices.resetPassword(paylaod);
      console.log("reset-password", response);
      if (response?.status === 200) {
        return displaySnackbar({
          message: "Password reseted Successfully.",
          type: "success",
        });
      }
    } finally {
      updateLoading(false);
    }
  }, [email, password, updateLoading]);

  return (
    <TodoContainer>
      <div className={classes["forgot-password-container"]}>
        <Label labelText="RESET PASSWORD" />
        <Card
          cardContent={
            <div className={classes["forgot-password-card-content"]}>
              <Textfield
                autoFocus={true}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onEnter={() => {
                  resetPasswordRef.current?.click();
                }}
              />
              <Textfield
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onEnter={() => {
                  resetPasswordRef.current?.click();
                }}
              />
              <div className={classes["cta"]}>
                <Button
                  label="RESET PASSWORD"
                  ref={resetPasswordRef}
                  onClick={resetPasswordHandler}
                />
              </div>
              <div className={classes["cta-container"]}>
                <div className={classes["link-cta"]}>
                  <Link to="/login">
                    <Label labelText="Return to Login" variant="body1" />
                  </Link>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </TodoContainer>
  );
};

export default ForgotPassword;
