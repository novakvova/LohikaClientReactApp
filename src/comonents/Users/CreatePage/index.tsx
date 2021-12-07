import React, { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router";
import { CreateUserSchema } from "./validation";
import { ICreateUser, ICreateUserError } from "../types";
import EclipseWidget from "../../common/eclipse";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface prop {
  toggle(val:boolean):void
}

const CreateUser = (props:prop) => {
  const { toggle } = props;
  const { CreateUser } = useActions();
  const { loading } = useTypedSelector(store => store.userCrud)
  const [load, setLoad] = useState<boolean>(false)
  const navigator = useNavigate();
  const initialValues: ICreateUser = {
    firstName: "",
    lastName: "",
    email: "",
    photo: [],
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("photo", (e.target as any).files[0]);
  };

  const onHandleSubmit = async (
    values: ICreateUser,
    { setFieldError }: FormikHelpers<ICreateUser>
  ) => {
    
    try {
		 setLoad(true);
     const res = await CreateUser(values);
	   navigator("/users");
		 setLoad(false);
     toggle(true);
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
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-around border border-secondary border-3 rounded-4 p-3">
            <h1 className="text-center">Додати користувача</h1>
            <div className="col-6">
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
            </div>
            <div className="col-6">
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
            </div>
            <button
              type="submit"
              className="btn btn-primary text-center"
              disabled={loading}
            >
              Додати
            </button>
          </div>
        </Form>
      </FormikProvider>
      {load && <EclipseWidget />}
    </>
  );
};
export default CreateUser;
