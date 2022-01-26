import { Dispatch } from "react";
import { AddNewsActions, AddNewsActionTypes } from "./types";
import http from "../../../../http_common";
import { IEditorValues } from '../types';

 const addNews = (data: IEditorValues) => {
  return async (dispatch: Dispatch<AddNewsActions>) => {
    try {
      dispatch({
        type: AddNewsActionTypes.ADD_NEWS,
      });
      
      await http.post("api/Blogs/add", data);

      dispatch({
        type: AddNewsActionTypes.ADD_NEWS_SUCCESS,
      });

    } catch (error) {
      dispatch({
        type: AddNewsActionTypes.ADD_NEWS_ERROR,
      });
    }
  };
};
export default addNews;