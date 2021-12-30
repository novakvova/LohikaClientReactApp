import { CategoryInfo } from '../types';

export enum GetCategoryActionTypes {
  GET_CATEGORY = "GET_CATEGORY",
  GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_ERROR = "GET_CATEGORY_ERROR",
};

export interface IGetCategory {
  data: CategoryInfo;
  status: number;
};

export interface GetCategoryAction {
  type: GetCategoryActionTypes.GET_CATEGORY;
};

export interface GetSuccessCategoryAction {
  type: GetCategoryActionTypes.GET_CATEGORY_SUCCESS;
  payload: CategoryInfo;
};

export interface GetErrorCategoryAction {
  type: GetCategoryActionTypes.GET_CATEGORY_ERROR;
  payload: string;
};

export type GetCategoryActions =
  | GetCategoryAction
  | GetSuccessCategoryAction
  | GetErrorCategoryAction;