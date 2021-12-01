import { Dispatch } from "react";
import http from "../../http_common";
import { AuthAction, AuthActionTypes, IUser } from "../../types/auth";
import jwt from "jsonwebtoken";
import { AxiosError } from "axios";
import setAuthToken from '../../helpers/setAuthToken';
import { ILogin } from '../../comonents/auth/Login/interface';


export interface ILoginResponse {
  token: string
}

export const LoginUser = (data: ILogin) => async (dispatch: Dispatch<AuthAction>) => {
        try {
          dispatch({ type: AuthActionTypes.LOGIN_AUTH });
          const response = await http.post<ILoginResponse>("api/account/login", data);
          const { token } = await response.data;
         
          setAuthToken(token);
          
          const dataUser = jwt.decode(token, { json: true });
          
          const user: IUser = {
            email: dataUser!.name,
            image: dataUser!.image
              ? dataUser!.image
              : "https://konivjab.net/wp-content/uploads/2017/07/programist-adresa.jpg",
              
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(token));
          dispatch({
            type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
            payload: user,
          });
          return Promise.resolve();

        } catch (err: any) {

             dispatch({
               type: AuthActionTypes.LOGIN_AUTH_ERROR,
               payload: (err as AxiosError).response?.data.errors.invalid[0],
             });
             return Promise.reject();
          
        }
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