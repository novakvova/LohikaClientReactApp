import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import InputGroupErrors from "../../common/InputGroupErrors";
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useNavigate } from 'react-router';
import { validationForm } from './validation';
import { IRegister, RegisterError } from './types';
import Loader from '../../../assets/Loader';
import { ILogin } from '../Login/interface';

const RegisterPage = () => {
  const [errorMessages, setErrorMessages] = useState<RegisterError>({
    firstName: [],
    lastName: [],
    email: [],
    phone: [],
    photo: [],
    error: "",
    password: [],
    confirmPassword: [],
  });
  const [registerData, setRegisterData] = useState<IRegister>({
    firstName: "" ,
    lastName: "" ,
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState<FileList>();

  const { RegisterUser, LoginUser } = useActions();
  const { error, loading } = useTypedSelector((store) => store.register);
  const navigator = useNavigate();

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setRegisterData((prev) => ({
       ...prev,
       [e.target.name]: e.target.value,
     }));
  }

  const handlerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = (e.target as HTMLInputElement | any).files[0];
    setSelectedFile(imageData);
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   // const errors = validationForm(registerData);
    
    //setErrorMessages(errors);
    const isValid = true;//Object.keys(errors).length === 0;
   
    if (isValid) {
      const formData = new FormData();
      Object.entries(registerData)
        .forEach(([key, value]) => formData.append(key, value));
        formData.append("photo", selectedFile as any);
        const user:ILogin = {
          email: registerData.email,
          password: registerData.password
        }
        try {
          await RegisterUser(formData);
          await LoginUser(user);
          await navigator('/')
        } catch (ex) {
          console.log("Problem register: ", ex);
          const serverErrors = ex as RegisterError;
          setErrorMessages(serverErrors);
        }
    } 
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 mb-4">
        <h1 className="text-center mt-4">Реєстрація</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handlerSubmit} name="test">
          <InputGroupErrors
            name="firstName"
            label="Ім'я"
            errors={errorMessages?.firstName}
            onChange={handlerChange}
            value={registerData.firstName}
          />

          <InputGroupErrors
            name="lastName"
            label="Прізвище"
            errors={errorMessages?.lastName}
            onChange={handlerChange}
            value={registerData.lastName}
          />

          <InputGroupErrors
            name="email"
            label="Email"
            errors={errorMessages?.email}
            onChange={handlerChange}
            value={registerData.email}
          />

          <InputGroupErrors
            name="photo"
            label="Аватар"
            type="file"
            errors={errorMessages?.photo}
            onChange={handlerFileChange}
            value={registerData.photo}
          />

          <InputGroupErrors
            name="phone"
            label="Телефон"
            errors={errorMessages?.phone}
            onChange={handlerChange}
            value={registerData.phone}
          />

          <InputGroupErrors
            name="password"
            label="Пароль"
            type="password"
            errors={errorMessages?.password}
            onChange={handlerChange}
            value={registerData.password}
          />

          <InputGroupErrors
            name="confirmPassword"
            label="Підтвердіть пароль"
            type="password"
            errors={errorMessages?.confirmPassword}
            onChange={handlerChange}
            value={registerData.confirmPassword}
          />
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={loading}
            >
              Реєстрація
            </button>
          </div>
        </form>
        {loading && (
          <h2 className="text-center">
            <Loader />
          </h2>
        )}
      </div>
      <div className="col-3"></div>
    </div>
  );
};
export default RegisterPage;
