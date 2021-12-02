import { Dispatch } from "react";
import http from "../../http_common";
import { CartAction, CartActionTypes } from "../../types/cart";

interface IRespData {
  id: number;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
}

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

export const uploadDataToCart =
  (id: number, quantity: number) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const responseAdd = await http.post<IRespData>("api/Carts/add", {
        productId: id,
        quantity: quantity,
      });
      console.log("What returns", responseAdd.data);
      dispatch({ type: CartActionTypes.ADD_CAR_TO_CART });

      downloadDataToCart();

      return new Promise((resolve) => {
        resolve(responseAdd.data);
      });
    } catch {
      Promise.reject();
    }
  };
