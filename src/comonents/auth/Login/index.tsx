import { useState } from "react";
import InputGroup from "../../common/InputGroup";

import validate from "../../../yupValidator/yupRegisterValidation";
import { IErors, IValidation } from "../../../yupValidator/validationInterface";
import { ILogin } from '../../../store/action-creators/auth';
import schema from '../../../yupValidator/yup.Schema'
const LoginPage = () => {
  const [loginData, setLoginData] = useState<ILogin>({ email: "", password: "" });
  const [error, setError] = useState<IValidation>();


  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(loginData);
    
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError({});
    
    const res = await validate(loginData);
    console.log(res);
    
    if (res.length > 0) {
      res.map((el: IErors) =>
        setError((prev) => ({
          ...prev,
          [el.name]: el.message,
        }))
      );
      console.log(error);
      
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
            error={error?.email}
            onChange={handlerChange}
          />

          <InputGroup
            name="password"
            label="Пароль"
            type="password"
            error={error?.password}
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
