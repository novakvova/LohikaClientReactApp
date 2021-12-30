import { Dispatch } from "react";
import http from "../../http_common";
import { IAddCar } from "./AddNewCar/types";
import { ICartData } from "../Cart/types";
import {
  CarAction,
  CarActionTypes,
  DeleteCarAction,
  ICarSearchList,
  ISearchCar,
  ISearchProduct,
  UpdateCarAction,
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
    try {
      const response = await http.get<ICarSearchList>("api/Products/search", {
        params: searchParams,
      });
      dispatch({
        type: CarActionTypes.SEARCH_CARS,
        payload: response.data,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };

export const fetchCarById =
  (id: number) => async (dispatch: Dispatch<CarAction>) => {
    try {
      const response = await http.get<ISearchCar>(`api/Products/get/${id}`);
      dispatch({
        type: CarActionTypes.GET_CAR_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("action => ", error);
    }
  };

export const updateCar = (data: IAddCar) => {
  return (dispatch: Dispatch<UpdateCarAction>) => {
    http
      .put("api/Products/edit", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        dispatch({ type: CarActionTypes.UPDATE_CAR });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCar = (id: number) => {
  return (dispatch: Dispatch<DeleteCarAction>) => {
    http
      .delete(`api/Products/delete/${id}`)
      .then(() => {
        dispatch({ type: CarActionTypes.DELETE_CAR, payload: id });
      })
      .catch((error) => console.log(error));
  };
};
