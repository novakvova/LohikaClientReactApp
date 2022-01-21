import { IEditorValues } from '../types';

export enum GetInfoNewsActionTypes {
  GET_INFO = "GET_INFO",
  GET_INFO_SUCCESS = "GET_INFO_SUCCESS",
  GET_INFO_ERROR = "GET_INFO_ERROR",
}

export interface GetInfo {
  type: GetInfoNewsActionTypes.GET_INFO;
}

export interface GetInfoNewsSuccess {
  type: GetInfoNewsActionTypes.GET_INFO_SUCCESS;
  payload: IEditorValues;
}

export interface GetInfoNewsError {
  type: GetInfoNewsActionTypes.GET_INFO_ERROR;
}

export type GetInfoNewsNewsActions = GetInfo | GetInfoNewsSuccess | GetInfoNewsError;
