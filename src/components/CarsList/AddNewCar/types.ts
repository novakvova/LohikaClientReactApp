export enum SendingCarTypes {
  SENDING_CAR = "SENDING_CAR",
  SENDING_CAR_SUCCESS = "SENDING_CAR_SUCCESS",
  SENDING_CAR_SUCCESS_STOP_NAV = "SENDING_CAR_SUCCESS_STOP_NAV",
  SENDING_CAR_ERROR = "SENDING_CAR_ERROR",
}

export interface ISendingCar {
  name: string;
  priority: string;
  price: string;
}

export interface SendingCarState {
  car: ISendingCar | any;
  loading: boolean;
  error: null | string;
  nav: boolean;
}

export interface IAddCar {
  name: string;
  priority: string;
  price: string;
  image?: string;
  ids?: Array<number>;
}

export interface SendingCarAction {
  type: SendingCarTypes.SENDING_CAR;
}

export interface SendingCarSuccsessAction {
  type: SendingCarTypes.SENDING_CAR_SUCCESS;
  payload: string | number;
}
export interface SendingCarSuccsessStopNavAction {
  type: SendingCarTypes.SENDING_CAR_SUCCESS_STOP_NAV;
}

export interface SendingCarErrorAction {
  type: SendingCarTypes.SENDING_CAR_ERROR;
  payload: string;
}

export type SendingAction =
  | SendingCarAction
  | SendingCarSuccsessAction
  | SendingCarErrorAction
  | SendingCarSuccsessStopNavAction;
