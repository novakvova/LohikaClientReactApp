import { useState } from "react";
import InputGroup from "../../common/InputGroupOld";
import Loader from "../../../assets/Loader"
import { useNavigate } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { validationForm } from './validation';
import { ILogin } from "./interface";
import EclipseWidget from '../../common/eclipse';



const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState<ILogin>({});
  const { LoginUser } = useActions();
  const { loading } = useTypedSelector((store) => store.auth);
  const navigator = useNavigate();

const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLoginData((prev) => ({
    ...prev, 
    [e.target.name]: e.target.value
  }))
};

  
  const handlerSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validationForm(loginData);
    
    const isValid = Object.keys(errors).length === 0;
    
    if (isValid){
      try {
        await LoginUser(loginData);
        navigator("/");
      }
      catch(error){
        setErrorMessages({
          email: "Неправельні дані",
          password: "Неправельні дані"
        })
      }
    }
    else {
      setErrorMessages(errors)
    }
  };

  return (
    <>
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <h1 className="text-center mt-4">Вхід</h1>
        
        <form onSubmit={handlerSubmit}>
          <InputGroup
            name="email"
            label="Email"
            type="text"
            value={loginData.email}
            error={errorMessages?.email}
            onChange={handlerChange}
          />

          <InputGroup
            name="password"
            label="Пароль"
            type="password"
            value={loginData.password}
            error={errorMessages?.password}
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
        {/* {loading && (
          <h2 className="text-center">
            <Loader />
          </h2>
        )} */}
      </div>
      <div className="col-3"></div>
    </div>
    {loading && <EclipseWidget/>}
    </>
  );
};
export default LoginPage;

