import { useState } from "react";
import InputGroup from "../../common/InputGroup";

import { loginValidation } from "../../../yupValidator/yupRegisterLoginValidation";
import { IErors, ILoginValidation } from "../../../yupValidator/validationInterface";
import { ILogin } from '../../../store/action-creators/auth';
const LoginPage = () => {
  const [loginData, setLoginData] = useState<ILogin>({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState<ILoginValidation>();


  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    
    };

  const handlerSubmit =  (e: React.FormEvent) => {
    e.preventDefault();


    loginValidation(loginData).then((res) => {
     console.log(res);
     
      
    })
    
    
    // if (res instanceof Array) {
    //    res.map((el: IErors) =>
    //     setErrorMessages((prev) => ({
    //       ...prev,
    //       [el.name]: el.message,
    //     }))
    //   );
    //  console.log(errorMessages);

    // }
    // else {
    //   console.log('Login');
    // }

  
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
            error={errorMessages?.email}
            onChange={handlerChange}
          />

          <InputGroup
            name="password"
            label="Пароль"
            type="password"
            error={errorMessages?.password}
            onChange={handlerChange}
          />
          <div className="text-center">
            <button type="submit" className="btn btn-secondary px-5">
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
