import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({
  component: Component,
  skipCheck = false,
  ...componentProps
}) => {
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setValid(true);
      navigate("/todo_app");
    } else if (skipCheck) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [navigate, skipCheck]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (skipCheck) {
      setValid(true);
    }
  }, [skipCheck]);

  useEffect(() => {
    if (!valid) {
      navigate("/login");
    }
  }, [navigate, skipCheck, valid]);

  return <>{valid && <Component {...componentProps} />}</>;
};

export default AuthRoute;
