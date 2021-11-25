import { IValidation } from "./validationInterface";
import schema from './yup.Schema';


const registerValidation = async (data: IValidation) => {
  return await schema
    .validate(data, { abortEarly: false })
    .catch((err) => err.errors);
};


export default registerValidation;