import classes from "./Cart.module.css";
import Modal from "../containers/Modal/Modal";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";


const Cart = () => {
  
  const { hideCart } = useActions();
  const { cartData } = useTypedSelector((store) => store.cart);

  
  const totalPrice = cartData.reduce(
    (prevValue, currentValue) => prevValue + currentValue.productPrice,
    0
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      <li className="row mb-2 fs-4 fw-bold ">
        <div className="col-4">Машина</div>
        <div className="col-4">Ціна</div>
        <div className="col-4">Кількість</div>
      </li>
      {cartData.map((car) => (
        <li className="row border-bottom mb-2" key={car.id}>
          <div className="col-4">{car.productName}</div>
          <div className="col-4">{car.productPrice}</div>
          <div className="col-4">{car.quantity}</div>
        </li>
      ))}
    </ul>
  );

  

  return (
    <Modal onClose={hideCart}>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Загальна сумма</span>
        <span>{totalPrice}</span>
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
