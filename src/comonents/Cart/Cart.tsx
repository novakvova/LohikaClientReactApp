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
      {/* <li className="row mb-2 fs-4 fw-bold ">
        <div className="col-3">Фото</div>
        <div className="col-3">Машина</div>
        <div className="col-3">Ціна</div>
        <div className="col-3">Кількість</div>
      </li> */}
      {cartData.map((car) => (
        <li className="row border-bottom mb-2" key={car.id}>
          <div className="col-3">
            <img
              src={`https://vovalohika.tk${car.productImage}`}
              alt={car.productName}
            />
          </div>
          <div className="col-3 d-flex justify-content-start align-items-center">
            {car.productName}
          </div>
          <div className="col-1 d-flex justify-content-start align-items-center">
            {car.productPrice}
          </div>
          <div className="col-1 d-flex justify-content-start align-items-center">
            {car.quantity}
          </div>
          <div className="col-4 d-flex justify-content-start align-items-center">
            <div className="row d-flex justify-content-center">
              <button type="button" className="col-4 btn btn-secondary btn-sm">
                +
              </button>
              <input type="number" className="col-4 form-control" />
              <button type="button" className="col-4 btn btn-secondary btn-number btn-sm">
                -
              </button>
            </div>
          </div>
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
