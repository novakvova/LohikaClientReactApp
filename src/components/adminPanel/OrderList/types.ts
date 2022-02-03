import { Order } from '../../UserData/UserOrders/types';

export enum GetAdminOrdersActionTypes {
  GET_ORDERS_ADMIN = "GET_ADMIN_ORDERS",
  GET_ORDERS_ADMIN_SUCCESS = "GET_ADMIN_ORDERS_SUCCESS",
  GET_ORDERS_ADMIN_ERROR = "GET_ADMIN_ORDERS_ERROR",
  CHANGE_STATUS = "CHANGE_STATUS",
  CHANGE_STATUS_SUCCESS = "CHANGE_STATUS_SUCCESS",
  CHANGE_STATUS_ERROR = "CHANGE_STATUS_ERROR",
}


export interface GetOrdersAdminAction {
  type: GetAdminOrdersActionTypes.GET_ORDERS_ADMIN;
}

export interface GetOrdersAdminSuccessAction {
  type: GetAdminOrdersActionTypes.GET_ORDERS_ADMIN_SUCCESS;
  payload: {orders: Order[], status: Array<OrderStatus>};
}

export interface GetOrdersAdminErrorAction {
  type: GetAdminOrdersActionTypes.GET_ORDERS_ADMIN_ERROR;
}
export interface ChangeStatusAction {
  type: GetAdminOrdersActionTypes.CHANGE_STATUS;
}

export interface ChangeStatusSuccessAction {
  type: GetAdminOrdersActionTypes.CHANGE_STATUS_SUCCESS;
  payload: { id: number; statusId: number, statusName: string };
}

export interface ChangeStatusErrorAction {
  type: GetAdminOrdersActionTypes.CHANGE_STATUS_ERROR;
}


export type GetAdminOrdersActions =
  | GetOrdersAdminAction
  | GetOrdersAdminSuccessAction
  | GetOrdersAdminErrorAction
  | ChangeStatusAction
  | ChangeStatusSuccessAction
  | ChangeStatusErrorAction;

export interface OrderStatus {
  id: number;
  name: string
}

  export interface OrderAdminState {
	  orders: Array<Order>,
    status: Array<OrderStatus>
	  loading: boolean
  };