import React, { useState, useCallback } from "react";
import CartContext from "./cart-context";

const menu = new Map();
menu.set("Chocolate Chip Cookie", 3.25);
menu.set("White Chocolate Cookie", 3.5);
menu.set("Peanut Butter Cookie", 3.0);
menu.set("Chocolate Chip Cookie XXL", 5.0);
menu.set("Dark Chocolate Chip Cookie", 3.25);
menu.set("Banana Cookie", 3.5);
menu.set("Vanilla Cookie", 3.0);
menu.set("Vanilla and Chocolate Chip Cookie", 5.0);
menu.set("Vanilla and Chocolate Chip Cookie XXL", 7.0);
const CartContextProvider = (props) => {
  const [items, setItems] = useState(new Map());

  const setItemQuantityHandler = useCallback((item, quantity) => {
    setItems((prevItems) => {
      const mapToRet = new Map([...prevItems]);
      if (quantity > 0) {
        mapToRet.set(item, quantity);
        console.log(mapToRet);
      } else if (mapToRet.has(item)) {
        mapToRet.delete(item);
      }
      return mapToRet;
    });
  }, []);

  const addItemHandler = useCallback((item, quantity = 1) => {
    setItems((prevItems) => {
      const mapToRet = new Map([...prevItems]);
      if (!mapToRet.has(item)) {
        mapToRet.set(item, 0);
      }
      mapToRet.set(item, mapToRet.get(item) + quantity);
      console.log(mapToRet);
      return mapToRet;
    });
  }, []);

  const removeItemHandler = useCallback ( (item, quantity = 1) => {
    setItems((prevItems) => {
      const mapToRet = new Map([...prevItems]);
      if (!mapToRet.has(item)) {
        mapToRet.set(item, 0);
      }
      mapToRet.set(item, Math.max(0, mapToRet.get(item) - quantity));
      if (mapToRet.get(item) === 0) {
        mapToRet.delete(item);
      }
      return mapToRet;
    });
  },[]);

  const clearCartHandler = useCallback(()=>{
    setItems(new Map());
  },[])

  console.log("CartContext ran!");
  return (
    <CartContext.Provider
      value={{
        items: items,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        setItemQuantity: setItemQuantityHandler,
        menu: menu,
        clearCart: clearCartHandler
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
