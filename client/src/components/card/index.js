import React from "react";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import classes from "./index.module.css";
const Card = ({ cardContent }) => {
  return (
    <MuiCard className={classes["card"]}>
      <MuiCardContent className={classes["card-content"]}>
        {cardContent}
      </MuiCardContent>
    </MuiCard>
  );
};

export default Card;
