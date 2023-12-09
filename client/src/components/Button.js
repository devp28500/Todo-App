import React, { forwardRef } from "react";
import MuiButton from "@mui/material/Button";

const Button = forwardRef(({ label, variant = "contained", ...props }, ref) => {
  return (
    <MuiButton variant={variant} ref={ref} {...props}>
      {label}
    </MuiButton>
  );
});

export default Button;
