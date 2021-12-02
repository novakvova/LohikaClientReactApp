import { UsersState, UsersAction, UsersActionTypes } from "../../types/CRUDUsers/UsersFetch";
import { DeleteUserActions, DeleteUserActionTypes } from '../../types/CRUDUsers/UsersDelete'
const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = (
  state = initialState,
    action: UsersAction | DeleteUserActions
) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS:
      return { ...state, loading: true };

    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case UsersActionTypes.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DeleteUserActionTypes.DELETE_USER: 
      return {...state, loading: true};

    case DeleteUserActionTypes.DELETE_USER_SUCCESS:
      return {...state, loading: false, users: state.users.filter( ({id}) => id !== action.payload)};

    case DeleteUserActionTypes.DELETE_USER_ERROR: 
      return {...state, loading: false, error: action.payload};
      

    default:
      return state;
  }
};

