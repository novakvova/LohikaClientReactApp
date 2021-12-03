export enum RegisterActionTypes {
  REGISTER_START = "REGISTER_START",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
}

export interface RegisterState {
	data: string,
	isRegisterd:boolean,
}

export interface RegisterStartAction {
  type: RegisterActionTypes.REGISTER_START;
}

export interface RegisterSuccessAction {
  type: RegisterActionTypes.REGISTER_SUCCESS;
  payload: string;
}

export type RegisterAction =
  | RegisterStartAction
  | RegisterSuccessAction
;



export interface IRegister {
  firstName?: string ;
  lastName?: string ;
  email?: string;
  photo?: FileList[];
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export type RegisterError = {
  firstName?: Array<string>,
  lastName?: Array<string>,
  photo?: Array<string>,
  phone?: Array<string>,
  email?: Array<string>, 
  password?: Array<string>, 
  confirmPassword?: Array<string>, 
  error?: string 
};

export interface Pasword {
  key: string;
  value: string;
}

export type RegisterErrors = {
  errors: RegisterError,
  status: number, 
};


