import * as yup from "yup";

export const EditUserSchema = yup.object({
  id: yup.number().required(),
  email: yup
    .string()
    .email("Введіть коректний Email")
    .required("Поле не повинне бути пустим"),
  firstName: yup.string().required("Поле не повинне бути пустим"),
  secondName: yup.string().required("Поле не повинне бути пустим"),
  photo: yup.array().nullable(),
  phone: yup
    .string()
    .matches(
      /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
      "Невірний формат"
    )
    .required("Поле не повинне бути пустим"),
});
