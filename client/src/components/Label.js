import React from "react";
import Typography from "@mui/material/Typography";

const Label = ({ labelText, variant = "h6", ...props }) => {
  return (
    <Typography variant={variant} {...props}>
      {labelText}
    </Typography>
  );
};

export default Label;
