import { ILogin } from "./interface";

const validateEmail = (email: string | undefined): ILogin | undefined => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) {
    return {
      email: "Поле не повинне бути пустим",
    };
  }
  if (!re.test(email.toLowerCase())) {
    return {
      email: "Некоректний Email",
    };
  }
};

const validatePassword = (password: string | undefined): ILogin | undefined => {
  if (!password) {
    return {
      password: "Поле не повинне бути пустим",
    };
  }
  if (password.length < 5)
    return {
      password: "Пароль має містити мінімум 5 символів",
    };
};


 export const validationForm = (loginData: ILogin) => {
   const email = validateEmail(loginData.email);
   const password = validatePassword(loginData.password);

   const errors: ILogin = { ...email, ...password };
   
    return errors
 }

