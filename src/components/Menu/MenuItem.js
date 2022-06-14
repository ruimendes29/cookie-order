import React from "react";
import classes from "./MenuItem.module.css";
import MenuItemInputs from "./MenuItemInputs";

const MenuItem = (props) => {

  return (
    <div className={classes["menu-item-holder"]}>
      <div>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{`${props.price}€`}</div>
      </div>
      <MenuItemInputs name={props.name}/>

      
    </div>
  );
};

export default MenuItem;
