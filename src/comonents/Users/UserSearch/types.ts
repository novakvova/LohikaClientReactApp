export enum IUserActionTypes {
  FETCH_USERS = "FETCH_USERS",
}

export interface FetchResults {
  type: IUserActionTypes.FETCH_USERS,
  payload: IUserSearchState,
}

export interface IUserSearchState {
	users: IUserSearch[],
	pages: number,
	total: number
}

export interface IUserSearch {
	id: number | undefined,
	firstName: string,
	secondName: string,
	phone: string,
	email: string,
	page:number
}

export type IUserSearchAction = FetchResults;