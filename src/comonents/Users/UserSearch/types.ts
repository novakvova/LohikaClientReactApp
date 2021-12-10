export enum IUserActionTypes {
  FETCH_USERS = "FETCH_USERS",
}

export interface FetchResults {
  type: IUserActionTypes.FETCH_USERS;
  payload: IUserSearchState;
}

export interface ISearchData {
  users: IUserSearch[];
  pages: number;
  total: number;
}

export interface IUserSearchState {
  data: ISearchData;
  currentPage: number;
}

export interface IUserSearch {
	id?: number | undefined,
	firstName?: string,
	secondName?: string,
	phone?: string,
	email?: string,
}

export interface IUrlSearch extends IUserSearch {
	page: number
}

export type IUserSearchAction = FetchResults;