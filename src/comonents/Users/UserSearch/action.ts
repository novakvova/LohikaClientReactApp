import { IUserActionTypes, IUserSearch, IUserSearchAction, ISearchData } from './types';
import { Dispatch } from 'react';
import http from "../../../http_common";

export const getSearchResult = (searchRequest:IUserSearch, page: number) => {
	return async (dispatch: Dispatch<IUserSearchAction>) => {
		try {
			let params = Object
				.fromEntries(Object
				.entries(searchRequest)
				.filter(([key, value]) => {
					if (value) return [key, value];
					return;
				})
			);
			params = {...params, page}
			const responce = await http.get<ISearchData>("api/Users/search", {params});

			dispatch({
				type: IUserActionTypes.FETCH_USERS,
				payload: { data: responce.data, currentPage: params.page },
			});
		} catch (error) {
			
		}
	}
}