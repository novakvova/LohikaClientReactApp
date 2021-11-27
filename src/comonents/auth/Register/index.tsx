import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import http from "../../../http_common";
import validationFields from '../../../yupValidator/validationFields';
import { IValidation } from '../../../yupValidator/validationInterface';

const RegisterPage = () => {
  const [errorMessages, setErrorMessages] = useState<IValidation>();
  const [registerData, setRegisterData] = useState({});

   const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
     validationFields(e.target.name)
       .validate({ [e.target.name]: e.target.value })
       .then((valid) => {
         setErrorMessages((prev) => ({
           ...prev,
           [Object.keys(valid)[0]]: null,
         }));

         setRegisterData((prev) => ({
           ...prev,
           ...valid,
         }));
       })
       .catch((err) => {
         setErrorMessages((prev) => ({
           ...prev,
           [err.errors[0].name]: err.errors[0].message,
         }));
       });
   };

 
const hadlerFile = () => {}

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    //Object.entries(mystate).forEach(([key, value]) => formData.append(key, value));
    formData.append("Email", "vv@ff.ff");

    http
      .post("api/account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (resp) => {},
        (error) => {
          console.log("error", error.response.data);
        }
      );
    //console.log("Server send model", mystate);
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 mb-4">
        <h1 className="text-center mt-4">Реєстрація</h1>
        <form onSubmit={handlerSubmit}>
          <InputGroup
            name="firstName"
            label="Ім'я"
            error={errorMessages?.firstName}
            onBlur={handlerBlur}
          />

          <InputGroup
            name="lastName"
            label="Прізвище"
            error={errorMessages?.lastName}
            onBlur={handlerBlur}
          />

          <InputGroup
            name="email"
            label="Email"
            error={errorMessages?.email}
            onBlur={handlerBlur}
          />

          <InputGroup
            name="avatar"
            label="Аватар"
            type="file"
            error={errorMessages?.avatar}
            onChange={hadlerFile}
            onBlur={handlerBlur}
          />

          <InputGroup
            name="phone"
            label="Телефон"
            error={errorMessages?.phone}
            onBlur={handlerBlur}
          />

          <InputGroup
            name="password"
            label="Парол"
            type="password"
            error={errorMessages?.password}
            onBlur={handlerBlur}
          />

          <InputGroup
            name="confirmPassword"
            label="Підтвердіть пароль"
            type="password"
            error={errorMessages?.confirmPassword}
            onBlur={handlerBlur}
          />
          <div className="text-center">
            <button type="submit" className="btn btn-secondary">
              Реєстрація
            </button>
          </div>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
};
export default RegisterPage;
