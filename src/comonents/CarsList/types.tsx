export enum CarActionTypes {
  FETCH_CARS = "FETCH_CARS",
  FETCH_CARS_SUCCESS = "FETCH_CARS_SUCCESS",
  FETCH_CARS_ERROR = "FETCH_CARS_ERROR",
  SEARCH_CARS = "SEARCH_CARS",
}
export interface IClickedButtonData {
  selected: number;
}

export interface ISearchCar {
  id: number;
  name: string;
  priority: number;
  image: string;
  price: number;
}

export interface ICarItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inCart?: boolean;
}

export interface ICarSearchList {
  products: Array<ISearchCar>;
  pages: number;
  total: number;
}

export interface ISearchProduct {
  id?: string;
  name?: string;
  price?: string;
  priority?: string;
  page?: string | null;
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
  type: CarActionTypes.SEARCH_CARS;
  payload: ICarSearchList;
}

export type CarAction =
  | FetchCarAction
  | FetchSuccessCarAction
  | FetchErrorsCarAction
  | FetchCarsSearchAction;
