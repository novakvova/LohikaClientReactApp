import { IRegister, Pasword, RegisterError } from "./types";

const validateEmail = (email: string):RegisterError | undefined => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email.toLowerCase())) {
    return {
      email: ["Некоректний Email"],
    };
  }
};

const validatePassword = (password: Pasword): RegisterError | undefined => {
  const { key, value } = password;
  if (value.length < 5)
    return {
      [key]: ["Пароль має містити мінімум 5 символів"],
    };
};

export const validationForm = (registerData: IRegister): RegisterError => {
  let errors: RegisterError = {};

  Object.entries(registerData).forEach(([key, value]) => {
    if (!value) {
      errors = {
        ...errors,
        [key]: ["Поле не повинно бути пустим"],
      };
    }

    if (value && (key === "password" || key === "confirmPassword")) {
      const password = validatePassword({ key, value });
      errors = { ...errors, ...password };
    }
    
    if (value && key === "email") {
      const email = validateEmail(value);
      errors = { ...errors, ...email };
    }
  });

  const { password, confirmPassword} = registerData;

  if (password !== confirmPassword) {
     errors = {
       ...errors,
       password: ["Паролі повинні співпадати"],
       confirmPassword: ["Паролі повинні співпадати"],
     };
  }
 return errors
 
};
