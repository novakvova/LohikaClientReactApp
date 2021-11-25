import { Dispatch } from "react";
import http from "../../http_common";
import { CarAction, CarActionTypes } from "../../types/car";

export const fetchCars = () => {
    return async (dispatch: Dispatch<CarAction>) => {
        try {
            dispatch({type: CarActionTypes.FETCH_CARS});
            const responce = await http.get('api/Products/list');
            dispatch({type: CarActionTypes.FETCH_CARS_SUCCESS, payload: responce.data});
        }
        catch(error) {
            dispatch({type: CarActionTypes.FETCH_CARS_ERROR, payload: "Error"});
        }
    }
}