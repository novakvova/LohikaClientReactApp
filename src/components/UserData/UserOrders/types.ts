export enum GetOrdersActionTypes {
  GET_ORDERS = "GET_ORDERS",
  GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS",
  GET_ORDERS_ERROR = "GET_ORDERS_ERROR",
}

export interface Order {
  id: number;
  consumerFirstName: string;
  consumerSecondName: string;
  consumerPhone: string;
  region: string;
  city: string;
  street: string;
  homeNumber: string;
  statusName: string;
  dateCreated: string;
  items: Array<OrderItem>;
}

  export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    buyPrice:number;
  }


export interface GetOrdersAction {
  type: GetOrdersActionTypes.GET_ORDERS;
}

export interface GetOrdersSuccessAction {
  type: GetOrdersActionTypes.GET_ORDERS_SUCCESS;
  payload: Array<Order>;
}

export interface GetOrdersErrorAction {
  type: GetOrdersActionTypes.GET_ORDERS_ERROR;
}

export type GetOrdersActions =
  | GetOrdersAction
  | GetOrdersSuccessAction
  | GetOrdersErrorAction;
