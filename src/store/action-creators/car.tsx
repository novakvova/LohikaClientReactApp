import { Dispatch } from "react";
import http from "../../http_common";
import { CarAction, CarActionTypes, ICarSearchList } from "../../types/car";

export const fetchCars = () => {
  return async (dispatch: Dispatch<CarAction>) => {
    try {
      dispatch({ type: CarActionTypes.FETCH_CARS });
      const responce = await http.get("api/Products/list");
      dispatch({
        type: CarActionTypes.FETCH_CARS_SUCCESS,
        payload: responce.data,
      });
    } catch (error) {
      dispatch({ type: CarActionTypes.FETCH_CARS_ERROR, payload: "Error" });
    }
  };
};


export const fetchCarsSearch =
  (searchStr: string) => async (dispatch: Dispatch<CarAction>) => {
    try {
      const response = await http.post<ICarSearchList>(
        "api/Products/search",
        searchStr
      );

      dispatch({
        type: CarActionTypes.FETCH_SEARCH_CARS,
        payload: response.data,
      });

      console.log("response search" , response);
      return Promise.resolve();
      
    } catch (error) {
      console.log(error)
      return Promise.reject();
    }
  };
