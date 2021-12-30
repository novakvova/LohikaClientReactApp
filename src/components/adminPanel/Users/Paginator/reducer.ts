import { IPaginateState, PaginateActions, PaginateActionTypes } from './types';

const initialState: IPaginateState = {
  search: {},
  currentPage: 1,
  pages: 1,
  total: 0,
  error: "",
  loading: false,
};

export const paginateReducer = (state=initialState, action:PaginateActions) => {
	switch (action.type) {
		case PaginateActionTypes.PAGINATE:
			return {
				...state, loading: true
			};

		case PaginateActionTypes.PAGINATE_INIT:
			return {
				...state, total: action.payload,
			}
			
	
		default:
			return state
	}
};