import React from "react";
import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes["modal-holder"]}>
      <Backdrop onClick={()=>{props.onCloseModal()}}/>
      <div className={classes.modal}>{props.children}</div>
    </div>
  );
};

export default Modal;
