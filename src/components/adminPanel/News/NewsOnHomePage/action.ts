import { Dispatch } from "react";
import { GetNewsActions, GetNewsActionTypes } from "./types";
import http from "../../../../http_common";
import { IEditorValues } from '../types';

const getNews = () => {
  return async (dispatch: Dispatch<GetNewsActions>) => {
    try {
      dispatch({
        type: GetNewsActionTypes.GET_NEWS,
      });

      const response = await http.get<Array<IEditorValues>>("api/Blogs/list");
      const { data } = response;

      dispatch({
        type: GetNewsActionTypes.GET_NEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GetNewsActionTypes.GET_NEWS_ERROR,
      });
    }
  };
};

export default getNews;
