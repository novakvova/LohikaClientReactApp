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
        payload: data
      })
      
      return Promise.resolve<UserInfo>(data);
    } catch (error: any) {
      dispatch({
        type: GetUserActionTypes.GET_USER_ERROR,
        payload: error,
      });
    }
  };
};


