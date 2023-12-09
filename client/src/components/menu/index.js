import React from "react";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

const Menu = ({
  anchorEl,
  open,
  onClose = () => {},
  menus = [],
  coordinates,
}) => {
  return (
    <MuiMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorPosition={coordinates}
      anchorReference={coordinates ? "anchorPosition" : "anchorEl"}
    >
      {menus.map((menu, index) => (
        <MuiMenuItem key={index} onClick={menu.onClick}>
          {menu.icon ? <ListItemIcon>{menu.icon}</ListItemIcon> : null}
          {menu.label}
        </MuiMenuItem>
      ))}
    </MuiMenu>
  );
};

export default Menu;
