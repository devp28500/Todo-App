import React, { useCallback, useState } from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Snackbar = ({
  message,
  type = "success",
  position = { vertical: "top", horizontal: "right" },
  duration = 2000,
  variant = "filled",
  ...props
}) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  const handleClose = useCallback(
    (e, reason) => {
      if (reason === "timeout") setShowSnackbar(false);
      !!props?.onClose && props.onClose(e, reason);
    },
    [props]
  );

  return (
    <MuiSnackbar
      open={showSnackbar}
      anchorOrigin={position}
      message={message}
      type={type}
      autoHideDuration={duration}
      onClose={handleClose}
      {...props}
    >
      <MuiAlert severity={type} variant={variant}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;
