export enum CartActionTypes {
  SHOW_CART = "SHOW_CART",
  HIDE_CART = "HIDE_CART",
  FETCH_DATA_TO_CART = "DOWNLOAD_DATA_TO_CART",
  ADD_CAR_TO_CART = "ADD_CAR_TO_CART",
  EDIT_CART = "EDIT_CART",
  EDIT_CART_ITEM_IN_SERVER = "EDIT_CART_IN_SERVER",
  DELETE_CART_ITEM = "DELETE_CART_ITEM"
}

export interface ICarToAdd {
  id: number | null;
  quantity: number | null;
}


export interface CartState {
  cartIsShow: boolean;
  cartData: Array<any>;
  carAddedToCart: boolean;
  cartModalIsShow: boolean;
  cartUpdated:boolean
}

export interface ShowCartAction {
  type: CartActionTypes.SHOW_CART;
}

export interface HideCartAction {
  type: CartActionTypes.HIDE_CART;
}
export interface DownloadDataToCartAction {
  type: CartActionTypes.FETCH_DATA_TO_CART;
  payload: Array<any>;
}

export interface AddCartToCartAction {
  type: CartActionTypes.ADD_CAR_TO_CART;
}

export interface EditCartAction {
  type: CartActionTypes.EDIT_CART;
  payload: Array<any>;
}

export interface EditCartItemInServerAction {
  type: CartActionTypes.EDIT_CART_ITEM_IN_SERVER;
}

export interface DeleteCartItemAction {
  type: CartActionTypes.DELETE_CART_ITEM;
  payload: Array<any>;
}

export type CartAction =
  | ShowCartAction
  | HideCartAction
  | DownloadDataToCartAction
  | AddCartToCartAction
  | EditCartAction
  | EditCartItemInServerAction
  | DeleteCartItemAction
