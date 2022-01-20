import { Dispatch } from 'react';
import { IEditorValues, NewsActions, NewsActionTypes, PhotoObj } from './types';
import http from "../../../http_common";

export const addNews = (data: IEditorValues) => {
  return async (dispatch: Dispatch<NewsActions>) => {
    try {
      dispatch({
        type: NewsActionTypes.ADD_NEWS,
      });

      await http.post("api/Blogs/add", data);

      dispatch({
        type: NewsActionTypes.ADD_NEWS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: NewsActionTypes.ADD_NEWS_ERROR,
      });
    }
  };
};

export const getNews = () => {
  return async (dispatch: Dispatch<NewsActions>) => {
    try {
      dispatch({
        type: NewsActionTypes.GET_NEWS,
      });

      const response = await http.get<Array<IEditorValues>>("api/Blogs/list");
	  const { data } = response;
	  console.log(data);
	  
      dispatch({
        type: NewsActionTypes.GET_NEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NewsActionTypes.GET_NEWS_ERROR,
      });
    }
  };
};

export const uploadImages = (image: string) => {
  return async (dispatch: Dispatch<NewsActions>) => {
    try {
      dispatch({
        type: NewsActionTypes.SET_IMG,
      });
      const response = await http.post<Array<PhotoObj>>("api/Blogs/upload", {
        image,
      });
      const { data } = response;
      dispatch({
        type: NewsActionTypes.SET_IMG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NewsActionTypes.GET_NEWS_ERROR,
      });
    }
  };
};