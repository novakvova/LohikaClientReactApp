import { UserInfo } from '../types';

export enum GetUserActionTypes {
  GET_USER = "GET_USER",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_ERROR = "GET_USER_ERROR",
};

export interface IGetUser {
  data: UserInfo;
  status: number;
};

export interface GetUserAction {
  type: GetUserActionTypes.GET_USER;
};

export interface GetSuccessUserAction {
  type: GetUserActionTypes.GET_USER_SUCCESS;
  payload: UserInfo;
};

export interface GetErrorUserAction {
  type: GetUserActionTypes.GET_USER_ERROR;
  payload: string;
};

export type GetUserActions =
  | GetUserAction
  | GetSuccessUserAction
  | GetErrorUserAction;