import classes from "./Cart.module.css";
import Modal from "../containers/Modal/Modal";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CartItems from "./CartItems";
import { useEffect } from "react";

const Cart = () => {
  const { hideCart} = useActions();
  const { cartData } = useTypedSelector((store) => store.cart);

  // const totalPrice = cartData.reduce(
  //   (prevValue, currentValue) => prevValue + currentValue.productPrice?,
  //   0
  // );

  // useEffect(()=> {
  //   const identifier = setTimeout(()=> {
  //     console.log('request')
      
  //   }, 500);
  //   return () => {
  //     clearTimeout(identifier)
  //   }

  // },[cartData])
  

  return (
    <Modal onClose={hideCart}>
     <CartItems />
      <div className={classes.total}>
        <span>Загальна сумма</span>
        {/* <span>{totalPrice}</span> */}
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={hideCart}>
          Закрити
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
