import { ILogin } from '../store/action-creators/auth';
import { IRegisterValidation, ILoginValidation } from "./validationInterface";
import { schemaLogin, schemaRegister } from "./yup.Schema";


export const registerValidation = async (data: IRegisterValidation) => {
  return await schemaRegister
    .validate(data, { abortEarly: false })
    .catch((err) => err.errors);
};

export const loginValidation =  async(data: ILogin) => {
  return  await schemaLogin
    .isValid(data, { abortEarly: false })
    .catch((err) => err.errors);
};


