import React, { useEffect, useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useNavigate } from 'react-router';

import { IValidation } from "../../../yupValidator/validationInterface";
import { ILogin } from '../../../store/action-creators/auth';
import validationFields from '../../../yupValidator/validationFields';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';


const LoginPage = () => {
  const [loginData, setLoginData] = useState<ILogin>({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState<IValidation>();
  const { LoginUser } = useActions();
  const { isAuth, error, loading } = useTypedSelector((store) => store.auth);
  const navigator = useNavigate();
  
  const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    validationFields(e.target.name)
      .validate({ [e.target.name]: e.target.value })
      .then((valid) => {
        setErrorMessages((prev) => ({ 
          ...prev,
          [Object.keys(valid)[0]]: null 
        }));
        
        setLoginData((prev) => ({
          ...prev,
          ...valid,
        }));
      })
      .catch((err) => {
        setErrorMessages((prev) => ({
          ...prev,
          [err.errors[0].name]: err.errors[0].message 
        }));
      });
  };

useEffect(() => {
  setErrorMessages({ password: error });
}, [error])

useEffect(() => {
  if (isAuth) navigator("/");
}, [isAuth, navigator]);
  
  const handlerSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.email && loginData.password){
      LoginUser(loginData);
    }
  };

  return (
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
            onBlur={handlerBlur}
          />

          <InputGroup
            name="password"
            label="Пароль"
            type="password"
            value={loginData.password}
            error={errorMessages?.password}
            onBlur={handlerBlur}
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
  );
};
export default LoginPage;

