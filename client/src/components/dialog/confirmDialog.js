import React from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import Dialog from ".";
import Button from "../Button";

export const confirmDialog = ({
  dialogTitle,
  dialogTitleIcon,
  dialogContent,
  okButtonLabel = "OK",
  cancelButtonLabel = "Cancel",
  onOk = () => {},
  onCancel = () => {},
}) => {
  const container = document.createElement("div");
  container.id = "confirm-dialog";
  document.body.appendChild(container);
  let portal = null;
  let root = null;
  const unmountDialog = () => {
    root.unmount();
    container.remove();
  };
  const handleClose = () => {
    unmountDialog();
  };
  const dialog = (
    <Dialog
      open={true}
      onClose={handleClose}
      dividers={true}
      dialogTitleIcon={dialogTitleIcon}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={
        <>
          <Button
            size="small"
            color="error"
            label={cancelButtonLabel}
            onClick={() => {
              handleClose();
              onCancel();
            }}
          />
          <Button
            autoFocus={true}
            size="small"
            label={okButtonLabel}
            onClick={() => {
              handleClose();
              onOk();
            }}
          />
        </>
      }
    />
  );
  portal = createPortal(dialog, container);
  root = createRoot(container);
  root.render(portal);
};
