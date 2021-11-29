import { Dispatch } from "react";
import http from "../../http_common";
import { AuthAction, AuthActionTypes, IUser } from "../../types/auth";
import jwt from "jsonwebtoken";
import { AxiosError } from "axios";
import setAuthToken from '../../helpers/setAuthToken';

export interface ILogin {
    email: string,
    password: string 
}

export const LoginUser = (data: ILogin) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
          dispatch({ type: AuthActionTypes.LOGIN_AUTH });
          const responce = await http.post("api/account/login", data);
          const token = await responce.data.token;
          console.log(token);
          
          setAuthToken(token);
          console.log(http.defaults.headers);
          
          const dataUser = jwt.decode(token, { json: true });
          const user: IUser = {
            email: dataUser!.name,
            image: dataUser!.image
              ? dataUser!.image
              : "https://konivjab.net/wp-content/uploads/2017/07/programist-adresa.jpg",
          };

          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
            payload: user,
          });
        } catch (err: any) {

             dispatch({
               type: AuthActionTypes.LOGIN_AUTH_ERROR,
               payload: (err as AxiosError).response?.data.errors.invalid[0],
             });
          
        }
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