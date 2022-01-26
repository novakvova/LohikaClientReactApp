import { Dispatch } from "react";
import http from "../../../../http_common";
import { GetSearchNewsActions, GetSearchNewsActionTypes, SearchNews, Searchrequest } from './types';

const getSearchNews = (requestData: Searchrequest) => {
  return async (dispatch: Dispatch<GetSearchNewsActions>) => {
    try {
      dispatch({
        type: GetSearchNewsActionTypes.GET_SEARCH_NEWS,
      });

      const response = await http.get<SearchNews>("api/Blogs/search",{params: {...requestData}});
      const { data } = response;

      dispatch({
        type: GetSearchNewsActionTypes.GET_SEARCH_NEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GetSearchNewsActionTypes.GET_SEARCH_NEWS_ERROR,
      });
    }
  };
};

export default getSearchNews;
