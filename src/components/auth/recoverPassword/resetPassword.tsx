import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import EclipseWidget from '../../common/eclipse';
import InputGroup from '../../common/InputGroup';
import { InitResetValues, ResetPasswordRequest } from "./types";
import { ResetPasswordSchema } from './validate';


const ResetPassword = () => {
  const { resetPassword, addFlashMessage, deleteFlashMessage } = useActions();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [loading, setLoading] =  useState(false);
  const [error, setError] = useState<boolean>(false);

  const initialValues: InitResetValues = {
  password: "",
  confirmPassword: "",
};

  const onHandleSubmit = async () => {
    setLoading(true);
    setError(false);
	  const requestData: ResetPasswordRequest = {
      userId: searchParams.get("userId"),
      token: searchParams.get("code"),
	  ...values
    };
      try {
         await resetPassword(requestData);
         addFlashMessage({type: "success", message: "Пароль успішно змінено"});
         setTimeout(deleteFlashMessage, 4000)
        navigate("/login");
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false);
      }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: onHandleSubmit,
  });
  const { errors, touched, handleChange, handleSubmit, values } = formik;
  return (
    <>
      <Helmet>
        <title>Відновлення пароля</title>
      </Helmet>
      <h1 className="text-center m-2">Відновлення пароля</h1>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          {error && (
            <div className="alert alert-dismissible alert-danger text-center">
              Щось пішло не так
            </div>
          )}
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
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
                  Відновити
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
        <div className="col-4"></div>
      </div>
      {loading && <EclipseWidget />}
    </>
  );
};

export default ResetPassword;
