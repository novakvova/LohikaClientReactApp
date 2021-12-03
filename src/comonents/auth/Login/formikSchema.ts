import * as yup from "yup"

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Некоректний email")
    .required("Поле не повинно бути пустим"),
  password: yup
  	.string()
  	.required("Поле не повинно бути пустим"),
});