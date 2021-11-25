import { CarState, CarAction, CarActionTypes } from '../../types/car';

const initialState: CarState = {
    cars: [],
    loading: false,
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

        default:
            return state;
    }
}