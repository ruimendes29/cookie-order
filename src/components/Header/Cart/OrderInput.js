import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import CartContext from "../../context/cart-context";
import Button from "../../UI/Button";
import Input from "./Input";
import classes from "./OrderInput.module.css";

const validateNameHandler = (s) => {
  return s.trim() !== "" && !/([0-9]|_)/.test(s);
};

const OrderInput = (props) => {
  const cartCtx = useContext(CartContext);
  const nameInput = useInput(validateNameHandler);
  const emailInput = useInput((e) => e.includes("@"));
  const addressInput = useInput((e) => e.trim() !== "");
  const phoneInput = useInput(
    (e) => /[0-9]{9}/.test(e) && e.match(/[0-9]{9}/)[0] === e
  );
  const [checkingOut, setCheckingOut] = useState(false);

  const [postOrderInfo, sendPostOrder] = useHttp();

  const formValid =
    nameInput.isValueValid &&
    emailInput.isValueValid &&
    addressInput.isValueValid &&
    phoneInput.isValueValid;
  return (
    <form className={`${classes.form}`}>
      <Input
        error="Must not be empty or contain any non-letter character"
        name="Name"
        type="text"
        forInput={nameInput}
      />
      <Input
        error="Must contain an @"
        name="Email"
        type="email"
        forInput={emailInput}
      />
      <Input
        error="Must not be empty"
        name="Address"
        type="text"
        forInput={addressInput}
      />
      <Input
        error="Must have 9 numbers (ex: 987654321)"
        name="Phone"
        type="tel"
        pattern="[0-9]{9}"
        forInput={phoneInput}
      />
      {!checkingOut && (
        <Button
          className={`${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            setCheckingOut(true);
          }}
          disabled={!formValid}
        >
          Submit Order
        </Button>
      )}
      {checkingOut && (
        <div className={`${classes.confirmation}`}>
          <div className={`${classes.text}`}>Are you sure?</div>
          <Button
            className={`${classes.btn}`}
            onClick={(e) => {
              e.preventDefault();
              const reqConfigPostOrder = {
                url: "https://react-meals-69202-default-rtdb.firebaseio.com/orders.json",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: {
                  name: nameInput.enteredValue,
                  email: emailInput.enteredValue,
                  address: addressInput.enteredValue,
                  phone: phoneInput.enteredValue,
                  items: Array.from(cartCtx.items),
                },
              };
              sendPostOrder(reqConfigPostOrder);
              cartCtx.clearCart();
              nameInput.resetHandler();
              emailInput.resetHandler();
              addressInput.resetHandler();
              phoneInput.resetHandler();
              props.onSubmit();
            }}
          >
           {!postOrderInfo.isLoading?"Yes":<FontAwesomeIcon className="fa-spin" icon={faCircleNotch}/>}
          </Button>
          <Button
            className={`${classes.btn}`}
            onClick={(e) => {
              e.preventDefault();
              setCheckingOut(false);
            }}
          >
            No
          </Button>
        </div>
      )}
    </form>
  );
};

export default OrderInput;
