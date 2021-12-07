import { Dispatch } from "react";
import http from "../../http_common";
import { CarAction } from "../CarsList/types";
import { CartAction, CartActionTypes } from "./types";

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

      return new Promise((resolve) => {
        resolve(responseAdd.data);
      });
    } catch {
      Promise.reject();
    }
  };

export const editCartItem =
  (newCartData: Array<any>) => (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.EDIT_CART, payload: newCartData });
  };

export const updateCartInServer =
  (id: number, quantity: number) => async (dispatch: Dispatch<CartAction>) => {
    try {
      console.log("request send");
      const response = await http.put("api/Carts/edit", {
        id: id,
        quantity: quantity,
      });
      // dispatch({type: CartActionTypes.EDIT_CART_ITEM_IN_SERVER})
      console.log("responce: ", response.data);
      return Promise.resolve();
    } catch {
      Promise.reject();
    }
  };

export const deleteCartItem =
  (id: number, prevCart:Array<any>) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const responce = await http.delete<number>(`api/Carts/delete/${id}`);
      const updatedCartData = prevCart.filter(item => item.id != id);
      dispatch({type: CartActionTypes.DELETE_CART_ITEM, payload:updatedCartData})
      return Promise.resolve();
    } catch {
      Promise.reject();
    }
  };
