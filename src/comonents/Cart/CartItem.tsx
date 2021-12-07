import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import classes from "./Cart.module.css";

interface ICartItem {
  id: number;
  productImage: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

const CartItem: React.FC<ICartItem> = ({
  id,
  productImage,
  productName,
  productPrice,
  quantity,
}) => {
  const { editCartItem, updateCartInServer, deleteCartItem } = useActions();
  const { cartData } = useTypedSelector((store) => store.cart);

  const [inputValue, setInputValue] = useState(quantity);

  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    const newCartData = cartData.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: inputValue };
      } else {
        return item;
      }
    });
    editCartItem(newCartData);
  }, [inputValue]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      updateCartInServer(id, inputValue)
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [inputValue]);


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
    try{
      await setShowLoader(true)
      await deleteCartItem(id, cartData)
      await setShowLoader(false)
    }
    catch{

    }
    
  }

  return (
    <li className={`${classes["cart-item"]} row border-bottom mb-2 `} key={id}>
      <div className="col-3 rounded">
        <img
          className="rounded"
          src={`https://vovalohika.tk${productImage}`}
          alt={productName}
        />
      </div>
      <div className="col-3 d-flex justify-content-start align-items-center fs-3">
        {productName}
      </div>
      <div className="col-1 d-flex justify-content-start align-items-center">
        {productPrice}
      </div>
      <div className="col-3  d-flex justify-content-center align-items-center">
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
      <div className="col-2  d-flex justify-content-center align-items-center">
        <button
          onClick={onDeleteHandler}
          type="button"
          className=" w-50 h-50 btn btn-outline-danger btn-number btn-sm"
        >
          {!showLoader &&<i className="fa fa-trash fa-3x"></i>}
          {showLoader && <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>}
        </button>
      </div>
    </li>
  );
};

export default CartItem;
