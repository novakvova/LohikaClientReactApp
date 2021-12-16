import { CartState, CartActionTypes, CartAction } from "./types";

const initialState: CartState = {
  cartIsShow: false,
  cartData: [],
  carAddedToCart: false,
  cartModalIsShow: false,
  cartUpdated: false,
  totalCount: 0,
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
        totalCount: action.payload.length,
      };
    case CartActionTypes.ADD_ITEM_TO_CART : 
    return {
      ...state, cartData: [...state.cartData, action.payload],
      totalCount: state.totalCount+=1
    }  

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
      return {
        ...state,
        cartData: state.cartData.filter((item) => item.id !== action.payload),
        totalCount: state.totalCount-=1,
      };

    default:
      return state;
  }
};
