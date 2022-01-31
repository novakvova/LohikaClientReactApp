import { PaginatedProductsList } from "../types";

export enum GetProductsActionTypes {
    GET_PRODUCTS = 'GET_PRODUCTS',
    GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR'
}

export interface GetProductsAction {
    type: GetProductsActionTypes.GET_PRODUCTS,
}

export interface GetProductsSuccessAction {
    type: GetProductsActionTypes.GET_PRODUCTS_SUCCESS,
    payload: PaginatedProductsList
}

export interface GetProductsErrorAction {
    type: GetProductsActionTypes.GET_PRODUCTS_ERROR,
    payload: string
}

export type GetProductsActions =
| GetProductsAction
| GetProductsSuccessAction
| GetProductsErrorAction