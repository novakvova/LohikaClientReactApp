import { IUserActionTypes, IUserSearch, IUserSearchAction, IUserSearchState } from './types';
import { Dispatch } from 'react';
import http from "../../../http_common";

export const getSearchResult = (searchReques:IUserSearch) => {
	return async (dispatch: Dispatch<IUserSearchAction>) => {
		try {
			const responce = await http.get<IUserSearchState>("api/Users/search", {
        	params: searchReques,
      });
			dispatch({
				type: IUserActionTypes.FETCH_USERS,
				payload: responce.data
			})
		} catch (error) {
			
		}
	}
}