import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useNavigate } from "react-router";
import { useActions } from "../../../hooks/useActions";
import { LoginSchema } from "./validation";
import { ILogin, ILoginError } from "./types";
import EclipseWidget from "../../common/eclipse";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";

const LoginPage: React.FC = () => {
  // const [loginData, setLoginData] = useState<ILogin>({
  //   email: "",
  //   password: "",
  // });

  const initialValues: ILogin = { email: "", password: "" };

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
      if (serverErrors.password.length != 0) {
        setFieldError("password", serverErrors.password[0]);
      }

      //setErrorMessages(serverErrors);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="text-center mt-4">Вхід</h1>
          {/* {errorMessages.invalid?.length !== 0 &&
            errorMessages.invalid?.map((el, i) => (
              <div key={i} className="alert alert-dismissible alert-danger">
                <strong>{el}</strong>
              </div>
            ))} */}
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
