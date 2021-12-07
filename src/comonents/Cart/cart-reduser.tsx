import { CartState, CartActionTypes, CartAction } from "./types";

const initialState: CartState = {
  cartIsShow: false,
  cartData: [],
  carAddedToCart: false,
  cartModalIsShow: false,
  cartUpdated: false
};

export const cartReducer = (
  state = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionTypes.SHOW_CART:
      return { ...state, cartIsShow: true };
    case CartActionTypes.HIDE_CART:
      return { ...state, cartIsShow: false };
    case CartActionTypes.FETCH_DATA_TO_CART:
      return {
        ...state,
        cartData: action.payload,
      };
    case CartActionTypes.EDIT_CART:
      return {
        ...state,
        cartData: action.payload,
      };
    case CartActionTypes.EDIT_CART_ITEM_IN_SERVER : 
    return  {...state, cartUpdated: true}

    case CartActionTypes.DELETE_CART_ITEM : 
    return {...state, cartData: action.payload}
    
    default:
      return state;
  }
};
