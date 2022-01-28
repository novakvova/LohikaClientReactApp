import classes from "./CarCard.module.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import CardButtonToCart from "./CardButtonToCart";
import CartButtonAdd from "./CardButtonAdd";
import { CarCardProps } from "./types";

import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  price,
  categoryName,
  inCart,
  images,
}) => {
  const [count, setCount] = useState("1");
  const { addItemToCart, showCart, downloadCartData } = useActions();
  const { isAuth } = useTypedSelector((store) => store.auth);

  const navigator = useNavigate();

  const countHandler = (value: string) => {
    setCount(value);
  };
  const addItemToCartHandler = async () => {
    await addItemToCart(id, +count);
    downloadCartData();
  };

  return (
    <div className={`card ${classes.carCard} mt-3 pt-3`}>
      {/* {images[0] && (
        <img
          src={`https://vovalohika.tk/images/600_${images[0]}?${uuid()}`}
          className={`card-img-top  mt-2 rounded-3 ${classes.cardImg}`}
          alt={name}
        />
      )} */}
      {images[0] && (
        <div
          id={`carouselExampleControls${id}`}
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {images.map((item, idx) => {
              return (
                <div
                  key={item}
                  className={
                    idx === 0 ? "carousel-item active" : "carousel-item"
                  }
                >
                  <img
                    src={`https://vovalohika.tk/images/600_${item}?${uuid()}`}
                    className={`d-block w-100 card-img-top  mt-2 rounded-3 ${classes.cardImg}`}
                    alt={name}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselExampleControls${id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselExampleControls${id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}

      {!images[0] && (
        <div className={`${classes.cardImgMock}`}>
          <i className={`fa fa-car fa-5x `}></i>
        </div>
      )}

      <div className="card-body overflow-hidden">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Ціна: {price} $ </p>
        <p className="card-text">Категорія: {categoryName} </p>
        <div className="row">
          {isAuth && (
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
          )}
        </div>
        <div className="row">
          <div className="col-6 input-group mb-3 ">
            <button
              onClick={() => {
                navigator(`/cars/${id}`);
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
