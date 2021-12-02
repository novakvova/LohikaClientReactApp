export enum RegisterActionTypes {
  REGISTER_START = "REGISTER_START",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_ERROR = "REGISTER_ERROR",
}

export interface RegisterState {
	data: string,
  loading: boolean
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



export interface IRegister {
  firstName?: string ;
  lastName?: string ;
  email?: string;
  photo?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export type RegisterError = {
  firstName: Array<string>,
  lastName: Array<string>,
  photo: Array<string>,
  phone: Array<string>,
  email: Array<string>, 
  password: Array<string>, 
  confirmPassword: Array<string>, 
  error: string 
};

export type RegisterErrors = {
  errors: RegisterError,
  status: number, 
};



