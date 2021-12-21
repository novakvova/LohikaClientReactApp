import { CarState, CarAction, CarActionTypes } from './types';

const initialState: CarState = {
    cars: [],
    loading: false,
    carSearchedById: null,
    products: [], 
    currentPage: 1,
    pages: 0, 
    total: 0,
    error: null
}

export const carReducer = (state=initialState, action: CarAction) : CarState => {
    switch(action.type) {

        case CarActionTypes.FETCH_CARS:
            return { ...state, loading: true};
        
        case CarActionTypes.FETCH_CARS_SUCCESS:
            return { ...state, loading: false, cars: action.payload};

        case CarActionTypes.FETCH_CARS_ERROR:
            return { ...state, loading: false, error: action.payload};
        
        case CarActionTypes.SEARCH_CARS: 
            return {...state, ...action.payload};

        case CarActionTypes.GET_CAR_BY_ID: 
        return {...state, carSearchedById: action.payload}  
        
        case CarActionTypes.DELETE_CAR: 
        return {...state, products: state.products.filter(item => item.id !== action.payload)}

        default:
            return state;
    }
}