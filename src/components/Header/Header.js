import React from "react";
import classes from "./Header.module.css";
import imgRestaurant from "../../assets/images/restaurant-icon.png";
import Cart from "./Cart/Cart";

const Header = () => {
  return (
    <header className={classes.header}>
      <img alt="restaurant icon" src={imgRestaurant} />
      {/* <div className={classes["tabs-holder"]}>
          <p>Tab1</p>
          <p>Tab2</p>
      </div> */}
      <Cart></Cart>
    </header>
  );
};

export default Header;
