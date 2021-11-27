import * as yup from "yup";

const validationFields = (field:string) => {

	switch (field) {
    case "email":
      return yup.object().shape({
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
    case "firstName":
      return yup.object().shape({
        firstName: yup.string().required({
          message: "Поле не повинне бути пустим",
          name: "firstName",
        }),
      });
    case "lastName":
      return yup.object().shape({
        lastName: yup.string().required({
          message: "Поле не повинне бути пустим",
          name: "lastName",
        }),
      });
    case "photo":
      return yup.object().shape({
        photo: yup.string().required({
          message: "Поле не повинне бути пустим",
          name: "photo",
        }),
      });
    case "phone":
      return yup.object().shape({
        phone: yup
          .string()
          .matches(
            /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
            () => ({
              message: "Невірний формат",
              name: "phone",
            })
          )
          .required({
            message: "Поле не повинне бути пустим",
            name: "phone",
          }),
      });
    case "password":
      return yup.object().shape({
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
          .required({
            message: "Поле не повинне бути пустим",
            name: "password",
          }),
      });
    case "confirmPassword":
      return yup.object().shape({
        confirmPassword: yup
          .string()
          .required({
            message: "Поле не повинне бути пустим",
            name: "confirmPassword",
          }),
      });

    default:
      return yup.object().shape({})
  }


};
export default validationFields;
