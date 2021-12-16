import { UserInfo } from '../types';

export enum ISearchUserActionTypes {
  SEARCH_USERS = "SEARCH_USERS",
  SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS",
  SEARCH_USERS_ERROR = "SEARCH_USERS_ERROR",
};

export interface SearchResults {
  type: ISearchUserActionTypes.SEARCH_USERS;
 
};

export interface SearchResultsSuccess {
  type: ISearchUserActionTypes.SEARCH_USERS_SUCCESS;
  payload: ISearchData;
};

export interface SearchResultsError {
  type: ISearchUserActionTypes.SEARCH_USERS_ERROR;
};


export interface ISearchData {
  users: UserInfo[];
  pages: number;
  total: number;
};

export interface ISearchUser {
  id?: string;
  firstName?: string;
  secondName?: string;
  phone?: string;
  email?: string;
  page?: number | string | null;
}


export type ISearchUserAction =
  | SearchResults
  | SearchResultsSuccess
  | SearchResultsError;