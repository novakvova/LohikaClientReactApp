
export enum UsersActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}
export enum GetUserActionTypes {
  GET_USER = "GET_USER",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_ERROR = "GET_USER_ERROR",
}

export enum DeleteUserActionTypes {
  DELETE_USER = "DELETE_USER",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_ERROR = "DELETE_USER_ERROR",
}
export interface GetAllUsers {
  data: Array<UserInfo>;
  status: number;
}


export interface UserInfo {
  id: number;
  firstName: string;
  secondName: string,
  image: string;
  phone: string;
  email: string;
}

export interface EditUser {
  id: number;
  firstName?: string;
  secondName?: string;
  email?: string;
  image?: string | File;
  phone?: string;
}

export interface UsersState {
  users: UserInfo[];
  userData: UserInfo;
  loading: boolean;
  error: string | null;
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

export interface DeleteUserAction {
  type: DeleteUserActionTypes.DELETE_USER;
}

export interface DeleteSuccessUserAction {
  type: DeleteUserActionTypes.DELETE_USER_SUCCESS;
  payload: number;
}

export interface DeleteErrorUserAction {
  type: DeleteUserActionTypes.DELETE_USER_ERROR;
  payload: string;
}

export interface GetUserAction {
  type: GetUserActionTypes.GET_USER;
}

export interface GetSuccessUserAction {
  type: GetUserActionTypes.GET_USER_SUCCESS;
  payload: UserInfo;
}

export interface GetErrorUserAction {
  type: GetUserActionTypes.GET_USER_ERROR;
  payload: string;
}

export type DeleteUserActions =
    DeleteUserAction
  | DeleteSuccessUserAction
  | DeleteErrorUserAction;


export type UsersActions =
    FetchUsersAction
  | FetchSuccessUsersAction
  | FetchErrorUsersAction;

export type GetUserActions = 
    GetUserAction
  | GetSuccessUserAction
  | GetErrorUserAction;
  


  