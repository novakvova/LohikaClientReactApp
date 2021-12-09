export enum UpdateUserActionTypes {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR = "UPDATE_USER_ERROR",
}

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

export enum CreateUserActionTypes {
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
}
export interface GetAllUsers {
  data: Array<UserInfo>;
  status: number;
}

export interface UpdateErrors {
  errors : {
    id?: string[],
    invalid?: string[]
  }
  status: number
}
export interface ICreateUser {
  firstName?: string;
  secondName?: string;
  email?: string;
  photo?: FileList[];
  phone?: string;
  password?: string;
  confirmPassword?: string;
}
export interface IStatus {
  status: number
}

export interface IGetUser {
  data: UserInfo,
  status: number
}

export type ICreateUserError = {
  email: Array<string>;
  password: Array<string>;
  confirmPassword: Array<string>;
};

export type ICreateUserErrors = {
  errors: ICreateUserError;
  status: number;
};

export interface UserInfo {
  id: number;
  firstName: string;
  secondName: string;
  photo: string | File;
  phone: string;
  email: string;
}

export interface UsersState {
  users: UserInfo[];
  userData: UserInfo;
  loading: boolean;
  error: string | null;
}

export interface CreateSuccessUserAction {
  type: CreateUserActionTypes.CREATE_USER_SUCCESS,
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

export interface UpdateUserAction {
  type: UpdateUserActionTypes.UPDATE_USER;
}

export interface UpdateSuccessUserAction {
  type: UpdateUserActionTypes.UPDATE_USER_SUCCESS;
  payload: UserInfo;
}

export interface UpdateErrorUserAction {
  type: UpdateUserActionTypes.UPDATE_USER_ERROR;
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
  | DeleteUserAction
  | DeleteSuccessUserAction
  | DeleteErrorUserAction;

export type UsersActions =
  | FetchUsersAction
  | FetchSuccessUsersAction
  | FetchErrorUsersAction;

export type GetUserActions =
  | GetUserAction
  | GetSuccessUserAction
  | GetErrorUserAction;

export type UpdateUserActions = 
  | UpdateUserAction
  | UpdateSuccessUserAction
  | UpdateErrorUserAction;

export type CreateUserActions = 
  | CreateSuccessUserAction;
