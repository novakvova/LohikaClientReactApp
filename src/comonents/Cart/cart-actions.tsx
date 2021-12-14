import { Dispatch } from "react";
import http from "../../http_common";

import { CartAction, CartActionTypes } from "./types";

interface IRespData {
  id: number;
  productId: number;
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

export const downloadCartData = () => {
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

export const addItemToCart =
  (id: number, quantity: number) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const response = await http.post<IRespData>("api/Carts/add", {
        productId: id,
        quantity: quantity,
      });
      dispatch({ type: CartActionTypes.ADD_ITEM_TO_CART, payload: response.data });
      return Promise.resolve(response.data);
    } catch (error) {
      Promise.reject(error);
    }
  };

export const updateCartItem =
  (id: number, quantity: number) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const response = await http.put("api/Carts/edit", {
        id: id,
        quantity: quantity,
      });
      dispatch({
        type: CartActionTypes.UPDATE_CART_ITEM,
        payload: { id , quantity },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      Promise.reject(error);
    }
  };

export const deleteCartItem =
  (id: number) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const responce = await http.delete<number>(`api/Carts/delete/${id}`);
      
      dispatch({ type: CartActionTypes.DELETE_CART_ITEM, payload: id });
      return Promise.resolve(responce.data);
    } catch (error) {
      Promise.reject(error);
    }
  };
