import React from "react";
import MuiChip from "@mui/material/Chip";

const Chip = ({
  label,
  size = "small",
  color = "primary",
  variant = "contained",
  ...props
}) => {
  return (
    <MuiChip
      size={size}
      label={label}
      color={color}
      variant={variant}
      {...props}
    />
  );
};

export default Chip;
