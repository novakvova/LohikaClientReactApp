import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useNavigate } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { validationForm } from './validation';
import { ILogin, ILoginError } from "./types";
import EclipseWidget from '../../common/eclipse';


const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState<ILoginError>({
    email: [],
    password: [],
    invalid:[]
  });
  const [loading, setLoading] = useState<boolean>(false)
  const { LoginUser } = useActions();
  const navigator = useNavigate();

const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLoginData((prev) => ({
    ...prev, 
    [e.target.name]: e.target.value
  }))
  setErrorMessages((prev) => ({
    ...prev,
    [e.target.name]: ""
  }));
};

  
  const handlerSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validationForm(loginData);
    
    const isValid = Object.keys(errors).length === 0;
    
    if (isValid) {
      try {
        setLoading(true);
         await LoginUser(loginData);
         await navigator("/");
         setLoading(false);

      } catch (errors) {
        setLoading(false);
        const serverErrors = errors as ILoginError;
        setErrorMessages(serverErrors);
      }
    } else {
      setErrorMessages(errors);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="text-center mt-4">Вхід</h1>
          {errorMessages.invalid?.length !== 0 &&
            errorMessages.invalid?.map((el, i) => (
              <div key={i} className="alert alert-dismissible alert-danger">
                <strong>{el}</strong>
              </div>
            ))}
          <form onSubmit={handlerSubmit}>
            <InputGroup
              name="email"
              label="Email"
              type="text"
              value={loginData.email}
              errors={errorMessages?.email}
              onChange={handlerChange}
            />

            <InputGroup
              name="password"
              label="Пароль"
              type="password"
              value={loginData.password}
              errors={errorMessages?.password}
              onChange={handlerChange}
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
          </form>
        </div>
        <div className="col-3"></div>
      </div>
      {loading && <EclipseWidget />}
    </>
  );
};
export default LoginPage;

