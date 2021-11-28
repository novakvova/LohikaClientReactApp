export enum RegisterActionTypes {
  REGISTER_START = "REGISTER_START",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_ERROR = "REGISTER_ERROR",
}

export interface RegisterState {
	data: string,
	isRegisterd:boolean,
	error: string
}

export interface RegisterStartAction {
  type: RegisterActionTypes.REGISTER_START;
}

export interface RegisterSuccessAction {
  type: RegisterActionTypes.REGISTER_SUCCESS;
  payload: string;
}

export interface RegisterErrorAction {
  type: RegisterActionTypes.REGISTER_ERROR
  payload: string;
}

export type RegisterAction =
  | RegisterStartAction
  | RegisterSuccessAction
  | RegisterErrorAction;
