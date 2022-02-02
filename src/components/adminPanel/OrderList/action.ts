import { Dispatch } from "react";
import http from "../../../http_common";
import { Order } from '../../UserData/UserOrders/types';
import { GetAdminOrdersActions, GetAdminOrdersActionTypes, OrderStatus } from './types';

export const GetAdminOrdersList = () => async (dispatch: Dispatch<GetAdminOrdersActions>) => {
  try {
    dispatch({ type: GetAdminOrdersActionTypes.GET_ORDERS_ADMIN });
    const response = await http.get<Order[]>("api/Orders/list");
    const responseStatusList = await http.get<OrderStatus[]>("api/Orders/status/list")
    dispatch({
      type: GetAdminOrdersActionTypes.GET_ORDERS_ADMIN_SUCCESS,
      payload: {orders: response.data, status: responseStatusList.data},
    });
  } catch (error: any) {
    dispatch({
      type: GetAdminOrdersActionTypes.GET_ORDERS_ADMIN_ERROR,
    });
  }
};

export const ChangeOrderStatus =
  (id: number, statusId: number , statusName: string) => async (dispatch: Dispatch<GetAdminOrdersActions>) => {
    try {
      
      dispatch({ type: GetAdminOrdersActionTypes.CHANGE_STATUS });
      const res = await http.post("api/Orders/status/change", {id, statusId});
    console.log(res);
    
      dispatch({
        type: GetAdminOrdersActionTypes.CHANGE_STATUS_SUCCESS,
        payload: { id, statusId, statusName },
      });
    } catch (error: any) {
      dispatch({
        type: GetAdminOrdersActionTypes.CHANGE_STATUS_ERROR,
      });
    }
  };
