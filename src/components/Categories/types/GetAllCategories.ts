import { CategoryInfo } from '../types';

export enum CategoriesActionTypes {
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
}

export interface GetAllCategories {
  data: Array<CategoryInfo>;
  status: number;
}

export interface FetchCategoriesAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES;
}

export interface FetchSuccessCategoriesAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: Array<CategoryInfo>;
}

export interface FetchErrorCategoriesAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}

export type CategoriesActions =
  | FetchCategoriesAction
  | FetchSuccessCategoriesAction
  | FetchErrorCategoriesAction;