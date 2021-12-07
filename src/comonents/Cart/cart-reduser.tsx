import { CartState, CartActionTypes, CartAction } from "./types";

const initialState: CartState = {
  cartIsShow: false,
  cartData: [],
  carAddedToCart: false,
  cartModalIsShow: false,
  cartUpdated: false,
  totalCount: 0
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
    case CartActionTypes.UPDATE_CART_ITEM:
      return {
        ...state,
        cartData: state.cartData.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          } else {
            return item;
          }
        }),
      };

    case CartActionTypes.DELETE_CART_ITEM:
      console.log("actionPayload", action.payload);
      return {
        ...state,
        cartData: state.cartData.filter((item) => item.id != action.payload),
      };
     
    case CartActionTypes.UPDATE_COUNT: return {
      ...state, totalCount: state.cartData.length
    } 

    default:
      return state;
  }
};
