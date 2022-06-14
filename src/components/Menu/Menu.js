import React from "react";
import foodImage from "../../assets/images/food.png";
import OrdersList from "./OrdersList";
import Card from "../UI/Card";
import classes from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={classes["menu-holder"]}>
      <img
        className={classes["food-img"]}
        alt="table filled with various foods"
        src={foodImage}
      />

      <Card className={classes["orders-list"]}>
        <OrdersList />
      </Card>
    </div>
  );
};

export default Menu;
