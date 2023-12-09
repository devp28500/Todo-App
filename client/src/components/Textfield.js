import React, { forwardRef, useCallback, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Textfield = forwardRef(
  (
    {
      label = "Textfield label",
      variant = "outlined",
      required = false,
      type = "text",
      onEnter = () => {},
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
      const show = !showPassword;
      setShowPassword(show);
    }, [showPassword]);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
      <TextField
        label={label}
        inputRef={ref}
        variant={variant}
        required={required}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {type === "password" && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(e);
          }
          props?.onKeyDown && props.onKeyDown(e);
        }}
        {...props}
      />
    );
  }
);

export default Textfield;
