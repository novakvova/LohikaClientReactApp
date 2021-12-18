import { Form, FormikProvider, useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import InputGroup from '../../common/InputGroup';
import { InitValues } from './types';
import { RecoverPasswordSchema } from './validate';

const RecoverPassword = () => {
  const { recoverPassword } = useActions();
  const { loading } = useTypedSelector(store => store.recover);
  const navigate = useNavigate();

	const initialValues: InitValues = {
    email: "",
  };

	 const onHandleSubmit = async () => {
     try {
        recoverPassword(values);
        navigate("/recoverPassword/sendEmail");
     } catch (error) {
       
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
