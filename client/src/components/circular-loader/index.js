import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./index.module.css";

const CircularLoader = ({ ...props }) => {
  return (
    <div className={classes["circular-loader"]}>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress {...props} />
      </div>
    </div>
  );
};

export default CircularLoader;
