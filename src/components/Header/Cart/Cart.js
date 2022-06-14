import React, { useContext, useState, useMemo } from "react";
import reactDom from "react-dom";
import classes from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../context/cart-context";
import CartModal from "./CartModal";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items, menu } = cartCtx;
  const cartValue = useMemo(() => {
    return Array.from(items).reduce((previousValue, [k, v]) => {
      return previousValue + menu.get(k) * v;
    }, 0);
  }, [items, menu]);
  console.log("Cart runed!");
  return (
    <React.Fragment>
      <button
        onClick={() => {
          setShowModal((p) => !p);
        }}
        className={classes["cart-holder"]}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        <div className={classes["cart-value"]}>{cartValue.toFixed(2)}</div>
        <div className={classes["cart-items"]}>
          {Array.from(items).reduce((previousValue, [k, v]) => {
            return previousValue + v;
          }, 0)}
        </div>
      </button>
      {showModal &&
        reactDom.createPortal(
          <CartModal onCloseModal={()=>setShowModal(false)}/>,
          document.getElementById("modal-cart")
        )}
    </React.Fragment>
  );
};

export default Cart;
