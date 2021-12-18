import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import EclipseWidget from '../../common/eclipse';
import InputGroup from '../../common/InputGroup';
import { InitValues } from './types';
import { RecoverPasswordSchema } from './validate';

const RecoverPassword = () => {
  const { recoverPassword } = useActions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false)
	const initialValues: InitValues = {
    email: "",
  };

	 const onHandleSubmit = async () => {
     setLoading(true);
     try {
        await recoverPassword(values);
        navigate("/recoverPassword/sendEmail");
        setLoading(false);
     } catch (error) {
       setError(true);
       setLoading(false);
     }
	 }
	const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RecoverPasswordSchema,
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
                field="email"
                label="Email"
                type="text"
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
              />

              <div className="text-center">
                <button type="submit" className="btn btn-secondary px-5">
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

export default RecoverPassword;
