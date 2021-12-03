import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useNavigate } from "react-router";
import { useActions } from "../../../hooks/useActions";
import { LoginSchema } from "./validation";
import { ILogin, ILoginError } from "./types";
import EclipseWidget from "../../common/eclipse";
import { useFormik, Form, FormikProvider, FormikHelpers, ErrorMessage, Field } from "formik";

const LoginPage: React.FC = () => {

  const initialValues: ILogin = { email: "", password: "", invalid:"" };
  const [loading, setLoading] = useState<boolean>(false);
  
  const { LoginUser } = useActions();
  const navigator = useNavigate();

  const onHandleSubmit = async (
    values: ILogin,
    { setFieldError }: FormikHelpers<ILogin>
  ) => {
    try {
      setLoading(true);
      await LoginUser(values);
      await navigator("/");
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      const serverErrors = errors as ILoginError;
      console.log(serverErrors);
      
      console.log("tewst1 ");
      if (serverErrors.password.length !== 0) {
        setFieldError("password", serverErrors.password[0]);
      }
      console.log("tewst2 ");
      if (serverErrors.invalid.length !== 0) {
        setFieldError("invalid", serverErrors.invalid[0]);
      }
      else {
        console.log('else');
        
      }
      console.log('tewst3');
      
    }
  };
const formik = useFormik({
  initialValues: initialValues,
  validationSchema: LoginSchema,
  onSubmit: onHandleSubmit,
});
const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;
  
console.log(errors);



  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="text-center mt-4">Вхід</h1>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Field field="invalid" type="hidden"/>
              {errors.invalid ? <div>{errors.invalid}</div> : null}
              <InputGroup
                field="email"
                label="Email"
                type="text"
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
              />

              <InputGroup
                label="Пароль"
                field="password"
                type="password"
                error={errors.password}
                touched={touched.password}
                onChange={handleChange}
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-secondary px-5"
                  disabled={loading}
                >
                  Вхід
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
        <div className="col-3"></div>
      </div>
      {loading && <EclipseWidget />}
    </>
  );
};
export default LoginPage;
