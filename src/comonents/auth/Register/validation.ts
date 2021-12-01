import { IRegister } from "./interface";

const validateEmail = (email: string): IRegister | undefined  => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email.toLowerCase())) {
    return {
      email: "Некоректний Email",
    };
  }
};

const validatePassword = (password: string): IRegister | undefined => {
  if (password.length < 5)
    return {
      password: "Пароль має містити мінімум 5 символів",
    };
};


export const validationForm = (registerData: IRegister): IRegister => {
  let errors: IRegister = {};

  Object.entries(registerData).forEach(([key, value]) => {
    if (!value) {
      errors = {
        ...errors,
        [key]: "Поле не повинно бути пустим",
      };
    }
	if (value && key==="password"){
		const password = validatePassword(value);
		errors = {...errors, ...password}
	}
	if (value && key === "email") {
		const email = validateEmail(value);
		errors = { ...errors, ...email };
	}
	
  });

  return errors;
};
