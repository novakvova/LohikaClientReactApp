import * as yup from "yup";

export const EditCategorySchema = yup.object({
  id: yup.number().required(),
  title: yup.string().required("Поле не повинне бути пустим"),
  urlSlug: yup.string().required("Поле не повинне бути пустим"),
  image: yup.array().nullable(),
  priority: yup
    .string().required("Поле не повинне бути пустим")
});
