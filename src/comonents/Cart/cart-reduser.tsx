import { CartState, CartActionTypes, CartAction } from "../../types/cart";

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
    default:
      return state;
  }
};
