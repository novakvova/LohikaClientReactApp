import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router';
import { RegisterSchema } from './validation';
import { IRegister, RegisterError } from './types';
import EclipseWidget from '../../common/eclipse';
import { Form, FormikHelpers, FormikProvider, useFormik, useField } from 'formik';

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
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
   // const [field, meta, helpers] = useField("photo");

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
      } catch (ex) {

        const serverErrors = ex as RegisterError;
        console.log(serverErrors);
        
        setLoading(false);
      }
    } 

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });

    const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;
  
  return (
    <div className="row">
      <div className="col-3"></div>
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
            onChange={handleChange}
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
