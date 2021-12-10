import {
  IUserActionTypes,
  IUserSearchState,
  IUserSearchAction,
} from "./types";


const initState: IUserSearchState = {
	data:  {
    users:[],
	  pages: 1,
	  total:0,
  },
  currentPage:1
};

export const userSearchReducer = (state = initState, action: IUserSearchAction) => {
  switch (action.type) {
    case IUserActionTypes.FETCH_USERS:
      return { ...action.payload };

    default:
      return state;
  }
};
