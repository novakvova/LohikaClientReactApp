import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router';
import { validationForm } from './validation';
import { IRegister, RegisterError } from './types';
import EclipseWidget from '../../common/eclipse';

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
    photo: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState<FileList>();
  const [loading, setLoading] = useState<boolean>(false)

  const { RegisterUser } = useActions();
  const navigator = useNavigate();

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages((prev) => ({
      ...prev,
      [e.target.name]:[]
    }));
     setRegisterData((prev) => ({
       ...prev,
       [e.target.name]: e.target.value,
     }));
  }

  const handlerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = (e.target as HTMLInputElement | any).files[0];
    setSelectedFile(imageData);
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validationForm(registerData);
    setErrorMessages(errors);
    
    const isValid = Object.keys(errors).length === 0;
   
    if (isValid) {
      const formData = new FormData();
      Object.entries(registerData).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("photo", selectedFile as any);
      try {
        setLoading(true);
        const test = RegisterUser(formData);
        console.log(test);
        
        await RegisterUser(formData);
        await navigator("/");
        await setLoading(false);
      } catch (ex) {

        const serverErrors = ex as RegisterError;
        console.log(serverErrors);
        
        setErrorMessages(serverErrors);
        setLoading(false);
      }
    } 
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
            errors={errorMessages?.firstName}
            onChange={handlerChange}
            value={registerData.firstName}
          />

          <InputGroup
            name="lastName"
            label="Прізвище"
            errors={errorMessages?.lastName}
            onChange={handlerChange}
            value={registerData.lastName}
          />

          <InputGroup
            name="email"
            label="Email"
            errors={errorMessages?.email}
            onChange={handlerChange}
            value={registerData.email}
          />

          <InputGroup
            name="photo"
            label="Аватар"
            type="file"
            errors={errorMessages?.photo}
            onChange={handlerFileChange}
            value={registerData.photo}
          />

          <InputGroup
            name="phone"
            label="Телефон"
            errors={errorMessages?.phone}
            onChange={handlerChange}
            value={registerData.phone}
          />

          <InputGroup
            name="password"
            label="Пароль"
            type="password"
            errors={errorMessages?.password}
            onChange={handlerChange}
            value={registerData.password}
          />

          <InputGroup
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
      </div>
      <div className="col-3"></div>
      {loading && <EclipseWidget />}
    </div>
  );
};
export default RegisterPage;
