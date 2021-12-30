import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import http from '../../http_common';
import { CategoriesActionTypes, CategoriesActions } from './types/GetAllCategories';
import { DeleteCategoryActions, DeleteCategoryActionTypes } from './types/DeleteCategory';
import {
  CreateCategoryActionTypes,
  ICreateCategoryErrors,
  CreateCategoryActions,
  ICreateCategory,
} from './types/CreateCategory';

import { GetCategoryActionTypes, GetCategoryActions, IGetCategory } from './types/GetCategoryByID';

import {
  UpdateCategoryActions,
  UpdateCategoryActionTypes,
  UpdateErrors,
} from './types/UpdateCategory';

import {
  ISearchCategoryAction,
  ISearchData,
  ISearchCategoryActionTypes,
  ISearchCategory,
} from './types/SearchCategories';

import { CategoryInfo, IStatus } from './types';

export const fetchCategories = () => {
  return async (dispatch: Dispatch<CategoriesActions>) => {
    try {
      dispatch({
        type: CategoriesActionTypes.FETCH_CATEGORIES,
      });
      const response = await http.get<CategoryInfo[]>('api/Categories/list');

      dispatch({
        type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: CategoriesActionTypes.FETCH_CATEGORIES_ERROR,
        payload: error,
      });
    }
  };
};

export const deleteCategory = (id: number): any => {
  return async (dispatch: Dispatch<DeleteCategoryActions>) => {
    try {
      dispatch({
        type: DeleteCategoryActionTypes.DELETE_CATEGORY,
      });
      const response = await http.delete<number>(`api/Categories/delete/${id}`);

      if (response.status === 200) {
        dispatch({
          type: DeleteCategoryActionTypes.DELETE_CATEGORY_SUCCESS,
          payload: Number(id),
        });
        return Promise.resolve<number>(response.status);
      }
    } catch (error: any) {
      dispatch({
        type: DeleteCategoryActionTypes.DELETE_CATEGORY_ERROR,
        payload: 'Error',
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

export const getCategoryById = (id: number): any => {
  return async (dispatch: Dispatch<GetCategoryActions>) => {
    try {
      dispatch({
        type: GetCategoryActionTypes.GET_CATEGORY,
      });
      const response = await http.get<CategoryInfo>(`api/Categories/get/${id}`);
      const { data } = response;

      dispatch({
        type: GetCategoryActionTypes.GET_CATEGORY_SUCCESS,
        payload: data,
      });

      return Promise.resolve<IGetCategory>(response);
    } catch (error: any) {
      dispatch({
        type: GetCategoryActionTypes.GET_CATEGORY_ERROR,
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

export const updateCategory = (data: CategoryInfo, formData: FormData) => {
  return async (dispatch: Dispatch<UpdateCategoryActions>) => {
    try {
      dispatch({
        type: UpdateCategoryActionTypes.UPDATE_CATEGORY,
      });

      await http.put<CategoryInfo>('/api/Categories/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch({
        type: UpdateCategoryActionTypes.UPDATE_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UpdateCategoryActionTypes.UPDATE_CATEGORY_ERROR,
        payload: 'error',
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

export const CreateCategory = (data: ICreateCategory): any => {
  return async (dispatch: Dispatch<CreateCategoryActions>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      const response = await http.post<IStatus>('api/Categories/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const result = response;

      dispatch({
        type: CreateCategoryActionTypes.CREATE_CATEGORY_SUCCESS,
      });
      return Promise.resolve<IStatus>(result);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ICreateCategoryErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
    }
  };
};

export const getSearchCategoryResult = (searchRequest: ISearchCategory) => {
  return async (dispatch: Dispatch<ISearchCategoryAction>) => {
    dispatch({
      type: ISearchCategoryActionTypes.SEARCH_CATEGORIES,
    });
    try {
      let params = Object.fromEntries(
        Object.entries(searchRequest).filter(([key, value]) => {
          if (value) return [key, value];
          return;
        }),
      );
      params = { ...params };
      const responce = await http.get<ISearchData>('api/Categories/search', {
        params,
      });
      const { data } = responce;
      dispatch({
        type: ISearchCategoryActionTypes.SEARCH_CATEGORIES_SUCCESS,
        payload: { ...data },
      });
    } catch (error) {
      dispatch({
        type: ISearchCategoryActionTypes.SEARCH_CATEGORIES_ERROR,
      });
    }
  };
};
