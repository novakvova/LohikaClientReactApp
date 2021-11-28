import { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../http_common';
import { RegisterAction, RegisterActionTypes } from '../../types/register';

export const RegisterUser = (data: FormData) => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    try {
      dispatch({ type: RegisterActionTypes.REGISTER_START });
      const response = await http.post("api/account/register", data, { headers: {"Content-Type": "multipart/form-data" },})
      const token = await response.data.token;

      dispatch({
        type: RegisterActionTypes.REGISTER_SUCCESS,
        payload: token,
      });
    } catch (err: any) {
      dispatch({
        type: RegisterActionTypes.REGISTER_ERROR,
        payload: (err as AxiosError).response?.data.errors.email[0],
      });
    }
  };
};

