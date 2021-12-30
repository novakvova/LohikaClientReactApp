import * as yup from "yup"

export const CreateCategorySchema = yup.object({
  title: yup.string().required("Поле не повинне бути пустим"),
  urlSlug: yup.string().required("Поле не повинне бути пустим"),
  image: yup.array().min(1, "Виберіть аватар").nullable(),
  priority: yup.string().required("Поле не повинне бути пустим"),
});
