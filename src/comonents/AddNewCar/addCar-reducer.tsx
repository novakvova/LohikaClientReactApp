import {
  SendingCarState,
  SendingAction,
  SendingCarTypes,
} from "./types";

const initialState: SendingCarState = {
  car: { name: "", priority: 0, price: 0, photo: "" },
  loading: false,
  error: null,
  nav:false
};

export const sendingCarReducer = (
  state = initialState,
  action: SendingAction
) => {
  switch (action.type) {
    case SendingCarTypes.SENDING_CAR:
      return {
        ...state,
        loading: true,
      };

    case SendingCarTypes.SENDING_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        nav: true,
        error: null
      };

    case SendingCarTypes.SENDING_CAR_SUCCESS_STOP_NAV:
      return {
        ...state,
        nav: false,
      };

    
    case SendingCarTypes.SENDING_CAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
