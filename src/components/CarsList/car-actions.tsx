import { AxiosError } from "axios";
import { Dispatch } from "react";
import http from "../../http_common";
import { IAddCar, SendingAction, SendingCarTypes } from "../AddNewCar/types";
import { ICartData } from "../Cart/types";
import {
  CarAction,
  CarActionTypes,
  ICarSearchList,
  ISearchCar,
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

  export const fetchCarById = (id: string) => async (dispatch: Dispatch<CarAction>) => {
    try {
      const response = await http.get<ISearchCar>(`api/Products/get/${id}`);
      dispatch({
        type:CarActionTypes.GET_CAR_BY_ID,
        payload: response.data
      });

    }

    catch(error) {
      console.log('action => ', error)
    }
  }


  export const sendEditedCarToServer = (data: IAddCar) => {
    return (dispatch: Dispatch<SendingAction>) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
  
      dispatch({ type: SendingCarTypes.SENDING_CAR });
      http
        .post("api/Products/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch({
            type: SendingCarTypes.SENDING_CAR_SUCCESS,
            payload: response.status,
          });
          dispatch({ type: SendingCarTypes.SENDING_CAR_SUCCESS_STOP_NAV });
        })
        .catch((error) => {
          dispatch({
            type: SendingCarTypes.SENDING_CAR_ERROR,
            payload: (error as AxiosError).message,
          });
        });
    };
  };