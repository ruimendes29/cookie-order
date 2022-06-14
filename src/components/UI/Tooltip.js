import React from "react";
import classes from "./Tooltip.module.css";

const Tooltip = (props) => {
  return (
    <div className={classes.tooltip}>
      {props.children}
      <div className={classes.tooltiptext}>{props.displayTip}</div>
    </div>
  );
};

export default Tooltip;
