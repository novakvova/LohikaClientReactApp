import { Order } from '../../UserData/UserOrders/types';
import { GetAdminOrdersActions, GetAdminOrdersActionTypes,  OrderAdminState } from './types';

const intialState: OrderAdminState = {
  orders: [],
  status:[],
  loading: false,
};

export const ordersAdminReducer = (
  state = intialState,
  action: GetAdminOrdersActions
) => {
  switch (action.type) {
    case GetAdminOrdersActionTypes.GET_ORDERS_ADMIN:
      return {
        ...state,
        loading: true,
      };

    case GetAdminOrdersActionTypes.GET_ORDERS_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        status: action.payload.status,
      };

    case GetAdminOrdersActionTypes.GET_ORDERS_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
      };

    case GetAdminOrdersActionTypes.CHANGE_STATUS:
      return {
        ...state,
        loading: true,
      };

    case GetAdminOrdersActionTypes.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: newOrder(state.orders, action.payload.id, action.payload.statusName),
      };

    case GetAdminOrdersActionTypes.CHANGE_STATUS_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return { ...state };
  }
};


const newOrder = (data: Order[], id: number, statName: string): Order[] => {
  const newOrder = data;
  const idx = newOrder.findIndex((el) => el.id === id);
  data[idx].statusName = statName;
  console.log(data[idx].statusName);
  
  return newOrder

}