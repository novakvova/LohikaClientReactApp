import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { setAuthUserByToken } from '../Login/action';
import { IRequest, RegisterAction, RegisterActionTypes, RegisterErrors } from './types';


export const RegisterUser = (data: IRequest) => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    try {
      const response = await http.post("api/account/register", data);
      const token = await response.data.token;
      dispatch({
        type: RegisterActionTypes.REGISTER_SUCCESS,
        payload: token,
      });
      setAuthUserByToken(token, dispatch);
      return Promise.resolve(token);
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


