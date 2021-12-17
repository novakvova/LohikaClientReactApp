import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { InitValues, RecoverUserActionTypes, ResetPasswordRequest, SuccessRequest } from './types';


export const recoverPassword = (data: InitValues) => async (dispatch: Dispatch<RecoverUserActionTypes>) => {
    try {
      const response = await http.post<SuccessRequest>("/api/Account/forgotPassword", data);
    } catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error);
			
    //   const serverError = error as AxiosError<ErrorReques>;
    //   if (serverError && serverError.response) {
        // const { errors } = serverError.response.data;
        // return Promise.reject(errors);
     // }
    }
	}
  };

  export const resetPassword = (data: ResetPasswordRequest): any =>
    async (dispatch: Dispatch<RecoverUserActionTypes>) => {
      try {
        const response = await http.post<SuccessRequest>(
          "/api/Account/changePassword",
          data
        );
		const { status } = response;
		Promise.resolve(status)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);

          //   const serverError = error as AxiosError<ErrorReques>;
          //   if (serverError && serverError.response) {
          // const { errors } = serverError.response.data;
          // return Promise.reject(errors);
          // }
        }
      }
    };