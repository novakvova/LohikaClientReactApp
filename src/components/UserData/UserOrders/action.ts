import { GetOrdersActions, GetOrdersActionTypes, Order } from './types';


import { Dispatch } from "react";
import http from "../../../http_common";

const GetOrdersList = () => async (dispatch: Dispatch<GetOrdersActions>) => {
  try {
    dispatch({ type: GetOrdersActionTypes.GET_ORDERS });
	const response = await http.get<Order[]>("api/Orders/user/list");
	const { data } = response;
    dispatch({
      type: GetOrdersActionTypes.GET_ORDERS_SUCCESS,
      payload:  data ,
    });
  } catch (error: any) {
    dispatch({
      type: GetOrdersActionTypes.GET_ORDERS_ERROR,
    });
  }
};

export default GetOrdersList;
