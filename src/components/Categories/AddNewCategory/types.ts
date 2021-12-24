export enum AddCategoryTypes {
  ADD_CATEGORY = 'ADD_CATEGORY',
  ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_ERROR = 'ADD_CATEGORY_ERROR',
  ADD_CATEGORY_SUCCESS_STOP= 'ADD_CATEGORY_SUCCESS_STOP'
}

export interface ICategory {
  title: string,
  priority: number,
  urlSlug: string,
  image: string,
}

export interface CategoryState {
    category: ICategory,
    loading: boolean;
    error: null | string;
}

export interface IAddCategory{
    title: string,
    priority: number,
    urlSlug: string ,
    image: string,
}

export interface AddCategory{
    type: AddCategoryTypes.ADD_CATEGORY
}

export interface AddCategorySuccess{
    type: AddCategoryTypes.ADD_CATEGORY_SUCCESS,
    payload: ICategory | number,
}

export interface AddCategorySuccessStopNav {
    type: AddCategoryTypes.ADD_CATEGORY_SUCCESS_STOP;
  }

export interface AddCategoryError {
    type: AddCategoryTypes.ADD_CATEGORY_ERROR,
    payload: string,
}

export type AddCategoriesAction =
    | AddCategory
    | AddCategorySuccess
    | AddCategoryError
    | AddCategorySuccessStopNav
