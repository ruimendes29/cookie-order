import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${classes["ipt-holder"]}`}>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        className={`${classes.ipt} ${
          props.forInput.isInputInvalid ? classes.invalid : ""
        }`}
        pattern={props.pattern}
        value={props.forInput.enteredValue}
        onChange={props.forInput.valueChanged}
        onBlur={props.forInput.touchedHandler}
        type={props.type}
        key={props.name}
      />
      {props.forInput.isInputInvalid && (
        <div className={`${classes.error}`}>{props.error}</div>
      )}
    </div>
  );
};

export default Input;
