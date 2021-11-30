import * as React from 'react';
import { useEffect, useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useNavigate } from 'react-router';

import { ILogin } from '../../../store/action-creators/auth';
import validationFields from '../../../yupValidator/validationFields';

//import {LoginUser} from '../../../store/action-creators/auth';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IValidation } from "./types";
import { validationForm } from './validation';
import { useDispatch } from 'react-redux';



const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<ILogin>({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState<IValidation>();
  const { LoginUser } = useActions();
  const { isAuth, error, loading } = useTypedSelector((store) => store.auth);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  
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


  
  const handlerSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validationForm(loginData);
    const isValid = Object.keys(errors).length === 0;

    
    if (isValid){
      try
      {
        console.log("BEgin LOgin");
        await LoginUser(loginData);
        console.log("End login");
        navigator("/");
      }
      catch(problem)
      {
        console.log("End login problem");
      }
        

    }
    else {
      setErrorMessages(errors);
    }
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <h1 className="text-center mt-4">Вхід</h1>
        <form onSubmit={handlerSubmit}>
          {error && <h2>{error}</h2>}
          <InputGroup
            name="email"
            label="Email"
            type="text"
            value={loginData.email}
            error={errorMessages?.email}
            onChange={handlerBlur}
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

