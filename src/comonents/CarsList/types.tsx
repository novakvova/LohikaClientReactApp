export enum CarActionTypes {
  FETCH_CARS = "FETCH_CARS",
  FETCH_CARS_SUCCESS = "FETCH_CARS_SUCCESS",
  FETCH_CARS_ERROR = "FETCH_CARS_ERROR",
  FETCH_SEARCH_CARS = "FETCH_SEARCH_CARS",
}

export interface ISearchCar {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface ICarItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inCart?: boolean
}

export interface ICarSearchList {
  products: Array<ISearchCar>;
  pages: number;
  total: number;
}


export interface CarState {
  cars: Array<ICarItem>;
  carsSearchList: ICarSearchList;
  loading: boolean;
  error: null | string;
}

export interface FetchCarAction {
  type: CarActionTypes.FETCH_CARS;
}

export interface FetchSuccessCarAction {
  type: CarActionTypes.FETCH_CARS_SUCCESS;
  payload: Array<any>;
}

export interface FetchErrorsCarAction {
  type: CarActionTypes.FETCH_CARS_ERROR;
  payload: string;
}

export interface FetchCarsSearchAction {
  type: CarActionTypes.FETCH_SEARCH_CARS;
  payload: ICarSearchList;
}

export type CarAction =
  | FetchCarAction
  | FetchSuccessCarAction
  | FetchErrorsCarAction
  | FetchCarsSearchAction;
