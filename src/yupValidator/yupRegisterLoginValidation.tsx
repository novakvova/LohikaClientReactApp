import { ILogin } from '../store/action-creators/auth';
import { IRegisterValidation, ILoginValidation } from "./validationInterface";
import { schema } from "./yup.Schema";


export const registerValidation = async (data: IRegisterValidation) => {
  return await schema
    .validate(data, { abortEarly: false })
    .catch((err) => err.errors);
};

export const loginValidation =  async(data: ILogin) => {
  return  await schema
    .isValid(data, { abortEarly: false })
    .catch((err) => err.errors);
};


