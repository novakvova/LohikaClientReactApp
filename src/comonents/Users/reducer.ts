import { UsersState, UserInfo } from "./types";
import { CreateUserActionTypes, CreateUserActions } from "./types/CreateUser"
import { UsersActions, UsersActionTypes } from "./types/GetAllUser";
import { DeleteUserActions, DeleteUserActionTypes } from "./types/DeleteUser"
import { UpdateUserActionTypes, UpdateUserActions } from "./types/UpdateUser";
import { GetUserActionTypes, GetUserActions } from "./types/GetUserById"
import { ISearchUserAction, ISearchUserActionTypes } from './types/SearchUsers';

  const user: UserInfo = {
    id: 0,
    email: "",
    firstName: "",
    secondName: "",
    photo: "",
    phone: "",
  };

const initialState: UsersState = {
  users: [],
  userData: user,
  loading: false,
  error: null,
  currentPage: 1,
  pages: 1,
  total: 0
};
export const usersReducer = (
  state = initialState,
  action:
    | UsersActions
    | DeleteUserActions
    | GetUserActions
    | UpdateUserActions
    | CreateUserActions
    | ISearchUserAction
) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS:
      return { ...state, loading: true };

    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case UsersActionTypes.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DeleteUserActionTypes.DELETE_USER:
      return { ...state, loading: true };

    case DeleteUserActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(({ id }) => id !== action.payload),
      };

    case DeleteUserActionTypes.DELETE_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GetUserActionTypes.GET_USER:
      return { ...state, loading: true };

    case GetUserActionTypes.GET_USER_SUCCESS:
      return { ...state, loading: false, userData: action.payload };

    case GetUserActionTypes.GET_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UpdateUserActionTypes.UPDATE_USER:
      return { ...state, loading: true };

    case UpdateUserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: changeUser(state.users, action.payload),
      };

    case UpdateUserActionTypes.UPDATE_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CreateUserActionTypes.CREATE_USER_SUCCESS:
      return { ...state };

    case ISearchUserActionTypes.SEARCH_USERS:
      return { ...state, loading: true };

    case ISearchUserActionTypes.SEARCH_USERS_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case ISearchUserActionTypes.SEARCH_USERS_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};


const changeUser = (state: UserInfo[], data: UserInfo): UserInfo[] => {
  const idx: number = state.findIndex(({id}) => id === data.id);
  return [...state.slice(0, idx), data, ...state.slice(idx + 1)]
};

