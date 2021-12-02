
export enum DeleteUserActionTypes {
  DELETE_USER = "DELETE_USER",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_ERROR = "DELETE_USER_ERROR",
}

export interface DeleteUserAction {
  type: DeleteUserActionTypes.DELETE_USER;
}

export interface DeleteSuccessUserAction {
  type: DeleteUserActionTypes.DELETE_USER_SUCCESS;
  payload: number
}

export interface DeleteErrorUserAction {
  type: DeleteUserActionTypes.DELETE_USER_ERROR;
  payload: string;
}

export type DeleteUserActions =
  | DeleteUserAction
  | DeleteSuccessUserAction
  | DeleteErrorUserAction;