import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import CartContext from "../context/cart-context";
import classes from "./MenuItemInput.module.css";

const MenuItemInputs = (props) => {
  const [clickedMinus, setClickedMinus] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.get(props.name)
    ? cartCtx.items.get(props.name)
    : 0;
  return (
    <div className={`${classes.inputs} ${props.className}`}>
      <FontAwesomeIcon
        className={classes["icon"]}
        onClick={() => {
          if (numberOfItems === undefined || numberOfItems === 0) {
            setClickedMinus(true);
            setTimeout(() => {
              setClickedMinus(false);
            }, 300);
          } else cartCtx.removeItem(props.name);
        }}
        icon={faMinus}
      />
      <input
        id={`${props.name}.number-of-items`}
        type="number"
        className={`${classes["number-of-items"]} ${
          !clickedMinus ? "" : classes.invalid
        }`}
        onClick={() => {
          document.getElementById(`${props.name}.number-of-items`).value = "";
        }}
        onBlur={() => {
          if (
            document.getElementById(`${props.name}.number-of-items`).value ===
            ""
          )
            cartCtx.setItemQuantity(props.name, 0);
        }}
        onInput={(e) => {
          const numberInput = e.target.value;
          if (numberInput && numberInput >= 0) {
            cartCtx.setItemQuantity(props.name, parseInt(e.target.value, 10));
          } else if (!numberInput) {
            cartCtx.setItemQuantity(props.name, 0);
          }
        }}
        value={parseInt(numberOfItems, 10)}
      />

      <FontAwesomeIcon
        className={classes["icon"]}
        onClick={() => cartCtx.addItem(props.name)}
        icon={faPlus}
      />
    </div>
  );
};

export default MenuItemInputs;
