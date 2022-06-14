import React, { useContext } from "react";
import CartContext from "../context/cart-context";
import MenuItem from "./MenuItem";

const OrdersList = () => {
  const cartCtx = useContext(CartContext);
  return (
    <ul>
      {Array.from(cartCtx.menu).map(([itemName, itemPrice]) => (
        <li key={itemName}>
          <MenuItem name={itemName} price={itemPrice.toFixed(2)}/>
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
