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

