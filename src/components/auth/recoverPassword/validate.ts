import * as yup from "yup";

export const RecoverPasswordSchema = yup.object({
  email: yup.string()
    .email("Не коректно вказана пошта")
    .required("Вкажіть пошту"),
});


export const ResetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(5, "Пароль повинен містити мініму 5 символів")
    .matches(/[0-9a-zA-Z]/, "Пароль може містить латинські символи і цифри")
    .required("Поле не повинне бути пустим"),
  confirmPassword: yup
    .string()
    .min(5, "Пароль повинен містити мініму 5 символів")
    .oneOf([yup.ref("password"), null], () => "Паролі повинні співпадати")
    .required("Поле не повинне бути пустим"),
});

