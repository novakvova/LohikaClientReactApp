import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router";
import { RegisterSchema } from "./validation";
import { IRegister, RegisterError } from "./types";
import EclipseWidget from "../../common/eclipse";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import CropperComponent from "../../containers/CropperComponent/CropperComponent";
import "../Register/register.css"

const RegisterPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [bot, setBot] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const { RegisterUser } = useActions();
  const navigator = useNavigate();
  const initialValues: IRegister = {
    firstName: "",
    secondName: "",
    email: "",
    photo: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const onHandleSubmit = async (
    values: IRegister,
    { setFieldError }: FormikHelpers<IRegister>
  ) => {
   
    setLoading(true);
    try {
      if (!executeRecaptcha) {
        setBot(true);
        return;
      }
      const recapchaToken = await executeRecaptcha();
      
      await RegisterUser({ ...values, RecaptchaToken: recapchaToken });
      await navigator("/");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      const serverErrors = err as RegisterError;
      console.log(serverErrors);
      Object.entries(serverErrors).map(([key, value]) =>
        setFieldError(key, value.toString())
      );
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <div className="row d-flex flex-row justify-content-center">
      <Helmet>
        <title>Реєстрація</title>
      </Helmet>
      <h1 className="text-center mt-4">Реєстрація</h1>

      <div className="col-3">
        <div className="height_cropper">
          <CropperComponent
            aspectRatio={4/4}
            field="photo"
            error={errors.photo}
            onChange={setFieldValue}
            touched={touched.photo}
          />
        </div>
      </div>
      <div className="col-6 mb-4">
        {bot && (
          <div className="alert alert-dismissible alert-danger">
            <strong>Ви Бот</strong>
          </div>
        )}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <InputGroup
              field="firstName"
              label="Ім'я"
              error={errors.firstName}
              onChange={handleChange}
              touched={touched.firstName}
            />

            <InputGroup
              field="secondName"
              label="Прізвище"
              error={errors.secondName}
              onChange={handleChange}
              touched={touched.secondName}
            />

            <InputGroup
              field="email"
              label="Email"
              error={errors.email}
              onChange={handleChange}
              touched={touched.email}
            />

            <InputGroup
              field="phone"
              label="Телефон"
              error={errors.phone}
              onChange={handleChange}
              touched={touched.phone}
            />

            <InputGroup
              field="password"
              label="Пароль"
              type="password"
              error={errors.password}
              onChange={handleChange}
              touched={touched.password}
            />

            <InputGroup
              field="confirmPassword"
              label="Підтвердіть пароль"
              type="password"
              error={errors.confirmPassword}
              onChange={handleChange}
              touched={touched.confirmPassword}
            />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={loading}
              >
                Реєстрація
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div className="col-3"></div>
      {loading && <EclipseWidget />}
    </div>
  );
};
export default RegisterPage;
