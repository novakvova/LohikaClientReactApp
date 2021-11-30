
import { ILogin } from '../../../store/action-creators/auth';
import { IValidation } from "./types";




 export const validationForm=(model: ILogin) : IValidation => {

    const errors : IValidation = {
    };
    if(!model.email)
      errors.email="Вкажіть пошту";
     return errors;
 }

