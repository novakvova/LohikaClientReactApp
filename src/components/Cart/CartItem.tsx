import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";

import classes from "./Cart.module.css";

interface ICartItem {
  id: number;
  productImage: string;
  productName: string;
  productPrice: number;
  quantity: number;
  images: Array<string>;
}

const CartItem: React.FC<ICartItem> = ({
  id,
  productName,
  productPrice,
  quantity,
  images,
}) => {
  const { updateCartItem, deleteCartItem } = useActions();

  const [inputValue, setInputValue] = useState(quantity);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      updateCartItem(id, inputValue);
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [inputValue, id, updateCartItem]);

  const onChangeQuantityHandler = (value: string) => {
    setInputValue(+value);
  };

  const onPlusQuantityHandler = () => {
    setInputValue((prevValue) => prevValue + 1);
  };

  const onMinusQuantityHandler = () => {
    if (inputValue === 1) {
      return;
    }
    setInputValue((prevValue) => prevValue - 1);
  };

  const onDeleteHandler = async () => {
    try {
      setShowLoader(true);
      await deleteCartItem(id);
      setShowLoader(false);
    } catch {}
  };

  return (
    <li className={classes["cart-item"]} key={id}>
      <div className={classes.cartImg}>
        <img
          src={`https://vovalohika.tk/images/600_${images[0]}`}
          alt={productName}
        />
      </div>
      <div className={classes.carIfo}>
        <div className={classes.cartName}>
          <span>{productName}</span>
        </div>
        <div className={classes.cartPrice}>
          <span>{productPrice}</span>
        </div>
        <div className={classes.cartButtons}>
          <button
            type="button"
            className="col-4 w-25 h-50 btn btn-outline-secondary btn-number btn-sm"
            onClick={onMinusQuantityHandler}
          >
            <i className="fa fa-minus fa-2x"></i>
          </button>
          <input
            type="number"
            className="col-4 w-50 h-50 form-control text-center fs-2"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChangeQuantityHandler(e.target.value);
            }}
          />
          <button
            type="button"
            className="col-4 w-25 h-50 btn btn-outline-secondary btn-sm"
            onClick={onPlusQuantityHandler}
          >
            <i className="fa fa-plus fa-2x"></i>
          </button>
        </div>
        <div className={classes.delBtn}>
          <button
            onClick={onDeleteHandler}
            type="button"
            className=" w-50 h-50 btn btn-outline-danger btn-number btn-sm"
          >
            {!showLoader && <i className="fa fa-trash fa-3x"></i>}
            {showLoader && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
