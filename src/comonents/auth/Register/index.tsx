import { useEffect, useState } from "react";
import InputGroup from "../../common/InputGroup";
import validationFields from '../../../yupValidator/validationFields';
import { IValidation } from '../../../yupValidator/validationInterface';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useNavigate } from 'react-router';
import { ILogin } from '../../../store/action-creators/auth';

const RegisterPage = () => {
  const [errorMessages, setErrorMessages] = useState<IValidation>({});
  const [registerData, setRegisterData] = useState<IValidation>({});
  const [selectedFile, setSelectedFile] = useState();

  const { RegisterUser, LoginUser } = useActions();
  const { isRegisterd, error, } = useTypedSelector((store) => store.register);
  const navigator = useNavigate();

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     validationFields(e.target.name)
       .validate({ [e.target.name]: e.target.value })
       .then((valid) => {
         setErrorMessages((prev) => {
           return {
           ...prev,
           [Object.keys(valid)[0]]: null,
         }}
         );

         if (e.target.name === "photo") {
           setSelectedFile((e.target as any).files[0] as any);
         } 

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

    useEffect(() => {
      if (isRegisterd && registerData.email && registerData.password) {
        const user: ILogin = {
          email: registerData.email,
          password: registerData.password,
        };
        LoginUser(user);
        navigator('/');
      }
    }, [isRegisterd]);

  const handlerSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword){
      setErrorMessages({confirmPassword: 'Паролі повинні співпадати'})
      return
   }

    const formData = new FormData();
  
    Object.entries(registerData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("photo", selectedFile as any);

    RegisterUser(formData)
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 mb-4">
        <h1 className="text-center mt-4">Реєстрація</h1>
        <form onSubmit={handlerSubmit} name="test">
          <InputGroup
            name="firstName"
            label="Ім'я"
            error={errorMessages?.firstName}
            onChange={handlerChange}
          />

          <InputGroup
            name="lastName"
            label="Прізвище"
            error={errorMessages?.lastName}
            onChange={handlerChange}
          />

          <InputGroup
            name="email"
            label="Email"
            error={errorMessages?.email}
            onChange={handlerChange}
          />

          <InputGroup
            name="photo"
            label="Аватар"
            type="file"
            error={errorMessages?.photo}
            onChange={handlerChange}
          />

          <InputGroup
            name="phone"
            label="Телефон"
            error={errorMessages?.phone}
            onChange={handlerChange}
          />

          <InputGroup
            name="password"
            label="Пароль"
            type="password"
            error={errorMessages?.password}
            onChange={handlerChange}
          />

          <InputGroup
            name="confirmPassword"
            label="Підтвердіть пароль"
            type="password"
            error={errorMessages?.confirmPassword}
            onChange={handlerChange}
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
