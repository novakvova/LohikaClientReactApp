import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { setAuthUserByToken } from '../../../store/action-creators/auth';
import { RegisterAction, RegisterActionTypes, RegisterErrors } from './types';

export const RegisterUser = (data: FormData) => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    try {
      console.log("Begin request");
      dispatch({ type: RegisterActionTypes.REGISTER_START });
      const response = await http.post("api/account/register", data, { headers: {"Content-Type": "multipart/form-data" },})
      console.log("Begin response");
      
      const token = await response.data.token;

      dispatch({
        type: RegisterActionTypes.REGISTER_SUCCESS,
        payload: token,
      });

      setAuthUserByToken(token, dispatch);
    } catch (err: any) {

      console.log("Server error pre ",err);
      dispatch({
        type: RegisterActionTypes.REGISTER_ERROR,
        payload: (err as AxiosError).response?.data.errors.email[0],
      });
      console.log("Server error ",err);
      if (axios.isAxiosError(err)) {
        console.log("Action problem", err);
        const serverError = err as AxiosError<RegisterErrors>;
        if (serverError && serverError.response) {
          const {errors, status} = serverError.response.data;
          console.log("status error", status);
          return Promise.reject(errors);
        }
      }

    }
  };
};

