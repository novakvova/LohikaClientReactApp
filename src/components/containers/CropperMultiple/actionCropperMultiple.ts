import { Dispatch } from "react";
import http_common from "../../../http_common";
import { CarActionTypes, UploadCarImageAction } from "../../CarsList/types";
import { ICropperImage } from "./types";

export const uploadCarImage = (imageData: string): any => {
  return async (dispatch: Dispatch<UploadCarImageAction>) => {
    try {
      const response = await http_common.post<ICropperImage>(
        "api/Products/upload",
        {
          image: imageData,
        }
      );
      const { data } = response;
      dispatch({
        type: CarActionTypes.UPLOAD_CAR_IMAGE,
      });

      return Promise.resolve<number>(data.id);
    } catch (err) {
      console.log(err);
    }
  };
};
