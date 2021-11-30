export enum CartActionTypes {
  SHOW_CART = "SHOW_CART",
  HIDE_CART = "HIDE_CART",
  FETCH_DATA_TO_CART = "DOWNLOAD_DATA_TO_CART",
  ADD_CAR_TO_CART = "ADD_CAR_TO_CART",
  SHOW_ADD_CAR_TO_CART_MODAL = "SHOW_ADD_CAR_TO_CART_MODAL",
  HIDE_ADD_CAR_TO_CART_MODAL = "HIDE_ADD_CAR_TO_CART_MODAL",
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

export interface ShowAddCartToCartMoadlAction {
  type: CartActionTypes.SHOW_ADD_CAR_TO_CART_MODAL;
}
export interface HideAddCartToCartMoadlAction {
  type: CartActionTypes.HIDE_ADD_CAR_TO_CART_MODAL;
}

export type CartAction =
  | ShowCartAction
  | HideCartAction
  | DownloadDataToCartAction
  | AddCartToCartAction
  | ShowAddCartToCartMoadlAction
  | HideAddCartToCartMoadlAction;
