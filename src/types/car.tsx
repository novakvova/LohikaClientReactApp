export enum CarActionTypes {
    FETCH_CARS = "FETCH_CARS",
    FETCH_CARS_SUCCESS = "FETCH_CARS_SUCCESS",
    FETCH_CARS_ERROR = "FETCH_CARS_ERROR",
}

export interface CarState {
    cars: Array<any>,
    loading: boolean,
    error: null | string
}

export interface FetchCarAction {
    type: CarActionTypes.FETCH_CARS
}

export interface FetchSuccessCarAction {
    type: CarActionTypes.FETCH_CARS_SUCCESS,
    payload: Array<any>
}

export interface FetchErrorsCarAction {
    type: CarActionTypes.FETCH_CARS_ERROR,
    payload: string
}

export type CarAction = FetchCarAction | FetchSuccessCarAction | FetchErrorsCarAction;