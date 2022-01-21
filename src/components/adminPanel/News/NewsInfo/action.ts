import { Dispatch } from "react";
import { GetInfoNewsActionTypes, GetInfoNewsNewsActions } from "./types";
import http from "../../../../http_common";
import { IEditorValues } from '../types';


const getInfoNews = (slug: string) => {
  return async (dispatch: Dispatch<GetInfoNewsNewsActions>) => {
    try {
      dispatch({
        type: GetInfoNewsActionTypes.GET_INFO,
      });
      const result = await http.get<IEditorValues>(`api/Blogs/get/${slug}`);
	  const { data } = result;

      dispatch({
        type: GetInfoNewsActionTypes.GET_INFO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GetInfoNewsActionTypes.GET_INFO_ERROR,
      });
    }
  };
};
export default getInfoNews;
