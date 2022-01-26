import { IEditorValues } from '../types';

export enum GetSearchNewsActionTypes {
  GET_SEARCH_NEWS = "GET_SEARCH_NEWS",
  GET_SEARCH_NEWS_SUCCESS = "GET_SEARCH_NEWS_SUCCESS",
  GET_SEARCH_NEWS_ERROR = "GET_SEARCH_NEWS_ERROR",
}

export interface GetSearchNews {
  type: GetSearchNewsActionTypes.GET_SEARCH_NEWS;
}

export interface GetSearchNewsSuccess {
  type: GetSearchNewsActionTypes.GET_SEARCH_NEWS_SUCCESS;
  payload: SearchNews;
}

export interface GetSearchNewsError {
  type: GetSearchNewsActionTypes.GET_SEARCH_NEWS_ERROR;
}

export type GetSearchNewsActions = GetSearchNews | GetSearchNewsSuccess | GetSearchNewsError;

export interface SearchNews {
  products: IEditorValues[];
  pages: number;
  currentPage: number;
  total: number;
}

export interface Searchrequest {
  pageSize: number;
  Page: number;
}