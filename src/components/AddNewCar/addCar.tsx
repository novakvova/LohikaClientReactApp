import { Dispatch } from "react";
import http from "../../http_common";
import { AxiosError } from "axios";
import { SendingAction, SendingCarTypes, IAddCar } from "./types";


export const addNewCar = (data: IAddCar) => {
  return (dispatch: Dispatch<SendingAction>) => {

    dispatch({ type: SendingCarTypes.SENDING_CAR });
    http
      .post("api/Products/add", data
      //  formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
      )
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
