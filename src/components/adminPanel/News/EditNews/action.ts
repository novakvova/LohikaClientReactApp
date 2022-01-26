import { Dispatch } from "react";
import { EditNewsActions, EditNewsActionTypes } from "./types";
import http from "../../../../http_common";
import { IEditorValues } from '../types';

 const editNews = (data: IEditorValues) => {
  return async (dispatch: Dispatch<EditNewsActions>) => {
    try {
      dispatch({
        type: EditNewsActionTypes.EDIT_NEWS,
      });
        const obj = { ...data };
            if (data.image.endsWith("jpeg")) {
              obj.image = "";
            }
            console.log(obj);
            
      await http.put("api/Blogs/edit", obj);
      

      dispatch({
        type: EditNewsActionTypes.EDIT_NEWS_SUCCESS,
        payload: data
      });

    } catch (error) {
      dispatch({
        type: EditNewsActionTypes.EDIT_NEWS_ERROR,
      });
    }
  };
};
export default editNews;