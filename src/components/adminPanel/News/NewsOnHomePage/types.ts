import { IEditorValues } from '../types';

export enum GetNewsActionTypes {
  GET_NEWS = "GET_NEWS",
  GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS",
  GET_NEWS_ERROR = "GET_NEWS_ERROR",
}

export interface GetNews {
  type: GetNewsActionTypes.GET_NEWS;
}

export interface GetNewsSuccess {
  type: GetNewsActionTypes.GET_NEWS_SUCCESS;
  payload: Array<IEditorValues>;
}

export interface GetNewsError {
  type: GetNewsActionTypes.GET_NEWS_ERROR;
}

export type GetNewsActions = GetNews | GetNewsSuccess | GetNewsError;