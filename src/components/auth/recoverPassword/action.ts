import axios, { AxiosError } from 'axios';
import http from '../../../http_common';
import {
  InitValues,
  ResetPasswordRequest,
  RequestStatus,
} from "./types";


export const recoverPassword = (data: InitValues):any => async () => {
    try {
      const response = await http.post<RequestStatus>(
        "/api/Account/forgotPassword",
        data
      );
    const { status } = response;
    return Promise.resolve<RequestStatus>({ status });
    } catch (error: any) {
		if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<RequestStatus>;
       if (serverError && serverError.response) {
         const { status } = serverError.response;
         return Promise.reject<RequestStatus>({status});
      }
    }
	}
  };

  export const resetPassword = (data: ResetPasswordRequest): any =>
    async () => {
      try {
        await http.post<RequestStatus>(
          "/api/Account/changePassword",
          data
        );
      } catch (error) {
       if (axios.isAxiosError(error)) {
         const serverError = error as AxiosError<RequestStatus>;
         if (serverError && serverError.response) {
           const { status } = serverError.response;
           return Promise.reject<RequestStatus>({ status });
         }
       }
      }
    };