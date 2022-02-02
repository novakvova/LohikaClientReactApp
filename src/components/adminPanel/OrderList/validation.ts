import * as yup from "yup";

export const orderSchema = yup.object({
  consumerFirstName: yup.string().required("Поле не повинне бути пустим"),
  consumerSecondName: yup.string().required("Поле не повинне бути пустим"),
  consumerPhone: yup
    .string()
    .matches(
      /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
      "Невірний формат"
    )
    .required("Поле не повинне бути пустим"),
  region: yup.string().required("Поле не повинне бути пустим"),
  city: yup.string().required("Поле не повинне бути пустим"),
  street: yup.string().required("Поле не повинне бути пустим"),
  homeNumber: yup.string().required("Поле не повинне бути пустим"),
  statusId: yup.number(),
  orderItems: yup.array(),
});
