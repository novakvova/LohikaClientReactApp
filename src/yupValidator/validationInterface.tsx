export  interface IRegisterValidation {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ILoginValidation {
  email?: string;
  password?: string;
}

export interface IErors {
  message: string;
  name: string;
}

export interface IValidation {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
  phone?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}