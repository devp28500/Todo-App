import React from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import Snackbar from ".";

export const displaySnackbar = ({ message, type, ...props }) => {
  const container = document.createElement("div");
  container.id = "snackbar";
  document.body.appendChild(container);
  let portal = null;
  let root = null;
  const unmountSnackbar = () => {
    root.unmount();
    container?.remove();
  };
  const handleClose = () => {
    unmountSnackbar();
  };

  const snackbar = (
    <Snackbar message={message} type={type} onClose={handleClose} {...props} />
  );
  portal = createPortal(snackbar, container);
  root = createRoot(container);
  root.render(portal);
};
