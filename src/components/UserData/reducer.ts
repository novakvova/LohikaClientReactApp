import {ProfileActions, ProfileActionTypes} from './Profile/types';
import { ProfileState } from './types';
import { GetOrdersActionTypes, GetOrdersActions } from './UserOrders/types';

const intialState: ProfileState = {
  orders: [],
  profile: {
	  id: null,
	  email: '',
	  firstName:'',
    secondName: '',
	  photo: '',
	  phone: ''
  },
  loading: false,
  error: "",
};

export const profileReducer = (state = intialState, action:ProfileActions | GetOrdersActions) => {
	switch (action.type) {
    case ProfileActionTypes.PROFILE:
      return {
        ...state,
        loading: true,
      };

    case ProfileActionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: { ...action.payload },
      };

    case ProfileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GetOrdersActionTypes.GET_ORDERS:
      return {
        ...state,
        loading: true,
      };

    case GetOrdersActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case GetOrdersActionTypes.GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
}