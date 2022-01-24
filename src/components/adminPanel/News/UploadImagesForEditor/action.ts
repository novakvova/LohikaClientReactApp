import { PhotoObj } from '../types';
import { UploadImgActions, UploadImgActionTypes } from './types';
import { Dispatch } from "react";
import http from "../../../../http_common";

const uploadImages = (image: string) => {
  return async (dispatch: Dispatch<UploadImgActions>) => {
    try {
      dispatch({
        type: UploadImgActionTypes.SET_IMG,
      });
      const response = await http.post<Array<PhotoObj>>("api/Blogs/upload", {
        image,
      });
      const { data } = response;
      dispatch({
        type: UploadImgActionTypes.SET_IMG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UploadImgActionTypes.SET_IMG_ERROR,
      });
    }
  };
};

export default uploadImages;
