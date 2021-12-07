import axios, { AxiosError } from 'axios';
import { Dispatch } from "react";
import http from "../../http_common";
import {
  DeleteUserActions,
  DeleteUserActionTypes,
  GetUserActionTypes,
  GetUserActions,
  UsersActionTypes,
  UsersActions,
  UserInfo,
  UpdateUserActions,
  UpdateUserActionTypes,
  UpdateErrors,
  CreateUserActionTypes,
  ICreateUserErrors,
  CreateUserActions,
  ICreateUser,
} from "./types";

export const fetchUsers = () => {
  return  async (dispatch: Dispatch<UsersActions>) => {
    try {
      dispatch({ 
        type: UsersActionTypes.FETCH_USERS 
      });
      const response = await http.get<UserInfo[]>("api/Users/all");
      
      dispatch({
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: error,
      });
    }
  };
}

export const deleteUser = (id: number) => {
  return async (dispatch: Dispatch<DeleteUserActions>) => {
    try {
      dispatch({ 
        type: DeleteUserActionTypes.DELETE_USER
      })
      const response = await http.delete(`api/Users/delete/${id}`);
      if (response.status === 200){
        dispatch({
          type: DeleteUserActionTypes.DELETE_USER_SUCCESS,
          payload: id
        })
      }
      else throw Error('Щось пішло не так')
    } catch ( error ) {
      dispatch({
        type: DeleteUserActionTypes.DELETE_USER_ERROR,
        payload: "Error"});
    }

  }
};

export const getUserById = (id:number) => {
  return async (dispatch: Dispatch<GetUserActions>) => {
    try {
      dispatch({
        type: GetUserActionTypes.GET_USER,
      });
      const response = await http.get<UserInfo>(`api/Users/get/${id}`);
      const { data } = response;

      dispatch({
        type: GetUserActionTypes.GET_USER_SUCCESS,
        payload: data,
      });

      return Promise.resolve<UserInfo>({...data});
    } catch (error: any) {
      dispatch({
        type: GetUserActionTypes.GET_USER_ERROR,
        payload: error,
      });
            // if (axios.isAxiosError(error)) {
            //   const serverError = error as AxiosError<UpdateErrors>;
            //   if (serverError && serverError.response) {
            //     const { errors } = serverError.response.data;
            //     console.log(errors);
                
            //     return Promise.reject(errors);
            //   }
            // }
    }
  };
};

export const updateUser = (data:UserInfo, formData:FormData) => {
  return async (dispatch: Dispatch<UpdateUserActions>) => {
    try {
      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER
      });

      const response = await http.put<UserInfo>("/api/Users/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
console.log(response);

      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER_SUCCESS,
        payload: data
      });
      
    } catch (error) {
      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER_ERROR,
        payload: "error"
      });
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<UpdateErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
    }
  }
}; 
export interface ICreateUserResponse {
  status: number
}

export const CreateUser = (data: ICreateUser) : any => {
  return async (dispatch: Dispatch<CreateUserActions>) => {
    try {
       const formData = new FormData();
       Object.entries(data).forEach(([key, value]) =>
         formData.append(key, value)
       );
      const response = await http.post<ICreateUserResponse>(
        "api/users/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const result = response.data;
      
      dispatch({
        type: CreateUserActionTypes.CREATE_USER_SUCCESS,
      });
      return Promise.resolve<ICreateUserResponse>(result);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ICreateUserErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
    }
  };
};

