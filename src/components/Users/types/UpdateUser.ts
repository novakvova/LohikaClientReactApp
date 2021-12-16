import { UserInfo } from '../types';

export enum UpdateUserActionTypes {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR = "UPDATE_USER_ERROR",
};

export interface UpdateErrors {
  errors: {
    id?: string[];
    invalid?: string[];
  };
  status: number;
};

export interface UpdateUserAction {
  type: UpdateUserActionTypes.UPDATE_USER;
};

export interface UpdateSuccessUserAction {
  type: UpdateUserActionTypes.UPDATE_USER_SUCCESS;
  payload: UserInfo;
};

export interface UpdateErrorUserAction {
  type: UpdateUserActionTypes.UPDATE_USER_ERROR;
  payload: string;
};

export type UpdateUserActions =
  | UpdateUserAction
  | UpdateSuccessUserAction
  | UpdateErrorUserAction;