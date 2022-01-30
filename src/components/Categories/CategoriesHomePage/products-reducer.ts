import { PaginatedProductsList } from "../types"
import { GetProductsActions, GetProductsActionTypes } from "./types"

interface CategoryProductsState {
    ppl: PaginatedProductsList,
    error: string | undefined,
    loading: boolean
}

const initialState : CategoryProductsState = {
    ppl: {
        currentPage: 0,
        pages: 0,
        total: 0,
        products: []
    },
    error: undefined,
    loading: false
}

export const productsReducer = (
    state = initialState,
    action: GetProductsActions
): CategoryProductsState => {
    switch (action.type) {
        case GetProductsActionTypes.GET_PRODUCTS_SUCCESS: 
            return {...state, ppl: action.payload};
        default:
            return state;
    }
}