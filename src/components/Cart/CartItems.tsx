import classes from "./Cart.module.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";

const CartItems = () => {
  const { cartData } = useTypedSelector((store) => store.cart);
  const [cartArr, setCartArr] = useState(cartData)

  useEffect(()=> {
    setCartArr((prevState)=> (cartData))
    
  }, [cartData])

  const cartItems = cartArr.map((cart) => (
    <CartItem
      key={cart.id}
      id={cart.id}
      productImage={cart.productImage}
      productName={cart.productName}
      productPrice={cart.productPrice}
      quantity={cart.quantity}
    />
  ))

  return (
    <ul className={classes["cart-items"]}>
      <li className="row mb-2 fs-4 fw-bold ">
        <div className="col-3">Фото</div>
        <div className="col-3">Машина</div>
        <div className="col-1">Ціна</div>
        <div className="col-3">Кількість</div>
      </li>
      {cartItems}
    </ul>
  );
};

export default CartItems;
