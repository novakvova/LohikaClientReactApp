import { useState } from "react";
import InputGroup from "../../common/InputGroup";

import validate from "../../../yupValidator/yupRegisterValidation";
import { useNavigate } from "react-router-dom";
import { IErors, IValidation } from "../../../yupValidator/validationInterface";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState<IValidation>();


  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    const res = await validate(loginData);
    if (res.length > 0) {
      res.map((el: IErors) =>
        setError((prev) => ({
          ...prev,
          [el.name]: el.message,
        }))
      );
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
