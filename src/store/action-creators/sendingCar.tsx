import { Dispatch } from "react";
import http from "../../http_common";
import {
  SendingAction,
  SendingCarTypes,
  ISendingCar,
} from "../../types/carSending";

export const sendCar = (data: ISendingCar, image: any) => {
  return async (dispatch: Dispatch<SendingAction>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    formData.append("image", image as string);

    try {
      dispatch({ type: SendingCarTypes.SENDING_CAR });
      const responce = await http.post("api/Products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: SendingCarTypes.SENDING_CAR_SUCCESS,
        payload: responce.status,
      });
      dispatch({ type: SendingCarTypes.SENDING_CAR_SUCCESS_STOP_NAV });
    } catch (error) {
      dispatch({ type: SendingCarTypes.SENDING_CAR_ERROR, payload: "Error" });
    }
  };
};
