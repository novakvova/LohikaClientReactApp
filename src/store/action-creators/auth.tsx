import { Dispatch } from "react";
import http from "../../http_common";
import { AuthAction, AuthActionTypes, IUser } from "../../types/auth";
import jwt from "jsonwebtoken";
import { AxiosError } from "axios";

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
          const dataUser = jwt.decode(token, { json: true });
          const user: IUser = {
            email: dataUser!.name,
            image: "",
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
            dispatch({ type: AuthActionTypes.LOGOUT_AUTH });
            localStorage.removeItem('user')
        } catch (error) {
            
        }
    }
}