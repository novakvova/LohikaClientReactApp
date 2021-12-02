import { Dispatch } from "react";
import http from "../../http_common";
import { UsersAction, UsersActionTypes } from "../../types/CRUDUsers/UsersFetch";
import { DeleteUserActions, DeleteUserActionTypes} from '../../types/CRUDUsers/UsersDelete'

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ 
        type: UsersActionTypes.FETCH_USERS 
      });
      const responce = await http.get("api/Users/all");
      dispatch({
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: responce.data,
      });
    } catch (error: any) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: error,
      });
    }
  };
};

export const deleteUser = (id: number) => {
  return async (dispatch: Dispatch<DeleteUserActions>) => {
    try {
      dispatch({ 
        type: DeleteUserActionTypes.DELETE_USER
      })
      const response = await http.delete(`api/Users/delete/${id}`);
      if (response.status === 200){
        dispatch({
          type: DeleteUserActionTypes.DELETE_USER_SUCCESS,
          payload: id
        })
      }
      else throw Error('Щось пішло не так')
    } catch ( error ) {
      dispatch({
        type: DeleteUserActionTypes.DELETE_USER_ERROR,
        payload: "Error"});
    }

  }
}
