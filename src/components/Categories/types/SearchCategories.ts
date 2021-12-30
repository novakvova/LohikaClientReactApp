import { CategoryInfo } from '../types';

export enum ISearchCategoryActionTypes {
  SEARCH_CATEGORIES = "SEARCH_CATEGORIES",
  SEARCH_CATEGORIES_SUCCESS = "SEARCH_CATEGORIES_SUCCESS",
  SEARCH_CATEGORIES_ERROR = "SEARCH_CATEGORIES_ERROR",
};

export interface SearchResults {
  type: ISearchCategoryActionTypes.SEARCH_CATEGORIES;
 
};

export interface SearchResultsSuccess {
  type: ISearchCategoryActionTypes.SEARCH_CATEGORIES_SUCCESS;
  payload: ISearchData;
};

export interface SearchResultsError {
  type: ISearchCategoryActionTypes.SEARCH_CATEGORIES_ERROR;
};


export interface ISearchData {
  categories: CategoryInfo[];
  pages: number;
  total: number;
  currentPage: number;
};

export interface ISearchCategory {
  id?: string | number;
  title?: string;
  urlSlug?: string;
  priority?: string | number;
  page?: number | string | null;
}


export type ISearchCategoryAction =
  | SearchResults
  | SearchResultsSuccess
  | SearchResultsError;