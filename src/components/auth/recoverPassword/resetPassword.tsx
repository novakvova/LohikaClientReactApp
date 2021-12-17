import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import InputGroup from '../../common/InputGroup';
import { InitResetValues, ResetPasswordRequest, SuccessRequest } from './types';
import { ResetPasswordSchema } from './validate';


const ResetPassword = () => {
  const { loading } = useTypedSelector((store) => store.recover);
  const { resetPassword } = useActions();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
	  console.log(searchParams.get("userId"));
	  console.log(searchParams.get("code"));
  }, [])

  const initialValues: InitResetValues = {
  password: "",
  confirmPassword: "",
};

  const onHandleSubmit = async () => {
	  const requestData: ResetPasswordRequest = {
      userId: searchParams.get("userId"),
      token: searchParams.get("code"),
	  ...values
    };
	try {
		const res:SuccessRequest = resetPassword(requestData);
		const { status } = res;
          navigate("/login");
	} catch (error) {
		
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
                  Реєстрація
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
