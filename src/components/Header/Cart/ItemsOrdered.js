import React,{useContext} from 'react'
import CartContext from '../../context/cart-context'
import classes from './ItemsOrdered.module.css'
import MenuItemInputs from '../../Menu/MenuItemInputs';
import Button from '../../UI/Button';

const ItemsOrdered = (props) => {
  const cartCtx = useContext(CartContext);
  return (
    <React.Fragment>
            <h3 style={{ textAlign: "center" }}>Items Ordered</h3>
            <div className={classes.items}>
              {Array.from(cartCtx.items).map(([itemN, itemQ]) => {
                return (
                  <div className={classes["cart-item"]} key={itemN}>
                    <div>
                      <div className={`${classes.name} ${classes.text}`}>
                        {itemN}
                      </div>
                      <div>{`Unity price : ${cartCtx.menu
                        .get(itemN)
                        .toFixed(2)}€`}</div>
                    </div>
                    <div className={classes.last}>
                      <MenuItemInputs className={classes.inputs} name={itemN} />
                      <div>
                        {`${(cartCtx.menu.get(itemN) * itemQ).toFixed(2)}€`}
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button className={`${classes.btn}`} onClick={props.onOrder}>Order Now!</Button>
            </div>
          </React.Fragment>
  )
}

export default ItemsOrdered