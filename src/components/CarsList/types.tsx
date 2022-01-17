export enum CarActionTypes {
  FETCH_CARS = "FETCH_CARS",
  FETCH_CARS_SUCCESS = "FETCH_CARS_SUCCESS",
  FETCH_CARS_ERROR = "FETCH_CARS_ERROR",
  SEARCH_CARS = "SEARCH_CARS",
  GET_CAR_BY_ID = "GET_CAR_BY_ID",
  UPDATE_CAR = "UPDATE_CAR",
  DELETE_CAR = "DELETE_CAR",
  UPLOAD_CAR_IMAGE = "UPLOAD_CAR_IMAGE",

}

export interface IClickedButtonData {
  selected: number;
}

export interface ICarUpdate {
  id?: string;
  name: string;
  priority: string;
  price: string;
  image: string;
}

export interface ISearchCar {
  id: number;
  name: string;
  priority: number;
  image: string;
  price: number;
  images: Array<string>;
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
  currentPage: number;
}

export interface ISearchProduct {
  id?: string;
  name?: string;
  price?: string;
  priority?: string;
  page?: number | string | null;
}

export interface CarState {
  carSearchedById: ISearchCar | null;
  products: Array<ISearchCar>;
  pages: number;
  total: number;
  loading: boolean;
  currentPage: number;
  error: null | string;
  uploadCarImageId: Array<number>
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

export interface GetCarByIdAction {
  type: CarActionTypes.GET_CAR_BY_ID;
  payload: ISearchCar;
}

export interface UpdateCarAction {
  type: CarActionTypes.UPDATE_CAR;
}

export interface DeleteCarAction {
  type: CarActionTypes.DELETE_CAR;
  payload: number;
}

export interface UploadCarImageAction {
  type: CarActionTypes.UPLOAD_CAR_IMAGE;
}


export type CarAction =
  | FetchCarAction
  | FetchSuccessCarAction
  | FetchErrorsCarAction
  | FetchCarsSearchAction
  | GetCarByIdAction
  | UpdateCarAction
  | DeleteCarAction
  | UploadCarImageAction;
