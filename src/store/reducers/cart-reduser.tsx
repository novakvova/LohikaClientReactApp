import { CartState, CartActionTypes, CartAction } from "./../../types/cart";

const initialState: CartState = {
  cartIsShow: false,
  cartData: [],
  carAddedToCart: false,
  cartModalIsShow: false
};

export const cartReducer = (state = initialState, action: CartAction) : CartState => {
  switch (action.type) {
    case CartActionTypes.SHOW_CART:
      return { ...state, cartIsShow: true };
    case CartActionTypes.HIDE_CART:
      return { ...state, cartIsShow: false };
    case CartActionTypes.FETCH_DATA_TO_CART : return {
      ...state, cartData: action.payload
    }
    case CartActionTypes.ADD_CAR_TO_CART : return {
      ...state, carAddedToCart: true
    }
    case CartActionTypes.SHOW_ADD_CAR_TO_CART_MODAL : return {
      ...state, cartModalIsShow: true
    }
    case CartActionTypes.HIDE_ADD_CAR_TO_CART_MODAL : return {
      ...state, cartModalIsShow: false
    }
    default:
      return state;
  }
};
