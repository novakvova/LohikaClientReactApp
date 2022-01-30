import { PaginatedProductsList } from './../types';
import { Dispatch } from 'react';
import http from '../../../http_common';
import { GetProductsActionTypes, GetProductsActions } from './types';


export const getProductsByCategorySlug = (urlSlug: string): any => {
  return async (dispatch: Dispatch<GetProductsActions>) => {
    try {
        // dispatch({
        //     type: GetProductsActionTypes.GET_PRODUCTS
        // })
        const response = await http.get<PaginatedProductsList>('api/Products/search', {params: {CategorySlug: urlSlug}})
        const { data } = response
        dispatch({
            type: GetProductsActionTypes.GET_PRODUCTS_SUCCESS,
            payload: data
        })

        console.log(data);

        return Promise.resolve<any>({});
    } catch (error: any) {
      dispatch({
        type: GetProductsActionTypes.GET_PRODUCTS_ERROR,
        payload: error,
      });
    }
  };
};
