import { Dispatch } from 'react';
import {  IPaginateState, PaginateActions, PaginateActionTypes } from './types';

export const paginateInit = (total: number) => {
  return async (dispatch: Dispatch<PaginateActions>) => {
    try {
      dispatch({
        type: PaginateActionTypes.PAGINATE,
      });

      dispatch({
        type: PaginateActionTypes.PAGINATE_INIT,
        payload: total,
      });
    } catch (error: any) {
      dispatch({
        type: PaginateActionTypes.PAGINATE_ERROR,
        payload: error,
      });
    }
  };
};
