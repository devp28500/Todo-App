import React from "react";
import MuiSwitch from "@mui/material/Switch";
import Label from "../Label";
import classes from "./index.module.css";

const Switch = ({ label, checked, color = "primary", onChange = () => {} }) => {
  return (
    <div className={classes["switch-container"]}>
      <Label variant="subtitle1" labelText={label} />
      <MuiSwitch checked={checked} color={color} onChange={onChange} />
    </div>
  );
};

export default Switch;
