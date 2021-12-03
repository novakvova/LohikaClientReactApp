import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { LoginSchema } from './formikSchema';

interface Login {
	email: string,
	password: string
}


const FLogin = () => {


  const initValue: Login = {
    email: "",
    password: "",
  };

  const handlerSubmit = ( values: Login, { setSubmitting, setErrors }: FormikHelpers<Login>
  ) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
    console.log("values", );
  };

	
	

	return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={initValue}
        validationSchema={LoginSchema}
        onSubmit={handlerSubmit}
      >
        {({ errors, touched }) => (          
          <Form>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="text"
              className="form-control"
            />
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}

            <label htmlFor="password" className="form-label">
              Pasword
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
            />
            {errors.password && touched.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}

            <button type="submit" className="btn btn-secondary px-5">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FLogin;