import { Dispatch } from "react";
import http from "../../http_common";
import { ICartData } from "../Cart/types";
import {
  CarAction,
  CarActionTypes,
  ICarSearchList,
  ISearchProduct,
} from "./types";

export const fetchCars = () => {
  return async (dispatch: Dispatch<CarAction>) => {
    try {
      dispatch({ type: CarActionTypes.FETCH_CARS });
      const response = await http.get<Array<ICartData>>("api/Products/list");

      dispatch({
        type: CarActionTypes.FETCH_CARS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: CarActionTypes.FETCH_CARS_ERROR, payload: "Error" });
    }
  };
};

export const fetchCarsSearch =
  (searchParams: ISearchProduct) => async (dispatch: Dispatch<CarAction>) => {
    // console.log(searchParams);
    try {
      const response = await http.get<ICarSearchList>("api/Products/search", {
        params: searchParams,
      });
      // console.log(response.data);
      dispatch({
        type: CarActionTypes.SEARCH_CARS,
        payload: response.data,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
