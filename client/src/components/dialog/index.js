import React from "react";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Label from "../Label";

const Dialog = ({
  open,
  onClose = () => {},
  dialogTitle,
  dialogTitleIcon,
  dialogContent,
  dialogActions,
  dividers = true,
  ...props
}) => {
  return (
    <MuiDialog open={open} onClose={onClose} {...props}>
      <MuiDialogTitle>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {dialogTitleIcon && dialogTitleIcon}
          {<Label variant="h6" labelText={dialogTitle} />}
        </div>
      </MuiDialogTitle>
      <MuiDialogContent dividers={dividers}>{dialogContent}</MuiDialogContent>
      <MuiDialogActions>{dialogActions}</MuiDialogActions>
    </MuiDialog>
  );
};

export default Dialog;
