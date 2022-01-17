import { Dispatch } from "react";
import http from "../../http_common";
import { IAddCar } from "./AddNewCar/types";
import {
  CarAction,
  CarActionTypes,
  DeleteCarAction,
  ICarSearchList,
  ISearchCar,
  ISearchProduct,
  UpdateCarAction,
} from "./types";



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
  (id: number): any =>
  async (dispatch: Dispatch<CarAction>) => {
    try {
      const response = await http.get<ISearchCar>(`api/Products/get/${id}`);
      const { data } = response;
      dispatch({
        type: CarActionTypes.GET_CAR_BY_ID,
        payload: response.data,
      });
     return Promise.resolve<ISearchCar>(data);
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
