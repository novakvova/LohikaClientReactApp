import React, { useState } from "react";
import InputGroup from "../../../common/InputGroup";
import { useActions } from "../../../../hooks/useActions";
import { useNavigate } from "react-router";
import { CreateUserSchema } from "./validation";
import { ICreateUser, ICreateUserError } from "../types/CreateUser";
import { IStatus } from "../types" 
import EclipseWidget from "../../../common/eclipse";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import CropperComponent from '../../../containers/CropperComponent/CropperComponent';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import "./create_user.css"


const Create = () => {
  const { CreateUser, addFlashMessage, deleteFlashMessage } = useActions();
  const [load, setLoad] = useState<boolean>(false);
  const navigator = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const initialValues: ICreateUser = {
    firstName: "",
    secondName: "",
    email: "",
    photo: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };


  const onHandleSubmit = async (
    values: ICreateUser,
    { setFieldError }: FormikHelpers<ICreateUser>
  ) => {
    try {
      setLoad(true);
       if (!executeRecaptcha) {
         return;
       }
      const recapchaToken = await executeRecaptcha();
      const res = await CreateUser({
        ...values,
        RecaptchaToken: recapchaToken,
      });
      const result = await res as IStatus;
      navigator("/adminPanel/users");
      setLoad(false);
      if (result.status === 200) {
        addFlashMessage({
          type: "success",
          message: "Користувача створено",
        });
        setTimeout(() => deleteFlashMessage(), 2000);
      }
    } catch (err) {
      setLoad(false);
      const serverErrors = err as ICreateUserError;
      const { email, password, confirmPassword } = serverErrors;
      if (password?.length !== 0) setFieldError("password", password[0]);
      if (email?.length !== 0) setFieldError("email", email[0]);
      if (confirmPassword?.length !== 0)
        setFieldError("confirmPassword", confirmPassword[0]);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateUserSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <>
      <Helmet>
        <title>Добавити користувача</title>
      </Helmet>
      <Card>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row border border-secondary border-3 rounded-4 p-4 m-5">
              <h1 className="text-center">Додати користувача</h1>
              <div className="col-6 d-flex flex-column">
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
                <div>
                  <label htmlFor="photo">Аватар</label>
                  <CropperComponent
                    field="photo"
                    error={errors.photo}
                    onChange={setFieldValue}
                    touched={touched.photo}
                  />
                </div>
              </div>
              <div className="col-6 d-flex flex-column">
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
                <div className="mt-auto p-3 align-self-end">
                  <Button type="submit" label="Додати" icon="pi pi-plus" />
                </div>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </Card>
      {load && <EclipseWidget />}
    </>
  );
};
export default Create;
