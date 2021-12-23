import { Dispatch } from "react";
import http from "../../../http_common";
import { AxiosError } from "axios";
import { AddCategoriesAction, AddCategoryTypes, IAddCategory } from "./types";


export const addNewCategory = (data: IAddCategory) => {
  return (dispatch: Dispatch<AddCategoriesAction>) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value as string)
    );

    console.log(formData)

    dispatch({ type: AddCategoryTypes.ADD_CATEGORY });
    http
      .post("api/Categories/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({
          type: AddCategoryTypes.ADD_CATEGORY_SUCCESS,
          payload: response.status,
        });
        console.log(response.status)
        dispatch({ type: AddCategoryTypes.ADD_CATEGORY_SUCCESS_STOP });

      })
      .catch((error) => {
        dispatch({
          type: AddCategoryTypes.ADD_CATEGORY_ERROR,
          payload: (error as AxiosError).message,
        });
      });
  };
};
