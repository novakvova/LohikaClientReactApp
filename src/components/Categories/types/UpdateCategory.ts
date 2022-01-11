import { CategoryInfo } from '../types';

export enum UpdateCategoryActionTypes {
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS",
  UPDATE_CATEGORY_ERROR = "UPDATE_CATEGORY_ERROR",
};

export interface UpdateErrors {
  errors: {
    id?: string[];
    invalid?: string[];
  };
  status: number;
};

export interface UpdateCategoryAction {
  type: UpdateCategoryActionTypes.UPDATE_CATEGORY;
};

export interface UpdateSuccessCategoryAction {
  type: UpdateCategoryActionTypes.UPDATE_CATEGORY_SUCCESS;
  payload: CategoryInfo;
};

export interface UpdateErrorCategoryAction {
  type: UpdateCategoryActionTypes.UPDATE_CATEGORY_ERROR;
  payload: string;
};

export type UpdateCategoryActions =
  | UpdateCategoryAction
  | UpdateSuccessCategoryAction
  | UpdateErrorCategoryAction