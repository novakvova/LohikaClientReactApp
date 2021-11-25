import { Dispatch } from "react";
import http from "../../http_common";
import { AuthAction, AuthActionTypes } from "../../types/auth";

interface ILogin {
    email: string,
    password: string
}

export const LoginUser = (data: ILogin) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.LOGIN_AUTH});
            const responce = await http.post('api/account/login', data);
            dispatch({type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: responce.data});
        }
        catch(error) {
            dispatch({type: AuthActionTypes.LOGIN_AUTH_ERROR, payload: "Error"});
        }
    }
}