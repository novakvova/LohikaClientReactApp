import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import http from "../../../http_common";
import { UsersActionTypes, UsersActions } from "./types/GetAllUser";
import { DeleteUserActions, DeleteUserActionTypes } from "./types/DeleteUser";
import {
  CreateUserActionTypes,
  ICreateUserErrors,
  CreateUserActions,
  ICreateUser,
} from "./types/CreateUser";

import {
  GetUserActionTypes,
  GetUserActions,
  IGetUser,
} from "./types/GetUserById";

import {
  UpdateUserActions,
  UpdateUserActionTypes,
  UpdateErrors,
} from "./types/UpdateUser";

import {
  ISearchUserAction,
  ISearchData,
  ISearchUserActionTypes,
  ISearchUser,
} from "./types/SearchUsers";

import { UserInfo, IStatus } from "./types";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UsersActions>) => {
    try {
      dispatch({
        type: UsersActionTypes.FETCH_USERS,
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
};

export const deleteUser = (id: number): any => {
  return async (dispatch: Dispatch<DeleteUserActions>) => {
    try {
      dispatch({
        type: DeleteUserActionTypes.DELETE_USER,
      });
      const response = await http.delete<number>(`api/Users/delete/${id}`);

      if (response.status === 200) {
        dispatch({
          type: DeleteUserActionTypes.DELETE_USER_SUCCESS,
          payload: Number(id),
        });
        return Promise.resolve<number>(response.status);
      }
    } catch (error: any) {
      dispatch({
        type: DeleteUserActionTypes.DELETE_USER_ERROR,
        payload: "Error",
      });
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IStatus>;
        if (serverError && serverError.response) {
          const { status } = serverError.response;
          return Promise.resolve(status);
        }
      }
    }
  };
};

export const getUserById = (id: number): any => {
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

      return Promise.resolve<UserInfo>(data);
    } catch (error: any) {
      dispatch({
        type: GetUserActionTypes.GET_USER_ERROR,
        payload: error,
      });
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IStatus>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response);
        }
      }
    }
  };
};

export const updateUser = (data: UserInfo, formData: FormData) => {
  return async (dispatch: Dispatch<UpdateUserActions>) => {
    try {
      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER,
      });

      await http.put<UserInfo>("/api/Users/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UpdateUserActionTypes.UPDATE_USER_ERROR,
        payload: "error",
      });
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<UpdateErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
    }
  };
};

export const CreateUser = (data: ICreateUser): any => {
  return async (dispatch: Dispatch<CreateUserActions>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      const response = await http.post<IStatus>("api/users/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = response;

      dispatch({
        type: CreateUserActionTypes.CREATE_USER_SUCCESS,
      });
      return Promise.resolve<IStatus>(result);
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

export const getSearchResult = (searchRequest: ISearchUser) => {
  return async (dispatch: Dispatch<ISearchUserAction>) => {
     dispatch({
       type: ISearchUserActionTypes.SEARCH_USERS,
     });
    try {
      let params = Object.fromEntries(
        Object.entries(searchRequest).filter(([key, value]) => {
          if (value) return [key, value];
          return;
        })
      );
      params = { ...params };
      const responce = await http.get<ISearchData>("api/Users/search", {
        params,
      });
      const { data } = responce;
      dispatch({
        type: ISearchUserActionTypes.SEARCH_USERS_SUCCESS,
        payload: { ...data },
      });
    } catch (error) {
      dispatch({
        type: ISearchUserActionTypes.SEARCH_USERS_ERROR,
      });
    }
  };
};
