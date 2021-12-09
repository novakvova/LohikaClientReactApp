import {
  IUserActionTypes,
  IUserSearch,
  IUserSearchState,
  IUserSearchAction,
} from "./types";
const initState: IUserSearchState = {
	users:[],
	pages: 0,
	total:0
};

export const userSearchReducer = (state = initState, action: IUserSearchAction) => {
  switch (action.type) {
    case IUserActionTypes.FETCH_USERS:
      return { ...action.payload };

    default:
      return state;
  }
};
