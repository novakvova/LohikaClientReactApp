import { UserInfo } from '../types';

export enum UsersActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

export interface GetAllUsers {
  data: Array<UserInfo>;
  status: number;
}

export interface FetchUsersAction {
  type: UsersActionTypes.FETCH_USERS;
}

export interface FetchSuccessUsersAction {
  type: UsersActionTypes.FETCH_USERS_SUCCESS;
  payload: Array<UserInfo>;
}

export interface FetchErrorUsersAction {
  type: UsersActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

export type UsersActions =
  | FetchUsersAction
  | FetchSuccessUsersAction
  | FetchErrorUsersAction;