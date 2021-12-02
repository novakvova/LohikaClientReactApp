import CartIcon from "../common/HeaderCartButton/CartIcon";

import classes from "./CarCard.module.css";
import classesIcon from "../common/HeaderCartButton/HeaderCartButton.module.css";

import { useState } from "react";
import { useActions } from "../../hooks/useActions";

interface CarCArdProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const CarCard: React.FC<CarCArdProps> = ({ id, name, price, image }) => {
  const [count, setCount] = useState("1");
  const [showLoader, setShowLoader] = useState(false);
  const {downloadDataToCart, uploadDataToCart} = useActions()

  const countHandler = (value: string) => {
    setCount(value);
  };

  const uploadItemToCartHandler = async () => {
    setShowLoader(true);
    await uploadDataToCart(id, +count);// dispatch(uploadDataToCart(id, +count));
    downloadDataToCart();
    setShowLoader(false);
  };

  return (
    <div className={`card ${classes.carCard} mt-3`}>
      <img
        src={`https://vovalohika.tk${image}`}
        className={`card-img-top  mt-2 rounded-3 ${classes.cardImg}`}
        alt={name}
      />
      <div className="card-body overflow-hidden">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Ціна: {price} $ </p>
        <div className="row">
          <div className="col input-group mb-3 ">
            
            <input
              type="number"
              className=" form-control text-center"
              min="1"
              defaultValue="1"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                countHandler(event.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary w-80 d-flex justify-content-between fw-bold"
              type="button"
              id="button-addon2"
              onClick={uploadItemToCartHandler}
            >
              <div className={classesIcon.icon}>
                <CartIcon />
              </div>

              {!showLoader && <div>В кошик</div>}
              {showLoader && <div>Дадаємо</div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
