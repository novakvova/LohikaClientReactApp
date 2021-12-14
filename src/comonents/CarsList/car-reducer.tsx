import { CarState, CarAction, CarActionTypes } from './types';

const initialState: CarState = {
    cars: [],
    loading: false,
    //carsSearchList:{ },
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
            return {...state, ...action.payload}

        default:
            return state;
    }
}