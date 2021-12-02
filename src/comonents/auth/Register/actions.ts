import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { store } from '../../../store';
import { setAuthUserByToken } from '../Login/action';
import { RegisterAction, RegisterActionTypes, RegisterErrors} from './types';

export const RegisterUser = (data: FormData) => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    try {
      const response = await http.post("api/account/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const token = await response.data.token;
      dispatch({
        type: RegisterActionTypes.REGISTER_SUCCESS,
        payload: token,
      });
      setAuthUserByToken(token, store.dispatch);

      return Promise.resolve( token );
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<RegisterErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
    }
  };
};


