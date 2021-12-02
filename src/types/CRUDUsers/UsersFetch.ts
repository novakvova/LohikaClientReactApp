
export enum UsersActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

export interface UserInfo {
  id: number;
  firstName: string;
  image: string;
  phone: string;
  email: string;
}

export interface UsersState {
	users: Array<UserInfo>,
	loading: boolean,
	error: string | null
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



export type UsersAction =
  | FetchUsersAction
  | FetchSuccessUsersAction
  | FetchErrorUsersAction;
