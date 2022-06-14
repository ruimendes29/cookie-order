import React, { useContext, useState, useCallback } from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "./CartModal.module.css";
import Card from "../../UI/Card";
import CartContext from "../../context/cart-context";
import ItemsOrdered from "./ItemsOrdered";
import OrderInput from "./OrderInput";

const CartModal = (props) => {
  const [orderMade, setOrderMade] = useState(false);
  const [toCircle, setToCircle] = useState(false);
  const handleOnOrder = useCallback(() => {
    setOrderMade(true);
  }, []);
  const cartCtx = useContext(CartContext);
  return (
    <Modal onCloseModal={props.onCloseModal}>
      <Card className={`${classes.card} ${toCircle ? classes.toCircle : ""}`}>
        {!orderMade && cartCtx.items.size > 0 && (
          <ItemsOrdered onOrder={handleOnOrder} />
        )}
        {!orderMade && cartCtx.items.size === 0 && (
          <h3 className={classes["no-items"]}>
            There are no items in the Cart at the moment!
            <br />
            <br />
            Try adding some ;)
          </h3>
        )}
        {orderMade && (
          <OrderInput
            onSubmit={() => {
              setTimeout(() => {
                props.onCloseModal();
              }, 2000);
              setToCircle(true);
            }}
          />
        )}
      </Card>
    </Modal>
  );
};

export default CartModal;
