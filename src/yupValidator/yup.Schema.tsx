import * as yup from "yup";

export const schemaEmail = yup.object().shape({
  email: yup
    .string()
    .email({
      message: "Введіть коректний Email",
      name: "email",
    })
    .required({
      message: "Поле не повинне бути пустим",
      name: "email",
    }),
});

export const schema = yup.object().shape({
  email: yup
    .string()
    .email({
      message: "Введіть коректний Email",
      name: "email",
    })
    .required({
      message: "Поле не повинне бути пустим",
      name: "email",
    }),
  firstName: yup
    .string()
    .required({
      message: "Поле не повинне бути пустим",
      name: "firstName",
    }),
  lastName: yup.string().required({
    message: "Поле не повинне бути пустим",
    name: "lastName",
  }),
  avatar: yup.string().required({
    message: "Поле не повинне бути пустим",
    name: "avatar",
  }),
  phone: yup
    .string()
    .matches(/^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/, () => ({
      message: "Невірний формат",
      name: "phone",
    }))
    .required({
      message: "Поле не повинне бути пустим",
      name: "phone",
    }),
  password: yup
    .string()
    .min(5, {
      message: "Пароль повинен містити мініму 5 символів",
      name: "password",
    })
    .matches(/[0-9a-zA-Z!@#$%^&*]/gm, {
      message: "Пароль може містить латинські символи і цифри",
      name: "password",
    })
    .required({ message: "Поле не повинне бути пустим", name: "password" }),
  confirmPassword: yup
    .string()
    .min(5, {
      message: "Пароль повинен містити мініму 5 символів",
      name: "password",
    })
    .oneOf([yup.ref("password"), null], {
      message: "Паролі повинні співпадати",
      name: "confirmPassword",
    })
    .required({
      message: "Поле не повинне бути пустим",
      name: "confirmPassword",
    }),
});

