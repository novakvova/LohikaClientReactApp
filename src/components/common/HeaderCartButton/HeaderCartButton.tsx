import * as React from "react";


import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton: React.FC = () => {
  const { showCart} = useActions();
  const {totalCount} = useTypedSelector(store => store.cart)
  

  
  
    
  return (
    <button
      className={classes.button}
      onClick={showCart}
    >
      <span className={classes.icon}>
        <div className="mh-20"><CartIcon /></div>
        
      </span>
      <span>Кошик</span>
      <span className={classes.badge}>{totalCount}</span>
    </button>
  );
};

export default HeaderCartButton;
