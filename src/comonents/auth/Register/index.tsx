import React, { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router';
import { RegisterSchema } from './validation';
import { IRegister, RegisterError } from './types';
import EclipseWidget from '../../common/eclipse';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<string>();
  const { RegisterUser} = useActions();
  const navigator = useNavigate();
  const initialValues:IRegister = {
    firstName: "",
    lastName: "",
    email: "",
    photo: [],
    phone: "",
    password: "",
    confirmPassword: ""
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("photo", (e.target as any).files[0]);
    const file = (e.target as any).files[0]
    setImg( URL.createObjectURL(file));
  }
    
  const onHandleSubmit = async (values: IRegister,
    { setFieldError }: FormikHelpers<IRegister>
  ) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value)
    );
      try {
        setLoading(true);
        await RegisterUser(formData);
        await navigator("/");
        await setLoading(false);
      } catch (err) {
        setLoading(false);
        const serverErrors = err as RegisterError;
        const {email, password, confirmPassword} = serverErrors;
        if(password?.length !== 0)
          setFieldError("password", password[0]);
        if (email?.length !== 0)
          setFieldError("email", email[0]);
        if (confirmPassword?.length !== 0) 
          setFieldError("confirmPassword", confirmPassword[0]);
      }
    } 

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });

    const {
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue
    } = formik;
  
  return (
    <div className="row">
      <div className="col-3">
        {img && (
          <div className="card mt-5">
            <div className="card-body text-center">
              <img src={img} alt="asdasd" />
            </div>
          </div>
        )}
      </div>
      <div className="col-6 mb-4">
        <h1 className="text-center mt-4">Реєстрація</h1>
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
              field="lastName"
              label="Прізвище"
              error={errors.lastName}
              onChange={handleChange}
              touched={touched.firstName}
            />

            <InputGroup
              field="email"
              label="Email"
              error={errors.email}
              onChange={handleChange}
              touched={touched.email}
            />

            <InputGroup
              field="photo"
              label="Аватар"
              type="file"
              error={errors.photo}
              onChange={handleFileChange}
              touched={touched.photo}
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
