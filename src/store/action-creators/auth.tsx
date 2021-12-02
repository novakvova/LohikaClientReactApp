import { Dispatch } from "react";
import http from "../../http_common";
import { AuthAction, AuthActionTypes, IUser } from "../../types/auth";
import jwt from "jsonwebtoken";
import { AxiosError } from "axios";
import setAuthToken from '../../helpers/setAuthToken';
import { ILogin } from '../../comonents/auth/Login/interface';
import { store } from '..';


export interface ILoginResponse {
  token: string
}

export const LoginUser = (data: ILogin) => async (dispatch: Dispatch<AuthAction>) => {
        try {
          dispatch({ type: AuthActionTypes.LOGIN_AUTH });
          const response = await http.post<ILoginResponse>("api/account/login", data);
          const { token } = await response.data;
          
          setAuthUserByToken(token, store.dispatch);
         
          return Promise.resolve();

        } catch (err: any) {

             dispatch({
               type: AuthActionTypes.LOGIN_AUTH_ERROR,
               payload: (err as AxiosError).response?.data.errors.invalid[0],
             });
             return Promise.reject();
          
        }
    }

export const setAuthUserByToken = (token: string , dispatch: Dispatch<any>) => {

  setAuthToken(token);
  localStorage.token = token;

  const dataUser = jwt.decode(token, { json: true });
  const user: IUser = {
    email: dataUser!.name,
    image: dataUser!.image,
  };
  
  dispatch({
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: user,
  });


}

export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
          setAuthToken('');
            dispatch({ type: AuthActionTypes.LOGOUT_AUTH });
            localStorage.removeItem('user')
        } catch (error) {
            
        }
    }
}