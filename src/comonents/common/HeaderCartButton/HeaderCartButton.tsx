import * as React from "react";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton: React.FC = () => {
  const { showCart} = useActions();
  const {cartData} = useTypedSelector(store => store.cart)
 
 
  const totalQuantity = cartData.reduce((prevValue, currentValue)=> prevValue+currentValue.quantity, 0)
    
  
  return (
    <button
      className={classes.button}
      onClick={showCart}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Кошик</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;
