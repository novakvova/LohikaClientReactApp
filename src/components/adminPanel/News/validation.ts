import * as yup from "yup";

export const EditorSchema = yup.object({
  name: yup.string().required("Поле не повинне бути пустим"),
  text: yup.string().required("Поле не повинне бути пустим"),
  //image: yup.string().required("Поле не повинне бути пустим"),
  slug: yup.string().required("Поле не повинне бути пустим"),
  //isSHow: yup.boolean().required(),
  dateTimePublish: yup.string().required("Поле не повинне бути пустим"),
});
