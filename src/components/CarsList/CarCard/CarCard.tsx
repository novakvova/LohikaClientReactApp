import classes from "./CarCard.module.css";

import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import CardButtonToCart from "./CardButtonToCart";
import CartButtonAdd from "./CardButtonAdd";
import { CarCardProps } from "./types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";


const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  price,
  image,
  inCart,
}) => {
  const [count, setCount] = useState("1");
  const { addItemToCart, showCart } = useActions();
  // const { isAuth } = useTypedSelector((store) => store.auth);

  const countHandler = (value: string) => {
    setCount(value);
  };
  const addItemToCartHandler = async () => {
    await addItemToCart(id, +count);
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
          <div className="col-6 input-group mb-3 ">
            {!inCart && (
              <>
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
                <CartButtonAdd onClick={addItemToCartHandler} />
              </>
            )}
            {inCart && <CardButtonToCart onClick={showCart} />}
          </div>
        </div>
        <div className="row">
          <div className="col-6 input-group mb-3 ">
            <button
              onClick={() => {
                console.log("product id =>", id);
              }}
              type="button"
              className="w-100 btn btn-outline-success d-flex justify-content-around align-items-center fw-bold"
            >
              Докладніше про товар
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
