export enum RecoverUserActionTypes {
  RECOVER_USER = "RECOVER_USER",
  RECOVER_USER_SUCCESS = "RECOVER_USER_SUCCESS",
  RECOVER_USER_ERROR = "RECOVER_USER_ERROR",
};

export interface InitValues {
	email: string
};

export interface RecoverPasswordState {
	loading: boolean
}

export interface SuccessRequest {
	status: number
}

export interface ResetPasswordRequest {
  userId: string | null;
  token: string | null;
  password: string;
  confirmPassword: string;
}

export interface InitResetValues {
  password: string;
  confirmPassword: string;
};


export interface RecoverUserAction {
  type: RecoverUserActionTypes.RECOVER_USER;
};

export interface RecoverUserSuccessAction {
  type: RecoverUserActionTypes.RECOVER_USER_SUCCESS;
};

export interface RecoverUserErrorAction {
  type: RecoverUserActionTypes.RECOVER_USER_ERROR;
};

export type RecoverUserActions = 
	| RecoverUserAction 
	| RecoverUserSuccessAction 
	| RecoverUserErrorAction;