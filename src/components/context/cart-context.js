import React from "react";

const CartContext = React.createContext({
    items: new Map(),
    menu: new Map(),
    addItem: () => {},
    removeItem: () => {},
    setItemQuantity: () => {},
    clearCart: () => {}
})

export default CartContext;