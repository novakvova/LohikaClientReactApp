import { Dispatch } from "react";
import http from "../../http_common";


import { CartAction, CartActionTypes } from "../../types/cart";

export const showCart = () => {
  return (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.SHOW_CART });
  };
};

export const hideCart = () => {
  return (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.HIDE_CART });
  };
};

export const downloadDataToCart = () => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      const response = await http.get("api/Carts/list");

      dispatch({
        type: CartActionTypes.FETCH_DATA_TO_CART,
        payload: response.data,
      });
    } catch {}
  };
};


export const showModalAddCarToCart = () => {
  return (dispatch: Dispatch<CartAction>) => {
    dispatch({type:CartActionTypes.SHOW_ADD_CAR_TO_CART_MODAL})
  }
}

export const hideModalAddCarToCart = () => {
  return (dispatch: Dispatch<CartAction>) => {
    dispatch({type:CartActionTypes.HIDE_ADD_CAR_TO_CART_MODAL})
  }
}

export const uploadDataToCart = (id: number, quantity: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      const responseAdd = await http.post("api/Carts/add", {
        productId: id,
        quantity: quantity,
      });
      console.log(responseAdd.data);
      dispatch({ type: CartActionTypes.ADD_CAR_TO_CART });

      const responseList= await http.get("api/Carts/list");

      dispatch({
        type: CartActionTypes.FETCH_DATA_TO_CART,
        payload: responseList.data,
      });
    } catch {
      console.log("catch");
    }
  };
};
