import { Dispatch } from "react";
import { DelNewsActions, DelNewsActionTypes, DelResponse } from "./types";
import http from "../../../../http_common";


const delNews = (id: number):any => {
  return async (dispatch: Dispatch<DelNewsActions>) => {
    try {
      dispatch({
        type: DelNewsActionTypes.DEL_NEWS,
      });
      console.log(id);
      
      const response = await http.delete<DelResponse>(`api/Blogs/delete/${id}`);
      const { status } = response;  

      dispatch({
        type: DelNewsActionTypes.DEL_NEWS_SUCCESS,
        payload: id,
      });
     return Promise.resolve<number>(status)
    } catch (error) {
      Promise.reject(400)
      dispatch({
        type: DelNewsActionTypes.DEL_NEWS_ERROR,
      });
    }
  };
};

export default delNews;
