export enum CreateUserActionTypes {
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
};

export interface ICreateUser {
  firstName?: string;
  secondName?: string;
  email?: string;
  photo?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export type ICreateUserError = {
  email: Array<string>;
  password: Array<string>;
  confirmPassword: Array<string>;
};

export interface IReaquestCreate extends ICreateUser {
  RecaptchaToken: string;
}

export type ICreateUserErrors = {
  errors: ICreateUserError;
  status: number;
};

export interface CreateSuccessUserAction {
  type: CreateUserActionTypes.CREATE_USER_SUCCESS;
}

export type CreateUserActions = CreateSuccessUserAction;