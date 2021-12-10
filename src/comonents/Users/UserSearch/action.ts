import { IUserActionTypes, IUserSearch, IUserSearchAction, IUserSearchState } from './types';
import { Dispatch } from 'react';
import http from "../../../http_common";

export const getSearchResult = (searchRequest:IUserSearch) => {
	return async (dispatch: Dispatch<IUserSearchAction>) => {
		const param = Object.fromEntries(Object.entries(searchRequest).filter(([key,value]) => {
			if (value) return [key,value]
			return
		}));
		
		try {
			const responce = await http.get<IUserSearchState>("api/Users/search", {
        	params: param,
      });
	  
			dispatch({
				type: IUserActionTypes.FETCH_USERS,
				payload: responce.data
			})
		} catch (error) {
			
		}
	}
}